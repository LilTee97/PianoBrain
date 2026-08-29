"""Đo hình dạng thống kê của các bản ký âm piano.

Chạy:  python tools/sheet/profile.py           -> bảng tóm tắt
       python tools/sheet/profile.py --json    -> JSON đầy đủ

Thư mục chứa file .mxl lấy từ biến môi trường PIANOBRAIN_SHEETS, giống cách
PIANOBRAIN_MASTER trỏ tới kho master. Sheet nằm NGOÀI kho; kho chỉ đăng ký nguồn.

HAI CÁI BẪY của tầng này, cả hai đã làm sai số một lần:

1. Suy hợp âm từ CẢ HAI TAY là tự chứng minh chính mình. Lấy cả nốt tay phải để
   đoán hợp âm rồi lại hỏi tay phải có bám hợp âm không thì con số vô nghĩa.
   Lần đầu đo ra 58-84%; suy lại chỉ từ tay trái ra 41-69%.

2. Nhóm theo SỐ Ô NHỊP THẬT của nốt, đừng tính ngược từ phách chia cho một độ
   dài ô nhịp duy nhất — bài đổi số chỉ nhịp giữa chừng sẽ lệch hết.
"""

import collections
import json
import os
import random
import statistics
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import midi  # noqa: E402
import mxl  # noqa: E402

NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
CHORDS = {
    'maj': (0, 4, 7), 'min': (0, 3, 7), '7': (0, 4, 7, 10), 'm7': (0, 3, 7, 10),
    'maj7': (0, 4, 7, 11), 'm7b5': (0, 3, 6, 10), 'dim': (0, 3, 6),
    'sus4': (0, 5, 7), 'm6': (0, 3, 7, 9), '6': (0, 4, 7, 9),
}

# Hai nốt cách nhau quá ngần này thì không còn cùng một hơi.
BREATH = 0.5
# Bước rộng hơn ngần này thì hai nốt không thuộc cùng một câu.
LEAP = 12
# Câu ngắn hơn ngần này thì không đủ để nói nó có hình gì.
MIN_RUN = 4


def by_bar(notes):
    out = collections.defaultdict(lambda: {'rh': [], 'lh': []})
    for note in notes:
        out[note['bar']]['rh' if note['hand'] == 1 else 'lh'].append(note)
    return out


def melody(right):
    """Đường giai điệu: nốt CAO NHẤT tại mỗi mốc thời gian."""
    at = collections.defaultdict(list)
    for note in right:
        at[round(note['beat'], 4)].append(note['midi'])
    return [(t, max(v)) for t, v in sorted(at.items())]


def steps(line):
    """Đếm bước giữa các nốt liền nhau."""
    count = collections.Counter()
    for (_, a), (_, b) in zip(line, line[1:]):
        gap = abs(b - a)
        if gap == 0:
            count['lap'] += 1
        elif gap <= 2:
            count['lien_bac'] += 1
        elif gap <= 4:
            count['quang_ba'] += 1
        elif gap <= 7:
            count['quang_45'] += 1
        else:
            count['nhay_xa'] += 1
    return count


def runs_of(line):
    """Cắt đường giai điệu thành từng câu chạy."""
    out, current = [], []
    for point in line:
        previous = current[-1] if current else None
        joins = previous is not None and (
            point[0] - previous[0] <= BREATH + 1e-6
            and abs(point[1] - previous[1]) <= LEAP
        )
        if previous is None or joins:
            current.append(point)
            continue
        if len(current) >= MIN_RUN:
            out.append(current)
        current = [point]
    if len(current) >= MIN_RUN:
        out.append(current)
    return out


def run_kind(run):
    """Câu này là gam, là rải hợp âm, hay pha trộn. Ngưỡng 60%."""
    gaps = [abs(b - a) for (_, a), (_, b) in zip(run, run[1:]) if a != b]
    if not gaps:
        return None
    stepwise = sum(1 for g in gaps if g <= 2) / len(gaps)
    thirds = sum(1 for g in gaps if 3 <= g <= 4) / len(gaps)
    if stepwise >= 0.6:
        return 'gam'
    if thirds >= 0.6:
        return 'rai'
    return 'tron'


