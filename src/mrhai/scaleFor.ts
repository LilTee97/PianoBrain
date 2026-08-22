import { parseChord } from "./chords.js";
import { noteAt, pitchOfNote } from "./theory.js";
import type { KnowledgeBase, KnowledgeItem, Status } from "../kb/types.js";

/**
 * Chọn thang âm để ngẫu hứng trên một hợp âm.
 *
 * Đây là chỗ nối giữa kho và tiếng đàn: kho có 40 item mang tập bậc, nhưng
 * trước hàm này thì không dòng code nào đọc `semitones_from_root` — gam nằm
 * trong kho như chữ trong sách, không ai đàn được.
 *
 * Hàm **không nghĩ ra gam nào**. Kho không có gam cho chất hợp âm đang hỏi thì
 * trả `null`, và bên gọi phải tự lo (nốt hợp âm, ngũ cung, thang âm của giọng).
 * Đó là luật chống bịa kéo dài tới tầng chọn nốt.
 */

/** Dữ liệu gam mà bước ingest gắn vào `output.scale`. */
interface StoredScale {
  name: string | null;
  root: string;
  note_names: string[];
  semitones_from_root: number[];
  /** Chất hợp âm mà chính bài giảng dựng gam này lên — xem importJazzScales. */
  for_qualities: string[];
}

export interface ScaleChoice {
  item_id: string;
  teacher_id: string;
  source_id: string;
  locator: string | null;
  status: Status;
  /** Tên gam **đúng như bài giảng gọi**, giữ nguyên để dẫn nguồn: "G Bebop Dominant Scale". */
  name: string | null;
  /**
   * Tên gam đã đổi về nốt gốc của hợp âm đang hỏi: "C Bebop Dominant Scale".
   *
   * Bài giảng dạy gam trên một giọng cụ thể, còn người học đang chơi giọng khác.
   * In tên gốc cạnh bộ nốt đã dịch thì người đọc tưởng mình đọc nhầm.
   */
  label: string | null;
  /** Bậc tính từ nốt gốc, đúng như kho ghi. */
  semitones_from_root: number[];
  /** Lớp cao độ 0-11 đã dịch về nốt gốc của hợp âm đang hỏi. */
  pitch_classes: number[];
  /** Nốt gốc hợp âm đang hỏi, dạng lớp cao độ. */
  root: number;
}

export interface ScaleAnswer {
  /** Lựa chọn đầu, hoặc null nếu kho không có gam nào cho chất hợp âm này. */
  best: ScaleChoice | null;
  /** Mọi gam khác trong kho cũng dùng được, xếp cùng thứ hạng. */
  alternatives: ScaleChoice[];
  /** Vì sao không có gì — để bên gọi in ra thay vì im lặng. */
  missing: string | null;
}

/** Bỏ dấu ngoặc và khoảng trắng để "m(maj7)" và "mmaj7" là một. */
const normalize = (quality: string) =>
  quality.toLowerCase().replace(/[()\s]/g, "").replace(/^min/, "m").replace(/^ø/, "m7b5");

