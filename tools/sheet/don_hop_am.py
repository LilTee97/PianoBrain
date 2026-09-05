# -*- coding: utf-8 -*-
"""DON KY HIEU HOP AM do plugin Chord Identifier ghi ra.

    python tools/sheet/don_hop_am.py <file.mxl hoac .musicxml> [--moi-o 2]

Ghi ra mot file moi ben canh, duoi  -da-don.musicxml , mo lai bang MuseScore.
KHONG bao gio ghi de file goc.

## Vi sao can buoc nay

Plugin dat ten cho MOI mốc gõ, nen mot o nhac trong ban piano co the linh bon
nam ky hieu. Chung khong sai — dung la nhung not ay dang vang — nhung phan lon
la HOP AM LUOT trong mot cau rai, khong phai hop am cua o nhac. Doc vong hop am
tu ban day dac ay thi ra mot vong khong doan nao trong bai tung choi.

Ba viec:

  1. Xoa moi ky hieu  ??  — plugin danh dau cho no khong khop het not dang vang.
  2. Xoa ky hieu mau DO — cung y nghia ay khi nguoi dung chon che do "Suggest".
  3. Moi o chi giu ky hieu o VACH NHIP, va them nhieu nhat mot ky hieu o NUA O
     neu no khac ky hieu dau o.

Luat thu 3 la luat cua nguoi dung, dat ra khi doc vong hop am: "gap nhung cap
hop am chia doi thi chi tinh bac cho hop am dau cap".
"""
import io
import os
import re
import shutil
import sys
import xml.etree.ElementTree as ET
import zipfile

DO = re.compile(r'^#?ff0000$', re.I)


def nap(path):
    """Doc .mxl (nen) hoac .musicxml (tho). Tra ve (cay, ten file trong zip)."""
    if path.lower().endswith('.mxl'):
        zf = zipfile.ZipFile(path)
        ten = next(
            n for n in zf.namelist()
            if n.endswith(('.xml', '.musicxml')) and 'META' not in n
            and 'container' not in n
        )
        return ET.fromstring(zf.read(ten).decode('utf-8', errors='replace')), ten
    return ET.parse(path).getroot(), os.path.basename(path)


def la_hoi(harmony):
    """Ky hieu  ??  cua plugin: hop am no khong khop het not dang vang.

    CAN HAM RIENG. Plugin ghi  ??  vao <kind text="??"> nhung VAN giu nguyen
    <root>, nen ten day du doc ra la "C??", "Em??"... Kiem bang ten day du thi
    truot het — do tren Hong Kong 1: 402 tren 562 ky hieu la  ??  ma khong cai
    nao bi bat.
    """
    kind = harmony.find('kind')
    if kind is None:
        return False
    return (kind.get('text') or '').strip() == '??'


