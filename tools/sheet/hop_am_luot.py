"""Tim hop am LUOT — hop am chen vao chi de bass buoc tung bac.

VI SAO PHAI VIET LAI. Bo loc dau tien dung tieu chuan
    "vang duoi nua o + GOC KY HIEU di lien bac"
va sai o ca hai ve, cung mot kieu: doc lop KY HIEU ma tuong dang doc lop AM THANH.

  - "goc ky hieu di lien bac" khong phai "bass di lien bac". Hong Kong 1 o13:
    goc di A-G-F that, nhung bass that di E2-D2-G2-C2. Nguoi dung noi ro hien
    tuong nay la "de tao cam giac DI BASS", nen phai doc bass.
  - "vang duoi nua o" thuc ra la KHOANG CACH TOI KY HIEU KE TIEP, khong phai
    thoi gian hop am vang. Hong Kong 1 o48: ky hieu C7 dat o phach 3 nen do ra
    0,5 phach, nhung tay trai da giu Bb tu phach 0 — chat C7 phu gan het o.

DINH NGHIA DUNG (nguoi dung hoi, da chot trong knowledge/LUAT-SOAN-NOT.md):

  AT   — dinh nghia bang CHUC NANG: co suc keo ve mot dich cu the.
  LUOT — dinh nghia bang VAI TRO TRONG MOT DUONG DI: chen vao chi de mot be
         (thuong la bass) buoc duoc tung bac. KHONG co suc keo rieng.

THOI LUONG KHONG PHAN BIET DUOC HAI THU NAY. At co the ngan mot cai go.
Nen tieu chuan chinh o day la BASS BUOC TUNG BAC XUYEN QUA NO, khong phai do dai.
"""
import collections
import io
import os
import sys
import zipfile
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import don_hop_am as D

BUOC = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
TEN = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']


def doc(path):
    if path.endswith('.mxl'):
        z = zipfile.ZipFile(path)
        ten = next(n for n in z.namelist()
                   if n.endswith(('.xml', '.musicxml')) and 'META' not in n)
        return ET.fromstring(z.read(ten))
    return ET.fromstring(io.open(path, 'rb').read())


def cao_do(pitch):
    return ((int(pitch.findtext('octave')) + 1) * 12
            + BUOC[pitch.findtext('step')]
            + int(pitch.findtext('alter') or 0))


def quet_o(measure, moc):
    """Doc mot <measure>. Tra ve (hop_am, not_trai) voi thoi gian TUYET DOI.

    hop_am : [(luc, phan_tu_harmony)]
    not_trai: [(bat_dau, ket_thuc, cao_do)]  — chi khuong tay trai
    """
    t = 0.0
    ha, trai = [], []
    for e in measure:
        if e.tag == 'harmony':
            o = e.find('offset')
            lech = float(o.text) if (o is not None and o.text) else 0.0
            ha.append((moc + t + lech, e))
        elif e.tag == 'note':
            dur = float(e.findtext('duration') or 0)
            if (e.find('rest') is None and e.find('pitch') is not None
                    and e.find('grace') is None
                    and e.findtext('staff', '1') == '2'):
                trai.append((moc + t, moc + t + dur, cao_do(e.find('pitch'))))
            if e.find('chord') is None:
                t += dur
        elif e.tag == 'backup':
            t -= float(e.findtext('duration') or 0)
        elif e.tag == 'forward':
            t += float(e.findtext('duration') or 0)
    return ha, trai, t


def bass_luc(trai, luc):
    """Not thap nhat tay trai DANG VANG tai thoi diem luc.

    Neu khong not nao dang vang thi lay not tay trai gan nhat TRUOC do —
    tai o day van la not bass tai nghe con giu.
    """
    dang = [p for (a, b, p) in trai if a <= luc < b]
    if dang:
        return min(dang)
    truoc = [(a, p) for (a, b, p) in trai if a <= luc]
    if truoc:
        m = max(a for a, _ in truoc)
        return min(p for a, p in truoc if a == m)
    return None


def goc(harmony):
    r = harmony.find('root')
    return (BUOC[r.findtext('root-step')] + int(r.findtext('root-alter') or 0)) % 12


