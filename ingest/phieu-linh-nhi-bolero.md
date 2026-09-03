# Phiếu — Linh Nhi, bolero

Năm bài trong `video/Linh_Nhi/`. **Chỉ bolero.** Không so Cà Pháo / Tôn Hùng. Không lấy Lá thư trần thế / Một cõi đi về (slow rock).

Hợp âm = máy đoán từ LH. Tin sheet + tai. Bậc ghi theo **giọng sheet**, khi clone phải dịch sang tonic bài app.

Đánh `[x]` khi đồng ý. Lệch: để trống, ghi ý dưới.

Đo: `clone_do.py linh-nhi bolero` + dump ô. n = 5.

**Luật 3 thầy (đã chốt):** hát → RH = giọng. Dạo/giang/kết → RH = đàn. LH lướt ≠ đổi vòng. Chùm RH có nốt lời.

---

# 0. Phạm vi

| bài | file | ô | giọng | bằng chứng |
| --- | --- | --- | --- | --- |
| Biển Tình | `bien-tinh-linh-nhi-piano.mxl` | 72 | **D trưởng** | fifths +2 · kết `D9` |
| Đừng Xa Em Đêm Nay | `Dung Xa Em Dem Nay-Linh Nhi.mxl` | 86 | **D thứ** | fifths −1 · kết `Dm` |
| Đường xưa lối cũ | `Duong Xua Loi Cu-Linh Nhi.mxl` | 112 | **C trưởng** | fifths 0 · C×29 nhiều nhất · bass ô cuối C2 |
| Mùa xuân đầu tiên | `Mua xuan dau tien-Linh Nhi.mxl` | 114 | **SOL trưởng** ← *sửa* | fifths **+1** · kết `G` ô 108 · G×36 > D×29 · cadence `Dsus4`→`G` |
| Rừng lá thấp | `Rung La Thap-Linh Nhi.mxl` | 79 (sheet 91, đuôi 80–91 bỏ) | **LA thứ** ← *sửa* | fifths **0** · kết `Am` ô 87 · Am×24 · `E7` giữ 4 ô = V7/Am · `Eaug` = V+/Am |

**HAI GIỌNG ĐÃ SỬA.** Bản phiếu trước ghi Mùa xuân = D trưởng và Rừng lá thấp = E thứ.
Cả hai đều **lấy bậc V làm chủ âm**. Bảng hợp âm của chính phiếu cũ đã tự mâu thuẫn với
nhãn ấy — bảng Mùa xuân đầy `G / Gmaj7 / Bm7`, bảng Rừng lá thấp đầy `Am / Am7 / Em7`.

Phiên sau đọc lại đừng "sửa" ngược: chứng cứ nằm ở cột bên phải, cả bốn dòng đều
độc lập với nhau.

Rừng lá thấp: **không giang tấu** (đã chốt).

---

# A. Giọng trưởng vs thứ — vòng + nốt

## A.1 Nguồn hợp âm: KÝ HIỆU TRÊN KHUÔNG, không phải máy đoán

Bản phiếu trước ghi *"hợp âm = máy đoán từ LH"*. Nhưng **cả năm sheet đều có ký hiệu hợp
âm viết sẵn**, và `KHUNG-HOI-THAY.md` §1 đã chốt: có ký hiệu thì **sheet thắng máy**.

Chênh lệch có hệ thống — máy đọc thế bấm tay trái rồi **thổi phồng chất hợp âm**:

| Đường xưa ô 1–8 | máy đoán (phiếu cũ) | ký hiệu thật |
| --- | --- | --- |
| | `? Fmaj7 D Cmaj7 Am D G7 Am7` | `— F Dm C Am Dm G Am7` |

`Dm→D`, `C→Cmaj7`, `G→G7`, `F→Fmaj7`. Bốn chỗ, cùng một hướng. Sai chất thì bậc thứ hoá
bậc trưởng, và tay phải sẽ chọn nốt sai.

