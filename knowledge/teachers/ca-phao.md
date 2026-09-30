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

## Đệm ballad hai tay — *Để Em Rời Xa*, đo 25/9/2026

**Mốc chuyển đoạn — anh chơi tới sát vạch rồi vào thẳng đoạn mới (đo 26/9/2026).** Phép đo (26/9/2026): ở mỗi đầu đoạn mới (trừ đoạn đầu), lấy mọi nốt bắt đầu trong 4 nốt đen trước vạch, đo từ lúc nốt cuối tắt tới vạch — "lặng trước vạch", nốt đen. Tái lập: `KeyTrain/tools/moc_chuyen_doan.py` (`--trai`: riêng tay trái).
- **Ballad** (Có Em Chờ · Ngày mai em đi · Kém duyên · Yêu xa · Để Em Rời Xa · Chưa Bao Giờ · Chúng Ta; Hồng Kông 1 không
  đọc được file): cả hai tay lặng 0 ở **40/40** mốc; riêng tay trái 0 ở 32/40, ≤ ½ ở 3, dài hơn ở 5.
- **Bossa** (Người hãy quên em đi): cả hai tay 0 ở **6/6** mốc; tay trái 0 ở 3/5, 1 và 2 nốt đen ở 2 mốc.
→ KeyTrain nút **"Mặc định"** ở menu mốc chuyển đoạn = im 0 (chung mọi thầy, `NGHI_MAC_DINH`). Màu Cà Pháo nay cũng nghe
số phách nghỉ người dùng chọn: câu chạy CP kết ở vạch cũ, nghỉ **đôn ra** thêm vào ô nối, đệm tắt suốt chỗ nghỉ.

Số đo đầy đủ và lệnh tái tạo: `KeyTrain/Reference/CA-PHAO-BALLAD-DE-EM.md` ·
`KeyTrain/scripts/audit_cp_de_em.py`. Một bài; chưa đối chiếu các bài ballad khác.

**Bẫy: vạch nhịp ký âm lệch nhạc đúng một phách.** Bass rơi ở offset 1 của ô XML trong **68/70 ô**,
ký hiệu hợp âm lệch theo. Mọi số "phách trong ô" của bài này đo trên lưới XML đều lệch pha, **chưa
đo lại**. Kho solo của bài cũng vậy.

**Lúc hát tay phải là giai điệu lời**: nốt đỉnh hai lượt phiên trùng từng nốt. Cú tay phải
không mang giai điệu chỉ **19/454**. Anh phối hợp hai tay bằng cách **chêm bè hoà âm dưới nốt giai
điệu, đúng chỗ tay trái trống**. Trên 30 ô phiên: tay trái gõ phách 1 (30) · 3& (19) · 4 (29), còn cú
tay phải có bè dày nhất ở phách 2 (18/21) · 1.75 (15/17) · 2.75 (14/21). Bè luôn gõ cùng một nốt
giai điệu, không có nhịp riêng. Tay trái tự gánh bass lẫn nốt hợp âm.

Nút KeyTrain **Ballad Để em**: bản 1 (ô thật 8–9) bị chê *"dở"*. Bản 2 soạn trên mốc gõ Ballad DERX của Codex (cửa sổ 4–5 · 24–25), thêm ngân nối và trả quãng đôi tay phải. Lý do: bỏ giai điệu thì phiên còn 2,09 nốt vang TB so với 3,00 khi đủ hai tay (480 móc kép).

**Hai tay đan nhau, cú hai tay chỉ ở phách 1 và 4** (đo 26/9/2026, 30 ô thật phiên đủ 4 phách,
`KeyTrain/scripts/audit_cp_de_em_bum_chat.py`). Hai tay gõ cùng lúc: phách 1 **23/30**, phách 4 **24/30**; mọi mốc móc kép khác
≤ 8/30. Chỗ khác một tay gõ thì tay kia nghỉ: tay trái đứng riêng một nốt (2½: 19/19 cú tay trái là một nốt), tay phải đứng riêng
thường chỉ một nốt giai điệu (¼: 8/8, ½: 12/19, 3¼: 13/16), hai nốt ở 1¾ · 2¼ · 2¾, ba nốt ở phách 2 (7/21). Một bài; chưa đối chiếu
ballad khác.

### Điệu Ballad Để em — ĐÃ NGHE DUYỆT 26/9/2026 (KeyTrain bản 36, `89a8a82`)

Người dùng: *"điệu ballad Để em đã ổn hãy lưu lại"*. Duyệt cả hai nút: phiên (dưới đây) và điệp (mốc gõ DERX của Codex, cửa sổ
24–25, ngân nối — không đổi từ bản 2). Phiên, 2 ô, trên vòng sheet Bbmaj7 | C | Dm7 (cột "nguồn": **sheet** = số đo, **người
dùng** = ý người dùng, **Claude** = ý Claude):

| tiếng | vị trí | tay trái | tay phải | nguồn |
|---|---|---|---|---|
| 1 Bùm | ô 1 phách 1 | Bb2 F3 A3 (1¾) | D4 (1¾) · F4 (½) | sheet cửa sổ 4 |
| 2 chát | ô 1 phách 2 | — | F4+Bb4 (¾) | sheet cửa sổ 4 |
| 3 bùm | ô 1 phách 2¾ | C3 (½) · G3 (¾) | E4+C5 (½) | sheet cửa sổ 4 |
| 4 chát | ô 1 phách 3¼ | — | E4+G4 (½) | sheet E4/A4 (A4 ngoài hợp âm → G4) |
| 5 bum | ô 1 phách 3& | A3 (walking) | — | đan tay: sheet; walking: ý người dùng |
| 6 chát | ô 1 phách 3¾ | — | G4+C5 | sheet 6/6 cửa sổ |
| 7 bùm | ô 1 phách 4 | G3 (walking) | C4 | sheet 5/6 (cú hai tay duy nhất nửa sau ô) |
| 8 chát | ô 1 phách 4¼ | — | E4 (½) | sheet 6/6 |
| 9 bum | ô 1 phách 4& | E3 (walking) | — | đan tay: sheet |
| 10 chát | ô 1 phách 4¾ | — | C4 | sheet C4 hoặc F4 (2/6 mỗi thứ) |
| 11 bùm | ô 2 phách 1 | D3 | F4+A4 (½) | khung người dùng ("8bùm-9bum") |
| 12 bum | ô 2 phách 1¼ | E3 | — | khung người dùng |
| 13 chát | ô 2 phách 1& | — | F4+C5 | khung người dùng |
| 14 bùm | ô 2 phách 1¾ | F3 | F4+A4 | khung người dùng |
| lấp | ô 2 phách 2 → 3 | D3 · Bb2 (walking) | A4+D5 · F4 · F4+C5 (ngân suốt câu chạy) | ý Claude, đan tay như sheet ô 9 · 37 |
| câu chạy | ô 2 phách 3¼ → 4¾ | A2 D3 E3 F3 E3 D3 C3 | (F4+C5 còn ngân) | sheet cửa sổ 5 |

**Cách chọn hợp âm:** không đổi hợp âm — điệu chơi đúng vòng bài người dùng nhập (kể cả màu add9 · 9sus4), chỉ chọn nốt trên hợp
âm đang vang.

**Cách chọn nốt:**
- **Tay phải — theo bậc của hợp âm đang vang, đường đỉnh chép từ sheet.** Ba chát câu chạy một giữ đỉnh bậc 5 → 8 → 3 như tay phải
  sheet ở cùng mốc (A4 → C5 → E4 trên C; A4 là bậc 6 ngoài hợp âm, đổi về bậc 5 để trên hợp âm thứ không thành nốt ngoài giọng).
  Tiếng giai điệu một nốt: bậc 1 hoặc bậc 3 (sheet 4¼ E4 6/6). Không dùng scale — chỉ nốt hợp âm.
