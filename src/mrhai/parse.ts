import { pitchOfNote } from "./theory.js";

/**
 * Đọc câu chat của người học thành thứ Mr Hai gọi được.
 * Không đoán bừa: không nhận ra vòng thì trả null để trên kia hỏi lại.
 */

const ROMAN_BY_SEMITONE: Record<number, string> = {
  0: "I",
  1: "bII",
  2: "II",
  3: "bIII",
  4: "III",
  5: "IV",
  6: "#IV",
  7: "V",
  8: "bVI",
  9: "VI",
  10: "bVII",
  11: "VII",
};

/** Bậc mặc định của giọng trưởng: 2, 3, 6, 7 là hợp âm thứ. */
const ROMAN_BY_NUMBER: Record<string, string> = {
  "1": "I",
  "2": "ii",
  "3": "iii",
  "4": "IV",
  "5": "V",
  "6": "vi",
  "7": "vii",
};

const lower = (roman: string) => roman.replace(/[IV]+/, (m) => m.toLowerCase());

const CHORD_RE = /^([A-G][#b]?)(.*)$/;
/** Phần đuôi phải trông giống chất hợp âm, để "Ba" hay "Em" trong câu nói không bị nhận nhầm. */
const QUALITY_RE = /^(m|maj|min|dim|aug|sus|add|alt)?[0-9#b()+\-/A-G]*$/i;
const NUMBER_RE = /^([1-7])(m|maj7|7|m7|maj|sus4)?$/i;
const ROMAN_RE = /^([b#]?)(i{1,3}|iv|vi{0,2}|v)$/i;

type Kind = "name" | "number" | "roman";

const chordRoot = (token: string): { root: string; minor: boolean; quality: string } | null => {
  const m = CHORD_RE.exec(token);
  if (!m || !QUALITY_RE.test(m[2])) return null;
  return { root: m[1], minor: /^m(?!aj)/.test(m[2]), quality: m[2] };
};

const kindOf = (token: string): Kind | null => {
  if (ROMAN_RE.test(token)) return "roman";
  if (NUMBER_RE.test(token)) return "number";
  return chordRoot(token) ? "name" : null;
};

/** Dãy token liền nhau dài nhất cùng một kiểu. Một hợp âm lẻ giữa câu nói không tính là vòng. */
function longestRun(tokens: string[], skip: Kind | null = null): { kind: Kind; run: string[] } | null {
  let best: { kind: Kind; run: string[] } | null = null;
  let cur: { kind: Kind; run: string[] } | null = null;
  for (const t of tokens) {
    const k = kindOf(t);
    const kind = k === skip ? null : k;
    if (kind && cur && cur.kind === kind) cur.run.push(t);
    else cur = kind ? { kind, run: [t] } : null;
    if (cur && (!best || cur.run.length > best.run.length)) best = { kind: cur.kind, run: [...cur.run] };
  }
  return best && best.run.length >= 2 ? best : null;
}

export interface Progression {
  key: string;
  progression: string[];
  /** Chất hợp âm người học gõ ("maj7", "m7"...). Chỉ có khi họ gõ tên hợp âm. */
  qualities?: string[];
  /** Ký hiệu hợp âm dựng lại từ bậc, để in cho người học đối chiếu. */
  source: "name" | "number" | "roman";
  /** Token gốc khi người học gõ tên hợp âm (kể cả slash). */
  symbols?: string[];
}

const KEY_RE = /(?:giọng|giong|tông|tong|key)\s+([A-G][#b]?m?)/i;

/**
 * Câu đang nói về thế bấm thì "1-5" là quãng, không phải vòng bậc I-V.
 * Gặp mấy chữ này thì bỏ hẳn cách đọc bằng số.
 */
const SHAPE_CONTEXT_RE = /voicing|thế bấm|thế tay|quãng|chồng nốt|bè/i;

/** Từ nối giữa hai hợp âm. Bỏ đi thì "Cmaj7 sang Am" mới thành một vòng hai hợp âm. */
const CONNECTORS = new Set([
  "sang", "về", "ve", "đến", "den", "tới", "toi", "qua", "rồi", "roi",
  "thành", "thanh", "xuống", "xuong", "lên", "len", "và", "va", "to", "then",
]);

export function parseProgression(text: string): Progression | null {
  // Bỏ cụm khai giọng trước, nếu không "giọng C" sẽ bị đọc thành hợp âm C.
  const declaredRaw = KEY_RE.exec(text)?.[1];
  const declaredKey = declaredRaw?.replace(/m$/i, "");
  const body = text.replace(KEY_RE, " ");
  const tokens = body
    .split(/[\s,|>-]+|->/)
    .filter(Boolean)
    .filter((t) => !CONNECTORS.has(t.toLowerCase()));
  const found = longestRun(tokens, SHAPE_CONTEXT_RE.test(text) ? "number" : null);
  if (!found) return null;

  if (found.kind === "name") {
    const roots = found.run.map(chordRoot);
    if (roots.some((r) => r === null)) return null;
    // Hợp âm đầu là slash thì lấy root trước dấu /, không lấy nốt bass.
    const key = declaredKey ?? roots[0]!.root;
    const keyPc = pitchOfNote(key);
    const progression = roots.map((r) => {
      const roman = ROMAN_BY_SEMITONE[(((pitchOfNote(r!.root) - keyPc) % 12) + 12) % 12];
      return r!.minor ? lower(roman) : roman;
    });
    return {
      key,
      progression,
      qualities: roots.map((r) => r!.quality),
      source: "name",
      symbols: found.run,
    };
  }

  if (found.kind === "number") {
    const progression = found.run.map((t) => {
      const m = NUMBER_RE.exec(t)!;
      const roman = ROMAN_BY_NUMBER[m[1]];
      return m[2] && /^m/i.test(m[2]) ? lower(roman) : roman;
    });
    // Bậc không phụ thuộc tông; chưa khai tông thì in ra ở C cho dễ hình dung.
    return { key: declaredKey ?? "C", progression, source: "number" };
  }

  const progression = found.run.map((t) => {
    const m = ROMAN_RE.exec(t)!;
    const body2 = m[2];
    const upper = body2.toUpperCase();
    // Giữ nguyên hoa/thường người dùng gõ: chữ thường là hợp âm thứ.
    return m[1] + (body2 === body2.toLowerCase() ? lower(upper) : upper);
  });
  return { key: declaredKey ?? "C", progression, source: "roman" };
}

/** Người học hỏi cái gì. Thầy trả lời đúng cái đó, không đổ cả kho ra. */
export type Topic =
  | "degrees"
  | "reharm"
  | "fill"
  | "run"
  | "comp"
  | "solo"
  | "voicing"
  | "intro"
  | "outro"
  | "fingering"
  | "scale"
  | "analyze"
  | "simplify"
  | "template"
  | "explain"
  | "exercises";

export type Intent =
  | { mode: "greet" }
  | { mode: "audit"; query: string }
  | { mode: "play"; prog: Progression; topics: Topic[]; style: string; hard: boolean; suggest: boolean }
  | { mode: "unknown" };

const AUDIT_RE = /\bchưa\b|\bbiết chưa\b|\bcó .{0,40}không\b|\bdạy .{0,40}không\b|hỗ trợ|\blàm được\b|\bkiểm toán\b/i;
/** "thế ngón" phải tách khỏi "chạy ngón", nếu không hỏi câu chạy lại ra bảng thế ngón. */
const TOPIC_RE: [Topic, RegExp][] = [
  ["degrees", /xếp bậc|bậc sao|bậc nào|bậc mấy|bậc gì|roman|la mã/i],
  ["scale", /chạy gam|gam gì|gam nào|thang âm|\bscale\b|locrian|aeolian|dorian|phrygian/i],
  ["analyze", /tiến trình|phan tich|phân tích|vòng này/i],
  ["simplify", /đơn giản|don gian|rút gọn|rut gon/i],
  ["template", /kiểu ii|kieu ii|ii-v\s*màu|iiø|iadd9|Iadd9/i],
  ["run", /chạy ngón|arpeggio|\brun\b|\brải\b|\barp\b/i],
  ["fill", /câu lót|câu dẫn|fill|\blót\b/i],
  ["reharm", /phối|màu hợp âm|\bmàu\b|reharm|hòa âm|hoà âm/i],
  ["intro", /intro|dạo đầu|mở bài|dạo nhạc/i],
  ["outro", /outro|kết bài|kết đoạn|ending/i],
  ["comp", /khuôn đệm|đệm|tiết tấu|điệu|mật độ|verse|chorus|bridge|phiên khúc|điệp khúc|đoạn|walking bass|bass/i],
  ["solo", /lick|solo|ngẫu hứng|improv|giang tấu|licks/i],
  ["voicing", /voicing|thế bấm|thế tay|chồng nốt/i],
  ["fingering", /thế ngón|số ngón|fingering|bấm ngón/i],
  ["explain", /giải thích|vì sao|tại sao/i],
  ["exercises", /bài tập|luyện ngón/i],
];

/**
 * Điệu suy từ chính câu hỏi. Trước đây Mr Hai cứng "pop_ballad" nên hỏi blues
 * lại trả về khuôn ballad của thầy Hải — dán nhầm công người khác.
 */
const STYLE_RE: [string, RegExp][] = [
  ["blues", /blues|shuffle|12 ?-? ?bar|boogie/i],
  // Điệu nói trước kỹ thuật: "walking bass ballad" là ballad, không phải jazz.
  // "walking bass" đứng một mình không đủ để kết luận điệu — nó có ở cả jazz lẫn ballad.
  ["bossa_nova", /bossa|latin|samba/i],
  ["pop_ballad", /ballad|bolero|slow ?rock|đệm hát/i],
  ["jazz", /jazz|swing/i],
];

export const styleFromText = (text: string): string =>
  STYLE_RE.find(([, re]) => re.test(text))?.[0] ?? "pop_ballad";

/** Hỏi "khó" thì mới lôi bảng màu seed ra; mặc định chỉ đưa thứ dựa trên thầy. */
const HARD_RE = /khó|nâng cao|jazz hơn|màu hơn/i;

/**
 * Trong câu có tên hợp âm thật không (Am, C7, Cmaj7)?
 * Bỏ qua "Em" vì đó là đại từ, và bỏ qua nốt trơ trọi như "C" vì trùng quá nhiều thứ.
 */
function namesAChord(text: string): boolean {
  return text
    .split(/[\s,|>-]+/)
    .filter(Boolean)
    .some((t) => {
      if (t === "Em") return false;
      const c = chordRoot(t);
      return c !== null && c.quality.length > 0;
    });
}

/** Câu chào hỏi xã giao: không phải câu hỏi nhạc, đừng lôi kho ra tra. */
const SOCIAL_RE = /^\s*(xin\s+)?chào|^\s*(hi|hello|alo)(?![a-zà-ỹ])|cảm ơn|cám ơn|tạm biệt|thầy khỏe/i;

/**
 * Đọc chỗ ca sĩ nghỉ ngay trong câu chat.
 * Nhận ba kiểu: "hát kín", danh sách "hát,hát,nghỉ,hát", và "ô 3 nghỉ" (kể cả nhiều ô).
 * Không thấy gì thì trả undefined để Mr Hai vẫn nói là chưa biết.
 */
export function vocalFromText(text: string, bars: number): "full" | boolean[] | undefined {
  if (/hát kín|hat kin|\bfull\b/i.test(text)) return "full";

  const list = /((?:hát|hat|nghỉ|nghi|rest)\s*[,;|]\s*)+(?:hát|hat|nghỉ|nghi|rest)/i.exec(text);
  if (list) {
    const raw = list[0].split(/[,;|]+/).map((t) => !/ngh(ỉ|i)|rest/i.test(t.trim()));
    return Array.from({ length: bars }, (_, i) => raw[i] ?? true);
  }

  const marked = [...text.matchAll(/ô\s*(\d+)[^0-9]{0,12}?(nghỉ|nghi|rest|trống|trong)/gi)].map((m) => Number(m[1]));
  if (marked.length > 0) {
    return Array.from({ length: bars }, (_, i) => !marked.includes(i + 1));
  }
  return undefined;
}

/** Router: hỏi kho thì kiểm toán, đưa vòng thì trả lời ĐÚNG mục được hỏi, không rõ thì hỏi lại. */
export function classify(text: string): Intent {
  if (SOCIAL_RE.test(text)) return { mode: "greet" };
  // Câu hỏi "có chưa" luôn là kiểm toán, kể cả khi trong câu có tên hợp âm.
  if (AUDIT_RE.test(text)) return { mode: "audit", query: text };

  const topics = TOPIC_RE.filter(([, re]) => re.test(text)).map(([t]) => t);
  const prog = parseProgression(text);
  // Câu có tên hợp âm rõ ràng là câu hỏi nhạc: tra kho rồi nói có hay chưa,
  // đừng trả lời "chưa rõ ý em" cho người ta.
  if (!prog) return topics.length > 0 || namesAChord(text) ? { mode: "audit", query: text } : { mode: "unknown" };

  // Có vòng mà không nói muốn gì: chỉ xếp bậc rồi hỏi lại một câu.
  const suggest = topics.length === 0;
  return {
    mode: "play",
    prog,
    topics: suggest ? ["degrees"] : topics,
    style: styleFromText(text),
    hard: HARD_RE.test(text),
    suggest,
  };
}
