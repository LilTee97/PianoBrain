import type { KnowledgeBase } from "../kb/types.js";
import type { KnowledgeItem } from "../kb/types.js";
import { midiToName } from "./chords.js";
import { chordSymbol, degreeRoot, pitchOfNote, qualityOfDegree } from "./theory.js";

/**
 * Bộ sinh câu lót, áp công thức của Kingsley lên VÒNG BẤT KỲ.
 *
 * Không chép ô nhịp mẫu nào. Nó đọc bậc của vòng, chọn công thức đúng theo luật đã ingest,
 * rồi TÍNH ra nốt, quãng tám, phách và số ngón cho đúng tông người học đưa.
 *
 * Mỗi lựa chọn phải có item extracted của Kingsley cho phép. Không có item thì không sinh,
 * và nói ra là thiếu — không tự nghĩ công thức mới.
 */

/** Bậc thang âm trưởng và thứ tự nhiên, tính bằng nửa cung từ nốt gốc. */
const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11];
const MINOR_STEPS = [0, 2, 3, 5, 7, 8, 10];

/**
 * Chọn quãng tám cho nốt mở câu: lấy cao độ gần B4 nhất, hoà thì lấy nốt thấp hơn.
 * Nếu chỉ chặn trần cứng thì câu ở tông C nằm quanh C5 mà tông D lại tụt hẳn một quãng tám.
 */
const ANCHOR = 71;
const CEILING = 76;
const nearestTo = (pc: number, anchor: number) => {
  const low = Math.floor(anchor / 12) * 12 + (((pc % 12) + 12) % 12);
  const cands = [low - 12, low, low + 12].filter((m) => m >= 48 && m <= CEILING);
  return cands.sort((a, b) => Math.abs(a - anchor) - Math.abs(b - anchor) || a - b)[0] ?? low;
};
const highestAtOrBelow = (pc: number, ceiling: number) => {
  const base = Math.floor(ceiling / 12) * 12 + (((pc % 12) + 12) % 12);
  return base <= ceiling ? base : base - 12;
};

export interface FillNote {
  beat: number;
  /** null = nghỉ */
  note: string | null;
  /** Nốt hoa mỹ nửa cung đi trước, nếu có. */
  grace?: string;
  midi?: number;
  degree?: number;
  dur: string;
  finger?: number;
}

export interface FillBar {
  bar: number;
  chord: string;
  lh: string;
  rh: FillNote[];
}

export interface FillPlan {
  key: string;
  meter: string;
  /** Ô nào ca sĩ hát. null = không biết. */
  singing: boolean[] | null;
  /** Bậc của vòng, đúng như người học đưa. */
  progression: string[];
  /** Công thức đã chọn và vì sao. */
  choice: { pattern: string; why: string; degrees: number[]; built_on: string };
  bars: FillBar[];
  /** Nốt đích ở phách 1 ô sau. */
  lands_on: { chord: string; note: string; role: string };
  /** id item của Kingsley cho phép lựa chọn này. Rỗng thì không được gắn nhãn [kingsley]. */
  authorized_by: string[];
  /** Chỗ không có item nào cho phép — lý thuyết chung, không dán tên thầy. */
  generic: string[];
  /** Thứ kho chưa có, nói ra chứ không lấp. */
  missing: string[];
}

const validated = (kb: KnowledgeBase, id: string): KnowledgeItem | undefined => {
  const item = kb.byId.get(id);
  return item && item.origin === "extracted" && item.status !== "rejected" ? item : undefined;
};

/** Nốt của một bậc thang âm, tính từ nốt gốc hợp âm. Hợp âm thứ dùng thang âm thứ tự nhiên. */
function degreeMidi(rootPc: number, minor: boolean, degree: number, ceiling: number): number {
  const steps = minor ? MINOR_STEPS : MAJOR_STEPS;
  return highestAtOrBelow(rootPc + steps[degree - 1], ceiling);
}

