# Linh Nhi Piano — những gì đã học được

Bản tổng kết đi kèm `linh-nhi-piano.json`. File JSON là hồ sơ định danh; file này là
**những gì đo được từ bản ký âm**, viết ra để phiên sau không phải dựng lại.

Mỗi mục ghi rõ **cỡ mẫu**. Chỗ nào là số đo, chỗ nào là suy đoán của Claude, chỗ nào là
ý người dùng — đều ghi nhãn. Không có nhãn nghĩa là **số đo**.

> **File JSON đang lạc hậu:** `ingested_sources: 1` và `note_vi` còn viết "Linh Nhi
> Piano, bản độc tấu *Đừng Xa Em Đêm Nay*", "chưa ai ở đây xem video". Nay kho đã có
> **bảy bản ký âm thật** và mọi con số dưới đây đo trực tiếp trên nốt, không qua Gemini.
> Cần cập nhật JSON, chưa làm.

---

## 1. Kho bản ký âm — 7 bài

Ở `video/Linh_Nhi/`, đã chia đoạn đủ trong `tools/sheet/corpus.json`.

| bài | điệu | giọng | nhịp | ô đoạn dạo |
|---|---|---|---|---|
| Biển Tình | bolero | Rê trưởng | 4 | 9 |
| Đừng Xa Em Đêm Nay | bolero | Rê thứ | 4 | 9 |
| Đường Xưa Lối Cũ | bolero | Đô trưởng | 4 | 8 |
| Mùa Xuân Đầu Tiên | bolero | Sol trưởng | 4 | 8 |
| Rừng Lá Thấp | bolero | La thứ | 4 | 9 |
| Lá Thư Trần Thế | slow rock | Rê thứ | 4 | 6 |
| Một Cõi Đi Về | slow rock | Sol thứ | **3** | 10 |

**5 bolero · 2 slow rock** — và **3 trưởng · 4 thứ**. Một Cõi là bản 3 phách duy nhất.

Tổng cộng **20 đoạn không lời** (dạo · giang · kết), trong đó 14 của bolero và 6 của
slow rock.

---

## 2. Cách chọn hợp âm cho đoạn không lời

### Rút từ vốn hợp âm của chính bài

**16 trên 20 đoạn không lời không dùng một bậc nào ngoài đoạn hát.** Chị ấy không soạn
hoà âm mới cho câu solo — chị ấy **chọn lại từ vốn của bài**.

Bốn ngoại lệ chỉ gồm hai hợp âm, và cả bốn đều rơi vào đoạn không lời:

| bài | đoạn | bậc mượn thêm |
|---|---|---|
| Đường Xưa | kết | iv thứ |
| Rừng Lá | dạo | iv thứ |
| Rừng Lá | kết | iv thứ |
| Một Cõi | giang | I trưởng (Picardy) |

Ba trên bốn là **bậc iv thứ mượn**, cái còn lại là **I trưởng Picardy**.

### KHÔNG rút hợp âm về chất trơn

Đếm chất hợp âm trên bảy bản ký âm, tách theo đoạn:

| | hợp âm trơn | có màu |
|---|---|---|
| đoạn không lời | 105 (**78%**) | 30 |
| đoạn có lời | 417 (**77%**) | 125 |

Tỉ lệ **y hệt nhau**. Đây là số đo đã lật một luật cũ — xem mục 14.

### Chất duy nhất chị ấy tránh ở đoạn solo: `maj7`

`maj7` gặp **20 lần ở đoạn hát** và **0 lần trong 30 hợp âm màu của đoạn solo**. Nếu tỉ
lệ hai bên bằng nhau thì xác suất ra 0 là dưới 1%.

Ngược lại, luật cũ từng **chặn** `dim`, `6`, `m6`, `9` — mà đoạn solo của chị có `dim` 5
lần, `m6` 2 lần, `dominant-9th` 1 lần.

### Nhịp hoà âm chia ba tầng

| đoạn | hợp âm mỗi ô |
|---|---|
| dạo | 0,88–1,33 — phần lớn ≈ **1,0** |
| giang | 0,70–1,00 |
| kết | **0,00–0,92**, năm trên bảy bài dưới **0,6** |

