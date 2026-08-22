const SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const FLAT_KEYS = new Set(["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"]);
const DEGREE_SEMITONES: Record<string, number> = { i: 0, ii: 2, iii: 4, iv: 5, v: 7, vi: 9, vii: 11 };

/** Nốt trắng -> nửa cung tính từ C. */
const LETTER: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/**
 * Tính cao độ theo chữ cái cộng dấu hoá, không tra bảng.
 * Tra bảng thì Cb, Fb, E#, B# đều không có trong bảng và làm cả chương trình ném lỗi —
 * người học gõ vòng ở tông giáng là sập.
 */
export function pitchOfNote(note: string): number {
  const m = /^([A-G])([#b]?)$/.exec(note.trim());
  if (!m) throw new Error(`Unknown note: ${note}`);
  const offset = m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0;
  return (((LETTER[m[1]] + offset) % 12) + 12) % 12;
}

export function noteAt(semitone: number, key: string): string {
  const table = FLAT_KEYS.has(key) ? FLAT : SHARP;
  return table[((semitone % 12) + 12) % 12];
}

/** "I" | "vi" | "#IV" | "bVII" -> số nửa cung tính từ nốt chủ. */
export function degreeSemitones(degree: string): number {
  const m = /^([#b]?)([ivIV]+)$/.exec(degree.trim());
  if (!m) throw new Error(`Unknown degree: ${degree}`);
  const base = DEGREE_SEMITONES[m[2].toLowerCase()];
  if (base === undefined) throw new Error(`Unknown degree: ${degree}`);
  return base + (m[1] === "#" ? 1 : m[1] === "b" ? -1 : 0);
}

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const DEGREE_NUMBER: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7 };

/**
 * Đánh vần nốt gốc của một bậc theo CHỮ CÁI của bậc đó, rồi mới thêm dấu hoá.
 * Tra bảng thăng/giáng cứng thì bậc I của giọng Cb ra "B" và bậc IV ra "E" —
 * đúng cao độ nhưng sai chính tả nhạc, người học đọc là loạn.
 */
export function degreeRoot(degree: string, key: string): string {
  const m = /^([#b]?)([ivIV]+)$/.exec(degree.trim());
  const n = m ? DEGREE_NUMBER[m[2].toLowerCase()] : undefined;
  const target = (((pitchOfNote(key) + degreeSemitones(degree)) % 12) + 12) % 12;
  if (n === undefined) return noteAt(target, key);

  const letter = LETTERS[(LETTERS.indexOf(key[0].toUpperCase()) + n - 1) % 7];
  const diff = (((target - pitchOfNote(letter) + 6) % 12) + 12) % 12 - 6;
  // Quá một dấu hoá thì cách viết theo chữ cái hết hợp lý, quay về tên thông dụng.
  if (Math.abs(diff) > 1) return noteAt(target, key);
  return letter + (diff === 1 ? "#" : diff === -1 ? "b" : "");
}

/** Ghép ký hiệu hợp âm. bassDegree khác degree thì thành slash chord. */
export function chordSymbol(
  degree: string,
  quality: string,
  key: string,
  bassDegree?: string | null,
): string {
  const head = degreeRoot(degree, key) + quality;
  if (!bassDegree || bassDegree === degree) return head;
  return `${head}/${degreeRoot(bassDegree, key)}`;
}

/** Nốt gốc của ký hiệu hợp âm, bỏ phần chất và bass đảo. "Am9" -> "A", "F#dim7" -> "F#". */
export const noteOfChord = (symbol: string): string | null =>
  /^[A-G][#b]?/.exec(symbol.split("/")[0])?.[0] ?? null;

/** Hợp âm thứ (kể cả m7b5). "maj" không tính. */
export const isMinorChord = (symbol: string): boolean => /^[A-G][#b]?m(?!aj)/.test(symbol.split("/")[0]);

/** Hợp âm át trừ 9, viết kiểu nào cũng nhận: E7b9, E7(-9), E7(b9). */
export const isDominantFlatNine = (symbol: string): boolean =>
  /7\s*\(?\s*-?b?9\s*\)?$/.test(symbol.replace(/\s/g, "")) && /7\s*\(?-|7b9|7\(b9\)/.test(symbol.replace(/\s/g, ""));

/** dom có phải quãng 5 đúng phía trên target không — điều kiện để là át của target. */
export function isDominantOf(dom: string, target: string): boolean {
  const a = noteOfChord(dom);
  const b = noteOfChord(target);
  if (!a || !b) return false;
  return (pitchOfNote(b) + 7) % 12 === pitchOfNote(a) % 12;
}

/**
 * Chất hợp âm mặc định của một bậc: chữ thường là hợp âm thứ.
 * Một chỗ duy nhất, vì trước đây luật này bị chép ra ba nơi và chỗ thứ tư thì quên hẳn —
 * làm bộ sinh tưởng vi là A trưởng nên hạ cánh nhầm vào C#.
 */
export const qualityOfDegree = (degree: string): string => (degree === degree.toLowerCase() ? "m" : "");