def chu(harmony):
    """Ten hop am dang chu, de so sanh hai ky hieu trong cung mot o."""
    root = harmony.find('root/root-step')
    alter = harmony.find('root/root-alter')
    kind = harmony.find('kind')
    if root is None:
        # Plugin ghi  ??  bang mot <harmony> khong co root, hoac bang chu thuong.
        return (kind.get('text') or kind.text or '') if kind is not None else '??'
    ten = root.text or ''
    if alter is not None and alter.text:
        ten += {'-1': 'b', '1': '#', '-2': 'bb', '2': '##'}.get(alter.text.strip(), '')
    # Khi <kind> KHONG co thuoc tinh text thi phai tu dich chat ra hau to,
    # neu khong  suspended-fourth  doc ra thanh  G  tron —  G7sus4/D  hoa  G/D .
    HAU_TO = {
        'major': '', 'minor': 'm', 'dominant': '7', 'major-seventh': 'maj7',
        'minor-seventh': 'm7', 'suspended-fourth': 'sus4', 'suspended-second': 'sus2',
        'diminished': 'dim', 'diminished-seventh': 'dim7', 'half-diminished': 'm7b5',
        'augmented': 'aug', 'major-sixth': '6', 'minor-sixth': 'm6',
        'major-minor': 'mMaj7', 'dominant-ninth': '9', 'major-ninth': 'maj9',
        'minor-ninth': 'm9', 'dominant-11th': '11', 'minor-11th': 'm11',
        'dominant-13th': '13', 'major-13th': 'maj13', 'minor-13th': 'm13',
        'power': '5', 'suspended-fourth-seventh': '7sus4',
    }
    if kind is not None and not (kind.get('text') or '').strip():
        ten += HAU_TO.get((kind.text or '').strip(), '')

    if kind is not None:
        # SO DAO  1  2  o mu la KY HIEU THE DAO, khong phai chat hop am.
        # Do het kho: 14 cho, chi rieng Hong Kong 1.  1  luon co bass cach goc
        # 4 nua cung (dao 1, bass = bac 3), 2 luon cach 7 (dao 2, bass = bac 5),
        # 14/14 khong ngoai le. Chat that la HOP AM BA TRUONG TRON; nhac bass da
        # nam trong  /E  phia sau nen bo so mu di la du.
        # Nguoi dung xac nhan tren ban in:  C1/E  chinh la  C/E .
        ten += (kind.get('text') or '').replace('¹', '').replace('²', '')
    # <degree> la phan CONG THEM vao chat: add9, 7 cua 7sus4, b5, #11...
    # Bo qua no thi  G7sus4/D  doc ra thanh  G/D  — sai ten, va tu do sai ca
    # mo ta trong phieu soat. Do het kho: 65 tren 1603 ky hieu (4,1%) co degree,
    # trong doan solo la 11 tren 299 (3,7%).
    # Anh huong len so do thi khong dang ke: chi 2 not tren 2081 doi ket qua
    # "co phai not hop am khong" — nen cac luat dung nguyen, chi ten la duoc sua.
    BAC = {'1': '', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6',
           '7': '7', '9': '9', '11': '11', '13': '13'}
    for d in harmony.findall('degree'):
        v = BAC.get((d.findtext('degree-value') or '').strip())
        if not v:
            continue
        alt = (d.findtext('degree-alter') or '0').strip()
        dau = {'-1': 'b', '1': '#', '-2': 'bb', '2': '##'}.get(alt, '')
        loai = (d.findtext('degree-type') or 'add').strip()
        if loai == 'subtract':
            ten += 'no' + dau + v
        elif dau:
            # Bac co dau hoa la bac BI DOI, khong phai bac them vao — nhac si
            # viet  Bm7(b5) , khong viet  Bm7addb5 .
            # BOC NGOAC bat buoc: khong boc thi  D  them  b9  ra  "Db9"  doc
            # thanh RE GIANG 9, va  F#  them  #5  ra  "F##5" . Chinh ban in
            # trong kho cung ghi kieu co ngoac:  Em7(b5) .
            # ban in doi khi da ghi san trong thuoc tinh text (vd  7b9 ),
            # luc ay degree chi nhac lai — dung ghep them lan nua.
            if dau + v not in ten:
                ten += '(%s%s)' % (dau, v)
        elif v == '7' and '7' not in ten:
            ten = ten.replace('sus', '7sus') if 'sus' in ten else ten + '7'
        elif ('add' + v) not in ten:
            ten += 'add' + v

    bass = harmony.find('bass/bass-step')
    if bass is not None and bass.text:
        alt = harmony.findtext('bass/bass-alter')
        ten += '/' + bass.text + ({'-1': 'b', '1': '#'}.get((alt or '').strip(), ''))
    return ten


def don(root, moi_o=2):
    """Xoa ky hieu thua. Tra ve (so xoa ??, so xoa mau do, so xoa vi trai cho)."""
    bo_hoi = bo_do = bo_cho = 0

    for part in root.findall('part'):
        div = 1
        nhip = 4.0
        for measure in part.findall('measure'):
            attr = measure.find('attributes')
            if attr is not None:
                d = attr.find('divisions')
                if d is not None and d.text:
                    div = int(d.text)
                t = attr.find('time')
                if t is not None:
                    beats = t.find('beats')
                    btype = t.find('beat-type')
                    if beats is not None and btype is not None:
                        nhip = float(beats.text) * 4.0 / float(btype.text)

            # Duyet mot luot, ghi lai moc phach cua tung <harmony>.
            cursor = 0.0
            cho = []          # (harmony, moc phach)
            for el in list(measure):
                if el.tag == 'harmony':
                    cho.append((el, cursor))
                elif el.tag == 'note':
                    if el.find('chord') is None:
                        dur = el.find('duration')
                        cursor += (float(dur.text) / div) if dur is not None else 0.0
                elif el.tag == 'backup':
                    dur = el.find('duration')
                    cursor -= (float(dur.text) / div) if dur is not None else 0.0
                elif el.tag == 'forward':
                    dur = el.find('duration')
                    cursor += (float(dur.text) / div) if dur is not None else 0.0

            giu = []
            for harmony, moc in cho:
                ten = chu(harmony)
                mau = harmony.get('color') or ''
                if la_hoi(harmony) or ten.strip() in ('', 'N.C.'):
                    measure.remove(harmony)
                    bo_hoi += 1
                elif DO.match(mau.strip()):
                    measure.remove(harmony)
                    bo_do += 1
                else:
                    giu.append((harmony, moc, ten))

            # Con lai thi cat theo VI TRI: vach nhip, va nua o neu khac ten.
            if not giu:
                continue
            dau = giu[0]
            nhan = [dau]
            if moi_o >= 2:
                nua = nhip / 2.0
                for harmony, moc, ten in giu[1:]:
                    if abs(moc - nua) < 1e-6 and ten != dau[2]:
                        nhan.append((harmony, moc, ten))
                        break
            for harmony, moc, ten in giu:
                if all(harmony is not k[0] for k in nhan):
                    measure.remove(harmony)
                    bo_cho += 1

    return bo_hoi, bo_do, bo_cho


