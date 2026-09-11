"""Sinh hang "cua loi" cho phieu chia doan: tai cac o nghi chuyen hat/dan, in hop am (ky hieu
trong file neu co, khong thi may doan tu not), so not + tam tay phai/trai.

Chay:  python tools/sheet/phieu_cua_loi.py <thu_muc_thay> <file.mxl> <o1,o2> <o3,o4,o5> ...
Moi nhom o cach nhau bang dau phay la mot hang. In ra JSON (list hang) de ghep vao phieu.
"""
import sys, json, collections, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(__file__)); import mxl
N=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']
KIND={'major':'','minor':'m','dominant':'7','major-seventh':'maj7','minor-seventh':'m7','suspended-fourth':'sus4','suspended-second':'sus2','diminished':'dim','half-diminished':'m7b5','augmented':'aug','dominant-ninth':'9','major-sixth':'6','minor-sixth':'m6','power':'5','major-ninth':'maj9','minor-ninth':'m9','minor-11th':'m11','dominant-11th':'11','dominant-13th':'13','major-minor':'mMaj7'}
TPL=[('',{0,4,7}),('m',{0,3,7}),('7',{0,4,7,10}),('maj7',{0,4,7,11}),('m7',{0,3,7,10}),('sus4',{0,5,7}),('sus2',{0,2,7}),('dim',{0,3,6}),('m7b5',{0,3,6,10}),('6',{0,4,7,9}),('add9',{0,2,4,7})]
def harmonies(root):
    out=collections.defaultdict(list)
    for part in root.findall('part'):
        for m in part.findall('measure'):
            bar=int(m.get('number') or 0)
            for h in m.findall('harmony'):
                r=h.find('root')
                if r is None: continue
                pc=(mxl.STEP[r.findtext('root-step')]+int(r.findtext('root-alter') or 0))%12
                kind=h.findtext('kind') or ''; bass=h.find('bass'); b=''
                if bass is not None: b='/'+N[(mxl.STEP[bass.findtext('bass-step')]+int(bass.findtext('bass-alter') or 0))%12]
                out[bar].append(N[pc]+KIND.get(kind,kind)+b)
    return out
def guess(ns,b):
    nb=[n for n in ns if n['bar']==b]
    if not nb: return '—'
    lh=[n for n in nb if n['hand']==2]; w=collections.Counter()
    for n in nb: w[n['midi']%12]+=n['dur']*(2 if n['hand']==2 else 1)
    pcs={p for p,v in w.items() if v>=0.5}
    bass=min(lh,key=lambda n:(n['beat'],n['midi']))['midi']%12 if lh else min(nb,key=lambda n:n['midi'])['midi']%12
    best=None
    for root in [bass]+[p for p in pcs if p!=bass]:
        for name,t in TPL:
            tp={(root+i)%12 for i in t}; sc=len(tp&pcs)/len(tp)-0.15*len(pcs-tp)+(0.3 if root==bass else 0)
            if best is None or sc>best[0]: best=(sc,root,name,tp)
    sc,root,name,tp=best; s=N[root]+name
    if root!=bass and bass in tp: s+='/'+N[bass]
    return s+'?'
def rh(ns,b):
    r=[n for n in ns if n['bar']==b and n['hand']==1]; l=[n for n in ns if n['bar']==b and n['hand']==2]
    if not r: return f'RH 0, LH {len(l)}'
    lo=min(n['midi'] for n in r); hi=max(n['midi'] for n in r)
    return f"RH {len(r)} ({N[lo%12]}{lo//12-1}–{N[hi%12]}{hi//12-1}), LH {len(l)}"
def hang(path, nhom):
    root=mxl.load(path); ns,meta=mxl.notes(root); H=harmonies(root)
    rows=[]
    for bars in nhom:
        ch=' · '.join(f"{b}:{' '.join(H[b]) if H.get(b) else guess(ns,b)}" for b in bars)
        rows.append(dict(o='→'.join(map(str,bars)), hopam=ch, tay=' ; '.join(f"{b}: {rh(ns,b)}" for b in bars)))
    return rows
if __name__=='__main__':
    d,f=sys.argv[1],sys.argv[2]
    nhom=[[int(x) for x in g.split(',')] for g in sys.argv[3:]]
    print(json.dumps(hang(os.path.join(d,f),nhom),ensure_ascii=False,indent=1))
