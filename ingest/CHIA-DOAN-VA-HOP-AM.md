# Chia đoạn và lấy hợp âm từ bản ký âm piano

Tài liệu bàn giao. Mục tiêu cuối: đọc ra **quy luật chọn hợp âm và chọn nốt cho câu solo**
của từng người soạn, từ chính bản ký âm của họ.

Có hai việc rời nhau, làm được song song:

| việc | cần người | công cụ |
|---|---|---|
| A. Chia đoạn — bài này phiên khúc từ ô mấy tới ô mấy | đọc số ô trên bản nhạc | `tools/sheet/khung.py` |
| B. Lấy hợp âm — mỗi ô là hợp âm gì | chạy plugin + sửa vài chỗ | MuseScore plugin + `tools/sheet/don_hop_am.py` |

---

## Bối cảnh: kho có gì

Tám bản ký âm `.mxl`. Bảy bài do **Cà Pháo** chơi, một bài do **Linh Nhi** chơi.

File nằm **ngoài** kho, trỏ tới bằng biến môi trường `PIANOBRAIN_SHEETS`:

```
PIANOBRAIN_SHEETS="C:/Users/Tin PC/Downloads/Documents/Ca_Phao"
```

Riêng `bien-tinh-linh-nhi-piano.mxl` nằm trong `video/`.

Đăng ký bài, thể loại và biên đoạn ở `tools/sheet/corpus.json`.

**Thể loại do người dùng xác nhận từng bài, không suy từ file** — đã đoán sai ba lần trước khi
hỏi. Đừng tự gán thể loại.

### Trạng thái chia đoạn, tính tới nay

| bài | thể loại | số ô | đã có đoạn |
|---|---|---|---|
| Hồng Kông 1 | bossa nova | 107 | **đủ 7** |
| Người hãy quên em đi | bossa nova | 104 | **đủ 7** |
| Biển Tình *(Linh Nhi)* | bolero | 72 | **đủ 7** |
| Bèo dạt mây trôi | ballad | 95 | 3 — thiếu phiên khúc, điệp khúc |
| Yêu xa | ballad | 112 | 3 — thiếu phiên khúc, điệp khúc |
| Mơ | slow rock 4/4 | 79 | 2 — thiếu phiên khúc, điệp khúc, kết bài |
| Kém duyên | ballad | 79 | 2 — bài không có đoạn dạo |
| Yêu là tha thứ | ballad | 85 | **0 — chưa có mốc nào** |

### Trạng thái lấy hợp âm

Mới xong **Hồng Kông 1**, và mới xong **riêng đoạn giang tấu**.

---

## Việc A — chia đoạn

```bash
python tools/sheet/khung.py tao    # viết ra tools/sheet/khung-doan.txt, điền sẵn cái đã biết
# ... người dùng mở file ấy, điền số ô ...
python tools/sheet/khung.py doc    # đọc lại, KIỂM, rồi ghi vào corpus.json
```

Khung có dạng:

```
== Kém duyên
#    the loai: ballad | bai dai 79 o nhip
dao dau         :
phien khuc      :
diep khuc       :
giang tau       : 27-36
phien khuc lap  :
diep khuc lap   :
ket bai         : 70-79
```

Điền `16-31`. Bài **không có** đoạn ấy thì gõ `x`. Chưa biết thì để trống.

### Bước kiểm là bắt buộc, đừng bỏ

`doc` kiểm ba thứ trước khi ghi, và **sai một chỗ là không ghi gì cả**:

- ô nằm ngoài bài
- hai đoạn chồng nhau
- đoạn đi lùi

Lý do: biên đoạn lệch một ô thì mọi số đo phía sau lệch theo, mà lệch kiểu ấy **không bao giờ báo
lỗi** — nó chỉ làm kết quả sai đi một chút. Đó là loại hỏng khó thấy nhất.

Bẫy đã sập một lần: bản đầu của `doc` ghi đè cả khối đoạn nên **mất trường `time`** — mốc thời
gian video ghi lại biên đoạn ấy từ đâu ra. Nay giữ lại. Khi sửa `doc`, đừng thay cả `dict` của
một đoạn.

---

## Việc B — lấy hợp âm

Bản ký âm **không có ký hiệu hợp âm nào**. Phải sinh ra rồi sửa.

### B1. Chạy plugin trong MuseScore

Plugin **Chord Identifier (Pop & Jazz)** đã cài sẵn tại:

```
C:\Program Files\MuseScore 4\plugins\chordIdentifierPopJazz\chordIdentifierPopJazz.qml
```