- **Tay trái — walking bass** (ý người dùng; sheet ở các mốc ấy đứng bậc 5 G3 G3 G3). Bộ soạn thử mọi dòng từ nốt tay trái của tiếng
  trước tới nốt bass của tiếng kế, chấm điểm, lấy dòng ít điểm nhất — không xúc xắc:
  - **có dùng gam**: gam của hợp âm đang vang — trưởng (bảy thứ nếu hợp âm có b7) cho hợp âm trưởng/treo, thứ tự nhiên cho hợp
    âm thứ; nốt ngoài gam phạt, trừ nốt cuối dẫn nửa cung vào đích (chromatic approach);
  - tiếng bùm (có tay phải cùng gõ) ưu tiên nốt hợp âm; bước liền bậc 1–2 nửa cung, nhảy quãng 3 chỉ khi liền bậc buộc chói; bước
    cuối vào đích luôn liền bậc; ít đổi chiều;
  - không chói (quãng 2 thứ / 7 trưởng / tăng 4) với mọi nốt tay phải vang trong lúc nốt bass ngân.
  Gam và trọng số là suy đoán của Claude, không có sheet đứng sau — người dùng duyệt bằng tai.

**Ý người dùng qua 36 bản, giữ lại làm căn cứ:**
- *"tiếng 1 2 3 là phải để nguyên ko chạm tới"* — tiếng đã duyệt không cắt, dời hay rút ngân để lấy chỗ.
- *"Bum nếu đứng liền trước hoặc sau tiếng bùm thì nó là tiếng dẫn vào hoặc nối tiếp của bùm"*; bum = walking bass, không phải
  giai điệu.
- Tiếng "phụ" muốn nhẹ thì hạ lực; tiếng lướt lệch lưới ⅛ phách nghe *"lệch tiết tấu"*.
- Rồi tự rút lại: *"định nghĩa về bùm chát của tôi đã quá cứng nhắc làm cho câu đệm mất hay"* → chốt theo lối đan tay của sheet.

### Đệm rải hai tay — *Anh Cứ Đi Đi* từ ô 9, đo 29/9/2026 (nút KeyTrain "Ballad cứ đi" — điệu đã duyệt 30/9, xem mục kế)

Người dùng: *"từ ô 9 trở đi … CP đệm bằng kỹ thuật rải hợp âm kết hợp 2 tay và về sau có thể có thêm một số kỹ thuật khác"*.
Tái lập: `KeyTrain/scripts/audit_cp_acdd_rai.py`; hồ sơ nút: `KeyTrain/Reference/CA-PHAO-BALLAD-CU-DI.md`.

- **Giọng Fa thứ** (4 giáng · hợp âm cuối Fm7 · hay gặp Bbm7 / Fm / Db). **Vạch nhịp đúng pha**: bass đầu ô là gốc in ở mọi ô đo
  (khác Để Em Rời Xa). Lưới móc kép, 0 cú lệch lưới.
- **Anh rải VẮT HAI TAY ở phiên**: chuỗi móc kép liền đi lên có cả hai tay ở ô 9–16 **7/8** ô, phiên 2 (38–45) 5/8, ô 1–8 chỉ 3/8
  (tay trái rải móc đơn), điệp 2/16 · 6/16. Nửa đầu ô: tay trái 1–5–8–9 (–10) rồi tay phải bắt tiếp lên tầm giai điệu — ô 9 F2 C3
  F3 G3 Ab3 | C4 F4 C5; chuyển tay hay nhất ở phách 2¼ (4/11). Nửa sau: tay trái gốc phách 3 (7/8) · bậc 5 phách 3¼ (7/8) · một
  nốt phách 4& (6/8); tay phải đệm một cặp phách 4 (4/8: 3+b7 trên hợp âm bảy, 3+5 trên Ab).
- **Câu rải tay phải lặp ở mọi lượt phiên** (ô 2 · 10 · 39: Db4 F4 Db5 cùng mốc) — nên so hai lượt phiên để tách giai điệu lời sẽ
  nhận nhầm chuỗi rải là giai điệu. Nốt tay phải nối tiếp làn rải tay trái là phần đệm.
- **Điệp — kỹ thuật khác, chưa dựng:** tay phải giai điệu quãng tám, dặm cụm ba nốt, tay trái rải nửa vời xen bass quãng tám.
- **Tay trái DƯỚI CÂU SOLO vẫn là sóng rải** (giang ô 33–37 · kết ô 62–67, n = 11 ô có tay trái): gốc · 5 · 8 (· 9) · 10 móc kép rồi
  ngân — ô 33 F2 C3 F3 G3 Ab3 đúng sóng lúc hát; phách 4–4¾ gõ nốt hợp âm đang vang (ô 62 G3 → Eb3, ô 35 D3 → F3), không đi bass
  sang hợp âm sau. Gốc có lúc xuống quãng 1 (Ab1 · G1 · C1).
- **Chỗ chuyển đoạn** (ô 16 · 32 · 45 · 61, n = 4): **1/4 là câu chạy đàn** — ô 16 vào điệp, tay trái 8 móc kép phách 3–4 Db3 F3 Ab3
  B3 | Bb3 G3 E3 C3 (C7b9 lên, C7 xuống), tay phải giữ giai điệu quãng tám. Ô 32 · 61: nửa đầu sóng rải, nửa sau tay trái giữ C7
  hai phách, tay phải là giai điệu lấy đà. Ô 45: tay trái hai quãng Db3+B3 · C3+Bb3, không chạy.
- **Nghi là câu chêm lúc hát — VAI CHƯA XÁC NHẬN** (ô 21 · 29 · 50 · 58): tay phải 4–6 móc kép từ phách 3½ hoặc 3¾ tới 4¾, xen
  quãng tám; tay trái chỉ MỘT nốt ngân 1–1½ phách. Đây là suy đoán của Claude từ hình nốt (sheet không có lời, người dùng chưa chốt
  cửa lời trong phần hát của bài này) — có thể là giai điệu lời. Ghi 29/9 như số đo là sai; sửa 30/9.
- **Câu fill lúc hát — chỗ đặt** (đo 30/9/2026 trên 5 cửa fill người dùng đã xác nhận ở hai bài khác: Để Em 40 · 59, Chưa Bao Giờ
  22 · 50→51 · 75→76; `KeyTrain/src/reharm/style/cuDiFill.ts`):
  · **4/5 ôm lấy vạch nhịp** sau chỗ lời dứt: mở ở phách 4¼ ô trước rồi rơi vào phách 1 ô sau (50→51, 75→76), hoặc mở ngay phách 1
    ô sau (40, 22); 1/5 giữa ô (59, phách 3). Cả 4 chỗ ôm vạch đều **cùng một hợp âm** hai bên vạch.
  · **4/5 là thế bấm leo 1–3 quãng tám** (40 A5 → D6+F#6+A6 → D7; 59 cụm năm nốt Db4 → Db6; 22 Ab3 → F7 rồi xuống; 50→51 C4+Bb4+C5
    → F5+Bb5 → C6+F6 → Bb6+C7+F7); 1/5 đường đơn (75→76 Eb4 G4 | Ab4 Eb5 G4 Ab4 F4).
  · 3–8 cú móc kép; **4/5 kết bằng một cú ngân ½–1 phách ở đỉnh**; tay phải trở lại sau ≥ ½ phách.
  · **Tay trái**: 3/5 chỉ giữ một cú ngân dưới câu (40 · 22 · 75→76), 1/5 đi tiếp khuôn thưa (59), 1/5 đáp lúc tay phải ngân (50→51).
- Solo chính bài đủ làm khung hai ô: giang 34–35 (chạy liền) · 35–36 (nghỉ 1½ phách đầu rồi cụm vút lên C6+Eb6+G6); kết 63–64
  (chạy liền) · 67–68 (rải vút lên Bb6). Chất liệu: giang dặm 19% · nốt chạy 31%; kết 6% · 50%.
