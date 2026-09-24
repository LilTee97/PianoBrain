# -*- coding: utf-8 -*-
"""DOAN KET giong THU — do de soan outro Bolero Tuan.

    python tools/sheet/ket_thu.py            # ca ba thay
    python tools/sheet/ket_thu.py --kiem     # tu kiem so da chot

VI SAO PHAI DO RIENG, KHONG MUON KHUNG INTRO

Intro va giang tau deu ket bang HUT V de keo vao phan hat ke tiep (`hutDungXa`
trong KeyTrain). Doan KET thi nguoc lai: no phai DONG BAI. Nen khong duoc chep
khung intro sang outro roi doi moi o cuoi — phai do xem cac thay dong bai the nao.

DO NHUNG GI

  1. so o, hop am cuoi, bac cua hop am cuoi so voi chu am
  2. not cuoi tay phai: bac so chu am (ket tren not nao)
  3. duong cao do theo o — outro co tut dan xuong khong
  4. mat do not RH va moc go LH theo o — co thua dan khong
  5. ti le moc LH go MOT MINH — hai tay doi dap hay dinh nhau

Cot moc da co san tu `boi_so.py`, doan ket giong thu:
  Linh Nhi 4 bai n=178 boi 1,131 · buoc nho 29,8% · day 4,37
  Ca Phao  2 bai n= 85 boi 1,416 · buoc nho 30,6% · day 4,74
  Ton Hung 2 bai n= 93 boi 1,233 · buoc nho 49,3% · day 3,45

So voi doan DAO giong thu cua chinh ho: Linh Nhi 1,549 · buoc nho 39,6%. Nen
doan ket ROI HOP AM HON va NHAY NHIEU HON doan dao — dung soan ket giong dao.
"""
from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import bac_not as B  # noqa: E402
import clone_do  # noqa: E402
import don_hop_am  # noqa: E402
import khung  # noqa: E402
import mxl  # noqa: E402

TEN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
BAC = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7']


