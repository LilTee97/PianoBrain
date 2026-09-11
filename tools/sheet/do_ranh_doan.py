"""Do lai sheet theo MOC DOAN NGUOI DUNG CHOT: tai moi ranh gioi va trong tung doan, tach
pickup / fill / run / cho lan hat-dan bang so not tay phai theo phach.

Chay: python tools/sheet/do_ranh_doan.py <thu_muc> <file.mxl> '<json doan>'
  json doan: {"dao":[0,3],"phien":[4,19],...}  (ten doan tu do, thu tu theo bai)
In JSON: {bars:[{bar, harm, lh, rh, beats:[n phach1..], top, lo, run, spike}], flags:[...]}

Dinh nghia (may do, khong phai luat):
- run    : chuoi >= 5 not tay phai lien tiep, moi not <= 0,5 phach, buoc <= 2 nua cung
- fill   : o trong doan HAT co so not tay phai >= 1,7x trung vi cua doan
- pickup : o cuoi mot doan ma tay phai co not o phach cuoi va o ay thua o 3 phach dau
- spike  : not cao nhat cua o cao hon trung vi doan >= 12 nua cung
"""
import sys, os, json, collections, statistics
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(__file__)); import mxl, phieu_cua_loi as P
N = P.N

def do(path, doan):
    root = mxl.load(path); ns, meta = mxl.notes(root); H = P.harmonies(root)
    barlens = meta['barlens']; bars = sorted(barlens)
    # doan cua tung o
    cua_o = {}
    for ten, (a, b) in doan.items():
        for o in range(a, b + 1): cua_o[o] = ten
    rows = {}
    for b in bars:
        nb = [n for n in ns if n['bar'] == b]
        rh = sorted([n for n in nb if n['hand'] == 1], key=lambda n: (n['beat'], n['midi']))
        lh = [n for n in nb if n['hand'] == 2]
        L = int(barlens[b]); start = min((n['beat'] for n in nb), default=0)
        # phach cua not = beat - dau o. Dau o = beat nho nhat trong o (ke ca LH) lam moc gan dung
        base = min((n['beat'] for n in nb), default=0.0)
        beats = [0] * max(L, 1)
        for n in rh:
            i = int(n['beat'] - base)
            if 0 <= i < len(beats): beats[i] += 1
        # run: chuoi not don (khong chord) ngan, buoc nho
        singles = [n for n in rh if not n['chord']]
        best = cur = 1
        for x, y in zip(singles, singles[1:]):
            if x['dur'] <= 0.5 and y['dur'] <= 0.5 and abs(y['midi'] - x['midi']) <= 2: cur += 1
            else: cur = 1
            best = max(best, cur)
        rows[b] = dict(bar=b, doan=cua_o.get(b, '?'), harm=' '.join(H.get(b, [])) or P.guess(ns, b), lh=len(lh), rh=len(rh), beats=beats,
                       top=max((n['midi'] for n in rh), default=None), lo=min((n['midi'] for n in rh), default=None), run=best, len=L)
    # trung vi theo doan
    med = {}
    for ten, (a, b) in doan.items():
        xs = [rows[o]['rh'] for o in range(a, b + 1) if o in rows]
        tops = [rows[o]['top'] for o in range(a, b + 1) if o in rows and rows[o]['top'] is not None]
        med[ten] = (statistics.median(xs) if xs else 0, statistics.median(tops) if tops else 0)
    flags = []
    hat = {t for t in doan if not any(k in t for k in ('dao', 'giang', 'ket'))}
    for b in bars:
        r = rows[b]; t = r['doan']
        if t not in med: continue
        m_rh, m_top = med[t]
        f = []
        if r['run'] >= 5: f.append(f"run {r['run']} nốt")
        if t in hat and m_rh and r['rh'] >= 1.7 * m_rh: f.append(f"fill? RH {r['rh']} vs trung vị đoạn {m_rh:g}")
        if r['top'] is not None and m_top and r['top'] >= m_top + 12: f.append(f"vọt {N[r['top']%12]}{r['top']//12-1}")
        # pickup: o cuoi doan
        cuoi = any(b == v[1] for v in doan.values())
        if cuoi and len(r['beats']) >= 2 and r['beats'][-1] >= 2 and sum(r['beats'][:-1]) <= 2: f.append('pickup? nốt dồn phách cuối')
        if f: flags.append(dict(bar=b, doan=t, note='; '.join(f)))
    return dict(bars=list(rows.values()), flags=flags, med={k: v for k, v in med.items()})

if __name__ == '__main__':
    d, f, j = sys.argv[1], sys.argv[2], sys.argv[3]
    print(json.dumps(do(os.path.join(d, f), json.loads(j)), ensure_ascii=False))
