import path from "node:path";
import { readJsonFile, resolveDataDir } from "./paths.js";

export interface SourceIndex {
  course_id: string;
  modules: string[];
  lessons: Array<{
    lesson_folder: string;
    module_id: string;
    item_count: number;
    rule_count: number;
    ready: boolean;
  }>;
}

export function loadSourceIndex(dataDir?: string): SourceIndex {
  const raw = readJsonFile(path.join(resolveDataDir(dataDir), "source_index.json"));
  if (!raw || typeof raw !== "object" || !("course_id" in raw)) {
    throw new Error("source_index.json missing course_id");
  }
  return raw as SourceIndex;
}
