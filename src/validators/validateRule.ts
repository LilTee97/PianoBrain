import type { ApprovedRule } from "../types/rules.js";
import { hasSourceRefs } from "./validateSourceRefs.js";

export function validateRule(raw: unknown): { ok: true; rule: ApprovedRule } | { ok: false; id: string; reason: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, id: "unknown", reason: "Rule is not an object" };
  }
  const r = raw as Partial<ApprovedRule>;
  const id = typeof r.rule_id === "string" ? r.rule_id : "unknown";
  if (!r.rule_id || !r.rule_type || !r.description || !r.applies_when) {
    return { ok: false, id, reason: "Rule missing required fields (rule_id, rule_type, description, applies_when)" };
  }
  if (!hasSourceRefs(r.source_refs)) {
    return { ok: false, id, reason: "Rule missing source_refs" };
  }
  if (r.status !== "approved") {
    return { ok: false, id, reason: `Rule status is '${r.status ?? "missing"}', default mode only loads approved` };
  }
  return { ok: true, rule: raw as ApprovedRule };
}
