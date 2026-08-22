# Nhạc sĩ đệm hát ngồi thử PianoBrain

Mỗi câu chạy thật bằng `npm run ask -- "..."`. Câu 6, 7, 10-12 gọi thẳng `generateFill` /
`generateIntro` / `generateOutro` vì chat chưa có chỗ nhập lời hát.

Kho lúc chạy: 850 item, 76 nguồn, 6 thầy. Test cuối: **189/189 xanh**.

## A. Thầy Hải không bị thay

| # | Câu | Kết quả | Vì sao |
| --- | --- | --- | --- |
| 1 | `câu lót vòng C Am F G` | **PASS** | Hai item `[hai-joseph]` đứng trước, câu suy từ kingsley nằm dưới |
| 2 | `thầy Hải dạy lick ii-V-I chưa` | **PASS** | CHƯA CÓ, và nhắc đúng tên `mack-grout, charlie-tran` là nguồn đang có |
| 3 | `bossa nova tay trái` | **PASS** | In "Kho có 2 trường phái", xen kẽ Hải (bass legato) và Peter (tay trái thưa), đủ nhãn |

## B. Fill Kingsley và chỗ ca sĩ nghỉ

| # | Câu | Kết quả | Vì sao |
| --- | --- | --- | --- |
| 4 | `câu lót C G Am F` | **PASS** | Ô trước Am là G nên lùi về `preceding 3-2-1`, không dùng 1-7-5-3 |
| 5 | `câu lót C Am F G` | **PASS** | Ô trước Am đúng bậc I nên ra `C5 - B4 - G4 - E4` |
| 6 | vocal `hát,hát,nghỉ,hát` trên C G Am F | **PASS** | Câu chạy nằm ở ô 2 (G), đáp `C5` xuống đúng ô 3 là ô ca sĩ nghỉ |
| 7 | vocal `full` | **PASS** | 0 nốt tay phải, chỉ giữ pad; nói rõ "ca sĩ hát kín, thầy không lót" |
| 8 | `fill sus2 sang 3 ballad` | **PASS** | Ra `[kingsley, chờ rà] kingsley-sus2-to-3`, không có hai-joseph |
| 9 | Nốt hoa mỹ trên G, tông C | **PASS** | In `Bb4→B4`, không phải A# — b3 phải viết bằng dấu giáng |

## C. Intro và outro

| # | Câu | Kết quả | Vì sao |
| --- | --- | --- | --- |
| 10 | intro 4 ô C G Am F | **PASS** | sus4 chỉ ở ô 2 (G, bậc V); ô 4 (F) dùng sus2, không có nốt Bb |
| 11 | outro tông C | **PASS** | `G4 - E4 - D4 - C4`, căn cứ `kingsley-reversed-add2-outro` |
| 12 | intro tông D | **PASS** | Ô 1 ra `D4+F#4+A4 → E4 → F#4`, khác hẳn tông C — không hardcode |

## D. Không bịa thầy

| # | Câu | Kết quả | Vì sao |
| --- | --- | --- | --- |
| 13 | `blues lick 12 ô C7` | **PASS** | CHƯA CÓ + đề xuất ingest; không gán cho hai-joseph |
| 14 | `phối Db Gb Abm Cb` | **FAIL → đã sửa** | Xem B1 |

### B1 — nốt `Cb` làm sập cả chương trình

`pitchOfNote` tra bảng tên nốt, mà bảng chỉ có 12 tên thăng và 12 tên giáng thông dụng.
`Cb`, `Fb`, `E#`, `B#` không nằm trong bảng nên nó ném lỗi và Mr Hai chết hẳn — người học gõ
một vòng ở tông giáng lạ là mất luôn câu trả lời, chứ không phải nhận câu "kho chưa có".

Sửa gốc: tính cao độ bằng **chữ cái cộng dấu hoá** thay vì tra bảng.
Sau khi sửa, câu 14 ra đúng: *"Kho chưa có bảng màu nào cho vòng này. Thầy không bịa cho em đâu."*
Thêm test canh `Cb / Fb / E# / B#`, và canh cả việc vòng lạ không được đẻ ra item của thầy nào.

## Tổng

**14/14 PASS** sau khi sửa. Lần chạy đầu 13/14 (**93%**), một lỗi sập chương trình.

## Ba việc nên làm tiếp — **đã làm xong**

1. ~~Câu chữ về chỗ đặt fill chưa khớp nốt thật.~~ Cụm `preceding 3-2-1` nay in **"phách 4"**;
   câu bốn nốt vẫn in "phách 3-4". Có test so dòng chữ với phách của nốt thật.
2. ~~Tông giáng lạ bị đổi cách viết.~~ Nốt gốc của mỗi bậc nay đánh vần theo **chữ cái của bậc**
   rồi mới thêm dấu hoá, nên `Cb Fb Bbm Gb` in đúng thay vì `B E Ab`. Các tông cũ không đổi.
3. ~~Chat chưa nhập được chỗ ca sĩ nghỉ.~~ `npm run ask` nay hiểu **"ô 3 nghỉ"**,
   **"hát,hát,nghỉ,hát"** và **"hát kín"**. Không nói gì thì vẫn cảnh báo như cũ.

Kèm một lỗi in lộ ra khi làm việc 3: chế độ "hát kín" không có nốt nào nên chat in ra dòng
rỗng `→   ()`. Nay in `tay phải để trống`.

Sau ba sửa: **199/199 test xanh**.
