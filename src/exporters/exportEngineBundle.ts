import type { MusicPattern } from "../types/patterns.js";
import type { DifficultyProfiles, TeacherStyleProfile } from "../types/profiles.js";
import type { ApprovedRule } from "../types/rules.js";

export interface EngineBundle {
  engine: "PianoBrain";
  version: string;
  course_id: string;
  rules: ApprovedRule[];
  patterns: MusicPattern[];
  teacher: TeacherStyleProfile;
  difficulty: DifficultyProfiles;
}

export function exportEngineBundle(
  rules: ApprovedRule[],
  patterns: MusicPattern[],
  teacher: TeacherStyleProfile,
  difficulty: DifficultyProfiles,
): EngineBundle {
  return {
    engine: "PianoBrain",
    version: "0.1.0",
    course_id: teacher.course_id,
    rules,
    patterns,
    teacher,
    difficulty,
  };
}
