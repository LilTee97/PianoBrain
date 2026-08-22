# Knowledge item schema

Một item = một mẩu kiến thức chạy được. Kiểu TypeScript chuẩn nằm ở [src/kb/types.ts](../src/kb/types.ts).
Bộ kiểm tra nằm ở [src/kb/validate.ts](../src/kb/validate.ts) — item sai thì `loadKnowledgeBase()` ném lỗi, không im lặng bỏ qua.

Mọi item là một file JSON trong `knowledge/`. Thư mục chỉ để người dễ tìm; loader quét đệ quy nên đặt đâu cũng chạy, `type` mới là thứ quyết định.

## Trường bắt buộc

| Trường | Ý nghĩa |
| --- | --- |
| `id` | kebab-case, duy nhất toàn kho. Đây là thứ Mr Hai trích dẫn. |
| `type` | teacher, chord_color, voicing, fingering, scale, arpeggio, fill, intro, outro, solo_idea, accompaniment, style, rule |
| `name` | tên người đọc được |
| `difficulty` | 1..5 |
| `source` | `{ teacher_id, source_id, locator }` hoặc `null`. `locator` là "mm:ss" cho video, số trang cho PDF. |
| `use_when` | khi nào dùng — ít nhất một dòng |
| `avoid_when` | khi nào cấm dùng |
| `input` | vế IF: key_context, progression, chord_quality, style, section, hand, difficulty_max |
| `output` | vế THEN: nội dung thi hành được, hình dạng theo `type` (bảng dưới) |
| `origin` | extracted / derived / invented |
| `status` | draft / validated / rejected |
| `note_vi` | giải thích nhạc lý tiếng Việt, cho người học chứ không cho máy |

## Ba luật chống bịa (validator ép, không phải lời khuyên)

1. `origin: "extracted"` bắt buộc có `source`, và `source.source_id` phải tồn tại trong `sources/index.json`. Bịa timestamp là fail test.
2. `origin: "derived" | "invented"` **không được** có `source`. Không nguồn thì không được gán cho thầy nào.
3. `origin: "derived" | "invented"` **không được** mang `status: "validated"`. Chỉ nguồn thật mới được validated.

`rejected` không xoá đi — giữ lại để lần sau không đề xuất lại cái đã sai.

## Hình dạng `output` theo type

| type | output chứa |
| --- | --- |
| `chord_color` | `qualities` (bậc -> hậu tố hợp âm), `bass_degree` tuỳ chọn cho slash chord, `inserts` cho hợp âm chèn |
| `voicing` | `intervals_from_root`, `example`, `fingering_id` |
| `fingering` | `notes` hoặc `scale_degrees`, `fingers`, id voicing liên quan |
| `scale` / `arpeggio` | `semitones_from_root`, nốt tránh |
| `fill` / `intro` / `outro` / `solo_idea` | chất liệu + id của scale/arpeggio/fingering mà nó dùng |
| `accompaniment` | khuôn tay trái / tay phải |
| `style` | `sections` với `density` 1..5 cho từng đoạn |
| `rule` | `if`, `then`, `enforced_by` (đường dẫn file thật sự ép luật) |

Trường `_id` trỏ sang item khác phải là id có thật — Mr Hai chỉ ghép item, không tự chế.

## Thêm item mới

1. Chọn `type`, đặt `id`.
2. Chưa có nguồn? `origin: "derived"` hoặc `"invented"`, `status: "draft"`, `source: null`.
3. `npm test` — validator sẽ chặn nếu sai.
