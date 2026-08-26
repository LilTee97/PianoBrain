# Phiếu rà — Slow Rock mẫu đệm 3 (Đức Thịnh)

1 item, 1 bài.

Nguồn: `duc-thinh-bai-09-slow-rock` · [kOwriZhpo6Y](https://www.youtube.com/watch?v=kOwriZhpo6Y)
Đoạn mẫu 3: **06:45–10:43**

Bản chép đang rà **do Gemini xuất ra, chưa ai đối chiếu**. Nó không đưa được mốc
thời gian nào khi được hỏi, nên mọi con số dưới đây là **giả thuyết**, không phải
kiến thức. Phiếu này là chỗ chúng bị thử.

Mỗi dòng ba câu hỏi, theo thứ tự rẻ dần:

1. **đếm** — một ô nhịp có đúng bấy nhiêu cú gõ không, ở đúng chỗ đó không.
   Sai là hỏng ngay, khỏi xét tiếp.
2. **nghe ra** — cao độ quyết định có đúng không.
3. **trường độ / giật** — nốt ngân bao lâu, có cú nào không rơi đúng phách không.

Xem rồi vẫn không chắc thì **để nguyên draft** — đó là sự thật, và không mất gì.

---

## Cách ghi kết quả

Đánh dấu `[x]` vào dòng nào **khớp**. Dòng nào **lệch** thì đừng đánh dấu, ghi số
đúng vào ngay dưới dòng đó theo mẫu:

```
  - LỆCH: tay trái phách 4 nằm TRÊN nốt gốc, không phải dưới. Nghe rõ ở 07:12.
```

Không nghe rõ thì ghi `KHÔNG RÕ` kèm lý do (tiếng nói đè, camera không thấy tay).

Rà xong toàn phiếu:

- **Mọi dòng khớp** → item được đổi sang `origin: "extracted"`, `status: "validated"`,
  gắn `source.teacher_id: "duc-thinh"` và `locator: "06:45-10:43"`.
- **Có dòng lệch** → sửa số theo phiếu, item vẫn `extracted` nhưng **ở lại `draft`**
  cho tới lượt rà sau.
- **Có dòng không rõ** → item ở lại `draft`. Không đoán hộ.

Kho này chưa có script rà cho điệu (chỉ có `review:jazz` cho gam), nên đổi trạng
thái là sửa tay trong file item, rồi `npm test`.

---

## Ô nhịp — bản chép của Gemini

Nhịp 6/8, một ô = 6 móc đơn. `beat` đếm từ 0.

| | phách 1 | 2 | 3 | 4 | 5 | 6 |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **tay trái** | gốc, mạnh | ← ngân | ← ngân | **bậc 5**, vừa | ← ngân | ← ngân |
| **tay phải** | — | — | hợp âm, nhẹ | — | — | hợp âm, nhẹ |

Bốn cú gõ một ô nhịp. Tay trái ngân 2 móc đơn mỗi nốt, tay phải chạm 0.8.

---

## Cần rà

### 1 — đếm

- [x] **06:45-10:43** · một ô nhịp có đúng **4 cú gõ**, ở phách **1, 3, 4, 6**
  - KHỚP (người dùng xác nhận, 2026-08-27)
  - phách 2 và 5 **im** — không có cú gõ mới nào
  - nếu đếm ra 5 hoặc 6 cú thì đây không phải mẫu 3, xem lại đang nghe đoạn nào

### 2 — nghe ra

- [x] tay trái phách 1 là **nốt gốc** của hợp âm
- [x] tay trái phách 4 là **bậc 5**
- [x] **bậc 5 đó nằm TRÊN hay DƯỚI nốt gốc?** → **TRÊN** (người dùng nghe, 2026-08-27)
  - **LỆCH so với engine.** Bè trầm đi LÊN một quãng năm. `degreeTone` trong
    `patternRenderer.ts` chọn quãng tám gần nốt vừa chơi nhất nên từ La ra Mi
    **trầm hơn** — đo được: A2(45) → E2(40), tức đi xuống quãng bốn. Sai hướng.
  - Ý đồ trong `note` của Gemini là đúng; khuôn `tones` không diễn đạt được nó.
  - Việc phải làm: ghi vào `note_vi` của item, và sửa `degreeTone` cho nốt bass
    neo trên gốc thay vì bám quãng tám gần nhất. Vùng đó đang có 6 test đỏ sẵn
    nên phải làm riêng một đợt, kèm test.
  - đây là dòng quan trọng nhất phiếu này. Gemini ghi trong `note` là *"bậc 5 ở
    quãng trên nốt gốc"*, nhưng khuôn `tones` **không diễn đạt được ý đó**:
    engine chọn quãng tám gần nốt vừa chơi nhất, nên từ La nó ra Mi **trầm hơn**.
  - nghe kỹ: bè trầm đi **lên** một quãng năm, hay đi **xuống** một quãng bốn?
  - tài liệu phân tích của chính bạn (mục III.1) nói thế 1–5–8 mở rộng, tức bậc 5
    **trên** gốc. Nếu tai xác nhận vậy thì engine đang chơi sai, phải ghi vào
    `note_vi` và sửa `degreeTone` sau.
- [ ] tay phải là **cả hợp âm** (không phải một nốt lẻ)
- [ ] tay trái phách 4 có **kép quãng 8** không (hai nốt cùng tên cách nhau 1 quãng tám)?
  - engine hiện **không chơi được** kép quãng 8 ở tay trái — trần quãng tám kéo nó
    tụt về đúng nốt cũ. Nghe thấy có thì ghi bằng chữ, đừng ghi vào `tones`.

### 3 — trường độ / giật

- [ ] tay trái ngân **2 móc đơn** rồi mới buông (phách 1 vang qua phách 2, phách 4
      vang qua phách 5)
  - **LỆCH: ngân 3 móc đơn, legato tới tận nốt bass kế** (người dùng nghe, 2026-08-27).
    Phách 1 vang qua phách 2 và 3, buông đúng lúc bass phách 4 vào; phách 4 vang
    qua phách 5 và 6, buông ở vạch nhịp. Bè trầm liền mạch, không có chỗ trống nào.
  - Gemini ghi `durationBeats: 2.0` cho cả hai — phải sửa thành **3.0**.
  - PEDAL: **chưa trả lời**. Nếu có pedal thì cái tai nghe được là pedal chứ không
    phải ngón; cần biết đạp/nhả ở đâu. Chưa có thì ghi KHÔNG RÕ.
- [ ] tay phải chạm **ngắn** ở phách 3 và 6, không ngân
- [x] có cú nào **không rơi đúng phách** không — vào sớm hay kéo lê?
  - **LỆCH: CÓ GIẬT** (người dùng nghe, 2026-08-27). Gemini ghi cả bốn cú rơi đúng
    lưới — sai. Ba quan sát:
    1. **Phách 3 vào MUỘN** một chút (kéo lê), rồi **dồn về phách 4** — khoảng cách
       3→4 bị nén lại, đó chính là cảm giác "giật cục" của mẫu này. Đây là **thủ
       pháp**, không phải nhiễu: nó là cái làm nên chất "đệm ngắt, phóng khoáng".
    2. **Phách 4 ngân như phách 1** — xác nhận lại kết quả câu 3, cả hai nốt bass
       đều legato 3 móc đơn.
    3. **Phách 6 lúc chơi lúc không** — đánh lướt nhẹ, và **hay nảy sang phách 1 ô
       nhịp kế**. Nhưng tần suất là **trên 3/4 số ô** (người dùng, 2026-08-27),
       nên nó **thuộc ô nhịp**: chép thẳng vào `cell`, không tách ra item fill.
       Chất "lướt nhẹ" ghi bằng `velocityScale` thấp; chỗ vắng mặt thưa thớt kia
       khuôn không diễn đạt được, ghi bằng chữ trong `note_vi`.
  - **SỐ ĐO: phách 3 muộn ~1/8 móc đơn ≈ 0.05 giây** (người dùng áng, 2026-08-27).
    Một ô nhịp 2.4 giây → một móc đơn 0.4 giây → quy ra lưới là `beat: 2.1`.
    Cảnh báo: 0.05 giây nằm **dưới ngưỡng nghe ra được sự lệch** (~30–50 ms là
    chỗ tai bắt đầu tách hai sự kiện). Ở mức này nó nghe ra là nốt "nặng hơn"
    chứ không ra là nốt muộn, và sai số của phép áng bằng tai cũng cỡ đó. Ghi
    `2.1` là hợp lý, ghi `2.0` cũng không sai — đừng coi con số này là chắc.
  - **Phách 4 rơi ĐÚNG phách**, không vào sớm (người dùng, 2026-08-27). Cảm giác
    "dồn" đến từ **tương phản dài–ngắn** chứ không từ một cú đẩy:

    ```
    phách 1 → 3   2.1 móc đơn
    phách 3 → 4   0.9 móc đơn    ← ngắn hơn một nửa
    ```

    Đây là chỗ đáng học nhất của mẫu này: cái "giật cục" **không phải** một nốt
    bị đẩy lệch, mà là **một nốt bị kéo lê rất khẽ làm hai quãng nghỉ lệch hẳn
    nhau**. Chép sai thành cú đẩy là mất đúng cái chất của nó.

#### Hai chỗ khuôn hiện tại KHÔNG diễn đạt được

- **Vào muộn.** `EditableHit.lead` chỉ nhận số ≥ 0 (vào sớm). Không có đường ghi
  "vào muộn 0.2 móc đơn" trong trình soạn — phải sửa JSON tay. Cần nới `lead` cho
  nhận số âm, hoặc thêm một ô riêng.
- **Lúc chơi lúc không.** `RhythmCell` là một ô nhịp **cố định**, lặp y hệt mọi
  lượt. Phách 6 xuất hiện trên 3/4 số ô nên **chép cố định là lựa chọn đúng** —
  engine chơi dày hơn video một chút, sai số nhỏ và chấp nhận được. Ghi rõ trong
  `note_vi` rằng trong video nó không phải ô nào cũng có.
- [ ] hai nốt sau trong chùm ba có **đều nhau** không, hay nốt giữa bị nuốt (shuffle)?

### 4 — nhịp độ

- [ ] một ô nhịp dài khoảng **2.4 giây**
  - Gemini ghi bpm 75 theo nốt đen (= 50 theo nốt đen chấm). Bấm đồng hồ trên hai
    vạch nhịp liên tiếp mà kiểm.
  - đây là con số duy nhất của Gemini đã có một phép kiểm độc lập: tester chạy
    `75 × 2` ra đúng 2.4 giây. Nhưng vẫn nên xác nhận bằng tai.

### 5 — lời thầy nói về Blues

- [x] thầy Thịnh **có thật sự nói** mẫu này giống điệu Blues nhưng bỏ bớt nốt?
  - **CÓ — mốc `10:07-10:28`** (người dùng xác nhận, 2026-08-27).
  - Nội dung ghi theo **lời kể lại của người dùng**, không phải trích nguyên văn:
    mẫu này đệm giống điệu Blues nhưng bỏ bớt nốt. Ai xem lại được thì chép đúng
    nguyên văn vào đây, và lúc đó mới được đặt trong ngoặc kép.
  - Đủ điều kiện `extracted`: nguồn đã đăng ký, locator thật, người xem xác nhận.

---

## Sau khi rà

Item đích: `knowledge/patterns/accompaniment/duc-thinh-bai-09/` (chưa tạo — tạo khi
phiếu này rà xong, để không có thẻ nháp nào nằm trong kho đã kiểm).

Bản chép thô của Gemini và item nháp xuất từ tester nằm ở
`D:\PianoBrain-sources\_tester-cho-duyet\`.
