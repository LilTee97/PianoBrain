import { noteAt, pitchOfNote } from "./theory.js";

/** Hậu tố chất hợp âm -> quãng (nửa cung) tính từ nốt gốc. Khớp hậu tố dài trước. */
const QUALITY_INTERVALS: [string, number[]][] = [
  ["maj9", [0, 4, 7, 11, 14]],
  ["maj7", [0, 4, 7, 11]],
  ["m7b5", [0, 3, 6, 10]],
  ["dim7", [0, 3, 6, 9]],
  ["13sus4", [0, 5, 7, 10, 14, 21]],
  ["9sus4", [0, 5, 7, 10, 14]],
  ["7sus4", [0, 5, 7, 10]],
  ["7b13", [0, 4, 7, 10, 20]],
  ["7b9", [0, 4, 7, 10, 13]],
  /*
    `add2` và `add9` là **một hợp âm, hai cách viết**.

    Bậc 2 và bậc 9 cùng một lớp cao độ, chỉ khác quãng tám; người viết chọn chữ
    nào là tuỳ chỗ họ đặt nốt ấy trên đàn. Bảng này đọc ký hiệu trên giấy, nên
    phải đọc được cả hai — bên KeyTrain in ra `Cadd2` trong khi mã nội bộ của nó
    là `add9`, và bộ đọc cũ chịu thua đúng chỗ ấy.
  */
  ["madd9", [0, 3, 7, 14]],
  ["madd2", [0, 3, 7, 14]],
  ["add9", [0, 4, 7, 14]],
  ["add2", [0, 4, 7, 14]],
  ["sus4", [0, 5, 7]],
  ["sus2", [0, 2, 7]],
  ["m11", [0, 3, 7, 10, 14, 17]],
  ["m9", [0, 3, 7, 10, 14]],
  ["m7", [0, 3, 7, 10]],
  ["m6", [0, 3, 7, 9]],
  ["dim", [0, 3, 6]],
  ["6/9", [0, 4, 7, 9, 14]],
  ["13", [0, 4, 7, 10, 14, 21]],
  ["11", [0, 4, 7, 10, 14, 17]],
  ["9", [0, 4, 7, 10, 14]],
  ["7", [0, 4, 7, 10]],
  ["6", [0, 4, 7, 9]],
  ["m", [0, 3, 7]],
  ["", [0, 4, 7]],

  /*
    Chất biến âm, thêm để bộ chọn gam đọc được ký hiệu thật trong bài jazz.

    `7alt` cố tình KHÔNG có bậc 5: hợp âm át biến âm bỏ hẳn quãng 5 đúng, và
    mọi thang âm altered cũng không có nó. Ghi bậc 5 vào đây thì gam altered bị
    chính bộ lọc "gam phải chứa đủ nốt hợp âm" loại ra.
  */
  ["7alt", [0, 4, 10]],
  ["7#5", [0, 4, 8, 10]],
  ["7b5", [0, 4, 6, 10]],
  ["7#9", [0, 4, 7, 10, 15]],
  ["7#11", [0, 4, 7, 10, 18]],
  ["7#5#9", [0, 4, 8, 10, 15]],
  ["m(maj7)", [0, 3, 7, 11]],
  ["mmaj7", [0, 3, 7, 11]],
  ["maj7#11", [0, 4, 7, 11, 18]],
  ["maj13", [0, 4, 7, 11, 14, 21]],
  ["m6/9", [0, 3, 7, 9, 14]],
  ["m13", [0, 3, 7, 10, 14, 21]],
  ["aug", [0, 4, 8]],
];

export interface ParsedChord {
  symbol: string;
  root: string;
  quality: string;
  /** Nửa cung từ nốt gốc: 1, 3, 5, 7 và màu nếu ký hiệu có. */
  intervals: number[];
  isMinor: boolean;
  isDominant: boolean;
  /** Bass đảo nếu ký hiệu dạng slash. */
  bass: string | null;
}

export function parseChord(symbol: string): ParsedChord | null {
  const [head, bass] = symbol.split("/");
  // "F6/9" là chất hợp âm chứ không phải bass đảo — bass đảo phải là tên nốt.
  const bassIsNote = bass !== undefined && /^[A-G][#b]?$/.test(bass);
  const body = bassIsNote ? head : symbol;
  const root = /^[A-G][#b]?/.exec(body)?.[0];
  if (!root) return null;
  /*
    Bỏ ngoặc trước khi tra bảng.

    Người nhạc sĩ viết `Am(add9)`, `C(add2)`, `Cm(maj7)` — ngoặc chỉ để mắt đọc
    cho gọn, không mang nghĩa nào khác. Bắt bảng liệt kê cả hai cách viết cho
    từng chất là nhân đôi bảng và chắc chắn quên vài dòng; bỏ ngoặc một lần thì
    mọi cách viết đổ về cùng một khoá.
  */
  const quality = body.slice(root.length).replace(/[()]/g, "");
  const found = QUALITY_INTERVALS.find(([q]) => q === quality);
  if (!found) return null;
  return {
    symbol,
    root,
    quality,
    intervals: found[1],
    isMinor: /^m(?!aj)/.test(quality),
    isDominant: found[1].includes(10) && found[1].includes(4),
    bass: bassIsNote ? bass : null,
  };
}

/** MIDI -> tên nốt kèm quãng tám, đánh vần theo tông. */
export const midiToName = (midi: number, key: string): string =>
  `${noteAt(((midi % 12) + 12) % 12, key)}${Math.floor(midi / 12) - 1}`;

/** Tên nốt kèm quãng tám -> MIDI. "C4" -> 60. */
export function nameToMidi(name: string): number {
  const m = /^([A-G][#b]?)(-?\d+)$/.exec(name);
  if (!m) throw new Error(`Không đọc được nốt: ${name}`);
  return (Number(m[2]) + 1) * 12 + pitchOfNote(m[1]);
}

/**
 * Tập nốt để chạy ngón: ngũ cung dựng trên chính nốt gốc hợp âm.
 *  - trưởng: 1 2 3 5 6
 *  - thứ:    1 2 b3 5 b7  (giữ bậc 2 cho câu chạy mượt, không dùng ngũ cung thứ chuẩn)
 *  - át:     1 2 3 5 b7
 * ponytail: ba khuôn này đủ cho pop ballad. Chất biến âm (7b9, alt) cần khuôn riêng, chưa làm.
 */
export function runPool(chord: ParsedChord): number[] {
  if (chord.isDominant) return [0, 2, 4, 7, 10];
  if (chord.isMinor) return [0, 2, 3, 7, 10];
  return [0, 2, 4, 7, 9];
}

/** Nốt đích ưu tiên của hợp âm kế: bậc 3 nói rõ trưởng hay thứ nhất. */
export function targetInterval(chord: ParsedChord): number {
  return chord.intervals.includes(4) ? 4 : chord.intervals.includes(3) ? 3 : 0;
}

/** Cao độ tuyệt đối của các nốt trong pool, trải từ midi thấp lên cao. */
export function poolPitches(rootPc: number, pool: number[], from: number, to: number): number[] {
  const out: number[] = [];
  for (let octave = -1; octave <= 9; octave += 1) {
    for (const step of pool) {
      const midi = (octave + 1) * 12 + ((rootPc + step) % 12);
      if (midi >= from && midi <= to) out.push(midi);
    }
  }
  return [...new Set(out)].sort((a, b) => a - b);
}
