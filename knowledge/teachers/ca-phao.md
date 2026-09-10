# Cà Pháo — thầy, đọc file này trước khi nói trong vai thầy ấy

`id: ca-phao` · đặt cạnh `ca-phao.json` · nguồn `ca-phao-piano-covers`

File này **chính là thầy Cà Pháo**, giống cách `linh-nhi-piano.md` là thầy Linh Nhi. Mỗi
lần nói trong vai thầy ấy thì **đọc đây trước**, đừng dựng lại bằng phép đo mới — vừa chậm
vừa có thể ra con số khác con số đã chốt mà không ai để ý.

---

## NGUYÊN TẮC — câu solo là thứ được SOẠN

Áp cho mọi thầy, không riêng ai:

> *"Các câu solo giờ là phải soạn ra để chơi chứ không sinh ngẫu nhiên nữa, bộ sinh hãy
> sửa thành bộ soạn."*

Soạn theo **tư duy của chính thầy này**, rút từ bản ký âm của chính thầy này: vòng hợp âm,
cách hoà hợp hai tay, tuyến giai điệu, tiết tấu. Ba bước — **học → mô phỏng → sáng tạo** —
đi đúng thứ tự, không nhảy cóc.

Luật soạn nốt dùng chung nằm ở `knowledge/LUAT-SOAN-NOT.md`. File này chỉ ghi **cái riêng
của Cà Pháo**, và ghi rõ chỗ nào anh ấy khác hai thầy kia.

---

## 1. Kho bản ký âm — 4 bài

Ở `video/Ca_Phao/`, đã chia đoạn trong `tools/sheet/corpus.json`.

| bài | thể loại | giọng | ô | đoạn dạo | giang tấu | đoạn kết |
|---|---|---|---|---|---|---|
| Hồng Kông 1 | **ballad** *(người dùng sửa 10/9/2026, trước ghi bossa nova)* | Đô trưởng | 107 | 1–15 | 47–65 | 100–107 |
| Người hãy quên em đi | bossa nova | Rê thứ | 104 | 1–8 | 41–48 | 96–104 |
| Có Em Chờ | ballad | Mi giáng trưởng | 72 | 1–8 | 48–55 | 66–72 |
| Ngày mai em đi | ballad | Mi giáng trưởng | 91 | 1–18 | 51–54 | 87–91 |

**1 bossa nova · 3 ballad** — và **3 trưởng · 1 thứ**. Cà Pháo là thầy duy nhất trong ba
người có bài bossa nova — đúng **một** bài, *Người hãy quên em đi*.

> **Hồng Kông 1 là ballad, không phải bossa nova** — người dùng sửa 10/9/2026. Nhãn bossa nova
> ghi từ lúc nạp kho (`1891a73`) và không có căn cứ đo. Số đo nghiêng về ballad: tay trái
> *"gõ gần như móc đơn đều"* (KeyTrain `bossaCaPhao.test.ts` đã loại bài này khỏi mẫu đệm bossa
> từ trước), hợp âm `major`×14 · `sus4`×9 chứ không phải vốn mở rộng. Mọi câu trong file này
> từng gộp Hồng Kông 1 vào "bossa" phải đọc lại với nhãn mới; các chỗ đã sửa được đánh dấu.

### Ba bản KHÔNG nằm trong cỡ mẫu

| bản | vì sao |
|---|---|
| **Yêu là tha thứ** | 85 ô mà **không có một ký hiệu hợp âm nào**. Không suy được giọng, không góp gì cho luật nốt hợp âm. Người dùng chốt để sau, học chung với Tuyết Rơi. |
| **Sao anh chưa về** | chưa chia đoạn; xếp riêng, học sau |
| **Mơ** | corpus từng khai có đoạn dạo và giang tấu mà **không có file** — đã xoá khỏi corpus |

### Hai cái bẫy trong chính kho này

**Bộ dấu hoá của "Ngày mai em đi" GHI SAI trong file.** File ghi 2 giáng (Si giáng trưởng)
trong khi toàn bộ hợp âm điệu thuộc **Mi giáng trưởng** (`Eb Fm Gm Ab Bb Cm`), mọi đoạn mở
bằng `Eb` kết bằng `Bb`, cả bài kết `Eb`. Suy giọng bằng `<fifths>` là hỏng ở bài này.

**Đoạn kết "Có Em Chờ" CHUYỂN GIỌNG.** Cả bài ở Mi giáng trưởng nhưng đoạn kết sang **Đô
thăng thứ** — hợp âm `Dbm7 · B13 · Gbm7 · Abm7 · E`. Đo bằng gam Mi giáng thì ra **63% nốt
ngoài gam (32/51)**, một mình đoạn ấy chiếm hơn một phần ba số nốt ngoài gam của cả kho.
Đo bằng gam đúng thì còn **2%**. Đã ghi ở `sections.outro.giong` trong corpus — phép đo
phải lấy giọng của **đoạn**, không lấy giọng của bài.

---

## 2. Số của riêng Cà Pháo

Đo trên **828 nốt giai điệu** ở các đoạn solo (dạo · giang · kết), chỉ lấy nốt cao nhất mỗi
mốc gõ ở khuông tay phải, bỏ đuôi nốt nối.

