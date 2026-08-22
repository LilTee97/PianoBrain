import fs from "node:fs";
import path from "node:path";
import { parseAllDocuments } from "yaml";
import { resolveRepoRoot } from "../kb/load.js";
import type { ItemType, KnowledgeItem, SourceRecord } from "../kb/types.js";
import { validateAll } from "../kb/validate.js";
import { slug } from "./importMaster.js";

/**
 * Nạp bộ bài JAZZ SCALES (4 bài, chỉ có video) vào kho.
 *
 * Kho này CỘNG THÊM cạnh thầy Hải, không thay thầy: mọi item mang teacher_id
 * `jazz-scales` và style tag `jazz`, không bao giờ `pop_ballad` hay `hai-joseph`.
 *
 * Ba chỗ cố tình KHÔNG lấy từ kho master:
 *  - `supporting_sources` trỏ tới `jazz_scales_guide.pdf` và mấy pdf tương tự:
 *    không có file PDF nào trong kho master, đó là thứ bộ trích xuất tự dựng.
 *    Nguồn ở đây là video, và chỉ video.
 *  - `url` của bài 2-4 là `example_...` / `...placeholder`: địa chỉ bịa, để null.
 *  - `confidence` khác `direct` thì item không được `origin: extracted`.
 */
const TEACHER_ID = "jazz-scales";

const LESSONS = Array.from({ length: 23 }, (_, i) => `JazzScales_Bai_${String(i + 1).padStart(2, "0")}`);

const PITCH: Record<string, number> = {
  C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, Fb: 4, "E#": 5,
  F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11, Cb: 11,
};

interface Row {
  item_id: string;
  type: string;
  raw_text: string;
  confidence?: string;
  source_ref?: { timestamp_start?: string; timestamp_end?: string };
  music_entities?: { chords?: string[]; scales?: string[]; styles?: string[] };
  observed_example?: {
    chord_symbol?: string;
    notes?: string[];
    hands?: { left?: string[]; right?: string[] };
  };
}

/**
 * Đưa mốc về "mm:ss".
 *
 * Kho master ghi ba kiểu khác nhau cho cùng một thứ: "mm:ss", "00:mm:ss", và
 * (bài 7) "mm:ss:00" tức phút:giây:hình. Bài dài nhất trong bộ là 17:46 nên
 * không bài nào chạm mốc một giờ — cụm ba số mà số cuối là "00" thì đó là hình,
 * không phải giây.
 */
const mmss = (t?: string): string | null => {
  if (!t) return null;
  const p = t.split(":");
  if (p.length !== 3) return t;
  if (p[0] === "00") return `${p[1]}:${p[2]}`;
  if (p[2] === "00") return `${p[0]}:${p[1]}`;
  return t;
};

/** Nốt của gam ghi trần (C, Eb) chứ không kèm quãng tám (C4) — dấu hiệu đây là gam, không phải thế bấm. */
const isScaleSpelling = (notes: string[]) =>
  notes.length >= 6 && notes.every((n) => PITCH[n] !== undefined);

