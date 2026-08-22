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

/** Luật nối chất hợp âm với một item thang âm có sẵn trong kho. */
interface ChordScaleMap {
  chord_quality: string[];
  scale_item: string;
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
  /** Bài giảng nêu chỗ này thành **luật** hay chỉ kể tên hợp âm trong một danh sách. */
  stated_as_rule: boolean;
  /**
   * Item luật đã nối chất hợp âm này với thang âm ấy, nếu có.
   *
   * Gam jazz thì bài giảng nói thẳng "dùng trên hợp âm X" nên không cần luật.
   * Thang âm của thầy Hải thì thầy dạy thang âm rời, còn quan hệ với hợp âm nằm
   * ở một bài khác — nên phép nối là một item riêng, và bên gọi phải biết mình
   * đang đi qua nó để còn dẫn nguồn cho đúng.
   */
  via_rule?: string;
}

export interface ScaleAnswer {
  /** Lựa chọn đầu, hoặc null nếu kho không có gam nào cho chất hợp âm này. */
  best: ScaleChoice | null;
  /** Mọi gam khác trong kho cũng dùng được, xếp cùng thứ hạng. */
  alternatives: ScaleChoice[];
  /** Vì sao không có gì — để bên gọi in ra thay vì im lặng. */
  missing: string | null;
}

/**
 * Đưa chất hợp âm về một cách viết: "m(maj7)" và "mmaj7" là một.
 *
 * Hợp âm ba nốt trưởng viết **rỗng** (`"C"` chứ không phải `"Cmaj"`), nên phải
 * quy nó về `"maj"` — không thì luật nào khai phục vụ hợp âm trưởng cũng không
 * bao giờ khớp, và đó đúng là chỗ hỏng lặng lẽ nhất: không lỗi, chỉ là không
 * bao giờ có gam.
 */
const normalize = (quality: string) => {
  const flat = quality.toLowerCase().replace(/[()\s]/g, "").replace(/^min/, "m").replace(/^ø/, "m7b5");
  return flat === "" ? "maj" : flat;
};

