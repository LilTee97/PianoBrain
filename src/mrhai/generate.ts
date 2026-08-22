import type { KnowledgeBase } from "../kb/types.js";
import type { KnowledgeItem } from "../kb/types.js";
import { midiToName, parseChord, poolPitches, runPool, targetInterval } from "./chords.js";
import { chordSymbol, pitchOfNote } from "./theory.js";

/**
 * Bộ sinh nốt cho câu chạy ngón (arpeggio / run).
 *
 * Không chép câu mẫu nào trong kho ra. Kho chỉ làm hai việc: cho phép một lựa chọn
 * (khuôn tay trái, thế ngón, màu bậc 9) và bị trích dẫn khi lựa chọn đó được dùng.
 * Nốt cụ thể là do tính ra, và luôn mang nhãn derived.
 *
 * Chỗ nào kho của thầy không có căn cứ thì ghi vào `generic` — lý thuyết chung,
 * không được dán tên thầy.
 */

export interface Cited {
  text: string;
  /** id item trong kho cho phép lựa chọn này. Rỗng = lý thuyết chung. */
  by: string[];
}

export interface GeneratedNote {
  /** Ô nhịp thứ mấy, tính từ 1. */
  bar: number;
  /** Phách trong ô nhịp: 1, 1.5, 2, 2.5... */
  beat: number;
  note: string;
  midi: number;
  /** Vai trò: nốt hợp âm, bậc 9, nốt dẫn nửa cung, nốt đích. */
  role: string;
  finger: number;
}

export interface BeatRow {
  bar: number;
  beat: number;
  lh: string;
  rh: string;
  note: string;
}

export interface RunPlan {
  /** Bước 1 */
  context: {
    key: string;
    meter: string;
    style?: string;
    chord: string;
    roman: string;
    next_chord: string;
    next_roman: string;
    target_note: string;
  };
  /** Bước 2 */
  collection: {
    chord_tones: string[];
    tensions: Cited[];
    pool: string[];
    approach: string[];
  };
  /** Bước 3 */
  voicing: {
    lh: Cited & { notes: string[]; fingers: number[] };
    rh_range: string;
  };
  /** Bước 4 */
  notes: GeneratedNote[];
  /** Bước 5 */
  beats: BeatRow[];
  fingering: Cited;
  /** Mọi item trong kho đã dùng làm căn cứ. */
  derived_from: string[];
  /** Chỗ kho không có căn cứ — nói ra, không lấp. */
  generic: string[];
}

const validated = (kb: KnowledgeBase) =>
  kb.items.filter((i) => i.origin === "extracted" && i.status === "validated");

/** Item của thầy nào cho phép khuôn tay trái 1-5-8 / 1-5-9 / 1-5-10. */
export function lhPatternAuthority(kb: KnowledgeBase): KnowledgeItem | undefined {
  return validated(kb).find((i) => /1\s*-\s*5\s*-\s*(3|8|9|10)/.test(i.note_vi));
}

/** Item của thầy nào nói số ngón cho khuôn 1-5 tay trái. */
export function lhFingeringAuthority(kb: KnowledgeBase): KnowledgeItem | undefined {
  return validated(kb).find((i) => i.type === "fingering" && !!i.output.fingering);
}

/** Item của thầy nào cho phép dùng bậc 9 làm màu. */
export function ninthAuthority(kb: KnowledgeBase): KnowledgeItem | undefined {
  return validated(kb).find((i) => /bậc 9|tension 9|add9/i.test(i.note_vi));
}

/**
 * Thế ngón cho ô ngũ cung bốn nốt rồi lặp: 1-2-3-5, luồn ngón cái, 1-2-3.
 * Kho chỉ có thế ngón cho gam bậc thang, khuôn khác hẳn — không mượn sang đây.
 */
const CELL_FINGERS = [1, 2, 3, 5, 1, 2, 3];

export interface RunInput {
  key: string;
  /** Bậc của hợp âm đang chạy, ví dụ "I". */
  degree: string;
  /** Bậc của hợp âm đích ở ô nhịp sau. */
  nextDegree: string;
  /** Hậu tố chất hợp âm, ví dụ "maj7". */
  quality?: string;
  nextQuality?: string;
  style?: string;
  meter?: string;
  /** Quãng tám thấp nhất của tay phải. */
  rhOctave?: number;
}

/** Nốt dẫn nửa cung dưới nốt đích — sự thật vật lý của bàn phím, không cần ai cho phép. */
const approachBelow = (midi: number) => midi - 1;

