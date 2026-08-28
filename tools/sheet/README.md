# Đo bản ký âm

Bộ đọc file MusicXML nén (`.mxl`) và rút số liệu thống kê từ nó. Dùng để học
thói quen soạn câu của một người chơi thật, thay vì đoán.

## Chạy

```bash
# Trỏ tới thư mục chứa file .mxl — file nằm NGOÀI kho, kho chỉ đăng ký nguồn
export PIANOBRAIN_SHEETS="/duong/dan/toi/thu/muc/sheet"

python tools/sheet/profile.py           # bảng tóm tắt
python tools/sheet/profile.py --json    # JSON đầy đủ, có số liệu từng đoạn
```

Danh sách bài, thể loại và biên đoạn nằm ở `corpus.json`.

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
