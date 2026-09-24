# Tuấn Lưu Piano — thầy, đọc file này trước khi nói trong vai thầy ấy

`id: tuan-luu-piano` · tên đúng là **Tuấn Lưu Piano** (trường `name` trong `tuan-luu-piano.json`)

File này **chính là thầy Tuấn Lưu**. Mỗi lần nói trong vai thầy ấy thì đọc đây trước.

---

## NGUYÊN TẮC — câu solo là thứ được SOẠN

Áp cho mọi thầy:

> *"Các câu solo giờ là phải soạn ra để chơi chứ không sinh ngẫu nhiên nữa."*

Luật soạn nốt dùng chung: `knowledge/LUAT-SOAN-NOT.md`. File này chỉ ghi cái riêng của Tuấn.

**Màu theo giọng — chốt 7/9/2026, luật soạn chung, không đo từ video Tuấn (0 sheet):**

| giọng | màu | nghĩa đã chốt |
|---|---|---|
| **trưởng** | tươi sáng | **chắc chắn** — siết nốt hợp âm, bước nhỏ, siết thêm ở kết |
| **thứ** | man mác buồn | **không chắc + chỗ kéo** — vòng i · iv · V/V7 · ♭VI · ♭VII; đừng siết như trưởng |

Không phải chọn bậc `3`/`13` hay `♭3`. Rời/nhảy chỉ chắc khi vốn ô là Linh Nhi (n=4). Cà Pháo n=1 ngược — không lấy.

---

## 0. CỠ MẪU — đọc trước mọi con số

**0 bản ký âm.** Không có folder sheet. Mọi số dưới đây **không** đo từ MusicXML.

| nguồn | n | ghi gì |
|---|---|---|
| Video *Cách đệm hát Bolero trên đàn piano (Rhumba)* — `improv-bai-04` | 1 video, 7 item nạp | Pùng-Pắp, 6 hợp âm Am, staccato cổ tay, rải đón ô |
| Cell KeyTrain `bolero-1` | 1 cell | lưới 7 điểm từ video |
| Cell tester `bolero-tu-n-improv-bai-04-00001` | 1 cell | biến thể PatternTester — **không trùng** `bolero-1` |
| Cell tester `tango-tu-n-improv-bai-04-00004` | 1 cell | Tango Tuấn — **chưa** có item PianoBrain |
| Intro Bolero Tuấn trong app | luật app | ô A/B + hút V — **suy từ sheet Linh Nhi / Cà Pháo**, không phải sheet Tuấn |

CHƯA AI Ở ĐÂY XEM VIDEO. Mốc thời gian trong 7 item do bộ nạp ghi. Đừng bịa nốt giai điệu của thầy.

Đứng **cạnh** Linh Nhi, không thay: cùng họ Bolero, hai **kiểu đệm** khác loài.

---

## 1. Bolero Tuấn — Pùng-Pắp

Video `00:02:37–04:18`. Đếm **7 điểm** một ô 4/4:

```
Pùng(1-LH)  Pắp(1-and-RH)  Pắp(2-RH)  Pùng(3-LH)  Pắp(3-and-RH)  Pùng/Pắp(4)  Pắp(4-and-RH)
```

- LH: bass **phách 1 = gốc**, **phách 3 = quãng 5**.
- RH: dập **hợp âm đảo phách** — nẩy cổ tay, nhả ngay (staccato, mô phỏng quạt chả guitar). `00:06:17–07:40`.
- Không rải 1-5-8-10. Đó là Linh Nhi.

### Hai cell KeyTrain — đừng gộp

| | `bolero-1` (`family: bolero`) | nút UI **Bolero Tuấn** (`family: bolero-tu-n`) |
|---|---|---|
| id | `bolero-1` | `bolero-tu-n-improv-bai-04-00001` |
| LH | beat 0, 2 | beat 0 (gốc+8va), 2 (gốc+8va), **3 (quãng 5)** |
| RH | 0.5 · 1 · 2.5 · 3.5 | 0.5 · **1.5** · 2.5 · 3.5 |
| BPM cell | 85 | 100 |

Cả hai `laBoleroTuan` = true. Intro Pùng-Pắp chạy trên **cả hai**.

### Hòa âm bài giảng — n=1 video, giọng **La thứ**

