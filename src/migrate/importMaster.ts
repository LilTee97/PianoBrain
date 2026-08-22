import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { resolveRepoRoot } from "../kb/load.js";
import type { Coverage, ItemType, KnowledgeItem, SourceRecord, SupportingRef } from "../kb/types.js";
import { validateAll } from "../kb/validate.js";

const TEACHER_ID = "hai-joseph";

/** Kho master có 170+ tag tự do. Chỉ gom về 3 tag Mr Hai thật sự lọc theo. */
const STYLE_HINTS: [RegExp, string][] = [
  [/ballad|bolero|slow ?rock/i, "pop_ballad"],
  [/jazz|swing|bossa|blues/i, "jazz"],
  [/pop|contemporary/i, "pop"],
];

/** type của tầng source knowledge (all_source_knowledge.jsonl). */
const MASTER_TYPES: Record<string, { type: ItemType; dir: string }> = {
  concept: { type: "concept", dir: "knowledge/concepts" },
  chord: { type: "concept", dir: "knowledge/concepts/chords" },
  tension: { type: "concept", dir: "knowledge/concepts/chords" },
  progression: { type: "concept", dir: "knowledge/concepts/chords" },
  style: { type: "style", dir: "knowledge/styles" },
  scale: { type: "scale", dir: "knowledge/concepts/scales" },
  voicing: { type: "voicing", dir: "knowledge/concepts/voicings" },
  exercise: { type: "exercise", dir: "knowledge/patterns/accompaniment" },
  // ponytail: master gộp mọi khuôn đệm vào "pattern". Rà từng bài rồi tách fill/bass/comping.
  pattern: { type: "accompaniment", dir: "knowledge/patterns/accompaniment" },
  rule_candidate: { type: "rule", dir: "knowledge/rules" },
  harmony_rule: { type: "rule", dir: "knowledge/rules" },
  warning: { type: "rule", dir: "knowledge/rules" },
};

/** type của tầng đã hình thức hóa (rules/*.json|yaml, patterns/*.json). */
const FORMAL_TYPES: Record<string, { type: ItemType; dir: string }> = {
  bass_pattern: { type: "accompaniment", dir: "knowledge/patterns/accompaniment" },
  comping_pattern: { type: "accompaniment", dir: "knowledge/patterns/accompaniment" },
  rhythmic_pattern: { type: "accompaniment", dir: "knowledge/patterns/accompaniment" },
  melodic_pattern: { type: "fill", dir: "knowledge/patterns/fills" },
  note_running_pattern: { type: "fill", dir: "knowledge/patterns/fills" },
  voicing_movement_pattern: { type: "voicing", dir: "knowledge/concepts/voicings" },
};

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export interface MasterRow {
  item_id: string;
  course_id: string;
  module_id: string;
  lesson_folder: string;
  lesson_id: string;
  source_id: string;
  timestamp_start: string | null;
  timestamp_end: string | null;
  pdf_page: number | null;
  supporting_sources: SupportingRef[];
  type: string;
  raw_text: string;
  music_entities: {
    chords?: string[];
    tensions?: string[];
    keys?: string[];
    scales?: string[];
    styles?: string[];
  };
  observed_example: unknown;
  confidence: string;
  status: string;
}

export interface FormalRow {
  rule_id?: string;
  pattern_id?: string;
  rule_type?: string;
  type?: string;
  name?: string;
  description?: string;
  applies_when?: Record<string, unknown>;
  action?: unknown;
  avoid_when?: unknown[];
  formula?: unknown;
  example?: unknown;
  transformations?: unknown;
  source_refs?: {
    lesson_folder?: string;
    timestamp_start?: string | null;
    timestamp_end?: string | null;
    pdf_page?: number | null;
    note?: string | null;
  }[];
  confidence: string;
  status: string;
}

export type Converted = { item: KnowledgeItem; dir: string; id: string } | { skip: string; id: string };

/** Một dòng all_rule_candidates.yaml. Tầng thô, tên field không thống nhất. */
export type Candidate = Record<string, unknown>;

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Candidate nào nói tới số ngón thì item đó là thế ngón, không phải rule chung. */
export function fingeringOf(cand?: Candidate): Record<string, unknown> | null {
  if (!cand) return null;
  for (const key of ["implementation", "execution", "constraints"]) {
    const block = cand[key];
    if (isObj(block) && Object.keys(block).some((k) => /finger/i.test(k))) return block;
  }
  return null;
}

