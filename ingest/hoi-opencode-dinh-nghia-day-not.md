# Hỏi OpenCode — thế nào là "một dãy nốt" trong bản ký âm Linh Nhi

Người đọc file này **không có ngữ cảnh phiên trước**, nên phần 1–3 dựng lại đủ bối cảnh.
Câu hỏi thật nằm ở **mục 5**.

---

## 1. Bối cảnh: chuyện này phục vụ việc gì

Hai kho, đọc một chiều:

| kho | việc |
|---|---|
| `D:\PianoBrain\` | đo bản ký âm của các thầy piano, cất tri thức vào `knowledge/` |
| `D:\KeyTrain\` | ứng dụng đệm hát; **đọc** PianoBrain, không bao giờ ngược lại |

KeyTrain có một bộ **soạn câu dạo** (intro) theo lối chơi của cô Linh Nhi. Nguyên tắc người
dùng đã chốt và không được phá:

> Câu solo là thứ được **SOẠN**, không sinh bằng xúc xắc. Mỗi ô nhịp của bài đang mở được
> ghép bằng **một ô nhịp CÓ THẬT** trong bản ký âm của chính cô ấy, chọn theo bậc hợp âm và
> phép nối giọng. **Không có bước nào bịa nốt.** Và **cấm chép nguyên một câu dạo có sẵn**.

Người dùng vừa nhận xét, nguyên văn:

> *"Hãy đọc lại trong các sheet của Linh Nhi sẽ thấy có các đoạn ngắn tay phải chơi một dãy
> nốt. Hãy liệt kê ra và nếu không chắc hãy làm phiếu hỏi tôi."*

Tôi đo thử, và **tắc ngay ở chỗ định nghĩa** — nên mới có file này.

---

## 2. Dữ liệu đang có

**7 bản ký âm Linh Nhi**, định dạng MusicXML, đăng ký trong
`D:\PianoBrain\tools\sheet\corpus.json`, file thật nằm ở `D:\PianoBrain\video\Linh_Nhi\`:

| bài | giọng | thể loại | nhịp |
|---|---|---|---|
| Biển Tình | Rê trưởng | bolero | 4/4 |
| Đừng Xa Em Đêm Nay | Rê thứ | bolero | 4/4 |
| Lá Thư Trần Thế | Rê thứ | slow rock | 4/4 |
| Một Cõi Đi Về | Sol thứ | slow rock | **3/4** |
| Đường Xưa Lối Cũ | Đô trưởng | bolero | 4/4 |
| Mùa Xuân Đầu Tiên | Sol trưởng | bolero | 4/4 |
| Rừng Lá Thấp | La thứ | bolero | 4/4 |

Mỗi bài chia đoạn trong `corpus.json` (`sections.intro / interlude / outro`). Phép đo dưới
đây **chỉ lấy ba đoạn không lời** ấy và **chỉ khuông tay phải** — vì ở phần hát thì tay phải
là **giọng ca**, không phải câu đàn (luật đã chốt cho cả ba thầy).

Bộ đo: `D:\PianoBrain\tools\sheet\chay_not.py`.

---

## 3. Thuật toán đang dùng, và hai hằng số quyết định mọi thứ

Hàm `chuoi()` trong `chay_not.py`, chép nguyên phần lõi:

```python
NHANH = 0.26        # nốt đen = 1.0; 0.25 là móc kép, 0.125 là móc ba
TOI_THIEU = 4       # dưới bấy nhiêu nốt thì không gọi là một chuỗi

def chuoi(notes):
    moc = {}
    for n in notes:
        moc.setdefault(round(n['beat'], 4), []).append(n)
    out, cum = [], []
    for m in sorted(moc):
        g = moc[m]
        dur = min(x['dur'] for x in g)
        # Chỉ lấy MỘT nốt mỗi mốc: câu chạy là một bè đơn.
        if len(g) > 2 or dur > NHANH:
            if len(cum) >= TOI_THIEU: out.append(cum)
            cum = []
            continue
        if cum and m - cum[-1][0] > dur * 1.6 + 1e-6:
            if len(cum) >= TOI_THIEU: out.append(cum)
            cum = []
        cum.append((m, max(x['midi'] for x in g), dur, g[0]['bar'], g[0]['off']))
    if len(cum) >= TOI_THIEU: out.append(cum)
    return out
