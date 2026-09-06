# Đo bản ký âm

Bộ đọc file MusicXML nén (`.mxl`) và rút số liệu thống kê từ nó. Dùng để học
thói quen soạn câu của một người chơi thật, thay vì đoán.

## Chạy

```bash
# Trỏ tới thư mục chứa file .mxl — file nằm NGOÀI kho, kho chỉ đăng ký nguồn
export PIANOBRAIN_SHEETS="/duong/dan/toi/thu/muc/sheet"

python tools/sheet/profile.py           # bảng tóm tắt
python tools/sheet/profile.py --json    # JSON đầy đủ, có số liệu từng đoạn

# Lưu / xóa câu dạo, giang tấu, outro (không vào knowledge/)
python tools/sheet/luu_solo.py          # lưu mọi bài có file
python tools/sheet/luu_solo.py lietke
python tools/sheet/luu_solo.py xoa <id>
python tools/sheet/luu_solo.py xoa-thay ca-phao
python tools/sheet/luu_solo.py xoa-het
```

Danh sách bài, thể loại và biên đoạn nằm ở `corpus.json`.

## Đo file MIDI

```bash
# MIDI soạn sẵn (từ bản ký âm, từ Synthesia) — phách quy từ tích, chính xác
python tools/sheet/profile.py --midi duong/dan/bai.mid

# MIDI dò từ tiếng đàn — phải nói nhịp độ, vì nhịp độ trong file là số mặc định
python tools/sheet/profile.py --midi bai.mid --bpm 72 --bar 4

python tools/sheet/midi.py     # tự kiểm bộ đọc
```

Có bộ đọc này thì mọi phép đo chạy được trên video bất kỳ, không riêng những bài
may mắn có bản ký âm. Nhưng **MIDI và bản ký âm không cùng độ tin cậy**, và chỗ
khác nhau phải nói ra chứ không để người đọc tự đoán.

### Ba thứ MIDI dò từ tiếng đàn KHÔNG có

| | bản ký âm | MIDI dò từ tiếng đàn |
|---|---|---|
| cao độ, chỗ gõ | có | có |
| **tay trái / phải** | có | **không** — phải đoán |
| **trường độ** | có | **không tin được** |
| **phách, ô nhịp** | có | phải nhập nhịp độ |

**Tay.** File có hai bè cùng có nốt thì lấy bè làm tay — tin được, cùng lối xử
bẫy 2 dưới đây. Không có thì phải đoán, và kết quả in ra kèm `nguon_tach_tay`
với `ti_le_doan_mo`. Đọc hai con số ấy trước khi đọc mọi con số khác: chúng nói
bao nhiêu phần kết quả là phỏng đoán chứ không phải số đo.

**Trường độ.** Ballad đạp pedal liên tục nên chỗ nốt tắt bị nhoè, và mô hình dò
nốt đoán offset kém hơn hẳn onset. Điều này quan trọng với kho: mẫu đệm sống
bằng trường độ và độ nhấn — mẫu Slow Rock 3 của thầy Đức Thịnh nghe ra là chính
nó nhờ bốn trường độ khác nhau. Đo trường độ trên MIDI dò từ tiếng đàn là đo một
thứ không có thật. Chỉ tin **chỗ gõ**.

**Chưa có phách 1.** Bộ đọc lấy giây 0 của file làm phách 1, mà đầu file thường
có phần dạo — nên vạch nhịp bị xoay đi một lượng chưa biết. Mọi số đo theo *vị
trí trong ô nhịp* chưa dùng được chừng nào chưa tìm được phách 1 thật. Đã thấy
tận mắt: đo tay trái một bản bolero ra biểu đồ chỗ gõ phẳng lì 9-17% rải đều tám
vị trí móc đơn, trong khi mẫu thật phải có đỉnh nhọn ở bốn phách. Số đo KHÔNG
theo vị trí trong ô — bậc hay dùng, cỡ bước, độ dài câu — thì không dính.

**Nhịp độ là thứ HỎI, không suy.** Cùng một luật với thể loại ở dưới: đoán hộ
thì mọi con số theo ô nhịp thừa hưởng cái đoán ấy.

## Vì sao có thư mục này

Số liệu đã được ghi vào kho (item `ca-phao-cau-solo-tren-vong-hop-am`), nhưng
**khả năng đo lại** thì trước đây không nằm ở đâu cả — bộ đọc sống trong một
thư mục tạm. Nghĩa là mọi con số trong item không ai kiểm chứng được, và bốn
cái bẫy dưới đây phải phát hiện lại từ đầu. Hai trong bốn cái ấy đã âm thầm làm
sai số một lần rồi.

