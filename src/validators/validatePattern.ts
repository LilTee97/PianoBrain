import type { MusicPattern } from "../types/patterns.js";
import { hasSourceRefs } from "./validateSourceRefs.js";

function hasExample(example: unknown): boolean {
  if (!example || typeof example !== "object") return false;
  const ex = example as { notes?: unknown; hands?: unknown };
  const notesOk = Array.isArray(ex.notes) && ex.notes.length > 0;
  const handsOk =
    ex.hands !== undefined &&
    ex.hands !== null &&
    typeof ex.hands === "object";
  return notesOk || handsOk;
}

export function validatePattern(
  raw: unknown,
): { ok: true; pattern: MusicPattern } | { ok: false; id: string; reason: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, id: "unknown", reason: "Pattern is not an object" };
  }
  const p = raw as Partial<MusicPattern>;
  const id = typeof p.pattern_id === "string" ? p.pattern_id : "unknown";
  if (!p.pattern_id || !p.type || !p.name || !p.applies_when || !p.formula) {
    return {
      ok: false,
      id,
      reason: "Pattern missing required fields (pattern_id, type, name, applies_when, formula)",
    };
  }
  if (!hasSourceRefs(p.source_refs)) {
    return { ok: false, id, reason: "Pattern missing source_refs" };
  }
  if (!hasExample(p.example)) {
    return { ok: false, id, reason: "Pattern missing example" };
  }
  if (p.status !== "approved") {
    return {
      ok: false,
      id,
      reason: `Pattern status is '${p.status ?? "missing"}', default mode only loads approved`,
    };
  }
  return { ok: true, pattern: raw as MusicPattern };
}
