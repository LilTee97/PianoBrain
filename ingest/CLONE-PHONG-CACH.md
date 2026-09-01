# Bộ câu hỏi — clone phong cách một thầy

Gọi: *clone phong cách [thầy] [thể loại]*
Lệnh đo: `python tools/sheet/clone_do.py <teacher_id> [the loai]`

Chỉ đọc bản ký âm **của đúng thầy đó**. Không mượn hằng số, hàm, hay kết luận của thầy khác. Thể loại do người dùng đã xác nhận — không suy từ file. Số nào không đo được thì nói không đo được. Mọi kết luận kèm **cỡ mẫu**.

Hợp âm trên bản ký âm thường **không có ký hiệu**. Bộ đo đoán từ **tay trái**. Đó là lớp cao độ đang vang, không phải tên thầy nghĩ. Chỗ nốt ngoài giọng / hợp âm hút phải rà tay (xem `ingest/CHIA-DOAN-VA-HOP-AM.md` B4).

---

## 0. Phạm vi

1. Những file nào, thể loại nào, biên đoạn đã chốt chưa?
2. n = bao nhiêu bài? bao nhiêu ô intro / giang tấu / outro / đoạn hát?
3. Bài nào bị loại (file khác bản, chưa chia đoạn) — ghi rõ, đừng lấp.

## 1. Chọn hợp âm cho intro / giang tấu / outro (đoạn solo)

So với đoạn hát cùng bài, không so với thầy khác.

4. Nhịp hòa âm: mấy ô một hợp âm ở solo vs hát?
5. Vòng solo có **trùng vòng hát** (phiên / điệp) không, hay vòng khác?
6. Intro có cùng xương với outro không?
7. Giang tấu: giữ vòng điệp, giữ vòng phiên, hay vòng riêng (ii–V, dim lướt, át phụ)?
8. Hợp âm hút / ngoài giọng nằm ở ô chẵn hay ô lẻ của cặp? Ô trước khi vào đoạn mới?
9. Intro mở bằng I, V, hay hợp âm khác?
10. Outro: cadence rõ (V–I), vòng lặp nhỏ rồi cắt, hay thưa dần rồi dừng?
11. (thêm) Hai ô cuối trước điệp khúc / trước giang tấu có turnaround riêng không?

## 2. Chọn nốt solo — gam, hình câu

12. **Giai điệu — chỉ mốc 1 nốt** (quạt 2+ nốt tạo nhảy giả). Tỉ lệ liền bậc / quãng ba / nhảy ≥5? Lên vs xuống?
12b. Nốt đáp mỗi ô: 1-3-5, bậc 7, hay khác? Cà Pháo other 36%; Linh Nhi / Tôn Hùng đáp hợp âm ~70%.
12c. Tay phải solo dày hơn đoạn hát bao nhiêu nốt/ô?
13. Tỉ lệ nốt rơi vào hợp âm (đoán từ tay trái) — phách mạnh vs cả câu. Dưới ~50% thì **đừng** kết luận gam; có thể tên hợp âm đang sai.
14. Có câu chạy ngón (móc kép trở xuống, ≥4 nốt) không? Dài bao nhiêu, bước liền bậc hay rải, vào phách nào?
15. Nếu **không** có câu chạy: solo là giai điệu chậm + đệm, đừng bịa pentatonic run.
16. Gam khớp lớp cao độ RH solo (thử 12 tonic): ngũ cung trưởng/thứ, trưởng, thứ tự nhiên/hòa thanh, blues. Chỉ nêu mức ≥80%, và **cỡ mẫu**. Hai gam gần nhau thì nói cả hai.
17. Câu kết ở nốt nào (1/3/5 vs 9/11/13)? Đo được thì đo; không thì để trống.
18. (thêm) Quãng âm (MIDI thấp–cao) solo vs hát. Solo có nhảy lên quãng tám trên không?
19. (thêm) Nghỉ giữa câu: khe ≥ 1 nốt đen có xuất hiện đều không, hay chạy liền?

## 3. Pattern đệm tay trái → điệu

Đo **đoạn hát** trước (khuôn đệm), solo sau (khuôn có thể đổi).

20. Phách 1: tay trái có gõ không (% ô)?
21. Số mốc gõ / ô; vị trí trong ô (lưới 1/8). Chu kỳ hay gặp nhất.
22. Verse vs chorus: cùng cell hay chorus dày hơn?
23. Intro/outro có **thưa hơn** hát không (thường chỉ phách 1)?
24. Giang tấu: giữ cell hát, hay dày như chorus, hay đổi hẳn?
25. Chồng nốt trên một mốc (bass đơn vs quãng tám / hợp âm)?
26. Một cell đủ clone điệu được chưa, hay hai bài cùng nhãn thể loại đã **khác mật độ**? Nếu khác: **không gộp thành một điệu**.
27. (thêm) Cell dài 1 ô hay 2 ô? Có lệch phách (syncopate) không?

## 4. Hai tay lúc solo

28. Phách 1: hai tay cùng vào hay tay phải nghỉ?
29. Mốc chung hai tay / toàn bộ mốc. Tay phải có **lặp pitch-class** tay trái (nhân bản) không?
30. Khi RH có câu chạy: LH mốc/ô **giảm** so với ô không chạy không? (nhường)
31. Nếu không có câu chạy: LH có nhường gì không, hay giữ nguyên groove?
32. Khe giữa tay (MIDI thấp RH − cao LH) — nếu đo được.
33. Trần RH / đáy LH. Solo có mở rộng Tessitura không?
34. (thêm) Ô chạy ngón: LH còn gõ phách 1 không, hay im / chỉ pedal-bass?

## 5. Đủ clone chưa

35. Cái nào **lặp đủ** để viết luật IF/THEN (kèm n)?
36. Cái nào mới là thói quen một bài?
37. Cái nào máy không đo được — phải rà ký hiệu hợp âm / tai?
38. Cấm làm gì nếu bắt chước thầy này (để không lẫn thầy khác)?

---

Không viết item `extracted` từ bản đo này. Đo từ nốt → `derived` + `draft`, không gán thầy nói. Muốn `extracted` thì phải có lời thầy / rà tay hợp âm trên bản nhạc.