Mọi bảng dưới đây đọc thẳng từ `<harmony>` trong file, kèm bậc tính trên tonic đã sửa.

## A.2 Vòng dạo / giang / kết — năm bài

**Biển Tình — D trưởng**

| đoạn | ô | ký hiệu | bậc |
| --- | --- | --- | --- |
| dạo | 1–9 | `Bm F#m Em D · Bm Em F#m Esus · D` | vi iii ii I · vi ii iii II · I |
| giang | 52–61 | `Bm F#m Em D · Bm Em F#m Esus · D · A` | vi iii ii I · vi ii iii II · I · **V** |
| kết | 68–72 | `Bm F#m Em · A · D9` | vi iii ii · V · **I** |

**Đừng Xa Em Đêm Nay — D thứ**

| đoạn | ô | ký hiệu | bậc |
| --- | --- | --- | --- |
| dạo | 1–9 | `Dm C Bb F · Gm Dm E° A · Dm · A` | i ♭VII ♭VI ♭III · iv i ii° V · i · **V** |
| giang | 48–57 | `C Bb F Gm · Dm A/E° · A7 · Bbmaj7 Bm7` | ♭VII ♭VI ♭III iv · i V · V7 · ♭VI vi |
| kết | 80–86 | `Dm · A/E° · Dm` | i · V · **i** |

**Đường xưa lối cũ — C trưởng**

| đoạn | ô | ký hiệu | bậc |
| --- | --- | --- | --- |
| dạo | 1–8 | *(ô 1 trống)* `F Dm C Am Dm G Am7` | IV ii I vi ii V vi |
| giang | 75–82 | `C Am F G · C Dm G Am7` | **I vi IV V** · I ii V vi |
| kết | 107–112 | `Am · Fm` | vi · **iv thứ mượn** |

**Mùa xuân đầu tiên — SOL trưởng**

| đoạn | ô | ký hiệu | bậc |
| --- | --- | --- | --- |
| dạo | 1–8 | `G Em Bm D/Am · G Bm7 Bm G D` | I vi iii V/ii · I iii iii I V |
| giang | 63–71 | *(ô 63–64 trống)* `Em Bm D Am G Bm D G D` | vi iii V ii I iii V I **V** |
| kết | 103–113 | `Bm Em C Dsus4 · G` | iii vi IV V · **I** |

**Rừng lá thấp — LA thứ**

| đoạn | ô | ký hiệu | bậc |
| --- | --- | --- | --- |
| dạo | 1–9 | `Eaug Am G Dm C Am7 Em Em7 Am` | **V+** i ♭VII iv ♭III i v v i |
| *(không giang)* | | | |
| kết | 67–79 | `D Em Am G C Am Em7 G Em7 Am Dm7 · D` | IV v i ♭VII ♭III i v ♭VII v i iv · **IV** |

## A.3 Ba nét lộ ra khi đọc ký hiệu thật

**1 · Dạo và giang DÙNG CHUNG một vòng — 3 trên 4 bài có giang.**

| bài | quan hệ |
| --- | --- |
| Biển Tình | giang = dạo **y nguyên**, chỉ thêm `A` (V) ở ô cuối làm cửa vào hát |
| Đừng Xa | giang = dạo **bỏ hợp âm đầu**, bắt từ ♭VII |
| Mùa xuân | giang = dạo **bỏ hợp âm đầu**, bắt từ vi |
| Đường xưa | giang **khác hẳn**: `I vi IV V` — bài duy nhất |

Đây là nét mạnh nhất phiếu này tìm được, và nó **ngược với thứ KeyTrain đang làm** — app
đang đóng cứng hai vòng KHÁC NHAU cho dạo và giang.

**2 · Ô cuối đoạn dạo và đoạn giang đều là bậc V** — Biển Tình `A`, Đừng Xa `A`, Mùa xuân
`D`. Cửa vào hát. Rừng lá thấp không có giang nên không kiểm được.