Đoạn kết từng bài: Lá Thư **0,00** (không một ký hiệu nào, giữ nguyên suốt), Một Cõi
0,27, Đường Xưa 0,33, Mùa Xuân 0,45, Đừng Xa 0,57.

Vào đoạn kết chị ấy **hãm hoà âm lại còn khoảng một nửa**, và nó đi cùng chỗ tay trái
mỏng đi (2,1–6,7 mốc/ô so với 5,9–7,7 ở đoạn dạo). Hai tay và hoà âm cùng thưa ra một
lượt.

### Hai luật vị trí

- **Ô cuối đoạn dạo và đoạn giang là bậc V** — cửa vào hát. Đo ở Biển Tình (giang kết
  A), Mùa Xuân (dạo và giang đều kết D), Đừng Xa (dạo kết A). **n=3.** Đoạn **kết**
  không áp luật này: ba bài đậu chủ âm, ba bài không.
- **Mở trên hợp âm chủ nếu bài có** — 4/7 đoạn dạo mở trên i/I, một trên vi.

---

## 3. Phần hát — hai tay làm gì

Đo cả bảy sheet, tách phiên khúc và điệp khúc, tách trưởng và thứ. Cỡ mẫu ở cột `ô`.

| | ô | tay trái | tay phải | mốc có **cả hai tay** |
|---|---|---|---|---|
| **thứ** · phiên khúc | 196 | 6,6 mốc/ô · 1,29 nốt/mốc | 4,9 · 1,41 | 46% |
| **thứ** · điệp khúc | 106 | 6,4 · **1,50** | 5,3 · 1,48 | 46% |
| **trưởng** · phiên khúc | 156 | 7,7 · 1,16 | 6,0 · 1,27 | 49% |
| **trưởng** · điệp khúc | 61 | 7,8 · **1,63** | 6,2 · 1,39 | 58% |

### Điệp khúc dày lên bằng NẮM DÀY HƠN, không bằng gõ nhiều hơn

Số mốc gõ gần như không đổi (thứ 6,6 → 6,4; trưởng 7,7 → 7,8) nhưng **số nốt mỗi mốc
tăng vọt**: thứ 1,29 → **1,50**, trưởng 1,16 → **1,63**. Đúng chiều ở cả hai giọng, n=7.

Đây là chỗ dễ làm sai nhất khi mô phỏng: thêm mốc gõ cho điệp khúc thì ra tiếng dồn dập
chứ không ra tiếng dày. Phải **thêm nốt vào cùng một mốc**.

*Số đo cũ trong code chỉ có một bài một đoạn* — Đường Xưa ô 41–58, 76% mốc gõ có từ hai
nốt tay trái trở lên. Bảng trên thay nó, n=7 bài.

### Bài giọng trưởng gõ dày hơn bài giọng thứ

Tay trái phần hát: trưởng **7,7** mốc/ô, thứ **6,5**. Đúng chiều cả ở phần solo (5,8 so
với 4,6). *Suy đoán của Claude:* có thể do ba bài trưởng đều là bolero còn nhóm thứ có
hai bài slow rock nhịp thưa hơn — **chưa tách được**, tách ra thì mỗi ô còn 2–3 bài.

---

## 4. Vào đoạn solo, HAI TAY ĐẢO VAI

Đây là số đo rõ nhất trong cả bộ.

| | tay trái | tay phải | |
|---|---|---|---|
| **thứ** · phần hát | **6,5** mốc/ô | 5,0 | tay trái dẫn |
| **thứ** · phần solo | 4,6 | **6,5** | **tay phải dẫn** |
| **trưởng** · phần hát | **7,7** | 6,1 | tay trái dẫn, cách 1,6 |
| **trưởng** · phần solo | **5,8** | 5,3 | vẫn tay trái, cách còn 0,5 |

