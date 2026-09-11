# Đối chiếu phiếu Cà Pháo — ba sheet mới

Ngày 11/09/2026. Bản trả lời hỗ trợ người dùng chuyển cho Claude.

Đã đọc phiếu web và các câu trả lời về biên đoạn đang lưu:
https://claude.ai/code/artifact/fcb4e6f0-4cc5-49a5-bd01-ee5ca4719f13

Đã đối chiếu trực tiếp MusicXML của ba file trong `D:/PianoBrain/video/Ca_Phao`,
cùng `ingest/phieu-chia-doan-ca-phao-3-bai-moi.md`, `tools/sheet/mxl.py` và
`tools/sheet/do_ranh_doan.py`. Không sửa câu trả lời trên web, parser hay corpus.
Không có bản thu được nghe trong lượt kiểm tra này.

## Kết luận cần áp dụng trước khi hỏi thêm

**Phiếu có quá nhiều nghi vấn vì phép đo lẫn số đầu nốt với số lần gõ, bỏ qua
nốt nối và có lỗi thời điểm nốt chồng.** Đừng biến các nghi vấn này thành 47
việc người dùng phải giải đáp bằng tai. Đồng thời, cả ba file đều không có
thẻ lời `lyric`, không có bè vocal riêng và không có chú thích chữ `words`:
không thể tự chốt mọi điểm hết/vào lời từ chúng.

Ở đây “HÁT” được hiểu là tuyến giai điệu tương ứng lời hát trong bản piano;
“ĐÀN” là phần nhạc cụ không thuộc tuyến lời. Cao độ rất cao cho thấy cách phối
piano, nhưng vẫn có thể là giai điệu lời chuyển quãng tám. Đừng coi cứ lên cao
là ca sĩ nghỉ.

### Những lỗi đã xác minh

1. `mxl.py` ghi `beat=at` cho cả nốt có `chord`, trong khi `at` đã tăng sau nốt
   đầu. Các đầu nốt của cùng một thế bấm bị tách sang thời điểm khác. Nốt
   `chord` phải dùng onset của nốt trước nó. Đây là quy tắc của
   [MusicXML chord](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/chord/).
2. Bộ đọc không giữ `tie`; do đó phiếu đếm cả phần kéo dài như nốt mới.
   Cần giữ nốt nối để tính độ ngân, nhưng loại `tie stop` khỏi số lần gõ mới.
   [MusicXML tie](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tie/)
   mô tả nối âm; `tied` mô tả ký hiệu trên bản nhạc.
3. `singles = not chord` vẫn chứa nốt đầu của mọi hợp âm bấm. Điều kiện run
   cho phép bước bằng 0, không kiểm nốt nối và không kiểm khoảng nghỉ giữa hai
   nốt. Vì vậy lặp một thế bấm cũng có thể bị gọi là “run 6”.
4. `base = min(note.beat)` chỉ gần đúng đầu ô; ô bắt đầu bằng nghỉ sẽ bị dời
   phách. Phải neo tại đầu ô thật rồi mới tính vị trí.
5. “Fill = 1,7 lần trung vị số nốt” chỉ là dấu hiệu dò. Nhiều đầu nốt trong
   cùng thế bấm làm tăng độ dày hoà âm, không nhất thiết tăng số lần gõ hoặc
   tạo câu chen. Ô 6/4 cũng không được so số nốt thô với ô 4/4.

Phép kiểm độc lập lần này lấy onset theo đầu ô, gom đầu nốt đồng thời, giữ
trường độ phân số và bỏ tie-stop khi đếm lần gõ. “Gõ mới” dưới đây là số thời
điểm có ít nhất một nốt RH được đánh mới; không có nghĩa đó là số nốt giai điệu.