/**
 * Bản chuẩn hóa để trống mốc thời gian ở 16 rule, nhưng tầng thô có — dưới 4 tên field khác nhau.
 * Vớt lại chứ không để item extracted đứng không nguồn.
 */
export function locatorFromCandidate(cand?: Candidate): string | null {
  for (const key of ["source_ref", "source_reference", "source"]) {
    const ref = cand?.[key];
    if (!isObj(ref)) continue;
    const time = ref.timestamp ?? ref.video_timestamp ?? null;
    const span =
      typeof time === "string"
        ? time.replace(/\s*-\s*/, "-")
        : typeof ref.timestamp_start === "string"
          ? `${ref.timestamp_start}${ref.timestamp_end ? `-${ref.timestamp_end}` : ""}`
          : null;
    const page = ref.pdf_page;
    const pageText = typeof page === "number" ? `pdf p.${page}` : typeof page === "string" ? page : null;
    const parts = [span, pageText].filter(Boolean);
    if (parts.length > 0) return parts.join(" ");
  }
  const list = cand?.sources;
  if (Array.isArray(list)) {
    for (const ref of list) {
      if (isObj(ref) && Array.isArray(ref.timestamps) && ref.timestamps.length > 0) {
        return String(ref.timestamps[0]);
      }
    }
  }
  return null;
}