Sáu hợp âm: `Am Dm Em C F G`, về `E7`.

```
i   iv  iii  III  VI  VII  V7
Am  Dm  Em   C    F   G    E7
```

LH luân gốc / quãng 5 từng hợp âm. **Chưa đo** giọng trưởng trên video.

### Biến tấu rải đón ô — n=1 ví dụ Am

Phách 1 khi **đổi hợp âm**: RH không dập chùm, rải 16th `A3→C4→E4→A4` rồi vào dập. `00:14:00–15:52`. App intro **không** làm biến tấu này — **chưa gắn**.

---

## 2. Tango Tuấn

**Chưa đo từ video.** Chỉ cell tester `tango-tu-n-improv-bai-04-00004`, `family: tango-tu-n`, họ Tango.

Ô 4/4, BPM 100:

- LH: beat 0 (gốc+8va, dur 0,7) · beat **3,5** (gốc+8va)
- RH: dập hợp âm **mỗi phách** 0·1·2·3 (dur 0,7; phách 1 yếu hơn)

Ghi chú cell: vòng `Dm G C F Em Am` — **ý PatternTester**, không phải số đo sheet.

Intro Tango Tuấn: **chưa làm**.

---

## 3. Intro Bolero Tuấn — luật APP, không phải sheet thầy

Khung **chung hai giọng** (Tuấn 0 sheet). Ô A/B suy từ intro Linh Nhi n=59/7 bài và Cà Pháo n=34/3 bài.

| ô | việc | ~tỉ lệ |
|---|---|---|
| **A** | Pùng-Pắp đủ hai tay | ~1/3 · `(ô+take)%3===2` |
| **B** | LH bass 1+3 + RH giai điệu nốt đơn | còn lại |

Pắp LH trên ô B **từ ô 3**. Ô 1–2 B: chỉ bass. 8 ô + **hút V** (`hutDungXa`). Bass im lúc chạy. Tầm MIDI 62–79. Phạt ô chuỗi lên ≥5 (sheet intro trưởng n=6 và thứ n=7: **0** chuỗi ấy).

Câu chạy intro: **4 nốt móc kép**, không 10 nốt lên (sheet intro không có).

### 3.1 Giọng trưởng — tươi sáng = chắc chắn

- Vòng: mặc định xoay vốn bài. Tick `daoTruong`: mẫu n=3 Linh Nhi (I-vi-iii / vi-iii-ii / IV-ii-I), trơn chất, cửa V.
- Nốt: vốn ô **intro trưởng** 3 thầy (`gopThay`). Gam Ionian. Siết nốt hợp âm nếu bật tick siết.
- Chạy: **2×4** nốt. Không phạt rải trưởng / lặp (đó là màu buồn).

### 3.2 Giọng thứ — man mác buồn = không chắc + chỗ kéo

- Vòng: **luôn** mẫu sheet thứ n=3 thầy — i–♭VII–♭VI (Đừng Xa) / i–♭VII–♭III (Lá Thư) / i–♭VI–♭VII (Tình Em). Trơn. Cửa V.
- Nốt: vốn ô **intro thứ**. Gam tự nhiên ♭6 ♭7; nâng 7 chỉ khi V. Phạt bậc 3 trưởng, 6 trưởng, rải 1-3-5 trưởng lặp, ô gãy (nhảy ≥5 cùng chiều), lặp <8%. Cà Pháo thứ n=1 xếp sau.
- Chạy: **1×4 xuống**.

Tai 7/9/2026: sau phạt chuỗi/rải, Đã ổn Tuấn La thứ **13** câu trong ~20 phút (trước đó 4 Đã ổn là Linh Nhi). **Chưa đo** video Tuấn.

---

## 3b. Giang tấu Bolero Tuấn — cùng khung intro, dài hơn

Cùng ô A/B Pùng-Pắp, cùng gam luật 6, cùng hút V cuối. **Không** sheet Tuấn.

| | intro | giang tấu |
|---|---|---|
| số ô vòng | 8 (+ 1 hút) | **12** (+ 1 hút) — `vonHopAm` `soO: 12` |
| câu chạy | thứ: 1×4 xuống · trưởng: 2×4 | **5** — xen dài ngũ cung 10 nốt móc ba (ô 51 Cà Pháo) và ngắn 4 |
| loops form | — | **1** (không nhân 2 — hút phải đứng cuối) |

