import fs from "node:fs";
import path from "node:path";
import { loadKnowledgeBase, resolveRepoRoot } from "../kb/load.js";
import { SHAPES } from "./auditJazzScales.js";
import type { KnowledgeBase, KnowledgeItem } from "../kb/types.js";

/**
 * Vòng rà bộ gam jazz: mở video, tua tới mốc, gõ một lệnh.
 *
 * `status: "validated"` nghĩa là **có người đã đối chiếu lại nguồn**. Máy không
 * xem được video nên máy không đặt được cờ ấy — nhưng máy làm được mọi việc còn
 * lại: tìm đúng file video, in đúng mốc, in bộ nốt cần đối chiếu, rồi ghi kết
 * quả vào file. Người rà chỉ còn phải nghe và trả lời có hay không.
 *
 * ```
 * npm run review:jazz                  # danh sách còn phải rà, kèm đường dẫn video
 * npm run review:jazz -- <id>          # xem kỹ một item
 * npm run review:jazz -- --ok <id>     # khớp video: đóng dấu validated
 * npm run review:jazz -- --no <id> "…" # sai: đóng dấu rejected, ghi lý do
 * ```
 */

const VIDEO_ROOT = "modules/JazzScales/lessons";

/** Kho master nằm ngoài repo — đường dẫn qua biến môi trường, không viết cứng. */
const MASTER = process.env.PIANOBRAIN_JAZZ_SCALES_MASTER ?? "D:/PianoBrain-sources/jazz-scales";

/** Đường dẫn file video của một bài, tìm trong kho master. */
function videoPath(master: string, sourceId: string): string | null {
  const folder = `Bai_${sourceId.slice(-2)}`;
  const dir = path.join(master, VIDEO_ROOT, folder);
  if (!fs.existsSync(dir)) return null;
  const file = fs.readdirSync(dir).find((name) => name.toLowerCase().endsWith(".mp4"));
  return file ? path.join(dir, file) : null;
}

/** File JSON của một item, tìm bằng chính id. */
function fileOf(repo: string, id: string): string | null {
  const walk = (dir: string): string | null => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) {
        const found = walk(full);
        if (found) return found;
      } else if (name === `${id}.json`) {
        return full;
      }
    }
    return null;
  };
  return walk(path.join(repo, "knowledge"));
}

const NOTE_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

/** Bậc của thang âm trưởng — mốc để so, vì ai học nhạc cũng thuộc nó. */
const MAJOR = new Set([0, 2, 4, 5, 7, 9, 11]);

/**
 * **Nốt quyết định** của một gam: chỗ nó khác thang âm trưởng cùng nốt gốc.
 *
 * Đây là mẹo của người đàn lâu năm, và nó rút ngắn việc rà rất nhiều: không ai
 * đối chiếu bảy nốt một lượt. Người ta nhìn đúng **một hai nốt làm nên tính
 * cách** của gam — Lydian thì bậc 4 thăng, Dorian thì bậc 6 tự nhiên trên nền
 * thứ, Bebop Dominant thì có cả bậc 7 giáng lẫn bậc 7 tự nhiên. Thấy nốt ấy
 * trên phím đàn hay trên khuông nhạc là biết ngay khớp hay không; không thấy
 * thì mới cần xem kỹ.
 *
 * So với thang âm trưởng vì đó là cái mốc ai cũng thuộc, không phải vì thang âm
 * trưởng có vai trò gì đặc biệt ở đây.
 */