/** Bỏ nốt gốc khỏi ký hiệu hợp âm: "Cmaj7" -> "maj7", "Cmin7" -> "m7". */
function quality(symbol: string): string | null {
  const m = /^([A-G][#b]?)\s*(.*)$/.exec(symbol.trim());
  if (!m) return null;
  const rest = m[2]
    .replace(/\s+/g, "")
    // Bài 3 viết "Ami7", "GMa7", "EmiMa7" — cùng chất, khác cách viết.
    .replace(/^min?(?=[^a-z]|$)/i, "m")
    .replace(/Ma(?=j|7)/g, "maj");
  return rest === "" ? "maj" : rest;
}

/**
 * Số ngón **có thật trong bài giảng**, không phải quy ước tự đặt.
 *
 * Bài 21 ghi thẳng từng ngón cho từng nốt: `notes` là bảy nốt của gam, còn
 * `hands.right` là bảy con số `1 2 1 2 3 4 1`. Đó là thế ngón thầy đàn trên
 * video, đọc thẳng ra được.
 *
 * Chỉ nhận khi **số ngón khớp số nốt** và mọi con số nằm trong 1-5. Thiếu một
 * con số là bảng ngón không đọc được, và đoán bù vào là bịa.
 */
function fingeringOf(row: Row): Record<string, unknown> | null {
  const notes = row.observed_example?.notes ?? [];
  const right = row.observed_example?.hands?.right ?? [];
  if (notes.length === 0 || right.length !== notes.length) return null;
  if (!right.every((f) => /^[1-5]$/.test(f))) return null;

  return {
    fingering: {
      hand: "RH",
      notes,
      fingers: right.map(Number),
      scale: row.music_entities?.scales?.[0] ?? null,
    },
  };
}

function typeOf(row: Row): ItemType {
  // Dòng nào ghi số ngón thì đó là item thế ngón, dù bộ trích xuất gọi nó là gì.
  if (fingeringOf(row)) return "fingering";
  if (row.type === "rule_candidate" || row.type === "warning") return "rule";
  if (row.type === "concept" || row.type === "chord") return "concept";
  if (row.type === "scale") return "scale";
  if (row.type === "voicing") return "voicing";
  // Bài tập / khuôn: người dùng chốt "scale khi có nốt gam, arpeggio khi là arp".
  if (/arpeggi|rải|thể đảo|inversion/i.test(row.raw_text)) return "arpeggio";
  if (isScaleSpelling(row.observed_example?.notes ?? [])) return "scale";
  return row.type === "exercise" ? "exercise" : "accompaniment";
}

/** Nốt gốc ghi ngay trong tên gam: "C Bebop Dominant" -> "C". Tên không nêu gốc thì null. */
const rootOfScaleName = (name?: string): string | null =>
  /^([A-G][#b]?)\s+\S/.exec(name?.trim() ?? "")?.[1] ?? null;

/** Nốt gốc của ký hiệu hợp âm: "Cmaj7" -> "C", "F#m7b5" -> "F#". */
const rootOfChord = (symbol: string): string | null =>
  /^([A-G][#b]?)/.exec(symbol.trim())?.[1] ?? null;

/**
 * Dòng này có đang TRÌNH BÀY một thang âm không — hay chỉ tình cờ liệt kê nốt?
 *
 * Bộ trích xuất đổ mọi nốt nghe thấy vào cùng một trường, nên một câu lick hay
 * một vòng hợp âm cũng ra một danh sách tên nốt trông y hệt một gam. Nhận bừa
 * thì kho có "D Bebop Scale" gồm 9 nốt vốn là câu ii-V-I chép lại, và bộ chọn
 * gam sau này sẽ đem nó ra đàn.
 *
 * Bốn điều kiện, phải đủ cả bốn:
 *  1. bài giảng có gọi tên một thang âm;
 *  2. dòng đó là dòng giảng gam (định nghĩa / khái niệm / quy tắc), không phải
 *     câu mẫu, bài tập hay thế bấm — câu nhạc là ĐƯỜNG ĐI trên gam, không phải gam;
 *  3. 5 đến 9 bậc khác nhau;
 *  4. không bậc nào cách bậc kề quá một quãng ba thứ. Gam thì đi từng bước;
 *     nhảy xa hơn nghĩa là đang đọc một hợp âm rải chứ không phải một gam;
 *  5. không lớp cao độ nào lặp lại **ở giữa** danh sách. Người ta đánh gam thì
 *     mỗi bậc một lần, cùng lắm quay về nốt gốc ở cuối để đóng quãng tám. Lặp ở
 *     giữa nghĩa là bộ trích xuất đã nối gam với một thứ khác — bài 9 mốc
 *     06:48 là đúng như vậy: gam altered bị nối thêm nốt của hợp âm đích, ra
 *     một "gam" chín bậc không có thật.
 */
const SCALE_ROWS = new Set(["scale", "concept", "rule_candidate", "warning"]);

function looksLikeScale(row: Row, semitones: number[], notes: readonly string[]): boolean {
  if (!row.music_entities?.scales?.[0]) return false;
  if (!SCALE_ROWS.has(row.type)) return false;
  if (semitones.length < 5 || semitones.length > 9) return false;

  // Lặp lớp cao độ ở giữa danh sách: đây không phải một gam chạy liền.
  const seen = new Set<number>();
  for (const [at, name] of notes.entries()) {
    const pc = ((PITCH[name] % 12) + 12) % 12;
    if (seen.has(pc) && at < notes.length - 1) return false;
    seen.add(pc);
  }

  for (let at = 0; at < semitones.length; at += 1) {
    const next = at + 1 < semitones.length ? semitones[at + 1] : semitones[0] + 12;
    if (next - semitones[at] > 3) return false;
  }
  return true;
}

function scaleOutput(row: Row): Record<string, unknown> | null {
  const notes = row.observed_example?.notes ?? [];
  if (!isScaleSpelling(notes)) return null;

  /*
    Dòng kể nhiều tên gam mà tên đầu không nêu nốt gốc thì bỏ tên đi.

    Bảng tổng kết của bài 1 kể bốn gam một lượt ("maj7 -> Lydian; m7 -> Dorian;
    ...") nhưng chỉ đàn thị phạm một gam. Lấy bừa tên đầu là dán nhãn "Lydian"
    lên bộ nốt của gam nửa giảm.
  */
  const names = row.music_entities?.scales ?? [];
  const name = names.length > 1 && !rootOfScaleName(names[0]) ? null : (names[0] ?? null);
  /*
    Gốc lấy từ TÊN gam trước, chỉ khi tên không nêu mới lấy nốt đầu.

    Bài 5 chạy "C Bebop Dominant" nhưng bắt đầu từ nốt bậc 3 (E) để nốt hợp âm
    rơi vào phách mạnh. Lấy nốt đầu làm gốc thì ra một gam rooted E hoàn toàn
    khác — đúng nốt, sai gốc, và mọi phép dịch giọng sau đó đều lệch.
  */
  const rootName = rootOfScaleName(name ?? undefined) ?? notes[0];
  const root = PITCH[rootName];

  /*
    Chất hợp âm mà gam này thật sự chơi ĐƯỢC: chỉ những hợp âm dựng trên chính
    nốt gốc của gam.

    Bài giảng hay kể tên hợp âm phụ làm mẹo nhớ ("C Dorian = F7 + Gm") hoặc kể
    hợp âm nguồn gốc ("Half-Whole trên G7, dựng từ Bdim7"). Gom hết vào thì
    bộ chọn gam sẽ dịch bậc của gam B lên nốt gốc G — sai hẳn nốt.
  */
  const forQualities = [
    ...new Set(
      (row.music_entities?.chords ?? [])
        .filter((c) => {
          const r = rootOfChord(c);
          return r !== null && PITCH[r] === root;
        })
        .map(quality)
        .filter((q): q is string => q !== null),
    ),
  ];

  const semitones = [
    ...new Set(notes.map((n) => (((PITCH[n] - root) % 12) + 12) % 12)),
  ].sort((a, b) => a - b);

  /*
    Gam phải **chứa chính nốt gốc của nó**.

    Bài 19 có một dòng đặt tên là "C minor melodic ascending" nhưng nốt đàn ra
    bắt đầu từ Sol (`G Ab Bb B Db Eb F`) — lời giảng nói rõ là thang âm **G**.
    Lấy nốt gốc theo tên thì ra một bộ bậc không có bậc 0, tức một "thang âm"
    không đi qua chính nốt gốc mình. Đó là dấu chắc chắn của trích xuất lệch, và
    nhận nó vào là mọi phép dịch giọng sau đó sai theo.
  */
  if (semitones[0] !== 0) return null;
  if (!looksLikeScale(row, semitones, notes)) return null;

  return {
    scale: {
      name,
      root: rootName,
      /** Nốt như thầy đàn trên video, giữ nguyên thứ tự kể cả khi chạy đi xuống. */
      note_names: notes,
      /** Tập bậc đã xếp tăng dần và bỏ trùng — đây mới là thứ dịch giọng được. */
      semitones_from_root: semitones,
      for_qualities: forQualities,
      use_when: (row.music_entities?.chords ?? []).map((c) => `hợp âm ${c}`),
    },
  };
}

/**
 * Bốn thể đảo của một hợp âm, tách từ chuỗi nốt bài giảng đàn ra.
 *
 * Bài 3 dạy từng hợp âm qua bốn thể đảo, và bộ trích xuất ghi cả bốn thành một
 * chuỗi mười sáu nốt liền: `A3 C4 E4 G4 | C4 E4 G4 A4 | E4 G4 A4 C5 | G4 A4 C5
 * E5`. Đọc bằng mắt thì thấy ngay bốn cụm, nhưng máy thì không — nó chỉ thấy
 * mười sáu số.
 *
 * Cắt theo **bốn nốt một cụm**, và chỉ nhận khi chia chẵn: chuỗi mười sáu nốt
 * là bốn thể đảo, chuỗi độ dài khác là một câu nhạc chứ không phải bảng thể đảo.
 */
function inversionsOf(row: Row): Record<string, unknown> | null {
  const notes = row.observed_example?.notes ?? [];
  if (notes.length !== 16) return null;
  if (!notes.every((n) => /^[A-G][#b]?-?\d$/.test(n))) return null;
  if (!/thể đảo|inversion/i.test(row.raw_text)) return null;

  const shapes: string[][] = [];
  for (let at = 0; at < 16; at += 4) shapes.push(notes.slice(at, at + 4));

  return {
    arpeggio: {
      chord_symbol: row.observed_example?.chord_symbol ?? null,
      inversions: shapes,
      note: "bốn thể đảo, cắt từ chuỗi nốt bài giảng đàn ra; không thêm nốt nào",
    },
  };
}

interface Built {
  item: KnowledgeItem;
  dir: string;
}

const DIRS: Partial<Record<ItemType, string>> = {
  fingering: "knowledge/concepts/fingerings",
  scale: "knowledge/concepts/scales",
  arpeggio: "knowledge/concepts/arpeggios",
  concept: "knowledge/concepts",
  voicing: "knowledge/concepts/voicings",
  exercise: "knowledge/patterns/accompaniment",
  accompaniment: "knowledge/patterns/accompaniment",
  rule: "knowledge/rules",
};

/**
 * Đọc source map của một bài.
 *
 * Mười ba bài do mười ba lượt trích xuất khác nhau sinh ra, nên không bài nào
 * giống bài nào: có bài bọc cả tệp trong hàng rào ```yaml, có bài ngăn nhiều
 * tài liệu bằng `---`, có bài lồng mọi thứ dưới `lesson_source_map:`. Gỡ hàng
 * rào, gộp mọi tài liệu, rồi mở lớp vỏ nếu tệp chỉ có đúng một khoá gốc.
 */
function readSourceMap(file: string): Record<string, unknown> {
  const text = fs
    .readFileSync(file, "utf8")
    .replace(/^\s*```[a-z]*\s*$/gm, "");
  const merged = Object.assign(
    {},
    ...parseAllDocuments(text).map((d) => d.toJS()),
  ) as Record<string, unknown>;
  const keys = Object.keys(merged);
  if (keys.length === 1 && merged[keys[0]] && typeof merged[keys[0]] === "object") {
    return merged[keys[0]] as Record<string, unknown>;
  }
  return merged;
}

/** Giá trị đầu tiên trong cây khớp tên khoá. Duyệt theo bề rộng nên khoá nông thắng khoá sâu. */
function findKey(root: unknown, key: RegExp): string | undefined {
  const queue: unknown[] = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (!node || typeof node !== "object") continue;
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      if (typeof v === "string" && key.test(k)) return v;
    }
    queue.push(...Object.values(node as Record<string, unknown>));
  }
  return undefined;
}

/** Bản ghi video gốc: nút đầu tiên có id video, bỏ qua mọi nút PDF. */
function findVideo(root: unknown): { id?: string; url?: string } | undefined {
  const queue: unknown[] = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (!node || typeof node !== "object") continue;
    const rec = node as Record<string, unknown>;
    const id = [rec.source_id, rec.id, rec.video_id, rec.primary_source, rec.primary_source_id].find(
      (v): v is string => typeof v === "string" && /vid|video/i.test(v),
    );
    if (id) return { id, url: typeof rec.url === "string" ? rec.url : undefined };
    queue.push(...Object.values(rec));
  }
  return undefined;
}

/** Tên bài. `lesson_title` cũng tính, `pdf ... title` thì không. */
const findTitle = (root: unknown): string | undefined => findKey(root, /^(lesson_)?title$/);

function build(row: Row, sourceId: string, lessonNo: number, seq: number, vietnamese: boolean): Built | null {
  // Luật người dùng: chỉ `direct` mới được extracted. Mờ mờ thì không nhận là của nguồn.
  if (row.confidence && row.confidence !== "direct") return null;

  const type = typeOf(row);
  const chords = row.music_entities?.chords ?? [];
  const scaleName = row.music_entities?.scales?.[0] ?? null;
  const qualities = [...new Set(chords.map(quality).filter((q): q is string => q !== null))];

  const head =
    type === "scale" && scaleName
      ? `Gam ${scaleName}${chords.length > 0 ? ` cho hợp âm ${chords[0]}` : ""}`
      : row.raw_text.split(/(?<=[.:])\s/)[0].slice(0, 96);

  /*
    `use_when` là chỗ Mr Hai tra: câu hỏi "scale nào trên Cmaj7 jazz" chỉ khớp khi
    cả ba chữ cùng nằm trong tên / ghi chú / use_when của item. Nên liệt kê thẳng
    từng ký hiệu hợp âm, kèm cả chữ "gam" lẫn "scale" — người học gõ cả hai kiểu.
  */
  const use_when = [
    ...chords.slice(0, 8).map((c) => `Ngẫu hứng jazz trên hợp âm ${c}`),
    qualities.length > 0
      ? `Chọn gam / scale khi gặp hợp âm ${qualities.join(", ")} trong nhạc jazz`
      : "Chọn gam / scale để ngẫu hứng jazz",
  ];

  /*
    Item thế ngón phải **tự nói nó là thế ngón**.

    Bản đầu cho chúng dùng chung `use_when` của item gam, nên hỏi "ngón bebop
    dominant" hay "whole tone bấm thế nào" là trượt sạch: trong cả item không có
    một chữ "ngón" nào để bắt.
  */
  if (type === "fingering") {
    const named = row.music_entities?.scales?.[0] ?? "gam";
    use_when.length = 0;
    use_when.push(
      `Tìm số ngón, thế ngón tay phải để chạy ${named}`,
      `Hỏi ${named} bấm thế nào, đặt ngón ra sao`,
    );
  }

  const locator = (() => {
    const a = mmss(row.source_ref?.timestamp_start);
    const b = mmss(row.source_ref?.timestamp_end);
    return a && b ? `${a}-${b}` : a;
  })();

  const id = slug(
    `${sourceId}-${String(seq).padStart(2, "0")}-${scaleName ?? row.observed_example?.chord_symbol ?? type}`,
  );

  const item: KnowledgeItem = {
    id,
    type,
    name: head,
    difficulty: 3,
    source: {
      teacher_id: TEACHER_ID,
      source_id: sourceId,
      locator,
      // PDF chống lưng trong kho master là thứ bộ trích xuất tự dựng — nguồn này chỉ có video.
      supporting: [],
    },
    use_when,
    avoid_when: [
      "Đệm hát ballad Việt — đây là gam jazz, không phải bài của thầy Hải Joseph",
    ],
    input: {
      ...(qualities.length > 0 ? { chord_quality: qualities } : {}),
      style: ["jazz"],
    },
    output: {
      ...(scaleOutput(row) ?? {}),
      ...(inversionsOf(row) ?? {}),
      ...(fingeringOf(row) ?? {}),
      ...(row.observed_example?.chord_symbol ? { chord_symbol: row.observed_example.chord_symbol } : {}),
      ...(row.observed_example?.notes?.length ? { notes: row.observed_example.notes } : {}),
      source_text: row.raw_text,
    },
    origin: "extracted",
    status: "draft",
    note_vi:
      `Bài ${lessonNo} của nguồn Jazz Scales (YouTube), mốc ${locator ?? "chưa rõ"}. ` +
      `${row.raw_text} ` +
      (vietnamese ? "" : "Nguồn giảng bằng tiếng Anh, câu trên giữ nguyên lời giảng. ") +
      "Item còn draft: chưa ai xem lại video để đối chiếu.",
  };

  return { item, dir: DIRS[type] ?? "knowledge/concepts" };
}

/**
 * Đọc bảng kiến thức của một bài.
 *
 * Vài bài **không có** `merged_source_knowledge.jsonl` riêng — bộ trích xuất để
 * luôn mấy dòng jsonl bên trong `merged_analysis.md`, giữa một hàng rào ```json.
 * Bỏ qua mấy bài ấy là mất hẳn hai bài giảng chỉ vì file đặt sai chỗ.
 */
/** Xuống dòng kiểu Windows lẫn Unix. */
const SPLIT_LINES = /\r?\n/;

function readRows(dir: string): Row[] {
  const parse = (text: string): Row[] =>
    text
      .split(SPLIT_LINES)
      .map((l) => l.trim())
      .filter((l) => l.startsWith("{") && l.includes('"source_ref"'))
      .flatMap((l) => {
        try {
          return [JSON.parse(l) as Row];
        } catch {
          return [];
        }
      });

  const own = path.join(dir, "merged_source_knowledge.jsonl");
  if (fs.existsSync(own)) {
    const rows = parse(fs.readFileSync(own, "utf8"));
    if (rows.length > 0) return rows;
  }

  const analysis = path.join(dir, "merged_analysis.md");
  return fs.existsSync(analysis) ? parse(fs.readFileSync(analysis, "utf8")) : [];
}

/**
 * Địa chỉ YouTube trong kho master phần lớn là bịa; chỉ nhận cái trông như thật.
 *
 * Mã video YouTube là **đúng 11 ký tự** trong bảng chữ cái an toàn cho URL. Bản
 * lọc trước chỉ chặn chữ "example" và "placeholder", nên `?v=JazzScales_Bai_05`
 * và `?v=jazz_scales_007` lọt thẳng vào kho — hai địa chỉ dẫn tới hư không mà
 * trông như dẫn chứng thật. Chỉ đếm ký tự cũng chưa đủ: `example_l04` đúng
 * mười một ký tự. Nên chặn cả bằng chữ lẫn bằng hình dạng.
 */
const realUrl = (u?: string): string | null => {
  if (typeof u !== "string") return null;
  if (/example|placeholder|jazz.?scales/i.test(u)) return null;
  const id = /[?&]v=([^&]+)/.exec(u)?.[1];
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? u : null;
};

/**
 * Tên file mp4 thật trong thư mục bài giảng.
 *
 * Kho master để **hai** cây thư mục: `sources/lessons/` chứa kết quả trích xuất
 * (jsonl, yaml), còn `modules/JazzScales/lessons/` chứa chính file video. Bản
 * nạp đầu tiên chỉ đọc cây thứ nhất, nên tiêu đề nguồn lấy từ metadata do bộ
 * trích xuất tự đặt — có bài ra `video_20250226_090520_616.mp4`, có bài ra một
 * cái tên chẳng trùng tên video nào. Người rà cầm cái tên ấy đi tìm video thì
 * không tìm ra.
 */
function realVideo(root: string, folder: string): string | null {
  const dir = path.join(root, "modules", "JazzScales", "lessons", folder.replace("JazzScales_", ""));
  if (!fs.existsSync(dir)) return null;
  return fs.readdirSync(dir).find((name) => name.toLowerCase().endsWith(".mp4")) ?? null;
}

function main(): void {
  const from = process.argv.slice(2).find((a) => !a.startsWith("-")) ?? process.env.PIANOBRAIN_JAZZ_SCALES;
  if (!from) {
    console.error("Chưa biết kho master ở đâu. Đặt PIANOBRAIN_JAZZ_SCALES hoặc: npm run import:jazz -- <thu-muc-lessons>");
    process.exit(1);
  }
  const repo = resolveRepoRoot();
  const today = new Date().toISOString().slice(0, 10);

  const sources: SourceRecord[] = [];
  const built: Built[] = [];

  LESSONS.forEach((folder, index) => {
    const dir = path.join(from, folder);
    const lessonNo = index + 1;
    const sourceId = `jazz-scales-bai-${String(lessonNo).padStart(2, "0")}`;
    const mapFile = path.join(dir, "lesson_source_map.yaml");
    const map = fs.existsSync(mapFile) ? readSourceMap(mapFile) : {};
    const video = findVideo(map);
    const videoId = video?.id ?? "";
    const title = findTitle(map) ?? folder;

    /*
      Tiêu đề nguồn = **tên file mp4 có thật**, tìm ở cây thư mục video.

      Không tìm thấy file thì mới lùi về tên trong metadata, và đánh dấu để
      người rà biết chỗ ấy chưa chỉ tới được video nào.
    */
    const mp4 = realVideo(path.resolve(from, "..", "..", ".."), folder);
    sources.push({
      source_id: sourceId,
      teacher_id: TEACHER_ID,
      kind: "video",
      title: mp4 ?? (videoId.endsWith(".mp4") ? videoId : title),
      url: realUrl(video?.url),
      ingested_at: today,
      course_id: "jazz_scales_001",
      lesson_id: findKey(map, /^lesson_id$/) ?? folder,
      ...(mp4 ? {} : { source_map_missing_video: true }),
    });

    const rows = readRows(dir);
    const vietnamese = /[ăâđêôơư]/i.test(rows.map((r) => r.raw_text).join(" "));
    rows.forEach((row, seq) => {
      const b = build(row, sourceId, lessonNo, seq + 1, vietnamese);
      if (b) built.push(b);
    });
  });

  // Id trùng thì thêm đuôi, đừng để file sau đè file trước.
  const seen = new Set<string>();
  for (const b of built) {
    let id = b.item.id;
    for (let n = 2; seen.has(id); n += 1) id = `${b.item.id}-${n}`;
    seen.add(id);
    b.item.id = id;
  }

  const teacher: KnowledgeItem = {
    id: TEACHER_ID,
    type: "teacher",
    name: "Jazz Scales (YouTube)",
    difficulty: 3,
    source: null,
    use_when: ["Người học hỏi chọn gam / scale hoặc rải arpeggio để ngẫu hứng jazz"],
    avoid_when: [
      "Câu hỏi về đệm hát ballad Việt — đó là phần của thầy Hải Joseph, không phải nguồn này",
    ],
    input: { style: ["jazz"] },
    output: {
      declared_focus: ["chord-scale", "arpeggio", "walking bass jazz", "ngẫu hứng"],
      language: "en+vi",
      ingested_sources: sources.length,
    },
    origin: "derived",
    status: "draft",
    note_vi:
      "Bốn bài giảng jazz trên YouTube, gom dưới một nguồn vì kho master không tách kênh. " +
      "Bài 1 Julian Bradley (Jazz Tutorial), bài 2 Jonny May, bài 3 Oliver Prehn (NewJazz), bài 4 Noah Kellman — " +
      "tên giảng viên ghi ở đây để không ai đọc nhầm thành một người. " +
      "Nguồn này đứng CẠNH thầy Hải Joseph, không thay: item của nó luôn mang teacher_id 'jazz-scales' và style 'jazz'.",
  };

  // Ghi đĩa.
  fs.writeFileSync(
    path.join(repo, "knowledge", "teachers", `${TEACHER_ID}.json`),
    JSON.stringify(teacher, null, 2) + "\n",
    "utf8",
  );

  /*
    Giữ lại **kết quả rà của người** trước khi ghi đè.

    Bản trước ghi thẳng `status: "draft"` cho mọi item và xoá cả thư mục cũ, nên
    chạy lại bộ nạp là **xoá sạch công rà**: 28 item đã đối chiếu với video quay
    về draft trong một lệnh, không cảnh báo gì. Đó là mất dữ liệu người, không
    phải mất dữ liệu máy — bộ nạp dựng lại được, người rà thì không.

    Nốt và mốc vẫn lấy từ kho master như thường; chỉ `status` và dấu vết người rà
    trong `note_vi` là giữ nguyên.
  */
  const reviewed = new Map<string, { status: KnowledgeItem["status"]; mark: string | null }>();

  /*
    Sổ rà nằm ngoài item, và được commit.

    Trước đây lượt rà chỉ sống trong chính file item. Một lần chạy sai đối số —
    bộ nạp nhận `JazzScales_Bai_16` làm đường dẫn kho, đọc ra 0 dòng — vẫn xoá
    hết thư mục item rồi ghi lại 0 file, và 43 lượt rà tay biến mất không dấu
    vết. Chúng chưa từng được commit nên git cũng không lấy lại được.

    Sổ này khiến lượt rà thành thứ **git giữ**, độc lập với việc nạp lại kho.
  */
  const ledgerFile = path.join(repo, "ingest", "jazz-scales-review.json");
  if (fs.existsSync(ledgerFile)) {
    const doc = JSON.parse(fs.readFileSync(ledgerFile, "utf8")) as {
      reviewed: Record<string, { status: KnowledgeItem["status"]; mark: string | null }>;
    };
    for (const [id, entry] of Object.entries(doc.reviewed ?? {})) reviewed.set(id, entry);
  }

  for (const dir of new Set(Object.values(DIRS))) {
    const base = path.join(repo, dir!);
    if (!fs.existsSync(base)) continue;
    for (const name of fs.readdirSync(base)) {
      if (!/^jazz-scales-bai-\d\d$/.test(name)) continue;
      for (const file of fs.readdirSync(path.join(base, name))) {
        if (!file.endsWith(".json")) continue;
        const old = JSON.parse(fs.readFileSync(path.join(base, name, file), "utf8")) as KnowledgeItem;
        if (old.status === "draft") continue;
        reviewed.set(old.id, {
          status: old.status,
          mark: /\[RÀ TAY:[^\]]*\]/.exec(old.note_vi)?.[0] ?? null,
        });
      }
    }
  }

  for (const b of built) {
    const kept = reviewed.get(b.item.id);
    if (!kept) continue;
    b.item.status = kept.status;
    if (kept.mark) b.item.note_vi = `${b.item.note_vi} ${kept.mark}`;
  }
  if (reviewed.size > 0) {
    console.log(`giữ nguyên ${reviewed.size} item đã có người rà`);
  }

  /*
    Không dựng được item nào thì **không xoá gì cả**.

    Xoá rồi ghi lại là đúng khi có cái để ghi lại. Khi bảng kiến thức đọc ra
    rỗng — sai đường dẫn kho, kho chưa mount, file hỏng — thì cùng một dòng lệnh
    ấy biến thành lệnh xoá sạch. Đó chính là cách 43 lượt rà tay mất.
  */
  if (built.length === 0) {
    console.error(
      [
        `Không đọc được item nào từ ${from}`,
        `Đối số là ĐƯỜNG DẪN tới thư mục lessons của kho master, không phải tên bài.`,
        `Kho trong repo giữ nguyên, không xoá gì.`,
      ].join(String.fromCharCode(10)),
    );
    process.exit(1);
  }

  // Xoá thư mục item của chính nguồn này trước khi ghi lại: chạy lần hai mà id
  // đổi thì file cũ ở lại kho như kiến thức thật, không ai biết nó đã chết.
  for (const dir of new Set(Object.values(DIRS))) {
    const base = path.join(repo, dir!);
    if (!fs.existsSync(base)) continue;
    for (const name of fs.readdirSync(base)) {
      if (/^jazz-scales-bai-\d\d$/.test(name)) fs.rmSync(path.join(base, name), { recursive: true });
    }
  }

  for (const b of built) {
    const outDir = path.join(repo, b.dir, b.item.source!.source_id);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${b.item.id}.json`), JSON.stringify(b.item, null, 2) + "\n", "utf8");
  }

  // Ghi lại sổ rà từ chính kho vừa ghi, để lượt rà mới cũng vào git.
  const ledger: Record<string, { status: KnowledgeItem["status"]; mark: string | null }> = {};
  for (const b of built) {
    if (b.item.status === "draft") continue;
    ledger[b.item.id] = {
      status: b.item.status,
      mark: /\[RÀ TAY:[^\]]*\]/.exec(b.item.note_vi)?.[0] ?? null,
    };
  }
  fs.mkdirSync(path.dirname(ledgerFile), { recursive: true });
  fs.writeFileSync(ledgerFile, JSON.stringify({ reviewed: ledger }, null, 2) + String.fromCharCode(10), "utf8");

  const indexFile = path.join(repo, "sources", "index.json");
  const doc = JSON.parse(fs.readFileSync(indexFile, "utf8")) as { sources: SourceRecord[] };
  doc.sources = [...doc.sources.filter((s) => !sources.some((n) => n.source_id === s.source_id)), ...sources];
  fs.writeFileSync(indexFile, JSON.stringify(doc, null, 2) + "\n", "utf8");

  const res = validateAll([teacher, ...built.map((b) => b.item)], {
    sources: doc.sources,
    teacherIds: [TEACHER_ID],
  });
  if (!res.ok) {
    console.error(res.errors.join("\n"));
    process.exit(1);
  }

  const byType = new Map<string, number>();
  for (const b of built) byType.set(b.item.type, (byType.get(b.item.type) ?? 0) + 1);
  console.log(`${built.length} item · ${sources.map((s) => s.source_id).join(", ")}`);
  console.log([...byType].map(([t, n]) => `${t} ${n}`).join(" · "));
}

main();