**3 · Hai bài trưởng kết bằng bậc iv THỨ mượn**: Đường xưa `Fm` (ô 108), và Mùa xuân có
`Cm6` ở ô 97. Cùng một cử chỉ, hai bài khác nhau — đáng ngờ là nét của thầy chứ không
phải của bài.

`- Ý BẠN:`

## A.4 Chỗ cần bạn xác nhận

- **Rừng lá thấp cắt ở ô 79 kết trên `D` (bậc IV)**, không phải chủ âm. Bài không đậu.
  Có phải chỗ đậu thật nằm trong đuôi 80–91 mà bạn bảo là dư không?
- Khi clone sang bài app **Am**: Mùa xuân I = G → I bài = Am? Không, bài app giọng **thứ**,
  nên chỉ mượn được vòng của hai bài THỨ (Đừng Xa, Rừng lá thấp). Ba bài trưởng phải để
  dành cho bài app giọng trưởng. **Xác nhận cách hiểu này.**

# B. Tiết tấu đệm lúc hát (LH)

Cell cũ app (`bolero-linh-nhi-2`, đo Biển Tình): 9 mốc `0 · 0.5 · 0.75 · 1 · 1.5 · 2 · 2.5 · 3 · 3.5` (1-5-8-10). Điệp = vòm cao hơn, cùng lưới.

## B.1 Số đo mốc/ô

| bài | phiên | điệp | khác biệt |
| --- | --- | --- | --- |
| Biển Tình | 8.2 | 8.4 | cùng lưới 9 mốc; điệp 0.5/2.0 = 100% |
| Đừng Xa | 5.9 | 5.4 | **thưa hơn** Biển Tình; điệp còn thưa hơn phiên |
| Đường xưa | 8.4 | 8.4 | lưới gần giống Biển Tình. Điệp **0.75 = 94%** (phiên 84%). Vài ô điệp thêm 2.75 |
| Mùa xuân | 7.5 | 7.2 | điệp **1.5 = 100%** (phiên 79%); 0.5 điệp chỉ 61% |
| Rừng lá thấp | 7.6 | **10.4** | điệp dày hẳn: 2.75 / 3.25 / 3.75 (móc kép đuôi ô) |

## B.2 Đường xưa lối cũ — điệp hơi khác (đúng như bạn nói)

Phiên và điệp **cùng 9 mốc**, không đổi điệu.

Khác:
- Điệp gõ **0.75 thường hơn** (94% vs 84%).
- Điệp đôi ô thêm **2.75**.
- RH điệp dày hơn phiên (8.3 vs 6.4 nốt/ô) — chùm đệm, không phải cell LH mới.

**Ý tôi:** không tách cell điệp riêng cho Đường xưa; cùng bolero-linh-nhi-2, điệp giữ vòm cao / gõ 0.75 đều hơn. **Rừng lá thấp điệp** mới là cell khác (10+ mốc, móc kép).

- [x] Đường xưa điệp = cùng lưới 9 mốc, 0.75 đều hơn
- [x] Rừng lá thấp điệp **hơi khác** các bolero kia, **cùng hướng Đường xưa**
- [x] Điệp: RH **đôi khi đánh pattern đệm thay LH** (Rừng lá thấp ô 35–36 chùm dày = đệm, không phải fill)

## B.4 Điệp: RH xen đệm (phát hiện mới)

Rừng lá thấp + Đường xưa: lúc hát điệp, tay phải thỉnh thoảng **gánh cell đệm** (chùm hợp âm theo lưới), tay trái thưa hoặc nghỉ chỗ đó.

Biển Tình điệp: RH = lời + chùm; LH giữ 9 mốc. Không đổi vai như hai bài kia.

**Không gộp** cell điệp Rừng lá thấp (10 mốc, RH đệm) với Biển Tình (LH 9 mốc, RH hát).

`- Ý BẠN:`

## B.3 Đừng Xa thưa