def main():
    if '--kiem' in sys.argv:
        _tu_kiem()
        return
    if len(sys.argv) < 2:
        print(__doc__)
        return
    path = sys.argv[1]
    moi_o = 2
    if '--moi-o' in sys.argv:
        moi_o = int(sys.argv[sys.argv.index('--moi-o') + 1])
    if not os.path.exists(path):
        sys.exit(f"Khong thay file: {path}")

    root, _ = nap(path)
    truoc = len(root.findall('.//harmony'))
    bo_hoi, bo_do, bo_cho = don(root, moi_o)
    sau = len(root.findall('.//harmony'))

    goc = os.path.splitext(path)[0]
    ra = goc + '-da-don.musicxml'
    ET.ElementTree(root).write(ra, encoding='UTF-8', xml_declaration=True)

    print(f"  Vao   : {truoc} ky hieu hop am")
    print(f"  Xoa ??: {bo_hoi}")
    print(f"  Xoa do: {bo_do}   (hop am thieu, plugin da danh dau)")
    print(f"  Xoa vi sai cho: {bo_cho}   (nam giua o, khong phai hop am cua o)")
    print(f"  Con   : {sau} ky hieu — trung binh {sau / max(1, len(root.findall('.//measure')) / max(1, len(root.findall('part')))):.1f} moi o")
    print(f"\n  Da ghi: {ra}")
    print("  File goc KHONG bi dung toi.")



# ---------------------------------------------------------------------------
# BANG CHAT HOP AM — MOT CHO DUY NHAT
#
# Truoc khi co ham nay, moi script do lai dung lai mot ban bang nay, va sai
# khac nhau moi lan. Rieng mot phien da dung 4 lan va sai 3 lan khac nhau:
#   1. thieu minor-11th / dominant-11th / dominant-13th / other -> roi ve ba truong
#   2. bo qua <degree> hoan toan -> G7sus4 doc thanh G
#   3. degree-type="alter" duoc CONG THEM thay vi THAY THE -> hop am giu ca
#      bac 5 tu nhien lan bac 5 giang, nen Am7b5 chua ca G lan Gb
# Dung ham nay, dung chep lai bang.
# ---------------------------------------------------------------------------

CHAT_NOT = {
    'major': (0, 4, 7), 'minor': (0, 3, 7),
    'dominant': (0, 4, 7, 10), 'major-seventh': (0, 4, 7, 11),
    'minor-seventh': (0, 3, 7, 10), 'major-minor': (0, 3, 7, 11),
    'suspended-fourth': (0, 5, 7), 'suspended-second': (0, 2, 7),
    'suspended-fourth-seventh': (0, 5, 7, 10),
    'diminished': (0, 3, 6), 'diminished-seventh': (0, 3, 6, 9),
    'half-diminished': (0, 3, 6, 10),
    'augmented': (0, 4, 8), 'augmented-seventh': (0, 4, 8, 10),
    'major-sixth': (0, 4, 7, 9), 'minor-sixth': (0, 3, 7, 9),
    'dominant-ninth': (0, 4, 7, 10, 2), 'major-ninth': (0, 4, 7, 11, 2),
    'minor-ninth': (0, 3, 7, 10, 2),
    'dominant-11th': (0, 4, 7, 10, 2, 5), 'minor-11th': (0, 3, 7, 10, 2, 5),
    'major-11th': (0, 4, 7, 11, 2, 5),
    'dominant-13th': (0, 4, 7, 10, 2, 5, 9), 'minor-13th': (0, 3, 7, 10, 2, 5, 9),
    'major-13th': (0, 4, 7, 11, 2, 5, 9),
    'power': (0, 7),
    # 'other' o kho nay LUON la ky hieu the dao  1  2  -> ba truong tron.
    # Do 14/14 truong hop, khong ngoai le. Xem knowledge/LUAT-SOAN-NOT.md.
    'other': (0, 4, 7),
}

BUOC_NOT = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
BAC_NOT = {'1': 0, '2': 2, '3': 4, '4': 5, '5': 7, '6': 9,
           '7': 11, '9': 2, '11': 5, '13': 9}


