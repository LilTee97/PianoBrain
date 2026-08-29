"""Đọc file MIDI thành danh sách nốt phẳng, cùng dạng với `mxl.py`.

Có bộ đọc này thì mọi phép đo trong `profile.py` chạy được trên video bất kỳ,
không riêng những bài may mắn có bản ký âm. Nhưng MIDI và bản ký âm **không
cùng độ tin cậy**, và chỗ khác nhau phải nói rõ chứ không để người đọc tự đoán.

## Ba thứ MIDI-từ-tiếng-đàn KHÔNG có

Bản ký âm là thứ người ta chép ra có chủ ý. MIDI dò từ tiếng đàn thì chỉ là kết
quả một mô hình đoán, và nó thiếu đúng ba thứ:

1. **Không có tay.** Mô hình dò nốt không xuất nhãn tay trái / tay phải. Mà với
   dự án này thì tay trái đánh gì lại chính là câu hỏi. Xem `assign_hands`:
   file có hai bè riêng thì lấy bè làm tay — tin được; không có thì phải đoán,
   và hàm trả về `hand_unsure` để biết bao nhiêu phần trăm là đoán.

2. **Trường độ không tin được.** Ballad đạp pedal liên tục nên chỗ nốt tắt bị
   nhoè; mô hình đoán offset kém hơn hẳn onset. Chỗ GÕ thì tin được. Điều này
   quan trọng với kho: mẫu đệm sống bằng trường độ và độ nhấn — mẫu Slow Rock 3
   của thầy Đức Thịnh nghe ra là chính nó nhờ bốn trường độ khác nhau. Đo trường
   độ trên MIDI dò từ tiếng đàn là đo một thứ không có thật.

3. **Không có phách.** MIDI cho tích và giây, không cho phách. Muốn quy ra ô
   nhịp thì phải BIẾT nhịp độ, và nhịp độ là thứ người dùng nhập vào — đoán hộ
   thì mọi con số theo ô nhịp thừa hưởng cái đoán ấy. Cùng một cái bẫy như thể
   loại: không suy, phải hỏi.

## Hai loại file, hai cách quy phách

- **MIDI soạn sẵn** (từ bản ký âm, từ Synthesia): tích chia cho `division` ra
  phách, chính xác tuyệt đối. Đây là mặc định khi không truyền `bpm`.
- **MIDI dò từ tiếng đàn**: nốt nằm ở giây thật, còn nhịp độ ghi trong file chỉ
  là con số mặc định 120 vô nghĩa. Truyền `bpm` thì hàm bỏ qua nhịp độ trong
  file và quy từ giây.
"""

import struct

# Hai nốt gõ cách nhau trong ngần này giây thì coi là cùng một cú.
SAME_HIT = 0.03
# Một bàn tay với xa nhất bấy nhiêu nửa cung.
HAND_SPAN = 14
# Hai tay cách nhau chưa tới ngần này nửa cung thì phép đoán là mò.
UNSURE_GAP = 4


def _vlq(data, at):
    """Số nguyên độ dài thay đổi — cách MIDI ghi khoảng cách thời gian."""
    value = 0
    while True:
        byte = data[at]
        at += 1
        value = (value << 7) | (byte & 0x7F)
        if not byte & 0x80:
            return value, at


def _tracks(data):
    """Tách file thành các bè, mỗi bè là danh sách (tích, trạng thái, dữ liệu)."""
    if data[:4] != b'MThd':
        raise ValueError('Khong phai file MIDI: thieu MThd')
    _, ntrks, division = struct.unpack('>HHH', data[8:14])
    if division & 0x8000:
        raise ValueError('MIDI dung khung hinh SMPTE, bo doc nay chua ho tro')

    out = []
    at = 14
    for _ in range(ntrks):
        if data[at:at + 4] != b'MTrk':
            break
        length = struct.unpack('>I', data[at + 4:at + 8])[0]
        end = at + 8 + length
        events, tick, status = [], 0, None
        cursor = at + 8

        while cursor < end:
            delta, cursor = _vlq(data, cursor)
            tick += delta
            byte = data[cursor]

            if byte == 0xFF:                      # meta
                kind = data[cursor + 1]
                size, cursor = _vlq(data, cursor + 2)
                events.append((tick, 0xFF, kind, data[cursor:cursor + size]))
                cursor += size
                continue
            if byte in (0xF0, 0xF7):              # sysex, bỏ qua
                size, cursor = _vlq(data, cursor + 1)
                cursor += size
                continue

            if byte & 0x80:                       # trạng thái mới
                status = byte
                cursor += 1
            # Không có bit cao thì dùng lại trạng thái cũ — "running status".
            args = 1 if (status & 0xF0) in (0xC0, 0xD0) else 2
            events.append((tick, status, data[cursor], data[cursor + 1] if args == 2 else 0))
            cursor += args

        out.append(events)
        at = end
    return out, division