Cỡ mẫu chỗ học: Linh Nhi giang 5 chuỗi / 10 ô (n=1 bài Biển Tình); Cà Pháo Hồng Kông 1: 8 câu / 19 ô. App 5/12 ≈ 0,42 — gần Hồng Kông 1, **không** phải 0,09 gộp 167 ô Linh Nhi (thủ pháp hiếm trên cả bài).

Hút cuối: `hutDungXa` bậc V giọng bài, giống intro — kéo về phần hát kế.

**Không** dập tầng 3 (hợp âm RH) trên ô B — RH là giai điệu.

Vòng dạo **giọng thứ** (intro Tuấn, luôn bật): mẫu sheet i–♭VII–♭VI (Đừng Xa) / i–♭VII–♭III (Lá Thư) / i–♭VI–♭VII (Tình Em). n=3 bài, 3 thầy. Trơn chất. Cửa V. Nốt: vốn ô dạo thứ mọi thầy; phạt bậc 3 trưởng. **Chưa đo** video Tuấn.

Intro thứ: vòng mẫu buồn. **Giang thứ: vốn bài, giữ màu** (Fadd2…), cửa V — không ép `daoTruong`. Câu chạy gam tự nhiên (♭6 ♭7), nâng 7 chỉ khi V. Vốn ô giang; Cà Pháo thứ n=1 xếp sau. Trưởng: tick `daoTruong`. Màu giọng — mục đầu file.

---

## 3c. Outro Bolero Tuấn giọng thứ — soạn 9/9/2026

Cùng khung ô A/B Pùng-Pắp, cùng tầm 62–79, cùng LH bass 1+3 như mục 3. **Khác intro ở sáu
chỗ**, và cả sáu đều có số đo đứng sau.

### Vì sao KHÔNG mượn được khung intro

Intro và giang tấu đều đóng bằng **hút V** (`hutDungXa`) để kéo vào phần hát kế. Đoạn kết
thì phải **đóng bài**. Nên không chép khung intro rồi đổi mỗi ô cuối.

### Số đo — 9 đoạn kết giọng thứ, cả ba thầy

Bộ đo `tools/sheet/ket_thu.py` (có `--kiem`). Linh Nhi 4 bài · Cà Pháo 2 · Tôn Hùng 2, cộng
*Nỗi Buồn Hoa Phượng*.

| | bản ký âm | app hiện tại | lệch |
|---|---|---|---|
| **số ô** | 3–12, trung bình **8,1** | **3** | ngắn hơn 5 ô |
| **cao độ nửa sau − nửa đầu** | **+8,2** nửa cung · lên **7/9 bài** | **−3,7** · lên 7/24 lượt | **ngược dấu** |
| **mật độ nốt RH mỗi ô** | **−3,4** · thưa dần | **+0,6** · dày dần | **ngược dấu** |
| **bậc nốt chót RH** | **5**×4 · 1×2 · khác×3 | **1**×24, luôn chủ âm | cứng |
| **hợp âm cuối** | bậc 1 chỉ **4/9** · còn lại ♭3 · 2 · 4 | luôn bậc 1 | cứng |
| **mốc LH gõ một mình** | **48%** | 36% | hơi dính tay |

### Chỗ NGƯỢC VỚI TRỰC GIÁC — đọc trước khi "sửa cho hợp lý"

**Đoạn kết không lắng xuống, nó dâng lên.** Bảy trên chín bài vọt cao ở nửa sau; *Nỗi Buồn
Hoa Phượng* lên **+25,9**, *Có Em Chờ* **+22,4**. Hai bài đi xuống đều là **Tôn Hùng** (−11,9
và −7,4) — n=2, quá mỏng để thành lối riêng của thầy.

Người dùng đã nói đúng chỗ này khi trả lời phiếu chia đoạn *Nỗi Buồn Hoa Phượng*: *"vì đó là
kết bài nên chị Nhi muốn kéo dài câu hát ra giống như các ca sĩ vẫn hay làm khi biểu diễn."*

