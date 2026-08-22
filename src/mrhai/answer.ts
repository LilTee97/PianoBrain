import type { Difficulty, KnowledgeBase, KnowledgeItem } from "../kb/types.js";
import { contentTerms, termOverlap } from "./audit.js";
import { deriveFlatNineApproach } from "./derive.js";
import { chordSymbol, qualityOfDegree } from "./theory.js";

export interface AskInput {
  key: string;
  /** Bậc hợp âm, ví dụ ["I","vi","IV","V"] */
  progression: string[];
  style?: string;
  /** Luật rule-difficulty-caps-color: không trả bảng màu khó hơn mức này. */
  maxDifficulty?: Difficulty;
  /** Người dùng hỏi "giải thích" -> mới kèm phần khái niệm. */
  explain?: boolean;
  /** Người dùng hỏi "bài tập" -> mới kèm phần bài tập. */
  exercises?: boolean;
  /** Nguyên văn câu hỏi, dùng để xếp hạng theo đúng chữ người học gõ. */
  query?: string;
}

export interface ItemRef {
  id: string;
  name: string;
  difficulty: Difficulty;
  origin: KnowledgeItem["origin"];
  status: KnowledgeItem["status"];
  /** Chỉ khác null khi origin === "extracted". */
  attribution: string | null;
  /**
   * "teacher" = trích từ nguồn thật của thầy.
   * "derived" = suy ra từ rule của thầy, có dẫn nguồn nhưng không phải lời thầy.
   * "seed" = hạt giống tự dựng, không dính tới thầy.
   */
  source_kind: "teacher" | "derived" | "seed";
  /** Số ngón / nốt cụ thể nếu item có, để không phải mở file mới thấy. */
  detail: string | null;
  note_vi: string;
}

export interface Reharm extends ItemRef {
  chords: string[];
  /** Rule của thầy khớp với vòng này — đây là căn cứ chọn màu, không phải trang trí. */
  applied_rules: ItemRef[];
  /** Chỉ bảng suy mới có: bài của thầy mà bước suy dựa vào. */
  derived_from_sources?: string[];
}

/** Khuôn tay thầy dặn: tay trái làm gì, tay phải làm gì. Nằm ở tầng candidate. */
export interface HandShape extends ItemRef {
  left_hand: string | null;
  right_hand: string | null;
}

export interface MrHaiAnswer {
  key: string;
  original: string[];
  reharms: Reharm[];
  intros: ItemRef[];
  fills: ItemRef[];
  outros: ItemRef[];
  solos: ItemRef[];
  accompaniment: ItemRef[];
  voicings: ItemRef[];
  scales: { chord_quality: string; scale: ItemRef }[];
  fingerings: ItemRef[];
  handShapes: HandShape[];
  style: (ItemRef & { sections: Record<string, unknown> }) | null;
  /** Chỉ có khi hỏi "giải thích" / "bài tập". */
  concepts: ItemRef[];
  exercises: ItemRef[];
  /** id của mọi item được dùng — test đối chiếu ngược lại kho. */
  used_ids: string[];
  /** Thứ Mr Hai không có trong kho. Không được lấp bằng cách tự nghĩ ra. */
  missing: string[];
}

