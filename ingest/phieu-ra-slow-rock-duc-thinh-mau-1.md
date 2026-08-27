# Phiếu rà — Slow Rock mẫu đệm 1 (Đức Thịnh)

1 item: `acc-slow-rock-duc-thinh-mau-1`. Đang ở `extracted` + **`draft`**.

Nguồn: `duc-thinh-bai-09-slow-rock` · [kOwriZhpo6Y](https://www.youtube.com/watch?v=kOwriZhpo6Y)
Đoạn mẫu 1: **01:25–04:24**

Bản chép do Gemini xuất ra (`slow_rock_duc_thinh_engine.json`), **chưa ai đối chiếu**.
Máy tự gắn `"verified": true`. Cờ ấy không tính: cùng file đó, bản chép mẫu 3 của nó
sai nhịp độ (ghi 75, đo ra ≈80 nốt đen chấm) và hiểu ngược câu thầy nói về Blues.

Cách ghi kết quả giống phiếu mẫu 3: `[x]` là khớp; lệch thì để trống và ghi
`- LỆCH: …` ngay dưới, kèm mốc thời gian; không nghe rõ thì ghi `KHÔNG RÕ` kèm lý do.
Còn một dòng chưa rõ thì item ở lại `draft`.

---

## 1. Đếm — một ô nhịp có mấy cú gõ

- [ ] **1.1** Tay trái đánh **đủ 6 móc đơn**, không nghỉ móc nào.
- [ ] **1.2** Tay phải dậm **2 lần** mỗi ô nhịp, ở **phách 1 và phách 4**.
- [ ] **1.3** Cả ô nhịp là **8 cú gõ**. Không có cú thứ 9 nào (nốt lót, nốt láy).

## 2. Nghe ra — cao độ

Đây là chỗ đáng ngờ nhất của phiếu này.

- [ ] **2.1** Câu rải tay trái **đi lên rồi về**: thấp → cao → thấp, đỉnh ở phách 4.
- [ ] **2.2** Câu rải **trải rộng hơn một quãng tám** (có bậc 8 và bậc 10),
      chứ không bò gọn trong một quãng năm.

      Nghe thử: nốt phách 3 có phải **đúng nốt gốc nhưng cao hơn một quãng tám**
      so với nốt phách 1 không? Nếu phải thì 2.2 khớp.

      - Nếu KHÔNG: câu rải là gốc-5-gốc-3-gốc-5 trong một quãng năm → ghi LỆCH,
        tôi sửa cả item lẫn điệu.

- [ ] **2.3** Bậc 5 (phách 2 và phách 6) nằm **TRÊN** nốt gốc, không phải dưới.
- [ ] **2.4** Đỉnh ở phách 4 là **bậc 3** của hợp âm (bậc 10), không phải bậc 5.
- [ ] **2.5** Tay phải dậm **cả hợp âm**, không phải một nốt đơn.

## 3. Trường độ và nhịp độ

- [ ] **3.1** Sáu móc đơn tay trái **đều tăm tắp**, không có chỗ nào kéo lê
      như phách 3 của mẫu 3.
- [ ] **3.2** Tay phải ngân **đủ 3 móc đơn** mỗi lần dậm (tức phách 1 ngân tới
      phách 4, phách 4 ngân tới vạch nhịp), không ngắt gọn rồi nhả.
- [ ] **3.3** Nhịp độ: **đếm 10 ô nhịp hết bao nhiêu giây**, ghi số vào đây →

      `10 ô = ______ giây`

      (Với mẫu 3 bạn đo được 15,07 giây. Nếu mẫu 1 thầy dạy chậm hơn thì số này lớn hơn.)

- [ ] **3.4** Có **pedal** không? Nếu có thì đổi ở đâu →

      `pedal: ______________________`

---

## Sau khi rà

- Mọi dòng khớp → item lên `status: "validated"`.
- Có dòng lệch → sửa item và điệu bên KeyTrain theo số đúng, item **ở lại `draft`**.
- 3.3 chưa có số → điệu bên KeyTrain vẫn chạy bằng bpm mượn của mẫu 3, và
  `output.tempo` của item vẫn ghi CHƯA ĐO. Không đoán hộ.
