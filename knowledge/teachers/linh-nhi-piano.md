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

## NGUYÊN TẮC — câu solo là thứ được SOẠN

Người dùng chốt, áp cho **KeyTrain, PianoBrain, file này và mọi thầy sau này**:

> *"Các câu solo giờ là phải soạn ra để chơi chứ không sinh ngẫu nhiên nữa, bộ sinh hãy
> sửa thành bộ soạn."*

### Soạn dựa trên cái gì

Không soạn tuỳ ý. Soạn theo **tư duy của thầy, rút từ bản ký âm của chính thầy ấy** —
bốn trục, và cả bốn đều đã có số đo trong file này:

| trục | mục |
|---|---|
| cách chọn **vòng hợp âm** | mục 2 · mục 8 |
| cách **hoà hợp hai tay** | mục 3 · mục 4 |
| cách chọn **tuyến giai điệu** | mục 5 · mục 7 · mục 9 |
| các **tiết tấu** | mục 10 · mục 11 |

Thầy nào có sheet thì học từ sheet của thầy ấy. **Không có số đo thì không đặt luật.**

### "Ngẫu hứng" cũng là soạn

Người dùng đính chính một chữ chính họ từng dùng:

> *"Các câu giang tấu lúc trước tôi nói ngẫu hứng là do tôi chưa đưa khái niệm ngẫu hứng
> là phải làm thế nào. Ngẫu hứng trong giang tấu thực ra là cũng phải soạn."*

Nên đừng đọc chữ **"ngẫu hứng"** trong các ghi chép cũ của file này là "được phép bốc
thăm". Nó chỉ có nghĩa là câu không lặp y hệt câu dạo — mà vẫn phải soạn.

Chỗ nào trong file còn viết "ngẫu hứng" theo nghĩa cũ thì đọc lại theo nghĩa này.

### Ba bước, đi đúng thứ tự

1. **Học** tư duy của thầy từ sheet
2. **Mô phỏng** cho ra đúng lối của thầy ấy
3. **Sáng tạo** trên nền tảng đã mô phỏng được

Không nhảy cóc sang bước 3 khi bước 2 chưa đạt.

Đích cho **đoạn dạo**: soạn sáng tạo được **những câu khác nhau trên những bài khác
nhau** — không dán lại một câu có sẵn, cũng không bốc thăm. **Giang tấu làm sau**, sau
khi đoạn dạo đạt.

### Tất định KHÔNG có nghĩa là đã soạn

Hai chuyện khác nhau, rất dễ nhầm.

Trong KeyTrain **không có `Math.random` ở đâu cả** — mọi thứ tất định theo lượt phát,
cùng một lượt thì ra cùng một câu. Nhưng nhiều chỗ vẫn dùng **hàm băm thay cho xúc xắc**:
gieo một số rồi so với ngưỡng để quyết có chồng nốt không, có nhân bản không, lấy cao độ
nào. Đó vẫn là **sinh bằng xúc xắc**, chỉ là con xúc xắc cố định.

Chỗ đã đúng tinh thần soạn: bộ ghép câu dạo chọn **ô nhịp có thật** từ bản ký âm theo bậc
hợp âm và phép nối giọng — hàm băm ở đó chỉ phá thế hoà giữa các ứng viên ngang điểm,
không dùng để bịa nốt.

**Phép thử một dòng:** *nốt này đến từ đâu?* Trả lời được bằng **"ô số mấy của bản ký âm
nào"** thì là soạn. Trả lời **"một số ngẫu nhiên nhỏ hơn ngưỡng"** thì chưa.

### Chữ dùng trong mã đã đổi theo

KeyTrain đã đổi **91 chỗ trong 29 file**: `bộ sinh` → **`bộ soạn`**, `sinh nốt` → **`soạn
nốt`**, `sinh câu` → **`soạn câu`**.

Giữ nguyên `sinh ra` — đó là tiếng Việt thường ("làm nảy ra"), không phải tên của bộ máy.

---

## LUẬT SOẠN NỐT — số của riêng Linh Nhi

Luật đầy đủ, gộp ba thầy, nằm ở **`knowledge/LUAT-SOAN-NOT.md`**. Luật ấy **không thuộc
riêng thầy nào**: người dùng chốt rằng luật chống chói tai thì ai cũng phải theo, nên
riêng chỗ đó **được phép gộp số đo mọi thầy**. Mục này chỉ giữ **số của riêng chị**, để
đối chiếu.

Đo **7 câu dạo · 354 nốt · 347 bước**, lấy nốt cao nhất mỗi mốc gõ ở khuông tay phải.

### Chị ấy KHÔNG bao giờ rải nốt bừa

| | Linh Nhi · cả solo | Linh Nhi · chỉ câu dạo | gộp 3 thầy |
|---|---|---|---|
| số nốt giai điệu | 1045 | 390 | 2169 |
| nốt của chính hợp âm đang vang | **63,6%** | **67,7%** | 67,7% |
| **ngoài gam** | **1,8%** | **1,0%** | 2,8% |

**98,2% nốt nằm trong gam của bài**, riêng câu dạo là **99,0%** — chặt hơn hẳn mức gộp
(97,2%).

> **Số cũ 67,8% / 2,0% đã sửa** sau khi vá bảng chất hợp âm và ghi giọng từng bài vào
> `corpus.json`. Cột "cả solo" là con số mới; cột "chỉ câu dạo" mới là chỗ so được với số
> cũ.
>
> **Và một chỗ chị ấy KHÁC hai thầy kia.** Luật chung từng ghi tỉ lệ nốt hợp âm "giống
> nhau ở cả ba thầy" — sai. Linh Nhi **63,6%**, Cà Pháo 70,8%, Tôn Hùng 73,0%. Chị bám hợp
> âm **lỏng nhất trong ba người**: gần **bốn trên mười** nốt của chị nằm ngoài hợp âm đang
> vang mà vẫn trong gam. Soạn theo chị thì đừng siết về phía nốt hợp âm như hai thầy kia.

Con số này **vững trước cách đo**: đổi phép rút nốt ở mốc có hai nốt sát nhau thì nó chỉ
xê dịch 2,0% ↔ 2,2%. Xem mục "Cụm nghiến" trong `knowledge/LUAT-SOAN-NOT.md`.

### Bước đi

| bước | Linh Nhi | gộp |
|---|---|---|
| lặp lại nốt cũ | 10,7% | 11,5% |
| liền bậc (1–2 nửa cung) | **33,7%** | 34,0% |
| quãng ba (3–4) | 24,5% | 21,0% |
| quãng 4–5 | 12,1% | 16,1% |
| nhảy xa (8+) | 19,0% | 17,4% |

**44% đứng yên hoặc bước liền bậc; 69% không quá quãng ba.** Nhóm 8+ phần lớn là đổi
quãng tám chứ không phải nhảy trong câu.

### Cặp bậc hay đứng cạnh nhau

`1→1` 6,0% · `♭3→♭3` 4,0% · `1→♭3` 3,3% · `5→1` 3,3% · `9→1` 3,3% · `5→♭7` 3,3% ·
`♭7→5` 3,3% · `1→♭7` 3,0% · `♭7→1` 3,0% · `♭3→1` 3,0%

Đọc ra: chị đi quanh **`1 · ♭3 · 5 · ♭7 · 9`**, và cặp `5 ↔ ♭7` đi lại cả hai chiều. Phân
bố rất **phẳng** — không cặp nào chiếm ưu thế, nghĩa là **không có bảng "bậc nào sau bậc
nào" cứng**. Luật thật nằm ở chỗ khác: mọi nốt phải trong gam, hai phần ba là nốt hợp âm,
và bước phần lớn nhỏ.

### Bậc so với GỐC HỢP ÂM — chị chọn nốt nào khi hợp âm nào đang vang

Đây là phép đo khác hẳn mục trên: mục trên đếm **cặp hai nốt liền nhau**, mục này đếm **một
nốt so với hợp âm đang vang**. Đo bằng `tools/sheet/bac_not.py`.

| chất hợp âm | n | các bậc chị dùng |
|---|---|---|
| trưởng | 305 | `3`25% `1`21% `5`19% `9`11% `13`6% `11`6% |
| thứ | 562 | `1`22% `5`20% `♭3`18% `9`11% `♭7`10% `11`9% |
| **át** | 93 | `1`27% **`11`27%** `5`13% `3`10% `♭7`9% `♭13`5% |

> **BẬC `11` 27% TRÊN HỢP ÂM ÁT KHÔNG PHẢI `sus4` — tôi đã đọc sai một lần.** Con số ấy
> thoạt nhìn giống thủ pháp treo bậc 4 rồi giải xuống bậc 3. Kiểm lại: **25/25 nốt ấy là
> CHỦ ÂM của bài.**
>
> Hợp âm át đứng ở bậc V, nên chủ âm của bài **tự động** đọc ra là bậc 11 của nó. Điều số
> đo nói là: *"khi hợp âm át đang vang, chị đánh chủ âm của bài"* — và điều ấy khớp với
> mục 7 trong file này (**neo vào giọng bài**). Nó **không** nói chị thích bậc 11.
>
> Cà Pháo cũng vậy: 7/8 nốt `11` trên hợp âm át của anh là chủ âm bài. Đây **không** phải
> chỗ để tách hai thầy.

Trên hợp âm **trưởng** thì bậc `11` chỉ 6% — chị tránh, đúng luật avoid-note chung của cả
ba thầy (luật 9 trong `LUAT-SOAN-NOT.md`). Trên hợp âm **thứ** thì 9%, và các nốt ấy trải
rộng trên nhiều bậc gam nên **đây mới là lựa chọn thật**, không phải hệ quả chức năng.

**Nốt `♭9` của chị: 22 nốt, và 20 trong số đó nằm sẵn trong gam bài** — 11 nốt là bậc `♭13`
của gam, 8 nốt là bậc `♭3`, hai bậc diatonic của giọng thứ. Rơi trên hợp âm át thì đọc ra
`V7♭9`, đúng chuẩn mực giọng thứ. Nên chị **không mượn mode ngoài gam**; nhưng đừng viết là
"chị không đánh `♭9`" — chị có đánh, 3,0% trên hợp âm trưởng và 4,3% trên hợp âm át.

### Nốt ngoài hợp âm chị xử lý thế nào

n=355 nốt ngoài hợp âm ở các đoạn solo:

| liền bậc | quãng ba | nhảy ≥5 | đổi quãng tám | lặp | nốt kế là nốt hợp âm |
|---|---|---|---|---|---|
| 31,0% | 20,6% | 31,0% | 8,5% | 6,5% | **55,2%** |

Chị giải về nốt hợp âm **55%** — lỏng nhất trong ba thầy (Cà Pháo 58%, Tôn Hùng 76%). Đúng
chiều với con số nốt hợp âm 63,6% của chị: **chị bám hợp âm lỏng nhất ở mọi phép đo**.

Và một chỗ ngược trực giác: **17 nốt ngoài gam của chị hầu như không phải nốt lướt** — chỉ
**11,8%** có bước liền bậc cả hai bên (Tôn Hùng 66,7%). Các bậc ấy là `♭9`×7 `♭13`×4 `3`×3.
**n=17, quá mỏng để thành luật** — ghi lại để phiên sau có thêm sheet thì so.

### Một chỗ luật chung KHÔNG áp được cho chị

Luật chung nói *"nhảy thì ưu tiên đáp vào nốt hợp âm"* — gộp ba thầy ra 66% sau cú nhảy
so với 56% sau bước liền bậc.

Ở riêng Linh Nhi thì **hai con số gần bằng nhau: 67% và 69%**. Nghĩa là với chị, luật ấy
**không phân biệt được gì** — cả đường câu vốn đã nặng nốt hợp âm, không riêng chỗ đáp
sau cú nhảy.

Nên đừng dựng luật "nhảy thì đáp" cho chị. Dựng luật **"cả câu luôn sống trong khung hợp
âm cộng gam"** thì đúng hơn, và nó đã là luật 1 và luật 2.

### Bẫy đo đã sập ở đây

Lần đầu tôi lấy **gam thứ tự nhiên làm gam duy nhất** của giọng thứ, và ra 4,3% ngoài gam
với 38% trong số đó "nhảy cả hai bên" — nghe như các thầy rải bừa.

Sai: **nốt cảm** (bậc 7 thăng) là chuẩn mực của giọng thứ chứ không phải nốt ngoài gam.
Tính cả nốt cảm và bậc 6 thăng thì còn **3,1%** gộp và **2,0%** riêng chị. Xem luật 6
trong file luật chung.

**Bẫy thứ hai, cùng dạng.** Ký hiệu `¹` `²` trong bản xuất MusicXML là **thể đảo**, không
phải chất hợp âm — `C¹/E` chính là `C/E`. Bộ đọc từng để nó rơi về hợp âm ba trưởng mặc
định, may là chất thật đúng bằng cái mặc định ấy nên **số đo không đổi**. Chỉ có 14 chỗ,
toàn trong sheet **Hồng Kông 1 của Cà Pháo**, không sheet Linh Nhi nào dùng lối ghi này —
nên chỗ này không đụng tới con số của chị. Chi tiết trong file luật chung.

**Bẫy thứ ba, vẫn cùng dạng — và nó chạm vào sheet của chị.** `<degree>` (phần cộng thêm:
`add9`, số 7 của `7sus4`, `b5`) bị bộ đọc bỏ qua, và `<kind>` không có thuộc tính `text`
thì chất bị mất luôn. Trong sheet Linh Nhi có **11 chỗ**: Papa 6, Đừng Xa 5, Đường Xưa Lối
Cũ 3, Lá Thư Trần Thế 3, Một Cõi 2. Số đo gần như không đổi (2 nốt trên 2081 toàn kho),
nhưng **tên hợp âm thì sai** — Đừng Xa ô 57 đọc ra `Bb → Bm → Bb` trong khi thật là
`Bbmaj7 → Bm7b5 → Bbmaj7`, và Một Cõi ô 60 đọc ra `D` trong khi thật là `Dsus4` treo trên
`Cm6`.

Cả ba bẫy cùng một hình dạng: **một nhãn máy không hiểu bị lặng lẽ quy về mặc định**, rồi
tôi tưởng mình đã đọc xong. Gặp nhãn lạ thì phải mở ra xem, đừng để nó rơi.

---

## Từ dùng — đọc trước, kẻo hiểu lệch

Người dùng nói bằng những chữ này. Chúng được dùng khắp file nhưng không định nghĩa ở
đâu, nên ghi lại đây.

| chữ | nghĩa | tên đoạn trong corpus |
|---|---|---|
| **câu solo** · **đoạn không lời** | chỗ ca sĩ không hát, piano nói một mình | `intro` · `interlude` · `outro` |
| **dạo** | câu mở đầu bài | `intro` |
| **giang tấu** | đoạn không lời giữa bài | `interlude` |
| **kết** | đoạn không lời cuối bài | `outro` |
| **phần hát** · **đoạn có lời** | ca sĩ hát, piano đệm | `verse` · `chorus` và các lượt lặp |
| **phiên khúc** | | `verse`, `verse_2`, `verse_3`… |
| **điệp khúc** | | `chorus`, `chorus_2`, `chorus_climax` |

Bảy sheet có **20 đoạn không lời** và các đoạn có lời còn lại.

### Ba chỗ dễ lẫn

**Câu fill KHÔNG phải câu solo.** Fill là cụm nốt ngắn tay phải chen vào **trong phần
hát**, ở khe giữa các câu ca sĩ — 354 cụm đo được, 61% chỉ ba hoặc bốn nốt (mục 12). Câu
solo là cả một đoạn không lời. Người dùng nói "câu solo" là nói đoạn; nói "fill" là nói
cụm chen.

**"Ô cửa" KHÔNG phải "đoạn kết".** Ô cửa là **ô cuối của đoạn dạo**, thưa hẳn ra để ca sĩ
vào hát, và đứng trên bậc V. Đoạn kết là cả một đoạn không lời ở cuối bài.

**"Đoạn không lời" KHÔNG đồng nghĩa "đoạn solo tự do".** Câu dạo là thứ được **soạn** —
người dùng nói thẳng điều này. Chỗ ngẫu hứng thật sự là giang tấu.

### Vì sao hai nhóm đoạn phải tách bạch

Gần như mọi số đo trong file này đều **tách theo hai nhóm ấy**, vì hai tay đổi vai giữa
chúng:

| | tay trái | tay phải |
|---|---|---|
| phần hát, giọng thứ | **6,5** mốc/ô | 5,0 |
| phần solo, giọng thứ | 4,6 | **6,5** |

Trộn hai nhóm lại là mất đúng cái khác biệt lớn nhất đo được về chị ấy.

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
*(Sửa 24/9/2026: Một Cõi ghi **6/8** — 3 nốt đen mỗi ô, không phải nhịp 3. Lá Thư ghi 4/4 nhưng là 12/8. Xem 13b, 13c.)*

**Trên đĩa có 9 bản, cỡ mẫu dùng 7.** Hai bản còn lại là **Tuyết Rơi** (người dùng xếp
riêng, không đưa vào đây để học) và **Papa** (người dùng chốt: để sau, học chung với Tuyết
Rơi). Cả hai nằm ở khoá `_de_sau` trong `tools/sheet/corpus.json` — lần quét sau đừng báo
chúng là "bỏ quên".

> **Bảng giọng ở trên là nguồn duy nhất ghi trưởng/thứ của 7 bài này.** File MusicXML
> không ghi `<mode>`, `corpus.json` cũng không. Một phép đo chạy từ đầu mà không đọc bảng
> này sẽ mặc định mọi bài là trưởng và cho ra con số ngoài gam sai gấp đôi. Đã kiểm: phép
> suy giọng từ hợp âm kết khớp **7/7** với bảng này.

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
| Một Cõi | giang | I trưởng (Picardy) — **không đứng**, tay phải có Bb → vẫn Gm; xem 13c |

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

> **ĐỌC BẢNG NÀY CÓ ĐIỀU KIỆN.** Nó ghi bậc **so với chủ âm bài**, mà gam trưởng vốn có
> sẵn `3` và `13` còn gam thứ vốn có sẵn `♭3` và `♭7`. Nên bốn con số lớn nhất trong bảng
> chỉ đang nói lại định nghĩa của hai cái gam — **chúng không chứng minh một lựa chọn
> nào**. Phần không bị gam ép nằm ở mục 6b ngay dưới.
>
> Ba nhận xét bên dưới bảng thì **vẫn đứng**: bậc `11` có mặt trong CẢ HAI gam, nên chênh
> lệch 4% so với 10% là lựa chọn thật; tỉ lệ lặp nốt cũng vậy.

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

## 6b. Giọng trưởng chị BÁM HỢP ÂM, giọng thứ chị RỜI ra

Đây là phép so **giữ nguyên chất hợp âm rồi mới so**, nên gam không ép được — khác với
bảng ở mục 6.

| | trưởng | thứ |
|---|---|---|
| **nốt của hợp âm đang vang** | **70,2%** | **59,9%** |
| ngoài gam | 2,7% | 1,0% |
| tâm cao độ | 76,0 | 74,6 |
| n (nốt giai điệu) | 406 | 601 |

Chênh **10 điểm** — lớn hơn cả chênh lệch giữa chị và Cà Pháo (63,6% so với 70,8%).

**Đứng trên cùng một hợp âm:**

| chất | bài trưởng | bài thứ |
|---|---|---|
| **maj** | `1`28 `3`26 `5`21 — **ba bậc trụ 75%** (n=155) | `3`23 `5`17 `9`15 `1`13 `13`7 — **trụ 53%** (n=150) |
| **min** | `1`26 `♭3`24 `5`17 — **trụ 67%** (n=207) | `5`21 `1`19 `♭3`14 `9`13 `♭7`11 — **trụ 54%** (n=355) |

Ở bài trưởng chị gần như chỉ đánh ba bậc trụ; ở bài thứ chị rải sang `9`, `♭7`, `13`.

### Bước đi ngược trực giác

| | liền bậc | quãng ba | nhảy 8+ | quãng 4–5 | lặp |
|---|---|---|---|---|---|
| **trưởng** | **29%** | **26%** | 26% | 13% | 6% |
| **thứ** | 20% | 18% | **34%** | 18% | **10%** |

Câu giọng **trưởng đi mượt hơn** — liền bậc cộng quãng ba là 55% so với 38%. Câu giọng
**thứ nhảy nhiều hơn và đứng lại nhiều hơn**.

### Hai giọng đi NGƯỢC CHIỀU về phía đoạn kết

Tỉ lệ nốt hợp âm theo đoạn:

| | dạo | giang | kết |
|---|---|---|---|
| **trưởng** | 68% | 68% | **75%** |
| **thứ** | 69% | 59% | **50%** |

Ở giọng trưởng chị **siết dần về hợp âm** khi tới đoạn kết. Ở giọng thứ thì **ngược lại**,
càng về cuối càng rời — tới đoạn kết chỉ còn một nửa số nốt nằm trên hợp âm. n từ 113 tới
226 mỗi ô.

> **CÁCH ĐỌC — người dùng đã xác nhận.** Người dùng đặt vấn đề rằng ở bài giọng trưởng các
> thầy *"chọn nốt có xu hướng tươi sáng"*. Đo ra thì **không phải chọn nốt nào trong gam**:
> giữ nguyên chất hợp âm thì nốt chị chọn gần như không đổi giữa hai giọng.
>
> Thứ đổi là **mức bám hợp âm, độ lớn bước, và hướng đi về phía kết**. Tôi đọc ra rằng cái
> tai nghe thành "tươi sáng" chính là **sự chắc chắn** — nốt nằm trên hợp âm, bước đi nhỏ,
> càng về kết càng chắc; còn câu thứ mơ hồ hơn vì nó rời hợp âm và nhảy nhiều. **Người dùng
> đã xác nhận cách đọc này đúng.**
>
> Nên khi soạn câu dạo giọng trưởng cho chị: **siết về nốt hợp âm (~70%), giữ bước nhỏ, và
> siết thêm ở đoạn kết** — đừng rắc nốt màu như ở bài giọng thứ.
>
> **Man mác buồn — người dùng chốt 7/9/2026.** Chiều ngược của chắc chắn: **không chắc + chỗ
> kéo**. Ở chị (n=4 bài): rời hợp âm 59,9%, nhảy+8va 52%, kết 50%; vốn i 26% · V 24% · iv 14% ·
> át 6% (trưởng 2%). Không phải chọn `♭3`. Đủ số ở `LUAT-SOAN-NOT.md`.
>
> Soạn dạo thứ cho chị: **đừng siết như trưởng** — rời, nhảy, lặp được; vòng i · iv · V · ♭VI · ♭VII.

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

### Bảy tuyến, chép nguyên từng nốt

Mỗi dòng là một ô: **số ô · hợp âm · các mốc gõ** dạng `phách:nốt`. Lấy nốt cao nhất mỗi
mốc ở khuông tay phải — đó là giai điệu; phần dưới cùng mốc là nắm hợp âm tay phải, không
phải câu (xem mục "Giai điệu là nốt trên cùng mỗi mốc gõ").

Đây là **vật liệu để ghép lên bài mới**: chọn ô theo bậc hợp âm, dịch giọng, nối giọng.

**Biển Tình** — Rê trưởng · bolero · 9 ô

```
  ô1  ·         2.5:D5 3:F#5 3.5:A5
  ô2  Bm        0:B5 1:A5 1.5:B5 2.5:D5 3:F#5 3.5:B5
  ô3  F#m       0:A5 1:F#5 1.5:A5 2.5:B4 3:D5 3.5:F#5
  ô4  Em        0:E5 1.5:D5 2:E5 2.5:B5 3:A5 3.25:F#5 3.5:E5
  ô5  D         0:F#5 2.5:A4 3:B4 3.5:D5
  ô6  Bm        0:F#5 1:A5 1.5:F#5 2.5:A4 3:B4 3.5:F#5
  ô7  Em        0:E5 1:D5 1.5:E5 2.5:F#5 3:E5 3.25:D5 3.5:B4
  ô8  F#m E     0:A4 0.5:F#4 1:A4 1.5:B4 2:E5 2.5:F#5 3:E5 3.25:D5 3.5:B4
  ô9  D         0:D5 3:D5 3.5:E5
```

**Đừng Xa Em Đêm Nay** — Rê thứ · bolero · 9 ô

```
  ô1  Dm        0:F5 0.75:F5 1:F4 1.5:F5 2:F5 2.5:D4 2.75:G5 3.5:A5
  ô2  C         0:E5 0.75:C5 1:E4 1.5:D5 1.75:Eb5 2:E5 3.75:Bb4
  ô3  Bb        0:D5 0.75:D5 1:D4 1.5:D5 2:D5 2.75:E5 3.5:F5
  ô4  F         0:C5 0.75:Bb4 1.5:A4 1.75:Bb4 2:C5 3.5:G4 3.75:A4
  ô5  Gm        0:Bb4 0.75:Bb4 1.5:Bb4 2:Bb4 2.75:A4 3.5:Bb4 3.75:A4
  ô6  Dm        0:F5 0.75:E5 1.5:D5 2:A4 3.5:E5 3.75:F5
  ô7  E A       0:E5 0.75:E5 1:D4 1.5:D5 2:C#5 2.75:B4 3.5:C#5 3.75:F4
  ô8  Dm        0:D5 1:D4 2.5:D4
  ô9  A         0:C#4
```

**Lá Thư Trần Thế** — Rê thứ · slow rock · 6 ô

```
  ô1  Dm        0.5:A5 0.75:F5 1:D6 1.5:A4 2:E5 2.5:A5 3:A5 3.5:D6
  ô2  C Dm      0:E6 0.5:G4 0.75:G4 1:D5 1.5:E5 2:C6 2.5:E6 3:D6 3.5:A4
  ô3  F         0:E5 0.5:F5 1:A5 1.5:G5 2:A5 3:F4 3.5:G4
  ô4  Gm        0:F5 0.5:A5 1:G5 2:A4 2.5:Bb4 3:D5 3.5:G5
  ô5  Bb E      0:F5 1:F4 1.5:Bb4 2:D5 2.5:F5 3:E5
  ô6  A7        0:E5 0.5:E5 1:F5 1.5:G5 2:A5 2.5:A5 2.75:A5 3:A5 3.5:A5
```

**Một Cõi Đi Về** — Sol thứ · slow rock · 10 ô

```
  ô1  ·         0:Bb5 0.375:Bb4 0.625:Bb5 1:D5 1.375:D4 1.625:G4 2:Bb4 2.375:Bb4 2.625:Bb4
  ô2  Gm        0:C5 0.375:Bb4 1.5:G5 2:G5 2.5:G5
  ô3  ·         0:Bb5 1:Eb4 1.5:A4 1.75:Bb4 2:A4 2.25:G4 2.5:F#4 2.75:Eb4
  ô4  Cm        0:Eb4 0.5:D4 0.625:D4 0.75:F#5 1:A5 1.25:C5 1.5:D5 1.75:F#5 2:A5 2.25:F#5 2.5:C6 2.625:A5
  ô5  ·         0:Bb5 0.5:F#5 1:Bb4 1.5:A5 2:D5 2.5:Bb4
  ô6  ·         0:G5 0.5:Bb4 1:G4 1.5:F5 2:Bb4 2.5:G5
  ô7  ·         0:Eb5 0.5:G4 1:Eb4 1.5:D5 2:G4 2.5:Eb4
  ô8  D7        0:C5 0.5:G5 1.5:C#5 2:G4 2.5:Eb4
  ô9  ·         0:D5 1:D4 1.375:F#4 2:A4 2.5:C5
  ô10 ·         0:D5 0.125:F#5 0.25:D7
```

**Đường Xưa Lối Cũ** — Đô trưởng · bolero · 8 ô

```
  ô1  ·         0:G5 1.5:C6 3.25:B5
  ô2  F         0:B5 0.75:F4 1:A4 1.25:B5 1.5:C6 2.5:A5
  ô3  Dm        0.75:F5 1:F4 1.5:E5 2:D5 3:D5 3.25:E5 3.5:F5 3.75:E5
  ô4  C         0:A5 1:E4 1.5:G5 2:G5
  ô5  Am        0.75:E5 1.5:D5 2:C5 2.75:D5 3.25:E5 3.5:A4 3.75:D5
  ô6  Dm        0:G5 1:F4 1.5:F5 2:F5
  ô7  G         0:F#4 0.75:D5 1.5:C5 2:B4 2.75:C5 3.25:C#5 3.5:D5
  ô8  Am        0:C5
```

**Mùa Xuân Đầu Tiên** — Sol trưởng · bolero · 8 ô

```
  ô1  G         0:B5 0.75:G4 1:B4 1.5:B5 2:B4 2.5:G4 2.75:D5 3.25:Ab5 3.5:A5
  ô2  Em        0:G5 0.75:E4 1:G4 1.5:F#5 2:G4 2.5:E4 2.75:B4 3.25:Eb5 3.5:E5
  ô3  Bm        0:D5 1:D4 1.5:F#4 2:B4 2.5:D5 3:E5 3.5:G5 3.75:E5
  ô4  D Am      0:A5 0.75:G5 1.5:E5 2:A5 2.75:C6 3.25:Eb6 3.5:E6
  ô5  G         0:D6 1.5:B5 2:B5 2.75:D6 3.5:G6
  ô6  Bm Bm     0:F#6 0.75:E6 1.5:D6 2:C6 3:A5
  ô7  G         0:G5 1:G5
  ô8  D         0:D4 3.25:G4
```

**Rừng Lá Thấp** — La thứ · bolero · 9 ô

