# Phiếu — Linh Nhi · bolero · **dãy nốt ngắn của tay phải**

Người dùng: *"trong các sheet của Linh Nhi sẽ thấy có các đoạn ngắn tay phải chơi một dãy
nốt. Hãy liệt kê ra và nếu không chắc hãy làm phiếu hỏi."*

Tôi **không chắc ở chỗ định nghĩa**, nên phiếu này hỏi trước rồi mới đo.

Đo trên **7 bản ký âm Linh Nhi**, chỉ ba đoạn không lời (dạo · giang · kết), chỉ khuông tay
phải. Bộ đo: `tools/sheet/chay_not.py`.

---

## 0. Vì sao phải hỏi: đổi ngưỡng thì số đếm đổi gấp mười hai lần

| ngưỡng | số chuỗi tìm được |
|---|---|
| nốt ≤ 0,26 phách (móc kép trở lên), ≥ 4 nốt | **10** |
| nốt ≤ 0,5 phách (móc đơn trở lên), ≥ 4 nốt | **64** |
| nốt ≤ 0,5 phách, ≥ 3 nốt | **119** |

Ba con số ấy nói ba chuyện khác hẳn nhau: 10 chuỗi là *"thủ pháp hiếm"*, 119 chuỗi là
*"cách chị ấy viết giai điệu"*. Chưa chốt định nghĩa thì mọi con số sau đều treo.

**Chọn một dòng:**

- [ ] **A** — chỉ tính nốt **móc kép trở lên** (≤ 0,26 phách). Dãy nốt là chỗ chạy nhanh.
- [ ] **B** — tính cả **móc đơn** (≤ 0,5 phách). Dãy nốt là chỗ nốt đi đều liên tiếp.
- [ ] **C** — không theo trường độ, mà theo **bước**: từ 4 nốt trở lên đi liền nhau, mỗi
      bước không quá một quãng ba.
- [ ] khác: ………………………………………………………………

---

## 1. Danh sách theo mức A — 10 chuỗi, nốt móc kép trở lên

Tick những chuỗi **đúng là thứ anh nghe thấy**; gạch những chuỗi không phải.

| # | bài | đoạn | ô | vào phách | nốt | hướng |
|---|---|---|---|---|---|---|
| A1 | Biển Tình | kết | 71 | 1,75 | `E5 F#5 A5 D6 E6` | lên |
| A2 | Đừng Xa | giang | 56 | 1,00 | `F6 E6 D6 A5 F5 E5 D5 F#4 A4 E4` | xuống, **10 nốt** |
| A3 | Đừng Xa | kết | 84 | 3,62 | `D7 E5 G5 A5 A6` | ? |
| A4 | Lá Thư | kết | 106 | 2,50 | `A6 G6 D6 D7 A4` | ? |
| A5 | Một Cõi | dạo | 3 | 1,50 | `A4 Bb4 A4 G4 F#4 Eb4` | xuống |
| A6 | Một Cõi | dạo | 4 | 0,50 | `D4 D4 F#4 F#5 A5 D5 F#5 A5 F#5` | lên, **9 nốt** |
| A7 | Một Cõi | giang | 56 | 1,50 | `A4 Bb4 A4 G4 F#4 F#5` | xuống rồi vọt |
| A8 | Một Cõi | giang | 57 | 2,00 | `A5 F#5 C6 A5` | ngang |
| A9 | Đường Xưa | dạo | 3 | 3,00 | `D5 E5 F5 C5 A5` | lên |
| A10 | Mùa Xuân | kết | 106 | 2,25 | `A5 D5 E5 B4` | xuống |

**Ba chuỗi tôi NGỜ LÀ LỖI ĐO, không phải dãy nốt** — chúng có cú nhảy quá xa để gọi là một
dãy:

- [ ] **A3** — bước đầu `D7 → E5` là **−22 nửa cung**. Bỏ.
- [ ] **A4** — có bước `D7 → A4` là **−29 nửa cung**. Bỏ.
- [ ] **A6** — có bước `F#4 → F#5` là **+12**. Bỏ, hoặc coi là dãy rải hợp âm chứ không
      phải chạy ngón.

Nếu bỏ cả ba thì mức A còn **7 chuỗi trên 7 bài**.

---

## 2. Danh sách theo bước nhỏ — 8 chuỗi, mỗi bước ≤ 4 nửa cung

Đây là mức C ở trên: không hỏi nốt nhanh hay chậm, chỉ hỏi các nốt có **đi liền nhau**
không.

