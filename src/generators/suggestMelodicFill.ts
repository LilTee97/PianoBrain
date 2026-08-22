import { rememberDecision } from "../explain/explainDecision.js";
import { queryPatterns } from "../query/queryPatterns.js";
import type { MelodicFillQuery, SourceRef } from "../types/music.js";
import type { MusicPattern } from "../types/patterns.js";

export interface MelodicFillResult {
  decision_id: string;
  pattern_id: string | null;
  notes_or_formula: unknown[];
  usage: string;
  source_refs: SourceRef[];
  reason: string;
}

export function suggestMelodicFill(
  patterns: MusicPattern[],
  q: MelodicFillQuery,
): MelodicFillResult {
  const pool = [
    ...queryPatterns(patterns, {
      patternType: "melodic_pattern",
      chord: q.chord,
      chordQuality: q.chordQuality,
      style: q.style,
      difficulty: q.difficulty,
      phrasePosition: q.phrasePosition,
    }),
    ...queryPatterns(patterns, {
      patternType: "note_running_pattern",
      chord: q.chord,
      chordQuality: q.chordQuality,
      style: q.style,
      difficulty: q.difficulty,
      phrasePosition: q.phrasePosition,
    }),
  ];

  const picked = pool[0];
  if (!picked) {
    const rec = rememberDecision({
      decision: `suggestMelodicFill(${q.chord})`,
      matched_rules: [],
      matched_patterns: [],
      teacher_profile_factors: [],
      source_refs: [],
    });
    return {
      decision_id: rec.decision_id,
      pattern_id: null,
      notes_or_formula: [],
      usage: q.phrasePosition ?? "unspecified",
      source_refs: [],
      reason: "No approved melodic/note-running pattern matched. Refusing to invent a fill.",
    };
  }

  const notes =
    picked.example.notes.length > 0
      ? picked.example.notes
      : [
          picked.formula.intervals,
          picked.formula.scale_degrees,
          picked.formula.rhythm,
          picked.formula.contour,
        ];

  const rec = rememberDecision({
    decision: `suggestMelodicFill(${q.chord})`,
    matched_rules: [],
    matched_patterns: [picked.pattern_id],
    teacher_profile_factors: [],
    source_refs: picked.source_refs,
  });

  return {
    decision_id: rec.decision_id,
    pattern_id: picked.pattern_id,
    notes_or_formula: notes,
    usage: q.phrasePosition ?? picked.applies_when.phrase_position ?? "unspecified",
    source_refs: picked.source_refs,
    reason: "Returned approved pattern only. No new notes generated.",
  };
}
