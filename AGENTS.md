# Mr Hai — gọi từ agent khác

Repo này có sẵn một thầy dạy piano đệm hát chạy **offline, không token, không gọi mạng**.
Agent nào cũng gọi được bằng một lệnh shell.

## Gọi một phát

```bash
npm run ask -- "câu lót vòng 1 6 4 5 giọng C"
npm run ask -- "thầy dạy walking bass chưa"
npm run ask -- "chạy ngón trên C Am F G"
```

In ra stdout rồi thoát, mã thoát 0. Không cần API key, không cần mạng.

Không có `node_modules`? `npm install` một lần. Muốn bỏ luôn `tsx`:

```bash
npm run build
node dist/mrhai/chat.js "câu lót vòng 1 6 4 5 giọng C"
```

Đang làm việc ở repo khác thì gọi bằng đường dẫn tuyệt đối, **không cần `cd`**:

```bash
node D:/PianoBrain/dist/mrhai/chat.js "phối C Am F G"
```

Kho nằm chỗ khác thì đặt `PIANOBRAIN_ROOT`.

## Gọi từ code

```js
import { loadKnowledgeBase } from "./dist/kb/load.js";
import { reply } from "./dist/mrhai/chat.js";

const kb = loadKnowledgeBase();           // load một lần, dùng lại
console.log(reply("phối C Am F G", kb).join("\n"));
```

## Hiểu được gì

Vòng hợp âm nhận theo tên (`C Am F G`, `C - G/B - Am7 - F`), theo số (`1 6 4 5`, `1 6m 4 5`) hay
theo bậc La Mã (`I vi IV V`). Khai tông bằng `giọng F` / `tông F`; không khai thì lấy nốt gốc hợp âm đầu.

Mr Hai **chỉ trả lời đúng mục được hỏi**, không đổ cả kho ra:

| Trong câu có chữ | Nó in ra |
| --- | --- |
| `xếp bậc`, `bậc sao`, `bậc nào` | một dòng: `C=I, Am=vi, F=IV, G=V` |
| `phối`, `màu`, `reharm` | tối đa 3 bảng màu; bảng seed chỉ hiện khi thêm chữ `khó` |
| `câu lót`, `fill`, `câu dẫn` | tối đa 2 câu lót |
| `chạy ngón`, `rải`, `arpeggio` | nốt, số ngón, tay trái |
| `khuôn đệm`, `tiết tấu`, `điệu` | 1 khuôn + mật độ theo đoạn |
| `thế ngón`, `số ngón` | tối đa 2 |
| `giải thích` / `bài tập` | khái niệm / bài tập |
| `có chưa`, `thầy dạy … chưa` | kiểm toán kho + một dòng `[kiểm kê]` |

Có vòng mà không nói muốn gì → nó xếp bậc rồi hỏi lại **một** câu. Không nhận ra gì → hỏi lại, không đoán vòng.

## Đọc kết quả

Câu hỏi về kho đóng bằng một dòng kiểm kê:

```text
  [kiểm kê] ĐÃ CÓ — thầy 5, draft 0, seed 0 · tap-06-bai-08-...-006, tap-06-bai-08-...-005
```

- `ĐÃ CÓ` — có item trích từ video/PDF thật của thầy, đã đối chiếu nguồn.
- `CÓ THỂ SUY LUẬN TỪ NGUYÊN LÝ GỐC` — không có lời thầy, nhưng suy được và có dẫn căn cứ.
- `CHƯA CÓ` — kho trống chỗ đó. **Đừng lấp bằng kiến thức của chính agent.**

Nhãn trong câu trả lời:

- `[của thầy]` = `extracted`, tra ngược được về bài và mốc thời gian.
- `[suy từ thầy]` = `derived`, suy từ rule của thầy, **không phải** lời thầy.
- `[seed]` = tự dựng, không dính tới thầy.

## Luật cho agent gọi Mr Hai

1. Kết quả trả về đã có nhãn nguồn — **giữ nguyên nhãn** khi thuật lại cho người dùng.
2. `CHƯA CÓ` thì nói là chưa có. Không được thay bằng kiến thức nhạc lý của agent rồi trình bày như của thầy.
3. Không tự dịch vòng hợp âm sang bậc trong đầu — đưa nguyên câu cho `npm run ask`, nó có parser riêng và có test.
4. **In nguyên văn kết quả, không thêm mục.** Người học hỏi xếp bậc thì chỉ đưa bậc; đừng tự bồi thêm phối, câu lót, thế ngón. Muốn gợi ý thì tối đa **một** câu.
5. Không đọc, sửa hay import bất cứ thứ gì trong `D:\KeyTrain\`.

Chi tiết kiến trúc: [README.md](README.md). Luật đầy đủ: [CLAUDE.md](CLAUDE.md).
