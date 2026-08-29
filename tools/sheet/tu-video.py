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
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)


def thieu(ten, cai_dat, loi=None):
    """Báo thiếu công cụ, KÈM lời lẽ thật của Python.

    Bản đầu chỉ in tên gói và dòng pip, nuốt mất thông báo gốc. Nó hỏng ngay ở
    lần chạy thật đầu tiên: cài xong hết rồi mà vẫn báo "thiếu bộ dò nốt 2,5
    GB", trong khi thứ thiếu là `audioread` — một gói bé mà `librosa 1.0` đã bỏ
    khỏi danh sách phụ thuộc còn bộ dò nốt thì vẫn gọi thẳng. Không in lời lẽ
    thật thì người dùng cài lại 2,5 GB lần nữa và vẫn hỏng y như cũ.
    """
    print(f'\n  THIEU: {ten}')
    if loi is not None:
        print(f'  Python noi: {loi}')
    print('  Mo PowerShell roi chay dung dong nay:\n')
    print(f'      {cai_dat}\n')
    sys.exit(1)


def tim_musescore():
    """Tìm MuseScore để mở thẳng bản đã dọn.

    Không dùng `os.startfile`: trên máy này đuôi `.mid` đang gắn với Windows
    Media Player, mà nó chỉ PHÁT chứ không hiện nốt. Phải gọi đích danh.
    """
    ten = ('MuseScore4.exe', 'MuseScore3.exe', 'MuseScore.exe', 'mscore')
    goc = [os.environ.get('ProgramFiles'), os.environ.get('ProgramFiles(x86)'),
           os.path.join(os.environ.get('LOCALAPPDATA', ''), 'Programs')]
    for thu_muc in filter(None, goc):
        if not os.path.isdir(thu_muc):
            continue
        for muc in os.listdir(thu_muc):
            if not muc.lower().startswith('musescore'):
                continue
            for goc_con, _, files in os.walk(os.path.join(thu_muc, muc)):
                for f in files:
                    if f in ten:
                        return os.path.join(goc_con, f)
    return shutil.which('musescore') or shutil.which('mscore')


def bo_ffmpeg():
    """Thư mục có ĐỦ CẶP ffmpeg và ffprobe, cùng một bản dựng.

    yt-dlp tìm hai công cụ này riêng lẻ theo thứ tự PATH, nên nó ghép nhầm được:
    trên máy đã gặp `ffmpeg` của winget đi cùng `ffprobe` của conda. Bản conda
    ấy đòi `intl-8.dll` — file không có trên máy — nên Windows bật hộp thoại đỏ
    "The code execution cannot proceed" giữa chừng, và không cứu được bằng cách
    khôi phục DLL vì DLL ấy không tồn tại ở đâu cả.

    Chỉ đích danh MỘT thư mục có cả hai thì hết ghép nhầm, và không phụ thuộc
    thứ tự PATH nữa. Không tìm được cặp nào thì để yt-dlp tự lo như cũ.
    """
    duong = shutil.which('ffmpeg')
    if not duong:
        return None
    thu_muc = os.path.dirname(duong)
    return thu_muc if shutil.which('ffprobe', path=thu_muc) else None


def tai_tieng(link, dich):
    """Bước 1 — tải tiếng đàn ra .wav."""
    if os.path.exists(dich):
        print(f'  [1/3] da co tieng dan, bo qua: {os.path.basename(dich)}')
        return
    print('  [1/3] dang tai tieng dan tu video...')

    goc = os.path.splitext(dich)[0]
    lenh = ['yt-dlp', '-x', '--audio-format', 'wav', '-o', goc + '.%(ext)s']
    cap = bo_ffmpeg()
    if cap:
        lenh += ['--ffmpeg-location', cap]
    lenh.append(link)
    try:
        subprocess.run(lenh, check=True)
    except FileNotFoundError:
        thieu('yt-dlp (bo tai video)', 'pip install yt-dlp')
    except subprocess.CalledProcessError:
        sys.exit('  Tai that bai. Kiem lai link, va kiem may co vao mang khong.')
    if not os.path.exists(dich):
        sys.exit(f'  Tai xong nhung khong thay {dich}. Xem lai thu muc.')


"""Từ tỉ lệ nốt rơi khít phách này trở lên thì coi là bản thu có mạch đều.

Rơi ngẫu nhiên đã được khoảng 24% (cửa sổ ±0,12 phách trên 1,0), nên ngưỡng
phải cao hơn hẳn mức ấy mới nói lên điều gì. 40% là con số KINH NGHIỆM, chưa
phải số đo: mới thử trên một bản, và bản ấy ra 27% ở *mọi* nhịp độ từ 50 tới
120. Có thêm bản chơi đều nhịp để đối chiếu thì nên chỉnh lại cho đúng.
"""
MACH_DEU = 0.40

