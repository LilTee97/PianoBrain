# -*- coding: utf-8 -*-
"""Hinh tay trai trong mot o: go vao nhung vi tri phach nao, cach nhau bao xa."""
import json, os, sys
from collections import Counter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mxl


def main():
    folder = os.path.dirname(os.path.abspath(__file__))
    corpus = json.load(open(os.path.join(folder, 'corpus.json'), encoding='utf-8'))
    ten = sys.argv[1] if len(sys.argv) > 1 else ''
    sheets = os.environ['PIANOBRAIN_SHEETS']

    for song in corpus['songs']:
        if ten.lower() not in song['name'].lower():
            continue
        path = os.path.join(sheets, song['file'])
        if not os.path.exists(path):
            continue
        ns, meta = mxl.notes(mxl.load(path))
        print(f"\n=== {song['name']} ===")
        # moc dau moi o, de quy phach ve offset trong o
        dau = {}
        for n in ns:
            if n['bar'] not in dau or n['beat'] < dau[n['bar']]:
                dau[n['bar']] = n['beat']
        for kind, sec in (song.get('sections') or {}).items():
            a, b = sec['bars']
            trai = [n for n in ns if n['hand'] == 2 and a <= n['bar'] <= b]
            so_o = b - a + 1
            vi_tri = Counter()
            quang = Counter()
            for n in trai:
                off = round((n['beat'] - dau[n['bar']]) * 4) / 4
                vi_tri[off] += 1
            # quang giua not thap nhat va cac not con lai trong cung mot moc
            moc = {}
            for n in trai:
                moc.setdefault((n['bar'], round(n['beat'], 3)), []).append(n['midi'])
            for ms in moc.values():
                if len(ms) > 1:
                    lo = min(ms)
                    for m in ms:
                        if m != lo:
                            quang[m - lo] += 1
            top = sorted(vi_tri.items())
            print(f"  {kind:11} ({so_o:>3} o) vi tri: " +
                  '  '.join(f"{o:g}:{round(c/so_o,2)}" for o, c in top if c / so_o >= 0.08))
            if quang:
                print(f"              quang chong: " +
                      ' '.join(f"{q}nc:{c}" for q, c in quang.most_common(4)))


if __name__ == '__main__':
    main()