def ten(m):
    return '%s%d' % (TEN[m % 12], m // 12 - 1)


def do_bai(song):
    """Tra ve dict so cua doan ket, hoac None."""
    sec = (song.get('sections') or {}).get('outro') or {}
    o = tuple(sec.get('bars') or ())
    if len(o) != 2:
        return None
    g = B.giong_ra_so(sec['giong']) if sec.get('giong') else B.giong_ra_so(song.get('giong'))
    if not g or g[1] != 'thu':
        return None
    chu_am = g[0]

    path = B.tim_file(song)
    if not path:
        return None
    root = mxl.load(path)
    ns, meta = mxl.notes(root)
    ns, bl, start = clone_do.sua_o(ns, meta)

    # Hop am trong doan
    hops = []
    for part in root.findall('part'):
        for measure in part.findall('measure'):
            bar = int(measure.get('number') or 0)
            if not (o[0] <= bar <= o[1]):
                continue
            for el in measure:
                if el.tag == 'harmony' and not don_hop_am.la_hoi(el):
                    r = el.find('root')
                    rp = don_hop_am._pc(r, 'root') if r is not None else None
                    if rp is not None:
                        hops.append((bar, rp, don_hop_am.chu(el)))
        break

    theo_o = []
    for x in range(o[0], o[1] + 1):
        ph = sorted([n for n in ns if n['bar'] == x and n['hand'] == 1],
                    key=lambda n: n['beat'])
        tr = [n for n in ns if n['bar'] == x and n['hand'] == 2]
        moc_ph = set(round(n['beat'], 3) for n in ph)
        moc_tr = set(round(n['beat'], 3) for n in tr)
        theo_o.append(dict(
            o=x, nph=len(ph), ntr=len(tr),
            rieng=len(moc_tr - moc_ph), moctr=len(moc_tr),
            cao=(sum(n['midi'] for n in ph) / float(len(ph))) if ph else None,
        ))

    cuoi = [n for n in ns if n['hand'] == 1 and o[0] <= n['bar'] <= o[1]]
    cuoi.sort(key=lambda n: n['beat'])
    not_cuoi = cuoi[-1] if cuoi else None

    co_cao = [t for t in theo_o if t['cao'] is not None]
    nua = len(co_cao) // 2 or 1
    # VONG HOP AM cua doan ket: chuoi bac + chat. Gop ky hieu lien tiep trung nhau.
    BAC_LA = ['i', 'bII', 'II', 'bIII', 'III', 'IV', 'bV', 'V', 'bVI', 'VI', 'bVII', 'VII']
    gon = []
    for bar, rp, chu in hops:
        if not gon or gon[-1][1] != chu:
            gon.append((rp, chu))
    # "Tron" = hop am ba hoac bay co ban, khong co add/sus/9/11/13/6.
    def la_tron(k):
        return not any(x in k for x in ('add', 'sus', '9', '11', '13', '6', '2'))
    tron = sum(1 for _, k in gon if la_tron(k))

    return dict(
        vong_bac=' - '.join(BAC_LA[(rp - chu_am) % 12] for rp, _ in gon),
        vong_ky=' '.join(k for _, k in gon),
        so_hop=len(gon), tron=tron,
        bai=song['name'], thay=song.get('teacher'), chu_am=chu_am,
        o=o, so_o=o[1] - o[0] + 1, theo_o=theo_o,
        hop_cuoi=(hops[-1] if hops else None),
        not_cuoi=not_cuoi,
        bac_cuoi=(not_cuoi['midi'] - chu_am) % 12 if not_cuoi else None,
        cao_dau=sum(t['cao'] for t in co_cao[:nua]) / nua if co_cao else None,
        cao_cuoi=sum(t['cao'] for t in co_cao[-nua:]) / nua if co_cao else None,
        nph_dau=sum(t['nph'] for t in theo_o[:nua]) / float(nua),
        nph_cuoi=sum(t['nph'] for t in theo_o[-nua:]) / float(nua),
        rieng_ti=(sum(t['rieng'] for t in theo_o) /
                  float(sum(t['moctr'] for t in theo_o) or 1)),
    )


def gom():
    ra = []
    for song in khung.nap_corpus()['songs']:
        r = do_bai(song)
        if r:
            ra.append(r)
    return ra


def main():
    ra = gom()
    print('=== DOAN KET GIONG THU — %d bai ===\n' % len(ra))
    for r in ra:
        h = r['hop_cuoi']
        bac_h = BAC[(h[1] - r['chu_am']) % 12] if h else '?'
        print('%-10s %-24s o %d-%d (%d o)' % (r['thay'], r['bai'][:24], r['o'][0], r['o'][1], r['so_o']))
        print('   hop am cuoi : %s  = bac %s cua giong' % (h[2] if h else '(khong)', bac_h))
        print('   not cuoi RH : %s  = bac %s' % (ten(r['not_cuoi']['midi']) if r['not_cuoi'] else '-',
                                                 BAC[r['bac_cuoi']] if r['bac_cuoi'] is not None else '-'))
        print('   cao do      : nua dau %.1f -> nua cuoi %.1f  (%+.1f)'
              % (r['cao_dau'], r['cao_cuoi'], r['cao_cuoi'] - r['cao_dau']))
        print('   not RH/o    : nua dau %.1f -> nua cuoi %.1f  (%+.1f)'
              % (r['nph_dau'], r['nph_cuoi'], r['nph_cuoi'] - r['nph_dau']))
        print('   LH go rieng : %.0f%%' % (100 * r['rieng_ti']))
        print('   VONG bac    : %s' % (r['vong_bac'] or '(khong co ky hieu)'))
        print('   VONG ky hieu: %s' % (r['vong_ky'] or '(khong)'))
        print('   hop am tron : %d/%d = %.0f%%'
              % (r['tron'], r['so_hop'], 100.0 * r['tron'] / (r['so_hop'] or 1)))
        print()

    print('--- GOP ---')
    n = len(ra)
    print('  so o          : %s  (trung binh %.1f)'
          % (' · '.join(str(r['so_o']) for r in ra), sum(r['so_o'] for r in ra) / float(n)))
    from collections import Counter
    c = Counter(BAC[r['bac_cuoi']] for r in ra if r['bac_cuoi'] is not None)
    print('  bac not cuoi  : %s' % ' · '.join('%s x%d' % (k, v) for k, v in c.most_common()))
    ch = Counter(BAC[(r['hop_cuoi'][1] - r['chu_am']) % 12] for r in ra if r['hop_cuoi'])
    print('  bac hop cuoi  : %s' % ' · '.join('%s x%d' % (k, v) for k, v in ch.most_common()))
    dc = [r['cao_cuoi'] - r['cao_dau'] for r in ra]
    print('  cao do doi    : %s  (trung binh %+.1f)'
          % (' · '.join('%+.1f' % d for d in dc), sum(dc) / float(n)))
    dn = [r['nph_cuoi'] - r['nph_dau'] for r in ra]
    print('  mat do doi    : %s  (trung binh %+.1f)'
          % (' · '.join('%+.1f' % d for d in dn), sum(dn) / float(n)))
    tt = sum(r['tron'] for r in ra)
    th = sum(r['so_hop'] for r in ra)
    print('  hop am TRON   : %d/%d = %.0f%%' % (tt, th, 100.0 * tt / (th or 1)))
    print('  so hop am/doan: %s  (trung binh %.1f)'
          % (' · '.join(str(r['so_hop']) for r in ra), th / float(n)))
    print('  LH go rieng   : %s  (trung binh %.0f%%)'
          % (' · '.join('%.0f%%' % (100 * r['rieng_ti']) for r in ra),
             100 * sum(r['rieng_ti'] for r in ra) / n))
    return ra


def kiem():
    """So chot 9/9/2026 — lech thi bao ra chu dung sua ngam."""
    ra = gom()
    loi = 0

    def cham(dat, nhan):
        nonlocal_loi = 0 if dat else 1
        print('%s %s' % ('OK  ' if dat else 'HONG', nhan))
        return nonlocal_loi

    loi += cham(len(ra) == 9, '9 bai giong thu co doan ket (co %d)' % len(ra))

    # Bac not chot: bac 5 la loi chinh (4/9), KHONG phai bac 1 (chi 2/9).
    bac = [BAC[r['bac_cuoi']] for r in ra if r['bac_cuoi'] is not None]
    loi += cham(bac.count('5') == 4, 'not chot bac 5: 4 bai (co %d)' % bac.count('5'))
    loi += cham(bac.count('1') == 2, 'not chot bac 1: 2 bai (co %d)' % bac.count('1'))

    # Duong dang: 7/9 bai di len o nua sau.
    len_ = sum(1 for r in ra if r['cao_cuoi'] - r['cao_dau'] > 0)
    loi += cham(len_ == 7, 'cao do di LEN o nua sau: 7/9 bai (co %d)' % len_)

    # Mat do thua dan.
    dn = sum(r['nph_cuoi'] - r['nph_dau'] for r in ra) / float(len(ra))
    loi += cham(abs(dn + 3.4) < 0.2, 'mat do doi -3,4 not/o (do %.1f)' % dn)

    return 1 if loi else 0


if __name__ == '__main__':
    if '--kiem' in sys.argv:
        sys.exit(kiem())
    main()
