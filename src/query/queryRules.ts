import type { RuleQuery } from "../types/music.js";
import type { ApprovedRule } from "../types/rules.js";
import { difficultyMatch, fieldMatch, scoreMatch, tagsMatch } from "./match.js";

export function queryRules(rules: ApprovedRule[], q: RuleQuery): ApprovedRule[] {
  const matched = rules.filter((rule) => {
    if (q.ruleType && rule.rule_type !== q.ruleType) return false;
    const a = rule.applies_when;
    if (!fieldMatch(q.chord, a.chord_symbol)) return false;
    if (!fieldMatch(q.chordQuality, a.chord_quality)) return false;
    if (!fieldMatch(q.chordFunction, a.chord_function)) return false;
    if (!tagsMatch(q.style, a.style_tags)) return false;
    if (!difficultyMatch(q.difficulty, a.difficulty_range)) return false;
    return true;
  });
  return matched.sort((a, b) => {
    const sb = scoreMatch({
      chord: q.chord,
      quality: q.chordQuality,
      style: q.style,
      difficulty: q.difficulty,
      chordField: b.applies_when.chord_symbol,
      qualityField: b.applies_when.chord_quality,
      tags: b.applies_when.style_tags,
      difficultyField: b.applies_when.difficulty_range,
    });
    const sa = scoreMatch({
      chord: q.chord,
      quality: q.chordQuality,
      style: q.style,
      difficulty: q.difficulty,
      chordField: a.applies_when.chord_symbol,
      qualityField: a.applies_when.chord_quality,
      tags: a.applies_when.style_tags,
      difficultyField: a.applies_when.difficulty_range,
    });
    return sb - sa || b.priority - a.priority;
  });
}
