# -*- coding: utf-8 -*-
"""Luu / xoa cau intro, giang tau, outro tu sheet.

    python tools/sheet/luu_solo.py              # luu moi bai co file
    python tools/sheet/luu_solo.py luu ca-phao
    python tools/sheet/luu_solo.py lietke
    python tools/sheet/luu_solo.py xoa <id>
    python tools/sheet/luu_solo.py xoa-thay ca-phao
    python tools/sheet/luu_solo.py xoa-het

Khong nam trong knowledge/ — KeyTrain khong nap. Skill train-teacher-solo doc o day.
"""
from __future__ import annotations

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import clone_do as C  # noqa: E402
import khung  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
KHO = os.path.normpath(os.path.join(HERE, '..', '..', 'data', 'sheet-solos'))
INDEX = os.path.join(KHO, 'index.json')
SOLO = C.SOLO


def slug(text):
    return re.sub(r'[^a-zA-Z0-9]+', '-', text).strip('-').lower() or 'bai'


def luoi(x):
    return round(x * 16) / 16


def nap_index():
    if not os.path.exists(INDEX):
        return {'phrases': []}
    with open(INDEX, encoding='utf-8') as f:
        return json.load(f)


def ghi_index(data):
    os.makedirs(KHO, exist_ok=True)
    with open(INDEX, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')


def luu_bai(d):
    """Ghi 1 bai da do_bai. Tra ve so file ghi."""
    song = d['song']
    teacher = song.get('teacher') or 'unknown'
    stem = os.path.splitext(song.get('file') or song.get('name') or 'bai')[0]
    start = d.get('start') or {}
    n = 0
    idx = nap_index()
    by_id = {p['id']: p for p in idx['phrases']}
    for kind, a, b in C.o_loai(d['secs'], SOLO):
        origin = start.get(a, 0.0)
        notes = []
        for note in C.trong_doan(d['ns'], a, b):
            notes.append({
                'h': note['hand'],
                'midi': note['midi'],
                'at': luoi(note['beat'] - origin),
                'dur': luoi(max(0.06, note.get('dur') or 0.25)),
            })
        if not notes:
            continue
        pid = '%s-%s-%s' % (teacher, slug(stem), kind)
        path = os.path.join(KHO, pid + '.json')
        body = {
            'id': pid,
            'teacher': teacher,
            'song': song.get('name'),
            'file': song.get('file'),
            'section': kind,
            'bars': [a, b],
            'genre': song.get('genre'),
            'notes': notes,
        }
        os.makedirs(KHO, exist_ok=True)
        raw = json.dumps(body, ensure_ascii=False, separators=(',', ':'))
        with open(path, 'w', encoding='utf-8') as f:
            f.write(raw)
            f.write('\n')
        kb = max(1, round(os.path.getsize(path) / 1024, 1))
        by_id[pid] = {
            'id': pid,
            'teacher': teacher,
            'song': song.get('name'),
            'section': kind,
            'bars': [a, b],
            'notes': len(notes),
            'kb': kb,
        }
        n += 1
    idx['phrases'] = sorted(by_id.values(), key=lambda p: p['id'])
    ghi_index(idx)
    return n


def luu(thay=None):
    so = 0
    for s in khung.nap_corpus()['songs']:
        if thay and s.get('teacher') != thay:
            continue
        if not khung.duong_file(s):
            continue
        d = C.do_bai(s)
        if d:
            so += luu_bai(d)
    return so


def lietke():
    phrases = nap_index()['phrases']
    tong = 0
    for p in phrases:
        print('%6.1f kb  %s  %s / %s  o%s-%s  %s not' % (
            p.get('kb') or 0, p['id'], p.get('teacher'), p.get('section'),
            p['bars'][0], p['bars'][1], p.get('notes'),
        ))
        tong += p.get('kb') or 0
    print('n=%s  ~%s kb' % (len(phrases), round(tong, 1)))


def xoa(pid):
    path = os.path.join(KHO, pid + '.json')
    if os.path.exists(path):
        os.remove(path)
    idx = nap_index()
    idx['phrases'] = [p for p in idx['phrases'] if p['id'] != pid]
    ghi_index(idx)
    print('xoa', pid)


def xoa_thay(thay):
    idx = nap_index()
    keep = []
    for p in idx['phrases']:
        if p.get('teacher') == thay:
            path = os.path.join(KHO, p['id'] + '.json')
            if os.path.exists(path):
                os.remove(path)
            print('xoa', p['id'])
        else:
            keep.append(p)
    idx['phrases'] = keep
    ghi_index(idx)


def xoa_het():
    idx = nap_index()
    for p in idx['phrases']:
        path = os.path.join(KHO, p['id'] + '.json')
        if os.path.exists(path):
            os.remove(path)
    ghi_index({'phrases': []})
    print('xoa het')


def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'luu'
    if cmd == 'lietke':
        lietke()
    elif cmd == 'xoa' and len(sys.argv) > 2:
        xoa(sys.argv[2])
    elif cmd == 'xoa-thay' and len(sys.argv) > 2:
        xoa_thay(sys.argv[2])
    elif cmd == 'xoa-het':
        xoa_het()
    elif cmd == 'luu':
        thay = sys.argv[2] if len(sys.argv) > 2 else None
        n = luu(thay)
        print('luu %s file vao data/sheet-solos/' % n)
        lietke()
    else:
        sys.exit('dung: luu [thay] | lietke | xoa <id> | xoa-thay <thay> | xoa-het')


if __name__ == '__main__':
    main()
