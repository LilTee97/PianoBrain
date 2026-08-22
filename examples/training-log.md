# Nhật ký training Mr Hai

Học trò khó tính hỏi, Mr Hai trả lời, mỗi câu chạy thật bằng `npm run ask -- "..."`.
Mọi câu dưới đây là chữ Thầy in ra, không phải người viết log trả lời thay.

Ngày chạy: kho 764 item / 70 bài. Test cuối: **94/94 xanh**.

---

## Vòng 1 — bắt lỗi

| # | Câu hỏi | Kết luận | Ghi chú |
| --- | --- | --- | --- |
| 1 | vòng C Am F G trên tone C xếp bậc sao | **ỔN** | `C=I, Am=vi, F=IV, G=V` — một dòng, không dump |
| 2 | phối C Am F G | **ỔN** | 1 bảng suy từ thầy, không kèm fill |
| 3 | thầy dạy E7b9 về Am chưa | **ỔN** | ĐÃ CÓ, dẫn `tap-02-bai-07-lesson-id-00034` |
| 4 | thầy dạy A7b9 trước F trên vòng 1645 chưa | **ỔN** | CHƯA CÓ, giải thích A7b9 không phải át của F |
| 5 | câu lót vòng 1 6 4 5 giọng C | **ỔN** | 2 fill của thầy |
| 6 | chạy ngón từ Cmaj7 sang Am | **BUG → đã sửa** | xem B1, B2 |
| 7 | xin chào thầy | **BUG → đã sửa** | xem B3, B4 |
| 8 | G/B Am7 F C tông C xếp bậc | **ỔN** | `V-vi-IV-I`, bỏ đúng nốt bass |

### Lỗi đã sửa ở vòng 1

**B1 — từ nối cắt đứt vòng hợp âm.** `Cmaj7 sang Am` không đọc được vì "sang" chen giữa,
parser đòi hai hợp âm liền nhau. Thêm danh sách từ nối (sang, về, đến, tới, qua, rồi, lên, xuống…)
và lọc bỏ trước khi tìm chuỗi. *(src/mrhai/parse.ts)*

**B2 — mất chất hợp âm người học gõ + thiếu nhãn.** Gõ `Cmaj7` mà Thầy in `C`, và câu chạy ngón
không ghi đây là suy luận. Giữ lại `qualities` khi đọc tên hợp âm; thêm nhãn `[suy từ nguyên lý]`.

**B3 — câu chào bị đem đi tra kho.** "xin chào thầy" trả về ĐÃ CÓ kèm một item về điệu Boston.
Thêm nhánh `greet` trong router: chào thì chào lại, không tra.

**B4 — audit khớp chuỗi con.** Từ "xin" trúng tên bài hát nằm trong ghi chú của item.
Đổi sang khớp **từ trọn vẹn**: `walkin` và `bas` giờ không còn trúng `walking` / `bass`.
*(src/mrhai/audit.ts)*

---

## Vòng 2 — đệm hát

| # | Câu hỏi | Kết luận | Ghi chú |
| --- | --- | --- | --- |
| 1 | đệm verse ballad vòng 1 6 4 5 tay trái làm gì | **ỔN** | 1 khuôn của thầy + mật độ verse 2 → pre 3 → chorus 4 |
| 2 | chorus dày hơn verse chứ, cùng vòng C Am F G | **BUG → đã sửa** | xem B5 |
| 3 | intro 4 ô trước khi hát C Am F G | **BUG → đã sửa** | xem B5 |
| 4 | outro kết bài ballad | **ỔN** | ĐÃ CÓ, 5 item của thầy |
| 5 | voicing tay trái 1-5 trên C | **BUG → đã sửa** | xem B6 |
| 6 | fill trước khi vào F | **SAI NHÃN → đã sửa** | xem B7 |
| 7 | sus4 chỗ kết câu trên G thì thầy dạy sao | **BUG → đã sửa** | xem B8 |

### Lỗi đã sửa ở vòng 2

**B5 — thiếu hẳn topic `intro`, `outro`, và các đoạn bài.** Hỏi "chorus dày hơn verse chứ" hay
"intro 4 ô" đều rơi về mặc định "xếp bậc + hỏi lại". Thêm topic `intro`, `outro`, và nhét
`verse|chorus|bridge|phiên khúc|điệp khúc|đoạn` vào topic `comp`.

**B6 — `1-5` bị đọc thành vòng bậc I-V.** "voicing tay trái 1-5 trên C" ra `C=I, G=V`.
Câu nào có chữ `voicing / thế bấm / quãng / bè` thì bỏ hẳn cách đọc bằng số — ở đó `1-5` là quãng.
Thêm luôn topic `voicing`.

**B7 — 185 item mang tên máy.** Câu trả lời in ra `voicing_choice`, `comping_generation`,
`tension_choice`… vì bộ chuyển lấy `rule_type` làm tên khi bản chuẩn hóa không có `name`.
Sửa thứ tự dự phòng trong `convertFormal`: tên thật → tóm tắt tầng thô → **mệnh đề đầu của mô tả**
→ mới tới `rule_type`. Chuyển lại 70 bài: **còn 0 item tên máy**. *(src/migrate/importMaster.ts)*

