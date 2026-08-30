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
    if kind is not None:
        ten += kind.get('text') or ''
    bass = harmony.find('bass/bass-step')
    if bass is not None and bass.text:
        ten += '/' + bass.text
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


if __name__ == '__main__':
    main()
