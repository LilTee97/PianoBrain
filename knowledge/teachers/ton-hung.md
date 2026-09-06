# Tôn Hùng — thầy, đọc file này trước khi nói trong vai thầy ấy

`id: ton-hung` · tên đúng có dấu là **Tôn Hùng** (đã ghi ở `name` trong `ton-hung.json`)

> **Đọc kỹ chữ này.** Tôi đã viết nhầm thành *"Tôn Hưng"* suốt một phiên dài, vì cái slug
> `ton-hung` và thư mục `video/Ton_Hung/` đều **không dấu** nên không tự đính chính được.
> Tên đúng nằm ở trường `name` trong file `.json` cạnh đây — đọc chỗ đó, đừng suy từ slug.

File này **chính là thầy Tôn Hùng**, giống cách `linh-nhi-piano.md` là thầy Linh Nhi. Mỗi
lần nói trong vai thầy ấy thì **đọc đây trước**, đừng dựng lại bằng phép đo mới.

---

## NGUYÊN TẮC — câu solo là thứ được SOẠN

Áp cho mọi thầy, không riêng ai:

> *"Các câu solo giờ là phải soạn ra để chơi chứ không sinh ngẫu nhiên nữa, bộ sinh hãy
> sửa thành bộ soạn."*

Soạn theo **tư duy của chính thầy này**, rút từ bản ký âm của chính thầy này. Ba bước —
**học → mô phỏng → sáng tạo** — đi đúng thứ tự.

Luật soạn nốt dùng chung nằm ở `knowledge/LUAT-SOAN-NOT.md`. File này chỉ ghi cái riêng.

---

## 0. CỠ MẪU CHỈ CÓ HAI BÀI — đọc trước mọi con số bên dưới

Đây là thầy **mỏng nhất** trong ba người: **2 bản ký âm · 296 nốt giai điệu**, so với Linh
Nhi 7 bản/1045 nốt và Cà Pháo 4 bản/828 nốt.

Hệ quả, nói thẳng:

- Các tỉ lệ ở mục 2 **đứng được** — 296 nốt là đủ cho một tỉ lệ.
- **Không đủ để rút tuyến giai điệu** kiểu bảy tuyến của Linh Nhi. Hai bài thì mọi "nét
  chung" đều có thể chỉ là nét của một bài.
- Cả hai bài đều **ballad** và đều **giọng thứ**. Nên chưa biết gì về Tôn Hùng ở giọng
  trưởng hay ở điệu khác — đó là **chưa đo**, không phải "không có".

---

## 1. Kho bản ký âm — 2 bài

Ở `video/Ton_Hung/`, đã chia đoạn trong `tools/sheet/corpus.json`.

| bài | thể loại | giọng | ô | đoạn dạo | giang tấu | đoạn kết |
|---|---|---|---|---|---|---|
| Chiếc Lá Mùa Đông | ballad | Sol thứ | 130 | 1–9 | 58–67 | 118–128 |
| Tình Em Là Đại Dương | ballad | La thứ | 82 | 1–8 | 33–40 | 77–81 |

### Giọng của cả hai bài đã chốt bằng bằng chứng, không phải đoán

Không file MusicXML nào ghi `<mode>`, nên trưởng/thứ phải suy. Cách dùng được là **đọc kết
đoạn**:

**Chiếc Lá Mùa Đông = Sol thứ.** Mở bài `Eb → F → Gm` (bVI–bVII–i), kết bài `Cm → F → Gm`
(iv–bVII–i), `Gm×23` so `Bb×11`, và có `D7×8` là át hoà thanh của Sol thứ.

**Tình Em Là Đại Dương = La thứ tự nhiên.** **Mọi đoạn** đều kết về `Am`, và **không một
hợp âm `E` trưởng nào** trong cả bài — tức thuần Aeolian, không dùng nốt cảm.