```

Đọc ra thành lời:

1. Gom nốt tay phải theo **mốc gõ** (cùng `beat` thì cùng một mốc).
2. Mốc nào có **quá 2 nốt chồng** → coi là nắm hợp âm, **cắt chuỗi**.
3. Mốc nào có nốt **dài hơn `NHANH`** → **cắt chuỗi**.
4. Hai mốc cách nhau quá `dur × 1.6` → **cắt chuỗi** (có khoảng nghỉ ở giữa).
5. Chuỗi còn lại dài từ `TOI_THIEU` nốt trở lên thì tính.

**Bộ này vốn viết cho thầy Cà Pháo**, người chơi bossa nova và có câu chạy ngón móc kép rất
rõ — ở anh ấy nó bắt được 8 câu chạy trong 19 ô giang tấu của một bài. Linh Nhi chơi bolero,
chậm hơn hẳn, nên **chưa chắc hai hằng số ấy còn đúng với cô**.

---

## 4. Số đo: đổi ngưỡng thì kết quả đổi gấp mười hai lần

Chạy trên đúng 7 bài × 3 đoạn ở trên:

| ngưỡng | số chuỗi |
|---|---|
| `NHANH = 0.26`, `TOI_THIEU = 4` — chỉ móc kép trở lên | **10** |
| `NHANH = 0.50`, `TOI_THIEU = 4` — có cả móc đơn | **64** |
| `NHANH = 0.50`, `TOI_THIEU = 3` | **119** |

**Đây là chỗ tắc.** 10 chuỗi trên 7 bài nghĩa là *"dãy nốt là thủ pháp hiếm, gặp thì chép,
không cần dựng cơ chế riêng"*. 119 chuỗi nghĩa là *"đây là cách cô ấy viết giai điệu, bộ
soạn phải biết làm"*. Hai kết luận dẫn tới hai việc hoàn toàn khác nhau trong KeyTrain.

### 4.1 Toàn bộ 10 chuỗi ở mức chặt nhất

| # | bài | đoạn | ô | vào phách | nốt | các bước (nửa cung) |
|---|---|---|---|---|---|---|
| A1 | Biển Tình | kết | 71 | 1,75 | `E5 F#5 A5 D6 E6` | +2 +3 +5 +2 |
| A2 | Đừng Xa | giang | 56 | 1,00 | `F6 E6 D6 A5 F5 E5 D5 F#4 A4 E4` | −1 −2 −5 −4 −1 −2 −8 +3 −5 |
| A3 | Đừng Xa | kết | 84 | 3,62 | `D7 E5 G5 A5 A6` | **−22** +3 +2 +12 |
| A4 | Lá Thư | kết | 106 | 2,50 | `A6 G6 D6 D7 A4` | −2 −5 +12 **−29** |
| A5 | Một Cõi | dạo | 3 | 1,50 | `A4 Bb4 A4 G4 F#4 Eb4` | +1 −1 −2 −1 −3 |
| A6 | Một Cõi | dạo | 4 | 0,50 | `D4 D4 F#4 F#5 A5 D5 F#5 A5 F#5` | 0 +4 **+12** +3 −7 +4 +3 −3 |
| A7 | Một Cõi | giang | 56 | 1,50 | `A4 Bb4 A4 G4 F#4 F#5` | +1 −1 −2 −1 **+12** |
| A8 | Một Cõi | giang | 57 | 2,00 | `A5 F#5 C6 A5` | −3 +6 −3 |
| A9 | Đường Xưa | dạo | 3 | 3,00 | `D5 E5 F5 C5 A5` | +2 +1 −5 +9 |
| A10 | Mùa Xuân | kết | 106 | 2,25 | `A5 D5 E5 B4` | −7 +2 −5 |

Chia theo đoạn: **dạo 3 · giang 3 · kết 4**. Chia theo bài: Một Cõi 4 · Đừng Xa 2 · bốn bài
còn lại mỗi bài 1 · **Rừng Lá Thấp 0**.

### 4.2 Lọc theo bước đi thay vì theo trường độ — 8 chuỗi

Điều kiện: mỗi bước không quá 4 nửa cung (một quãng ba), nốt ≤ 0,5 phách, ≥ 4 nốt.

| # | bài | đoạn | ô | phách | ngân | nốt |
|---|---|---|---|---|---|---|
| C1 | Biển Tình | giang | 55 | 1,50 | 0,50 | `E6 D6 E6 F#6 A6 B6` |
| C2 | Một Cõi | dạo | 3 | 1,50 | 0,25 | `A4 Bb4 A4 G4 F#4 Eb4 Eb4` |
| C3 | Một Cõi | dạo | 9 | 1,00 | 0,38 | `D4 F#4 A4 C5` |
| C4 | Một Cõi | giang | 54 | 1,62 | 0,12 | `Bb4 G4 Bb4 Bb4 Bb4` |
| C5 | Rừng Lá | dạo | 7 | 3,50 | 0,25 | `B5 D6 B5 A5 G5` |
| C6 | Rừng Lá | dạo | 9 | 1,25 | 0,25 | `E4 G4 B4 A4` |
| C7 | Rừng Lá | kết | 73 | 3,00 | 0,50 | `G5 E5 G5 G5 G5` |
| C8 | Rừng Lá | kết | 74 | 3,50 | 0,25 | `B5 D6 B5 A5` |

---

## 5. ĐIỀU TÔI THỰC SỰ MUỐN HỎI

Ba câu, xếp theo mức quan trọng. Câu 1 là câu chặn — hai câu sau treo vào nó.

### Câu 1 — "một dãy nốt" nên định nghĩa bằng cái gì?

