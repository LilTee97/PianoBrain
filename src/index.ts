import { explainDecision } from "./explain/explainDecision.js";
import { exportEngineBundle, type EngineBundle } from "./exporters/exportEngineBundle.js";
import { selectTensions, type TensionResult } from "./generators/selectTensions.js";
import { selectVoicing, type VoicingResult } from "./generators/selectVoicing.js";
import { suggestBassPattern, type BassResult } from "./generators/suggestBassPattern.js";
import { suggestCompingPattern, type CompingResult } from "./generators/suggestCompingPattern.js";
import { suggestMelodicFill, type MelodicFillResult } from "./generators/suggestMelodicFill.js";
import { loadPatterns } from "./loaders/loadPatterns.js";
import { loadProfiles } from "./loaders/loadProfiles.js";
import { loadRules } from "./loaders/loadRules.js";
import { loadSourceIndex, type SourceIndex } from "./loaders/loadSourceIndex.js";
import { resolveDataDir } from "./loaders/paths.js";
import { queryByChord } from "./query/queryByChord.js";
import { queryByDifficulty } from "./query/queryByDifficulty.js";
import { queryByStyle } from "./query/queryByStyle.js";
import { queryPatterns } from "./query/queryPatterns.js";
import { queryRules } from "./query/queryRules.js";
import type {
  BassQuery,
  CompingQuery,
  DecisionRecord,
  MelodicFillQuery,
  PatternQuery,
  RejectedItem,
  RuleQuery,
  TensionQuery,
  VoicingQuery,
} from "./types/music.js";
import type { MusicPattern } from "./types/patterns.js";
import type { DifficultyProfiles, TeacherStyleProfile } from "./types/profiles.js";
import type { ApprovedRule } from "./types/rules.js";

export type {
  ApprovedRule,
  BassQuery,
  CompingQuery,
  DecisionRecord,
  EngineBundle,
  MelodicFillQuery,
  MusicPattern,
  PatternQuery,
  RuleQuery,
  TensionQuery,
  VoicingQuery,
};

export interface LoadStats {
  rules: number;
  patterns: number;
  rejectedRules: RejectedItem[];
  rejectedPatterns: RejectedItem[];
}

export class PianoBrain {
  readonly rules: ApprovedRule[];
  readonly patterns: MusicPattern[];
  readonly teacher: TeacherStyleProfile;
  readonly difficulty: DifficultyProfiles;
  readonly sourceIndex: SourceIndex | null;
  readonly stats: LoadStats;

  constructor(opts: {
    rules: ApprovedRule[];
    patterns: MusicPattern[];
    teacher: TeacherStyleProfile;
    difficulty: DifficultyProfiles;
    sourceIndex?: SourceIndex | null;
    stats: LoadStats;
  }) {
    this.rules = opts.rules;
    this.patterns = opts.patterns;
    this.teacher = opts.teacher;
    this.difficulty = opts.difficulty;
    this.sourceIndex = opts.sourceIndex ?? null;
    this.stats = opts.stats;
  }

  static load(dataDir?: string): PianoBrain {
    const root = resolveDataDir(dataDir);
    const loadedRules = loadRules(root);
    const loadedPatterns = loadPatterns(root);
    const profiles = loadProfiles(root);
    let sourceIndex: SourceIndex | null = null;
    try {
      sourceIndex = loadSourceIndex(root);
    } catch {
      sourceIndex = null;
    }
    return new PianoBrain({
      rules: loadedRules.rules,
      patterns: loadedPatterns.patterns,
      teacher: profiles.teacher,
      difficulty: profiles.difficulty,
      sourceIndex,
      stats: {
        rules: loadedRules.rules.length,
        patterns: loadedPatterns.patterns.length,
        rejectedRules: loadedRules.rejected,
        rejectedPatterns: loadedPatterns.rejected,
      },
    });
  }

  queryRules(q: RuleQuery): ApprovedRule[] {
    return queryRules(this.rules, q);
  }

  queryPatterns(q: PatternQuery): MusicPattern[] {
    return queryPatterns(this.patterns, q);
  }

  queryByChord(chord: string) {
    return queryByChord(this.rules, this.patterns, chord);
  }

  queryByStyle(style: string) {
    return queryByStyle(this.rules, this.patterns, style);
  }

  queryByDifficulty(difficulty: keyof DifficultyProfiles) {
    return queryByDifficulty(this.rules, this.patterns, difficulty, this.difficulty);
  }

  selectTensions(q: TensionQuery): TensionResult {
    return selectTensions(this.rules, this.teacher, this.difficulty, q);
  }

  selectVoicing(q: VoicingQuery): VoicingResult {
    return selectVoicing(this.rules, this.patterns, q);
  }

  suggestMelodicFill(q: MelodicFillQuery): MelodicFillResult {
    return suggestMelodicFill(this.patterns, q);
  }

  suggestCompingPattern(q: CompingQuery): CompingResult {
    return suggestCompingPattern(this.patterns, this.teacher, q);
  }

  suggestBassPattern(q: BassQuery): BassResult {
    return suggestBassPattern(this.patterns, this.teacher, q);
  }

  explainDecision(decisionId: string): DecisionRecord {
    return explainDecision(decisionId);
  }

  exportEngineBundle(): EngineBundle {
    return exportEngineBundle(this.rules, this.patterns, this.teacher, this.difficulty);
  }
}

export {
  explainDecision,
  exportEngineBundle,
  loadPatterns,
  loadProfiles,
  loadRules,
  loadSourceIndex,
  queryPatterns,
  queryRules,
  selectTensions,
  selectVoicing,
  suggestBassPattern,
  suggestCompingPattern,
  suggestMelodicFill,
  validatePattern,
  validateRule,
} from "./reexports.js";
