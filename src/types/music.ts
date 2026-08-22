export interface SourceRef {
  lesson_folder?: string;
  lesson_id?: string;
  source_id?: string;
  timestamp_start?: string;
  timestamp_end?: string;
  pdf_page?: number;
  module_id?: string;
  lessons?: number;
  note?: string;
}

export interface RejectedItem {
  id: string;
  reason: string;
}

export interface RuleQuery {
  chord?: string;
  chordQuality?: string;
  chordFunction?: string;
  style?: string;
  difficulty?: string;
  ruleType?: string;
}

export interface PatternQuery {
  patternType?: string;
  chord?: string;
  chordQuality?: string;
  style?: string;
  difficulty?: string;
  phrasePosition?: string;
}

export interface TensionQuery {
  chord: string;
  chordQuality?: string;
  chordFunction?: string;
  resolvesTo?: string;
  style?: string;
  difficulty?: string;
  teacherProfile?: string;
}

export interface VoicingQuery {
  chord: string;
  chordQuality?: string;
  style?: string;
  difficulty?: string;
  hand?: "left" | "right";
}

export interface MelodicFillQuery {
  chord: string;
  chordQuality?: string;
  key?: string;
  style?: string;
  difficulty?: string;
  phrasePosition?: string;
}

export interface CompingQuery {
  progression: string[];
  style?: string;
  difficulty?: string;
}

export interface BassQuery {
  chord: string;
  style?: string;
  difficulty?: string;
}

export interface DecisionRecord {
  decision_id: string;
  decision: string;
  matched_rules: string[];
  matched_patterns: string[];
  teacher_profile_factors: string[];
  source_refs: SourceRef[];
}
