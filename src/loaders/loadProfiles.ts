import path from "node:path";
import type { DifficultyProfiles, TeacherStyleProfile } from "../types/profiles.js";
import {
  validateDifficultyProfiles,
  validateTeacherProfile,
} from "../validators/validateProfile.js";
import { readJsonFile, resolveDataDir } from "./paths.js";

export interface LoadedProfiles {
  teacher: TeacherStyleProfile;
  difficulty: DifficultyProfiles;
}

export function loadProfiles(dataDir?: string): LoadedProfiles {
  const root = resolveDataDir(dataDir);
  const teacherRaw = readJsonFile(path.join(root, "teacher_style_profile.json"));
  const difficultyRaw = readJsonFile(path.join(root, "difficulty_profiles.json"));
  const teacher = validateTeacherProfile(teacherRaw);
  if (!teacher.ok) throw new Error(teacher.reason);
  const difficulty = validateDifficultyProfiles(difficultyRaw);
  if (!difficulty.ok) throw new Error(difficulty.reason);
  return { teacher: teacher.profile, difficulty: difficulty.profiles };
}
