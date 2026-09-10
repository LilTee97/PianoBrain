"""Do giong 4 ban Ca Phao khoi phuc 10/9/2026 (Beo dat, Kem duyen, Yeu xa, Mo).
Chay: python tools/sheet/giong_ca_phao_4_bai.py  — ra giong theo cua so 8 o va ban do bass/RH tung o.
So do trong ingest/phieu-chia-doan-ca-phao-4-bai.md lay tu day."""
import sys, os, zipfile, json, collections
import xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'tools/sheet'); import mxl
NAMES=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']
MAJ=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88]
MIN=[6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17]
def corr(a,b):
    n=len(a);ma=sum(a)/n;mb=sum(b)/n
    num=sum((x-ma)*(y-mb) for x,y in zip(a,b));den=(sum((x-ma)**2 for x in a)*sum((y-mb)**2 for y in b))**.5
    return num/den if den else 0
def key_est(hist):
    best=[]
    for t in range(12):
        rot=hist[t:]+hist[:t]
        best.append((corr(rot,MAJ),NAMES[t]+' trưởng'));best.append((corr(rot,MIN),NAMES[t]+' thứ'))
    return sorted(best,reverse=True)[:3]
KIND={'major':'','minor':'m','dominant':'7','major-seventh':'maj7','minor-seventh':'m7','suspended-fourth':'sus4','suspended-second':'sus2','diminished':'dim','half-diminished':'m7b5','augmented':'aug','dominant-ninth':'9','major-sixth':'6','minor-sixth':'m6','power':'5'}
def harmonies(root):
    out=[]
    for part in root.findall('part'):
        for m in part.findall('measure'):
            bar=int(m.get('number') or 0)
            for h in m.findall('harmony'):
                r=h.find('root');
                if r is None: continue
                pc=(mxl.STEP[r.findtext('root-step')]+int(r.findtext('root-alter') or 0))%12
                kind=h.findtext('kind') or ''
                bass=h.find('bass'); b=''
                if bass is not None: b='/'+NAMES[(mxl.STEP[bass.findtext('bass-step')]+int(bass.findtext('bass-alter') or 0))%12]
                out.append((bar,NAMES[pc]+KIND.get(kind,kind)+b))
    return out
def lyrics(root):
    bars=collections.defaultdict(list)
    for part in root.findall('part'):
        for m in part.findall('measure'):
            bar=int(m.get('number') or 0)
            for n in m.findall('note'):
                for l in n.findall('lyric'):
                    t=l.findtext('text')
                    if t: bars[bar].append(t)
    return bars