Điều này **không mâu thuẫn** với `slowClose` bên KeyTrain (`phraseCue.ts`): hàm ấy chỉ giãn
trường độ và bớt lực ở **ô chót** (4 phách cuối), không đụng cao độ. Hai thang khác nhau —
đoạn dâng lên qua cả đoạn, rồi ô chót mới chậm lại.

### Ba đoạn không lời đều dùng hợp âm TRƠN — đoạn kết cũng vậy

Đo 9/9/2026 trên toàn bộ đoạn không lời **giọng thứ** của ba thầy, đếm ký hiệu hợp âm đã gộp
các ô lặp. "Trơn" = hợp âm ba hoặc bảy cơ bản, không `add` · `sus` · `9` · `11` · `13` · `6`.

| đoạn | số hợp âm | trơn |
|---|---|---|
| dạo | 61 | **82%** |
| giang tấu | 55 | **87%** |
| **kết** | 43 | **74%** |

Riêng **Linh Nhi** thì gần như tuyệt đối: bốn đoạn dạo 100 · 100 · 100 · 88%, bốn đoạn kết
100 · 67 · 100 · 100%.

Nên câu hỏi *"theo các sheet thứ thì đoạn kết có phải hợp âm trơn giống đoạn dạo không"* có
câu trả lời là **có** — kém đoạn dạo 8 điểm, nằm trong cùng một khoảng.

Vòng bậc của các đoạn kết giọng thứ, chép nguyên:

    i - bII - V - i - bVII - V - i          Người Hãy Quên Em Đi (Cà Pháo)
    i - bVII - IV - V - i - bVII - bIII     Có Em Chờ (Cà Pháo)
    i - V - II - i                          Đừng Xa Em Đêm Nay
    V - IV - II                             Một Cõi Đi Về
    i - bVI - bVII - i - IV - bVII - i      Chiếc Lá Mùa Đông (Tôn Hùng)
    IV - V - i - bVII - bIII - i - V - bVII - V - i - IV   Rừng Lá Thấp
    IV - bVII - bVI - i                     Nỗi Buồn Hoa Phượng

> **Chỗ tôi từng lập luận sai.** Khi người dùng hỏi lần đầu, tôi trả lời rằng 74% không có
> nghĩa các thầy *rút* hợp âm về chất trơn, vì đoạn hát cũng 77% — đúng về logic, nhưng nó
> **không trả lời câu được hỏi**. Câu hỏi là *đoạn kết có trơn như đoạn dạo không*, và số đo
> nói **có**. App khi ấy cho đoạn kết lấy thẳng vốn hợp âm của bài, nên bài dùng màu thì đoạn
> kết ra **0% trơn** — lệch hẳn khỏi 74–82% của bản ký âm. Đó là lệch thật, không phải chuyện
> gu.

#### Mốc RIÊNG của tập Linh Nhi + Bolero + outro + thứ (n=3)

Codex chốt 10/9/2026: *"Chỉ rút luật từ tập Linh Nhi + Bolero của vòng này; cỡ mẫu nhỏ thì
ghi là quan sát, không biến thành hằng số cứng."* Nên tách khỏi bảng gộp chín đoạn ở trên.

Lọc đủ bốn điều kiện còn **ba bài**: *Đừng Xa Em Đêm Nay* · *Rừng Lá Thấp* · *Nỗi Buồn Hoa
Phượng*. Hai đoạn kết giọng thứ khác của Linh Nhi là **slow rock** (*Lá Thư Trần Thế*, *Một
Cõi Đi Về*) — loại khỏi vòng Bolero.

| bài | số ô | cao độ | mật độ | LH riêng | nốt chót |
|---|---|---|---|---|---|
| Đừng Xa Em Đêm Nay | 7 | **+9,4** | 0,0 | 49% | bậc 5 |
| Rừng Lá Thấp | 12 | **+7,3** | −1,8 | 41% | bậc 5 |
| Nỗi Buồn Hoa Phượng | 8 | **+25,9** | −8,3 | 46% | bậc 1 |
| **gộp** | **9,0** | **+14,2** · **3/3 đi lên** | **−3,4** | **45%** | 5×2 · 1×1 |

**Đường dâng mạnh hơn hẳn tập gộp**: +14,2 so với +8,2, và **3/3 bài** đi lên thay vì 7/9.
Hai bài đi xuống trong bảng gộp đều là Tôn Hùng — khác thầy, và một trong hai là ballad.

