import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { nameToMidi, parseChord } from "../mrhai/chords.js";
import { generateRun } from "../mrhai/generate.js";

const kb = loadKnowledgeBase();
const plan = generateRun(
  { key: "C", degree: "I", quality: "maj7", nextDegree: "vi", nextQuality: "m7", style: "pop_ballad" },
  kb,
);

describe("chord parsing", () => {
  it("reads the qualities the palettes actually produce", () => {
    assert.deepEqual(parseChord("Cmaj7")?.intervals, [0, 4, 7, 11]);
    assert.deepEqual(parseChord("Am7")?.intervals, [0, 3, 7, 10]);
    assert.deepEqual(parseChord("G7sus4")?.intervals, [0, 5, 7, 10]);
    assert.deepEqual(parseChord("F#dim7")?.intervals, [0, 3, 6, 9]);
    assert.equal(parseChord("E7b9")?.isDominant, true);
  });

  it("tells a slash bass from a quality that contains a slash", () => {
    assert.equal(parseChord("Am11/C")?.bass, "C");
    assert.equal(parseChord("F6/9")?.bass, null);
    assert.deepEqual(parseChord("F6/9")?.intervals, [0, 4, 7, 9, 14]);
  });

  it("returns null instead of guessing at an unknown quality", () => {
    assert.equal(parseChord("Cwat9"), null);
  });
});

describe("run generation", () => {
  it("lands on the third of the next chord, one semitone from below", () => {
    const last = plan.notes.at(-1);
    const approach = plan.notes.at(-2);
    assert.ok(last && approach);
    assert.equal(last.role, "nốt đích");
    assert.equal(last.note, "C5", "bậc 3 của Am7 là C");
    assert.equal(approach.midi, last.midi - 1, "nốt dẫn phải cách nốt đích nửa cung");
    assert.equal(last.bar, 2);
    assert.equal(last.beat, 1);
  });

  it("fills one 4/4 bar with no two notes on the same beat", () => {
    const bar1 = plan.notes.filter((n) => n.bar === 1);
    assert.equal(bar1.length, 8);
    const beats = bar1.map((n) => n.beat);
    assert.deepEqual(beats, [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5]);
    assert.equal(new Set(beats).size, beats.length);
  });

  it("builds pentatonic cells that repeat a third higher, not a copied phrase", () => {
    const names = plan.notes.map((n) => n.note);
    assert.deepEqual(names, ["C4", "D4", "E4", "G4", "E4", "G4", "A4", "B4", "C5"]);
    assert.ok(plan.notes.some((n) => n.role === "bậc 9"));
  });

  it("only rises — every note of the run is inside the declared right-hand range", () => {
    const [lo, hi] = plan.voicing.rh_range.split(" - ").map(nameToMidi);
    for (const n of plan.notes) assert.ok(n.midi >= lo && n.midi <= hi + 1, `${n.note} ra ngoài vùng tay phải`);
  });

  it("cites only real validated teacher items, and says so when it has none", () => {
    assert.ok(plan.derived_from.length > 0);
    for (const id of plan.derived_from) {
      const item = kb.byId.get(id);
      assert.ok(item, `${id} không có trong kho`);
      assert.equal(item.origin, "extracted");
      assert.equal(item.status, "validated");
    }
    // Kho không có thế ngón cho ô ngũ cung -> phải nói ra chứ không mượn thế ngón gam.
    assert.ok(plan.generic.some((g) => g.includes("thế ngón")));
  });

  it("transposes instead of hardcoding C", () => {
    const eb = generateRun(
      { key: "Eb", degree: "I", quality: "maj7", nextDegree: "vi", nextQuality: "m7" },
      kb,
    );
    assert.equal(eb.context.chord, "Ebmaj7");
    assert.equal(eb.context.next_chord, "Cm7");
    assert.equal(eb.context.target_note, "Eb5", "bậc 3 của Cm7 là Eb");
    assert.equal(eb.notes.at(-2)?.midi, eb.notes.at(-1)!.midi - 1);
  });
});