| Bài, ô | Phiếu đếm đầu nốt RH | Thời điểm gõ RH mới | Điều xác minh được |
| --- | ---: | ---: | --- |
| Để Em Rời Xa 16 | 23 | 7 | Nhiều nốt chồng, không phải 23 tiếng nối nhau |
| Để Em Rời Xa 27 | 21 | 6 | Thế 5 nốt vào cuối phách 3 rồi nối ngân qua phách 4 |
| Để Em Rời Xa 44 / 46 | 31 / 31 | 9 / 8 | Phần lớn là thế bấm và nối âm |
| Chúng Ta Không Thuộc Về Nhau 21 | 33 | 8 | Hợp âm đánh tiết tấu chùm ba ở nửa sau |
| Chúng Ta Không Thuộc Về Nhau 68 | 29 | 5 | Lặp thế hợp âm, không phải chạy 29 nốt |
| Chúng Ta Không Thuộc Về Nhau 74 | 32 | 6 | Lặp thế B3–E4–G4–B4, cuối thêm D4; nhãn run sai |
| Chưa Bao Giờ 22 | 27 | 11 | Cụm nốt chuyển lên rồi xuống, không phải 27 onset |
| Chưa Bao Giờ 26 | 3 | 1 | Một Eb4 vào ở phách 1 + 1/4 rồi nối ngân |
| Chưa Bao Giờ 44 / 52 | 22 / 27 | 7 / 7 | Phối dày bằng nốt chồng và nối, chưa có bằng chứng ca sĩ nghỉ |
| Để Em Rời Xa 73 / Chưa Bao Giờ 80 | 1 / 3 | 0 / 0 | Chỉ ngân tiếp từ ô trước |

### Cách trả lời phiếu

Không ép chọn một trong sáu nhãn ngang hàng. HÁT/ĐÀN là **vai trò**;
FILL/PICKUP là **chức năng của câu**; RUN là **cách chơi**. Một câu có thể là
đàn, chạy ngón, làm fill và đồng thời dẫn vào đoạn sau. Một ô cũng có thể có
giai điệu lời và phần đàn đồng thời, không chỉ nối tiếp nhau.

Trong các bảng sau:

- **Chốt**: đọc trực tiếp được từ XML, hoặc giữ mốc người dùng đã chốt trên web.
- **Bỏ nghi vấn máy**: căn cứ đặt câu hỏi không đủ; không cần buộc người dùng
  chọn HÁT/FILL chỉ để lấp ô trống.
- **Cửa lời còn mở**: xác định được nốt/kỹ thuật, chưa đủ chứng cứ xác định
  giai điệu lời ngừng hoặc vào ở thời điểm nào.

Các phách ghi theo cách đếm **1, 2, 3, 4**. Ví dụ phách 4 + 1/4 tương ứng
offset 3,25 tính từ đầu ô. Chỉ xem trường độ ký âm, không suy ra độ pedal thực tế.

## Để Em Rời Xa — 17 hàng

