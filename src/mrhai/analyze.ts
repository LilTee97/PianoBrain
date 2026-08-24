import { parseChord } from "./chords.js";
import { noteAt, pitchOfNote } from "./theory.js";

export interface AnalyzedChord {
  symbol: string;
  root: string;
  quality: string;
  bass: string | null;
  roman: string;
}

export interface Analysis {
  key: string;
  minor: boolean;
  rows: AnalyzedChord[];
}

const MAJOR_ROMAN = ["I", "bII", "II", "bIII", "III", "IV", "#IV", "V", "bVI", "VI", "bVII", "VII"];
const MINOR_ROMAN = ["i", "bII", "ii", "III", "#iii", "iv", "#iv", "v", "VI", "#vi", "VII", "vii"];

function romanOf(root: string, keyPc: number, minor: boolean): string {
  const d = (((pitchOfNote(root) - keyPc) % 12) + 12) % 12;
  return (minor ? MINOR_ROMAN : MAJOR_ROMAN)[d]!;
}

function headSymbol(symbol: string): string {
  const [head, bass] = symbol.split("/");
  return /^[A-G][#b]?$/.test(bass ?? "") ? head! : symbol;
}

/** Giọng: ưu tiên iiø–V–i (m7b5 rồi 7 rồi hợp âm thứ cách 5). Không có thì hợp âm đầu. */
export function guessKey(symbols: readonly string[]): { key: string; minor: boolean } {
  const parsed = symbols.map((s) => ({ s, p: parseChord(headSymbol(s)) }));
  for (let i = 0; i < parsed.length - 2; i += 1) {
    const a = parsed[i]!.p;
    const b = parsed[i + 1]!.p;
    const c = parsed[i + 2]!.p;
    if (!a || !b || !c) continue;
    const iiø = a.isMinor && (a.quality.includes("b5") || a.quality.includes("ø"));
    const valt = b.isDominant;
    const tonic = c.isMinor;
    if (!iiø || !valt || !tonic) continue;
    if ((pitchOfNote(b.root) - pitchOfNote(a.root) + 12) % 12 !== 5) continue;
    if ((pitchOfNote(c.root) - pitchOfNote(b.root) + 12) % 12 !== 5) continue;
    return { key: `${c.root}m`, minor: true };
  }
  const first = parsed.find((x) => x.p)?.p;
  if (!first) return { key: "C", minor: false };
  return first.isMinor ? { key: `${first.root}m`, minor: true } : { key: first.root, minor: false };
}

export function analyze(symbols: readonly string[], declaredKey?: string | null): Analysis | null {
  if (symbols.length === 0) return null;
  const guessed = guessKey(symbols);
  const key = declaredKey && declaredKey.length > 0 ? declaredKey : guessed.key;
  const minor = /m$/i.test(key) && !/maj/i.test(key);
  const keyPc = pitchOfNote(key.replace(/m$/i, ""));
  const rows: AnalyzedChord[] = [];
  for (const symbol of symbols) {
    const p = parseChord(headSymbol(symbol));
    if (!p) return null;
    const bass = parseChord(symbol)?.bass ?? null;
    let roman = romanOf(p.root, keyPc, minor);
    if (p.isDominant && /^v$/i.test(roman.replace(/[#b]/g, ""))) roman = "V";
    rows.push({
      symbol,
      root: p.root,
      quality: p.quality,
      bass,
      roman,
    });
  }
  return { key, minor, rows };
}

function stripColor(quality: string): string {
  if (/m7b5|ø/.test(quality)) return "m7b5";
  if (/add/.test(quality)) return "";
  if (/^m/.test(quality) && !/^maj/.test(quality)) {
    if (/7|9|11|13/.test(quality)) return "m7";
    return "m";
  }
  if (/maj/.test(quality)) return "maj7";
  if (/7|9|11|13|alt|#5|#9|b9|b13/.test(quality)) return "7";
  return quality;
}

/** Bỏ 9/13/alt; slash giữ nguyên bass. */
export function simplify(symbols: readonly string[]): string[] {
  return symbols.map((symbol) => {
    const p = parseChord(headSymbol(symbol));
    if (!p) return symbol;
    const bass = parseChord(symbol)?.bass;
    const q = stripColor(p.quality);
    const head = p.root + q;
    return bass ? `${head}/${bass}` : head;
  });
}

export function explainColor(row: AnalyzedChord, key: string, _minor: boolean): string {
  const r = row.roman.replace(/[#b]/g, "").toLowerCase();
  if ((row.quality.includes("b5") || row.quality.includes("ø")) && r === "ii")
    return `${row.symbol}: iiø của ${key} — nửa giảm dọn đường V.`;
  if ((row.quality.includes("#5") || row.quality.includes("alt") || row.quality.includes("#9")) && (r === "v" || row.roman === "V"))
    return `${row.symbol}: V alt — #5#9 hút về i.`;
  if (row.bass && row.root !== row.bass)
    return `${row.symbol}: hợp âm ${row.root}, bass ${row.bass} — không đổi gốc sang ${row.bass}.`;
  if (row.quality.includes("13") && (row.roman === "#iv" || row.roman === "#IV" || row.roman === "bV"))
    return `${row.symbol}: mượn (không diatonic ${key}).`;
  return `${row.symbol} = ${row.roman} ở ${key}.`;
}

const TEMPLATES: Record<string, { degrees: { roman: string; quality: string }[]; label: string }> = {
  "ii-v-mau": {
    label: "iiø–Valt–i",
    degrees: [
      { roman: "ii", quality: "m7b5" },
      { roman: "V", quality: "7#5#9" },
      { roman: "i", quality: "m9" },
    ],
  },
  iadd9: {
    label: "Iadd9 ballad",
    degrees: [
      { roman: "I", quality: "add9" },
      { roman: "vi", quality: "m7" },
      { roman: "ii", quality: "m7" },
      { roman: "V", quality: "7" },
    ],
  },
};

function matchTemplate(text: string): keyof typeof TEMPLATES | null {
  if (/iiø|ii-v\s*màu|ii-v màu|valt|2-5 màu/i.test(text)) return "ii-v-mau";
  if (/iadd9|i add9|ballad.*add9|add9.*ballad/i.test(text)) return "iadd9";
  return null;
}

function spell(roman: string, quality: string, tonic: string, minor: boolean): string {
  const table = minor ? MINOR_ROMAN : MAJOR_ROMAN;
  const want = roman.replace(/[#b]/, "");
  let pc = table.findIndex((x) => x === roman);
  if (pc < 0) pc = table.findIndex((x) => x.toLowerCase() === want.toLowerCase());
  if (pc < 0) pc = 0;
  return noteAt((pitchOfNote(tonic) + pc) % 12, tonic) + quality;
}

/** Tông C#m + "ii-V màu" → vòng cố định đã transpose. */
export function buildTemplate(text: string): string | null {
  const id = matchTemplate(text);
  if (!id) return null;
  const keyHit = /(?:giọng|tông|key)\s+([A-G][#b]?m?)/i.exec(text);
  if (!keyHit) return null;
  const raw = keyHit[1]!;
  const minor = /m$/i.test(raw);
  const tonic = raw.replace(/m$/i, "");
  const t = TEMPLATES[id]!;
  const chords = t.degrees.map((d) => spell(d.roman, d.quality, tonic, minor || id === "ii-v-mau"));
  return `${t.label} (${raw}): ${chords.join(" ")}`;
}
