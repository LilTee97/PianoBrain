# -*- coding: utf-8 -*-
"""Do BAC CUA NOT so voi HOP AM dang vang — tach tung thay.

    python tools/sheet/bac_not.py            # ca ba thay
    python tools/sheet/bac_not.py linh-nhi   # mot thay
    python tools/sheet/bac_not.py --kiem     # tu kiem: tai lap 2169 not / 67,7%

Cau hoi nguoi dung dat: khi hop am C dang vang, thay chon not trong bay bac cua
gam C, hay lay ca not ngoai? Neu co not ngoai hop am thi not KE TIEP di dau? Ho
dung mode hay scale gi?

Nen bo nay do BA thu, khong tron lan:
  1. bac so voi GOC HOP AM  (0..11 nua cung) — "not nay la gi cua hop am"
  2. bac so voi CHU AM BAI  — "not nay co trong gam bai khong"
  3. not KE TIEP sau mot not ngoai hop am — "ho xu ly the nao"

BAY da sap va vi sao bo nay khong sap lai:
  * Chat hop am lay tu don_hop_am.tap_not(), KHONG chep lai bang. Bang cu thieu
    minor-11th/dominant-11th/dominant-13th nen 17/299 ky hieu roi ve ba truong.
  * Duoi not noi (tie) bi bo — mot not ngan bon o dem bon lan la sai mat do.
  * Giong THU co BA gam (tu nhien / hoa thanh / giai dieu). Lay rieng gam tu
    nhien lam chuan thi ra 4,3% ngoai gam, nghe nhu cac thay rai bua.
"""
from __future__ import annotations

import collections
import os
import sys
import xml.etree.ElementTree as ET
import zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import don_hop_am  # noqa: E402
import khung  # noqa: E402

SOLO = ('intro', 'interlude', 'outro')
BUOC = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
TEN_VN = {'do': 0, 're': 2, 'mi': 4, 'fa': 5, 'sol': 7, 'la': 9, 'si': 11}

# Gam so voi chu am. Giong thu gop ca ba gam — xem luat 6.
GAM_TRUONG = (0, 2, 4, 5, 7, 9, 11)
GAM_THU_TN = (0, 2, 3, 5, 7, 8, 10)
GAM_THU_GOP = (0, 2, 3, 5, 7, 8, 9, 10, 11)

TEN_BAC = ['1', 'b9', '9', 'b3', '3', '11', 'b5', '5', 'b13', '13', 'b7', '7']


def giong_ra_so(giong):
    """'Mi giang truong' -> (3, 'truong'). Tra None neu khong doc duoc."""
    if not giong:
        return None
    tu = giong.lower().split()
    if tu[0] not in TEN_VN:
        return None
    pc = TEN_VN[tu[0]]
    if 'giang' in tu:
        pc = (pc - 1) % 12
    if 'thang' in tu:
        pc = (pc + 1) % 12
    return pc, ('thu' if 'thu' in tu else 'truong')


def doc_ban(path):
    """Doc mot ban ky am ra (not tay phai, hop am), ca hai deo moc phach tuyet doi.

    Di MOT luot tren cay XML nen not va hop am dung chung mot he toa do — khong
    con chuyen so o cua hai ben lech nhau.
    """
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
                        # DUOI NOT NOI: <tie type="stop"> la phan ngan tiep, khong
                        # phai mot moc go moi.
                        duoi = any(t.get('type') == 'stop' for t in el.findall('tie'))
                        if tay == 1 and not duoi:
                            midi = ((int(pitch.findtext('octave')) + 1) * 12
                                    + BUOC[pitch.findtext('step')]
                                    + int(pitch.findtext('alter') or 0))
                            notes.append((round(at, 6), bar, midi))
                    if not la_chong and el.find('grace') is None:
                        at += dur
            cursor += barlen
    return notes, hops


def giai_dieu(notes, a, b):
    """Not cao nhat moi moc go, trong khoang o [a, b]. Tra (phach, o, midi)."""
    at = collections.defaultdict(list)
    o_cua = {}
    for beat, bar, midi in notes:
        if a <= bar <= b:
            at[beat].append(midi)
            o_cua[beat] = bar
    return [(t, o_cua[t], max(v)) for t, v in sorted(at.items())]


def hop_tai(hops, beat, bar):
    """Hop am dang VANG tai moc phach nay — ky hieu gan nhat ve phia truoc.

    Tra ve (harmony, cung_o). `cung_o` noi ky hieu ay co nam ngay trong o cua not
    hay khong. HAI PHEP DEM KHAC NHAU, dung lan la lech mau so:
      * dang vang (mac dinh)  — dung cho cau hoi "not nay la gi cua hop am"
      * cung o (`cung_o`)     — mau so cua con so 1671 da chot trong md
    """
    dung, o = None, None
    for at, b, el in hops:
        if at <= beat + 1e-6:
            dung, o = el, b
        else:
            break
    return dung, (o == bar)