- Một bài; chưa đối chiếu rải hai tay ở các sheet ballad khác của anh.

### Điệu Ballad cứ đi — ĐÃ NGHE DUYỆT 30/9/2026 (KeyTrain `c58be15`)

Người dùng chốt qua ba lượt ô tick nghe thử: *"tick chêm tiếng nối hợp âm sau đã ổn, hãy đặt ô tick đó làm mặc định"* (29/9) →
*"2 chỗ tôi chọn hãy đặt làm mặc định cho điệu Ballad cứ đi"* (30/9: mỗi hợp âm 8 phách · solo · lick · run) → *"hãy biến ô tick câu
fill Cà Pháo làm mặc định cho điệu Ballad Cứ đi"* (30/9). Đường đã duyệt — **đừng đổi khi người dùng chưa yêu cầu**; lượt sau đi bằng
ô tick riêng. Cột "nguồn": **sheet** = số đo (mục trên), **người dùng** = ý người dùng, **Claude** / **Codex** = biên soạn.

| đã duyệt | ở đâu (KeyTrain) |
|---|---|
| Đệm: mỗi hợp âm một lượt 8 tiếng rải vắt hai tay | `src/reharm/style/styleLibrary/caPhaoBalladSongs.ts` (`cuDi`, `CU_DI_MOT_LUOT_CELL`) |
| Solo dạo · giang · kết (màu Cà Pháo · Soạn câu mới) | `src/reharm/style/cpBalladComposition.ts` (cờ `soloCell` · `cpSoloOwnRhythm` · `cpSoloSheetTexture`) |
| Lick · run lúc hát, mốc chuyển đoạn (màu Cà Pháo) | `src/reharm/licky/cpLick.ts` (`cpDanSong`, câu chạy ô 16) |
| Câu fill ở chỗ ca sĩ nghỉ (mọi màu) | `src/reharm/style/cuDiFill.ts` |

**1. Đệm — một lượt 8 tiếng mỗi hợp âm** (ví dụ Fm). "Phách" của người dùng ở điệu này là TIẾNG móc kép: *"mỗi hợp âm chơi 8 phách
rồi chuyển"* = một lượt 8 tiếng (2 nốt đen), không phải 8 nốt đen.

| tiếng | tay trái | tay phải | nguồn |
|---|---|---|---|
| 1 (nhấn) | F2 (ngân 2 phách) | F4 | sóng: sheet ô 9; nhấn + tay phải nhân quãng tám: người dùng |
| 2 · 3 | C3 · F3 | — | sheet ô 9 |
| 4 | G3 (bậc 9, ¼) | — | sheet ô 9 |
| 5 (nhấn) | Ab3 (bậc 10) | Ab4+C5 (nhả ¼) | sóng: sheet; *"phách 5 phải là giai điệu hơi cao lên"*: người dùng chọn cách 1 |
| 6 · 7 | — | C4 · F4 | sheet ô 9 |
| 8 (nhấn) | — | C5 | sheet ô 9; nhấn: người dùng |

- **Chọn hợp âm:** chơi đúng vòng người dùng nhập, mỗi hợp âm một lượt (2 nốt đen máy; ô chọn "Mỗi hợp âm" khoá). Không thêm hợp âm —
  trừ hợp âm lướt ở chỗ câu fill (điểm 4).
- **Chọn nốt — không dùng scale, chỉ bậc của hợp âm đang vang:** tay trái 1 · 5 · 8 · 9 · 10 (gốc C2–B2), tay phải bắt tiếp 12 · 15 · 19
  (sàn gốc tay phải C3 → tay phải cao đúng một quãng tám trên tay trái, sóng liền ở mọi hợp âm). Hợp âm treo: nốt treo thay bậc 3. Bậc 9
  là nốt ngoài hợp âm ba nhưng chỉ móc kép ¼. Chỗ nối hai hợp âm: tiếng tay phải mà cùng các nốt tay phải trong ½ phách trước vượt
  quãng tám thì dời một quãng tám (Claude — người dùng: *"tay người ko thể đánh như trong ảnh được"*).
- Để lùi về hai lượt mỗi ô nhịp (lượt hai có 3 tiếng chêm walking vào hợp âm sau — mặc định 29/9): `CU_DI_NOI_CELL`.

**2. Solo dạo · giang · kết** — cùng bộ soạn với Ballad Để em lượt 4 (mục "Bộ soạn solo Ballad Để em lượt 4 ĐÃ DUYỆT" phía dưới:
vòng thật của các sheet, bộ giải giai điệu, nốt màu), khác ở:
- **Tiết tấu từ solo chính bài** (người dùng: *"phải soạn cho khớp với tiết tấu điệu ballad anh cứ"*). Bài chỉ có MỘT khung chạy liền mỗi
  loại đoạn, nên (Claude): dạo/giang = giang ô 34–35 + kết ô 63–64 (đường đơn); kết = kết 63–64 + câu đóng 67–68 (rải vút lên Bb6).
  Đã thử thêm giang 35–36 cho dạo/giang: dặm 29–30% · nốt chạy 5–7% → bỏ (người dùng từng chê thân dạo/giang nhiều dặm, ít chạy).
- **Chọn hợp âm:** vòng hai ô cùng giọng từ kho các sheet ballad CP (Codex). Hai ô cuối: dạo/giang = ii–V của hợp âm hát kế (Fa thứ:
  Gm7b5 → C7, hoặc Gm7b5 → C9sus4 → C7); kết = V7 → i (C7 → Fm9, hoặc C7sus4 → C7 → Fm9) — đo 12 lượt × 3 đoạn: 100% như vậy. Không
  có "câu đóng của bài" như Để em: kho chưa có khung đóng đáng tin của *Anh Cứ Đi Đi*.
- **Chọn nốt:** như Để em lượt 4 — scale làm BỘ LỌC, nốt đến từ vai nốt trong câu nguồn; nốt màu 9 · 11 · 13 khi nguồn có đúng vai ấy.
  Thêm (Claude, tầm tay): bè trong / quãng tám dưới thấp hơn đỉnh cao nhất trong ½ phách quá một quãng tám thì bỏ, nốt giai điệu giữ.
- **Tay trái dưới solo = sóng rải 13 tiếng** (số đo: tay trái dưới solo của bài vẫn rải, 11 ô; ô 33 F2 C3 F3 G3 Ab3; phách 4–4¾ nốt hợp
  âm đang vang). Nốt (Claude): bậc 9 móc kép giữ, ngoài giọng thì lấy nốt trong giọng sát dưới (C7 ở Fa thứ: Db = b9); trần tay trái
  theo nốt tay phải đang vang lúc gõ, tay phải vào thấp sau đó thì cắt ngân tay trái — sóng không gãy.
- Chất liệu đo (Fa thứ · La thứ · Đô trưởng, 12 lượt mỗi đoạn): dặm dạo 14 · 14 · 17%, giang 13 · 13 · 12%, kết 15 · 15 · 18%; nốt chạy
  dạo 23 · 27 · 31%, giang 30 · 34 · 32%, kết 47 · 42 · 27% (sheet: giang 19% · 31%; kết 6% · 50%).

**3. Lick · run lúc hát · mốc chuyển đoạn** (màu Cà Pháo):
- **Lick / run:** câu từ kho CP Lick (các sheet ballad của anh; chưa có *Anh Cứ Đi Đi*), giữ nguyên nhịp nguồn; cao độ soạn lại theo hợp
  âm — phách nguyên bám nốt hợp âm, phách lẻ theo gam và màu hợp âm, cuối câu ưu tiên nốt chung với hợp âm sau, nốt nửa cung chỉ là
  nốt tiếp cận ngắn (Codex, `KeyTrain/Reference/CP-LICK.md`): **scale làm bộ lọc cho phách lẻ**. Đan vào sóng rải (Claude): câu chỉ
  thay tay phải, bỏ bè trầm của sheet nguồn; tay trái sóng giữ tiếng ngân, nhường tiếng móc kép gõ trùng câu — câu dày thì tay trái chỉ
  còn gốc ngân, như 3/5 cửa fill đã xác nhận.
