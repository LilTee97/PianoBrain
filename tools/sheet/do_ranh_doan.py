"""Do lai sheet theo MOC DOAN NGUOI DUNG CHOT — dem LAN GO MOI, khong dem dau not.

Viet lai 11/9/2026 theo ban doi chieu cua Codex (Reference/TRA-LOI-PHIEU-CA-PHAO-3-SHEET-
CODEX-2026-09-11.md). Ban truoc dem dau not nen "23 not" hoa ra chi 7 lan go; gan nhan
run/fill tu so dau not la sai.

Dinh nghia:
- go moi  : mot thoi diem co it nhat mot not tay phai duoc danh moi (bo tie_stop; cac not
            cung onset = mot lan go). KHONG phai so not giai dieu.
- don     : lan go chi co MOT not (khong chord) — moi duoc xet vao chuoi run.
- run     : >= 5 lan go don lien tiep, moi khoang cach <= 1/2 phach, buoc 1–2 nua cung
            (buoc 0 khong tinh), khong co tie va khong co nghi giua hai lan go.
- phach   : neo tu meta['bar_start'] (dau o that), khong lay not som nhat.
Cac dau hieu khac (o day, vot cao, nghi) chi in ra de nguoi doc; KHONG tu gan HAT/DAN/FILL.

Chay: python tools/sheet/do_ranh_doan.py <thu_muc> <file.mxl> '<json doan>'
"""
import sys, os, json, collections
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(__file__)); import mxl, phieu_cua_loi as P
N = P.N

def ph(x):
    """Offset trong ô → chữ phách đếm 1,2,3,4 (3.25 → '4+1/4')."""
    b = int(x) + 1; f = x - int(x)
    return f"{b}" + ({0.25: '+1/4', 0.5: '+1/2', 0.75: '+3/4'}.get(round(f, 2), f"+{f:g}" if f else ''))

def go_moi(ns, b, hand):
    nb = [n for n in ns if n['bar'] == b and n['hand'] == hand and not n['tie_stop']]
    g = collections.defaultdict(list)
    for n in nb: g[round(n['beat'], 4)].append(n)
    return [(t, sorted(v, key=lambda n: n['midi'])) for t, v in sorted(g.items())]

def run_max(hits):
    """Chuỗi dài nhất các lần gõ ĐƠN liền nhau bước 1–2 nửa cung, cách ≤ ½ phách."""
    best = cur = 0; prev = None
    for t, notes in hits:
        if len(notes) != 1 or notes[0]['tie_start']:
            cur = 0; prev = None; continue
        n = notes[0]
        ok = prev is not None and 0 < abs(n['midi'] - prev['midi']) <= 2 and t - prev['beat'] <= 0.5 + 1e-6 and abs((prev['beat'] + prev['dur']) - t) < 1e-6
        cur = cur + 1 if ok else 1
        best = max(best, cur); prev = n
    return best

def do(path, doan):
    root = mxl.load(path); ns, meta = mxl.notes(root); H = P.harmonies(root)
    bars = sorted(meta['barlens']); bs = meta['bar_start']
    cua_o = {}
    for ten, (a, b) in doan.items():
        for o in range(a, b + 1): cua_o[o] = ten
    rows = []
    for b in bars:
        rh = go_moi(ns, b, 1); lh = go_moi(ns, b, 2)
        heads = [n for n in ns if n['bar'] == b and n['hand'] == 1]
        L = meta['barlens'][b]
        # phach nao co go moi RH
        beats = [0] * int(L)
        for t, _ in rh:
            i = int(t - bs[b])
            if 0 <= i < len(beats): beats[i] += 1
        tops = [max(n['midi'] for n in v) for _, v in rh]
        first_rh = ph(rh[0][0] - bs[b]) if rh else '-'
        last_rh = ph(rh[-1][0] - bs[b]) if rh else '-'
        rows.append(dict(bar=b, doan=cua_o.get(b, '?'), len=L, harm=' '.join(H.get(b, [])) or P.guess(ns, b),
                         rh_go=len(rh), rh_dau=len(heads), lh_go=len(lh), phach=beats,
                         top=(N[max(tops) % 12] + str(max(tops) // 12 - 1)) if tops else '-',
                         run=run_max(rh), rh_first=first_rh, rh_last=last_rh,
                         tie_in=any(n['tie_stop'] and n['hand'] == 1 and abs(n['beat'] - bs[b]) < 1e-6 for n in ns if n['bar'] == b)))
    return dict(bars=rows)

if __name__ == '__main__':
    d, f, j = sys.argv[1], sys.argv[2], sys.argv[3]
    r = do(os.path.join(d, f), json.loads(j))
    for x in r['bars']:
        print(f"{x['bar']:>3} {x['doan']:<9} {x['len']:g}/4 {x['harm']:<14} RH gõ{x['rh_go']:>2} (đầu nốt{x['rh_dau']:>3}) LH gõ{x['lh_go']:>2} phách{x['phach']} top {x['top']:<4} run{x['run']} gõ đầu {x['rh_first']} cuối {x['rh_last']}{' nối-từ-ô-trước' if x['tie_in'] else ''}")