def chat_nhom(root_pc, tap):
    """Xep hop am vao nhom: maj / dom / min / sus / khac."""
    rel = set((p - root_pc) % 12 for p in tap)
    ba_truong, ba_thu = 4 in rel, 3 in rel
    bay_thu = 10 in rel
    if ba_truong and not ba_thu:
        return 'dom' if bay_thu else 'maj'
    if ba_thu:
        return 'min'
    if 5 in rel or 2 in rel:
        return 'sus'
    return 'khac'


def tim_file(song):
    """khung.duong_file, them mot duong lui: file da don ten khac phan duoi.

    Hong Kong 1 nam trong kho duoi ten  ...-da-don.musicxml  trong khi corpus ghi
    ten  .mxl  goc. Thieu duong lui nay thi ban ky am LON NHAT cua Ca Phao bi bo
    lang le, va n cua thay ay tut tu 828 xuong 525.
    """
    path = khung.duong_file(song)
    if path:
        return path
    ten = song.get('file') or ''
    goc = os.path.splitext(ten)[0]
    for thu in (os.path.join(khung.VIDEO, khung.THU_THAY.get(song.get('teacher'), '')),
                khung.VIDEO):
        if not os.path.isdir(thu):
            continue
        for f in os.listdir(thu):
            if f.startswith(goc) and f.lower().endswith(('.mxl', '.musicxml')):
                return os.path.join(thu, f)
    return None


def do_bai(song):
    path = tim_file(song)
    if not path:
        return None
    g = giong_ra_so(song.get('giong'))
    if not g:
        return None

    notes, hops = doc_ban(path)
    ra = []
    for ten_doan in SOLO:
        sec = (song.get('sections') or {}).get(ten_doan) or {}
        o = tuple(sec.get('bars') or ())
        if len(o) != 2:
            continue
        # GIONG CUA DOAN thang giong cua bai. Doan ket Co Em Cho chuyen sang Do
        # thang thu; do bang giong bai thi doan ay ra 63% ngoai gam va mot minh
        # no keo ca kho tu 2,8% len 4,2%.
        chu_am, the = giong_ra_so(sec.get('giong')) or g
        gam = GAM_TRUONG if the == 'truong' else GAM_THU_GOP
        gam_hep = GAM_TRUONG if the == 'truong' else GAM_THU_TN
        line = giai_dieu(notes, o[0], o[1])
        for i, (beat, bar, midi) in enumerate(line):
            el, cung_o = hop_tai(hops, beat, bar)
            muc = dict(bai=song['name'], doan=ten_doan, midi=midi, cung_o=cung_o,
                       bac_bai=(midi - chu_am) % 12,
                       trong_gam=((midi - chu_am) % 12) in gam,
                       trong_gam_hep=((midi - chu_am) % 12) in gam_hep,
                       ke=(line[i + 1][2] if i + 1 < len(line) else None),
                       truoc=(line[i - 1][2] if i else None))
            if el is not None:
                r = el.find('root')
                rp = don_hop_am._pc(r, 'root') if r is not None else None
                tap = don_hop_am.tap_not(el, gom_bass=False)
                if rp is not None and tap:
                    muc.update(goc=rp, bac_hop=(midi - rp) % 12,
                               trong_hop=(midi % 12) in tap,
                               nhom=chat_nhom(rp, tap), tap=tap)
            ra.append(muc)
    return ra


def gom(chi_thay=None):
    corpus = khung.nap_corpus()
    theo = collections.defaultdict(list)
    for song in corpus['songs']:
        thay = song.get('teacher')
        if chi_thay and thay != chi_thay:
            continue
        ra = do_bai(song)
        if ra:
            theo[thay].extend(ra)
    return theo


def phan_tram(a, b):
    return '{:.1f}%'.format(100.0 * a / b) if b else '—'


