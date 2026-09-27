# -*- coding: utf-8 -*-
"""Do cau solo (tay phai) va bass boogie (tay trai) trong "Boogie Woogie Basics" (Marco Brandt),
file dat trong video/Linh_Nhi/, da chia doan boi Codex (ingest/phan-doan-boogie-woogie.json).

    python tools/sheet/boogie_woogie_solo.py            # bang do
    python tools/sheet/boogie_woogie_solo.py --kiem     # kiem lai ranh doan cua Codex bang XML that

CHUA XAC MINH LA BAI CUA LINH NHI — credit trong file la Marco Brandt (xem ingest). Ket qua o day
KHONG duoc ghi vao linh-nhi-piano.md nhu phong cach cua chi; ghi rieng vao mot nguon Blues chung.

Doc bang tools/sheet/mxl.py. O 1 la o lay da bi doc du 4 phach du du lieu chi dai 1,5 — khong dung
bar_start lam moc TUYET DOI qua nhieu o; moi phep do o day deu tinh "phach trong o" = beat - bar_start[bar],
viec tru nay tu huy sai so cong don vi ca hai deu cung mot cursor lech.
"""
from __future__ import annotations

import collections
import json
import os
import sys
import zipfile
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mxl  # noqa: E402

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
SRC = os.path.join(ROOT, 'video', 'Linh_Nhi', 'boogie woogie-Linh Nhi.mxl')
INGEST = json.load(open(os.path.join(ROOT, 'ingest', 'phan-doan-boogie-woogie.json'), encoding='utf-8'))
TEN = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
BAC = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7']
EPS = 1e-6

# Bass goc moi o, tu ingest (khong co ky hieu hop am trong file). C = 0.
BASS = {}
for a, b, seq in [(6, 17, [0, 0, 0, 0, 5, 5, 0, 0, 7, 5, 0, 0]),
                   (22, 31, [0, 0, 0, 0, 5, 5, 0, 0, 7, 5])]:
    for i, r in enumerate(seq):
        BASS[a + i] = r


def doc():
    root = mxl.load(SRC)
    return mxl.notes(root)


def phach_trong_o(n, meta):
    return round(n['beat'] - meta['bar_start'][n['bar']], 4)


def go_tay_phai(ns, meta, a, b):
    """[(o, phach, truong_do, [midi...], la_lay)] cho tay phai trong [a,b]."""
    g = collections.defaultdict(list)
    for n in ns:
        if n['hand'] == 1 and a <= n['bar'] <= b and not n['tie_stop']:
            g[(n['bar'], phach_trong_o(n, meta))].append(n)
    ra = []
    for (bar, p), v in sorted(g.items()):
        midis = sorted(x['midi'] for x in v)
        dur = max(x['dur'] for x in v)
        la_lay = dur <= EPS or any(x['dur'] <= EPS for x in v)
        ra.append((bar, p, dur, midis, la_lay))
    return ra


def kiem_vach_kep(root):
    """Doi chieu 'vach kep sau o N' cua Codex voi <barline> that trong XML."""
    ra = {}
    for part in root.findall('part'):
        for measure in part.findall('measure'):
            bar = int(measure.get('number') or 0)
            for bl in measure.findall('barline'):
                style = bl.findtext('bar-style')
                if style:
                    ra[bar] = style
    return ra


def in_kiem():
    ns, meta = doc()
    root = mxl.load(SRC)
    vach = kiem_vach_kep(root)
    print('VACH KEP THAT (bar -> bar-style):', {k: v for k, v in sorted(vach.items())})
    print('Codex noi vach kep sau o: 5, 17, 21 (khong noi gi ve 31, 33 tru fermata)')
    for b in (1, 5, 17, 18, 21, 22, 31, 32, 33, 34):
        print(f'  o{b}: {vach.get(b, "(khong co barline dac biet)")}')
    # kiem so o: file phai co 34 o, khong ho khong chong (ingest da tu nhan)
    bars = sorted({n['bar'] for n in ns})
    print('So o thuc te trong file:', min(bars), '..', max(bars), '(', len(bars), 'o)')
    # kiem lay da: o 1 dai bao nhieu phach thuc su (not cuoi cung + truong do, khong tinh tie)
    o1 = [n for n in ns if n['bar'] == 1]
    het = max((n['beat'] - meta['bar_start'][1]) + n['dur'] for n in o1) if o1 else 0
    print('O 1 (lay da): not cuoi ket thuc o phach', het, '(ingest ghi 1.5)')
    # kiem bass goc B doi voi tung o trong BASS
    for a, b in [(6, 17), (22, 31)]:
        for bar in range(a, b + 1):
            lh = sorted(n['midi'] for n in ns if n['hand'] == 2 and n['bar'] == bar and not n['tie_stop'])
            goc_that = lh[0] % 12 if lh else None
            goc_ingest = BASS.get(bar)
            khop = 'OK' if goc_that == goc_ingest else f'LECH (ingest {TEN[goc_ingest]}, that {TEN[goc_that] if goc_that is not None else "?"})'
            print(f'  o{bar} bass tay trai thap nhat: {TEN[goc_that] if goc_that is not None else "(khong co)"} — {khop}')


def goc_bass_thuc(ns, bar):
    """Goc bass THAT cua mot o — not tay trai dau tien (khong tinh nop lay), tu chinh du lieu XML.

    Tong quat hon bang BASS (chi phu o 6-17, 22-31): dung duoc ca o 32-34, noi khong co bang tay.
    """
    lh = sorted((n for n in ns if n['hand'] == 2 and n['bar'] == bar and not n['tie_stop']
                 and n['dur'] > EPS), key=lambda n: n['beat'])
    return lh[0]['midi'] % 12 if lh else None


