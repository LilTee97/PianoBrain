import type { SourceRef } from "../types/music.js";

export function hasSourceRefs(refs: unknown): refs is SourceRef[] {
  if (!Array.isArray(refs) || refs.length === 0) return false;
  return refs.every(
    (r) =>
      r !== null &&
      typeof r === "object" &&
      ("lesson_folder" in r ||
        "source_id" in r ||
        "lesson_id" in r ||
        "module_id" in r),
  );
}