def _tempo_map(tracks, division):
    """Đổi tích sang giây. Nhịp độ đổi giữa bài thì bản đồ này lo."""
    changes = [(0, 500000)]                       # mặc định 120 nhịp mỗi phút
    for events in tracks:
        for tick, status, kind, data in events:
            if status == 0xFF and kind == 0x51 and len(data) == 3:
                changes.append((tick, (data[0] << 16) | (data[1] << 8) | data[2]))
    changes.sort()

    marks, seconds, last_tick, last_us = [], 0.0, 0, changes[0][1]
    for tick, us in changes:
        seconds += (tick - last_tick) / division * (last_us / 1e6)
        marks.append((tick, seconds, us))
        last_tick, last_us = tick, us

    def at(tick):
        base_tick, base_sec, us = marks[0]
        for mark in marks:
            if mark[0] > tick:
                break
            base_tick, base_sec, us = mark
        return base_sec + (tick - base_tick) / division * (us / 1e6)

    return at


def _raw_notes(tracks, division):
    """Ghép note-on với note-off. Trả về (bè, tích gõ, tích tắt, cao độ, lực)."""
    out = []
    for index, events in enumerate(tracks):
        open_notes = {}
        for tick, status, first, second in events:
            if status == 0xFF:
                continue
            kind = status & 0xF0
            # Note-on lực 0 chính là note-off — bẫy kinh điển của MIDI.
            if kind == 0x90 and second > 0:
                open_notes.setdefault(first, []).append((tick, second))
            elif kind in (0x80, 0x90):
                stack = open_notes.get(first)
                if stack:
                    start, velocity = stack.pop(0)
                    out.append((index, start, tick, first, velocity))
        # Nốt không có note-off: cho ngân tới hết bè, còn hơn vứt đi.
        end = max((e[0] for e in events), default=0)
        for pitch, stack in open_notes.items():
            for start, velocity in stack:
                out.append((index, start, end, pitch, velocity))
    return sorted(out, key=lambda n: (n[1], n[3]))


def assign_hands(notes):
    """Đoán tay trái / tay phải khi file không nói.

    Bám hai vị trí tay, mỗi cú gõ giao cho bàn tay đang ở gần hơn. Cú gõ nào
    dàn rộng quá tầm một bàn tay thì cắt đôi ở khe rộng nhất.

    Trả về (danh sách tay, số nốt phải đoán mò). Con số thứ hai mới là thứ đáng
    đọc: nó nói bao nhiêu phần của kết quả là phỏng đoán chứ không phải số đo.
    """
    hands, unsure = [], 0
    left, right = None, None
    at = 0

    while at < len(notes):
        # Gom những nốt gõ cùng lúc thành một cú.
        group = [at]
        while at + 1 < len(notes) and notes[at + 1][0] - notes[at][0] <= SAME_HIT:
            at += 1
            group.append(at)
        at += 1

        pitches = sorted((notes[i][1], i) for i in group)
        span = pitches[-1][0] - pitches[0][0]

        if span > HAND_SPAN and len(pitches) > 1:
            # Cắt ở khe rộng nhất: đó là chỗ hai bàn tay rời nhau.
            gaps = [(pitches[i + 1][0] - pitches[i][0], i) for i in range(len(pitches) - 1)]
            cut = max(gaps)[1] + 1
            low, high = pitches[:cut], pitches[cut:]
        else:
            near_left = abs(pitches[0][0] - left) if left is not None else 999
            near_right = abs(pitches[-1][0] - right) if right is not None else 999
            if abs(near_left - near_right) < UNSURE_GAP:
                unsure += len(pitches)
            if near_left <= near_right:
                low, high = pitches, []
            else:
                low, high = [], pitches

        for pitch, index in low:
            hands.append((index, 2))
        for pitch, index in high:
            hands.append((index, 1))
        if low:
            left = low[0][0]
        if high:
            right = high[-1][0]

    out = [1] * len(notes)
    for index, hand in hands:
        out[index] = hand
    return out, unsure