/** Đổi nốt gốc trong tên gam sang nốt gốc hợp âm: "G Bebop Dominant" + C -> "C Bebop Dominant". */
function relabel(name: string | null, root: string): string | null {
  if (!name) return null;
  const m = /^([A-G][#b]?)(\s+\S.*)$/.exec(name.trim());
  return m ? `${noteAt(pitchOfNote(root), root)}${m[2]}` : `${noteAt(pitchOfNote(root), root)} ${name}`;
}

/**
 * Chất hợp âm **không khai màu**: hợp âm ba nốt và mấy chất chỉ thêm một nốt
 * của giọng.
 *
 * Kê thẳng danh sách chứ không đếm số quãng, vì đếm thì sai hai đầu: `7alt` chỉ
 * có ba quãng (hợp âm át biến âm không có bậc 5 đúng) nên bị nhận nhầm là hợp âm
 * ba nốt, còn `dim7` có bậc bảy giảm ở 9 nửa cung nên phép "có 10 hay 11 không"
 * cũng trượt. Danh sách thì đọc là hiểu và không có chỗ nào để trượt.
 */
const PLAIN_TRIADS = new Set([
  "maj",
  "m",
  "dim",
  "aug",
  "sus2",
  "sus4",
  "6",
  "m6",
  "add9",
  "madd9",
]);

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
  /**
   * Nguồn được phép cấp gam.
   *
   * Mặc định gồm **cả thầy Hải**, không chỉ nguồn jazz: đây là app đệm hát Việt,
   * và hợp âm ba nốt — chỗ ngũ cung của thầy sống — chiếm quá nửa số ô của một
   * bài pop. Để mặc định chỉ jazz thì cây đàn nói giọng jazz ở hợp âm bảy và câm
   * ở hợp âm ba nốt, tức câm đúng chỗ nhạc Việt sống.
   */
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
/**
 * Thang âm tìm được qua **một luật nối**, thay vì qua chính item thang âm.
 *
 * Bài giảng jazz nói thẳng "gam này dùng trên hợp âm X", nên item thang âm tự nó
 * đủ. Thầy Hải thì dạy thang âm ở một bài, còn quan hệ thang âm - hợp âm ở bài
 * khác: *"âm giai Đô trưởng tạo ra bảy hợp âm ba bậc C, Dm, Em, F, G, Am,
 * Bm-5"* (Tập 2 bài 2). Nối hai chỗ ấy là việc của một item luật riêng — chứ
 * không phải đi sửa `for_qualities` trong item của thầy, vì thầy không nói câu
 * đó ở item đó.
 *
 * Luật chỉ **trỏ** tới item thang âm; nốt vẫn nằm nguyên chỗ cũ, một bản duy
 * nhất. Sửa nốt thì sửa ở item của thầy, luật không giữ bản sao nào.
 *
 * Cửa phát tiếng đọc `status` của **luật**, không phải của item thang âm: nốt
 * thì thầy đã dạy thật, còn thứ chưa ai rà là cách đọc lời thầy.
 */
function viaRules(
  kb: KnowledgeBase,
  chordRoot: string,
  root: number,
  want: string,
  chordPcs: readonly number[],
  options: ScaleForOptions,
  teachers: ReadonlySet<string>,
): ScaleChoice[] {
  const out: ScaleChoice[] = [];

  for (const rule of kb.items) {
    if (rule.type !== "rule" || rule.status === "rejected") continue;
    if (options.requireValidated && rule.status !== "validated") continue;

    const map = (rule.output as { chord_scale_map?: ChordScaleMap[] }).chord_scale_map;
    if (!Array.isArray(map)) continue;

    for (const entry of map) {
      if (!entry.chord_quality?.some((q) => normalize(q) === want)) continue;

      const item = kb.byId.get(entry.scale_item);
      const scale = item ? storedScale(item) : null;
      if (!item || !scale || item.status === "rejected") continue;

      const pitch_classes = scale.semitones_from_root.map((s) => (((root + s) % 12) + 12) % 12);
      if (!covers(pitch_classes, chordPcs)) continue;

      const teacher = item.source?.teacher_id ?? rule.source?.teacher_id ?? "—";
      if (!teachers.has(teacher)) continue;

      out.push({
        item_id: item.id,
        teacher_id: teacher,
        source_id: item.source?.source_id ?? rule.source?.source_id ?? "—",
        locator: item.source?.locator ?? null,
        status: item.status,
        name: scale.name,
        label: relabel(scale.name, chordRoot),
        semitones_from_root: scale.semitones_from_root,
        pitch_classes,
        root,
        stated_as_rule: true,
        via_rule: rule.id,
      });
    }
  }

  return out;
}

export function scaleFor(
  chordSymbol: string,
  kb: KnowledgeBase,
  options: ScaleForOptions = {},
): ScaleAnswer {
  const teachers = new Set(options.teachers ?? ["jazz-scales", "hai-joseph"]);
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
      stated_as_rule: item.type === "rule",
    });
  }

  matched.push(...viaRules(kb, chord.root, root, want, chordPcs, options, teachers));

  /*
    Hợp âm **ba nốt** thì ngũ cung đứng trước thang âm bảy nốt.

    Đây là luật của phong cách, không phải của lý thuyết. Hợp âm bảy đã tự khai
    màu của nó — chơi Lydian trên maj7 thì nốt #11 là màu người ta muốn. Hợp âm
    ba nốt thì không khai gì cả, và trong nhạc pop Việt nó thường là hợp âm bậc
    của một giọng trưởng đơn giản; chồng một thang âm bảy nốt kiểu modal lên là
    ra nốt ngoài giọng ngay.

    Đo được trước khi có luật này: `Am` lấy A Dorian của bài 2 (bài giảng có kể
    `Cm` trong danh sách hợp âm của Dorian) và ra **Fa thăng** — lạc hẳn giọng
    Đô. Ngũ cung Thứ dựng trên chính nốt gốc hợp âm thì A-C-D-E-G, không lạc một
    nốt nào của giọng.
  */
  const isTriad = PLAIN_TRIADS.has(want);

  /*
    Hợp âm ba nốt thì **chỉ nhận ngũ cung**, không nhận thang âm bảy nốt.

    Xếp hạng thôi chưa đủ: khi ngũ cung bị cửa siết loại ra (luật nối còn chờ
    người rà) thì thang âm bảy nốt lên thay, và nó SAI chứ không phải kém. Đo
    được: `Am` qua cửa siết ra A Dorian — bài giảng có kể `Cm` trong danh sách
    hợp âm của Dorian nên nó khớp — và Dorian cho **Fa thăng**, lạc hẳn giọng Đô.

    Im lặng còn hơn kêu sai: không có ngũ cung thì bên gọi lùi về nốt hợp âm,
    vẫn đúng hoà âm, chỉ là ít màu.
  */
  const usable = isTriad
    ? matched.filter((choice) => choice.semitones_from_root.length <= 5)
    : [...matched];
  matched.length = 0;
  matched.push(...usable);

  const pentatonicFirst = (choice: ScaleChoice) =>
    isTriad && choice.semitones_from_root.length <= 5 ? 0 : 1;

  /*
    **Nhiều bài cùng nói một gam thì gam ấy thắng.**

    Trước đây chỉ xếp theo "bài dạy sau chỉnh bài dạy trước", và luật ấy yếu:
    ingest thêm một bài là câu trả lời lật, dù bài mới chỉ nhắc qua còn bốn bài
    cũ dạy hẳn. Đo được ngay khi thêm bài 14-23: `Cmaj7` nhảy từ Lydian — bốn
    bài nói — sang Major Bebop vì bài 17 mới hơn.

    Đếm theo **hình gam**, không theo tên: cùng một bộ bậc thì dù bài này gọi
    "Altered" bài kia gọi "Super Locrian" vẫn là một phiếu cho cùng một thứ.
  */
  const votes = new Map<string, Set<number>>();
  for (const choice of matched) {
    const shape = choice.semitones_from_root.join(",");
    if (!votes.has(shape)) votes.set(shape, new Set());
    votes.get(shape)!.add(lessonNumber(choice.source_id));
  }
  const consensus = (choice: ScaleChoice) =>
    votes.get(choice.semitones_from_root.join(","))?.size ?? 1;

  /** Gam không tên thì không giải thích được cho người học — xếp sau gam có tên. */
  const named = (choice: ScaleChoice) => (choice.name ? 0 : 1);

  /*
    Hoà phiếu thì hỏi hai câu, theo thứ tự này.

    **Một: bài giảng có nêu nó thành LUẬT không?** Có bài nói thẳng *"trên hợp âm
    m(maj7) thì chơi Melodic Minor dựng trên nốt gốc"* — đó là một luật. Có bài
    chỉ kể `m(maj7)` lẫn trong danh sách hợp âm dùng được của Minor Bebop — đó là
    một lời nhắc. Lời nói thẳng nặng hơn lời kể ngang.

    Đo được vì sao cần: `Cm(maj7)` từng ra Minor Bebop, vì nó **trùm** Melodic
    Minor (thêm nốt Si giáng). Nhưng nốt thêm ấy chính là bậc 7 thứ, chọi thẳng
    với bậc 7 trưởng làm nên tính cách của m(maj7). Trùm nhiều nốt hơn không có
    nghĩa là hợp hơn.

    **Hai: gam ít nốt hơn thắng.** Major Bebop và Lydian đều được hai bài nói,
    không bài nào nêu thành luật; với app đệm hát thì màu mộc hơn nên vang lên
    trước, khi người dùng chưa xin gì đặc biệt.

    Gam thua vẫn nằm trong `alternatives`, không mất.
  */
  const rulePreferred = (choice: ScaleChoice) => (choice.stated_as_rule ? 0 : 1);

  matched.sort(
    (a, b) =>
      pentatonicFirst(a) - pentatonicFirst(b) ||
      named(a) - named(b) ||
      consensus(b) - consensus(a) ||
      rulePreferred(a) - rulePreferred(b) ||
      a.semitones_from_root.length - b.semitones_from_root.length ||
      lessonNumber(b.source_id) - lessonNumber(a.source_id) ||
      a.item_id.localeCompare(b.item_id),
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
