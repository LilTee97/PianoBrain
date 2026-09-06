# -*- coding: utf-8 -*-
"""BOI SO bam hop am — thuoc de so cau solo cua APP voi cau solo cua THAY.

    python tools/sheet/boi_so.py                 # ca ba thay, moi doan solo
    python tools/sheet/boi_so.py linh-nhi        # mot thay
    python tools/sheet/boi_so.py --kiem          # tu kiem: tai lap so da chot

VI SAO KHONG DUNG TI LE THO

Ti le not trung hop am THO khong so duoc giua hai VON HOP AM khac nhau. Mot bo
soan dung `Cadd2 · Dm11 · G9sus4` co san nhieu not hon mot ban ky am dung hop am
ba tron, nen no "trung hop am" nhieu hon ma chua chac bam chat hon.

Nen thuoc la BOI SO so voi ngau nhien:

    boi so = (ti le not trung hop am) / (ti le trung neu rai bua trong gam)

Mau so tinh cho TUNG NOT, khong phai mot hang so chung: voi moi not, dem xem
trong bay bac cua gam co bao nhieu bac nam trong hop am dang vang, chia bay. Hop
am cang day thi mau so cang lon, nen boi so tu can bang lai.

  boi so = 1  -> khong khac gi rai bua trong gam
  boi so > 1  -> co bam vao hop am

DUNG BO NAY LAM GI

`D:\\KeyTrain\\src\\reharm\\style\\__tests__\\boiSoTuoiSang.test.ts` cham cau dao
giong truong cua app bang DUNG cong thuc nay, roi so voi khoang cua Linh Nhi.
Truoc khi co file nay, ba con so moc ay chi nam trong chinh bai kiem do agent go
tay — khong tra nguoc duoc ve ban ky am. Day la cho tra nguoc.

DO CUNG MOT CACH VOI PHIA APP — cho nay de lech mau so, doc ky:

  * Lay TUYEN GIAI DIEU: not cao nhat moi moc go (`bac_not.giai_dieu`), khong lay
    moi not. Phia app cung chi cham `notes[0]` cua moi su kien.
  * Hop am la hop am DANG VANG (phep dem A cua `bac_not`), khong phai "ky hieu
    nam trong cung o". Doi sang phep dem B se ra so khac.
  * `tap_not(gom_bass=False)` — bo not bass cua hop am nghieng, giong phia app
    chi dung `quality.intervals`.
  * Giong thu lay gam tu nhien (bay bac) chu khong lay gam gop chin bac, de mau
    so van la 7 nhu phia app.

BUOC NHO cham kem: ti le hai not lien tiep cach nhau 1..4 nua cung (lien bac
cong quang ba). Phia app cham y het.
"""
from __future__ import annotations

import collections
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
# Ten bai co dau tieng Viet; console Windows mac dinh cp1252 nen se sap khi in.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import bac_not as B  # noqa: E402
import khung  # noqa: E402

# Bay bac, de mau so luon la 7 o ca hai the. Giong thu KHONG dung gam gop chin
# bac cua `bac_not` — gop vao thi mau so thanh 9 va boi so tut gia tao.
GAM = {'truong': B.GAM_TRUONG, 'thu': B.GAM_THU_TN}


def cham(muc):
    """Cham mot doan: tra dict so, hoac None neu doan khong co not nao co hop am."""
    co = [m for m in muc if m.get('tap')]
    if not co:
        return None

    trung = sum(1 for m in co if m['trong_hop'])
    ngau = 0.0
    for m in co:
        gam = set((m['chu_am'] + g) % 12 for g in GAM[m['the']])
        ngau += len(gam & set(m['tap'])) / 7.0

    # Buoc nho tinh tren TOAN doan, ke ca not khong co hop am — day la khoang
    # cach giua hai not lien tiep, khong dinh gi toi hop am.
    buoc = [abs(muc[i]['midi'] - muc[i - 1]['midi']) for i in range(1, len(muc))]
    nho = sum(1 for d in buoc if 1 <= d <= 4)

    return dict(n=len(co), tho=trung / float(len(co)), ngau=ngau / len(co),
                boi=trung / ngau if ngau else 0.0,
                day=sum(len(m['tap']) for m in co) / float(len(co)),
                nho=nho / float(len(buoc)) if buoc else 0.0,
                the=co[0]['the'])


