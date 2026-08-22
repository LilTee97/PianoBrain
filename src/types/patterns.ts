import type { SourceRef } from "./music.js";

export interface PatternAppliesWhen {
  chord_quality: string | null;
  chord_symbol: string | null;
  scale: string | null;
  key_context: string | null;
  phrase_position: string | null;
  style_tags: string[] | null;
  difficulty: string | null;
}

export interface PatternFormula {
  intervals: unknown[];
  scale_degrees: unknown[];
  rhythm: unknown[];
  contour: unknown;
}

export interface PatternExample {
  key: string | null;
  chord: string | null;
  notes: unknown[];
  rhythm: unknown[];
  hands?: {
    left?: unknown[];
    right?: unknown[];
  };
}

export interface MusicPattern {
  pattern_id: string;
  type: string;
  name: string;
  applies_when: PatternAppliesWhen;
  formula: PatternFormula;
  example: PatternExample;
  transformations?: {
    transpose?: boolean;
    diatonic_adapt?: boolean;
    chromatic_adapt?: unknown;
  };
  validation?: Record<string, unknown>;
  source_refs: SourceRef[];
  confidence: string;
  status: string;
}