| | Cà Pháo | Linh Nhi | Tôn Hùng |
|---|---|---|---|
| số nốt trong cỡ mẫu | **828** | 1045 | 296 |
| **nốt hợp âm** | **70,8%** | 63,6% | 73,0% |
| **ngoài gam** | **4,7%** | 1,8% | 1,0% |
| lặp lại nốt | 5% | — | 3% |
| bước liền bậc | 31% | — | 32% |
| nhảy ≥ 3 nửa cung | 65% | — | 66% |

### Hai nét riêng đọc ra từ bảng này

**Cà Pháo đi xa gam nhất trong ba thầy — 4,7% so với 1,8% và 1,0%.** Đây là thầy chấp nhận
nốt ngoài gam nhiều nhất. Soạn theo anh ấy thì đừng siết về gam như soạn theo Tôn Hùng.

**Nhưng lại bám hợp âm chặt hơn Linh Nhi — 70,8% so với 63,6%.** Hai chuyện không mâu
thuẫn: nốt của anh ấy nằm trên hợp âm nhiều hơn, mà khi rời hợp âm thì rời xa hơn.

> Đừng lấy con số gộp ba thầy (67,7%) mà soạn cho một thầy. Luật chung chỉ là **khoảng
> 60–75%**; chỗ đứng trong khoảng ấy mới là nét riêng.

### Bậc so với GỐC HỢP ÂM — anh chọn nốt nào khi hợp âm nào đang vang

Đo bằng `tools/sheet/bac_not.py`.

| chất hợp âm | n | các bậc anh dùng |
|---|---|---|
| trưởng | 422 | `3`20% `5`19% **`9`15%** `7`12% `1`12% **`13`10%** `11`5% |
| thứ | 282 | `♭3`20% `5`19% **`♭7`19%** **`11`13%** `1`8% `9`8% |
| át | 66 | `5`21% `3`17% `11`12% `♭7`11% **`♭13`9%** `9`9% `13`8% |
| treo (`sus`) | 47 | `1`19% `5`19% `11`17% `13`13% `♭7`13% `9`11% |

Ba nét riêng:

1. **Trên hợp âm trưởng anh dùng `9` và `13` nhiều nhất trong ba thầy** — 15% và 10%, cộng
   lại một phần tư số nốt. Linh Nhi 11% và 6%. Từng gọi đây là "tiếng bossa" — nay chỉ còn
   một bài bossa nên câu ấy chưa đứng; số đo gộp cả bốn bài, chưa tách theo điệu.
2. **Trên hợp âm thứ, bậc `11` chiếm 13%** — cao nhất trong ba thầy, và khớp với vốn hợp âm
   `Dm11 · Gm11 · A11` ở mục 3 bên dưới. Bậc `♭7` cũng 19%, tức anh chơi thẳng lên hợp âm
   bảy chứ không dừng ở ba nốt.
3. **Trên hợp âm át anh dùng `♭13` 9%** — màu altered. Linh Nhi chỉ 5%. n=66, mỏng.

Điểm 1 và 2 đã qua **phép kiểm chéo bậc gam**: nốt `9` trên hợp âm trưởng rơi vào bậc gam
`5`×26 và `9`×29, nốt `13` rơi vào `9`×28 · `13`×10 · `3`×6 — trải rộng, nên là **lựa chọn
màu thật** chứ không phải hệ quả tự động của chức năng hoà thanh.

> **CHỖ KHÔNG ĐƯỢC DÙNG ĐỂ TÁCH ANH VỚI LINH NHI.** Bậc `11` trên hợp âm át: anh 12%, chị
> 27%. Nhìn thì như hai lối khác nhau, nhưng **7/8 nốt của anh và 25/25 nốt của chị đều là
> CHỦ ÂM của bài** — hợp âm át đứng ở bậc V nên chủ âm tự động đọc ra thành bậc 11. Cả hai
> thầy đang làm cùng một việc; chênh lệch chỉ nói ai đánh chủ âm nhiều hơn.

Trên hợp âm **trưởng** thì bậc `11` chỉ 5% — anh cũng tránh, đúng luật avoid-note chung
(luật 9 trong `LUAT-SOAN-NOT.md`).

**Nốt `♭9`: 9 nốt, 5 trong số đó nằm trong gam bài.** Ít nhưng có thật (2,1% trên hợp âm
thứ và trên hợp âm treo) — đừng viết là anh không đánh `♭9`. Bốn nốt còn lại nằm ngoài gam,
đúng với việc anh là thầy đi xa gam nhất.

### Nốt ngoài hợp âm anh xử lý thế nào

n=276 nốt ngoài hợp âm ở các đoạn solo:

| liền bậc | quãng ba | nhảy ≥5 | đổi quãng tám | lặp | nốt kế là nốt hợp âm |
|---|---|---|---|---|---|
| 37,7% | 14,9% | 35,9% | 6,5% | 3,3% | **58,3%** |

38 nốt ngoài gam của anh dồn vào `♭7`×10 `♭5`×9 `♭9`×7 `♭3`×7 — **nốt xanh**, và chỉ
**36,8%** có bước liền bậc cả hai bên. Tức anh **không** dùng chúng chủ yếu như nốt lướt;
gần hai phần ba số nốt ngoài gam được vào hoặc ra bằng một bước không liền bậc.

---

## 3. Vốn hợp âm — jazz hơn hai thầy kia

Chất hợp âm ở các đoạn solo, đếm theo từng bài:

| bài | chất hay dùng |
|---|---|
| Hồng Kông 1 | `major`×14 · **`suspended-fourth`×9** · `minor`×7 · `dominant`×4 |
| Người hãy quên em đi | **`minor-11th`×8** · `minor-ninth`×3 · `dominant-11th`×3 · **`half-diminished`×3** |
| Có Em Chờ | **`minor-seventh`×13** · `major-seventh`×8 · `dominant-13th`×2 |
| Ngày mai em đi | `major`×15 · `minor-seventh`×6 · `major-seventh`×2 |

**Bài bossa nova duy nhất dùng hợp âm mở rộng dày đặc**, ba bài ballad trơn hơn — Hồng Kông
1 với `major`×14 · `sus4`×9 nằm hẳn về phía ballad, thêm một bằng chứng cho nhãn mới. Người hãy
quên em đi đi hẳn vào vốn jazz: `Dm11 · Gm11 · A11 · Em7(b5)`, và kết bài bằng `DM9` — tức
bậc ba Picardy trên một bài giọng thứ.

**Hồng Kông 1 nghiêng về hợp âm treo**: 9 trên 40 ký hiệu ở đoạn solo là `sus4`, gồm cả
`G7sus4/D` và `Csus4/G`. Đó là chất đặc trưng của **bài này**, chưa đủ cơ sở gọi là chất
của cả thầy.

### Ký hiệu thể đảo viết bằng số mũ

Hồng Kông 1 là **bản duy nhất trong cả kho** ghi thể đảo bằng số mũ: `C¹/E` nghĩa là
`C/E`. Đo 14 chỗ — `¹` luôn có bass cách gốc 4 nửa cung (đảo 1), `²` luôn cách 7 (đảo 2),
14/14 không ngoại lệ. Bộ đọc từng đọc ra `kind=other` rồi rơi về hợp âm ba trưởng; may là
chất thật đúng bằng cái mặc định ấy nên số đo không lệch, chỉ **tên** hợp âm sai.

---

## 4. Hai tay — và chỗ Cà Pháo khác hẳn hai thầy kia

Nốt tay phải mỗi ô · số lần tay trái vào mỗi ô · tâm cao độ tay phải:

| bài | đoạn dạo | giang tấu | đoạn kết |
|---|---|---|---|
| Hồng Kông 1 | 5,7 · trái 4,1 · tâm A4 | **8,7** · trái 5,5 · tâm B4 | 5,2 · trái 3,4 · tâm Eb4 |
| Người hãy quên em đi | 7,8 · trái 4,4 · tâm G4 | 7,1 · trái 5,2 · tâm G4 | 4,1 · trái 2,4 · tâm G4 |
| Có Em Chờ | 8,8 · trái **8,0** · tâm Ab4 | **10,4** · trái 7,5 · tâm G4 | 7,3 · trái 4,9 · tâm E4 |
| Ngày mai em đi | 6,2 · trái 5,9 · tâm Bb4 | 8,2 · trái **9,0** · tâm F4 | 6,2 · trái 6,2 · tâm F4 |

### TẦM ÂM: Cà Pháo chơi solo THẤP hơn hẳn

**Tâm tay phải ở đoạn solo, gộp 4 bài: midi 67 — nốt Sol quãng 4.** Thấp nhất 50, cao
nhất 105.

So với **Tôn Hùng midi 74 (Rê 5)**, và neo của Linh Nhi trong KeyTrain là **73,6**. Tức Cà
Pháo chơi câu solo **thấp hơn hai thầy kia khoảng một quãng năm**.

> **Hệ quả cho KeyTrain.** Hằng số `TAM_TAY_PHAI = 73.6` đo trên 7 sheet Linh Nhi. Soạn
> câu theo Cà Pháo mà vẫn dùng neo ấy thì câu **cao hơn thầy thật một quãng năm**. Cần một
> neo riêng cho anh ấy — 828 nốt, 4 bài.
>
> **ĐÃ LÀM.** KeyTrain nay có neo riêng cho từng thầy — xem mục ngay dưới.

#### Neo cho ĐOẠN DẠO là 70,8 và 68,0 — KHÔNG phải 67

**Đừng lấy con số 67 ở trên làm neo cho đoạn dạo.** Nó là tâm gộp **cả ba đoạn solo** (dạo ·
giang · kết) trên 828 nốt. Bộ soạn câu dạo cần tâm của **riêng đoạn dạo**, và hai con số ấy
lệch nhau gần bốn nửa cung. Hai mẫu số khác nhau — đây đúng dạng bẫy *"so hai con số khác
mẫu số"*.

Đo riêng đoạn dạo, tách trưởng/thứ:

| | tâm | các bài |
|---|---|---|
| **giọng trưởng** | **70,8** | Hồng Kông 1 70,7 · Có Em Chờ 71,5 · Ngày Mai 70,4 — n=263, rất chụm |
| **giọng thứ** | **68,0** | *Người hãy quên em đi* — **n=62, MỘT bài** |

So với Linh Nhi (75,3 trưởng · 73,2 thứ): Cà Pháo thấp hơn **4,5 nửa cung ở giọng trưởng** và
**5,2 ở giọng thứ**.