/** Bản chuẩn hóa rỗng thì lấy chữ từ tầng thô. Không bỏ item chỉ vì description trống. */
function textFrom(cand?: Candidate): string {
  for (const key of ["statement", "summary", "title", "name", "description", "explanation"]) {
    const v = cand?.[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

function styleTags(tags: string[]): string[] {
  const out = new Set<string>();
  for (const tag of tags) {
    for (const [re, mapped] of STYLE_HINTS) if (re.test(tag)) out.add(mapped);
    out.add(slug(tag));
  }
  return [...out].filter(Boolean);
}

const stamp = (start?: string | null, end?: string | null, page?: number | null) => {
  const parts: string[] = [];
  if (start) parts.push(end ? `${start}-${end}` : start);
  if (page != null) parts.push(`pdf p.${page}`);
  return parts.length > 0 ? parts.join(" ") : null;
};

/**
 * Kho cũ và kho master đều không ghi độ khó. Mọi item chuyển sang đều là 3.
 * ponytail: chỉnh tay khi rà từng bài, đừng đoán bằng heuristic.
 */
const DEFAULT_DIFFICULTY = 3;

/** needs_human_review giữ lại thành draft — không vứt, cũng không tự duyệt hộ. */
function statusOf(row: { status: string; confidence: string }): KnowledgeItem["status"] | null {
  if (row.status === "rejected") return "rejected";
  if (row.status === "needs_human_review") return "draft";
  if (row.status === "approved" || row.status === "extracted") {
    return row.confidence === "direct" ? "validated" : "draft";
  }
  return null;
}

/** Một dòng all_source_knowledge.jsonl thành một knowledge item, giữ đủ trường. */
export function convertMaster(row: MasterRow): Converted {
  const id = slug(`${row.lesson_folder}_${row.item_id}`);
  const mapped = MASTER_TYPES[row.type];
  if (!mapped) return { skip: `type lạ: ${row.type}`, id };
  const text = (row.raw_text ?? "").trim();
  if (!text) return { skip: "không có raw_text", id };
  const status = statusOf(row);
  if (!status) return { skip: `status lạ: ${row.status}`, id };

  const e = row.music_entities ?? {};
  const useWhen: string[] = [];
  if (e.chords?.length) useWhen.push(`Hợp âm: ${e.chords.join(", ")}`);
  if (e.keys?.length) useWhen.push(`Giọng: ${e.keys.join(", ")}`);
  if (e.scales?.length) useWhen.push(`Gam: ${e.scales.join(", ")}`);
  if (e.tensions?.length) useWhen.push(`Nốt màu: ${e.tensions.join(", ")}`);
  if (e.styles?.length) useWhen.push(`Điệu / phong cách: ${e.styles.join(", ")}`);
  if (useWhen.length === 0) useWhen.push(`Theo bài ${row.lesson_folder}`);

  const styles = styleTags(e.styles ?? []);
  const item: KnowledgeItem = {
    id,
    type: mapped.type,
    name: text.split(/[;.]\s/)[0].slice(0, 120).trim(),
    difficulty: DEFAULT_DIFFICULTY,
    source: {
      teacher_id: TEACHER_ID,
      source_id: slug(row.lesson_folder),
      locator: stamp(row.timestamp_start, row.timestamp_end, row.pdf_page),
      media_id: row.source_id ?? null,
      supporting: row.supporting_sources ?? [],
    },
    use_when: useWhen,
    // Master gắn nhãn "warning" cho điều thầy dặn tránh — đưa thẳng vào avoid_when.
    avoid_when: row.type === "warning" ? [text] : [],
    input: {
      ...(e.chords?.length ? { chord_quality: e.chords } : {}),
      ...(styles.length > 0 ? { style: styles } : {}),
    },
    output: {
      stage: "source_knowledge",
      master_type: row.type,
      raw_text: text,
      music_entities: e,
      observed_example: row.observed_example ?? null,
    },
    origin: "extracted",
    status,
    note_vi: text,
  };
  return { item, dir: mapped.dir, id };
}

/** Một rule / pattern đã hình thức hóa thành một knowledge item. */
/** Id dạng Tap_02_Bai_03_rule_xxx đã nói rõ bài. Dùng khi source_refs trống. */
export const lessonFromId = (id: string): string => /^(Tap_\d+_Bai_\d+)/.exec(id)?.[1] ?? "";

export function convertFormal(row: FormalRow, cand?: Candidate, reviewReason?: string): Converted {
  const rawId = row.rule_id ?? row.pattern_id ?? "";
  const id = slug(rawId);
  if (!id) return { skip: "thiếu id", id: "<no id>" };
  const ref = row.source_refs?.[0] ?? {};
  // 70 rule không có source_refs nhưng id đã mang tên bài — đừng vứt chúng.
  const lesson = ref.lesson_folder ?? lessonFromId(rawId);
  if (!lesson) return { skip: "không biết thuộc bài nào", id };
  const isRule = row.rule_id != null;
  const mapped = isRule ? { type: "rule" as ItemType, dir: "knowledge/rules" } : FORMAL_TYPES[row.type ?? ""];
  if (!mapped) return { skip: `type lạ: ${row.type}`, id };
  const note =
    (row.description ?? row.name ?? "").trim() ||
    textFrom(cand) ||
    (cand ? "(bản chuẩn hóa rỗng — xem output.candidate)" : "");
  if (!note) return { skip: "không có mô tả và không có candidate", id };
  const status = statusOf(row);
  if (!status) return { skip: `status lạ: ${row.status}`, id };

  const applies = row.applies_when ?? {};
  const quality = applies.chord_quality;
  const useWhen: string[] = [];
  const add = (label: string, key: string) => {
    const v = applies[key];
    if (typeof v === "string" && v.trim()) useWhen.push(`${label}: ${v}`);
  };
  add("Hợp âm", "chord_symbol");
  add("Chất hợp âm", "chord_quality");
  add("Chức năng hợp âm", "chord_function");
  add("Giọng", "key_context");
  add("Vòng hợp âm", "progression_context");
  add("Giai điệu", "melody_context");
  add("Vị trí câu", "phrase_position");
  const tags = (applies.style_tags as string[] | null) ?? [];
  if (tags.length > 0) useWhen.push(`Điệu / phong cách: ${tags.join(", ")}`);
  if (useWhen.length === 0) useWhen.push(`Theo bài ${lesson}`);

  const styles = styleTags(tags);
  const locator = stamp(ref.timestamp_start, ref.timestamp_end, ref.pdf_page) ?? locatorFromCandidate(cand);
  const fingering = fingeringOf(cand);
  const place = fingering
    ? { type: "fingering" as ItemType, dir: "knowledge/concepts/fingerings" }
    : mapped;
  const item: KnowledgeItem = {
    id,
    type: place.type,
    // rule_type kiểu "voicing_choice" là tên máy, người học đọc không hiểu.
    // Thứ tự: tên thật -> tóm tắt ở tầng thô -> mệnh đề đầu của mô tả -> mới tới rule_type.
    name: (
      row.name ??
      (typeof cand?.summary === "string" ? cand.summary : null) ??
      note.split(/[;.]\s/)[0].slice(0, 120) ??
      row.rule_type ??
      id
    ).trim(),
    difficulty: DEFAULT_DIFFICULTY,
    source: {
      teacher_id: TEACHER_ID,
      source_id: slug(lesson),
      locator,
      ...(locator ? {} : { locator_note: ref.note ?? "kho gốc không ghi mốc cho rule này" }),
      // Một rule hay được thầy nhắc ở nhiều đoạn. Giữ hết, đừng lấy mỗi cái đầu.
      extra_locators: (row.source_refs ?? [])
        .slice(1)
        .map((r) => stamp(r.timestamp_start, r.timestamp_end, r.pdf_page))
        .filter((s): s is string => s !== null),
    },
    use_when: useWhen,
    avoid_when: (row.avoid_when ?? []).map(String).filter(Boolean),
    input: {
      ...(typeof quality === "string" && quality ? { chord_quality: [quality] } : {}),
      ...(styles.length > 0 ? { style: styles } : {}),
    },
    output: {
      ...(isRule
        ? { stage: "formalized", if: applies, then: { description: row.description, action: row.action }, enforced_by: null }
        : { stage: "formalized", formula: row.formula, example: row.example, transformations: row.transformations }),
      ...(cand ? { candidate: cand } : {}),
      ...(fingering ? { fingering } : {}),
      ...(reviewReason ? { review_reason: reviewReason } : {}),
    },
    origin: "extracted",
    status,
    note_vi: note,
  };
  return { item, dir: place.dir, id };
}

export function resolveMasterDir(override?: string): string {
  const dir = override ?? process.env.PIANOBRAIN_MASTER;
  if (!dir) {
    throw new Error(
      "Chưa biết kho master ở đâu. Đặt PIANOBRAIN_MASTER hoặc chạy: npm run import -- --from <thu-muc> <Tap_XX_Bai_YY>",
    );
  }
  const resolved = path.resolve(dir);
  if (!fs.existsSync(path.join(resolved, "knowledge_base", "master", "all_source_knowledge.jsonl"))) {
    throw new Error(`${resolved} không phải kho master (thiếu knowledge_base/master/all_source_knowledge.jsonl)`);
  }
  return resolved;
}

interface Corpus {
  master: MasterRow[];
  formal: FormalRow[];
  /** rule_id đã chuẩn hóa -> candidate thô */
  candidates: Map<string, Candidate>;
  /** id item -> lý do phải rà, lấy từ HUMAN_REVIEW_QUEUE */
  reasons: Map<string, string>;
  /** bài mà source map không có video id -> media_id không đáng tin */
  missingVideo: Set<string>;
  coverage: Coverage;
}

/** MISSING_OR_SKIPPED_LESSONS.md: gom tên bài dưới mỗi đề mục. */
function parseCoverage(md: string): Coverage {
  const blocks = md.split(/^## /m).slice(1);
  const section = (heading: string) => {
    const block = blocks.find((b) => b.startsWith(heading));
    return block ? [...block.matchAll(/^- `([^`]+)`/gm)].map((m) => m[1]) : [];
  };
  return { skipped: section("Skipped"), incomplete: section("Incomplete (parsed but not ready)") };
}

export function readCorpus(masterDir: string): Corpus {
  const masterFile = path.join(masterDir, "knowledge_base", "master", "all_source_knowledge.jsonl");
  const master = fs
    .readFileSync(masterFile, "utf8")
    .split(/\r?\n/)
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l) as MasterRow);

  const formal: FormalRow[] = [];
  const rulesDir = path.join(masterDir, "rules");
  formal.push(...(JSON.parse(fs.readFileSync(path.join(rulesDir, "approved_rules.json"), "utf8")) as FormalRow[]));
  // needs_review và rejected chỉ có bản YAML — không đọc thì mất 101 + 3 rule.
  for (const f of ["needs_review_rules.yaml", "rejected_rules.yaml"]) {
    const p = path.join(rulesDir, f);
    if (!fs.existsSync(p)) continue;
    const doc = parseYaml(fs.readFileSync(p, "utf8")) as { rules?: FormalRow[] } | FormalRow[] | null;
    const rules = Array.isArray(doc) ? doc : (doc?.rules ?? []);
    formal.push(...rules);
  }
  const patternsDir = path.join(masterDir, "patterns");
  for (const f of fs.readdirSync(patternsDir).filter((f) => f.endsWith(".json") && f !== "pattern_index.json")) {
    const doc = JSON.parse(fs.readFileSync(path.join(patternsDir, f), "utf8"));
    if (Array.isArray(doc)) formal.push(...(doc as FormalRow[]));
  }

  // Tầng thô: giữ implementation / execution / constraints / examples / conditions mà bản chuẩn hóa đánh rơi.
  const candidates = new Map<string, Candidate>();
  const candFile = path.join(masterDir, "knowledge_base", "master", "all_rule_candidates.yaml");
  if (fs.existsSync(candFile)) {
    const doc = parseYaml(fs.readFileSync(candFile, "utf8")) as { rules?: Candidate[] } | null;
    for (const c of doc?.rules ?? []) {
      const lesson = String(c.lesson_folder ?? "");
      const rid = String(c.rule_id ?? c.id ?? "");
      if (!rid) continue;
      candidates.set(slug(rid.startsWith("Tap_") ? rid : `${lesson}_${rid}`), c);
    }
  }

  // Lý do phải rà + cờ thiếu video.
  const reasons = new Map<string, string>();
  const missingVideo = new Set<string>();
  const queueFile = path.join(masterDir, "validation", "HUMAN_REVIEW_QUEUE.yaml");
  if (fs.existsSync(queueFile)) {
    const doc = parseYaml(fs.readFileSync(queueFile, "utf8")) as {
      queue?: { kind: string; lesson_folder: string; reason?: string; rule_id?: string; item_id?: string }[];
    } | null;
    for (const q of doc?.queue ?? []) {
      if (q.kind === "source_map_missing_video") {
        missingVideo.add(q.lesson_folder);
        continue;
      }
      const reason = `${q.kind}: ${q.reason ?? ""}`.trim();
      if (q.rule_id) reasons.set(slug(q.rule_id), reason);
      if (q.item_id) reasons.set(slug(`${q.lesson_folder}_${q.item_id}`), reason);
    }
  }

  const coverageFile = path.join(masterDir, "validation", "MISSING_OR_SKIPPED_LESSONS.md");
  const coverage = fs.existsSync(coverageFile)
    ? parseCoverage(fs.readFileSync(coverageFile, "utf8"))
    : { skipped: [], incomplete: [] };

  return { master, formal, candidates, reasons, missingVideo, coverage };
}

const lessonOfFormal = (r: FormalRow) =>
  r.source_refs?.[0]?.lesson_folder ?? lessonFromId(r.rule_id ?? r.pattern_id ?? "");

export function importLesson(
  lesson: string,
  masterDir: string,
  root = resolveRepoRoot(),
): { written: number; skipped: string[]; byStage: { source_knowledge: number; formalized: number } } {
  const { master, formal, candidates, reasons, missingVideo, coverage } = readCorpus(masterDir);
  const rows = master.filter((r) => r.lesson_folder === lesson);
  const formalRows = formal.filter((r) => lessonOfFormal(r) === lesson);
  if (rows.length === 0 && formalRows.length === 0) throw new Error(`Không có item nào của bài ${lesson}`);

  const skipped: string[] = [];
  const ready: { item: KnowledgeItem; dir: string }[] = [];
  const collect = (res: Converted) => {
    if ("skip" in res) skipped.push(`${res.id}: ${res.skip}`);
    else ready.push({ item: res.item, dir: res.dir });
  };
  for (const r of rows) collect(convertMaster(r));
  for (const r of formalRows) {
    const id = slug(r.rule_id ?? r.pattern_id ?? "");
    collect(convertFormal(r, candidates.get(id), reasons.get(id)));
  }

  // Hai tầng dùng chung id thì tầng master (đủ trường hơn) thắng, tầng kia gắn vào output.
  const merged = new Map<string, { item: KnowledgeItem; dir: string }>();
  for (const entry of ready) {
    const seen = merged.get(entry.item.id);
    if (!seen) {
      merged.set(entry.item.id, entry);
      continue;
    }
    const base = seen.item.output.stage === "source_knowledge" ? seen : entry;
    const other = base === seen ? entry : seen;
    base.item.output.formalized = other.item.output;
    // Master gọi mọi khuôn là "pattern"; tầng formalized biết đó là fill hay voicing. Lấy cái mịn hơn.
    if (base.item.output.master_type === "pattern" && other.item.type !== base.item.type) {
      base.item.type = other.item.type;
      base.dir = other.dir;
    }
    merged.set(entry.item.id, base);
  }
  const items = [...merged.values()];
  if (items.length === 0) return { written: 0, skipped, byStage: { source_knowledge: 0, formalized: 0 } };

  // Đăng ký nguồn TRƯỚC. Không có bản ghi nguồn thì validator từ chối mọi item extracted.
  const sourcesFile = path.join(root, "sources", "index.json");
  const sourcesJson = JSON.parse(fs.readFileSync(sourcesFile, "utf8")) as {
    sources: SourceRecord[];
  } & Record<string, unknown>;
  const sourceId = slug(lesson);
  const meta = rows[0];
  const record: SourceRecord = {
    source_id: sourceId,
    teacher_id: TEACHER_ID,
    kind: "lesson",
    title: lesson,
    url: null,
    ingested_at: new Date().toISOString().slice(0, 10),
    ...(meta ? { course_id: meta.course_id, module_id: meta.module_id, lesson_id: meta.lesson_id } : {}),
    ...(missingVideo.has(lesson) ? { source_map_missing_video: true } : {}),
  };
  const at = sourcesJson.sources.findIndex((s) => s.source_id === sourceId);
  if (at >= 0) sourcesJson.sources[at] = record;
  else sourcesJson.sources.push(record);
  sourcesJson.coverage = coverage;
  fs.writeFileSync(sourcesFile, `${JSON.stringify(sourcesJson, null, 2)}\n`, "utf8");

  const check = validateAll(
    items.map((r) => r.item),
    { sources: sourcesJson.sources, teacherIds: [TEACHER_ID] },
  );
  if (!check.ok) throw new Error(`Bài ${lesson} không qua validator:\n- ${check.errors.join("\n- ")}`);

  for (const { item, dir } of items) {
    const target = path.join(root, dir, sourceId);
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, `${item.id}.json`), `${JSON.stringify(item, null, 2)}\n`, "utf8");
  }
  return {
    written: items.length,
    skipped,
    byStage: {
      source_knowledge: items.filter((i) => i.item.output.stage === "source_knowledge").length,
      formalized: items.filter((i) => i.item.output.stage === "formalized").length,
    },
  };
}

export function listLessons(masterDir: string): [string, number, number][] {
  const { master, formal } = readCorpus(masterDir);
  const keys = new Set([...master.map((r) => r.lesson_folder), ...formal.map(lessonOfFormal)]);
  return [...keys]
    .filter(Boolean)
    .sort()
    .map((k) => [
      k,
      master.filter((r) => r.lesson_folder === k).length,
      formal.filter((r) => lessonOfFormal(r) === k).length,
    ]);
}

if (process.argv[1]?.includes("importMaster")) {
  const argv = process.argv.slice(2);
  const fromAt = argv.indexOf("--from");
  const masterDir = resolveMasterDir(fromAt >= 0 ? argv[fromAt + 1] : undefined);
  const rest = argv.filter((_, i) => fromAt < 0 || (i !== fromAt && i !== fromAt + 1));
  const root = resolveRepoRoot();
  const lesson = rest.find((a) => !a.startsWith("--"));

  if (rest.includes("--all")) {
    // Tap_05 bỏ theo yêu cầu; bài 0 item không có trong listLessons nên tự loại.
    const lessons = listLessons(masterDir).filter(([name, m, f]) => !name.startsWith("Tap_05") && m + f > 0);
    let total = 0;
    const allSkipped: string[] = [];
    for (const [name] of lessons) {
      const { written, skipped } = importLesson(name, masterDir, root);
      total += written;
      allSkipped.push(...skipped);
      console.log(`${name}: ${written} item`);
    }
    console.log(`
Tổng: ${lessons.length} bài, ${total} item. Bỏ qua ${allSkipped.length} item.`);
    const why = new Map<string, number>();
    for (const s of allSkipped) {
      const reason = s.split(": ").slice(1).join(": ");
      why.set(reason, (why.get(reason) ?? 0) + 1);
    }
    for (const [reason, n] of [...why].sort((a, b) => b[1] - a[1])) console.log(`  ${n} x ${reason}`);
  } else if (!lesson) {
    const done = new Set(
      (JSON.parse(fs.readFileSync(path.join(root, "sources", "index.json"), "utf8")).sources as SourceRecord[]).map(
        (s) => s.source_id,
      ),
    );
    for (const [name, m, f] of listLessons(masterDir)) {
      console.log(`${done.has(slug(name)) ? "x" : " "} ${name.padEnd(20)} master ${String(m).padStart(3)} | formalized ${String(f).padStart(3)}`);
    }
    console.log("\nChuyển một bài: npm run import -- Tap_01_Bai_01");
  } else {
    const { written, skipped, byStage } = importLesson(lesson, masterDir, root);
    console.log(`${lesson}: viết ${written} item (${byStage.source_knowledge} source knowledge, ${byStage.formalized} formalized)`);
    for (const s of skipped) console.log(`  bỏ qua ${s}`);
  }
}