- **Mốc chuyển đoạn:** câu chạy tay trái ô 16 của bài, 8 móc kép kết ở vạch — C7 → Fm đúng Db3 F3 Ab3 B3 | Bb3 G3 E3 C3; hợp âm khác:
  màu · 3 · 5 · 7 · 5 · 3 · màu · gốc (Codex); tay phải giữ. Chọn ô 16 (1/4 chỗ chuyển đoạn của sheet là câu đàn) là lựa chọn của Claude.

**4. Câu fill ở chỗ ca sĩ nghỉ** (mọi màu; người dùng: *"sao quá đơn giản … Cà Pháo có dùng passing chord để nối hợp âm ko"*, rồi
*"fill là phải chơi đa dạng các kỹ thuật mình có chứ ko phải lặp lại đúng 1 kiểu"*):
- **Chỗ đặt:** chỗ lời dứt theo lời đã dán (chưa dán: theo mật độ fill). Câu nằm gọn từ phách cuối hợp âm có chỗ nghỉ tới phách đầu hợp
  âm sau — ôm lấy vạch như 4/5 cửa fill đã xác nhận; không mở sớm hơn để khỏi đè chữ cuối câu hát.
- **Bảy kỹ thuật, xoay vòng theo thứ tự chỗ fill trong bài** (chỗ fill kế nhau không cùng kiểu; lượt phát sau lệch điểm xuất phát;
  kiểu không hợp chỗ ấy thì sang kiểu kế). Nhịp và hình từ sheet, ghép với hợp âm bài đang chơi là việc của Claude:

  | kỹ thuật | nguồn | Fm → Bbm (tay trái · tay phải) |
  |---|---|---|
  | leo + hợp âm lướt | Chưa Bao Giờ 50→51 · Anh Cứ Đi Đi 53 | A2+Eb3 · A4+Eb5+A5 → C5+Eb5 · Eb5+F5 · F5+A5 → F5+Bb5+Db6 |
  | tay trái dẫn | Anh Cứ Đi Đi ô 16 nửa sau | C4 Ab3 G3 F3 · tay phải giữ C5+C6 (C7 → Fm: Bb3 G3 E3 C3 · G4+G5 — đúng ô 16) |
  | mở + hợp âm lướt | Để Em 40 | A2+Eb3 · A4+Eb5+A5 ngân 1 phách → Bb4 · Db5+F5+Bb5 · Db6 |
  | bass đi nửa cung | Có Em Chờ 20→21 · 22 | Gb2 G2 Ab2 A2 → Bb · tay phải giữ C5+C6 (cần bass cách ≥ 3 nửa cung) |
  | sóng lên xuống | Chưa Bao Giờ 22 | F4+Ab4+C5 · Ab4+C5+F5 · C5+F5+Ab5 · Ab4+C5+F5 → F4+Bb4+Db5 |
  | câu đơn | Chưa Bao Giờ 75→76 | C5 Ab5 F5 C5 → Db5 (nốt dẫn nửa cung vào bậc 3 hợp âm sau) |
  | chuyển quãng tám | Để Em 59 | F4+G4+Ab4+C5 → cùng thế bấm lên quãng tám → Bb5+Db6+F6 (móc đơn — sheet móc kép) |

- **Chọn hợp âm — hợp âm lướt** ở phách cuối hợp âm cũ (hình "leo", "mở"). Luật Claude rút từ 11 chỗ soi tận nốt (mục "Hợp âm lướt"
  ở phần 6), khớp 10/11 (lệch: Có Em Chờ 44→45 — sheet A7, luật Eb7/G):
  1. hợp âm sau là 7 trội → bII7 của nó (G7 → **Db7** → C7);
  2. thứ → thứ đi xuống một cung → bII7, bass nửa cung đi xuống (Em7 → **Eb7** → Dm7);
  3. hợp âm cũ là át 7 của hợp âm sau → bII7 hàng xóm rồi về lại (C7 → **Db7 → C7** → Fm);
  4. còn lại → át 7 của hợp âm sau, bass là nốt cảm âm (Fm → **F7/A** → Bbm);
  bass cũ đã cách gốc sau nửa cung, hoặc trùng gốc → không chèn. Tay trái "vỏ" hai nốt (gốc + bậc 7, hoặc bass cảm âm + quãng 3 cung);
  tay phải cú ba nốt bậc 3 · 7 · 3 quãng tám (như ô 53: F4+B4+F5).
- **Chọn nốt — không dùng scale để sinh nốt.** Mỗi nốt là nốt của hợp âm đang vang ở lúc ấy: hợp âm cũ, hợp âm lướt (7 trội: 1 · 3 · 5 ·
  b7) hoặc hợp âm sau. Ngoài hợp âm chỉ có: bậc 9 (thế bấm "chuyển quãng tám" = hợp âm + 9 như cụm Để Em 59; bậc 2 của "tay trái dẫn"
  khi hợp âm không có 9), nốt dẫn nửa cung dưới bậc 3 hợp âm sau ("câu đơn"), và bass đi nửa cung ("bass đi"). Leo theo thế đảo (mỗi cú
  lên một nốt hợp âm), không nhảy nguyên thế bấm lên quãng tám như sheet — mọi nốt một tay trong ½ phách ≤ quãng tám (luật người dùng
  "đánh được bằng tay người"); đỉnh câu gần D6 (Claude; sheet lên tới D7 · F7).
- Tay trái sóng nhường đúng khoảng mà tay trái của câu chiếm (vỏ hợp âm lướt, bass đi, tay trái dẫn); bass cũ đang ngân cắt ở đó.

**5. Ý người dùng qua các lượt, giữ làm căn cứ:**
- *"thêm vào mấy tiếng nữa cho đủ phách nối đến hợp âm kế tiếp … nhớ phải khớp với tiết tấu điệu"* (29/9) → chêm tiếng nối (nay thay bằng
  một lượt 8 tiếng mỗi hợp âm).
- *"tiếng 1 5 và 8 là phách mạnh hãy đánh rõ"* · *"nhấn 1 5 8 chưa rõ, sao ko thêm nốt bên tay phải"* · *"phách 5 phải là giai điệu hơi cao
  lên"* (chọn cách 1: bậc 10 + 12; dặn *"nếu tôi nhắn ko ổn thì đưa ra các phương án khác để chọn lại"* — còn cách 2 · 3).
- *"sao tay phải đánh phách 5 mà các nốt xa nhau vậy, tay người sao mà đánh được"* · ảnh *"vẫn còn sót chỗ mà tầm nốt xa"* — tầm tay phải
  đo cả chỗ nối hợp âm, hợp âm treo, và SAU bước app gán lại tay.
- *"Ô giai điệu dẫn vào hợp âm sau hãy bỏ"* (30/9) — đã gỡ.
- *"fill là phải chơi đa dạng các kỹ thuật mình có chứ ko phải lặp lại đúng 1 kiểu"* — áp cho câu fill của mọi thầy.

**6. Chưa đo:** chưa nghe trên bài có lời thật (chỗ lấy hơi `breaths`) — không lời thì hợp âm 2 phách + mật độ "Vừa" ≈ mỗi 4 phách một
câu fill; vai câu chêm ô 21 · 29 · 50 · 58 (chưa xác nhận là fill hay lời); kho CP Lick chưa có *Anh Cứ Đi Đi*; điệp khúc (giai điệu quãng
tám, dặm cụm, tay trái rải nửa vời) chưa dựng; tần suất fill thật của anh (bao nhiêu chỗ lời nghỉ thì có fill) chưa đo được vì sheet
không có lời.