> **Cỡ mẫu mỏng ở giọng thứ.** Chỉ một bài. Nghe thấy sai thì kiểm con số này trước.
>
> Đo 6/9/2026 (giong BÀI): solo thứ n=1 bài, 27 ký hiệu — min 56% · **dom 26%** (trưởng 9%) ·
> nốt hợp âm RH **83,6%** (trưởng 62,3%). Anh **không** rời hợp âm như Linh Nhi. Chiều buồn
> đo được: át nhiều + tầm thấp.
>
> **Người dùng chốt 7/9/2026:** man mác buồn = không chắc + chỗ kéo. Ở anh, **kéo** đo được
> (át, tầm thấp); **không chắc** thì n=1 làm ngược chị — đừng lấy luật rời.
>
> Và một chỗ phải nói trước: KeyTrain dời cả câu đi **bội số của 12**, nên tâm dựng ra là
> **71,0** chứ không phải 68,0 — sai số tối đa của phép dời quãng tám là nửa quãng tám.
> Muốn sát hơn thì phải nắn từng nốt. **Đính chính 9/9/2026:** câu "nắn nốt đã bị bác bốn
> lần" là ghi chép của agent, **không có trích dẫn nguyên văn nào** của người dùng đứng sau.
> Thứ họ thật sự bác là *rút luật ra rồi sinh nốt*. Khi được hỏi thẳng, họ nói: *"thấy cần
> nắn nốt thì nắn đi."* Nên nắn một nốt có bằng chứng thì được — đừng viện câu ấy để từ chối.

### Bài trưởng của anh SÁNG BẰNG TẦM ÂM — khác hẳn Linh Nhi

Đo các đoạn solo, tách theo giọng của bài:

| | tâm tay phải | trần trung bình |
|---|---|---|
| **bài giọng trưởng** | **70,0** | **94,0** |
| bài giọng thứ | 66,3 | 85,0 |

Bài trưởng cao hơn bài thứ **3,7 nửa cung ở tâm** và **9 nửa cung ở trần**. Linh Nhi thì
gần như không đổi (75,4 so với 74,0, trần còn thấp hơn một chút) — nên **đây là nét riêng
của Cà Pháo**, không phải luật chung.

### Vốn hợp âm ở đoạn solo đổi hẳn theo giọng bài

| | các chất |
|---|---|
| **bài giọng trưởng** | maj **54%** · min 26% · **sus 14%** · dom 7% (n=138) |
| bài giọng thứ | min 61% · **dom 24%** · maj 15% (n=54) |

Hai chỗ đáng chú ý: **hợp âm treo chỉ xuất hiện ở bài trưởng** (14% so với 0), và **hợp âm
át gấp hơn ba lần ở bài thứ** (24% so với 7%).

Linh Nhi cũng tránh hợp âm át ở bài trưởng, còn mạnh hơn: **2% so với 11%**. Đây là chỗ
**hai thầy giống nhau** — có lẽ là luật chung, nhưng mới hai thầy nên chưa chốt.

> **NHƯNG NỐT THÌ KHÔNG ĐỔI.** Giữ nguyên chất hợp âm rồi so, bậc tay phải chọn ở bài
> trưởng gần như trùng khít bài thứ. Cái đổi là **hợp âm nào được dùng** và **ngồi ở tầm
> nào**, không phải nhặt nốt nào trong gam. Xem mục bẫy đo trong `LUAT-SOAN-NOT.md`.

### Đoạn kết luôn thưa nhất và thấp nhất

**4/4 bài** có tay trái ở đoạn kết thưa hơn hoặc bằng đoạn dạo: `3,4 < 4,1` · `2,4 < 4,4` ·
`4,9 < 8,0` · `6,2 ≈ 5,9`. Và **4/4 bài** có tâm cao độ đoạn kết **thấp hơn** đoạn dạo. Kết
bài thì buông xuống, cả về độ dày lẫn độ cao.

### Giang tấu là chỗ DÀY nhất

**3/4 bài** có giang tấu dày hơn đoạn dạo ở tay phải: `8,7 > 5,7` · `10,4 > 8,8` ·
`8,2 > 6,2`. Ngoại lệ là Người hãy quên em đi (`7,1 < 7,8`).

Đây là chỗ **ngược hẳn Linh Nhi** — chị ấy rút thưa ở đoạn solo, còn Cà Pháo dồn dày nhất
vào giang tấu.

---

## 5. Tuyến giai điệu — chép nguyên từng nốt

Đây là **vật liệu để ghép**, không phải thống kê để dựng lại. Mỗi dòng là một ô nhịp: số
ô, ký hiệu hợp âm trong ô, rồi từng mốc gõ ghi `phách:nốt`. Chỉ lấy nốt cao nhất mỗi mốc ở
khuông tay phải; đã bỏ nốt láy và đuôi nốt nối.

