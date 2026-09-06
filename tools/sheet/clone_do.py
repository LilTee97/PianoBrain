# -*- coding: utf-8 -*-
"""Do phong cach mot thay, dung bo cau hoi ingest/CLONE-PHONG-CACH.md.

    python tools/sheet/clone_do.py ton-hung ballad

Chi nap bai cua DUNG thay (va the loai neu chi dinh). Khong doc thay khac.
"""
from __future__ import annotations

import collections
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import chay_not  # noqa: E402
import khung  # noqa: E402
import mxl  # noqa: E402
import profile  # noqa: E402

SOLO = {'intro', 'interlude', 'outro'}
NAMES = profile.NAMES
GAM = {
    'pent_maj': (0, 2, 4, 7, 9),
    'pent_min': (0, 3, 5, 7, 10),
    'major': (0, 2, 4, 5, 7, 9, 11),
    'nat_min': (0, 2, 3, 5, 7, 8, 10),
    'harm_min': (0, 2, 3, 5, 7, 8, 11),
    'blues': (0, 3, 5, 6, 7, 10),
}


def sua_o(ns, meta):
    bl = meta['barlens']
    start, acc = {}, 0.0
    for o in sorted(bl):
        start[o] = acc
        acc += bl[o]
    for n in ns:
        o = n['bar']
        while o in start and o + 1 in start and n['beat'] >= start[o] + bl[o] - 1e-6:
            o += 1
        n['bar'] = o
        n['off'] = round((n['beat'] - start.get(o, n['beat'])) * 8) / 8
    return ns, bl, start


def moc(ns):
    out = {}
    for n in ns:
        out.setdefault((n['bar'], round(n['beat'], 3)), []).append(n)
    return out


def trong_doan(ns, a, b):
    return [n for n in ns if a <= n['bar'] <= b]


def hop_chuoi(chords, a, b):
    prev, run, out = None, 0, []
    for o in range(a, b + 1):
        sym = (chords.get(o) or {}).get('symbol', '?')
        if sym == prev:
            run += 1
        else:
            if prev:
                out.append(f'{prev}x{run}' if run > 1 else prev)
            prev, run = sym, 1
    if prev:
        out.append(f'{prev}x{run}' if run > 1 else prev)
    return ' '.join(out)


def tot_gam(pcs, tonic, shape):
    if not pcs:
        return 0.0
    hop = {(tonic + x) % 12 for x in shape}
    return sum(1 for p in pcs if p in hop) / len(pcs)


def in_hang(tieu, gia):
    print(f'  {tieu:28} {gia}')


def do_bai(song):
    path = khung.duong_file(song)
    if not path:
        print(f"THIEU file {song['name']}")
        return None
    ns, meta = mxl.notes(mxl.load(path))
    ns, bl, start = sua_o(ns, meta)
    nbars = song.get('bars') or max(bl)
    left = [n for n in ns if n['hand'] == 2]
    right = [n for n in ns if n['hand'] == 1]
    chords = profile.harmony(left, bl, nbars)
    secs = song.get('sections') or {}
    return dict(song=song, ns=ns, bl=bl, start=start, nbars=nbars,
                left=left, right=right, chords=chords, secs=secs)


def o_loai(secs, loai):
    out = []
    for k, sec in secs.items():
        if k in loai:
            out.append((k, sec['bars'][0], sec['bars'][1]))
    return out


def do_tay_trai(ns, a, b):
    trai = [n for n in trong_doan(ns, a, b) if n['hand'] == 2]
    so_o = b - a + 1
    mt = moc(trai)
    vi = collections.Counter()
    chu_ky = collections.Counter()
    bass_pc = collections.Counter()
    chong = 0
    for (o, beat), g in mt.items():
        off = round(g[0]['off'] * 8) / 8 if g[0].get('off') is not None else 0
        vi[off] += 1
        if len({n['midi'] for n in g}) > 1:
            chong += 1
        bass_pc[min(n['midi'] for n in g) % 12] += 1
    theo_o = collections.defaultdict(list)
    for (o, beat), g in mt.items():
        theo_o[o].append(round(g[0]['off'] * 8) / 8)
    for o, offs in theo_o.items():
        chu_ky[tuple(sorted(set(offs)))] += 1
    return dict(
        so_o=so_o,
        moc_moi_o=round(len(mt) / so_o, 2),
        chong=round(chong / max(1, len(mt)), 2),
        vi_tri=[(o, round(c / so_o, 2)) for o, c in sorted(vi.items()) if c / so_o >= 0.15],
        chu_ky=chu_ky.most_common(3),
        bass=[(NAMES[p], c) for p, c in bass_pc.most_common(4)],
    )


def do_solo_not(ns, chords, a, b):
    phai = [n for n in trong_doan(ns, a, b) if n['hand'] == 1]
    pcs = [n['midi'] % 12 for n in phai]
    trong = ngoai = 0
    for n in phai:
        ch = chords.get(n['bar'])
        if not ch:
            continue
        if n['midi'] % 12 in ch['tones']:
            trong += 1
        else:
            ngoai += 1
    cs = chay_not.chuoi(phai)
    return dict(
        not_moi_o=round(len(phai) / max(1, b - a + 1), 1),
        hop_am=round(trong / max(1, trong + ngoai), 2),
        so_cau_chay=len(cs),
        dai_cau=[len(c) for c in cs][:8],
        pcs=pcs,
        midi=[n['midi'] for n in phai],
    )


