import type { ApprovedRule } from "../types/rules.js";
import type { MusicPattern } from "../types/patterns.js";
import { queryRules } from "./queryRules.js";
import { queryPatterns } from "./queryPatterns.js";

export function queryByStyle(
  rules: ApprovedRule[],
  patterns: MusicPattern[],
  style: string,
): { rules: ApprovedRule[]; patterns: MusicPattern[] } {
  return {
    rules: queryRules(rules, { style }),
    patterns: queryPatterns(patterns, { style }),
  };
}
