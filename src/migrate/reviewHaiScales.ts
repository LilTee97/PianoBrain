import fs from "node:fs";
import path from "node:path";
import { resolveRepoRoot } from "../kb/load.js";
import type { KnowledgeItem } from "../kb/types.js";

/**
 * Rà tay các item thang âm của thầy Hải, điền phần nốt cho máy đọc được.
 *
 * Item của thầy vốn chỉ có `output.raw_text` — một câu tiếng Việt đọc được bằng
 * mắt nhưng máy không dùng được: "Thang âm ngũ cung giọng Thứ gồm các bậc
 * 1 - 3 - 4 - 5 - 7. Ví dụ trên giọng Am gồm nốt A - C - D - E - G". Bộ chọn gam
 * cần một tập bậc, không cần một câu văn.
 *
 * Đây là **rà**, không phải thêm kiến thức: mọi con số dưới đây đọc thẳng từ
 * `raw_text` của chính item đó, và bảng ghi kèm câu gốc để người sau đối chiếu
 * được mà không phải mở lại video. Bài nào `raw_text` không nêu đủ nốt thì
 * không có mặt ở đây — thà thiếu còn hơn đoán hộ thầy.
 *
 * Không đụng tới `origin`, `status`, `source` hay `note_vi` của item.
 */

interface Review {
  /** Nốt gốc để tính bậc, đúng ví dụ thầy nêu trong raw_text. */
  root: string;
  note_names: string[];
  /** Câu trong raw_text mà bảng này đọc ra. Người rà sau đối chiếu bằng dòng này. */
  from: string;
}

const PITCH: Record<string, number> = {
  C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5,
  "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11,
};

/**
 * Chỉ item **định nghĩa** một thang âm mới có mặt.
 *
 * Bài Tập 3 bài 3 nói về luồn ngón trên gam Đô trưởng — đó là item ngón tay,
 * không phải item gam, dù trong câu có chữ "thang âm C Major". Điền nốt vào đó
 * thì bộ chọn gam sẽ lôi một bài tập ngón ra làm căn cứ hoà âm.
 */
const REVIEWED: Record<string, Review> = {
  "tap-01-bai-01-lesson-id-00001-concept-major-scale-c": {
    root: "C",
    note_names: ["C", "D", "E", "F", "G", "A", "B"],
    from: "Âm giai Đô Trưởng gồm 7 bậc nốt cơ bản: C - D - E - F - G - A - B - (C)",
  },
  "tap-01-bai-09-lesson-id-0009-01": {
    root: "A",
    note_names: ["A", "C", "D", "E", "G"],
    from: "Thang âm ngũ cung giọng Thứ bậc 1 - 3 - 4 - 5 - 7; ví dụ giọng Am gồm A - C - D - E - G",
  },
  "tap-01-bai-09-lesson-id-0009-02": {
    root: "C",
    note_names: ["C", "D", "E", "G", "A"],
    from: "Thang âm ngũ cung giọng Trưởng bậc 1 - 2 - 3 - 5 - 6; ví dụ C Trưởng gồm C - D - E - G - A",
  },
  "tap-01-bai-09-lesson-id-0009-03": {
    root: "C",
    note_names: ["C", "E", "F", "G", "B"],
    from: "Thang âm Tây Nguyên trên giọng Trưởng bậc 1 - 3 - 4 - 5 - 7; ví dụ C Trưởng gồm C - E - F - G - B",
  },
  "tap-01-bai-09-lesson-id-0009-04": {
    root: "D",
    note_names: ["D", "F", "G", "A", "B"],
    from: "Thang âm Dân ca Nam Bộ giọng Thứ bậc 1 - 3 - 4 - 5 - 6; ví dụ trên Dm gồm D - F - G - A - B (bậc 6 tự nhiên)",
  },
  "tap-01-bai-14-lesson-14-00001": {
    root: "C",
    note_names: ["C", "D", "E", "F", "G", "A", "B"],
    from: "Giọng chính Đô Trưởng, âm giai tương ứng gồm 7 nốt C - D - E - F - G - A - B",
  },
  "tap-02-bai-01-lesson-tap02-bai01-001": {
    root: "A",
    note_names: ["A", "B", "C", "D", "E", "F", "G"],
    from: "Âm giai Thứ Tự Nhiên trên giọng La thứ gồm các nốt: A, B, C, D, E, F, G",
  },
  "tap-02-bai-01-lesson-tap02-bai01-002": {
    root: "A",
    note_names: ["A", "B", "C", "D", "E", "F", "G#"],
    from: "Âm giai Thứ Hòa Thanh nâng bậc 7 lên 1/2 cung (G -> G#)",
  },
  "tap-02-bai-01-lesson-tap02-bai01-003": {
    root: "A",
    note_names: ["A", "B", "C", "D", "E", "F#", "G#"],
    from: "Âm giai Thứ Giai Điệu nâng cả bậc 6 và bậc 7 lên 1/2 cung (F -> F#, G -> G#)",
  },
  "tap-02-bai-02-lesson-id-00001": {
    root: "C",
    note_names: ["C", "D", "E", "F", "G", "A", "B"],
    from: "Âm giai Đô trưởng tự nhiên bao gồm 7 nốt C - D - E - F - G - A - B - C",
  },
  "tap-03-bai-13-tap-03-bai-13-item-002": {
    root: "G",
    note_names: ["G", "A", "B", "C", "D", "E", "F#"],
    from: "Âm hình thang âm Sol trưởng gồm: Sol, La, Si, Đô, Rê, Mi, Pha thăng",
  },
};

function walk(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".json")) out.push(p);
  }
  return out;
}

function main(): void {
  const repo = resolveRepoRoot();
  const files = walk(path.join(repo, "knowledge"));
  const done = new Set<string>();

  for (const file of files) {
    const item = JSON.parse(fs.readFileSync(file, "utf8")) as KnowledgeItem;
    const review = REVIEWED[item.id];
    if (!review) continue;

    const root = PITCH[review.root];
    item.output = {
      ...item.output,
      scale: {
        name: item.name.split(/[.:(]/)[0].trim().slice(0, 60),
        root: review.root,
        note_names: review.note_names,
        semitones_from_root: [
          ...new Set(review.note_names.map((n) => (((PITCH[n] - root) % 12) + 12) % 12)),
        ].sort((a, b) => a - b),
        // Thầy dạy thang âm, không gắn nó vào một chất hợp âm nào — để trống,
        // đừng suy hộ. Bộ chọn gam jazz vì thế không đụng tới mấy item này.
        for_qualities: [],
        review: `rà tay từ raw_text: ${review.from}`,
      },
    };
    fs.writeFileSync(file, JSON.stringify(item, null, 2) + "\n", "utf8");
    done.add(item.id);
  }

  const missing = Object.keys(REVIEWED).filter((id) => !done.has(id));
  console.log(`đã rà ${done.size}/${Object.keys(REVIEWED).length} item thang âm của thầy Hải`);
  if (missing.length > 0) {
    console.error("không tìm thấy trong kho:", missing.join(", "));
    process.exit(1);
  }
}

main();