def harmony(left, barlens, nbars):
    """Đoán hợp âm từng ô nhịp, CHỈ TỪ TAY TRÁI. Xem bẫy 1 ở đầu file."""
    weight = [collections.Counter() for _ in range(nbars + 2)]
    bass = [[] for _ in range(nbars + 2)]
    for note in left:
        bar = note['bar']
        if not 1 <= bar <= nbars:
            continue
        length = barlens.get(bar, 4.0)
        room = length - (note['beat'] % length if length else 0)
        weight[bar][note['midi'] % 12] += min(
            max(note['dur'], 1e-6), room if room > 0 else length)
        bass[bar].append(note['midi'])

    out = {}
    for bar in range(1, nbars + 1):
        w = weight[bar]
        total = sum(w.values())
        if total < 0.5:
            continue
        best = None
        for root in range(12):
            for name, shape in CHORDS.items():
                tones = {(root + i) % 12 for i in shape}
                inside = sum(v for k, v in w.items() if k in tones)
                outside = sum(v for k, v in w.items() if k not in tones)
                score = inside - 0.9 * outside - 0.04 * len(shape)
                if bass[bar] and min(bass[bar]) % 12 == root:
                    score += 0.35 * total
                if best is None or score > best[0]:
                    best = (score, root, name, tones)
        out[bar] = dict(root=best[1], name=best[2], tones=best[3],
                        symbol=NAMES[best[1]] + ('' if best[2] == 'maj' else best[2]))
    return out


