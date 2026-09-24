# Cà Pháo — thầy, đọc file này trước khi nói trong vai thầy ấy

`id: ca-phao` · đặt cạnh `ca-phao.json` · nguồn `ca-phao-piano-covers`

> **Cập nhật 17/9/2026:** các mục cũ ghi 4 bài/828 nốt là số đo lịch sử, không phải
> cỡ mẫu mới. Đã đọc lại 9 sheet (8 Ballad, 1 Bossa), xem mục “Thói quen tổ chức solo”
> bên dưới. Có Em Chờ outro đã được người dùng chốt E trưởng, thay nhận định C# thứ cũ.

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

> **Bẫy thứ ba, 11/9/2026 (Codex phát hiện, xem `tools/sheet/README.md` mục 5):** bộ đọc
> từng gán sai thời điểm nốt chồng và đếm nốt nối như nốt mới. Các con số "nốt/ô", "mốc gõ
> chung hai tay" trong file này đo trước ngày ấy **chưa đo lại**; đếm theo **lần gõ mới**
> có thể thấp hơn nhiều (ô 16 *Để Em Rời Xa*: 23 đầu nốt → 7 lần gõ).


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


## 5c. Cửa lời — ba bài mới, người dùng chốt bằng mắt trên sheet (11/9/2026)

Ba bản ballad mới (*Để Em Rời Xa* · *Chúng Ta Không Thuộc Về Nhau* · *Chưa Bao Giờ*) không có
thẻ lời, nên chỗ nào là **lời**, chỗ nào là **đàn** không đo được — người dùng chốt từng chỗ
trên phiếu (`ingest/phieu-chia-doan-ca-phao-3-bai-moi.md`, đã điền), sau khi Codex loại các
nghi vấn máy dựng từ số đầu nốt. Số ghi ở `tools/sheet/corpus.json` → `sections.*.cua_loi`.

### Bảng cửa lời đã chốt (ý người dùng, không phải số đo)

| bài | ô · phách | là gì |
|---|---|---|
| Để Em Rời Xa | 3 · phách 3–4 | đàn, **không** lấy đà lời (chuỗi C4/F4 → G6/C7 kết dạo) |
| | 27 · 4+3/4 | C4 đơn = **đàn** (nốt dẫn vào giang) |
| | 32 · phách 2 | **lời vào ở D4**; C5–G4–F4–E4 phách 1 là đuôi run của giang |
| | 40 · phách 1–1½ | A5 → D6/F#6/A6 → D7 = **fill lúc lời nghỉ** |
| | 47 · 4+1/2 | cụm A3/Ab4/A4 = **lời lấy đà** vào điệp lặp |
| | 55 · 4+1/2 | Bb3/Bb4 = **lời lấy đà** vào điệp nâng tone |
| | 59 · 3, 3+1/4, 3+1/2 | thế C#4…A#4 chuyển lên hai quãng tám = **fill lúc lời nghỉ** |
| Chúng Ta Không Thuộc Về Nhau | 8 · 3+1/2 | D4/G4 = **lời lấy đà** vào phiên (từ cuối dạo) |
| | 24 | **lẫn**: lời từ 23 dứt ở B3 (chùm B3/D4 phách 1); B3/D4 phách 2 = RH pickup; nghỉ ¼ ở 2+1/2; lời tiếp |
| | 32 · phách 2 | lời dứt ở D4/G4; D4–B3–C4/G4 sau đó = đàn nối sang giang |
| | 48 · 3+1/2 | C4/G4/C5 = **lời lấy đà** vào tiền điệp lặp (từ cuối giang) |
| | 56 · phách 3 | điệp lặp **vào lời ở D5/G5** — chuỗi D5/G5 → E4/A4 là lời, không phải đàn dẫn dù giống ô 24 |
| | 77 | bass Eb2 là **dụng ý**, không phải lỗi ký âm |
| Chưa Bao Giờ | 9 · 4, 4+1/2, 4+3/4 | ba C5 = **tiếng mở lời** |
| | 22 | cụm lên Ab6/C7/F7 rồi xuống = **fill lúc lời nghỉ** |
| | 34 · 4+3/4 | thế F4/Ab4/C5 **không** thuộc lời (đàn nối vào giang) |
| | 43 · phách 4 | thế C5/Ab5/C6 = **lời** (lấy đà vào phiên lặp) |
| | 50 → 51 | **lẫn hát–fill–hát**: âm tiết cuối = F4/Bb4/C5/F5 ô 50 phách 3+3/4; fill từ 4+1/4 lên Bb6/C7/F7 đầu 51; lời lại ở 51 **phách 4 (F5)** |
| | 68 · 2+1/4 | tiếng mở lời coda = **C5**; Ab6/C7/F7 phách 1 và Eb4/F4 phách 2 là đàn |
| | 75 · phách 3 | lời dứt ở **Ab4/F5**; fill từ 4+1/4 (Eb4, G4) sang đầu 76 |
| | 76 · 3+1/4 | tag vào lời ở **G5** |

### Điều rút được — kèm cỡ mẫu

1. **Câu hát của Cà Pháo hay vào bằng lấy đà ở cuối ô trước.** 6/8 ranh đoạn hát đã hỏi có
   lời lấy đà từ nửa phách tới một phách cuối ô trước (Chúng Ta 8→9, 48→49; Để Em 47→48,
   55→56; Chưa Bao Giờ 43→44, và 9 tự lấy đà trong ô đầu). Hai ngoại lệ: Để Em 3→4 (không
   lấy đà) và 31→32 (lời vào **muộn**, phách 2, sau đuôi run của giang). n=8 ranh, 3 bài.
2. **Fill rơi vào chỗ lời nghỉ, và hình fill là cụm/thế bấm chuyển quãng tám**, không phải
   chuỗi đơn liền bậc: Để Em 40 và 59, Chưa Bao Giờ 22 và 50→51 — cả 4 chỗ đều là thế bấm
   nhảy lên 1–2 quãng tám rồi xuống, 3–11 lần gõ. n=4. Phiếu cũ gọi chúng là "run" vì đếm
   đầu nốt; sai.
3. **Nốt dẫn đơn cuối ô trước giang tấu là đàn** (Để Em 27 C4; Chưa Bao Giờ 34 thế
   F4/Ab4/C5; Chúng Ta 32 D4–B3–C4/G4). n=3, cả ba đều "đàn". Ngược lại ở ranh **vào đoạn
   hát** thì cùng hình dạng ấy lại là lời (mục 1). Nên hướng đi quyết định: ra khỏi lời →
   đàn; vào lời → lời.
4. **Chuỗi giống nhau chưa chắc cùng vai**: Chúng Ta ô 56 và ô 24 cùng chuỗi D5/G5 → C5/E5
   → A4/D5 → G4/C5 → E4/A4, nhưng 24 là đàn dẫn cuối tiền điệp còn 56 là lời mở điệp lặp
   (người dùng chốt). Không suy vai từ hình nốt.
5. **"RH giữ, LH lấp, RH pickup trả về lời"** (ô 24 Chúng Ta) — người dùng đề nghị dò trước
   khi nâng thành luật. Đã dò: khe *RH không gõ ≥1 phách trong khi LH gõ ≥2 lần* xuất hiện
   **66/157 ô hát** (Để Em 37/56 · Chưa Bao Giờ 23/61 · Chúng Ta 6/40). Tức đó là **kết cấu
   đệm mặc định** của thầy, không phải thủ pháp riêng ở chỗ nối câu; phần đặc trưng là cú
   pickup tay phải trả về lời — máy không tách được khi không có lời. Chưa thành luật.

### Bẫy đã sập ở đây

- Đếm **đầu nốt** thay cho **lần gõ**: ra "31 nốt/ô" trong khi chỉ 8–9 lần gõ (xem
  `tools/sheet/README.md` bẫy 5). Mọi nhãn run/fill máy gán trước 11/9 đều bỏ.
- Suy "giọng nghỉ" từ ô thưa: *Chưa Bao Giờ* ô 26 chỉ một Eb4 mới nhưng lời vẫn ở đó.
- Suy vai từ hình nốt (mục 4).

### 5d. Cửa lời ba bài cũ (Hồng Kông 1 · Có Em Chờ · Ngày mai em đi) — phiếu bổ sung 11/9/2026

