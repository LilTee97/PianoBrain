# Kết quả đo — định nghĩa D, Linh Nhi

Một vòng đo, không commit. Bộ đo mới: `tools/sheet/day_not.py` — **tách riêng**, không đụng
`chay_not.py` vì Cà Pháo còn dùng ngưỡng 0,26 ở đó. Ngưỡng theo thầy nằm ở hằng `NGUONG`,
thêm thầy thì thêm dòng.

Cỡ mẫu: **7 bài × 3 đoạn không lời = 167 ô nhịp**, chỉ khuông tay phải, đã vá số ô bằng
`clone_do.sua_o`.

---

## 1. Số D

**61 chuỗi.**

| chia theo | |
|---|---|
| **đoạn** | dạo **26** · giang **20** · kết **15** |
| **bài** | Một Cõi 15 · Rừng Lá 14 · Lá Thư 9 · Biển Tình 8 · Mùa Xuân 8 · Đừng Xa 4 · Đường Xưa 3 |
| **loại** (câu 3) | **rải hợp âm 36** · liền bậc **17** · trộn 8 |

Bước, đếm trên **305 bước** trong các chuỗi:

| liền bậc (1–2) | rải (3–4) | lặp (0) | quãng tám (12) | khác (5–8) |
|---|---|---|---|---|
| 23% | **42%** | 11% | 1% | **24%** |

---

## 2. Ba việc D làm được

**Ba chuỗi rác đã hết sạch.** A3 (`D7 → E5`, −22) chết ở luật cắt vạch ô; A4 (`D7 → A4`,
−29) chết ở luật chọn nốt gần nốt trước cộng luật bỏ nốt đáp trầm. Không còn bước nào quá
8 nửa cung ngoài ±12 hợp lệ.

**Ostinato gõ lặp gần như không lọt.** Chỉ **5/61** chuỗi có từ 40% bước trở lên là lặp cao
độ — và cả 5 đều nhận ra được:

| bài | đoạn | ô | lặp | chuỗi |
|---|---|---|---|---|
| Lá Thư | dạo | 6 | 43% | `E5 F5 C#5 C#5 C#5 C#5 E5 C#5` |
| Lá Thư | giang | 56 | 40% | `F#4 A4 A4 A4 A5 E6` |
| Một Cõi | dạo | 1 | 62% | `Bb4 Bb4 Bb4 Bb4 D5 G4 Bb4 Bb4 Bb4` |
| Một Cõi | giang | 54 | 40% | `D4 Bb4 G4 Bb4 Bb4 Bb4` |
| Rừng Lá | dạo | 9 | 44% | `E4 E4 G4 E4 G4 B4 A4 A4 A4 A4` |

Bỏ cả 5 thì còn **56 chuỗi**, phân bố gần như không đổi.

**Câu 3 có câu trả lời rõ, và nó ngược trực giác.** Rải hợp âm **36** so với liền bậc **17**
— gấp hơn hai lần. Tính theo bước thì rải (3–4) **42%** so với liền bậc **23%**. Nói cách
khác, thứ tay phải Linh Nhi hay chơi **không phải chạy ngón theo gam, mà là rải hợp âm**.
Tách hai loại là đúng, và nếu KeyTrain chỉ làm một thì phải làm **rải** trước.

---

## 3. Chỗ D CHƯA ĐẠT MỤC TIÊU — cần vòng hai

Mục tiêu đặt ra là tách **"đoạn ngắn"** khỏi **"cả tuyến giai điệu"**. D chưa làm được:

| định nghĩa | số chuỗi |
|---|---|
| B (móc đơn ≥ 4 nốt) — bị bác vì *"≈ cả tuyến giai điệu"* | 64 |
| **D** | **61** |

Chênh 3 chuỗi. Và quy về mật độ: **61 chuỗi / 167 ô = 0,37 chuỗi mỗi ô**, tức **cứ ba ô thì
hơn một ô có một "dãy"**. Đó vẫn là mô tả cả tuyến, không phải một thủ pháp.

Lý do có thể đọc thẳng ra từ số: **độ dài hiệu dụng trung vị là 5 nốt**, ngắn nhất 4, dài
nhất 11. Ở bolero 60–70 BPM với ngưỡng 0,5 thì **nốt móc đơn là mặt bằng của cả giai điệu**,
nên cắt ở vạch ô và ở chỗ nghỉ > 0,4 phách chỉ đơn thuần **chia giai điệu thành từng ô**,
chứ không lọc ra cử chỉ nào.

Một dấu hiệu nữa: **24% số bước nằm trong khoảng 5–8 nửa cung**. Luật 2 chỉ cắt khi vượt 8,
nên một phần tư số bước bên trong cái ta đang gọi là "dãy" là bước nhảy quãng bốn tới quãng
sáu. Chuỗi có tỉ lệ bước nhảy như vậy khó gọi là một dãy.