/** Rải một chuỗi bậc đi xuống: nốt đầu sát trần, mỗi nốt sau là nốt gần nhất phía dưới. */
function descending(rootPc: number, minor: boolean, degrees: number[]): { midi: number; degree: number }[] {
  const steps = minor ? MINOR_STEPS : MAJOR_STEPS;
  const out: { midi: number; degree: number }[] = [];
  let ceiling = CEILING;
  degrees.forEach((d, idx) => {
    const pc = rootPc + steps[d - 1];
    // Nốt mở câu neo quanh B4; các nốt sau đi xuống dần, luôn thấp hơn nốt trước.
    const midi = idx === 0 ? nearestTo(pc, ANCHOR) : highestAtOrBelow(pc, ceiling);
    out.push({ midi, degree: d });
    ceiling = midi - 1;
  });
  return out;
}

/** Ngón tay phải cho bốn nốt đi xuống. Kho không có thế ngón cho câu lót, đây là quy ước chung. */
const DESCENDING_FINGERS = [5, 4, 2, 1];
/**
 * Nốt hoa mỹ là bậc b3, nên phải đánh vần bằng dấu giáng: b3 của G là Bb, không phải A#.
 * Cách gọi tên chung theo tông sẽ ra A# ở tông C — sai chính tả nhạc.
 */
const FLAT_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const flatName = (midi: number) => `${FLAT_NAMES[(((midi % 12) + 12) % 12)]}${Math.floor(midi / 12) - 1}`;

/** Ngón cho cụm 3-2-1 đi xuống ở phách 4. Cũng là quy ước chung, kho không có. */
const PRECEDING_FINGERS = [3, 2, 1];

/**
 * Ca sĩ hát ở đâu. Câu lót chỉ được chèn vào chỗ trống, không đè lên giai điệu.
 *  - bỏ trống      : không biết, thầy chỉ dám đặt một câu ở cuối
 *  - "full"        : hát kín cả câu nhạc -> không lót, chỉ giữ pad
 *  - mảng / chuỗi  : từng ô một, ví dụ "hát,hát,nghỉ,hát"
 */
export type Vocal = "full" | boolean[] | string;

export interface FillInput {
  key: string;
  /** Bậc La Mã, ví dụ ["I","V","vi","IV"]. */
  progression: string[];
  meter?: string;
  vocal?: Vocal;
}

/** true = ô đó ca sĩ đang hát. null = không biết. */
export function parseVocal(vocal: Vocal | undefined, bars: number): boolean[] | null {
  if (vocal === undefined) return null;
  if (vocal === "full") return Array.from({ length: bars }, () => true);
  const raw = Array.isArray(vocal) ? vocal : vocal.split(/[,;|]+/).map((t) => !/ngh(ỉ|i)|rest|trống|trong/i.test(t));
  return Array.from({ length: bars }, (_, i) => raw[i] ?? true);
}

/**
 * Chọn công thức theo bậc ĐÍCH, đúng như luật đã ingest:
 *  - vào bậc vi   -> 6th fill 1-7-5-3 dựng trên bậc I
 *  - vào IV hoặc ii -> 6th fill 4-3-1-6 dựng trên bậc I
 *  - không có đích -> câu chạy 4-3-1-5 trên chính hợp âm đang chơi (chỉ I, IV, vi)
 */