def gom(chi_thay=None):
    """{(thay, bai, doan): so}. Giu nguyen thu tu not trong moi doan."""
    ra = {}
    for song in khung.nap_corpus()['songs']:
        thay = song.get('teacher')
        if chi_thay and thay != chi_thay:
            continue
        muc = B.do_bai(song)
        if not muc:
            continue
        theo = collections.OrderedDict()
        for m in muc:
            theo.setdefault(m['doan'], []).append(m)
        for doan, ds in theo.items():
            so = cham(ds)
            if so:
                ra[(thay, song['name'], doan)] = so
    return ra


def in_bang(ra, chi_the=None):
    print('%-10s %-26s %-10s %4s %6s %6s %6s %6s %6s'
          % ('thay', 'bai', 'doan', 'n', 'tho', 'ngau', 'BOI', 'day', 'nho'))
    for (thay, bai, doan), s in sorted(ra.items()):
        if chi_the and s['the'] != chi_the:
            continue
        print('%-10s %-26s %-10s %4d %5.1f%% %5.1f%% %6.3f %6.2f %5.1f%%'
              % (thay, bai[:26], doan, s['n'], 100 * s['tho'], 100 * s['ngau'],
                 s['boi'], s['day'], 100 * s['nho']))


def tom(ra, thay, doan, the):
    """Trung binh khong trong so qua cac bai — cung cach phia app gom 16 vong."""
    v = [s for (t, _, d), s in ra.items()
         if t == thay and d == doan and s['the'] == the]
    if not v:
        return None
    return dict(so_bai=len(v), n=sum(s['n'] for s in v),
                boi=sum(s['boi'] for s in v) / len(v),
                nho=sum(s['nho'] for s in v) / len(v),
                day=sum(s['day'] for s in v) / len(v),
                ngau=sum(s['ngau'] for s in v) / len(v),
                cac_boi=sorted(s['boi'] for s in v))


def kiem():
    """Tai lap con so moc ma bai kiem boiSoTuoiSang.test.ts dang dua vao.

    So chot ngay 6/9/2026, do tren ban ky am Linh Nhi. Lech thi bao ra chu dung
    sua ngam — bai kiem ben KeyTrain go tay chinh ba con so nay.
    """
    ra = gom('linh-nhi')
    t = tom(ra, 'linh-nhi', 'intro', 'truong')
    if not t:
        print('KHONG do duoc: khong co doan dao giong truong nao cua Linh Nhi')
        return 1
    print('Linh Nhi · doan dao · giong truong')
    print('  so bai       %d   (da chot: 3)' % t['so_bai'])
    print('  boi so       %s' % ' · '.join('%.3f' % b for b in t['cac_boi']))
    print('  trung binh   %.3f' % t['boi'])
    print('  buoc nho     %.1f%%' % (100 * t['nho']))
    print('  do day hop am %.2f not' % t['day'])
    print('  rai bua trung %.1f%%' % (100 * t['ngau']))
    return 0


def main():
    if '--kiem' in sys.argv:
        sys.exit(kiem())
    thay = next((a for a in sys.argv[1:] if not a.startswith('-')), None)
    ra = gom(thay)
    in_bang(ra)
    print()
    for t in sorted(set(k[0] for k in ra)):
        for doan in B.SOLO:
            for the in ('truong', 'thu'):
                s = tom(ra, t, doan, the)
                if s:
                    print('%-10s %-10s %-8s %d bai · n=%4d · BOI %.3f · nho %.1f%% '
                          '· day %.2f' % (t, doan, the, s['so_bai'], s['n'],
                                          s['boi'], 100 * s['nho'], s['day']))


if __name__ == '__main__':
    main()
