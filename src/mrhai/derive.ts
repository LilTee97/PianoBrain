import type { KnowledgeBase } from "../kb/types.js";
import type { KnowledgeItem } from "../kb/types.js";
import {
  chordSymbol,
  degreeRoot,
  isDominantFlatNine,
  isDominantOf,
  isMinorChord,
  noteAt,
  pitchOfNote,
  qualityOfDegree,
} from "./theory.js";

/**
 * Bước suy, không phải bước chép.
 *
 * Kho không có bảng màu nào của thầy cho vòng I-vi-IV-V. Nhưng thầy có dạy hợp âm át
 * trừ 9 giải quyết về hợp âm thứ (E7b9 -> Am). Từ đó suy ra: vòng nào có bậc vi thì
 * được phép chèn át 7b9 của chính bậc vi ngay trước nó.
 *
 * Ba ràng buộc, hỏng một cái là không suy:
 *  1. Kho phải có item extracted + validated của thầy nêu rõ một hợp âm 7b9 đứng
 *     quãng 5 đúng trên một hợp âm thứ. Không có thì trả null, Mr Hai báo thiếu.
 *  2. Hợp âm chèn luôn được dựng bằng quan hệ át - chủ (quãng 5 trên đích) nên
 *     không bao giờ đẻ ra thứ như A7b9 đứng trước F.
 *  3. Kết quả là origin "derived", status "draft", source null. Nó dẫn nguồn bằng
 *     cách trỏ tới item của thầy, chứ không tự nhận là trích từ video.
 */

export interface Derivation {
  chords: string[];
  /** Item của thầy cho phép bước suy này. */
  authorities: KnowledgeItem[];
  /** source_id bài của thầy, để người đọc tra ngược về video. */
  source_ids: string[];
  target_degree: string;
  inserted: string;
}

/** Item của thầy nào nêu được cặp "7b9 -> hợp âm thứ" đúng quan hệ át - chủ. */
export function flatNineAuthorities(kb: KnowledgeBase): KnowledgeItem[] {
  return kb.items.filter((item) => {
    if (item.origin !== "extracted" || item.status !== "validated") return false;
    const chords = item.input.chord_quality ?? [];
    const doms = chords.filter(isDominantFlatNine);
    const minors = chords.filter(isMinorChord);
    return doms.some((d) => minors.some((m) => isDominantOf(d, m)));
  });
}

/** Bậc thứ trong vòng mà ta được phép dựng át 7b9 phía trước. */
const MINOR_DEGREES = new Set(["ii", "iii", "vi"]);

export function deriveFlatNineApproach(
  kb: KnowledgeBase,
  progression: string[],
  key: string,
  target = "vi",
): Derivation | null {
  if (!progression.includes(target) || !MINOR_DEGREES.has(target)) return null;
  const authorities = flatNineAuthorities(kb);
  if (authorities.length === 0) return null;

  const targetRoot = degreeRoot(target, key);
  const domRoot = noteAt(pitchOfNote(targetRoot) + 7, key);
  const inserted = `${domRoot}7b9`;

  const chords: string[] = [];
  for (const degree of progression) {
    if (degree === target) chords.push(inserted);
    chords.push(chordSymbol(degree, qualityOfDegree(degree), key));
  }

  return {
    chords,
    authorities,
    source_ids: [...new Set(authorities.map((a) => a.source?.source_id).filter((s): s is string => !!s))],
    target_degree: target,
    inserted,
  };
}