Ở **giọng thứ** thứ tự đảo hẳn: tay trái tụt 6,5 → 4,6, tay phải lên 5,0 → 6,5. Ở **giọng
trưởng** không đảo, nhưng khoảng cách hai tay **thu hẹp ba lần**, từ 1,6 xuống 0,5.

Tỉ lệ mốc có **cả hai tay cùng gõ** cũng lên ở đoạn solo giọng thứ: 46% → **56%**. Giọng
trưởng đứng yên ở 51%.

Từng đoạn solo, tay trái:

| | dạo | giang | kết |
|---|---|---|---|
| thứ | 4,6 mốc/ô | 4,2 | 4,9 |
| trưởng | 6,8 | 6,9 | **3,2** |

Đoạn kết giọng trưởng mỏng nhất — **3,2 mốc/ô**, chưa bằng một nửa đoạn dạo. Ăn khớp với
chỗ hoà âm cũng hãm lại còn một nửa ở đoạn kết.

---

## 5. Tuyến giai điệu của ba đoạn solo

Nốt neo của một ô là nốt xuất hiện nhiều nhất trong ô ấy ở khuông tay phải, ghi theo bậc
so với chủ âm bài.

| bài | đoạn | tuyến nốt neo |
|---|---|---|
| Đừng Xa *(thứ)* | dạo | `♭3 9 1 ♭7 ♭13 ♭3 9 1 7` |
| Đừng Xa | giang | `5 ♭3 9 1 ♭7 ♭13 ♭3 9 1 9` |
| Đừng Xa | kết | `1 ♭13 9 7 1 5 5` |
| Biển Tình *(trưởng)* | dạo | `1 13 5 9 3 3 9 5 1` |
| Biển Tình | giang | `5 13 5 9 3 3 9 5 1 5` |
| Biển Tình | kết | `13 5 9 1 1` |
| Mùa Xuân *(trưởng)* | dạo | `3 13 5 9 5 7 1 5` |
| Mùa Xuân | giang | `5 3 13 5 9 5 7 1 5` |
| Mùa Xuân | kết | `5 13 13 9 5 1 1 5 1 3 3` |
| Đường Xưa *(trưởng)* | dạo | `5 7 3 5 9 11 9 1` |
| Đường Xưa | giang | `3 3 7 1 5 11 9 1` |
| Đường Xưa | kết | `3 1 11 1 9 5` |
| Lá Thư *(thứ)* | dạo | `5 9 5 11 ♭3 5` |
| Lá Thư | giang | `1 9 5 11 9 5` |
| Một Cõi *(thứ)* | dạo | `♭3 1 ♭13 7 ♭3 1 1 11 5 5` |
| Một Cõi | giang | `♭3 1 ♭3 7 5 1 1 1 7 5` |
| Rừng Lá *(thứ)* | dạo | `5 11 1 5 1 ♭7 ♭7 1 1` |
| Rừng Lá | kết | `5 5 11 1 5 1 1 ♭7 1 1 ♭3 5` |

### GIANG TẤU DÙNG LẠI TUYẾN CỦA ĐOẠN DẠO — 78%

Đo bằng dãy con chung dài nhất giữa hai tuyến nốt neo:

| bài | dạo | giang | trùng | tỉ lệ |
|---|---|---|---|---|
| Mùa Xuân | 8 ô | 9 ô | 8 | **100%** |
| Biển Tình | 9 | 10 | 8 | **89%** |
| Đừng Xa | 9 | 10 | 8 | **89%** |
| Lá Thư | 6 | 6 | 4 | 67% |
| Đường Xưa | 8 | 8 | 5 | 62% |
| Một Cõi | 10 | 10 | 6 | 60% |
| | | | | **trung bình 78%** (n=6) |

Ba bài trên 89% là **cùng một câu**, chỉ thêm một ô mở ở đầu giang tấu. Nhìn Đừng Xa thì
thấy ngay: dạo `♭3 9 1 ♭7 ♭13 ♭3 9 1`, giang là `5` rồi đúng dãy ấy.

