# Khung phiếu — clone một thầy, một điệu

Đem file này sang Claude / OpenCode khi train thầy mới. **Một phiếu = một thầy + một điệu.** Cà Pháo ballad ≠ Cà Pháo bossa. Không so, không mượn hằng số thầy khác.

Điền từ sheet của **đúng thầy đó**. Đo: `python tools/sheet/clone_do.py` + dump ô. Hợp âm máy = đoán từ LH; tin **sheet + tai**. Chỗ bass ≠ gốc máy hay ghi `sus4` — đó là nghi vấn.

Cách ghi: sửa thẳng dòng, hoặc thêm `- Ý BẠN:`. Đánh `[x]` khi **đồng ý**. Lệch: để trống, ghi số / ý ngay dưới.

**Luật 3 thầy (đã chốt, mọi phiếu):**
- Đoạn **hát** (phiên / điệp / tiền điệp): RH = **giọng ca**.
- Dạo / giang / kết: RH = đàn.
- LH **hợp âm lướt** ≠ đổi xương vòng.
- RH **chùm có nốt lời** — dense ≠ hết là đệm.

**Tone chủ (bắt buộc):** sheet thầy có giọng riêng. Bài app đang mở có giọng khác. Đo **bậc** trên sheet, dựng lại trên tonic bài. Không dán symbol/MIDI tuyệt đối.

Ví dụ: Đừng Xa = Dm, *Để nhớ một thời ta đã yêu* = Am. `i` sheet = Dm → bài Am thì ô 1 dạo = **Am**, không phải Dm.

```
pc_bài = (pc_sheet − tonic_sheet + tonic_bài) % 12
hợp âm = chordAtDegree(tonic_bài, scale, bậc)
```

---

# 0. Phạm vi

| | điền |
| --- | --- |
| Thầy | |
| Điệu (user xác nhận, không đoán) | |
| Bài 1 — file, số ô, giọng sheet | |
| Bài 2 — file, số ô, giọng sheet | |
| n (bài / ô dạo / ô giang / ô kết / ô hát) | |
| Biên đoạn corpus đã chốt? | có / chưa — thiếu đoạn nào |
| Bài loại (file khác bản, chưa chia) | ghi rõ, đừng lấp |
| Bài app để nghe (mặc định: *Để nhớ…*) + **giọng bài đó** | |

Solo train **chỉ** intro / interlude / outro. Phiên–điệp không train từ sổ này.

---

# 1. Máy vs sheet (làm trước khi tin vòng)

Máy hay sai. Phiếu Cà Pháo: `Ebsus4` thật ra **Eb/Ab**; `Gmaj7` thật ra **Gm**.

1. Ô nào bass ≠ gốc máy đoán? Gọi **slash** / đổi gốc / giữ sus? **Một lối cho cả phiếu.**
2. Sheet có ký hiệu hợp âm trên khuông không? Có thì **sheet thắng máy**.
3. Chordify / vòng app đoán lệch ô nào?
4. Giọng máy vs tai (trưởng / thứ / nâng tone giữa bài)?

`- Ý BẠN:`

---

# 2. Hai tay lúc hát — A.0

Nhìn đoạn **có lời**. RH = giọng (đã chốt).

1. Vừa sang ô mới: LH có nốt không? (% ô)
2. Câu hát nhiều nốt: LH có **im** không?
3. Nốt hát cuối ô: có luôn nốt chủ không? Hay 3 / 5 / 7 / khác?
4. LH hợp âm lướt (passing bass) — ô ví dụ. Có đổi vòng không?
5. RH chùm: trong chùm **có nốt lời** không?

**Đã chốt 3 thầy (Cà Pháo):** LH vào đầu ô, không im khi hát dày. Nốt cuối ô không bắt buộc chủ.

`- Ý BẠN:`

---

# 3. Từng đoạn solo — lặp cho Intro / Giang / Kết

