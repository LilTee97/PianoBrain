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

Cả năm: điệu `bolero-linh-nhi-2`, đoạn dạo 9 ô. Câu **#29, #40 và #43 là bài giọng TRƯỞNG**,
hai câu đầu đều La thứ — đừng gộp năm câu thành một xu hướng.

> **Chỉ câu CÓ LỜI BÌNH mới được chép đủ bộ ba** (lời · vòng hợp âm · nốt). Người dùng
> chốt: *"bây giờ chỉ những phần intro có bình luận thì mới đưa cả bộ 3 qua md Linh Nhi
> để sửa."* Câu chỉ được tick thì giữ một dòng trong bảng làm dấu vết — một chữ "Chưa ổn"
> trơ trọi không nói được chỗ nào chưa ổn, chép cả trăm nốt sang thì sổ phình vô ích.
>
> Nên câu **#3** chỉ còn dòng bảng; câu **#7** có lời nên đủ bộ ba.

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
