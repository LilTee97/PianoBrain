import fs from "node:fs";
import path from "node:path";
import type { RejectedItem } from "../types/music.js";
import type { MusicPattern } from "../types/patterns.js";
import { validatePattern } from "../validators/validatePattern.js";
import { readJsonFile, resolveDataDir } from "./paths.js";

export const PATTERN_FILES = [
  "melodic_patterns.json",
  "note_running_patterns.json",
  "comping_patterns.json",
  "bass_patterns.json",
  "rhythmic_patterns.json",
  "voicing_movement_patterns.json",
] as const;

export interface LoadedPatterns {
  patterns: MusicPattern[];
  rejected: RejectedItem[];
}

export function loadPatterns(dataDir?: string, rawOverride?: unknown[]): LoadedPatterns {
  const items = rawOverride ?? loadPatternFiles(resolveDataDir(dataDir));
  const patterns: MusicPattern[] = [];
  const rejected: RejectedItem[] = [];
  for (const item of items) {
    const result = validatePattern(item);
    if (result.ok) patterns.push(result.pattern);
    else rejected.push({ id: result.id, reason: result.reason });
  }
  if (patterns.length === 0) {
    throw new Error("No approved patterns with source_refs and example loaded");
  }
  return { patterns, rejected };
}

function loadPatternFiles(dataDir: string): unknown[] {
  const dir = path.join(dataDir, "patterns");
  if (!fs.existsSync(dir)) {
    throw new Error(`Missing patterns directory: ${dir}`);
  }
  const out: unknown[] = [];
  for (const file of PATTERN_FILES) {
    const raw = readJsonFile(path.join(dir, file));
    if (!Array.isArray(raw)) {
      throw new Error(`${file} must be a JSON array`);
    }
    out.push(...raw);
  }
  return out;
}
