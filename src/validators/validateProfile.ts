import type { DifficultyProfiles, TeacherStyleProfile } from "../types/profiles.js";

export function validateTeacherProfile(
  raw: unknown,
): { ok: true; profile: TeacherStyleProfile } | { ok: false; reason: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "Teacher profile is not an object" };
  }
  const p = raw as Partial<TeacherStyleProfile>;
  if (!p.profile_id || !p.teacher_name || !p.course_id) {
    return { ok: false, reason: "Teacher profile missing profile_id, teacher_name, or course_id" };
  }
  if (!p.preferred_chord_colors || typeof p.preferred_chord_colors !== "object") {
    return { ok: false, reason: "Teacher profile missing preferred_chord_colors" };
  }
  if (!p.style_tags || !Array.isArray(p.style_tags) || p.style_tags.length === 0) {
    return { ok: false, reason: "Teacher profile missing style_tags" };
  }
  return { ok: true, profile: raw as TeacherStyleProfile };
}

export function validateDifficultyProfiles(
  raw: unknown,
): { ok: true; profiles: DifficultyProfiles } | { ok: false; reason: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "Difficulty profiles is not an object" };
  }
  const p = raw as Partial<DifficultyProfiles>;
  for (const band of ["beginner", "intermediate", "advanced"] as const) {
    const b = p[band];
    if (!b || !Array.isArray(b.allowed_tensions) || !Array.isArray(b.avoid)) {
      return { ok: false, reason: `Difficulty profile missing band '${band}'` };
    }
  }
  return { ok: true, profiles: raw as DifficultyProfiles };
}
