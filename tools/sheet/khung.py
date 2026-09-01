# -*- coding: utf-8 -*-
"""KHUNG BIEN SOAN DOAN — dien so o nhip cho tung doan cua tung bai.

    python tools/sheet/khung.py       -> in o con trong
    python tools/sheet/khung.py tao   -> viet khung-doan.txt de dien
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
VIDEO = os.path.normpath(os.path.join(HERE, '..', '..', 'video'))
THU_THAY = {
    'ca-phao': 'Ca_Phao',
    'linh-nhi': 'Linh_Nhi',
    'ton-hung': 'Ton_Hung',
}

# Ten doan bay ra cho nguoi dien, va khoa tuong ung trong corpus.
DOAN = [
    ('dao dau', 'intro'),
    ('phien khuc', 'verse'),
    ('tien diep khuc', 'prechorus'),
    ('diep khuc', 'chorus'),
    ('giang tau', 'interlude'),
    ('phien khuc lap', 'verse_2'),
    ('tien diep khuc lap', 'prechorus_2'),
    ('diep khuc lap', 'chorus_2'),
    ('diep khuc nang tone', 'chorus_mod'),
    ('phien khuc lap 2', 'verse_3'),
    ('diep khuc lap cao trao', 'chorus_climax'),
    ('phien khuc lap 3', 'verse_4'),
    ('diep khuc lap 2', 'chorus_3'),
    ('ket bai', 'outro'),
]
KHOA = {ten: khoa for ten, khoa in DOAN}

HUONG_DAN = """# KHUNG BIEN SOAN DOAN
#
# Moi bai mot khoi. Dien HET o roi moi sang bai ke.
# the loai: do NGUOI dien, khong suy tu file.
# Doan: dang  bat-het  (16-31). Khong co thi  x . Chua biet thi de trong.
#
# Dong  da co / con trong  la goi y, khong doc.
# Dien xong chay:  python tools/sheet/khung.py doc
#
# Dong bat dau bang dau # la ghi chu, khong doc.
"""


def nap_corpus():
    return json.load(io.open(CORPUS, encoding='utf-8'))


def dang_khoang(khoang):
    return ', '.join(f'{a}-{b}' for a, b in khoang) if khoang else ''


def khe_trong(tong, khoang):
    """Khoang [a, b] gom hai dau. Tra ve cac doan 1..tong chua ai nhan."""
    if not tong:
        return []
    phu = [False] * (tong + 1)
    for a, b in khoang:
        for i in range(max(1, a), min(b, tong) + 1):
            phu[i] = True
    khe, i = [], 1
    while i <= tong:
        if phu[i]:
            i += 1
            continue
        j = i
        while j <= tong and not phu[j]:
            j += 1
        khe.append((i, j - 1))
        i = j
    return khe


def parse_gia(gia):
    if not gia or gia.lower() == 'x':
        return None
    m = re.fullmatch(r'(\d+)\s*-\s*(\d+)', gia.strip())
    return [int(m.group(1)), int(m.group(2))] if m else None


def doc_ban_nhap():
    """Doc khung-doan.txt hien co, khong kiem. Giu o da dien nhung chua doc."""
    out, bai = {}, None
    if not os.path.exists(KHUNG):
        return out
    for raw in io.open(KHUNG, encoding='utf-8'):
        line = raw.rstrip('\n')
        if not line.strip() or line.lstrip().startswith('#'):
            continue
        if line.startswith('=='):
            bai = line[2:].strip()
            out[bai] = {}
            continue
        if bai is None or ':' not in line:
            continue
        ten, gia = line.split(':', 1)
        ten, gia = ten.strip(), gia.strip()
        if gia and (ten in KHOA or ten == 'the loai'):
            out[bai][ten] = gia
    return out


def khoang_cua(song, nhap):
    khoang = []
    for ten, khoa in DOAN:
        sec = (song.get('sections') or {}).get(khoa)
        if sec and sec.get('bars'):
            khoang.append(tuple(sec['bars']))
            continue
        parsed = parse_gia((nhap.get(song['name']) or {}).get(ten, ''))
        if parsed:
            khoang.append(tuple(parsed))
    return khoang


def duong_file(song):
    f = song.get('file') or ''
    candidates = []
    thay = song.get('teacher')
    if thay and f:
        candidates.append(os.path.join(VIDEO, THU_THAY.get(thay, thay), f))
    env = os.environ.get('PIANOBRAIN_SHEETS')
    if env and f:
        candidates.append(os.path.join(env, f))
    if f:
        candidates.append(os.path.join(VIDEO, f))
    for path in candidates:
        if os.path.exists(path):
            return path
    return None


def so_o(song):
    """So o nhip cua bai: lay trong corpus, khong co thi doc thang file."""
    if song.get('bars'):
        return song['bars']
    path = duong_file(song)
    if not path:
        return None
    sys.path.insert(0, HERE)
    import mxl
    root = mxl.load(path) if path.endswith('.mxl') else None
    if root is None:
        import xml.etree.ElementTree as ET
        root = ET.parse(path).getroot()
    _, meta = mxl.notes(root)
    return max(meta['barlens']) if meta.get('barlens') else None


def tao(chi_thay=None):
    corpus = nap_corpus()
    nhap = doc_ban_nhap()
    songs = [s for s in corpus['songs']
             if (not chi_thay or s.get('teacher') == chi_thay)
             and (not chi_thay or duong_file(s))]
    songs = sorted(
        songs,
        key=lambda s: (0 if khe_trong(so_o(s), khoang_cua(s, nhap)) else 1),
    )
    dong = [HUONG_DAN]
    for song in songs:
        tong = so_o(song)
        co = song.get('sections') or {}
        ban = nhap.get(song['name']) or {}
        khoang = khoang_cua(song, nhap)
        khe = khe_trong(tong, khoang)
        dong.append('')
        dong.append(f"== {song['name']}")
        dong.append(f"#    thay: {song.get('teacher') or '?'}"
                    + (f" | bai dai {tong} o nhip" if tong else ''))
        dong.append(f"#    da co: {dang_khoang(khoang) or '(chua)'}")
        dong.append(f"#    con trong: {dang_khoang(khe)}" if khe
                    else f"#    kin {tong} o")
        dong.append(f"{'the loai':16}: {ban.get('the loai') or song.get('genre') or ''}")
        for ten, khoa in DOAN:
            sec = co.get(khoa)
            if sec and sec.get('bars'):
                gia = f"{sec['bars'][0]}-{sec['bars'][1]}"
            else:
                gia = ban.get(ten, '')
            dong.append(f"{ten:16}: {gia}")
    io.open(KHUNG, 'w', encoding='utf-8').write('\n'.join(dong) + '\n')
    print(f"Da viet {KHUNG}")
    tinh(corpus, nhap, chi_thay)
    print("Mo file ay, dien so o, roi chay:  python tools/sheet/khung.py doc")


def tinh(corpus=None, nhap=None, chi_thay=None):
    corpus = corpus or nap_corpus()
    nhap = nhap if nhap is not None else doc_ban_nhap()
    print("O con trong:")
    het = True
    for song in corpus['songs']:
        if chi_thay and (song.get('teacher') != chi_thay or not duong_file(song)):
            continue
        tong = so_o(song)
        khe = khe_trong(tong, khoang_cua(song, nhap))
        thieu_loai = not (song.get('genre') or (nhap.get(song['name']) or {}).get('the loai'))
        if khe or thieu_loai:
            het = False
            them = ' | chua the loai' if thieu_loai else ''
            print(f"  {song['name']} ({tong} o): {dang_khoang(khe) or 'kin'}{them}")
    if het:
        print("  (het)")


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
        if ten == 'the loai':
            if gia:
                dien[bai]['_genre'] = gia
            continue
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
        khoang = [(k, v) for k, v in khoas.items() if v and k != '_genre']
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
        if khoas.get('_genre'):
            if song.get('genre') != khoas['_genre']:
                song['genre'] = khoas['_genre']
                doi += 1
        sections = dict(song.get('sections') or {})
        for k, v in khoas.items():
            if k == '_genre':
                continue
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


def _tu_kiem():
    assert khe_trong(10, [(1, 3), (8, 10)]) == [(4, 7)]
    assert khe_trong(5, [(1, 5)]) == []
    assert khe_trong(5, []) == [(1, 5)]
    assert khe_trong(79, [(1, 10), (67, 77)]) == [(11, 66), (78, 79)]


if __name__ == '__main__':
    _tu_kiem()
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    lenh = sys.argv[1] if len(sys.argv) > 1 else ''
    if lenh == 'tao':
        tao(sys.argv[2] if len(sys.argv) > 2 else None)
    elif lenh == 'doc':
        doc()
    else:
        print(__doc__)
        tinh()
