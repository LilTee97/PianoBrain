import fs from "node:fs";
import path from "node:path";

export function resolveDataDir(override?: string): string {
  if (override) return path.resolve(override);
  if (process.env.PIANOBRAIN_DATA) return path.resolve(process.env.PIANOBRAIN_DATA);
  const candidates = [
    path.resolve(process.cwd(), "data"),
    path.resolve(process.cwd(), "..", "data"),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "approved_rules.json"))) return dir;
  }
  throw new Error(
    `PianoBrain data dir not found. Looked in: ${candidates.join(", ")}. Set PIANOBRAIN_DATA or pass dataDir.`,
  );
}

export function readJsonFile(filePath: string): unknown {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing data file: ${filePath}`);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    throw new Error(`Invalid JSON in ${filePath}: ${(err as Error).message}`);
  }
}