"""Mô hình đã huấn luyện: chỗ gói chờ nó, và chỗ tải nó về."""
MO_HINH = 'note_F1=0.9677_pedal_F1=0.9186.pth'
MO_HINH_URL = ('https://zenodo.org/record/4034264/files/'
               'CRNN_note_F1%3D0.9677_pedal_F1%3D0.9186.pth?download=1')
MO_HINH_MB = 160


def tai_mo_hinh():
    """Tải mô hình về, vì gói dò nốt tự tải KHÔNG chạy trên Windows.

    Gói gọi `os.system('wget ...')`. Windows không có `wget`, nên lệnh ấy hỏng
    **âm thầm** — không báo gì cả — rồi mãi tới lúc nạp file mới ngã, với thông
    báo "không thấy file" chẳng liên quan gì tới nguyên nhân thật.

    Kiểm cả kích thước chứ không chỉ sự tồn tại: file tải dở vẫn nằm đó và vẫn
    tính là "có". Gói cũng kiểm ngưỡng ấy, ta kiểm cùng một ngưỡng.
    """
    import pathlib
    import urllib.request

    dich = pathlib.Path.home() / 'piano_transcription_inference_data' / MO_HINH
    if dich.exists() and dich.stat().st_size > MO_HINH_MB * 1024 * 1024:
        return
    dich.parent.mkdir(parents=True, exist_ok=True)
    print(f'  [2/3] dang tai mo hinh ({MO_HINH_MB} MB, tai mot lan roi thoi)...')

    tam = dich.with_suffix('.dang-tai')
    try:
        urllib.request.urlretrieve(MO_HINH_URL, tam)
        tam.replace(dich)                 # đổi tên khi xong, để không còn file dở
    except Exception as loi:
        if tam.exists():
            tam.unlink()
        sys.exit(f'  Tai mo hinh that bai: {loi}\n'
                 f'  Tai tay tu {MO_HINH_URL}\n  roi de vao {dich}')


