import { rememberDecision } from "../explain/explainDecision.js";
import { queryPatterns } from "../query/queryPatterns.js";
import type { BassQuery, SourceRef } from "../types/music.js";
import type { MusicPattern } from "../types/patterns.js";
import type { TeacherStyleProfile } from "../types/profiles.js";

export interface BassResult {
  decision_id: string;
  pattern_id: string | null;
  name: string | null;
  formula: MusicPattern["formula"] | null;
  example: MusicPattern["example"] | null;
  source_refs: SourceRef[];
  reason: string;
}

export function suggestBassPattern(
  patterns: MusicPattern[],
  teacher: TeacherStyleProfile,
  q: BassQuery,
): BassResult {
  const pool = queryPatterns(patterns, {
    patternType: "bass_pattern",
    chord: q.chord,
    style: q.style,
    difficulty: q.difficulty,
  });
  const preferred = new Set(teacher.bass_language.common_patterns);
  pool.sort((a, b) => Number(preferred.has(b.pattern_id)) - Number(preferred.has(a.pattern_id)));
  const picked = pool[0];

  if (!picked) {
    const rec = rememberDecision({
      decision: `suggestBassPattern(${q.chord})`,
      matched_rules: [],
      matched_patterns: [],
      teacher_profile_factors: [],
      source_refs: [],
    });
    return {
      decision_id: rec.decision_id,
      pattern_id: null,
      name: null,
      formula: null,
      example: null,
      source_refs: [],
      reason: "No approved bass pattern matched.",
    };
  }

  const rec = rememberDecision({
    decision: `suggestBassPattern(${q.chord})`,
    matched_rules: [],
    matched_patterns: [picked.pattern_id],
    teacher_profile_factors: preferred.has(picked.pattern_id) ? ["bass_language.common_patterns"] : [],
    source_refs: picked.source_refs,
  });

  return {
    decision_id: rec.decision_id,
    pattern_id: picked.pattern_id,
    name: picked.name,
    formula: picked.formula,
    example: picked.example,
    source_refs: picked.source_refs,
    reason: "Approved bass pattern from library.",
  };
}
