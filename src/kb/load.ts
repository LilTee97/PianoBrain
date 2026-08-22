import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Coverage, KnowledgeBase, KnowledgeItem, SourceRecord } from "./types.js";
import { validateAll } from "./validate.js";

export type { KnowledgeBase };

export function resolveRepoRoot(override?: string): string {
  if (override) return path.resolve(override);
  if (process.env.PIANOBRAIN_ROOT) return path.resolve(process.env.PIANOBRAIN_ROOT);
  // Tìm cạnh file này trước cả cwd: agent khác chạy từ repo của nó vẫn gọi được Mr Hai.
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    process.cwd(),
    path.resolve(process.cwd(), ".."),
    path.resolve(here, "..", ".."),
    path.resolve(here, "..", "..", ".."),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "knowledge"))) return dir;
  }
  throw new Error(
    `PianoBrain repo root not found. Looked in: ${candidates.join(", ")}. Đặt PIANOBRAIN_ROOT nếu kho nằm chỗ khác.`,
  );
}

function walkJson(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walkJson(p, out);
    else if (p.endsWith(".json")) out.push(p);
  }
  return out;
}

/** Load knowledge/ và sources/. Ném lỗi nếu bất kỳ item nào vi phạm luật chống bịa. */
export function loadKnowledgeBase(root?: string): KnowledgeBase {
  const repo = resolveRepoRoot(root);
  const sourcesFile = path.join(repo, "sources", "index.json");
  const sourcesDoc = fs.existsSync(sourcesFile)
    ? (JSON.parse(fs.readFileSync(sourcesFile, "utf8")) as { sources?: SourceRecord[]; coverage?: Coverage })
    : {};
  const sources = sourcesDoc.sources ?? [];
  const coverage: Coverage = sourcesDoc.coverage ?? { skipped: [], incomplete: [] };

  const files = walkJson(path.join(repo, "knowledge"));
  const raw: unknown[] = files.map((f) => {
    try {
      return JSON.parse(fs.readFileSync(f, "utf8"));
    } catch (err) {
      throw new Error(`Invalid JSON in ${f}: ${(err as Error).message}`);
    }
  });

  const teacherIds = raw
    .filter((r): r is KnowledgeItem => (r as KnowledgeItem)?.type === "teacher")
    .map((r) => r.id);

  const res = validateAll(raw, { sources, teacherIds });
  if (!res.ok) throw new Error(`Knowledge base invalid:\n- ${res.errors.join("\n- ")}`);

  const items = raw as KnowledgeItem[];
  return { items, sources, coverage, byId: new Map(items.map((i) => [i.id, i])) };
}