| # | bài | đoạn | ô | phách | trường độ | nốt |
|---|---|---|---|---|---|---|
| C1 | Biển Tình | giang | 55 | 1,50 | 0,50 | `E6 D6 E6 F#6 A6 B6` |
| C2 | Một Cõi | dạo | 3 | 1,50 | 0,25 | `A4 Bb4 A4 G4 F#4 Eb4 Eb4` |
| C3 | Một Cõi | dạo | 9 | 1,00 | 0,38 | `D4 F#4 A4 C5` |
| C4 | Một Cõi | giang | 54 | 1,62 | 0,12 | `Bb4 G4 Bb4 Bb4 Bb4` |
| C5 | Rừng Lá | dạo | 7 | 3,50 | 0,25 | `B5 D6 B5 A5 G5` |
| C6 | Rừng Lá | dạo | 9 | 1,25 | 0,25 | `E4 G4 B4 A4` |
| C7 | Rừng Lá | kết | 73 | 3,00 | 0,50 | `G5 E5 G5 G5 G5` |
| C8 | Rừng Lá | kết | 74 | 3,50 | 0,25 | `B5 D6 B5 A5` |

**Hai chuỗi tôi ngờ không phải dãy nốt** — chúng gõ lặp lại một cao độ chứ không đi đâu:

- [ ] **C4** (`Bb4 G4 Bb4 Bb4 Bb4`) và **C7** (`G5 E5 G5 G5 G5`) là **nốt gõ lặp**, không
      phải dãy nốt. Bỏ.

---

## 3. Khẳng định đo được — tick nếu đúng

Mỗi dòng là **một sự thật về bản ký âm**, chưa phải đề nghị làm gì trong app.

- [ ] Dãy nốt của Linh Nhi là **thủ pháp hiếm** — nhiều nhất 10 chuỗi trên 7 bài, tức
      trung bình chưa tới 1,5 chuỗi mỗi bài.
- [ ] **Rừng Lá Thấp không có chuỗi nào** ở mức A — bài duy nhất trắng trơn.
- [ ] Bốn bài chỉ có **đúng một** chuỗi, và cả bốn đều nằm ở **đoạn kết hoặc giang tấu**:
      Biển Tình · Lá Thư · Đường Xưa · Mùa Xuân.
- [ ] Chia theo đoạn: **dạo 3 · giang 3 · kết 4** — tức **đoạn dạo là chỗ ÍT dãy nốt
      nhất**, và 2 trong 3 chuỗi ấy thuộc cùng một bài (Một Cõi).
- [ ] **Một Cõi Đi Về là bài nhiều dãy nốt nhất** — 4 trên 10 chuỗi. Bài này ở nhịp 3 phách
      và là slow rock, khác 5 bài bolero còn lại.
- [ ] Dãy nốt **đi xuống nhiều hơn đi lên** — ở mức A: 5 xuống, 4 lên, 1 ngang.
- [ ] Dãy dài nhất là **10 nốt** (Đừng Xa, giang tấu ô 56), đi xuống suốt.
- [ ] Trường độ hay gặp là **móc kép 0,25**; chỉ 2 chuỗi dùng móc ba 0,12.

---

## 4. Chỗ tôi CHƯA ĐO, cần anh nói có cần đo không

- [ ] Dãy nốt ở **phần hát** (phiên khúc, điệp khúc). Phiếu này chỉ đo ba đoạn không lời,
      theo luật 3 thầy: ở phần hát thì tay phải là **giọng ca**, không phải câu đàn.
- [ ] Dãy nốt của **tay trái**. Chưa đo lần nào.
- [ ] Dãy nốt có rơi vào **hợp âm nào** thì hay hơn — cần biết định nghĩa trước mới đếm
      được.

---

## 5. Đề nghị cho app — chỉ đọc sau khi đã chốt mục 0

Tách riêng khỏi các mục trên, đúng luật *"một dòng tick = một khẳng định"*: những dòng dưới
đây là **việc làm**, không phải sự thật về bản ký âm.

- [ ] Bộ soạn hiện **không dựng dãy nốt nào** cho đoạn dạo Linh Nhi — nó ghép ô nguyên vẹn
      nên dãy nốt chỉ xuất hiện khi ô nguồn vốn có sẵn.
- [ ] Nếu mức A đúng thì **không cần làm gì thêm**: 3 chuỗi trên 7 đoạn dạo là quá hiếm để
      dựng thành một thủ pháp riêng, và ghép ô có thật đã tự mang chúng theo.
- [ ] Nếu anh muốn app **chủ động chèn** dãy nốt thì phải nói rõ tần suất mong muốn — bản
      ký âm không cho đủ cỡ mẫu để tự suy ra.
