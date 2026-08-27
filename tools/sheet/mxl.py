"""Đọc bản ký âm MusicXML nén (.mxl) thành danh sách nốt phẳng.

Một file .mxl là một file zip chứa MusicXML. MusicXML là văn bản: mỗi nốt ghi
cao độ (tên nốt + quãng tám + dấu hoá), trường độ tính bằng `divisions` mỗi nốt
đen, và khuông nào — tức tay nào.

HAI CÁI BẪY đã làm sai số một lần, cả hai đều âm thầm:

1. **Đổi số chỉ nhịp giữa bài.** Lấy độ dài ô nhịp CUỐI áp cho cả bài thì mọi
   nốt lệch ô. Hong Kong 1 sang 2/4 ở ô 100; số bám hợp âm của bài ấy sai từ
   52% thành 67% chỉ vì chỗ này. Nên hàm trả về `barlens` — độ dài TỪNG ô — và
   bên gọi phải nhóm theo `bar` của chính nốt, đừng tính ngược từ phách.

2. **Bản ghi thành HAI BÈ riêng** thay vì một bè hai khuông. Lúc ấy `staff` của
   mọi nốt đều bằng 1, và phần tách tay nằm ở SỐ THỨ TỰ BÈ. Kem Duyen như vậy —
   không xử thì cả hai tay bị gộp vào tay phải và mất sạch phần tách tay.
"""

import zipfile
import xml.etree.ElementTree as ET

STEP = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}


def load(path):
    """Mở .mxl, trả về gốc cây XML của bản nhạc."""
    zf = zipfile.ZipFile(path)
    name = next(
        n for n in zf.namelist()
        if n.endswith(('.xml', '.musicxml')) and 'META' not in n and 'container' not in n
    )
    return ET.fromstring(zf.read(name).decode('utf-8', errors='replace'))


def notes(root):
    """Trả về (danh sách nốt, thông tin chung).

    Mỗi nốt: bar, beat (nốt đen tính từ đầu bài), dur, midi, hand (1 phải / 2
    trái), voice, chord (có phải nốt chồng lên nốt trước không).
    """
    out = []
    barlens = {}
    div = 1
    beats, beattype, fifths = 4, 4, 0
    barlen = 4.0
    words = []

    parts = root.findall('part')
    for part_index, part in enumerate(parts):
        cursor = 0.0
        for measure in part.findall('measure'):
            bar = int(measure.get('number') or 0)
            at = cursor

            for el in measure:
                if el.tag == 'attributes':
                    if el.findtext('divisions'):
                        div = int(el.findtext('divisions'))
                    time = el.find('time')
                    if time is not None:
                        beats = int(time.findtext('beats'))
                        beattype = int(time.findtext('beat-type'))
                        barlen = beats * 4.0 / beattype
                    key = el.find('key')
                    if key is not None and key.findtext('fifths') is not None:
                        fifths = int(key.findtext('fifths'))

                elif el.tag == 'direction':
                    for word in el.iter('words'):
                        if (word.text or '').strip():
                            words.append((bar, word.text.strip()))

                elif el.tag == 'backup':
                    at -= float(el.findtext('duration') or 0) / div
                elif el.tag == 'forward':
                    at += float(el.findtext('duration') or 0) / div

                elif el.tag == 'note':
                    dur = float(el.findtext('duration') or 0) / div
                    is_chord = el.find('chord') is not None
                    staff = int(el.findtext('staff') or 1)
                    pitch = el.find('pitch')
                    if pitch is not None:
                        midi = ((int(pitch.findtext('octave')) + 1) * 12
                                + STEP[pitch.findtext('step')]
                                + int(pitch.findtext('alter') or 0))
                        # Bẫy 2: nhiều bè thì tay nằm ở số thứ tự bè, không ở staff.
                        hand = staff if len(parts) == 1 else part_index + 1
                        out.append(dict(
                            bar=bar, beat=round(at, 6), dur=dur, midi=midi,
                            hand=hand, voice=int(el.findtext('voice') or 1),
                            chord=is_chord,
                        ))
                    if not is_chord and el.find('grace') is None:
                        at += dur

            barlens[bar] = barlen
            cursor += barlen

    return out, dict(divisions=div, beats=beats, beat_type=beattype,
                     fifths=fifths, words=words, barlens=barlens)