```
### Hồng Kông 1 — intro (ô 1-15)
  ô1    FMaj7            0:A4 1.5:A4 2:E5 3:G4 4:C5
  ô2    ·                2.5:A4 3:C5 3.5:D5 3.75:A4 3.875:Bb4
  ô3    G                0:D4 1.5:B4
  ô4    ·                1.5:G4 2:B4 2.5:C5 3:B4 3.5:G4
  ô5    Dm7 Am7/C        0:C4 1.5:A4 2:E5 3:F4 4:C5
  ô6    Csus4/G F        2:C4 3:B4
  ô7    Cadd9 Em/G       0:D4 1.5:G4 2:E4 3:D4 4:G4
  ô8    Gsus4/C          2:D4 2.5:E4 3:G4 3.5:A4
  ô9    Am/C             0:E4 1:C5 2:D5 2.5:A4 3.5:E5 4:G5
  ô10   F Am/C           0.5:C5 1.5:A5 1.75:E5 1.875:A5 2:E5 2.667:E6 3.333:C6
  ô11   ·                0:D5 1:D6 1.5:B5 2:G5 2.5:G4 3.5:D5 4:G4
  ô12   ·                0.5:D4 2:D6 2.25:C6 2.5:B5 2.75:G5 3:D5 3.25:C5 3.5:B4 3.75:G4
  ô13   G7sus4/D Fadd9/A 0:C4 1:A4 1.5:F4 2:C5 3:G4 3.25:A4 3.5:C5 3.75:D5
  ô14   G7sus4           0:F4 1:F5 1.5:F4 2:D5 2.5:F4 3.5:C5 3.75:E4 3.875:G4
  ô15   C                0:E4 1:C5 2:G4 2.5:D4 3:E4 3.5:Bb3 4:G4

### Hồng Kông 1 — interlude (ô 47-65)
  ô47   C                1:E4 2:G4 2.25:E4 2.5:G4 3:A4
  ô48   C7               0.5:E4 1:G4 1.25:A4 1.5:C5 2:D5 2.5:C5 2.75:D5 3.25:E5 3.75:G5
  ô49   Fmaj7            0.5:E5 0.75:G5 1:E5 1.5:D5 1.75:E5 2:D5 2.5:C5 2.75:D5 3:C5 3.75:A4
  ô50   Fmaj7            0.5:G4 0.75:A4 1:G4 1.5:E4 1.75:G4 2:E4 2.75:A3 3:C4 3.25:D4 3.5:E4 3.75:G4
  ô51   G                0:G3 0.75:D4 1:D4 1.625:D4 1.75:G4 1.875:A4 2:B4 2.125:D5 2.25:G5 2.375:A5 2.5:B5 2.625:D6 2.75:G6 2.875:A6 3:B6
  ô52   G                1.5:B6 1.75:C7 2:D7 2.25:C7 2.5:B6 2.75:G6 3:D6 3.25:C6 3.5:B5 3.75:C6
  ô53   Dm7              0:C6 0.75:A5 2:A5 2.333:E5 3:E5 3.333:F5 3.667:F#5
  ô54   G                0:G5 0.75:E5 1.5:C5 1.75:F5 2:E5 2.25:C5 2.5:G4 2.75:F4 3:E4 3.25:D4 3.5:E4 3.75:F4
  ô55   C                0:E4 0.75:G4 1:E4 1.5:D4 2:G4 2.25:E4 3:A4 3.75:C5
  ô56   C7               0.5:E4 2:D5 3:E5 3.5:G5
  ô57   F                0:A4 0.5:A5 0.75:G5 1.25:D5 1.5:E5 2:C5 2.25:D5 2.75:A4 3:C5 3.5:G4 3.75:A4
  ô58   F                0.25:E4 0.5:G4 1:D4 1.25:E4 1.75:C4 2:D4 3:A3 3.25:C4 3.5:D4 3.75:E4
  ô59   Em               0:G3 0.75:D4 1:G4 1.5:G4 2:B4 2.25:B4 3:D5 3.75:G5 4:A5
  ô60   A7b9             0.5:Bb4 1:Bb5 1.25:A4 2:A5 3:G5 4:A5
  ô61   Dm F/C           0:G4 0.75:E5 1:C5 1.5:F4 2:A4 2.5:G4 2.75:A4 3:C5 3.5:A4
  ô62   C/E              0:G4 0.75:C5 1:C5 1.5:G4 1.75:C5 2:F5 2.25:E5 2.5:C5 2.75:G4 3:F4 3.25:E4 3.5:D4 3.75:C4
  ô63   Csus4/F Csus4    0:C4 1:A3 1.5:C4 2:G4 2.5:A3 3.5:C4 4:D4
  ô64   Gsus4            3:C5 3.5:D5 3.75:A4 3.875:C5
  ô65   Fadd9/G          0:A4 1.5:G5 2:C6 3:C6 3.5:D6 4:E6

### Hồng Kông 1 — outro (ô 100-107)
  ô100  C/E              0:C4 0.5:C5 0.667:G4 0.833:C5 1:F#4 1.5:C4 1.667:G4 1.833:C5
  ô101  Csus4/G          0:F4 0.5:C4 0.75:A3 0.875:Bb3 1:B3 1.333:C4 1.667:D4
  ô102  Dsus4/A          0:G4 0.333:G3 0.667:D4 1:C#4 1.333:D4 1.667:E4
  ô103  Fm/Ab            0:F4 0.333:Ab3 0.667:C4 1:B3 1.5:C4
  ô104  Ddim7            0:D3 1.75:D4 1.833:A3 1.917:B3
  ô105  Amadd9/C         0:E3 1:E4
  ô106  ·                0:A4 0.25:D5 0.5:A5 0.75:F#5 1:D6 1.25:A6 1.5:F#6 1.75:D7
  ô107  D7/C             0:A6 2:A7

### Người hãy quên em đi — intro (ô 1-8)
  ô1    Dm9              0:F4 1:E5 2:C5 2.5:A4 3:F4 3.5:A3 4:F4
  ô2    Gm11             1:A3 1.25:Bb3 1.5:D4 1.75:F4 2:A4 2.5:G4 3.5:A4 3.75:C5
  ô3    Dm11             0:G4 1:F4 1.5:E4 2:F5 2.25:E5 2.5:C5 2.75:G4 3:A4 3.5:F4
  ô4    Gm11             0.5:G4 0.625:D5 0.75:G4 0.875:F4 1:G4 2:A4 2.5:C5 3:D5 3.5:F4 4:E5
  ô5    Dm9              1:A4 1.5:F5 2:E5 2.5:C4 3.5:C5 4:A4
  ô6    Gm11             0.5:G4 1.333:A4 1.667:Bb4 2:C5 2.75:Bb4 3.333:A4 3.667:G4
  ô7    Dm11 Gm7         0:G4 0.75:F4 1.5:G4 1.667:Ab4 1.833:A4 2:E4 3:C4 3.5:Bb3 4:D4
  ô8    A11              1:Bb3 1.5:D4 2.5:F4 3:D5 3.5:E5 4:F5

### Người hãy quên em đi — interlude (ô 41-48)
  ô41   Dm               1:C4 1.5:A4 2.5:C4 3.5:A4 4:A4
  ô42   F#(#5)/Eb        1.5:A4 2:A3 3:G4 4:G4
  ô43   Dm11             0:C4 1:G4 1.75:G4 2:G4 2.5:C4 3.5:G4 4:F4
  ô44   Em7(b5) A7       0.25:Bb3 0.5:F4 1:Bb3 1.5:F4 2.25:A3 3:E4 3.5:E4 3.75:A3
  ô45   Dm9              1:C4 2:A4 2.25:A4 3.5:Bb3 4:G4
  ô46   Em7(b5) Am       0.25:Bb3 0.5:G4 1:Bb3 1.75:G4 2.333:F4 2.667:C5 3:C5 3.5:C5 4:Bb4
  ô47   Dm11             0:F4 1.75:A4 2:Ab4 2.25:A4 2.5:E5 2.75:C#5 3:D5 3.25:E5 3.5:F5 3.75:F#5
  ô48   Em7(b5) A11      0:G5 0.5:F5 1:E5 1.5:D5 2:C#5 2.5:D5 3:E5 3.5:F4 4:F5

### Người hãy quên em đi — outro (ô 96-104)
  ô96   Dm11             0:F4 1:D5 1.5:F4 2.5:A3 3:F4 3.5:G3 4:F4
  ô97   Eb9 A7(b13)      0.5:G3 1:F4 1.25:G3 1.5:F4 2:G3 3:F4 4:G4
  ô98   Dm               0:C4 0.5:A4 1:C4 2:A4 2.5:C4 3.5:A4
  ô99   C11/E A7         0.5:E4 1:C5 1.25:Bb4 2:C#4 3:A4 4:G4
  ô100  DM9              0:F#4 2:A4 2.25:C#5 2.5:E5 2.75:F#5 3:C#5 3.25:A4 3.5:E5 3.75:C#6
  ô101  ·                0:E5 4:A5

### Co Em Cho — intro (ô 1-8)
  ô1    Abmaj7           0:G4 1.5:C5 1.75:C4 2:G4 2.75:C4 3:G4 3.25:F4 3.5:Eb4
  ô2    Gm7              0:D4 0.75:F4 1.75:D4 2:D4 3:Bb4 3.333:F4 3.667:D4
  ô3    Fm7 Bbsus4       0:Eb4 1.25:C4 1.5:Eb4 1.75:F4 2:Eb4 2.75:Ab4 3.25:F4 3.75:Eb4
  ô4    Ebmaj7           0:Bb3 0.75:G4 2.5:D4 2.75:C5 3:D5 3.25:G4 3.5:F4 3.75:Bb4
  ô5    Abmaj7           0:F4 0.25:G4 0.5:C4 1.25:C4 1.5:C5 1.75:G5 2:C6 2.25:Bb6 3:C7 3.25:Bb6 3.5:Eb4 3.75:G6
  ô6    Gm7              0:F6 0.25:F#6 0.75:D6 1.25:Bb5 1.75:B5 2:C6 2.5:C#6 3:C6 3.5:Bb5 4:Ab5
  ô7    Bbsus4 Fm7       0:F#5 0.5:G5 0.75:Ab4 1.25:Eb5 1.75:Ab4 2.25:Eb5 3.25:Eb5 3.5:F5
  ô8    Ebmaj7           0:Ab4 0.75:F5 1.5:Eb5 2:Bb4 2.75:D4 3:G4 3.25:Bb4 3.5:C5 3.75:D5

### Co Em Cho — interlude (ô 48-55)
  ô48   Ebmaj7 Eb        0.25:Eb4 1:D4 1.25:D5 1.5:G4 1.75:Bb4 2.25:D5 3.25:Eb4 3.5:F4 3.75:Eb4
  ô49   Ab6              0:F4 0.5:F4 0.75:G4 1:F4 1.25:Eb4 1.5:C4 1.75:Eb4 2.5:C4 2.75:F4 3:F4 3.25:Eb4 3.5:C4 3.75:Eb4
  ô50   Gm7 Cm           0:F4 0.25:Bb3 0.5:F4 1:F4 1.75:Eb4 2.25:Bb3 2.5:F4 2.75:Bb4 3:Eb5 3.25:G5 3.5:B5 4:C6
  ô51   Abmaj7 Bb7       0.25:Bb5 0.75:Bb5 1:C6 1.25:G5 1.5:Eb4 1.75:Eb5 2:F5 2.5:Eb5 2.75:Bb4 3.25:F4 3.75:F4
  ô52   Ebmaj7           0:D4 0.25:Bb4 0.75:G4 1:D4 1.5:Bb4 1.75:C5 2:C#4 3:C#5 4:F4
  ô53   Abmaj7           0:Eb4 0.5:G4 1.25:C4 1.5:Eb4 1.75:C5 2:G5 2.25:C6 2.5:Bb6 3:C7 3.25:Bb6 3.5:Eb4 3.75:G6
  ô54   Gm7 Cm7          0:F6 0.5:F#6 0.75:D6 1.25:Bb5 1.75:C5 2.25:C6 2.5:Bb5 3:F4 3.5:F#5 4:Eb5
  ô55   Bb7 Fm7          0:Eb4 0.5:Eb5 1.5:Eb4 1.75:Ab4 2.25:C4 2.75:G4 3.25:F4

### Co Em Cho — outro (ô 66-72)
  ô66   Dbm7 Dbm7        0:Ab4 1:E5 1.25:B4 1.5:E4 2.25:B3 2.5:Ab4 3:B3 4:Ab4
  ô67   B13 Gbm7         1:A3 1.5:A4 1.75:Eb4 2.25:A3 3:A4 3.25:C#4
  ô68   Abm7 Dbm7        0:B3 0.75:B3 1:B4 1.25:B3 1.75:F#4 2:E4 2.5:F#4 2.75:E4 3:Ab4 3.25:E4 3.75:B4 4:C#4
  ô69   B13              0.25:E4 0.75:Ab4 1:C#4 1.5:Ab4 1.75:Eb4 2.25:Ab4 2.75:C#4 3:Eb4 3.25:G4 3.75:Ab3 4:B3
  ô70   E                0:Eb4 1:F#4 1.25:F#3 1.5:B3 1.75:E4 2:Ab3 2.333:Eb5 2.667:F#5 3:Ab5 3.5:B5
  ô71   ·                0:Eb6 0.75:F#6 1:Ab6 1.25:Eb7

### Ngay mai em di — intro (ô 1-18)
  ô1    Eb               0:Eb5 0.75:F5 1:Eb4 1.5:F4 2.5:Bb4 2.75:D4 3:F4 3.25:G4 3.5:Eb4
  ô2    ·                1.5:Eb4 2:F4 2.5:G4 3:Bb4 3.5:Eb5
  ô3    Bbm7/Db          0:F4 0.75:F5 1.5:C#4 3:Bb4 3.5:Ab4 3.75:A4
  ô4    C7               0:G4 1.5:Ab4 1.75:F#4 2:E4 2.667:G4 3.25:Ab4 3.5:Bb4
  ô5    Ab               0:G4 0.75:Eb4 1.5:C4 3.5:Eb4 3.75:F4
  ô6    Bbsus4 Dbmaj7/Ab 0:F#4 0.667:F4 1:Eb4 2.5:F4
  ô7    Eb               0:Bb3 1.5:D4 3:D5 4:Eb4
  ô9    Bb Eb            0:C4 0.25:Eb4 0.5:Bb4 0.75:Eb5 1:Bb5 1.25:Eb6 1.5:Bb6 1.75:C7 2:Ab6 2.25:Ab5 2.5:Bb5 2.75:F5 3.75:Bb4 4:Eb5
  ô10   ·                0:E5 0.75:F5 1.25:F4 1.5:G4 3.5:Bb4
  ô11   ·                1.5:Eb4 1.75:F4 2:Bb4 2.25:F4 2.5:Bb4 2.75:Eb5 3:Bb4 3.25:F5 3.5:G5
  ô12   ·                0:Ab4 0.25:Ab5 0.75:G5 1.25:F5 1.5:C5 2.5:G5 3.5:F5 3.75:F#5
  ô13   Cm7              0:E5 1.5:F5 1.75:E4 2:E5 2.25:Bb4 2.75:F4 3.25:F5 3.5:Bb5 3.75:Bb4
  ô14   Ab               0:Eb5 0.5:C6 0.75:F#5 1:G5 3:Eb5 3.25:Bb4 3.5:C5 3.75:Eb5
  ô15   Cm7              0:Bb4 0.75:F5 1.5:G4 2.5:Eb5 3.5:Bb4 3.75:G4 4:A4
  ô16   Fm7              0:Ab4 0.25:Ab4 1.5:Ab3 2.5:G4
  ô17   Bb               0:Eb4 2:F4 2.5:Eb4
  ô18   ·                0:D4 1.5:Ab3 3:F4 4:D4

### Ngay mai em di — interlude (ô 51-54)
  ô51   Eb Bb/D          0:G4 0.75:Eb5 1:F4 1.25:G4 1.5:Bb4 1.75:Bb4 2.5:D4 2.75:F4 3:G4 3.25:Bb4 3.5:F4 3.75:G4
  ô52   Cm7              0:Eb4 1:Eb4 1.333:F4 1.667:G4 2:Eb4 2.25:Ab4 2.5:G4 3:C#4 3.5:F4
  ô53   Eb/G Ab          0:Eb4 1:C4 1.25:D4 3:Eb4 3.75:Bb4
  ô54   Bb               0:Ab3 0.25:Ab4 0.5:C4 1.5:Eb4 1.75:F4 3:Bb3 4:D4

### Ngay mai em di — outro (ô 87-91)
  ô87   Eb/G             0:Bb4 0.75:Eb5 1:Eb4 2.5:Eb4 2.75:F4 3:G4 3.75:Eb4
  ô88   Fm7 Ebmaj7       0:Eb4 1:C4 1.25:Eb4 1.5:Bb3 2.5:F4 2.75:D4 3:G4 3.25:D5 3.5:G4 3.75:F4
  ô89   Bb               0:Eb4 0.75:Bb3 1.25:C4 1.333:Eb4 2.25:Ab3 3.75:F4
  ô90   Eb               0:Bb3 0.75:Eb4 1:F4 1.25:D5 1.5:Bb5 1.75:G6 3.75:C7
  ô91   ·                0:D7```

