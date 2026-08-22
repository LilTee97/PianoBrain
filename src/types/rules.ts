import type { SourceRef } from "./music.js";

export interface RuleAppliesWhen {
  chord_quality: string | null;
  chord_symbol: string | null;
  chord_function: string | null;
  key_context: string | null;
  progression_context: string | null;
  melody_context: string | null;
  style_tags: string[] | null;
  difficulty_range: string[] | string | null;
}

export interface RuleAction {
  select: unknown[];
  add: unknown[];
  transform: unknown[];
  generate: unknown[];
}

export interface ApprovedRule {
  rule_id: string;
  rule_type: string;
  description: string;
  applies_when: RuleAppliesWhen;
  conditions: {
    required: unknown[];
    optional: unknown[];
    forbidden: unknown[];
  };
  action: RuleAction;
  avoid_when: unknown[];
  validation: Record<string, unknown>;
  priority: number;
  conflicts_with: unknown[];
  source_refs: SourceRef[];
  confidence: string;
  status: string;
  origin?: {
    lesson_folder?: string;
    module_id?: string;
    original_rule_id?: string;
    category?: string;
  };
}