| Hàng phiếu | Câu trả lời có thể đưa cho Claude |
| --- | --- |
| 2→3→4 | **Chốt:** 2–3 thuộc dạo, 4 thuộc phiên theo người dùng. Ô 3 từ phách 3 chuyển các cụm C4/F4 → G4/C5 → F5/G5 → C6/F6, tới G6/C7 ở phách 4. Có cử chỉ đàn đi lên kết dạo; không phải chuỗi đơn liền bậc. **Cửa lời còn mở:** có lấy đà của lời trong cuối ô 3 hay không. Không cần hỏi lại cả biên đoạn. |
| 10→11 | **Chốt:** file ghi rõ 2/4 ở 10, 3/4 ở 11 và về 4/4 ở 12; hai tay lấp đủ các độ dài đó. Đây không phải lỗi parser tự đếm thiếu. Độ trung thực với bản biểu diễn cần bản thu, nhưng đối với sheet phải giữ đúng số chỉ nhịp. |
| 16→17 | **Bỏ nghi vấn máy:** ô 16 có 7 onset RH. Phách 4 có thế D4/F4/Bb4/D5, C5 xen giữa rồi thế bấm lại. Ghi “voicing dày, có nốt xen ngắn”; không tự gán fill chỉ vì 23 đầu nốt. |
| 18→19→20 | **Bỏ nghi vấn máy:** 18 có 7 onset, 19 có 9; cụm đông ở ranh phách phần lớn là thế bấm và tie. Giữ điệp từ 20. Có nhạc dẫn ở ranh giới, nhưng việc lời hát nghỉ ở đâu vẫn cần tuyến lời; chưa được gọi cả 18–19 là RUN/FILL. |
| 23 | **Chốt:** ghi 6/4 rồi trở lại 4/4 ở 24; RH có 13 onset trong 6 phách. Chưa có căn cứ “giọng nghỉ” từ 29 đầu nốt. Cũng không kết luận độ dài 6 phách là do fill chen vào nếu chưa đối chiếu bản hát. |
| 27→28 | **Chốt:** giữ giang 28–31 theo câu trả lời đã lưu. Ô 27 có 6 onset; thế 5 nốt bắt đầu phách 3 + 3/4, ngân qua đầu phách 4; C4 đơn ở phách 4 + 3/4. Bỏ mô tả “10 nốt chạy phách 4”. C4 cuối là candidate nốt dẫn, chưa chốt thuộc lời hay đàn. |
| 30→31→32 | **Chốt:** 30–31 là đàn trong giang. Ô 31 chủ yếu xen C4 với thế bấm, không đủ chứng cứ cho run 7 nốt liền bậc. Ô 32 mở bằng C5–G4–F4–E4–D4 ở các móc kép, khác đầu ô 4. Đây là biến tấu đầu câu; cửa lời có đi qua chuỗi ấy hay vào sau vẫn mở. |
| 40 | **Chốt:** đầu ô có A5 → cụm D6/F#6/A6 → D7, rồi RH nghỉ từ phách 2 tới 2 + 1/2. Đó là cử chỉ mở rộng quãng âm theo vật liệu D trưởng trên bản ký âm, không phải “run 6 nốt đơn”. Không lấy riêng ký hiệu A13 làm bằng chứng toàn bộ nốt bám A13. Fill trong khoảng lời nghỉ hay phối trên lời: còn mở. |
| 44→45→46 | **Bỏ nghi vấn máy:** 44/45/46 có 9/9/8 onset. Có voicing dày, đảo phách, nốt nối; không có căn cứ nói chạy 31 nốt dưới giọng. Giữ phiên lặp. Muốn trích fill riêng phải tìm cửa lời trước. |
| 47→48 | **Chốt:** giữ điệp lặp từ 48. Cuối 47 có cụm nửa cung/chromatic và khoảng nghỉ LH; 48 mở bằng quãng tám F–E–D, bass vào sau. Có động tác nối, nhưng chưa được gọi là pickup của lời nếu chưa có câu hát đối chiếu. |
| 51→52 | **Chốt kỹ thuật:** 51 từ phách 3 chuyển D5/F5/A5 → D6/F6 → A6/D7 rồi trở xuống, một cử chỉ rải theo nhóm trên Dm. Ô 52 chủ yếu giai điệu phối quãng tám/voicing, 9 onset. Chỉ 51 là candidate rõ cho câu đàn trang trí; không gộp cả hai ô thành fill. |
| 55→56 | **Chốt:** RH nghỉ trọn phách 2 ở 55 nhưng LH vẫn gõ D2/D3; không phải cả đàn dừng. Bb3/Bb4 mới vào phách 4 + 1/2. Ô 56 đổi hoá biểu sang 6 dấu thăng, âm chủ theo mốc người dùng là D# thứ, đồng âm Eb thứ, tăng nửa cung so với D thứ. Đôi Bb cuối 55 là candidate lấy đà, chưa chứng minh là lời hay đàn. |
| 59 | **Chốt kỹ thuật:** phách 3, 3 + 1/4, 3 + 1/2 là ba cụm nhiều nốt chuyển quãng lên cao, không phải 11 tiếng liên tiếp. Không có ký hiệu glissando; không tự gán kỹ thuật gliss từ các cụm này. Vai trò fill còn cần cửa lời. |
| 61 | **Bỏ nhãn RUN máy:** chủ yếu tuyến giai điệu đánh quãng tám; cuối ô đi F# → F → D# → C# theo cao độ ghi trong file. Có đường đi xuống nhưng không có căn cứ coi đó là một fill độc lập với giai điệu lời. |
| 63→64→65 | **Chốt theo người dùng:** kết bắt đầu 64; 64–65 là phần đàn trong phạm vi đã duyệt. Đổi tầm xuống thấp và giảm mật độ không phải lý do hỏi lại “còn hát không”. Chỉ mở lại biên nếu có bằng chứng âm thanh trái với mốc đã chốt. |
| 68→69→70 | **Chốt:** đều trong kết đàn. 68 là tiết tấu thế bấm ở tầm thấp; 69 chuyển cụm lên nhiều quãng tám, 70 trả cụm xuống. RH 70 có 3 onset đầu ô rồi nối/nghỉ, trong khi LH vẫn chạy tới cuối ô (có nốt ở phách 4 + 3/4). Câu “LH phách 1–2 rồi im” trong phiếu sai. Không gọi 70 là chốt hết bài. |
| 71→72→73 | **Chốt:** đuôi đàn. 71 ghi 3/4, 72 trở về 4/4. Ô 72 chuyển cụm lên D#7 ở phách 2, ngân 3 phách rồi nối thêm phách 1 ô 73. Ô 73 không đánh lại D#7; không có căn cứ suy hợp âm Eb trưởng từ nốt đơn ngân ấy. |

