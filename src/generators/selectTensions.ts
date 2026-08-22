import { rememberDecision } from "../explain/explainDecision.js";
import { mergeSourceRefs } from "../explain/traceSources.js";
import { queryRules } from "../query/queryRules.js";
import type { SourceRef, TensionQuery } from "../types/music.js";
import type { DifficultyProfiles, TeacherStyleProfile } from "../types/profiles.js";
import type { ApprovedRule } from "../types/rules.js";

const TENSION_RE = /\b(b9|#9|b13|#11|add9|sus4|sus2|altered|13|11|9|7)\b/gi;

export interface TensionResult {
  decision_id: string;
  chord: string;
  selected_tensions: string[];
  reason: string;
  matched_rules: string[];
  source_refs: SourceRef[];
}

export function selectTensions(
  rules: ApprovedRule[],
  teacher: TeacherStyleProfile,
  difficulty: DifficultyProfiles,
  q: TensionQuery,
): TensionResult {
  const matched = queryRules(rules, {
    chord: q.chord,
    chordQuality: q.chordQuality,
    chordFunction: q.chordFunction,
    style: q.style,
    difficulty: q.difficulty,
    ruleType: "tension_choice",
  });

  if (matched.length === 0) {
    const rec = rememberDecision({
      decision: `selectTensions(${q.chord})`,
      matched_rules: [],
      matched_patterns: [],
      teacher_profile_factors: [],
      source_refs: [],
    });
    return {
      decision_id: rec.decision_id,
      chord: q.chord,
      selected_tensions: [],
      reason: "No approved tension_choice rule matched. Refusing to invent tensions.",
      matched_rules: [],
      source_refs: [],
    };
  }

  const fromRules = new Set<string>();
  for (const rule of matched) {
    for (const token of extractTensions(rule.description)) fromRules.add(token);
    for (const chunk of rule.action.generate) {
      for (const token of extractTensions(String(chunk))) fromRules.add(token);
    }
  }

  const profileId = q.teacherProfile;
  const profileOk =
    !profileId ||
    profileId === teacher.profile_id ||
    profileId === teacher.course_id;
  const colors = profileOk && q.chordQuality ? teacher.preferred_chord_colors[q.chordQuality] ?? [] : [];

  let selected = fromRules.size > 0 ? [...fromRules] : [...colors];
  const factors: string[] = [];
  if (fromRules.size > 0) factors.push("extracted_from_matched_rules");
  else if (colors.length > 0) {
    factors.push(`teacher_preferred_chord_colors.${q.chordQuality}`);
    selected = [...colors];
  }

  const band = q.difficulty ? difficulty[q.difficulty as keyof DifficultyProfiles] : undefined;
  if (band) {
    if (band.allowed_tensions.length > 0) {
      selected = selected.filter((t) => band.allowed_tensions.includes(t));
      factors.push(`difficulty.${q.difficulty}.allowed_tensions`);
    }
    if (band.avoid.length > 0) {
      selected = selected.filter((t) => !band.avoid.includes(t));
      factors.push(`difficulty.${q.difficulty}.avoid`);
    }
  }

  const refs = mergeSourceRefs(...matched.map((r) => r.source_refs), teacher.source_refs);
  const rec = rememberDecision({
    decision: `selectTensions(${q.chord})`,
    matched_rules: matched.map((r) => r.rule_id),
    matched_patterns: [],
    teacher_profile_factors: factors,
    source_refs: refs,
  });

  return {
    decision_id: rec.decision_id,
    chord: q.chord,
    selected_tensions: selected,
    reason:
      selected.length > 0
        ? "Matched approved tension_choice rules and teacher/difficulty profile."
        : "Matched rules exist but no allowed tension survived profile/difficulty filters.",
    matched_rules: matched.map((r) => r.rule_id),
    source_refs: refs,
  };
}

function extractTensions(text: string): string[] {
  const found: string[] = [];
  const re = new RegExp(TENSION_RE.source, TENSION_RE.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const token = m[1].toLowerCase() === "altered" ? "altered" : m[1];
    if (!found.includes(token)) found.push(token);
  }
  return found;
}