**MuseScore 4.7 chỉ quét thư mục cài đặt.** Không quét `Documents\MuseScore4\Plugins`, không quét
`AppData\Local\MuseScore\MuseScore4\plugins`. Mọi hướng dẫn trên mạng đều chỉ hai chỗ sau và đều
sai với bản 4.7. Đã thử cả ba, và đã kiểm bằng cách thả một plugin *đang chạy được* vào từng chỗ.
Ghi vào `Program Files` cần quyền quản trị nên **người dùng phải tự dán**.

Không có cách chạy plugin từ dòng lệnh — MuseScore 3 có `-p`, MuseScore 4 bỏ rồi (kiểm bằng
`MuseScore4.exe --help`).

Cách chạy: mở bài → **Ctrl+A** → menu **Plugins** → **Chord Identifier**. Đặt:

| lựa chọn | đặt | vì sao |
|---|---|---|
| Symbol | `Normal(A-G)` | cần tên hợp âm, không cần bậc La Mã |
| Bass | `Yes` | giữ hợp âm đảo `C/E` |
| Inversion | `Normal` | dễ đọc hơn ký hiệu số |
| Highlight Chord Notes | `No` | tô màu chỉ làm rối |
| **On Incomplete Chords** | **`Show '??'`** | xem dưới |
| **Use Entire Note Duration** | **`Yes`** | nốt bass ngân dài phải tính suốt độ ngân |

Chọn `Show '??'` chứ đừng chọn `Suggest`. Chỗ ngờ vực thành `??` thì dễ quét mắt; chọn `Suggest`
thì nó ra một cái tên trông có vẻ đúng, dụ người đọc giữ lại.

Xong thì **Ctrl+S** hoặc **File → Export → MusicXML**.

### B2. Dọn tự động

```bash
python tools/sheet/don_hop_am.py <file.mxl hoặc .musicxml> [--moi-o 2]
```

Ghi ra file mới đuôi `-da-don.musicxml`, **không đụng file gốc**.

Ba luật:

1. Xoá mọi ký hiệu `??`
2. Xoá ký hiệu **màu đỏ** (plugin đánh dấu hợp âm thiếu khi chạy chế độ `Suggest`)
3. Mỗi ô chỉ giữ ký hiệu ở **vạch nhịp**, cộng nhiều nhất một ký hiệu ở **nửa ô** nếu nó khác

Luật 3 là luật của người dùng: *"gặp những cặp hợp âm chia đôi thì chỉ tính bậc cho hợp âm đầu
cặp"*.

**Bẫy đã sập:** plugin ghi `??` vào `<kind text="??">` nhưng **vẫn giữ nguyên `<root>`**, nên tên
đầy đủ đọc ra là `C??`, `Em??`. Kiểm bằng tên đầy đủ thì trượt sạch — 402 trên 562 ký hiệu không
cái nào bị bắt. Phải kiểm riêng thuộc tính `kind text`. Xem hàm `la_hoi()`.

Kết quả trên Hồng Kông 1:

```
Vào         562 ký hiệu — 5,2 mỗi ô
Xoá ??      402
Xoá sai chỗ  66
Còn          94 — 0,9 mỗi ô
```

### B3. Người điền chỗ máy tắc

Sau khi dọn, một số ô **không còn ký hiệu nào** — vì mọi ký hiệu ở đó đều là `??`.

Hồng Kông 1 thiếu 28 ô, rải khắp bài. **Chỉ điền phần cần cho câu hỏi đang hỏi.**

Người dùng đã ra luật này: chỉ cần **phần giang tấu**, không cần cả 28 ô, trừ khi phần còn lại
thật sự liên quan tới quy luật chọn hợp âm đang tìm. Đừng đưa cả file ra làm việc phải làm.

Chỗ máy tắc **có quy luật**. Giang tấu Hồng Kông 1 thiếu đúng các ô 49, 50, 53, 54, 57, 58 — từng
cặp, cách nhau 4 ô. Đó là **những ô chạy ngón**: tay phải chạy nốt nên trong ô có đủ thứ cao độ,
máy không gọi tên nổi. Máy tắc **đúng ở những ô đáng học nhất**.

Cách điền: nhìn **tay trái**, đừng nhìn tay phải — tay phải đang chạy nên không nói lên hoà âm.
Trong MuseScore: bấm một nốt trong ô → **Ctrl+K** → gõ tên → **Esc**.

### B4. Rà lại tên máy đoán

Máy đọc trúng **nốt nào đang vang**, không đọc trúng **người soạn nghĩ mình chơi hợp âm gì**. Hai
thứ khác nhau, và chỗ khác nhau nằm đúng ở nốt ngoài giọng.