## Chúng Ta Không Thuộc Về Nhau — 15 hàng

| Hàng phiếu | Câu trả lời có thể đưa cho Claude |
| --- | --- |
| 8→9 | **Chốt:** giữ dạo 1–8, phiên từ 9. Ô 9 có 10 onset, gồm quãng ba A4/C5 gõ chùm ba ở phách 3; không phải run 22 tiếng. Lấy đà của tuyến lời trong 8 còn mở, nhưng 22 đầu nốt ở 9 không tự chứng minh đàn chạy dưới giọng. |
| 9→10→11→12 | **Bỏ cách suy fill từ chênh lệch:** số onset lần lượt 10/4/9/6. 9 có chùm ba, 11 lặp C5 trong thế bấm. Đây là khác biệt tiết tấu có thật, không đủ để tách ô F/Am thành fill và G/Em thành hát. |
| 16→17 | **Chốt:** 16 có 6 onset, cuối ô đổi voicing; giữ tiền điệp từ 17. Chưa chứng minh pickup chỉ từ số nốt ở hai phách cuối. |
| 21→22 | **Chốt kỹ thuật:** 21 chủ yếu gõ hợp âm theo chùm ba ở nửa sau; 33 đầu nốt nhưng 8 onset, không phải chạy đơn dày. Ô 22 có nốt/cụm trang trí ở phách 3 + 3/4 đến cuối ô, vọt E6 ngắn. Fill hoặc biến tấu tuyến lời vẫn cần nghe/đối chiếu giai điệu. |
| 24→25 | **Chốt kỹ thuật:** 24 có cụm LH tại phách 2 + 1/2, RH tại 2 + 3/4 và 3; sau đó các cụm RH đi xuống. Có chuyển động chuyển từ LH sang RH trên ký âm, nhưng không có dấu gliss/arpeggiate để khẳng định cách lướt thật. Giữ điệp từ 25; cửa lời cuối 24 còn mở. |
| 32→33 | **Chốt:** giữ điệp hết 32, giang từ 33. XML cho thấy RH 32 còn đánh tới phách 4 và ngân hết ô; điều này không xác định lời đã dứt ở phách nào. Chỉ cần hỏi mốc kết lời nếu muốn cắt fill trong riêng ô 32. |
| 33→34→35→36 | **Chốt:** giang đàn tầm thấp theo mốc đã duyệt; lần gõ mới RH là 5/5/5/7. Các ô 33–35 có mẫu nhấn lệch lặp lại. Không cần hỏi lại “đàn thưa/thấp có đúng không”. Thấp/thưa vẫn là giang tấu. |
| 37→38→39→40→41 | **Chốt:** đàn trong giang; mở rộng âm vực rồi hạ về. Ô 40 từ phách 3 có G4–C5–D5–G5–G6–G5–C6–F6; ô 41 tiếp E6–C6–G5 rồi hạ dần. Đây là đường nhạc có thể đọc, không cần người dùng xác nhận là “có lên cao”. Không gọi cả 5 ô là một run liền bậc. |
| 42→43→44 | **Chốt ĐÀN**, vì nằm trong giang. Bỏ nhãn run 6/9 như kết luận tự động: 42 có nghỉ phách 3 và nhảy quãng; 44 có nốt nối, nghỉ giữa các lần gõ và cụm nửa cung. Có các tiểu câu chuyển bậc/trang trí, nhưng không phải toàn đoạn chạy đều không ngắt. |
| 46→47→48→49 | **Chốt:** 46–48 đàn trong giang, 49 tiền điệp theo người dùng. Ô 48 chỉ 7 onset, có khoảng nghỉ và thế bấm ở cuối; chưa chứng minh run 6. Đáng đối chiếu tuyến lời: cuối 48 gần mô hình cuối 16, và đầu 49 rất gần đầu 17. Việc giai điệu lời đã lấy đà ở 48 hay chưa còn mở. |
| 53→54→55→56 | **Chốt kỹ thuật:** 53 dùng chùm ba hợp âm; 54 có cụm D/Eb/E trang trí; 55 mở cụm lên A6/C7/E7 rồi về thấp. 56 giống rõ đuôi dẫn ở 24: D5/G5 → C5/E5 → A4/D5 → G4/C5 → E4/A4. Vì vậy mốc 56–64 nên giữ là mốc người dùng, nhưng cần xác minh điểm bắt đầu giai điệu điệp thật có nằm trong 56 hay tới 57; đây là nghi vấn có căn cứ so câu lặp, không phải do đếm nốt. |
| 64→65 | **Chốt:** 64 có 4 onset; thế A/C#/E ngân hai phách, rồi thế G/C#/E/G và E4 cuối. Chuyển từ A7 sang phần kết F ở 65 là sự kiện có trong sheet. Không tự đổi thành ii–V–I hoặc gán pickup vì thế bấm cuối đông nốt. |
| 65→66→67→68 | **Chốt:** kết đàn theo mốc 65–hết đã lưu. Các thế bấm lặp theo nhấn lệch, lần gõ RH 6/6/5/5. Độ dày tăng theo chiều hoà âm; không phải chạy 19–29 tiếng/ô. Không hỏi lại còn hát chỉ vì tầm thấp. |
| 74 | **Chốt sửa nhãn:** ĐÀN, lặp voicing G13 với thay đổi chia nhỏ tiết tấu; không phải RUN 6. Thế B3/E4/G4/B4 xuất hiện nhiều lần; nốt D4 ở cuối ô. Có đúng 6 onset mới. |
| 76→77 | **Chốt phần đọc:** 76 ghi A7 và có thêm Bb trong voicing; 77 thực sự có bass Eb2, RH C5 rồi C4/F4/G4 nối ngân. Không có ký hiệu hợp âm mới ở 77. “Eb6?” chỉ là tên máy đoán, không phải nhãn tác giả. **Chưa chốt:** bass Eb là dụng ý hay lỗi ký âm. Giữ ô 77 và nốt gốc; cần đối chiếu bản đàn trước khi sửa/cắt. |