def co_ba_cung(harmony):
    """Hop am co cap quang ba cung khong — cap nay la loi keo manh nhat."""
    t = D.tap_not(harmony, gom_bass=False)
    return any(((x + 6) % 12) in t for x in t)


def chat_at(harmony):
    """Du tu cach lam AT chua — tuc co BAC 3 TRUONG tren goc cua chinh no.

    KHONG duoc doi cap quang ba cung. Cap ay chi co khi hop am co them quang 7
    thu; mot hop am ba TRUONG tron o bac V van la at day du. Duong Xua Loi Cu
    dung  E  (E G# B, khong co quang 7) giai ve  Am  o o49 va o56 — at that,
    ma phep thu quang ba cung bo sot ca hai.

    Nguoc lai hop am THU o bac V thi khong phai at: do la bac v cua gam thu tu
    nhien, khong co not cam nen khong co suc keo.
    """
    r = harmony.find('root')
    if r is None:
        return False
    rp = (BUOC[r.findtext('root-step')] + int(r.findtext('root-alter') or 0)) % 12
    return (rp + 4) % 12 in D.tap_not(harmony, gom_bass=False)


TRUONG = (0, 2, 4, 5, 7, 9, 11)
THU = (0, 2, 3, 5, 7, 8, 9, 10, 11)


def phan_loai(h, h_truoc, h_sau, bass_buoc, la_at, chu, thu, bass_pc, vang, vang_ben):
    """Bass buoc tung bac la dieu kien CAN, khong du.

    Ba thu khac han nhau deu co bass buoc, dung gop lam mot:

      1 LUOT THAT      — hop am co not NGOAI GAM, chen tam de bass di. Bo di
                         thi vong van nguyen nghia. Day moi la thu nguoi dung
                         mo ta: "dung TAM hop am luot qua de tao cam giac di bass".
      2 THE DAO DI BASS— hop am dieu that, nhung dat o THE DAO (bass khong phai
                         goc) chi de duong bass buoc xuong. Vd G/B - F/A - C/G.
                         Hop am that, cach dat la de di bass.
      3 VONG DI BAC    — ca ba hop am deu la hop am dieu o the goc. Bass buoc vi
                         CA VONG di xuong/len, khong ai chen gi. Vd F#m-Em-D
                         (iii-ii-I) hay Eb-F-Gm (bVI-bVII-i). KHONG phai luot.
    """
    if not bass_buoc or la_at:
        return None
    gam = THU if thu else TRUONG
    ngoai = [x for x in D.tap_not(h, gom_bass=False) if (x - chu) % 12 not in gam]
    if ngoai:
        return 'luot'
    if bass_pc != goc(h):
        return 'the-dao'
    # ngan hon han hai ben cung la dau hieu chen tam
    if vang_ben and vang < 0.5 * vang_ben:
        return 'luot'
    return 'vong-di-bac'


def at_trong_bai(ha):
    """Tap goc cua nhung hop am DA TUNG lam at that su o dau do trong bai.

    Vi sao can. Xet moi hop am bang mot minh hop am ngay sau no thi soi. Duong
    Xua Loi Cu: hop am  E  xuat hien 6 lan — hai lan giai DUNG ve  Am  (o49,
    o56), bon lan di chech sang  F  (x3) va  Dm  (x1). Neu chi nhin hop am ke
    tiep thi bon lan kia bi doc nham thanh hop am luot.

    Nhung mot hop am khong the vua la chen tam vua la at phu. Da giai dung du
    mot lan trong bai thi nhung lan khac la GIAI CHECH — van la at, chi khong
    duoc thu no chi vao. Nen phai xet ca bai, khong xet tung cap.
    """
    ra = set()
    for i in range(len(ha) - 1):
        h, sau = ha[i][1], ha[i + 1][1]
        if (goc(h) - goc(sau)) % 12 == 7 and chat_at(h):
            ra.add(goc(h))
    return ra