---

## 5b. BỘI SỐ bám hợp âm — và vì sao tỉ lệ thô của thầy gây hiểu nhầm

Đo ngày **6/9/2026** bằng `python tools/sheet/boi_so.py ca-phao`. Định nghĩa bội số xem
`linh-nhi-piano.md` mục 16b.

| đoạn | giọng | số bài | n nốt | **BỘI SỐ** | bước nhỏ | độ dày hợp âm |
|---|---|---|---|---|---|---|
| dạo | trưởng | 3 | 263 | **1,299** | 46,7% | 3,51 nốt |
| dạo | thứ | 1 | 62 | 1,180 | 73,8% | 5,71 nốt |
| giang | trưởng | 3 | 279 | **1,196** | 57,8% | 3,50 nốt |
| giang | thứ | 1 | 55 | 1,122 | 35,2% | 4,60 nốt |
| kết | trưởng | 2 | 73 | **1,277** | 38,3% | 3,35 nốt |
| kết | thứ | 2 | 85 | 1,416 | 30,6% | 4,74 nốt |

**Chỗ phải đọc kỹ, và đây là ví dụ sống cho việc tại sao phải dùng bội số.**

Ở mục 3 sổ này có ghi thầy **bám hợp âm chặt hơn Linh Nhi — 70,8% so với 63,6%**. Con số ấy
đúng, nhưng nó là **tỉ lệ thô**. Đo lại bằng bội số thì **ngược lại**: đoạn dạo của thầy
1,299, của Linh Nhi 1,561.