### Hai con số cho vòng hai

Nếu thêm sàn độ dài — giữ nguyên mọi luật khác của D:

| sàn | số chuỗi | mật độ |
|---|---|---|
| ≥ 4 nốt hiệu dụng (D hiện tại) | 61 | 0,37 / ô |
| **≥ 6 nốt hiệu dụng** | **23** | 0,14 / ô |
| **≥ 7 nốt hiệu dụng** | **15** | 0,09 / ô |

Toàn bộ 15 chuỗi ở mức ≥ 7 — đây là danh sách để anh nghe và chốt xem chúng có phải thứ
người dùng nói tới không:

| bài | đoạn | ô | loại | chuỗi |
|---|---|---|---|---|
| Biển Tình | dạo | 8 | rải | `A4 F#4 A4 B4 E4 A4 E5 D5 B4` |
| Biển Tình | giang | 59 | rải | `A4 F#4 A4 B4 E4 A4 E5 D5 B4` |
| Biển Tình | kết | 70 | rải | `E5 D5 B4 D5 A4 F#4 A4 Eb5` |
| **Biển Tình** | **kết** | **71** | **liền bậc** | `E5 F#5 A5 D6 E6 F#6 A6` |
| **Đừng Xa** | **giang** | **56** | **liền bậc** | `E6 D6 A5 F5 E5 D5 F#4 F4 E4 D4` |
| Lá Thư | giang | 61 | rải | `E5 G5 C#5 E5 C#5 C#5 C#5 C#5 C#5 G5 C#5 E5` |
| Một Cõi | dạo | 3 | liền bậc | `Eb4 A4 Bb4 A4 G4 F#4 Eb4` |
| Một Cõi | dạo | 4 | rải | `Eb4 D4 D4 F#4 A4 C5 D5 F#5 A5 F#5 C6 A5` |
| Một Cõi | giang | 56 | liền bậc | `Eb4 A4 Bb4 A4 G4 F#4 Eb4` |
| Một Cõi | giang | 57 | rải | `Eb4 D4 F#4 A4 C5 A4 C5` |
| Một Cõi | kết | 114 | rải | `Eb4 Eb4 G4 Eb4 A4 Eb4 Bb4 Eb4 G4` |
| Mùa Xuân | giang | 65 | rải | `E4 G4 E4 G4 E4 B4 G4 Eb5` |
| Mùa Xuân | kết | 106 | rải | `E5 G5 D5 E5 B4 D5 F#4` |
| Rừng Lá | dạo | 5 | liền bậc | `C5 D5 E5 G5 C5 E5 C5 C5 B4 C5` |
| Rừng Lá | kết | 72 | trộn | `C5 G4 D5 E5 E5 G5 E5 C5 C5 B4 C5` |

Hai chuỗi in đậm là hai chuỗi tôi thấy rõ nhất là "một dãy nốt" theo nghĩa thông thường:
Biển Tình ô 71 đi lên bảy nốt liền một mạch, Đừng Xa ô 56 đi xuống mười nốt.

---

## 4. Điều tôi cần ở vòng hai

1. **Sàn độ dài có phải cách đúng để tách "đoạn ngắn" không**, hay D thiếu một luật khác
   hẳn (ví dụ: đòi hướng đi nhất quán, hoặc đòi trường độ ĐỀU NHAU trong chuỗi)?
2. Nếu dùng sàn thì **≥ 6 hay ≥ 7**? Hai mức ra 23 và 15 chuỗi.
3. **24% bước nằm ở 5–8 nửa cung** có chấp nhận được trong một "dãy" không, hay luật 2 phải
   siết từ 8 xuống thấp hơn?
4. Con số **rải 36 / liền bậc 17** có làm anh đổi ý về việc KeyTrain nên làm gì trước không?

## 5. Chạy lại

```bash
cd D:\PianoBrain
python tools\sheet\day_not.py linh-nhi            # bảng số
python tools\sheet\day_not.py linh-nhi --chuoi    # in từng chuỗi
```

Sửa ngưỡng ở hằng `NGUONG` trong `tools/sheet/day_not.py` — mỗi thầy một dòng riêng.

**Một chỗ tôi làm lệch với chữ của phiếu, ghi ra để không ai tưởng là sót:** phiếu viết
`min(dur)` của mốc gõ, tôi lấy **độ ngân của chính nốt được chọn**. Cùng một ý, và lấy `min`
thì sập đúng cái bẫy số 3 mà anh đã chỉ ra ở Lá Thư ô 106 (mốc 2,5 có `A6` ngân 1,0 chồng
`G5` ngân 0,25).