> **ĐỪNG LẪN VỚI CHUYỆN ĐÃ BỊ BÁC.** Người dùng từng bác kết luận *"giang dùng lại vòng
> dạo"* — nhưng đó nói về **vòng HỢP ÂM**, và nó sai vì đo bằng cách so danh sách ký
> hiệu, bỏ mất những ô không có ký hiệu. Kết luận ấy vẫn sai và vẫn bị bác.
>
> Chỗ này là **tuyến GIAI ĐIỆU** — phép đo khác hẳn: mọi ô đều có nốt neo nên không ô nào
> bị bỏ. Hai chuyện không liên quan nhau.

### Đoạn kết là câu KHÁC

Trùng với đoạn dạo chỉ **17–62%, trung bình ~43%** (Mùa Xuân 62% · Một Cõi 50% · Biển
Tình 44% · Đừng Xa 44% · Đường Xưa 38% · Lá Thư 17%).

Dáng câu cũng khác:

| | lặp nốt | liền bậc | *lặp+liền* | nhảy ≥5 |
|---|---|---|---|---|
| thứ · dạo | 17% | 35% | *51%* | 24% |
| thứ · giang | 15% | 38% | *53%* | 26% |
| thứ · **kết** | 14% | 31% | *45%* | **34%** |
| trưởng · dạo | 5% | 43% | *48%* | 24% |
| trưởng · giang | 6% | 42% | *48%* | 27% |
| trưởng · **kết** | 8% | 27% | ***34%*** | **32%** |

**Vào đoạn kết câu nhảy nhiều hơn, đi liền bậc ít hơn** — đúng chiều ở cả hai giọng, rõ
nhất ở giọng trưởng (48% xuống 34%).

*Suy đoán của Claude:* đoạn kết là chỗ duy nhất không phải nối vào đoạn hát nào, nên
không cần giữ hơi liền mạch.

### Hướng đi: dạo và giang đi xuống, kết thì không

Đếm đoạn có hướng đi xuống chiếm ưu thế: dạo **5/7**, giang **4/6**, kết **1/6**. Tuyến
đi xuống là đặc điểm của đoạn dạo và giang tấu, **không** phải của đoạn kết.

---

## 6. Trưởng và thứ chọn nốt khác nhau

| | sáu bậc hay dùng nhất |
|---|---|
| **thứ** · dạo | `5` 20% · `1` 20% · `♭3` 14% · `9` 12% · `11` 10% · `♭7` 9% |
| **thứ** · giang | `♭3` 19% · `1` 19% · `5` 17% · `9` 17% · `11` 9% · `♭13` 8% |
| **thứ** · kết | `1` 26% · `5` 25% · `♭3` 15% · `11` 11% · `9` 9% · `♭7` 7% |
| **trưởng** · dạo | `1` 20% · `3` 19% · `5` 16% · `13` 16% · `9` 15% · `7` 5% |
| **trưởng** · giang | `1` 21% · `3` 19% · `5` 19% · `13` 15% · `9` 12% · `7` 6% |
| **trưởng** · kết | `1` 25% · `5` 22% · `3` 21% · `13` 12% · `9` 12% · `11` 3% |

Ba chỗ khác nhau, đều nhất quán qua cả ba đoạn:

1. **Giọng trưởng dùng bậc `13` (quãng sáu) rất nhiều — 12–16%, hạng tư.** Giọng thứ
   không có `13` trong sáu bậc đầu; nó có `♭13` nhưng chỉ 8% và chỉ ở giang tấu.
2. **Giọng thứ dùng `♭3` và `♭7`; giọng trưởng gần như bỏ `♭3`.** Bậc `♭3` đứng hạng ba ở
   cả ba đoạn giọng thứ (14–19%).
3. **Giọng trưởng dùng `11` rất ít** — 3% ở đoạn kết, không lọt top sáu ở dạo và giang.
   Giọng thứ dùng `11` đều đặn 9–11%.

**Giọng thứ lặp lại nốt cũ nhiều gấp ba giọng trưởng**: 14–17% so với 5–8%, đúng chiều ở
cả ba đoạn. Đây là chỗ làm nên tiếng ngân nga của câu thứ — nốt đứng yên rồi mới bước.