> **Chordify báo Chiếc Lá là "Bb"** — đó là **giọng trưởng song song**, cùng bộ nốt, khác
> chủ âm. Không phải dịch giọng: Chordify liệt `Gm · Ebmaj7 · F · Bb`, đúng cùng cao độ với
> sheet. Máy dò tự động đếm nốt chứ không đọc chức năng nên hay ngả về nhãn trưởng ở mọi
> bài giọng thứ tự nhiên. Người dùng đã chốt giữ **Sol thứ**.
>
> Một phép thử của tôi cũng sập ở đây: đếm hợp âm át. `F×30` làm nó đọc ra Si giáng trưởng,
> trong khi `F` là **bậc VII giáng** của Sol thứ — rất hay dùng trong thứ tự nhiên. Phép
> đếm át **thiên vị chống lại giọng thứ tự nhiên**; đừng dùng nó ở đây.

### Hai bài KHÁC NHAU ở một chỗ cơ bản

| | Chiếc Lá Mùa Đông | Tình Em Là Đại Dương |
|---|---|---|
| át bậc V | `D7` ×8, giải về `Gm`/`Cm` | **không có `E` trưởng nào** |
| gam thứ | hoà thanh (có nốt cảm) | **tự nhiên** (Aeolian) |

Một bài dùng nốt cảm, một bài không. **Hai bài thì không kết luận được** đây là nét của
thầy hay là chọn lựa của từng bài. Ghi lại để phiên sau có bài thứ ba thì so.

---

## 2. Số của riêng Tôn Hùng

Đo trên **296 nốt giai điệu** ở các đoạn solo (dạo · giang · kết), chỉ lấy nốt cao nhất mỗi
mốc gõ ở khuông tay phải, bỏ đuôi nốt nối.

| | Tôn Hùng | Linh Nhi | Cà Pháo |
|---|---|---|---|
| số nốt trong cỡ mẫu | **296** | 1045 | 828 |
| **nốt hợp âm** | **73,0%** | 63,6% | 70,8% |
| **ngoài gam** | **1,0%** | 1,8% | 4,7% |
| lặp lại nốt | 3% | — | 5% |
| bước liền bậc | 32% | — | 31% |
| nhảy ≥ 3 nửa cung | 66% | — | 65% |

### Tôn Hùng là thầy CHẶT NHẤT trong ba người

**Cao nhất về nốt hợp âm (73,0%) và thấp nhất về nốt ngoài gam (1,0%).** Chỉ khoảng **ba
nốt trên ba trăm** đi ra ngoài gam.

Soạn theo anh ấy thì bám hợp âm sát, và **đừng rắc nốt màu ngoài gam** — đó là lối của Cà
Pháo (4,7%), không phải lối này.

> Đừng lấy con số gộp ba thầy (67,7%) mà soạn cho một thầy. Luật chung chỉ là **khoảng
> 60–75%**, và Tôn Hùng nằm ở **mép trên** của khoảng ấy.

### Bậc so với GỐC HỢP ÂM — anh chọn nốt nào khi hợp âm nào đang vang

Đo bằng `tools/sheet/bac_not.py`. **Cỡ mẫu chỉ 2 bài** — đọc mục 0 trước.

| chất hợp âm | n | các bậc anh dùng |
|---|---|---|
| trưởng | 100 | `5`27% `7`24% `3`15% `♭5`11% `13`9% `1`9% |
| thứ | 180 | `♭3`22% **`9`21%** `5`20% `1`13% `♭7`11% `11`7% |
| át | <20 | không đủ để nói |

**Nét riêng: bậc `9` chiếm 21% trên hợp âm thứ, gần bằng `♭3`.** Tiếng m9. Hai thầy kia chỉ
8–11%. Khi soạn theo anh thì cho bậc `9` đứng ngang hàng với các bậc trụ trên hợp âm thứ,
đừng coi nó là nốt màu thỉnh thoảng mới rắc.

> **Nhưng phải trừ hao.** Phép kiểm chéo bậc gam: **29 trên 38 nốt ấy là bậc 2 của gam
> bài**, tức phần lớn rơi trên hợp âm chủ `i`, chỗ mà bậc 9 của hợp âm **chính là** bậc 2
> của gam — không phải một lựa chọn màu độc lập. Phần thật sự là lựa chọn chỉ còn 9 nốt.
> So với Linh Nhi thì chị trải rộng hơn (22/62 ở bậc gam `9`, 26 ở bậc `5`).
>
> Nên phát biểu an toàn là: *anh ở lại quanh bậc 2 của gam bài nhiều hơn hai thầy kia*, chứ
> chưa đủ để nói *anh thích tiếng m9*.

