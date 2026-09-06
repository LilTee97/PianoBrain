# -*- coding: utf-8 -*-
"""Doan dao giong TRUONG cua Linh Nhi: phan bo cao do tay phai va % vuot cac tran."""
import os
import sys

sys.path.insert(0, 'D:/PianoBrain/tools/sheet')
os.chdir('D:/PianoBrain')
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import bac_not as B
import khung

TRAN = (79, 81, 84, 88, 91)

tong = []
print('%-24s %4s %6s %5s %5s %5s  %s'
      % ('bai', 'n', 'tam', 'min', 'max', 'p95', ' '.join('>%d' % t for t in TRAN)))
for song in khung.nap_corpus()['songs']:
    if song.get('teacher') != 'linh-nhi':
        continue
    g = B.giong_ra_so(song.get('giong'))
    if not g or g[1] != 'truong':
        continue
    muc = B.do_bai(song)
    if not muc:
        continue
    v = sorted(m['midi'] for m in muc if m['doan'] == 'intro')
    if not v:
        continue
    tong.extend(v)
    p95 = v[int(0.95 * (len(v) - 1))]
    vuot = ' '.join('%4.1f%%' % (100.0 * sum(1 for x in v if x > t) / len(v)) for t in TRAN)
    print('%-24s %4d %6.1f %5d %5d %5d  %s'
          % (song['name'][:24], len(v), sum(v) / float(len(v)), v[0], v[-1], p95, vuot))

tong.sort()
p = lambda q: tong[int(q * (len(tong) - 1))]
print()
print('GOP BA BAI  n=%d  tam %.1f  min %d  max %d' % (len(tong), sum(tong) / float(len(tong)), tong[0], tong[-1]))
print('  phan vi: p50 %d · p75 %d · p90 %d · p95 %d · p99 %d' % (p(.5), p(.75), p(.9), p(.95), p(.99)))
for t in TRAN:
    n = sum(1 for x in tong if x > t)
    print('  tren %d: %d not = %.1f%%' % (t, n, 100.0 * n / len(tong)))
print()
print('So not RIENG LE o tung cao do tren 79:')
from collections import Counter
c = Counter(x for x in tong if x > 79)
for k in sorted(c):
    print('  %d : %d not' % (k, c[k]))
