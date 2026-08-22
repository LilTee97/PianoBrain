import type { KnowledgeBase } from "../kb/types.js";
import type { KnowledgeItem } from "../kb/types.js";
import { isDominantFlatNine, isDominantOf, isMinorChord } from "./theory.js";

/**
 * Chế độ kiểm toán: "Piano Brain đã có kiến thức X chưa?"
 *
 * Trả lời bằng số đếm thật trong kho, không phải bằng cảm giác. Ba trạng thái:
 *  - DA_CO            : có item của thầy (extracted + validated) nói về X
 *  - CO_THE_SUY_LUAN  : không có item của thầy, nhưng có bộ sinh hoặc có seed/draft để suy
 *  - CHUA_CO          : kho trống về X, và không suy được
 */

export type AuditStatus = "DA_CO" | "CO_THE_SUY_LUAN" | "CHUA_CO";

export interface Capability {
  id: string;
  covers: RegExp;
  scope: string;
}

/** Bộ sinh đã có thật trong repo. Không liệt kê thứ chưa viết. */
export const GENERATORS: Capability[] = [
  {
    id: "generateRun (src/mrhai/generate.ts)",
    covers: /chạy ngón|chay ngon|arpeggio|run|rải|rai|ngũ cung|pentatonic/i,
    scope: "cấp độ nốt: sinh từng nốt, phách, số ngón, bảng hai tay",
  },
  {
    id: "askMrHai.reharms (src/mrhai/answer.ts)",
    covers: /phối lại|phoi lai|reharm|bảng màu|bang mau|màu hợp âm|voicing|thế bấm/i,
    scope: "cấp độ hợp âm: bậc thành ký hiệu hợp âm, kèm rule của thầy làm căn cứ",
  },
  {
    id: "deriveFlatNineApproach (src/mrhai/derive.ts)",
    covers: /7b9|7\(-9\)|át trừ 9|at tru 9|át phụ|secondary dominant/i,
    scope: "cấp độ hợp âm: chèn át 7b9 trước bậc thứ, có dẫn nguồn bài của thầy",
  },
  {
    id: "askMrHai.style (src/mrhai/answer.ts)",
    covers: /điệu|dieu|tiết tấu|tiet tau|mật độ|mat do|verse|chorus|đoạn/i,
    scope: "cấp độ đoạn: mật độ tay trái / tay phải theo verse - pre - chorus - bridge",
  },
];

/** Giới hạn cứng của repo này, không phụ thuộc câu hỏi. */
export const HARD_LIMITS = [
  "Không xuất file MIDI hay file nhạc — kho chỉ có JSON và markdown.",
  "Không nghe được audio: không phân tích mp3, không dò hợp âm từ bản thu.",
  "Không vẽ khuông nhạc; nốt trình bày bằng tên nốt kèm quãng tám (C4, G4...).",
  "Fill, intro, outro, solo: mới tra được item trong kho, chưa có bộ sinh nốt riêng như chạy ngón.",
  "Độ khó của mọi item chuyển từ kho master đều để mặc định 3, chưa rà tay.",
];

/**
 * Câu hỏi nêu đích danh một cặp "7b9 -> đích" thì phải kiểm đúng cặp đó.
 * deriveFlatNineApproach chỉ dựng át 7b9 đứng quãng 5 trên một hợp âm THỨ,
 * nên hỏi "A7b9 trước F" là hỏi thứ nó cố tình không làm — trả lời chung chung là nhận vơ.
 */
