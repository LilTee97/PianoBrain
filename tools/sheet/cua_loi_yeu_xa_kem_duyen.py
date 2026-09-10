"""Bang cua loi cho phieu ingest/phieu-cua-loi-yeu-xa-kem-duyen.md: doan hop am tu not + tom tay phai tai cac o nghi chuyen hat/dan.
Chay: python tools/sheet/cua_loi_yeu_xa_kem_duyen.py"""
import sys,collections
sys.stdout.reconfigure(encoding='utf-8'); sys.path.insert(0,'tools/sheet'); import mxl
N=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']
TPL=[('',{0,4,7}),('m',{0,3,7}),('7',{0,4,7,10}),('maj7',{0,4,7,11}),('m7',{0,3,7,10}),('sus4',{0,5,7}),('sus2',{0,2,7}),('dim',{0,3,6}),('m7b5',{0,3,6,10}),('6',{0,4,7,9}),('add9',{0,2,4,7})]
def chord(ns,b):
    nb=[n for n in ns if n['bar']==b]
    if not nb: return '—'
    lh=[n for n in nb if n['hand']==2]
    w=collections.Counter()
    for n in nb: w[n['midi']%12]+=n['dur']*(2 if n['hand']==2 else 1)
    pcs={p for p,v in w.items() if v>=0.5}
    bass=min(lh,key=lambda n:(n['beat'],n['midi']))['midi']%12 if lh else min(nb,key=lambda n:n['midi'])['midi']%12
    best=None
    for root in [bass]+[p for p in pcs if p!=bass]:
        for name,t in TPL:
            tp={(root+i)%12 for i in t}
            sc=len(tp&pcs)/len(tp) - 0.15*len(pcs-tp) + (0.3 if root==bass else 0)
            if best is None or sc>best[0]: best=(sc,root,name,tp)
    sc,root,name,tp=best
    s=N[root]+name
    if root!=bass and bass in tp: s+='/'+N[bass]
    return s
def rh(ns,b):
    r=[n for n in ns if n['bar']==b and n['hand']==1]; l=[n for n in ns if n['bar']==b and n['hand']==2]
    if not r: return f'RH 0, LH {len(l)}'
    lo=min(n['midi'] for n in r); hi=max(n['midi'] for n in r)
    return f"RH {len(r)} ({N[lo%12]}{lo//12-1}–{N[hi%12]}{hi//12-1}), LH {len(l)}"
def bang(f,moc):
    ns,m=mxl.notes(mxl.load('video/Ca_Phao/'+f))
    for bars,cau in moc:
        ch=' · '.join(f"{b}:`{chord(ns,b)}`" for b in bars)
        r=' ; '.join(f"{b}: {rh(ns,b)}" for b in bars)
        lab='→'.join(str(b) for b in bars)
        print(f"| **{lab}** | {ch} | {r} | {cau} | |")
print("=== Yêu xa ===")
bang('yeu-xa-ca-phao-cove.mxl',[
 ([1,2],'dạo: ô 1 chỉ RH?'),([8,9,10],'ô 9 bass G — chữ hát vào ở 9 hay 10? corpus dạo 1–9'),
 ([24,25],'25 vào điệp (vòng C F F E)?'),([32,33],'33 lặp điệp hay còn đàn?'),
 ([40,41,42],'41 hết hát, vào giang? 42 RH 16'),([48,49,50,51],'vòng phiên G C C F đã về ở 49 — hát lại từ 49 hay 51 (corpus giang tới 50)?'),
 ([64,65],'65 điệp lặp?'),([80,81],'81 còn hát? vòng đổi C F F E C F D G'),
 ([88,89,90],'89 RH 26 nốt lên G7 — chạy đàn nối? hết lời từ 88?'),([92,93,94],'93 sang Rê giáng — hát điệp nâng tone từ 93 hay 97?'),
 ([96,97],'97 RH 28 nốt lên F7 — đàn hay hát?'),([104,105,106],'kết đàn từ 105 hay 106? corpus 106–112'),([109,110],'110 chỉ RH lên C7; 111–112 trống'),
])
print("\n=== Kém duyên ===")
bang('kem-duyen.mxl',[
 ([1,2],'không có dạo — hát ngay ô 1?'),([16,17,18],'17 không bass, RH lên F5 — vào điệp?'),
 ([26,27,28],'27 vào giang (RH 16–21)? corpus 27–36'),([36,37,38],'37 hát lại? RH tụt còn 5'),
 ([48,49,50],'49 điệp lặp? bass F F'),([60,61,62],'61–65 RH 16–20, bass Eb C# C Bb như giang — đàn hay hát cao trào?'),
 ([65,66,67],'66 hát lại?'),([69,70,71],'70 kết đàn? ô 69 RH chỉ 3'),([77,78,79],'77–79 giữ Bb — đuôi đàn'),
])