/** Đổi nốt gốc trong tên gam sang nốt gốc hợp âm: "G Bebop Dominant" + C -> "C Bebop Dominant". */
function relabel(name: string | null, root: string): string | null {
  if (!name) return null;
  const m = /^([A-G][#b]?)(\s+\S.*)$/.exec(name.trim());
  return m ? `${noteAt(pitchOfNote(root), root)}${m[2]}` : `${noteAt(pitchOfNote(root), root)} ${name}`;
}

/** Số bài giảng: "jazz-scales-bai-07" -> 7. Bài không đánh số thì coi như 0. */
const lessonNumber = (sourceId: string) => Number(/-bai-(\d+)$/.exec(sourceId)?.[1] ?? 0);

const storedScale = (item: KnowledgeItem): StoredScale | null => {
  const s = (item.output as { scale?: StoredScale }).scale;
  return s && Array.isArray(s.semitones_from_root) && Array.isArray(s.for_qualities) ? s : null;
};

/**
 * Gam có chứa **đủ** nốt của hợp âm không.
 *
 * Đây là bộ lọc quan trọng nhất, và nó bắt được lỗi thật: bài 12 dạy gam
 * Altered "trên G7", nhưng gam Altered không có bậc 5 đúng — đem nó chạy trên
 * một hợp âm G7 thường là bỏ rơi nốt D mà tay trái đang giữ. Bài giảng nói vậy
 * vì trong ngữ cảnh của bài, G7 ấy đã được đổi thành G7alt. Kho ghi lại lời
 * thầy, còn chỗ này kiểm lại bằng chính nốt của hợp âm.
 */
function covers(scalePcs: readonly number[], chordPcs: readonly number[]): boolean {
  const set = new Set(scalePcs);
  return chordPcs.every((pc) => set.has(pc));
}

export interface ScaleForOptions {
  /** Nguồn được phép cấp gam. Mặc định chỉ nguồn jazz, đúng phạm vi đã ingest. */
  teachers?: readonly string[];
  /** Chỉ lấy item đã đối chiếu nguồn. Mặc định nhận cả draft. */
  requireValidated?: boolean;
}

/**
 * Thang âm cho một hợp âm, theo kho.
 *
 * Xếp hạng, sau khi đã lọc theo nốt hợp âm:
 *
 * 1. **Bài dạy sau đứng trước bài dạy trước.** Bộ bài là một khoá học xếp theo
 *    thứ tự; bài sau quay lại cùng một chất hợp âm là đang chỉnh lại bài trước.
 *    Nhờ đó C7 ra Bebop Dominant (bài 5, 7) chứ không dừng ở Mixolydian (bài 2),
 *    và m(maj7) ra Melodic Minor (bài 8) chứ không dừng ở Minor Bebop (bài 2) —
 *    đúng thứ tự mà chính bộ bài dạy.
 * 2. Cùng bài thì item đứng trước trong bài thắng.
 *
 * Không có gam nào khớp thì `best` là `null`. Không suy, không lấy gam của chất
 * hợp âm gần giống.
 */
export function scaleFor(
  chordSymbol: string,
  kb: KnowledgeBase,
  options: ScaleForOptions = {},
): ScaleAnswer {
  const teachers = new Set(options.teachers ?? ["jazz-scales"]);
  const chord = parseChord(chordSymbol);
  if (!chord) {
    return { best: null, alternatives: [], missing: `Không đọc được ký hiệu hợp âm "${chordSymbol}".` };
  }

  const root = pitchOfNote(chord.root);
  const chordPcs = chord.intervals.map((i) => (((root + i) % 12) + 12) % 12);
  const want = normalize(chord.quality);

  const matched: ScaleChoice[] = [];
  for (const item of kb.items) {
    if (item.status === "rejected") continue;
    if (options.requireValidated && item.status !== "validated") continue;
    const src = item.source;
    if (!src || !teachers.has(src.teacher_id)) continue;

    const scale = storedScale(item);
    if (!scale || !scale.for_qualities.some((q) => normalize(q) === want)) continue;

    const pitch_classes = scale.semitones_from_root.map((s) => (((root + s) % 12) + 12) % 12);
    if (!covers(pitch_classes, chordPcs)) continue;

    matched.push({
      item_id: item.id,
      teacher_id: src.teacher_id,
      source_id: src.source_id,
      locator: src.locator,
      status: item.status,
      name: scale.name,
      label: relabel(scale.name, chord.root),
      semitones_from_root: scale.semitones_from_root,
      pitch_classes,
      root,
    });
  }

  matched.sort(
    (a, b) =>
      lessonNumber(b.source_id) - lessonNumber(a.source_id) || a.item_id.localeCompare(b.item_id),
  );

  if (matched.length === 0) {
    return {
      best: null,
      alternatives: [],
      missing: `Kho chưa có thang âm nào cho chất hợp âm "${chord.quality || "trưởng"}". Cần ingest thêm nguồn, không được tự dựng.`,
    };
  }

  return { best: matched[0], alternatives: matched.slice(1), missing: null };
}