### Solo ballad (dạo · giang · kết) — phân tích 26/9/2026

Người dùng: *"hãy phân tích kỹ các câu solo sheet ballad của cà pháo để học các kỹ thuật, cách đặt hợp âm và cách Cà Pháo chọn nốt
giai điệu để đánh. Hãy tham khảo với những phân tích của Codex"*. Phân tích của Codex: `KeyTrain/Reference/CP-BALLAD-COMPOSER-2026-09-23.md`
+ `CP-BALLAD-SOLO-INVENTORY.json` (25 đoạn · 9 sheet). Số đo dưới đây: `KeyTrain/scripts/audit_cp_ballad_solo_hoc.py` trên **20 đoạn đã rõ
giọng · 7 sheet** (Hồng Kông 1 · Có Em Chờ · Ngày mai em đi · Để Em Rời Xa · Chưa Bao Giờ · Chúng Ta Không Thuộc Về Nhau · Anh Cứ Đi
Đi). Kém duyên · Yêu xa chưa rõ giọng — chỉ dạy thời gian, không vào số đo cao độ. Nốt đỉnh = nốt cao nhất mỗi cú tay phải.

**Bẫy đã sập — dữ liệu Để Em Rời Xa lệch pha.** Kho của bộ soạn đặt lưới ô theo vạch ký âm, mà vạch ký âm bài này lệch nhạc một
phách (bass ở phách 2 ô XML, cả dạo · giang · kết). Hợp âm in cũng đặt sớm một phách và đảo thứ tự ở ô 30 · 66 · 68. Hệ quả: 11 cử
chỉ hai ô của bài lệch pha, bộ soạn **chưa dùng lần nào** (0/72 lượt thử). Đã nắn ở `tools/cp_ballad_solos.py` (chỉ bài này; 22
đoạn bài khác giữ nguyên từng byte): ô thật bắt đầu ở phách 2 ô XML, hợp âm dựng từ bass thật. Sau nắn: 23/72 lượt có vật liệu bài.

**1. Cách chọn nốt giai điệu.** Nốt đỉnh là nốt của hợp âm đang vang ở **63%** — cả phách nguyên (247/395) lẫn giữa phách (498/785):
anh KHÔNG giữ nốt ngoài hợp âm cho phách yếu. Bậc so với gốc hợp âm (phách nguyên / giữa phách):

| bậc | 5 | 9 | 3 | 1 | b7 | b3 | 11 | 7 | 13 | #11 · b13 · b9 |
|---|---|---|---|---|---|---|---|---|---|---|
| % | 17 / 17 | 16 / 14 | 10 / 13 | 10 / 12 | 12 / 11 | 10 / 10 | 10 / 8 | 7 / 6 | 5 / 6 | ≤ 3 |

- **Bậc 9 gần ngang bậc 5** — màu 9 nằm trên giai điệu chứ không chỉ trong hợp âm (khớp màu add9 · 9sus4 · m9 của anh).
- Nốt ngoài hợp âm (421 cú): kế tiếp **nhảy về nốt hợp âm 128** · liền bậc lên về nốt hợp âm 89 · liền bậc xuống về nốt hợp âm 69 ·
  nhảy sang nốt ngoài 74. Tức phần lớn là **nốt màu** (9 · 11 · 13) rời bằng bước nhảy, không phải nốt lướt phải giải liền bậc.
- Đường đi: bước ≤ 2 nửa cung chỉ 41% (dạo) · 36% (giang) · 22% (kết); nhảy ≥ quãng 5 chiếm 18–23%. Giai điệu **rải hợp âm và nhảy
  quãng** nhiều hơn chạy liền bậc. Nửa cung 48/363 · 54/522 · 30/275 bước (dạo · giang · kết).
- Tầm nốt đỉnh (MIDI): trung vị 69 (dạo) · 67 (giang, kết); tứ phân 63–75.

**2. Cách đặt hợp âm.**
- **Giọng thứ:** vòng **bVI → bVII → i** là trục — Để Em Rời Xa cả 3 đoạn, Chúng Ta dạo · giang. bVI–bVII chung một ô (đổi ở phách 2
  hoặc 1¾), i một ô. Bậc v là **thứ** (Vm7), không phải V7 — V7 → i chỉ ở cuối ACDD kết. Vòng xuống: bIIImaj7 → bVImaj7 → vm7 → ivm7
  (Chưa Bao Giờ dạo), imMaj7 → bVImaj7 → vm7 → ivm7 (ACDD giang).
- **Giọng trưởng:** IVmaj7 → iiim7 → iim7 → V(9)sus4 → V → I (Có Em Chờ dạo · giang); vi → ii → V13 → I (Có Em Chờ kết); V treo
  (Vsus4, V7sus4) trước khi về I (Hồng Kông 1); mượn bVIImaj7 (Ngày mai em đi).
- Màu (111 ký hiệu): trưởng 68 · m7 59 · maj7 21 · m 13 · sus4 11 · 7 10 · rồi add9 · 13 · 9sus4 · m9 · mMaj7 · 7b9 · dim7.
- Nhịp hợp âm: khoảng một hợp âm một ô, ô có hai hợp âm thì hợp âm sau vào ở phách 2 hoặc 1¾.

**3. Kỹ thuật** (cú tay phải; một cụm cùng lúc = một cú):

| | dạo (6 đoạn) | giang (7) | kết (7) |
|---|---|---|---|
| cú tay phải / phách | 1,51 | 2,10 | 1,49 |
| cụm ≥ 3 nốt | 51/369 | 54/529 | **96/282** |
| quãng tám | 18 | 30 | 28 |
| bè quãng 3 / 6 | 31 | 42 | 17 |
| cụm có quãng 2 | 37 | 33 | 44 |
| giữa phách (móc kép lẻ) | 137 | 238 | 130 |
| chùm ba | 9 | 12 | 20 |
| tay trái gõ cùng lúc tay phải | 102 | 141 | 87 |
| tay trái đáp dưới tay phải đang ngân | 165/291 | 193/357 | 117/233 |

- Giang dày nhất; kết dặm cụm nhiều nhất (Chúng Ta kết 59/67 cú là cụm).
- Hai tay: tay trái gõ cùng tay phải chỉ ~28% cú; hơn nửa tiếng tay trái **đáp dưới nốt tay phải đang ngân** — tay phải hát, tay trái
  trả lời bên dưới, đúng như Codex ghi "RH chạy trên bass ngân rồi đáp bằng cụm".

**4. Riêng Để Em Rời Xa** (sau nắn vạch nhịp; `CP-BALLAD-SOLO-INVENTORY.json`):
- Dạo 32 cú phải · 1 cụm · 0 quãng tám; 21/32 cú phải trên bass đang ngân — **đường đơn** trên nền bass.
- Giang 41 cú phải · 4 cụm · 4 câu chạy có nhảy rộng (+7 −7 +11 −16 +12): rải vắt nhiều quãng tám.
- Kết 53 cú phải · **15 cụm treo/quãng 4** ([0,2,5] · [0,5,7] · [0,2,5,7,10] · [0,3,5,8]) — màu sus xếp chồng; tay trái dày (73 cú).
- **Tay trái dưới câu solo** (15 ô): ô bVI → bVII: gốc thấp + 5 + 8 ở phách 1, 5₃ · 8 · gốc lại khi đổi hợp âm, 5₃ gõ tới cuối ô;
  ô i: gốc thấp, **8 ngân hai phách**, 5₃ ở 3& và 4 (3/3 ô i ở dạo · giang). Khác hẳn tay trái lúc hát.