export function generateFill(input: FillInput, kb: KnowledgeBase): FillPlan | null {
  const { key, progression, meter = "4/4" } = input;
  if (progression.length < 2) return null;
  const singing = parseVocal(input.vocal, progression.length);

  const missing: string[] = [];
  const generic: string[] = [];
  const authorized_by: string[] = [];

  const sixthIntoVi = validated(kb, "kingsley-6th-fill-1-7-5-3");
  const sixthIntoFour = validated(kb, "kingsley-6th-fill-4-3-1-6");
  const run = validated(kb, "kingsley-run-4-3-1-5");
  const economy = validated(kb, "kingsley-lh-economy-voicing");

  const economyPad = validated(kb, "kingsley-lh-economy-voicing");
  if (singing && singing.every(Boolean)) {
    // Ca sĩ hát kín. Luật khoảng trống của Kingsley: không lót, chỉ giữ nền.
    if (economyPad) authorized_by.push(economyPad.id);
    missing.push("Ca sĩ hát kín cả câu nhạc — thầy không lót, chỉ giữ pad để không đè lên giọng.");
    const padDegree = progression[0];
    const padRoot = degreeRoot(padDegree, key);
    const padMidi = highestAtOrBelow(pitchOfNote(padRoot), 48);
    return {
      key,
      meter,
      singing,
      progression,
      choice: { pattern: "chỉ giữ pad, không lót", why: "ca sĩ hát kín cả câu", degrees: [], built_on: padDegree },
      bars: [
        {
          bar: 1,
          chord: chordSymbol(padDegree, qualityOfDegree(padDegree), key),
          lh: `${midiToName(padMidi, key)} + ${midiToName(padMidi + 7, key)} (quãng 1-5, ngân cả ô)`,
          rh: [{ beat: 1, note: null, dur: "1/1" }],
        },
      ],
      lands_on: { chord: "", note: "", role: "" },
      authorized_by,
      generic,
      missing,
    };
  }

  const preceding = validated(kb, "kingsley-preceding-3-2-1");
  const grace = validated(kb, "kingsley-flat3-to-3-grace");

  // Bước 1: chọn CHỖ lót.
  // Biết ca sĩ nghỉ ở đâu thì lót đúng vào chỗ trống đó — câu chạy nằm ở phách 3-4
  // của ô liền trước và đáp xuống đúng ô ca sĩ nghỉ.
  const findTarget = (want: (d: string) => boolean) =>
    progression.findIndex((_, i) => i < progression.length - 1 && want(progression[i + 1]));
  let at = -1;
  let placedByVocal = false;
  if (singing) {
    const restBar = singing.findIndex((s, i) => i >= 1 && !s);
    if (restBar > 0) {
      at = restBar - 1;
      placedByVocal = true;
    }
  }
  if (at < 0) at = findTarget((d) => d === "vi");
  if (at < 0) at = findTarget((d) => d === "IV" || d === "ii");
  if (at < 0) at = progression.length - 2;

  const here = progression[at];
  const target = progression[at + 1];

  // Bước 2: chọn CÔNG THỨC hợp lệ cho đúng chỗ đó. Không hợp lệ thì lùi, không đổi chỗ.
  let degrees: number[] = [];
  let pattern = "";
  let why = "";
  let builtOn = "I";
  let shape: "descending" | "preceding" = "descending";
  let graceNote: string | null = null;

  if (target === "vi" && here === "I" && sixthIntoVi) {
    degrees = [1, 7, 5, 3];
    pattern = "6th fill 1-7-5-3";
    why = "ô ngay trước bậc vi đúng là bậc I";
    authorized_by.push(sixthIntoVi.id);
  } else if ((target === "IV" || target === "ii") && (here === "I" || here === "vi") && sixthIntoFour) {
    degrees = [4, 3, 1, 6];
    pattern = "6th fill 4-3-1-6";
    why = `ô đang chơi là bậc ${here}, ô sau là bậc ${target}`;
    authorized_by.push(sixthIntoFour.id);
  } else if (preceding) {
    // Luật 1-7-5-3 chỉ đúng khi ô trước bậc vi là bậc I. Ở đây không phải, nên lùi về
    // preceding 3-2-1 — cụm này đặt ở phách 4 của chính hợp âm đang chơi, không cần bậc I.
    degrees = [3, 2, 1];
    pattern = "preceding 3-2-1";
    why =
      target === "vi"
        ? `ô ngay trước bậc vi là bậc ${here}, không phải bậc I — không được dùng 6th fill 1-7-5-3`
        : `không có công thức 6th nào hợp lệ cho chỗ ${here} sang ${target}`;
    builtOn = here;
    shape = "preceding";
    authorized_by.push(preceding.id);
  } else if (run && ["I", "IV", "vi"].includes(here)) {
    degrees = [4, 3, 1, 5];
    pattern = "câu chạy 4-3-1-5";
    why = `không có công thức nào khác hợp lệ, hợp âm đang chơi là ${here}`;
    builtOn = here;
    authorized_by.push(run.id);
  } else {
    missing.push(
      "Kho chưa có công thức câu lót nào của Kingsley khớp vòng này — thầy không tự nghĩ ra công thức mới.",
    );
    return { key, meter, singing, progression, choice: { pattern: "", why: "", degrees: [], built_on: "" }, bars: [], lands_on: { chord: "", note: "", role: "" }, authorized_by, generic, missing };
  }

  const hereDegree = here;
  const targetDegree = target;
  // 6th fill dựng trên bậc I; preceding và câu chạy dựng trên chính hợp âm đang chơi.
  const baseDegree = builtOn === "I" ? "I" : hereDegree;
  const baseRoot = degreeRoot(baseDegree, key);
  const baseMinor = baseDegree === baseDegree.toLowerCase();
  const notes = descending(pitchOfNote(baseRoot), baseMinor, degrees);

  // Nốt đích: bậc 3 của hợp âm ô sau, rơi vào phách 1.
  const targetRoot = degreeRoot(targetDegree, key);
  const targetMinor = targetDegree === targetDegree.toLowerCase();
  const landMidi = degreeMidi(pitchOfNote(targetRoot), targetMinor, 3, notes[notes.length - 1].midi + 12);

  if (shape === "preceding" && !baseMinor) {
    if (grace) {
      graceNote = flatName(notes[0].midi - 1);
      authorized_by.push(grace.id);
    } else {
      generic.push("Kho chưa có luật nốt hoa mỹ b3 lên 3 — bỏ nốt hoa mỹ.");
    }
  }

  if (economy) authorized_by.push(economy.id);
  else generic.push("Kho chưa có luật tay trái tối giản — thế 1-5 dưới đây là quy ước chung.");
  generic.push(`Kho chưa có thế ngón cho câu lót — số ngón ${(shape === "preceding" ? PRECEDING_FINGERS : DESCENDING_FINGERS).slice(0, notes.length).join("-")} là quy ước chung.`);
  if (!singing) {
    missing.push("Không biết chỗ nào ca sĩ nghỉ, nên thầy chỉ đặt MỘT câu lót ở cuối câu nhạc.");
  } else if (placedByVocal) {
    generic.push(
      // Nói đúng phách nốt thật sự rơi vào: cụm preceding nằm gọn ở phách 4, câu bốn nốt thì 3-4.
      `Đặt câu lót ở ${shape === "preceding" ? "phách 4" : "phách 3-4"} ô ${at + 1} để đáp xuống ô ${at + 2} — đúng ô ca sĩ nghỉ, không đè lên giọng.`,
    );
  }

  const hereChord = chordSymbol(hereDegree, qualityOfDegree(hereDegree), key);
  const targetChord = chordSymbol(targetDegree, qualityOfDegree(targetDegree), key);
  const lhNote = (deg: string) => {
    const r = degreeRoot(deg, key);
    const rootMidi = highestAtOrBelow(pitchOfNote(r), 48);
    return `${midiToName(rootMidi, key)} + ${midiToName(rootMidi + 7, key)} (quãng 1-5, ngân cả ô)`;
  };

  const bars: FillBar[] = [
    {
      bar: 1,
      chord: hereChord,
      lh: lhNote(hereDegree),
      rh:
        shape === "preceding"
          ? [
              { beat: 1, note: null, dur: "1/4" },
              { beat: 2, note: null, dur: "1/4" },
              { beat: 3, note: null, dur: "1/4" },
              ...notes.map((n, idx) => ({
                beat: 4 + idx * 0.25,
                note: midiToName(n.midi, key),
                midi: n.midi,
                degree: n.degree,
                dur: idx === notes.length - 1 ? "1/8" : "1/16",
                finger: PRECEDING_FINGERS[idx] ?? 1,
                ...(idx === 0 && graceNote ? { grace: graceNote } : {}),
              }))
            ]
          : [
              { beat: 1, note: null, dur: "1/4" },
              { beat: 2, note: null, dur: "1/4" },
              ...notes.map((n, idx) => ({
                beat: 3 + idx * 0.5,
                note: midiToName(n.midi, key),
                midi: n.midi,
                degree: n.degree,
                dur: "1/8",
                finger: DESCENDING_FINGERS[idx] ?? 1,
              })),
            ],
    },
    {
      bar: 2,
      chord: targetChord,
      lh: lhNote(targetDegree),
      rh: [{ beat: 1, note: midiToName(landMidi, key), midi: landMidi, degree: 3, dur: "1/4", finger: 2 }],
    },
  ];

  const builtOnNote =
    baseDegree === "I" && hereDegree !== "I"
      ? `Câu dựng trên bậc I (${degreeRoot("I", key)}) dù ô đang chơi là bậc ${hereDegree} — đúng như công thức của Kingsley, nốt của bậc I nghe vẫn hợp trên ô này và kéo tai về hợp âm đích.`
      : "";
  if (builtOnNote) generic.push(builtOnNote);

  return {
    key,
    meter,
    singing,
    progression,
    choice: { pattern, why, degrees, built_on: baseDegree },
    bars,
    lands_on: { chord: targetChord, note: midiToName(landMidi, key), role: "bậc 3 của hợp âm đích" },
    authorized_by,
    generic,
    missing,
  };
}