def do_not(wav, dich):
    """Bước 2 — cho máy nghe rồi ghi ra nốt."""
    if os.path.exists(dich):
        print(f'  [2/3] da co file not, bo qua: {os.path.basename(dich)}')
        return
    try:
        import numpy as np
        import soundfile as sf
        from scipy.signal import resample_poly

        from piano_transcription_inference import PianoTranscription, sample_rate
    except ImportError as loi:
        # `audioread` hay thieu rieng: librosa 1.0 bo no, bo do not van goi.
        goi = getattr(loi, 'name', '') or ''
        cach = ('pip install audioread' if goi == 'audioread'
                else 'pip install torch piano_transcription_inference audioread')
        thieu('bo do not piano', cach, loi)

    tai_mo_hinh()
    print('  [2/3] dang nghe va ghi not... (bai 4 phut mat vai phut tren CPU)')
    """
    Tự nạp tiếng đàn, KHÔNG qua `load_audio` của gói dò nốt, cũng không qua
    `librosa.load`. Hai đường ấy đều hỏng, mỗi đường một lý do khác nhau:

    1. `load_audio` của gói (bản khoảng 2021) gọi đường dẫn nội bộ
       `librosa.core.audio.util.buf_to_float` — librosa 1.0 đã bỏ.
    2. `librosa.load` kéo theo `pooch`, `pooch` kéo theo `lzma`, và bản
       miniconda trên máy này thiếu DLL `_lzma`. Lỗi môi trường, không phải lỗi
       gói, và sửa nó là đụng vào cài đặt Python của người dùng.

    Cả hai đều nằm ở khâu NẠP TIẾNG, không phải khâu dò nốt — phần lõi của gói
    vẫn tốt. Đọc WAV thì `soundfile` là đủ, và đổi tần số thì `scipy` làm được.
    Đường này không đụng librosa nên không đụng cả hai chỗ hỏng trên.
    """
    audio, sr = sf.read(wav, dtype='float32', always_2d=True)
    audio = audio.mean(axis=1)                       # trộn về một kênh
    if int(sr) != int(sample_rate):
        # Rút gọn tỉ số trước khi đổi tần số, không thì phép lọc phình ra vô ích.
        uoc = np.gcd(int(sr), int(sample_rate))
        audio = resample_poly(audio, sample_rate // uoc, int(sr) // uoc)
    audio = np.ascontiguousarray(audio, dtype=np.float32)

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
    doc.add_argument('--khong-mo', action='store_true', dest='khong_mo',
                     help='xong thi dung tu mo MuseScore')
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

    """
    KIEM MACH ngay tai day, khong bat nguoi dung go them mot lenh nua.

    Day la buoc re nhanh cua ca quy trinh: ban thu co mach deu thi so do theo vi
    tri trong o nhip dung duoc, khong deu thi chung vo nghia. Bat nguoi dung tu
    nho chay `--tim-lech` roi tu doc nguong la dat mot cai bay — vi con so vo
    nghia trong ay van giong het mot phat hien.
    """
    mach = bo_do.tim_lech(mid, y.bpm, y.bar)
    deu = mach is not None and mach['do_khit'] >= MACH_DEU

    print(f"  So o nhip           {ket_qua['so_o']}")
    print(f"  So not              {ket_qua['so_not']}")
    print(f"  Cau gam thuan       {phan_tram(ket_qua['gam'])}")
    print(f"  Cau rai thuan       {phan_tram(ket_qua['rai'])}")
    print(f"  Cau pha tron        {phan_tram(ket_qua['tron'])}")
    print(f"  Cau dai trung vi    {ket_qua['dai_trung_vi']} not")
    if deu:
        print(f"  Not hop am o phach manh / yeu   "
              f"{phan_tram(ket_qua['hop_am_manh'])} / {phan_tram(ket_qua['hop_am_yeu'])}")
    else:
        print("  Not hop am o phach manh / yeu   -- BO QUA, xem phan MACH duoi day")

    print()
    print('  MACH')
    if mach is None:
        print('  - Khong doc duoc not nao de kiem mach.')
    elif deu:
        print(f"  - Mach DEU: {phan_tram(mach['do_khit'])} so not roi khit phach"
              f"  (roi ngau nhien ~24%).")
        print('  - Bon lua chon cho phach 1, xep theo suc nang tay trai:')
        for one in mach['lua_chon']:
            print(f"      coi phach {one['phach']} la MOT   --lech {one['lech']:<7}"
                  f" suc nang {phan_tram(one['suc_nang'])}")
        print('  - May hay lan phach 1 voi phach 3. Nghe roi chot bang tai.')
    else:
        print(f"  - Mach KHONG DEU: chi {phan_tram(mach['do_khit'])} so not roi khit"
              f" phach, ma roi ngau nhien da ~24%.")
        print('  - Ban thu choi rubato, hoac cho go do ra qua nhieu. Hai dang nay')
        print('    cho cung mot he qua: MOI SO DO THEO VI TRI TRONG O NHIP deu vo')
        print('    nghia, va khong co --lech nao cuu duoc.')
        print('  - Van dung duoc: co buoc, do dai cau, cho nghi, von o nhip dieu,')
        print('    bac hay dung, tam tay. Chung khong neo vao vach nhip.')

    print('\n  DOC KY HAI DONG NAY TRUOC MOI CON SO TREN:')
    if ket_qua['nguon_tach_tay'] == 'be rieng':
        print('  - Tach tay lay tu hai be co san trong file. Tin duoc.')
    else:
        print(f"  - Tach tay la PHONG DOAN, {phan_tram(ket_qua['ti_le_doan_mo'])} so not "
              f"phai doan mo.")
        print('    Moi file .mid trong MuseScore de nhin lai truoc khi tin.')
    if ket_qua.get('canh_bao'):
        print(f"  - {ket_qua['canh_bao']}")
    # Chi nhac chuyen phach 1 khi mach DEU. Mach khong deu thi phan MACH o tren
    # da noi ro hon: khong co --lech nao cuu duoc, nhac them chi lam roi.
    if deu:
        print('  - Vach nhip dang lay giay 0 CUA FILE lam phach 1, ma dau file')
        print('    thuong co phan dao. Chon mot --lech o tren roi chay lai thi')
        print('    so do theo vi tri trong o nhip moi dung.')

    """
    Don luon ban de NHIN, khong bat chay them mot lenh nua.

    Ban .mid goc gan nhu khong doc noi tren khuong: nhip do mac dinh vo nghia,
    truong do so le, khong phan tay. Ai cung se can ban da don, nen lam san.
    """
    sach = os.path.join(thu_muc, y.ten + '-sach.mid')
    import don_midi
    don_midi.don(mid, sach, y.bpm, y.bar, luoi=0.5)
    print()
    print(f'  Ban de NHIN (da nan ve luoi, hai be rieng): {sach}')
    print('  Ban nay de nhin va sua tay, KHONG de do: nan ve luoi la vut bot')
    print('  su that ve cho vao som, cho day tre.')

    if not y.khong_mo:
        cho = tim_musescore()
        if cho:
            print(f'  Dang mo bang MuseScore...')
            subprocess.Popen([cho, sach])
        else:
            print('  Khong thay MuseScore. Cai o musescore.org roi mo file tren.')

    ra = os.path.join(thu_muc, y.ten + '.json')
    with open(ra, 'w', encoding='utf-8') as fh:
        json.dump(ket_qua, fh, ensure_ascii=False, indent=2)
    print(f'\n  So do day du: {ra}')
    print(f'  File not:     {mid}')


if __name__ == '__main__':
    main()