```
  ô1  E         0:A4 0.5:D5 1:E5 1.5:A5 2:F#5 2.75:F#5 3:F#4 3.5:E5
  ô2  Am        0:D5 0.5:C5 1:D5 1.5:E5 2:A4
  ô3  G Dm      0.5:F#4 1:A4 1.5:C5 1.75:A4 2:D5 2.75:D5 3:F4 3.5:C5
  ô4  C         0:D5 0.5:E5 1:G5 1.25:E5 1.5:D5 2:E5 3:E4 3.5:G4
  ô5  Am        0:C5 0.5:D5 1:E5 1.5:G5 1.75:E5 2:A5 2.5:A5 2.75:A5 3:G5 3.5:A5
  ô6  Em        1:C6 1.5:A5 2:G5 3:E5 3.5:G5
  ô7  Em        0:G5 0.5:E5 1:G5 1.5:A5 1.75:G5 2:B5 3.5:B5 3.75:D6
  ô8  Am        0:B5 0.5:A5 1:G5 1.5:E5 1.75:G5 2:A5 3.75:E4
  ô9  ·         0:E4 0.5:E4 0.75:G4 1.25:E4 1.5:G4 1.75:B4 2:A4 2.5:A4 2.75:A4 3:G4 3.5:A4
```

Bảng này cũng nằm trong KeyTrain dưới dạng dữ liệu máy đọc được, sinh bằng script từ
chính các sheet trong `video/Linh_Nhi/`. Bản ở đây chép lại để **kho tri thức tự đủ** —
mở PianoBrain là thấy nốt, không phải sang repo ứng dụng mới thấy.

## 10. Hai tay ở điệu bolero

Bốn hằng số dưới đây **đo trên năm bài bolero** (Biển Tình · Đường Xưa · Mùa Xuân · Đừng
Xa · Rừng Lá) — thuần bolero, không lẫn slow rock. Người dùng đã chốt qua phiếu T2.

| hằng số | giá trị | giá trị cũ | nghĩa |
|---|---|---|---|
| tay phải bám mốc tay trái | **0,54** | 0,64 | bao nhiêu phần mốc tay trái được tay phải chạm |
| chuỗi mới mỗi ô | **0,45** | 1 | bao nhiêu phần ô mở một chuỗi nốt mới |
| nhân bản | **0,36** | 0,47 | |
| chồng nốt ở ô thưa | **0,62** | *giữ nguyên* | đã bác đề nghị hạ — xem mục 18 |

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

## 9b. Đoạn dạo giọng TRƯỞNG — mốc để chấm bộ soạn

Đo riêng **ba bài giọng trưởng** (Biển Tình · Đường Xưa Lối Cũ · Mùa Xuân Đầu Tiên), chỉ
đoạn dạo, chỉ tay phải: **141 nốt**.

| | bản ký âm |
|---|---|
| nốt của hợp âm đang vang | **68,1%** |
| nốt **lạc** — ngoài gam VÀ ngoài hợp âm | **1,4%** |
| **cao độ trung bình** | **75,3** |
| quãng ba tăng với gốc (`♭5`) | **2,2%** |
| bước: liền bậc · quãng ba · nhảy 8+ · quãng 4–5 · lặp | **32 · 25 · 25 · 13 · 6** |

Chữ **lạc** là phép đếm riêng, đừng lẫn với "ngoài gam": nốt ngoài gam mà **thuộc hợp âm
đang vang** thì đúng, không tính là lạc — vòng có `Bb` hay `A7` chẳng hạn.

### TÂM CAO ĐỘ tách theo giọng — 75,3 và 73,2

Số cũ dùng chung **73,6** cho cả hai giọng, lấy trung bình bảy đoạn dạo. Tách ra thì hai
nhóm không giống nhau, và nhóm trưởng còn chụm hơn hẳn:

| | các bài | trung bình |
|---|---|---|
| **trưởng** | Biển Tình 75,2 · Đường Xưa 74,5 · Mùa Xuân 76,0 | **75,3** (n=141) |
| **thứ** | Đừng Xa 70,8 · Lá Thư 76,1 · Một Cõi 72,7 · Rừng Lá 73,6 | **73,2** (n=239) |

Dùng số gộp thì bài giọng trưởng ra thấp hơn chị khoảng **1,8 nửa cung**.

So với hai thầy kia, cùng phép đo (chỉ đoạn dạo): **Cà Pháo 70,8 / 68,0** — thấp hơn chị
4,5 và 5,2 nửa cung; **Tôn Hùng 75,8** ở giọng thứ, không có bài giọng trưởng.

### Phân vị cao độ tay phải, ba đoạn dạo giọng trưởng — để chọn TRẦN tầm âm

Đo 6/9/2026, tuyến giai điệu tay phải, ba bài giọng trưởng, chỉ đoạn dạo. **n = 141 nốt.**

| bài | n | tâm | thấp nhất | cao nhất | trên 79 | trên 81 | trên 84 |
|---|---|---|---|---|---|---|---|
| Biển Tình | 51 | 75,2 | 64 | **83** | 17,6% | 7,8% | 0% |
| Đường Xưa Lối Cũ | 42 | 74,5 | 62 | **84** | 16,7% | 11,9% | 0% |
| Mùa Xuân Đầu Tiên | 48 | 76,0 | 57 | **91** | 33,3% | 27,1% | 16,7% |
| **gộp** | **141** | **75,3** | **57** | **91** | **22,7%** | 15,6% | 5,7% |

Phân vị gộp: **p50 = 76 · p75 = 79 · p90 = 83 · p95 = 86 · p99 = 88**.

**Con số phải nhớ: 22,7% nốt của chị nằm TRÊN 79**, và **p75 đúng bằng 79**. Trần
`SOLO_RANGE` của KeyTrain cũng là 79 — nghĩa là trần ấy cắt đi gần **một phần tư** vốn nốt
của chị, và cắt đúng phần trên. Đó là lời giải thích cho việc app ra tâm **72,1** trong khi
chị **75,3**.

Đếm từng nốt riêng lẻ ở vùng cao, để biết chỗ nào là ngoại lệ chỗ nào là vốn thật:

    80: 1 · 81: 9 · 83: 10 · 84: 4 · 86: 3 · 87: 1 · 88: 2 · 90: 1 · 91: 1

Nên **81 và 83 là vốn thật** (19 nốt), còn **90 và 91 mỗi cao độ đúng một nốt**, cả hai đều
ở Mùa Xuân — đó là ngoại lệ, đừng lấy làm trần.

**Trần 84 phủ 94,3% vốn nốt của chị** và phủ trọn hai bài Biển Tình (max 83) với Đường Xưa
(max 84). Trần 79 chỉ phủ 77,3%.

> **Trần là điều kiện CẦN, không phải điều kiện ĐỦ.** Nâng trần không tự đưa tâm lên 75,3 —
> tâm còn do bộ ghép chọn ô nào và dời quãng tám thế nào. Nâng xong **phải đo lại tâm**, và
> nếu vẫn thấp thì chỗ hỏng nằm ở phép dời quãng tám chứ không ở trần.

---

## 10b. Hai tay khớp nhau thế nào — số đo cứu từ bộ soạn đã bỏ

KeyTrain từng có một bộ soạn riêng, `raiLinhNhi.ts`, dựng tay phải **bám theo mốc gõ tay
trái**. Nay bộ ghép ô thật đã phủ kín cả ba đoạn nên bộ ấy không còn chạy và **đã xoá**.
Nhưng các hằng số của nó là **số đo thật trên bản ký âm**, nên chép sang đây trước khi xoá —
mã mất thì số đo vẫn còn.

**Đây là số đo, không phải luật đang chạy.** Không đường nào trong app hiện dùng chúng.

### Hai tay gõ CÙNG NHAU bao nhiêu

**54%** cú gõ tay trái có tay phải gõ cùng. Đo năm bài:

| bài | tỉ lệ |
|---|---|
| Đường Xưa | 0,40–0,45 |
| Mùa Xuân | 0,48–0,52 |
| Đừng Xa | 0,51–0,61 |
| Rừng Lá | 0,58–0,59 |
| Biển Tình | **0,63–0,64** — cao nhất, đừng lấy làm đại diện |

Số cũ từng là 0,64 (bằng đúng Biển Tình) rồi hạ xuống 0,54 theo số đo năm bài.

> **Đây là chỗ Linh Nhi NGƯỢC Cà Pháo.** Ở Cà Pháo chỉ 32–73% nốt tay phải trùng cú gõ tay
> trái, tức tay phải **cài vào khe**. Linh Nhi thì tay phải **tựa lên** tay trái. Trộn hai
> lối là hỏng cả hai.

### Phách 1 luôn có nốt tay phải — luật cứng, không phải xác suất

**16/16 ô** ở phiên khúc và **10/10 ô** ở giang tấu đều có nốt tay phải rơi đúng phách 1.
Không sót ô nào.

### Móc đơn XEN ở nửa đầu ô thì thưa — nhưng các PHÁCH thì không

Đếm mười ô giang tấu:

| | phách 1 | 1& | phách 2 | 2& | phách 3 | 3& | phách 4 | 4& |
|---|---|---|---|---|---|---|---|---|
| số lần | 10 | **5** | 10 | **5** | 15 | 15 | 13 | 14 |

Đọc kỹ mới thấy: **không phải "nửa đầu ô thưa"**. Bốn phách đều đầy 100%; chỉ **móc đơn xen**
ở nửa đầu mới rơi xuống 50%. Nửa sau thì cả phách lẫn móc xen đều đầy và còn chồng thêm nốt.

*(Bẫy đã sập: bóp cả nửa đầu ô kể cả phách 2 thì mật độ tụt từ 8,9 xuống 6,3 nốt mỗi ô.)*

### Trong những mốc gõ chung, tay phải lấy lại lớp cao độ tay trái bao nhiêu

**36%** — gộp hai bài, 75/207 mốc chung.

| | dạo | giang | kết | cả bài |
|---|---|---|---|---|
| Biển Tình | 40% | 47% | 26% | 45/111 = **0,41** |
| Đừng Xa | 26% | 22% | 54% | 30/96 = **0,31** |

**Đừng rút luật theo đoạn từ bảng này.** Đoạn kết chỉ có 19 và 24 mốc chung — ở cỡ ấy đổi
một nốt là đổi bốn năm điểm, và hai bài còn ngược chiều nhau. Cột "cả bài" mới đọc được.
Hai bài cũng chưa đủ biết đây là hằng số phong cách hay thay đổi theo bài.

Số cũ 0,47 lấy từ **đúng một đoạn** (giang tấu Biển Tình, 49 mốc) — đó là ngoại lệ cao nhất.

### Ba số nữa về hai tay

- **36%** cú gõ tay phải có **từ hai nốt trở lên**.
- **20%** số mốc là tay phải gõ **một mình**, chen giữa hai cú gõ tay trái.
- **Khe giữa hai tay: trung vị 24 nửa cung, hẹp nhất 9.**
- Chỉ **10%** nốt tay phải nằm trong 12 nửa cung của trần tay trái — tức xuống sát tay trái
  để **đệm chung** là *màu điểm xuyết*, không phải kết cấu thường trực.

### Tay phải GIỮ nốt dài, tay trái đi tiếp

Người dùng đề nghị "đảo vai" — đo ra **nửa đúng**:

| | có không |
|---|---|
| tay phải giữ nốt dài, tay trái đi tiếp | **có** — 5/10 ô giang tấu, 23/72 cả bài |
| tay trái **chạy** trong lúc ấy | gần như không — 3 ô, và đó là cặp móc kép sẵn có của mẫu |

Đo kỹ chỗ giữ: **trường độ đúng 2,0 phách** (nửa ô, không hơn) · vào ở **phách 1** (5 lần)
hoặc **phách 3** (4 lần) · tay trái vẫn gõ **3,6 nốt** trong lúc giữ.

### Bước đi tay phải, và các chuỗi liền bậc

Đo đường trên cùng, **bỏ các cặp cùng chỗ gõ**:

> liền bậc **39%** · quãng ba 19% · quãng 4–5 9% · nhảy xa 33%

*(Số đầu tiên từng báo là 57% nhảy / 16% liền bậc — sai, vì nốt **chồng** cùng một chỗ gõ bị
đếm thành một bước.)*

Mười ô giang tấu có **5 chuỗi liền bậc từ 3 nốt trở lên**, dài `[3, 3, 4, 7, 3]` — cứ hai ô
một câu chạy, bốn trên năm chuỗi là ngắn, chuỗi bảy nốt là ngoại lệ.

Tỉ lệ **bước liền bậc** trên năm bài: **dạo 31% · giang 36%**.

### Cửa ra cuối giang tấu là CHỒNG HỢP ÂM, không phải chạy ngón

Hai cử chỉ ấy nằm ở **hai ô khác nhau**:

- **ô 61** — ô cuối giang tấu, hợp âm `A` (bậc V): **16 nốt tay phải, dày nhất bài**, chồng
  4 · 4 · 5 nốt ở phách 1&, 2, 3, trải 17 nửa cung, tay trái vẫn gõ 11 nốt.
- **ô 71** — áp chót đoạn kết, hợp âm `D7`: ngân 1,5 phách → chồng 3 nốt → **6 móc kép chạy
  lên** → hạ cánh.

Câu chạy gốc ấy: 6 nốt móc kép, vào đúng **nửa sau ô** (offset 1,5), kết ở 2,75, bước
`[2, 2, 3, 5, 2]` — 60% liền bậc, đi lên, trèo 14 nửa cung. Và **tay trái buông hẳn: 0 nốt**
trong suốt lúc chạy.

Cả hai ô đều đứng trên **hợp âm hút** (bậc V và V7) — chỗ ấy là của vòng hợp âm, bộ đệm chỉ
dày lên đúng chỗ vòng đã hút sẵn.

---

## 11b. Dãy nốt ngắn của tay phải — **15 chuỗi trên 167 ô**

Người dùng bảo *"trong các sheet của Linh Nhi có các đoạn ngắn tay phải chơi một dãy nốt"*.
Đo được, và con số chốt là **15 chuỗi trên 167 ô nhịp** của 7 bài × 3 đoạn không lời —
**0,09 chuỗi mỗi ô**. Đây là **thủ pháp**, không phải mặt bằng của giai điệu.

Bộ đo: `tools/sheet/day_not.py linh-nhi --v2`. **Tách riêng khỏi `chay_not.py`** vì bộ ấy
viết cho Cà Pháo với ngưỡng `NHANH = 0,26`; Linh Nhi chơi bolero 60–70 BPM, ở đó móc **đơn**
(0,5) đã là mặt chạy. Ngưỡng để trong hằng `NGUONG`, mỗi thầy một dòng.

### Vì sao phải hai vòng lọc

Vòng một (định nghĩa D) ra **61 chuỗi = 0,37/ô** — gần bằng mức "móc đơn ≥ 4 nốt" (64) đã bị
bác vì *nó mô tả cả tuyến giai điệu chứ không phải một cử chỉ*. Độ dài hiệu dụng trung vị
chỉ **5 nốt**: cắt ở vạch ô và ở chỗ nghỉ chỉ **chia giai điệu thành từng ô**.

**Sàn độ dài KHÔNG phải cách chữa** — ≥6 nốt ra 23, ≥7 ra 15, nhưng đó chỉ là *lấy những ô
giai điệu dài nhất*, vẫn cùng một tuyến. Ba luật vòng hai mới tách được cử chỉ:

| luật | ngưỡng |
|---|---|
| đều trường độ | `max(dur) / min(dur) ≤ 2` |
| có hướng | `|tổng bước| / tổng |bước| ≥ 0,45` (bỏ lặp và ±12) |
| ít nhảy giai điệu | bước 5–8 nửa cung **< 30%** |

Luật thứ ba đắt nhất: ở vòng một, **24% số bước** nằm trong khoảng 5–8 nửa cung — một phần
tư số bước bên trong thứ đang gọi là "dãy" là nhảy quãng bốn tới quãng sáu.

### Mười lăm chuỗi

| bài | đoạn | ô | loại | nốt |
|---|---|---|---|---|
| Biển Tình | dạo | 7 | liền bậc | `F#5 E5 D5 B4` |
| Biển Tình | giang | 55 | liền bậc | `D6 E6 F#6 A6` |
| Biển Tình | giang | 58 | liền bậc | `F#5 E5 D5 B4` |
| **Biển Tình** | **kết** | **71** | **liền bậc** | `E5 F#5 A5 D6 E6 F#6 A6` |
| **Đừng Xa** | **giang** | **56** | **liền bậc** | `E6 D6 A5 F5 E5 D5 F#4 F4 E4 D4` |
| Đừng Xa | kết | 80 | liền bậc | `D5 E5 F5 A5` |
| Lá Thư | giang | 58 | liền bậc | `F4 G4 A4 C5` |
| Một Cõi | dạo | 9 | rải | `D4 F#4 A4 C5` |
| Một Cõi | giang | 57 | rải | `Eb4 D4 F#4 A4 C5 A4 C5` |
| Một Cõi | kết | 120 | liền bậc | `A4 Bb4 D5 G5 A5` |
| Mùa Xuân | dạo | 3 | rải | `F#4 B4 D5 E5 E5 G5` |
| Mùa Xuân | giang | 66 | rải | `F#4 B4 D5 E5 E5 G5` |
| Mùa Xuân | kết | 105 | rải | `G4 E4 G4 G4 C5 E5 G5` |
| Rừng Lá | dạo | 4 | rải | `A4 C5 E5 E5 D5` |
| Rừng Lá | dạo | 8 | trộn | `B5 A5 G5 E5 C5` |

Chia theo đoạn **dạo 5 · giang 6 · kết 4**; theo loại **liền bậc 8 · rải 6 · trộn 1**.
**Đường Xưa Lối Cũ không có chuỗi nào.**

### HAI LOẠI, đừng nhét một túi

Trên vòng một (n=61) thì **rải hợp âm 36 so với liền bậc 17** — tức thứ tay phải chị hay
chơi **không phải chạy ngón theo gam mà là rải hợp âm**, gấp hơn hai lần. Tính theo bước:
rải (3–4 nửa cung) **42%** so với liền bậc **23%**.

Sau vòng hai thì hai túi gần bằng nhau (8 và 6) — vì luật "có hướng" loại bớt các hình rải
đi về. **Vẫn giữ cả hai túi**, và nếu chỉ làm được một việc thì làm **rải** trước.

### Việc cho KeyTrain: KHÔNG dựng bộ sinh "dãy" riêng

15/167 ô là thủ pháp, nên đường đúng là **chép khi ô được chọn** — bộ ghép ô thật vốn đã
làm thế. Kiểm 5 chuỗi ở đoạn dạo xem chúng có nằm sẵn trong bảng `tuyenSolo.ts` không:

| chuỗi | ô ấy trong bảng KeyTrain | có mang dãy không |
|---|---|---|
| Biển Tình ô7 | `E5 D5 E5 F#5 E5 D5 B4` | **có** — dãy là phần đuôi ô |
| Một Cõi ô9 | `D5 D4 F#4 A4 C5` | **có** — dãy là phần đuôi ô |
| Mùa Xuân ô3 | `F#4 D5 F#4 B4 D5 E5 E5 G5` | **có** |
| Rừng Lá ô8 | `B5 A5 G5 E5 C5 G5 A5 E4` | **có** — dãy là phần đầu ô |
| Rừng Lá ô4 | `C5 D5 E5 G5 D5 E5 E4 G4` | **không** |

**4/5 nằm sẵn trong vốn ô.** Nên bộ ghép tự mang dãy theo khi ô ấy được chọn, không cần
thêm gì.

> **CHỖ LỆCH PHẢI GHI RA: hai phép rút tuyến khác nhau đang cùng tồn tại.**
>
> Bảng `tuyenSolo.ts` lấy **nốt cao nhất mỗi mốc gõ**; bộ đo dãy đi theo **một bè** (mỗi mốc
> chọn nốt gần nốt trước nhất, và bỏ nốt đáp trầm dưới trung vị − 12). Hai phép cho hai
> tuyến khác nhau ở những ô có nhiều bè — Rừng Lá ô4 là ca ấy: đo dãy ra `A4 C5 E5 E5 D5`,
> bảng ghi `C5 D5 E5 G5 D5 E5 E4 G4`.
>
> **NGƯỜI DÙNG ĐÃ CHỐT: GIỮ NGUYÊN HAI PHÉP.** Không hợp nhất. Mỗi phép đúng cho việc của
> nó — bảng cần nốt trên cùng để phát ra tiếng đúng mật độ, phép đo dãy cần một bè để không
> đọc ra bước nhảy 29 nửa cung.
>
> Ca Rừng Lá ô4 nói rõ chuyện gì đang xảy ra: chuỗi đo được mở bằng `A4`, mà **`A4` không có
> mặt trong tuyến của bảng**. Cái "dãy" ấy là một **bè trong**, không phải tuyến trên cùng.
> Bảng không sai — nó chép đúng thứ vang lên; bộ đo cũng không sai — nó tìm thấy một hình ở
> bè dưới.
>
> **Hai đường hợp nhất đều đã cân nhắc rồi bỏ.** Hợp về phép một bè là **đổi thứ app phát
> ra**: phép ấy cố ý bỏ nốt đáp trầm, mà chúng có thật và có kêu — mật độ tay phải đang 5,2
> nốt/ô so với bản ký âm 5,5, bỏ thêm là tụt dưới, và phá luôn con số **285/285** vốn là
> bằng chứng để bỏ bảng cũ. Hợp về phép nốt trên cùng là **dựng lại đúng cái bẫy vừa gỡ** —
> chính nó đọc ra `D7 → A4` (−29) ở Lá Thư ô 106 và `D7 → E5` (−22) ở Đừng Xa ô 84.

---

## 12. Câu fill

Đếm cụm fill trong **đoạn hát** cả bảy bài: nốt tay phải liên tiếp cách nhau ≤ 0,5 phách,
cụm từ ba nốt trở lên. Ra **354 cụm**.

### Fill vào ở CHỖ HỞ, không vào phách mạnh

Phách mà cụm fill bắt đầu:

| phách | 0 | 0,75 | 1 | 1,5 | 2 | 2,5 | 2,75 | 3 | **3,5** |
|---|---|---|---|---|---|---|---|---|---|
| tỉ lệ | 6% | 9% | 10% | 13% | 6% | 4% | 12% | 8% | **22%** |

**Phách 3,5 chiếm 22%** — gấp đôi mọi mốc khác, và gấp gần bốn lần phách 1. Đó là móc
đơn cuối ô, chỗ bắc sang ô sau.

Hai phách **mạnh nhất lại thưa nhất**: phách 0 và phách 2 mỗi chỗ chỉ **6%**. Chị ấy
không chen fill vào chỗ bass đang trụ và ca sĩ đang giữ tiếng — chị chen vào **khe**.

### Ba hoặc bốn nốt là chính

| số nốt | 3 | 4 | 5 | 6 | 7 | 8+ |
|---|---|---|---|---|---|---|
| tỉ lệ | **39%** | **22%** | 11% | 7% | 9% | 12% |

**61% cụm chỉ có ba hoặc bốn nốt.** Cụm dài từ tám nốt trở lên chỉ 12%.

### Vị trí trong đoạn thì KHÔNG có luật

Chia đoạn hát thành năm phần đều nhau, đếm cụm rơi vào từng phần: 16% · 23% · 26% · 23%
· 13%. Rải khá đều, hơi trũng ở cuối đoạn. **Không đủ chênh để thành luật** — đừng dựng
luật "fill dồn về cuối câu" từ số này.

### Hình câu fill

Đo 54 cụm ở lượt trước (định nghĩa chặt hơn): **18% đi liền bậc**. *(Con số 8% từng đo
trước đó là sai — xem mục bẫy đo.)*

Bốn câu fill ba nốt đã chép nguyên từ sheet, đều dài `0,75` phách, giãn cách móc kép.

## 13. Điệu: bolero và slow rock hiện dùng chung

Kho có 5 bolero và 2 slow rock. Khi ghép giai điệu cho bài **giọng thứ**, **26%** ô đến
từ Lá Thư Trần Thế (slow rock) — đo trên 480 ô. Bài **giọng trưởng** thì 0%, nhưng đó là
may chứ không do luật.

**Ý người dùng:** *"tạm thời vẫn giữ chung slow rock và bolero cho đến khi nào đủ lượng
sheet bolero thứ trong kho."*

Tách được khi có thêm sheet **bolero giọng thứ** — hiện chỉ có Đừng Xa và Rừng Lá.

### 13b. Lá Thư Trần Thế là 12/8 — sheet ghi SAI nhịp (đo 24/9/2026)

**Bẫy đo.** Sheet ghi 4/4 ♩=86. Nhưng nốt trầm nhất mỗi ô rơi **đều cả bốn phách** (24 ·
25 · 21 · 20, n=92 ô hát) — đệm có bass phách 1–3 thì phải dồn vào 0 và 2. Tay trái đi từng
cụm **6 móc đơn cho một hợp âm**: bass rơi cùng một pha chu kỳ 6 móc đơn ở **75/98** lần,
không trôi từ dạo tới kết (dạo 4/4, phiên 18/24, điệp 10/14, giang 5/5). Tức móc đơn ký âm =
móc đơn chùm ba thật; nhạc là **slow rock 12/8, ♩. ≈ 57**.

Hệ quả: **mọi số đo của Lá Thư ở file này theo "ô" hay "phách trong ô"** — bảng tuyến mục
9, "6 ô dạo", "at 0,5" ở #426, ô chia đôi mục 8 — đều đo trên lưới sai. **Chưa đo lại.** Số
đo không theo vị trí trong ô (bậc, bước đi, cao độ) thì không dính.

**Hai tay ở phần hát**, đếm trên ô 6 móc đơn đã cắt lại (mỗi ô = một hợp âm):

| | ô | tay phải nốt đơn | tay trái rải | tay trái dập hợp âm | tay phải dập hợp âm |
|---|---:|---:|---:|---:|---:|
| phiên | 94 | 253/396 lần gõ (64%) | 62/91 | 5/91 | 12/94, toàn cuối câu |
| điệp | 30 | 70/115 (61%) | 15/30 | **5/30** | 3/30 |

- Tay phải phần lớn là **giai điệu lời** (nốt đơn ngân 3–4 móc đơn) và fill ở quãng cao.
  Khi tay phải đang hát, tay trái rải sáu móc đơn đều (25 ô, nhịp nhiều nhất); dáng đi lên
  1–5–8–10 (16 ô) và lên rồi xuống 1–3–5–8–5–3 (17 ô) gần ngang nhau, dích dắc 28 ô.
- **Tay phải lúc hát là giai điệu lời** — phiên 1 và phiên 3 cùng giai điệu khác lời, tay phải
  tách/gộp nốt đúng theo âm tiết (c11 E4 · E4 gõ lại, c83 E4 ngân liền; c10 D4 dưới F#4, c82 chỉ
  D4). Nên lúc hát **phần đệm là tay trái**; các nốt bè dưới giai điệu cũng đi theo nhịp giai điệu.
  *(Hai ghi chép trước trong mục này — "tay phải còn đệm ở 39/94 ô" và "tay phải đặt một tiếng
  đầu ô rồi ngân, 42/46 ô" — đếm cả nốt/nhịp của giai điệu. Người dùng nghe hai nút dựng từ đó
  và bác: "trong sheet không đệm 2 tay như vậy".)*
- **Hai tay cùng đệm ở chỗ LỜI NGHỈ**: tay phải dập hợp âm 3–4 nốt vùng A3–A4 ở tiếng
  **2 · 2½ · 3 · 4** (lõi có ở c7, c22, c23, c39, c70, c93, c105), tay trái bass quãng tám.
  c22 lặp y hệt tay phải ở c93, và **bỏ nốt gốc** ở tiếng 3 đúng lúc tay trái gõ quãng tám.
  Người dùng nghe cử chỉ này dưới câu fill của KeyTrain: *"chơi rất hay"* — tay phải giữ hợp
  âm trong lúc bè trầm chạy fill. Lặp nó ở mọi hợp âm thì *"không còn giống sheet"*.
- Điệp khúc dày lên đúng lối mục 3 — **nắm dày hơn**: tay trái tự dập cụm 3–5 nốt theo từng
  móc đơn (c41–42, c45–46; cao trào lặp ở c106, c109).
- Lực: mỗi nốt có thuộc tính `dynamics`. Bass điệp 80–94, bass phiên 53–67 — điệp mạnh hơn.

Cỡ mẫu: **một bài**. Chưa biết Một Cõi Đi Về (slow rock còn lại) có cùng bẫy nhịp không —
**chưa đo**. KeyTrain: nút "Slow Rock Lá thư" — lúc hát tay trái rải, ô có fill dùng c22 hai tay (commit `1e28641`).

### 13c. Câu solo tám bài — đo lại trên lưới đúng, tách trưởng / thứ (24/9/2026)

Bộ đo: `KeyTrain/tools/slow_rock_linh_nhi.py --do` — **8 bài, 23 đoạn solo**: giọng thứ 14
(dạo 5 · giang 4 · kết 5), giọng trưởng 9 (3 · 3 · 3). Rừng Lá không có giang.

**Lưới.** Lá Thư cắt lại theo ô 6 móc đơn (mục 13b). **Một Cõi ghi ĐÚNG 6/8** — mục 1 ghi
"3 phách" là 3 nốt đen mỗi ô; bass rơi đầu ô 72/113 lần. Nỗi Buồn ô 8 phách tách làm hai.

**Ký hiệu hợp âm của hai bài slow rock KHÔNG đọc vòng được.** So ký hiệu với nốt đang vang
trong đoạn solo: gốc khớp Lá Thư **6/12**, Một Cõi **4/13** (Một Cõi dạo ô 1 ghi Gm, tay trái
C3/C4–G3–C4). Bolero trưởng thì tin được: Biển Tình 24/24, Đường Xưa 15/17, Mùa Xuân 18/24.
Nên hai bài slow rock **đọc hợp âm bằng tay theo nốt tay trái** — bảng `HOP_AM_TAY` trong script,
mỗi ô ghi nốt làm bằng chứng. *Chưa ai duyệt bảng ấy.*

#### Vòng hợp âm từng đoạn