// ---------------------------------------------------------------------------
// Intro và outro. Cùng bộ luật Kingsley, khác chỗ đặt: intro đứng trước khi hát
// nên coi như ca sĩ nghỉ cả câu; outro đóng bài nên ưu tiên rải ngược add2.
// ---------------------------------------------------------------------------

export interface PhrasePlan {
  kind: "intro" | "outro";
  key: string;
  meter: string;
  progression: string[];
  bars: FillBar[];
  /** Vì sao chọn từng thủ pháp, và chỗ nào bị luật cấm. */
  choices: string[];
  authorized_by: string[];
  generic: string[];
  missing: string[];
}

/** Nốt của một bậc, đặt gần mốc cho trước. */

const lhEconomy = (deg: string, key: string) => {
  const rootMidi = highestAtOrBelow(pitchOfNote(degreeRoot(deg, key)), 48);
  return `${midiToName(rootMidi, key)} + ${midiToName(rootMidi + 7, key)} (quãng 1-5, ngân cả ô)`;
};

/**
 * Intro 2-4 ô. Ca sĩ chưa vào nên cả ô đều là chỗ trống, được phép chuyển động.
 *  - bậc I và IV: sus2 lên 3
 *  - bậc V: sus4 xuống 3
 *  - bậc IV: CẤM sus4 (Fsus4 có Bb, đụng B của giọng)
 *  - hợp âm thứ: không dùng sus, chỉ giữ — luật sus của Kingsley nói trên hợp âm trưởng
 */