Đây cũng là thứ bước tiếp theo cần: mỗi khi có bài mới thì phải đo lại toàn bộ,
vì corpus lớn thêm là khoảng đo đổi.

## Bốn cái bẫy

Cả bốn đều **không báo lỗi** — chúng chỉ cho ra con số sai.

**1. Đổi số chỉ nhịp giữa bài.** Lấy độ dài ô nhịp cuối áp cho cả bài thì mọi
nốt lệch ô. *Hồng Kông 1* chuyển sang 2/4 ở ô 100; chỉ vì chỗ này mà tỉ lệ bám
hợp âm của bài ấy từng ra 52% thay vì 67%. `mxl.notes` trả về `barlens` — độ dài
**từng ô** — và bên gọi phải nhóm theo `bar` của chính nốt.

**2. Bản ghi thành hai bè riêng** thay vì một bè hai khuông. Lúc ấy `staff` của
mọi nốt đều bằng 1, và phần tách tay nằm ở **số thứ tự bè**. *Kém duyên* như
vậy; không xử thì cả hai tay bị gộp vào tay phải và mất sạch phần tách tay.

**3. Suy hợp âm từ cả hai tay là tự chứng minh chính mình.** Lấy cả nốt tay phải
để đoán hợp âm rồi lại hỏi tay phải có bám hợp âm không thì con số vô nghĩa. Lần
đầu đo ra 58–84%; suy lại **chỉ từ tay trái** ra 41–69%.

**4. So giang tấu với đoạn dạo hay outro.** Cả hai đoạn ấy cũng là đoạn không
lời và cũng có kết cấu riêng, nên so với chúng thì ra số vô nghĩa. Nền so sánh
phải là **đoạn hát** — những ô không thuộc đoạn nào đã đặt tên.

## Biên đoạn

Số ô nhịp trong `corpus.json` là kết quả quy đổi từ mốc thời gian video, **đã
đối chiếu bằng tay**. Việc quy đổi cần phán đoán nên không để máy tính lại:

- Đoạn `rubato` phải neo riêng — chơi tự do thì chia đều là sai.
- Bài không có outro thì thiếu mốc cuối để neo.
- Nhịp độ có chỗ nhập nhằng nửa nhịp (72 hay 144).

Mỗi bài có trường `confidence` ghi độ tin và căn cứ. Chỗ tin nhất là *Hồng Kông
1*: hai cách quy đổi độc lập cho 110 và 113 nhịp/phút, và bản ký âm đổi số chỉ
nhịp ngay ở ô outro bắt đầu.

## Thể loại là thứ phải HỎI

Không suy từ file. Đã đoán sai ba lần liên tiếp trên đúng bốn bài đầu, và mỗi
lần đoán sai đều làm sụp một phát biểu đã ghi vào kho — vì thể loại không phải
một cái nhãn, nó là **khoá gom nhóm**, và mọi con số theo thể loại thừa hưởng nó.

## Giả thuyết quen tai phải có NỀN SO SÁNH

Bộ đo trả về `cau_sau_lap_cau_truoc` kèm `cau_sau_lap_cau_truoc_NEN`. Con số
thứ hai là mức giống nhau của hai câu **bất kỳ** trong cùng bài. Chỉ đọc con số
thứ nhất thì luật hỏi-đáp nào cũng "đúng": vốn ô nhịp hẹp — móc đơn chiếm 53% —
nên hai câu bất kỳ đã giống nhau sẵn 44%, đúng bằng mức hai câu liền nhau.

Hai luật nghe rất có lý đã chết ở đây, sau khi suýt được cài vào bộ sinh như thể
học được từ anh ấy: *câu đáp lặp hình nhịp câu hỏi*, và *nốt treo giải quyết
liền bậc đi xuống* (`not_treo`: 40% liền bậc, 32% đi xuống — hai phần ba số lần
anh ấy đi LÊN).

## Đọc số thế nào

Với một hai bài mỗi nhóm, chênh lệch giữa hai bài cùng thể loại lớn hơn chênh
lệch giữa hai thể loại. Nên mọi phát biểu phải kèm **cỡ mẫu**, và ghi thành
**khoảng** chứ không phải điểm. Trong corpus này đã có ba phát hiện trông sạch
ở n = 2–3 rồi tan ra khi n tăng.
