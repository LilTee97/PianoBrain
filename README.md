# PianoBrain

Bộ não piano **độc lập**: Domain Knowledge Base + Teaching Methodology + Music Generation Rules.
Không phải app học, không phải UI, không phải RAG thuần, không phải skill thuần.

```text
PianoBrain = lõi tư duy âm nhạc (kiến thức + luật chạy được)
Mr Hai     = mặt nói chuyện của lõi đó, thầy đệm hát
App học    = consumer, import bundle từ PianoBrain
```

PianoBrain không nằm trong app nào và không import ngược từ app. Test `loaders.test.ts` chặn mọi import theo đường dẫn tuyệt đối.

Phạm vi: **jazz và pop đệm hát**. Không cổ điển.

## Trạng thái

Phase ingest khóa thầy Hải Joseph: **xong**. Kho hiện có **764 item / 70 bài**.

| | Số item |
| --- | --- |
| Trích từ nguồn thật của thầy (`extracted`) | 740 |
| Hạt giống tự dựng (`derived` / `invented`) | 24 |
| Đã đối chiếu nguồn (`validated`) | 634 |
| Còn chờ người rà (`draft`) | 127 |
| Đã loại nhưng giữ lại (`rejected`) | 3 |

Phân bố: 318 rule, 124 concept, 110 khuôn đệm, 86 bài tập, 45 fill, 43 voicing, 18 gam, 7 bảng màu, 6 thế ngón, 2 điệu.

## Chạy thử

```bash
npm install
npm test        # validator + luật chống bịa + luật chọn item
npm run mrhai   # Mr Hai trên vòng I-vi-IV-V, ghi ra examples/
npm run chat    # chat với Mr Hai ngay trong terminal, offline
```

Node >= 20. Kết quả mẫu: [examples/i-vi-IV-V-pop-ballad.md](examples/i-vi-IV-V-pop-ballad.md).

## Chat trong terminal

```bash
npm run chat
```

```text
Em: câu lót vòng 1 6 4 5 giọng C
Thầy: Vòng em đưa, tông C: bậc I - vi - IV - V  =  C | Am | F | G
      ...
      [kiểm kê] ĐÃ CÓ — thầy: 23 · draft: 1 · seed: 0
```

Nhận vòng theo tên hợp âm (`C Am F G`, `C - G/B - Am7 - F`), theo số (`1 6 4 5`, `1 6m 4 5`) hay theo bậc
La Mã (`I vi IV V`). Khai tông bằng "giọng F" / "tông F"; không khai thì lấy nốt gốc hợp âm đầu.
Câu hỏi dạng "có chưa" đi thẳng sang kiểm toán kho. Không nhận ra thì hỏi lại một câu chứ không đoán vòng.
`/quit` để thoát. Chat mẫu: [examples/chat-mau.md](examples/chat-mau.md).

## Hỏi Mr Hai thế nào

```ts
import { askMrHai } from "./src/mrhai/answer.js";
import { renderAnswer } from "./src/mrhai/render.js";

const answer = askMrHai({
  key: "C",                              // tông
  progression: ["I", "vi", "IV", "V"],   // vòng theo bậc, không phải tên hợp âm
  style: "pop_ballad",                   // "pop_ballad" | "jazz" | "pop"
  maxDifficulty: 5,                      // 1..5, chặn bảng màu khó hơn mức này
  explain: false,                        // true -> kèm mục Giải thích (concept)
  exercises: false,                      // true -> kèm mục Bài tập (exercise)
});

console.log(renderAnswer(answer));
```

Trả về, mỗi mục là **lựa chọn** (4 item khớp nhất) chứ không phải cả kho:

| Trường | Nội dung |
| --- | --- |
| `original` | vòng gốc đã đổi ra tên hợp âm |
| `reharms[]` | các bảng màu dễ → khó, kèm `applied_rules` là rule của thầy **dùng đúng bộ hợp âm đó** |
| `intros` `fills` `outros` `solos` `accompaniment` `voicings` | chất liệu chơi |
| `scales` `fingerings` `handShapes` | gam, số ngón, khuôn tay trái / tay phải |
| `style.sections` | mật độ theo verse / pre / chorus / bridge / outro |
| `concepts` `exercises` | rỗng trừ khi bật `explain` / `exercises` |
| `missing[]` | thứ kho chưa có — Mr Hai nói thiếu chứ không tự nghĩ ra |
| `used_ids[]` | mọi id đã dùng, để đối chiếu ngược lại kho |

### Cách Mr Hai chọn

