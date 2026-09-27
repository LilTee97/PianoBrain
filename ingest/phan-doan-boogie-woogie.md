# Chia đoạn — Boogie Woogie

Nguồn: `video/Linh_Nhi/boogie woogie-Linh Nhi.mxl`.
Bản có nhãn: `video/Linh_Nhi/boogie woogie-Linh Nhi-chia-doan.mxl`.
Mốc máy đọc được: `ingest/phan-doan-boogie-woogie.json`.

Phân tích trực tiếp từ MusicXML ngày 26/9/2026. Số ô dưới đây là số `measure`
trong file gốc, **tính cả ô lấy đà số 1**. Các tên chức năng do người phân tích
đặt; sheet chỉ có vạch kép, chưa có tên đoạn và chưa có xác nhận của người dùng.

## Sơ đồ đoạn

| Ô trong file | Đoạn | Căn cứ |
|---|---|---|
| **1** | Lấy đà | E♭4 láy vào E4–G4–A4; ba móc đơn, tổng 1½ phách; tay trái nghỉ. |
| **2–5** | A — Dạo đầu | Cụm hợp âm đánh cùng bass quãng tám, chuyển sang bass C–E–F–F♯ rồi G; vạch kép sau ô 5. Gộp lấy đà thì dạo là **1–5**. |
| **6–17** | B — Vòng blues thứ nhất, 12 ô | Tay trái chạy tám móc đơn mỗi ô; tay phải bấm cụm trên phách 1 và 3&. Ô 17 đổi đuôi thành câu lấy đà; vạch kép sau ô 17. |
| **18–21** | C — Đoạn nối, nhắc lại dạo | Nội dung nốt, nghỉ, trường độ và dấu nối lặp đúng ô 2–5; vạch kép sau ô 21. |
| **22–31** | D — Thân vòng blues thứ hai | Tay trái tiếp tục mẫu boogie; tay phải chuyển sang câu giai điệu có bè đôi, đảo phách và nốt láy. Đây là 10 ô đầu của vòng. |
| **32–34** | K — Câu kết và ngân cuối | Ô 32–33 thay hai ô cuối vòng blues bằng câu kết; hợp âm C9 ở phách 4 ô 33 nối sang cả ô 34, có fermata. |

**Vòng blues thứ hai đầy đủ là ô 22–33 (12 ô).** Hai ô 32–33 đồng thời làm câu
kết; ô 34 là phần ngân thêm ngoài vòng. Bảng dữ liệu chia các khoảng không
chồng nhau để đếm ô, đồng thời ghi riêng nhóm 22–33 để giữ cấu trúc âm nhạc.

## Chi tiết ranh đoạn

- **Ô 5 → 6:** từ câu dạo kết ở G sang mẫu bass chạy trên C, đổi rõ cách phối hai tay.
- **Ô 17 → 18:** câu lấy đà E♭ láy vào E–G–A bắt đầu ngay từ **3& ô 17**
  (offset 2,5 phách). Vạch đoạn lớn đặt tại ô 18; khi trích câu nối để nghe,
  nên lấy kèm phần lấy đà này.
- **Ô 21 → 22:** kết cụm trên G rồi vào câu giai điệu mới trên bass C.
- **Ô 31 → 32:** bắt đầu câu kết; **không có vạch kép ở đây**, đây là ranh
  suy từ việc cả hai tay rời mẫu lặp: bass đi C–E–F–F♯, giai điệu C–B♭–A–A♭.
- **Ô 33 → 34:** không đánh lại hợp âm. Sáu nốt C2, C3, E3, G3, B♭3, D4
  đánh ở phách 4 ô 33, nối sang ô 34. Ô 34 không phải ô im lặng.

Khung gốc hòa âm vòng đầu, suy từ bass và cụm nốt:

`C | C | C | C | F | F | C | C | G | F | C | C`

Vòng sau dùng cùng khung 10 ô đầu; hai ô cuối chuyển thành câu kết. Đây là
khung gốc hòa âm, không phải danh sách đầy đủ màu hợp âm in sẵn: file **không
có ký hiệu hợp âm**. Nhận định tâm C/blues thiên trưởng dựa vào nốt thực,
không phải chỉ từ hóa biểu không dấu.

## Nguồn và giới hạn

- Tên file và thư mục mang tên **Linh Nhi**, nhưng tiêu đề bên trong là
  **Boogie Woogie Basics**, credit hiển thị **Boogie Woogie Piano — Marco Brandt**.
  Chưa xác minh vai trò của Linh Nhi trong bản này; lưu bản phân đoạn riêng,
  chưa đưa vào corpus học phong cách Linh Nhi.
- File ghi **4/4, nốt đen = 180, “Swing”**. Swing là chỉ dẫn chữ; các móc đơn
  trong dữ liệu vẫn có trường độ bằng nhau. Chưa đối chiếu bản thu.
- Bộ đọc `tools/sheet/mxl.py` hiện cộng 4 phách cho ô lấy đà số 1, trong khi
  dữ liệu chỉ dài 1½ phách. Các mốc số ô vẫn dùng được, nhưng thời gian tuyệt
  đối từ `bar_start` bị dư 2½ phách từ ô 2. Bản phân đoạn không dùng các mốc
  thời gian đó và không sửa bộ đọc trong lượt này.
- Bản có nhãn chỉ thêm bảy chỉ dẫn chữ ở ô 1, 2, 6, 18, 22, 32, 34. Đã kiểm
  cấu trúc XML: nốt, nghỉ, trường độ, dấu nối, nhịp, nhịp độ và credit giữ nguyên;
  SHA-256 file gốc giữ nguyên. Các đoạn chính phủ đủ 34 ô, không chồng và không hở.
