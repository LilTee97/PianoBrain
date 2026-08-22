function norm(s: string): string {
  return s.trim().toLowerCase();
}

export function tagsMatch(style: string | undefined, tags: string[] | null | undefined): boolean {
  if (!style) return true;
  if (!tags || tags.length === 0) return true;
  if (tags.some((t) => norm(t) === "all styles")) return true;
  const q = norm(style);
  return tags.some((t) => {
    const tag = norm(t);
    return tag === q || tag.includes(q) || q.includes(tag);
  });
}

export function fieldMatch(query: string | undefined, field: string | null | undefined): boolean {
  if (!query) return true;
  if (field == null || field === "") return true;
  const q = norm(query);
  const f = norm(field);
  return f === q || f.includes(q) || q.includes(f);
}

export function difficultyMatch(
  query: string | undefined,
  field: string | string[] | null | undefined,
): boolean {
  if (!query) return true;
  if (field == null || field === "") return true;
  const values = Array.isArray(field) ? field : [field];
  if (values.length === 0) return true;
  const q = norm(query);
  return values.some((v) => norm(String(v)) === q);
}

export function scoreMatch(opts: {
  chord?: string;
  quality?: string;
  style?: string;
  difficulty?: string;
  chordField?: string | null;
  qualityField?: string | null;
  tags?: string[] | null;
  difficultyField?: string | string[] | null;
}): number {
  let score = 1;
  if (opts.chord && opts.chordField) {
    const q = norm(opts.chord);
    const f = norm(opts.chordField);
    if (f === q) score += 10;
    else if (f.includes(q) || q.includes(f)) score += 5;
  }
  if (opts.quality && opts.qualityField && norm(opts.qualityField) === norm(opts.quality)) {
    score += 5;
  }
  if (opts.style && opts.tags?.some((t) => norm(t).includes(norm(opts.style!)))) score += 3;
  if (opts.difficulty && opts.difficultyField) score += 2;
  return score;
}