Mỗi đoạn một khối. Số đo + vòng **bậc** (i iv V7…) + 2–3 ô cử chỉ. Không chép hết phiên.

## 3.a Intro — ô ___–___

Vòng máy (symbol): ` `

Vòng **bậc** so tonic **sheet**: ` `  
(vd Đừng Xa Dm: `I | bVII | bVI | III | iv | i | V7 | i`)

Cùng xương phiên / điệp / vòng riêng?

| hỏi | đo / trả lời |
| --- | --- |
| Độ dài (ô). Hai bài cùng độ dài? | Không gộp 8 ô cho mọi bài nếu n lệch |
| Nhịp hòa âm (ô/hợp âm) vs hát | |
| Mở bằng i / I / V / khác? | Ô 1 phải là bậc trên **tonic bài app**, không dán pitch sheet |
| Pickup trước ô 1? Hình (1-3-5 / 1-♭3-5 / khác) | Linh Nhi Biển Tình: D–F#–A |
| LH mốc/ô, phách 1 % | Intro có thưa hơn hát (chỉ phách 1) không? |
| RH nốt/ô vs hát | Dày = câu đàn, không bịa pent run |
| Phách 1 hai tay cùng vào? | |
| Nốt đáp cuối ô (1/3/5/7/khác) | |
| Câu chạy ngón (≥4 móc kép)? Mấy lần? Intro thường 0 | |
| Cử chỉ lặp (sẽ gặp lại giang/kết)? | Cà Pháo ô 5 = ô 53 |
| Hợp âm báo / E7b9 / 9sus4 cuối dạo — của thầy này hay của Khá? | Linh Nhi: **không** E7b9 |
| Lời bắt đầu ô nào, nốt xanh nào? Pickup cuối intro có phải lời? | |

**Phá cách / cử chỉ nổi**

| ô | việc | phán đoán | học gì |
| --- | --- | --- | --- |
| | | | |

`- Ý BẠN:`

## 3.b Giang tấu — ô ___–___

Vòng máy: ` `

Vòng **bậc** so tonic sheet: ` `

**Cấm mặc định:** không lấy đầu điệp / vòng hát làm giang, trừ khi sheet **đo được** là trùng. Linh Nhi bolero: giang ≠ điệp. App cũ `chooseChorusLoop from=0` là lỗi.

| hỏi | đo / trả lời |
| --- | --- |
| Copy điệp, copy phiên, hay vòng riêng? | |
| Đàn **show** (dài, RH dày) hay **cầu lấy hơi** (ngắn, lời im)? | Cà Pháo: Có Em Chờ = show; Ngày mai = cầu. **Không một cell** |
| Loops / nhắc intro? | |
| Ô cuối = át (V7) của đoạn hát **kế**? | Linh Nhi: có |
| LH giữ cell hát / dày chorus / đổi hẳn / im lúc RH chạy? | Cà Pháo: LH không nhường. Linh Nhi ô chạy: LH im gõ, ngân xuyên |
| RH 1-3-5 hay 9/11 từ hợp âm màu? Giọng thứ: RH ♭3 cả khi LH trưởng? | Đừng Xa: F trên D, Eb trên C |
| Câu chạy: 0 / thỉnh thoảng 1 / mỗi 2 ô? | Bolero Linh Nhi giang ~0 |
| Tessitura RH (MIDI thấp–cao). App có kẹp tầm không? | |
| Hai bài cùng thầy+điệu: **một** giang hay **hai nút** (hai job)? | Tôn Hùng: Chiếc Lá / Tình Em / hòa trộn |

**Phá cách**

| ô | việc | phán đoán | học gì |
| --- | --- | --- | --- |
| | | | |

`- Ý BẠN:`

## 3.c Outro — ô ___–___

Vòng bậc: ` `