export function generateRun(input: RunInput, kb: KnowledgeBase): RunPlan {
  const { key, degree, nextDegree, meter = "4/4", style } = input;
  const symbol = chordSymbol(degree, input.quality ?? "", key);
  const nextSymbol = chordSymbol(nextDegree, input.nextQuality ?? "", key);
  const chord = parseChord(symbol);
  const next = parseChord(nextSymbol);
  if (!chord || !next) throw new Error(`Không đọc được hợp âm: ${symbol} -> ${nextSymbol}`);

  const derived_from: string[] = [];
  const generic: string[] = [];
  const cite = (item: KnowledgeItem | undefined, fallback: string, text: string): Cited => {
    if (!item) {
      generic.push(fallback);
      return { text, by: [] };
    }
    derived_from.push(item.id);
    return { text, by: [item.id] };
  };

  // --- Bước 1: bối cảnh hòa âm
  const rhLow = (input.rhOctave ?? 4) * 12 + 12; // C4 = 60
  const nextRootPc = pitchOfNote(next.root);
  const targetMidi = nearest(rhLow + 12, nextRootPc + targetInterval(next));
  const target_note = midiToName(targetMidi, key);

  // --- Bước 2: tập nốt khả dụng
  const rootPc = pitchOfNote(chord.root);
  const chord_tones = chord.intervals.map((i) => midiToName(nearest(rhLow, rootPc + i), key));
  const pool = runPool(chord);
  const poolMidi = poolPitches(rootPc, pool, rhLow, rhLow + 24);
  const ninth = ninthAuthority(kb);
  const tensions: Cited[] = [
    cite(
      ninth,
      "Kho chưa có item nào của thầy nói về bậc 9 — bậc 9 dưới đây là lý thuyết chung.",
      `bậc 9 (${midiToName(nearest(rhLow, rootPc + 2), key)}) làm nốt màu trong chuỗi chạy`,
    ),
  ];

  // --- Bước 3: thế bấm và phân công hai tay
  const lhRoot = rootPc + 36; // quãng tám 2
  const lhNotes = [lhRoot, lhRoot + 7, lhRoot + 12].map((m) => midiToName(nearest(m, m % 12), key));
  const lhAuth = lhPatternAuthority(kb);
  const lhFingerItem = lhFingeringAuthority(kb);
  // Ngón 5 gốc, ngón 2 quãng 5, ngón 1 để trống chờ chồng quãng tám — đúng như thầy dặn.
  const lhFingers = [5, 2, 1];
  if (lhFingerItem) derived_from.push(lhFingerItem.id);
  else generic.push("Kho chưa có thế ngón tay trái nào của thầy — số ngón 5-2-1 là quy ước chung.");
  const lh = {
    ...cite(
      lhAuth,
      "Kho chưa có item nào của thầy nói khuôn tay trái 1-5-8 — khuôn dưới đây là lý thuyết chung.",
      "tay trái 1 - 5 - 8, giữ khung quãng 5 rồi chồng quãng tám",
    ),
    notes: lhNotes,
    fingers: lhFingers,
  };

  // --- Bước 4: sinh câu. Ô nhịp 4/4: bảy nốt móc đơn từ phách 1 đến phách 4,
  // nốt dẫn nửa cung ở phách 4.5, hạ cánh vào nốt đích ở phách 1 ô nhịp sau.
  generic.push("Kho chưa có thế ngón cho ô chạy ngũ cung — số ngón 1-2-3-5 / 1-2-3 là quy ước chung.");

  const notes: GeneratedNote[] = [];
  const startIndex = poolMidi.findIndex((m) => m >= rhLow);
  for (let n = 0; n < CELL_FINGERS.length; n += 1) {
    // Ô ngũ cung bốn nốt, ô sau bắt đầu lệch hai bậc so với ô trước.
    const cell = Math.floor(n / 4);
    const midi = poolMidi[startIndex + cell * 2 + (n % 4)];
    const step = (((midi - rootPc) % 12) + 12) % 12;
    notes.push({
      bar: 1,
      beat: 1 + n * 0.5,
      note: midiToName(midi, key),
      midi,
      role: step === 2 ? "bậc 9" : chord.intervals.includes(step) ? "nốt hợp âm" : "nốt ngũ cung",
      finger: CELL_FINGERS[n],
    });
  }
  const approachMidi = approachBelow(targetMidi);
  notes.push({
    bar: 1,
    beat: 4.5,
    note: midiToName(approachMidi, key),
    midi: approachMidi,
    role: "nốt dẫn nửa cung",
    finger: 4,
  });
  notes.push({ bar: 2, beat: 1, note: target_note, midi: targetMidi, role: "nốt đích", finger: 5 });

  // --- Bước 5: bảng theo phách
  const beats: BeatRow[] = [];
  for (const n of notes) {
    beats.push({
      bar: n.bar,
      beat: n.beat,
      lh: n.beat === 1 ? lh.notes.join(" - ") : "giữ",
      rh: `${n.note} (ngón ${n.finger})`,
      note: n.role,
    });
  }

  return {
    context: {
      key,
      meter,
      style,
      chord: symbol,
      roman: degree,
      next_chord: nextSymbol,
      next_roman: nextDegree,
      target_note,
    },
    collection: {
      chord_tones,
      tensions,
      pool: poolMidi.slice(startIndex, startIndex + 10).map((m) => midiToName(m, key)),
      approach: [midiToName(approachMidi, key)],
    },
    voicing: { lh, rh_range: `${midiToName(rhLow, key)} - ${midiToName(rhLow + 24, key)}` },
    notes,
    beats,
    fingering: { text: `luồn ngón ${CELL_FINGERS.join("-")} cho ô ngũ cung, ngón 4 vào nốt dẫn, ngón 5 vào nốt đích`, by: [] },
    derived_from: [...new Set(derived_from)],
    generic: [...new Set(generic)],
  };
}

/** Đưa một pitch class về quãng tám gần `around` nhất, tính lên. */
function nearest(around: number, pitchClass: number): number {
  const pc = ((pitchClass % 12) + 12) % 12;
  const base = Math.floor(around / 12) * 12 + pc;
  return base < around ? base + 12 : base;
}
