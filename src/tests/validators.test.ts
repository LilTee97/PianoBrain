import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadPatterns } from "../loaders/loadPatterns.js";
import { loadRules } from "../loaders/loadRules.js";
import { validatePattern } from "../validators/validatePattern.js";
import { validateRule } from "../validators/validateRule.js";

const baseRule = {
  rule_id: "test_rule",
  rule_type: "tension_choice",
  description: "test",
  applies_when: {
    chord_quality: null,
    chord_symbol: null,
    chord_function: null,
    key_context: null,
    progression_context: null,
    melody_context: null,
    style_tags: ["Jazz"],
    difficulty_range: null,
  },
  conditions: { required: [], optional: [], forbidden: [] },
  action: { select: [], add: [], transform: [], generate: [] },
  avoid_when: [],
  validation: {},
  priority: 0,
  conflicts_with: [],
  source_refs: [{ lesson_folder: "Tap_01_Bai_01", source_id: "video" }],
  confidence: "direct",
  status: "approved",
};

const basePattern = {
  pattern_id: "test_pattern",
  type: "melodic_pattern",
  name: "test",
  applies_when: {
    chord_quality: null,
    chord_symbol: "C",
    scale: null,
    key_context: null,
    phrase_position: null,
    style_tags: ["Ballad"],
    difficulty: null,
  },
  formula: { intervals: [], scale_degrees: [], rhythm: [], contour: null },
  example: { key: null, chord: "C", notes: ["C4"], rhythm: [] },
  source_refs: [{ lesson_folder: "Tap_01_Bai_01", source_id: "video" }],
  confidence: "direct",
  status: "approved",
};

describe("validators", () => {
  it("rejects a rule missing source_refs", () => {
    const result = validateRule({ ...baseRule, source_refs: [] });
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.reason, /source_refs/);
    const loaded = loadRules(undefined, [{ ...baseRule, source_refs: [] }, baseRule]);
    assert.equal(loaded.rules.length, 1);
    assert.equal(loaded.rejected[0]?.reason.includes("source_refs"), true);
  });

  it("rejects needs_human_review rules from default load", () => {
    const result = validateRule({ ...baseRule, status: "needs_human_review" });
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.reason, /approved/);
  });

  it("rejects a pattern missing example", () => {
    const result = validatePattern({ ...basePattern, example: null });
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.reason, /example/);
    const loaded = loadPatterns(undefined, [{ ...basePattern, example: null }, basePattern]);
    assert.equal(loaded.patterns.length, 1);
    assert.equal(loaded.rejected[0]?.reason.includes("example"), true);
  });
});