/**
 * Tầm câu intro và outro: Đô quãng tám 4 tới Sol quãng tám 5.
 *
 * Trên là chỗ tay phải đệm ballad với tới thoải mái, dưới không đụng tay trái.
 * Mọi nốt sinh ra ở dưới đều bị kéo về trong khoảng này.
 */
const PHRASE_LOW = 60;
const PHRASE_HIGH = 79;

const inPhraseRange = (midi: number): number => {
  let note = midi;
  while (note < PHRASE_LOW) note += 12;
  while (note > PHRASE_HIGH) note -= 12;
  return note;
};

/** Nốt gần `previous` nhất mang đúng cao độ ấy, trong tầm câu nhạc. */
const nearestPitch = (pc: number, previous: number): number => {
  let best: number | null = null;
  for (let note = PHRASE_LOW; note <= PHRASE_HIGH; note += 1) {
    if (((note % 12) + 12) % 12 !== ((pc % 12) + 12) % 12) continue;
    if (best === null || Math.abs(note - previous) < Math.abs(best - previous)) best = note;
  }
  return best ?? previous;
};

/** Nốt của một bậc hợp âm, đặt gần nốt vừa chơi để câu rải liền tay. */
const near = (rootPc: number, minor: boolean, degree: number, previous: number): number => {
  const steps = minor ? MINOR_STEPS : MAJOR_STEPS;
  return nearestPitch(rootPc + steps[degree - 1], previous);
};

