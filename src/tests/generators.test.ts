import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { selectTensions } from "../generators/selectTensions.js";
import { PianoBrain } from "../index.js";

describe("generators", () => {
  it("selectTensions does not invent tensions when no rule matches", () => {
    const brain = PianoBrain.load();
    const result = selectTensions([], brain.teacher, brain.difficulty, {
      chord: "G7",
      chordQuality: "dominant7",
      style: "Jazz",
      difficulty: "intermediate",
      teacherProfile: "hai_piano_course_001",
    });
    assert.deepEqual(result.selected_tensions, []);
    assert.equal(result.matched_rules.length, 0);
    assert.match(result.reason, /Refusing to invent/);
  });

  it("suggestMelodicFill only returns an approved library pattern", () => {
    const brain = PianoBrain.load();
    const result = brain.suggestMelodicFill({
      chord: "Cmaj7",
      chordQuality: "major7",
      key: "C",
      style: "Ballad",
      difficulty: "intermediate",
      phrasePosition: "bar_ending",
    });
    if (result.pattern_id) {
      const found = brain.patterns.find((p) => p.pattern_id === result.pattern_id);
      assert.ok(found);
      assert.equal(found.status, "approved");
      assert.ok(found.source_refs.length > 0);
      assert.ok(["melodic_pattern", "note_running_pattern"].includes(found.type));
    } else {
      assert.deepEqual(result.notes_or_formula, []);
      assert.match(result.reason, /Refusing to invent/);
    }
  });

  it("explainDecision returns source_refs for a real decision", () => {
    const brain = PianoBrain.load();
    const tensions = brain.selectTensions({
      chord: "G7",
      chordQuality: "dominant7",
      chordFunction: "V7",
      style: "Jazz",
      difficulty: "intermediate",
      teacherProfile: "hai_piano_course_001",
    });
    assert.ok(tensions.decision_id);
    const explained = brain.explainDecision(tensions.decision_id);
    assert.ok(explained.source_refs.length > 0);
    assert.ok(explained.matched_rules.length > 0);
  });
});
