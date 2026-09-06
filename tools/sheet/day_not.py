# -*- coding: utf-8 -*-
"""DAY NOT — dinh nghia D, dat rieng cho tung thay.

    python tools/sheet/day_not.py linh-nhi
    python tools/sheet/day_not.py linh-nhi --chuoi     # in tung chuoi

VI SAO KHONG DUNG `chay_not.py`. Bo ay viet cho CA PHAO — bossa nova, cau chay
mocs kep rat ro, nen `NHANH = 0.26`. Linh Nhi choi bolero ~60-70 BPM, o do moc
DON (0,5) da la mat chay. Doi thang hang so trong `chay_not.py` la lam hong phep
do cua Ca Phao, nen bo nay dung rieng va nhan NGUONG THEO THAY.

BON CHO `chay_not.chuoi()` LAM RA CHUOI RAC — OpenCode kiem tren file that:

  * `max(midi)` moi moc go: khuong tay phai co ca NOT DAP TRAM xen giua tuyen
    giai dieu, nen phep lay not cao nhat luc dinh be cao luc dinh be tram.
    La Thu ket o 106: moc 2,75 co `G6 + A4`, moc 3,25 co `D7 + G4`, moc 3,5 chi
    con `A4/G4` — doc ra buoc `D7 -> A4` = **-29 nua cung**, khong ai soan the.
  * KHONG cat o vach nhip: Dung Xa ket o 84 dong bang `D7` o phach 3,625, o 85
    mo bang `E5`; khe 0,375 nho hon `dur x 1.6` nen hai cu chi khac tang dinh lam
    mot, ra buoc **-22**.
  * `min(dur)` cua ca moc: moc 2,5 cua La Thu co `A6` ngan 1,0 chong `G5` 0,25 —
    lay min thi mot not DAI bi doc thanh not nhanh.
  * Khong tach RAI HOP AM khoi CHAY LIEN BAC: hai thu nghe khac han nhau.

DINH NGHIA D (OpenCode chot):

  1. Moi moc chon not GAN not truoc nhat — di theo mot be, khong `max(midi)`.
  2. Cat khi |delta| > 8 nua cung; tru dung +-12 roi buoc sau tiep cung huong.
  3. Bo NOT DAP TRAM: midi < (trung vi tay phai cua doan - 12).
  4. Cat o VACH NHIP, hoac khi nghi > 0,4 phach.
  5. Not duoc chon phai ngan <= 0,5; trong chuoi cam not > 0,75.
  6. >= 4 moc, va buoc LAP cung cao do khong tinh vao do dai.
  7. Nguong 0,50 cho Linh Nhi. Ca Phao giu 0,26 o `chay_not.py`.

MOT CHO LECH VOI CHU CUA PHIEU, ghi ra de khong ai tuong la sot: phieu viet
`min(dur)` cua moc, con day lay do ngan cua CHINH NOT DUOC CHON. Cung mot y —
va lay min thi sap dung cai bay so 3 o tren.
"""
from __future__ import annotations

import collections
import os
import sys
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bac_not as B  # noqa: E402
import clone_do  # noqa: E402
import khung  # noqa: E402
import mxl  # noqa: E402

DOAN = ('intro', 'interlude', 'outro')
NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

# Nguong theo thay. THEM THAY MOI THI THEM DONG, dung sua dong cua thay khac.
NGUONG = {
    'linh-nhi': dict(nhanh=0.50, tran=0.75, nghi=0.40, nhay=8, toi_thieu=4),
    'ca-phao': dict(nhanh=0.26, tran=0.50, nghi=0.40, nhay=8, toi_thieu=4),
    'ton-hung': dict(nhanh=0.50, tran=0.75, nghi=0.40, nhay=8, toi_thieu=4),
}