| hỏi | đo / trả lời |
| --- | --- |
| Cadence V–I, vòng nhỏ rồi cắt, hay thưa dần? | |
| Về giọng gốc hay **dừng giọng mới** (nâng tone)? | Cà Pháo Có Em Chờ dừng E |
| LH thưa dần / ô cuối im bass? | |
| RH cửa đóng (rải lên) cùng họ intro? | |
| Nốt lời cuối rồi mới show? | |

`- Ý BẠN:`

---

# 4. Pattern LH → điệu (đoạn hát trước)

20. Phách 1 LH % ô.
21. Số mốc/ô; lưới 1/8 hay gặp nhất. Cell 1 ô hay 2 ô? Syncopate?
22. Verse vs chorus: cùng cell hay chorus **dày hơn**? (Tôn Hùng ballad: điệp dày, BPM sheet.)
23. Intro/outro thưa hơn hát?
24. Giang: giữ cell hát / chorus / đổi?
25. Chồng nốt một mốc (bass đơn / 8ve / block)?
26. Hai bài cùng nhãn điệu đã **khác mật độ**? → **không gộp một điệu / một cell.**
27. BPM trên sheet (`quarter=`). App có cứng số khác không?

`- Ý BẠN:`

---

# 5. Chọn nốt solo (chỉ dạo / giang / kết)

Đo **1 nốt trên cùng** (quạt 2+ tạo nhảy giả).

12. Liền bậc / quãng 3 / nhảy ≥5? Lên vs xuống?
12b. Đáp cuối ô: 1-3-5 / 7 / other? (Cà Pháo other ~36%; Linh Nhi / Tôn Hùng hợp âm ~70%.)
12c. RH solo vs hát: dày hơn bao nhiêu nốt/ô?
13. % nốt rơi hợp âm LH. &lt;~50% → **đừng** kết luận gam; tên hợp âm có thể sai.
14. Câu chạy: có? Dài? Liền bậc hay rải? Phách nào?
15. Không có chạy → **cấm** bịa pentatonic.
16. Gam khớp RH (≥80%, cỡ mẫu). Hai gam gần → nói cả hai.
17. Câu kết: 1/3/5 vs 9/11/13.
18. Quãng âm solo vs hát. Có nhảy 8ve trên?
19. Nghỉ ≥ 1 đen giữa câu, hay chạy liền?
19b. Hình quãng (midi − nốt đầu) — clone như Licky, rồi **dịch tonic bài**.

`- Ý BẠN:`

---

# 6. Hai tay lúc solo

28. Phách 1: cùng vào hay RH nghỉ?
29. Mốc chung / RH lặp pitch-class LH (nhân bản)?
30. Ô RH chạy: LH mốc/ô giảm? Nhường?
31. Không chạy: LH giữ groove?
32. Khe MIDI (thấp RH − cao LH). Bắt chéo 0%?
33. Trần RH / đáy LH. Solo mở tessitura?
34. Ô chạy: LH còn gõ phách 1 / im / pedal?
34b. `interlockHands` (cài vào khe) có **phá** thầy này không? Linh Nhi / Tôn Hùng: RH bám LH, **bỏ** interlock.

`- Ý BẠN:`

---

# 7. Giọng thứ / trưởng (nếu thầy có cả hai)

Phát sinh Linh Nhi: Biển Tình = trưởng (tươi); Đừng Xa = thứ (buồn). **Không đắp vòng trưởng lên bài thứ.**

- Bài sheet trưởng: vòng dạo/giang/kết bậc nào?
- Bài sheet thứ: bậc nào? I picardy hay i? RH ♭3 trên hợp âm trưởng?
- Bài app trưởng → dùng recipe trưởng. Bài app thứ → recipe thứ, **cùng bậc, tonic mới**.
- Parallel minor (C bài → Am giang) chỉ khi sheet **đo được** là làm vậy. Không tự song song.

`- Ý BẠN:`

---

# 8. Hai bài — tư duy chung

Chỉ cái **lặp đủ n** hoặc **cố ý khác**.