LH hát ~5.5–6 mốc/ô vs Biển Tình ~8. Có phải bài này đệm thưa, hay sheet viết thiếu? **Hỏi.** Không gộp một mật độ cho mọi bolero Linh Nhi nếu tai nói Đừng Xa đúng là thưa.

---

# C. Giao hát / solo (tự quyết + chỗ hỏi)

**Tự giữ corpus** (khớp cửa dạo/giang đã học):

| bài | dạo | hát từ | giang | kết |
| --- | --- | --- | --- | --- |
| Biển Tình | 1–9 | 10 | 52–61 | 68–72 |
| Đừng Xa | 1–9 | 10 | 48–57 | 80–86 |
| Đường xưa | 1–8 | 9 | 75–82 | 107–112 |
| Mùa xuân | 1–8 | 9 | 63–71 (≈ dạo) | 103–113 |
| Rừng lá thấp | 1–9 | 10 | *không* | 67–79 |

**Tự quyết:**
- Biển Tình `ending_2` 62–67 = **hát** (coda lời), không solo.
- Mùa xuân giang 63–71 nhắc dạo = **đàn**, giống Cà Pháo ô 5/53.
- Đường xưa giang C–Am–F–G = đàn trên vòng I–vi–IV–V, không copy 18 ô điệp.

**Hỏi nếu lệch tai:**
1. Rừng lá thấp có đoạn giang bị gộp vào phiên 2 / kết không?
2. Đường xưa 75–82: giang hay còn hát?
3. Đừng Xa ô 48 (Bbmaj7, RH thấp rồi pickup): hết lời chưa? (phiếu cũ: giang 48–57)

---

# D. Fill / chạy ngón lúc hát

Không phải solo giang. Khe cuối ô / giữa câu, RH dày hơn lời. Ứng viên dưới — **chưa làm nút** cho đến khi bạn chốt.

## D.1 Chắc (đàn, không phải một nốt lời)

| # | bài | ô | hợp âm máy | hình | loại |
| --- | --- | --- | --- | --- | --- |
| 1 | Đừng Xa | **27** | D | rải xuống 9 nốt F6–E–D–A–F–E–D–A–F | **run** — đã chốt |
| 2 | Đừng Xa | **36 = 65** | A7 | E3 rồi rải lên A–C#–E–G–A–C# | **fill** — đã chốt |
| 3 | Đừng Xa | **73–74** | Bb / B | D–E–F–E lặp | **lời** — không lấy |

## D.2 Đã chốt thêm (bắt chéo ô)

| # | bài | chỗ | hình | loại |
| --- | --- | --- | --- | --- |
| 4 | Biển Tình | 26, 35 | chùm A–C#–E | **fill** |
| 5 | Biển Tình | **17** | cuối ô: E3–A3–B3–D4 | **fill** |
| 6 | Đường xưa | 63 | tremolo G6/B5 | **fill/run** |
| 7 | Đường xưa | **cuối 90 → LH đầu 91** | 4 nốt cuối ô 90 (E5–C5–B4–G4) nối bass đầu 91 | **fill bắt chéo ô** |
| 8 | Đường xưa | 51 / 57 / 99 | chùm điệp | **không lấy** (đệm+hát) |
| 9 | Mùa xuân | **17→18** | bỏ nốt trắng đầu 17 (lời). C4–D4–F#–A–D nối 3 nốt đầu ô 18 | **fill bắt chéo ô** |
| 10 | Mùa xuân | 32 / 78 | 4 móc kép | **không lấy** |
| 11 | Rừng lá thấp | **cuối 42 → 43** | chùm cuối 42 nối ô 43 | **fill bắt chéo ô** |
| 12 | Rừng lá thấp | 35–36 | chùm dày RH | **đệm thay LH**, không phải fill |

Sổ nút Fill/Run Linh Nhi (chưa thay Licky): 27 run · 36/65 fill V7 · 26/35 block · 17 Biển Tình · 63 tremolo · 90→91 · 17→18 · 42→43.