**Anh không đánh nốt `♭9` một lần nào** — 0 nốt trên 292, sạch tuyệt đối, trên cả hợp âm
trưởng lẫn hợp âm thứ. Linh Nhi có 22 nốt, Cà Pháo 9. Đây là chỗ anh chặt hơn hai thầy kia
một lần nữa.

Trên hợp âm trưởng, bậc `7` chiếm 24% — anh chơi thẳng lên `maj7` chứ không dừng ở ba nốt.

> **`♭5` 11% KHÔNG PHẢI LYDIAN.** Đọc thoáng thì 11% bậc `♭5` (tức `#11`) trên hợp âm trưởng
> giống một lựa chọn mode. Soi ra 11 nốt ấy: **8 nốt là `A` trên `Ebmaj7`** trong Chiếc Lá
> Mùa Đông (Sol thứ) và **1 nốt `B` trên `Fmaj7`** trong Tình Em (La thứ). Cả hai chỗ hợp âm
> đều là **bậc `♭VI` của bài giọng thứ**, và nốt ấy đúng là **bậc 2 của gam bài** — nằm sẵn
> trong gam, không mượn mode nào.
>
> Tám nốt `A` kia còn là **một mô-típ lặp**: `Bb → A → D` mở đầu Chiếc Lá, lặp tám lần
> trong đoạn dạo. **n thật là 2 sự kiện, không phải 11 nốt.**
>
> Bẫy này cùng hình dạng với bẫy "đếm hợp âm át" ở mục 1: một hiện tượng sinh ra **tự động
> từ chức năng hoà thanh** bị đọc thành **lựa chọn phong cách**.

### "Giọng trưởng tươi sáng hơn" — KHÔNG ĐO ĐƯỢC ở anh

Người dùng nêu rằng ở bài giọng trưởng các thầy chọn nốt tươi sáng hơn. Đo được ở Linh Nhi
(bám hợp âm 70,2% so với 59,9%) và ở Cà Pháo (tầm âm cao hơn 3,7 nửa cung, tránh hợp âm át).

**Ở Tôn Hùng thì không đo được: cả hai bài đều giọng thứ.** Đây là **chưa đo**, không phải
"không có". Có bài giọng trưởng thứ ba thì đo lại bằng `tools/sheet/sang_toi.py`.

Cũng vì vậy mà KeyTrain **khoá nút chọn Tôn Hùng ở bài giọng trưởng** — không có ô nào để
ghép, và cũng không có số nào để soạn theo.

### Nốt ngoài hợp âm anh xử lý thế nào — chặt nhất trong ba thầy

n=92 nốt ngoài hợp âm ở các đoạn solo:

| liền bậc | quãng ba | nhảy ≥5 | đổi quãng tám | lặp | nốt kế là nốt hợp âm |
|---|---|---|---|---|---|
| 39,1% | 8,7% | 46,7% | 2,2% | 3,3% | **76,1%** |

**Anh giải nốt ngoài hợp âm về nốt hợp âm 76%, trong khi Linh Nhi 55% và Cà Pháo 58%.** Đây
là nét riêng rõ nhất đo được về anh trong bộ này, và nó cùng chiều với mọi con số khác: anh
là thầy chặt nhất.

Nhưng **n=92 trên 2 bài**, và phép đo có chỗ lỏng: khi hợp âm đổi ngay sau nốt ấy thì nốt kế
thuộc hợp âm **mới** mà phép đo vẫn xét bằng hợp âm **cũ** — nên 76% là **chặn dưới**.

Cả ba nốt ngoài gam của anh đều là bậc `♭9` so với chủ âm, và 2/3 có bước liền bậc cả hai
bên. n=3 — không nói được gì, ghi để đủ.

---

## 3. Vốn hợp âm

Chất hợp âm ở các đoạn solo:

| bài | chất hay dùng |
|---|---|
| Chiếc Lá Mùa Đông | `minor`×6 · **`major-sixth`×4** · `minor-seventh`×4 · `major-seventh`×3 |
| Tình Em Là Đại Dương | `major-seventh`×5 · `minor-seventh`×5 · `minor`×3 · `major`×3 |