**n=3, đây là quan sát chứ không phải hằng số.** Đừng ép câu nào phải tăng đúng +14,2.

### Luật soạn rút ra

1. **Tám ô**, không phải ba. `DEGREES.outro = [5, 1, 1]` trong `phraseChords.ts` là luật tự
   đặt **trước khi có sheet** — số đo bác nó, xem chính sách "số đo thắng luật tự đặt".
2. **Không hút V ở cuối.** Đó là việc của intro và giang tấu.
3. **Đường dâng**: nửa sau cao hơn nửa đầu. Chỉ khẳng định **dấu**, đừng lấy +8,2 làm đích —
   chín đoạn trải từ −11,9 tới +25,9, sai số quá lớn.
4. **Thưa dần**: bớt nốt tay phải về cuối, ngược với đoạn dạo.
5. **Nốt chót đậu bậc 5 hoặc bậc 1**, đừng cứng ở bậc 1. Bậc 5 là lối chính (4/9).
6. **Hợp âm cuối không nhất thiết bậc 1** — 5/9 bài kết trên bậc khác.
7. Giữ nguyên phần đã đúng: **LH gõ riêng 36%** chưa lệch xa mốc 48%, và ô chót vẫn để
   `slowClose` giãn ra như hiện nay.

### Cỡ mẫu — nói thẳng chỗ mỏng

- **0 bản ký âm của thầy Tuấn.** Sáu luật trên đo từ sheet **ba thầy khác**, giống hệt cách
  intro Bolero Tuấn được dựng (mục 3). Đây là **luật app**, không phải lối chơi của Tuấn.
- Chín đoạn kết, nhưng độ lệch rất lớn ở mọi cột. Chỉ dấu là chắc, độ lớn thì không.
- Cà Pháo và Tôn Hùng mỗi thầy **2 bài** — đừng rút lối riêng từng thầy ở đây.
- **Chưa ai nghe** đoạn kết thứ do app soạn. Sáu luật trên chưa qua tai người dùng.

Bàn đo phía app: `KeyTrain/src/reharm/style/__tests__/ketThuTuan.test.ts`, in cả sáu con số
mỗi lần chạy. Hai khẳng định đang **đỏ** — đường dâng và thưa dần — và đó là đỏ thật.

---

## 4. Khác Linh Nhi — một hàng

| | Tuấn Lưu | Linh Nhi |
|---|---|---|
| đệm hát | Pùng-Pắp, RH dập đảo phách | LH rải 1-5-8-10, RH không dập |
| họ | Bolero (cùng họ, khác kiểu) | Bolero |
| sheet solo | **0** | 7 bài |
| intro app | ô A/B Pùng-Pắp + 2 câu chạy | rải + tuyến sheet |
| giang app | cùng khung, 12 ô, 5 câu chạy + hút V | tuyến giang / rải |

Kho giữ cả hai. Chỗ khác nhau là thứ đáng học.

---

## 5. Chưa đo — đừng bịa

- Tâm cao độ / nốt/ô / LH một mình của **chính thầy Tuấn**
- Intro / giang / kết trên video (chỉ có bài giảng đệm)
- Tango ngoài 1 cell tester
- Giọng trưởng trên video Bolero

---

## 6. Mốc #550 — intro thứ đã ổn và cách dựng (9/9/2026)

Đây là luật **APP Bolero Tuấn**, không phải phép đo solo của thầy Tuấn: kho hiện vẫn có
**0 sheet solo Tuấn**. Nguồn câu là Cà Pháo, còn khung đệm là cell Bolero Tuấn.

### Kết quả nghe

- #550 · *Để Nhớ Một Thời Ta Đã Yêu* · La thứ · `danhGia: on`.
- 8 ô chính + ô hút; vòng `Am–Dm–Am–Dm–Am–Dm–Am–E` = i–iv lặp rồi V.
- Nguồn nhất quán: Cà Pháo — *Người Hãy Quên Em Đi*, Rê thứ/Bossa Nova.
- Chuyển nguồn theo bậc và khoảng cách so với chủ âm sang La thứ; không sao chép tên hợp
  âm hay MIDI tuyệt đối.