def _pc(el, ten):
    """Doc mot <root>/<bass> ra pitch class."""
    b = el.findtext(ten + '-step')
    if not b:
        return None
    return (BUOC_NOT[b] + int(el.findtext(ten + '-alter') or 0)) % 12


def tap_not(harmony, gom_bass=True):
    """Tap pitch class cua mot <harmony>.

    Xu ly <degree> theo dung nghia MusicXML:
      add      -> them mot bac vao
      alter    -> THAY THE bac ay (bo bac tu nhien di truoc khi them)
      subtract -> bo bac ay

    CAN THAN voi  add  tren bac 5 co degree-alter khac 0: bo xuat trong kho nay
    dung no de ghi  m7b5 , tuc y la THAY THE chu khong phai giu ca hai. Kiem
    tren Chiec La Mua Dong: chuoi Am7addb5 -> D7 -> Gm lap 6 lan la ii-V-i cua
    Sol thu, ma ii cua Sol thu la Am7b5 (A C Eb G) — khong co not G becarre.
    """
    root = harmony.find('root')
    if root is None:
        return set()
    rp = _pc(root, 'root')
    if rp is None:
        return set()
    kind = harmony.find('kind')
    ten_chat = (kind.text or '').strip() if kind is not None else 'major'
    tap = set((rp + x) % 12 for x in CHAT_NOT.get(ten_chat, CHAT_NOT['major']))

    for d in harmony.findall('degree'):
        bac = (d.findtext('degree-value') or '').strip()
        if bac not in BAC_NOT:
            continue
        doi = int(d.findtext('degree-alter') or 0)
        loai = (d.findtext('degree-type') or 'add').strip()
        buoc = BAC_NOT[bac]
        # BAY: chuan MusicXML tinh degree-alter so voi GAM TRUONG, nen
        # <degree-value>7</degree-value> voi alter=0 la quang 7 TRUONG.
        # Nhung ky hieu hop am in tren giay thi so  7  tron LUON la 7 THU
        # (muon 7 truong thi phai viet maj7). Ban in cua Hong Kong 1 o13 ghi
        # ro  G7sus4/D  = G C D F, khong phai F#. Chi 2 truong hop trong ca
        # kho, deu la  7sus4 . Nen: bac 7 khong dau, tren mot chat CHUA co
        # quang 7 nao, thi doc la 7 THU.
        if bac == '7' and doi == 0 and not (tap & {(rp + 10) % 12, (rp + 11) % 12}):
            buoc = 10
        goc = (rp + buoc) % 12
        moi = (goc + doi) % 12
        if loai == 'subtract':
            tap.discard(moi)
            continue
        if doi != 0:
            tap.discard(goc)          # thay the, khong cong them
        tap.add(moi)

    bass = harmony.find('bass')
    if gom_bass and bass is not None:
        b = _pc(bass, 'bass')
        if b is not None:
            tap.add(b)
    return tap


def _tu_kiem():
    """Chay:  python tools/sheet/don_hop_am.py --kiem"""
    def ha(xml):
        return ET.fromstring(xml)
    # Am7b5 ghi kieu  minor-seventh + add b5  -> phai la A C Eb G, KHONG co G becarre
    x = ha('<harmony><root><root-step>A</root-step></root>'
           '<kind>minor-seventh</kind>'
           '<degree><degree-value>5</degree-value><degree-alter>-1</degree-alter>'
           '<degree-type>add</degree-type></degree></harmony>')
    assert tap_not(x) == {9, 0, 3, 7}, tap_not(x)      # A C Eb G  (Eb=3, G=7)
    # G7sus4/D  ->  G C D F  cong bass D
    x = ha('<harmony><root><root-step>G</root-step></root>'
           '<kind>suspended-fourth</kind>'
           '<degree><degree-value>7</degree-value><degree-alter>0</degree-alter>'
           '<degree-type>add</degree-type></degree>'
           '<bass><bass-step>D</bass-step></bass></harmony>')
    assert tap_not(x) == {7, 0, 2, 5}, tap_not(x)      # G C D F
    # C##5 (major + alter 5 len) -> phai la aug C E G#, KHONG con G
    x = ha('<harmony><root><root-step>C</root-step></root><kind>major</kind>'
           '<degree><degree-value>5</degree-value><degree-alter>1</degree-alter>'
           '<degree-type>alter</degree-type></degree></harmony>')
    assert tap_not(x) == {0, 4, 8}, tap_not(x)
    # the dao ghi bang  other  ->  ba truong tron
    x = ha('<harmony><root><root-step>C</root-step></root>'
           '<kind text="¹">other</kind>'
           '<bass><bass-step>E</bass-step></bass></harmony>')
    assert tap_not(x) == {0, 4, 7}, tap_not(x)
    print('tap_not: 4/4 dat')


if __name__ == '__main__':
    main()