def do_nhuong(ns, a, b):
    trong = trong_doan(ns, a, b)
    phai = [n for n in trong if n['hand'] == 1]
    trai = [n for n in trong if n['hand'] == 2]
    cs = chay_not.chuoi(phai)
    o_chay = {c[0][3] for c in cs} | {c[-1][3] for c in cs}
    def moc_o(notes, o):
        return len({(n['bar'], round(n['beat'], 3)) for n in notes if n['bar'] == o})
    chay = [moc_o(trai, o) for o in o_chay] if o_chay else []
    khac = [moc_o(trai, o) for o in range(a, b + 1) if o not in o_chay]
    mt, mp = moc(trai), moc(phai)
    chung = set(mt) & set(mp)
    nhan = 0
    for k in chung:
        lop = {n['midi'] % 12 for n in mt[k]}
        if any((n['midi'] % 12) in lop for n in mp[k]):
            nhan += 1
    p1t = p1p = 0
    so_o = b - a + 1
    for o in range(a, b + 1):
        g = [n for n in trong if n['bar'] == o]
        if not g:
            continue
        b0 = min(n['beat'] for n in g)
        if any(n['hand'] == 2 and abs(n['beat'] - b0) < 0.05 for n in g):
            p1t += 1
        if any(n['hand'] == 1 and abs(n['beat'] - b0) < 0.05 for n in g):
            p1p += 1
    return dict(
        o_co_chay=len(o_chay),
        trai_khi_chay=round(sum(chay) / len(chay), 2) if chay else None,
        trai_khi_khong=round(sum(khac) / len(khac), 2) if khac else None,
        moc_chung=round(len(chung) / max(1, len(set(mt) | set(mp))), 2),
        nhan_ban=round(nhan / max(1, len(chung)), 2),
        phach1_trai=round(p1t / so_o, 2),
        phach1_phai=round(p1p / so_o, 2),
        day=min((n['midi'] for n in trai), default=None),
        tran=max((n['midi'] for n in phai), default=None),
    )


def bao_bai(d):
    s = d['song']
    print(f"\n==== {s['name']}  the loai={s['genre']}  {d['nbars']} o ====")
    print('  -- hop am (tay TRAI, may doan) --')
    for k, a, b in o_loai(d['secs'], set(d['secs'])):
        print(f'  {k:16} {a}-{b:>3}  {hop_chuoi(d["chords"], a, b)}')
    print('  -- tay trai (dem) --')
    for k, a, b in o_loai(d['secs'], set(d['secs'])):
        t = do_tay_trai(d['ns'], a, b)
        ky = ' | '.join(str(x[0]) + f' x{x[1]}' for x in t['chu_ky'])
        vi = ' '.join(f'{o:g}:{c}' for o, c in t['vi_tri'])
        print(f'  {k:16} moc/o {t["moc_moi_o"]:<4} chong {t["chong"]:<4}  vi {vi}  ky {ky}')
    print('  -- nốt tay PHAI doan solo --')
    solo_pcs = []
    for k, a, b in o_loai(d['secs'], SOLO):
        r = do_solo_not(d['ns'], d['chords'], a, b)
        solo_pcs.extend(r['pcs'])
        print(f'  {k:16} {r["not_moi_o"]} n/o  hop-am {r["hop_am"]}  '
              f'cau-chay {r["so_cau_chay"]} dai {r["dai_cau"]}')
    if solo_pcs:
        print('  -- gam khop RH solo (thu 12 tonic, chi in >=80%) --')
        for ten, shape in GAM.items():
            best = max(((t, tot_gam(solo_pcs, t, shape)) for t in range(12)),
                       key=lambda x: x[1])
            if best[1] >= 0.8:
                print(f'    {ten:10} tonic {NAMES[best[0]]}  {best[1]:.0%}')
    print('  -- hai tay doan solo --')
    for k, a, b in o_loai(d['secs'], SOLO):
        h = do_nhuong(d['ns'], a, b)
        print(f'  {k:16} chay {h["o_co_chay"]}o  LH chay {h["trai_khi_chay"]} '
              f'/ khong {h["trai_khi_khong"]}  chung {h["moc_chung"]} nhan {h["nhan_ban"]}  '
              f'P1 T{h["phach1_trai"]} P{h["phach1_phai"]}  day {h["day"]} tran {h["tran"]}')
    sung = o_loai(d['secs'], set(d['secs']) - SOLO)
    if sung:
        print('  -- hai tay doan HAT (nen so sanh) --')
        for k, a, b in sung:
            h = do_nhuong(d['ns'], a, b)
            r = do_solo_not(d['ns'], d['chords'], a, b)
            print(f'  {k:16} {r["not_moi_o"]} n/o  hop-am {r["hop_am"]}  '
                  f'LH moc {h["trai_khi_khong"]}  P1 T{h["phach1_trai"]} P{h["phach1_phai"]}')


def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    thay = sys.argv[1] if len(sys.argv) > 1 else ''
    the = ' '.join(sys.argv[2:]).lower() if len(sys.argv) > 2 else ''
    if not thay:
        sys.exit('dung: python tools/sheet/clone_do.py <teacher_id> [the loai]')
    bai = []
    for s in khung.nap_corpus()['songs']:
        if s.get('teacher') != thay:
            continue
        if the and (s.get('genre') or '').lower() != the:
            continue
        if not khung.duong_file(s):
            continue
        bai.append(s)
    print(f'CLONE {thay}  the-loai={the or "(moi)"}  n={len(bai)}')
    print('chi do file cua thay nay. hop am = may doan tu TAY TRAI, khong phai ky hieu tren ban.')
    for s in bai:
        d = do_bai(s)
        if d:
            bao_bai(d)
            import luu_solo
            da = luu_solo.luu_bai(d)
            if da:
                print('  luu %s cau solo -> data/sheet-solos/' % da)


if __name__ == '__main__':
    main()