**Giọng thứ** (ô = 6/8 ở slow rock, 4/4 ở bolero; `→` = đổi trong ô):

| bài | dạo | giang | kết |
|---|---|---|---|
| Lá Thư *(slow rock)* | i · ♭VII · i · ♭III→iv · iv · ♭VI · ii° · V7 | i · ♭VII · i · ♭III · iv · ♭VI · ii° · V7 | Isus4 · Isus4 · I · I |
| Một Cõi *(slow rock)* | i · iv · ♭VI · V7 · i · ♭VI · iv · ii° · V7 · V | = dạo | i/♭3 · ♭VIΔ7 · iv · ii° · V7 · V7/4 · i · i · i |
| Đừng Xa | i · ♭VII · ♭VI · ♭III · iv · i · ii°→V · i · V | ♭VII · ♭VI · ♭III · iv · i · V→ii° · ii° · V7 · V7 · ♭VI→vi° | i · V→ii° · ii° · i · i · i · i |
| Rừng Lá | V+ · i · ♭VII→iv · ♭III · i · v · v · i · i | — | IV→v · i · ♭VII · ♭III · i · v · ♭VII · v→i · iv ×4 |
| Nỗi Buồn | IVsus→i · i · ♭VI · ii° · V7 · V7 · i→V7 · V7 · i · i | i · i · iv · ♭VI · V7→ii° · ii° · V7 · V7 · i · i | iv · iv · ♭VII→♭VI · ♭VI · i ×6 |

**Giọng trưởng** (cả ba bolero):

| bài | dạo | giang | kết |
|---|---|---|---|
| Biển Tình | · · vi · iii · ii · I · vi · ii · iii→IIsus · I | I · vi · iii · ii · I · vi · ii · iii→IIsus · I · V | vi · iii · ii→V · I7 · I7 |
| Đường Xưa | · · IV · ii · I · vi · ii · V · vi | I · vi · IV · V · I · ii · V · vi | vi · iv ×5 |
| Mùa Xuân | I · vi · iii · V→ii · I · iii · I · V | I · I · vi · iii · V→ii · I · iii→V · I · V | iii · vi · IV · Vsus ×2 · I ×6 |

#### Luật hoà âm rút ra

**Giọng thứ** (n=5 bài):

- Vốn đoạn solo: **i · iv · ♭VI · ♭VII · ♭III · ii° · V/V7**. Rừng Lá thêm **v tự nhiên** và IV.
- **Cửa về V đi qua ii°** — `ii° → V7` ở **4/5 bài** (Lá Thư, Một Cõi, Đừng Xa, Nỗi Buồn).
- **Đường đi xuống từ chủ âm**: `i → ♭VII` 3 lần ở dạo (Lá Thư, Đừng Xa, Rừng Lá);
  `iv → ♭VI` 3 lần ở giang.
- Dạo mở trên **i** 3/5, đóng trên **V/V7** 3/5.
- **Hai bài slow rock: giang = dạo cùng vòng** (Lá Thư khác một chỗ chia ô, Một Cõi y hệt).
- Kết nặng chủ âm (**i** 18/46 hợp âm), đóng **i** 3/5 · **I Picardy** 1 (Lá Thư) · **iv** 1 (Rừng Lá).

**Giọng trưởng** (n=3 bài):

- Vốn: **I · vi · iii · ii · V**, thêm IV và **IIsus** (V/V treo).
- **Chuỗi quãng ba đi xuống `I → vi → iii → ii`** ở Biển Tình và Mùa Xuân; `I → vi` 4 lần ở giang.
- Giang mở trên **I** 3/3, đóng trên **V** 2/3.
- Kết mở trên **vi** 2/3; màu kết là **iv thứ mượn** (Đường Xưa, 5 ô), **I7** (Biển Tình), **Vsus → I** (Mùa Xuân).

#### Giai điệu — nốt trên cùng mỗi cú gõ tay phải

| | n nốt | nốt hợp âm | bậc hay dùng (so với chủ âm) | liền bậc | quãng ba | lặp | ≥ quãng tám | đoạn đi xuống |
|---|---|---|---|---|---|---|---|---|
| **thứ** · dạo | 287 | **73%** | `1` 62 · `5` 54 · `♭3` 43 · `2` 36 · `4` 32 · `♭6` 22 · `♭7` 18 · `7` 12 | 93/282 (33%) | 22% | 11% | 11% | 3/5 |
| **thứ** · giang | 233 | 67% | `1` 50 · `♭3` 42 · `5` 39 · `2` 38 · `4` 23 · `♭6` 20 · `7` 12 | 74/229 (32%) | 18% | 10% | 15% | 1/4 |
| **thứ** · kết | 203 | 63% | `5` 50 · `1` 49 · `♭3` 33 · `4` 23 · `2` 16 · `♭6` 13 | 55/198 (28%) | 20% | 11% | 18% | **0/5** |
| **trưởng** · dạo | 138 | 64% | `1` 27 · `3` 26 · `5` 22 · `6` 22 · `2` 20 · `4` 9 | 53/135 (39%) | 27% | 5% | 10% | 2/3 |
| **trưởng** · giang | 146 | 68% | `1` 30 · `5` 28 · `3` 28 · `6` 22 · `2` 18 | 58/143 (41%) | 24% | 6% | 12% | 1/3 |
| **trưởng** · kết | 109 | 73% | `1` 28 · `5` 24 · `3` 21 · `6` 14 · `2` 13 | 26/106 (25%) | **32%** | 6% | 8% | 1/3 |

Đọc ra, đều khớp chiều với mục 5–6b và thêm hai điều mới:

- **Bậc 7 thăng (nốt cảm) là vốn thật của giọng thứ**: 12 nốt ở dạo, 12 ở giang — đi cùng `ii° → V7`.
- **Kết giọng thứ không đi xuống bài nào (0/5)**; kết giọng trưởng đi **quãng ba nhiều hơn liền bậc**.
- Giọng trưởng dùng `6` (13) đều ở cả ba đoạn (14–22 nốt), gần như bỏ `♭3`; giọng thứ lặp nốt gấp đôi.

*Số nốt hợp âm ở đây khác mục 6b* (thứ dạo 73% so với 69%) vì hai bài slow rock nay đo trên hợp
âm đọc từ nốt chứ không trên ký hiệu lệch.

#### Kỹ thuật đánh tay phải — slow rock khác bolero

| | slow rock thứ | bolero thứ | bolero trưởng |
|---|---|---|---|
| đo trên | 2 bài · 49 ô · 275 cú gõ | 3 bài · 77 ô · 448 | 3 bài · 73 ô · 393 |
| nốt đơn | 186 (68%) | 333 (74%) | 295 (75%) |
| cú hai nốt | 71 (26%) | 94 (21%) | 82 (21%) |
| · trong đó **quãng tám** | **32 (45%)** | 11 (12%) | 24 (29%) |
| · quãng ba · quãng sáu | 14 · 8 | 21 · 15 | 19 · 11 |
| · quãng 4–5 | 4 | **31 (33%)** | 10 |
| · láy nửa cung (Ab4 dưới A4) | 2 | 4 | 5 |
| chồng ≥ 3 nốt | 18 (7%) | 21 (5%) | 16 (4%) |
| dập cùng hợp âm ≥ 3 lần liền | **5** | 0 | 1 |
| chuỗi chạy ≥ 4 nốt | 10 (0,20/ô) | 18 (0,23/ô) | 15 (0,21/ô) |

- **Slow rock: nhân quãng tám giai điệu là thủ pháp chính** — 45% cú hai nốt. Bolero thứ lại
  chuộng quãng 4–5 (33%).
- **Dạo và giang Lá Thư**: tay phải **rải giai điệu vắt hai quãng tám**, mỗi móc đơn chùm ba một
  nốt (A4–E6), tay trái chỉ **ngân bass** (D4, C4 ngân cả ô). Cuối câu **dập hợp âm hai tay**
  (c7 · c80: tay phải C#5/E5/A5 ở tiếng 1 · 2 · 2½ · 3 · 4, tay trái quãng tám A rồi đi xuống G, E).
- **Một Cõi**: chạy **móc kép** trong ô 6/8 — dạo ô 2 `Bb4 Eb4 A4 Bb4 A4 G4 F#4 Eb4`, ô 3 rải D7 lên
  `D4 F#4 A4 C5 D5 F#5 A5 F#5 C6 A5`; bass ngân.
- **Tay trái ở đoạn solo slow rock KHÔNG rải sáu móc đơn như lúc hát**: 147 cú / 49 ô = 3,0 cú/ô,
  26% ngân ≥ nửa ô. Bolero thứ 4,6 cú/ô, bolero trưởng 5,8.

#### Hai chỗ md cũ ghi sai

- **Lá Thư kết**: mục 2 ghi "0,00 ký hiệu" — đúng là sheet không ghi ký hiệu nào, nhưng hoà âm
  thật là **Dsus4 · Dsus4 · D · D**: tay trái ngân D, rồi F#4 vào, hợp âm cuối D5 F#5 A5 D6 F#6 A6.
  **Kết Picardy (Rê trưởng) trong bài thứ.**
- **Một Cõi giang**: mục 2 ghi mượn **I trưởng (Picardy)** — sheet ghi `G`, nhưng tay phải ô ấy có
  Bb5 · Bb4, tức vẫn là **Gm**. Ngoại lệ Picardy của Một Cõi **không đứng**; Picardy thật là Lá Thư kết.

#### Bộ soạn KeyTrain dựng từ mục này

`KeyTrain/src/reharm/style/linhNhiSolo.ts`, chạy khi chọn màu hợp âm Linh Nhi (13d).
Bản đầu (commit 71de0c5) chép một đoạn solo thật rồi **đổi nhịp** khi khác điệu (bolero 4/4 →
12/8 chùm ba, slow rock → 4/4). **Người dùng bác khi nghe** (24/9/2026, mục 15): không lấy câu điệu
khác dồn vào. Nay: bolero chép nguyên đoạn bolero; slow rock **soạn mới từ ô slow rock** — xem 13e.

#### Chưa đo

- **Chưa có sheet slow rock giọng trưởng** — mọi thứ về slow rock trưởng đang mượn bolero.
- Bảng hợp âm đọc tay của hai bài slow rock **chưa ai duyệt**.
- Rừng Lá: ký hiệu khớp nốt 4/20 theo bộ đọc tự động — nhiều khả năng bộ đọc hụt với bass
  bolero 1–5, **chưa kiểm tay**.
- Lực đánh (thuộc tính `dynamics` từng nốt) chưa đưa vào bộ soạn.

### 13d. Chị đặt hợp âm cho phần hát thế nào — tách trưởng / thứ (24/9/2026)

Bộ đo: `KeyTrain/tools/hop_am_linh_nhi.py` — phần hát (phiên + điệp) của 8 bài: trưởng 3
(Biển Tình, Đường Xưa, Mùa Xuân), thứ 5 (Đừng Xa, Rừng Lá, Nỗi Buồn, Lá Thư, Một Cõi).

**Đọc hợp âm:** bolero theo ký hiệu sheet nhưng chỉ nhận khi tay trái đang vang ủng hộ nó
(≥ 60% thời lượng tay trái nằm trong hợp âm): 423 đoạn nhận, 42 đoạn đọc lại từ tay trái. Hai
bài slow rock đọc từ tay trái từng ô 6/8 (211 ô). **Gốc lấy từ tay trái, bậc ba lấy từ mọi nốt
đang vang** — lần đo đầu lấy bậc ba chỉ từ tay trái (rải 1–5–8 không có bậc ba) và ra 54 hợp âm
"I trưởng" trong bài thứ, sai. Kiểm bằng cách đo bậc ba từng đoạn: **không đoạn nào của 5 bài
thứ chuyển sang giọng trưởng** (bậc ba trưởng cao nhất 30%, Lá Thư phiên 4).

**Màu lấy từ NỐT ĐỆM THẬT** (tay trái + nốt dưới nốt đỉnh tay phải, ≥ 8% thời lượng), không từ
ký hiệu — ký hiệu có thể do plugin dò máy sinh ra và đếm cả nốt giai điệu làm màu.

#### Màu theo bậc

| giọng | bậc | n | trơn | màu hay gặp |
|---|---|---|---|---|
| trưởng | I | 61 | **30** | maj7 14 · add9 14 · 6 8 |
| trưởng | V | 42 | **25** | ♭7 chỉ 7 · 9 10 |
| trưởng | ii | 38 | **22** | ♭7 13 · 11 11 |
| trưởng | vi · IV · iii | 34 · 24 · 20 | **25 · 18 · 16** | — |
| trưởng | **II** (át của V) | 10 | 0 | **♭7 10/10**, 3 bài |
| thứ | i | 101 | **41** | add9 38 · ♭7 21 |
| thứ | ♭III | 51 | **22** | maj7 12 · 9 12 |
| thứ | iv | 48 | 21 | **add9 24** |
| thứ | ♭VI | 46 | 23 | **maj7 21** |
| thứ | ♭VII | 30 | **19** | 9 10 |
| thứ | **V** | 24 | 6 | **♭7 17**, 4 bài |
| thứ | v | 22 | 3 | ♭7 16 — nhưng **12 của 1 bài** |
| thứ | ii° | 16 | 5 | ♭7 10, 4 bài |
| thứ | **I trưởng kéo về iv** | 6 | 0 | **♭7 6/6**, 4 bài (V7/iv) |

**Màu đổi theo đoạn ở giọng thứ** — chỗ gần hoà ở bảng trên tách ra khi chia phiên/điệp:

| thứ | phiên khúc | điệp khúc |
|---|---|---|
| ♭VI | trơn 15/25 · maj7 8 | **maj7 13/21**, 3 bài |
| iv | trơn 18/38 · add9 16 (2 bài) | **add9 7/10**, 3 bài |
| i | trơn 29/67 · add9 23 · ♭7 15 | trơn 22/34 |

Giọng trưởng thì trơn ở gần mọi bậc cả hai đoạn.

- **Giọng trưởng chị gần như không tô màu** — trơn ở mọi bậc trong giọng; màu duy nhất đứng
  vững là **II7** (át của V).
- **Giọng thứ**: V7, ii°(m7b5), I7 kéo về iv; lên **điệp khúc** thì ♭VI thành **maj7** và iv
  thành **add9**.
- Át phụ chỉ áp cho hợp âm **trưởng ngoài giọng**. ♭VII→♭III và ♭III→♭VI (đi quãng năm nhưng
  trong giọng) thì trơn 9/10.

#### Nhịp đổi hợp âm và hợp âm chen

| | ô có hai hợp âm |
|---|---|
| bolero trưởng | 30/204 (15%) |
| bolero thứ | 44/161 (27%) |
| slow rock (ô 12/8) | 81/111 (**73%**) — gần như mỗi hai phách chấm một hợp âm |

**Hợp âm chen lặp ở ≥ 2 bài chỉ có ba mẫu**: bolero thứ `i → ♭VI` trong ô (5 lần, 3 bài) · slow
rock `iv → i` (5, 2 bài) · trưởng `V → I` (3, 2 bài). Quá mỏng để thành luật tự chèn.

**Bass đảo hiếm**: trưởng 7/245 đoạn (V/3 ×3 · II/3 ×2 · #iv°/♭3 ×1 · Vsus/5 ×1); ở giọng thứ phần lớn chỗ "đảo" là hợp
âm giảm đọc ra từ tay trái thiếu gốc — chưa tách được, không kết luận.

**Chuyển tiếp hay gặp**: trưởng `I→vi` 25 (3 bài) · `V→I` 24 (3) · `ii→V` 14 (2); thứ `i→♭VI`
20 (4 bài) · `V→i` 11 (4) · `iv→i` 11 (3) · `i→♭VII` 10 (4) · `♭VII→♭III` 10 (4) · `♭III→V` 9 (4).

#### Đưa vào KeyTrain

Nút **màu hợp âm Linh Nhi** (`reharmEngine/linhNhiHarmony.ts`) thay bảng tĩnh cũ (I/IV maj7,
ii/iii/vi m7, V7 — đặt khi chưa đo, và ép cả v thứ thành V7). Chỉ tô hợp âm ba trơn; giữ màu và
bass đảo người dùng ghi; **không tự chèn hợp âm**. Chọn màu này thì câu dạo · giang · kết soạn bằng
`style/linhNhiSolo.ts` cho điệu đang chơi — xem 13c.

#### Chưa đo

- Hợp âm đọc từ tay trái ở giọng thứ còn lẫn hợp âm giảm thiếu gốc (iii°/♭3 ×22) — chưa kiểm tay.
- Chưa có giai điệu hát đầu vào: màu nào hợp với nốt hát thì chưa đo.
- Chưa tách được "của chị" với "của nhạc sĩ" bằng số nhạc sĩ — chỉ dùng số bài làm đại diện.

### 13e. Quy luật chị soạn nốt ở câu solo — tách điệu và giọng (24/9/2026)

Bộ đo: `KeyTrain/tools/quy_luat_not_linh_nhi.py` trên 23 đoạn solo (dạo · giang · kết) của 8 bài.
Giai điệu = **nốt cao nhất** mỗi cú gõ tay phải. Phách mạnh: bolero 4 phách của ô; slow rock đầu
hai chùm ba của ô 6/8 (móc đơn 1 và 4). Hợp âm: slow rock theo bảng đọc tay (13c), bolero theo ký
hiệu sheet — **hai vế đọc hợp âm khác cách**, so bolero với slow rock thì nhớ điều này.

| | bolero · thứ | bolero · trưởng | slow rock · thứ |
|---|---|---|---|
| đoạn · ô | 8 · 77 | 9 · 73 | 6 · 49 |
| nốt hợp âm ở phách mạnh | 129/201 (64%) | 137/167 (82%) | **67/81 (83%)** |
| nốt hợp âm ở phách nhẹ | 138/247 (56%) | 131/220 (60%) | **165/194 (85%)** |
| nhảy 5–11 rồi bước ngược ≤ 4 | 29/95 | 28/77 | 13/71 |
| nối ô 0-2 · 3-4 · 5-7 · 8-11 · quãng 8 · >quãng 8 | 33·12·9·7·1·4 | 35·9·14·3·2·1 | 23·5·2·7·1·5 |
| ô lặp hình ô ngay trước | 1 | 0 | 0 |
| ô nghỉ ≥ nửa ô (giữa · cuối đoạn) | 3 · 2 | 3 · 3 | 1 · 0 |
| tầm TB đầu · giữa · cuối đoạn (MIDI) | 73,7 · 74,0 · 77,7 | 76,9 · 75,4 · 77,6 | 76,2 · 74,7 · 77,7 |
| câu chạy (lên · xuống) | 25 (20 · 5) | 20 (16 · 4) | 12 (11 · 1) |
| câu chạy nửa đầu · nửa sau đoạn | 19 · 6 | 13 · 7 | 4 · 8 |
| câu chạy đáp vào nốt hợp âm | 17/25 | 11/19 | 11/12 |
| nốt kết đoạn (bậc) | 5×3 · 1×3 · 7 · 2 | **1×6** · 2 · 5 · 3 | 5×3 · 2×2 · #4 |

Hình ô (theo nốt đầu · giữa · cuối): bolero thứ lòng chảo 20 · đi lên 15 · phẳng 12 · vòm 11 ·
ít nốt 10 · đi xuống 9; bolero trưởng lòng chảo 25 · lên 14 · vòm 12 · xuống 10 · ít nốt 10 · phẳng
2; slow rock lòng chảo 17 · **xuống 15** · lên 7 · vòm 5 · ít nốt 4 · phẳng 1.

Ô thưa (≤ 2 cú gõ tay phải) ở slow rock: 4/49.

**Đọc ra** (từ bảng; mẫu slow rock chỉ 2 bài, 6 đoạn):

- **Slow rock bám hợp âm chặt hơn bolero** cả phách mạnh lẫn nhẹ (83% · 85% so với 64% · 56% ở
  bolero thứ) — nhưng hai điệu đọc hợp âm khác cách, chưa tách được phần do cách đọc.
- **Nối ô liền**: khoảng một nửa chỗ nối cách ≤ 2 nửa cung (33/66 · 35/64 · 23/43). Nhảy ≥ 8 nửa
  cung: 12/66 · 6/64 · 13/43 — chỗ nào là dời cả câu lên quãng tám thì **chưa tách**.
- **Không lặp hình ô liền nhau**: 1/199 ô cả ba nhóm.
- **Câu chạy đi lên** 47/57, và ở slow rock **dồn về nửa sau đoạn** (8/12) — ở bolero thì ngược lại
  (nửa đầu 32/45).
- **Đoạn dâng lên cuối**: tầm cuối đoạn cao hơn đầu đoạn ở cả ba nhóm (+4,0 · +0,7 · +1,5 nửa cung
  — bolero trưởng gần như không dâng).
- Bolero trưởng **kết về chủ âm 6/9**; giọng thứ kết bậc 5 hoặc 2 ở 4/8 (bolero) và 5/6 (slow rock).

#### Đưa vào KeyTrain — bộ soạn slow rock (24/9/2026)

`KeyTrain/src/reharm/style/soanSlowRockLinhNhi.ts`. Vật liệu nốt **chỉ** là 49 ô solo slow rock (Lá
Thư, Một Cõi); mỗi ô **chuyển bậc theo gam** lên hợp âm đích (cả ô dời cùng số bậc), nốt bậc 3 · 5 ·
7 lệch nửa cung do gam thì về nốt hợp âm. Vòng hợp âm: vòng solo thật của chị cùng giọng, slow rock
trước; **giọng trưởng mượn vòng bolero trưởng** (chỉ hoà âm, mỗi hợp âm một ô 6/8), nốt vẫn là ô slow
rock thứ chuyển sang gam trưởng — **biên soạn, chưa có sheet để đối chiếu**. Ô kết là cử chỉ kết thật
(Lá Thư c7/c80 dập V, c142–c143 Picardy; Một Cõi chạy V7 rồi ngân). Ô giữa chọn bằng điểm phạt theo
bảng trên; **hệ số phạt là của tôi, chưa đo**.

Đo trên 432 câu soạn (3 loại đoạn × 2 giọng × 12 giọng × 6 lượt), so với sheet slow rock:

| | sheet | bộ soạn |
|---|---|---|
| nốt hợp âm phách mạnh | 83% | 90–100% |
| nốt hợp âm phách nhẹ | 85% | 83–89% |
| ô thưa | 4/49 | 0–7% |
| ô trống giữa đoạn | 0 | 0 |
| ô lặp hình ô trước | 0 | 0 |
| câu khác nhau / 6 lượt (giọng Rê) | — | 6/6 |

### 13f. Bộ soạn slow rock train lại theo ý kiến nghe 16S — nắn nhịp, vòng mới, giai điệu bolero (24/9/2026)

**Phần soạn Slow Rock, không liên quan Bolero.** Mã: `KeyTrain/src/reharm/style/soanSlowRockLinhNhi.ts`.

**Ý người dùng** (24/9/2026): câu solo *"bị đánh nhanh lên làm lệch tiết tấu … có thể do Sheet gốc có
chỗ bị hỏng … Bạn có quyền điều chỉnh lại sao cho giai điệu khớp với tiết tấu của điệu đang chơi"* ·
*"Vòng hợp âm phải được đổi mới chứ ko phải giữ nguyên một vòng rồi đổi giai điệu. Bạn có hợp âm và
giai điệu từ các sheet bolero nữa nên hãy tận dụng chúng"*.

**Cách hiểu của tôi** (chỗ này là suy luận, không phải số đo): tiết tấu luôn là ô slow rock của chị;
bolero góp **vòng hợp âm** và **đường cao độ**, đặt lên tiết tấu slow rock — không đổi nhịp bolero
sang 12/8 như bản đã bị bác (mục 15).

**1. Nắn nhịp.** Số đo: mốc tay phải lệch lưới 6/8 — Một Cõi 31 mốc / 14 trong 29 ô, Lá Thư 0 / 20 ô
(16S). Ô hỏng dời mốc về móc đơn gần nhất; móc kép giữ khi thuộc câu chạy liền; nốt dư bỏ, bỏ nốt hoa
mỹ trước. Kết quả: nắn **14/49 ô** (đúng 14 ô Một Cõi hỏng), bỏ **17/275 mốc** tay phải. Ô 1 dạo Một Cõi
thành 0 · 0,5 · 1 · 1,5 · 2 · 2,5; câu chạy móc kép ô 4 giữ nguyên. Hệ số phạt bỏ nốt (0,1 · 0,35) là
**biên soạn**.

**2. Vòng mới mỗi lượt.** Ghép **đầu** một vòng solo thật cùng giọng (slow rock hoặc bolero) với **đuôi**
một vòng thật cùng loại đoạn, nối ở hợp âm hai vòng cùng có; bỏ vòng trùng (hay cắt ngắn) một vòng có
sẵn; mở bằng hợp âm chị từng mở; dạo/giang ≥ 5 hợp âm khác nhau, dài 7–12 ô (đo trên 23 vòng thật:
5–10 hợp âm, 7–12 ô); nối vào cử chỉ kết bằng bước gốc chị đã đi. Kho vòng (bài chưa có hợp âm):
thứ dạo 112 · giang 77 · kết 88; trưởng 47 · 32 · **3**. 40 lượt ở Mi: thứ 35 · 33 · 31 vòng khác nhau,
trưởng 38 · 28 · **2** — kết trưởng nghèo vì chị chỉ có 3 đoạn kết trưởng, cả ba mở bằng vi hoặc iii.

**3. Giai điệu bolero trên tiết tấu slow rock (ô lai).** Mỗi ô bolero cùng giọng (một hợp âm, ≥ 3 mốc)
lấy đường cao độ, đặt lên tiết tấu ô slow rock có số mốc gần nhất (bỏ ≤ 3 nốt, giữ nốt đầu và cuối, hợp
chiều đi nhất); nốt quãng tám và chồng nốt theo ô slow rock. Tỉ lệ ô lai trong câu soạn: 47–71% ô giữa
đoạn.

**Đo trên 432 câu** (3 đoạn × 2 giọng × 12 giọng × 6 lượt):

| | sheet slow rock | bộ soạn |
|---|---|---|
| mốc lệch lưới 6/8 | 31 mốc (Một Cõi) | **0 / 20.248** |
| mốc móc kép (không phải móc đơn) | — | 10,9% |
| nốt hợp âm phách mạnh / nhẹ | 83% / 85% | 93–100% / 81–85% |
| nối ô ≤ 4 nửa cung hoặc quãng 8 | 29/43 | 100% |
| ô thưa ≤ 2 mốc | 4/49 | ≤ 5,6% |
| ô trống · ô lặp hình ô trước | 0 · 0 | 0 · 0 |

**Chưa đo:** bảng 13e còn nhiễm nhịp hỏng của Một Cõi (chưa đo lại sau khi nắn); hệ số phạt chưa đo;
giọng trưởng vẫn là ô slow rock thứ chuyển gam — chưa có sheet slow rock trưởng để đối chiếu; kết trưởng
chỉ 3 vòng.

### 13g. Câu chạy (run) của chị trong hai sheet slow rock — cả bài, hai tay (25/9/2026)

**Phần soạn Slow Rock, không liên quan Bolero.** Bộ đo: `KeyTrain/tools/chay_ngon_slow_rock.py` trên
Lá Thư và Một Cõi, cả bài (phần hát + solo), hai tay, lưới ô 6/8 đúng của từng bài (tiếng 1–6 = móc đơn,
tiếng 1 và 4 là phách mạnh — cách đếm của người dùng). Câu chạy = ≥ 4 cú gõ liền một tay, cách ≤ một móc
đơn, cùng chiều, bước 1–7 nửa cung. Hợp âm đọc từ nốt đang vang (ký hiệu hai sheet này không tin được).

Bắt được 108 câu; **bỏ 41 hình rải đệm tay trái** (1–5–8–10 từ tiếng 1–2, móc đơn đều, không vắt ô — đó là
tiết tấu đệm, không phải câu chạy). Còn **67 câu chạy**:

| | số câu |
|---|---|
| tay trái · phần hát | **42** |
| tay trái · solo | 5 |
| tay phải · solo | **14** |
| tay phải · phần hát | 6 |
| đi lên · đi xuống | 54 · 13 |
| 4 · 5 · 6 nốt | 57 · 3 · 7 |
| chỉ móc đơn · có móc kép | 36 · 31 |
| vào ở tiếng 1 · 4 · 3 · 2 · 6 | 17 · **13** · 8 · 6 · 5 |
| nốt cuối ở tiếng 4 · **7 (vạch ô sau)** · 6 · 5 | 17 · **15** · 8 · 6 |
| bước 3 · 4 · 2 · 5 · 7 · 1 nửa cung | 55 · 41 · 40 · 39 · 21 · 21 |
| nốt hợp âm · nốt trong gam | 215/285 · 280/285 |
| có nốt đáp ngay sau câu · đáp là nốt hợp âm | 64/67 · **56/64** (bậc 5: 21 · bậc 1: 19) |
| tay kia đang ngân lúc câu chạy vào | 20/67 |

**Đọc ra**

- **Lúc hát, câu chạy nằm ở TAY TRÁI** (42/48): tay phải là giai điệu lời. Lối điển hình là **câu dẫn bè
  trầm nửa sau ô**: vào ở tiếng 4 (phách mạnh thứ hai), ba móc đơn, nốt thứ tư **rơi đúng vạch** vào gốc
  hợp âm sau — Lá Thư ô 30 `D E F → G` (Dm → Em7b5), `G F E → D`; ô 45/92 `E C G → D` (C → Dm); Một Cõi
  ô 42 `Bb G D → C` (Gsus4 → Cm), ô 21 `F C G → C`.
- **Tay phải chạy ở đoạn solo** (14/20): rải đi lên nửa sau ô rồi đáp vạch — Lá Thư dạo ô 4 `A Bb D G → F`
  (Gm → Bb), Một Cõi dạo ô 4 móc kép `C D F# A` (D7), ô 9 `A C D F# (A D)` vắt qua vạch.
- **Đáp vào hợp âm sau**: 56/64 nốt đáp là nốt hợp âm của hợp âm sau, nhiều nhất bậc 5 và gốc.
- Lúc bè trầm chạy, tay phải giữ hợp âm phía trên — đúng cử chỉ c22 (fill) người dùng đã khen.

**Khuôn cho KeyTrain**: 27 câu chạy **dẫn vào hợp âm sau** (các nốt trước vạch + nốt đáp ở vạch hoặc ngay
sau nửa phách) — 7 tay phải, 20 tay trái; sinh bằng `--sinh` vào `KeyTrain/src/reharm/style/slowRockChayNgon.ts`.
Nhịp Một Cõi hỏng (0,375 · 0,625…) dàn đều lại khi dùng.

**Linh Run slow rock mới** (`chayLinhNhi`): mỗi câu là một khuôn trên, tính ngược từ vạch. Khuôn đi liền
bậc giữ khoảng bậc tới nốt đáp, nốt đáp = cùng bậc trên hợp âm sau; khuôn rải thì nốt trước vạch chuyển bậc
theo gam lên hợp âm đang vang. Trên hợp âm có nốt cảm (V trong giọng thứ) nốt dẫn đi gam thứ hoà âm. Đo
(La thứ, 6 cặp hợp âm × 27 lượt = 162 câu): nốt đáp là nốt hợp âm sau 138/162 (85%; sheet 88%), nốt dẫn
ngoài cả gam lẫn hợp âm 0/612, 111 câu khác nhau.

**Chưa đo**: khuôn chỉ từ hai bài giọng thứ — giọng trưởng là chuyển gam, chưa đối chiếu; chưa đo độ lớn
(dynamics) của câu chạy; lối "tay phải giữ hợp âm lúc bè trầm chạy" mới dựa vào ô c22, chưa đếm trên cả bài.

### 13h. Bộ soạn Slow Rock ĐÃ ĐẠT — học gì từ sheet, chọn hợp âm và nốt thế nào (25/9/2026)

**Phần soạn Slow Rock, không liên quan Bolero.** Người dùng nghe duyệt ngày 25/9/2026: *"điệu Slow Rock Lá Thư
và Slow rock hai tay Lá Thư đều đã đạt, các câu solo cũng đã đạt"*. Đường đã duyệt — **đừng đổi nốt nào** khi
người dùng chưa yêu cầu:

| đã duyệt | ở đâu (KeyTrain) |
|---|---|
| Điệu Slow Rock Lá thư (phiên c15–c16, điệp c41–c42, ô fill c22, hợp âm chia đôi thì rải) | `style/styleLibrary/linhNhiSlowRock.ts` |
| Điệu Slow Rock Lá thư hai tay (sóng rải vắt hai tay) | cùng file, family `slow-rock-la-thu-hai-tay` |
| Câu solo dạo · giang · kết | `style/soanSlowRockLinhNhi.ts` |

Mục này viết để **giải thích được** bộ soạn: sau này người dùng muốn dựng chức năng "giải thích vì sao chọn hợp
âm này, nốt này" thì đọc từ đây. Chỗ nào là **số đo**, chỗ nào là **biên soạn của Claude**, chỗ nào là **ý người
dùng** đều ghi rõ.

#### 1. Đã phân tích được gì từ hai sheet slow rock (số đo)

Nguồn: Lá Thư Trần Thế (Rê thứ), Một Cõi Đi Về (Sol thứ). Bộ đo trong `KeyTrain/tools/`.

1. **Nhịp thật.** Lá Thư ghi 4/4 nhưng là 12/8: bass rơi cùng pha chu kỳ 6 móc đơn ở 75/98 lần (13b). Một Cõi ghi
   đúng 6/8 (bass đầu ô 72/113). Mọi phép đo sau đều đo trên **ô 6/8 đúng của từng bài** — đo trên ô 4/4 in sẵn
   thì con số nào cũng lệch.
2. **Ký hiệu hợp âm không tin được.** Gốc ký hiệu khớp nốt thật 6/12 (Lá Thư) và 4/13 (Một Cõi) → hợp âm đọc tay
   từ tay trái, từng ô (13c).
3. **Lúc hát, tay phải là giai điệu lời** — phần đệm là tay trái rải 1–3–5–8–5–3 sáu móc đơn (13b). Hai tay cùng
   đệm chỉ ở chỗ lời nghỉ (c22: tay phải giữ hợp âm, bè trầm chạy).
4. **Vòng hợp âm câu solo** (13c): giọng thứ đi về ii°→V7 ở 4/5 bài; một hợp âm mỗi ô 6/8 (48/49 ô solo).
5. **Quy luật soạn nốt ở câu solo** (13e, 6 đoạn, 49 ô):
   - nốt hợp âm ở phách mạnh (tiếng 1, 4) **67/81 = 83%**, ở phách nhẹ **165/194 = 85%**;
   - nốt đầu ô cách nốt cuối ô trước ≤ 2 nửa cung ở **23/43** chỗ nối — câu đi liền;
   - **0/49** ô lặp hình ô ngay trước; ô nghỉ ≥ nửa ô **1/49**; ô thưa ≤ 2 nốt **4/49**;
   - câu chạy dồn về nửa sau đoạn (8/12), đi lên 11/12; tầm cuối đoạn cao hơn đầu đoạn;
   - tay phải nhân quãng tám giai điệu là thủ pháp chính (45% cú hai nốt); tay trái solo 3 cú/ô.
6. **Bản ký âm Một Cõi hỏng nhịp**: 31 mốc lệch lưới 6/8 trong 14/29 ô; Lá Thư 0/20 (16S). Người dùng nghe ra "bóp
   nhanh" ở đúng các ô ấy.
7. **Câu chạy** (13g, cả bài, hai tay): 67 câu; lúc hát ở tay trái 42/48 — câu dẫn bè trầm từ tiếng 4, nốt thứ tư
   rơi đúng vạch vào gốc hợp âm sau; đáp nốt hợp âm của hợp âm sau 56/64.

#### 2. Những điểm then chốt làm câu solo hay (biên soạn của Claude, dựa trên số đo ở trên)

1. **Mọi nốt là nốt của chị.** Vật liệu là 49 ô solo slow rock thật (+ đường cao độ của ô bolero cùng giọng đặt
   lên tiết tấu slow rock). Không ô nào sinh bằng xúc xắc; mỗi ô ghi rõ "ô số mấy của đoạn nào, dời mấy bậc".
2. **Tiết tấu luôn của slow rock.** Người dùng bác việc đổi nhịp câu bolero sang 12/8 ("dồn ép"). Bolero chỉ góp
   vòng hợp âm và đường cao độ; tiết tấu lấy từ ô slow rock. Ô Một Cõi hỏng nhịp được nắn về lưới 6/8.
3. **Vòng hợp âm mới mỗi lượt, nhưng ghép từ vòng thật của chị** — nên vừa mới vừa đúng "giọng" hoà âm của chị.
4. **Chọn ô bằng quy luật đo được** (mục 5 ở trên) — câu liền, bám hợp âm, không lặp, không ngắt quãng.
5. **Kết bằng cử chỉ kết thật của chị** (ô dập V7 Lá Thư + cú dặm V7 theo ý người dùng #70; ô ngân V Một Cõi; kết
   Picardy Isus4 → I của Lá Thư) — đầu câu và giữa câu mới, còn chỗ khép câu thì đúng lối chị.
6. **Đổi theo lượt có kiểm soát**: ô mở xoay qua mọi ô mở hợp hợp âm, ô giữa xoay trong nhóm gần tốt nhất — lượt
   liền nhau không mở trùng (0/19), mà không bốc thăm.

#### 3. Chọn hợp âm thế nào

**a) Câu solo (dạo · giang · kết) — "ghép vòng thật"** (`vongMoi`):

1. Lấy mọi vòng solo thật của chị **cùng giọng** (thứ: 2 bài slow rock + 3 bài bolero; trưởng: 3 bài bolero), trải
   mỗi hợp âm thành một ô 6/8.
2. Vòng mới = **khúc đầu** của vòng A + **khúc đuôi** của vòng B **cùng loại đoạn**, nối ở một hợp âm hai vòng cùng
   có (cùng bậc, cùng chất). Ví dụ: đầu Đừng Xa + đuôi Lá Thư.
3. Giữ lại vòng nào (giới hạn đo trên 23 vòng thật): dạo/giang dài 7–12 ô, ≥ 5 hợp âm khác nhau (kết: 5–12 ô, ≥ 3);
   mở bằng hợp âm chị từng mở loại đoạn ấy; **không trùng và không là khúc đầu** của một vòng có sẵn (so sau khi
   gộp hợp âm đứng liền); không để một hợp âm đứng ba ô liền; bước vào cử chỉ kết phải là bước gốc chị đã đi.
4. Xếp theo **độ khớp vốn hợp âm của bài** (bao nhiêu hợp âm của vòng có trong bài) — lấy nhóm cách tốt nhất ≤ 0,2;
   lượt phát xoay trong nhóm ấy.
5. Mấy ô cuối nhường cho cử chỉ kết thật, mang hợp âm của chính nó (V7, V, Isus4 → I, i).

**b) Màu hợp âm cho phần hát (nút màu Linh Nhi)** — số đo 13d: giọng trưởng chị để trơn gần hết, chỉ II7 (át
của V) là màu đứng vững; giọng thứ: V7, ii° thành m7b5, I7 kéo về iv; lên điệp khúc ♭VI thành maj7, iv thành add9.

