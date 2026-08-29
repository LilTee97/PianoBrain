# Bàn giao phiên — PianoBrain + KeyTrain

Dán file này vào cửa sổ mới, hoặc bảo: *"đọc `D:\PianoBrain\BAN-GIAO.md`"*.
Cập nhật 2026-08-24, sau khi sửa xong kho hỏng.

---

## 1. Hai kho là gì

- **PianoBrain** (`D:\PianoBrain`, nhánh `master`) — **bộ não**: kho kiến thức
  nhạc + bộ chọn gam. Không UI, không âm thanh.
- **KeyTrain** (`D:\KeyTrain`, nhánh `main`) — **đôi tay**: giao diện, phát tiếng,
  MIDI. Đọc não qua bí danh `@pianobrain` → `../PianoBrain/src`.

Phụ thuộc **một chiều**: app đọc não, não không đọc app. Hai kho không gộp.

## 2. Luật cứng — đọc trước khi làm gì

- Không đụng `D:\thayhai`.
- **Không tự commit / push / amend.** Xong mỗi việc thì **nhắc người dùng commit**
  rồi mới làm tiếp. Không `git add .` — luôn liệt kê từng file.
- Không sửa `for_qualities` của item `extracted`. Muốn nối chất hợp âm với gam thì
  viết **luật mới**: `origin: "derived"`, `status: "draft"`, không gán thầy, không
  có `source`.
- Không tự đóng dấu `validated`. Item mới là `draft`; **người dùng tự rà** bằng
  cách mở video đối chiếu.
- **Không nới test cho qua.** Đỏ thì dừng, đọc kỹ, sửa nguyên nhân.
- Kho lớn lên bằng cách **cộng thêm**, không thay thầy. Item trích dẫn phải in kèm
  `teacher_id`.
- Kiểm kiểu KeyTrain: `npx tsc --noEmit -p tsconfig.app.json`. `tsconfig.json` chỉ
  là file gốc trỏ sang project con — `-p tsconfig.json` **không kiểm gì**. Bên
  PianoBrain thì `-p tsconfig.json` là thật.
- **Đừng `git stash` khi máy chủ dev đang chạy** — Vite mất file và sập. Cần kiểm
  cây đã commit thì dùng `git worktree` ở thư mục khác.

## 3. Trạng thái

| | commit đầu | đẩy | test |
|---|---|---|---|
| PianoBrain | `5a8bb73` | **1 commit chưa đẩy** | **267 xanh / 0 đỏ** |
| KeyTrain | `f806604` | đủ | **1916 xanh / 10 ĐỎ**, 6 file |

KeyTrain còn **16 file sửa dở** + 4 thứ chưa theo dõi.
Trang đã đăng: **https://liltee97.github.io/KeyTrainBEta/** — sống, HTTP 200.
Bản `origin/main` đã kiểm ở cây phụ: `tsc -b` sạch, `vite build` xong, PWA đủ.
Cả hai kho GitHub **công khai** nên Action checkout được kho não.

## 4. Vừa làm xong

Kho từng **không hợp lệ** — 33 lỗi kiểm trên 7 item — và vì thế bên KeyTrain mọi
câu hỏi trả về *"Thầy chưa đọc được câu này — não vấp"*, kéo 41 file test đỏ theo.
**Một nguyên nhân gốc, hai kho cùng đỏ.**

Sáu item hỏng là **con rơi**: không bộ nạp nào trong repo sinh ra chúng (cả bốn
script đều slugify id đàng hoàng). Nội dung cũng không dùng được — hai file trùng
nhau, hai file **không có mốc thời gian**, một file mốc hơn tám tiếng, một file
không phải item. Đã **dời** sang `D:\PianoBrain-sources\_item-con-roi\`, không xoá.

Phần nạp đúng đã commit: 7 item Bolero/Rumba của **Tuấn Lưu Piano**, bản ghi thầy,
nguồn `improv-bai-04`, hai script `importImprovBolero.ts` / `importImprovSlowRock.ts`
(script slow rock **chưa chạy lần nào**).

Bên KeyTrain còn tìm ra một lỗi nữa: `styleLibrary/index.ts` đọc `localStorage`
**ngay ở thân module**, không chắn → ném lỗi lúc *nạp file* → **38 bộ test tắt
luôn**. Trình duyệt ẩn danh cũng ném y vậy. Đã bọc `try/catch`. **Chưa commit** —
xem mục 6.

## 5. Luật gam — đã chạy, ĐỪNG làm lại

Bộ chọn gam nhận **giọng của bài**: `scaleFor(symbol, kb, { key })`, không bắt buộc.

Biết giọng Đô:
- `Am(add9)` → Aeolian · `Dm(add9)` → Dorian
- `Csus4` → Ionian · `Gsus4` → Mixolydian
- `Bdim` (trong giọng) → Locrian đã rà
- `C#dim` (lướt, ngoài giọng) → gam giảm HW/WH, **được phép lạc giọng**