Hợp âm hay gặp: Chiếc Lá dùng `F6 · Gm · Gm7 · Ebmaj7 · Cm/G`; Tình Em dùng `Fmaj7 · Am ·
Dm7 · Em7 · G · Cmaj7 · G13`.

**Chất `major-sixth` (`F6`) là thứ hai thầy kia không dùng** ở đoạn solo — Linh Nhi và Cà
Pháo đều không có. Nhưng nó chỉ xuất hiện ở **một bài**, nên chưa gọi được là nét của thầy.

Vốn hợp âm **trơn hơn Cà Pháo rõ rệt**: không có `m11`, `11`, `m7b5` — những chất dày đặc
trong hai bài bossa nova của Cà Pháo.

---

## 4. Hai tay

Nốt tay phải mỗi ô · số lần tay trái vào mỗi ô · tâm cao độ tay phải:

| bài | đoạn dạo | giang tấu | đoạn kết |
|---|---|---|---|
| Chiếc Lá Mùa Đông | 4,8 · trái 3,8 · tâm D5 | 4,2 · trái 5,5 · tâm B4 | 5,4 · trái 3,7 · tâm Bb4 |
| Tình Em Là Đại Dương | 7,0 · trái 8,0 · tâm D5 | 7,6 · trái 8,6 · tâm E5 | 7,0 · trái 4,4 · tâm B4 |

### Hai bài dày mỏng khác nhau gần gấp đôi

Chiếc Lá chơi **4,2–5,4 nốt tay phải mỗi ô**; Tình Em chơi **7,0–7,6**. Tay trái cũng vậy:
3,7–5,5 so với 4,4–8,6.

**Hai bài thì không rút ra được "mật độ của Tôn Hùng".** Đây là chỗ cỡ mẫu mỏng cắn.

### TẦM ÂM: giống Linh Nhi, khác hẳn Cà Pháo

**Tâm tay phải ở đoạn solo, gộp 2 bài: midi 74 — nốt Rê quãng 5.** Thấp nhất 55, cao nhất
96.

So với neo Linh Nhi trong KeyTrain là **73,6** — gần như trùng. Còn Cà Pháo là **67**, thấp
hơn một quãng năm. Nên nếu KeyTrain phải chọn một neo chung, Tôn Hùng đứng cùng phía với
Linh Nhi.

#### Neo cho ĐOẠN DẠO là 75,8

Con số 74 ở trên gộp cả ba đoạn solo. Riêng **đoạn dạo** thì cao hơn: **75,8** — Chiếc Lá
74,4 · Tình Em 76,9, n=97. KeyTrain nay dùng số này làm neo riêng cho anh.

**Không có cột giọng trưởng.** Cả hai bài đều giọng thứ, nên KeyTrain lấy tạm số của giọng
thứ cho cả hai ô, và **nút chọn Tôn Hùng bị khoá ở bài giọng trưởng** — không có ô nào để
ghép. Xem mục 0 về cỡ mẫu hai bài.

### Đoạn kết buông xuống

**2/2 bài** có tâm cao độ đoạn kết **thấp hơn** đoạn dạo (`Bb4 < D5` · `B4 < D5`), và
**2/2 bài** có tay trái ở đoạn kết thưa hơn giang tấu (`3,7 < 5,5` · `4,4 < 8,6`). Cùng
hướng với Cà Pháo, nhưng cỡ mẫu hai bài thì chỉ đủ để nói *"chưa thấy bài nào ngược"*.

---

## 5. Tuyến giai điệu — chép nguyên từng nốt

Đây là **vật liệu để ghép**, không phải thống kê để dựng lại. Mỗi dòng là một ô nhịp: số
ô, ký hiệu hợp âm trong ô, rồi từng mốc gõ ghi `phách:nốt`. Chỉ lấy nốt cao nhất mỗi mốc ở
khuông tay phải; đã bỏ nốt láy và đuôi nốt nối.

**Sáu đoạn, hai bài** — ít hơn hẳn bảy tuyến của Linh Nhi. Đủ để ghép, chưa đủ để rút luật
về hình dáng câu.