export function flatNinePairRejected(query: string): string | null {
  const tokens = query.match(/[A-G][#b]?[^\s,]*/g) ?? [];
  for (let i = 0; i < tokens.length - 1; i += 1) {
    const dom = tokens[i].replace(/[.?!]+$/, "");
    if (!isDominantFlatNine(dom)) continue;
    const target = tokens[i + 1].replace(/[.?!]+$/, "");
    if (!isMinorChord(target)) {
      return `${dom} chỉ giải quyết về hợp âm thứ; ${target} là hợp âm trưởng nên bộ suy từ chối dựng cặp này.`;
    }
    if (!isDominantOf(dom, target)) {
      return `${dom} không phải hợp âm át của ${target} (át phải đứng quãng 5 đúng phía trên), nên bộ suy từ chối dựng cặp này.`;
    }
  }
  return null;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    // "1-2-3-5" phải là MỘT từ. Tách ra thì bốn chữ số lẻ đều bị loại vì quá ngắn,
    // và câu hỏi về công thức 1-2-3-5 lại khớp với mọi bài có chữ "walking bass".
    .replace(/(\d)-(?=\d)/g, "$1");

/**
 * Từ để hỏi, không phải từ nội dung. Người học gõ cả câu "thầy dạy walking bass chưa"
 * thì phải tìm theo "walking bass", chứ đòi item nào cũng chứa chữ "thầy" là trượt hết.
 */
const STOPWORDS = new Set(
  norm(
    "thay day chua co khong biet hoi kho brain minh toi em ban duoc lam gi the nao ve tren truoc sau voi va la cho cai nay do mot cach kien thuc ho tro con chi ra dung khi thi cua " +
      "cho duoi sao ma hay hoac neu de tai bang cac nhung hai nao dau nhe nha ha o xin chao bao noi xem thu muon can giup them nua roi len xuong vao " +
      // Động từ đánh đàn: trong câu hỏi chúng là cách hỏi, không phải nội dung.
      // "chơi gam gì", "bấm thế nào" — bỏ chúng ra thì còn lại đúng thứ cần tra.
      "choi bam",
  ).split(" "),
);

/** Tách thành từ rời: khớp chuỗi con làm "xin" trúng tên bài hát trong ghi chú. */
/** Từ nội dung trong câu hỏi, đã bỏ dấu và bỏ từ để hỏi. Dùng chung cho tra cứu và xếp hạng. */
export const contentTerms = (query: string): string[] => {
  // Giữ chữ số lẻ ("bậc 3"), bỏ chữ cái lẻ (chữ "C" trong "của C" quá mơ hồ).
  const words = norm(query)
    .split(/[^a-z0-9#]+/)
    .filter((t) => t.length >= 2 || /^\d$/.test(t));
  const content = words.filter((t) => !STOPWORDS.has(t));
  return content.length > 0 ? content : words;
};

/** Item có nhắc tới mọi từ nội dung của câu hỏi không (khớp từ trọn vẹn). */
export const itemMatchesTerms = (i: KnowledgeItem, terms: string[]): boolean => {
  if (terms.length === 0) return false;
  const hay = haystack(i);
  return terms.every((t) => hay.has(t));
};

/** Bao nhiêu từ của câu hỏi thật sự xuất hiện trong item. Dùng để xếp hạng, không phải để lọc. */
export const termOverlap = (i: KnowledgeItem, terms: string[]): number => {
  const hay = haystack(i);
  return terms.filter((t) => hay.has(t)).length;
};

/** Bao nhiêu từ của câu hỏi nằm ngay trong TÊN item — tên trúng thì sát ý hơn ghi chú trúng. */
const nameOverlap = (i: KnowledgeItem, terms: string[]): number => {
  const name = new Set(norm(i.name).split(/[^a-z0-9#]+/).filter(Boolean));
  return terms.filter((t) => name.has(t)).length;
};

const haystack = (i: KnowledgeItem) =>
  new Set(
    norm([i.name, i.note_vi, ...i.use_when].join(" "))
      .split(/[^a-z0-9#]+/)
      .filter(Boolean),
  );

export interface AuditResult {
  query: string;
  status: AuditStatus;
  /** Câu hỏi nêu đích danh thầy nào (teacher_id), null nếu hỏi chung cả kho. */
  asked_teacher: string | null;
  /** Nguồn khác có, dù thầy được hỏi thì chưa. */
  other_teachers: string[];
  /** Item của thầy đã đối chiếu nguồn. */
  teacher: KnowledgeItem[];
  /** Item của thầy còn chờ người rà. */
  draft: KnowledgeItem[];
  /** Hạt giống tự dựng, không dính tới thầy. */
  seed: KnowledgeItem[];
  /** Bộ sinh trong repo xử lý được chủ đề này. */
  generators: Capability[];
  scope: string[];
  limits: string[];
  bridge: string[];
}

/**
 * Câu hỏi nêu đích danh thầy nào? "thầy Hải dạy X chưa" phải được trả lời theo THẦY HẢI,
 * chứ không phải theo cả kho — nếu không, item của Pianote sẽ đọc như thể thầy Hải có dạy.
 */
export function askedTeacher(query: string, kb: KnowledgeBase): string | null {
  // Gạch nối trong id là dấu ghép tên, không phải dấu ngăn: "jazz-scales" đọc là "jazz scales".
  const q = norm(query).replace(/-/g, " ");
  const has = (phrase: string) => new RegExp(`(^| )${phrase}( |$)`).test(q);

  for (const t of kb.items.filter((i) => i.type === "teacher")) {
    const parts = norm(t.id).split("-");
    // Gọi đủ tên thì chắc chắn là hỏi đích danh.
    if (has(parts.join(" "))) return t.id;
    // "thầy Hải" cũng là gọi đích danh, dù chỉ một chữ.
    if (parts.some((part) => has(`thay ${part}`))) return t.id;
    /*
      Một mảnh rời KHÔNG được tính là tên, trừ khi id vốn chỉ có một chữ.

      Nguồn `jazz-scales` làm lộ chỗ hỏng: "jazz" là từ nhạc thường gặp, nhận nó
      làm tên nguồn thì mọi câu có chữ jazz đều bị khoá vào một nguồn, và trường
      phái jazz của thầy Hải hay Peter Martin biến mất khỏi câu trả lời — trái
      hẳn luật "hỏi chung thì liệt kê mọi trường phái".
    */
    if (parts.length === 1 && parts[0].length >= 4 && has(parts[0])) return t.id;
  }
  return null;
}

export function auditCapability(query: string, kb: KnowledgeBase): AuditResult {
  const asked = askedTeacher(query, kb);
  // Tên thầy là thông tin định tuyến, không phải nội dung cần tìm: "pianote" không
  // nằm trong bài giảng nào cả, nó nằm ở teacher_id. Bỏ ra trước khi tra.
  const teacherWords = new Set(asked ? norm(asked).split("-") : []);
  const needle = norm(query);
  const words = needle.split(/[^a-z0-9#]+/).filter((t) => t.length >= 2);
  const content = words.filter((t) => !STOPWORDS.has(t) && !teacherWords.has(t));
  const terms = content.length > 0 ? content : words.filter((t) => !teacherWords.has(t));
  const matched = kb.items.filter((i) => {
    if (i.status === "rejected") return false;
    const hay = haystack(i);
    return terms.length > 0 && terms.every((t) => hay.has(t));
  });

  // Tên item trúng nhiều từ hơn thì xếp trước. Trước đây audit không xếp gì cả nên
  // câu trả lời lấy theo thứ tự file, dễ ra item chung chung thay vì item đúng ý.
  matched.sort((a, b) => nameOverlap(b, terms) - nameOverlap(a, terms) || a.name.length - b.name.length);
  // Hỏi đích danh một thầy thì chỉ đếm item của thầy đó.
  const mine = asked ? matched.filter((i) => i.source?.teacher_id === asked) : matched;
  const teacher = mine.filter((i) => i.origin === "extracted" && i.status === "validated");
  const draft = mine.filter((i) => i.origin === "extracted" && i.status === "draft");
  const seed = asked ? [] : matched.filter((i) => i.origin !== "extracted");
  const other_teachers = asked
    ? [...new Set(matched.filter((i) => i.source?.teacher_id && i.source.teacher_id !== asked).map((i) => i.source!.teacher_id))]
    : [];
  const rejected = flatNinePairRejected(query);
  const generators = GENERATORS.filter(
    (g) => g.covers.test(query) && !(rejected && g.id.startsWith("deriveFlatNineApproach")),
  );

  const status: AuditStatus =
    teacher.length > 0
      ? "DA_CO"
      : draft.length > 0 || (!asked && (seed.length > 0 || generators.length > 0))
        ? "CO_THE_SUY_LUAN"
        : "CHUA_CO";

  const scope: string[] = generators.map((g) => `${g.scope} — ${g.id}`);
  if (scope.length === 0 && matched.length > 0) {
    scope.push("chỉ tra cứu và giải thích: kho có kiến thức nhưng chưa có bộ sinh nốt cho chủ đề này");
  }

  const limits = [...HARD_LIMITS];
  if (rejected) limits.push(rejected);
  if (draft.length > 0) limits.push(`${draft.length} item khớp còn ở trạng thái draft — chưa ai đối chiếu lại nguồn.`);
  if (teacher.length === 0 && matched.length > 0) {
    limits.push("Không có item nào đã đối chiếu nguồn khớp — câu trả lời là suy luận, không được dán cho thầy nào.");
  }
  const { skipped, incomplete } = kb.coverage;
  if (skipped.length + incomplete.length > 0) {
    limits.push(`Kho gốc còn ${skipped.length + incomplete.length} bài chưa trích xuất đủ, có thể thiếu đúng chỗ đang hỏi.`);
  }

  // Kho có nhiều thầy. Nói "của thầy" trống không là dán nhầm công người khác.
  const whose = (list: KnowledgeItem[]) =>
    [...new Set(list.map((i) => i.source?.teacher_id).filter(Boolean))].join(", ") || "không rõ nguồn";

  const bridge: string[] = [];
  if (status === "DA_CO") {
    bridge.push(`Dùng thẳng ${teacher.length} item đã đối chiếu nguồn (${whose(teacher)}), dẫn kèm mốc thời gian.`);
  } else if (status === "CO_THE_SUY_LUAN") {
    if (draft.length > 0) {
      bridge.push(`Có ${draft.length} item draft của ${whose(draft)} — rà lại là thành căn cứ chắc.`);
    }
    if (generators.length > 0) bridge.push("Suy từ nguyên lý bằng bộ sinh sẵn có, nhãn derived, dẫn item nào cho phép.");
    if (seed.length > 0) bridge.push(`Có ${seed.length} hạt giống tự dựng để lấp tạm, phải nói rõ là seed.`);
  } else if (asked) {
    bridge.push(
      other_teachers.length > 0
        ? `Kho chưa có item nào của ${asked} về chỗ này. Nguồn khác đang có: ${other_teachers.join(", ")} — nhớ giữ đúng nhãn, đừng ghi thành của ${asked}.`
        : `Kho chưa có item nào của ${asked} về chỗ này. Cách đúng là ingest thêm nguồn theo ingest/PIPELINE.md.`,
    );
  } else if (rejected) {
    bridge.push(
      "Cặp hợp âm em hỏi sai chức năng nên thầy không dựng. Muốn chèn át 7b9 thì đích phải là hợp âm thứ, ví dụ E7b9 về Am.",
    );
  } else {
    bridge.push("Chưa có gì để bám. Cách đúng là ingest nguồn mới theo ingest/PIPELINE.md, không tự nghĩ ra rồi nói như thật.");
  }

  return { query, status, asked_teacher: asked, other_teachers, teacher, draft, seed, generators, scope, limits, bridge };
}
