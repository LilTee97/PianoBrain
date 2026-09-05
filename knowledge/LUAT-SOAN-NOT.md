# Luật soạn nốt cho câu solo

Luật này **không thuộc riêng thầy nào**. Người dùng chốt:

> *"Đây là để học cách soạn nốt trong solo nên nó không liên quan đến giai điệu và các
> thầy khác nhau đều cùng phải làm theo luật, theo bậc, theo scale, mode nếu không muốn
> giai điệu bị chói tai — nên bạn có thể học ở tất cả các thầy và bỏ luật trộn lẫn các
> thầy vì nó không liên quan đến phong cách riêng."*

Nên riêng ở đây **được phép gộp số đo của mọi thầy**. Luật cấm trộn thầy vẫn còn nguyên
cho mọi thứ khác — tuyến giai điệu, tiết tấu, cách chọn vòng hợp âm — vì những thứ ấy
**là** phong cách riêng.

## Cỡ mẫu

**13 bản ký âm · 3 thầy · 2169 nốt giai điệu**, chỉ tính các đoạn solo (dạo · giang ·
kết), chỉ lấy nốt cao nhất mỗi mốc gõ ở khuông tay phải, **bỏ đuôi nốt nối**.

| thầy | bài |
|---|---|
| Linh Nhi | 7 |
| Cà Pháo | 4 |
| Tôn Hùng | 2 |

**1671 nốt** trong số đó có ký hiệu hợp âm phía trên — đó mới là mẫu số của luật 2, nhỏ
hơn mẫu số của luật 1. Đừng so hai con số này với nhau.

> **Số cũ là 14 bài · 2077 nốt.** Đổi vì ba việc: bỏ **Yêu là tha thứ** sang nhóm hoãn
> (85 ô không có một ký hiệu hợp âm nào), bỏ **đuôi nốt nối** khỏi phép đếm mốc gõ, và
> ghi giọng của từng bài vào `corpus.json` nên phép đo chạy lại được từ đầu.
>
> **Cỡ mẫu này TÁI LẬP ĐƯỢC.** Trước đây thông tin trưởng/thứ nằm trong văn xuôi md nên
> script chạy lại ra số khác mà không ai biết. Giờ giọng nằm ở trường `giong` trong
> `corpus.json`, chất hợp âm nằm ở `tools/sheet/don_hop_am.py:tap_not()` với phép tự kiểm
> (`python tools/sheet/don_hop_am.py --kiem`).

---

## Luật 1 — MỌI NỐT NẰM TRONG GAM CỦA BÀI

| | gộp 3 thầy |
|---|---|
| nốt hợp âm | **67,7%** |
| **ngoài gam** | **2,8%** |