function tellTale(
  semitones: readonly number[],
  root: string,
  spelling: readonly string[] = [],
): string {
  const rootPc = NOTE_NAMES.indexOf(root) >= 0
    ? NOTE_NAMES.indexOf(root)
    : { "C#": 1, "D#": 3, "F#": 6, "G#": 8, "A#": 10, Cb: 11, Fb: 4 }[root] ?? 0;

  const odd = semitones.filter((step) => !MAJOR.has(step));
  const missing = [...MAJOR].filter((step) => !semitones.includes(step));

  /*
    Viết nốt theo **đúng cách nguồn viết**, không quy về giáng hết.

    Fa thăng và Sol giáng cùng một phím, nhưng người đọc bản nhạc tìm "F#" mà
    thấy in "Gb" thì khựng lại — nhất là khi chính chỗ ấy là nốt phải đối chiếu.
  */
  const asWritten = new Map<number, string>();
  for (const name of spelling) {
    const pc = NOTE_NAMES.indexOf(name) >= 0
      ? NOTE_NAMES.indexOf(name)
      : { "C#": 1, "D#": 3, "F#": 6, "G#": 8, "A#": 10, Cb: 11, Fb: 4, "E#": 5, "B#": 0 }[name];
    if (pc !== undefined && !asWritten.has(pc)) asWritten.set(pc, name);
  }

  const spell = (steps: number[]) =>
    steps
      .map((step) => asWritten.get((rootPc + step) % 12) ?? NOTE_NAMES[(rootPc + step) % 12])
      .join(" ");

  const parts: string[] = [];
  if (odd.length > 0) parts.push(`CÓ ${spell(odd)}`);
  if (missing.length > 0 && missing.length <= 3) parts.push(`KHÔNG có ${spell(missing)}`);
  return parts.join("  ·  ") || "đúng thang âm trưởng";
}

interface Scale {
  name?: string | null;
  root?: string;
  note_names?: string[];
  semitones_from_root?: number[];
  for_qualities?: string[];
}

const scaleOf = (item: KnowledgeItem): Scale | undefined =>
  (item.output as { scale?: Scale }).scale;

/** Item nào thuộc vòng rà này: gam jazz mà bộ chọn gam thật sự dùng tới. */
const inScope = (item: KnowledgeItem) =>
  item.source?.teacher_id === "jazz-scales" &&
  (scaleOf(item)?.for_qualities?.length ?? 0) > 0;

/** Luật nối chất hợp âm với một item thang âm — xem `rule-hai-triad-pentatonic`. */
interface ChordScaleMap {
  chord_quality: string[];
  scale_item: string;
}

/**
 * Item **luật** rà khác item gam: không có bộ nốt của riêng nó.
 *
 * Luật chỉ trỏ tới item thang âm khác, nên thứ người rà phải xác nhận là **cách
 * đọc lời thầy**, không phải nốt. In ra câu thầy nói, mốc của câu ấy, và luật
 * suy ra cái gì từ đó.
 */
function showRule(item: KnowledgeItem, kb: KnowledgeBase): void {
  const map = (item.output as { chord_scale_map?: ChordScaleMap[] }).chord_scale_map ?? [];

  console.log(`
${item.id}   [${item.status}]  — item LUẬT, không phải item gam`);
  console.log(`  ${item.name}`);
  console.log(`  nguồn     ${item.source?.teacher_id ?? "(không gán thầy)"} · ${item.source?.source_id ?? "—"}`);
  console.log(`  MỐC       ${item.source?.locator ?? "không có mốc"}`);
  console.log(`  luật nói  ${(item.output as { if?: string }).if} -> ${(item.output as { then?: string }).then}`);

  for (const entry of map) {
    const target = kb.byId.get(entry.scale_item);
    const scale = target ? scaleOf(target) : undefined;
    console.log(
      `    hợp âm ${entry.chord_quality.join(", ").padEnd(14)} -> ${scale?.note_names?.join(" ") ?? "?"}`,
    );
    console.log(`      nốt lấy từ ${entry.scale_item} (${target?.status}, mốc ${target?.source?.locator})`);
  }

  console.log(`
  PHẢI XÁC NHẬN: nghe ở mốc trên xem thầy có nói đúng ý luật này không.`);
  console.log(`  Nốt thì thầy đã dạy thật rồi — thứ chưa ai kiểm là CÁCH ĐỌC lời thầy.`);
}

