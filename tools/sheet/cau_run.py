# -*- coding: utf-8 -*-
"""CAU RUN — chuoi moc don lien tuc o tay phai.

    python tools/sheet/cau_run.py                 # ca kho
    python tools/sheet/cau_run.py linh-nhi        # mot thay
    python tools/sheet/cau_run.py --kiem          # tu kiem tren Noi buon hoa phuong

KHAI NIEM NAY TU NGUOI DUNG, khong phai tu do dac. Khi tra loi phieu chia doan
bai *Noi buon hoa phuong* ngay 7/9/2026 ho viet:

  "o 20 hat toi not trang dau tien (duoi Dm) con lai la CAU RUN keo dai qua toi
   het dau lang ben o 21"
  "o 49 cung hat toi not trang dau o roi sau do CAU RUN nhung no ket run o dau
   lang trong o va sau dau lang la hat o ngay not den cung o"

Doc la **cau chay ngon** (run). Do la CACH CLAUDE HIEU, nguoi dung chua xac nhan
lai chu — nhung so lieu do dung: ca hai cho ho chi deu la chuoi moc don lien tuc,
va bo do nay bat dung ca diem dau lan diem cuoi cua chung.

DINH NGHIA DUNG O DAY

  * lay TUYEN GIAI DIEU tay phai — moi moc go mot not, not cao nhat
  * mot chuoi la day not co `dur <= 0.5` va cach nhau **dung 0.5 phach**
  * dai toi thieu `TOI_THIEU` not (mac dinh 6)

Nguong 6 chon theo hai cho nguoi dung da chi: chuoi o20 dai 14 not, chuoi o49
dai 13 not. Ha xuong 4 thi bat them nhieu manh vun hai ba not cua tiet tau dem;
nang len 8 thi mat hai chuoi 6 not o o30 va o58. **Chua co y kien nguoi dung ve
hai chuoi ngan ay** — chung la cho dang hoi neu can siet lai nguong.

KHONG NHAM VOI HAI BO KIA

  * `day_not.py`  — "day not" theo dinh nghia D, xet huong va buoc di, khong xet
                    truong do deu nhau. Nguong rieng tung thay trong `NGUONG`.
  * `chay_not.py` — bo cu cua Ca Phao, nguong 0,26; NGUOI DUNG DA CHOT khong doi.

Bo nay khac ca hai: no chi hoi mot cau — *"co phai mot day moc don deu khong"*.
"""
from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import clone_do  # noqa: E402
import khung  # noqa: E402
import mxl  # noqa: E402

TEN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
TOI_THIEU = 6


def ten(m):
    return '%s%d' % (TEN[m % 12], m // 12 - 1)


def tuyen(ns):
    """Moi moc go mot not — not cao nhat. Cung phep rut nhu bac_not.giai_dieu."""
    moc = {}
    for n in ns:
        if n['hand'] != 1:
            continue
        k = round(n['beat'], 3)
        if k not in moc or n['midi'] > moc[k]['midi']:
            moc[k] = n
    return [moc[k] for k in sorted(moc)]


def do_bai(song, toi_thieu=TOI_THIEU):
    path = khung.duong_file(song)
    if not path:
        return []
    ns, meta = mxl.notes(mxl.load(path))
    ns, bl, start = clone_do.sua_o(ns, meta)
    v = tuyen(ns)
    if not v:
        return []

    ra, cur = [], [v[0]]
    for a, b in zip(v, v[1:]):
        lien = a['dur'] <= 0.5 and abs((b['beat'] - a['beat']) - 0.5) < 0.01
        if lien:
            cur.append(b)
        else:
            if len(cur) >= toi_thieu:
                ra.append(cur)
            cur = [b]
    if len(cur) >= toi_thieu:
        ra.append(cur)
    return ra


def doan_cua(song, o):
    """O nay thuoc doan nao trong `sections`."""
    for ten_doan, s in (song.get('sections') or {}).items():
        b = s.get('bars') or ()
        if len(b) == 2 and b[0] <= o <= b[1]:
            return ten_doan
    return '?'


def in_bai(song, chuoi):
    print('\n=== %s (%s) — %d chuoi ===' % (song['name'], song.get('teacher'), len(chuoi)))
    for c in chuoi:
        print('  o%-3d ph %-5.2f -> o%-3d ph %-5.2f  %2d not  [%s]  %s'
              % (c[0]['bar'], c[0].get('off', 0), c[-1]['bar'], c[-1].get('off', 0),
                 len(c), doan_cua(song, c[0]['bar']),
                 ' '.join(ten(n['midi']) for n in c[:8]) + (' ...' if len(c) > 8 else '')))


def kiem():
    """Tai lap hai cau run nguoi dung da chi trong Noi buon hoa phuong."""
    song = next(s for s in khung.nap_corpus()['songs']
                if s['name'] == 'Noi buon hoa phuong')
    chuoi = do_bai(song)
    can = [(20, 2.0, 21, 0.5), (49, 2.5, 49, 8.5)]
    print('Noi buon hoa phuong — %d chuoi, can co %d cho nguoi dung da chi'
          % (len(chuoi), len(can)))
    loi = 0
    for o1, p1, o2, p2 in can:
        thay = [c for c in chuoi
                if c[0]['bar'] == o1 and abs(c[0].get('off', 0) - p1) < 0.01
                and c[-1]['bar'] == o2 and abs(c[-1].get('off', 0) - p2) < 0.01]
        if thay:
            print('  OK   o%d ph %.1f -> o%d ph %.1f  (%d not)'
                  % (o1, p1, o2, p2, len(thay[0])))
        else:
            print('  HONG o%d ph %.1f -> o%d ph %.1f  KHONG BAT DUOC' % (o1, p1, o2, p2))
            loi += 1
    return 1 if loi else 0


def main():
    if '--kiem' in sys.argv:
        sys.exit(kiem())
    thay = next((a for a in sys.argv[1:] if not a.startswith('-')), None)
    tong = 0
    for song in khung.nap_corpus()['songs']:
        if thay and song.get('teacher') != thay:
            continue
        chuoi = do_bai(song)
        if chuoi:
            in_bai(song, chuoi)
            tong += len(chuoi)
    print('\nTONG %d chuoi.' % tong)


if __name__ == '__main__':
    main()