## Chưa Bao Giờ — 15 hàng

Hoá biểu bốn giáng không tự phân biệt F thứ và Ab trưởng. Hoà âm Fm và các
điểm tựa F xuyên bản là căn cứ mạnh để đọc bài ở F thứ; chưa thấy đổi hoá biểu.
Đây là nhận định dựa trên ký âm/hoà âm, không giả làm câu trả lời giọng do người
dùng đã xác nhận.

| Hàng phiếu | Câu trả lời có thể đưa cho Claude |
| --- | --- |
| 8→9 | **Chốt:** cuối 8 F4 ngân sang hai phách đầu 9; phách 3 ô 9 nghỉ RH, phách 4 có C5 gõ tại 4, 4 + 1/2, 4 + 3/4. Giữ biên phiên 9. Nếu ba C5 là tiếng mở lời thì cửa lời chính xác là phách 4, nhưng XML không tự xác nhận được điều đó. Ô 8 không im: cả hai tay có nốt. |
| 11 | **Bỏ nghi vấn chỉ vì 17 đầu nốt:** có 9 onset; phách 2 có Eb4–G4–Ab4–Eb5 móc kép rồi vào thế bấm. Ghi nhận trang trí/giai điệu biến tấu; fill riêng khỏi lời chưa xác định. |
| 16→17→18 | **Chốt:** ô 17 ghi rõ 3/4; F7 đặt tại phách 3, 18 trở lại 4/4. Không hỏi người dùng liệu máy đếm nhầm ô nhịp. Giữ tiền điệp từ 18; đoạn có pickup của lời hay không là câu hỏi khác. |
| 22 | **Chốt kỹ thuật:** không phải chỉ “run xuống từ F7”. Cụm nốt leo từ Ab3/C4/Eb4 qua nhiều tầng, tới Ab6/C7/F7 ở phách 2, rồi đi xuống trong phần còn lại phách 2; về F4/Ab4 ở phách 3. Có dạng đi lên–xuống theo nhóm, 11 onset. Chưa biết có đè lên tuyến lời hay làm fill lúc lời nghỉ. |
| 24→25→26 | **Chốt:** giữ điệp từ 26 theo người dùng. Ô 26 chỉ có một Eb4 mới tại phách 1 + 1/4, nối ngân tới phách 4 + 1/4. Ô 25 phách 4 không gõ mới nhưng C5 vẫn ngân. Vì vậy “thưa” không phải chứng cứ dời điệp sang 27, và “phách 4 trống” không có nghĩa đã tắt tiếng. |
| 34→35 | **Chốt kỹ thuật nối:** thế F4/Ab4/C5 đánh ở phách 4 + 3/4 ô 34, nối qua 1/4 phách đầu 35; tiếng mới của RH trong 35 bắt đầu tại phách 1 + 1/4. Giữ giang từ 35. Có nối âm băng qua vạch ô, nhưng phần lời có dùng chính thế đó hay không chưa biết. |
| 40 | **Chốt:** đàn trong giang, rải/chuyển các nhóm lên C6/F6 rồi trở xuống; 12 onset. Không cần hỏi có phải đàn hay không theo mốc giang đã duyệt. Không áp định nghĩa run đơn liền bậc cho cả ô. |
| 42→43→44 | **Chốt:** 43 có các thế C5/Ab5/C6 ở phách 4, 4 + 1/2, 4 + 3/4; thế cuối nối qua nửa phách đầu 44. Ô 44 có 7 onset, phối dày/quãng cao. Có nối âm sang phiên mới; không được suy từ Eb6 rằng đó là “đàn chạy trên giọng”. Cửa lời còn mở. |
| 50→51→52 | **Chốt kỹ thuật:** cuối 50 chuyển cụm lên F6, đầu 51 chốt Bb6/C7/F7 dài 1 phách, nghỉ RH 1 phách rồi về C4. Ô 52 là voicing nhiều nốt, 7 onset, không phải 27 tiếng chạy. Cụm qua 50–51 là candidate nối câu rất rõ; vị trí tuyến lời cần đối chiếu thêm. |
| 55 | **Bỏ suy “thưa = giọng ngân”:** phách 3 RH thực sự nghỉ một phách, phách 4 đánh hợp âm 4 nốt. Có thể xác minh cách chơi, không thể xác minh giọng đang ngân từ mật độ RH. |
| 58→59→60 | **Chốt:** giữ điệp từ 59. Eb4 ở phách 4 + 3/4 ô 58 nối qua 1/4 đầu 59; tiếp trang trí G4–Eb4–Ab4 rồi Eb4 ngân ba phách. Có tiền âm nối qua vạch và phần trang trí đầu câu. Bbsus4?/Fm7? là suy đoán của máy, không dùng nó để tự dời điệp sang 60. |
| 67→68 | **Chốt kết hợp lời người dùng:** có phần đàn nối cuối 67 sang cụm Ab6/C7/F7 đầu 68; cụm đó gõ đồng thời, dài 1 phách. Người dùng đã nói hát sau tiếng đầu 68, nên không lấy cụm này làm nốt đầu tuyến lời. Candidate vào lời sớm nhất kế đó là cụm Eb4/F4 ở phách 2, rồi C5 ở phách 2 + 1/4. Cần đối chiếu tiếng mở lời để chọn đúng, không hỏi lại cả ô là HÁT hay ĐÀN. |
| 72 | **Bỏ nhãn fill tự động:** RH có giai điệu đánh quãng tám F–G–Ab–G–G–F, kèm nối âm. Đây có thể chính là giai điệu lời phối quãng tám. Không có chứng cứ tách thành fill riêng từ “run 8”. Giữ thuộc coda có lời. |
| 75→76 | **Chốt chức năng theo người dùng:** có lời → fill băng qua vạch ô → lời trở lại trong 76; không chia toàn ô 75 HÁT / toàn ô 76 HÁT. 75 có chùm ba ở phách 2, F2 ở phách 3, cụm LH C3/F3 ở phách 3 + 1/2. Đuôi RH có Eb4 ở phách 4 + 1/4, G4 ở 4 + 1/2; sang 76 có Ab4–Eb5–G4–Ab4 móc kép rồi F4. Bbm7 được đặt ở phách 3 ô 76, đúng chỗ RH nghỉ 1/4 phách; G5 đơn vào phách 3 + 1/4, cụm Db5/Ab5 vào phách 3 + 3/4. **Cần chốt tiếng mở lời** giữa những mốc này. Cụm từ “chùm LH thứ hai” chưa đủ để tự gán phách kết lời ở 75. |
| 78→79→80 | **Chốt:** giữ đoạn hát/tag tới 78, outro 79–80. Ô 79 gõ G7, cụm G5/Ab5, Eb6 rồi F5/C6/G6 ở phách 3; bộ ba cuối nối thêm hai phách đầu ô 80. Ô 80 không đánh ba nốt mới. Riêng vị trí hết âm tiết cuối trong 78 chưa có lời để xác minh; không giả định mọi nốt trong 78 đều là lời. |

