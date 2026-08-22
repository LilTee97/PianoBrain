import type { SourceRef } from "./music.js";

export interface DifficultyBand {
  allowed_tensions: string[];
  avoid: string[];
  rule_ids: string[];
}

export interface DifficultyProfiles {
  beginner: DifficultyBand;
  intermediate: DifficultyBand;
  advanced: DifficultyBand;
}

export interface TeacherStyleProfile {
  profile_id: string;
  teacher_name: string;
  course_id: string;
  style_tags: string[];
  preferred_chord_colors: Record<string, string[]>;
  preferred_voicing_types: string[];
  melodic_language: {
    common_devices: string[];
    phrase_tendencies: string[];
    note_targeting_rules: string[];
  };
  comping_language: {
    rhythmic_density: string;
    syncopation_level: string;
    preferred_patterns: string[];
  };
  bass_language: {
    common_patterns: string[];
  };
  difficulty_bias: {
    beginner: DifficultyBand;
    intermediate: DifficultyBand;
    advanced: DifficultyBand;
  };
  source_refs: SourceRef[];
  confidence_summary?: Record<string, number>;
}