function show(item: KnowledgeItem, master: string, kb: KnowledgeBase): void {
  const scale = scaleOf(item);
  if (!scale) {
    showRule(item, kb);
    return;
  }
  const video = videoPath(master, item.source!.source_id);

  console.log(`\n${item.id}   [${item.status}]`);
  console.log(`  gam       ${scale.name} — gốc ${scale.root}`);
  console.log(`  nốt       ${scale.note_names?.join(" ")}`);
  console.log(`  bậc       ${scale.semitones_from_root?.join(" ")}`);
  console.log(`  dùng cho  ${scale.for_qualities?.join(", ")}`);
  console.log(`  NGHE RA   ${tellTale(scale.semitones_from_root ?? [], scale.root ?? "C", scale.note_names ?? [])}`);
  console.log(`  MỐC       ${item.source!.locator}`);
  console.log(`  video     ${video ?? "KHÔNG TÌM THẤY FILE"}`);
  console.log(`  lời gốc   ${String((item.output as { source_text?: string }).source_text ?? "").slice(0, 150)}`);
}

/**
 * Ghi lượt rà vào sổ ngoài item — thứ git giữ được.
 *
 * Lượt rà chỉ sống trong file item là đã mất một lần: một lệnh nạp sai đối số
 * xoá thư mục item rồi ghi lại rỗng, và 43 lượt đối chiếu video biến mất không
 * dấu vết vì chưa từng được commit. Sổ này đứng ngoài vòng nạp, nên nạp lại kho
 * bao nhiêu lần cũng không đụng tới nó.
 */
function ghiSo(repo: string, id: string, status: KnowledgeItem["status"], reason: string | null): void {
  const file = path.join(repo, "ingest", "jazz-scales-review.json");
  const doc = fs.existsSync(file)
    ? (JSON.parse(fs.readFileSync(file, "utf8")) as { reviewed: Record<string, unknown> })
    : { reviewed: {} };
  doc.reviewed[id] = { status, mark: reason ? `[RÀ TAY: ${reason}]` : null };
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + String.fromCharCode(10), "utf8");
}

/**
 * Câu hỏi riêng cho từng chỗ máy ngờ.
 *
 * Câu hỏi chung — "thầy có dạy đúng thế này không" — quá rộng để trả lời nhanh.
 * Mỗi kiểu ngờ có một chỗ nhìn khác nhau: sai số nốt thì nhìn xem thầy chạy gam
 * hay bấm hợp âm rải; lệch bậc thì nghe đúng một nốt; lạ tên thì nghe thầy gọi
 * nó là gì. Hỏi đúng chỗ ấy thì rà xong một mục trong một lần tua.
 */
function cauHoi(scale: Scale): { ngo: string; hoi: string[]; lyDo: string } | null {
  const name = scale.name ?? "";
  const degrees = scale.semitones_from_root ?? [];
  const known = SHAPES.find(([pattern]) => pattern.test(name));

  if (!name) return null;
  if (!known) {
    return {
      ngo: `tên gam "${name}" không có trong bảng định nghĩa`,
      hoi: [
        `Ở mốc trên, thầy GỌI gam này là gì?`,
        `  - thầy gọi đúng tên trên, và đàn đúng bộ nốt trên  -> --ok`,
        `  - thầy gọi tên khác  -> --no, ghi tên thầy gọi vào lý do`,
      ],
      lyDo: "thầy gọi tên khác",
    };
  }
  if (known[1].length !== degrees.length) {
    return {
      ngo: `${degrees.length} nốt, mà "${name}" phải ${known[1].length} nốt`,
      hoi: [
        `Ở mốc trên, thầy chạy một GAM (nốt liền bậc, lên hoặc xuống),`,
        `hay bấm một HỢP ÂM RẢI (nốt cách quãng)?`,
        `  - gam, và đếm đủ ${known[1].length} nốt  -> --ok`,
        `  - hợp âm rải, hoặc đếm ra ${degrees.length} nốt  -> --no`,
      ],
      lyDo: `thầy rải hợp âm chứ không chạy gam; ${degrees.length} nốt không phải ${known[1].length}`,
    };
  }
  const thieu = known[1].filter((d) => !degrees.includes(d));
  const thua = degrees.filter((d) => !known[1].includes(d));
  if (thieu.length > 0) {
    /*
      Gọi thẳng tên nốt, không gọi "bậc cách gốc mấy nửa cung". Người ngồi trước
      đàn tìm nốt Si, không tìm "bậc cách gốc mười một nửa cung" — bắt họ đếm
      nửa cung là thêm một bước dịch giữa câu hỏi và cái phím họ phải nhìn.
    */
    const rootPc = NOTE_NAMES.indexOf(scale.root ?? "C");
    const spell = (steps: number[]) =>
      steps.map((s) => NOTE_NAMES[((rootPc < 0 ? 0 : rootPc) + s) % 12]).join(" ");
    return {
      ngo: `đủ số nốt nhưng lệch chỗ: kho ghi ${spell(thua)} ở chỗ đáng lẽ là ${spell(thieu)}`,
      hoi: [
        `Đếm từ nốt gốc ${scale.root}. Ở mốc trên thầy đàn nốt nào:`,
        `  - nốt ${spell(thieu)}  -> kho đang SAI, cho --no`,
        `  - nốt ${spell(thua)}  -> kho ghi đúng lời thầy, cho --ok`,
      ],
      lyDo: `thầy đàn nốt ${spell(thieu)}, kho ghi nốt ${spell(thua)}`,
    };
  }
  return null;
}

