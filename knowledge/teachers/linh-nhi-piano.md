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

Cả hai: điệu `bolero-linh-nhi-2`, đoạn dạo 9 ô.

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