- **Thứ tự:** `extracted` + `validated` → `extracted` + `draft` → seed tự dựng. Seed chỉ lấp chỗ kho chưa có.
- **Rule vào bảng màu khi bảng đó thật sự dùng nó:** mọi nốt gốc và mọi chất hợp âm đặc trưng (`sus4`, `dim`, `7b9`…) rule nhắc tới đều phải có mặt trong bảng. Hợp âm ba trơn không được tính là bằng chứng.
- **Item không dính gì tới vòng đang hỏi thì bị loại**, không xếp cuối cho có.
- Mỗi dòng có nhãn **của thầy** (kèm tên thầy + trạng thái) hoặc *seed tự dựng*. Bảng màu seed nói rõ rule của thầy chỉ khớp hợp âm, **không phải** thầy dạy bảng màu đó.

Agent Mr Hai trong Claude Code: [.claude/agents/mr-hai.md](.claude/agents/mr-hai.md).

## Ingest nguồn mới

Quy trình đầy đủ: [ingest/PIPELINE.md](ingest/PIPELINE.md). Tóm tắt:

1. **Đăng ký nguồn trước.** Thêm bản ghi vào [sources/index.json](sources/index.json). Chưa có bản ghi thì không item nào được phép `origin: "extracted"` — validator chặn.
2. **Chép lại có mốc thời gian** theo [ingest/templates/transcript.md](ingest/templates/transcript.md). Chưa diễn giải.
3. **Tách sáu rổ** theo [ingest/templates/extraction.md](ingest/templates/extraction.md): fact / principle / pattern / rule / example / **unsure**. Rổ `unsure` không bao giờ được thành `extracted`.
4. **Viết item** theo [schema/knowledge-item.md](schema/knowledge-item.md), khung có sẵn ở [ingest/templates/knowledge-item.json](ingest/templates/knowledge-item.json). Để `status: "draft"` cho tới khi có người nghe lại đối chiếu.
5. `npm test` — validator chặn source_id ma, item derived mà gán thầy, item invented mà validated, id trùng.
6. `npm run mrhai` — đối chiếu bản phối với cách thầy chơi. Lệch thì sửa item, đừng sửa Mr Hai.

Nếu nguồn mới đã chạy qua pipeline trích xuất bên ngoài (dạng kho master jsonl + yaml), dùng bộ chuyển sẵn có:

```bash
export PIANOBRAIN_MASTER=/duong/dan/toi/kho-master
npm run import                    # liệt kê các bài, dấu x là đã chuyển
npm run import -- Tap_01_Bai_01   # chuyển một bài
npm run import -- --all           # chuyển hết (bỏ Tap_05 và bài 0 item)
```

Đường dẫn kho master truyền qua `PIANOBRAIN_MASTER`, **không** viết cứng trong code.

## Ba luật chống bịa

Do `src/kb/validate.ts` ép, `src/tests/kb.test.ts` kiểm:

1. `origin: "extracted"` phải trỏ tới `source_id` có thật trong `sources/index.json`, và phải có mốc thời gian **hoặc** ghi rõ vì sao thiếu.
2. `derived` / `invented` không được gán cho thầy nào.
3. `derived` / `invented` không được mang `status: "validated"`.

`needs_human_review` giữ thành `draft` — không vứt, cũng không tự duyệt hộ. `rejected` giữ lại để không lặp lại cái sai.

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `schema/` | định nghĩa knowledge item, kiểu chuẩn ở `src/kb/types.ts` |
| `knowledge/teachers/` | hồ sơ thầy |
| `knowledge/concepts/` | chords, voicings, fingerings, scales, arpeggios |
| `knowledge/patterns/` | fills, intros, outros, solos, accompaniment |
| `knowledge/styles/` | điệu + mật độ theo đoạn |
| `knowledge/rules/` | luật IF/THEN |
| `ingest/` | quy trình + template từ video/PDF |
| `sources/` | đăng ký nguồn + `coverage` (bài kho gốc chưa trích xuất đủ) |
| `examples/` | đầu ra mẫu của Mr Hai |
| `src/kb/` | loader + validator |
| `src/mrhai/` | Mr Hai: chọn và ghép item |
| `src/migrate/` | bộ chuyển từ kho master |
| `data/` | bản chép một phần của kho master, giữ làm dự phòng; engine cũ chạy `npm run demo` |

## Chỗ kho còn thiếu

Mr Hai in ra ở mục *Còn thiếu* mỗi lần trả lời:

- 12 bài kho gốc chưa trích xuất đủ (1 bỏ theo yêu cầu, 11 dở dang).
- 57 bài không có video id trong source map nên mốc thời gian kém tin cậy.
- Chưa có intro / outro / ý solo nào của thầy được phân loại vào đúng mục.
- Độ khó mọi item chuyển từ kho master đều để mặc định 3, chưa rà tay.

## Không làm trong repo này

UI, Tone.js, Web MIDI, vector DB / RAG infra, nuốt cả thư viện video, và bịa giáo trình của thầy.