def hop_am_ngu(ns, bar):
    """Tap not hop am bay tren truong (bass la goc, chat truong bay — nghe blues/boogie chuan)."""
    r = goc_bass_thuc(ns, bar)
    if r is None:
        return set(), None
    return {r, (r + 4) % 12, (r + 7) % 12, (r + 10) % 12}, r


TONIC = 0  # C — tam chung ca bai, suy tu bass o cac o mo dau (khong doi theo tung o).


def do_solo(ns, meta, a, b, ten):
    """KHÔNG giả định trước một gam. In HISTOGRAM thật của các nốt đã vang (số đo), rồi mới
    đối chiếu với hợp âm đang vang (tren_hop_am) và với TONIC CỐ ĐỊNH của cả bài (tren_tonic) —
    hai con số khác nghĩa nhau, xem phần đọc kết quả trong tài liệu bàn giao.
    """
    go = go_tay_phai(ns, meta, a, b)
    C = collections.Counter()
    pc_hist = collections.Counter()
    tren_hop_am = 0
    tren_tonic = 0
    tong = 0
    bo_ba = 0
    lay = 0
    dao_phach = 0
    tops = []
    for bar, p, dur, midis, la_lay in go:
        if la_lay:
            lay += 1
            continue
        tap, r = hop_am_ngu(ns, bar)
        tong += 1
        khop_hop_am = any(m % 12 in tap for m in midis)
        khop_tonic = any(m % 12 in {TONIC, (TONIC + 3) % 12, (TONIC + 4) % 12, (TONIC + 5) % 12,
                                     (TONIC + 6) % 12, (TONIC + 7) % 12, (TONIC + 9) % 12} for m in midis)
        if khop_hop_am:
            tren_hop_am += 1
        if khop_tonic:
            tren_tonic += 1
        for m in midis:
            pc_hist[BAC[m % 12]] += 1
        if len(midis) >= 2:
            bo_ba += 1
        C['phach_' + str(round(p * 2) / 2)] += 1
        if abs(p - round(p * 2) / 2) > 0.01:
            dao_phach += 1
        top = midis[-1]
        tops.append((bar, p, top))
    print(f'\n== {ten}: o {a}-{b} ==')
    print(f'  so cu go tay phai (khong ke nop lay): {tong} · nop lay (grace): {lay}')
    print(f'  cu go co not khop hop am bay cua BASS O NAY (1-3-5-b7): {tren_hop_am}/{tong} ({100*tren_hop_am/max(1,tong):.0f}%)')
    print(f'  cu go co not khop tap 1-b3-3-4-b5-5-6 cua TONIC CO DINH ca bai (C): {tren_tonic}/{tong} ({100*tren_tonic/max(1,tong):.0f}%)')
    print(f'  cu go co >=2 not (be doi/hop am): {bo_ba}/{tong} ({100*bo_ba/max(1,tong):.0f}%)')
    print(f'  cu go lech luoi moc don (dao phach/swing-8): {dao_phach}/{tong}')
    print('  HISTOGRAM not that (so do, khong gia dinh gam truoc):', dict(pc_hist.most_common()))
    print('  phan bo phach trong o (x2 de doc moc don):', dict(sorted(C.items())))
    # cau chay: >=4 not lien tiep cach <=0.6 phach, cung chieu
    ch = 0
    i = 0
    while i < len(tops) - 3:
        j = i
        huong = 0
        while j + 1 < len(tops):
            b0, p0, m0 = tops[j]
            b1, p1, m1 = tops[j + 1]
            t0 = b0 * 4 + p0
            t1 = b1 * 4 + p1
            if t1 - t0 > 0.6 + EPS:
                break
            st = m1 - m0
            sg = (st > 0) - (st < 0)
            if st == 0 or (huong and sg != huong):
                break
            huong = sg
            j += 1
        if j - i + 1 >= 4:
            ch += 1
            i = j
        i += 1
    print(f'  cau chay (>=4 not lien tiep, cung chieu): {ch}')
    return go


def do_bass(ns, meta, a, b, ten):
    lh = collections.defaultdict(list)
    for n in ns:
        if n['hand'] == 2 and a <= n['bar'] <= b and not n['tie_stop']:
            lh[n['bar']].append(n)
    hinh = collections.Counter()
    for bar in range(a, b + 1):
        v = sorted(lh.get(bar, []), key=lambda n: n['beat'])
        bac = [((n['midi'] - (60 + BASS.get(bar, 0))) % 12) for n in v]
        hinh[tuple(BAC[x] for x in bac)] += 1
        so_not = len(v)
    print(f'\n== Bass tay trai {ten}: o {a}-{b} ==')
    print(f'  so cu go moi o (mau boogie): {dict(collections.Counter(len(lh.get(bar, [])) for bar in range(a, b + 1)))}')
    print('  hinh buoc bac (tuong doi goc bass), dem theo o:')
    for h, n in hinh.most_common():
        print('   ', ' '.join(h), '×', n)


if __name__ == '__main__':
    if '--kiem' in sys.argv:
        in_kiem()
    else:
        ns, meta = doc()
        do_bass(ns, meta, 6, 17, 'Vong blues 1')
        do_solo(ns, meta, 6, 17, 'Tay phai Vong blues 1 (comping)')
        do_bass(ns, meta, 22, 31, 'Vong blues 2 (than)')
        do_solo(ns, meta, 22, 31, 'Tay phai Vong blues 2 — CAU SOLO chinh')
        do_solo(ns, meta, 32, 34, 'Cau ket (outro)')
