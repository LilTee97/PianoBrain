import { rememberDecision } from "../explain/explainDecision.js";
import { mergeSourceRefs } from "../explain/traceSources.js";
import { queryPatterns } from "../query/queryPatterns.js";
import { queryRules } from "../query/queryRules.js";
import type { SourceRef, VoicingQuery } from "../types/music.js";
import type { MusicPattern } from "../types/patterns.js";
import type { ApprovedRule } from "../types/rules.js";

export interface VoicingCandidate {
  kind: "rule" | "pattern";
  id: string;
  name: string;
  notes?: unknown[];
  hands?: { left?: unknown[]; right?: unknown[] };
  description?: string;
  source_refs: SourceRef[];
}

export interface VoicingResult {
  decision_id: string;
  chord: string;
  selected: VoicingCandidate | null;
  candidates: VoicingCandidate[];
  reason: string;
  source_refs: SourceRef[];
}

export function selectVoicing(
  rules: ApprovedRule[],
  patterns: MusicPattern[],
  q: VoicingQuery,
): VoicingResult {
  const voicingRules = queryRules(rules, {
    chord: q.chord,
    chordQuality: q.chordQuality,
    style: q.style,
    difficulty: q.difficulty,
    ruleType: "voicing_choice",
  });
  const movement = queryPatterns(patterns, {
    patternType: "voicing_movement_pattern",
    chord: q.chord,
    chordQuality: q.chordQuality,
    style: q.style,
    difficulty: q.difficulty,
  });

  const candidates: VoicingCandidate[] = [
    ...movement.map((p) => ({
      kind: "pattern" as const,
      id: p.pattern_id,
      name: p.name,
      notes: p.example.notes,
      hands: p.example.hands,
      source_refs: p.source_refs,
    })),
    ...voicingRules.map((r) => ({
      kind: "rule" as const,
      id: r.rule_id,
      name: r.rule_id,
      description: r.description,
      source_refs: r.source_refs,
    })),
  ];

  let selected: VoicingCandidate | null = null;
  if (q.hand) {
    selected =
      candidates.find((c) => c.hands && c.hands[q.hand!] && (c.hands[q.hand!] as unknown[]).length > 0) ??
      null;
  }
  if (!selected) selected = candidates[0] ?? null;

  const refs = mergeSourceRefs(selected?.source_refs, ...candidates.slice(0, 5).map((c) => c.source_refs));
  const rec = rememberDecision({
    decision: `selectVoicing(${q.chord})`,
    matched_rules: voicingRules.map((r) => r.rule_id),
    matched_patterns: movement.map((p) => p.pattern_id),
    teacher_profile_factors: [],
    source_refs: refs,
  });

  return {
    decision_id: rec.decision_id,
    chord: q.chord,
    selected,
    candidates,
    reason: selected
      ? selected.notes
        ? "Selected approved voicing_movement pattern example. Notes come from source example, not invented."
        : "No concrete voicing notes in data. Returning approved candidate description only."
      : "No approved voicing rule or pattern matched. Refusing to invent notes.",
    source_refs: refs,
  };
}
