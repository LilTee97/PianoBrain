# -*- coding: utf-8 -*-
"""Do cach HAI TAY phoi hop, tung doan mot.

Cau hoi: phong cach ghep tay trai / tay phai cua nguoi soan thay doi the nao
giua doan hat va doan solo, va tay trai chay hinh gi luc solo.

Chi in so. Ket luan de nguoi doc rut.
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mxl


def tai(path):
    ns, meta = mxl.notes(mxl.load(path))
    return ns, meta


def moc(ns):
    """Gom not theo (o, phach) -> danh sach midi."""
    out = {}
    for n in ns:
        out.setdefault((n['bar'], round(n['beat'], 3)), []).append(n['midi'])
    return out


def doan(ns, a, b):
    return [n for n in ns if a <= n['bar'] <= b]


def do(ns, a, b, barlen):
    trong = doan(ns, a, b)
    so_o = b - a + 1
    trai = [n for n in trong if n['hand'] == 2]
    phai = [n for n in trong if n['hand'] == 1]
    mt, mp = moc(trai), moc(phai)
    chung = set(mt) & set(mp)

    # Lop cao do: tay phai co choi lai chinh cao do tay trai dang giu khong
    nhan_ban = 0
    for k in chung:
        lop_t = {m % 12 for m in mt[k]}
        if any((m % 12) in lop_t for m in mp[k]):
            nhan_ban += 1

    # Khe hai tay tai moc chung
    khe = sorted(min(mp[k]) - max(mt[k]) for k in chung) if chung else []

    # Tay trai: khoang cach giua hai moc go lien nhau, trong tung o
    mocs_t = sorted(mt)
    khoang = []
    for i in range(1, len(mocs_t)):
        if mocs_t[i][0] == mocs_t[i - 1][0]:
            khoang.append(round(mocs_t[i][1] - mocs_t[i - 1][1], 3))
    khoang.sort()

    # Tay trai co bao nhieu not moi cu go (bass don hay chong)
    chong = sum(1 for k in mt if len(mt[k]) > 1)

    # Be rong tay trai trong moi o
    rong = []
    for o in range(a, b + 1):
        m = [n['midi'] for n in trai if n['bar'] == o]
        if len(m) >= 2:
            rong.append(max(m) - min(m))
    rong.sort()

    # Phach 1 cua moi o: tay phai co not khong, tay trai co not khong
    p1t = p1p = 0
    for o in range(a, b + 1):
        b0 = min((n['beat'] for n in trong if n['bar'] == o), default=None)
        if b0 is None:
            continue
        if any(abs(n['beat'] - b0) < 0.05 for n in trai):
            p1t += 1
        if any(abs(n['beat'] - b0) < 0.05 for n in phai):
            p1p += 1

    giua = lambda xs: xs[len(xs) // 2] if xs else 0
    return dict(
        o=f'{a}-{b}',
        so_o=so_o,
        phai_not_moi_o=round(len(phai) / so_o, 1),
        trai_not_moi_o=round(len(trai) / so_o, 1),
        trai_moc_moi_o=round(len(mt) / so_o, 1),
        moc_chung=round(len(chung) / max(1, len(mt | mp.keys() if False else set(mt) | set(mp))), 3),
        nhan_ban=round(nhan_ban / max(1, len(chung)), 3),
        khe_giua=giua(khe),
        khe_hep=khe[0] if khe else None,
        trai_chong_not=round(chong / max(1, len(mt)), 3),
        trai_khoang_giua=giua(khoang),
        trai_be_rong=giua(rong),
        phach1_trai=round(p1t / so_o, 3),
        phach1_phai=round(p1p / so_o, 3),
        tran_phai=max((n['midi'] for n in phai), default=0),
        day_trai=min((n['midi'] for n in trai), default=0),
    )


def main():
    folder = os.path.dirname(os.path.abspath(__file__))
    corpus = json.load(open(os.path.join(folder, 'corpus.json'), encoding='utf-8'))
    ten = sys.argv[1] if len(sys.argv) > 1 else None
    sheets = os.environ.get('PIANOBRAIN_SHEETS') or os.path.join(
        os.path.dirname(os.path.dirname(folder)), 'PianoBrain', 'video')

    for song in corpus['songs']:
        if ten and ten.lower() not in song['name'].lower():
            continue
        path = os.path.join(sheets, song['file'])
        if not os.path.exists(path):
            print(f"  THIEU {song['name']}: {song['file']}")
            continue
        ns, meta = tai(path)
        print(f"\n=== {song['name']} ({song['genre']}) ===")
        for kind, sec in (song.get('sections') or {}).items():
            a, b = sec['bars']
            r = do(ns, a, b, 4)
            print(f"  {kind:11} o {r['o']:>8} | phai {r['phai_not_moi_o']:>4}/o  trai {r['trai_not_moi_o']:>4}/o "
                  f"({r['trai_moc_moi_o']:>4} moc) | chung {r['moc_chung']:.0%} nhan ban {r['nhan_ban']:.0%} "
                  f"| khe {r['khe_giua']:>3} (hep {r['khe_hep']}) | trai: chong {r['trai_chong_not']:.0%} "
                  f"khoang {r['trai_khoang_giua']} rong {r['trai_be_rong']} "
                  f"| phach1 T{r['phach1_trai']:.0%} P{r['phach1_phai']:.0%} | tran {r['tran_phai']} day {r['day_trai']}")


if __name__ == '__main__':
    main()
