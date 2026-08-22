import type { Difficulty, ItemType, KnowledgeItem, Origin, SourceRecord, Status } from "./types.js";

const TYPES: ItemType[] = [
  "teacher",
  "concept",
  "exercise",
  "chord_color",
  "voicing",
  "fingering",
  "scale",
  "arpeggio",
  "fill",
  "intro",
  "outro",
  "solo_idea",
  "accompaniment",
  "style",
  "rule",
];
const ORIGINS: Origin[] = ["extracted", "derived", "invented"];
const STATUSES: Status[] = ["draft", "validated", "rejected"];
const ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

/**
 * Luật chống bịa. Ba điều quan trọng nhất:
 *  - origin "extracted" bắt buộc trỏ tới một source_id CÓ THẬT trong sources/index.json
 *  - origin "invented"/"derived" không bao giờ được mang trạng thái "validated"
 *  - không item nào được gán teacher nếu nó không phải extracted
 */
export function validateItem(
  raw: unknown,
  ctx: { sources: SourceRecord[]; teacherIds: string[] },
): ValidationResult {
  const errors: string[] = [];
  const fail = (msg: string) => errors.push(msg);

  if (typeof raw !== "object" || raw === null) {
    return { ok: false, errors: ["item is not an object"] };
  }
  const item = raw as Partial<KnowledgeItem>;
  const id = typeof item.id === "string" ? item.id : "<no id>";

  if (typeof item.id !== "string" || !ID_RE.test(item.id)) fail(`${id}: id must be kebab-case`);
  if (!TYPES.includes(item.type as ItemType)) fail(`${id}: unknown type ${String(item.type)}`);
  if (typeof item.name !== "string" || item.name.trim() === "") fail(`${id}: name required`);
  if (![1, 2, 3, 4, 5].includes(item.difficulty as Difficulty)) fail(`${id}: difficulty must be 1..5`);
  if (!Array.isArray(item.use_when) || item.use_when.length === 0) fail(`${id}: use_when required`);
  if (!Array.isArray(item.avoid_when)) fail(`${id}: avoid_when must be an array`);
  if (typeof item.input !== "object" || item.input === null) fail(`${id}: input required`);
  if (typeof item.output !== "object" || item.output === null) fail(`${id}: output required`);
  if (!ORIGINS.includes(item.origin as Origin)) fail(`${id}: unknown origin ${String(item.origin)}`);
  if (!STATUSES.includes(item.status as Status)) fail(`${id}: unknown status ${String(item.status)}`);
  if (typeof item.note_vi !== "string" || item.note_vi.trim() === "") fail(`${id}: note_vi required`);

  if (item.origin === "extracted") {
    const src = item.source;
    if (!src) {
      fail(`${id}: origin=extracted requires source`);
    } else {
      if (!ctx.teacherIds.includes(src.teacher_id)) {
        fail(`${id}: unknown teacher_id ${src.teacher_id}`);
      }
      if (!ctx.sources.some((s) => s.source_id === src.source_id)) {
        fail(`${id}: source_id ${src.source_id} is not registered in sources/index.json`);
      }
    }
  } else {
    if (item.source) fail(`${id}: origin=${item.origin} must not claim a source`);
    if (item.status === "validated") {
      fail(`${id}: origin=${item.origin} cannot be validated (chỉ nguồn thật mới được validated)`);
    }
  }

  return { ok: errors.length === 0, errors };
}

export function validateAll(
  items: unknown[],
  ctx: { sources: SourceRecord[]; teacherIds: string[] },
): ValidationResult {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const raw of items) {
    const res = validateItem(raw, ctx);
    errors.push(...res.errors);
    const id = (raw as Partial<KnowledgeItem>)?.id;
    if (typeof id === "string") {
      if (seen.has(id)) errors.push(`${id}: duplicate id`);
      seen.add(id);
    }
  }
  return { ok: errors.length === 0, errors };
}