/**
 * Hiện **một** mục cần rà, kèm mốc, câu hỏi và hai lệnh trả lời.
 *
 * Rà từng mục một chứ không đổ cả danh sách: người rà tua một chỗ, trả lời một
 * câu, rồi mục kế tự hiện. Danh sách dài chỉ có ích lúc lập kế hoạch, còn lúc
 * đang ngồi trước video thì nó làm lạc chỗ đang xem.
 */
function buoc(kb: KnowledgeBase, master: string): void {
  const scope = kb.items.filter(inScope);
  const todo = scope.filter((i) => i.status === "draft");
  if (todo.length === 0) {
    console.log(`\nHết mục cần rà. ${scope.filter((i) => i.status === "validated").length}/${scope.length} item đã có người rà.`);
    return;
  }
  const item = todo[0];
  const scale = scaleOf(item)!;
  const q = cauHoi(scale);
  const line = "─".repeat(64);

  console.log(`\n${line}`);
  console.log(`MỤC 1/${todo.length}   ${item.id}\n`);
  console.log(`  video    ${videoPath(master, item.source!.source_id) ?? "KHÔNG TÌM THẤY"}`);
  console.log(`  MỐC      ${item.source!.locator}\n`);
  console.log(`  kho nói  ${scale.name} — ${scale.semitones_from_root?.length} nốt`);
  console.log(`           ${scale.note_names?.join(" ")}`);
  console.log(`  dùng cho ${scale.for_qualities?.join(", ")}\n`);
  if (q) {
    console.log(`  MÁY NGỜ  ${q.ngo}\n`);
    console.log(`  CÂU HỎI`);
    for (const dong of q.hoi) console.log(`    ${dong}`);
  } else {
    console.log(`  CÂU HỎI`);
    console.log(`    Thầy có đàn đúng bộ nốt trên, và có gắn nó vào chất hợp âm trên không?`);
  }
  console.log(`\n  TRẢ LỜI`);
  console.log(`    khớp   npm run review:jazz -- --ok ${item.id}`);
  console.log(`    sai    npm run review:jazz -- --no ${item.id} "${q?.lyDo ?? "lý do"}"`);
  console.log(`\n  Không chắc thì bỏ qua — để nguyên draft là sự thật, không mất gì.`);
  console.log(`  Trả lời xong, mục kế tự hiện.`);
  console.log(line);
}