**Cả hai giọng đều co về chủ âm ở đoạn kết.** `1` + `5` gộp: đoạn dạo thứ 40% / trưởng
36%; **đoạn kết thứ 51% / trưởng 47%**.

---

## 7. Tư duy chọn nốt, viết gọn thành luật

Dùng được cho cả trưởng và thứ:

1. **Neo vào giọng bài, không neo vào hợp âm đang vang.** Ô 5 Đừng Xa hợp âm `Gm` mà chị
   đánh `Bb A` — bậc ♭6 và 5 của Rê thứ.
2. **Câu gần như không nhảy.** 78% đứng yên hoặc bước liền bậc trên đoạn dạo Đừng Xa (47
   nốt); gộp bảy bài thì 48–53% ở dạo và giang.
3. **Dạo và giang đi xuống; kết thì không.**
4. **Giang tấu lấy lại câu dạo** — 78% tuyến nốt neo, thường thêm một ô mở ở đầu.
5. **Đoạn kết là câu khác**: nhảy nhiều hơn, liền bậc ít hơn, co về `1` và `5`.
6. **Giọng thứ** dùng `♭3` `♭7` `11` và lặp nốt gấp ba; **giọng trưởng** dùng `13` và `3`,
   gần như bỏ `♭3` và `11`.
7. **Nốt cảm trên hợp âm bậc V** — bậc 7 thăng, không phải `♭7`. n=2.
8. **Giai điệu là nốt trên cùng mỗi mốc gõ**; phần dưới là nắm hợp âm tay phải.

---

## 8. Ô chia đôi hợp âm

Đếm ô có từ **hai hợp âm khác nhau**:

| bài | đoạn hát | đoạn dạo | tỉ số |
|---|---|---|---|
| Biển Tình | 19% | 11% | 0,58 |
| Đừng Xa | 25% | 11% | 0,44 |
| Lá Thư | 40% | 33% | **0,83** |
| Một Cõi | 1% | 0% | — |
| Đường Xưa | 13% | 0% | — |
| Mùa Xuân | 20% | 12% | 0,60 |
| Rừng Lá | 39% | 11% | **0,28** |
| **gộp** | **22%** (112/519) | **10%** (6/59) | |

**7/7 bài đều có đoạn dạo chia thưa hơn hoặc bằng đoạn hát** — không bài nào ngược lại.
Đây là luật chắc nhất trong mục này.

Hai bài mà đoạn hát chia **dưới 15%** (Một Cõi 1%, Đường Xưa 13%) có đoạn dạo **không
chia ô nào**.

Năm bài còn lại: tỉ số 0,28–0,83, **trung vị 0,58**. Hai đầu cách nhau ba lần — Lá Thư
kéo lên, Rừng Lá kéo xuống. **n=5, tản rộng**; lấy con số nào ở giữa cũng chỉ là ước
lượng.

Sáu ô chia đo được:

| bài | ô | chia ở phách | hai hợp âm | bậc |
|---|---|---|---|---|
| Biển Tình | 8/9 | 2,0 | F#m → E | iii → II (V/V) |
| Đừng Xa | 7/9 | 2,0 | E → A | II → **V** |
| Lá Thư | 2/6 | 3,0 | C → Dm | ♭VII → i |
| Lá Thư | 5/6 | 3,0 | Bb → E | ♭VI → II (V/V) |
| Mùa Xuân | 4/8 | 2,0 | D → Am | V → ii |
| Rừng Lá | 3/9 | 1,0 | G → Dm | ♭VII → iv |

- **Chất hợp âm thứ hai:** át hoặc át phụ **3/6**, hạ át 2/6, chủ 1/6. n=6 — chỉ đủ nói
  át là chất hay gặp nhất, **không đủ thành luật**.
- **Phách chia:** đúng giữa ô 3/6, phách 3 là 2/6, phách 1 là 1/6.
- **Vị trí trong đoạn:** 0,89 · 0,83 · 0,78 · 0,50 · 0,33 · 0,33 — 3/6 rơi vào một phần
  ba cuối. n=6, **chưa thành luật**.

