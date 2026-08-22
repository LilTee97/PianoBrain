import { rememberDecision } from "../explain/explainDecision.js";
import { queryPatterns } from "../query/queryPatterns.js";
import type { CompingQuery, SourceRef } from "../types/music.js";
import type { MusicPattern } from "../types/patterns.js";
import type { TeacherStyleProfile } from "../types/profiles.js";

export interface CompingResult {
  decision_id: string;
  pattern_id: string | null;
  name: string | null;
  rhythmic_shape: unknown[];
  example: MusicPattern["example"] | null;
  confidence: "high" | "medium" | "none";
  source_refs: SourceRef[];
  reason: string;
}

export function suggestCompingPattern(
  patterns: MusicPattern[],
  teacher: TeacherStyleProfile,
  q: CompingQuery,
): CompingResult {
  const pool = queryPatterns(patterns, {
    patternType: "comping_pattern",
    style: q.style,
    difficulty: q.difficulty,
  });

  const preferred = new Set(teacher.comping_language.preferred_patterns);
  const scored = pool.map((p) => {
    const symbol = (p.applies_when.chord_symbol ?? p.example.chord ?? "").toLowerCase();
    const overlap = q.progression.filter((c) => symbol.includes(c.toLowerCase())).length;
    const pref = preferred.has(p.pattern_id) ? 2 : 0;
    return { p, score: overlap * 3 + pref };
  });
  scored.sort((a, b) => b.score - a.score);
  const picked = scored[0]?.p;

  if (!picked) {
    const rec = rememberDecision({
      decision: "suggestCompingPattern",
      matched_rules: [],
      matched_patterns: [],
      teacher_profile_factors: [],
      source_refs: [],
    });
    return {
      decision_id: rec.decision_id,
      pattern_id: null,
      name: null,
      rhythmic_shape: [],
      example: null,
      confidence: "none",
      source_refs: [],
      reason: "No approved comping pattern matched.",
    };
  }

  const overlap = q.progression.filter((c) =>
    (picked.applies_when.chord_symbol ?? "").toLowerCase().includes(c.toLowerCase()),
  ).length;
  const confidence = overlap > 0 ? "high" : "medium";
  const factors = preferred.has(picked.pattern_id) ? ["comping_language.preferred_patterns"] : [];

  const rec = rememberDecision({
    decision: "suggestCompingPattern",
    matched_rules: [],
    matched_patterns: [picked.pattern_id],
    teacher_profile_factors: factors,
    source_refs: picked.source_refs,
  });

  return {
    decision_id: rec.decision_id,
    pattern_id: picked.pattern_id,
    name: picked.name,
    rhythmic_shape: picked.formula.rhythm.length > 0 ? picked.formula.rhythm : picked.example.rhythm,
    example: picked.example,
    confidence,
    source_refs: picked.source_refs,
    reason: "Approved comping pattern from library.",
  };
}