/**
 * Nốt dẫn vào hợp âm ô sau: bậc liền trên nốt gốc ấy, lấy trong thang âm giọng.
 *
 * Đi liền bậc chứ không nhảy, và nằm trong giọng nên không cần luật của thầy
 * cho phép — đây là bước nối thông thường, ghi nhãn suy luận chung.
 */
const approachInto = (nextRootPc: number, key: string, previous: number): number => {
  const tonic = pitchOfNote(degreeRoot("I", key));
  const scale = MAJOR_STEPS.map((step) => (tonic + step) % 12);
  const above = scale.find((pc) => ((pc - nextRootPc) % 12 + 12) % 12 === 2)
    ?? scale.find((pc) => ((pc - nextRootPc) % 12 + 12) % 12 === 1)
    ?? (nextRootPc + 2) % 12;
  return nearestPitch(above, previous);
};

export function generateIntro(input: FillInput, kb: KnowledgeBase): PhrasePlan | null {
  const { key, progression, meter = "4/4" } = input;
  if (progression.length === 0) return null;

  const sus2 = validated(kb, "kingsley-sus2-to-3");
  const sus4 = validated(kb, "kingsley-sus4-to-3");
  const economy = validated(kb, "kingsley-lh-economy-voicing");

  const authorized_by: string[] = [];
  const generic: string[] = [];
  const missing: string[] = [];
  const choices: string[] = [];
  if (economy) authorized_by.push(economy.id);
  else generic.push("Kho chưa có luật tay trái tối giản — thế 1-5 là quy ước chung.");
  generic.push("Kho chưa có thế ngón cho intro — số ngón 1-3-5 và 2-3 là quy ước chung.");
  generic.push("Hình rải, nốt dẫn và chỗ lấy hơi ở phách 3-4 là kỹ thuật soạn thêm, bám nốt hợp âm và thang âm của giọng — không phải thầy dạy.");

  const wanted = progression.slice(0, 4);

  const bars: FillBar[] = wanted.map((deg, idx) => {
    const rootPc = pitchOfNote(degreeRoot(deg, key));
    const minor = deg === deg.toLowerCase();
    const chord = chordSymbol(deg, qualityOfDegree(deg), key);
    const rh: FillNote[] = [];
    // Neo quanh Mi quãng tám 4: câu mở ra ở giữa tầm, không dính trần.
    let last = 64;

    const put = (beat: number, degree: number, dur: string, finger: number, grace?: string) => {
      const midi = inPhraseRange(near(rootPc, minor, degree, last));
      last = midi;
      rh.push({
        beat,
        note: midiToName(midi, key),
        midi,
        degree,
        dur,
        finger,
        ...(grace ? { grace } : {}),
      });
      return midi;
    };

    /*
      Phách 1: rải **lần lượt** gốc rồi bậc ba, không đập một khối.

      Bản trước in cả cụm thành một chuỗi "C4+E4+G4" mà không kèm số MIDI, nên
      bên phát bỏ qua — cả ô intro chỉ kêu đúng hai nốt sus. Rải từng nốt thì
      vừa dày lên vừa thật sự nghe được.
    */
    put(1, 1, "1/8", 1);
    put(1.5, 3, "1/8", 3);

    if (!minor && (deg === "I" || deg === "IV") && sus2) {
      put(2, 2, "1/8", 2);
      put(2.5, 3, "1/8", 3);
      if (!authorized_by.includes(sus2.id)) authorized_by.push(sus2.id);
      choices.push(`ô ${idx + 1} (${chord}): sus2 lên bậc 3`);
    } else if (!minor && deg === "V" && sus4) {
      put(2, 4, "1/8", 3);
      put(2.5, 3, "1/8", 2);
      if (!authorized_by.includes(sus4.id)) authorized_by.push(sus4.id);
      choices.push(`ô ${idx + 1} (${chord}): sus4 xuống bậc 3, đúng bậc V`);
    } else if (deg === "IV") {
      put(2, 5, "1/8", 4);
      put(2.5, 3, "1/8", 2);
      choices.push(`ô ${idx + 1} (${chord}): KHÔNG dùng sus4 ở bậc IV — nốt bậc 4 của IV đụng nốt của giọng; thay bằng rải 5 xuống 3`);
    } else if (minor) {
      put(2, 5, "1/8", 4);
      put(2.5, 3, "1/8", 2);
      choices.push(`ô ${idx + 1} (${chord}): hợp âm thứ, không dùng sus — luật sus của Kingsley nói trên hợp âm trưởng; thay bằng rải trong hợp âm`);
    } else {
      put(2, 5, "1/8", 4);
      put(2.5, 3, "1/8", 2);
      choices.push(`ô ${idx + 1} (${chord}): kho chưa có thủ pháp nào hợp lệ, chỉ rải trong hợp âm`);
    }

    /*
      Phách 3-4 xoay theo số thứ tự ô, để bốn ô không ra bốn lần cùng một hình.
      Ô cuối chừa một nhịp lấy hơi trước khi vào bài.
    */
    const shape = idx % 4;
    if (shape === 0) {
      put(3, 5, "1/8", 4);
      put(3.5, 1, "1/8", 5);
      put(4, 5, "1/4", 4);
    } else if (shape === 1) {
      // Dày hơn ô trước một nhịp: bốn nốt móc đơn liền nhau.
      put(3, 1, "1/8", 5);
      put(3.5, 5, "1/8", 4);
      put(4, 3, "1/8", 2);
      put(4.5, 5, "1/8", 4);
    } else if (shape === 2) {
      // Chạy nốt kép rồi mới thả nốt dẫn: hình khác hẳn hai ô trên.
      put(3, 5, "1/16", 4);
      put(3.25, 1, "1/16", 5);
      put(3.5, 3, "1/8", 2);
      const nextDeg = wanted[idx + 1];
      if (nextDeg) {
        const target = pitchOfNote(degreeRoot(nextDeg, key));
        const lead = inPhraseRange(approachInto(target, key, last));
        last = lead;
        rh.push({ beat: 4, note: midiToName(lead, key), midi: lead, dur: "1/4", finger: 2 });
        choices.push(`ô ${idx + 1}: phách 4 đi nốt dẫn liền bậc vào ${chordSymbol(nextDeg, qualityOfDegree(nextDeg), key)}`);
      } else {
        put(4, 1, "1/4", 5);
      }
    } else {
      put(3, 5, "1/8", 4);
      put(3.5, 1, "1/8", 5);
      rh.push({ beat: 4, note: null, dur: "1/4" });
      choices.push(`ô ${idx + 1}: chừa phách 4 lấy hơi trước khi vào bài`);
    }

    return { bar: idx + 1, chord, lh: lhEconomy(deg, key), rh };
  });

  missing.push("Intro là chỗ ca sĩ chưa vào, nên cả ô đều được chuyển động — không cần canh chỗ nghỉ.");
  return { kind: "intro", key, meter, progression: progression.slice(0, 4), bars, choices, authorized_by, generic, missing };
}

