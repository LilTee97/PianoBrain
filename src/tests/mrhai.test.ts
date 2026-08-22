import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { askMrHai, coversChords } from "../mrhai/answer.js";
import { flatNineAuthorities } from "../mrhai/derive.js";
import { chordSymbol } from "../mrhai/theory.js";

const kb = loadKnowledgeBase();
const PROG = ["I", "vi", "IV", "V"];
const answer = askMrHai({ key: "C", progression: PROG, style: "pop_ballad" }, kb);

describe("Mr Hai on I-vi-IV-V", () => {
  it("only cites ids that exist in the knowledge base", () => {
    assert.ok(answer.used_ids.length > 0);
    for (const id of answer.used_ids) assert.ok(kb.byId.has(id), `invented id: ${id}`);
  });

  it("every chord it prints is rebuildable from its knowledge item (không bịa màu hợp âm)", () => {
    assert.ok(answer.reharms.length >= 3);
    for (const r of answer.reharms.filter((x) => x.source_kind !== "derived")) {
      const item = kb.byId.get(r.id);
      assert.ok(item);
      const out = item.output as {
        qualities: Record<string, string>;
        bass_degree?: Record<string, string>;
        inserts?: { after: string; chords: { degree: string; quality: string }[] }[];
      };
      const expected: string[] = [];
      for (const d of PROG) {
        expected.push(chordSymbol(d, out.qualities[d] ?? "", "C", out.bass_degree?.[d]));
        for (const ins of out.inserts ?? []) {
          if (ins.after === d) for (const c of ins.chords) expected.push(chordSymbol(c.degree, c.quality, "C"));
        }
      }
      assert.deepEqual(r.chords, expected, `${r.id} printed chords not in its item`);
    }
  });

  it("never prints a fingering that is not a fingering item in the kho", () => {
    for (const f of answer.fingerings) {
      assert.equal(kb.byId.get(f.id)?.type, "fingering", `invented fingering: ${f.id}`);
    }
  });

  it("attributes to a teacher only when the item really has a registered source", () => {
    const registered = new Set(kb.sources.map((s) => s.source_id));
    const refs = [
      ...answer.reharms,
      ...answer.fills,
      ...answer.intros,
      ...answer.outros,
      ...answer.solos,
      ...answer.accompaniment,
      ...answer.fingerings,
    ].filter((r) => r.source_kind !== "derived");
    for (const r of refs) {
      const item = kb.byId.get(r.id);
      assert.ok(item);
      if (r.attribution === null) {
        assert.notEqual(item.origin, "extracted", `${r.id} có nguồn mà không ghi thầy`);
      } else {
        assert.equal(item.origin, "extracted", `${r.id} gán thầy mà không phải extracted`);
        assert.ok(registered.has(item.source?.source_id ?? ""), `${r.id} gán nguồn ma`);
      }
    }
  });

  it("prints hand shapes only from output.candidate.implementation (không tự nghĩ vai trò tay)", () => {
    for (const h of answer.handShapes) {
      const item = kb.byId.get(h.id);
      assert.ok(item, `invented hand shape: ${h.id}`);
      const impl = (item.output.candidate as { implementation?: Record<string, unknown> } | undefined)?.implementation;
      assert.ok(impl, `${h.id}: khuôn tay không có trong candidate`);
      if (h.left_hand !== null) assert.equal(h.left_hand, impl.left_hand);
      if (h.right_hand !== null) assert.equal(h.right_hand, impl.right_hand);
      assert.ok(h.left_hand !== null || h.right_hand !== null);
    }
  });

  it("puts the teacher's items before the seed ones", () => {
    for (const section of [answer.fills, answer.accompaniment, answer.voicings, answer.fingerings]) {
      const kinds = section.map((r) => r.source_kind);
      const lastTeacher = kinds.lastIndexOf("teacher");
      const firstSeed = kinds.indexOf("seed");
      if (lastTeacher >= 0 && firstSeed >= 0) assert.ok(firstSeed > lastTeacher, `seed xếp trước của thầy: ${kinds}`);
    }
  });

  it("only cites validated teacher items as the basis for a palette", () => {
    for (const r of answer.reharms) {
      for (const rule of r.applied_rules) {
        const item = kb.byId.get(rule.id);
        assert.ok(item, `${rule.id} không có trong kho`);
        assert.equal(item.origin, "extracted");
        assert.equal(item.status, "validated");
        // Bảng màu thường chỉ được dẫn rule; bảng suy được dẫn cả concept nêu cặp 7b9 - thứ.
        if (r.source_kind !== "derived") assert.equal(item.type, "rule");
      }
    }
  });

  it("attaches a rule to a palette only when that palette really uses it", () => {
    const has = (paletteId: string, ruleId: string) =>
      answer.reharms.find((r) => r.id === paletteId)?.applied_rules.some((x) => x.id === ruleId) ?? false;
    const SUS4 = "tap-01-bai-11-lesson-id-0011-03";
    const II_V_I = "tap-01-bai-07-lesson-id-00006";
    // Chỉ bảng màu 3 có G7sus4.
    assert.equal(has("color-l3-add9", SUS4), true);
    for (const p of ["color-l1-triads", "color-l2-sevenths", "color-l4-slash-upper", "color-l5-passing-dim"]) {
      assert.equal(has(p, SUS4), false, `${p} không có hợp âm sus mà vẫn dán rule Sus4`);
    }
    // Rule ii-V-I nói tới Bdim và E — không bảng nào trong vòng này có.
    for (const r of answer.reharms) {
      assert.equal(r.applied_rules.some((x) => x.id === II_V_I), false, `${r.id} dán rule ii-V-I không dùng tới`);
    }
  });

  it("does not count a plain triad as evidence that a marked chord is present", () => {
    const ctx = {
      roots: new Set(["C", "Am", "F", "G"]),
      qualities: new Set(["", "m"]),
      symbols: new Set(["C", "Am", "F", "G"]),
      style: "pop_ballad",
      cap: 5,
    };
    assert.equal(coversChords(["Gsus4", "G", "C"], ctx as never), false);
    assert.equal(coversChords(["C", "F", "G"], ctx as never), true);
    // Cmaj9 có nốt gốc C, không phải Cm.
    const ninths = { ...ctx, roots: new Set(["C", "Am", "F", "G"]), qualities: new Set(["maj9", "m9", "7sus4"]) };
    assert.equal(coversChords(["Gsus4", "C", "F"], ninths as never), true);
  });

  it("derives E7b9 before Am, and never A7b9 before F", () => {
    const derived = answer.reharms.find((r) => r.source_kind === "derived");
    assert.ok(derived, "không có bảng suy");
    assert.deepEqual(derived.chords, ["C", "E7b9", "Am", "F", "G"]);
    assert.equal(derived.origin, "derived");
    assert.equal(derived.status, "draft");
    assert.equal(derived.attribution, null, "bảng suy không được nhận là lời thầy");
    assert.ok(derived.derived_from_sources?.includes("tap-02-bai-07"), "phải dẫn bài của thầy");
    // Hợp âm chèn luôn là át (quãng 5 trên) của đúng hợp âm thứ đứng sau nó.
    const at = derived.chords.indexOf("E7b9");
    assert.equal(derived.chords[at + 1], "Am");
    assert.equal(derived.chords.some((c) => /^A7b9$/.test(c)), false, "không được đẻ ra A7b9");
  });

  it("does not derive when the progression has no minor degree to aim at", () => {
    const noVi = askMrHai({ key: "C", progression: ["I", "IV", "V"], style: "pop_ballad" }, kb);
    assert.equal(noVi.reharms.some((r) => r.source_kind === "derived"), false);
  });

  it("does not derive when the store has no teacher item pairing 7b9 with a minor chord", () => {
    const stripped = {
      ...kb,
      items: kb.items.filter((i) => !flatNineAuthorities(kb).includes(i)),
    };
    const bare = askMrHai({ key: "C", progression: PROG, style: "pop_ballad" }, stripped);
    assert.equal(bare.reharms.some((r) => r.source_kind === "derived"), false);
    assert.ok(bare.missing.some((m) => m.includes("7b9")), "phải báo thiếu thay vì tự chèn");
  });

  it("hides concepts and exercises until asked", () => {
    assert.deepEqual(answer.concepts, []);
    assert.deepEqual(answer.exercises, []);
    const asked = askMrHai({ key: "C", progression: PROG, style: "pop_ballad", explain: true, exercises: true }, kb);
    assert.ok(asked.concepts.length > 0);
    assert.ok(asked.exercises.length > 0);
    for (const c of asked.concepts) assert.equal(kb.byId.get(c.id)?.type, "concept");
    for (const e of asked.exercises) assert.equal(kb.byId.get(e.id)?.type, "exercise");
  });

  it("obeys rule-difficulty-caps-color", () => {
    const easy = askMrHai({ key: "C", progression: PROG, style: "pop_ballad", maxDifficulty: 2 }, kb);
    assert.ok(easy.reharms.length > 0);
    for (const r of easy.reharms) assert.ok(r.difficulty <= 2, `${r.id} above requested difficulty`);
  });

  it("says it is missing instead of inventing a palette for an unknown progression", () => {
    const odd = askMrHai({ key: "C", progression: ["I", "bVII", "IV", "I"] }, kb);
    assert.equal(odd.reharms.length, 0);
    assert.ok(odd.missing.some((m) => m.includes("Chưa có bảng màu")));
  });

  it("transposes instead of hardcoding C", () => {
    const eb = askMrHai({ key: "Eb", progression: ["ii", "V", "I"] }, kb);
    const l2 = eb.reharms.find((r) => r.id === "color-ii-v-i-l2");
    assert.ok(l2);
    assert.deepEqual(l2.chords, ["Fm7", "Bb7", "Ebmaj7"]);
  });
});
