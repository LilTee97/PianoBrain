import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PianoBrain } from "../index.js";
import { loadPatterns } from "../loaders/loadPatterns.js";
import { loadProfiles } from "../loaders/loadProfiles.js";
import { loadRules } from "../loaders/loadRules.js";

describe("loaders", () => {
  it("loads approved rules, patterns, and profiles", () => {
    const brain = PianoBrain.load();
    assert.ok(brain.stats.rules > 0, "expected rules");
    assert.ok(brain.stats.patterns > 0, "expected patterns");
    assert.equal(brain.teacher.course_id, "hai_piano_course_001");
    assert.ok(brain.difficulty.intermediate);
    assert.equal(loadRules().rules.length, brain.stats.rules);
    assert.equal(loadPatterns().patterns.length, brain.stats.patterns);
    assert.equal(loadProfiles().teacher.teacher_name, "Hải Piano");
  });

  it("does not include needs_human_review items in default mode", () => {
    const brain = PianoBrain.load();
    assert.equal(brain.rules.every((r) => r.status === "approved"), true);
    assert.equal(brain.patterns.every((p) => p.status === "approved"), true);
    assert.equal(
      brain.patterns.some((p) => p.pattern_id === "Tap_03_Bai_01_lesson_id_00001_exercise_01"),
      false,
    );
    assert.ok(
      brain.stats.rejectedPatterns.some(
        (r) => r.id === "Tap_03_Bai_01_lesson_id_00001_exercise_01",
      ),
    );
  });

  it("production code has no host-app or absolute-path import", async () => {
    const { readFileSync, readdirSync, statSync } = await import("node:fs");
    const { dirname, join } = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const root = join(dirname(fileURLToPath(import.meta.url)), "..");
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        if (name === "tests") continue;
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (p.endsWith(".ts")) files.push(p);
      }
    };
    walk(root);
    assert.ok(files.length > 0);
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      const specs = [...text.matchAll(/(?:from|require\()\s*["']([^"']+)["']/g)].map((m) => m[1]);
      for (const spec of specs) {
        assert.equal(/^[a-zA-Z]:[\\/]/.test(spec), false, `${file}: absolute path import ${spec}`);
        assert.equal(/keytrain/i.test(spec), false, `${file}: host app import ${spec}`);
      }
    }
  });
});