- **Tay phải** (đo 26/9 trên cửa sổ đã nắn vạch; quy về Đô thứ, sheet ở Rê thứ): nốt đỉnh tứ phân C4–Eb4 dạo · Bb3–F4 giang ·
  Bb3–G4 kết — giai điệu nằm **thấp quanh nốt chủ**. Bè **quãng 4** 6/31 · 6/38 · 8/50 cú (bè 3/6 chỉ 6 · 13 · 14%). Mọi ô dạo ·
  giang có móc kép lẻ (4/4 · 4/4; kết 7/10); phách giật 44 · 81 · 62% phách. Câu đóng dạo: bè quãng 4 vút từ F4+Bb4 lên F6+Bb6 trong
  một phách rồi cụm Bb3+C4+Eb4. Nốt dẫn nửa cung lên chủ chỉ 1 lần (dạo, cú đầu) — không phải thói quen.

**5. Đánh giật — nhịp trong một phách** (lưới móc kép `0 ¼ ½ ¾`; 203 · 236 · 146 phách có tay phải ở dạo · giang · kết). Chữ
ký của anh là phách **`x..x`** — đơn chấm dôi + móc kép, móc kép cuối giật vào phách sau: 13% · 13% · **19%** phách. Kèm các phách
móc kép lệch `.x..` (6–11%) · `.x.x` (6% giang) · `...x` (4% dạo) · `x.xx` (8% giang) · `..xx`. Gộp lại "phách giật" chiếm **32% ·
44% · 49%** phách; nghịch phách ngân (vào giữa phách rồi ngân qua phách kế) 25% · 18% · 34% cú. Không có dấu staccato/accent viết
tường minh — cái giật đến từ nhịp chấm dôi, móc kép lệch và nghịch phách, không phải từ tiếng cắt ngắn (tiếng ngắn ≤ ¼ rồi nghỉ chỉ
0–4% cú).

**6. Chất liệu theo loại đoạn** (đo cùng thước với bộ soạn, `KeyTrain/src/reharm/style/__tests__/cpSoloTexture.probe.ts`):

| | dặm (cụm ≥ 3 nốt) | quãng tám | nốt trong câu chạy | phách giật | cú / phách |
|---|---|---|---|---|---|
| sheet dạo | 14% | 5% | 17% | 32% | 1,51 |
| sheet giang | 10% | 6% | 45% | 44% | 2,10 |
| sheet kết | 34% | 10% | 23% | 49% | 1,49 |

Dạo và giang là **đường đơn + câu chạy + bè quãng 3/6**; dặm cụm để dành cho đoạn kết. Giọng thứ riêng: dạo dặm 8% · chạy 8% ·
giật 38%; giang dặm 12% · chạy 38%; kết dặm 45%.

**Chưa đo:** pedal · rubato · lực thật (chỉ 6 sheet có dynamics); luật nốt màu theo từng chất hợp âm (bảng trên gộp mọi chất); giai
điệu dạo có mượn motif lời hát không.

**Nút KeyTrain Ballad Để em — solo: ĐÃ DUYỆT 26/9/2026 (lượt 4).** Người dùng: *"điệu Ballad Để em đã ổn và cả các câu solo cũng đã hay"*. Dùng bộ soạn ballad CP của Codex (màu Cà Pháo · Soạn câu mới). Thêm
`soloCell`: tay trái dưới câu solo chép khuôn ô 28–29 ở trên (cũ: bộ soạn lấy tay trái từ ô đệm hát — ô 2 thành 12 tiếng gõ lặp gốc).
Lượt 2 — người dùng: *"quá nhiều chỗ dặm hợp âm, còn ít chỗ chạy nốt và ko có nhiều kỹ thuật hay những chỗ đánh giật đặc trưng của
Cà Pháo"*. Đo ra thân câu dạo lấy 34/72 ô từ đoạn kết (dặm 38% vs sheet 14%). Thêm `cpSoloSheetTexture`: không lấy đoạn kết làm
thân câu dạo/giang, chấm độ lệch khỏi bảng mục 6 → dặm 12 · 6 · 28%, nốt chạy 16 · 42 · 28%, phách giật 36 · 50 · 42%.
Lượt 3 — người dùng: *"mô phỏng câu solo Cà Pháo full thì lại lấy câu của sheet Có bao giờ"* và *"còn quá rời rạc và ko khớp với
tiết tấu điệu"*. Mô phỏng lấy đoạn dài nhất cùng điệu (Chưa Bao Giờ) vì nút chưa khai bài gốc; kho mô phỏng cũng lệch pha — đã sửa
cả hai. Train lại (`cpSoloOwnRhythm`): **tiết tấu mọi khung từ solo Để Em Rời Xa** (dạo/giang ← dạo/giang, kết ← kết), giai điệu ·
hợp âm · kỹ thuật vẫn học từ mọi sheet ballad CP, bè quãng 4 của bài giữ nguyên. La thứ, 12 lượt/loại: dặm 6 · 7 · 15% (bài 3 · 8 ·
30%), nốt chạy 22 · 25 · 0% (bài 23 · 37 · 0%), phách giật 61 · 72 · 80% (bài 44 · 81 · 62%). Chi tiết:
`KeyTrain/Reference/CA-PHAO-BALLAD-DE-EM.md` mục Solo, Lượt 3. Người dùng chấm **7/10**.
Lượt 4 — người dùng chấm lượt 3 **7/10**, xin train thêm. Đặt sau ô tick nghe thử (lượt 3 vẫn mặc định). Hai đổi theo số đo
sheet: **cú dẫn vào hát / đóng kết** bằng câu đóng của chính bài bVI → bVII | i (0/6 đoạn dạo/giang thứ của anh dẫn bằng ii–V;
0/3 đoạn kết thứ đóng V7–i — bộ soạn Codex dùng cả hai); **nốt màu 9 · 11 · 13 trên giai điệu** khi nốt nguồn cùng vị trí mang
đúng vai ấy (bậc 9 đúng phách: sheet 16%, lượt 3 1–2%, lượt 4 3–11%). Chi tiết: mục Solo, Lượt 4 của file trên. **Người dùng
duyệt lượt 4** (26/9: *"nghe rất hay, hãy giữ tick đó lại"*) — xem mục ngay dưới. Lượt 5 (ô tick riêng) giữ đúng bậc nốt của câu
nguồn chặt hơn → nốt gốc đúng phách dạo 22 → 11% — **người dùng bác**: *"ko hay như lượt 4"*; đã gỡ. Khớp số đo bậc nốt hơn không
làm câu hay hơn — đừng dựng lại.

#### Bộ soạn solo Ballad Để em lượt 4 ĐÃ DUYỆT — học gì từ sheet, chọn hợp âm và nốt thế nào (26/9/2026)

Người dùng nghe duyệt ngày 26/9/2026: *"ô tick Solo lượt 4 đã soạn ra các câu solo nghe rất hay, hãy giữ tick đó lại"*, rồi chốt
cả nút: *"điệu Ballad Để em đã ổn và cả các câu solo cũng đã hay"*. Đường đã duyệt — **đừng đổi nốt nào** khi người dùng chưa yêu cầu; lượt sau đi bằng ô tick riêng (lượt 5 đã thử và bị bác).

| đã duyệt | ở đâu (KeyTrain) |
|---|---|
| Solo dạo · giang · kết của nút Ballad Để em, màu Cà Pháo · Soạn câu mới, ô tick "Solo lượt 4" (bật sẵn, lưu theo bài) | `src/reharm/style/cpBalladComposition.ts` (`composeCpBallad`, cờ `cpBalladThu`), khai điệu ở `styleLibrary/caPhaoBalladSongs.ts` |

Ba lớp chồng nhau: **Codex** dựng bộ soạn ballad CP (chọn vòng, chọn câu nguồn, bộ giải giai điệu, kỹ thuật); **Claude** thêm
tiết tấu bài gốc (lượt 3), nốt màu và câu đóng của bài (lượt 4); **tai người dùng** chấm lượt 3 7/10, lượt 4 "rất hay". Mục này
viết để giải thích được bộ soạn — chỗ nào **số đo**, chỗ nào **biên soạn** (Codex hay Claude), chỗ nào **ý người dùng**.

