import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";

const kb = loadKnowledgeBase();
const say = (t: string) => reply(t, kb).join("\n");
const SOURCE_ID = "mack-grout-251-lick";
const mack = kb.items.filter((i) => i.id.startsWith("mack-251-"));
const extracted = mack.filter((i) => i.origin === "extracted");

describe("nguồn Mack Grout — jazz lick ii-V-I", () => {
  it("nguồn được đăng ký trước, mọi item trỏ đúng về nó", () => {
    assert.ok(kb.sources.some((s) => s.source_id === SOURCE_ID && s.kind === "video"));
    assert.ok(mack.length >= 13, `mới có ${mack.length} item`);
    for (const i of extracted) {
      assert.equal(i.source?.teacher_id, "mack-grout", `${i.id} gán nhầm thầy`);
      assert.equal(i.source?.source_id, SOURCE_ID);
      assert.ok(i.source?.locator, `${i.id} thiếu mốc thời gian`);
    }
  });

  it("ingest mới để draft, không tự duyệt hộ", () => {
    for (const i of extracted) assert.equal(i.status, "draft");
  });

  it("không trộn nhãn sang thầy Hải hay Pianote", () => {
    for (const i of mack) {
      assert.ok(i.input.style?.includes("jazz"), `${i.id} thiếu tag jazz`);
      assert.equal(i.input.style?.includes("pop_ballad"), false, `${i.id}`);
      assert.equal(i.input.style?.includes("blues"), false, `${i.id}`);
    }
  });

  it("rổ unsure — nốt chromatic G7 sang C — không thành extracted", () => {
    const u = kb.byId.get("mack-251-chromatic-g7-to-c-unsure");
    assert.ok(u);
    assert.equal(u.origin, "derived");
    assert.equal(u.source, null, "item unsure không được mang nguồn");
    assert.match(u.note_vi, /chưa có nốt cố định|KHÔNG phải lời/);
  });

  it("nốt Bb/A trên G7 ghi rõ là nghe không chắc, không phải nốt cố định", () => {
    const lick = kb.byId.get("mack-251-full-lick-c-major");
    assert.ok(lick);
    assert.match(lick.note_vi, /nghe không chắc/);
    assert.match(lick.note_vi, /KHÔNG coi là nốt cố định/);
    const uncertain = lick.output.uncertain_notes as { heard_as: string[] }[];
    assert.deepEqual(uncertain[0].heard_as, ["Bb", "A"]);
  });

  it("hỏi lick ii-V-I thì ra Mack Grout, không ra Hải Piano", () => {
    const out = say("lick ii-V-I jazz giọng C");
    assert.match(out, /mack-grout/);
    assert.doesNotMatch(out, /hai-joseph/);
    assert.doesNotMatch(out, /pianote/);
  });

  it("hỏi đích danh thầy Hải về lick thì trả lời CHƯA, không mượn clip Mack Grout", () => {
    const out = say("thầy Hải dạy lick ii-V-I chưa");
    assert.match(out, /CHƯA CÓ/);
    assert.match(out, /hỏi riêng về hai-joseph/);
    assert.match(out, /Nguồn khác đang có: mack-grout/);
  });
});