*(Con số nốt hợp âm cũ là 64,8%. Lên 67,7% sau khi vá bảng chất hợp âm — xem mục "Soát
lại toàn bộ hợp âm màu" ở cuối. Con số ngoài gam **không đổi**.)*

**97,2% nốt nằm trong gam của bài**, và riêng Linh Nhi là **98,0%**. Đây là luật chắc
nhất trong cả bộ — không thầy nào rải nốt ngoài gam quá 3%.

> **LUẬT NÀY VỮNG TRƯỚC CÁCH ĐO.** Xem mục "Cụm nghiến" ở cuối — đổi phép rút nốt chỉ
> làm con số ngoài gam xê dịch giữa **2,4% và 3,1%**, tức luật *"khoảng 97% nốt nằm trong
> gam"* đứng vững dù rút nốt kiểu nào.
>
> **Số cũ 96,9% đã sửa.** Bảng chất hợp âm của tôi thiếu `minor-11th`, `dominant-11th`,
> `dominant-13th` và `other` — **17 trên 299 ký hiệu (6%)** rơi về hợp âm ba trưởng, nên
> nốt trên các hợp âm giàu ấy bị đếm nhầm thành "ngoài". Vá bảng thì nốt hợp âm lên từ
> 61,6% thành 64,8%. Số của Linh Nhi không đổi — sheet của chị không dùng hợp âm mở rộng.

Nên khi soạn: **chọn nốt trong gam trước**, ngoài gam là ngoại lệ phải có lý do (luật 5).

## Luật 2 — HAI PHẦN BA LÀ NỐT HỢP ÂM

Khoảng **hai phần ba đến ba phần tư** số nốt là nốt của chính hợp âm đang vang; phần còn
lại nằm trong gam nhưng ngoài hợp âm.

> **ĐÍNH CHÍNH.** Chỗ này trước đây ghi *"tỉ lệ này **giống nhau** ở cả ba thầy, nên nó là
> luật chung chứ không phải nét riêng"*. **Sai.** Sau khi vá bảng chất hợp âm và ghi giọng
> đúng, ba thầy chênh nhau **9 điểm**:
>
> | thầy | nốt giai điệu | nốt hợp âm | ngoài gam |
> |---|---|---|---|
> | Linh Nhi | 1045 | **63,6%** | 1,8% |
> | Cà Pháo | 828 | **70,8%** | 4,7% |
> | Tôn Hùng | 296 | **73,0%** | 1,0% |
>
> Nên đây **không** phải một hằng số chung. Cái chung là **khoảng dao động**: không thầy
> nào xuống dưới 60% (câu sẽ trôi) và không thầy nào lên quá 75% (câu sẽ cứng như bài tập
> rải hợp âm). Chỗ đứng **trong** khoảng ấy là **nét riêng của từng thầy** — Linh Nhi bám
> hợp âm lỏng nhất, Tôn Hùng chặt nhất.
>
> Đúng theo luật người dùng đã đặt: **luật đo trên sheet thầy A không tự động áp cho thầy
> B**. Muốn soạn theo thầy nào thì lấy con số của thầy ấy, đừng lấy con số gộp.

Ngược lại, **luật 1 thì đúng là chung**: cả ba thầy đều dưới 5% ngoài gam.

Đừng đảo ngược: câu toàn nốt ngoài hợp âm thì trôi, câu toàn nốt hợp âm thì cứng như tập
rải hợp âm.

## Luật 3 — ĐỘ LỚN BƯỚC

| bước | gộp | Linh Nhi |
|---|---|---|
| lặp lại nốt cũ | 11,5% | 10,7% |
| **liền bậc (1–2 nửa cung)** | **34,0%** | **33,7%** |
| quãng ba (3–4) | 21,0% | 24,5% |
| quãng 4–5 (5–7) | 16,1% | 12,1% |
| nhảy xa (8+) | 17,4% | 19,0% |

**45% là đứng yên hoặc bước liền bậc.** Cộng quãng ba thì **66%** số bước không quá bốn
nửa cung.

Nhảy xa 8+ chiếm 17–19% — phần lớn là **đổi quãng tám**, không phải nhảy trong câu.

## Luật 4 — SAU CÚ NHẢY THÌ QUAY LẠI

Sau một bước nhảy từ **5 nửa cung trở lên**:

| | tỉ lệ |
|---|---|
| **đổi chiều** | **62%** |
| cùng chiều | 29% |
| giữ nguyên cao độ | 9% |

Nhảy lên rồi đi xuống, nhảy xuống rồi đi lên. Đây là luật dẫn giọng cổ điển, và số đo
xác nhận nó đúng với cả ba thầy.

## Luật 5 — NỐT NGOÀI GAM PHẢI CÓ LÝ DO

Chỉ **58 nốt trên 2077** nằm ngoài gam. Chúng không rải đều — chúng dồn vào hai bậc:

| bậc so chủ âm | số nốt |
|---|---|
| **♭7** | 16 |
| **♭5** | 13 |
| ♭9 · ♭13 · ♭3 | 9 mỗi bậc |

`♭7` và `♭5` là **nốt xanh** (blue note) và màu **át phụ**. Không phải nốt bạ đâu lấy đó.

Cách chúng đi vào và đi ra:

| | tỉ lệ |
|---|---|
| lướt hoặc thêu (liền bậc cả hai bên) | **45%** |
| một bên liền bậc | 24% |
| **nhảy cả hai bên** | **29%** |
| đầu/cuối đoạn | 2% |

**69% nốt ngoài gam được nối bằng bước liền bậc ít nhất một bên.** Chỉ **17 nốt trên
2077** nhảy cả hai bên — và một phần trong số ấy còn giải thích được bằng ký hiệu hợp âm
thiếu trong sheet, xem mục cuối.

## Luật 6 — GIỌNG THỨ CÓ BA GAM, KHÔNG PHẢI MỘT

Đây là **bẫy đo, đã sập**. Lần đầu tôi lấy gam thứ tự nhiên `1 2 ♭3 4 5 ♭6 ♭7` làm chuẩn
duy nhất, và kết quả ra **4,3% ngoài gam** với 38% trong số đó "nhảy cả hai bên" — nghe
như các thầy rải nốt bừa.

Sai. Giọng thứ trong nhạc thật dùng cả ba:

| gam | bậc 6 | bậc 7 |
|---|---|---|
| thứ tự nhiên | ♭6 | ♭7 |
| thứ hoà thanh | ♭6 | **7** (nốt cảm) |
| thứ giai điệu / Dorian | **6** | 7 hoặc ♭7 |

Tính cả **nốt cảm** và **bậc 6 thăng** thì con số tụt xuống **3,1%**, và nhóm "nhảy cả
hai bên" bớt hẳn. Nốt cảm trên hợp âm bậc V **không phải nốt ngoài gam** — nó là chuẩn
mực.

Khi soạn ở giọng thứ: dùng gam thứ tự nhiên làm nền, **nâng bậc 7 khi hợp âm đang vang
là bậc V** (hoặc chứa nốt ấy), và cho phép bậc 6 thăng khi câu đang đi lên.

## Luật 7 — NHẢY THÌ ƯU TIÊN ĐÁP VÀO NỐT HỢP ÂM, NHƯNG KHÔNG PHẢI LUẬT CỨNG

| | đáp vào nốt hợp âm |
|---|---|
| sau bước nhảy ≥ 3 nửa cung | **66%** |
| sau bước liền bậc hoặc lặp | 56% |

Có nghiêng, nhưng **không tuyệt đối**. Và ở riêng Linh Nhi thì hai con số gần bằng nhau
(67% và 69%) — nghĩa là với chị, **cả câu vốn đã nặng nốt hợp âm**, không phải chỉ chỗ
đáp sau cú nhảy.

Nên phát biểu cho đúng: **không phải "nhảy thì phải đáp vào nốt hợp âm"** mà là **"cả
đường câu luôn sống trong khung hợp âm cộng gam"**. Luật 1 và luật 2 mới là gốc; luật này
chỉ là hệ quả.

Đừng ép 100% — ép thì mất đúng một phần ba số nốt các thầy thật sự đánh.

## Luật 8 — CẶP BẬC HAY ĐỨNG CẠNH NHAU

Đếm hai nốt liền nhau **trong cùng một hợp âm**, gộp ba thầy:

| cặp | tỉ lệ | | cặp | tỉ lệ |
|---|---|---|---|---|
| `1 → 9` | 3,3% | | `1 → 5` | 2,5% |
| `1 → 1` | 3,2% | | `9 → 1` | 2,5% |
| `5 → 5` | 3,0% | | `9 → ♭3` | 2,4% |
| `3 → 5` | 2,9% | | `5 → 3` | 2,2% |
| `5 → 1` | 2,9% | | `♭3 → ♭3` | 2,2% |

Riêng câu dạo Linh Nhi thì nặng về `1 · ♭3 · 5 · ♭7 · 9`:
`1→1` 6,0% · `♭3→♭3` 4,0% · `1→♭3` 3,3% · `5→1` 3,3% · `9→1` 3,3% · `5→♭7` 3,3% ·
`♭7→5` 3,3%.

Đọc ra: **các bậc trụ `1 · 3/♭3 · 5` nối với nhau, và bậc `9` là cửa ra vào hay dùng
nhất.** Không có cặp nào chiếm ưu thế áp đảo — phân bố rất phẳng, nghĩa là **không có
bảng "bậc nào sau bậc nào" cứng**; luật thật nằm ở luật 1–4.

---

## Tóm tắt để soạn

Khi đặt một nốt, hỏi theo thứ tự này:

1. Nó có **trong gam của bài** không? Không thì phải thuộc luật 5.
2. Hai phần ba số nốt nên là **nốt của hợp âm đang vang**.
3. Bước từ nốt trước: **45% nên là lặp hoặc liền bậc**, 66% không quá quãng ba.
4. Vừa nhảy ≥5 thì **quay đầu lại** (62%).
5. Giọng thứ: **nâng bậc 7 khi hợp âm là bậc V**.
6. Nốt ngoài gam chỉ dùng ở `♭7` và `♭5`, và **phải có ít nhất một bên nối liền bậc** (69%
   số nốt ngoài gam làm đúng thế).

Không có bước nào cho phép **bốc thăm**. Xem `cau-solo-la-soan-khong-phai-sinh` — nốt nào
cũng phải trả lời được câu *"nó đến từ đâu"*.

## Bốn chỗ từng treo — người dùng đã chốt

Phiếu gốc ở `ingest/phieu-luat-soan-not.md`.

### 1 · Hợp âm lướt — người dùng chỉ đích danh

Máy lọc được 20 chỗ ứng cử bằng luật *"vang dưới nửa ô + gốc đi liền bậc"*, nhưng luật ấy
**bắt quá tay**: nó gom cả hợp âm thật có chức năng (`C → C7 → F` là át của F, không phải
lướt). Nên **không tự quyết**; người dùng xác nhận từng ô.

### 2 · Khung gam — DÙNG KHUNG A, TRỪ HAI CHỖ

Cả đoạn dùng **một gam của giọng bài**. Chỉ đổi sang mode riêng ở:

- **hợp âm át phụ** (`D7` trong Đô trưởng → dùng mode của D7)
- **hợp âm mượn** (bậc iv thứ mượn, Picardy…)

Lý do giữ khung A làm nền: số đo ra **96,9% nốt trong gam** khi đo theo khung ấy, và với
hoà âm nằm trong giọng thì khung A và khung B cho **cùng một tập nốt** — không có bằng
chứng nào đòi phải phức tạp hơn.

### 3 · "Nhảy thì đáp vào nốt hợp âm" — GIỮ ~66%, KHÔNG SIẾT

Giữ đúng tỉ lệ đo được. Siết lên 100% thì câu soạn ra **sạch hơn bản ký âm** và mất đúng
một phần ba số nốt các thầy thật sự đánh — kể cả những chỗ hay như `C5 → G4` ở ô 4 Đừng
Xa, nơi cú nhảy đáp vào bậc 9 rồi bước liền bậc về nốt hợp âm.

Luật 1 và luật 2 đã đủ chặn chỗ chói tai; luật này chỉ là hệ quả.

### 4 · Các sheet không nằm trong cỡ mẫu

| sheet | thầy | quyết |
|---|---|---|
| **Mơ** | Cà Pháo | **đã xoá khỏi corpus** — corpus khai có đoạn dạo và giang tấu mà không có file, nên mọi số đo thiếu nó mà không ai biết |
| **Tuyết Rơi** | Linh Nhi | **xếp riêng**, không đưa vào md để học |
| **Sao anh chưa về** | Cà Pháo | **để sau**, học chung với Tuyết Rơi |
| **Papa** | Linh Nhi | **để sau**, học chung với Tuyết Rơi |

Ba bản dưới cùng hợp thành **một nhóm hoãn**, người dùng sẽ học cả nhóm sau. Danh sách này
đã ghi vào `tools/sheet/corpus.json` ở khoá `_de_sau`, nên lần quét sau không được báo
chúng là "bỏ quên" nữa — chúng bị hoãn có chủ ý.

Hệ quả cho cỡ mẫu: Linh Nhi có **9 bản ký âm trên đĩa** nhưng cỡ mẫu chỉ dùng **7**; hai
bản còn lại là Tuyết Rơi và Papa.

---

## Cụm nghiến — và vì sao nó KHÔNG làm lệch luật

Rút giai điệu bằng cách lấy **nốt cao nhất mỗi mốc gõ**. Nhưng **86 trên 2165 mốc (4,0%)**
có hai nốt trên cùng cách nhau ≤ 2 nửa cung. Ở đó "nốt cao nhất" có thể là nốt **màu** chứ
không phải nốt giai điệu.

### Hai thủ pháp khác nhau, đừng gộp

| | số mốc | là gì |
|---|---|---|
| cách **1 nửa cung** | 44 | **nghiến** — bấm dính phím đen với phím trắng liền kề để giả tiếng luyến của giọng hát; thuần âm sắc |
| cách **2 nửa cung** | 42 | **chồng quãng hai** — màu hoà âm kiểu ballad hiện đại (`Bb+C`, `C+D`), bồi dày chứ không nghiến |

Gần bằng nhau. Ngưỡng `≤2` gộp cả hai làm một là sai — chúng khác bản chất.

Riêng bài **Có Em Chờ** có **51 mốc** như thế trong cả bài, và cặp `F#5+G5` lặp lại nhiều
lần. Đây là **thủ pháp có chủ ý**, không phải lỗi ký âm: cả 14 sheet có 107 nốt hoa mỹ
được ghi đàng hoàng, riêng bài này **không có nốt hoa mỹ nào** — nên cặp `F+Gb` ở ô 54 là
hai nốt bấm cùng lúc thật.

### Đã thử ba cách rút nốt, và luật không đổi

| cách rút nốt | ngoài gam |
|---|---|
| luôn lấy **nốt trên cùng** | **2,8%** |
| ở cụm thì lấy nốt **gần nốt trước nhất** (dẫn giọng) | **3,1%** |
| ở cụm thì lấy nốt **trong gam** | ~2,4% |

Chênh nhau **6 nốt trên 2081**. Luật *"khoảng 97% nốt trong gam"* đứng vững ở cả ba.

### BẪY: đừng giải cụm bằng gam

Cách thứ ba — *"giữ nốt trùng gam, loại nốt kia"* — nghe hợp lý nhưng **vòng quanh**: nó
ép những mốc ấy thành 100% trong gam, rồi ta lại dùng chính con số ấy để chứng minh luật
1. Con số đo được một phần chính là bộ lọc.

Đo thử mức độ khác nhau: trên **29 mốc cụm** mà hai nốt khác nhau về việc trong gam, luật
"trong gam" và luật "gần nốt trước nhất" cho kết quả **khác nhau 48%** — gần như tung
đồng xu. Hai luật ấy **không thay thế được cho nhau**.

### Kết luận thực dụng

Giữ **luật đơn giản nhất: lấy nốt cao nhất**, vì ba cách cho cùng một kết luận và cách này
không giả định gì. Nhưng khi soạn thì **cụm nghiến là màu, không phải nốt giai điệu** —
đừng mô hình hoá nó như một bước trong tuyến giai điệu.

Cũng đừng lấy con số 4,0% ấy làm cớ nghi ngờ luật 1: chỉ **8 trên 58** nốt ngoài gam nằm
trên mốc cụm nghiến.

---

## Ký hiệu `¹` `²` là THỂ ĐẢO, không phải chất hợp âm

Chốt xong nhóm C của phiếu. Đây là chỗ cuối cùng còn treo, và nó hoá ra là **lỗi đọc
file của tôi**, không phải một hiện tượng âm nhạc.

**Triệu chứng.** Bản xuất MusicXML ghi `<kind>other</kind>` với thuộc tính
`text="¹"`. Bộ đọc không hiểu `other` nên rơi về hợp âm ba trưởng mặc định, và cái tên
đọc ra là `C¹/E` — một chuỗi vô nghĩa với máy.

**Cỡ mẫu và cách xác nhận.** `kind=other` xuất hiện **14 lần trong toàn kho, và chỉ ở
đúng một sheet: Hồng Kông 1**. Không thầy nào khác dùng lối ghi này. Trong 14 chỗ đó:

| ký hiệu in | số chỗ | bass cách gốc | nghĩa |
|---|---|---|---|
| `¹` | 12 | **luôn** 4 nửa cung | thể đảo 1 — bass là bậc 3 |
| `²` | 2 | **luôn** 7 nửa cung | thể đảo 2 — bậc 5 |

14/14 không có ngoại lệ. Người dùng đã nhìn bản in giấy và xác nhận: `C¹/E` chính là
`C/E`, số mũ chỉ là lối ghi thể đảo kiểu sách giáo khoa (`I₆`), người soạn ghi **cả hai
cách cùng lúc** — vừa số mũ vừa gạch chéo.

**Việc đã làm.** `tools/sheet/don_hop_am.py` hàm `chu()` giờ bỏ `¹` `²` khi ghép tên.
Nốt bass đã nằm trong phần `/E` phía sau nên không mất thông tin gì.

**Số đo không đổi.** Chất thật là hợp âm ba trưởng trơn — **đúng bằng** cái mà bộ đọc
rơi về theo mặc định. Nên mọi con số trong file này đứng nguyên; cái được sửa là **tên
hợp âm**, không phải tập nốt hợp âm.

**Hệ quả cho Luật 5.** Nốt `F#` ở ô 100 Hồng Kông 1, trên nền `C/E` giọng Đô trưởng, vẫn
là **nốt ngoài gam thật**. Không có hợp âm ẩn nào biện hộ cho nó — hợp âm đã đọc đúng
ngay từ đầu. Nó thuộc diện Luật 5, không thuộc diện hợp âm lướt.

> **Bài học đọc file.** `kind=other` nghĩa là *bộ xuất không phân loại được*, chứ không
> nghĩa là *hợp âm lạ*. Gặp `other` thì phải mở thuộc tính `text` ra xem chuỗi in thật là
> gì, rồi đối chiếu với bass — chứ đừng để nó rơi về mặc định rồi tưởng mình đã đọc xong.

---

## `<degree>` bị bỏ — và cái bẫy lớn hơn: GỐC không phải BASS

Người dùng đưa ảnh chụp ô 13 Hồng Kông 1 để hỏi một câu rất hẹp — *phiếu hỏi ô 13 hay hỏi
cả `G7` ô 14?* — và câu hỏi ấy lật ra hai lỗi.

### Lỗi 1 · Bỏ qua `<degree>`, đọc thiếu tên hợp âm

Bản in ghi `G7sus4/D` và `F(add9)/A`. Bộ đọc của tôi ra `G/D` và `F/A`. Hai chỗ mất:

- `<kind>` không có thuộc tính `text` thì phải **tự dịch chất ra hậu tố** —
  `suspended-fourth` mà bỏ trống thì `G7sus4` thành `G` trơn.
- `<degree>` là phần **cộng thêm** (`add9`, số 7 của `7sus4`, `b5`, `#11`) và tôi bỏ hẳn.

**Cỡ mẫu:** 65 trên 1603 ký hiệu toàn kho (4,1%) có `<degree>`; riêng trong đoạn solo là
**11 trên 299** (3,7%). Đây là nhóm **thứ ba**, không trùng 17 chỗ chất mở rộng đã vá
trước, cũng không trùng 14 chỗ `¹` `²`.

**Ảnh hưởng lên số đo: gần như không.** Trong 33 nốt giai điệu rơi trên 11 hợp âm ấy, chỉ
**2 nốt** đổi kết quả "có phải nốt hợp âm không" (58% → 64% trên chính 33 nốt đó, tức
2/2081 trên toàn bộ). **Luật 2 đứng nguyên.** Cái sai là **tên**, không phải tập nốt.

Đã vá `chu()` trong `tools/sheet/don_hop_am.py`: dịch `kind` ra hậu tố khi thiếu `text`,
ghép `<degree>`, và ghi cả dấu hoá của bass.

### Lỗi 2 · Bộ lọc hợp âm lướt so GỐC, trong khi hiện tượng nằm ở BASS

Đây mới là lỗi nặng. Người dùng mô tả hiện tượng là *"dùng tạm hợp âm lướt qua để **tạo
cảm giác đi bass**"*. Bộ lọc của tôi lại xét **gốc của ký hiệu hợp âm** đi liền bậc — hai
thứ khác nhau, và ở sheet này chúng lệch nhau rất xa.

Ví dụ chính chỗ người dùng chỉ, Hồng Kông 1 ô 13:

| | phiếu tôi viết | đo lại từ file |
|---|---|---|
| chuỗi hợp âm | `Am → G → F` | `G7sus4/D → F(add9)/A → G7sus4 → C` |
| bass | "đi xuống A–G–F" | `E2 → D2 → G2 → C2` |
| khoảng cách | ngầm hiểu là kề nhau | `Am` nằm ở **ô 10, cách ba ô**; ô 11 và 12 trống |

Ba cái sai chồng lên nhau: tên hợp âm thiếu, bass là bịa từ gốc, và "hợp âm trước" không
hề kề bên. Chuỗi thật `V7sus4 → IV → V7sus4 → I` là **át đi về chủ**, không có hợp âm
lướt nào cả.

Soát lại cả tám mục thì **hai mục tự rụng** (Hồng Kông 1 ô 13, Một Cõi Đi Về ô 60 — chỗ
sau là `Dsus4` **treo trên nền `Cm6`**, tay trái rải Đô thứ `C3 G3 C4 Eb4`, bass không đi
đâu cả). Một mục phải viết lại (Đừng Xa ô 57 là `Bbmaj7 → Bm7b5 → Bbmaj7` trên **bass
đứng yên ở A** — hợp âm thêu thật, nhưng thêu ở bè gốc chứ không phải để đi bass).

> **Luật đo từ nay.** Muốn xét "hợp âm lướt để đi bass" thì phải đọc **nốt thấp nhất của
> tay trái**, không đọc gốc ký hiệu. Và phải kiểm hai ký hiệu có **thật sự kề nhau**
> không — sheet để trống nhiều ô liền là chuyện thường.

### Cùng một hình dạng, ba lần

Cả ba lần đều là: **một nhãn trong file mà máy không đọc hết, bị lặng lẽ quy về mặc
định**, rồi tôi tưởng đã đọc xong.

| lần | nhãn bị bỏ | cỡ | ảnh hưởng số đo |
|---|---|---|---|
| 1 | gam thứ hoà thanh / giai điệu | — | 4,3% → 3,1% ngoài gam |
| 2 | chất mở rộng `m11` `13` `other` | 17/299 | nốt hợp âm 61,6% → 64,8% |
| 3 | `<degree>` và `kind` không có `text` | 11/299 | 2 nốt trên 2081 |

Lần 3 gần như vô hại về số, nhưng nó là lần nguy hiểm nhất, vì cái sai không nằm ở con số
mà ở **mô tả tôi đưa cho người dùng đi xác nhận**. Nếu người dùng tick theo mô tả sai thì
luật sinh ra từ đó cũng sai, mà không phép đo nào bắt được.

---

## Quét có hệ thống toàn kho — 17 file, 1756 ô nhịp

Người dùng hỏi: *"vậy bạn có dò kỹ lại cho các sheet của các thầy xem có còn lỗi tương tự
nữa chưa"*. Trước câu hỏi ấy tôi mới chỉ vá từng chỗ khi vấp phải. Đây là lần quét đầu
tiên **liệt kê trước** mọi thẻ MusicXML có thể làm lệch cao độ hoặc vị trí, rồi đếm.

### Sạch — không cần làm gì

| hạng mục | kết quả |
|---|---|
| `<transpose>` (nhạc cụ dịch giọng) | 0 |
| `divisions` đổi giữa bài | 0 |
| `<cue>` (nốt gợi) | 0 |
| `<unpitched>` | 0 |
| nốt không có `<staff>` | 0 |
| `kind` lạ ngoài bảng | 0 (sau khi vá) |
| `harmony` không có `<root>` | 0 |

### Có nhưng vô hại — đã kiểm chứng

**`<octave-shift>` — 14 chỗ, 2 file** (Hồng Kông 1, Biển Tình). Câu hỏi là `<pitch>` ghi
cao độ **thực** hay cao độ **viết trên giấy**. Bằng chứng: ở ô 97 Hồng Kông 1, dưới dấu
`8va`, nốt cao nhất đã là **midi 108** — đúng nốt cao nhất của đàn 88 phím. Nếu đó là cao
độ viết thì cộng thêm một quãng tám sẽ vượt khỏi bàn phím. Vậy `<pitch>` là **cao độ
thực**, không phải chỉnh gì.

**`harmony` có `<offset>` — 21 chỗ trong đoạn solo**, dời tới ±1,5 phách. Nghe thì nguy,
nhưng đo ra **không đổi gì**: ngoài gam 6,6% → 6,6%, nốt hợp âm 68,2% → 68,1%. Các mốc bị
dời không rơi vào chỗ có nốt giai điệu đổi chủ.

### Có và ĐÃ LÀM LỆCH SỐ

**Nốt nối (`<tie type="stop"`) — 275 trên 5166 nốt đoạn solo (5,3%).** Đuôi của một nốt
ngân bị đếm thành **một mốc gõ mới**, mà mốc ấy tất nhiên trùng cao độ với mốc trước. Hậu
quả nằm gọn ở luật 3:

| | đếm cả đuôi nối | bỏ đuôi nối |
|---|---|---|
| số nốt | 2325 | 2235 |
| **lặp lại nốt** | **8,8%** | **5,8%** |
| bước liền bậc | 26,1% | 27,0% |
| nhảy ≥ 3 nửa cung | 65,1% | 67,2% |

**Một phần ba số "nốt lặp lại" là giả** — không phải các thầy gõ lại một nốt, mà là một
nốt ngân dài bị cắt đôi ở vạch nhịp. Luật 1 và 2 gần như không nhúc nhích (0,2–0,6 điểm).

### Lỗ hổng nghiêm trọng hơn cả: KHÔNG ĐÂU GHI TRƯỞNG HAY THỨ

Đây là phát hiện đáng lo nhất của lần quét.

**Không một file MusicXML nào ghi `<mode>`.** 14/14 bản ký âm chỉ có `<fifths>`, mà một
bộ dấu hoá thì ứng với **hai** giọng — 0 dấu là Đô trưởng *hoặc* La thứ. `corpus.json`
không có trường giọng, `data/sheet-solos/*.json` cũng không.

> **ĐÍNH CHÍNH.** Lần đầu tôi viết mục này là *"không đâu ghi trưởng/thứ"* — **sai**.
> File `knowledge/teachers/linh-nhi-piano.md` ghi đủ giọng của **cả 7 bài Linh Nhi** ngay
> ở bảng mục 1. Tôi kết luận trước khi đọc file md của thầy, đúng cái bẫy mà luật
> *"file md của thầy CHÍNH LÀ thầy ấy, phải đọc trước khi trả lời"* dựng ra để chặn.
> Chỗ thiếu thật hẹp hơn nhiều — xem dưới.

Chạy lại từ đầu chỉ bằng thứ **máy đọc được** thì mọi bài mặc định thành trưởng và con số
vọt lên **6,6%**. Nhưng thông tin không mất, nó chỉ **nằm trong văn xuôi tiếng Việt của
file md** chứ không nằm ở chỗ script đọc được.

Luật 1 **có thể vẫn đúng**; điều tôi khẳng định được là **một script chạy từ đầu chưa tái
lập được nó**. Đó là hai chuyện khác nhau và không được lẫn.

### Phép suy trưởng/thứ, và nó đúng tới đâu

Suy từ hợp âm kết cộng số lần xuất hiện của hai chủ âm ứng cử, rồi **đối chiếu với bảng
giọng trong md Linh Nhi** làm phép thử:

| bài Linh Nhi | md ghi | máy suy ra | khớp |
|---|---|---|---|
| Biển Tình | Rê trưởng | TRƯỞNG D | ✓ |
| Đừng Xa Em Đêm Nay | Rê thứ | THỨ D | ✓ |
| Đường Xưa Lối Cũ | Đô trưởng | mơ hồ (kết `Fm`, C×29 · A×21) | ✓ sau khi đọc md |
| Mùa Xuân Đầu Tiên | Sol trưởng | TRƯỞNG G | ✓ |
| Rừng Lá Thấp | La thứ | THỨ A | ✓ |
| Lá Thư Trần Thế | Rê thứ | THỨ D (kết `A13` = át) | ✓ |
| Một Cõi Đi Về | Sol thứ | THỨ G | ✓ |

**7/7 khớp.** Phép suy đủ tin để dùng; chỗ nó do dự (`Đường Xưa` kết bằng iv mượn, `Lá
Thư` kết bằng át) thì md giải quyết được.

### Tôn Hùng — và một phép thử tôi suýt tin nhầm

Tôi từng viết hai bài Tôn Hùng *"ra rõ, không cần hỏi"*. **Nói ẩu** — phép suy mới chỉ
kiểm trên 7 bài Linh Nhi, mà Tôn Hùng thì không có md để đối chiếu.

Nên dựng thêm hai phép thử. Một cái **hỏng hẳn**, một cái **thiên vị**:

**Phép thử theo dấu hoá — BỎ.** Ý tưởng: nốt cảm của giọng thứ phải viết bằng dấu thăng,
bậc 6 mượn viết bằng dấu giáng. Kiểm trên 7 bài đã biết thì **sai 5**. Lý do: Đừng Xa là
Rê thứ, nốt cảm phải là `C#`, nhưng file viết **45 lần thành `Db`**. Các bản này ký âm tự
động từ MIDI nên **cách viết dấu hoá chạy theo bộ dấu hoá chứ không theo chức năng**.
Đừng dùng cách viết nốt để suy bất cứ điều gì trên kho này.

**Phép thử đếm át — THIÊN VỊ.** Đếm hợp âm trưởng ở bậc V. Nó đúng 7/7 trên Linh Nhi
nhưng **chỏi ở Chiếc Lá Mùa Đông**, đọc ra Si giáng trưởng. Sai, và sai có hệ thống: trong
giọng thứ **tự nhiên**, bậc VII giáng là hợp âm trưởng và rất hay dùng — phép thử đếm nó
thành "át của giọng trưởng tương đối". Bài nào dùng thứ tự nhiên thì phép này bẻ sang
trưởng.

**Phép thử đọc kết đoạn — DÙNG CÁI NÀY.** Xem từng đoạn mở bằng hợp âm gì, kết bằng hợp âm
gì, cộng hợp âm hay dùng nhất.

| bài | kết luận | bằng chứng |
|---|---|---|
| Chiếc Lá Mùa Đông | **Sol thứ** | mở `Eb→F→Gm` (bVI-bVII-i), kết `Cm→F→Gm` (iv-bVII-i), `Gm×27`, có `D7×8` là át hoà thanh |
| Tình Em Là Đại Dương | **La thứ tự nhiên** | **mọi đoạn** đều kết về `Am`; **không một hợp âm `E` trưởng nào** — thuần Aeolian |

Vậy câu trả lời ban đầu của tôi *đúng*, nhưng lý do tôi đưa ra lúc ấy thì chưa đủ. Hai
chuyện khác nhau.

### Chỗ thiếu thật: BA bản Cà Pháo

Cà Pháo chưa có file md. Phép đọc kết đoạn gỡ được cả ba, và gỡ ra **hai chuyện đáng
lưu** mà phép đếm chủ âm đã che mất:

| bài | kết luận | bằng chứng |
|---|---|---|
| Hồng Kông 1 | **Đô trưởng** | mọi đoạn kết về `C`, `C×24`; `D7` cuối bài là vòng quay lại chứ không phải chủ âm |
| Có Em Chờ | **Mi giáng trưởng**, rồi **chuyển giọng** | phần chính `Ab Eb Bb7 Fm` — nhưng `chorus_mod` và **outro** sang hẳn vùng **Mi trưởng** (`C#m F#m B E`) |
| Ngày mai em đi | **Mi giáng trưởng** | mọi đoạn mở `Eb` kết `Bb`, cả bài kết `Eb`; toàn bộ hợp âm điệu thuộc Eb (`Eb Fm Gm Ab Bb Cm`) |

**Hai chỗ phải nhớ:**

1. **Bộ dấu hoá của "Ngày mai em đi" ghi SAI trong file** — 2 giáng (Si giáng trưởng)
   trong khi bài ở Mi giáng trưởng (3 giáng). Suy giọng bằng `<fifths>` là hỏng ở bài này.
2. **Đoạn kết của "Có Em Chờ" KHÔNG còn ở giọng gốc.** Nó là một đoạn solo, tức nó **có
   trong cỡ mẫu**, mà lại được đo bằng gam Mi giáng trong khi nó đã sang Mi trưởng. Đây là
   một nguồn "nốt ngoài gam" giả chưa ai trừ ra.

Bài còn lại của Cà Pháo, **Yêu là tha thứ**, không gỡ được: không có ký hiệu hợp âm nào để
mà suy (xem dưới).

Toàn bộ giọng đã ghi vào `corpus.json` ở trường `giong`, kèm `giong_nguon` phân biệt
**`md-linh-nhi`** (người dùng đã xác nhận) với **`suy-tu-ket-doan`** (tôi suy, chưa xác
nhận), và `giong_ghi_chu` chép bằng chứng.

> **Việc phải làm.** Khi dựng file md cho Cà Pháo thì ghi giọng của cả bốn bài vào bảng
> đầu, đúng lối md Linh Nhi. Và về lâu dài nên đưa giọng vào `corpus.json` để **script
> đọc được**, chứ để trong văn xuôi thì mỗi phép đo lại phải có người đọc hộ.

### Hai lỗ hổng về kho

**Yêu là tha thứ (Cà Pháo) — 85 ô, KHÔNG có một ký hiệu hợp âm nào.** Bài này góp nốt cho
luật 1 và 3 nhưng góp **số không** cho luật 2, mà bảng cỡ mẫu lại khai chung là 14 bản.
Mẫu số của luật 2 nhỏ hơn mẫu số của luật 1 — chưa chỗ nào nói ra điều đó.

**Papa (Linh Nhi) có file trên đĩa nhưng không có trong corpus.** ~~Chưa ai quyết~~ —
người dùng đã chốt ngay khi được hỏi: **để sau, học chung với Tuyết Rơi**. Vậy nhóm hoãn
giờ có ba bản: Tuyết Rơi, Sao anh chưa về, Papa. Xem mục "Các sheet không nằm trong cỡ
mẫu" ở trên; danh sách nằm ở khoá `_de_sau` trong `corpus.json`.

### Số chỉ nhịp đổi giữa bài — 7 file

Đáng chú ý nhất: **Hồng Kông 1 đổi sang 2/4 từ ô 100**, mà ô 100 chính là đầu đoạn kết
(corpus khai outro 100–107). Đúng như bản in người dùng đưa. Các chỗ khác phần lớn là ô
lấy đà lẻ một nhịp rồi trở lại ngay (Đừng Xa ô 40 và ô 82, Rừng Lá ô 63). Papa thì xen kẽ
6/4 với 4/4 suốt.

Chưa đo được chỗ này làm lệch gì, vì mọi phép đo hiện tại làm việc theo `divisions` chứ
không theo phách. Nhưng bất kỳ bảng nào lưu **một** giá trị `phach` cho cả bài thì sai với
đoạn kết Hồng Kông 1.


---

## Sheet có thể KHÔNG cùng giọng với bản thu

Người dùng tra Chordify bài **Người hãy quên em đi** (Cà Pháo) và ra **Si giáng thứ**,
trong khi tôi đọc sheet ra **Rê thứ**. Truy thì hai bên lệch **đúng 4 nửa cung** ở mọi hợp
âm:

| Chordify (audio) | sheet | lệch |
|---|---|---|
| `Bbm` | `Dm` | +4 |
| `Ebm` | `Gm` | +4 |
| `F` | `A` | +4 |

**Không phải Chordify đoán sai kiểu ngẫu nhiên** — lệch có hệ thống, tức một trong hai bên
đã bị dịch giọng.

**Sheet chắc chắn ở Rê thứ:** 114 ký hiệu, toàn hợp âm điệu của Rê thứ (`Dm11 Gm9 A11
Em7b5 FM7 BbM7`), kết bằng `DM9`.

**Bằng chứng nghiêng về phía sheet là bản chơi được:** dịch xuống 4 nửa cung thì nốt thấp
nhất tay trái thành **midi 22 — nốt Bb0, phím thứ hai từ dưới của đàn 88 phím**. Không ai
đệm bolero ở đó. Nhiều khả năng bản thu trên YouTube đã bị hạ cao độ (chuyện thường gặp
với video cover), hoặc sheet là bản soạn lại ở giọng khác.

**Chưa xác định được bên nào đã đổi**, và tôi không có cách xác định từ trong repo.

### Điều này làm hỏng cái gì, và KHÔNG làm hỏng cái gì

**Không hỏng:** mọi luật soạn nốt trong file này đều nói về **quan hệ bậc** — nốt trong
gam, nốt hợp âm, độ lớn bước. Dịch giọng giữ nguyên hết. Luật 1 đến 8 không suy suyển.

**Hỏng:** bất kỳ khẳng định nào về **cao độ tuyệt đối** hoặc **thầy hay chơi giọng nào**.
Cụ thể là hằng số neo tầm âm tay phải `TAM_TAY_PHAI = 73.6` bên KeyTrain — nó đo trên 7
sheet Linh Nhi, và nếu một trong bảy bản ấy cũng bị dịch như bản này thì con số lệch mà
không ai biết.

> **Việc chưa làm.** Chưa kiểm sheet nào khác có bị lệch giọng so với bản thu không. Muốn
> kiểm thì phải đối chiếu từng bài với bản thu — việc ấy nằm ngoài repo, cần người dùng
> tra như họ vừa làm với bài này.

---

## Máy dò hợp âm tự động hay nhầm giọng SONG SONG — và cách bác nó

Người dùng tra Chordify bài **Chiếc Lá Mùa Đông** (Tôn Hùng) và ra **Si giáng trưởng**,
trong khi tôi đọc ra **Sol thứ**.

**Đây KHÔNG phải chuyện dịch giọng** như bài "Người hãy quên em đi". Chordify liệt
`Gm · Ebmaj7 · F · Bb` — **đúng cùng cao độ với sheet**. Hai bên nghe cùng một thứ, chỉ
gọi tên chủ âm khác nhau. Si giáng trưởng và Sol thứ là **giọng song song**: cùng bộ dấu
hoá, cùng bộ hợp âm điệu. Máy dò tự động đếm nốt chứ không đọc chức năng, nên rất hay ngả
về nhãn trưởng.

**Năm bằng chứng giữ Sol thứ:**

1. Chuỗi `Am7b5 → D7 → Gm` xuất hiện **6 lần** — đó là **ii°–V7–i** của Sol thứ.
2. `D7` xuất hiện **8 lần**, lần nào cũng giải về `Gm` hoặc `Cm`. `D7` chứa `F#`, **không
   thuộc Si giáng trưởng** — một bài Si giáng trưởng không có lý do dùng nó tám lần.
3. Kết bài `Gm`; mở bài `Eb → F → Gm` (bVI–bVII–i).
4. `Gm×23` so với `Bb×11`.
5. Mọi đoạn đều kết về `Gm`.

Cái `Am` Chordify hiện ra, sheet ghi là `Am7b5` — cả bài **không có một nốt `E` bêcar
nào** (đếm được 0, so với `Eb×125`). Chordify rút gọn mất chữ `b5`.

> **Luật dùng máy dò hợp âm.** Coi nó là nguồn tốt cho **tên hợp âm** và cho **cao độ**
> (nó nghe bản thu thật), nhưng **đừng lấy ô KEY của nó làm chuẩn**. Muốn chốt trưởng hay
> thứ thì đọc chức năng: hợp âm át giải về đâu, bài kết ở đâu, các đoạn kết ở đâu.
>
> Và phân biệt hai kiểu chỏi, vì cách xử khác hẳn nhau:
>
> | kiểu chỏi | dấu hiệu | nghĩa |
> |---|---|---|
> | **dịch giọng** | mọi hợp âm lệch **cùng một số** nửa cung | sheet và bản thu khác cao độ thật — ảnh hưởng mọi khẳng định về cao độ tuyệt đối |
> | **nhầm song song** | hợp âm **trùng khớp**, chỉ nhãn KEY khác | chỉ là nhãn — không ảnh hưởng gì tới số đo |

**Kết quả đối chiếu Chordify, do người dùng tra:** bốn bài **Tình Em Là Đại Dương ·
Hồng Kông 1 · Có Em Chờ · Ngày mai em đi** khớp với phép suy của tôi — đã nâng
`giong_nguon` lên `nguoi-dung-xac-nhan`. Chỉ **một bài lệch giọng thật** (Người hãy quên
em đi, +4 nửa cung) và **một bài lệch nhãn** (Chiếc Lá Mùa Đông).

---

## Quy trình chốt giọng — ai trả lời việc gì

Người dùng hỏi có nên lấy giọng từ phép đo của tôi không. Câu trả lời là **có, nhưng chỉ
cho một nửa câu hỏi** — và ghi lại đây để phiên sau khỏi hỏi lại.

| việc cần biết | hỏi ai | vì sao |
|---|---|---|
| **Nhãn giọng** — trưởng hay thứ, chủ âm nào | **đọc sheet** | đọc được **chức năng**: át giải về đâu, các đoạn kết ở đâu, ii–V–i nằm chỗ nào. Máy dò tự động chỉ đếm nốt nên ngả về nhãn trưởng ở mọi bài thứ tự nhiên |
| **Sheet có cùng cao độ với bản thu không** | **máy dò audio** (Chordify) | trong repo **không có cách nào biết**. Một sheet bị dịch giọng vẫn tự nhất quán hoàn toàn — soi cả ngày cũng không thấy |
| **Bài không có ký hiệu hợp âm** | máy dò, hoặc tai người dùng | không có chức năng để đọc thì không suy được gì |

Cách đọc Chordify cho việc thứ hai: **bỏ qua ô KEY của nó**, chỉ so **dãy tên hợp âm** với
sheet. Trùng tên là yên tâm; lệch đều cùng một số nửa cung là sheet và bản thu khác cao
độ, phải ghi lại.

Thành tích của phép đọc sheet ở vòng đối chiếu này: **5/6 khớp với Chordify**, cái thứ sáu
là chỏi nhãn (giọng song song) chứ không phải chỏi thật. Cộng thêm **7/7** khớp với bảng
giọng trong md Linh Nhi. Nhưng đừng đọc con số ấy thành "luôn đúng" — nó chỉ nói phép đọc
chức năng đáng tin **khi sheet có đủ ký hiệu hợp âm**.

---

## Soát lại toàn bộ hợp âm màu — 52 dạng, 5 lỗi

Người dùng yêu cầu: *"sau khi dò ra giọng trưởng thứ các sheet rồi thì quét lại xem có lỗi
sai gì nữa không. Các hợp âm màu có tên hoặc ký hiệu khác biệt đã được nhận ra đúng hết
chưa"*.

Liệt kê **mọi tổ hợp `(kind, text, degree)`** trong kho: **1306 ký hiệu, 52 dạng khác
nhau**. Năm dạng đọc sai.

| lỗi | dạng | số chỗ | trong đoạn solo |
|---|---|---|---|
| **A** | `degree-type="alter"` bị **cộng thêm** thay vì **thay thế** | 11 | 1 |
| **B** | `add` bậc 5 có dấu hoá — bộ xuất dùng nó để ghi `m7b5`, cũng phải thay thế | 19 | 2 |
| **C** | `kind=major` mà `text="7"` — mất hẳn quãng 7 thứ | 3 | 0 |
| **D** | bậc 7 không dấu đọc thành **7 trưởng**, trong khi ký hiệu in là **7 thứ** | 2 | 2 |
| **E** | tên đọc ra nhập nhằng: `Db9` (thật là `D(b9)`), `F##5` (thật là `F#(#5)`) | 3 | — |

**Lỗi A và B là cùng một gốc:** `Am7b5` bị đọc thành `{A C Eb G Gb}` — giữ **cả** bậc 5
tự nhiên lẫn bậc 5 giáng. Một nốt `G` trên hợp âm ấy bị tính là nốt hợp âm, mà thật ra
không phải.

**Lỗi D do chính phép tự kiểm bắt được.** Chuẩn MusicXML tính `degree-alter` so với gam
trưởng, nên `<degree-value>7</degree-value>` với `alter=0` là quãng 7 **trưởng**. Nhưng ký
hiệu hợp âm in trên giấy thì số `7` trơn **luôn** là 7 thứ. Bản in Hồng Kông 1 ô 13 ghi rõ
`G7sus4/D` = G C D F, không phải F#. **Bản in thắng chuẩn file.**

### Ảnh hưởng lên các luật

**Luật 1 (ngoài gam): không đổi, vẫn 2,8%.**

**Luật 2 (nốt hợp âm): 64,8% → 67,7%.** Đây là lần thứ ba con số này phải sửa vì bảng chất
hợp âm (61,6% → 64,8% → 67,7%), và là lý do tôi đưa bảng ấy vào một chỗ duy nhất.

**Luật 3: lặp lại nốt 8,8% → 6,0%** (do bỏ đuôi nốt nối), liền bậc 26,9%, nhảy ≥3 là 67,1%.

Riêng trong **đoạn solo** thì chỉ 3 hợp âm dính lỗi A/B/C, và **0 nốt** đổi kết quả. Năm
lỗi này nằm gần hết ở **phần hát** — vùng chưa có luật nào, nhưng là vùng sẽ học tiếp.

### Việc đã làm — bảng chất hợp âm giờ có MỘT chỗ ở

Thêm `tap_not()` vào `tools/sheet/don_hop_am.py`. Trước đó mỗi script đo lại tự dựng lại
bảng, và **riêng một phiên đã dựng 4 lần, sai 3 lần khác nhau**.

Kèm phép tự kiểm: `python tools/sheet/don_hop_am.py --kiem` — bốn ca gài đúng bốn lỗi đã
sập (`m7b5` viết kiểu `add b5`, `G7sus4/D`, `alter` bậc 5, ký hiệu thể đảo `other`).

Sau khi vá: **0 hợp âm nào trong cả kho còn rơi về hợp âm ba trưởng mặc định.**

### Một đoạn chuyển giọng đã bóp méo số đo

Soát ngoài gam theo **từng đoạn** thì lòi ra một chỗ dị thường:

| đoạn | ngoài gam đo bằng giọng bài |
|---|---|
| **Có Em Chờ · đoạn kết** | **63% (32/51)** |
| các đoạn còn lại | 0–17% |

Một đoạn 51 nốt ấy chiếm **hơn một phần ba** toàn bộ nốt ngoài gam của cả kho. Lý do: cả
bài ở **Mi giáng trưởng** nhưng đoạn kết **chuyển sang Đô thăng thứ** — hợp âm `Dbm7 ·
B13 · Gbm7 · Abm7 · E`. Đo bằng gam đúng thì còn **2%**.

Sửa đúng một chỗ ấy: **ngoài gam toàn kho 4,2% → 2,8%.**

Ba đoạn dị thường còn lại **không** chuyển giọng — đã thử mọi gam 7 nốt, không gam nào
khớp hơn giọng bài. Đó là **nốt màu thật**:

| đoạn | hợp âm | đọc ra |
|---|---|---|
| Hồng Kông 1 · kết | `C/E → Fm/Ab → Ddim7 → D7/C` | Đô trưởng mượn `Fm`, `Ddim7` |
| Đường Xưa · kết | `Am → Fm` | Đô trưởng mượn `Fm` (chỉ 23 nốt) |
| Ngày mai em đi · dạo | `Eb → Bbm7 → C7 → Ab → Dbmaj7` | Mi giáng trưởng mượn `Bbm7`, `Dbmaj7` |

> **BẪY ĐO.** Khi so một đoạn với "gam nào khớp nhất", **phải so tập cùng cỡ**. Lần đầu
> tôi so gam trưởng 7 nốt với gam thứ 9 nốt (đã kể nốt cảm và bậc 6 thăng) — giọng thứ nào
> cũng thắng, và tôi suýt khai ba đoạn kia là chuyển giọng. Dùng tập 7 nốt cho cả hai bên
> thì ba đoạn ấy tự rụng.

Đoạn chuyển giọng đã ghi vào `corpus.json` ở `sections.outro.giong` — phép đo phải lấy
giọng của **đoạn** khi đoạn có ghi, chứ không lấy giọng của bài.

---

## ÁT và LƯỚT — hai chữ định nghĩa bằng hai thứ khác nhau

Người dùng hỏi thẳng: *"ý bạn khi nói át là sao còn lướt là sao"*. Phải ghi lại, vì chính
tôi đã dùng lẫn hai chữ này khi dựng bộ lọc.

**ÁT — định nghĩa bằng CHỨC NĂNG, tức sức kéo.** `C7` chứa `E` và `Bb` cách nhau một quãng
ba cung. Cặp ấy không đứng yên được: `E` lên `F`, `Bb` xuống `A`, cả hai chui vào `F A C`.
Sức kéo ấy là toàn bộ định nghĩa.

**LƯỚT — định nghĩa bằng VAI TRÒ TRONG MỘT ĐƯỜNG ĐI.** Hợp âm chèn giữa hai hợp âm thật,
chỉ để một bè (thường là bass) bước được từng bậc. **Không có sức kéo riêng.**

### Thời lượng KHÔNG phân biệt được hai thứ này

Đây là chỗ bộ lọc của tôi sai từ đầu. Nó dùng *"vang dưới nửa ô + gốc đi liền bậc"* làm
dấu hiệu lướt. Nhưng **át có thể ngắn một cái gõ, lướt có thể dài**. Thời lượng nói về
cách đánh, không nói về chức năng.

### Ba câu để phân biệt

| hỏi | át | lướt |
|---|---|---|
| nghe có bị kéo về **một chỗ cụ thể** không | có | không, chỉ thấy trơn hơn |
| bỏ nó đi thì mất gì | mất cú kéo | mất độ mượt của đường bass |
| bass có **bước từng bậc** xuyên qua nó không | không — bass đứng yên hoặc nhảy quãng 4/5 | có, và đó là lý do nó tồn tại |

### Ca mẫu — Hồng Kông 1 ô 48 và ô 56

`C → C7 → F`, trong Đô trưởng tức **I → V7/IV → IV**. `C7` là **át phụ**, lối chuẩn để đi
từ bậc I sang bậc IV. Ba bằng chứng nó **không** phải lướt:

1. **Bass không bước.** Cả hai ô, tay trái quanh `C` và `Bb` rồi **nhảy** xuống `F`.
2. **Bỏ đi thì mất cú kéo**, không mất độ mượt.
3. **`Bb` vang suốt cả ô**, không phải một chấm.

### BẪY ĐO: khoảng cách giữa hai KÝ HIỆU ≠ thời gian hợp âm THẬT SỰ VANG

Phiếu của tôi ghi *"`C7` vang 0,5 phách"*. Sai. Ký hiệu `C7` đặt ở phách 3, nhưng tay trái
đã có `Bb` từ **phách 0** (ô 48) và **phách 0,5** (ô 56) — tức chất `C7` phủ gần hết ô.

Con số 0,5 ấy là **khoảng cách tới ký hiệu kế tiếp**, không phải thời gian vang. Mọi phép
đo thời lượng hợp âm từ nay phải đọc **nốt tay trái đang giữ**, không đọc vị trí ký hiệu.

Đây là lần thứ hai cùng một kiểu sai trên cùng bộ lọc: lần trước là **so gốc ký hiệu thay
vì bass thật**, lần này là **đo khoảng ký hiệu thay vì tiếng thật**. Cả hai đều do đọc lớp
ký hiệu mà tưởng đang đọc lớp âm thanh.

---

## Dựng lại bộ lọc hợp âm lướt — bộ cũ bắt 0 ca thật, 8 ca sai

Người dùng bảo dựng lại và quét toàn bộ sheet của các thầy. Công cụ mới:
`tools/sheet/hop_am_luot.py`, có phép tự kiểm (`--kiem`).

### Điều gì đổi

Bộ cũ lọc bằng *"vang dưới nửa ô + gốc đi liền bậc"*. Hỏng ở cả hai vế, **cùng một kiểu**:
đọc lớp **ký hiệu** mà tưởng đang đọc lớp **âm thanh**.

Bộ mới đọc **nốt tay trái đang thật sự vang** tại từng mốc hợp âm (kể cả nốt bắt đầu từ
trước và còn ngân), rồi mới xét bass có bước từng bậc không.

### Ba thứ khác nhau đang bị gộp làm một

Bass bước từng bậc là điều kiện **cần, không đủ**. Lần chạy đầu bộ mới bắt 42 chỗ, trong
đó phần lớn là vòng hoà thanh bình thường. Phải tách:

| loại | dấu hiệu | số chỗ |
|---|---|---|
| **lướt thật** | bass bước · hợp âm có **nốt ngoài gam** · không có sức kéo | **6** |
| **thể đảo để đi bass** | bass bước · hợp âm điệu nhưng đặt ở **thể đảo** | 10 |
| **vòng đi bậc** | cả ba hợp âm đều là hợp âm điệu ở thể gốc — **không ai chèn gì** | 26 |

Nhóm thứ ba là chỗ suýt sai: `F#m → Em → D` (iii–ii–I của Rê trưởng) và `Eb → F → Gm`
(bVI–bVII–i của Sol thứ — chính câu kết dùng để chốt giọng Chiếc Lá) đều có bass bước, mà
không hợp âm nào là chèn cả. Bass bước vì **cả vòng** đi xuống.

### Sáu ca lướt thật

| bài · đoạn | vòng | bass |
|---|---|---|
| Ngày mai em đi · **câu dạo** | `Eb → Bbm7/Db → C7` | `Eb → C# → C` |
| Người hãy quên em đi · điệp khúc | `Gm → Gb → Fsus` | `G → F# → F` |
| Có Em Chờ · điệp khúc chuyển giọng | `Amaj7 → Abm7 → Bsus4` | `A → Ab → F#` |
| Đường Xưa Lối Cũ · điệp khúc ×2 | `Dm → E → F` | `D → E → F` |
| Đường Xưa Lối Cũ · điệp khúc | `F → E7 → Dm` | `F → E → D` |

Ba ô Đường Xưa còn treo: `E` và `E7` trong Đô trưởng là át phụ của `Am`, nhưng ở đây chúng
đi vào `F` và `Dm`. Đọc theo bass là lướt, đọc theo chất là át phụ giải chệch. **Chờ người
dùng nghe.**

### Tám mục phiếu cũ — bác hết

Không mục nào là hợp âm lướt. Riêng `C → C7 → F` (Hồng Kông 1 ô 48 và 56) bộ mới xếp thẳng
vào **ÁT**, tự nhận ra bằng cặp quãng ba cung và quan hệ quãng 5 với hợp âm sau. Bảy mục
còn lại rớt ngay vòng đầu vì **bass không bước từng bậc**.

### Đã soát lỗi cùng kiểu trong toàn repo

Lỗi "đọc lớp ký hiệu thay lớp âm thanh" **không có ở công cụ nào khác**:

- `tools/sheet/profile.py` hàm `harmony()` **suy hợp âm từ chính nốt tay trái**, không đọc
  `<harmony>` — đúng lớp âm thanh, và file ấy đã tự ghi "bẫy 1" ở đầu.
- `tools/sheet/hai_tay.py` đo khoảng cách giữa các **mốc gõ thật**, không phải mốc ký hiệu.
- `clone_do.py` dùng lại `profile.harmony`, nên thừa hưởng cách đọc đúng.

Lỗi chỉ nằm trong script lọc tạm — thứ không có chỗ ở trong repo, nên không ai soát được.
Đó cũng là lý do bộ mới được viết thành **công cụ có tên, có tài liệu, có phép tự kiểm**.

---

## GIẢI CHỆCH — và ba lỗ hổng nó lôi ra trong bộ lọc vừa dựng

Người dùng hỏi *"ba ô nào và giải chệch là gì"*. Ba ô ấy là **Đường Xưa Lối Cũ ô 47, 52,
55**, đều trong điệp khúc. Trả lời câu hỏi xong thì chính nó lật luôn kết luận của tôi.

### Giải chệch là gì

Át dựng lên sức kéo **chỉ đích danh một hợp âm**. `E` (có `G#`) chỉ vào `Am`: `G#` muốn lên
`A`, `D` muốn xuống `C`.

**Giải chệch** = dựng đủ sức kéo ấy rồi **đi chỗ khác**. Tai vẫn nghe cú kéo, chỉ không
được thứ nó chờ; câu nhạc **không đóng lại** mà bị đẩy đi tiếp. `E → F` là kiểu kinh điển:
trong La thứ đó là **bậc V sang bậc VI**, mà `F` (F A C) là hợp âm gần `Am` (A C E) nhất
mà không phải `Am`.

**Lướt thì ngược hẳn: nó không dựng sức kéo nào cả**, chỉ lấp chỗ cho bass bước.

### Bằng chứng lật kết luận

Đếm cả bài Đường Xưa Lối Cũ: hợp âm `E` xuất hiện **6 lần**.

| đi đâu | số lần |
|---|---|
| `Am` — **giải đúng** | 2 (ô 49, ô 56) |
| `F` — giải chệch | 3 |
| `Dm` — giải chệch | 1 |

Đã giải đúng **hai lần trong cùng một điệp khúc** thì `E` là **át phụ thật**. Một hợp âm
không thể vừa là chèn tạm vừa là át phụ. Nên ba ô kia là **giải chệch, không phải lướt**.

### Ba lỗ hổng phải vá

**1 · Bộ lọc chỉ nhìn hợp âm NGAY SAU.** Nó không biết hỏi *"hợp âm này hành xử thế nào ở
chỗ khác trong cùng bài"*. Thêm `at_trong_bai()`: gom gốc của mọi hợp âm đã giải đúng
xuống quãng 5 ở bất kỳ đâu trong bài; gặp lại gốc ấy chỗ khác thì đó là giải chệch.

**2 · Đòi có cặp quãng ba cung mới coi là át — SAI.** `E` trưởng ba nốt (`E G# B`) **không
có** cặp ấy, chỉ `E7` mới có. Mà một hợp âm ba trưởng ở bậc V vẫn là át đầy đủ. Đổi sang
phép thử **có bậc 3 trưởng trên gốc của chính nó** — đúng thứ phân biệt át với bậc v thứ
của gam thứ tự nhiên.

**3 · Khoá tra cứu là (gốc + tập nốt) — quá chặt.** `E` và `E7` thành hai khoá khác nhau,
nên ô 52 (`E7`) vẫn lọt. Đổi khoá thành **gốc**: `E` và `E7` là cùng một át trên cùng một
gốc.

### Số cuối cùng

| loại | trước khi vá | sau khi vá |
|---|---|---|
| **lướt thật** | 6 | **3** |
| thể đảo để đi bass | 10 | 9 |
| vòng đi bậc | 26 | 19 |

Ba ca lướt thật trong cả kho **13 bản ký âm**:

| bài · ô | vòng | bass |
|---|---|---|
| Ngày mai em đi · ô 3 · **câu dạo** | `Eb → Bbm7/Db → C7` | `Eb → Db → C` |
| Người hãy quên em đi · ô 34 | `Gm → Gb → Fsus` | `G → F# → F` |
| Có Em Chờ · ô 58 | `Amaj7 → Abm7 → Bsus4` | `A → Ab → F#` |

**Ba trên hơn một nghìn ký hiệu.** Hợp âm lướt là thủ pháp **hiếm** trong kho này — không
phải nét thường trực như tôi tưởng lúc dựng phiếu 20 chỗ.

> **Bài học chung.** Ba lần vá liên tiếp đều do **dữ liệu bác lại**, không do tôi nghĩ ra.
> Cả ba lần cái sai đều là **xét một cặp hợp âm biệt lập** thay vì xét hành vi của hợp âm
> ấy **trong cả bài**. Chức năng hoà thanh là thứ chỉ hiện ra ở quy mô cả bài.