Lý do nằm ở cột cuối: hợp âm của thầy **dày hơn hẳn** — 3,51 nốt ở đoạn dạo giọng trưởng,
lên tới **5,71** ở đoạn dạo giọng thứ, trong khi Linh Nhi ở 3,0–3,3. Hợp âm càng dày thì
rải bừa trong gam càng dễ trúng, nên tỉ lệ thô cao lên mà mức bám thực không tăng.

**Không phải mục 3 sai.** Hai câu hỏi khác nhau: *"nốt có nằm trong hợp âm không"* thì thầy
trúng nhiều hơn; *"thầy có chọn nốt hợp âm nhiều hơn mức tình cờ không"* thì Linh Nhi hơn.
Chênh 0,26 giữa hai người vượt ngưỡng phát hiện 0,20 nên đọc được.

Cỡ mẫu giọng thứ chỉ **một bài** ở đoạn dạo và giang — đừng dùng hai dòng ấy để đặt luật.


## 6. Chưa đo — đừng suy bừa vào chỗ này

- **Sheet có cùng cao độ với bản thu không.** Đã bắt được **một** bài lệch: *Người hãy quên
  em đi* — sheet ở Rê thứ mà Chordify đọc bản thu ra Si giáng thứ, lệch **đúng 4 nửa cung ở
  mọi hợp âm**, tức có bên đã dịch giọng. Bằng chứng nghiêng về phía sheet là bản chơi
  được: dịch xuống 4 nửa cung thì nốt thấp nhất tay trái thành **midi 22 (Bb0)**, phím thứ
  hai từ dưới của đàn 88 phím. Ba bài còn lại người dùng đã đối chiếu Chordify và **khớp**.