- Giữ timing/tay trái Bolero Tuấn. Không nhập timing Bossa Nova từ sheet nguồn.
- Ô 1 phát tuyến giai điệu; ô 2 luôn Pùng-Pắp. Không cho Pùng-Pắp và câu chạy tự sinh chen
  cùng một ô — lỗi này từng bị chỉ rõ ở #542.

8 ô đầu #550 có 66 onset RH (8,25/ô), tâm khoảng MIDI 70,5, bước nhỏ ≤2 bán cung 55%,
nhảy ≥7 là 12%, lặp nốt 12%; mật độ `9–4–10–10–4–10–9–10`. Các số này dùng để đối chiếu,
không ép mọi câu tương lai giống hệt.

### Chuỗi phản hồi đã dẫn tới #550

- #536: phô và gãy ở Am thứ ba.
- #538: tiết tấu/kỹ thuật hay nhưng giai điệu quá sáng.
- #540: đầu câu phải ưu tiên Pùng-Pắp.
- #542: không trộn Pùng-Pắp với nốt giai điệu trong cùng ô.
- #544 và #550: Đã ổn.
- #546: đúng màu/nhịp nhưng quá sơ sài, thiếu độ phong phú và câu chạy.
- #552: nhãn vẫn **Chưa ổn**; bình luận nói đã đúng tinh thần tự soạn, đúng nhịp và màu
  thứ nhưng cần học thêm để nghe hay như các thầy.

Vì #538 và #544 có thể cùng loại vòng mà kết quả nghe khác nhau, vòng hợp âm không giải
thích hết chất lượng. Phải giữ cả contour, mô-típ, độ thưa–dày, chỗ nghỉ và cách giải bước
nhảy.

### Luật thay phần cũ khi sinh intro thứ

1. Chọn một source minor duy nhất cho cả intro; take khác mới được đổi Linh Nhi/Cà Pháo/
   Tôn Hùng. Không trộn nguồn theo ô.
2. Dùng hợp âm chính từng ô của source, đổi sang bậc ở giọng đích; nếu ô đầu source không
   ở i thì buộc mở bằng i, ô cuối vẫn cửa V.
3. Dùng contour/pitch-relative-to-tonic của đúng source, qua cổng gam thứ; bậc 7 nâng chỉ
   phục vụ V.
4. Sau đó mới đặt câu vào cell Bolero Tuấn: bar 1 melody, bar 2 Pùng-Pắp, các bar sau giữ
   phân vai A/B; không lai hai vai trong một bar.
5. Chấm màu thứ và độ liền câu, rồi cho người dùng nghe. Mỗi vòng chỉ một thầy + một điệu.

Phương pháp này sẽ được mở sang giang tấu/outro theo từng loại đoạn, nhưng không lấy ô intro
làm corpus thay thế. Chưa có kết quả nghe thì chưa ghi “đã học xong”.

---

## 7. Hiệu lực từ 10/9/2026 — cách soạn intro và outro giọng thứ trong app

Mục này **thay các điểm mâu thuẫn** ở §3c và các bàn đo cũ: các đoạn đó là nhật ký thí
nghiệm, không phải giấy phép ép mọi câu lên lưới 7 điểm hay ép mọi outro dâng/thưa theo trung
bình. Thầy Tuấn vẫn có **0 sheet solo**; đây là luật KeyTrain ghép *đệm Tuấn* với bằng chứng
solo thứ của các sheet khác, không được nói là đã học solo của thầy Tuấn.

### A. Intro thứ — khuôn đã có benchmark nghe #550

1. Giữ giọng đích là thứ: chuyển hợp âm và cao độ theo **bậc so với tonic**, không dán tên
   hợp âm/MIDI của sheet. Gam tự nhiên là nền; bậc 7 chỉ nâng khi hợp âm V thật sự cần.
2. Chọn **một source minor nhất quán cho cả câu**. Học contour, mô-típ, nốt neo và cách giải
   từ source; không chọn từng ô “hay nhất” ở nhiều thầy. Nếu học cao độ từ Cà Pháo Bossa thì
   không bê groove Bossa sang Tuấn.
3. Dùng khung Bolero Tuấn cho tiết tấu/đệm: ô A là Pùng-Pắp hai tay, ô B là LH bass + RH
   melody. Ô đầu cho melody vào câu, ô cuối làm cửa V/hút vào phần hát. Không để Pùng-Pắp
   và melody/câu chạy cùng nói trong một ô.