files={'Bèo dạt mây trôi':'beo-dat-may-troi-ca-phao.mxl','Kém duyên':'kem-duyen.mxl','Yêu xa':'yeu-xa-ca-phao-cove.mxl','Mơ':'mo.mxl'}
res={}
for name,f in files.items():
    root=mxl.load('video/Ca_Phao/'+f)
    ns,meta=mxl.notes(root)
    fif=meta['fifths']
    ks_major=NAMES[(fif*7)%12]; ks_minor=NAMES[(fif*7+9)%12]
    hist=[0.0]*12
    for n in ns: hist[n['midi']%12]+=n['dur']
    harm=harmonies(root); lyr=lyrics(root)
    bars=sorted(meta['barlens'])
    # per-bar
    rows=[]
    for b in bars:
        nb=[n for n in ns if n['bar']==b]
        lh=[n for n in nb if n['hand']==2]; rh=[n for n in nb if n['hand']==1]
        bass=min((n['midi'] for n in lh),default=None)
        rows.append(dict(bar=b,bass=NAMES[bass%12]+str(bass//12-1) if bass is not None else '-',rh=len(rh),lh=len(lh),
                         harm=' '.join(h for bb,h in harm if bb==b),lyr=''.join(lyr.get(b,[]))[:14]))
    first=[r for r in rows if r['bass']!='-'][0]; last=[r for r in rows if r['bass']!='-'][-1]
    # last bar pitch classes
    lastbar=max(n['bar'] for n in ns); lastpcs=sorted({NAMES[n['midi']%12] for n in ns if n['bar']==lastbar})
    firstpcs=sorted({NAMES[n['midi']%12] for n in ns if n['bar']==min(n['bar'] for n in ns)})
    # bass histogram of bar-start
    bh=collections.Counter(r['bass'][:-1] for r in rows if r['bass']!='-')
    ts=collections.Counter(meta['barlens'].values())
    print(f"=== {name} ({f}) ===")
    print(f"ô: {len(bars)} | số chỉ nhịp (độ dài ô): {dict(ts)} | fifths={fif} → bộ dấu hoá: {ks_major} trưởng / {ks_minor} thứ")
    print(f"ký hiệu hợp âm trong file: {len(harm)} | ô có lời: {len(lyr)} (ô {min(lyr) if lyr else '-'}–{max(lyr) if lyr else '-'})")
    print(f"Krumhansl (theo trường độ, cả bài): {[(round(c,3),k) for c,k in key_est(hist)]}")
    print(f"bass ô đầu có tiếng: ô {first['bar']} {first['bass']} | nốt ô 1: {firstpcs}")
    print(f"bass ô cuối: ô {last['bar']} {last['bass']} | nốt ô cuối ({lastbar}): {lastpcs}")
    print(f"bass 6 nốt hay gặp nhất: {bh.most_common(6)}")
    print(f"chữ trên khuông: {meta['words'][:12]}")
    if harm: print("hợp âm 12 ô đầu:", [(b,h) for b,h in harm if b<=12])
    print("bảng ô: bar|bass|RH|LH|hợp âm|lời")
    for r in rows: print(f"{r['bar']:>3} {r['bass']:<4} {r['rh']:>2} {r['lh']:>2} {r['harm']:<10} {r['lyr']}")
    print()

print("\n\n######## GIỌNG THEO CỬA SỔ 8 Ô (Krumhansl) + bass đầu ô ########")
for name,f in files.items():
    root=mxl.load('video/Ca_Phao/'+f); ns,meta=mxl.notes(root)
    bars=sorted(meta['barlens']); print(f"=== {name} ===")
    for s in range(bars[0],bars[-1]+1,8):
        w=[n for n in ns if s<=n['bar']<s+8]
        if not w: continue
        h=[0.0]*12
        for n in w: h[n['midi']%12]+=n['dur']
        k=key_est(h)
        basses=[]
        for b in range(s,min(s+8,bars[-1]+1)):
            lh=[n['midi'] for n in ns if n['bar']==b and n['hand']==2]
            basses.append(NAMES[min(lh)%12] if lh else '-')
        rhd=sum(1 for n in w if n['hand']==1)/max(1,len({n['bar'] for n in w}))
        print(f"ô {s:>3}–{min(s+7,bars[-1]):>3}: {k[0][1]:<11}({k[0][0]:.2f})  {k[1][1]:<11}({k[1][0]:.2f})  bass: {' '.join(f'{b:<2}' for b in basses)}  RH/ô {rhd:.1f}")

print("\n\n######## BASS + RH mỗi ô, nhóm 4 ô ########")
for name,f in files.items():
    root=mxl.load('video/Ca_Phao/'+f); ns,meta=mxl.notes(root)
    bars=sorted(meta['barlens']); print(f"=== {name} ===")
    for s in range(bars[0],bars[-1]+1,4):
        cells=[]
        for b in range(s,min(s+4,bars[-1]+1)):
            lh=[n['midi'] for n in ns if n['bar']==b and n['hand']==2]; rh=[n for n in ns if n['bar']==b and n['hand']==1]
            top=max((n['midi'] for n in rh),default=None)
            cells.append(f"{(NAMES[min(lh)%12] if lh else '-'):<2}{len(rh):>2}{('/'+NAMES[top%12]+str(top//12-1)) if top else '':<5}")
        print(f"{s:>3}: "+' | '.join(cells))