Người dùng trả lời phiếu của Codex (`ingest/phieu-bo-sung-ca-phao-3-bai-cu-2026-09-11.md`). Mốc đã
đối chiếu file, ghi vào `corpus.json`. Sửa một ranh: **điệp *Có Em Chờ* là 25–32, phiên lặp
33–40** (trước ghi 25–33). Giọng kết *Có Em Chờ* là **Mi trưởng** (nhãn "Đô thăng thứ" cũ đọc
từ bass C#m7 — bỏ).

| bài | ô · phách | là gì |
|---|---|---|
| Hồng Kông 1 | 16 · 2+1/2 | **lời vào ở C5 móc đơn**, không lấy đà ở 15 |
| | 46 · 4+1/2 → 47 · 1 | chùm E4/G4/C5 = **lời cuối điệp**, nối qua vạch, ngân ở 47 |
| | 47 · phách 3 | **giang bắt đầu ở D4 tay trái**; giữa 47/1 và 47/3 là đàn nối |
| | 65 · 1 | chùm A4/C5/G5 = **câu đàn kết giang**, trước khi lời vào |
| | 65 · 2+1/2 | **lời phiên 2 trở lại ở C5/C6** — sớm hơn mốc ô 66 |
| | 100 · 1 | chùm C4/G4/C5 = **lời cuối bài**; outro từ chùm ba rải ngay sau (1+1/2) |
| Có Em Chờ | 8 · 4+1/2, 4+3/4 | C5, D5 = **lời lấy đà** vào phiên |
| | 32 · 4+1/2 | C5/C6 = **lời lấy đà** vào phiên lặp (ô 33) |
| | 48 · 1 | Eb4/Eb5 = nốt hát cuối điệp 2; **giang từ 1+1/4** |
| | 56 · 1, 2 | **giang lấn** hai nốt Bb3/F4, Bb3/Eb4 rồi điệp nâng giọng vào |
| | 66 → 72 | đàn, không hát; kết Mi trưởng |
| Ngày mai em đi | 18 → 19 | **không lấy đà**; lời vào trong ô 19 |
| | 51 · 1 | chùm G4/Bb4/Eb5 còn **một chữ hát**; 51–54 đàn ngắn; phiên 2 ở 55 |
| | 87 · 1 | Bb4/Eb5 = **nốt lời cuối**; đàn kết từ 1+3/4 |

### Điều rút được — gộp sáu bài (cập nhật mục 5c)

1. **Nốt hát cuối rơi đúng phách 1 của ô đầu đoạn đàn, rồi đàn mới vào.** Hồng Kông 1 ô 47 và
   ô 100; Có Em Chờ ô 48; Ngày mai em đi ô 51 và ô 87 — **n=5, 3 bài, không ngoại lệ trong
   số đã hỏi**. Hệ quả cho ranh đoạn: ô đầu của giang/kết **không phải toàn đàn**; câu đàn
   bắt đầu từ ¼ tới 2 phách sau (Hồng Kông 1 ô 47: tới phách 3). Bộ soạn giang/kết muốn
   chép đúng thầy thì ô đầu phải chừa chỗ cho nốt hát ngân.
2. **Lấy đà vào đoạn hát: có ở 8/11 ranh đã hỏi**, thêm Có Em Chờ ô 8 và ô 32. Ba ranh
   **không** lấy đà: Để Em Rời Xa 3→4, Hồng Kông 1 15→16, Ngày mai em đi 18→19 — cả ba đều là
   **dạo → phiên đầu**. Ngược lại mọi ranh *vào phiên/điệp lặp* đều có lấy đà. n=11.
3. **Lời có thể vào sớm hơn mốc ô**: Hồng Kông 1 phiên 2 vào ở ô 65 phách 2+1/2 (mốc ghi 66);
   Có Em Chờ phiên lặp vào ở 32/4+1/2 (mốc 33). Đây là dạng khác của mục 2 — lấy đà dài hơn
   nửa phách. n=2.
4. **Đàn lấn vào đoạn hát cũng có**: Có Em Chờ ô 56 (hai nốt đầu còn là giang). n=1 — đừng
   coi là luật.
5. **Chuỗi quãng tám đôi leo lên để đẩy vào đoạn kế**: Hồng Kông 1 cuối 65 (C→D→E) và Có Em
   Chờ cuối 32 (C→D→Eb) — cùng hình, và ở cả hai chỗ chuỗi ấy **là lời**, không phải đàn.
   n=2, 2 bài.

**Chưa đo**: "tay trái điệp dày hơn phiên" ở *Ngày mai em đi* (ý người dùng khi nghe) — đo
được bằng lần gõ mới theo đoạn, chưa làm; ở *Có Em Chờ* người dùng xác nhận là **không**.

## Ý kiến khi nghe — Bossa CP cải tiến, 16/09/2026

Chuyển thủ công bằng skill y-kien-intro, đúng hồ sơ Cà Pháo. Cửa sổ UTC 01:39:23–02:09:23. Sổ thô chưa có cột doan, không tự gán mọi câu thành intro. Đây là câu KT tự soạn, không phải câu extracted của Cà Pháo.

| # | lúc nghe (UTC) | bài | giọng | chấm | ý kiến người dùng |
|---|---|---|---|---|---|
| #992 | 2026-09-16T01:44:16.409Z | Cánh Hồng Phai (intro) | A thứ | Đã ổn | — |
| #995 | 2026-09-16T01:48:42.335Z | Cánh Hồng Phai (intro) | A thứ | Đã ổn | — |
| #1001 | 2026-09-16T01:49:48.025Z | Chuyện Tình | E thứ | Đã ổn | — |
| #1004 | 2026-09-16T01:53:37.769Z | Chuyện Tình | E thứ | Đã ổn | — |
| #1005 | 2026-09-16T01:56:42.962Z | Chuyện Tình | E thứ | Chưa ổn | có nhiều chỗ bị lệch nhịp (ví dụ như Bm7) |
| #1007 | 2026-09-16T01:56:54.875Z | Chuyện Tình | E thứ | Đã ổn | — |
| #1008 | 2026-09-16T02:00:02.001Z | Chuyện Tình | E thứ | Chưa ổn | có mấy chỗ dặm hợp âm bị lệch nhịp, ví dụ như ở hợp âm D trong lần phát thứ 2 |
| #1009 | 2026-09-16T01:56:55.155Z | Chuyện Tình | E thứ | Chưa ổn | — |
| #1010 | 2026-09-16T02:00:12.786Z | Chuyện Tình | E thứ | Đã ổn | — |
| #1011 | 2026-09-16T02:02:50.301Z | Chuyện Tình | E thứ | Chưa ổn | có quá nhiều chỗ dặm hợp âm, hãy bớt lại |
| #1012 | 2026-09-16T02:03:06.307Z | Chuyện Tình | E thứ | Chưa ổn | có quá nhiều chỗ dặm hợp âm hãy bớt lại |

### Điều cần giữ và sửa

- **Ý người dùng:** #1005 lệch nhịp ở Bm7; #1008 lệch tại chỗ dặm D trong lượt thứ hai; #1011–1012 dặm quá nhiều. Giảm dặm, sửa vị trí nhấn, kiểm soát va nốt. #1009 chỉ tick: không suy ra chỗ hỏng cụ thể.
- **Mẫu chấp nhận:** #992, #995, #1001, #1004, #1007, #1010 để đối chiếu vòng, mật độ và tầm; không coi mọi thông số của mẫu là luật chung.
- **Giới hạn bằng chứng:** #1008 lưu một span giang, lời bình nhắc lượt thứ hai. Chưa đủ chứng minh chỗ D được lưu chính là lần bị chê; cần kiểm cả hai lượt. Không tráo nốt giữa các lượt.
- Chưa có mâu thuẫn xác nhận với số đo sheet: có dặm không đồng nghĩa dặm mọi nốt dài. Ngưỡng giảm dặm trong KT là điều chỉnh theo tai người dùng, không phải tần suất mới đo từ sheet. Không lấy số đo Linh Nhi làm chuẩn CP.
- Số đo bên dưới từ chính cột not: P = phải, T = trái. T đánh riêng tính theo attack, không phải độ dài nghỉ P. Tên nốt dùng dấu thăng để tái hiện MIDI. Mốc trong ô bắt đầu từ 1, ngân theo phách.
- Bậc gốc dùng bộ phân tích PianoBrain với giọng khai báo. III/VI/VII là bậc của thứ tự nhiên (tương ứng ♭III/♭VI/♭VII so với trưởng); chữ hoa/thường của bộ phân tích không luôn biểu thị chất hợp âm. Đọc chất ở hàng ký hiệu, không suy E7 thành Em từ nhãn i. EmMaj7 không được parser nhận nguyên tên nên bậc gốc lấy từ E.

### 16a. Mẫu đã ổn — giọng trưởng

Không có mẫu mới trong cửa sổ.

### 16b. Mẫu đã ổn — giọng thứ

#### #992 — Cánh Hồng Phai (intro) · A thứ

Nhận xét: (mẫu)

Hợp âm (4 phách/ô): Am11 | Em7 | Bm7b5 | E11.

Bậc gốc: i | v | ii | V.

Số đo: P nốt/ô 7, 11, 7, 5; T attack/ô 5, 5, 5, 4; T đánh riêng 36.8%; P trung bình MIDI 69.50.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:A4/1 2:A4/1.5 2:B4/1.5 3.5:A4/1 4.5:D4/1 4.5:E4/1 4.5:G4/1
- Ô 2 P: 1.5:D4/1 1.5:E4/1 2.5:G4/0.5 3:B4/0.25 3.25:C5/0.25 3.5:D5/0.25 3.75:C5/0.25 4:B4/0.25 4.25:C5/0.25 4.5:D5/0.25 4.75:F5/0.25
- Ô 3 P: 1:D5/1 2:A4/1.5 2:B4/1.5 3.5:D4/1 3.5:F4/1 3.5:A4/1 4.5:B4/1
- Ô 4 P: 1.5:C5/0.75 2.25:B4/0.75 2.25:D5/0.75 3:B4/1 4:A4/1

#### #995 — Cánh Hồng Phai (intro) · A thứ

Nhận xét: (mẫu)

Hợp âm (4 phách/ô): Am9 | G7 | Bm7b5 | E7.

Bậc gốc: i | VII | ii | V.

Số đo: P nốt/ô 6, 8, 8, 10; T attack/ô 5, 5, 5, 4; T đánh riêng 31.6%; P trung bình MIDI 69.97.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:C5/1 2:A4/0.75 2.75:G4/0.75 3.5:G4/1 3.5:A4/1 4.5:B4/1
- Ô 2 P: 1.5:D5/1 2.5:B4/0.5 3:D4/1 3:F4/1 3:G4/1 4:A4/0.5 4.5:F4/0.25 4.75:A4/0.25
- Ô 3 P: 1:B4/0.5 1.5:D5/0.5 2:C5/0.5 2.5:D5/1 3.5:F4/1 3.5:A4/1 3.5:B4/1 4.5:D5/1
- Ô 4 P: 1.5:F5/0.75 2.25:E5/0.75 3:D5/0.25 3.25:C5/0.25 3.5:B4/0.25 3.75:A4/0.25 4:G#4/0.25 4.25:G#4/0.25 4.5:A4/0.25 4.75:G#4/0.25

#### #1001 — Chuyện Tình · E thứ

Nhận xét: (mẫu)

Hợp âm (4 phách/ô): Em11 | F#m7b5 | Bm7b5 | E7.

Bậc gốc: i | ii | v | i.

Số đo: P nốt/ô 5, 8, 5, 14; T attack/ô 5, 5, 5, 4; T đánh riêng 36.8%; P trung bình MIDI 68.31.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:E4/1 1:G4/1 2:B4/1.5 3.5:G4/1 4.5:A4/1
- Ô 2 P: 1.5:E4/0.75 1.5:F#4/0.75 2.25:D4/0.75 3:F#4/1 4:A4/0.25 4.25:B4/0.25 4.5:C5/0.25 4.75:G#4/0.25
- Ô 3 P: 1:A4/1 2:C5/0.75 2.75:A4/0.75 3.5:B4/1 4.5:D5/1
- Ô 4 P: 1.5:E4/1 1.5:G#4/1 1.5:B4/1 2.5:G#4/0.5 2.5:B4/0.5 2.5:D#5/0.5 3:B4/0.25 3.25:A4/0.25 3.5:G#4/0.25 3.75:E4/0.25 4:G#4/0.25 4.25:F#4/0.25 4.5:E4/0.25 4.75:G#4/0.25

#### #1004 — Chuyện Tình · E thứ

Nhận xét: (mẫu)

Hợp âm (4 phách/ô): Em7 | Am7 | Bm7b5 | E11.

Bậc gốc: i | iv | v | i.

Số đo: P nốt/ô 8, 6, 6, 13; T attack/ô 5, 5, 5, 4; T đánh riêng 36.8%; P trung bình MIDI 70.97.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:B4/1 2:E5/1 3:B4/0.5 3:D5/0.5 3.5:B4/0.5 4:A4/0.5 4.5:G4/0.25 4.75:B4/0.25
- Ô 2 P: 1:C5/1 2:B4/0.75 2.75:A4/0.75 3.5:G4/1 4.5:B4/0.25 4.75:A4/0.25
- Ô 3 P: 1:B4/0.5 1.5:C5/0.5 2:D5/0.5 2.5:A4/1 3.5:B4/1 4.5:D5/0.75
- Ô 4 P: 1.25:E5/0.75 1.25:F#5/0.75 2:D5/0.25 2.25:C5/0.25 2.5:B4/0.25 2.75:G4/0.25 3:B4/0.5 3.5:B4/0.5 3.5:D5/0.5 4:B4/0.25 4.25:A4/0.25 4.5:F#4/0.25 4.75:D4/0.25

#### #1007 — Chuyện Tình · E thứ

Nhận xét: (mẫu)

Hợp âm (4 phách/ô): Em7 | Cmaj7 | D | C | Em7 | D | Bm7b5 | E7.

Bậc gốc: i | VI | VII | VI | i | VII | v | i.

Số đo: P nốt/ô 4, 8, 6, 9, 6, 10, 11, 9; T attack/ô 5, 5, 5, 5, 5, 5, 5, 4; T đánh riêng 35.9%; P trung bình MIDI 73.90.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:D4/1 2:E4/1.5 3.5:G4/1 4.5:B4/1
- Ô 2 P: 1.5:G4/0.75 1.5:B4/0.75 1.5:D5/0.75 2.25:E4/0.75 2.25:G4/0.75 2.25:C5/0.75 3:E5/1 4:G5/1
- Ô 3 P: 1:F#5/1 2:D5/1.5 3.5:A4/1 3.5:D5/1 3.5:F#5/1 4.5:E5/1
- Ô 4 P: 1.5:G5/1 2.5:E5/0.5 3:C5/0.333 3.333:E5/0.333 3.667:D5/0.333 4:B4/0.25 4.25:D5/0.25 4.5:E5/0.25 4.75:C5/0.25
- Ô 5 P: 1:D5/0.5 1.5:E5/0.5 2:F#5/0.5 2.5:G5/1 3.5:E5/1 4.5:F#5/1
- Ô 6 P: 1.5:D5/1 2.5:D#5/0.5 3:F#5/0.25 3.25:D#5/0.25 3.5:F5/0.25 3.75:F#5/0.25 4:D5/0.5 4:F#5/0.5 4:A5/0.5 4.5:B5/0.5
- Ô 7 P: 1:B5/1.75 1:D6/1.75 2.75:B5/0.25 3:A5/0.25 3.25:F5/0.25 3.5:D5/0.25 3.75:F5/0.25 4:E5/0.25 4.25:D5/0.25 4.5:B4/0.25 4.75:A4/0.25
- Ô 8 P: 1:B4/1 2:G#4/1 3:E4/0.5 3:G#4/0.5 3:B4/0.5 3.5:A4/0.5 4:G#4/0.5 4.5:B4/0.25 4.75:G#4/0.25

#### #1010 — Chuyện Tình · E thứ

Nhận xét: (mẫu)

Hợp âm (4 phách/ô): Em7 | F#m7b5 | Bm7 | Em7 | Bm7 | Em7 | Bm7b5 | E11.

Bậc gốc: i | ii | v | i | v | i | v | i.

Số đo: P nốt/ô 8, 10, 8, 6, 7, 12, 11, 5; T attack/ô 5, 5, 5, 5, 5, 5, 5, 4; T đánh riêng 30.8%; P trung bình MIDI 71.76.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:D4/1 1:E4/1 2:D4/1 3:E4/0.5 3.5:D4/1 3.5:E4/1 3.5:G4/1 4.5:C5/1
- Ô 2 P: 1.5:A4/1 2.5:G4/0.5 3:A4/0.25 3.25:C5/0.25 3.5:D5/0.25 3.75:B4/0.25 4:A4/0.25 4.25:B4/0.25 4.5:D5/0.25 4.75:F#5/0.25
- Ô 3 P: 1:A5/1 2:B5/0.5 2.5:B4/1 2.5:D5/1 2.5:F#5/1 2.5:A5/1 3.5:F#5/1 4.5:D5/1
- Ô 4 P: 1.5:B4/0.75 1.5:D5/0.75 1.5:E5/0.75 2.25:F#5/0.75 3:E5/1 4:D5/0.8
- Ô 5 P: 1:B4/1 1:D5/1 1:F#5/1 2:D5/0.75 2.75:C5/0.75 3.5:D5/1 4.5:E5/1
- Ô 6 P: 1.5:D5/1 1.5:E5/1 1.5:G5/1 2.5:D#5/0.5 3:B4/0.25 3.25:C5/0.25 3.5:D5/0.25 3.75:F#5/0.25 4:D5/0.25 4.25:B4/0.25 4.5:C5/0.25 4.75:D5/0.25
- Ô 7 P: 1:B4/0.5 1.5:A4/0.5 1.5:B4/0.5 1.5:D5/0.5 2:E5/0.5 2.5:D5/1 3.5:A4/1 3.5:B4/1 4.5:B3/1 4.5:D4/1 4.5:F#4/1
- Ô 8 P: 1.5:A4/0.75 2.25:B4/0.75 3:A4/1 4:F#4/0.5 4.5:D4/0.5

### Câu chưa ổn có bình luận — bằng chứng để sửa

#### #1005 — Chuyện Tình · E thứ

Nhận xét: có nhiều chỗ bị lệch nhịp (ví dụ như Bm7)

Hợp âm (4 phách/ô): Em7 | Bm7 | Em7 | Am7 | F#m7b5 | B11.

Bậc gốc: i | v | i | iv | ii | V.

Số đo: P nốt/ô 9, 7, 10, 9, 8, 14; T attack/ô 5, 5, 5, 5, 5, 4; T đánh riêng 44.8%; P trung bình MIDI 69.21.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:D4/1 2:D4/1.5 2:E4/1.5 3.5:D4/1 3.5:E4/1 3.5:G4/1 4.5:A4/0.25 4.75:D4/1.25 4.75:F#4/1.25
- Ô 2 P: 2:A4/1 3:F#4/1.5 3:A4/1.5 3:B4/1.5 4.5:B4/0.5 4.5:D5/0.5 4.5:E5/0.5
- Ô 3 P: 1:D5/1.75 2.75:F#5/0.25 3:D5/0.25 3.25:D#5/0.25 3.5:B4/0.25 3.75:A4/0.25 4:C5/0.25 4.25:B4/0.25 4.5:C5/0.25 4.75:A4/0.25
- Ô 4 P: 1:C5/0.25 1.25:B4/0.25 1.5:A4/0.25 1.75:F#4/0.25 2:A4/1.5 3.5:E4/1 3.5:G4/1 4.5:A4/0.25 4.75:E4/0.2
- Ô 5 P: 1:E4/1 1:F#4/1 2:E4/1.5 2:F#4/1.5 2:A4/1.5 3.5:A4/1 3.5:C5/1 4.5:A4/1
- Ô 6 P: 1.5:F#4/0.75 1.5:A4/0.75 1.5:B4/0.75 2.25:F#4/0.75 2.25:A4/0.75 2.25:C5/0.75 3:A4/0.25 3.25:B4/0.25 3.5:C5/0.25 3.75:C#5/0.25 4:E5/0.25 4.25:C#5/0.25 4.5:D5/0.25 4.75:D#5/0.25

#### #1008 — Chuyện Tình · E thứ

Nhận xét: có mấy chỗ dặm hợp âm bị lệch nhịp, ví dụ như ở hợp âm D trong lần phát thứ 2

Hợp âm (4 phách/ô): Em7 | D | Em9 | Bm7 | Em9 | F#m7b5 | F#m7b5 | B7.

Bậc gốc: i | VII | i | v | i | ii | ii | V.

Số đo: P nốt/ô 16, 21, 14, 12, 15, 12, 8, 12; T attack/ô 5, 5, 5, 5, 5, 5, 5, 4; T đánh riêng 30.8%; P trung bình MIDI 70.10.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:E4/1 1:G4/1 1:B4/1 1:D5/1 2:G4/1 2:B4/1 3:G4/0.5 3.5:G3/0.5 3.5:B3/0.5 3.5:D#4/0.5 4:B3/0.5 4:D4/0.5 4:E4/0.5 4:F#4/0.5 4.5:G4/0.25 4.75:A4/0.25
- Ô 2 P: 1:A3/0.5 1:D4/0.5 1:F#4/0.5 1.5:F#3/0.5 1.5:A3/0.5 1.5:D#4/0.5 2:G4/0.333 2.333:A#4/0.333 2.667:B4/0.333 3:A3/0.75 3:D4/0.75 3:F#4/0.75 3:A4/0.75 3.75:G4/0.25 4:F#4/0.5 4:A4/0.5 4:B4/0.5 4.5:D4/0.5 4.5:F#4/0.5 4.5:A4/0.5 4.5:C5/0.5
- Ô 3 P: 1:E4/1.75 1:G4/1.75 1:B4/1.75 2.75:D#5/0.25 3:F#5/0.25 3.25:D#5/0.25 3.5:D5/0.25 3.75:D#5/0.25 4:B4/0.5 4:D5/0.5 4:E5/0.5 4:F#5/0.5 4.5:F#5/1 4.5:A5/1
- Ô 4 P: 1.5:B4/1 1.5:D5/1 1.5:F#5/1 2.5:B4/0.5 2.5:D5/0.5 2.5:G5/0.5 3:F#5/1 3:A5/1 4:F#5/0.25 4.25:G5/0.25 4.5:F#5/0.25 4.75:E5/0.25
- Ô 5 P: 1:D5/1 1:E5/1 1:F#5/1 2:G4/1 2:B4/1 2:D5/1 3:G4/0.5 3:B4/0.5 3.5:G4/0.5 3.5:B4/0.5 3.5:D#5/0.5 4:D5/0.5 4.5:E4/1.5 4.5:F#4/1.5 4.5:C5/1.5
- Ô 6 P: 2:D#5/0.25 2.25:F5/0.25 2.5:F#5/0.25 2.75:G5/0.25 3:F#5/0.25 3.25:D#5/0.25 3.5:C5/0.25 3.75:D#5/0.25 4:D5/0.25 4.25:E5/0.25 4.5:C5/0.25 4.75:A4/0.25
- Ô 7 P: 1:F#4/1 2:E4/0.75 2:G4/0.75 2.75:A4/0.75 3.5:C5/1 4.5:F#4/1 4.5:A4/1 4.5:D#5/1
- Ô 8 P: 1.5:F#4/0.75 1.5:A4/0.75 1.5:B4/0.75 2.25:F#4/0.75 2.25:A4/0.75 2.25:C5/0.75 3:F#4/1 3:A4/1 3:B4/1 4:A4/1 4:B4/1 4:D#5/1

#### #1011 — Chuyện Tình · E thứ

Nhận xét: có quá nhiều chỗ dặm hợp âm, hãy bớt lại

Hợp âm (4 phách/ô): Em9 | Bm7 | Am7 | EmMaj7 | F#m7b5 | Bm7 | F#m7b5 | B11.

Bậc gốc: i | v | iv | i | ii | v | ii | V.

Số đo: P nốt/ô 15, 12, 12, 15, 18, 20, 20, 14; T attack/ô 5, 5, 5, 5, 5, 5, 5, 4; T đánh riêng 30.8%; P trung bình MIDI 70.05.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:B3/1 1:D4/1 1:E4/1 2:F#4/0.75 2.75:B3/0.75 2.75:D4/0.75 2.75:E4/0.75 3.5:B3/1 3.5:D4/1 3.5:E4/1 3.5:G4/1 4.5:F#3/1 4.5:B3/1 4.5:D4/1 4.5:F#4/1
- Ô 2 P: 1.5:D4/0.75 1.5:F#4/0.75 1.5:A4/0.75 2.25:C5/0.75 3:F#4/1 3:A4/1 3:B4/1 4:D4/0.5 4:F#4/0.5 4:A4/0.5 4:C5/0.5 4.5:D5/0.5
- Ô 3 P: 1:A4/1.75 1:C5/1.75 1:E5/1.75 2.75:D#5/0.25 3:E5/0.25 3.25:D5/0.25 3.5:D#5/0.25 3.75:E5/0.25 4:D5/0.25 4.25:D#5/0.25 4.5:E5/0.25 4.75:G5/0.25
- Ô 4 P: 1:E5/0.25 1.25:D#5/0.25 1.5:E5/0.25 1.75:D5/0.25 2:E5/0.5 2.5:E4/1 2.5:G4/1 2.5:B4/1 2.5:D#5/1 3.5:E4/1 3.5:G4/1 3.5:B4/1 3.5:E5/1 4.5:F#5/0.25 4.75:D#5/0.2
- Ô 5 P: 1:C5/0.5 1:E5/0.5 1.5:F#4/0.5 1.5:A4/0.5 1.5:C5/0.5 1.5:D#5/0.5 2:C5/0.5 2:E5/0.5 2:F#5/0.5 2.5:F#4/1 2.5:A4/1 2.5:C5/1 2.5:E5/1 3.5:C5/1 3.5:E5/1 3.5:F#5/1 4.5:D5/0.25 4.75:C5/0.25
- Ô 6 P: 1:A4/0.5 1:B4/0.5 1:D5/0.5 1.5:A4/0.5 1.5:B4/0.5 2:F#4/0.5 2:A4/0.5 2:B4/0.5 2:D5/0.5 2.5:D4/0.5 2.5:F#4/0.5 2.5:A4/0.5 2.5:C5/0.5 3:D5/0.25 3.25:E5/0.25 3.5:D5/0.25 3.75:F#5/0.25 4:A5/0.333 4.333:D#5/0.333 4.667:E5/0.333
- Ô 7 P: 1:C5/0.75 1:E5/0.75 1:F#5/0.75 1.75:A4/0.75 1.75:C5/0.75 1.75:D5/0.75 2.5:A4/0.5 2.5:C5/0.5 2.5:D#5/0.5 3:E5/0.25 3.25:D5/0.25 3.5:D#5/0.25 3.75:B4/0.25 4:E4/0.5 4:F#4/0.5 4:A4/0.5 4:C5/0.5 4.5:F#4/1 4.5:A4/1 4.5:B4/1
- Ô 8 P: 1.5:E4/0.75 1.5:F#4/0.75 1.5:A4/0.75 2.25:F#4/0.75 2.25:A4/0.75 2.25:C5/0.75 3:A4/0.25 3.25:F4/0.25 3.5:F#4/0.25 3.75:D#4/0.25 4:E4/0.25 4.25:C#4/0.25 4.5:D4/0.25 4.75:D#4/0.25

#### #1012 — Chuyện Tình · E thứ

Nhận xét: có quá nhiều chỗ dặm hợp âm hãy bớt lại

Hợp âm (4 phách/ô): Em7 | F#m7b5 | Bm7 | Em7 | Bm7 | Em7 | B7b13 | Em9.

Bậc gốc: i | ii | v | i | v | i | V | i.

Số đo: P nốt/ô 15, 15, 18, 13, 17, 16, 16, 3; T attack/ô 5, 5, 5, 5, 5, 5, 5, 4; T đánh riêng 33.3%; P trung bình MIDI 70.11.

P đầy đủ (phách:tên nốt/ngân); T lưu số attack phía trên:

- Ô 1 P: 1:B3/1 1:D4/1 1:E4/1 2:G3/1 2:B3/1 2:D4/1 3:G3/0.5 3:B3/0.5 3:D4/0.5 3:E4/0.5 3.5:D4/1 3.5:E4/1 3.5:G4/1 4.5:E4/1 4.5:C5/1
- Ô 2 P: 1.5:C4/1 1.5:E4/1 1.5:F#4/1 1.5:A4/1 2.5:C4/0.5 2.5:E4/0.5 2.5:G4/0.5 3:A4/0.25 3.25:C5/0.25 3.5:D5/0.25 3.75:B4/0.25 4:A4/0.25 4.25:B4/0.25 4.5:D5/0.25 4.75:F#5/0.25
- Ô 3 P: 1:D5/1 1:F#5/1 1:A5/1 2:D5/0.5 2:F#5/0.5 2:A5/0.5 2:B5/0.5 2.5:B4/1 2.5:D5/1 2.5:F#5/1 2.5:A5/1 3.5:A4/1 3.5:B4/1 3.5:D5/1 3.5:F#5/1 4.5:D4/1 4.5:B4/1 4.5:D5/1
- Ô 4 P: 1.5:B4/0.75 1.5:D5/0.75 1.5:E5/0.75 2.25:B4/0.75 2.25:D5/0.75 2.25:E5/0.75 2.25:F#5/0.75 3:B4/1 3:D5/1 3:E5/1 4:G4/0.8 4:B4/0.8 4:D5/0.8
- Ô 5 P: 1:A4/1 1:B4/1 1:D5/1 1:F#5/1 2:A4/0.75 2:B4/0.75 2:D5/0.75 2.75:F#4/0.75 2.75:A4/0.75 2.75:C5/0.75 3.5:F#4/1 3.5:A4/1 3.5:B4/1 3.5:D5/1 4.5:B4/1 4.5:D5/1 4.5:E5/1
- Ô 6 P: 1.5:B4/1 1.5:D5/1 1.5:E5/1 1.5:G5/1 2.5:E4/0.5 2.5:G4/0.5 2.5:B4/0.5 2.5:D#5/0.5 3:B4/0.25 3.25:C5/0.25 3.5:D#5/0.25 3.75:G5/0.25 4:D#5/0.25 4.25:B4/0.25 4.5:C5/0.25 4.75:D#5/0.25
- Ô 7 P: 1:D#4/0.5 1:F#4/0.5 1:A4/0.5 1:B4/0.5 1.5:B4/0.5 1.5:D#5/0.5 2:A4/0.5 2:B4/0.5 2:E5/0.5 2.5:D#5/1 3.5:F#4/1 3.5:A4/1 3.5:B4/1 4.5:G3/1 4.5:B3/1 4.5:G4/1
- Ô 8 P: 1.5:B3/3.5 1.5:D4/3.5 1.5:E4/3.5


## Ý kiến khi nghe — Bossa CP cải tiến, 17/09/2026 (mở rộng cửa thời gian)

Người dùng yêu cầu lấy từ khoảng 12h30, kể cả quá 30 phút. Sổ hiện không có bình luận sau 12h30; hai ý gần nhất là 12:03:13 và 12:10:48 UTC+7, được lấy theo yêu cầu hồi cứu. Không có mẫu Đã ổn mới trong cửa này. Không đổi trạng thái đánh giá hay sửa Nguon.json.

| # | lúc bình luận (UTC+7) | bài | giọng | chấm | ý kiến nguyên văn |
|---|---|---|---|---|---|
| #1096 | 2026-09-17 12:03:13 | Cánh Hồng Phai (intro) | A thứ | Chưa ổn | kỹ thuật bạn soạn từ G qua Am9 rồi từ Am qua Dm11 đúng là dấu ấn của Cà Pháo nhưng tôi thấy Cà Pháo ko hề lặp lại nhiều lần như bạn, việc bạn soạn kỹ thuật từ G qua Am9 rồi từ Am qua Dm11 mà lặp lại như vậy gọi là lạm dụng và tôi ko cho phép lạm dụng. Hãy phân tích kỹ hơn các nguyên tắc của Cà Pháo khi chọn chỗ để áp dụng kỹ thuật trong các sheet của anh |
| #1116 | 2026-09-17 12:10:48 | Cánh Hồng Phai (intro) | A thứ | Chưa ổn | câu intro quá tập trung đánh giai điệu mà bỏ quên phần bass. Tiết tấu đệm bass như kiểu ở Am11 tôi thấy hay xuất hiện trong câu intro Bossa của Sheet Người hãy quên em đi, bạn hãy phát huy tiết tấu đó nhiều hơn trong câu các câu solo. Hãy đối chiều với sheet Người hãy quên em đi và các sheet khác để học cách sắp xếp tiết tấu bass trong câu solo để hòa hợp với giai điệu hơn. |

### Bằng chứng: hai tay, vòng và nhận xét đi cùng nhau

Tên bài ghi `(intro)` nhưng sổ cũ không có cột `doan`; không dùng nhãn ấy để khẳng định loại đoạn của #1096. Bậc lấy bằng `PianoBrain/src/mrhai/analyze.ts`, khai Am: VI/VII tương ứng bVI/bVII so với trưởng; chất hợp âm đọc ở ký hiệu. Nốt dưới đây ghi `mốc trong ô:tên nốt/ngân`, mốc bắt đầu từ 0; mọi nốt cả hai tay được giữ, kể cả đồng thời.

#### #1096

- Nhận xét: kỹ thuật bạn soạn từ G qua Am9 rồi từ Am qua Dm11 đúng là dấu ấn của Cà Pháo nhưng tôi thấy Cà Pháo ko hề lặp lại nhiều lần như bạn, việc bạn soạn kỹ thuật từ G qua Am9 rồi từ Am qua Dm11 mà lặp lại như vậy gọi là lạm dụng và tôi ko cho phép lạm dụng. Hãy phân tích kỹ hơn các nguyên tắc của Cà Pháo khi chọn chỗ để áp dụng kỹ thuật trong các sheet của anh
- Vòng: `Am11 | G | Am9 | G | Am | Dm11 | Bm7b5 | A#9 | E7b13`.
- Bậc gốc: `i | VII | i | VII | i | iv | ii | bII | V`.
- 117 nốt P; 35 mốc T; T đánh riêng 60.0%; cao độ P trung bình 69.74 MIDI. Đây là số đo bản phát, không phải chuẩn của thầy.

```text
ô1 P: 0:B4/1 1:B3/0.25 1:D4/0.25 1:E4/0.25 1:G4/0.25 2.5:B3/0.5 2.5:D4/0.5 2.5:E4/0.5 2.5:G4/0.5 3.5:D4/0.5 3.5:E4/0.5 3.5:G4/0.5
ô1 T: 0:A2/1.5 1.5:D#3/0.5 2:E3/2
  số nốt P=12; mốc T=3
ô2 P: 0.25:B3/0.125 0.25:D4/0.125 0.25:G4/0.125 0.25:B4/0.125 1:D4/0.75 1:G4/0.75 1:B4/0.75 1:D5/0.75 1.75:B4/0.583 2.333:G4/0.167 2.333:B4/0.167 2.333:D5/0.167 2.667:G4/0.167 2.667:B4/0.167 2.667:D5/0.167 3:G4/0.25 3:B4/0.25 3:D5/0.25 3.5:G4/0.25 3.5:B4/0.25 3.5:D5/0.25
ô2 T: 0.25:G3/0.125 0.5:G3/0.5 1:G3/0.5 1.5:D3/0.25 1.75:G3/0.25 2:G3/2.25
  số nốt P=21; mốc T=6
ô3 P: 0.25:G4/0.125 0.25:A4/0.125 0.25:C5/0.125 0.25:E5/0.125 1:G4/0.75 1:A4/0.75 1:C5/0.75 1:E5/0.75 1.75:C5/0.583 2.333:A4/0.167 2.333:C5/0.167 2.333:E5/0.167 2.667:A4/0.167 2.667:C5/0.167 2.667:E5/0.167 3:A4/0.25 3:C5/0.25 3:E5/0.25 3.5:G4/0.25 3.5:A4/0.25 3.5:C5/0.25
ô3 T: 0.25:A3/0.125 0.5:A3/0.5 1:A3/0.5 1.5:E3/0.25 1.75:A3/0.25 2:A3/2
  số nốt P=21; mốc T=6
ô4 P: 0:G4/0.5 0:B4/0.5 0:D5/0.5 1:G4/0.75 1:B4/0.75 1:D5/0.75 1.75:G4/0.125 1.75:B4/0.125 1.75:D5/0.125 2.5:G4/1 2.5:B4/1 2.5:D5/1 3.5:G4/0.5 3.5:B4/0.5 3.5:D5/0.5
ô4 T: 0:G3/2 2:G3/0.125 2.25:D3/0.125 3:G3/0.5
  số nốt P=15; mốc T=4
ô5 P: 0.25:E4/0.125 0.25:A4/0.125 0.25:C5/0.125 0.25:E5/0.125 1:E4/0.75 1:A4/0.75 1:C5/0.75 1:E5/0.75 1.75:C5/0.583 2.333:A4/0.167 2.333:C5/0.167 2.333:E5/0.167 2.667:A4/0.167 2.667:C5/0.167 2.667:E5/0.167 3:A4/0.25 3:C5/0.25 3:E5/0.25 3.5:A4/0.25 3.5:C5/0.25 3.5:E5/0.25
ô5 T: 0.25:A3/0.125 0.5:A3/0.5 1:A3/0.5 1.5:E3/0.25 1.75:A3/0.25 2:A3/2
  số nốt P=21; mốc T=6
ô6 P: 0:C5/1 1:D5/1 2:C5/0.5 2.5:A4/0.5 3:A4/0.25 3.25:F5/0.25 3.5:G5/0.25 3.75:F5/0.25
ô6 T: 0:D3/1.5 1.5:A2/2.5 1.5:D3/2.5 1.5:F3/2.5
  số nốt P=8; mốc T=2
ô7 P: 0:D5/0.5 0.5:A4/0.5 1:D5/0.5 1.5:D5/1 2.5:A4/1 3.5:C5/0.25 3.75:B4/0.2
ô7 T: 0:B2/2 2:B2/0.125 2.25:F2/0.125 3:B2/0.5
  số nốt P=7; mốc T=4
ô8 P: 0.5:F4/0.25 0.5:G#4/0.25 0.5:A#4/0.25 1.25:D4/0.125 1.25:F4/0.125 1.25:G#4/0.125 2:D4/1 2:E4/1 2:G#4/1 3:D4/1 3:E4/1 3:G#4/1
ô8 T: 0:A#2/1.5 1.5:A#2/0.5 2:E3/1.5 3.5:E3/0.5
  số nốt P=12; mốc T=4
```

#### #1116

- Nhận xét: câu intro quá tập trung đánh giai điệu mà bỏ quên phần bass. Tiết tấu đệm bass như kiểu ở Am11 tôi thấy hay xuất hiện trong câu intro Bossa của Sheet Người hãy quên em đi, bạn hãy phát huy tiết tấu đó nhiều hơn trong câu các câu solo. Hãy đối chiều với sheet Người hãy quên em đi và các sheet khác để học cách sắp xếp tiết tấu bass trong câu solo để hòa hợp với giai điệu hơn.
- Vòng: `Am7 | F | G | Em7 | Am11 | Bm7b5 | Bm7b5 | A#9 | E7b13`.
- Bậc gốc: `i | VI | VII | v | i | ii | ii | bII | V`.
- 69 nốt P; 28 mốc T; T đánh riêng 57.1%; cao độ P trung bình 71.26 MIDI. Đây là số đo bản phát, không phải chuẩn của thầy.

```text
ô1 P: 0:B4/1 1:G4/1 1:A4/1 1:C5/1 2:B4/0.5 2.5:A4/1 3.5:B4/0.25 3.75:C5/0.25
ô1 T: 0:A2/1.5 0:E3/1.5 1.5:C3/2 1.5:G3/2 3.5:C3/1 3.5:A3/1 3.5:C4/1
  số nốt P=8; mốc T=3
ô2 P: 0:A4/1 1:C5/0.5 1.5:G4/0.5 2:A4/1 3:C5/0.25 3.25:G4/0.25 3.5:A4/0.25 3.75:G4/0.25
ô2 T: 0.5:C4/2.5 3:C4/1
  số nốt P=8; mốc T=2
ô3 P: 0:B4/1 1:G4/0.5 1.5:A4/0.5 2:A4/0.333 2.333:B4/0.333 2.667:E5/0.333 3:G5/0.333 3.333:B5/0.333 3.667:A5/0.333
ô3 T: 0:G3/0.5 0.5:D3/0.25 0.75:G3/0.25 1:B3/0.25 1.25:D3/0.25 1.5:G3/0.25 1.75:B3/0.25
  số nốt P=9; mốc T=7
ô4 P: 0:B5/1 1:G5/0.5 1.5:A5/0.5 2:B5/1 3:G5/1
ô4 T: 2:E2/2 2:E3/2
  số nốt P=5; mốc T=1
ô5 P: 1:D5/0.5 1:E5/0.5 1:G5/0.5 1.5:D5/0.25 1.5:E5/0.25 1.5:G5/0.25 2.5:A4/0.5 2.5:B4/0.5 2.5:D5/0.5 2.5:E5/0.5 3.5:G4/0.5 3.5:A4/0.5 3.5:C5/0.5
ô5 T: 0:A3/1.5 1.5:E3/0.5 2:E3/2
  số nốt P=13; mốc T=3
ô6 P: 0:B4/1 1:A4/1 2:B4/0.5 2.5:D5/0.5 3:D5/0.25 3.25:A4/0.25 3.5:G#4/0.25 3.75:A4/0.25
ô6 T: 0:B2/0.5 0.5:F3/0.25 0.75:B3/0.25 1:D3/0.25 1.25:F3/0.25 1.5:B3/0.25 1.75:D3/0.25
  số nốt P=8; mốc T=7
ô7 P: 0:B4/1 1:B4/0.5 1:D5/0.5 1.5:A4/0.5 2:B4/1 3:A4/1
ô7 T: 2:B2/2 2:B3/2
  số nốt P=6; mốc T=1
ô8 P: 0.5:F4/0.25 0.5:G#4/0.25 0.5:A#4/0.25 1.25:D4/0.125 1.25:F4/0.125 1.25:G#4/0.125 2:D4/1 2:E4/1 2:G#4/1 3:D4/1 3:E4/1 3:G#4/1
ô8 T: 0:A#3/1.5 1.5:A#3/0.5 2:E3/1.5 3.5:E3/0.5
  số nốt P=12; mốc T=4
```

### Rút ra và việc phải sửa

- #1096: số đo có cùng hình tiết tấu hai tay ở ô 2, 3 và 5 (cụm dặm có chùm ba). Mẫu nguồn giang Người hãy quên em đi beat 20 chỉ xuất hiện một lần trong đoạn đã đo; bộ chọn có hoàn lại đã nhân thủ pháp đặc trưng này lên. Đây là lạm dụng trong bản biên soạn, không phải bằng chứng thầy dùng với tần suất đó. Cần giới hạn mỗi thủ pháp nổi bật một lần và có đoạn tuyến giai điệu phân cách các cụm dặm.
- #1116: Am11 ô 5 có LH tại 0/1.5/2, ngân 1.5/.5/2; người dùng muốn phát huy. Các ô 3 và 6 cùng dùng LH chạy nửa ô rồi nhường, ô 4 và 7 cùng chờ tới phách 2 mới có bass: sự lặp này làm phần nền hụt theo ý người dùng. Cần trả nền bass intro cùng loại đoạn cho các ô thông thường, giữ bàn giao hai tay như điểm nhấn có ngân sách, không lấy mẫu outro làm nền lặp của intro.
- Không mâu thuẫn với yêu cầu trước là bass có chỗ nghỉ: nghỉ có chủ đích khác với làm thưa phần lớn nền. Không dùng số 41%/73.6 của skill Linh Nhi làm chuẩn Cà Pháo; số mốc T ở bảng cũ và ở đây có định nghĩa/cửa đo khác nhau, không coi là cùng một chỉ tiêu.
- Hai câu này chỉ là bằng chứng cần sửa, không là mẫu Đã ổn. Đã sửa ở KeyTrain: chống lặp cụm dặm theo signature hai tay, tách các ô dặm ít nhất một ô phát triển, neo bass intro 0/1.5/2 và 0/1.5 cho nền; tối đa một bàn giao LH→RH trong một solo. Việc chọn nền LH không cắt đường RH ở mỗi đầu ô. Kiểm chứng 17/9: 86 test liên quan qua, TypeScript/build và lint hai file sửa qua. Chờ nghe lại, không ghi là đã duyệt; chưa commit.

## Ý kiến khi nghe — #1143, 17/09/2026 15:07 (UTC+7)

Hồi cứu theo yêu cầu “khoảng 3h hay 3h30”, vượt cửa 30 phút. Mốc thật: tạo 14:56:01, bình luận **15:07:18**. Chỉ có **1 câu mới Chưa ổn có bình luận; 0 mẫu Đã ổn mới** sau đợt #1096/#1116. Không sửa sổ thô.

| # | bài | giọng | chấm | ý kiến nguyên văn |
|---|---|---|---|---|
| #1143 | Cánh Hồng Phai (intro) | A thứ | Chưa ổn | Những chỗ cần phân tich và học để nắm được nguyên tắc soạn của Cà Pháo: <br> -kỹ thuật chạy đánh chuỗi nốt giai điệu ở Dm11. <br> -tiết tấu đánh bass và kỹ thuật đi bass từ Am11 đến Dm9, tại sao các kỹ thuật đó Cà Pháo xếp liền kề nhau, có phải do thói quen tiết tấu cả bài bossa nên là anh có thể đánh chùm bass và tiết tấu đó. Có nên tách chùm đó ra ko?  <br> -Giai điệu từ Am11 đến Dm9 rồi dẫn qua E7 |

### Bộ ba bằng chứng #1143

- Vòng: `Am9 | Dm7 | Am9 | Dm11 | Am11 | Dm7 | Am7 | Dm9 | E7`.
- Bậc (parser PianoBrain `analyze(..., 'Am')`): `i | iv | i | iv | i | iv | i | iv | V`. Chất mở rộng nằm trong ký hiệu trên.
- Sổ không lưu thời lượng từng hợp âm: không tự gán mỗi ký hiệu đúng một ô; có 9 ký hiệu trong 8 ô.
- Nốt: `mốc trong ô:tên nốt/ngân`, 0-based; đủ cả hai tay, kể cả nốt đồng thời.

- Ô 1 P: 0:B4/1 · 0:D5/1 · 1:C5/1 · 2:B4/0.5 · 2.5:A4/0.5 · 3:G4/0.5 · 3.5:C4/1.5 · 3.5:A4/1.5 · 3.5:C5/1.5
- Ô 1 T: 0:A2/1.5 · 0:E3/1.5 · 1.5:C3/2 · 1.5:G3/2 · 3.5:C2/1 · 3.5:A2/1 · 3.5:C3/1
- Ô 2 P: 1:F4/0.25 · 1.25:E4/0.25 · 1.5:C4/0.25 · 1.75:F4/0.25 · 2:A4/0.5 · 2.5:G4/1 · 3.5:A4/0.25 · 3.75:C5/0.25
- Ô 2 T: 0.5:A2/2.5 · 3:C3/1
- Ô 3 P: 0:D5/1 · 1:C5/0.5 · 1.5:B5/0.5 · 2:C6/0.25 · 2.25:A5/0.25 · 2.5:B5/0.25 · 2.75:G5/0.25 · 3:A5/0.5 · 3.5:G5/1
- Ô 3 T: 0:A2/1.5 · 1.5:E2/2.5 · 1.5:A2/2.5 · 1.5:C6/0.5
- Ô 4 P: 0.5:A5/0.125 · 0.5:C6/0.125 · 0.625:F5/0.125 · 0.75:E5/0.125 · 0.875:D5/0.125 · 1:E5/1 · 2:F5/0.5 · 2.5:G5/0.25 · 3:A5/0.5 · 3.5:D5/1.5 · 3.5:E5/1.5 · 3.5:G5/1.5
- Ô 4 T: 0:D3/1.5 · 1.5:A2/2.5
- Ô 5 P: 1:D5/0.5 · 1:E5/0.5 · 1:G5/0.5 · 1.5:D5/0.25 · 1.5:E5/0.25 · 1.5:G5/0.25 · 2.5:A4/0.5 · 2.5:B4/0.5 · 2.5:D5/0.5 · 2.5:E5/0.5 · 3.5:D4/1 · 3.5:A4/1 · 3.5:C5/1
- Ô 5 T: 0:A2/1.5 · 1.5:E2/0.5 · 2:E2/2
- Ô 6 P: 0.5:D5/0.833 · 1.333:E5/0.333 · 1.667:F5/0.333 · 2:G5/0.75 · 2.75:F5/0.583 · 3.333:E5/0.333 · 3.667:D5/0.333
- Ô 6 T: 0:D2/1.5 · 1.5:A2/1.5 · 1.5:F3/1.5 · 1.5:A3/1.5 · 3:A2/1
- Ô 7 P: 0:C5/0.75 · 0.75:A4/0.75 · 1.5:B4/0.167 · 1.667:C5/0.167 · 1.833:D5/0.167 · 2:C5/1 · 3:A4/0.5 · 3.5:A4/1.5 · 3.5:C5/1.5
- Ô 7 T: 0:A2/1 · 1:E2/1.5 · 2.5:C2/1 · 3.5:D2/1 · 3.5:A2/1 · 3.5:C3/1
- Ô 8 P: 1:A4/0.25 · 1:C5/0.25 · 1.5:B4/1 · 2.5:B4/0.25 · 2.5:D5/0.25 · 3:D5/0.25 · 3:E5/0.25 · 3.5:E5/0.5 · 3.5:Ab5/0.5
- Ô 8 T: 0.5:C3/0.5 · 1:D3/0.25 · 1:C4/0.25 · 1.5:E2/0.5 · 1.5:E3/0.5 · 2:Ab2/2

Số nốt RH/ô: `9, 8, 9, 12, 13, 7, 9, 9`; mốc gõ LH/ô: `3, 2, 2, 2, 3, 3, 4, 4`. Mốc LH gõ riêng: 14/23 (60.9%); tâm RH MIDI 73.59. Đây là số đo câu KT, không phải số đo sheet.

### Điều phải làm từ bình luận và yêu cầu mới

Không biến cả intro Người hãy quên em đi thành khuôn cố định rồi chỉ thay nốt. Phân tích cụm bass–giai điệu và ranh giới kỹ thuật trước khi cho phép tách/di chuyển; giữ đơn vị liên kết khi còn nốt nối, đối đáp hay bass dẫn chưa tới đích. Phân tích cả 9 sheet, phân biệt điệu và giọng; chỉ nguồn đã xác nhận giọng được dạy chọn nốt. “Bỏ nhịp” cần tách thành không gõ mới nhưng còn ngân, một tay nghỉ để tay kia nói, hay cả hai thật sự nghỉ.


## Thói quen tổ chức solo — đo lại 9 sheet, 17/09/2026

**Chỉ quan sát được cách viết; không khẳng định biết ý nghĩ của nhạc sĩ.**
Không lấy nguyên cả solo Người hãy quên em đi làm stencil rồi thay nốt.
Không chắp các ô kỹ thuật độc lập rồi thêm bass/đổi gate để chữa mối nối.

Đã đo 183 ô nội bộ solo từ đủ 9 XML (bỏ ô đầu/cuối để giảm lẫn lời lấy đà),
1222 attack RH / 886 attack LH; đã ghép ties, hợp âm cùng tay là một attack.
Hai bài Kém duyên/Yêu xa chưa xác nhận giọng: được đo nhịp/phối tay, chưa dạy chọn
nốt trưởng/thứ. Nguồn nốt xác nhận vẫn 7 bài/21 đoạn; không tự suy giọng từ dấu hóa.

| Bài | Ô nội bộ | LH gõ riêng (% attack LH) | Không gõ LH đầu ô / còn ngân |
|---|---:|---:|---:|
| Hồng Kông 1 | 36 | 56.6 | 7/5 |
| Người hãy quên em đi | 16 | 75.4 | 3/3 |
| Có Em Chờ | 17 | 64.0 | 0/0 |
| Ngày mai em đi | 21 | 73.0 | 0/0 |
| Kém duyên | 16 | 39.5 | 0/0 |
| Yêu xa | 20 | 45.5 | 5/0 |
| Để Em Rời Xa | 12 | 68.5 | 0/0 |
| Chưa Bao Giờ | 14 | 58.6 | 1/0 |
| Chúng Ta Không Thuộc Về Nhau | 31 | 57.3 | 0/0 |

“LH gõ riêng” không có nghĩa RH đang im. Ngân là trường độ ký âm, chưa đo pedal/audio.
Phải dùng chiều dài ô thật; đoạn kết Hồng Kông 1 có 2/4, không ép mọi ô thành 4 phách.

### Những điều thay cho các định mức cũ

- **Có điểm tựa rồi mới nhường tay.** Bossa 3/3 ô nội bộ không gõ LH đầu vẫn có
  ngân từ ô trước. Cắt ngân ở vạch ô rồi gọi đó là “bỏ bass theo thầy” là sai.
  Yêu xa có nhiều vùng RH tự chạy khi LH đã nghỉ; không áp định mức ấy lên Bossa.
- **Dặm theo vùng chức năng, không theo quota.** Intro Bossa ô 5 là tương phản
  giữa các tuyến chạy; giang 41–46 thiên về đối đáp hợp âm rồi 47–48 chuyển chạy.
  Hồng Kông 1 giang 56/60 đặt điểm cụm giữa vùng RH dày. Không dùng luật cứng
  “cách 8 phách mới được dặm” cho mọi solo như bản sửa #1096 trước.
- **Có lặp chủ đích.** Có Em Chờ 53 nhắc 5; CTKTVN outro 65–76 có cụm/nốt lặp.
  CTKTVN có 58/170 bước RH liên tiếp bằng 0 ở mẫu nội bộ; Hồng Kông 1 5/198.
  Chống lạm dụng một cú biểu diễn không đồng nghĩa cấm ba nốt giống nhau toàn cục.
- **Kỹ thuật gồm cả hai tay và chỗ giải.** Cú giật Bossa outro 97: LH
  `0/1.5/2/3.5`, RH `.5/1.25/2/3`, đổi hợp âm tại 2, nhả staccato RH.
  Không thể khôi phục chỉ bằng thêm nốt trầm hoặc tăng lực RH.
- **Tách được khi động tác đã hoàn tất.** Bossa intro ô 7→8 có bass/cụm RH ngân
  qua vạch; câu ở ô 4 là lướt xuống → phát triển lên → cụm đáp cuối ô. Không cắt
  giữa nhóm chia nhỏ, ngân hoặc bass dẫn chưa tới đích. Có thể lấy thủ pháp cùng
  điều kiện vào/ra, không phải giữ nguyên toàn bộ intro và vòng hợp âm của nó.
- **Nốt xét hai trục: giọng đoạn và hợp âm tại chỗ.** Trên hợp âm thứ của đoạn
  thứ, số đếm RH top nổi bật b3=83, b7=74, 11=49, 5=48, 9=44; trên hợp âm trưởng
  của đoạn trưởng: 5=73, 3=71, 9=60, 1=53, 7=49, 13=43. Đây chỉ là số đếm mô tả,
  không phải xác suất gieo từng nốt. Chưa lọc tinh hết cửa lời Ballad nên chưa
  đưa trực tiếp các tỷ lệ này thành luật runtime.

Các dấu hiệu nối bán cung, quãng gãy, đổi hướng, cụm hợp âm và lệch phách có mặt
ở cả 9 bài; gọi là vốn thường gặp trong kho, chưa chứng minh là độc quyền Cà Pháo.
Chỉ có một sheet Bossa nên các suy luận về cấu trúc Bossa vẫn cần nghe duyệt.

### Hệ quả cho bộ soạn (đặc tả, chưa đánh dấu triển khai)

Lập vai trò câu mới trước → chọn kỹ thuật theo điệu/vị trí → xét trạng thái
hai tay/cửa vào-ra → soạn hòa âm và tuyến nốt cùng nhau → kiểm mối nối.
Nguồn Ballad chỉ bổ sung màu/quãng/đường chạy cho Bossa, không nhập lưới Ballad.
Không dùng nguyên timeline solo Bossa qua mọi take; cũng không xào từng ô rời.
Giữ mô phỏng sheet là chế độ riêng, bảo toàn khung hát 11 tiếng và CP Lick/Run.

Bản phân tích chi tiết từng bài, trả lời #1143 và cách tái lập:
`D:/KeyTrain/Reference/CP-THOI-QUEN-SOLO-2026-09-17.md`.
Công cụ read-only: `D:/KeyTrain/tools/cp_solo_habits.py` (`--melody` cho màu nốt).
Đây là lần học/đối chiếu, không phải tuyên bố bộ soạn đã nghe hay hoặc mô phỏng
đầy đủ tư duy nhạc sĩ. Các mục “Chưa đo” cũ dưới đây chỉ còn giá trị lịch sử ở
những nội dung đã được cập nhật bằng số đo phía trên.

## Ý kiến khi nghe — #1222, 18/09/2026 09:35 (UTC+7)

Chuyển thủ công theo yêu cầu, kiểm cửa 30 phút lúc 02:45 UTC: **1 câu Chưa ổn có lời bình, 0 mẫu Đã ổn mới; 1 bộ ba**. Không sửa `Nguon.json`. Cột bài còn tên “Cánh Hồng Phai (intro)” nhưng `doan=interlude`: đây là **giang tấu**, không phải intro.

| # | lúc nghe / bình luận (UTC+7) | bài, đoạn | giọng | chấm | ý kiến nguyên văn |
|---|---|---|---|---|---|
| #1222 | 09:33:26 / 09:35:46 | Cánh Hồng Phai — giang tấu | A thứ | Chưa ổn | Từ G13 đến Dm9 giai điệu nghe bị chỏi với phần đầu câu giang tấu. Hãy phân tích trong các sheet giọng thứ của Cà Pháo rồi train lại |

### Bộ ba bằng chứng #1222

- Vòng: `Am11 | G13 | Fmaj7 | G13 | Em7 | G13 | Dm9 | E11`.
- Bậc từ `PianoBrain analyze(..., 'Am')`: `i | VII | VI | VII | v | VII | iv | V`. Parser dùng VI/VII cho bậc tự nhiên của gam thứ; tương ứng bVI/bVII khi so với gam trưởng. Chất hợp âm giữ ở hàng ký hiệu.
- Có 8 ô, 144 nốt cả hai tay. Sổ không lưu thời điểm đổi từng hợp âm: không tự coi tám ký hiệu là tám ô bằng nhau khi phân tích gate.
- Nốt dưới ghi đủ hai tay: `mốc trong ô:tên nốt/ngân`, mốc 0-based, đơn vị phách; Eb là tên enharmonic của D# khi làm nốt dẫn E.

- Ô 1 P: 1:A3/1 · 1:B3/1 · 1:D4/1 · 1:E4/1 · 2:A3/0.125 · 2:B3/0.125 · 2:D4/0.125 · 2:E4/0.125 · 3.5:A3/0.75 · 3.5:B3/0.75 · 3.5:D4/0.75 · 3.5:E4/0.75
- Ô 1 T: 0:A2/0.75 · 0.75:A2/0.125 · 1.5:A2/0.75 · 2.25:A2/0.125 · 2.5:A2/0.5 · 3:A2/0.5 · 3.5:B2/0.75
- Ô 2 P: 0.25:B3/0.125 · 0.25:D4/0.125 · 0.25:E4/0.125 · 0.25:G4/0.125 · 1:B3/0.75 · 1:D4/0.75 · 1:E4/0.75 · 1:G4/0.75 · 1.75:F4/0.583 · 2.333:D4/0.167 · 2.333:E4/0.167 · 2.333:G4/0.167 · 2.667:D4/0.167 · 2.667:E4/0.167 · 2.667:G4/0.167 · 3:B3/0.25 · 3:D4/0.25 · 3:F4/0.25 · 3.5:E4/0.25 · 3.5:G4/0.25 · 3.5:A4/0.25
- Ô 2 T: 0.25:G2/0.125 · 0.5:G2/0.5 · 1:G2/0.5 · 1.5:D2/0.25 · 1.75:G2/0.25 · 2:G2/2
- Ô 3 P: 0:F4/0.5 · 0:A4/0.5 · 0:C5/0.5 · 1:F4/0.75 · 1:A4/0.75 · 1:C5/0.75 · 1.75:C4/0.125 · 1.75:F4/0.125 · 1.75:A4/0.125 · 2.5:F4/1 · 2.5:A4/1 · 2.5:C5/1 · 3.5:F4/0.75 · 3.5:A4/0.75 · 3.5:E5/0.75
- Ô 3 T: 0:F2/2 · 2:F2/0.125 · 2.25:C2/0.125 · 3:F2/0.5
- Ô 4 P: 0.25:B4/0.125 · 0.25:D5/0.125 · 0.25:F5/0.125 · 1:D5/0.5 · 1:E5/0.5 · 1:G5/0.5 · 2.25:B4/0.375 · 2.25:D5/0.375 · 2.25:F5/0.375 · 3:B4/0.25 · 3:D5/0.25 · 3:E5/0.25 · 3.5:G5/0.25 · 3.75:F5/0.25
- Ô 4 T: 0:G2/0.5 · 0.5:G2/1 · 1.5:B2/0.125 · 1.75:B2/0.125 · 2:G2/0.25 · 2.5:G2/0.125 · 2.75:G2/0.125 · 3.25:G2/0.125
- Ô 5 P: 0:B4/1 · 0:D5/1 · 1:E5/1 · 2:G5/0.5 · 2.5:E5/0.5 · 3:E5/0.5 · 3.5:D5/1.5 · 3.5:E5/1.5 · 3.5:G5/1.5
- Ô 5 T: 0:E2/1.5 · 0:B2/1.5 · 1.5:G2/2 · 1.5:D3/2 · 3.5:G2/1 · 3.5:E3/1 · 3.5:G3/1
- Ô 6 P: 1:F5/0.25 · 1.25:B5/0.25 · 1.5:D5/0.25 · 1.75:G5/0.25 · 2:F5/0.25 · 2.25:E5/0.25 · 2.5:G5/1 · 3.5:F5/0.25 · 3.75:E5/0.25
- Ô 6 T: 0.5:D3/2.5 · 3:F3/1
- Ô 7 P: 0:G5/0.75 · 0.75:F5/0.75 · 1.5:Eb5/0.167 · 1.667:E5/0.167 · 1.833:F5/0.167 · 2:D5/1 · 3:E5/0.5 · 3.5:C5/1.5 · 3.5:D5/1.5
- Ô 7 T: 0:D3/1 · 1:A2/1.5 · 2.5:F2/1 · 3.5:D2/1 · 3.5:A2/1 · 3.5:C3/1
- Ô 8 P: 1:A4/0.25 · 1:C5/0.25 · 1.5:D5/1 · 2.5:D5/0.25 · 2.5:E5/0.25 · 3:A4/0.25 · 3:C5/0.25 · 3.5:B4/0.5 · 3.5:D5/0.5
- Ô 8 T: 0.5:C3/0.5 · 1:D3/0.25 · 1:C4/0.25 · 1.5:E2/0.5 · 1.5:E3/0.5 · 2:B2/2

RH nốt/ô: `12, 21, 15, 14, 9, 9, 9, 9`; LH mốc/ô: `7, 6, 4, 8, 3, 2, 4, 4`. LH gõ riêng 27/38 (71.1%); cao độ trung bình RH MIDI 69.89. Đây là số đo câu KT, không áp định mức của Linh Nhi cho Cà Pháo.

### Đối chiếu ban đầu — chưa kết luận chỉ do va chạm hai tay

Ý người dùng chỉ đích danh G13→Dm9 và so với phần đầu giang. Ở ô 6, top line
F5→B5→D5→G5 có bước +6, −9, +5 trong ba móc kép liên tiếp. Ô 7 có D#5→E5→F5
ngắn. Việc tất cả nốt (trừ nốt dẫn) thuộc gam hoặc hợp âm **không đủ** để câu
nghe liên kết. Mở câu top E4, đoạn sau lên tới B5: phải xét phát triển mô-típ,
đường chạy và tầm âm, không quy lời “chỏi” thành một nốt ngoài gam duy nhất.

Không có mâu thuẫn cần bác lời người dùng: số đo đúng gam không chấm được thẩm mỹ.
Yêu cầu thực hiện: đối chiếu Người hãy quên em đi và các sheet thứ, sửa cách
chọn đường giai điệu/nối tension trong engine Bossa; giữ vòng, tiết tấu và kỹ thuật
đã gần đạt. Không thay câu đã lưu #1222 bằng một câu mới rồi nhận là bản cũ.

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