**1. Đã phân tích được gì từ sheet (số đo).** Chi tiết ở các điểm 1–6 phía trên; cái bộ soạn dùng:
- Solo *Để Em Rời Xa* (sau khi nắn vạch nhịp lệch một phách): mọi ô dạo · giang có móc kép lệch phách (4/4 · 4/4); giai điệu nằm
  thấp quanh nốt chủ; bè quãng 4 6/31 · 6/38 · 8/50 cú; câu đóng dạo vút bè quãng 4 lên hai quãng tám trong một phách.
- Vòng giọng thứ của anh: bVI → bVII → i là trục (Để Em cả 3 đoạn). Dẫn vào hát: 0/6 đoạn dạo/giang thứ dùng ii–V; kết: 0/3 đoạn
  kết thứ đóng V7–i.
- Nốt đỉnh đúng phách: nốt hợp âm chỉ 42–80% (18 đoạn · 6 sheet rõ giọng); bậc 9 16% · 11 10% · 13 5% (20 đoạn · 7 sheet).
- Chất liệu theo loại đoạn (điểm 6): dạo/giang là đường đơn + câu chạy + bè, dặm cụm để cho đoạn kết.

**2. Những điểm then chốt làm câu hay (biên soạn, dựa trên số đo).**
1. **Tiết tấu là của chính bài** — mọi khung hai ô lấy nhịp tay phải (và tay trái đáp) từ solo *Để Em Rời Xa*: dạo/giang lấy từ
   dạo/giang, kết từ kết. Người dùng chê bản ghép tiết tấu bài khác là *"rời rạc và ko khớp với tiết tấu điệu"*.
2. **Giai điệu, vòng hợp âm, kỹ thuật là của cả 7 sheet** — đặt lên tiết tấu ấy (luật người dùng: tiết tấu cùng điệu, cao độ học
   từ mọi sheet của thầy).
3. **Nốt màu 9 · 11 · 13 đứng cả ở trọng âm** khi câu nguồn có nốt màu ở đúng chỗ ấy (lượt 4) — lượt 3 gần như chỉ nốt hợp âm.
4. **Khép câu đúng lối bài**: cú dẫn vào hát và câu đóng kết là bVI → bVII | i của bài, khung tiết tấu cuối là khung đóng của bài
   trên đúng hoà âm của nó.
5. **Chất liệu bám mức sheet cùng loại đoạn** — không lấy cử chỉ đoạn kết làm thân câu dạo/giang (lượt 2).

**3. Chọn hợp âm thế nào.**
1. Kho vòng: cử chỉ hai ô **cùng giọng** của các sheet ballad CP, chỉ giữ ô có hợp âm **đáng tin** — ký hiệu khớp bass thật ở chỗ
   đổi hợp âm; hợp âm mượn/át phụ phải giải ngay trong ô (xuống quãng 5 hoặc nửa cung). (Codex)
2. Nối vòng: hai khung chỉ nối được nếu bước từ hợp âm cuối khung trước sang hợp âm đầu khung sau (bậc + chất) **đã xuất hiện**
   trong kho, và còn nối tiếp được tới hết đoạn. (Codex)
3. Chọn khung: trong các vòng nối được, chọn theo lượt phát (số giả ngẫu nhiên gieo theo lượt · giọng · loại đoạn — cùng lượt ra
   cùng câu); 40% ưu tiên vòng của chính *Để Em Rời Xa* chưa dùng. Mọi ứng viên là vòng thật của anh; số gieo chỉ chọn giữa chúng.
4. Hai ô cuối (lượt 4, giọng thứ): **câu đóng của bài** bVI → bVII | i (La thứ: F · G ở 1¾ phách · Am7), cả dạo · giang · kết.
   Giọng trưởng vẫn cách Codex: ii–V của hợp âm hát kế / V7–I.
5. Tay trái dưới câu solo: khuôn ô 28–29 của bài (gốc + 5 + 8, 5₃ gõ đều; ô i ngân 8 hai phách) — điểm 4 phía trên.

**4. Chọn nốt thế nào — có dùng scale không?**

**Có dùng scale, nhưng làm BỘ LỌC, không làm nguồn nốt.** Nốt đến từ vai của nốt trong câu nguồn; gam của bài (thứ tự nhiên
`0 2 3 5 7 8 10` / trưởng `0 2 4 5 7 9 11`) chỉ để quyết một nốt ngoài hợp âm có được phép không.

1. **Câu nguồn** mỗi khung: một cử chỉ hai ô cùng giọng của 7 sheet, xếp hạng theo độ khớp chức năng hợp âm ở từng tiếng (×.65),
   độ khớp tiết tấu với mốc tay trái, chất liệu lệch mức sheet, kỹ thuật chưa dùng (−.22 mỗi cái), vòng hát lại câu mở một lần.
   (Codex; chấm chất liệu: Claude, lượt 2)
2. **Đường nét**: lấy chuỗi nốt đỉnh của câu nguồn, trải theo thứ tự lên các tiếng của tiết tấu bài gốc (nội suy), giữ **hướng
   đi và độ lớn bước** (nén tầm ≤ 24 nửa cung) và **vai nốt** (bậc so với gốc hợp âm nguồn). (Codex; tiết tấu bài gốc: Claude)
3. **Ứng viên cho mỗi tiếng**: nốt của hợp âm đang vang; **nốt màu** khi câu nguồn mang đúng vai ấy trên cùng chất hợp âm, nằm
   trong gam và không phải nốt tránh (nửa cung trên một nốt hợp âm) — lượt 4, Claude; nốt gam cho tiếng lướt ngắn ở phách lẻ hay
   trong câu liền bậc (không lấy bậc 3 trái chất hợp âm). Nốt cuối: kết về nốt chủ; dạo/giang về nốt hợp âm cách gốc hợp âm hát
   kế nửa cung dưới hoặc một cung trên.
4. **Bộ giải chọn cả câu một lần** (giữ 10 đường tốt nhất, không chọn từng nốt riêng). Phạt: lệch bước nguồn ×.55 · xa tâm tầm
   ×.25 · nhảy quá 5 nửa cung ×.3 · ngân sang hợp âm chỏi ×12 · nhảy lớn ở chỗ nối khung ×3 · đứng yên khi nguồn chuyển động 2,5 ·
   đi ngược nguồn 1,5 · lặp ba lần 5 · quay vòng 3 · nốt ngoài hợp âm (không phải màu) .6; **thưởng đúng vai nguồn −1,6**. Hệ số
   là **biên soạn** của Codex.
5. **Nốt lướt** (ngoài hợp âm, không phải màu) phải đi ≤ 2 nửa cung, cùng chiều, tối đa hai nốt rồi về nốt hợp âm. Nốt màu thì
   không bị ép giải — anh rời nốt màu bằng bước nhảy nhiều hơn liền bậc (128 so với 158).
6. **Nốt tiếp cận nửa cung** chỉ đặt khi câu nguồn có đúng ngữ cảnh ba nốt (chuẩn bị – tiếp cận – giải) cùng giọng, chức năng và
   chất hợp âm. Không rải chromatic.
7. **Bè / kỹ thuật**: số bè theo tiết tấu bài gốc; tiếng đơn ngân ≥ ½ phách mà câu nguồn có bè / quãng tám / cụm thì nhận kỹ
   thuật ấy; bè quãng 4/5 của bài giữ đúng quãng nếu nốt dưới trong gam; bè 3/6 lấy nốt hợp âm cách 3–4 / 8–9 nửa cung.
8. **Không dùng**: ngũ cung, blues, thang chạy tự sinh, bốc nốt ngẫu nhiên.

