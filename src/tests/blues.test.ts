import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";
import { styleFromText } from "../mrhai/parse.js";

const kb = loadKnowledgeBase();
const say = (t: string) => reply(t, kb).join("\n");
// Chỉ xét item của chính nguồn vừa ingest. Nhiều bài của thầy Hải cũng mang tag "blues"
// từ kho master — đó là dữ liệu cũ, không phải nhãn sai của lần ingest này.
const SOURCE_ID = "pianote-12-bar-blues";
const blues = kb.items.filter((i) => i.id.startsWith("pianote-blues-"));
const extracted = blues.filter((i) => i.origin === "extracted");

describe("nguồn Pianote — blues", () => {
  it("mọi item blues đều mang teacher_id pianote, không dính hai-joseph", () => {
    assert.ok(blues.length >= 14, `mới có ${blues.length} item`);
    assert.ok(kb.sources.some((s) => s.source_id === SOURCE_ID && s.kind === "video"));
    for (const i of extracted) {
      assert.equal(i.source?.teacher_id, "pianote", `${i.id} gán nhầm thầy`);
      assert.equal(i.source?.source_id, SOURCE_ID);
      assert.ok(i.source?.locator, `${i.id} thiếu mốc thời gian`);
    }
  });

  it("item ingest mới để status draft, chưa ai duyệt hộ", () => {
    for (const i of extracted) assert.equal(i.status, "draft");
  });

  it("rổ unsure không được thành extracted", () => {
    const unsure = kb.byId.get("pianote-blues-rh-octave-fingering-unsure");
    assert.ok(unsure);
    assert.equal(unsure.origin, "derived");
    assert.equal(unsure.source, null, "item unsure không được mang nguồn");
    assert.match(unsure.note_vi, /không nêu|KHÔNG phải lời/);
  });

  it("không item blues nào gắn nhãn pop_ballad", () => {
    for (const i of blues) {
      assert.equal(i.input.style?.includes("pop_ballad"), false, `${i.id} gắn nhầm pop_ballad`);
      assert.ok(i.input.style?.includes("blues"), `${i.id} thiếu tag blues`);
    }
  });

  it("hỏi đệm blues thì ra shuffle C-G/C-A của pianote, không nhắc thầy Hải", () => {
    const out = say("đệm 12 bar blues tông C tay trái làm gì");
    assert.match(out, /pianote/);
    assert.match(out, /C-G/);
    assert.match(out, /C-A/);
    assert.doesNotMatch(out, /hai-joseph/);
  });

  it("hỏi đích danh thầy Hải thì trả lời theo thầy Hải, không mượn clip Pianote", () => {
    const out = say("thầy Hải dạy 12 bar blues chưa");
    assert.match(out, /CHƯA CÓ/);
    assert.match(out, /hỏi riêng về hai-joseph/);
    assert.match(out, /Nguồn khác đang có: pianote/);
    // Không được liệt kê item pianote như thể là của thầy Hải.
    assert.doesNotMatch(out, /pianote-blues-\w+ ·/);
  });

  it("hỏi đích danh Pianote thì đếm đúng item của Pianote", () => {
    const out = say("pianote dạy 12 bar blues chưa");
    assert.match(out, /hỏi riêng về pianote/);
    assert.doesNotMatch(out, /CHƯA CÓ/);
  });

  it("suy điệu từ câu hỏi thay vì cứng pop_ballad", () => {
    assert.equal(styleFromText("đệm 12 bar blues tông C"), "blues");
    assert.equal(styleFromText("walking bass swing"), "jazz");
    assert.equal(styleFromText("đệm ballad C Am F G"), "pop_ballad");
  });

  it("hỏi blues không lôi khuôn ballad của thầy Hải ra trả lời", () => {
    const out = say("shuffle bass blues C-G C-A");
    assert.match(out, /pianote/);
    assert.doesNotMatch(out, /hai-joseph/);
  });
});