- **Tiết tấu tay trái theo từng điệu.** Bossa nova và ballad chắc chắn khác nhau, nhưng
  chưa tách ra đo — mỗi loại chỉ có 2 bài.
- **Vị trí câu chèn (fill) trong phần hát.** Chưa đo.
- **Cách nối giọng giữa các hợp âm.** Chưa đo.
- **Hợp âm lướt.** Quét cả kho chỉ ra **3 ca thật**, Cà Pháo có 2: *Ngày mai em đi* ô 3
  (`Eb → Bbm7/Db → C7`, bass `Eb → Db → C`) và *Có Em Chờ* ô 58 (`Amaj7 → Abm7 → Bsus4`,
  bass `A → Ab → F#`). Anh ấy dùng thủ pháp này nhiều nhất trong ba thầy, nhưng vẫn là
  **hiếm** — 2 chỗ trên hơn 400 ký hiệu.

---

## 7. Cỡ mẫu — nói thẳng chỗ mỏng

**4 bản ký âm** là ít. Đủ để chốt các con số ở mục 2 và tầm âm ở mục 4 (828 nốt), nhưng
**chưa đủ để rút luật về cấu trúc câu**: mỗi thể loại chỉ có 2 bài, và giọng thứ chỉ có
**1 bài**.

Mọi câu trong file này đều kèm cỡ mẫu. Chỗ nào không có số thì đó là **chưa đo**, không
phải đã biết.