**Ví dụ** (lượt 4, La thứ, giang full lượt phát số 3, phần hát mở bằng F): khung ô 1–2 lấy tiết tấu giang ô 28–29 của *Để Em Rời
Xa*; câu nguồn là giang ô 39–40 của *Chúng Ta Không Thuộc Về Nhau*; hợp âm F · G (1¾) | Am7. Trên F: F5 (gốc) rồi cụm C4+F4+C5;
trên G: D4 (5) · D4+G4+D5 · C5 (tiếng lướt móc kép) · B4 (3). Phách 1 ô 2 (Am7) giai điệu đứng trên **D (bậc 11) ở trọng âm** —
nốt màu, vì câu nguồn mang bậc 11 ở đúng chỗ ấy — bè dưới A3 thành quãng 4 A3+D4 như bè của bài; tiếp D4 (11) · D4+G4 (quãng 4,
đỉnh b7) · G4+C5 · D5 (11) · G5: màu treo kiểu sus4 của anh (vết `color-tone` ở phách 4 · 4¾ · 6¼). Lượt 3 cùng chỗ: B3+E4 — đỉnh
là E (bậc 5, nốt hợp âm), phách 4¾ là C4+E4.

Khi câu nguồn chính là câu của bài (khung ô 5–6 cùng lượt: tiết tấu và câu nguồn đều là dạo ô 0–1 của *Để Em Rời Xa*), đầu ra gần
như câu gốc dời một quãng tám (G4+C5 · B4 · C5 · G5 · B4 · C5 …) — đó là **chuyển soạn**, không phải soạn mới; bộ soạn thưởng
câu của bài −.25 nên chuyện này có xảy ra.

**5. Dữ liệu để giải thích — đã có sẵn.** Mỗi câu có `compositionSources` (mỗi ô một dòng: `harmony` = vòng thật hay
`cadence:<khung đóng của bài>`; `melody` = câu nguồn; `rhythm` = khung tiết tấu của bài gốc; `sourceKind`) và
`compositionTechniques` (mỗi kỹ thuật một dòng kèm phách: `color-tone` · `fourth-dyad` · `third-dyad` · `sixth-dyad` ·
`octave-line` · `semitone-approach` · `neighbor-cluster` · `written-grace` · `left-answer`). **Chưa có**: nhãn từng nốt (nốt hợp
âm / nốt màu / nốt lướt, và vai của nốt nguồn tương ứng), điểm phạt của đường được chọn so với đường thua, lý do chọn vòng. Ba
thứ này tính sẵn trong `composeCpBallad` (`lineSlots`, `colorPc`, đường bộ giải), chỉ chưa ghi ra.

## 6. Chưa đo — đừng suy bừa vào chỗ này

- **Sheet có cùng cao độ với bản thu không.** Đã bắt được **một** bài lệch: *Người hãy quên
  em đi* — sheet ở Rê thứ mà Chordify đọc bản thu ra Si giáng thứ, lệch **đúng 4 nửa cung ở
  mọi hợp âm**, tức có bên đã dịch giọng. Bằng chứng nghiêng về phía sheet là bản chơi
  được: dịch xuống 4 nửa cung thì nốt thấp nhất tay trái thành **midi 22 (Bb0)**, phím thứ
  hai từ dưới của đàn 88 phím. Ba bài còn lại người dùng đã đối chiếu Chordify và **khớp**.
- **Tiết tấu tay trái theo từng điệu.** Bossa nova và ballad chắc chắn khác nhau, nhưng
  chưa tách ra đo — mỗi loại chỉ có 2 bài.
- **Vị trí câu chèn (fill) trong phần hát.** Đo được một phần (30/9/2026) — chỉ trên **5 cửa fill người dùng đã xác nhận**
  (Để Em 40 · 59; Chưa Bao Giờ 22 · 50→51 · 75→76), vì **0/9 sheet có thẻ lời**; kết quả ở mục "Câu fill lúc hát — chỗ đặt"
  dưới phần Anh Cứ Đi Đi. Chưa đo được: tần suất (bao nhiêu chỗ lời nghỉ thì có fill), fill ở các bài chưa có phiếu cửa lời
  (Hồng Kông, Có Em Chờ, Ngày mai em đi, Anh Cứ Đi Đi).
- **Cách nối giọng giữa các hợp âm.** Đo được một phần (30/9/2026, `KeyTrain/scripts/audit_cp_noi_hop_am.py`, phần hát 5 bài có vạch
  đúng pha — Anh Cứ Đi Đi · Chúng Ta · Có Em Chờ · Hồng Kông · Ngày mai; Để Em và Chưa Bao Giờ lệch vạch nên chưa tính): cú tay phải
  cuối trước chỗ đổi hợp âm (n = 206) là nốt chung 65 · nốt của hợp âm sau vào sớm 64 · nốt hợp âm cũ 46 · nốt ngoài 31; đi liền bậc
  vào nốt đầu hợp âm sau 76 (37%). Bass cú cuối (n = 199): liền bậc vào gốc sau 65 (33%) · bậc 5 hợp âm sau 41 (21%) · đã về gốc sau
  34 (17%). Chưa đo: nối bè trong (giọng giữa).
- **Hợp âm lướt.** Quét KÝ HIỆU cả kho chỉ ra **3 ca thật**, Cà Pháo có 2: *Ngày mai em đi* ô 3
  (`Eb → Bbm7/Db → C7`, bass `Eb → Db → C`) và *Có Em Chờ* ô 58 (`Amaj7 → Abm7 → Bsus4`,
  bass `A → Ab → F#`). Anh ấy dùng thủ pháp này nhiều nhất trong ba thầy, nhưng vẫn là
  **hiếm** — 2 chỗ trên hơn 400 ký hiệu. **Đo trên NỐT (30/9/2026) thì không hiếm**: phần hát 5 bài đúng pha, 288 chỗ đổi hợp âm —
  hợp âm lướt ghi ký hiệu 19 (7%; 9 là át 7 của hợp âm sau) và **hợp âm lướt ngầm trong tay trái** 16 (6%): át 7 của hợp âm sau với
  bass là nốt cảm âm 7 · bII7 (7 trội nửa cung trên hợp âm đích) 4 · bII7 hàng xóm 3 · bass đi 3 nốt 2. Soi tận nốt 11 chỗ:
  · bII7: Anh Cứ Đi Đi 15 G7 → Db7 → C7 (ghi), 44→45; Có Em Chờ 29→30 Abmaj7 → Db9 → C7, 34→35 Gm7 → Gb7 → Fm7, 44→45 Eb → A7 → Abmaj7;
    Chúng Ta 20→21 · 52→53 Em7 → (bass Eb) → Dm7;
  · bII7 hàng xóm rồi về: Anh Cứ Đi Đi 45 · 53 trong ô C7 trước Fm — tay trái Db3+B3 → C3+Bb3, tay phải F4+B4+F5;
  · át 7 bass cảm âm: Anh Cứ Đi Đi 17→18 · 46→47 F7/A → Bbm; Chúng Ta 50→51 E7/G# → Am7; Có Em Chờ 19→20 Bb7/D → Eb; Ngày mai 46→47
    Eb7/G → Ab (tay trái G3+Db4);
  · bass đi nửa cung liên tiếp: Có Em Chờ 20→21 Db D Eb F Gb G → Ab.
  "Vỏ" tay trái của hợp âm lướt là hai nốt: gốc + bậc 7, hoặc bass cảm âm + quãng 3 cung. Đoạn đàn (dạo/giang/kết): hợp âm lướt ngầm
  1/141 — anh để dành lối này cho phần hát.

---

## 7. Cỡ mẫu — nói thẳng chỗ mỏng

**4 bản ký âm** là ít. Đủ để chốt các con số ở mục 2 và tầm âm ở mục 4 (828 nốt), nhưng
**chưa đủ để rút luật về cấu trúc câu**: mỗi thể loại chỉ có 2 bài, và giọng thứ chỉ có
**1 bài**.

Mọi câu trong file này đều kèm cỡ mẫu. Chỗ nào không có số thì đó là **chưa đo**, không
phải đã biết.
