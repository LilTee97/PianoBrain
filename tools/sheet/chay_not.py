# -*- coding: utf-8 -*-
"""Giai phau CAU CHAY NGON: dai bao nhieu, buoc the nao, vao o cho nao.

Cau chay = chuoi not tay phai lien tiep, moi not ngan hon nguong va cach not
truoc khong qua chinh do dai cua no.
"""
import io, json, os, sys
from collections import Counter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mxl

NHANH = 0.26        # not den = 1.0; 0.25 la moc kep, 0.125 la moc ba
TOI_THIEU = 4       # duoi bay not thi khong goi la mot cau chay


def nap(path):
    ns, meta = mxl.notes(mxl.load(path))
    bl = meta['barlens']; start = {}; acc = 0.0
    for o in sorted(bl): start[o] = acc; acc += bl[o]
    for n in ns:
        o = n['bar']
        while o in start and o + 1 in start and n['beat'] >= start[o] + bl[o] - 1e-6:
            o += 1
        n['bar'] = o
        n['off'] = round((n['beat'] - start[o]) * 8) / 8 if o in start else None
    return ns, bl


def chuoi(notes):
    """Gom not tay phai thanh nhung chuoi chay lien tiep."""
    moc = {}
    for n in notes:
        moc.setdefault(round(n['beat'], 4), []).append(n)
    mocs = sorted(moc)
    out, cum = [], []
    for at, m in enumerate(mocs):
        g = moc[m]
        dur = min(x['dur'] for x in g)
        # Chi lay MOT not moi moc: cau chay la mot be don.
        if len(g) > 2 or dur > NHANH:
            if len(cum) >= TOI_THIEU: out.append(cum)
            cum = []
            continue
        if cum and m - cum[-1][0] > dur * 1.6 + 1e-6:
            if len(cum) >= TOI_THIEU: out.append(cum)
            cum = []
        cum.append((m, max(x['midi'] for x in g), dur, g[0]['bar'], g[0]['off']))
    if len(cum) >= TOI_THIEU: out.append(cum)
    return out


def main():
    folder = os.path.dirname(os.path.abspath(__file__))
    corpus = json.load(io.open(os.path.join(folder, 'corpus.json'), encoding='utf-8'))
    sheets = os.environ['PIANOBRAIN_SHEETS']
    loc = sys.argv[1] if len(sys.argv) > 1 else ''

    for song in corpus['songs']:
        if loc.lower() not in song['name'].lower(): continue
        path = os.path.join(sheets, song['file'])
        if not os.path.exists(path): continue
        ns, bl = nap(path)
        print(f"\n=== {song['name']} ===")
        for kind, sec in (song.get('sections') or {}).items():
            a, b = sec['bars']
            ph = [n for n in ns if n['hand'] == 1 and a <= n['bar'] <= b]
            cs = chuoi(ph)
            if not cs: 
                print(f"  {kind:11} khong co cau chay nao"); continue
            dai = [len(c) for c in cs]
            rong = [abs(c[-1][1] - c[0][1]) for c in cs]
            len_ = [round(c[-1][0] - c[0][0] + c[-1][2], 2) for c in cs]
            buoc = Counter()
            huong = Counter()
            for c in cs:
                d = [c[i+1][1] - c[i][1] for i in range(len(c)-1)]
                for x in d: buoc[x] += 1
                huong['len' if sum(d) > 0 else 'xuong' if sum(d) < 0 else 'ngang'] += 1
            vao = Counter(c[0][4] for c in cs)
            moc_val = Counter(c[2] for cc in cs for c in cc)
            print(f"  {kind:11} {len(cs):>2} cau | dai {sorted(dai)} | rong {sorted(rong)} nc "
                  f"| keo dai {sorted(len_)} phach")
            print(f"              huong {dict(huong)} | vao o cho {sorted(vao.items())[:6]}")
            print(f"              buoc hay gap {buoc.most_common(6)} | truong do {sorted(moc_val.items())}")


if __name__ == '__main__':
    main()