function mark(id: string, status: "validated" | "rejected", reason: string | null): void {
  const repo = resolveRepoRoot();
  const file = fileOf(repo, id);
  if (!file) {
    console.error(`Không có item nào tên "${id}".`);
    process.exit(1);
  }

  const item = JSON.parse(fs.readFileSync(file, "utf8")) as KnowledgeItem;
  if (item.origin !== "extracted") {
    // Luật chống bịa: chỉ thứ rút từ nguồn thật mới được mang cờ validated.
    console.error(`${id} có origin "${item.origin}", không phải extracted — không đóng dấu được.`);
    process.exit(1);
  }

  item.status = status;
  if (status === "rejected" && reason) {
    item.note_vi = `${item.note_vi} [RÀ TAY: ${reason}]`;
  }
  fs.writeFileSync(file, JSON.stringify(item, null, 2) + "\n", "utf8");
  ghiSo(repo, id, status, reason);
  console.log(`${id} → ${status}${reason ? ` (${reason})` : ""}`);
  console.log(`Đã ghi vào ${path.relative(repo, file)}. Chạy \`npm test\` để chắc kho vẫn hợp lệ.`);
  buoc(loadKnowledgeBase(), MASTER);
}

/**
 * In phiếu rà ra file, xếp theo bài — vì cái tốn là mở video, không phải kiểm nốt.
 *
 * Người rà cầm một tờ, mở một video, tua theo mốc từ trên xuống. Ba thứ trên
 * mỗi dòng đúng bằng ba câu hỏi của vòng rà: **đếm** (số nốt), **nghe ra** (nốt
 * quyết định), **dùng cho** (chất hợp âm thầy có gắn hay không).
 *
 * Số nốt in đậm vì đó là bước loại nhanh nhất: sai số nốt là hỏng ngay, khỏi
 * xét hai câu còn lại.
 */
/**
 * Chỗ máy đã ngờ, in ngay cạnh dòng cần rà.
 *
 * Bảng `SHAPES` nói mỗi tên gam phải có bộ bậc nào. Item tự mâu thuẫn với chính
 * tên nó — "Dominant Bebop Scale" mà chỉ có sáu bậc — thì loại được **không cần
 * mở video**, vì bước đếm nốt đã đủ. Đó là bước rẻ nhất trong ba bước rà, nên
 * để nó chạy trước mắt người rà chứ không bắt người rà tự phát hiện.
 */
function nghiNgo(scale: Scale): string | null {
  const name = scale.name ?? "";
  const degrees = scale.semitones_from_root ?? [];
  if (!name) return null;
  const known = SHAPES.find(([pattern]) => pattern.test(name));
  if (!known) return `tên gam "${name}" không có trong bảng định nghĩa — phải xem video mới biết`;
  if (known[1].length !== degrees.length) {
    return `**${degrees.length} nốt, mà "${name}" phải ${known[1].length} nốt — sai đếm, cho \`--no\` được ngay, khỏi mở video**`;
  }
  const missing = known[1].filter((d) => !degrees.includes(d));
  if (missing.length > 0) return `bậc lệch định nghĩa: thiếu ${missing.join(" ")}, đủ số nốt nhưng khác chỗ — xem kỹ`;
  return null;
}

/**
 * Thứ tự rà: theo **chỗ trống bài ấy lấp**, không theo số bài.
 *
 * Xếp theo số item thì bài nào nhiều dòng nhất lên đầu — hợp lý khi rà cả kho từ
 * đầu, vì mỗi lần mở video đổi được nhiều lượt nhất. Nhưng khi kho đã rà gần hết
 * và chỉ còn mấy bài mới, thứ đáng lên đầu là bài **lấp được chỗ đang câm**.
 *
 * Rà một bài cho `m6` là một chất hợp âm hết câm. Rà một bài dạy lại gam kho đã
 * có thì chỉ thêm một phiếu bầu cho thứ vốn đã đứng vững.
 */
const UU_TIEN: [RegExp, string][] = [
  [/-bai-(30|32)-/, "m6 — kho trống hẳn chất này, và hai bài này gắn thẳng for_qualities m6"],
  [/-bai-(28|29)-/, "dim — gam giảm; coi chừng item chỉ nói về dim7, chất ấy đã có gam"],
  [/(ku-teo|lop-nhac)/, "add9 / madd9 — hai kênh Việt; cái kho trống là bản THỨ, madd9"],
  [/-bai-(24|25)-/, "sus4 — coi chừng 7sus: chất ấy đã có gam, cái trống là sus4 TRƠN"],
  [/-bai-31-/, "chung — không thuộc bốn chất trống, để cuối"],
];

