"""Do giong / hop am / loi / ban do o cua cac ban ky am.
Chay: python tools/sheet/do_giong_sheet.py <file1.mxl> <file2.mxl> ...  (file trong video/Ca_Phao/)
Dung cho phieu ingest/phieu-chia-doan-ca-phao-3-bai-moi.md (11/9/2026)."""
import sys,collections,json
sys.stdout.reconfigure(encoding='utf-8'); sys.path.insert(0,'tools/sheet'); import mxl
N=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']
MAJ=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88]; MIN=[6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17]
def corr(a,b):
    n=len(a);ma=sum(a)/n;mb=sum(b)/n;num=sum((x-ma)*(y-mb) for x,y in zip(a,b));den=(sum((x-ma)**2 for x in a)*sum((y-mb)**2 for y in b))**.5
    return num/den if den else 0
def key_est(h):
    b=[]
    for t in range(12):
        r=h[t:]+h[:t]; b.append((corr(r,MAJ),N[t]+' trưởng')); b.append((corr(r,MIN),N[t]+' thứ'))
    return sorted(b,reverse=True)
KIND={'major':'','minor':'m','dominant':'7','major-seventh':'maj7','minor-seventh':'m7','suspended-fourth':'sus4','suspended-second':'sus2','diminished':'dim','half-diminished':'m7b5','augmented':'aug','dominant-ninth':'9','major-sixth':'6','minor-sixth':'m6','power':'5','major-ninth':'maj9','minor-ninth':'m9','minor-11th':'m11','dominant-11th':'11','dominant-13th':'13'}
def harmonies(root):
    out=[]
    for part in root.findall('part'):
        for m in part.findall('measure'):
            bar=int(m.get('number') or 0)
            for h in m.findall('harmony'):
                r=h.find('root')
                if r is None: continue
                pc=(mxl.STEP[r.findtext('root-step')]+int(r.findtext('root-alter') or 0))%12
                kind=h.findtext('kind') or ''; bass=h.find('bass'); b=''
                if bass is not None: b='/'+N[(mxl.STEP[bass.findtext('bass-step')]+int(bass.findtext('bass-alter') or 0))%12]
                out.append((bar,N[pc]+KIND.get(kind,kind)+b))
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
files=sys.argv[1:]
for f in files:
    root=mxl.load('video/Ca_Phao/'+f); ns,meta=mxl.notes(root)
    fif=meta['fifths']; harm=harmonies(root); lyr=lyrics(root); bars=sorted(meta['barlens'])
    hist=[0.0]*12
    for n in ns: hist[n['midi']%12]+=n['dur']
    last=max(n['bar'] for n in ns)
    print(f"=== {f} ===")
    print(f"ô: {len(bars)} (tiếng hết ô {last}) | nhịp: {dict(collections.Counter(meta['barlens'].values()))} | fifths={fif} → {N[(fif*7)%12]} trưởng / {N[(fif*7+9)%12]} thứ")
    print(f"ký hiệu hợp âm: {len(harm)} | ô có lời: {len(lyr)}" + (f" (ô {min(lyr)}–{max(lyr)})" if lyr else ""))
    print("Krumhansl cả bài:", [(round(c,2),k) for c,k in key_est(hist)[:3]])
    lb=[n for n in ns if n['bar']==last]; print("nốt ô cuối:", sorted({N[n['midi']%12] for n in lb}), "| bass ô cuối:", N[min(n['midi'] for n in lb if n['hand']==2)%12] if any(n['hand']==2 for n in lb) else '-')
    print("chữ trên khuông:", meta['words'][:10])
    if harm: print("hợp âm theo ô:", ' '.join(f"{b}:{h}" for b,h in harm))
    if lyr:
        ranges=[]; prev=None
        for b in bars:
            has=b in lyr
            if has and (prev is None or not prev): start=b
            if not has and prev: ranges.append((start,b-1))
            prev=has
        if prev: ranges.append((start,bars[-1]))
        print("khoảng ô có lời:", ranges)
    print("--- giọng cửa sổ 8 ô ---")
    for s in range(bars[0],bars[-1]+1,8):
        w=[n for n in ns if s<=n['bar']<s+8]
        if not w: continue
        h=[0.0]*12
        for n in w: h[n['midi']%12]+=n['dur']
        k=key_est(h); print(f"ô {s:>3}–{min(s+7,bars[-1]):>3}: {k[0][1]:<11}({k[0][0]:.2f}) {k[1][1]:<11}({k[1][0]:.2f})")
    print("--- bản đồ ô: bass · RH n/nốt cao nhất · (lời) ---")
    for s in range(bars[0],bars[-1]+1,4):
        cells=[]
        for b in range(s,min(s+4,bars[-1]+1)):
            lh=[n['midi'] for n in ns if n['bar']==b and n['hand']==2]; rh=[n['midi'] for n in ns if n['bar']==b and n['hand']==1]
            top=max(rh) if rh else None
            l=''.join(lyr.get(b,[]))[:6]
            cells.append(f"{(N[min(lh)%12] if lh else '-'):<2}{len(rh):>2}{('/'+N[top%12]+str(top//12-1)) if top else '':<5}{(' '+l) if l else '':<7}")
        print(f"{s:>3}: "+' | '.join(cells))
    print()
