# Ingest pipeline: 1 video hoặc PDF -> knowledge + rules

Cấm tóm tắt suông. Tóm tắt không chạy được và không kiểm chứng được.
Mỗi lần ingest phải tách nội dung thành **sáu rổ**, rổ nào ra rổ nấy.

## Bước 0 — Đăng ký nguồn trước

Thêm bản ghi vào `sources/index.json`:

```json
{ "source_id": "hai-ballad-01", "teacher_id": "hai-joseph", "kind": "video", "title": "...", "url": "...", "ingested_at": "2026-08-20" }
```

Chưa có bản ghi này thì **không** item nào được phép `origin: "extracted"` — validator sẽ chặn.

## Bước 1 — Transcript có mốc thời gian

Ghi ra `ingest/raw/<source_id>.md` theo mẫu `templates/transcript.md`.
Mỗi đoạn: `[mm:ss] thầy nói gì / chơi gì`. Không diễn giải ở bước này.

## Bước 2 — Tách sáu rổ

Dùng `templates/extraction.md`. Mỗi dòng phải mang timestamp.

| Rổ | Là gì | Ví dụ |
| --- | --- | --- |
| **fact** | điều thầy nói thẳng, không suy diễn | "chỗ này tôi dùng Fm6 trước khi về C" |
| **principle** | nguyên tắc rút ra, thầy nói rõ | "hợp âm mượn giọng thứ dùng khi muốn kết buồn" |
| **pattern** | chất liệu lặp lại được: fill, intro, khuôn đệm | câu lót 4 nốt trước chorus |
| **rule** | IF/THEN thi hành được | IF kết ballad THEN IV - iv - I |
| **example** | một lần chơi cụ thể: tông, hợp âm, nốt, ngón | Cmaj7 tay trái C2-B2-E3 ngón 5-2-1 |
| **unsure** | nghe không rõ, thầy nói lướt, mình đoán | ghi rõ đoán cái gì |

Rổ **unsure** không bao giờ thành item `extracted`. Hoặc xem lại nguồn cho chắc, hoặc để `origin: "derived"` và nói rõ trong `note_vi`.

## Bước 3 — Viết item

Mỗi dòng ở rổ fact / principle / pattern / rule / example thành một file JSON trong `knowledge/`,
theo `schema/knowledge-item.md`, dùng `templates/knowledge-item.json` làm khung.

- `origin: "extracted"`, `source: { teacher_id, source_id, locator: "mm:ss" }`
- `status: "draft"` cho tới khi có người nghe lại đối chiếu, xong mới đổi `"validated"`
- `note_vi` giải thích **tại sao**, không chép lại lời thầy nguyên văn

## Bước 4 — Kiểm

```bash
npm test
```

Validator chặn: source_id ma, item derived mà gán thầy, item invented mà validated, id trùng.

## Bước 5 — Chạy thử Mr Hai

```bash
npm run mrhai
```

Đối chiếu bản phối Mr Hai đưa ra với cách thầy chơi trong video. Lệch chỗ nào thì sửa item, đừng sửa Mr Hai.

## Điều tuyệt đối cấm

- Bịa timestamp để item trông có nguồn.
- Gộp nhiều bài của nhiều thầy vào một item.
- Viết item mô tả "phong cách thầy" khi mới xem một video.
- Xoá item `rejected` — giữ lại để không lặp lại cái sai.

## Kho master: 6 bước đã chạy xong ở ngoài

Quy trình trên đã được chạy hết cho khóa của thầy, kết quả nằm ngoài repo tại `D:/thayhai/keytrain_music_engine/`.
Không cần xem lại video. Việc còn lại là chuyển sang `knowledge/`, từng bài một.

```bash
export PIANOBRAIN_MASTER=/d/thayhai/keytrain_music_engine
npm run import                    # 70 bài, dấu x là đã chuyển
npm run import -- --all           # chuyển hết (bỏ Tap_05 và bài 0 item)
npm run import -- Tap_01_Bai_01   # chuyển một bài
```

Bộ chuyển ở [src/migrate/importMaster.ts](../src/migrate/importMaster.ts) đọc **hai tầng** rồi gộp theo id:

| Tầng | File | Giữ được gì |
| --- | --- | --- |
| source knowledge | `knowledge_base/master/all_source_knowledge.jsonl` | `raw_text` đầy đủ, `music_entities`, `observed_example`, `supporting_sources`, `media_id` |
| đã hình thức hóa | `rules/approved_rules.json`, `rules/needs_review_rules.yaml`, `rules/rejected_rules.yaml`, `patterns/*.json` | `applies_when`, `action`, `formula`, `example`, mọi mốc thời gian |
| thô (candidate) | `knowledge_base/master/all_rule_candidates.yaml` | `implementation`, `execution`, `constraints` (số ngón), `examples`, `conditions`, `severity` |
| cờ rà soát | `validation/HUMAN_REVIEW_QUEUE.yaml` | lý do phải rà (`output.review_reason`), cờ bài thiếu video id |
| phủ sóng | `validation/MISSING_OR_SKIPPED_LESSONS.md` | bài bỏ / dở dang, ghi vào `sources/index.json` mục `coverage` |

Trùng id thì tầng source knowledge làm gốc, tầng kia gắn vào `output.formalized`. Candidate gắn vào `output.candidate`.

Candidate nào có tên field chứa "finger" thì item đổi type thành `fingering` và số ngón vào `output.fingering` — đó là cách thế ngón của thầy đi tới Mr Hai.

Rule có `description` rỗng **không bị bỏ**: lấy chữ từ candidate (`statement` / `summary` / `title`). Ba rule `rejected` của `Tap_02_Bai_12` là trường hợp này.

Hai file **bỏ qua được**, trùng 100% với thứ đang đọc: `rules/executable_rules.yaml` (hợp của 3 file rule) và `knowledge_base/master/all_musical_examples.jsonl` (bản chiếu của `observed_example`).

Ánh xạ trạng thái:

| Kho master | PianoBrain | Vì sao |
| --- | --- | --- |
| `extracted` / `approved` + `direct` | `validated` | thầy nói hoặc chơi thẳng |
| `extracted` / `approved` + `inferred` | `draft` | máy suy ra, cần người rà |
| `needs_human_review` | `draft` | **giữ lại**, không vứt, cũng không tự duyệt hộ |
| `rejected` | `rejected` | giữ để không lặp lại cái sai |

Độ khó kho master để trống hết nên mọi item chuyển sang đều là 3. Rà từng bài thì chỉnh tay.

`data/` trong repo là bản chép một phần, giữ làm dự phòng khi không cắm ổ chứa kho master.