## Cách gọi đoạn cuối Chưa Bao Giờ

Giữ nhãn làm việc **coda có lời** cho 68–75, **câu nhắc kết/tag** cho phần lời
trở lại trong 76–78, **outro nhạc cụ** 79–80 là hợp lý theo mô tả người dùng.
Đó là nhãn chức năng, không phải tên duy nhất bắt buộc của mọi bản phối.

Lập luận “nằm sau điệp khúc cuối nên không thể là bridge” trong phiếu quá tuyệt
đối; vị trí và vòng hợp âm tự chúng không quyết định đủ cấu trúc. Muốn phân
biệt đoạn nhạc mới với câu điệp được nhắc lại phải so cả tuyến giai điệu và lời.
Tạm dùng coda/tag phục vụ chia corpus, không cần bắt người dùng chốt thuật ngữ
mới trước khi tiếp tục làm nhạc.

## Chỉ những thông tin còn thiếu đáng hỏi

1. **Nguồn đối chiếu tuyến lời của ba bài:** bản thu/bản hát hoặc mốc âm tiết
   tương ứng bản phối. Một nguồn có thể giải quyết cả nhóm cửa lời; không yêu
   cầu người dùng trả lời lại 47 hàng từ con số thống kê. Với cửa lời chưa biết,
   ghi unknown, tạm loại khỏi tập fill đã xác nhận.