**Khác — không gộp một luật** (mẫu Cà Pháo)

1. Độ dài dạo
2. Giang show vs cầu
3. Kết về giọng cũ vs dừng giọng mới
4. Cell LH điệp vs phiên

**Giống — được clone**

5. …
6. …

Motif lặp (ostinato) là **tick phụ**, không ngang hàng thầy. (Chiếc Lá dưới Tôn Hùng, chỉ dạo.)

---

# 9. Đủ clone chưa

35. Cái nào lặp đủ → luật IF/THEN (kèm n)?
36. Cái nào một bài — ghi cử chỉ, không thành default mọi bài?
37. Máy không đo được — phải rà ký hiệu / tai?
38. **Cấm khi clone** (để không lẫn thầy / không lẫn bài):
    - không gộp cell LH hai bài
    - không bắt một độ dài intro
    - không biến mọi giang thành copy điệp / i–V7
    - không tắt LH lúc RH chạy *trừ khi sheet im*
    - không gọi rải hợp âm là lick pent
    - không dán tonic sheet sang bài khác
    - không trộn điệu của cùng thầy
    - không train phiên–điệp từ sổ solo

---

# 10. Chỗ phát sinh khi nhập sheet (hỏi thêm nếu gặp)

Gặp hiện tượng thì **thêm dòng**, đừng bỏ qua.

| gặp | hỏi |
| --- | --- |
| Nâng tone giữa bài | Luật thầy hay một bài? Nửa cung / 1 cung? Hát hay chỉ đàn? |
| Độ dài đoạn lẻ (9 ô, 7 ô, 4 ô) | Rút cố ý hay thiếu ô? |
| Giang 4 ô | Show hay cầu lấy hơi? 1 chữ hát đầu ô rồi im? |
| Intro RH đã dày như solo | Đã hát chưa? Nốt xanh đầu lời ở đâu? |
| Bass D trên nhãn Cm7 | Slash / nửa giảm / máy sai gốc? |
| Chromatic approach (F6–F#6) | Enclosure, không đổi gam ô đó |
| Pedal + đổi chất (Δ → 6 → sus) | Cầu trên I, không phải vòng mới |
| Secondary V, dim lướt, backdoor | Ô chẵn/lẻ? Trước cửa vào đoạn mới? |
| Hai giang khác job | Hai nút, không trung bình một cell |
| App giang ra đầu điệp | Sheet có làm vậy không? (thường không) |
| Giai điệu sáng dù vòng thứ | RH đang lấy 3 trưởng / 9 của add9? Khóa 1-3-5 / ♭3 |
| Cue E7b9 / 9sus4 | Thầy này hay pipeline Khá? |
| `quarter=120` trên sheet | BPM đệm = sheet, không cứng 70 |
| Copy `songIntro` 4 hợp âm gốc | Intro thầy hay intro bài? Đừng trộn |

---

# 11. Sau khi app phát — một vòng rồi dừng

User nghe. **Chưa được** → tách 3 mặt, hỏi mặt nào, **chờ**. Không tự sửa vòng 2.

1. **Tiết tấu** — LH mốc, mật độ, phách 1, show vs cầu
2. **Vòng hợp âm** — có copy hát không; có đúng **bậc × tonic bài** không (ô 1 dạo = i bài, không phải i sheet)
3. **Giai điệu** — đáp cuối ô, rải vs pent, chùm có nốt lời, RH = giọng lúc hát

Ghi ô lệch. Sửa xong: nhắc user ghi `reference/SO-TAY.md` nếu bước lớn.

Không viết item kho `extracted` từ bản đo. Đo nốt → `derived` + `draft`.

---

# Header copy khi mở phiếu mới

```
# Phiếu — [Thầy], [điệu]
Bài: …
Giọng sheet: …    Giọng bài app: …
n = …
Đo: clone_do.py + dump ô
```
