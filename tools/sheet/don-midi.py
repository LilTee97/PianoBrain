"""Dọn một file MIDI dò từ tiếng đàn thành bản đọc được trên khuông nhạc.

    python tools/sheet/don-midi.py video/bai.mid --bpm 72

Mở thẳng file máy dò ra trong MuseScore thì gần như không đọc nổi. Ba lý do,
và cả ba đều sửa được ở đây chứ không phải sửa tay trong MuseScore:

1. **Nhịp độ sai.** Bộ dò nốt ghi nốt ở giây thật rồi gắn một nhịp độ mặc định
   vô nghĩa (đo trên một bản ra 178). MuseScore chia ô nhịp theo con số ấy nên
   mọi vạch nhịp đều lệch. Ghi lại đúng nhịp độ thì ô nhịp về đúng chỗ.

2. **Không lượng tử hoá.** Nốt nằm ở giây thật nên trường độ ra số lẻ, và bản
   nhạc đầy dấu nối với nốt vụn. Nắn về lưới thì đọc được.

3. **Không phân tay.** File chỉ có một dòng nốt phẳng. MuseScore tự cắt theo
   cao độ nên chỗ nào hai tay chồng tầm là chia sai — mà chồng tầm chính là
   chỗ đáng xem. Ghi thành hai bè thì MuseScore đặt đúng hai khuông.

LƯỢNG TỬ HOÁ LÀ MỘT PHÉP ĐÁNH ĐỔI, KHÔNG PHẢI MỘT PHÉP SỬA. Nó làm bản nhạc
đọc được bằng cách vứt bớt sự thật: chỗ vào sớm, chỗ đẩy trễ, chỗ rung rinh
đều bị kéo về lưới. Mẫu Slow Rock 3 của thầy Đức Thịnh sống nhờ hợp âm rơi ở
phách 1,45 chứ không phải 1,5 — nắn về lưới móc đơn là xoá đúng cái ấy. Nên
bản dọn này để NHÌN và để sửa tay, còn muốn đo thì đo trên file gốc.
"""

import argparse
import os
import struct
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import midi  # noqa: E402

CHIA = 480  # tích mỗi nốt đen


def _vlq(so):
    """Số nguyên độ dài thay đổi — cách MIDI ghi khoảng cách thời gian."""
    ra = bytes([so & 0x7F])
    so >>= 7
    while so:
        ra = bytes([(so & 0x7F) | 0x80]) + ra
        so >>= 7
    return ra


def _be(events):
    """Ghép danh sách (tích tuyệt đối, byte) thành một bè MIDI."""
    than = b''
    truoc = 0
    for tick, payload in sorted(events, key=lambda e: e[0]):
        than += _vlq(tick - truoc) + payload
        truoc = tick
    than += b'\x00\xff\x2f\x00'
    return b'MTrk' + struct.pack('>I', len(than)) + than


def don(nguon, dich, bpm, phach_moi_o=4, luoi=0.25, lech=0.0):
    """Đọc `nguon`, nắn về lưới, tách hai bè, ghi ra `dich`.

    `luoi` tính bằng nốt đen: 0,25 là móc kép, 0,5 là móc đơn.
    `lech` tính bằng GIÂY — chỗ phách 1 thật nằm, xem chú thích ở `main`.
    """
    notes, meta = midi.notes(nguon, bpm=bpm, beats_per_bar=phach_moi_o)
    if not notes:
        sys.exit('  File khong co not nao.')

    doi = lech * bpm / 60.0                      # giây -> nốt đen
    ra = {1: [], 2: []}
    da_co = set()

    for note in notes:
        dau = round((note['beat'] - doi) / luoi) * luoi
        if dau < 0:
            continue
        # Trường độ ít nhất một ô lưới, không thì nốt biến mất khi nắn.
        dai = max(luoi, round(note['dur'] / luoi) * luoi)

        khoa = (note['hand'], round(dau / luoi), note['midi'])
        if khoa in da_co:                        # hai nốt trùng khít sau khi nắn
            continue
        da_co.add(khoa)

        t1 = int(round(dau * CHIA))
        t2 = t1 + int(round(dai * CHIA))
        luc = min(127, max(1, note.get('velocity', 80)))
        ra[note['hand']].append((t1, bytes([0x90, note['midi'], luc])))
        ra[note['hand']].append((t2, bytes([0x80, note['midi'], 0])))

    # Bè 0 chỉ mang nhịp độ và số chỉ nhịp — đúng lối MIDI dạng 1.
    micro = int(round(60_000_000 / bpm))
    nhip = b'\x00\xff\x58\x04' + bytes([int(phach_moi_o), 2, 24, 8])
    dau_bai = (b'\x00\xff\x51\x03'
               + bytes([(micro >> 16) & 0xFF, (micro >> 8) & 0xFF, micro & 0xFF])
               + nhip + b'\x00\xff\x2f\x00')
    be0 = b'MTrk' + struct.pack('>I', len(dau_bai)) + dau_bai

    blob = (b'MThd' + struct.pack('>IHHH', 6, 1, 3, CHIA)
            + be0 + _be(ra[1]) + _be(ra[2]))
    with open(dich, 'wb') as fh:
        fh.write(blob)

    return dict(so_not=len(notes), phai=len(ra[1]) // 2, trai=len(ra[2]) // 2,
                nguon_tach_tay=meta['hand_source'], doan_mo=meta['hand_unsure'])


def main():
    doc = argparse.ArgumentParser(
        description='Don file MIDI do tu tieng dan thanh ban doc duoc.')
    doc.add_argument('nguon', help='file .mid can don')
    doc.add_argument('--bpm', type=float, required=True, help='nhip do that cua bai')
    doc.add_argument('--bar', type=float, default=4, help='so phach moi o nhip')
    doc.add_argument('--luoi', type=float, default=0.25,
                     help='luoi nan, tinh bang not den: 0.25 = moc kep, 0.5 = moc don')
    doc.add_argument('--lech', type=float, default=0.0,
                     help='phach 1 that nam o giay thu may (mac dinh 0)')
    doc.add_argument('--ra', default=None, help='file ra (mac dinh them duoi -sach)')
    y = doc.parse_args()

    dich = y.ra or os.path.splitext(y.nguon)[0] + '-sach.mid'
    ket = don(y.nguon, dich, y.bpm, y.bar, y.luoi, y.lech)

    print(f"  Doc  {ket['so_not']} not tu {os.path.basename(y.nguon)}")
    print(f"  Ghi  tay phai {ket['phai']} not / tay trai {ket['trai']} not")
    print(f"  ->   {dich}")
    print()
    if ket['nguon_tach_tay'] != 'be rieng':
        print(f"  Tach tay la PHONG DOAN, {ket['doan_mo']:.0%} so not phai doan mo.")
        print('  Mo trong MuseScore, sua bang Ctrl+Shift+Mui ten len/xuong.')
    print('  Ban nay de NHIN va de sua tay. Muon DO thi do tren file goc:')
    print('  nan ve luoi la vut bot su that ve cho vao som, cho day tre.')


if __name__ == '__main__':
    main()