---

## 9. Giai điệu đoạn dạo — soi kỹ Đừng Xa

### Chị ấy neo vào GIỌNG BÀI, không neo vào hợp âm đang vang

Đây là điều quan trọng nhất ở mục này, và là chỗ đã hiểu ngược ba lần.

- Đừng Xa ô 5, hợp âm **Gm**: chị đánh `Bb Bb Bb Bb A Bb A` — bậc **♭6 và 5 của Rê
  thứ**, không phải bậc của Gm.
- Đừng Xa ô 3, hợp âm **Bb**: chị đánh `D D D D E F` — bậc **1, 2, ♭3 của Rê thứ**.

Nốt neo tám ô đoạn dạo Đừng Xa, đo so với chủ âm D5:

| ô | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| lệch chủ âm | +3 | +2 | 0 | −2 | −4 | +3 | +2 | 0 |
| bậc | ♭3 | 2 | 1 | ♭7 | ♭6 | ♭3 | 2 | 1 |

Một đường đi xuống **♭3 → 2 → 1 → ♭7 → ♭6**, rồi nhảy về ♭3 đi xuống lần nữa.

### Câu gần như không nhảy

47 nốt trên đường giai điệu tám ô Đừng Xa, đã tách 6 "nốt đáp trầm":

| bước từ nốt trước | số nốt | tỉ lệ |
|---|---|---|
| lặp lại đúng nốt cũ | 11 | **24%** |
| liền bậc (1–2 nửa cung) | 25 | **54%** |
| 3–4 nửa cung | 2 | 4% |
| nhảy ≥ 5 | 8 | 17% |

**78% là đứng yên hoặc bước liền bậc.** Tám lần nhảy phần lớn là chỗ đổi quãng tám.

### Giai điệu là nốt trên cùng mỗi mốc gõ

Ô 1 Đừng Xa gõ `A4+D5+E5+F5` rồi `D4+E5+F5` — đó là **nắm hợp âm tay phải**, không phải
giai điệu. Lấy hết mọi nốt thì một ô phình lên **20 nốt** trong khi bản ký âm chỉ có 8
mốc gõ. Lấy nốt cao nhất mỗi mốc ra **40–70 nốt mỗi câu, 5–9 nốt một ô** — đúng mật độ.

### Nốt cảm trên hợp âm bậc V