def section_stats(bars, span):
    a, b = span
    right = [n for i in range(a, b + 1) for n in bars[i]['rh']]
    left = [n for i in range(a, b + 1) for n in bars[i]['lh']]
    count = b - a + 1
    line = melody(right)
    sh = steps(line)
    total = sum(sh.values()) or 1
    onsets = len({(n['bar'], round(n['beat'], 3)) for n in left})
    low = sorted(n['midi'] for n in left)[:max(1, len(left) // 20)] or [0]
    return {
        'o': [a, b],
        'phai_not_moi_o': len(line) / count,
        'trai_moc_moi_o': onsets / count,
        'day_bass': sum(low) // len(low),
        'lien_bac': sh['lien_bac'] / total,
        'quang_ba': sh['quang_ba'] / total,
        'nhay_xa': sh['nhay_xa'] / total,
        'lap': sh['lap'] / total,
    }


# Khe từ ngần này trở lên là chỗ NGHỈ — ranh giới giữa hai câu.
BREATH_GAP = 1.5


def rhythm(line):
    """Chuỗi khoảng cách giữa hai nốt liền nhau, làm tròn về lưới quen thuộc."""
    out = []
    for (t1, _), (t2, _) in zip(line, line[1:]):
        gap = t2 - t1
        if gap <= 0:
            continue
        # Lam tron ve 1/12 not den: du min cho ca chum ba lan moc kep.
        out.append(round(round(gap * 12) / 12, 3))
    return out


def phrases(line):
    """Cắt đường giai điệu thành từng CÂU, ranh giới là chỗ nghỉ."""
    out, current = [], []
    for point in line:
        if current and point[0] - current[-1][0] >= BREATH_GAP:
            if len(current) >= 3:
                out.append(current)
            current = []
        current.append(point)
    if len(current) >= 3:
        out.append(current)
    return out


def cells(line, size=3):
    """Đếm hình nhịp: mọi dãy `size` khoảng cách liền nhau, TRONG một câu.

    Không cho hình vắt qua chỗ nghỉ: hai bên chỗ nghỉ là hai câu khác nhau, ghép
    lại thì đếm ra một hình chẳng ai chơi.
    """
    found = collections.Counter()
    for phrase in phrases(line):
        gaps = rhythm(phrase)
        for at in range(len(gaps) - size + 1):
            found[tuple(gaps[at:at + size])] += 1
    return found


def silence(line, total_beats):
    """Bao nhiêu phần thời gian KHÔNG có nốt nào vào."""
    if total_beats <= 0 or not line:
        return 0.0
    sounding = 0.0
    for (t1, _), (t2, _) in zip(line, line[1:]):
        sounding += min(t2 - t1, BREATH_GAP)
    return max(0.0, 1 - sounding / total_beats)


def answers(line, seed=7):
    """Câu sau có lặp hình nhịp câu trước không — KÈM NỀN SO SÁNH.

    Trả về (liền nhau, ngẫu nhiên). Con số thứ hai mới là thứ quyết định: vốn ô
    nhịp hẹp nên hai câu BẤT KỲ cũng đã giống nhau sẵn. Đo bảy bản của Cà Pháo
    ra 42% so với nền 44% — tức không có luật hỏi-đáp nào ở đây.

    Không có nền thì phát biểu kiểu này lúc nào cũng "đúng".
    """
    rng = random.Random(seed)
    shapes = [
        [round(round((b[0] - a[0]) * 12) / 12, 3) for a, b in zip(ph, ph[1:])]
        for ph in phrases(line)
    ]

    def overlap(x, y, cap=8):
        n = min(len(x), len(y), cap)
        if n < 3:
            return None
        return sum(1 for a, b in zip(x[:n], y[:n]) if abs(a - b) < 1e-6) / n

    near = [s for a, b in zip(shapes, shapes[1:]) if (s := overlap(a, b)) is not None]
    far = []
    for _ in range(400):
        if len(shapes) < 3:
            break
        a, b = rng.sample(range(len(shapes)), 2)
        if (s := overlap(shapes[a], shapes[b])) is not None:
            far.append(s)
    return (
        statistics.mean(near) if near else 0.0,
        statistics.mean(far) if far else 0.0,
    )


def suspensions(bars, chords, barlens, nbars):
    """Nốt ngoài hợp âm rơi ĐÚNG PHÁCH thì đi tiếp thế nào.

    Luật cổ điển đòi giải quyết liền bậc và đi xuống. Bảy bản của Cà Pháo: 40%
    liền bậc, 32% đi xuống, 44% tới nốt hợp âm — cả ba đều quanh mức ngẫu
    nhiên. Đây là đệm hát pop, không phải đối vị.
    """
    start, at = {}, 0.0
    for bar in range(1, nbars + 1):
        start[bar] = at
        at += barlens.get(bar, 4.0)

    line = []
    for bar in range(1, nbars + 1):
        line += [(t, m, bar) for t, m in melody(bars[bar]['rh'])]
    line.sort()

    count = collections.Counter()
    for (t, note, bar), (_, nxt, _) in zip(line, line[1:]):
        chord = chords.get(bar)
        if not chord:
            continue
        rel = t - start[bar]
        if abs(rel - round(rel)) > 0.05:
            continue
        count['dung_phach'] += 1
        if note % 12 in chord['tones']:
            continue
        count['treo'] += 1
        if abs(nxt - note) <= 2:
            count['lien_bac'] += 1
        if nxt < note:
            count['xuong'] += 1
        if nxt % 12 in chord['tones']:
            count['toi_hop_am'] += 1

    treo = count['treo'] or 1
    return {
        'treo_o_phach_manh': count['treo'] / (count['dung_phach'] or 1),
        'giai_lien_bac': count['lien_bac'] / treo,
        'di_xuong': count['xuong'] / treo,
        'toi_not_hop_am': count['toi_hop_am'] / treo,
    }


def measure(path, sections=None):
    """Đo một bản ký âm `.mxl`."""
    return measure_notes(*mxl.notes(mxl.load(path)), sections=sections)


def measure_midi(path, bpm=None, beats_per_bar=4, sections=None):
    """Đo một file MIDI.

    Kết quả KHÔNG cùng hạng với bản ký âm, và chỗ khác nhau nằm ở `meta` trả về:
    `hand_source` nói phần tách tay là bè thật hay là phỏng đoán, `hand_unsure`
    nói bao nhiêu phần trăm phải đoán mò, và `canh_bao` nhắc rằng trường độ từ
    MIDI dò bằng tiếng đàn không tin được. Xem `midi.py`.

    Phải truyền `bpm` cho MIDI dò từ tiếng đàn: nhịp độ ghi trong file ấy chỉ là
    con số mặc định. Nhịp độ là thứ HỎI, không suy — cùng một luật với thể loại.
    """
    notes, meta = midi.notes(path, bpm=bpm, beats_per_bar=beats_per_bar)
    result = measure_notes(notes, meta, sections=sections)
    result['nguon_tach_tay'] = meta['hand_source']
    result['ti_le_doan_mo'] = meta['hand_unsure']
    if meta.get('canh_bao'):
        result['canh_bao'] = meta['canh_bao']
    return result


def measure_notes(notes, meta, sections=None):
    bars = by_bar(notes)
    barlens = meta['barlens']
    nbars = max(barlens)

    line = []
    for bar in range(1, nbars + 1):
        line += melody(bars[bar]['rh'])
    line.sort()

    runs = runs_of(line)
    kinds = collections.Counter(k for k in (run_kind(r) for r in runs) if k)
    total_runs = sum(kinds.values()) or 1

    chords = harmony([n for n in notes if n['hand'] == 2], barlens, nbars)
    strong, weak = collections.Counter(), collections.Counter()
    for bar in range(1, nbars + 1):
        chord = chords.get(bar)
        if not chord:
            continue
        length = barlens.get(bar, 4.0)
        for t, note in melody(bars[bar]['rh']):
            box = strong if abs((t % length) % 2.0) < 1e-6 else weak
            box['trong' if note % 12 in chord['tones'] else 'ngoai'] += 1

    result = {
        'so_o': nbars,
        'so_not': len(notes),
        'so_cau': sum(kinds.values()),
        'gam': kinds['gam'] / total_runs,
        'rai': kinds['rai'] / total_runs,
        'tron': kinds['tron'] / total_runs,
        'dai_trung_vi': statistics.median([len(r) for r in runs]) if runs else 0,
        'hop_am_manh': strong['trong'] / (sum(strong.values()) or 1),
        'hop_am_yeu': weak['trong'] / (sum(weak.values()) or 1),
        'not_treo': suspensions(bars, chords, barlens, nbars),
    }
    lien, nen = answers(line)
    result['cau_sau_lap_cau_truoc'] = lien
    result['cau_sau_lap_cau_truoc_NEN'] = nen
    if sections:
        result['doan'] = {
            tag: section_stats(bars, span['bars']) for tag, span in sections.items()
        }
        # Đoạn HÁT = những ô không thuộc đoạn nào đã đặt tên. Đây mới là nền để
        # so giang tấu; so với đoạn dạo hay outro thì ra số vô nghĩa, vì cả hai
        # đoạn ấy cũng là đoạn không lời và cũng có kết cấu riêng.
        taken = set()
        for span in sections.values():
            a, b = span['bars']
            taken.update(range(a, b + 1))
        sung = [i for i in range(1, nbars + 1) if i not in taken]
        if sung:
            result['doan']['hat'] = section_stats(bars, [min(sung), max(sung)])
            result['doan']['hat']['o'] = [min(sung), max(sung)]
            # Mật độ tính riêng trên đúng những ô còn lại, không tính cả khoảng.
            line_sung = [pt for i in sung for pt in melody(bars[i]['rh'])]
            result['doan']['hat']['phai_not_moi_o'] = len(line_sung) / len(sung)
    return result


def load_corpus():
    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, 'corpus.json'), encoding='utf-8') as fh:
        return json.load(fh)