Sau khi chốt D.1 (+ dòng D.2 bạn bảo là fill): mô phỏng nút **Fill Linh Nhi** / **Run Linh Nhi** (clone interval, dịch theo hợp âm đang vang). Bạn ưng rồi mới thay Licky — **đừng thay ngay**.

`- Ý BẠN:`

---

# E. Cấm khi clone (từ phiếu này, draft)

- Không đắp vòng Biển Tình (trưởng) lên bài thứ, và ngược lại.
- Không dán `Dm` từ Đừng Xa sang bài Am.
- Không gộp LH Đừng Xa (thưa) với Biển Tình (9 mốc) thành một mật độ.
- Không lấy đầu điệp làm giang (Đường xưa giang ≠ 41–58).
- Không gọi rải ô 27 Đừng Xa là lick pentatonic — đó là rải 1-3-5-8 xuống.
- Không biến mọi điệp thành cell Rừng lá thấp (10 mốc) — n=1.
- Không train fill từ đoạn solo (dạo/giang/kết) vào nút fill hát.
- **Không dùng hợp âm máy đoán khi sheet có ký hiệu** — xem A.1. Máy đọc thế bấm tay
  trái rồi thổi phồng chất hợp âm (`Dm`→`D`, `C`→`Cmaj7`, `G`→`G7`).
- **Không lấy bậc V làm chủ âm.** Hai giọng trong phiếu này từng sai đúng kiểu ấy —
  xem mục 0. Kiểm bằng `fifths`, hợp âm cuối bài, và hợp âm hay gặp nhất.

---

# F. Việc tiếp

1. ~~Chốt giọng + giang + fill.~~
2. Rút bậc dạo/giang **trưởng (D, C, G) vs thứ (Dm, Am)** — Đường xưa giang I–vi–IV–V là bài duy nhất khác dạo; ba bài kia giang ≈ dạo (xem A.3).
3. Cell LH: 9 mốc Biển Tình; Đừng Xa thưa; điệp Rừng lá thấp / Đường xưa (RH xen đệm).
4. Nút Fill/Run Linh Nhi từ sổ D — **chưa thay Licky** cho đến khi bạn kêu.

---

# G. Hỏi từng ô — cửa hát / đàn (sâu như Cà Pháo)

Lần đo trước chỉ hỏi giọng + vài fill. Thiếu cửa lời, nốt bắt chéo ô, tên hợp âm máy. Dump biên đoạn:

## G.1 Biển Tình (D trưởng)

| ô | máy | RH tóm | nghi | hỏi |
| --- | --- | --- | --- | --- |
| **1** | (không LH) | pickup D5–F#5–A5 @2.5–3.5 | đàn, chưa lời | [x] đã chốt pickup |
| **9** | D | D5; @3.5 **E5** | E5 có phải **pickup lời** vào ô 10? | |
| **10** | A | A4 rồi chùm C# E A | chữ hát đầu? | |
| **25→26** | Asus4→A | ô 25 @3.75 E5; ô 26 chùm A | E5 nối điệp hay lời mới? | |
| **51→52** | Asus4→D | ô 52 LH chỉ D3, RH rải lên F#6 | hết lời, **giang** từ 52? | |
| **61→62** | A→Asus4 | ô 61 = cùng hình ô 26 (chùm A) | 61 còn giang hay đã hát ending? | |
| **67→68** | D→Bm | ô 67 @3–3.5 F#5 A5 | pickup kết? | |

## G.2 Đừng Xa (D thứ)