**B8 — câu dài luôn trượt.** Audit đòi *mọi* từ trong câu phải có trong item, nên
"sus4 chỗ kết câu trên G thì thầy dạy sao" ra 0 kết quả dù kho có 5 item về sus4 ở chỗ kết câu.
Mở rộng danh sách từ để hỏi (chỗ, trên, sao, thì, khi, trước, vào, cho, nhé, ạ…) trước khi tìm.

---

## Vòng 3 — licks / runs / improv Jazz & Blues

Hải Piano thiên ballad và pop, nên phần lớn **CHƯA CÓ** là kết quả đúng, không phải lỗi.

| # | Câu hỏi | Kết luận | Thiếu gì |
| --- | --- | --- | --- |
| 1 | lick ii-V-I jazz giọng C | **THIẾU** | Đọc đúng `ii-V-I`, nhưng kho chỉ có 1 ý solo seed (`solo-idea-target-third`). Không có lick jazz nào của thầy. |
| 2 | blues lick 12 ô trên C7 | **THIẾU** | CHƯA CÓ. Kho không có blues, không có vòng 12 ô. |
| 3 | mixolydian run trên G7 | **ỔN** | CÓ THỂ SUY LUẬN — `generateRun` có sẵn ngũ cung át (1-2-3-5-b7). Nhưng phải cho hợp âm đích thì mới sinh được. |
| 4 | enclosure vào bậc 3 của Am | **THIẾU** | CHƯA CÓ. Không có item nào về enclosure. |
| 5 | chromatic approach vào Cmaj7 | **THIẾU** | CHƯA CÓ. Kho có *chromatic fingering* (`tap-03-bai-04-rule-chromatic-fingering-001`) nhưng không có nốt tiếp cận nửa cung như một kỹ thuật ngẫu hứng. |
| 6 | improvisation chorus 1645 phong cách swing | **THIẾU** | CÓ THỂ SUY LUẬN nhờ bộ sinh, nhưng 0 item của thầy về ngẫu hứng swing. |
| 7 | walking bass C Am F G | **THIẾU** | Kho **có** 5 item walking bass (Tập 6 Bài 8, swing) nhưng câu trả lời ra khuôn Slowrock, vì Mr Hai lọc theo `pop_ballad` còn walking bass gắn `jazz`. Chưa suy được điệu từ câu hỏi. |

### Lỗi đã sửa ở vòng 3

**B9 — `lick` / `solo` không có topic.** "lick ii-V-I jazz giọng C" chỉ ra bậc rồi hỏi lại.
Thêm topic `solo` (`lick|solo|ngẫu hứng|improv|giang tấu`), rỗng thì nói thẳng
"Kho chưa có ý solo nào khớp vòng này — thầy không bịa lick cho em."

**B10 — câu nhạc rõ ràng bị coi là "chưa rõ ý".** "enclosure vào bậc 3 của Am" và
"blues lick 12 ô trên C7" đều ra câu hỏi lại, thay vì nói CHƯA CÓ. Nay câu nào có tên hợp âm thật
(`Am`, `C7`, `Cmaj7` — bỏ qua "Em" vì là đại từ) thì đi thẳng sang kiểm toán kho.

**B11 — hỏi bass không ra bass.** Thêm `walking bass|bass` vào topic `comp`.
Vẫn còn hạn chế lọc theo điệu, ghi ở mục dưới.

**Không tạo item nào trong vòng 3.** Không có lick nào được bịa rồi gán cho thầy.

---

## 10 thứ kho chưa làm được

1. **Jazz lick** — không có một lick ii-V-I nào của thầy. Chỉ có 1 ý solo seed tự dựng.
2. **Blues** — không có blues scale, blue note, vòng 12 ô, hay lick blues.
3. **Walking bass dùng được** — có 5 item nhưng gắn điệu swing; hỏi trên vòng ballad thì không ra.
4. **Enclosure** — không có item nào về bao vây nốt đích.
5. **Chromatic approach** như kỹ thuật ngẫu hứng — chỉ có chromatic ở phần thế ngón.
6. **Ngẫu hứng theo phong cách** (swing, bossa, latin) — không có item nào hướng dẫn improv.
7. **Bộ sinh cho fill / intro / outro / solo** — mới có `generateRun` cho câu chạy ngón; bốn loại kia
   chỉ tra được item, chưa sinh được nốt.
8. **Suy điệu từ câu hỏi** — Mr Hai luôn mặc định `pop_ballad`; nói "swing" hay "bossa" không đổi được bộ lọc.
9. **Độ khó thật** — 740 item chuyển từ kho master đều để mặc định 3, chưa ai rà tay.
10. **12 bài kho gốc chưa trích xuất đủ** (1 bỏ theo yêu cầu, 11 dở dang) và 57 bài mốc thời gian
    kém tin cậy vì source map thiếu video id.

Muốn lấp mục 1–6 thì phải **ingest nguồn jazz/blues mới** theo [ingest/PIPELINE.md](../ingest/PIPELINE.md).
Mục 7–8 là việc code. Mục 9–10 là việc rà tay.