def main():
    """Đo một file MIDI nếu được chỉ định, không thì đo cả corpus bản ký âm."""
    if '--midi' in sys.argv:
        path = sys.argv[sys.argv.index('--midi') + 1]
        bpm = float(sys.argv[sys.argv.index('--bpm') + 1]) if '--bpm' in sys.argv else None
        bar = float(sys.argv[sys.argv.index('--bar') + 1]) if '--bar' in sys.argv else 4
        result = measure_midi(path, bpm=bpm, beats_per_bar=bar)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        if result.get('canh_bao'):
            print('', file=sys.stderr)
            print(f"  CANH BAO: {result['canh_bao']}", file=sys.stderr)
        if result['nguon_tach_tay'] == 'doan':
            print(f"  Tach tay la PHONG DOAN, {result['ti_le_doan_mo']:.0%} so not "
                  f"phai doan mo. Ra lai bang tai truoc khi tin.", file=sys.stderr)
        return

    folder = os.environ.get('PIANOBRAIN_SHEETS')
    if not folder:
        sys.exit('Chua dat PIANOBRAIN_SHEETS - tro no toi thu muc chua file .mxl.')

    out = {}
    for song in load_corpus()['songs']:
        path = os.path.join(folder, song['file'])
        if not os.path.exists(path):
            print(f"  THIEU  {song['name']}: khong thay {song['file']}")
            continue
        out[song['name']] = dict(
            the_loai=song['genre'],
            **measure(path, song.get('sections') or None),
        )

    if '--json' in sys.argv:
        print(json.dumps(out, ensure_ascii=False, indent=2))
        return

    def pct(x):
        return f'{round(x * 100):>3}%'

    print(f"  {'bai':22} {'the loai':14} {'gam':>5}{'rai':>5}{'tron':>6}"
          f"  {'dai':>4}  {'manh/yeu':>10}")
    for name, r in out.items():
        print(f"  {name:22} {r['the_loai']:14} {pct(r['gam'])}{pct(r['rai'])}"
              f"{pct(r['tron'])}  {r['dai_trung_vi']:>4}  "
              f"{pct(r['hop_am_manh'])}/{pct(r['hop_am_yeu'])}")

    rows = []
    for name, r in out.items():
        doan = r.get('doan') or {}
        if 'interlude' not in doan:
            continue
        giang = doan['interlude']
        # So với ĐOẠN HÁT, không so với đoạn dạo hay outro.
        base = (doan.get('hat') or {}).get('phai_not_moi_o')
        if not base:
            continue
        rows.append((giang['o'][1] - giang['o'][0] + 1, name, base,
                     giang['phai_not_moi_o']))

    if rows:
        print()
        print(f"  {'giang tau':22} {'o':>3}  {'hat':>6} {'giang tau':>10} {'day them':>9}")
        for span, name, base, dense in sorted(rows):
            print(f"  {name:22} {span:>3}  {base:>6.1f} {dense:>10.1f} "
                  f"{100 * (dense - base) / max(base, 0.01):>8.0f}%")


if __name__ == '__main__':
    main()