/** Bài này lấp chỗ nào; null nghĩa là bài cũ, đã rà xong từ đợt trước. */
const chotrong = (id: string): string | null =>
  UU_TIEN.find(([pattern]) => pattern.test(id))?.[1] ?? null;

/** Thứ hạng để xếp: bài mới lên trước, theo đúng thứ tự UU_TIEN. */
const hang = (id: string): number => {
  const at = UU_TIEN.findIndex(([pattern]) => pattern.test(id));
  return at < 0 ? UU_TIEN.length : at;
};

function phieu(scope: KnowledgeItem[], master: string, repo: string): void {
  const byLesson = new Map<string, KnowledgeItem[]>();
  for (const item of scope) {
    const key = item.source!.source_id;
    byLesson.set(key, [...(byLesson.get(key) ?? []), item]);
  }
  /*
    Bài mới lên trước, xếp theo chỗ trống nó lấp. Bài cũ xếp sau, và trong nhóm
    cũ thì bài nhiều item đứng trước — một lần mở video đổi được nhiều lượt nhất.
  */
  const lessons = [...byLesson.entries()].sort((a, b) => {
    const ha = hang(a[1][0]!.id);
    const hb = hang(b[1][0]!.id);
    if (ha !== hb) return ha - hb;
    return b[1].length - a[1].length || a[0].localeCompare(b[0]);
  });

  const out: string[] = [
    "# Phiếu rà gam jazz",
    "",
    `${scope.length} item, ${lessons.length} bài.`,
    "",
    "**Chín bài mới xếp lên đầu**, theo chỗ trống mỗi bài lấp — không theo số bài",
    "và không theo số item. Rà một bài cho `m6` là một chất hợp âm hết câm; rà một",
    "bài dạy lại gam kho đã có thì chỉ thêm một phiếu bầu cho thứ vốn đã đứng vững.",
    "",
    "Bài cũ xếp sau, và trong nhóm cũ thì bài nhiều item đứng trước.",
    "Cách nhìn từng dòng: xem `ingest/RA-GAM-JAZZ.md`.",
    "",
    "Mỗi dòng ba câu hỏi, theo thứ tự rẻ dần:",
    "",
    "1. **đếm** — thầy đàn đúng bấy nhiêu nốt không. Sai là hỏng ngay, khỏi xét tiếp.",
    "2. **nghe ra** — nốt quyết định có ở đó không.",
    "3. **dùng cho** — thầy có gắn gam này vào chất hợp âm ấy không, hay bộ trích xuất tự suy.",
    "",
    "Câu 3 là chỗ sai nhiều nhất. Thầy chỉ đàn gam mà không nhắc hợp âm nào thì cho `--no`.",
    "Xem rồi vẫn không chắc thì **để nguyên draft** — đó là sự thật, và không mất gì.",
    "",
  ];

  for (const [sourceId, items] of lessons) {
    const video = videoPath(master, sourceId);
    const lap = chotrong(items[0]!.id);
    out.push(`## ${sourceId} — ${items.length} item`);
    out.push("");
    if (lap) {
      out.push(`> **Lấp chỗ:** ${lap}`);
      out.push("");
    }
    out.push(video ? `Video: \`${video}\`` : "**KHÔNG TÌM THẤY FILE VIDEO**");
    out.push("");
    for (const item of items.sort((a, b) => (a.source!.locator ?? "").localeCompare(b.source!.locator ?? ""))) {
      const scale = scaleOf(item)!;
      const degrees = scale.semitones_from_root ?? [];
      const tale = tellTale(degrees, scale.root ?? "C", scale.note_names ?? []);
      out.push(`- [ ] **${item.source!.locator}** · ${scale.name} · **${degrees.length} nốt**`);
      out.push(`  - \`${scale.note_names?.join(" ")}\` — nghe ra: ${tale}`);
      out.push(`  - dùng cho: ${scale.for_qualities?.join(", ")}`);
      const ngo = nghiNgo(scale);
      if (ngo) out.push(`  - MÁY NGỜ: ${ngo}`);
      out.push(`  - \`npm run review:jazz -- --ok ${item.id}\``);
    }
    out.push("");
  }

  const file = path.join(repo, "ingest", "phieu-ra-gam-jazz.md");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out.join("\n") + "\n", "utf8");
  console.log(`Phiếu ${scope.length} item ghi vào ${path.relative(repo, file)}`);
  console.log(`Sai thì:  npm run review:jazz -- --no <id> "lý do"`);
}