```
### Chiec La Mua Dong — intro (ô 1-9)
  ô1    Ebmaj7/G         0:Bb5 0.5:A5 1:D5 1.5:Bb5 2.5:A5 3:D5 3.5:Bb5
  ô2    ·                1:A5 1.5:D5 2:Bb5 3:A5 3.25:D5
  ô3    ·                0:Bb5 0.5:A5 1:D5 1.5:Bb5 2.5:A5 3:D5 3.5:D6
  ô4    F6               1.5:D6 2:C6 2.5:A5 3:F5
  ô5    Gm7              0:Bb4 0.5:A4 1.5:Bb4 2.5:A4 3.5:Bb4
  ô6    ·                0.5:A4 1.5:Bb4 2.5:A4 3:D4
  ô7    Ebmaj7           0:Bb4 0.5:A4 1:D4 1.5:Bb4 2.5:A4 3:D4 3.5:D5
  ô8    F6               1.5:C4 2:C5 2.5:F4
  ô9    ·                3:D5

### Chiec La Mua Dong — interlude (ô 58-67)
  ô58   ·                0:G5 1:D4 2:G4 2.5:D4 3:D6
  ô59   D Cm/G           0:A5 2:F#4 3:A4 3.5:F#4
  ô60   ·                0:C6 0.5:D6 1:Eb6 2:C5 2.5:G4 3:Eb5 3.5:G6
  ô61   Gm               0:D6
  ô62   Fm7              0:Ab4 0.5:F5 1:G5 3:Ab5 3.5:G5 4:F5
  ô63   Cm               0:G4 1.5:Eb5 3.5:D5 3.75:Eb5
  ô64   Gm               0:D5 1.5:Bb4 3:D4 3.75:A4
  ô65   D7               0:A4 2:Bb4 2.5:D4 3:F#4 3.5:A4
  ô66   ·                0:C5 3:D5
  ô67   Gm               0:G4 1.5:Bb3 2:A4 3:Bb4

### Chiec La Mua Dong — outro (ô 118-128)
  ô118  Gm               0:Bb5 0.25:A5 0.5:D5 0.75:Bb5 2:A5 2.5:D5 3:Bb5
  ô119  ·                0.5:A5 1:D5 1.5:Bb5 2.5:A5 3:D5
  ô120  Ebmaj7           0:Bb5 0.5:A5 1:D5 1.5:Bb5 2.5:A5 3:D5 3.5:D6
  ô121  F6               0:A3 1.5:D6 2:C6 2.5:A5 3:F5
  ô122  Gm7              0:Bb4 0.5:A4 1.5:Bb4 2.5:A4 3.5:Bb4
  ô123  ·                0.5:A4 1.75:Bb4 2.75:A4 3.25:D4
  ô124  Cm9              0.5:Bb4 1:A4 1.5:D4 2:Bb4 3:A4 3.5:D4
  ô125  F6               0:D5 1.75:A3 2.25:C5 2.75:F4 3.25:D4
  ô126  ·                3.5:F4 3.75:C4 4:D4
  ô127  Gm7              0:A3 3:Bb3 3.5:Bb3
  ô128  ·                0:C4 0.25:D4 0.5:F4 1:G4 1.5:A4 1.75:Bb4 2.25:C5 2.75:D5 3.25:F5

### Tinh Em La Dai Duong — intro (ô 1-8)
  ô1    Am               0:B5 0.5:C6 0.75:B5 1:G4 1.25:A5 1.75:B5 2:G4 3.75:A5
  ô2    Fmaj7            0:E6 0.5:G6 0.75:E6 1.25:D6 1.75:E6
  ô3    G                0:D5 0.5:D6 0.75:D5 1.5:D6 2:B4 2.5:G6 2.75:G6 3.25:A6 3.75:G5
  ô4    C                0:B5 1:E6 1.25:G6 1.75:A6 2:E6 3:G4 4:B4
  ô5    Dm7              0:A4 0.5:E5 0.75:D5 1.25:G5 1.75:F4 2.5:A4 2.75:A4
  ô6    Em7              0:D4 0.5:B4 0.75:A4 1.25:B4 1.75:D5 2.5:B4 3.25:E4 3.5:G4 3.75:B4
  ô7    Fmaj7 G          0:A4 0.75:E5 1.75:A4 2:G4 2.5:B4 2.75:C5 3.25:D5 4:B4
  ô8    Am               0:E4 3:A4 3.75:E4

### Tinh Em La Dai Duong — interlude (ô 33-40)
  ô33   ·                0:E5 0.5:B5 0.75:C6 1.25:G5 1.5:E4 1.75:E5 3.25:D5 3.5:B4 3.75:C5
  ô34   Fmaj7            0:B4 0.25:C5 0.5:A4 0.75:E5 1:A4 1.5:D5 1.75:G5 2:E4 2.25:E5 2.75:A5
  ô35   G13 Dm7          0:F5 0.5:E6 0.75:E6 1.25:C6 1.75:Bb5 2:B5 2.5:A5 2.75:B5 3.25:D6
  ô36   Cmaj7            0:G4 0.5:B5 0.75:E5 2:B4 3.5:G4
  ô37   Dm7              0:F5 0.5:E6 0.75:D6 1.25:F6 1.75:A5 2:G4 3:G4 3.25:E5 3.5:F5 3.75:C6
  ô38   Em7              0:D5 0.5:B5 0.75:A5 1.25:B5 1.75:B4 2:G5 3.5:E5 3.75:D5
  ô39   Fmaj7            0:E5 0.5:C5 0.75:A4 1.5:E4 2:E5 2.5:D5 2.75:G4
  ô40   Am               0:G4 0.75:B4 3.75:A4

### Tinh Em La Dai Duong — outro (ô 77-81)
  ô77   ·                0:D5 2:B5
  ô78   ·                1.5:A4 1.75:C5 2:E5 2.5:A5 2.75:G4 3.25:A4 3.5:F4
  ô79   ·                0:G4 0.75:G5 1.25:B4 2:F4 2.25:A4 3:C5 3.25:F4 3.75:C4 4:C5
  ô80   ·                0.25:D4 0.5:G4 1.5:B4 1.75:G3 3.25:G4 4:A4
  ô81   ·                0.75:B3 1:C4 1.25:E4 1.5:B4 1.75:E5 2:B5 2.25:C6 2.5:E6 3:A6 3.25:B6 3.5:C7```