Đừng Xa ô 7 (hợp âm A7, đánh **C#**) và Một Cõi ô 8 (D7, đánh **C#**) — bậc 7 **thăng**,
không phải ♭7 của gam thứ tự nhiên. **n=2.**

### Dáng ô: giữ và đi xen kẽ

Ô 1·3·5 **giữ** nốt neo bốn lần rồi mới bước ra ở cuối ô. Ô 2·4·6·7 **đi** xuống liền
bậc rồi vòng lên. Ô cuối thưa hẳn ra — cửa cho ca sĩ vào hát.

### Bảy tuyến đã chép nguyên

Mỗi đoạn dạo của bảy bài đã được chép thành một "tuyến": từng ô ghi mốc thời gian, cao
độ so với chủ âm, độ ngân, và bậc hợp âm ô ấy đứng trên. Đây là vật liệu để ghép lên bài
mới. *(Bảng nằm trong KeyTrain; ở đây chỉ ghi rằng nó tồn tại và được sinh bằng script
từ chính các sheet trong `video/Linh_Nhi/`.)*

---

## 10. Hai tay ở điệu bolero

Bốn hằng số dưới đây **đo trên năm bài bolero** (Biển Tình · Đường Xưa · Mùa Xuân · Đừng
Xa · Rừng Lá) — thuần bolero, không lẫn slow rock. Người dùng đã chốt qua phiếu T2.

| hằng số | giá trị | giá trị cũ | nghĩa |
|---|---|---|---|
| tay phải bám mốc tay trái | **0,54** | 0,64 | bao nhiêu phần mốc tay trái được tay phải chạm |
| chuỗi mới mỗi ô | **0,45** | 1 | bao nhiêu phần ô mở một chuỗi nốt mới |
| nhân bản | **0,36** | 0,47 | |
| chồng nốt ở ô thưa | **0,62** | *giữ nguyên* | đã bác đề nghị hạ — xem mục 17 |

**Triệu chứng để lùi:** nghe thấy tay phải bám tay trái quá sát hoặc quá thưa thì kiểm
bốn cái này trước, và đem giá trị cũ ra so.

Số đo nền: mốc gõ có **cả hai tay** — trung bình năm bài **40%**. Chồng nốt ở ô thưa từng
bài: Biển Tình 8% · Đường Xưa 13% · Mùa Xuân 22% · Đừng Xa 31% · Rừng Lá 36%, **trung
bình 22%**.

---

## 11. Câu dạo Đừng Xa Em Đêm Nay — hình mẫu

Đây là câu người dùng nghe và duyệt trước tiên, nên nó thành hình mẫu cho lối dạo.

- **Ô thưa giữ 5 mốc**: `0 · 0,5 · 2 · 3 · 3,5`; nốt ở `0,5` ngân qua phách 2.
- **Hai ô dày nối tiếp rồi tới một ô thưa** — không phải một dày một thưa.
- **Hợp âm hút cuối câu dạo**: A về Dm. Chị ấy **dặm MỘT lần** rồi ngân dài, và tiếng
  **tắt trước vạch nhịp** — không tràn sang ô ca sĩ vào hát.

---

## 12. Câu fill

- **54 cụm fill**, trong đó **18% đi liền bậc**. *(Con số 8% từng đo trước đó là sai —
  xem mục 17.)*
- Bốn câu fill 3 nốt đã chép nguyên từ sheet, đều dài `0,75` phách, giãn cách móc kép.

Chưa đo: fill đặt ở **vị trí nào** trong ô và trong câu hát. Đây là lỗ còn lại của việc
"tìm ra tư duy tạo câu fill" người dùng đặt ra.

---

## 13. Điệu: bolero và slow rock hiện dùng chung

Kho có 5 bolero và 2 slow rock. Khi ghép giai điệu cho bài **giọng thứ**, **26%** ô đến
từ Lá Thư Trần Thế (slow rock) — đo trên 480 ô. Bài **giọng trưởng** thì 0%, nhưng đó là
may chứ không do luật.

**Ý người dùng:** *"tạm thời vẫn giữ chung slow rock và bolero cho đến khi nào đủ lượng
sheet bolero thứ trong kho."*

Tách được khi có thêm sheet **bolero giọng thứ** — hiện chỉ có Đừng Xa và Rừng Lá.

---

## 14. Luật đã bị số đo lật — đừng khôi phục

### `rule-interlude-plain-harmony` → **rejected**

Luật cũ nói đoạn không lời phải rút hợp âm về tính chất cơ bản. Nó suy từ nguyên lý
chung, đặt lúc kho **chưa có bản ký âm của thầy nào**. Số đo 78% / 77% ở mục 2 đã lật
nó. Thay bằng `rule-linh-nhi-solo-giu-mau` (derived · draft · source null).

**Ý người dùng, thành chính sách chung:** *"Khi học theo tư duy của thầy nào thì phải ưu
tiên những luật trong sheet của thầy đó, và xoá bỏ những luật mình tự đặt trước khi học
từ sheet nếu chúng có xung đột."* Bỏ hẳn, **không dung hoà**.

### "Đoạn giang dùng lại vòng dạo" → **sai**

Kết luận này rút ra bằng cách so **danh sách ký hiệu hợp âm** giữa hai đoạn. Sai: cách ấy
bỏ mất những ô không có ký hiệu, mà ở đó hợp âm trước vẫn còn vang — và đúng những ô ấy
lại nằm ở đầu đoạn (Biển Tình ô 52 = D, Mùa Xuân ô 63–64 = G). Người dùng đã bác.

---

## 15. Ý người dùng — không phải số đo

Ghi riêng để đừng lẫn với thứ đo được:

- Câu dạo phải **xen kẽ ô thưa với ô dày**.
- Hợp âm hút cuối câu dạo phải **tắt trước chỗ ca sĩ vào**.
- Khi train hay đổi một lối chơi, **dựng sau một ô tick nghe thử** thay vì thay thẳng
  bản đang có.
- **Ô 5 thưa 100%**, không phải 60% số lượt.

---

## 16. Chưa đo — lỗ còn lại

- **Vị trí ô chia đôi** trong đoạn dạo: n=6, chưa thành luật.
- **Vị trí câu fill**: chưa đo fill nằm ở đâu trong ô và trong câu hát.
- **Vốn giọng trưởng mỏng**: chỉ 3 bài (Biển Tình, Đường Xưa, Mùa Xuân).
- **Bolero giọng thứ mỏng**: chỉ 2 bài. Đây là chỗ đáng nạp sheet nhất.
- **Tuyết Rơi** (tone Am) đã nạp vào thư mục nhưng chưa chia đoạn, chưa xác nhận điệu và
  giọng, chưa xử `AmMaj7` nghi vấn.
- **Đoạn kết** chưa có bộ hằng số riêng, đang dùng chung với đoạn dạo. Nay đã có số đo
  riêng cho nó (mục 5 và 9) nên làm được.

### Đã đo nhưng CHƯA đưa vào code

- **Giang tấu dùng lại 78% tuyến của đoạn dạo** (mục 5). Bộ ghép hiện chọn ô độc lập cho
  giang tấu, không lấy lại câu dạo — nên hai đoạn ra hai câu khác nhau, ngược bản ký âm.
- **Điệp khúc dày lên bằng nắm dày hơn** (mục 3), n=7. Điệu `bolero-linh-nhi-3-chorus`
  trong code dựng từ n=1 (Đường Xưa ô 41–58) và làm dày bằng cách khác.
- **Hai tay đảo vai khi vào solo** (mục 4). Chưa có chỗ nào trong code hạ tay trái xuống
  và nâng tay phải lên theo đúng mức đo được, riêng giọng thứ.

---

## 17. Bẫy đo đã sập — đọc trước khi đo lại

**Đọc giọng bằng hợp âm mở đầu đoạn dạo.** Biển Tình từng bị đọc là **Si thứ** vì đoạn
dạo mở trên `Bm`. Đếm cả bài thì `D=19` nhiều nhất, `Bm=13`, `F#m=13`, `A=12`, bài đóng
trên `D`, và vòng `D–Bm–F#m–Em–A–D` là **I–vi–iii–ii–V–I**. **Rê trưởng**; đoạn dạo chỉ
mở trên bậc vi. Giọng phải đọc bằng **đếm cả bài và xem bài đóng ở đâu**.

**So hai tỉ lệ khác mẫu số.** Đã mắc hai lần. Một lần so "86% / 52%" (mốc tay phải rơi
trên mốc tay trái) với hằng số bám mốc (mốc tay trái được tay phải chạm) — hai mẫu số
khác nhau. Một lần so `0,62` (chỉ tính ô thưa) với `20–34%` (trung bình cả đoạn). Trước
khi so hai con số, **nói rõ mẫu số của từng con**.

**Đếm cụm fill mà gộp nốt cùng mốc.** Nắm hợp âm bị đếm thành bước nhảy giai điệu: ra
146 cụm / 8% liền bậc. Đếm đúng (lấy nốt trên cùng mỗi mốc, thời gian tăng nghiêm ngặt)
ra **54 cụm / 18%**.

**So vòng hợp âm bằng danh sách ký hiệu.** Phải trải ký hiệu ra **từng ô** và điền ô
trống bằng hợp âm đang vang. Xem mục 14.

**Máy đọc sai hợp âm ba lần cùng một kiểu**: bass lướt `Ab` thành `Abmaj7` (thật là `G`);
nốt lướt nửa cung `Eb` thành `F#dim7` (thật là `F#ø7`); nốt giai điệu `G#` thành `AmMaj7`
(15/22 ô không có gì đỡ). Hợp âm máy đọc phải soi lại bằng mắt.