Không truyền giọng: `madd9` / `sus4` / `dim` **im** — im còn hơn kêu lạc.
Hợp âm **mượn** (`Fsus4`, `Em(add9)`, `Am6` trong giọng Đô) im **đúng**.

**Cửa phát tiếng tách đôi**: item thang âm bắt buộc `extracted` + `validated`;
**luật nối** được phép `derived` (nhưng không `invented`). Bộ nốt là lời thầy,
đường đi là phép đếm nốt.

Đã nối xong, **đừng làm lại**: `13b9`, `7b13`, `11`, `maj13`, `m13`, `7b5`,
`madd9`, `sus4`, `dim` lướt, `Bdim`, `add2`≡`add9`, `°`=`dim`, `7sus`=`7sus4`.

## 6. Ba việc đang chờ người dùng quyết

**a. Commit bên KeyTrain.** Lớp chắn `localStorage` của tôi nằm trong
`styleLibrary/index.ts`, mà file ấy có **102 dòng thêm mới, chỉ ~10 dòng là của
tôi** — còn lại là tính năng xoá điệu + tester styles đang viết dở. Và nó
`import testerStylesJson from './testerStyles.json'` — file **chưa theo dõi**.
Commit một nửa là kho gãy cho người clone. Ba lựa chọn: commit cả cụm / tách
riêng lớp chắn ra file nhỏ / chưa commit gì bên KeyTrain.

**b. Đẩy bản mới lên GitHub?** KeyTrain còn 16 file sửa dở. Bản đang chạy trên
mạng vẫn tốt.

**c. Mười test đỏ** — nằm ở sáu file thuộc phần đang sửa dở:
`arrangement` (9 lỗi) · `audit` (5) · `phraseAcrossBar` (4) · `handSplitAudit` (3)
· `brain` (3) · `chordTiming` (3). Trong đó chắc chắn có **một test cũ khoá cứng
`[3-9] thầy`** mà kho nay có **10 thầy**.

## 7. Còn mở

1. Rà 14 item bài mới: `npm run review:jazz -- --tiep`.
2. Chỉ còn **`dim` ba nốt** là chất đáng đi tìm video. `aug` hiếm, bỏ được.
3. KeyTrain: phím sáng sớm 0,05 phách (`noteGatedPlaybackEngine.ts:123`) — cửa sổ
   chấm điểm đang bị dùng luôn cho việc tô sáng phím; tách ra là một dòng.
4. `src/music_engine/` (14 file, có test riêng, **app không import**) — quyết:
   commit, xoá, hay để đó.
5. Gộp `peter-martin` với bài 9 và 22 của `jazz-scales` — hai bản ghi cùng một
   người. Đổi nhãn thầy là đổi cả lượt rà, nên làm riêng một đợt.
6. `7b13` mang **cả quãng năm đúng lẫn bậc 13 giáng** — lỗi định nghĩa hợp âm.
7. Chạy `importImprovSlowRock.ts` (chưa chạy lần nào, sẽ tạo thầy `piano-dem-hat`).

## 8. Đo được, khỏi đo lại

- Thiếu gam **chỉ làm câu solo nghèo ở hợp âm đối xứng**: `dim`/`aug` còn **3 lớp
  cao độ**, hơi dài nhất 4–5 nốt. Các chất khác (`7b5`, `maj13`, `m13`, `11`,
  `13b9`) vẫn **7–8 lớp**, ngang hợp âm đã có gam — vì chất liệu còn vay được từ
  **giọng**, không chỉ từ nốt hợp âm.
- Câu chạy vắt qua vạch nhịp: bẻ hướng ở vạch nhịp **55 % → 37 %**, nốt trong hơi
  dài ≥5 nốt **45 % → 58 %**, nốt phách 1 là nốt hợp âm **55 % → 75 %**, tổng số
  nốt không đổi.
- Đoạn kết: nốt tay phải **418 → 184**. Đoạn dạo đầu: chỗ đè nốt **26 → 0**.

## 9. KHÔNG làm

- Tìm video `dim` / `aug` / Locrian / `13b9` — trừ khi được bảo.
- `7b9sus4` — cực hiếm, bỏ.
- Làm lại `13b9`, `7b13`, `11`, `maj13`, `m13`, `7b5`.
- Xoá `scratch-songs.json` / `src/music_engine/` / `Reference/` /
  `_item-con-roi/`.
- Chạy lại `run_engine.py` (gọi API, tốn tiền) trừ khi được bảo. Nó nhận
  `--lesson <tên bài>` để chạy đúng một bài.

## 10. Lệnh hay dùng

```bash
# PianoBrain
npm test
npm run review:jazz -- --tiep      # rà từng item một
npm run review:jazz -- --phieu     # in phiếu rà ra ingest/
npm run import:jazz -- "D:\PianoBrain-sources\jazz-scales\keytrain_music_engine\sources\lessons"
#   ^ đối số là ĐƯỜNG DẪN tới thư mục lessons, KHÔNG phải tên bài

# KeyTrain
npm test
npx tsc --noEmit -p tsconfig.app.json
npm run dev                        # http://localhost:5173/
```
