"""Từ một link video tới bảng số đo, bằng MỘT lệnh.

    python tools/sheet/tu-video.py "https://www.youtube.com/watch?v=..." --bpm 72

Ba bước, chạy liền nhau:

    1. tải tiếng đàn ra file .wav          (yt-dlp)
    2. cho máy nghe rồi ghi ra nốt .mid    (piano_transcription_inference)
    3. đo file .mid                        (tools/sheet/profile.py)

Chạy lại lần hai thì bỏ qua những bước đã xong — tải và dò nốt đều lâu, không
bắt làm lại. Muốn làm lại từ đầu thì xoá file trong thư mục `video/`.

VÌ SAO PHẢI NHẬP NHỊP ĐỘ. File nốt mà máy dò ra chỉ ghi GIÂY, không ghi phách.
Muốn quy sang ô nhịp thì phải biết bài chạy bao nhiêu nhịp mỗi phút, và đó là
thứ tai người nghe ra chứ máy không tự biết. Đoán hộ thì mọi con số theo ô nhịp
thừa hưởng cái đoán ấy — cùng một luật với thể loại, xem README.
"""

import argparse
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)


def thieu(ten, cai_dat):
    print(f'\n  THIEU: {ten}')
    print(f'  Mo PowerShell roi chay dung dong nay:\n')
    print(f'      {cai_dat}\n')
    sys.exit(1)


def tai_tieng(link, dich):
    """Bước 1 — tải tiếng đàn ra .wav."""
    if os.path.exists(dich):
        print(f'  [1/3] da co tieng dan, bo qua: {os.path.basename(dich)}')
        return
    print('  [1/3] dang tai tieng dan tu video...')

    goc = os.path.splitext(dich)[0]
    lenh = ['yt-dlp', '-x', '--audio-format', 'wav', '-o', goc + '.%(ext)s', link]
    try:
        subprocess.run(lenh, check=True)
    except FileNotFoundError:
        thieu('yt-dlp (bo tai video)', 'pip install yt-dlp')
    except subprocess.CalledProcessError:
        sys.exit('  Tai that bai. Kiem lai link, va kiem may co vao mang khong.')
    if not os.path.exists(dich):
        sys.exit(f'  Tai xong nhung khong thay {dich}. Xem lai thu muc.')


def do_not(wav, dich):
    """Bước 2 — cho máy nghe rồi ghi ra nốt."""
    if os.path.exists(dich):
        print(f'  [2/3] da co file not, bo qua: {os.path.basename(dich)}')
        return
    try:
        from piano_transcription_inference import PianoTranscription, load_audio, sample_rate
    except ImportError:
        thieu('bo do not piano (khoang 2,5 GB, tai mot lan)',
              'pip install torch piano_transcription_inference')

    print('  [2/3] dang nghe va ghi not... (bai 4 phut mat vai phut tren CPU)')
    audio, _ = load_audio(wav, sr=sample_rate, mono=True)
    PianoTranscription(device='cpu').transcribe(audio, dich)


def main():
    doc = argparse.ArgumentParser(
        description='Tu mot link video toi bang so do.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='Vi du:\n'
               '  python tools/sheet/tu-video.py "https://youtu.be/abc" --bpm 72\n')
    doc.add_argument('link', help='dia chi video')
    doc.add_argument('--bpm', type=float, required=True,
                     help='nhip do cua bai, tinh bang nhip moi phut — BAT BUOC, xem chu thich dau file')
    doc.add_argument('--bar', type=float, default=4,
                     help='so phach moi o nhip (mac dinh 4; nhip 3/4 thi de 3)')
    doc.add_argument('--ten', default='bai', help='ten dat cho file (mac dinh "bai")')
    doc.add_argument('--thu-muc', default=None, help='cho de file (mac dinh video/ canh kho)')
    y = doc.parse_args()

    kho = os.path.dirname(os.path.dirname(HERE))
    thu_muc = y.thu_muc or os.path.join(kho, 'video')
    os.makedirs(thu_muc, exist_ok=True)
    wav = os.path.join(thu_muc, y.ten + '.wav')
    mid = os.path.join(thu_muc, y.ten + '.mid')

    tai_tieng(y.link, wav)
    do_not(wav, mid)

    print('  [3/3] dang do...\n')
    import json

    import profile as bo_do
    ket_qua = bo_do.measure_midi(mid, bpm=y.bpm, beats_per_bar=y.bar)

    def phan_tram(x):
        return f'{round(x * 100)}%'

    print(f"  So o nhip           {ket_qua['so_o']}")
    print(f"  So not              {ket_qua['so_not']}")
    print(f"  Cau gam thuan       {phan_tram(ket_qua['gam'])}")
    print(f"  Cau rai thuan       {phan_tram(ket_qua['rai'])}")
    print(f"  Cau pha tron        {phan_tram(ket_qua['tron'])}")
    print(f"  Cau dai trung vi    {ket_qua['dai_trung_vi']} not")
    print(f"  Not hop am o phach manh / yeu   "
          f"{phan_tram(ket_qua['hop_am_manh'])} / {phan_tram(ket_qua['hop_am_yeu'])}")

    print('\n  DOC KY HAI DONG NAY TRUOC MOI CON SO TREN:')
    if ket_qua['nguon_tach_tay'] == 'be rieng':
        print('  - Tach tay lay tu hai be co san trong file. Tin duoc.')
    else:
        print(f"  - Tach tay la PHONG DOAN, {phan_tram(ket_qua['ti_le_doan_mo'])} so not "
              f"phai doan mo.")
        print('    Moi file .mid trong MuseScore de nhin lai truoc khi tin.')
    if ket_qua.get('canh_bao'):
        print(f"  - {ket_qua['canh_bao']}")

    ra = os.path.join(thu_muc, y.ten + '.json')
    with open(ra, 'w', encoding='utf-8') as fh:
        json.dump(ket_qua, fh, ensure_ascii=False, indent=2)
    print(f'\n  So do day du: {ra}')
    print(f'  File not:     {mid}')


if __name__ == '__main__':
    main()
