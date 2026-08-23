import { loadKnowledgeBase } from "../kb/load.js";
import type { KnowledgeItem } from "../kb/types.js";

/**
 * Soát bộ gam jazz trước khi người rà ngồi xuống xem video.
 *
 * ## Chỗ này KHÔNG duyệt hộ ai
 *
 * `status: "validated"` nghĩa là **có người đã đối chiếu lại nguồn**. Máy không
 * xem được video, nên máy không được đặt cờ ấy. Việc của bản soát này là làm
 * cho công việc của người rà ngắn lại: chỉ ra item nào đã tự nhất quán, item
 * nào mâu thuẫn, và item nào cần xem trước.
 *
 * ## Ba phép kiểm, cả ba đều không cần tới nguồn
 *
 * 1. **Tên gam có khớp bộ bậc không.** "C Lydian" thì bộ bậc phải là
 *    `0 2 4 6 7 9 11`. Đây là định nghĩa của thang âm, không phải lời của thầy
 *    nào — kiểm được bằng máy mà không mượn tiếng ai.
 * 2. **Hợp âm có nằm trong gam không.** Gam khai là dùng cho `Cmaj7` thì phải
 *    chứa đủ Đô, Mi, Sol, Si. Không chứa thì hoặc tên sai, hoặc chất hợp âm gán
 *    nhầm — kiểu gì cũng phải xem lại.
 * 3. **Các bài có nói giống nhau không.** Cùng một gam xuất hiện ở nhiều bài
 *    khác nhau, do nhiều lượt trích xuất khác nhau sinh ra. Chúng khớp nhau là
 *    một bằng chứng độc lập; chúng lệch nhau là chỗ chắc chắn có một bên sai.
 */