/**
 * Outro 2 ô: ô đầu rải ngược add2 theo bậc 5-3-2-1 trên bậc I, ô sau giữ hợp âm chủ ngân dài.
 * Không bao giờ dùng sus4 ở bậc IV.
 */
export function generateOutro(input: FillInput, kb: KnowledgeBase): PhrasePlan | null {
  const { key, progression, meter = "4/4" } = input;
  const reversed = validated(kb, "kingsley-reversed-add2-outro");
  const economy = validated(kb, "kingsley-lh-economy-voicing");

  const authorized_by: string[] = [];
  const generic: string[] = [];
  const missing: string[] = [];
  const choices: string[] = [];

  if (!reversed) {
    missing.push("Kho chưa có thủ pháp kết bài nào của Kingsley — thầy không tự nghĩ ra câu kết.");
    return { kind: "outro", key, meter, progression, bars: [], choices, authorized_by, generic, missing };
  }
  authorized_by.push(reversed.id);
  if (economy) authorized_by.push(economy.id);
  else generic.push("Kho chưa có luật tay trái tối giản — thế 1-5 là quy ước chung.");
  generic.push("Kho chưa có thế ngón cho câu kết — số ngón 5-3-2-1 là quy ước chung.");

  const rootPc = pitchOfNote(degreeRoot("I", key));
  const chordI = chordSymbol("I", "", key);
  choices.push(`rải ngược add2 bậc 5-3-2-1 trên bậc I (${chordI}) — nốt bậc 2 giữ màu add2 trước khi về gốc`);
  if (progression.includes("IV")) {
    choices.push("vòng có bậc IV nhưng KHÔNG dùng sus4 ở đó — luật của Kingsley cấm sus4 trên bậc IV");
  }

  /*
    Ô 1: rải ngược 5-3-2-1 theo luật Kingsley, chơi bằng nốt móc đơn rồi **lặp
    lại hình ấy một tầng quãng tám thấp hơn**. Bậc 2 vẫn nằm đúng chỗ giữa hai
    lần, nên màu add2 của thầy không mất; chỗ thêm chỉ là nhắc lại cùng một hình
    cho câu kết đủ sức nặng, không phải công thức mới.
  */
  const upper = descending(rootPc, false, [5, 3, 2, 1]);
  const flatName = (midi: number) => midiToName(midi, key);
  const fingersDown = [5, 3, 2, 1];

  /*
    Tầng trên nâng lên một quãng tám, tầng dưới giữ nguyên chỗ cũ. Làm ngược
    lại thì tầng dưới rơi khỏi tầm rồi bị kéo về chỗ cũ, và hai tầng ra y hệt
    nhau — nghe thành lặp lại nguyên si chứ không phải hai tầng.
  */
  const lift = (midi: number) => (midi + 12 <= PHRASE_HIGH ? midi + 12 : midi);

  const firstBar: FillNote[] = upper.map((n, idx) => ({
    beat: 1 + idx * 0.5,
    note: flatName(lift(n.midi)),
    midi: lift(n.midi),
    degree: n.degree,
    dur: "1/8",
    finger: fingersDown[idx] ?? 1,
    /*
      Một nốt hoa mỹ nửa cung vuốt vào bậc 5 mở câu. Kho chưa có luật hoa mỹ cho
      câu kết nên chỗ này ghi là quy ước chung, không dán tên thầy.
    */
    ...(idx === 0 ? { grace: flatName(lift(n.midi) - 1) } : {}),
  }));
  generic.push("Nốt hoa mỹ vuốt vào bậc 5 và lần nhắc lại ở quãng tám dưới là kỹ thuật soạn thêm, không phải luật của thầy.");

  for (const [idx, n] of upper.entries()) {
    const lower = inPhraseRange(n.midi);
    firstBar.push({
      beat: 3 + idx * 0.5,
      note: flatName(lower),
      midi: lower,
      degree: n.degree,
      dur: "1/8",
      finger: fingersDown[idx] ?? 1,
    });
  }

  /*
    Ô 2: rải chậm 1-3-5-8 ngân dần rồi đóng lại bằng nốt gốc, thay vì đập một
    khối ở phách 1 rồi im ba phách.
  */
  let last = upper[upper.length - 1]?.midi ?? 60;
  const closing: FillNote[] = [];
  const climb = [1, 3, 5, 1];
  climb.forEach((degree, idx) => {
    const midi = inPhraseRange(
      idx === 3 ? near(rootPc, false, 1, last) + 12 : near(rootPc, false, degree, last),
    );
    last = midi;
    closing.push({
      beat: 1 + idx * 0.5,
      note: flatName(midi),
      midi,
      degree,
      dur: "1/8",
      finger: [1, 2, 3, 5][idx] ?? 1,
    });
  });

  const finalRoot = inPhraseRange(near(rootPc, false, 1, 64));
  closing.push({
    beat: 3,
    note: flatName(finalRoot),
    midi: finalRoot,
    degree: 1,
    dur: "1/2",
    finger: 1,
  });

  const bars: FillBar[] = [
    { bar: 1, chord: chordI, lh: lhEconomy("I", key), rh: firstBar },
    { bar: 2, chord: chordI, lh: lhEconomy("I", key), rh: closing },
  ];

  return { kind: "outro", key, meter, progression, bars, choices, authorized_by, generic, missing };
}