Đã bắt được ba ca trong giang tấu Hồng Kông 1:

| ô | lớp cao độ | máy đoán | thật ra | rồi đi tới |
|---|---|---|---|---|
| 48 | C D E G A **B♭** | `E/B♭` | **C7** | ô 49 `Fmaj7` |
| 56 | C D E G A **B♭** | `Edim/B♭` | **C7** | ô 57 `F` |
| 60 | **C♯** D F G A B♭ | `C#aug` | **A7♭9** | ô 61 `Dm` |

`E/B♭` và `C7` là **cùng một mớ nốt nhìn từ hai phía**. Máy chọn gốc gần nhất; người chọn gốc có
nghĩa.

Cách rà: lấy lớp cao độ cả ô, tìm nốt **ngoài giọng**, rồi xem ô kế tiếp là gì. Nốt ngoài giọng
gần như luôn là dấu hiệu của một hợp âm hút.

---

## Kết quả đã có: giang tấu Hồng Kông 1

```
ô 47-48   C       →  C7        ┐  V7 của IV
ô 49-50   Fmaj7      Fmaj7     ┘
ô 51-52   G          G
ô 53-54   Dm7        G            ii - V
ô 55-56   C       →  C7        ┐  V7 của IV
ô 57-58   F          F         ┘
ô 59-60   Em      →  A7♭9      ┐  V7 của ii
ô 61-62   Dm         C/E       ┘
ô 63-64   C/F · C    G
ô 65      F/G
```

Hai điều đọc ra:

1. **Nhịp hoà âm là hai ô một hợp âm.**
2. Cà Pháo dùng **ô thứ hai của cặp** để chèn hợp âm hút sang cặp kế tiếp. Ba lần trong 19 ô, cả
   ba đều là **bảy át phụ** — hai lần V7/IV, một lần V7/ii.

**Cỡ mẫu: một đoạn giang tấu của một bài.** Ba lần chèn thì thấy được thói quen, chưa đủ gọi là
luật của người soạn.

---

## Việc còn lại, theo thứ tự nên làm

1. **Chia đoạn cho 5 bài còn thiếu** — ưu tiên `Yêu là tha thứ` (chưa có mốc nào) và phiên khúc
   của `Bèo dạt mây trôi`, `Yêu xa`, `Mơ`. Có phiên khúc mới so được vòng giang tấu với vòng
   phiên khúc của cùng bài.
2. **Lấy hợp âm giang tấu cho 6 bài còn lại**, theo đúng quy trình B. Mỗi bài chỉ cần vài ô.
3. **Đối chiếu hai người soạn.** Kho có Cà Pháo (7 bài) và Linh Nhi (1 bài). Câu hỏi: mỗi người
   chọn vòng hợp âm cho câu solo theo lối nào.

## Luật cứng phải giữ

- **Mỗi lần học phong cách của ai thì tách hết khỏi thầy khác.** Không mượn hằng số, không gọi
  hàm của thầy khác vì "cũng là việc ấy". Chỉ hoà hai phong cách khi người dùng yêu cầu đích danh.
- **Không bịa.** Số nào không đo được thì nói là không đo được, đừng lấp bằng lý thuyết chung. Cỡ
  mẫu phải ghi kèm mọi kết luận.
- **Thể loại và biên đoạn do người dùng xác nhận**, không suy từ file.

## Công cụ đo có sẵn

| file | đo gì |
|---|---|
| `tools/sheet/mxl.py` | đọc `.mxl` ra danh sách nốt: ô, phách, cao độ, tay, trường độ |
| `tools/sheet/profile.py` | thống kê chung, đoán hợp âm từ tay trái (`harmony()`) |
| `tools/sheet/hai_tay.py` | hai tay phối hợp thế nào, từng đoạn một |
| `tools/sheet/trai_hinh.py` | hình tay trái trong ô — gõ vào phách nào |
| `tools/sheet/chay_not.py` | giải phẫu câu chạy ngón: dài, bước, chỗ vào, hướng |

### Bẫy chung của mọi bộ đo trên

**6% số nốt bị gán lệch đúng một ô** — offset bằng đúng độ dài ô. Nốt cuối ô bị gán sang ô trước.
Phải chỉnh trước khi lấy số:

```python
o = n['bar']
while o in start and o + 1 in start and n['beat'] >= start[o] + bl[o] - 1e-6:
    o += 1
n['bar'] = o
```

Còn một bẫy nữa, đã sập: **đếm nốt thay vì đếm mốc gõ**. Mốc có chồng quãng tám bị tính hai lần,
làm hình tay trái méo đi. Đếm mốc.
