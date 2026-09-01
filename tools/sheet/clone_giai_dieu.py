# -*- coding: utf-8 -*-
"""Do GIAI DIEU tay phai doan solo — buoc, huong, not dap. Tach tung thay."""
from __future__ import annotations

import collections
import sys

sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
import clone_do as C
import khung

SOLO = C.SOLO


def melody_line(ns, a, b):
    """Chi moc 1 nốt — quat hop am (2+ nốt) tao nhay gia."""
    phai = [n for n in C.trong_doan(ns, a, b) if n['hand'] == 1]
    at = collections.defaultdict(list)
    for n in phai:
        at[round(n['beat'], 4)].append(n['midi'])
    return [(t, max(v)) for t, v in sorted(at.items()) if len(set(v)) == 1]


def gaps(line):
    return [b - a for (_, a), (_, b) in zip(line, line[1:]) if a != b]


def land(chords, ns, line):
    last = {}
    for t, m in line:
        bar = next((n['bar'] for n in ns if n['hand'] == 1 and abs(n['beat'] - t) < 1e-3), None)
        if bar is not None:
            last[bar] = m
    ct = st = ot = 0
    for bar, m in last.items():
        ch = chords.get(bar)
        if not ch:
            continue
        d = (m % 12 - ch['root']) % 12
        if d in (0, 3, 4, 7):
            ct += 1
        elif d in (10, 11):
            st += 1
        else:
            ot += 1
    tot = ct + st + ot or 1
    return ct / tot, st / tot, ot / tot


def bao(thay):
    print('====', thay)
    acc = collections.Counter()
    nland = [0, 0, 0]
    for s in khung.nap_corpus()['songs']:
        if s.get('teacher') != thay or not khung.duong_file(s):
            continue
        d = C.do_bai(s)
        if not d:
            continue
        print(' ', s['name'])
        for k, a, b in C.o_loai(d['secs'], SOLO):
            line = melody_line(d['ns'], a, b)
            g = gaps(line)
            if not g:
                continue
            n = len(g)
            step = sum(1 for x in g if abs(x) <= 2) / n
            third = sum(1 for x in g if 3 <= abs(x) <= 4) / n
            leap = sum(1 for x in g if abs(x) >= 5) / n
            up = sum(1 for x in g if x > 0) / n
            span = max(m for _, m in line) - min(m for _, m in line)
            ct, st, ot = land(d['chords'], d['ns'], line)
            print(
                f'    {k:10} n={n:3} step {step:.0%} 3rd {third:.0%} '
                f'leap {leap:.0%} up {up:.0%} span {span} '
                f'land1-5 {ct:.0%} 7 {st:.0%} other {ot:.0%}'
            )
            acc['step'] += step * n
            acc['third'] += third * n
            acc['leap'] += leap * n
            acc['up'] += up * n
            acc['n'] += n
            nland[0] += ct
            nland[1] += st
            nland[2] += ot
    n = acc['n'] or 1
    t = sum(nland) or 1
    print(
        f'  TONG step {acc["step"] / n:.0%}  3rd {acc["third"] / n:.0%}  '
        f'leap {acc["leap"] / n:.0%}  up {acc["up"] / n:.0%}  '
        f'land1-5 {nland[0] / t:.0%}  7 {nland[1] / t:.0%}  other {nland[2] / t:.0%}'
    )


if __name__ == '__main__':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    for t in sys.argv[1:] or ['ca-phao', 'linh-nhi', 'ton-hung']:
        bao(t)