def in_thay(thay, muc):
    co_hop = [m for m in muc if 'bac_hop' in m]
    print('\n=== {} — {} not giai dieu, {} not co ky hieu hop am'
          .format(thay, len(muc), len(co_hop)))
    print('  trong gam bai   {}   (chi gam hep: {})'.format(
        phan_tram(sum(1 for m in muc if m['trong_gam']), len(muc)),
        phan_tram(sum(1 for m in muc if m['trong_gam_hep']), len(muc))))
    print('  not cua hop am  {}'.format(
        phan_tram(sum(1 for m in co_hop if m['trong_hop']), len(co_hop))))

    print('\n  BAC SO VOI GOC HOP AM, tach theo chat hop am:')
    for nhom in ('maj', 'dom', 'min', 'sus'):
        ns = [m for m in co_hop if m.get('nhom') == nhom]
        if len(ns) < 20:
            continue
        dem = collections.Counter(m['bac_hop'] for m in ns)
        hang = ' '.join(
            '{}:{:.0f}%'.format(TEN_BAC[b], 100.0 * n / len(ns))
            for b, n in sorted(dem.items(), key=lambda kv: -kv[1])
            if n / float(len(ns)) >= 0.02)
        print('    {:4} n={:4}  {}'.format(nhom, len(ns), hang))

    ngoai = [m for m in co_hop if not m['trong_hop']]
    print('\n  NOT NGOAI HOP AM: {} not — no di dau tiep?'.format(len(ngoai)))
    if ngoai:
        buoc = collections.Counter()
        for m in ngoai:
            if m['ke'] is None:
                buoc['het cau'] += 1
                continue
            d = m['ke'] - m['midi']
            # DOI QUANG TAM TACH RIENG. Gop no vao "nhay" thi tuong cac thay hay
            # bo not ngoai hop am bang mot cu nhay xa, trong khi phan lon la cung
            # mot not chuyen quang tam — khong phai mot buoc giai.
            buoc['lien bac' if 1 <= abs(d) <= 2 else
                 'lap lai' if d == 0 else
                 'quang ba' if 3 <= abs(d) <= 4 else
                 'doi quang tam' if abs(d) % 12 == 0 else 'nhay >=5'] += 1
        for k, n in buoc.most_common():
            print('    {:10} {}'.format(k, phan_tram(n, len(ngoai))))
        ke_hop = [m for m in ngoai if m['ke'] is not None and 'goc' in m]
        vao = sum(1 for m in ke_hop if (m['ke'] % 12) in m['tap'])
        print('    -> not ke tiep la NOT HOP AM: {} (n={})'
              .format(phan_tram(vao, len(ke_hop)), len(ke_hop)))

    ngoai_gam = [m for m in muc if not m['trong_gam']]
    print('\n  NOT NGOAI GAM BAI: {} not ({})'.format(
        len(ngoai_gam), phan_tram(len(ngoai_gam), len(muc))))
    if ngoai_gam:
        dem = collections.Counter(TEN_BAC[m['bac_bai']] for m in ngoai_gam)
        print('    bac so chu am:', ' '.join('{}:{}'.format(k, n) for k, n in dem.most_common()))
        hai_ben = 0
        for m in ngoai_gam:
            t, k = m['truoc'], m['ke']
            if t is not None and k is not None and abs(m['midi'] - t) <= 2 and abs(k - m['midi']) <= 2:
                hai_ben += 1
        print('    lien bac CA HAI BEN (luot/theu): {}'.format(phan_tram(hai_ben, len(ngoai_gam))))


def kiem():
    """Tu kiem: tai lap con so da chot trong LUAT-SOAN-NOT.md."""
    theo = gom()
    tong = sum(len(v) for v in theo.values())
    co_hop = [m for v in theo.values() for m in v if 'bac_hop' in m]
    hop = sum(1 for m in co_hop if m['trong_hop'])
    cung_o = [m for m in co_hop if m['cung_o']]
    print('tong not      {}   (da chot: 2169)'.format(tong))
    print('  -- phep dem A: hop am DANG VANG (mac dinh cua bo nay)')
    print('  co hop am   {}'.format(len(co_hop)))
    print('  not hop am  {}'.format(phan_tram(hop, len(co_hop))))
    print('  -- phep dem B: chi not co KY HIEU NGAY TRONG O (mau so cua md)')
    print('  co ky hieu  {}   (da chot: 1671)'.format(len(cung_o)))
    print('  not hop am  {}   (da chot: 67,7%)'.format(
        phan_tram(sum(1 for m in cung_o if m['trong_hop']), len(cung_o))))
    print('  {:9} {:>6} {:>10} {:>10} {:>10}'.format(
        'thay', 'n', 'hopam(A)', 'hopam(B)', 'ngoai gam'))
    for thay in sorted(theo):
        v = theo[thay]
        ch = [m for m in v if 'bac_hop' in m]
        cb = [m for m in ch if m['cung_o']]
        print('  {:9} {:6} {:>10} {:>10} {:>10}'.format(
            thay, len(v),
            phan_tram(sum(1 for m in ch if m['trong_hop']), len(ch)),
            phan_tram(sum(1 for m in cb if m['trong_hop']), len(cb)),
            phan_tram(sum(1 for m in v if not m['trong_gam']), len(v))))


if __name__ == '__main__':
    arg = sys.argv[1] if len(sys.argv) > 1 else None
    if arg == '--kiem':
        kiem()
    else:
        theo = gom(arg)
        for thay in sorted(theo):
            in_thay(thay, theo[thay])
