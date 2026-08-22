import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PianoBrain } from "../index.js";

describe("query", () => {
  it("returns a sourced tension_choice rule for G7 dominant7 Jazz intermediate", () => {
    const brain = PianoBrain.load();
    const rules = brain.queryRules({
      chord: "G7",
      chordQuality: "dominant7",
      chordFunction: "V7",
      style: "Jazz",
      difficulty: "intermediate",
      ruleType: "tension_choice",
    });
    assert.ok(rules.length > 0, "expected at least one tension_choice rule");
    for (const rule of rules) {
      assert.equal(rule.rule_type, "tension_choice");
      assert.ok(rule.source_refs.length > 0);
      assert.equal(rule.status, "approved");
    }
  });

  it("returns patterns that have example and source_refs", () => {
    const brain = PianoBrain.load();
    const patterns = brain.queryPatterns({ style: "Ballad" });
    assert.ok(patterns.length > 0);
    for (const p of patterns.slice(0, 20)) {
      assert.ok(p.pattern_id);
      assert.ok(p.type);
      assert.ok(p.name);
      assert.ok(p.applies_when);
      assert.ok(p.formula);
      assert.ok(p.example);
      assert.ok(Array.isArray(p.example.notes) || p.example.hands);
      assert.ok(p.source_refs.length > 0);
      assert.equal(p.status, "approved");
    }
  });
});
