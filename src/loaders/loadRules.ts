import path from "node:path";
import type { RejectedItem } from "../types/music.js";
import type { ApprovedRule } from "../types/rules.js";
import { validateRule } from "../validators/validateRule.js";
import { readJsonFile, resolveDataDir } from "./paths.js";

export interface LoadedRules {
  rules: ApprovedRule[];
  rejected: RejectedItem[];
}

export function loadRules(dataDir?: string, rawOverride?: unknown): LoadedRules {
  const raw = rawOverride ?? readJsonFile(path.join(resolveDataDir(dataDir), "approved_rules.json"));
  if (!Array.isArray(raw)) {
    throw new Error("approved_rules.json must be a JSON array");
  }
  const rules: ApprovedRule[] = [];
  const rejected: RejectedItem[] = [];
  for (const item of raw) {
    const result = validateRule(item);
    if (result.ok) rules.push(result.rule);
    else rejected.push({ id: result.id, reason: result.reason });
  }
  if (rules.length === 0) {
    throw new Error("No approved rules with source_refs loaded");
  }
  return { rules, rejected };
}
