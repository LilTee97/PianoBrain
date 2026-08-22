import type { SourceRef } from "../types/music.js";

export function mergeSourceRefs(...groups: Array<SourceRef[] | undefined>): SourceRef[] {
  const out: SourceRef[] = [];
  const seen = new Set<string>();
  for (const group of groups) {
    if (!group) continue;
    for (const ref of group) {
      const key = JSON.stringify(ref);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(ref);
    }
  }
  return out;
}