| ô | máy | RH tóm | nghi | hỏi |
| --- | --- | --- | --- | --- |
| **1** | D | **18 nốt** dày, F/E trên D | dạo đã đàn dày — có chữ nào không? | |
| **8→9** | Dm→Amaj7 | ô 8 A4 D5; ô 9 E3 rồi A3 C# | 9 = **báo** vào hát, chưa lời? | |
| **10** | Dm | A3 D4 … F4 | chữ hát đầu? | |
| **28→29** | A→Dm7 | ô 28 G3 + A3 C# E @3; ô 29 14 nốt | 28 hết phiên, 29 điệp lời? | |
| **47→48** | Fsus4→Bbmaj7 | ô 47 chỉ **C#4 @3.75**; ô 48 E3 rồi pickup A D E | C#4 lời hay fill vào giang? 48 hết lời? | |
| **57→58** | A→Dm7 | giống 28→29 | giang hết, điệp 2 lời? | |
| **79→80** | A→Dm | ô 79 C#7 rồi E5…; ô 80 rải D A D E F A | 79 hết hát, 80 **kết đàn**? | |

## G.3 Đường xưa (C trưởng)

| ô | máy | RH tóm | nghi | hỏi |
| --- | --- | --- | --- | --- |
| **1** | (không LH) | G5 C6 B5 | pickup đàn? | |
| **8→9** | Am7→Gmaj7 | ô 8 chỉ C5 + LH dày; ô 9 G3 B3 C4 E4 | chữ hát từ 9? | |
| **40→41** | Dm7→C | ô 41 A4 E4 rồi G4 E5 | điệp lời từ 41? | |
| **58→59** | Abmaj7→G | ô 58 4 nốt; ô 59 B3 + chùm G | hết điệp, phiên 2 lời? Abmaj7 máy có đúng? | |
| **74→75** | Dm7→C | ô 75 A4 E4 G4 E5 C5 E5 G5 | **giang đàn** từ 75 hay còn hát? | |
| **82→83** | Am7→Gmaj7 | ô 82 chỉ C5 (giống ô 8) | hết giang, phiên 3 lời từ 83? | |
| **106→107** | C→Am | ô 106 dày; ô 107 E5 C6… | hết hát, **kết đàn** từ 107? | |

## G.4 Mùa xuân (SOL trưởng)

| ô | máy | RH tóm | nghi | hỏi |
| --- | --- | --- | --- | --- |
| **8→9** | D→A | ô 8 A3 D4 G4; ô 9 G4 A4 Bb4 | chữ hát từ 9? G4 ô 8 có phải pickup lời? | |
| **27→28** | D→Gmaj7 | ô 28 chùm G D B + Eb5 E5 | điệp lời từ 28? | |
| **62→63** | Am7→G | ô 62 G5…; ô 63 G3 rồi B D G5 | hết hát, **giang** từ 63? | |
| **71→72** | D→Gmaj7 | ô 71 A3 D4 B5 D5 C6; ô 72 D6… | hết giang, điệp 2 lời từ 72? | |
| **102→103** | G→Bm | ô 103 F#4 D5 B… | hết hát, **kết đàn** từ 103? `Bm` = **iii của G** | |

## G.5 Rừng lá thấp (LA thứ)

| ô | máy | RH tóm | nghi | hỏi |
| --- | --- | --- | --- | --- |
| **1** | Eaug | rải A D E A D F# | ô 1 là **Eaug = V+ của Am**, không phải D. Có lời không? | |
| **9→10** | D7→G | ô 9 RH 13 nốt; ô 10 A4 C5 B4 | chữ hát từ 10? Ô 9 còn dạo? | |
| **25→26** | Em7→C6 | ô 26 D6 E6 G5… | điệp lời từ 26? | |
| **43→44** | Am7→G | ô 43 fill đã chốt nối 42; ô 44 = ô 10 | hết điệp, phiên 2 lời từ 44? | |
| **66→67** | E→D | ô 66 E5 + G#6; ô 67 E5 C5 A5 | hết hát, **kết đàn** từ 67? Ô 66 G# = 3 của `E` = **V của Am** | |
| **79** | F#m | E6 E6 | cắt bài đúng 79? | |

Đánh `[x]` trên phiếu hoặc trả lời từng cụm dưới. Không đoán cửa lời.