function main(): void {
  const args = process.argv.slice(2);
  const master = MASTER;

  /*
    `--ok` nhận nhiều id: rà xong cả một bài thì đóng dấu cả bài trong một lệnh.
    `--no` vẫn một id, vì nó còn phải kèm lý do — mà lý do thì mỗi item một khác.
  */
  const flag = args.find((a) => a === "--ok" || a === "--no");
  if (flag) {
    const rest = args.slice(args.indexOf(flag) + 1);
    if (rest.length === 0) {
      console.error(`Thiếu id. Ví dụ: npm run review:jazz -- ${flag} jazz-scales-bai-02-02-c-lydian`);
      process.exit(1);
    }
    if (flag === "--no") {
      mark(rest[0], "rejected", rest[1] ?? null);
      return;
    }
    for (const id of rest.filter((a) => !a.startsWith("-"))) mark(id, "validated", null);
    return;
  }

  const kb = loadKnowledgeBase();
  const scope = kb.items.filter(inScope);
  /*
    Phiếu in **cả 43 item**, kể cả cái đã rà — người rà cần thấy trọn bài mình
    đang xem, và một item đã đóng dấu vẫn có thể bị lật lại khi xem kỹ hơn.
  */
  if (args.includes("--tiep")) {
    buoc(kb, master);
    return;
  }

  if (args.includes("--phieu")) {
    phieu(scope, master, resolveRepoRoot());
    return;
  }

  const one = args.find((a) => !a.startsWith("-"));

  if (one) {
    const item = scope.find((i) => i.id === one) ?? kb.byId.get(one);
    if (!item) {
      console.error(`Không có item nào tên "${one}".`);
      process.exit(1);
    }
    show(item, master, kb);
    console.log(`\n  khớp video  →  npm run review:jazz -- --ok ${item.id}`);
    console.log(`  không khớp  →  npm run review:jazz -- --no ${item.id} "lý do"`);
    return;
  }

  const todo = scope.filter((item) => item.status === "draft");
  const done = scope.filter((item) => item.status === "validated");

  console.log(`Gam jazz bộ chọn đang dùng: ${scope.length} item.`);
  console.log(`Đã rà ${done.length}, còn ${todo.length}.\n`);

  // Gom theo bài, vì rà theo bài thì chỉ mở mỗi video một lần.
  const byLesson = new Map<string, KnowledgeItem[]>();
  for (const item of todo) {
    const key = item.source!.source_id;
    byLesson.set(key, [...(byLesson.get(key) ?? []), item]);
  }

  for (const [sourceId, items] of [...byLesson].sort()) {
    const video = videoPath(master, sourceId);
    console.log(`── ${sourceId} — ${items.length} item`);
    console.log(`   ${video ?? "KHÔNG TÌM THẤY FILE VIDEO"}`);
    for (const item of items.sort((a, b) => (a.source!.locator ?? "").localeCompare(b.source!.locator ?? ""))) {
      const scale = scaleOf(item)!;
      console.log(
        `   ${(item.source!.locator ?? "").padEnd(13)} ${String(scale.name).padEnd(24)} ${scale.note_names?.join(" ")}`,
      );
      console.log(`       nghe ra: ${tellTale(scale.semitones_from_root ?? [], scale.root ?? "C", scale.note_names ?? [])}`);
      console.log(`       dùng cho ${scale.for_qualities?.join(", ")}  ·  ${item.id}`);
    }
    console.log("");
  }

  if (todo.length > 0) {
    console.log(`Rà một item:  npm run review:jazz -- ${todo[0].id}`);
  }
}

main();
