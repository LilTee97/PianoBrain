import type { ApprovedRule } from "../types/rules.js";
import type { MusicPattern } from "../types/patterns.js";
import type { DifficultyProfiles } from "../types/profiles.js";
import { queryRules } from "./queryRules.js";
import { queryPatterns } from "./queryPatterns.js";

export function queryByDifficulty(
  rules: ApprovedRule[],
  patterns: MusicPattern[],
  difficulty: keyof DifficultyProfiles,
  profiles: DifficultyProfiles,
): { rules: ApprovedRule[]; patterns: MusicPattern[]; profileRuleIds: string[] } {
  const band = profiles[difficulty];
  const byField = queryRules(rules, { difficulty });
  const byId = rules.filter((r) => band.rule_ids.includes(r.rule_id));
  const seen = new Set<string>();
  const merged: ApprovedRule[] = [];
  for (const r of [...byId, ...byField]) {
    if (seen.has(r.rule_id)) continue;
    seen.add(r.rule_id);
    merged.push(r);
  }
  return {
    rules: merged,
    patterns: queryPatterns(patterns, { difficulty }),
    profileRuleIds: band.rule_ids,
  };
}