/** Bộ bậc của các thang âm bài giảng có nhắc tới. Đây là định nghĩa, không phải kiến thức của thầy. */
/*
  Thứ tự trong bảng này QUAN TRỌNG: khớp cái đầu tiên trúng.

  "Mixolydian" chứa nguyên chữ "lydian", nên để `/lydian/` đứng trước là mọi gam
  Mixolydian bị chấm là sai định nghĩa — bản soát đầu tiên báo đỏ đúng hai item
  hoàn toàn đúng. Tên dài đứng trước tên ngắn.
*/
export const SHAPES: [RegExp, number[]][] = [
  [/mixo.?blues/i, [0, 2, 3, 4, 5, 6, 7, 9, 10]],
  [/mixolydian/i, [0, 2, 4, 5, 7, 9, 10]],
  [/lydian.?dominant|lydian dominant/i, [0, 2, 4, 6, 7, 9, 10]],
  [/lydian/i, [0, 2, 4, 6, 7, 9, 11]],
  // Dorian thêm bậc 3 tự nhiên làm nốt lướt — phải đứng TRƯỚC /dorian/, không thì
  // "Dorian Bebop Scale" bị bắt bởi luật Dorian thường rồi kêu thừa một nốt.
  [/dorian bebop|bebop dorian/i, [0, 2, 3, 4, 5, 7, 9, 10]],
  [/dorian/i, [0, 2, 3, 5, 7, 9, 10]],
  [/major bebop/i, [0, 2, 4, 5, 7, 8, 9, 11]],
  [/minor bebop/i, [0, 2, 3, 5, 7, 9, 10, 11]],
  [/bebop dominant|dominant bebop/i, [0, 2, 4, 5, 7, 9, 10, 11]],
  [/dominant diminished|half.?whole/i, [0, 1, 3, 4, 6, 7, 9, 10]],
  [/whole.?half|^.{0,3}diminished scale$|^.{0,3}diminished$/i, [0, 2, 3, 5, 6, 8, 9, 11]],
  [/altered|super locrian/i, [0, 1, 3, 4, 6, 8, 10]],
  [/half.?diminished|locrian ?#2/i, [0, 2, 3, 5, 6, 8, 10]],
  // Nguồn viết cả "melodic minor" lẫn "minor melodic ascending" — cùng một gam.
  [/melodic minor|minor melodic/i, [0, 2, 3, 5, 7, 9, 11]],
  [/natural minor|aeolian/i, [0, 2, 3, 5, 7, 8, 10]],
  [/whole tone/i, [0, 2, 4, 6, 8, 10]],
  [/major scale|^major$/i, [0, 2, 4, 5, 7, 9, 11]],
];

const CHORD_TONES: Record<string, number[]> = {
  maj7: [0, 4, 7, 11],
  maj9: [0, 4, 7, 11, 2],
  "6/9": [0, 4, 7, 9, 2],
  "maj7#11": [0, 4, 7, 11, 6],
  m: [0, 3, 7],
  m7: [0, 3, 7, 10],
  m9: [0, 3, 7, 10, 2],
  m11: [0, 3, 7, 10, 2, 5],
  "m6/9": [0, 3, 7, 9, 2],
  "m(maj7)": [0, 3, 7, 11],
  m7b5: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
  "7": [0, 4, 7, 10],
  "9": [0, 4, 7, 10, 2],
  "13": [0, 4, 7, 10, 2, 9],
  "7sus4": [0, 5, 7, 10],
  "7b9": [0, 4, 10, 1],
  "7#9": [0, 4, 10, 3],
  "7#11": [0, 4, 7, 10, 6],
  "7b13": [0, 4, 10, 8],
  "7#5": [0, 4, 8, 10],
  "7alt": [0, 4, 10],
  "7#5#9": [0, 4, 8, 10, 3],
  "ø7": [0, 3, 6, 10],
  aug: [0, 4, 8],
};

interface Row {
  item: KnowledgeItem;
  name: string;
  semitones: number[];
  qualities: string[];
  /** Điều đáng nói nhất về item này. Rỗng nghĩa là qua hết. */
  notes: string[];
}

const same = (a: readonly number[], b: readonly number[]) =>
  a.length === b.length && a.every((value, at) => value === b[at]);

function main(): void {
  const kb = loadKnowledgeBase();
  const rows: Row[] = [];

  for (const item of kb.items) {
    if (item.source?.teacher_id !== "jazz-scales") continue;
    const scale = (item.output as { scale?: { name?: string | null; semitones_from_root?: number[]; for_qualities?: string[] } }).scale;
    if (!scale?.semitones_from_root) continue;

    rows.push({
      item,
      name: scale.name ?? "(không tên)",
      semitones: scale.semitones_from_root,
      qualities: scale.for_qualities ?? [],
      notes: [],
    });
  }

  // 1. Tên gam khớp bộ bậc chưa.
  for (const row of rows) {
    if (row.name === "(không tên)") {
      /*
        Item **cố ý** không tên: dòng kể nhiều gam một lượt mà tên đầu không nêu
        nốt gốc thì bước nạp bỏ tên đi, để khỏi dán nhãn "Lydian" lên bộ nốt của
        một gam khác. Bộ chọn gam không đụng tới chúng, nên không phải rà gấp.
      */
      row.notes.push("cố ý không đặt tên (dòng kể nhiều gam) — bộ chọn gam không dùng");
      continue;
    }
    const known = SHAPES.find(([pattern]) => pattern.test(row.name));
    if (!known) {
      row.notes.push("tên gam không nằm trong bảng định nghĩa — phải xem video");
      continue;
    }
    if (!same(row.semitones, known[1])) {
      row.notes.push(`bộ bậc lệch định nghĩa: có ${row.semitones.join(" ")}, "${row.name}" phải là ${known[1].join(" ")}`);
    }
  }

  // 2. Hợp âm khai dùng có nằm trong gam không.
  for (const row of rows) {
    const set = new Set(row.semitones);
    for (const quality of row.qualities) {
      const tones = CHORD_TONES[quality];
      if (!tones) {
        row.notes.push(`chất hợp âm "${quality}" chưa có trong bảng — không kiểm được`);
        continue;
      }
      const missing = tones.map((t) => ((t % 12) + 12) % 12).filter((t) => !set.has(t));
      if (missing.length === 0) continue;
      /*
        Thiếu **quãng năm đúng** là chuyện bình thường của gam biến âm: gam
        altered và gam whole tone vốn không có bậc 5 đúng. Bài giảng vẫn nói
        "dùng trên G7" vì trong ngữ cảnh của bài, G7 ấy đã thành G7alt. Bộ chọn
        gam bên `scaleFor` đã tự lọc chỗ này rồi, nên đây là ghi chú chứ không
        phải lỗi cần sửa trong kho.
      */
      const onlyFifth = missing.length === 1 && missing[0] === 7;
      row.notes.push(
        onlyFifth
          ? `gam không có bậc 5 đúng nên không hợp "${quality}" — scaleFor đã tự lọc, kho ghi đúng lời bài giảng`
          : `gam thiếu nốt của "${quality}": ${missing.join(",")}`,
      );
    }
  }

  // 3. Các bài có nói giống nhau không.
  const byShape = new Map<string, Row[]>();
  for (const row of rows) {
    const known = SHAPES.find(([pattern]) => pattern.test(row.name));
    if (!known) continue;
    const key = known[0].source;
    byShape.set(key, [...(byShape.get(key) ?? []), row]);
  }
  const corroborated = new Map<Row, number>();
  for (const group of byShape.values()) {
    const lessons = new Set(group.map((row) => row.item.source!.source_id));
    for (const row of group) corroborated.set(row, lessons.size);
  }

  const clean = rows.filter((row) => row.notes.length === 0);
  const dirty = rows.filter((row) => row.notes.length > 0);
  const used = clean.filter((row) => row.qualities.length > 0);

  const line = (row: Row) =>
    `  ${row.item.source!.locator?.padEnd(13) ?? "chưa rõ".padEnd(13)} ${row.name.padEnd(24)} ${row.item.source!.source_id.slice(-6)}  ${row.qualities.join(",") || "-"}`;

  console.log(`Bộ gam jazz: ${rows.length} item mang bộ bậc.\n`);

  console.log(`── ${used.length} item QUA HẾT ba phép kiểm và đang được bộ chọn gam dùng ──`);
  console.log("   (mốc — gam — bài — chất hợp âm phục vụ)");
  for (const row of [...used].sort((a, b) => a.name.localeCompare(b.name))) {
    const votes = corroborated.get(row) ?? 1;
    console.log(line(row) + (votes > 1 ? `   [${votes} bài nói giống nhau]` : ""));
  }

  const spare = clean.filter((row) => row.qualities.length === 0);
  console.log(`\n── ${spare.length} item qua hết ba phép kiểm nhưng CHƯA gắn chất hợp âm nào ──`);
  console.log("   (bộ chọn gam không đụng tới, rà sau cũng được)");
  for (const row of spare) console.log(line(row));

  console.log(`\n── ${dirty.length} item CÓ CHỖ GỢN, xem video trước khi rà ──`);
  for (const row of dirty) {
    console.log(line(row));
    for (const note of row.notes) console.log(`      · ${note}`);
  }

  console.log(`\nMáy không đặt được cờ validated: cờ ấy nghĩa là có người đã đối chiếu nguồn.`);
  console.log(`Rà xong một item thì đổi "status" trong file của nó sang "validated".`);
}

// Chỉ chạy khi gọi thẳng file này. `reviewJazzScales` nhập bảng SHAPES từ đây,
// mà nhập một module thì thân module chạy theo — không chặn thì mỗi lần in phiếu
// lại đổ nguyên bản kiểm ra màn hình.
if (process.argv[1]?.includes("auditJazzScales")) main();