Ba ứng viên, và tôi không có cơ sở để tự chọn:

- **A · theo TRƯỜNG ĐỘ** — dãy nốt là chỗ **chạy nhanh** (móc kép trở lên). Ra 10 chuỗi.
- **B · theo trường độ, nới ra móc đơn** — dãy nốt là chỗ nốt **đi đều liên tiếp**, không
  cần nhanh. Ra 64 chuỗi.
- **C · theo BƯỚC ĐI** — không quan tâm nhanh chậm, chỉ cần **các nốt đi liền nhau**, mỗi
  bước không quá một quãng ba. Ra 8 chuỗi.

Điều tôi muốn nghe không phải "chọn A đi", mà là **lý lẽ âm nhạc**: khi một người đệm piano
nói *"chỗ này tay phải chạy một dãy nốt"*, họ đang nghe ra cái gì — tốc độ, sự liên tục của
bước đi, hay cả hai? Trong bolero Việt Nam cụ thể thì mốc nào là hợp lý?

### Câu 2 — năm chuỗi tôi ngờ là rác của phép đo, có đúng là rác không?

- **A3** mở bằng bước **−22 nửa cung** (`D7 → E5`), **A4** có bước **−29** (`D7 → A4`).
  Theo tôi đây không phải một dãy, mà là phép đo gom nhầm hai việc rời nhau vào một chuỗi.
- **A6** có bước **+12** (`F#4 → F#5`) giữa chuỗi, **A7** kết thúc bằng **+12**. Đây là *dãy
  rải hợp âm* hay vẫn tính là *chạy ngón*?
- **C4** (`Bb4 G4 Bb4 Bb4 Bb4`) và **C7** (`G5 E5 G5 G5 G5`) chỉ **gõ lặp một cao độ**, không
  đi đâu cả. Theo tôi không phải dãy nốt.

Nếu bỏ A3 · A4 · A6 thì mức A còn **7 chuỗi trên 7 bài**.

**Nguyên nhân kỹ thuật tôi nghi:** hàm `chuoi()` lấy `max(midi)` mỗi mốc gõ. Khuông tay phải
của các bản ký âm này có cả **nốt đáp trầm** (nốt thấp hẳn, có bài xuống tới MIDI 52) nằm xen
giữa tuyến giai điệu. Lấy nốt cao nhất thì lúc dính nốt trầm, lúc dính nốt cao — sinh ra
những bước nhảy 22–29 nửa cung không ai soạn ra. **Nhờ kiểm giúp giả thuyết này bằng cách mở
thẳng file MusicXML ở hai chỗ A3 và A4.**

### Câu 3 — có nên tách "dãy nốt" thành hai loại khác nhau không?

Nhìn danh sách thì tôi thấy hai thứ đang bị gộp làm một:

1. **Chạy liền bậc** — `A4 Bb4 A4 G4 F#4 Eb4` (A5), `E6 D6 E6 F#6 A6 B6` (C1). Bước nhỏ, đi
   theo gam.
2. **Rải hợp âm** — `D4 F#4 A4 C5` (C3), `E4 G4 B4 A4` (C6). Bước quãng ba, đi theo nốt hợp âm.

Hai thứ này nghe khác hẳn nhau và có lẽ dùng ở hai chỗ khác nhau. Có nên đếm riêng không, hay
người chơi thật vẫn coi chúng là một?

---

## 6. Trả lời thế nào cho tôi dùng được

Xin trả lời theo đúng ba câu trên, và:

- **Nêu cơ sở, đừng chỉ nêu kết luận.** Nếu mở file MusicXML ra kiểm thì nói rõ bài nào ô
  nào, thấy gì. Nếu là kinh nghiệm nghe thì nói rõ đó là kinh nghiệm.
- **Ghi cỡ mẫu** cho mọi con số. Kho chỉ có 7 bài — đừng phát biểu như đã đo trăm bài.
- Nếu nghĩ **cả ba định nghĩa đều sai**, cứ nói và đề nghị cái thứ tư, kèm ngưỡng cụ thể để
  tôi chạy lại được.
- Nếu cần thêm số đo mới trả lời được thì **nói rõ cần đo gì** — tôi chạy rồi gửi lại.

## 7. Chạy lại các con số ở file này

```bash
cd D:\PianoBrain
set PIANOBRAIN_SHEETS=D:\PianoBrain\video\Linh_Nhi
python tools\sheet\chay_not.py "Linh"       # hoặc lọc theo tên bài
```

Đổi ngưỡng thì sửa `NHANH` và `TOI_THIEU` ở đầu `tools/sheet/chay_not.py`.

Cách đọc file `.mxl` thô: `tools/sheet/mxl.py` (`load` rồi `notes`), kèm
`tools/sheet/clone_do.py:sua_o` để vá số ô nhịp — **bắt buộc dùng `sua_o`**, thiếu nó thì
mốc phách trong ô sai và mọi phép đo lệch theo.