def notes(path, bpm=None, beats_per_bar=4):
    """Đọc file MIDI thành danh sách nốt, cùng dạng với `mxl.notes`.

    `bpm` bỏ trống thì quy phách từ tích — đúng cho MIDI soạn sẵn. Truyền vào
    thì bỏ qua nhịp độ ghi trong file và quy từ giây — đúng cho MIDI dò từ tiếng
    đàn, nơi nhịp độ trong file chỉ là con số mặc định vô nghĩa.
    """
    with open(path, 'rb') as fh:
        data = fh.read()
    tracks, division = _tracks(data)
    raw = _raw_notes(tracks, division)
    if not raw:
        return [], dict(barlens={}, bpm=bpm, hand_source='trong', hand_unsure=0.0)

    seconds_at = _tempo_map(tracks, division)

    def to_beats(tick):
        if bpm is None:
            return tick / division
        return seconds_at(tick) * bpm / 60.0

    played = [(to_beats(start), pitch, to_beats(end), track, velocity)
              for track, start, end, pitch, velocity in raw]

    """
    File có từ hai bè cùng có nốt thì LẤY BÈ LÀM TAY.

    Cùng một cái bẫy mà `mxl.py` gặp ở *Kém duyên*, chỉ ngược chiều: ở đó nhiều
    bè nghĩa là phần tách tay nằm ở số thứ tự bè chứ không ở khuông. Ở đây cũng
    vậy, và đó là nguồn tin CHẮC — hơn hẳn mọi phép đoán bên dưới.
    """
    busy = sorted({note[3] for note in played})
    if len(busy) >= 2:
        first = busy[0]
        hands = [1 if note[3] == first else 2 for note in played]
        source, unsure = 'be rieng', 0
    else:
        hands, unsure = assign_hands([(note[0], note[1]) for note in played])
        source = 'doan'

    out = []
    for (beat, pitch, end, _track, velocity), hand in zip(played, hands):
        out.append(dict(
            bar=int(beat // beats_per_bar) + 1,
            beat=round(beat, 6),
            dur=round(max(0.0, end - beat), 6),
            midi=pitch,
            hand=hand,
            voice=1,
            chord=False,
            velocity=velocity,
        ))

    nbars = max(note['bar'] for note in out)
    return out, dict(
        barlens={bar: float(beats_per_bar) for bar in range(1, nbars + 1)},
        beats=beats_per_bar, beat_type=4, divisions=division, fifths=0, words=[],
        bpm=bpm,
        hand_source=source,
        hand_unsure=unsure / len(out),
        # Chỗ này để bên gọi in ra, không phải để bên gọi tự nhớ.
        canh_bao=(
            'Truong do tu MIDI do bang tieng dan KHONG tin duoc (pedal lam nhoe '
            'cho not tat). Chi tin cho GO.'
            if bpm is not None else None
        ),
    )


if __name__ == '__main__':
    """Tự kiểm: dựng một file MIDI bé trong bộ nhớ rồi đọc lại."""
    import io
    import os
    import tempfile

    def track(events):
        body = b''
        for delta, payload in events:
            out = bytes([delta & 0x7F]) if delta < 128 else bytes([0x80 | (delta >> 7), delta & 0x7F])
            body += out + payload
        body += b'\x00\xff\x2f\x00'
        return b'MTrk' + struct.pack('>I', len(body)) + body

    # Hai bè: bè 0 gõ Đô quãng tám 4 một nốt đen; bè 1 gõ Đô quãng tám 2.
    blob = (b'MThd' + struct.pack('>IHHH', 6, 1, 2, 480)
            + track([(0, b'\x90\x3c\x50'), (480, b'\x80\x3c\x00')])
            + track([(0, b'\x90\x30\x50'), (480, b'\x80\x30\x00')]))

    handle, name = tempfile.mkstemp(suffix='.mid')
    os.write(handle, blob)
    os.close(handle)
    try:
        got, meta = notes(name)
        assert len(got) == 2, got
        assert meta['hand_source'] == 'be rieng', meta
        high = next(n for n in got if n['midi'] == 60)
        low = next(n for n in got if n['midi'] == 48)
        assert high['hand'] == 1 and low['hand'] == 2, got
        assert abs(high['dur'] - 1.0) < 1e-6, high      # một nốt đen
        assert high['beat'] == 0.0 and high['bar'] == 1, high

        # Quy từ giây: 480 tích ở 120 nhịp/phút là nửa giây, tức 1 phách ở 120.
        got, meta = notes(name, bpm=120)
        assert abs(got[0]['dur'] - 1.0) < 1e-6, got[0]
        assert meta['canh_bao'] is not None
    finally:
        os.unlink(name)

    # Đoán tay: một bè, hai chùm cách xa nhau.
    line = [(0.0, 40), (0.0, 64), (1.0, 43), (1.0, 67)]
    hands, unsure = assign_hands(line)
    assert hands == [2, 1, 2, 1], hands
    assert unsure == 0, unsure

    print('midi.py: tu kiem xong, khong loi')
