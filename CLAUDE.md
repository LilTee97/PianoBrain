# PianoBrain — luật cho mọi agent

PianoBrain là **bộ não âm nhạc**, không phải app. Nó phục vụ mọi app piano, không thuộc app nào.

## Ranh giới cứng

- **Không** đọc, sửa, import, hay commit bất cứ thứ gì trong `D:\KeyTrain\` hoặc bất kỳ app nào khác. KeyTrain chỉ là một consumer sẽ đọc PianoBrain sau này.
- **Không** import theo đường dẫn tuyệt đối. `src/tests/loaders.test.ts` chặn việc này.
- Xuất ra ngoài chỉ qua `exportEngineBundle()`. App consumer nhận bundle, không nhúng lại logic.
- Không UI, không Tone.js, không Web MIDI, không vector DB / RAG infra. Markdown + JSON + schema là đủ ở giai đoạn này.

## Luật chống bịa — quan trọng nhất

Ba luật này do `src/kb/validate.ts` ép và `src/tests/kb.test.ts` kiểm:

1. `origin: "extracted"` bắt buộc trỏ tới `source_id` **có thật** trong `sources/index.json`.
2. `origin: "derived"` hoặc `"invented"` **không được** gán cho thầy nào, không được có `source`.
3. `derived` / `invented` **không được** mang `status: "validated"`.

Hệ quả cho mọi agent:

- Thiếu kiến thức thì **nói thiếu**, đề xuất ingest nguồn. Không lấp bằng cách tự nghĩ ra rồi nói như thật.
- Không bịa timestamp, không bịa "thầy Hải dạy rằng...". Kho đã ingest 70 bài của thầy (740 item extracted, 127 còn `draft`), nhưng item nào không phải `extracted` thì **tuyệt đối** không được gán cho thầy.
- Phân biệt rõ ba mức khi trả lời: lấy nguyên từ kho (extracted), suy ra từ lý thuyết (derived), tự nghĩ (invented). Bịa = cấm, không phải một mức.

## Cấu trúc

```
schema/          định nghĩa knowledge item (kiểu chuẩn ở src/kb/types.ts)
knowledge/       kiến thức đã chuẩn hóa — teachers, concepts, patterns, styles, rules
ingest/          quy trình + template biến video/PDF thành item
sources/         đăng ký nguồn, phải có trước khi item được extracted
examples/        đầu ra mẫu của Mr Hai
src/kb/          loader + validator cho knowledge/
src/mrhai/       Mr Hai: ghép item thành câu trả lời
src/migrate/     đọc kho master ngoài repo, chuyển sang knowledge/ từng bài một
src/ (còn lại)   engine cũ đọc data/ (bản chép một phần, giữ làm dự phòng)
```

## Quy tắc khi thêm kiến thức

- Một item = một file JSON. `id` kebab-case, duy nhất.
- Trường `_id` trỏ item khác phải là id có thật.
- Không sửa schema chỉ để nhét một item lạ. Thêm `type` mới thì cập nhật `src/kb/types.ts`, `validate.ts`, `schema/knowledge-item.md` cùng lúc.
- Item cũ đã sai thì để `status: "rejected"`, đừng xoá.
- Chuyển **từng bài một**, không chuyển cả loạt. Chuyển xong bài nào thì rà độ khó và `use_when` của bài đó.
- Nguồn kiến thức là **kho master ngoài repo**, đường dẫn qua biến môi trường `PIANOBRAIN_MASTER` (không viết cứng vào code). `data/` chỉ là bản chép một phần: thiếu hẳn tầng source knowledge.
- Item `needs_human_review` chuyển sang **`status: "draft"`** — giữ lại, không vứt, cũng không tự duyệt hộ. Item `rejected` giữ nguyên `rejected`.

## Lệnh

```bash
npm test        # validator + luật chống bịa + engine cũ
npm run mrhai   # Mr Hai chạy trên vòng I-vi-IV-V, ghi ra examples/
npm run import                    # liệt kê 70 bài trong kho master, dấu x là đã chuyển
npm run import -- --all           # chuyển hết (bỏ Tap_05 và bài 0 item)
npm run import -- Tap_01_Bai_01   # chuyển một bài sang knowledge/
npm run demo    # engine cũ trên data/
```

## Kho lớn lên bằng cách CỘNG THÊM, không thay thầy

Kho có nhiều thầy. Thầy Hải Joseph (`hai-joseph`) là corpus gốc, 70 bài. Nguồn mới — Pianote,
Mack Grout, Charlie Tran, Peter Martin và về sau nữa — **đứng cạnh** thầy, không đứng thay.

- **Không** xoá, giấu, ghi đè hay lọc bỏ item của `hai-joseph` để nhường chỗ cho nguồn mới.
- Mỗi item trích dẫn phải in kèm `teacher_id`. Kho nhiều thầy rồi thì nói "của thầy" trống không là sai.
- Nguồn mới lấp chỗ thầy chưa dạy: blues, walking bass ballad, lick bebop, enclosure, bossa.

Khi hai thầy dạy khác nhau thì **giữ cả hai**, đừng chọn hộ người học. Ví dụ tay trái bossa:
thầy Hải dạy bass ngân legato liên tục, Peter Martin dạy tay trái thưa ở phách 1 và 3.
Chỗ khác nhau đó là thứ đáng học, không phải mâu thuẫn cần dẹp.

- Hỏi **chung** (không nêu tên thầy) -> liệt kê **mọi trường phái** kho có, mỗi thầy được một chỗ
  trước khi ai đó được chỗ thứ hai.
- Hỏi **đích danh** một thầy -> chỉ trả lời theo thầy đó. Thầy đó chưa có thì nói chưa có, rồi nêu
  tên nguồn khác đang có — không được để người học tưởng đó là của thầy mình hỏi.

## Mr Hai chọn item thế nào

- Ưu tiên: `extracted`+`validated` -> `extracted`+`draft` -> seed (`derived`/`invented`). Seed chỉ lấp chỗ kho chưa có.
- Mỗi mục là một **lựa chọn** (cắt còn 4 item khớp nhất), không phải danh sách toàn kho.
- Item không dính gì tới hợp âm / điệu đang hỏi thì bị loại, không xếp cuối cho có.
- `concept` và `exercise` chỉ hiện khi người dùng hỏi "giải thích" / "bài tập" (`explain` / `exercises`).

## Phạm vi nhạc

Jazz và pop đệm hát. Không cổ điển.