ten = lambda m: NAMES[m % 12] + str(m // 12 - 1)  # noqa: E731


def doc_bai(song):
    """Not tay phai, da vá so o bang `clone_do.sua_o` — bat buoc, xem `tuyen_o.py`."""
    path = B.tim_file(song)
    if not path:
        return None
    root = mxl.load(path) if path.lower().endswith('.mxl') else ET.parse(path).getroot()
    ns, meta = mxl.notes(root)
    ns, bl, dau_o = clone_do.sua_o(ns, meta)
    return [n for n in ns if n['hand'] == 1], bl


def tuyen_mot_be(notes, san):
    """Rut MOT be tu cac moc go: moi moc lay not gan not truoc nhat.

    `san` la day khong lay not nao thap hon — chinh la luat 3 (not dap tram).
    Moc dau chua co not truoc thi lay not CAO NHAT: dau cau la cho tuyen giai
    dieu vao, va not tram o day gan nhu luon la not dem.
    """
    moc = collections.defaultdict(list)
    for n in notes:
        if n['midi'] >= san:
            moc[round(n['beat'], 4)].append(n)
    ra, truoc = [], None
    for at in sorted(moc):
        g = moc[at]
        if truoc is None:
            chon = max(g, key=lambda x: x['midi'])
        else:
            chon = min(g, key=lambda x: (abs(x['midi'] - truoc), -x['midi']))
        ra.append(dict(beat=at, midi=chon['midi'], dur=chon['dur'],
                       bar=chon['bar'], off=chon.get('off')))
        truoc = chon['midi']
    return ra


def cat_chuoi(line, ng):
    """Cat tuyen thanh cac chuoi theo luat D."""
    ra, cum = [], []

    def dong():
        if dai_hieu_dung(cum) >= ng['toi_thieu']:
            ra.append(list(cum))
        cum.clear()

    for i, n in enumerate(line):
        if n['dur'] > ng['nhanh']:
            dong()
            continue
        if not cum:
            cum.append(n)
            continue
        t = cum[-1]
        # Luat 4 — vach nhip va cho nghi.
        if n['bar'] != t['bar'] or n['beat'] - t['beat'] - t['dur'] > ng['nghi']:
            dong()
            cum.append(n)
            continue
        d = n['midi'] - t['midi']
        # Luat 2 — cu nhay xa cat chuoi, tru doi quang tam roi di tiep cung huong.
        if abs(d) > ng['nhay']:
            giu = False
            if abs(d) == 12 and i + 1 < len(line):
                sau = line[i + 1]['midi'] - n['midi']
                giu = sau != 0 and (sau > 0) == (d > 0)
            if not giu:
                dong()
                cum.append(n)
                continue
        # Luat 5 — trong chuoi cam not qua dai.
        if n['dur'] > ng['tran']:
            dong()
            continue
        cum.append(n)
    dong()
    return ra


def dai_hieu_dung(cum):
    """Do dai chuoi, KHONG tinh buoc lap cung cao do — luat 6."""
    if not cum:
        return 0
    n = 1
    for a, b in zip(cum, cum[1:]):
        if b['midi'] != a['midi']:
            n += 1
    return n


def loai(cum):
    """Chuoi nay la CHAY LIEN BAC hay RAI HOP AM — cau 3 cua phieu."""
    b = [abs(y['midi'] - x['midi']) for x, y in zip(cum, cum[1:])]
    b = [x for x in b if x not in (0, 12)]
    if not b:
        return 'lặp'
    lien = sum(1 for x in b if x <= 2)
    rai = sum(1 for x in b if 3 <= x <= 4)
    if lien > rai:
        return 'liền bậc'
    if rai > lien:
        return 'rải hợp âm'
    return 'trộn'


def deu_truong_do(cum):
    """Truong do trong chuoi gan bang nhau — cu chi chay, khong tron den + moc."""
    d = [n['dur'] for n in cum if n['dur'] > 0]
    if len(d) < 2:
        return True
    return max(d) / min(d) <= 2.0


def huong_nhat_quan(cum):
    """|tong buoc| / tong |buoc| — 1 = mot chieu, 0 = di ve."""
    b = [y['midi'] - x['midi'] for x, y in zip(cum, cum[1:]) if y['midi'] != x['midi']]
    b = [x for x in b if abs(x) != 12]
    if not b:
        return 0.0
    s = sum(abs(x) for x in b)
    return abs(sum(b)) / s if s else 0.0


def it_nhay(cum):
    """Ti le buoc 5-8 nua cung — nhay giai dieu, khong phai day."""
    b = [abs(y['midi'] - x['midi']) for x, y in zip(cum, cum[1:])]
    b = [x for x in b if x not in (0, 12)]
    if not b:
        return 0.0
    return sum(1 for x in b if 5 <= x <= 8) / len(b)


def cu_chi(cum):
    """Vong hai: day = deu nhip + co huong + it nhay 5-8."""
    return deu_truong_do(cum) and huong_nhat_quan(cum) >= 0.45 and it_nhay(cum) < 0.30


def do_thay(thay, in_chuoi=False):
    ng = NGUONG.get(thay) or NGUONG['linh-nhi']
    corpus = khung.nap_corpus()
    theo_doan = collections.Counter()
    theo_bai = collections.Counter()
    theo_loai = collections.Counter()
    buoc = collections.Counter()
    tat = []
    for song in corpus['songs']:
        if song.get('teacher') != thay:
            continue
        d = doc_bai(song)
        if not d:
            print('THIEU FILE:', song['name'])
            continue
        notes, bl = d
        for doan in DOAN:
            sec = (song.get('sections') or {}).get(doan) or {}
            o = sec.get('bars')
            if not o:
                continue
            trong = [n for n in notes if o[0] <= n['bar'] <= o[1]]
            if not trong:
                continue
            # Luat 3 — day cat not dap tram, tinh tren TRUNG VI cua chinh doan ay.
            cao = sorted(n['midi'] for n in trong)
            tv = cao[len(cao) // 2]
            line = tuyen_mot_be(trong, tv - 12)
            for cum in cat_chuoi(line, ng):
                k = loai(cum)
                theo_doan[doan] += 1
                theo_bai[song['name']] += 1
                theo_loai[k] += 1
                for x, y in zip(cum, cum[1:]):
                    buoc[abs(y['midi'] - x['midi'])] += 1
                tat.append((song['name'], doan, cum, k))
    return theo_doan, theo_bai, theo_loai, buoc, tat


def main():
    thay = sys.argv[1] if len(sys.argv) > 1 else 'linh-nhi'
    in_chuoi = '--chuoi' in sys.argv
    v2 = '--v2' in sys.argv
    doan, bai, lo, buoc, tat = do_thay(thay, in_chuoi)
    ng = NGUONG.get(thay) or NGUONG['linh-nhi']
    print('=== %s — dinh nghia D, nguong %s' % (thay, ng))
    print('TONG: %d chuoi' % sum(doan.values()))
    print('  theo doan :', dict(doan))
    print('  theo bai  :', dict(bai))
    print('  theo loai :', dict(lo))
    tong_b = sum(buoc.values())
    if tong_b:
        lien = sum(v for k, v in buoc.items() if 1 <= k <= 2)
        rai = sum(v for k, v in buoc.items() if 3 <= k <= 4)
        lap = buoc.get(0, 0)
        oct_ = buoc.get(12, 0)
        xa = tong_b - lien - rai - lap - oct_
        print('  buoc (n=%d): lien bac %.0f%% | rai 3-4 %.0f%% | lap %.0f%% | '
              'quang tam %.0f%% | khac %.0f%%'
              % (tong_b, 100 * lien / tong_b, 100 * rai / tong_b, 100 * lap / tong_b,
                 100 * oct_ / tong_b, 100 * xa / tong_b))
    if v2:
        loc = [x for x in tat if cu_chi(x[2])]
        print()
        print('--- vong 2: deu nhip (max/min dur<=2) + huong>=0.45 + nhay5-8<30%% ---')
        print('TONG: %d chuoi (tu %d)' % (len(loc), len(tat)))
        lo2 = collections.Counter(k for *_, k in loc)
        do2 = collections.Counter(dn for _, dn, _, k in loc)
        ba2 = collections.Counter(b for b, _, _, k in loc)
        print('  theo doan :', dict(do2))
        print('  theo bai  :', dict(ba2))
        print('  theo loai :', dict(lo2))
        for b, dn, cum, k in loc:
            print('  %-20s %-10s o%-4d %-11s %s'
                  % (b[:20], dn, cum[0]['bar'], k,
                     ' '.join(ten(x['midi']) for x in cum)))
        return

    if in_chuoi:
        print()
        for b, dn, cum, k in tat:
            print('  %-20s %-10s ô%-4d phách %-5s %-11s %s'
                  % (b[:20], dn, cum[0]['bar'], cum[0].get('off'), k,
                     ' '.join(ten(x['midi']) for x in cum)))


if __name__ == '__main__':
    main()
