# -*- coding: utf-8 -*-
"""TUOI SANG hay KHONG — do not cua CA HAI TAY o cac doan solo.

    python tools/sheet/sang_toi.py            # ca ba thay
    python tools/sheet/sang_toi.py linh-nhi

Nguoi dung dat: *"Trong cac bai giong truong cua Linh Nhi va cac thay khac thi ho
chon not co xu huong tuoi sang."* Day la mot khang dinh DO DUOC, nhung chi do duoc
khi co cai de so — nen bo nay do CA hai nhom, truong va thu, roi xem bac nao that
su tach chung ra.

BA CHO KHAC `bac_not.py`, doc ky keo lay nham so:

  1. `bac_not.py` chi lay TAY PHAI. Bo nay lay ca hai tay, dem RIENG tung tay.
  2. `bac_not.py` chi lay not cao nhat moi moc go (duong giai dieu). Bo nay lay
     MOI NOT — tay trai choi hop am, bo not thap hon la mat chinh cai can do.
  3. Bo nay khong loc theo giong cua doan; giong lay tu `giong` cua bai va tu
     `sections.<doan>.giong` khi co.

Bac ghi theo HAI truc, dung lan la doc sai:

  * bac so CHU AM BAI  — "not nay la bac may cua gam"
  * bac so GOC HOP AM  — "not nay la gi cua hop am dang vang"
"""
from __future__ import annotations

import collections
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bac_not as B  # noqa: E402
import don_hop_am  # noqa: E402
import khung  # noqa: E402

SOLO = ('intro', 'interlude', 'outro')
TEN = B.TEN_BAC


def not_hai_tay(path):
    """MOI not cua ca hai tay, kem tay va moc phach — khong rut duong giai dieu."""
    import xml.etree.ElementTree as ET
    import zipfile
    if path.lower().endswith('.mxl'):
        zf = zipfile.ZipFile(path)
        ten = next(n for n in zf.namelist()
                   if n.endswith(('.xml', '.musicxml'))
                   and 'META' not in n and 'container' not in n)
        root = ET.fromstring(zf.read(ten).decode('utf-8', errors='replace'))
    else:
        root = ET.parse(path).getroot()

    parts = root.findall('part')
    notes, hops = [], []
    for pi, part in enumerate(parts):
        cursor, div, barlen = 0.0, 1, 4.0
        for measure in part.findall('measure'):
            bar = int(measure.get('number') or 0)
            at = cursor
            attr = measure.find('attributes')
            if attr is not None:
                if attr.findtext('divisions'):
                    div = int(attr.findtext('divisions'))
                t = attr.find('time')
                if t is not None:
                    barlen = int(t.findtext('beats')) * 4.0 / int(t.findtext('beat-type'))
            for el in measure:
                if el.tag == 'harmony':
                    if pi == 0 and not don_hop_am.la_hoi(el):
                        hops.append((round(at, 6), bar, el))
                elif el.tag == 'backup':
                    at -= float(el.findtext('duration') or 0) / div
                elif el.tag == 'forward':
                    at += float(el.findtext('duration') or 0) / div
                elif el.tag == 'note':
                    dur = float(el.findtext('duration') or 0) / div
                    la_chong = el.find('chord') is not None
                    pitch = el.find('pitch')
                    if pitch is not None:
                        staff = int(el.findtext('staff') or 1)
                        tay = staff if len(parts) == 1 else pi + 1
                        duoi = any(t.get('type') == 'stop' for t in el.findall('tie'))
                        if not duoi:
                            midi = ((int(pitch.findtext('octave')) + 1) * 12
                                    + B.BUOC[pitch.findtext('step')]
                                    + int(pitch.findtext('alter') or 0))
                            notes.append((round(at, 6), bar, midi, tay))
                    if not la_chong and el.find('grace') is None:
                        at += dur
            cursor += barlen
    return notes, hops


def gom(chi_thay=None):
    """Tra ve {(the, tay): Counter(bac_gam)}, {(the, tay): Counter(bac_hop)}, so lieu khac."""
    gam = collections.defaultdict(collections.Counter)
    hop = collections.defaultdict(collections.Counter)
    tam = collections.defaultdict(list)
    bai = collections.defaultdict(set)
    for song in khung.nap_corpus()['songs']:
        thay = song.get('teacher')
        if chi_thay and thay != chi_thay:
            continue
        path = B.tim_file(song)
        g = B.giong_ra_so(song.get('giong'))
        if not path or not g:
            continue
        notes, hops = not_hai_tay(path)
        for doan in SOLO:
            sec = (song.get('sections') or {}).get(doan) or {}
            o = tuple(sec.get('bars') or ())
            if len(o) != 2:
                continue
            chu_am, the = B.giong_ra_so(sec['giong']) if sec.get('giong') else g
            for beat, bar, midi, tay in notes:
                if not (o[0] <= bar <= o[1]):
                    continue
                khoa = (the, tay)
                gam[khoa][(midi - chu_am) % 12] += 1
                tam[khoa].append(midi)
                bai[the].add(song['name'])
                el, _ = B.hop_tai(hops, beat, bar)
                if el is None:
                    continue
                r = el.find('root')
                rp = don_hop_am._pc(r, 'root') if r is not None else None
                if rp is not None:
                    hop[khoa][(midi - rp) % 12] += 1
    return gam, hop, tam, bai


def bang(dem, nhan):
    n = sum(dem.values())
    if n == 0:
        return
    hang = ' '.join('%s:%.0f%%' % (TEN[b], 100.0 * v / n)
                    for b, v in sorted(dem.items(), key=lambda kv: -kv[1])
                    if v / float(n) >= 0.02)
    print('  %-26s n=%5d  %s' % (nhan, n, hang))


def main():
    thay = sys.argv[1] if len(sys.argv) > 1 else None
    gam, hop, tam, bai = gom(thay)
    print('=== %s — doan solo, CA HAI TAY' % (thay or 'ca ba thay'))
    for the in ('truong', 'thu'):
        if not bai[the]:
            continue
        print('\n--- %s (%d bai): %s' % (the, len(bai[the]), ', '.join(sorted(bai[the]))))
        for tay, ten_tay in ((1, 'tay phai'), (2, 'tay trai')):
            k = (the, tay)
            if not gam[k]:
                continue
            bang(gam[k], ten_tay + ' · bac so GAM')
            bang(hop[k], ten_tay + ' · bac so HOP AM')
            v = tam[k]
            print('  %-26s tam %.1f, thap %d, cao %d'
                  % (ten_tay + ' · cao do', sum(v) / len(v), min(v), max(v)))

    print('\n=== CHENH LECH truong - thu (diem phan tram), bac so GAM')
    for tay, ten_tay in ((1, 'tay phai'), (2, 'tay trai')):
        a, b = gam[('truong', tay)], gam[('thu', tay)]
        na, nb = sum(a.values()), sum(b.values())
        if not na or not nb:
            continue
        lech = sorted(((100.0 * a[i] / na - 100.0 * b[i] / nb), i) for i in range(12))
        cao = [x for x in lech if abs(x[0]) >= 2]
        print('  %-9s %s' % (ten_tay, ' '.join(
            '%s%+.0f' % (TEN[i], d) for d, i in sorted(cao, key=lambda x: -x[0]))))


if __name__ == '__main__':
    main()
