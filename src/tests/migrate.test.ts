import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { convertFormal, convertMaster, fingeringOf, slug, type MasterRow } from "../migrate/importMaster.js";

const masterRow = {
  item_id: "lesson_id_00009_pattern_test",
  course_id: "hai_piano_course_001",
  module_id: "Tap_09",
  lesson_folder: "Tap_09_Bai_02",
  lesson_id: "hai_piano_course_001_lesson_09",
  source_id: "video_input_3",
  timestamp_start: "02:10",
  timestamp_end: "03:00",
  pdf_page: 4,
  supporting_sources: [{ source_id: "pdf_tap_09", page: 4, section: "Ballad Dạng 2" }],
  type: "pattern",
  raw_text: "Dạng 2 tay trái chơi 1-5-1-3 móc đơn; vừa giữ nhịp vừa giữ hòa âm.",
  music_entities: { chords: ["C", "Am"], tensions: [], keys: ["C Major"], scales: [], styles: ["Slow Ballad"] },
  observed_example: { chord_symbol: "C", notes: ["C3", "G3"] },
  confidence: "direct",
  status: "extracted",
} satisfies MasterRow;

const formalRow = {
  rule_id: "Tap_09_Bai_02_R_00007_TEST",
  rule_type: "voicing_choice",
  name: "Test rule",
  description: "Mô tả tiếng Việt",
  applies_when: { chord_symbol: "G7", chord_quality: "dominant7", style_tags: ["Slow Ballad", "Jazz"] },
  action: { generate: [] },
  avoid_when: ["khi hát nốt cao"],
  source_refs: [
    { lesson_folder: "Tap_09_Bai_02", timestamp_start: "02:10", timestamp_end: "03:00", pdf_page: 4 },
    { lesson_folder: "Tap_09_Bai_02", timestamp_start: "10:00", timestamp_end: "11:00", pdf_page: 7 },
  ],
  confidence: "direct",
  status: "approved",
};

const ok = (res: ReturnType<typeof convertMaster>) => {
  assert.ok(!("skip" in res), `unexpected skip: ${JSON.stringify(res)}`);
  return res.item;
};

describe("master import — source knowledge layer", () => {
  it("keeps every provenance field the master row carries", () => {
    const i = ok(convertMaster(masterRow));
    assert.equal(i.origin, "extracted");
    assert.equal(i.source?.source_id, "tap-09-bai-02");
    assert.equal(i.source?.locator, "02:10-03:00 pdf p.4");
    assert.equal(i.source?.media_id, "video_input_3");
    assert.deepEqual(i.source?.supporting, masterRow.supporting_sources);
  });

  it("keeps raw_text whole, plus music entities and the observed example", () => {
    const i = ok(convertMaster(masterRow));
    assert.equal(i.note_vi, masterRow.raw_text);
    assert.deepEqual(i.output.music_entities, masterRow.music_entities);
    assert.deepEqual(i.output.observed_example, masterRow.observed_example);
    assert.equal(i.output.master_type, "pattern");
    assert.deepEqual(i.use_when, ["Hợp âm: C, Am", "Giọng: C Major", "Điệu / phong cách: Slow Ballad"]);
  });

  it("turns a warning into an avoid_when line instead of dropping it", () => {
    const i = ok(convertMaster({ ...masterRow, type: "warning" }));
    assert.deepEqual(i.avoid_when, [masterRow.raw_text]);
  });

  it("skips rows with no raw_text rather than filling one in", () => {
    assert.ok("skip" in convertMaster({ ...masterRow, raw_text: "  " }));
  });
});

describe("master import — formalized layer", () => {
  it("keeps every timestamp, not just the first", () => {
    const i = ok(convertFormal(formalRow));
    assert.equal(i.source?.locator, "02:10-03:00 pdf p.4");
    assert.deepEqual(i.source?.extra_locators, ["10:00-11:00 pdf p.7"]);
  });

  it("keeps needs_human_review as draft (giữ lại, không vứt, không tự duyệt hộ)", () => {
    const i = ok(convertFormal({ ...formalRow, status: "needs_human_review" }));
    assert.equal(i.status, "draft");
    assert.equal(i.origin, "extracted");
  });

  it("keeps rejected items as rejected so the same mistake is not repeated", () => {
    assert.equal(ok(convertFormal({ ...formalRow, status: "rejected" })).status, "rejected");
  });

  it("only marks direct extractions validated; inferred stays draft", () => {
    assert.equal(ok(convertFormal(formalRow)).status, "validated");
    assert.equal(ok(convertFormal({ ...formalRow, confidence: "inferred" })).status, "draft");
  });

  it("maps free-text style tags onto the tags Mr Hai filters by", () => {
    const style = ok(convertFormal(formalRow)).input.style;
    assert.ok(style?.includes("pop_ballad"));
    assert.ok(style?.includes("jazz"));
  });

  it("keeps a rejected rule whose description is empty by falling back to the candidate", () => {
    const res = convertFormal(
      { ...formalRow, description: "", name: "", status: "rejected" },
      { statement: "Tay trái bắt buộc chơi legato cho tuyến bass." },
    );
    const i = ok(res);
    assert.equal(i.status, "rejected");
    assert.equal(i.note_vi, "Tay trái bắt buộc chơi legato cho tuyến bass.");
  });

  it("still skips a rule with neither description nor candidate", () => {
    assert.ok("skip" in convertFormal({ ...formalRow, description: "", name: "" }));
  });

  it("attaches the candidate layer and the review reason", () => {
    const cand = { conditions: { key_type: "major" }, implementation: { left_hand: "1-5" }, examples: ["C -> F"] };
    const i = ok(convertFormal(formalRow, cand, "rule_needs_review: missing source"));
    assert.deepEqual(i.output.candidate, cand);
    assert.equal(i.output.review_reason, "rule_needs_review: missing source");
  });

  it("re-types a rule as a fingering when the candidate names finger numbers", () => {
    const cand = { implementation: { finger_root: 5, finger_fifth: 2 } };
    const i = ok(convertFormal(formalRow, cand));
    assert.equal(i.type, "fingering");
    assert.deepEqual(i.output.fingering, cand.implementation);
    // implementation nói vai trò tay, không nói số ngón -> vẫn là rule
    assert.equal(fingeringOf({ implementation: { left_hand: "Root - 5th" } }), null);
  });

  it("slugs ids to kebab-case", () => {
    assert.equal(slug("Tap_01_Bai_01_R_00001_SMOOTH"), "tap-01-bai-01-r-00001-smooth");
  });
});