2. **Chưa Bao Giờ 68 và 75–76:** tiếng mở lời ở 68 là cụm phách 2 hay C5 kế đó;
   “chùm LH thứ hai” ở 75 là mốc nào; hát lại ở 76 có bắt đầu từ G5 phách 3 +
   1/4 hay chỗ khác? Đây là chú thích người dùng đã có, chỉ cần neo chính xác.
3. **Hai điểm cần nghe kiểm tra riêng của Chúng Ta Không Thuộc Về Nhau:**
   phần lời điệp lặp bắt đầu trong 56 hay 57 (56 giống đuôi tiền điệp 24);
   bass Eb2 cuối ô 77 có đúng bản đàn không? Không sửa nốt chỉ vì nó lạ.

## Đoạn có thể chuyển nguyên cho Claude

> Hãy dùng bản đối chiếu này để trả lời các vấn đề đọc sheet và kỹ thuật đã
> kiểm chứng, giữ các mốc đoạn tôi đã chốt trên phiếu. Sửa cách đo trước khi
> phát sinh câu hỏi mới: chord onset phải đồng thời, tie-stop không phải nốt
> đánh mới, số đầu nốt không phải số tiếng gõ, và nốt đầu hợp âm không tự biến
> thành tuyến melody. Đừng đánh đồng RUN/FILL/PICKUP với HÁT/ĐÀN; cho phép một
> câu có nhiều nhãn và cho phép melody cùng tồn tại với phần trang trí.
> Chỗ chưa xác định cửa lời thì để unknown, không đưa vào tập fill chuẩn.
> Chỉ hỏi tôi các mốc âm tiết/vị trí cụ thể còn thiếu; những biên đoạn đã chốt,
> số chỉ nhịp ghi rõ và kỹ thuật đọc được từ nốt thì tự xử lý theo bằng chứng.

## Dấu vết file đã kiểm tra

SHA-256 của ba bản ký âm (để Claude biết có đang dùng cùng phiên bản):

| File | SHA-256 |
| --- | --- |
| De Em Roi Xa-Ca Phao.mxl | `c4d780b7b37c89b1e7891daca40bc13fbca5ffba8c5600cf25ea04350aaaba4b` |
| Chung Ta Khong Thuoc Ve Nhau-Ca Phao.mxl | `8da91d81196ace31d7ccf39a4d8d7070295471259b20bcbc488101b00bb4dcfc` |
| Chua Bao Gio Trung Quan-Ca Phao.mxl | `2baa462b684359d0b9f74ebbcb9739f297d30162722c0f0999cbc4f85cd86208` |