4. Câu chạy là một thủ pháp ngắn có chủ đích, không phải cách vá mật độ. Nó phải phục vụ
   hướng về V/hát; nếu câu đã đủ, không thêm run chỉ để nghe “phong phú”.
5. #550 là benchmark nghe, không phải mẫu số: `Am–Dm–Am–Dm–Am–Dm–Am–E`, 8 ô + hút V, nguồn
   cao độ Cà Pháo nhưng timing/lh là Bolero Tuấn. Câu mới phải giữ màu buồn, đường nét và
   nhịp câu; không cần sao chép đúng mật độ/nốt của #550.

### B. Outro thứ — cú pháp kết riêng, mới qua kiểm chứng kỹ thuật

Outro không phải intro thay ô cuối. Không hút V, không dùng lịch ô A/B hoặc run intro làm
khung mặc định. Trước khi tạo câu, chọn một **tiểu cú outro liên tiếp** từ cùng `source.id`
đúng `thầy + điệu + section + giọng`; trong vòng Bolero này chỉ nhận Linh Nhi + Bolero +
outro + thứ.

1. Lấy **cả hòa âm lẫn melody** từ tiểu cú đã chọn. Chuyển nó sang chủ âm bài đích theo bậc
   và chất. Bài đích thiếu chức năng cần thiết thì loại tiểu cú, không thay bậc gần nhất.
2. Giữ nghỉ, onset, chia nhỏ phách, contour và quan hệ tension–resolution của nguồn. Không
   dùng lưới Pùng-Pắp để đẩy từng nốt solo vào vị trí gần nhất: phép đó có thể đảo thứ tự,
   bỏ nhịp móc và làm câu gãy.
3. Cell Tuấn vẫn chạy dưới câu: bass/Pùng giữ pulse; RH Pắp chỉ đáp ở khe nghỉ thật của
   melody, không đè hợp âm lên nốt đang ngân. Khi hợp âm đổi giữa ô, cell phải giữ pha toàn
   đoạn, không khởi động lại ở mỗi hợp âm.
4. Cadence vòng thử: cuối tiểu cú về `i`, nốt melody chót thuộc `1/b3/5`, sau đó cue/close
   chỉ giãn trường độ và lực. Đây là tiêu chí chọn ứng viên hiện tại, không phải công thức
   duy nhất cho mọi outro thứ.
5. Chỉ đổi tonic và dời **toàn tiểu cú** ±8va nếu vừa tầm. Cấm gập từng nốt, xóa nốt để ép
   mật độ, nâng riêng nửa sau, hoặc đổi nốt cuối chỉ để test thống kê xanh.
6. Không có ứng viên tương thích thì app phải nói rõ và bỏ outro ở lượt đó. Không được rơi
   về thầy/điệu khác hoặc sinh câu dự phòng mà không ghi nguồn.

Mẫu kỹ thuật hiện tại: `noi-buon-hoa-phuong-outro`, phần `o4` index 1–4, đổi Dm → Am:
`Dm | G → F | F | Am`. Phải dùng `o4` vì có ô 8 phách. Bảng `Đừng Xa Em Đêm Nay` hiện làm
mất một ô 6 phách và rút `Edim` sai chất, nên tạm không dùng làm nguồn sinh cho tới khi sửa
bộ trích xuất và có hồi quy bảo vệ các intro đã ổn.

### C. Ranh giới: chuyển soạn khác tự sáng tác

Hai phương pháp trên hiện là **chuyển soạn có kiểm soát**: giữ câu nguồn, đổi chức năng/chủ
âm/tầm và ghép với đệm Tuấn. Nó không đủ để tuyên bố KeyTrain đã tự soạn hay như các thầy.

Để tự sáng tác sau này, phải rút riêng từ sheet thứ: motif đầu/cửa/cadence, nốt neo theo hợp
âm, loại tension và điểm giải, khoảng nghỉ, độ dày và biến thể tiết tấu. Sau đó thiết kế một
tiểu cú mới từ các thành phần cùng thầy/điệu/màu, lưu dấu vết biến đổi và cho người dùng
nghe một lô nhỏ. Không chắp vá từng ô của các thầy và không dùng số trung bình làm luật hay.
