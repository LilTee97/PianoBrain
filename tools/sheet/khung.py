# -*- coding: utf-8 -*-
"""KHUNG BIEN SOAN DOAN — dien so o nhip cho tung doan cua tung bai.

Hai lenh:

    python tools/sheet/khung.py tao   -> viet ra khung-doan.txt de dien
    python tools/sheet/khung.py doc   -> doc khung ay, kiem, ghi vao corpus.json

Vi sao co buoc KIEM: bien doan sai mot o thi moi so do phia sau sai theo, ma
sai kieu ay khong bao gio bao loi — no chi lam ket qua lech di mot chut. Nen
doc vao la kiem ngay: o nam ngoai bai, doan chong nhau, doan di lui.
"""
import io
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = os.path.join(HERE, 'corpus.json')
KHUNG = os.path.join(HERE, 'khung-doan.txt')

# Ten doan bay ra cho nguoi dien, va khoa tuong ung trong corpus.
DOAN = [
    ('dao dau', 'intro'),
    ('phien khuc', 'verse'),
    ('diep khuc', 'chorus'),
    ('giang tau', 'interlude'),
    ('phien khuc lap', 'verse_2'),
    ('diep khuc lap', 'chorus_2'),
    ('ket bai', 'outro'),
]
KHOA = {ten: khoa for ten, khoa in DOAN}

HUONG_DAN = """# KHUNG BIEN SOAN DOAN
#
# Moi bai mot khoi. Dien so o nhip cua tung doan theo dang  bat-het , vi du 16-31.
# Doan nao bai KHONG CO thi go chu  x .
# Doan nao chua biet thi de trong, lan sau dien tiep.
#
# Dien xong chay:  python tools/sheet/khung.py doc
# No se kiem giup: o nam ngoai bai, hai doan chong nhau, doan di lui.
#
# Dong bat dau bang dau # la ghi chu, khong doc.
"""


def nap_corpus():
    return json.load(io.open(CORPUS, encoding='utf-8'))


def so_o(song):
    """So o nhip cua bai: lay trong corpus, khong co thi doc thang file."""
    if song.get('bars'):
        return song['bars']
    folder = os.environ.get('PIANOBRAIN_SHEETS')
    if not folder:
        return None
    path = os.path.join(folder, song['file'])
    if not os.path.exists(path):
        return None
    sys.path.insert(0, HERE)
    import mxl
    _, meta = mxl.notes(mxl.load(path))
    return max(meta['barlens']) if meta.get('barlens') else None


def tao():
    corpus = nap_corpus()
    dong = [HUONG_DAN]
    for song in corpus['songs']:
        tong = so_o(song)
        dong.append('')
        dong.append(f"== {song['name']}")
        dong.append(f"#    the loai: {song['genre']}"
                    + (f" | bai dai {tong} o nhip" if tong else ''))
        co = song.get('sections') or {}
        for ten, khoa in DOAN:
            sec = co.get(khoa)
            gia = f"{sec['bars'][0]}-{sec['bars'][1]}" if sec else ''
            dong.append(f"{ten:16}: {gia}")
    io.open(KHUNG, 'w', encoding='utf-8').write('\n'.join(dong) + '\n')
    print(f"Da viet {KHUNG}")
    print("Mo file ay, dien so o, roi chay:  python tools/sheet/khung.py doc")


def doc():
    if not os.path.exists(KHUNG):
        sys.exit(f"Chua co {KHUNG}. Chay lenh  tao  truoc.")
    corpus = nap_corpus()
    theo_ten = {s['name']: s for s in corpus['songs']}

    bai = None
    dien = {}
    loi = []
    for so_dong, raw in enumerate(io.open(KHUNG, encoding='utf-8'), 1):
        line = raw.rstrip('\n')
        if not line.strip() or line.lstrip().startswith('#'):
            continue
        if line.startswith('=='):
            bai = line[2:].strip()
            if bai not in theo_ten:
                loi.append(f"dong {so_dong}: khong co bai ten '{bai}' trong corpus")
                bai = None
            else:
                dien[bai] = {}
            continue
        if bai is None:
            continue
        if ':' not in line:
            loi.append(f"dong {so_dong}: thieu dau hai cham")
            continue
        ten, gia = line.split(':', 1)
        ten, gia = ten.strip(), gia.strip()
        if ten not in KHOA:
            loi.append(f"dong {so_dong}: khong biet doan '{ten}'")
            continue
        if gia == '':
            continue
        if gia.lower() == 'x':
            dien[bai][KHOA[ten]] = None
            continue
        m = re.fullmatch(r'(\d+)\s*-\s*(\d+)', gia)
        if not m:
            loi.append(f"dong {so_dong}: '{gia}' khong phai dang  bat-het  hay  x")
            continue
        a, b = int(m.group(1)), int(m.group(2))
        if a > b:
            loi.append(f"dong {so_dong}: {a}-{b} di lui")
            continue
        dien[bai][KHOA[ten]] = [a, b]

    # Kiem tung bai: nam trong bai, khong chong nhau.
    for ten_bai, khoas in dien.items():
        song = theo_ten[ten_bai]
        tong = so_o(song)
        khoang = [(k, v) for k, v in khoas.items() if v]
        for k, (a, b) in khoang:
            if a < 1:
                loi.append(f"{ten_bai} / {k}: o {a} nho hon 1")
            if tong and b > tong:
                loi.append(f"{ten_bai} / {k}: o {b} vuot qua bai ({tong} o)")
        theo_thu_tu = sorted(khoang, key=lambda kv: kv[1][0])
        for at in range(1, len(theo_thu_tu)):
            (k1, (a1, b1)), (k2, (a2, b2)) = theo_thu_tu[at - 1], theo_thu_tu[at]
            if a2 <= b1:
                loi.append(f"{ten_bai}: {k1} ({a1}-{b1}) chong len {k2} ({a2}-{b2})")

    if loi:
        print("KHONG ghi gi ca — sua may cho nay truoc:")
        for x in loi:
            print('  -', x)
        sys.exit(1)

    doi = 0
    for ten_bai, khoas in dien.items():
        song = theo_ten[ten_bai]
        sections = dict(song.get('sections') or {})
        for k, v in khoas.items():
            if v is None:
                sections.pop(k, None)
            else:
                # GIU cac truong khac cua doan — nhat la `time`, thu ghi lai
                # bien doan ay tu dau ma ra. Thay ca cai dict thi mat no, ma
                # mat kieu ay khong bao gio bao loi.
                cu = dict(sections.get(k) or {})
                cu['bars'] = v
                sections[k] = cu
        if sections != (song.get('sections') or {}):
            song['sections'] = sections
            doi += 1

    io.open(CORPUS, 'w', encoding='utf-8').write(
        json.dumps(corpus, ensure_ascii=False, indent=2) + '\n')
    print(f"Da ghi corpus.json — {doi} bai co thay doi.")
    for ten_bai, khoas in sorted(dien.items()):
        co = [k for k, v in khoas.items() if v]
        if co:
            print(f"  {ten_bai}: {len(co)} doan")


if __name__ == '__main__':
    lenh = sys.argv[1] if len(sys.argv) > 1 else ''
    if lenh == 'tao':
        tao()
    elif lenh == 'doc':
        doc()
    else:
        print(__doc__)