#### 4. Chọn nốt thế nào — có dùng scale không?

**Có dùng scale, nhưng làm THƯỚC ĐO BẬC, không làm nguồn nốt.** Nốt không bao giờ được "rút ra từ scale"; nốt
luôn là nốt của một ô thật, và scale chỉ dùng để **dời ô ấy sang hợp âm khác** cho đúng giọng.

1. **Chuyển bậc theo gam (nhắc tiến).** Ô nguồn đứng trên hợp âm gốc X (vd iv), ô đích là hợp âm Y (vd ♭VI). Đếm
   khoảng cách **theo bậc gam** từ gốc X tới gốc Y (lấy đường ngắn, trong khoảng −3…+3 bậc), rồi dời **mọi nốt** của
   ô đi đúng bấy nhiêu bậc. Gam dùng: thứ tự nhiên `0 2 3 5 7 8 10` hoặc trưởng `0 2 4 5 7 9 11`. Dời theo bậc chứ
   không theo nửa cung, nên hình giai điệu giữ nguyên mà nốt vẫn nằm trong giọng — như cách nhạc sĩ nhắc một câu
   lên bậc khác.
2. **Hợp âm thắng gam.** Nốt nào rơi vào bậc 3 · 5 · 7 của hợp âm đích mà gam cho lệch nửa cung thì về đúng nốt hợp
   âm: vd V trưởng trong giọng thứ (E7 trong La thứ cần G#, gam tự nhiên cho G), hay II7 trong giọng trưởng.
3. **Nốt hoá của chị** (nốt lướt nửa cung) chỉ giữ khi ô không bị dời bậc và cùng giọng — tức nó vẫn đứng đúng
   chức năng cũ. Dời bậc thì nốt hoá trở về nốt gam.
4. **Chọn quãng tám** cho cả ô (−1 · 0 · +1 quãng tám), trong tầm 48–103.
5. **Chấm điểm từng ứng viên** (ô nào × quãng tám nào) theo quy luật đo, điểm phạt thấp thì thắng:
   | quy luật (số đo) | phạt (biên soạn) |
   |---|---|
   | nối ô: ≤ 2 nửa cung · ≤ 4 · đúng quãng tám · ≤ 7 · < 12 · xa hơn (23/43 chỗ nối ≤ 2) | 0 · 1 · 1,5 · 3 · 4 · 5 |
   | lệch khỏi đường tầm cao của đoạn mẫu | 0,15 mỗi nửa cung |
   | nốt không phải nốt hợp âm ở phách mạnh · phách nhẹ (83% · 85%) | 2 · 0,5 mỗi nốt |
   | bậc ba đứng trên hợp âm sus (nghe phô) | 2 mỗi cú |
   | lặp hình ô ngay trước (0/49) | 4 |
   | nghỉ ≥ nửa ô giữa đoạn (1/49) | 3 |
   | ô thưa ≤ 2 nốt (4/49) | 1 |
   | câu chạy ở nửa đầu đoạn (chạy dồn nửa sau 8/12) | 0,5 |
   | ô mở đặt giữa câu, hay ô giữa đặt đầu câu | 1 |
   Hệ số phạt là **biên soạn**; các con số trong ngoặc là **số đo** đứng sau từng luật.
6. **Không dùng**: ngũ cung, blues, thang chạy tự sinh, hay bốc ngẫu nhiên. Hàm băm không có mặt; "đổi theo lượt"
   là xoay có thứ tự trong nhóm ứng viên gần tốt nhất.
7. **Tay trái** của ô solo đi theo ô ấy, dời cùng số bậc (ô lai bolero thì lấy tay trái của ô slow rock làm khuôn).
8. **Riêng câu chạy (Linh Run)**: khuôn là câu chạy dẫn vào hợp âm sau (13g), tính ngược từ vạch; câu liền bậc giữ
   khoảng bậc tới nốt đáp, câu rải dời bậc theo hợp âm đang vang; trên V của giọng thứ nốt dẫn đi **gam thứ hoà âm**
   `0 2 3 5 7 8 11`.

**Ví dụ một ô** (bài La thứ, ô đích là Dm = iv): lấy ô 5 dạo Lá Thư — nguồn Rê thứ, hợp âm Gm (cũng là iv), tay
phải `G5 (ngân) · A4 Bb4 D5 G5` = gốc rồi chạy lên bậc 2–3–5–1. Gốc nguồn và gốc đích cùng bậc iv → dời 0 bậc, chỉ
chuyển giọng Rê → La: thành `D5 · E4 F4 A4 D5` trên Dm. Tiếng 1 (D, gốc) và tiếng 4 (F, bậc 3) là nốt hợp âm → không
bị phạt phách mạnh; ô trước kết ở C5 hay E5 (cách ≤ 2 nửa cung) thì chỗ nối cũng không bị phạt → ô này vào nhóm
tốt nhất. Cùng ô ấy đặt lên E7 (V) thì dời +1 bậc, và nốt bậc 3 của E7 về G# (hợp âm thắng gam).

#### 5. Dữ liệu để giải thích — đã có sẵn

Mỗi câu soạn ra có `compositionSources`, **mỗi ô một dòng**:
- `harmony`: vòng ghép từ đâu — vd `vòng dung-xa-em-dem-nay-intro hợp âm 1–7 + la-thu-tran-the-intro từ hợp âm 9`,
  hoặc `kết la-thu-tran-the-intro`;
- `melody`: giai điệu từ ô nào, dời mấy bậc, lên xuống mấy quãng tám — vd `rung-la-thap-outro ô 3, chuyển -3 bậc,
  +1 quãng tám`;
- `rhythm`: tiết tấu từ ô slow rock nào, có nắn nhịp không;
- `donorGenre`: `slow rock` hay `bolero (giai điệu) · slow rock (tiết tấu)`.

**Chưa có** (cần thêm khi dựng chức năng giải thích): nhãn cho **từng nốt** (nốt hợp âm / nốt gam / nốt hoá giữ lại /
nốt đã nắn về hợp âm), và điểm phạt của ô được chọn so với ô thua. Hai thứ này tính được ngay trong `datO` và vòng
chấm điểm, chỉ chưa ghi ra.

#### 6. Đệm hai tay (nút Slow Rock Lá thư hai tay) — biên soạn đã duyệt

Sóng rải móc đơn vắt hai tay, mở rộng rải c15 của chị ra hai quãng tám: tay trái tiếng 1 · 2 · 3 = gốc (ngân cả ô,
nhấn mạnh nhất) · 5 · 8; tay phải tiếng 4 · 5 · 6 = 10 · 12 · 10 (ô 1) rồi 12 · 10 · 8 (ô 2). Phách mạnh 1 và 4 theo
cách đếm của người dùng (6 phách móc đơn một ô). Điệp: gốc kèm quãng tám, đỉnh sóng kèm quãng tám trên. Không lấy từ
sheet (lúc hát chị chỉ rải tay trái) — **ý người dùng** + biên soạn của Claude.

**Chưa đo / chưa làm**: giọng trưởng slow rock chưa có sheet để đối chiếu (đang dời gam từ ô giọng thứ); hệ số phạt
chưa đo; lực đánh câu solo cố định (tay phải 76, tay trái 62); Linh Run và mốc chuyển đoạn chưa được người dùng
duyệt riêng.

---

## 14. Luật đã bị số đo lật — đừng khôi phục

### `rule-interlude-plain-harmony` → **rejected**

Luật cũ nói đoạn không lời phải rút hợp âm về tính chất cơ bản. Nó suy từ nguyên lý
chung, đặt lúc kho **chưa có bản ký âm của thầy nào**. Số đo 78% / 77% ở mục 2 đã lật
nó. Thay bằng `rule-linh-nhi-solo-giu-mau` (derived · draft · source null).

**Ý người dùng, thành chính sách chung:** *"Khi học theo tư duy của thầy nào thì phải ưu
tiên những luật trong sheet của thầy đó, và xoá bỏ những luật mình tự đặt trước khi học
từ sheet nếu chúng có xung đột."* Bỏ hẳn, **không dung hoà**.

### "Đoạn giang dùng lại vòng dạo" → **CÁCH ĐO sai, kết luận thì đúng**

Kết luận này lúc đầu rút ra bằng cách so **danh sách ký hiệu hợp âm** giữa hai đoạn. Cách
ấy sai: nó bỏ mất những ô không có ký hiệu, mà ở đó hợp âm trước vẫn còn vang — và đúng
những ô ấy lại nằm ở đầu đoạn (Biển Tình ô 52 = D, Mùa Xuân ô 63–64 = G). Người dùng đã
bác, đúng.

**Đo lại đúng cách** — trải ra từng ô, điền ô trống bằng hợp âm đang vang — thì kết luận
đứng, chỉ không tuyệt đối:

| bài | vòng hợp âm giang trùng dạo |
|---|---|
| Biển Tình | **100%** |
| Mùa Xuân | 88% |
| Lá Thư | 83% |
| Đừng Xa | 78% |
| Đường Xưa | 71% |
| Một Cõi | 44% |
| | **trung bình 77%** (n=6) |

Biển Tình trùng khít: vòng dạo `VI III II I VI II II I`, vòng giang là `I` + đúng dãy ấy
+ `V`. Ăn khớp với tuyến giai điệu cũng trùng 78% (mục 5) — giai điệu theo hợp âm.

Nên nói cho đúng: **giang tấu dùng lại vòng dạo khoảng ba phần tư, không phải y hệt.**
Cái từng bị bác là con số 100% và cách đo, không phải bản thân ý ấy.

---

## 15. Ý người dùng — không phải số đo

Ghi riêng để đừng lẫn với thứ đo được:

- **Câu solo chỉ lấy vật liệu từ sheet CÙNG ĐIỆU** (24/9/2026, sau khi nghe câu bolero đổi sang
  12/8 trong Slow Rock Lá thư): *"đừng lấy những phần từ câu solo của điệu khác rồi dồn ép vào,
  nghe quá tệ"* · *"nếu muốn lấy các phần từ câu solo trong sheet khác rồi điều chỉnh … thì phải
  lấy từ sheet nhạc cùng điệu"*. Quy luật soạn nốt thì học từ **mọi** sheet (13e); câu phải
  *"ko bị phô, bị trùng lặp hoặc ngắt quãng"*.
- Câu dạo phải **xen kẽ ô thưa với ô dày**.
- Hợp âm hút cuối câu dạo phải **tắt trước chỗ ca sĩ vào**.
- Khi train hay đổi một lối chơi, **dựng sau một ô tick nghe thử** thay vì thay thẳng
  bản đang có.
- **Ô 5 thưa 100%**, không phải 60% số lượt.

---

## 16. Ý kiến khi nghe — chuyển từ `Nguon.json`

**Đây là Ý NGƯỜI DÙNG, không phải số đo.** Đừng lẫn với các mục trên: mỗi dòng ở đây là
**n=1** — một lần nghe, một câu, một ý.

Người dùng nghe câu dạo trong KeyTrain rồi tick **Đã ổn** / **Chưa ổn** và viết ý kiến.
Sổ thô nằm ở `KeyTrain/Nguon.json`; skill `y-kien-intro` chuyển sang đây sau mỗi lần có ý
kiến mới. Số `#` là số câu trong sổ thô — người dùng nói "câu #7" là chỉ vào đó.

| # | lúc nghe | bài | giọng | chấm | ý kiến |
|---|---|---|---|---|---|
| **3** | 2026-09-04 16:32 | *(chưa đặt tên)* | La thứ | **Chưa ổn** | — *(tick, chưa viết lời)* |
| **7** | 2026-09-04 16:37 | *(chưa đặt tên)* | La thứ | **Chưa ổn** | *"sao các câu intro giờ lại mất hẳn kết hợp giữa hai tay trái phải rồi. Hãy đọc lại intro các sheet và học mức độ phối hợp 2 tay khi Linh Nhi đánh intro. Và bài đang đánh là ở giọng thứ, intro đã tạo vòng hợp âm trên giọng thứ chưa"* |
| **29** | 2026-09-06 02:54 | *(chưa đặt tên)* | **Đô trưởng** | **Chưa ổn** | *"câu intro có đoạn chạy nốt từ Dm11 qua Fadd2 nhưng nốt cuối câu chạy (đồng thời là nốt đầu của Fadd2) nghe vẫn lệch về cao độ, ko được hay như trong các intro giọng trưởng của Linh Nhi, chỗ Em7 qua G9sus4 cũng vậy. Chỗ G9sus4 gần cuối câu thì nốt lệch rất nhiều. Hãy đối chiếu với các intro Linh Nhi để sửa"* |

| **40** | 2026-09-06 03:15 | *(chưa đặt tên)* | **Đô trưởng** | **Chưa ổn** | *"câu này thì Gsus4 ở kế bên C nghe có nốt lệch. Hãy đối chiếu với luật sinh nốt và các intro trưởng Linh Nhi để sửa"* |

| **43** | 2026-09-06 03:32 | *(chưa đặt tên)* | **Đô trưởng** | **Chưa ổn** | *"chỗ Fadd2 nghe nhiều nốt lệch quá, đối chiếu luật soạn để điều chỉnh lại"* — kèm một nhận xét chung: *"chỗ Fadd2 trong vòng hợp âm là chỗ hay có nhiều nốt nghe lệch tai nhất dù chuyển qua bao nhiêu câu"* |
| **157** | 2026-09-06 17:59 | *Hoa Trinh Nữ* | **Đô trưởng** | **Đã ổn** | *(mẫu — không lời bình)* |
| **160** | 2026-09-06 18:01 | *Hoa Trinh Nữ* | **Đô trưởng** | **Đã ổn** | *(mẫu — không lời bình)* |
| **163** | 2026-09-06 18:13 | *Hoa Trinh Nữ* | **Đô trưởng** | **Đã ổn** | *(mẫu — không lời bình)* |
| **182** | 2026-09-06 19:53 | *(chưa đặt tên)* | **La thứ** | **Đã ổn** | *(mẫu — không lời bình)* · `bolero-linh-nhi-2` |
| **191** | 2026-09-07 01:41 | *(chưa đặt tên)* | **La thứ** | **Chưa ổn** | *"Nghe màu giai điệu còn tươi sáng quá"* · *"hãy đối chiếu và so sánh khắt khe câu này với các câu solo trong tất cả các sheet giọng thứ xem giai điệu có đủ tính chất man mác của giọng thứ chưa"* · khung **Bolero Tuấn** |
| **262** | 2026-09-07 03:32 | *(chưa đặt tên)* | **La thứ** | **Chưa ổn** | *"để đó"* · **giang** Bolero Tuấn · 13 ô |
| **272** | 2026-09-07 03:38 | *(chưa đặt tên)* | **La thứ** | **Chưa ổn** | *"có nốt gãy và phô"* · **giang** |
| **278** | 2026-09-07 03:39 | *(chưa đặt tên)* | **La thứ** | **Chưa ổn** | *"Có nốt gãy và phô"* · **giang** |
| **290** | 2026-09-07 03:50 | *(chưa đặt tên)* | **La thứ** | **Chưa ổn** | *"Có mấy chỗ bị gãy nốt (vd như ở Fadd2) hãy so sánh khắt khe với luật soạn nốt và các giang tấu sheet thứ để điều chỉnh"* · **giang** |
| **329** | 2026-09-08 08:13 | *(chưa đặt tên)* | **La thứ** | **Chưa ổn** | *"Nốt đầu cách qua lâu mới tới nốt kế tiếp"* · **intro** Bolero Tuấn · 9 ô |
| **333** | 2026-09-08 08:14 | *(chưa đặt tên)* | **La thứ** | **Chưa ổn** | *"Nghe giai điệu còn gãy quá"* · *"hãy đối chiếu và so sánh khắt khe câu này với các câu solo trong tất cả các sheet giọng thứ để soạn lại"* · **intro** |
| **337** | 2026-09-08 08:36 | *(chưa đặt tên)* | **La thứ** | **Chưa ổn** | *"các chỗ chuyển từ hợp âm thứ qua các hợp âm trưởng còn gãy nốt vì các hợp âm trưởng chơi còn tươi sáng quá, phải man mác buồn hơn. Đối chiếu khắt khe với các sheet thứ để chỉnh sửa bộ soạn lại"* · **intro** Bolero Tuấn · mẫu `Am G F C…` |
| **373** | 2026-09-08 12:26 | *Để Nhớ Một Thời Ta Đã Yêu* | **La thứ** | **Chưa ổn** | *"câu còn quá tươi sáng hãy học từ các câu solo sheet thứ để soạn ra màu man mác buồn của giọng thứ"* · **intro** Bolero Tuấn |
| **386** | 2026-09-08 13:24 | *Để Nhớ Một Thời Ta Đã Yêu* | **La thứ** | **Đã ổn** | *(mẫu — không lời bình)* · **intro** Bolero Tuấn |
| **393** | 2026-09-08 13:26 | *Để Nhớ Một Thời Ta Đã Yêu* | **La thứ** | **Chưa ổn** | *"đối chiếu với các câu intro và giang tấu trong các sheet giọng thứ để điều chỉnh phần đầu câu này còn tươi sáng quá"* · **intro** Bolero Tuấn |
| **395** | 2026-09-08 13:35 | *Để Nhớ Một Thời Ta Đã Yêu* | **La thứ** | **Chưa ổn** | *"tiết tấu phần đầu hay nên giữ lại nhưng nốt giai điệu ở phần sau (từ E) bị lặp và lủng củng, hãy đối chiếu với các câu solo sheet thứ để sửa lại"* · **intro** Bolero Tuấn |
| **406** | 2026-09-08 13:42 | *Để Nhớ Một Thời Ta Đã Yêu* | **La thứ** | **Đã ổn** | *(mẫu — không lời bình)* · **intro** Bolero Tuấn |
| **411** | 2026-09-08 14:01 | *Để Nhớ Một Thời Ta Đã Yêu* | **La thứ** | **Chưa ổn** | *"Ở hợp âm E đầu tiên (sau Am) tuy là hợp âm trưởng nhưng các nốt giai điệu lại nghe rất đúng màu giọng thứ, còn hai hợp âm trưởng đầu vòng là G và C thì nghe nốt giai điệu bị lệch và phô quá. Hãy đối chiếu với các câu solo giọng thứ và sửa lại"* · **intro** Bolero Tuấn |
| **412** | 2026-09-08 14:07 | *Để Nhớ Một Thời Ta Đã Yêu* | **La thứ** | **Chưa ổn** | *"cách đánh ở hợp âm Am đầu tiên khá hay nên giữ lại, sao các ô sau lại đánh thưa quá vậy, hãy đối chiếu với các câu solo trong sheets thứ và sửa lại"* · **intro** Bolero Tuấn |
| **426** | 2026-09-08 14:26 | *Để Nhớ Một Thời Ta Đã Yêu* | **La thứ** | **Chưa ổn** | *"câu này đã đạt màu giọng thứ rồi, chỉ có chỗ Dm đầu tiên bị nghỉ hơi lâu gây ảnh hưởng tiết tấu. Giữ câu này lại và đối chiếu với các sheet thứ để training thêm"* · **intro** Bolero Tuấn |

**Mẫu Đã ổn — tách giọng, học theo đúng cột. Đừng trộn trưởng vào thứ.**

| giọng | # | bài | n |
|---|---|---|---|
| **trưởng** | **#157 · #160 · #163** | *Hoa Trinh Nữ* | 3 |
| **thứ** | **#182** | *(chưa đặt tên)* | 1 |
| **thứ** | **#386 · #406** | *Để Nhớ Một Thời Ta Đã Yêu* | 2 · Bolero Tuấn |

> **Đã ổn** → bộ ba làm mẫu, xếp vào **16a trưởng** hoặc **16b thứ**. **Chưa ổn** → bộ ba chỉ khi có lời. Câu **#3** chỉ dòng bảng.

#### Câu #7 — bộ ba

**Vòng hợp âm** *(sổ thô chưa có cột `hopAm` lúc câu này được lưu; dựng lại từ vốn hợp âm
của bài — xem chú thích cuối mục)*

```
Am  Dm   G     C     F    E7  Am  Dm   E7
Im  IVm  ♭VII  ♭III  ♭VI  V   Im  IVm  V
```

Toàn bậc của giọng thứ, rút từ vốn hợp âm của chính bài, đóng trên bậc **V** — đúng luật
cửa vào hát. **Vòng không phải chỗ hỏng.**

**Nốt giai điệu**

```
ô1 P( 6): E4 A4 E4 A4 E4 A4                                        T: 2 mốc
ô2 P( 9): A4 C5 C5 C4 F4 A4 C5 A4 B4                               T: 3 mốc
ô3 P( 8): F4 F4 F4 E4 F4 E4 F4 E4                                  T: 5 mốc
ô4 P(10): B4 D4 D4 A4 B4 D4 G5 B4 A4 E4                            T: 5 mốc
ô5 P(12): E4 G4 E4 F4 E4 E4 F4 E4 G4 C4 D4 E4                      T: 2 mốc
ô6 P(10): B4 B4 C5 D5 E4 E5 E5 E5 E5 E5                            T: 5 mốc
ô7 P(11): C5 D4 E4 G4 E4 E4 A4 A4 A4 G4 A4                         T: 5 mốc
ô8 P( 6): G4 E4 G4 A4 E4 B4                                        T: 5 mốc
ô9 P( 2): E3 Ab3                                                   T: 1 mốc
```

**Ba số đối chiếu**

| | câu #7 | bản ký âm |
|---|---|---|
| tay phải | 8,2 nốt/ô | 6,9 |
| tay trái | 3,7 mốc/ô | 4,6 |
| tay trái gõ **một mình** | **21%** | **41%** |
| cao độ trung bình | G4 (67) | **D5 (73,6)** |

#### Câu #29 — bộ ba

**Vòng hợp âm** — Đô trưởng, 9 ô:

```
Cadd2  Am9  Dm11  Fadd2  Em7  G9sus4  Cadd2  G9sus4  G (hút)
I      vi   ii    IV     iii  V       I      V       V
```

Vòng đúng giọng, không có bậc mượn nào. **Chỗ người dùng chê không nằm ở hoà thanh mà ở
nốt giai điệu.**

**Nốt** — `P` tay phải là câu, `T` tay trái là nền:

```
ô1 Cadd2   P(5): E5 E4 G4 A4 C5                    T: 4 mốc
ô2 Am9     P(7): E5 D5 E4 C5 D5 E5 A4 D5           T: 4 mốc
ô3 Dm11    P(7): D5 C5 E4 D5 A4 G5 E5 D5           T: 8 mốc
ô4 Fadd2   P(6): B4 F4 A4 B4 C5 A4                 T: 9 mốc
ô5 Em7     P(7): G5 E5 G5 E4 A4 C5 E5              T: 4 mốc
ô6 G9sus4  P(3): G4 D4 C5                          T: 8 mốc
ô7 Cadd2   P(4): C5 E4 C5 D5                       T: 8 mốc
ô8 G9sus4  P(7): F#4 D5 C5 D4 A4 B4 C5 C#5 D5      T: 8 mốc
ô9 G (hút) P(1): G3 B3                             T: 1 mốc
```

**Ba số đối chiếu**

| | câu #29 | bản ký âm |
|---|---|---|
| tay phải | 5,2 nốt/ô | **5,5** *(giọng trưởng)* |
| tay trái | 6,0 mốc/ô | 6,8 |
| tay trái gõ **một mình** | 52% | 41% |
| cao độ trung bình | **70,6** (Bb4) | **73,6** (D5) |

Khác hẳn hai câu La thứ trước: mật độ tay phải **đã đúng** (5,2 so với 5,5), tay trái
không còn mỏng, và tỉ lệ gõ một mình còn **cao hơn** bản ký âm. Ba lỗi cũ đã hết. Cao độ
trung bình vẫn thấp hơn 3 nửa cung — chỗ này chưa xử.

**Ba chỗ người dùng chỉ đích danh — đo lại từng chỗ**

*(Đây là số đo trên chính câu #29, không phải suy đoán.)*

| chỗ | người dùng nói | đo được |
|---|---|---|
| Dm11 → Fadd2 (ô3→ô4) | nốt đầu Fadd2 lệch | ô3 đóng ở `D5`, ô4 **mở bằng `B4`** — `B` không thuộc `Fadd2` (F A C G) và cách gốc `F` đúng một **quãng ba tăng** |
| Em7 → G9sus4 (ô5→ô6) | cũng vậy | ô5 đóng `E5`, ô6 mở `G4` — `G` **có** trong hợp âm; chỗ lệch là **bước nhảy xuống 9 nửa cung**, không phải sai nốt |
| G9sus4 gần cuối (ô8) | lệch rất nhiều | ô8 mở bằng **`F#4`** và có **`C#5`** — **hai nốt duy nhất ngoài gam Đô trưởng trong cả câu**; trên `G9sus4` (G C D A F) thì `F#` chọi với `F` của chính hợp âm, `C#` là quãng ba tăng với `G` |

**Tai người dùng chỉ đúng chỗ nặng nhất.** Cả câu 52 nốt tay phải chỉ có **2 nốt ngoài
gam (3,8%)**, và **cả hai dồn vào đúng ô 8** — ô mà họ nói *"lệch rất nhiều"*.

> **CHỖ NÀY CHỎI VỚI SỐ ĐO, PHẢI GHI RA.** Luật 1 trong `LUAT-SOAN-NOT.md`: Linh Nhi để
> **1,8% nốt ngoài gam** trên 1045 nốt, và riêng câu dạo là **1,0%**. Câu #29 ra **3,8%**,
> gấp đôi tới gấp bốn — và tệ hơn con số: hai nốt ấy không rải ra mà **dồn cả vào một ô**,
> đúng cái ô người dùng nghe thấy hỏng.
>
> **Chưa xử.** Chưa truy ra F#4 và C#5 từ đâu ra — bảng tuyến chỉ chứa ô có thật của bài
> giọng trưởng, nên hoặc phép dịch giọng sai, hoặc ô ấy đến từ một chỗ khác. Sổ thô
> **không ghi lúc phát có bật ô tick "Bảng tuyến mới" hay không**, nên chưa biết lỗi thuộc
> bảng cũ hay bảng mới. Đó là chỗ phải soi trước tiên.

#### Câu #40 — và chỗ này TRUY RA ĐƯỢC NGUỒN

**Vòng hợp âm** — Đô trưởng, 9 ô, giống hệt câu #29 trừ ô 7:

```
Cadd2  Am9  Dm11  Fadd2  Em7  G9sus4  C   G9sus4  G (hút)
I      vi   ii    IV     iii  V       I   V       V
```

**Nốt**:

```
ô1 Cadd2   P(5):  A4 E4 G5 E4 G5                    T: 4 mốc
ô2 Am9     P(10): C5 A4 C5 B4 E4 C5 A4 E4 Ab4 A4    T: 4 mốc
ô3 Dm11    P(8):  D5 C5 D5 E4 E5 D5 C5 A4           T: 8 mốc
ô4 Fadd2   P(6):  B4 F4 A4 B4 C5 A4                 T: 9 mốc
ô5 Em7     P(6):  B4 A4 G5 E4 F5 D5                 T: 4 mốc
ô6 G9sus4  P(8):  F#4 D5 C5 D4 B4 C5 C#5 D5         T: 8 mốc
ô7 C       P(5):  A4 E4 G5 E4 G5                    T: 8 mốc
ô8 G9sus4  P(9):  D5 C5 A4 D4 A4 D5 F5 Ab4 A4       T: 8 mốc
ô9 G (hút) P(2):  G3 B3                             T: 1 mốc
```

| | câu #40 | bản ký âm |
|---|---|---|
| tay phải | 6,6 nốt/ô | 5,5 *(giọng trưởng)* |
| tay trái | 6,0 mốc/ô | 6,8 |
| tay trái gõ **một mình** | 48% | 41% |
| cao độ trung bình | 70,1 (Bb4) | **73,6** (D5) |
| **ngoài gam** | **6,8%** (4/59) | **1,0%** |

**Bốn nốt ngoài gam — và cả bốn truy ra được nguồn.**

Người dùng chỉ đích danh *"Gsus4 ở kế bên C"* — đó là ô 6. Ô ấy mở bằng `F#4` và có
`C#5`, hai nốt chọi thẳng với `G9sus4` (G C D A F): `F#` chọi với chính `F` của hợp âm,
`C#` là quãng ba tăng với `G`.

Truy ngược ra bảng tuyến thì thấy **chúng đến từ bảng CŨ `tuyenDaoLinhNhi.ts`**, và bảng
mới `tuyenSolo.ts` — sinh lại từ bản ký âm — **không có nốt nào trong số đó**:

| ô nguồn | phách | **bảng cũ** | **bảng mới** | nghe ra ở câu #40 |
|---|---|---|---|---|
| `duong-xua` ô7 *(bậc V)* | 0,00 | **6** = `F#` | **17** = `F` | ô6 `F#4` |
| `duong-xua` ô7 | 3,25 | **13** = `C#` | **12** = `C` | ô6 `C#5` |
| `mua-xuan` ô2 *(bậc vi)* | 3,25 | **8** = `Ab` | **4** = `E` | ô2 và ô8 `Ab4` |

Bảng mới đặt `F` và `C` ở đúng hai chỗ ấy — **cả hai đều là nốt của chính `G9sus4`**.

> **KẾT LUẬN.** Nốt mà người dùng nghe ra là lệch **không phải do bộ ghép chọn sai ô**, mà
> do **ô trong bảng cũ ghi sai nốt**. Điều này khớp với số đo đã có: bảng cũ chỉ khớp
> `data/sheet-solos` **118/276 nốt**, bảng mới **285/285** — xem đầu file `tuyenSolo.ts`.
>
> **Chưa xử, và cách xử đã có sẵn:** bật ô tick *"Bảng tuyến mới — sinh lại từ sheet"*
> rồi nghe lại đúng chỗ ô 6. Sổ thô `Nguon.json` **không ghi lúc phát ô tick bật hay
> tắt**, nên chưa chứng minh được bằng sổ; phải nghe rồi mới chốt.

#### Câu #43 — *"dù chuyển qua bao nhiêu câu"* là chỗ đắt nhất trong cả bốn ý kiến

Vòng hợp âm giống hệt câu #40. Nốt ô 4:

```
ô4 Fadd2  P(6): B4 F4 A4 B4 F4 C5
```

Hai nốt `B4` trên `Fadd2` — **quãng ba tăng với gốc**. Và ô ấy **mở đầu bằng `B4`**, đúng
chỗ người dùng đã chỉ ở câu #29 (*"nốt đầu của Fadd2"*).

**Đo trên cả 44 câu đã lưu** — đây là chỗ ý kiến người dùng dẫn tới một số đo lớn hơn
chính nó:

| hợp âm | số câu | số nốt | ngoài hợp âm | **nốt cách gốc nửa cung** |
|---|---|---|---|---|
| **Fadd2** | 16 | 101 | 33% | **33%** |
| **Gadd2** | 14 | 98 | 29% | **29%** |
| Cadd2 | 16 | 164 | 12% | 5% |
| Dadd2 | 19 | 208 | 10% | 2% |

Tách theo bậc so với gốc hợp âm thì lộ ra thủ phạm:

| | bậc hay dùng nhất |
|---|---|
| **app · `Fadd2`** (n=101) | **`♭5` 31%** · `3` 24% · `1` 22% · `5` 21% |
| **app · `Gadd2`** (n=98) | **`♭5` 29%** · `3` 29% · `5` 29% · `1` 14% |
| **bản ký âm · hợp âm trưởng** (n=305) | `3` 25% · `1` 21% · `5` 19% · `9` 11% · `13` 6% · `11` 6% · … · **`♭5` 2%** |

**App đặt quãng ba tăng nhiều gấp mười lăm lần chị ấy.** Đếm tuyệt đối: app **59 nốt**
trên 44 câu; bản ký âm **7 nốt** trên cả bảy bài — và 3 trong 7 nốt ấy đi vào và ra đều
bằng bước liền bậc, tức là nốt lướt chứ không phải nốt đậu.

Vì sao rơi vào `Fadd2` và `Gadd2` chứ không phải `Cadd2`: cả hai đều là **bậc IV** của bài
mình (Fadd2 trong Đô trưởng, Gadd2 trong Rê trưởng). Quãng ba tăng trên bậc IV chính là
**bậc 7 của gam** — một nốt diatonic, nên bộ ghép không thấy gì sai khi lấy nó. Trên bậc I
thì quãng ba tăng lại là `#4`, không có trong gam, nên không bao giờ được chọn.

> **HAI NGUYÊN NHÂN, ĐÃ VÁ CẢ HAI.** Xem `KeyTrain/reference/SO-TAY.md`.
>
> 1. **Vốn ô cạn.** Giọng trưởng bậc IV chỉ có **ĐÚNG MỘT** ô trong vốn đoạn dạo, và ô ấy
>    mang sẵn quãng ba tăng. Đó chính là chữ *"dù chuyển qua bao nhiêu câu"* — không có ô
>    thứ hai để chuyển sang. Đã mở vốn sang ô của **giang tấu và đoạn kết**: bậc IV thành
>    **8 ô, 6 trong đó sạch**.
> 2. **Phép lui về cùng chức năng.** Không có ô cùng bậc thì bộ ghép lui xuống cùng chức
>    năng, mà bậc ii và bậc IV cùng là "hạ át". Ô của bậc ii mang nốt bậc 7 của gam — trên
>    ii nó là `♭13`, nghe xuôi — đặt sang bậc IV thì thành quãng ba tăng. Nay ô được chấm
>    bằng **hợp âm thật nó sắp đứng lên**, không chỉ bằng bậc.
>
> Đo lại sau khi vá: `♭5` trên hợp âm `add2` **31% → 4%** (bản ký âm 2%), **không còn nốt
> nào mở đầu ô** (trước 47%), và ô `Fadd2` ra **6 câu khác nhau trên 12 lượt**.

**Ba số của câu #43** — cả ba đã đạt, chỉ còn tầm âm: tay phải 5,3 nốt/ô (bản ký âm 5,5) ·
tay trái 6,1 mốc/ô · gõ một mình **51%** (bản ký âm 41%) · cao độ trung bình **70,0** so
với **73,6**.

### 16a. Mẫu Đã ổn — giọng trưởng

Học câu trưởng mới thì đối chiếu đây. **Không** lấy #182.

#### Câu #157 — bộ ba *(mẫu Đã ổn)*

**Vòng** — Đô trưởng, 9 ô, tick trơn chất + hút:

```
C   Am  Em  G   C   Em  C   G   G (hút)
I   vi  iii V   I   iii I   V   V
```

**Nốt**

```
ô1 P(12): C4 E4 G4 C4 E4 G4 C4 E4 G4 C4 E4 G4     T: 3
ô2 P(13): A4 C5 C5 A4 E4 G4 A4 G4 F4 A4 E4 A4 B4  T: 2
ô3 P(10): G4 E4 G4 A4 D4 E4 E5 D5 C5 A4           T: 6
ô4 P(12): D4 G4 B4 D4 G4 B4 D4 G4 B4 D4 G4 B4     T: 3
ô5 P( 2): E5 E4                                   T: 6
ô6 P(10): G4 E4 G4 A4 D4 E4 E5 D5 C5 A4           T: 6
ô7 P(12): C4 E4 G4 C4 E4 G4 C4 E4 G4 C4 E4 G4     T: 3
ô8 P( 8): F5 D5 C5 D4 B4 C5 C5 D5                 T: 6
ô9 P( 2): G3 B3                                   T: 1
```

| | #157 | bản ký âm dạo trưởng |
|---|---|---|
| tay phải | 9,0 nốt/ô | 5,6 tuyến / 6,8 mọi nốt |
| tay trái | 4,0 mốc/ô | 6,8 |
| tay trái một mình | **50%** | **49%** |
| tâm RH | 66,8 | **75,3** |

#### Câu #160 — bộ ba *(mẫu Đã ổn)*

Cùng vòng với #157.

```
ô1 P(12): C4 E4 G4 C4 E4 G4 C4 E4 G4 C4 E4 G4     T: 3
ô2 P(11): E4 G5 E5 E4 D5 C5 G4 B4 A4 A4 E5        T: 2
ô3 P( 7): G5 E5 G5 E4 A4 C5 E5                    T: 6
ô4 P(12): D4 G4 B4 D4 G4 B4 D4 G4 B4 D4 G4 B4     T: 3
ô5 P( 2): E5 E4                                   T: 6
ô6 P(10): G4 E4 G4 A4 D4 E4 E5 D5 C5 A4           T: 6
ô7 P(12): C4 E4 G4 C4 E4 G4 C4 E4 G4 C4 E4 G4     T: 3
ô8 P( 8): D5 A4 C5 D4 A4 F5 Ab4 A4                T: 6
ô9 P( 2): G3 B3                                   T: 1
```

| | #160 | bản ký âm dạo trưởng |
|---|---|---|
| tay phải | 8,4 nốt/ô | 5,6 / 6,8 |
| tay trái | 4,0 mốc/ô | 6,8 |
| tay trái một mình | **50%** | **49%** |
| tâm RH | 67,4 | **75,3** |

Tai chấp nhận hai câu này (**ý người dùng**). Số đo: LH một mình khớp 49%; tâm thấp hơn chị ~8 nửa cung; ô 1·4·7 là rải 1-3-5 (Pùng-Pắp A), không phải tuyến giai điệu. **Chưa xử** — mẫu, không phải luật mới.

#### Câu #163 — bộ ba *(mẫu Đã ổn)*

Cùng vòng với #157.

```
ô1 P(12): C4 E4 G4 C4 E4 G4 C4 E4 G4 C4 E4 G4     T: 3
ô2 P(11): E4 G5 E5 E4 D5 C5 G4 B4 A4 A4 E5        T: 2
ô3 P(10): G4 E4 G4 A4 D4 E4 E5 D5 C5 A4           T: 6
ô4 P(12): D4 G4 B4 D4 G4 B4 D4 G4 B4 D4 G4 B4     T: 3
ô5 P( 6): G5 C5 E4 E5 G5 C5                       T: 6
ô6 P( 8): B4 G4 B4 E4 G4 A4 A4 C5                 T: 7
ô7 P(12): C4 E4 G4 C4 E4 G4 C4 E4 G4 C4 E4 G4     T: 3
ô8 P( 7): E5 C5 D5 A4 D4 G4 G4                    T: 6
ô9 P( 2): G3 B3                                   T: 1
```

| | #163 | bản ký âm dạo trưởng |
|---|---|---|
| tay phải | 8,9 nốt/ô | 5,6 / 6,8 |
| tay trái | 4,1 mốc/ô | 6,8 |
| tay trái một mình | **41%** | **49%** |
| tâm RH | 67,3 | **75,3** |

Tai chấp nhận (**ý người dùng**, n=3 cùng bài). LH một mình 41% — dưới sheet 49% và dưới #157/#160 (50%). Tâm vẫn thấp ~8 nửa cung. Ô 1·4·7 vẫn rải 1-3-5. **Chưa xử.**

### 16b. Mẫu Đã ổn — giọng thứ

Học câu thứ mới thì đối chiếu đây. **Không** lấy #157/#160/#163.

| # | lúc nghe | bài | giọng | chấm | ý kiến |
|---|---|---|---|---|---|
| #544 | 14:57 | Để Nhớ Một Thời Ta Đã Yêu | A thứ | Đã ổn | — (mẫu) |

#### Câu #182 — bộ ba *(mẫu Đã ổn, giọng thứ)*

**Vòng** — La thứ, 9 ô, `bolero-linh-nhi-2`:

```
Am(add9)  Fadd2  Dm9  G9    Cadd2  E9sus4  Am(add9)  E9sus4  E (hút)
i         ♭VI    iv   ♭VII  ♭III   V       i         V       V
```

Toàn bậc giọng thứ, đóng V. Khác mẫu Đừng Xa (i–♭VII–♭VI). **Ý người dùng:** tai ổn.

**Nốt**

```
ô1 P(13): E4 C5 C5 B4 A4 G4 F4 E4 D4 E4 F4 G4 A4  T: 1
ô2 P( 6): E5 C5 E4 E5 D4 A4                       T: 2
ô3 P(12): F4 A4 C5 F4 A4 C5 F4 A4 C5 F4 A4 C5     T: 3
ô4 P(12): B4 D5 D4 G4 C5 E4 B4 D5 E5 F#5 E5 D5    T: 5
ô5 P(12): E4 D4 C5 B4 D4 E4 D4 C5 D4 B4 D4 E4     T: 2
ô6 P(12): C4 E4 A4 C4 E4 A4 C4 E4 A4 C4 E4 A4     T: 3
ô7 P( 9): Ab4 Ab4 Ab4 A4 D4 E4 B4 B4 D5           T: 6
ô8 P( 8): F5 F5 F5 E4 F5 E5 F5 D4                 T: 6
ô9 P( 2): E3 Ab3                                  T: 1
```

| | #182 | bản ký âm dạo thứ |
|---|---|---|
| tay phải | 9,6 nốt/ô | **6,9** |
| tay trái | 3,2 mốc/ô | **4,6** |
| tay trái một mình | **48%** | **41%** |
| tâm RH | 67,9 | **73,2** (n=4 bài / 239 nốt) |

Tai chấp nhận (**ý người dùng**, n=1 thứ). RH dày hơn sheet; LH mỏng; tâm thấp ~5 nửa cung. Ô 3 rải F–A–C; ô 6 rải C–E–A. F#5 ô 4 trên G9 = bậc 7 gam (nốt cảm / 9 của G) — trong GAM_THU. **Chưa xử** — mẫu, n=1.

#### Câu #386 — bộ ba *(mẫu Đã ổn, Bolero Tuấn, giọng thứ)*

**Vòng**

```
Am  G     C     Dm  F     E  Am  E
i   ♭VII  ♭III  iv  ♭VI   V  i   V
```

**Nốt**

```
ô1 P( 8): C5 A4 G4 E4 D4 E4 E4 C5                    T: 2
ô2 P( 6): E5 E5 D5 D4 B4 G4                          T: 2
ô3 P( 7): E5 D5 E5 E4 C5 D4 E4                       T: 6
ô4 P( 6): F4 A4 D5 D4 C5 F4                          T: 6
ô5 P( 4): A4 A4 A4 A4                                T: 3
ô6 P(14): B4 E4 B4 D5 E4 Ab4 E4 E5 E5 E4 E5 E5 E4 Ab4 T: 2
ô7 P( 9): A4 D5 E4 A4 C5 A4 A4 D5 A4                 T: 6
ô8 P( 6): E5 D5 D5 E4 D5 E5                          T: 2
ô9 P( 2): E3 Ab3                                     T: 1
```

RH/ô **6,9** (= sheet 6,9) · LH/ô 3,3 · LH một mình **40%** (sheet 41%) · tâm 69,1.

**Ý người dùng:** tai ổn (n=1 Tuấn thứ). Số đo: mật độ RH và LH một mình khớp sheet dạo thứ.

#### Câu #406 — bộ ba *(mẫu Đã ổn, Bolero Tuấn, giọng thứ)*

```
Am  C     Dm  Bm  E  Am  C     E
i   ♭III  iv  ii  V  i   ♭III  V
```

```
ô1 P(12): C4 E4 A4 C4 E4 A4 C4 E4 A4 C4 E4 A4        T: 3
ô2 P( 6): E5 D5 C5 A4 G4 E4                          T: 2
ô3 P( 6): C5 F4 D4 A4 D5 C5                          T: 6
ô4 P(12): D4 F#4 B4 D4 F#4 B4 D4 F#4 B4 D4 F#4 B4    T: 3
ô5 P( 9): Ab4 E4 Ab4 D4 E4 B4 D5 Ab4 E4              T: 6
ô6 P( 8): A4 E4 A4 E4 C5 E5 A4 E4                    T: 6
ô7 P(12): C4 E4 G4 C4 E4 G4 C4 E4 G4 C4 E4 G4        T: 3
ô8 P( 7): B4 E4 Ab4 E4 B4 E4 Ab4                     T: 6
ô9 P( 2): E3 Ab3                                     T: 1
```

RH/ô 8,2 · LH một mình 50% · tâm 66,2. **Ý người dùng:** tai ổn.

#### Câu #544 — bộ ba *(mẫu Đã ổn, Bolero Tuấn, giọng thứ)*

```
Am  Dm  Am  Dm  Am  Dm  Am  E
i   iv  i   iv  i   iv  i   V
```

```
ô1 P( 7): D5 C5 G5 E5 C5 E4 C5                    T: 1
ô2 P(12): D4 F4 A4 D4 F4 A4 D4 F4 A4 D4 F4 A4     T: 5
ô3 P( 7): D5 C5 B4 G5 E5 C5 E4                    T: 3
ô4 P(11): E4 E4 D4 E4 F4 D4 G4 F4 F4 E4 D4        T: 6
ô5 P(12): C4 E4 A4 C4 E4 A4 C4 E4 A4 C4 E4 A4     T: 5
ô6 P(10): C5 C5 F4 A4 C5 D4 E5 D5 E5 G5           T: 6
ô7 P(10): D5 C5 B4 E4 C5 B4 G5 D5 E5 C5           T: 6
ô8 P( 7): B4 B4 C5 E4 B4 Ab4 Ab4                  T: 2
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **8,7** · LH/ô 3,9 · LH một mình **51%** · tâm RH **68,1**.

**Ý người dùng:** Đã ổn, không kèm lời bình. Đây là mẫu mới quan trọng: vòng i–iv rất
đơn giản vẫn được tai chấp nhận; ô 1 là giai điệu, ô 2 chuyển sang nắm Pùng-Pắp. So với
#538 cùng vòng, độ hay nằm ở chính đường nốt và cách nối ô, không nằm ở tên hợp âm.

#### Câu #191 — bộ ba *(Chưa ổn, Bolero Tuấn, giọng thứ)* — **không phải mẫu**

**Vòng**

```
Am  G     F     C     Dm  Am  E  E
i   ♭VII  ♭VI   ♭III  iv  i   V  V
```

Đúng mẫu buồn i–♭VII–♭VI (Đừng Xa). Cửa V.

**Nốt**

```
ô1 P(11): C5 D5 E5 F5 G5 F5 E5 D5 C5 B4 A4        T: 1
ô2 P(12): D4 G4 B4 D4 G4 B4 D4 G4 B4 D4 G4 B4     T: 3
ô3 P(11): C5 E4 C5 C5 A4 C5 A4 G4 F4 E4 D4        T: 5
ô4 P( 8): G5 F5 E5 F5 E4 C5 G5 E5                 T: 6
ô5 P(12): F4 A4 D5 F4 A4 D5 F4 A4 D5 F4 A4 D5     T: 3
ô6 P( 9): B4 A4 G4 E4 C5 E4 G4 A4 E4              T: 6
ô7 P( 6): B4 E4 C5 E4 Ab4 B4                      T: 6
ô8 P( 0):                                         T: 3
ô9 P( 2): E3 Ab3                                  T: 1
```

| | #191 | bản ký âm dạo thứ |
|---|---|---|
| tay phải | 7,9 nốt/ô | **6,9** |
| tay trái | 3,8 mốc/ô | **4,6** |
| tay trái một mình | **47%** | **41%** |
| tâm RH | 69,3 | **73,2** |
| bậc 3 trưởng / 6 trưởng | **0 / 71** | — |

**Ý người dùng:** giai điệu còn tươi, chưa man mác so với sheet thứ.

**Số đo so sheet intro thứ (n=7 bài, 3 thầy):** sheet **0** chuỗi lên ≥5 nốt; #191 có **1** (C–D–E–F–G). Lặp sheet 4–16%; #191 **1%**. 0/71 bậc 3 trưởng. Tai chê tươi vì chuỗi lên + rải 1-3-5 G/F.

**Đã train 7/9/2026 (sau khi người dùng hỏi):** phạt ô chuỗi lên ≥5 và ô rải trưởng lặp; intro/giang thứ Tuấn chỉ câu chạy **4 nốt xuống** (không 10 nốt lên). n=1 tai → hỏi rồi mới sửa.

### 16d. Intro Bolero Tuấn — Chưa ổn (8/9/2026)

Cùng vòng 8 ô + hút, **không** mẫu Đã ổn. `hopAm` có màu (`Am7 F Dm7 G7 C E7`) — không phải mẫu tick sheet thứ (Am G F…).

```
Am7  F     Dm7  G7    C     E7  Am7  E7
i    ♭VI   iv   ♭VII  ♭III  V   i    V
```

| | #329 | #333 | dạo thứ sheet |
|---|---|---|---|
| RH nốt/ô | 5,2 | 4,8 | **6,9** |
| LH mốc/ô | 3,7 | 3,8 | **4,6** |
| LH một mình | 58% | 76% | **41%** |
| tâm RH | 67,9 | 69,0 | **73,2** |

**Ý người dùng:** #329 nốt đầu cách lâu; #333 còn gãy, xin so sheet thứ.

**Đã train 8/9/2026:** sheet intro thứ n=8, ô1 **≥6 nốt**, gap 0,25–1,0. #329 ô1 n=2 gap=2. Phạt ô đầu <6 nốt / gap≥1,5; ô giữa <3 nốt. n=2 tai.

**#337** vòng mẫu `Am G F C Dm Am E` (tick sheet thứ). Ô 2 G / 3 F / 4 C = trưởng trong bài thứ.

#### #337 — trưởng trong bài thứ còn tươi

```
ô1 P( 8): C5 A4 G4 E4 D4 E5 C5 E4                    T: 2
ô2 P( 6): E4 B4 D4 D4 G4 E4                          T: 2
ô3 P( 1): D4                                         T: 3
ô4 P( 3): D4 E4 E4                                   T: 6
ô5 P( 9): A4 D4 D4 A4 D4 D4 C5 D4 A4                 T: 2
ô6 P(11): C5 D5 E5 G5 C5 E4 A4 C5 A4 A4 G5           T: 2
ô7 P( 8): D4 B4 B4 B4 E4 Ab4 E4 D4                   T: 6
ô8 P( 6): E5 E4 E4 E5 D5 Ab4                         T: 6
ô9 P( 2): E3 Ab3                                     T: 1
```

RH/ô 6,0 · LH/ô 3,3 · LH một mình 53% · tâm 67,3.

**Đã train:** phạt ô ≥70% nốt 1-3-5 của hợp âm trưởng khi giọng thứ (`gopThay`). n=1 tai.

Số đo: RH **mỏng hơn** sheet (5,2 / 4,8 vs 6,9) — khớp tai «cách lâu» ở ô 1 #329 (`E5 E4` rồi nghỉ). Tâm thấp ~4–5 nửa cung. LH một mình #333 **76%** vs sheet 41% — hai tay rời hơn, không phải dính.

#### #329 — nốt đầu cách lâu

```
ô1 P( 2): E5 E4                                      T: 2
ô2 P( 5): C5 A4 G4 F4 D4                             T: 2
ô3 P( 7): A4 A4 A4 A4 D4 A4 A4                       T: 6
ô4 P(10): D4 D5 D4 D5 D4 B4 G5 G5 A4 G4              T: 2
ô5 P( 6): E5 G5 A4 E4 E5 G4                          T: 6
ô6 P( 3): D4 E4 E4                                   T: 6
ô7 P( 6): A4 D4 E4 A4 C5 A4                          T: 2
ô8 P( 6): B4 B4 E4 Ab4 F#4 Ab4                       T: 6
ô9 P( 2): E3 Ab3                                     T: 1
```

#### #333 — còn gãy; xin so sheet thứ

```
ô1 P( 5): E5 D5 C5 A4 G4                             T: 2
ô2 P( 2): C5 C5                                      T: 3
ô3 P( 7): A4 A4 A4 A4 D4 A4 A4                       T: 2
ô4 P( 4): B4 D4 D5 G4                                T: 6
ô5 P( 3): D4 E4 E4                                   T: 6
ô6 P(12): D5 Ab4 B4 E5 E5 E4 E5 E5 E5 D5 Ab4 B4      T: 2
ô7 P( 2): E5 E4                                      T: 6
ô8 P( 6): B4 B4 E4 Ab4 F#4 Ab4                       T: 6
ô9 P( 2): E3 Ab3                                     T: 1
```

#### #373 — còn tươi; xin học sheet thứ

```
Am  G     F     C     Dm  Am  E   E
i   ♭VII  ♭VI   ♭III  iv  i   V   V
```

```
ô1 P( 9): A4 E4 A4 G4 E4 D4 E4 A4 E4                 T: 2
ô2 P( 4): A4 A4 D4 F4                                T: 2
ô3 P( 2): C5 C5                                      T: 3
ô4 P( 8): C5 D5 E5 G5 E4 D5 E5 E4                    T: 6
ô5 P( 9): D4 C5 D4 D5 D4 D4 A4 D4 D5                 T: 2
ô6 P( 9): C5 C5 C5 C5 E4 C5 C5 C5 C5                 T: 2
ô7 P( 8): Ab4 Ab4 Ab4 D4 E4 B4 B4 D5                 T: 6
ô8 P( 1): E4                                         T: 6
ô9 P( 2): E3 Ab3                                     T: 1
```

RH/ô 5,8 · LH/ô 3,3 · LH một mình 57% · tâm 68,0.

**Ý người dùng:** cùng «tươi» với #191 #337, sau khi đã ghép tiết tấu từ thứ Đã ổn ≥#207. Chưa train thêm — n=1 tai. Ô4 C: C–E–G trên ♭III.

#### #393 — đầu câu còn tươi

```
Am  G     C     Am  E  Am  G     E
i   ♭VII  ♭III  i   V  i   ♭VII  V
```

```
ô1 P( 8): C5 G5 E5 D5 C5 A4 E4 C5                    T: 2
ô2 P( 6): E5 E4 E5 D4 A4 E5                          T: 2
ô3 P( 8): G5 E5 C5 E4 G5 E5 G5 E5                    T: 2
ô4 P(12): E5 C5 C5 E5 C5 C5 E4 E5 C5 C5 E5 C5        T: 6
ô5 P(13): B4 E4 E4 E4 Ab4 B4 E4 B4 E4 E4 Ab4 E4 B4   T: 2
ô6 P( 4): C5 A4 A4 E4                                T: 2
ô7 P( 2): A4 D4                                      T: 6
ô8 P(12): B4 E4 Ab4 B4 E4 Ab4 E4 B4 E4 Ab4 B4 E4     T: 2
ô9 P( 2): E3 Ab3                                     T: 1
```

RH/ô 7,4 · LH/ô 2,8 · LH một mình 40% · tâm 69,6.

**Ý người dùng:** «phần đầu còn tươi» — cùng #191 #337 #373. Ô1 C5–G5–E5; ô3 G–E–C trên ♭III. Đã train ô1 ♭III.

#### #395 — sau E lặp / lủng củng; giữ tiết tấu đầu

```
Am  E  Dm  Am  G     Dm  Am  E
i   V  iv  i   ♭VII  iv  i   V
```

```
ô1 P( 9): C5 A4 C5 A4 G4 E4 D4 D4 C5                 T: 2
ô2 P( 6): B4 E4 Ab4 E4 B4 B4                         T: 2
ô3 P( 8): F4 A4 D5 D4 C5 F4 A4 D5                    T: 6
ô4 P(10): C5 G5 E5 C5 E4 E4 C5 G5 E5 C5              T: 6
ô5 P(11): B4 E4 E4 A4 B4 D4 B4 E4 E4 A4 B4           T: 2
ô6 P( 6): D4 A4 D4 D4 D4 D4                          T: 2
ô7 P( 2): A4 E4                                      T: 6
ô8 P( 3): E4 E5 D4                                   T: 2
ô9 P( 2): E3 Ab3                                     T: 1
```

RH/ô 6,3 · LH một mình 55% · tâm 67,6.

**Ý người dùng:** giữ tiết tấu đầu; từ ô2 (E) nốt lặp/lủng. Số đo: ô6 lap 60% (4×D), ô7 n=2. Sheet intro thứ ô2+ lap tb **9,4%** (n=56 ô), 0 ô giữa n<3.

#### #411 — G/C phô; E (V) đúng màu thứ

```
Am  G     C     Am  E  Am  Dm  E
i   ♭VII  ♭III  i   V  i   iv  V
```

```
ô1 P( 9): C5 A4 G4 E4 D4 E4 E4 C5 D4                 T: 2
ô2 P( 5): B4 G5 G5 D4 E5                             T: 2
ô3 P( 6): E5 G5 A4 E4 E5 G4                          T: 6
ô4 P( 4): E5 E4 C5 C5                                T: 6
ô5 P( 5): B4 E4 E4 Ab4 B4                           T: 2
ô6 P( 4): A4 C5 E4 C5                                T: 6
ô7 P( 5): F4 D4 A4 D5 C5                             T: 6
ô8 P( 6): E5 E4 E4 E5 D5 Ab4                         T: 2
ô9 P( 2): E3 Ab3                                     T: 1
```

RH/ô 5,1 · LH một mình 48% · tâm 68,8.

**Ý người dùng:** E (V) đúng màu thứ (Ab = nốt cảm); G/C rải 1-3-5 phô. Sheet ♭VII rai 50–67%, ♭III 57–75% (n=5 intro LN). #411 G 80% · C 83%.

#### #412 — ô1 ổn; ô sau thưa

```
Dm  F     E  Am  Dm  E  Am  E
iv  ♭VI   V  i   iv  V  i   V
```

```
ô1 P(13): C5 D5 A4 D5 C5 D5 C5 B4 A4 G4 G5 A4 C5     T: 2
ô2 P( 3): C5 C5 C5                                   T: 3
ô3 P( 3): D5 E4 E5                                   T: 2
ô4 P( 4): E5 C5 E4 E4                                T: 6
ô5 P( 5): A4 A4 D4 C5 A4                             T: 6
ô6 P( 6): B4 B4 E4 Ab4 F#4 Ab4                       T: 2
ô7 P( 5): C5 E4 C5 E4 E4                             T: 6
ô8 P( 9): E5 E4 E4 E4 E5 E4 D5 Ab4 E4                T: 3
ô9 P( 2): E3 Ab3                                     T: 1
```

RH/ô 5,6. Ô2–3 n=3. Sheet intro thứ ô2 tb **7,9** min 5; ô3 tb **8,4** min 7 (n=8 bài).

**Ý người dùng:** giữ ô đầu; ô sau thưa.

#### #426 — màu thứ đạt; Dm đầu nghỉ lâu

```
Dm  F     E  Am  Dm  E  Am  E
iv  ♭VI   V  i   iv  V  i   V
```

Ô1 Pùng-Pắp at **0,5** (D–F–A ×4). Sheet intro thứ **7/8** at0=0; chỉ Lá Thư at 0,5 (n=8).

**Ý người dùng:** giữ màu; train nghỉ đầu ô1.

### 16e. Intro Bolero Tuấn — Chưa ổn (9/9/2026)

Nguồn: `KeyTrain/Nguon.json`, quét tay lúc 14:27 (UTC+7). Bốn câu dưới nằm trong cửa
30 phút và chưa có trong sổ. Đây là **ý người dùng**, không phải kết luận từ số đo.

| # | lúc nghe | bài | giọng | chấm | ý kiến |
|---|---|---|---|---|---|
| #524 | 14:04–14:06 | Để Nhớ Một Thời Ta Đã Yêu | A thứ | Chưa ổn | Nốt quá dở và phô, không hề có màu thứ, còn tệ hơn bản OpenCode; yêu cầu đối chiếu khắt khe các câu solo trong sheet giọng thứ và sửa lại. Có thêm một bình luận là toàn bộ lời *Chuyến Tàu Hoàng Hôn*, chép nguyên văn bên dưới. |
| #526 | 14:15 | — | A thứ | Chưa ổn | Giai điệu quá dở và phô, thua các câu OpenCode; yêu cầu so sánh kỹ và khắt khe với solo sheet giọng thứ để cải thiện. |
| #528 | 14:16 | — | A thứ | Chưa ổn | Giai điệu gần được; yêu cầu so sánh kỹ và khắt khe với solo sheet giọng thứ để cải thiện. |
| #530 | 14:17 | — | A thứ | Chưa ổn | Giai điệu quá dở; yêu cầu so sánh kỹ và khắt khe với solo sheet giọng thứ để cải thiện. |

#### Câu #524 — bộ ba

```
Am  G     C      Am  Em  Am  Dm  E
i   ♭VII  ♭III   i   v   i   iv  V
```

```
ô1 P( 9): E5 C5 E5 D5 E5 G5 C5 E5 A4              T: 2
ô2 P(12): D4 G4 B4 D4 G4 B4 D4 G4 B4 D4 G4 B4     T: 3
ô3 P(10): B4 E4 E5 D5 E4 E5 D4 G4 C5 E4           T: 4
ô4 P(11): C5 D4 E4 G4 C5 E4 A4 C5 A4 A4 G4        T: 6
ô5 P(12): G4 B4 E5 G4 B4 E5 G4 B4 E5 G4 B4 E5     T: 3
ô6 P(11): C5 D5 E5 G5 C5 E4 A4 C5 A4 A4 G5        T: 6
ô7 P( 8): B4 E5 D5 G5 F4 D4 A4 A4                 T: 6
ô8 P( 3): B4 E4 Ab4                                T: 2
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **8,7** · LH/ô 3,7 · LH một mình **33%** · tâm RH **69,7**.

Bình luận thứ hai của #524, chép nguyên văn (đây là lời bài, không phải nhận xét về câu):

> 1. Chiều [Am] nao, tiễn nhau [E7] đi khi bóng ngả xế [Am] tàn
> Hoàng [Dm] hôn đến đâu [G] đây màu tím dâng trong hồn [C] ta
> Muốn không gian đừng [Dm] trôi, níu đôi chân thời [F] gian
> Ngừng trôi cho giây [A7] phút chia ly này kéo [Dm] dài
> Trước khi phân [F] kỳ, ước sao cho [E7] tàu đừng [Am] đi
>
> ĐK: Xe lăn êm [F] êm lúc ga [G] chiều sắp lên [C] đèn
> Mưa thu bay [E7] bay vắt ngang trời ướt vai [Am] mềm
> [G] Hoàng hôn dần [C] buông
> Mà ai còn [F] đứng im trong chiều sương [E7] xuống
>
> Tâm tư cô [F] đơn trách con [G] tàu nỡ sao [C] đành
> Đem yêu thương [E7] đi đến nơi nao cách đôi [Am] tình
> [G] Đường bao nhịp [C] nối
> Tình trăm nghìn [F] mối trông theo [E7] một bóng [Am] người
>
> 2. Tà [Am] dương khuất trong [E7] sương là mỗi lần ngóng [Am] chờ
> Nhìn [Dm] theo phía chân [G] mây đợi chuyến xe xưa về [C] chưa
> Nếu hay chăng người [Dm] ơi, chốn xa xôi chàng [F] trai
> Còn đem yêu thương [A7] rắc lên muôn vạn oán [Dm] hờn
> Nếu mai đây [F] về cũng trên chuyến [E7] tàu hoàng [Am] hôn.

#### Câu #526 — bộ ba

```
Am  G     C      Am  Em  Am  Dm  E
i   ♭VII  ♭III   i   v   i   iv  V
```

```
ô1 P( 8): E4 C5 C5 C5 A4 E5 C5 D5                 T: 1
ô2 P(12): D4 G4 B4 D4 G4 B4 D4 G4 B4 D4 G4 B4     T: 3
ô3 P(10): B4 E4 E5 D5 E4 E5 D4 G4 C5 E4           T: 4
ô4 P( 7): C5 C5 G4 B4 G4 E4 G4                    T: 6
ô5 P(12): G4 B4 E5 G4 B4 E5 G4 B4 E5 G4 B4 E5     T: 3
ô6 P(11): C5 D5 E5 G5 C5 E4 A4 C5 A4 A4 G5        T: 6
ô7 P( 8): B4 E5 D5 G5 F4 D4 A4 A4                 T: 6
ô8 P( 3): B4 E4 Ab4                                T: 2
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **8,1** · LH/ô 3,6 · LH một mình **41%** · tâm RH **69,4**.

#### Câu #528 — bộ ba

```
Am  Dm  F     E7  Am  Dm  Am  E
i   iv  ♭VI   V7  i   iv  i   V
```

```
ô1 P( 8): C5 D5 E5 G5 E5 C5 E4 G5                 T: 1
ô2 P( 8): A4 A4 A4 A4 D4 A4 B4 A4                 T: 2
ô3 P(12): A4 C5 F5 A4 C5 F5 A4 C5 F5 A4 C5 F5     T: 3
ô4 P(10): Ab4 D4 A4 B4 D4 A4 B4 D5 Ab4 E5         T: 1
ô5 P(11): C5 D5 E5 G5 C5 E4 A4 C5 A4 A4 G5        T: 6
ô6 P(12): D4 F4 A4 D4 F4 A4 D4 F4 A4 D4 F4 A4     T: 3
ô7 P( 6): A4 E4 A4 E4 A4 A4                       T: 6
ô8 P( 7): B4 E4 E4 E4 E4 Ab4 E4                   T: 2
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **8,4** · LH/ô 2,8 · LH một mình **36%** · tâm RH **69,1**.

#### Câu #530 — bộ ba

```
Am  E7  Dm  Am  Gm     Dm  Am  E
i   V7  iv  i   ♭viim  iv  i   V
```

```
ô1 P( 8): E4 C5 C5 C5 A4 E5 C5 D5                 T: 1
ô2 P( 9): Ab4 A4 B4 A4 E4 Ab4 F4 E4 D4             T: 2
ô3 P(10): B4 E5 D5 G5 F4 D4 E5 D5 F5 A4           T: 3
ô4 P(12): C4 E4 A4 C4 E4 A4 C4 E4 A4 C4 E4 A4     T: 3
ô5 P( 6): E5 B4 D4 D5 G4 E4                       T: 6
ô6 P(12): E4 D4 C5 E5 D4 D4 E4 D4 F4 A4 D4 D5     T: 2
ô7 P(12): C4 E4 A4 C4 E4 A4 C4 E4 A4 C4 E4 A4     T: 3
ô8 P( 3): B4 E4 Ab4                                T: 6
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **8,2** · LH/ô 3,0 · LH một mình **59%** · tâm RH **67,0**.

**Rút ra từ ý người dùng:** #524, #526 và #530 đều bị chê dở/phô; #528 chỉ “gần
được”. Bốn câu cùng dày hơn sheet dạo thứ (**8,1–8,7** so với **6,9 nốt RH/ô**) và thấp
hơn tâm Linh Nhi (**67,0–69,7** so với **73,2**, n=239 nốt intro thứ Linh Nhi trước khi
bổ sung Nỗi Buồn Hoa Phượng). Tuy vậy #528 có số đo gần ba câu bị chê mà tai lại đánh giá
tốt hơn, nên mật độ và tâm âm **không đủ dự đoán độ hay**; phải xét nguồn ô và đường nối.

**Đã xử theo lời bình 9/9/2026:** phát hiện nhánh `gopThay` của intro thứ Bolero Tuấn
đang trộn ô từ cả ba thầy và cả bossa/ballad/slow rock. Đã khóa vòng sửa này về đúng
**Linh Nhi + bolero**, gồm *Đừng Xa Em Đêm Nay* và *Nỗi Buồn Hoa Phượng*, vẫn chuyển theo
bậc/chủ âm bài đích chứ không chép MIDI tuyệt đối. Thêm test chặn tái trộn nguồn; 41 test
liên quan đạt và TypeScript/build đạt. Đây là một vòng sửa để người dùng nghe, chưa được
gọi là “đã hay”.

#### Bổ sung 15:07 — câu #536, #538, #540, #542

Nguồn: `KeyTrain/Nguon.json`, quét tay ngày 9/9/2026. Bốn câu đều **Chưa ổn có lời
bình**, nằm trong cửa nghe liền trước lúc gửi. Đây là **ý người dùng**, không phải kết
luận từ số đo.

| # | lúc nghe | bài | giọng | chấm | ý kiến |
|---|---|---|---|---|---|
| #536 | 14:36–14:37 | Để Nhớ Một Thời Ta Đã Yêu | A thứ | Chưa ổn | Giai điệu chỗ Am thứ 3 quá tệ, phô và gãy tiết tấu; yêu cầu đối chiếu khắt khe solo sheet thứ và sửa lại. |
| #538 | 14:54–14:55 | Để Nhớ Một Thời Ta Đã Yêu | A thứ | Chưa ổn | Tiết tấu và kỹ thuật rất hay, cần giữ; giai điệu còn hơi tươi sáng, cần đối chiếu solo sheet thứ rồi sửa. |
| #540 | 14:55–14:56 | Để Nhớ Một Thời Ta Đã Yêu | A thứ | Chưa ổn | Tiết tấu hai hợp âm đầu không phù hợp; yêu cầu ưu tiên tiết tấu Pùng-Pắp ở đầu câu. |
| #542 | 14:56–14:57 | Để Nhớ Một Thời Ta Đã Yêu | A thứ | Chưa ổn | Ở hợp âm C đầu tiên, tiết tấu đệm hỗn loạn giữa Pùng-Pắp và nốt giai điệu; yêu cầu sửa lại. |

#### Câu #536 — bộ ba

```
Am  G     F     C      Dm  Am  Dm  E
i   ♭VII  ♭VI   ♭III   iv  i   iv  V
```

```
ô1 P( 8): E4 C5 C5 C5 D5 E4 A4 D5                 T: 1
ô2 P( 6): E5 C5 E4 E5 D4 A4                       T: 2
ô3 P(12): F4 A4 C5 F4 A4 C5 F4 A4 C5 F4 A4 C5     T: 5
ô4 P(10): A4 A4 C5 F4 E4 D5 C5 D5 E5 G5           T: 3
ô5 P(14): B4 D4 A4 E4 D4 G4 D4 G4 C5 D4 E4 A4 D4 A4 T: 2
ô6 P(12): C4 E4 A4 C4 E4 A4 C4 E4 A4 C4 E4 A4     T: 5
ô7 P(12): A4 D4 A4 A4 D4 A4 D4 A4 D4 B4 D4 A4     T: 2
ô8 P( 3): B4 E4 Ab4                                T: 6
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **8,8** · LH/ô 3,0 · LH một mình **67%** · tâm RH **67,3**.

#### Câu #538 — bộ ba

```
Am  Dm  Am  Dm  Am  Dm  Am  E
i   iv  i   iv  i   iv  i   V
```

```
ô1 P( 9): D5 C5 B4 G4 D4 E4 D5 E5 C5              T: 2
ô2 P(12): D4 F4 A4 D4 F4 A4 D4 F4 A4 D4 F4 A4     T: 5
ô3 P(11): D5 C5 B4 E4 C5 B4 G5 B4 G4 D4 E4        T: 4
ô4 P(11): C5 D5 A4 D5 C5 D5 D4 E5 G5 A4 C5        T: 6
ô5 P(12): C4 E4 A4 C4 E4 A4 C4 E4 A4 C4 E4 A4     T: 5
ô6 P(10): C5 C5 F4 A4 C5 D4 E5 D5 E5 G5           T: 6
ô7 P(10): D5 C5 B4 E4 C5 B4 G5 D5 E5 C5           T: 6
ô8 P( 7): B4 B4 C5 E4 B4 Ab4 Ab4                  T: 2
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **9,3** · LH/ô 4,1 · LH một mình **43%** · tâm RH **68,8**.

#### Câu #540 — bộ ba

```
Am  Am  Dm  Dm  Dm  Dm  E7  E
i   i   iv  iv  iv  iv  V7  V
```

```
ô1 P( 6): D5 C5 B4 A4 G4 E4                       T: 1
ô2 P( 6): D5 C5 A4 E4 A4 A4                       T: 2
ô3 P(12): D4 F4 A4 D4 F4 A4 D4 F4 A4 D4 F4 A4     T: 5
ô4 P( 8): C5 E4 Ab4 B4 E4 F4 A4 D5                T: 3
ô5 P( 7): A4 C5 F4 G5 D4 C5 A4                    T: 6
ô6 P(12): D4 F4 A4 D4 F4 A4 D4 F4 A4 D4 F4 A4     T: 5
ô7 P(10): E5 D4 E4 Ab4 D4 E4 B4 D4 D5 D4          T: 2
ô8 P(10): E5 E4 E4 Ab4 E4 E4 B4 E4 D5 E4          T: 2
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **8,1** · LH/ô 3,0 · LH một mình **56%** · tâm RH **66,9**.

#### Câu #542 — bộ ba

```
Am  F     F     G      Am  Am  F     E
i   ♭VI   ♭VI   ♭VII   i   i   ♭VI   V
```

```
ô1 P( 7): C5 B4 B4 C5 D5 E5 C5                    T: 1
ô2 P( 7): C5 B4 E4 C5 B4 E4 C5                    T: 3
ô3 P(12): C5 F4 B4 E4 F4 C5 F4 B4 C5 A4 E5 A4     T: 2
ô4 P(12): D4 G4 B4 D4 G4 B4 D4 G4 B4 D4 G4 B4     T: 5
ô5 P( 6): C5 B4 C5 E4 B4 C5                       T: 6
ô6 P( 6): C5 B4 C5 E4 B4 E4                       T: 6
ô7 P(12): A4 C5 F5 A4 C5 F5 A4 C5 F5 A4 C5 F5     T: 5
ô8 P( 9): E5 E4 D4 E4 E4 D5 E4 Ab4 E4             T: 2
ô9 P( 2): E3 Ab3                                   T: 1
```

RH/ô **8,1** · LH/ô 3,4 · LH một mình **48%** · tâm RH **69,1**.

**Rút ra từ ý người dùng:** #538 chứng minh tiết tấu/kỹ thuật có thể rất hay trong khi
đường cao độ vẫn quá sáng; phải giữ hình tiết tấu rồi đổi nguồn nốt, không xoá cả ô.
#538 và mẫu Đã ổn #544 cùng vòng `i–iv` nhưng tai đánh giá khác nhau, nên vòng không đủ
dự đoán chất lượng. #540 yêu cầu Pùng-Pắp sớm, còn số đo sheet từng nói 7/8 intro thứ có
nốt ở phách 0 — hai điều này không thật sự loại nhau: giữ giai điệu ô 1, ưu tiên một ô
Pùng-Pắp ngay sau đó như mẫu #544. #542 cho thấy trong một ô phải chọn dứt khoát hoặc
Pùng-Pắp hoặc giai điệu; chồng hai cơ chế nghe thành hỗn loạn.

**Đã xử yêu cầu train nguồn hợp âm và nốt:** vòng sửa kế tiếp bỏ sáu mẫu hợp âm thứ tự
nghĩ, lấy bậc/chất trực tiếp từ các sheet thứ. Mỗi lượt chọn nhất quán một họ câu theo
vòng Linh Nhi → Cà Pháo → Tôn Hùng; giai điệu không còn trộn từng ô của nhiều thầy.
Giữ bậc ii của *Nỗi Buồn Hoa Phượng*, hợp âm lặp và ♭VI/♭VII khi sheet có. Khung nhịp
Bolero Tuấn giữ nguyên. Theo #540/#542 và mẫu #544: ô 1 giữ giai điệu, ô 2 luôn
Pùng-Pắp; một ô đã Pùng-Pắp thì không nhận thêm câu chạy/giai điệu. 88 test liên quan
đạt; đây vẫn là vòng sửa chờ người dùng nghe, không tự gọi là đã hay.

### 16c. Giang tấu giọng thứ — Chưa ổn (Bolero Tuấn)

Cùng vòng 12 ô + hút, **không** phải mẫu Đã ổn. Học giang thì so **ô giang** 3 thầy, đừng so intro.

```
Am  G     F     C     Dm  Am  E   Am  G     F     C     E
i   ♭VII  ♭VI   ♭III  iv  i   V   i   ♭VII  ♭VI   ♭III  V
```

Lưới GIANG TẤU **có Fadd2** (`Am(add9) Fadd2 Dm9 G9 Cadd2 E9sus4…`). `hopAm` lưu Am G F vì giang thứ Tuấn bị ép vòng mẫu (`daoTruong`) — **sai**, đã bỏ. So nốt theo lưới, không theo `hopAm` cũ.

#290 ô2 Fadd2: `Bb4 G4 A4 Bb4 A4` — Bb không thuộc Fadd2 (F G A C). #272 ô2 còn **B = ♭5** của F. Gốc: giai điệu soạn trên G (ô 2 vòng mẫu) trong khi lưới ghi Fadd2.

| | #262 | #272 | #278 | #290 | dạo thứ sheet |
|---|---|---|---|---|---|
| RH nốt/ô | 7,8 | 7,3 | 7,1 | 7,8 | **6,9** |
| LH mốc/ô | 3,8 | 4,0 | 4,0 | 4,0 | **4,6** |
| LH một mình | 51% | 58% | 54% | 46% | **41%** |
| tâm RH | 69,1 | 69,2 | 69,5 | 69,6 | **73,2** |

**Ý người dùng:** gãy + phô; #290 xin so luật + giang sheet thứ. **Chưa xử** (skill không tự sửa).

#### #262 — để đó

```
ô1 P( 4): A4 A4 A4 A4                              T: 3
ô2 P(12): G4 E4 D4 E4 G4 A4 C5 D5 E5 G5 E5 E5      T: 2
ô3 P( 7): A4 A4 A4 A4 A4 B4 C5                     T: 7
ô4 P( 4): C5 C5 C5 C5                              T: 3
ô5 P(12): E4 D4 D4 C5 E4 D4 E4 D4 D4 E4 F4 G4      T: 1
ô6 P(15): D5 C5 B4 A4 G4 E4 D4 E4 G4 A4 C5 D5 E5 E5 C5  T: 5
ô7 P( 4): B4 B4 B4 B4                              T: 3
ô8 P( 8): C5 B4 E4 C5 E4 B4 E4 C5                  T: 6
ô9 P( 7): B4 D4 A4 G4 F4 E4 B4                     T: 4
ô10 P( 4): C5 C5 C5 C5                             T: 3
ô11 P(17): C5 D5 E5 G5 D5 C5 A4 G4 E4 D4 E4 G4 A4 C5 D5 E4 G4  T: 5
ô12 P( 6): F5 F5 F5 E4 F5 E5                       T: 6
ô13 P( 2): E3 Ab3                                  T: 1
```

#### #272 — gãy và phô

```
ô1 P(13): D5 D5 C5 A4 G4 E4 D4 E4 G4 A4 C5 D5 D5   T: 2
ô2 P( 9): F4 E5 E5 C5 Bb4 B4 A4 B4 D5              T: 3
ô3 P( 4): C5 C5 C5 C5                              T: 3
ô4 P(12): E5 D5 G4 G5 G4 Bb4 B4 A4 G4 F4 E4 C5     T: 5
ô5 P( 4): G4 F4 E4 F4                              T: 7
ô6 P( 4): A4 A4 A4 A4                              T: 3
ô7 P(17): E4 C5 B4 A4 Ab4 E4 D4 E4 Ab4 A4 C5 D5 E5 D5 E4 B4 A4  T: 5
ô8 P( 7): E5 C5 B4 A4 G4 F4 B4                     T: 5
ô9 P( 4): B4 B4 B4 B4                              T: 3
ô10 P( 2): D4 B4                                   T: 7
ô11 P(14): G4 B4 E5 D5 C5 A4 G4 E4 D4 E4 G4 A4 C5 G4  T: 5
ô12 P( 3): B4 B4 B4                                T: 3
ô13 P( 2): E3 Ab3                                  T: 1
```

#### #278 — gãy và phô

```
ô1 P(15): C5 F5 E5 D5 C5 A4 G4 E4 D4 E4 G4 A4 C5 G5 E5  T: 2
ô2 P( 5): Bb4 G4 A4 Bb4 A4                             T: 3
ô3 P( 4): C5 C5 C5 C5                                  T: 3
ô4 P( 8): G4 B4 E5 B4 A4 G4 F4 E4                      T: 5
ô5 P( 4): G5 F5 E5 F5                                  T: 7
ô6 P( 4): A4 A4 A4 A4                                  T: 3
ô7 P(16): B4 B4 A4 A4 Ab4 E4 D4 E4 Ab4 A4 C5 D5 E5 D5 Ab4 C5  T: 5
ô8 P(10): D4 B4 G5 B4 A4 E4 D4 E4 F4 G4                T: 5
ô9 P( 4): B4 B4 B4 B4                                  T: 3
ô10 P( 2): D4 B4                                       T: 7
ô11 P(15): E5 D5 E5 D5 C5 A4 G4 E4 D4 E4 G4 A4 C5 E4 C5  T: 5
ô12 P( 3): B4 B4 B4                                    T: 3
ô13 P( 2): E3 Ab3                                      T: 1
```

#### #290 — gãy (vd Fadd2); xin so luật + giang sheet thứ

```
ô1 P(15): C5 F5 E5 D5 C5 A4 G4 E4 D4 E4 G4 A4 C5 G5 E5  T: 2
ô2 P( 5): Bb4 G4 A4 Bb4 A4                             T: 3
ô3 P( 4): C5 C5 C5 C5                                  T: 3
ô4 P(12): E5 D5 G4 G5 G4 Bb4 B4 A4 G4 F4 E4 C5         T: 5
ô5 P( 6): E5 E4 F4 A4 D5 C5                            T: 7
ô6 P( 4): A4 A4 A4 A4                                  T: 3
ô7 P(12): D5 C5 A4 Ab4 E4 D4 E4 Ab4 A4 C5 D5 E5        T: 5
ô8 P(10): A4 C#5 B4 E4 C5 A4 G4 F4 E4 D4               T: 5
ô9 P( 4): B4 B4 B4 B4                                  T: 3
ô10 P(10): B4 C5 A4 E5 A4 D5 G5 E4 E5 A4                T: 7
ô11 P(15): E5 D5 E5 D5 C5 A4 G4 E4 D4 E4 G4 A4 C5 E4 C5  T: 5
ô12 P( 3): B4 B4 B4                                    T: 3
ô13 P( 2): E3 Ab3                                      T: 1
```

### Rút ra được gì

Hai câu, cùng bị chê, cùng giọng La thứ. **n=2** — chưa thành luật, nhưng cả hai lệch
cùng một chiều ở cả ba trục:

| | câu #3 | câu #7 | bản ký âm |
|---|---|---|---|
| tay phải | 9,1 nốt/ô | 8,2 | **6,9** |
| tay trái | 3,8 mốc/ô | 3,7 | **4,6** |
| cao độ trung bình | F#4 | G4 | **C#5** *(Rừng Lá, cùng La thứ)* |
| cao nhất | G5 | G5 | **D6** |

Tay phải dày hơn, tay trái mỏng hơn, và **cả câu nằm thấp hơn 6–7 nửa cung** so với chỗ
chị ấy thật sự đánh. Trần thấp hơn hẳn **một quãng sáu**.

*Suy đoán của Claude:* tầm cao độ là chỗ đáng ngờ nhất trong ba. Câu nằm ngay giữa bàn
phím, đúng vùng tay trái đang chạy, thay vì bay lên trên như bản ký âm — tai nghe ra là
câu bị chìm chứ không phải sai nốt.

### Ý kiến câu #7 — đo lại hai điều người dùng nêu

#### "Mất hẳn kết hợp giữa hai tay"

Đếm mốc gõ có **cả hai tay cùng lúc**, tính trên số mốc tay trái:

| | mốc trái | mốc có cả hai | tỉ lệ |
|---|---|---|---|
| câu #3 | 34 | 26 | **76%** |
| câu #7 | 33 | 26 | **79%** |
| Đừng Xa | 64 | 31 | 48% |
| Rừng Lá | 50 | 30 | 60% |
| Lá Thư | 18 | 13 | 72% |
| Một Cõi | 25 | 19 | 76% |
| **gộp 4 bài giọng thứ** | | | **59%** |

**Số đo nói NGƯỢC cảm nhận, nhưng người dùng vẫn đúng.** Hai tay không hề rời nhau — trái
lại, chúng **dính vào nhau quá chặt**: 76–79% so với 59% của bản ký âm.

Chỗ mất là **tiếng nói riêng của tay trái**. Bản ký âm để **41%** số mốc tay trái gõ MỘT
MÌNH, xen vào giữa các nốt tay phải; app chỉ còn **21–24%**. Cộng thêm tay trái mỏng đi
**một phần ba** (34 mốc trên 9 ô, so với 50 của Rừng Lá cùng 9 ô).

Nên "mất kết hợp" ở đây nghĩa là **mất phép cài vào nhau**: hai tay gõ chồng lên nhau
thay vì đối đáp. Ít mốc hơn, mà mốc nào cũng gõ cùng tay phải.

*Claude nhận lỗi:* trần `mocToiDa` thêm vào ở món 3 chính là thứ làm tay trái mỏng đi.
Trần ấy chỉnh trên điệu `bolero-linh-nhi-3` và ra đúng 4,4 mốc/ô; áp sang
`bolero-linh-nhi-2` thì ra **3,7**, thấp hơn đích 4,6. Trần đặt theo số mốc tuyệt đối
nên nó ăn khác nhau ở hai mẫu đệm khác nhau.

#### "Intro đã tạo vòng hợp âm trên giọng thứ chưa"

**Rồi.** Chạy `vonHopAmLinhNhi` trên bài La thứ:

```
Am Dm G  C    F   E7 Am Dm E7
Im IVm ♭VII ♭III ♭VI V  Im IVm V
```

Toàn bậc của giọng thứ, rút từ vốn hợp âm của chính bài, đóng trên bậc **V** đúng luật
cửa vào hát. Chỗ này không phải nguyên nhân.

### Chỗ ý kiến CHỎI với số đo

**Một chỗ chỏi, và số đo thắng:** người dùng nghe ra "mất kết hợp hai tay", nhưng đo thì
hai tay dính nhau **chặt hơn** bản ký âm (76–79% so với 59%). Cái tai nghe ra là đúng —
chỉ là nó nằm ở **tay trái không còn nói một mình**, chứ không phải hai tay rời nhau.

Ghi lại đây vì nó dạy một điều: *"hai tay không ăn nhau"* có thể là **quá dính**, không
chỉ là quá rời. Lần sau đo cả hai chiều trước khi kết luận.

### Còn thiếu trong sổ thô

`Nguon.json` **không lưu vòng hợp âm** của câu dạo, nên muốn trả lời câu hỏi thứ hai phải
chạy lại code để dựng lại vòng. Thêm một cột `hopAm` vào bảng `cau` thì lần sau đọc thẳng
được. *(Chưa làm.)*

**Chưa sửa gì.** Một ý kiến là n=1; sửa bộ sinh phải hỏi người dùng trước.

**Một ý kiến KHÔNG tự động sửa được bộ sinh.** Nó là n=1, có thể chỏi với số đo trên bảy
bản ký âm. Muốn đổi thì hỏi người dùng trước.

---

## 16b. BỘI SỐ bám hợp âm — thước so được với app

Đo ngày **6/9/2026** bằng `python tools/sheet/boi_so.py linh-nhi`. Bộ đo có `--kiem` tái
lập đúng ba con số mốc dưới đây.

**Vì sao không dùng tỉ lệ thô.** Tỉ lệ nốt trúng hợp âm THÔ không so được giữa hai vốn hợp
âm khác nhau: một bộ soạn dùng `Cadd2 · Dm11 · G9sus4` có sẵn nhiều nốt hơn một bản ký âm
dùng hợp âm ba trơn, nên nó "trúng hợp âm" nhiều hơn mà chưa chắc bám chặt hơn. Thước phải là

    bội số = (tỉ lệ trúng hợp âm) / (tỉ lệ trúng nếu rải bừa trong gam)

Mẫu số tính cho **từng nốt**: đếm trong bảy bậc của gam có bao nhiêu bậc nằm trong hợp âm
đang vang, chia bảy. Hợp âm càng dày thì mẫu số càng lớn, nên bội số tự cân bằng lại.
Bội số 1 = không khác gì rải bừa trong gam.

### Bảng của chị, cả bảy bản ký âm

| đoạn | giọng | số bài | n nốt | **BỘI SỐ** | bước nhỏ | độ dày hợp âm |
|---|---|---|---|---|---|---|
| dạo | trưởng | 3 | 135 | **1,561** | 56,1% | 3,03 nốt |
| dạo | thứ | 4 | 226 | **1,549** | 39,6% | 3,31 nốt |
| giang | trưởng | 3 | 152 | **1,609** | 57,0% | 3,01 nốt |
| giang | thứ | 3 | 184 | **1,367** | 38,2% | 3,22 nốt |
| kết | trưởng | 3 | 113 | **1,807** | 49,2% | 3,24 nốt |
| kết | thứ | 4 | 178 | **1,131** | 29,8% | 4,37 nốt |

Ba đoạn dạo giọng trưởng, từng bài: **Đường Xưa 1,364 · Biển Tình 1,604 · Mùa Xuân 1,714**.
Trung bình 1,561, độ lệch chuẩn 0,179, **sai số chuẩn 0,103** — với ba bài thì đây là sàn,
không giảm được. Hệ quả: **chênh lệch nhỏ nhất phát hiện được là 0,20 bội số.**

### Hai điều bảng này nói ra

**1. Đoạn KẾT là chỗ hai giọng tách nhau xa nhất: 1,807 so với 1,131.** Chênh **0,68** —
gấp hơn ba lần ngưỡng phát hiện, nên đây là kết luận chắc chứ không phải nhiễu. Giọng
trưởng càng về cuối càng siết vào hợp âm; giọng thứ càng về cuối càng rời ra, tới mức
1,131 gần chạm mức rải bừa.

Con số này **xác nhận độc lập** hằng `DICH_HOP` bên KeyTrain (trưởng kết .75, thứ kết .50)
— hai phép đo khác nhau, cùng một chiều.

**2. Đoạn DẠO thì hai giọng gần như y hệt: 1,561 và 1,549.** Chênh 0,012, nằm sâu trong
nhiễu. Nên đừng đặt luật "đoạn dạo giọng trưởng bám chặt hơn" — số đo không đỡ.
`DICH_HOP` cũng đặt dạo trưởng .68 / thứ .69, nhất quán với chỗ này.

### So với hai thầy kia — chị bám chặt nhất

| đoạn dạo | bội số | độ dày hợp âm |
|---|---|---|
| **Linh Nhi** (trưởng, n=135) | **1,561** | 3,03 |
| Cà Pháo (trưởng, n=263) | 1,299 | 3,51 |
| Tôn Hùng (thứ, n=97) | 1,346 | 3,72 |

Chênh Linh Nhi – Cà Pháo là 0,26, **vượt ngưỡng phát hiện 0,20** nên đọc được. Chênh
Linh Nhi – Tôn Hùng là 0,22, vừa qua ngưỡng, và hai vế **khác giọng** (chị trưởng, thầy
thứ) nên chỉ đọc như một dấu hiệu, không phải kết luận.

### Ba ô đáng soi lại, chưa xử

- **Một Cõi Đi Về · kết** bội số **0,656** — *kém hơn rải bừa*. Đoạn kết ấy chọn nốt ngoài
  hợp âm nhiều hơn cả ngẫu nhiên.
- **Rừng Lá Thấp · kết** bội số **0,875**, cũng dưới 1.
- **Lá Thư Trần Thế · kết** báo độ dày hợp âm **7,00 nốt** và trúng 100% trên n=22. Hợp âm
  bảy nốt là bất thường — nghi ký hiệu hợp âm đọc sai chứ không phải chị chơi thế. **Chưa
  soi.** Ba ô này đều là đoạn kết giọng thứ, và chúng kéo con số 1,131 ở bảng trên xuống.

### RANH GIỚI ĐOẠN KHÔNG TRÙNG VẠCH NHỊP — đo theo ô là trộn hai thứ

Đo 7/9/2026 trên *Nỗi Buồn Hoa Phượng* (Rê thứ, bolero, 78 ô). Bốn mốc dưới đây do **người
dùng chỉ tận nốt** khi trả lời phiếu, không phải suy đoán; đã ghi vào `corpus.json` ở trường
`moc` của bài.

| ô | phách | từ | sang |
|---|---|---|---|
| **5** | 5,0 | câu dạo | lời hát |
| **6** | 6,0 | giai điệu lời hát | tiết tấu đệm bolero |
| **42** | 1,0 | giang tấu | lời hát |
| **71** | 4,0 | đàn mô phỏng giai điệu hát | câu kết riêng |

Kiểm lại trên bản ký âm, cả bốn đều rơi đúng vào một mốc nhìn thấy được:

- **ô 5** — ba nốt đầu là móc đơn chạy (`A3 D4 G#4`), ba nốt sau là **nốt đen** (`A4 G4 A4`).
  Lời hát vào ở nốt đen đầu tiên, phách 5,0. Nửa đầu ô là dạo, nửa sau đã là hát.
- **ô 6** — câu hát chạy từ phách 0 tới hết **nốt trắng** `A3` (phách 4,0, dài 2 phách). Từ
  phách 6,0 nốt dồn lại, ba nốt cùng rơi vào phách 6,5 — đó là **đệm bolero**, không phải câu hát.
- **ô 42** — tay phải vào muộn, nốt đầu `G#5` ở phách 1,0. Ô 41 là đàn trọn vẹn.
- **ô 71** — năm nốt đầu (phách 0→4) là đàn **mô phỏng** giai điệu lời hát; từ `G4` phách 4,0
  mới tách ra thành câu kết. Đúng nửa ô.

#### Hệ quả phải nhớ khi đo

**Mọi con số tính "đoạn hát" theo ô đều trộn hai thứ khác nhau**: giai điệu lời ca và tiết
tấu đệm. Ô 6 là bằng chứng — nửa đầu ô là câu hát, nửa sau là đệm bolero, mà phép đo theo ô
gộp cả 15 nốt thành một.

Và ngược lại ở phía solo: **ô cuối của đoạn dạo hay giang tấu có thể đã chứa lời hát** (ô 5),
còn **ô đầu của đoạn kết có thể còn đang mô phỏng giai điệu hát** (ô 71).

#### Một khái niệm mới người dùng đưa ra: ĐÀN MÔ PHỎNG GIAI ĐIỆU LỜI HÁT

Chép nguyên văn: *"ở ô 71 là phần đàn nhưng mô phỏng giai điệu lời hát, đến nốt tay phải thứ
6 đếm từ đầu ô thì đó là câu nhạc riêng không mô phỏng lời hát nữa."*

Đây là **tầng thứ ba**, trước nay sổ này chỉ có hai: *đàn* và *hát*. Tầng giữa là đàn nhắc
lại đường giai điệu của lời ca trước khi rẽ sang câu của riêng nó. Chưa đo được nó xuất hiện
ở đâu nữa — mới có một chỗ, **n=1**.

#### Bốn ô mang cùng một câu — 13 · 29 · 42 · 57

Từ phách 1,0 tới 7,0, bốn ô trùng nhau **từng nốt từng phách**:

    G#5@1,0 · A5@2,0 · G5@2,0 · A5@3,0 · D5@4,0 · D5@5,0 · E5@6,0 · D5@6,5 · E5@7,0

Khác nhau chỉ ở nốt đuôi phách 7,5 (`D5 · F5 · F5 · E5`) và nốt dẫn ở phách 0. Người dùng đã
xác nhận ô 42 là lời hát, nên cả bốn là **câu mở của phiên khúc**, hát lại ở mỗi lời — ba
trong bốn ô ấy (29 · 42 · 57) đúng là ô đầu một phiên khúc.

Ô 13 thì nằm giữa `verse` 6–20. **Suy luận của Claude, người dùng chưa xác nhận:** phiên khúc
đầu gồm hai câu — câu A ô 6–12, câu B từ ô 13; các phiên sau chỉ hát câu B. Độ dài khớp:
13–20, 29–36, 42–49 đều **8 ô**.

Công phát hiện ô 29 và 57 là của OpenCode, trong phiếu
`ingest/phieu-cua-loi-noi-buon-hoa-phuong.md`; Claude kiểm lại từng nốt rồi mới chép sang đây.

#### Chỗ tôi suy sai, để phiên sau đừng lặp

Tôi thấy mô-típ `G#5 A5 G5 A5 D5 D5 E5 D5 E5` xuất hiện ở **cả ô 13 lẫn ô 42** với tay trái
chỉ 2 nốt, và kết luận đó là **câu đàn lặp lại**. Sai. Người dùng chỉ ra ô 42 là **lời hát**.
Đối chiếu lại: ô 13 cũng vào ở phách 1,0 với đúng mô-típ ấy, chỉ thêm ba nốt móc đơn dẫn vào.

Nên đó là **cùng một câu hát của lời 1 và lời 3** — chuyện hiển nhiên của một ca khúc. Bài
học: *một mô-típ lặp lại ở hai đoạn hát khác nhau thì trước hết hãy nghĩ đó là cùng một câu
ca*, đừng vội đọc thành câu đàn chỉ vì tay trái thưa.

#### CÂU RUN — khái niệm của người dùng, và nó đo được

Trả lời phiếu vòng 2 (7/9/2026), người dùng dùng một chữ sổ này chưa có:

> *"ô 20 hát tới nốt trắng đầu tiên (dưới Dm) còn lại là **câu run** kéo dài qua tới hết dấu
> lặng bên ô 21"* · *"ô 49 cũng hát tới nốt trắng đầu ô rồi sau đó câu run nhưng nó kết run ở
> dấu lặng trong ô và sau dấu lặng là hát ở ngay nốt đen cùng ô"*

**Đọc là câu chạy ngón (*run*).** Đó là cách Claude hiểu, *người dùng chưa xác nhận lại chữ* —
nhưng số liệu đỡ: cả hai chỗ họ chỉ đều là **chuỗi móc đơn liên tục**, và một bộ dò chỉ hỏi
đúng câu ấy bắt trúng **cả điểm đầu lẫn điểm cuối** của chúng.

Bộ dò: `tools/sheet/cau_run.py` (có `--kiem` tái lập hai chỗ trên). Định nghĩa: trên tuyến
giai điệu tay phải, một dãy nốt có `dur ≤ 0,5` cách nhau **đúng 0,5 phách**, dài ≥ **6** nốt.

Chín chuỗi trong *Nỗi Buồn Hoa Phượng*:

| ô | dài | đoạn |
|---|---|---|
| 1 → 3 | **41 nốt** | dạo |
| **20 → 21** | **14 nốt** | ← người dùng gọi là câu run |
| 29 → 30 | 6 | lời 2 |
| 30 | 6 | lời 2 |
| 37 → 40 | **40 nốt** | giang tấu |
| 48 → 49 | 7 | lời 3 |
| **49** | **13 nốt** | ← người dùng gọi là câu run |
| 58 | 6 | lời 4 |
| 73 | 8 | kết |

Hai chuỗi dài nhất (41 và 40 nốt) nằm gọn trong **đoạn dạo và giang tấu** — nói cách khác,
đoạn solo của bài này về bản chất *là* một câu run dài. Còn trong đoạn hát, câu run là câu
đàn chen vào giữa hai câu ca.

Trên cả kho Linh Nhi bộ dò ra **46 chuỗi** (7 bài).

#### Bốn mốc mới, và hai thứ KHÔNG dò tự động được

| ô | phách | từ → sang |
|---|---|---|
| **8** | 6,0 | giai điệu hát → **fill** (hát tới hết nốt trắng `D4`@4,0, nốt nằm dưới chữ `Dm`) |
| **20** | 2,0 | giai điệu hát → câu run |
| **21** | 2,0 | câu run → giai điệu hát (run kết ở **dấu lặng** 0,5–2,0) |
| **49** | 2,0 | giai điệu hát → câu run |
| **49** | 10,0 | câu run → giai điệu hát (dấu lặng 8,5–10,0, rồi nốt đen `D5`) |

Người dùng cũng chốt **ô 65 và 66 đều là hát** — nên **không có giang tấu thứ hai**, dù ô 65
tay phải dâng lên `F5 G5 G#5 A5` với tay trái chỉ 5 mốc. Ô 66 từ phách 4,0 mang đúng đuôi câu
mở phiên khúc, khớp với chỗ này.

> **Ô 49 và ô 52 dài 12 phách**, không phải 8; ô 74–78 dài 4 phách. Số ô thì không lệch —
> 78 cả trước lẫn sau `clone_do.sua_o()`. Nên khi người dùng nói "ô 49" là đúng ô ấy.

**Hai phép dò đã thử và KHÔNG dùng được**, ghi để phiên sau đừng thử lại:

- **Nốt trắng** — quy tắc ô 6 (*"hát tới nốt trắng rồi đệm"*) không áp được cho cả bài: nốt
  trắng có ở **hơn 30 ô**, kể cả trong câu dạo (ô 4) và giang tấu (ô 37, 41).
- **Dấu lặng** — cũng không: **84 dấu lặng** ở tay phải, rải khắp bài. Nó chỉ là mốc *kết* của
  một câu run đã biết, không phải dấu hiệu nhận ra câu run.

Thứ dò được là **chuỗi móc đơn liên tục**, và chỉ có 9 chuỗi trong cả bài.

#### Vòng 3 — "câu run" ĐƯỢC XÁC NHẬN, và ba lời hát cùng lời khác tiết tấu

Người dùng viết **"câu chạy nốt (run)"** trong câu trả lời vòng 3 — nên cách đọc *câu chạy
ngón* ở mục trên là **đúng**, không còn là phỏng đoán.

**Ba khúc lời 2 · lời 3 · lời 4 là cùng một lời hát, nhưng KHÁC TIẾT TẤU.** Nguyên văn:

> *"ô 30 và 43 nốt đầu đều là cùng một lời hát, cùng cao độ nhưng khác về ý đồ của tác giả
> (ô 30 là nốt đen và có móc thêm một nốt, ô 43 thì là nốt trắng). Tiết tấu ở 2 ô cũng khác
> dù cùng lời hát."* · *"ô 32 và 45 giống nhau ở nốt hát đầu tiên đều là nốt trắng nhưng cũng
> lại khác về ý đồ tác giả khi có 2 kiểu tiết tấu khác nhau."*

Nên **đừng chép tiết tấu của một lời sang lời khác** dù chúng cùng câu ca — chị đổi tiết tấu
có chủ ý ở từng lời.

#### Ô 36 và ô 49 — hai lối nối khác nhau vào hai đoạn khác nhau

> *"ô 36 là một câu chạy nốt ngắn ở tay trái kết hợp với một câu đàn lặp lại giai điệu hát ở
> ô 35 nhưng nốt hát cuối câu lặp lại thì có thấp hơn nốt đầu ô 36, sau đó là câu chạy nốt
> (run) và nối vào giang tấu. ô 49 thì là một câu chạy tương tự ô 20 rồi sau đó nối vào điệp
> khúc lặp."*

Kiểm lại: ô 36 tay phải là `G5 D5 · D4 E4 E4 A4 G4 E5`, ô 35 là `A4 A4 D#5 E5 E5 A5 G5 F5` —
hình `E5 E5 A5 G5` của ô 35 lặp thành `E4 E4 A4 G4` ở ô 36, **thấp hơn đúng một quãng tám**.

> **Bẫy đo, ghi để đừng sập lại:** phép so khớp **cao độ tuyệt đối** cho ô 35 với ô 36 ra
> **0%**. Đổi sang khớp **lớp cao độ** (bỏ quãng tám) thì ra **50%**. Câu lặp dịch quãng tám là
> lối thường gặp của chị, nên phép so nào cũng phải chạy **cả hai thước**.

Một chỗ **số đo bác phỏng đoán của người dùng**: họ đoán nốt hát đầu ô 49 có *"chồng thêm nốt
nữa"*. Đo ra phách 0,0 của ô 49 chỉ có **hai** nốt — `D5` tay phải và `D2` tay trái, không có
nốt chồng nào.

#### Ô 28 và ô 56 — hát một nốt rồi nhường chỗ cho đệm, cuối ô là câu fill dồn

> *"cả hai ô chỉ hát ở nốt đầu ô, sau đó tay trái đàn tiết tấu bolero và nửa cuối ô (sau dấu
> lặng) thì cả 2 ô là câu fill … cả 2 câu fill để tạo cảm giác dồn về phần kế tiếp."*

Đo xác nhận, và chỉ ra **câu fill ấy nằm ở TAY TRÁI**: phách 6→8 cả hai ô đều đi lên
`E–F–G–A#`, **trùng khít nhau từng nốt**. Đây là hai ô tay trái dày nhất bài (28 và 26 nốt).

| | hát tới | đệm | câu fill |
|---|---|---|---|
| ô 28 | phách 2,0 (`E5` nốt trắng) | 2,0 → 3,5 | từ phách 6,0, tay trái |
| ô 56 | phách 1,0 (`E5` nốt đen) | 1,0 → 3,5 | từ phách 6,0, tay trái |

#### Ô 65–70 là HÁT — câu cuối **phiên**, không tách `verse_4`

> *"Đó là phần hát, là câu cuối điệp khúc. Vì đó là kết bài nên chị Nhi muốn kéo dài câu hát
> ra giống như các ca sĩ vẫn hay làm khi biểu diễn."*

**8/9/2026 người dùng sửa:** chỗ 67–70 là câu cuối **phiên khúc**, lúc nãy gõ nhầm. `verse_4`
giữ **57–70**, không tách.

**Số đo không khớp** ô 67–70 với hai điệp — cao nhất **17%**, cả thước chặt lẫn lớp cao độ.
Lần trước đọc thành "biến tấu điệp". Nay khớp với lời sửa: đó là **phiên kéo dài**, nên không
phải điệp — số đo chối điệp là đúng.

Hai điệp khúc thì người dùng chốt **cùng cấu trúc, chỉ khác điểm vào** — khớp với số đo
(ô 27↔55 trùng bốn nốt đầu `A5 A5 F5 E5`; ô 25↔53 cùng mở `A4@2,0`).

#### Còn trống

Sau ba vòng phiếu đã có **14 mốc**, và bài coi như chia xong ở mức đoạn. **Còn hai chỗ
chưa xử:**

1. ~~**`verse_4` 57–70 có thể phải tách**~~ — **không tách.** Người dùng sửa: 67–70 là câu cuối
    **phiên**, gõ nhầm "điệp".
2. ~~**Chưa hỏi mốc bên trong** 22–27, 30–35, 51–55, 57–66.~~ Người dùng: ô 31–35 **toàn hát**,
    máy hỏi thừa. Ghi: **30–35 = 43–48 = 58–63 hát hết ô** (cụm lặp 91–100%). Điệp 22–27 và
    51–55 hát; cắt đệm/fill chỉ ở **28 và 56** (đã có mốc). 57 mở phiên = hát; 64–66 hát.

Người dùng cũng đã chốt **giữ nguyên đoạn kết 71–78** dù ô 75 và 76 trống hoàn toàn và ô 74·77·78
dài 4 phách thay vì 8 — nên đừng cắt bài ở ô 73.

---

## 16S. PHẦN SOẠN SLOW ROCK — ý kiến khi nghe (tách khỏi Bolero)

> Mục này **chỉ** cho bộ soạn **Slow Rock Lá thư** (`KeyTrain/src/reharm/style/soanSlowRockLinhNhi.ts`,
> điệu `slow-rock-la-thu`, ô 6/8 = 3 phách). **Không áp cho Bolero** — 16a–16e là Bolero. Số đo slow
> rock: 13b · 13c · 13e. Câu slow rock mới thì chép vào đây, không chép vào 16a/16b.

Sổ `Nguon.json` ghi nhầm cột `dieu` = `bolero-linh-nhi-2` cho các câu dưới (app lấy kiểu solo mặc
định của thầy thay vì điệu của bài) — nhận ra là slow rock nhờ vòng Một Cõi và ô 6/8. App đã sửa
chỗ ghi (24/9/2026).

| # | lúc nghe | bài | giọng | loại | chấm | ý kiến |
|---|---|---|---|---|---|---|
| #1373 | 24/9 21:29 | — | E thứ | dạo | Đã ổn | — (mẫu) |
| #1374 | 24/9 21:29 | — | E thứ | giang | Chưa ổn | chỗ Em đầu câu đánh lệch tiết tấu |
| #1376 | 24/9 21:31 | — | E thứ | dạo | Chưa ổn | Chỗ Em và Am đầu câu bị lệch tiết tấu |
| #1377 | 24/9 21:31 | — | E thứ | kết | Chưa ổn | CHỗ Em/G bị bóp nhanh gây lệch tiết tấu |
| #1378 | 24/9 21:31 | — | E thứ | giang | Chưa ổn | Chỗ Em đầu câu đánh giai điệu như bị bóp nhanh, gây lệch tiết tấu. Chỗ Am6 đang chạy nốt hay qua Em bị lệch nhịp |
| #1382 | 24/9 22:05 | — | E thứ | dạo | Đã ổn | — (mẫu) |
| #1403 | 24/9 22:14 | — | A thứ | dạo | Chưa ổn | tất cả từ đầu tới cuối câu đều hay nhưng ở E7 cuối thì nên thêm 1 cú dặm hợp âm E7 nữa rồi mới vào phiên khúc. Hãy điều chỉnh và nếu sau này có soạn lại câu theo khung này thì nhớ làm tương tự |

**Rút ra**

- **Chưa ổn 4/4 câu, cùng một chỗ: nhịp bị "bóp nhanh"** (ý người dùng). Cả bốn **mở bằng ô 1 của
  Một Cõi** (dạo, giang hoặc kết), gõ ở mốc 0 · 0,375 · 0,625/0,75 · 1,125… = ba nốt trong chỗ của hai
  móc đơn — nhanh gấp 1,5 nhịp chùm ba của điệu. #1378: ô 8 F#m7b5 (nghe như Am6 — cùng bốn nốt A C E
  F#) chạy móc đơn đều, sang ô 9 là **ô kết dạo Một Cõi (B7)** gõ ở 0,875 · 2,625 · 2,875 — đó là chỗ
  "lệch nhịp".
- **Số đo khớp ý người dùng "sheet gốc có chỗ hỏng"**: mốc tay phải lệch lưới 6/8 (không rơi vào móc
  đơn hay móc kép) — **Một Cõi 31 mốc trong 14/29 ô** (dạo 5/10 · giang 4/10 · kết 5/9); **Lá Thư 0/20
  ô**. Hỏng nằm ở bản ký âm Một Cõi.
- **Mẫu Đã ổn #1373**: ô đầu nằm gọn trên móc đơn (6 mốc); ô 5 có 2 mốc lệch mà tai vẫn nhận (n=1).
- **Chỏi với số đo đã ghi**: bảng 13e đếm cả mốc hỏng của Một Cõi (câu chạy, phách mạnh/nhẹ đều tính
  theo mốc) — con số slow rock ở 13e **có phần nhiễm nhịp hỏng**, chưa đo lại sau khi nắn.
- **Đã xử** (24/9/2026): xem 13f.

#### Câu #1373 — dạo · Đã ổn *(mẫu)*

**Ý kiến** (ý người dùng): — (mẫu)

**Vòng** — Mi thứ, 10 ô 6/8, `slow-rock-la-thu` (sổ ghi nhầm `bolero-linh-nhi-2`):

```
Em  Am  C    B7  Em  C    Am  F#m7b5  B7
i   iv  ♭VI  V7  i   ♭VI  iv  ii°     V7
```

**Nốt** (`*` = mốc lệch lưới 6/8, không rơi vào móc đơn/móc kép)

```
ô1  P( 6): E4+B4+E5 G3+B3 F#4 B3+G4+B4 B4 E5   T: 0
ô2  P( 6): C5 E4+E5 A3+C4 B4+C5 E4+E5 C4+C5   T: 2
ô3  P( 4): C5 G4 G4 G4   T: 3
ô4  P( 6): F#4 Eb4 F#3+F#3+Eb4 B3 F#3+Eb4 Eb4+F#4   T: 1
ô5  P(11): E4 E4* G4+G5 B4+B5 D5 E5 G5 B5 G5 D6 B5*   T: 2
ô6  P( 6): C6 G4 D5 E5 G5 C6   T: 1
ô7  P( 6): C5 E3 E3+B3 C4 A4 C5   T: 2
ô8  P( 5): F#4+F#4+A4+C5 C4 F#4 C4+A4 C5   T: 2
ô9  P( 6): B4 F#3 C4 F#3+Eb4 F#4 E4   T: 2
ô10 P( 7): Eb4+F#4+B4 Eb4+F#4+B4 Eb4+F#4+B4 Eb4+F#4+B4 Eb4+F#4+B4 Eb4+A4 Eb4+F#4   T: 4
```

Tay phải 6.3 mốc/ô · tay trái 1.9 mốc/ô · tay trái một mình 26% · tâm RH 69.9

#### Câu #1374 — giang tấu · Chưa ổn

**Ý kiến** (ý người dùng): chỗ Em đầu câu đánh lệch tiết tấu

**Vòng** — Mi thứ, 10 ô 6/8, `slow-rock-la-thu` (sổ ghi nhầm `bolero-linh-nhi-2`):

```
Em  Am  C    B7  Em  C    Am  F#m7b5  B7  B
i   iv  ♭VI  V7  i   ♭VI  iv  ii°     V7  V
```

**Nốt** (`*` = mốc lệch lưới 6/8, không rơi vào móc đơn/móc kép)

```
ô1  P(10): G4 G4* G4 B4* B3* G4* E4 G4 G4* G4*   T: 1
ô2  P( 4): A4 E4 E4 E4   T: 3
ô3  P( 6): E4 G3+G4 C3+E3 D4+E4 G3+G4 E3+E4   T: 2
ô4  P( 6): B3+Eb4+F#4 Eb4 F#3 B3 F#3+Eb4 Eb4+F#4   T: 1
ô5  P( 5): G4 D4+D5* G4* D4+D5* B3*   T: 4
ô6  P(11): C4 C4* E4+E5 G4+G5 B4 C5 E5 G5 E5 B5 G5*   T: 2
ô7  P( 6): A5 E4 B4 E4+C5 E5 D5   T: 2
ô8  P( 5): F#4+C5 C4+C4 F#4 C4+A4 C5   T: 3
ô9  P( 8): B4+Eb5 B3* Eb4+Eb5 F#4 A4 B4* B4+Eb5 F#5*   T: 2
ô10 P( 3): B5 A4 Bb4*   T: 1
```

Tay phải 6.4 mốc/ô · tay trái 2.1 mốc/ô · tay trái một mình 33% · tâm RH 68.6

#### Câu #1376 — dạo · Chưa ổn

**Ý kiến** (ý người dùng): Chỗ Em và Am đầu câu bị lệch tiết tấu

**Vòng** — Mi thứ, 10 ô 6/8, `slow-rock-la-thu` (sổ ghi nhầm `bolero-linh-nhi-2`):

```
Em  Am  C    B7  Em  C    Am  F#m7b5  B7  B
i   iv  ♭VI  V7  i   ♭VI  iv  ii°     V7  V
```

**Nốt** (`*` = mốc lệch lưới 6/8, không rơi vào móc đơn/móc kép)

```
ô1  P( 9): G4+G5 G4* G4+G5* G4+B4 B3* E4* G4 G4* G4*   T: 1
ô2  P( 5): A4 G4* E4+E5 E4+E5 E4+E5   T: 3
ô3  P( 4): C5 G4 G4 G4   T: 3
ô4  P( 7): B4 Eb4 F#4 A3+B4 F#4+C5 Eb4+Eb5 G4   T: 1
ô5  P( 6): G4 B3+B4 E3+G3 F#4+G4 B3+B4 G3+G4   T: 2
ô6  P( 6): G4 E4 G3+G3+E4 C4 G3+E4 E4+G4   T: 1
ô7  P( 5): A4 E4 G3+A4 G3+E4+B4 C5   T: 3
ô8  P( 5): F#4+F#4+A4+C5 C4 F#4 C4+A4 C5   T: 2
ô9  P( 5): B4 B3 Eb4* F#4 A4   T: 2
ô10 P( 3): B4 B4+Eb5* F#5+B5+B6   T: 1
```

Tay phải 5.5 mốc/ô · tay trái 1.9 mốc/ô · tay trái một mình 37% · tâm RH 68.7

#### Câu #1377 — kết · Chưa ổn

**Ý kiến** (ý người dùng): CHỗ Em/G bị bóp nhanh gây lệch tiết tấu

**Vòng** — Mi thứ, 9 ô 6/8, `slow-rock-la-thu` (sổ ghi nhầm `bolero-linh-nhi-2`):

```
Em/G  Cmaj7  Am  F#m7b5  B7  B7/A   Em  E
i/♭3  ♭VIΔ7  iv  ii°     V7  V7/♭7  i   I (Picardy)
```

**Nốt** (`*` = mốc lệch lưới 6/8, không rơi vào móc đơn/móc kép)

```
ô1  P( 9): G4+G5 G4* G4+G5* G4+B4 B3* E4* G4 G4* G4*   T: 1
ô2  P( 5): E4 B3+B4 E4 B3 G3   T: 4
ô3  P(10): A3 C4+F#4+C5 E4+E5 G4 E4+G4+A4 C5 E5 C5 G5 E5   T: 2
ô4  P( 6): F#4+F#5 C4 F#4+G4 C4+A4 C5 B4   T: 0
ô5  P( 4): B4 F#4 F#4 F#4   T: 3
ô6  P( 6): F#5 Eb4 Eb4+F#4+F#4 B4 F#4+Eb5 Eb4+F#5   T: 1
ô7  P( 7): E4+G5 B3 B3 F#4 G4 E5 G5   T: 0
ô8  P( 6): Ab3+A3 B3+E5+B5 E4+E4 E4 A5 A4+A5+A6   T: 0
ô9  P( 2): B5 E5+Ab5+B5+E6+Ab6+B6   T: 2
```

Tay phải 6.1 mốc/ô · tay trái 1.4 mốc/ô · tay trái một mình 46% · tâm RH 70.4

#### Câu #1378 — giang tấu · Chưa ổn

**Ý kiến** (ý người dùng): Chỗ Em đầu câu đánh giai điệu như bị bóp nhanh, gây lệch tiết tấu. Chỗ Am6 đang chạy nốt hay qua Em bị lệch nhịp

**Vòng** — Mi thứ, 10 ô 6/8, `slow-rock-la-thu` (sổ ghi nhầm `bolero-linh-nhi-2`):

```
Em  Am  C    B7  Em  C    Am  F#m7b5  B7  B
i   iv  ♭VI  V7  i   ♭VI  iv  ii°     V7  V
```

**Nốt** (`*` = mốc lệch lưới 6/8, không rơi vào móc đơn/móc kép)

```
ô1  P(10): G4 G4* G4 B4* B3* G4* E4 G4 G4* G4*   T: 1
ô2  P( 4): A4 E4 E4 E4   T: 3
ô3  P( 6): E4 G3+G4 C3+E3 D4+E4 G3+G4 E3+E4   T: 2
ô4  P( 5): Eb4 A3+A4 Eb4 A3 F#3   T: 4
ô5  P(10): E3 G3+C4+G4 B3+B4 D4 B3+D4+E4 G4 B4 G4 D5 B4   T: 2
ô6  P( 1): C5   T: 7
ô7  P( 6): C5 E3 E3+B3 C4 A4 C5   T: 2
ô8  P( 5): F#4+C5 C4+C4 F#4 C4+A4 C5   T: 3
ô9  P( 8): B4+Eb5 B3* Eb4+Eb5 F#4 A4 B4* B4+Eb5 F#5*   T: 2
ô10 P( 3): B5 A4 Bb4*   T: 1
```

Tay phải 5.8 mốc/ô · tay trái 2.7 mốc/ô · tay trái một mình 48% · tâm RH 66.5

**Lượt nghe 2 — sau bản 13f (vòng ghép mới, nắn nhịp, ô lai bolero)**

- **#1403 (Chưa ổn): khen cả câu, chỉ xin thêm một cú dặm E7 (V7) sau ô dập cuối rồi mới vào phiên
  khúc, và làm vậy mỗi lần soạn "theo khung này"** (ý người dùng). Câu kết bằng ô dập V7 của dạo Lá
  Thư (c7). **Đã xử:** dạo/giang nào kết bằng ô dập V7 Lá Thư (c7 · c80) thì thêm một ô: hai tay dặm
  V7 đủ bốn nốt ở phách đầu, ngân nửa ô rồi tắt — chừa nửa ô cho ca sĩ (luật mục 15: hợp âm hút cuối
  câu dạo tắt trước chỗ ca sĩ vào). Kết Một Cõi (chạy V7 rồi ngân V) không thêm. Độ ngân nửa ô là
  biên soạn.
- **#1382 (Đã ổn, mẫu)**: vòng ghép mới i/♭3 · ♭VIΔ7 · iv · iiø7 · V7 … kết V; tâm RH 80,5 — cao hơn
  tâm sheet bolero (73,6) gần một quãng bảy, n=1, **chưa xử**, chỉ ghi lại.
- **Ý người dùng qua tin nhắn** (không qua sổ), cùng lượt: *"Trong điệu Slow rock Lá Thư thì khi chia
  đôi hợp âm đừng đánh kiểu dặm hợp âm mà hãy theo kiểu rải"* — đã xử ở nút đệm (`raiHopAmChiaDoi`):
  hợp âm ngắn hơn một ô rải ba nốt lên theo móc đơn thay cho hai cú dặm ba nốt, và không đổi sang ô
  fill c22 (tay phải c22 cũng dặm). *"Câu giang tấu bị lỗi ko soạn mới sau mỗi lần bấm phát"* — sổ ghi
  giang tấu khác nhau mỗi lần bấm (#1383 · 1386 · 1389 · …, lanPhat 1), nhưng giang tấu lặp 2 vòng thì
  vòng hai bị ép theo độ dài vòng một: cụt ô kết hoặc lặng tới 12 phách (đo 4 lần bấm). Đã sửa
  `arrangement.ts`: câu soạn sẵn mỗi vòng dài theo câu của vòng ấy.

- **Ý người dùng qua tin nhắn, lần hai**: *"Giang tấu vẫn ko đổi câu mới sau mỗi lần bấm phát"*. **Số đo**:
  sổ ghi nốt giang đổi mỗi lượt, nhưng 20 lượt liền thì 10/20 câu giang mở bằng cùng một ô (giai điệu dạo
  Đừng Xa ô 1) và đuôi luôn là một trong hai cử chỉ kết của sheet — đầu và đuôi cố định nên nghe như một
  câu. **Đã xử**: ô mở xoay theo lượt (lượt liền nhau trùng 0/19, ô nhiều nhất 3–4/20), kết Một Cõi chỉ giữ
  ô ngân V cuối, ô chạy V7 trước nó soạn mới.

- **Ý người dùng, lần ba**: *"tại sao giang tấu vẫn ko đổi hợp âm mỗi lần phát giống như intro hay
  outro"* — tiếng đã đổi vòng, nhưng dòng hợp âm hiện dưới nhãn Giang tấu lấy vòng cố định ở đuôi điệp khúc;
  đã sửa cho hiện đúng vòng vừa soạn. *"Sao chọn Linh Run thì ko hề có gì cả … hãy soạn Linh Run cho điệu
  đang được chơi"* — ô đang hát bị bỏ qua dù người dùng tự chọn, và sổ Linh Run chỉ có 2 câu bolero 4/4;
  nay Linh Run slow rock lấy **8 câu chạy slow rock của chị** (đi lên ở nửa sau ô: móc đơn 1 · 1½ · 2 · 2½
  hoặc móc kép Một Cõi ô 4) + cao độ câu chạy bolero cùng giọng trên tiết tấu ấy, kết đúng cuối hợp âm.

- **Lượt nghe 3 (25/9/2026, ý người dùng qua tin nhắn)**: (1) mốc chuyển đoạn đặt 2 quãng tám · đệm 2
  phách · im 0 mà *"vẫn ko hề đánh đệm mà chạy nốt luôn và chạy xong vẫn nghỉ phách"* — số đo: câu chạy bắt
  đầu đúng ở phách đệm rồi dừng sớm, phần còn lại bị tắt đệm thành lặng; phần đệm trước câu chạy bị đổi sang
  ô c22 (dặm); "phách" của người dùng là móc đơn còn máy đếm nốt đen. Đã sửa: câu chạy đáp đúng vạch, đệm thường
  tới lúc câu chạy vào, phách nhân `gridUnit`. (2) *"phân tích thật kỹ cách Linh Nhi tạo câu run … Linh Run hiện
  tại quá dở"* — xem 13g. (3) *"phách mạnh là phách 1 và 4, còn lại là phách nhẹ. Hãy chia đều ra để đánh đệm
  phối hợp 2 tay"* — kiểu thử "Slow Rock Lá thư hai tay": tay trái 1 · 4, tay phải hợp âm 2 · 3 · 5 · 6.

- **Ý người dùng, sau lượt 3**: *"Chia 2 tay để đánh rải chứ ko phải để dặm hợp âm, và ko nhất thiết phải là
  chia đều"* — nút thử làm lại thành sóng rải vắt hai tay: trái gốc–5–8 (tiếng 1–3), phải 10–12–10 rồi 12–10–8
  (tiếng 4–6). Biên soạn trên rải c15 của chị, chưa đối chiếu được với sheet (sheet lúc hát không đệm hai tay).

- **ĐÃ ĐẠT (25/9/2026, ý người dùng)**: *"điệu Slow Rock Lá Thư và Slow rock hai tay Lá Thư đều đã đạt, các câu
  solo cũng đã đạt"*. Tổng kết cách bộ soạn học từ sheet và chọn hợp âm, nốt: **13h**.

#### Câu #1382 — dạo · Đã ổn *(mẫu)*

**Ý kiến** (ý người dùng): — (mẫu)

**Vòng** — E thứ, 11 ô 6/8, `slow-rock-la-thu`:

```
Em/G  Cmaj7    Am  F#m7b5  B7  B7/A  Em  F#dim  B  B7  B
i/G   ♭VImaj7  iv  iiø7  V7  V7/A  i   ii°    V  V7  V
```

**Nốt**

```
ô1  P( 5): G6 G5 G6 E5 B6   T: 2
ô2  P( 6): C7 G5 D6 G5+E6 G6 F#6   T: 2
ô3  P( 5): A5+C6+E6 E5 A5 E5+C6 E6   T: 3
ô4  P( 5): F#4+C6 C5+C5 F#5 C5+A5 C6   T: 3
ô5  P( 4): B5 B4 B4 B4   T: 3
ô6  P( 4): B4 B5 A4 A4+A5   T: 9
ô7  P( 8): G5+B5 E5 G4+G5 A5 B4+B5 E5 G4+G5 B5   T: 5
ô8  P( 5): F#4+A5 A4 A5 A5+B5 A5+C6   T: 1
ô9  P( 6): B5 F#4 C5 Eb5 F#5 B5   T: 1
ô10 P( 5): B5 B4 Eb5 F#5 A5   T: 2
ô11 P( 2): B4 F#5+B5+B6   T: 1
```

Tay phải 5.0 mốc/ô · tay trái 2.9 mốc/ô · tay trái một mình 59% · tâm RH 80.5

#### Câu #1403 — dạo · Chưa ổn

**Ý kiến** (ý người dùng): tất cả từ đầu tới cuối câu đều hay nhưng ở E7 cuối thì nên thêm 1 cú dặm hợp âm E7 nữa rồi mới vào phiên khúc. Hãy điều chỉnh và nếu sau này có soạn lại câu theo khung này thì nhớ làm tương tự

**Vòng** — A thứ, 10 ô 6/8, `slow-rock-la-thu`:

```
Am  E  Bdim  Am  F    Dm  Bm7b5   E7
i   V  ii°   i   ♭VI  iv  iiø7  V7
```

**Nốt**

```
ô1  P( 6): E5+A5 C4+E4 B4 E4+C5+E5 E5 A5   T: 1
ô2  P( 5): Ab5 Ab4 Ab5 A5 B5   T: 2
ô3  P( 4): B5 F5 F5 F5   T: 3
ô4  P( 6): D5 F4+F4+F5 B3+D4 C5+D5 F4+F5 D4+D5   T: 1
ô5  P( 6): C5 E3 E3+B3 C4 A4 C5   T: 2
ô6  P( 6): C5 F4 F4+G4 C5 G4 A4   T: 2
ô7  P( 5): D4+F4+A4 A3 D4 A3+F4 A4   T: 3
ô8  P( 5): B4 C4 D4 F4 B4   T: 2
ô9  P( 8): B4 E4 Ab4 A4 B4 E4 Ab3+Ab4 B4   T: 4
ô10 P( 7): Ab4+B4+E5 Ab4+B4+E5 Ab4+B4+E5 Ab4+B4+E5 Ab4+B4+E5 Ab4+D5 Ab4+B4   T: 4
```

Tay phải 5.8 mốc/ô · tay trái 2.4 mốc/ô · tay trái một mình 25% · tâm RH 70.9

---

## 17. Chưa đo — lỗ còn lại

- **Vị trí ô chia đôi** trong đoạn dạo: n=6, chưa thành luật.
- ~~Vị trí câu fill~~ — **đã đo**, xem mục 12.
- **Vốn giọng trưởng mỏng**: chỉ 3 bài (Biển Tình, Đường Xưa, Mùa Xuân).
- **Bolero giọng thứ mỏng**: chỉ 2 bài. Đây là chỗ đáng nạp sheet nhất.
- **Bolero giọng thứ mỏng nhất**: chỉ **2 bài** (Đừng Xa, Rừng Lá). Đây là chỗ đáng nạp
  sheet nhất, nhưng phải là sheet người dùng CHỌN đưa vào — xem mục xếp riêng bên dưới.

- **Đoạn kết** chưa có bộ hằng số riêng, đang dùng chung với đoạn dạo. Nay đã có số đo
  riêng cho nó (mục 5 và 9) nên làm được.

### Sheet XẾP RIÊNG — không đưa vào học

Có sheet trong `video/Linh_Nhi/` mà **cố ý không nạp vào corpus**. Đừng đề nghị nạp lại.

| sheet | trạng thái |
|---|---|
| `Tuyet roi-Linh Nhi.mxl` | **xếp riêng** — người dùng chốt không đưa vào md để học |
| `Papa- Linh Nhi.mxl` | đã bỏ khỏi danh sách từ trước |

Bên Cà Pháo cũng có sheet xếp riêng: **Sao anh chưa về** — người dùng chốt học sau, cùng
lượt với Tuyết Rơi. Và bài **Mơ** đã bị xoá khỏi corpus vì khai có đoạn solo mà không có
file.

**Tuyết Rơi.** Máy đọc được: bộ khoá 0, nhịp **4/4**, **123 ô**, tần suất
`Am=41 · Dm=18 · E=17 · B7=4 · F=1`, mở trên `Am` và đóng trên `Am/E` — **La thứ**.

Tôi từng đề nghị nạp nó vì nó đưa bolero giọng thứ từ 2 lên 3 bài, tức lấp đúng chỗ mỏng
nhất. Người dùng bác: *"xếp bài Tuyết Rơi ra riêng vì tôi thấy không cần đưa bài đó vào
md để học."*

Ghi lại đây để phiên sau không đề nghị lại. Vốn bolero thứ vẫn mỏng, nhưng lấp bằng sheet
KHÁC — người dùng chọn sheet nào thì nạp sheet ấy.

### Ba món trước đây thiếu — ĐÃ LÀM

Ba mục dưới từng nằm ở đây dưới nhãn "đã đo nhưng code chưa có". Nay đã dựng xong, mỗi
món có bài kiểm riêng khoá lại (`baMonLinhNhi.test.ts`).

**1 · Giang tấu lấy lại câu dạo.** Trước đó giang tấu dùng lối bám tay trái và sinh nốt
riêng, nên hai đoạn ra hai câu khác nhau. Nay giang tấu đi qua cùng bộ ghép tuyến và
cùng lượt với đoạn dạo, ra đúng cùng một câu.

*Đã thử rồi bỏ:* thêm phép lệch một ô cho khớp chỗ Biển Tình thêm ô mở ở đầu giang tấu.
Lệch ô làm hợp âm và vị trí ô không còn khớp nhau, bộ lọc bậc phá mất phép căn và tỉ lệ
trùng **tụt xuống 50%**. Vì hai vòng hợp âm vốn đã trùng 77% nên không cần lệch gì.

**2 · Điệp khúc dày bằng nắm dày hơn.** Số cũ trong code: phiên khúc **1,00** nốt/mốc và
điệp khúc **2,33** — một cái quá mỏng, một cái quá dày, cả hai đo trên n=1. Nay phiên
**1,22** (đúng bằng số đo) và điệp **1,67** (số đo 1,60), số mốc gõ giữ nguyên bằng nhau.
Mốc yếu chồng **đôi** chứ không phải bộ ba; phách mạnh vẫn một nốt.

**3 · Tay trái mỏng đi ở đoạn không lời.** Trước đó app ra 6,8 mốc/ô ở đoạn dạo và
**9,0 ở cả hai đoạn kết** — gấp đôi tới gấp ba bản ký âm. Nay:

| | app trước | app sau | bản ký âm |
|---|---|---|---|
| thứ · dạo | 6,8 | **4,4** | 4,6 |
| thứ · kết | 9,0 | **5,0** | 4,9 |
| trưởng · dạo | 6,8 | **6,8** | 6,8 |
| trưởng · kết | 9,0 | **3,0** | 3,2 |

Cả bốn trong sai số 0,2 mốc/ô. Đoạn dạo giọng trưởng **cố ý không hãm** — nó vốn đã đúng.

Trần đặt cao hơn đích một chút vì còn một bước cài hai tay bớt tiếp phía sau: đoạn dạo
giọng thứ để trần 5 thì ra 3,9, để 6 mới ra 4,4.

### Tay phải ở đoạn KẾT — đã hãm

Bản ký âm: **5,7 mốc/ô giọng thứ · 5,0 giọng trưởng**. App ra **6,8 và 6,1**, dày hơn
khoảng một phần năm. Nay **6,0 và 5,4**.

Cần gạt `density` không dùng được: đo `'medium'` và `'dense'` ra **số y hệt nhau**, đúng
như chú thích sẵn có trong code. Nên hãm thẳng sau khi đã dựng: mỗi lượt lấy ô đang dày
nhất rồi bỏ **nốt chen nhất** trong ô ấy — nốt có khoảng cách tới hai nốt kề nhỏ nhất.

Không đụng **ô cuối** (câu chạy kết là chủ ý) và không bỏ **nốt đầu ô**. Vì thế con số
không xuống hẳn tới đích; sai số còn 0,3–0,4 là mức làm được.

### Tay phải ở đoạn DẠO giọng thứ — ĐÃ THỬ, KHÔNG SỬA ĐƯỢC

Bản ký âm **6,9 nốt/ô**, app ra **5,6** — thiếu gần một phần năm. Giọng trưởng thì đúng
sẵn (5,4 so với 5,5), nên chỉ hụt ở giọng thứ.

Vốn ô trong bảng **thừa sức đạt**: trung bình 7,1 nốt/ô ở giọng thứ, phân bố
`1 3 5 5 6 6 7 7 7 7 7 7 7 8 8 8 8 8 8 8 9 9 10 11`.

Đã thêm một số hạng phạt theo khoảng cách mật độ vào phép chọn ô, quét trọng số
**0,5 · 0,6 · 1,2 · 1,5 · 2 · 3**:

| trọng số | thứ | trưởng |
|---|---|---|
| nền (không phạt) | 5,6 | 5,4 |
| 0,6 · 1,2 (hai chiều) | **5,6** | 5,4 |
| 2 (hai chiều) | **5,6** | 5,0 |
| 3 (một chiều) | 6,2 | **6,4** ← hỏng chỗ đang đúng |

**Giọng thứ đứng yên ở 5,6 với mọi trọng số dùng được.** Lý do: vòng hợp âm đoạn dạo do
`vonHopAmLinhNhi` rút ra, và bộ lọc **cùng bậc** thường chỉ còn **một ô ứng cử** mỗi chỗ.
Không còn gì để chọn thì cho điểm kiểu nào cũng vô nghĩa.

Đã **bỏ hẳn** số hạng ấy khỏi code — giữ lại một đoạn chú thích ghi chuyện này, để phiên
sau không dựng lại.

Muốn nâng thì phải **nới bộ lọc bậc**, tức đổi hoà thanh lấy mật độ. Chưa làm: hoà thanh
là thứ đã đo chắc (16/20 đoạn không mượn bậc ngoài bài), còn mật độ mới lệch một phần năm.

## 18. Bẫy đo đã sập — đọc trước khi đo lại

**Đọc giọng bằng hợp âm mở đầu đoạn dạo.** Biển Tình từng bị đọc là **Si thứ** vì đoạn
dạo mở trên `Bm`. Đếm cả bài thì `D=19` nhiều nhất, `Bm=13`, `F#m=13`, `A=12`, bài đóng
trên `D`, và vòng `D–Bm–F#m–Em–A–D` là **I–vi–iii–ii–V–I**. **Rê trưởng**; đoạn dạo chỉ
mở trên bậc vi. Giọng phải đọc bằng **đếm cả bài và xem bài đóng ở đâu**.

**So hai tỉ lệ khác mẫu số.** Đã mắc **ba lần** — đây là cái bẫy hay sập nhất.

1. So `86% / 52%` (mốc tay phải rơi trên mốc tay trái) với hằng số bám mốc (mốc tay trái
   được tay phải chạm) — hai mẫu số khác nhau.
2. So `0,62` (chỉ tính ô thưa) với `20–34%` (trung bình cả đoạn).
3. So **62 nốt** (bộ ghép tuyến trả về) với **50 nốt** (đoạn dạo ráp xong), kết luận "mất
   12 nốt", rồi đi lùng chỗ cắt — soi vòng cung mật độ, phép cài hai tay, các bộ lọc.
   Không chỗ nào cắt cả. Hai con số ấy chạy trên **đầu vào khác nhau**: trong app bộ ghép
   nhận **vòng hợp âm đoạn dạo đã rút ra**, còn phép đo rời nhận **vòng hợp âm của bài**.

Ca thứ ba khác hai ca đầu ở chỗ nó không phải hai *tỉ lệ* mà hai *số đếm* — nhưng cùng
một lỗi: **hai vế không được đo trên cùng một thứ**.

Trước khi so hai con số, nói rõ **mẫu số của từng con**, và với số đếm thì nói rõ **đầu
vào của từng con**.

**Đếm cụm fill mà gộp nốt cùng mốc.** Nắm hợp âm bị đếm thành bước nhảy giai điệu: ra
146 cụm / 8% liền bậc. Đếm đúng (lấy nốt trên cùng mỗi mốc, thời gian tăng nghiêm ngặt)
ra **54 cụm / 18%**.

**So vòng hợp âm bằng danh sách ký hiệu.** Phải trải ký hiệu ra **từng ô** và điền ô
trống bằng hợp âm đang vang. Xem mục 14.

**Máy đọc sai hợp âm ba lần cùng một kiểu**: bass lướt `Ab` thành `Abmaj7` (thật là `G`);
nốt lướt nửa cung `Eb` thành `F#dim7` (thật là `F#ø7`); nốt giai điệu `G#` thành `AmMaj7`
(15/22 ô không có gì đỡ). Hợp âm máy đọc phải soi lại bằng mắt.