---

## 6. Chưa đo — đừng suy bừa vào chỗ này

- **Giọng trưởng.** Cả hai bài đều giọng thứ. Không biết gì về Tôn Hùng ở giọng trưởng.
- **Điệu khác ballad.** Cả hai bài đều ballad.
- **Mật độ đặc trưng.** Hai bài chênh nhau gần gấp đôi (4,2–5,4 so với 7,0–7,6 nốt tay phải
  mỗi ô). Chưa rút được con số của thầy.
- **Dùng nốt cảm hay không.** Chiếc Lá có `D7×8`, Tình Em không có `E` trưởng nào. Một bài
  mỗi bên, không kết luận được.
- **Sheet có cùng cao độ với bản thu không.** **Chưa tra.** Với Cà Pháo đã bắt được một bài
  lệch 4 nửa cung, nên đây là chỗ thật sự có thể sai. Cách tra: mở Chordify, **bỏ qua ô
  KEY**, chỉ so dãy tên hợp âm với sheet — trùng tên là yên tâm, lệch đều cùng một số nửa
  cung là sheet và bản thu khác cao độ.
- **Hợp âm lướt.** Quét cả kho ra 3 ca thật, **Tôn Hùng không có ca nào**. Nhưng với 2 bài
  thì đó chưa phải bằng chứng anh ấy không dùng.
- **Vị trí câu chèn trong phần hát.** Chưa đo.

---

## 7. Muốn dày hơn thì cần gì

Thứ đáng làm nhất là **thêm bản ký âm**, không phải đo sâu hơn hai bản đang có. Cụ thể,
thiếu nhất là:

1. một bài **giọng trưởng** — để biết anh ấy làm gì khi không có gam thứ
2. một bài **điệu khác ballad**
3. một bài thứ ba bất kỳ — để mọi "2/2 bài" trong file này thành "n/3" và bắt đầu có nghĩa

Cho tới lúc ấy: mọi câu trong file này đều kèm cỡ mẫu, và chỗ nào không có số thì đó là
**chưa đo**, không phải đã biết.
