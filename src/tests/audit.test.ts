import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { auditCapability } from "../mrhai/audit.js";

const kb = loadKnowledgeBase();

describe("brain audit", () => {
  it("says ĐÃ CÓ only when real teacher items back it", () => {
    const a = auditCapability("walking bass", kb);
    assert.equal(a.status, "DA_CO");
    assert.ok(a.teacher.length > 0);
    for (const i of a.teacher) {
      assert.ok(kb.byId.has(i.id));
      assert.equal(i.origin, "extracted");
      assert.equal(i.status, "validated");
    }
  });

  it("says CHƯA CÓ and points at the ingest pipeline instead of bluffing", () => {
    const a = auditCapability("stride piano", kb);
    assert.equal(a.status, "CHUA_CO");
    assert.equal(a.teacher.length + a.draft.length + a.seed.length, 0);
    assert.ok(a.bridge.some((b) => b.includes("PIPELINE.md")));
    assert.ok(a.scope.length === 0);
  });

  it("reports which generator covers a topic", () => {
    const a = auditCapability("chạy ngón pentatonic", kb);
    assert.ok(a.generators.some((g) => g.id.startsWith("generateRun")));
    assert.ok(a.scope.some((s) => s.includes("cấp độ nốt")));
  });

  it("matches regardless of Vietnamese accents", () => {
    const withMarks = auditCapability("chạy ngón", kb);
    const without = auditCapability("chay ngon", kb);
    assert.deepEqual(
      without.teacher.map((i) => i.id),
      withMarks.teacher.map((i) => i.id),
    );
  });

  it("never counts a rejected item as evidence", () => {
    const rejected = kb.items.filter((i) => i.status === "rejected");
    assert.ok(rejected.length > 0, "kho phải còn item rejected để bài kiểm này có nghĩa");
    for (const r of rejected) {
      const a = auditCapability(r.name.slice(0, 30), kb);
      assert.equal(
        [...a.teacher, ...a.draft, ...a.seed].some((i) => i.id === r.id),
        false,
        `${r.id} bị loại rồi mà vẫn được tính`,
      );
    }
  });

  it("finds the same thing whether asked as a keyword or a whole sentence", () => {
    const bare = auditCapability("walking bass", kb);
    const sentence = auditCapability("thầy dạy walking bass chưa", kb);
    assert.equal(sentence.status, bare.status);
    assert.deepEqual(
      sentence.teacher.map((i) => i.id),
      bare.teacher.map((i) => i.id),
    );
  });

  it("refuses to claim the 7b9 derivation for a pair it would never build", () => {
    const bad = auditCapability("thầy dạy A7b9 trước F trên 1645 chưa?", kb);
    assert.equal(bad.status, "CHUA_CO");
    assert.equal(bad.generators.length, 0);
    assert.ok(bad.limits.some((l) => l.includes("A7b9")));

    // E7b9 -> Am là cặp đúng chức năng, và kho có item của thầy nói thẳng điều đó.
    const good = auditCapability("thầy dạy E7b9 trước Am chưa?", kb);
    assert.equal(good.status, "DA_CO");
    assert.ok(good.teacher.some((i) => i.id === "tap-02-bai-07-lesson-id-00034"));
    assert.ok(good.generators.some((g) => g.id.startsWith("deriveFlatNineApproach")));
    assert.equal(good.limits.some((l) => l.includes("từ chối dựng")), false);
  });

  it("matches whole words, not fragments inside a word", () => {
    // "walkin" và "bas" là chuỗi con của "walking" / "bass" nhưng không phải một từ.
    assert.equal(auditCapability("walkin", kb).teacher.length, 0);
    assert.equal(auditCapability("bas", kb).teacher.length, 0);
    assert.ok(auditCapability("walking bass", kb).teacher.length > 0);
  });

  it("always states the hard limits, even when the answer is ĐÃ CÓ", () => {
    const a = auditCapability("sus4", kb);
    assert.equal(a.status, "DA_CO");
    assert.ok(a.limits.some((l) => l.includes("MIDI")));
    assert.ok(a.limits.some((l) => l.includes("audio")));
  });
});
