import type { ApprovedRule } from "../types/rules.js";
import type { MusicPattern } from "../types/patterns.js";
import { queryRules } from "./queryRules.js";
import { queryPatterns } from "./queryPatterns.js";

export function queryByChord(
  rules: ApprovedRule[],
  patterns: MusicPattern[],
  chord: string,
): { rules: ApprovedRule[]; patterns: MusicPattern[] } {
  return {
    rules: queryRules(rules, { chord }),
    patterns: queryPatterns(patterns, { chord }),
  };
}