def soat(root_xml, doan, chu=None, thu=False, at_bai=None):
    """Tra ve danh sach ung cu vien, moi cai kem ly do."""
    ha, trai = [], []
    moc = 0.0
    for m in root_xml.find('part').findall('measure'):
        so = int(m.get('number') or 0)
        a, b, dai = quet_o(m, moc)
        if any(x <= so <= y for x, y in doan):
            ha += a
            trai += b
        moc += dai
    ha.sort(key=lambda x: x[0])
    ra = []
    for i in range(1, len(ha) - 1):
        luc, h = ha[i]
        t_truoc, h_truoc = ha[i - 1]
        t_sau, h_sau = ha[i + 1]
        b0, b1, b2 = (bass_luc(trai, t_truoc), bass_luc(trai, luc), bass_luc(trai, t_sau))
        if None in (b0, b1, b2):
            continue
        d1, d2 = b1 - b0, b2 - b1
        bass_buoc = (1 <= abs(d1) <= 2 and 1 <= abs(d2) <= 2 and d1 * d2 > 0)
        la_at = ((goc(h) - goc(h_sau)) % 12 == 7) and chat_at(h)
        if not la_at and at_bai:
            # giai chech: chinh hop am nay da giai dung o cho khac trong bai
            # khoa la GOC, khong phai tap not:  E  va  E7  la cung mot at tren
            # cung mot goc.  Duong Xua o49 giai  E -> Am , nen  E7  o o52 cung
            # phai duoc tinh la at, du no chua bao gio tu giai dung lan nao.
            la_at = chat_at(h) and goc(h) in at_bai
        vang = t_sau - luc
        vang_ben = min(luc - t_truoc, ha[i + 2][0] - t_sau) if i + 2 < len(ha) else None
        loai = (phan_loai(h, h_truoc, h_sau, bass_buoc, la_at, chu, thu,
                          b1 % 12, vang, vang_ben) if chu is not None else None)
        ra.append(dict(luc=luc, ten=D.chu(h), truoc=D.chu(h_truoc), sau=D.chu(h_sau),
                       bass=(TEN[b0 % 12], TEN[b1 % 12], TEN[b2 % 12]),
                       buoc=(d1, d2), bass_buoc=bass_buoc, la_at=la_at, vang=vang,
                       loai=loai, luot=(loai == 'luot')))
    return ra


def _tu_kiem():
    x = ET.fromstring(
        '<measure number="1">'
        '<harmony><root><root-step>C</root-step></root><kind>dominant</kind></harmony>'
        '<note><pitch><step>C</step><octave>3</octave></pitch><duration>4</duration>'
        '<staff>2</staff></note></measure>')
    ha, trai, dai = quet_o(x, 0.0)
    assert len(ha) == 1 and ha[0][0] == 0.0, ha
    assert trai == [(0.0, 4.0, 48)], trai
    assert dai == 4.0
    assert bass_luc(trai, 2.0) == 48
    assert bass_luc(trai, 9.0) == 48        # het vang thi lay not gan nhat truoc do
    h = ET.fromstring('<harmony><root><root-step>C</root-step></root>'
                      '<kind>dominant</kind></harmony>')
    assert co_ba_cung(h)                     # C7 co E-Bb
    h2 = ET.fromstring('<harmony><root><root-step>C</root-step></root>'
                       '<kind>major</kind></harmony>')
    assert not co_ba_cung(h2)                # ba truong tron thi khong co ba cung
    assert chat_at(h) and chat_at(h2)        # ...nhung ca hai deu du lam AT
    h3 = ET.fromstring('<harmony><root><root-step>E</root-step></root>'
                       '<kind>minor</kind></harmony>')
    assert not chat_at(h3)                   # bac v THU thi khong phai at
    ha = [(0.0, ET.fromstring('<harmony><root><root-step>E</root-step></root>'
                              '<kind>dominant</kind></harmony>')),
          (4.0, ET.fromstring('<harmony><root><root-step>A</root-step></root>'
                              '<kind>minor</kind></harmony>'))]
    at = at_trong_bai(ha)
    assert at == {4}, at                     # E7 giai ve Am -> ghi nhan goc E la at
    print('hop_am_luot: 7/7 dat')


if __name__ == '__main__':
    if '--kiem' in sys.argv:
        _tu_kiem()
        raise SystemExit(0)