const compact = (v: unknown): string | null =>
  v && typeof v === "object" ? JSON.stringify(v).replace(/[{}"]/g, "").replace(/,/g, ", ") : null;

function toRef(item: KnowledgeItem): ItemRef {
  const o = item.output;
  return {
    id: item.id,
    name: item.name,
    difficulty: item.difficulty,
    origin: item.origin,
    status: item.status,
    attribution: item.origin === "extracted" ? (item.source?.teacher_id ?? null) : null,
    source_kind: item.origin === "extracted" ? "teacher" : "seed",
    detail: compact(o.fingering ?? o.fingers ?? null),
    note_vi: item.note_vi,
  };
}

/** Thứ tự ưu tiên: của thầy đã đối chiếu -> của thầy còn draft -> seed tự dựng. */
function tier(item: KnowledgeItem): number {
  if (item.origin !== "extracted") return 2;
  return item.status === "validated" ? 0 : 1;
}

/** Chèn át 7b9 là thủ pháp nâng cao, không đưa cho người mới. */
const DERIVED_DIFFICULTY = 4 as const;

const sameProgression = (a: string[] | undefined, b: string[]) =>
  Array.isArray(a) && a.length === b.length && a.every((d, i) => d === b[i]);

/** Ngữ cảnh vòng hợp âm đang hỏi, dùng để đo item nào thật sự áp dụng được. */
interface Ctx {
  /** Nốt gốc: C, Am, F, G */
  roots: Set<string>;
  /** Hậu tố chất hợp âm: maj7, m7, 7, 13... */
  qualities: Set<string>;
  /** Ký hiệu đầy đủ: Cmaj9, Am11 */
  symbols: Set<string>;
  style?: string;
  cap: number;
  /** Từ nội dung người học vừa gõ. Item nhắc đúng chữ đó thì sát ý hơn. */
  terms?: string[];
}

// "m" của hợp âm thứ thuộc về nốt gốc, nhưng "m" của maj7 thì không — Cmaj9 phải ra C, không phải Cm.
const rootOf = (symbol: string) => /^[A-G][#b]?(m(?!aj))?/.exec(symbol.split("/")[0])?.[0] ?? symbol;
const qualityOf = (symbol: string) => symbol.split("/")[0].replace(/^[A-G][#b]?/, "");

/**
 * Kho có hai lối viết tên điệu: "bossa_nova" do mình đặt, "bossa-nova" do bộ chuyển
 * slug từ tag tự do của kho master. So sánh phải bỏ qua gạch nối, nếu không cùng một
 * điệu mà hai bên không nhận ra nhau.
 */
const styleKey = (s: string) => s.toLowerCase().replace(/[-_]/g, "");
const hasStyle = (styles: string[] | undefined, want: string) =>
  styles?.some((s) => styleKey(s) === styleKey(want)) ?? false;

/** Chất hợp âm quá phổ biến, không chứng minh được rule nào dùng trong vòng. */
const TRIVIAL_QUALITY = new Set(["", "m"]);

/**
 * "sus4" khớp "7sus4", "dim" khớp "dim7". Không khớp thì thôi, đừng đoán xa hơn.
 * Chất tầm thường (rỗng, "m") không bao giờ là bằng chứng — chuỗi rỗng nằm trong mọi chuỗi.
 */
const qualityMatches = (a: string, b: string) => {
  if (TRIVIAL_QUALITY.has(a) || TRIVIAL_QUALITY.has(b)) return false;
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  return x === y || x.includes(y) || y.includes(x);
};

/**
 * Item có THẬT SỰ dùng trong vòng này không.
 *  - Mọi nốt gốc item nhắc tới phải có mặt trong vòng.
 *  - Mọi chất hợp âm đặc trưng item nhắc tới (sus4, dim, 7b9...) cũng phải có mặt.
 * Thiếu một trong hai thì item chỉ tình cờ trùng nốt gốc, không phải áp dụng được.
 */
export function coversChords(chordish: string[], ctx: Ctx): boolean {
  if (chordish.length === 0) return false;
  for (const c of chordish) {
    if (ctx.symbols.has(c)) continue;
    if (!ctx.roots.has(rootOf(c))) return false;
  }
  const marked = chordish.map(qualityOf).filter((q) => !TRIVIAL_QUALITY.has(q));
  for (const q of marked) {
    if (![...ctx.qualities].some((have) => qualityMatches(q, have))) return false;
  }
  return true;
}

/**
 * Điểm áp dụng. null = không dính gì tới vòng này, loại thẳng.
 * Chỉ đọc trường có cấu trúc, không đoán mò từ câu chữ.
 */
function relevance(item: KnowledgeItem, ctx: Ctx): number | null {
  if (item.status === "rejected" || item.difficulty > ctx.cap) return null;
  const chordish = item.input.chord_quality ?? [];
  const styles = item.input.style;
  const styleOk = !ctx.style || !styles || hasStyle(styles, ctx.style);
  let score = 0;
  if (coversChords(chordish, ctx)) score += 3;
  if (ctx.style && hasStyle(styles, ctx.style)) score += 1;
  // Item nhắc đúng chữ người học vừa gõ thì sát ý hơn. Tính theo SỐ từ trúng, không
  // phải trúng hết mới tính — hoà điểm là thứ tự file quyết định, không chấp nhận được.
  if (ctx.terms) score += termOverlap(item, ctx.terms);
  // Item không khai hợp âm nào thì dùng được ở mọi vòng, nhưng xếp sau.
  if (score === 0 && chordish.length === 0 && styleOk) return 0;
  return score > 0 ? score : null;
}

/**
 * Khớp trước, nguồn sau. Trước đây xếp theo nguồn trước nên hỏi blues lại ra khuôn
 * ballad của thầy Hải chỉ vì item đó đã validated — dán nhầm công người khác.
 * Cùng mức khớp thì mới ưu tiên: đã đối chiếu nguồn -> còn draft -> seed.
 */
const byRank = (ctx: Ctx) => (a: KnowledgeItem, b: KnowledgeItem) =>
  (relevance(b, ctx) ?? 0) - (relevance(a, ctx) ?? 0) || tier(a) - tier(b) || a.difficulty - b.difficulty;

function buildChords(item: KnowledgeItem, prog: string[], key: string): string[] {
  const out = item.output as {
    qualities: Record<string, string>;
    bass_degree?: Record<string, string>;
    inserts?: { after: string; chords: { degree: string; quality: string }[] }[];
  };
  const chords: string[] = [];
  for (const degree of prog) {
    const quality = out.qualities[degree] ?? "";
    chords.push(chordSymbol(degree, quality, key, out.bass_degree?.[degree]));
    for (const ins of out.inserts ?? []) {
      if (ins.after !== degree) continue;
      for (const c of ins.chords) chords.push(chordSymbol(c.degree, c.quality, key));
    }
  }
  return chords;
}

export function askMrHai(input: AskInput, kb: KnowledgeBase): MrHaiAnswer {
  const { key, progression, style } = input;
  const cap = input.maxDifficulty ?? 5;
  const missing: string[] = [];
  const byType = (t: KnowledgeItem["type"]) => kb.items.filter((i) => i.type === t && i.status !== "rejected");

  const colors = byType("chord_color")
    .filter((i) => sameProgression(i.input.progression, progression))
    .filter((i) => i.difficulty <= cap)
    .sort((a, b) => a.difficulty - b.difficulty);
  if (colors.length === 0) {
    missing.push(
      `Chưa có bảng màu nào trong kho cho vòng ${progression.join(" - ")} ở mức khó <= ${cap}. Cần ingest hoặc thêm item chord_color, không tự bịa.`,
    );
  }

  const chordLists = colors.map((c) => buildChords(c, progression, key));
  const allChords = chordLists.flat();
  const terms = input.query ? contentTerms(input.query) : undefined;
  const ctx: Ctx = {
    roots: new Set(allChords.map(rootOf)),
    qualities: new Set(allChords.map(qualityOf)),
    symbols: new Set(allChords),
    style,
    cap,
    terms,
  };

  // Rule của thầy áp dụng được cho ĐÚNG bảng màu đó — mỗi bảng màu một bộ căn cứ riêng.
  const validatedRules = byType("rule").filter((i) => i.origin === "extracted" && i.status === "validated");
  const rulesFor = (chords: string[]) => {
    const local: Ctx = {
      roots: new Set(chords.map(rootOf)),
      qualities: new Set(chords.map(qualityOf)),
      symbols: new Set(chords),
      style,
      cap,
    };
    // Rule chỉ vào bảng màu khi bảng đó thật sự dùng hợp âm rule nói tới.
    return validatedRules
      .filter((i) => coversChords(i.input.chord_quality ?? [], local))
      .sort(byRank(local))
      .slice(0, 3)
      .map(toRef);
  };

  const reharms: Reharm[] = colors.map((c, i) => ({
    ...toRef(c),
    chords: chordLists[i],
    applied_rules: rulesFor(chordLists[i]),
  }));

  // Bước suy: không chép bảng màu seed nào, chỉ dựng thêm nếu kho có rule 7b9 -> hợp âm thứ.
  // Bảng suy là mức 4; người học xin mức thấp hơn thì không đưa ra.
  const derivation = cap >= DERIVED_DIFFICULTY ? deriveFlatNineApproach(kb, progression, key) : null;
  if (derivation) {
    const shown = derivation.authorities.slice(0, 3);
    const targetChord = chordSymbol(derivation.target_degree, "m", key);
    reharms.push({
      id: `derived-${derivation.inserted.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-truoc-${derivation.target_degree}`,
      name: `Suy từ thầy — chèn ${derivation.inserted} ngay trước bậc ${derivation.target_degree}`,
      difficulty: DERIVED_DIFFICULTY,
      origin: "derived",
      status: "draft",
      attribution: null,
      source_kind: "derived",
      detail: null,
      note_vi: `Thầy dạy hợp âm át trừ 9 hút rất mạnh về hợp âm thứ (${derivation.inserted} về ${targetChord}). Vòng này có bậc ${derivation.target_degree} nên suy ra được phép chèn át 7b9 của chính bậc đó ngay phía trước. Đây là suy luận, không phải lời thầy — thầy không dạy vòng này.`,
      chords: derivation.chords,
      applied_rules: shown.map(toRef),
      derived_from_sources: [...new Set(shown.map((a) => a.source?.source_id).filter((x): x is string => !!x))],
    });
  } else if (progression.includes("vi")) {
    missing.push(
      "Vòng có bậc vi nhưng kho chưa có rule nào của thầy nói hợp âm át 7b9 giải quyết về hợp âm thứ — không chèn, không tự suy.",
    );
  }
  if (reharms.every((r) => r.applied_rules.length === 0)) {
    missing.push("Chưa có rule validated nào của thầy khớp vòng này — màu hợp âm dưới đây mới chỉ dựa vào seed.");
  }

  /** Chọn, không liệt kê: lọc theo độ áp dụng, xếp của thầy lên trước, cắt ngắn. */
  const pick = (t: KnowledgeItem["type"], limit = 4) =>
    byType(t)
      .filter((i) => relevance(i, ctx) !== null)
      .sort(byRank(ctx))
      .slice(0, limit)
      .map(toRef);

  const intros = pick("intro");
  const fills = pick("fill");
  const outros = pick("outro");
  const solos = pick("solo_idea");
  const accompaniment = pick("accompaniment");
  const voicings = pick("voicing");

  // rule-v7-scale-choice: gam lấy từ kho theo chất hợp âm, không tự nghĩ.
  const qualities = [...ctx.qualities];
  const scales: { chord_quality: string; scale: ItemRef }[] = [];
  for (const q of qualities) {
    const scale = byType("scale")
      .filter((s) => s.input.chord_quality?.includes(q))
      .sort(byRank(ctx))[0];
    if (scale) scales.push({ chord_quality: q || "triad", scale: toRef(scale) });
  }
  const uncovered = qualities.filter((q) => !scales.some((s) => s.chord_quality === (q || "triad")));
  if (uncovered.length > 0) {
    missing.push(`Chưa có gam trong kho cho: ${uncovered.map((q) => q || "triad").join(", ")}.`);
  }

  const fingerings = pick("fingering");
  if (fingerings.length === 0) missing.push("Chưa có thế ngón nào trong kho khớp vòng này.");

  // Khuôn tay: chỉ đọc output.candidate.implementation, không tự nghĩ ra vai trò tay nào.
  const handShapes: HandShape[] = kb.items
    .filter((i) => relevance(i, ctx) !== null)
    .sort(byRank(ctx))
    .map((i) => {
      const impl = (i.output.candidate as { implementation?: Record<string, unknown> } | undefined)?.implementation;
      const left = typeof impl?.left_hand === "string" ? impl.left_hand : null;
      const right = typeof impl?.right_hand === "string" ? impl.right_hand : null;
      return { item: i, left, right };
    })
    .filter((x) => x.left !== null || x.right !== null)
    .slice(0, 4)
    .map(({ item, left, right }) => ({ ...toRef(item), left_hand: left, right_hand: right }));
  if (handShapes.length === 0) missing.push("Chưa có khuôn tay trái / tay phải nào trong kho khớp vòng này.");

  const styleItem = style
    ? byType("style")
        .filter((s) => hasStyle(s.input.style, style))
        .sort(byRank(ctx))[0]
    : undefined;
  if (style && !styleItem) missing.push(`Chưa có item điệu cho style "${style}".`);

  // Khái niệm và bài tập chỉ hiện khi được hỏi. Mặc định câu trả lời là để chơi, không phải để đọc.
  const concepts = input.explain ? pick("concept", 5) : [];
  const exercises = input.exercises ? pick("exercise", 5) : [];

  const refs = [
    // Bảng suy không phải item trong kho nên không vào used_ids; căn cứ của nó thì có.
    ...reharms.filter((r) => r.source_kind !== "derived"),
    ...reharms.flatMap((r) => r.applied_rules),
    ...intros,
    ...fills,
    ...outros,
    ...solos,
    ...accompaniment,
    ...voicings,
    ...scales.map((s) => s.scale),
    ...fingerings,
    ...handShapes,
    ...concepts,
    ...exercises,
  ];
  const used_ids = [...new Set([...refs.map((r) => r.id), ...(styleItem ? [styleItem.id] : [])])];

  if (kb.sources.length === 0) {
    missing.push(
      "Chưa ingest video/PDF nào của thầy. Mọi item dưới đây là derived hoặc invented — không phải giáo trình của thầy Hải.",
    );
  }

  // Kho gốc thiếu bài thì phải nói ra, đừng để tưởng là thầy không dạy.
  const { skipped, incomplete } = kb.coverage;
  if (skipped.length + incomplete.length > 0) {
    missing.push(
      `Kho gốc chưa trích xuất đủ ${skipped.length + incomplete.length} bài (${skipped.length} bỏ theo yêu cầu, ${incomplete.length} dở dang): ${[...skipped, ...incomplete].join(", ")}.`,
    );
  }
  const unreliable = kb.sources.filter((s) => s.source_map_missing_video).map((s) => s.title);
  if (unreliable.length > 0) {
    missing.push(
      `${unreliable.length} bài không có video id trong source map nên mốc thời gian kém tin cậy (vd ${unreliable.slice(0, 3).join(", ")}).`,
    );
  }

  return {
    key,
    original: progression.map((d) => chordSymbol(d, qualityOfDegree(d), key)),
    reharms,
    intros,
    fills,
    outros,
    solos,
    accompaniment,
    voicings,
    scales,
    fingerings,
    handShapes,
    style: styleItem
      ? { ...toRef(styleItem), sections: (styleItem.output as { sections: Record<string, unknown> }).sections }
      : null,
    concepts,
    exercises,
    used_ids,
    missing,
  };
}
