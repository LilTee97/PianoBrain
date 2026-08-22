import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";
import { styleFromText } from "../mrhai/parse.js";

const kb = loadKnowledgeBase();
const say = (t: string) => reply(t, kb).join("\n");
const SOURCE_ID = "pianote-walking-bass-ballad";
const wb = kb.items.filter((i) => i.id.startsWith("pianote-wb-"));
const extracted = wb.filter((i) => i.origin === "extracted");

describe("nguồn Pianote — walking bass ballad", () => {
  it("nguồn mới đăng ký riêng, vẫn cùng teacher pianote", () => {
    const src = kb.sources.find((s) => s.source_id === SOURCE_ID);
    assert.ok(src, "chưa đăng ký nguồn");
    assert.equal(src.teacher_id, "pianote");
    assert.equal(src.kind, "video");
    assert.match(src.url ?? "", /Z5_ZQvr1d7w/);
    assert.ok(wb.length >= 13, `mới có ${wb.length} item`);
  });

  it("mọi item extracted trỏ đúng nguồn mới, có mốc, giữ draft", () => {
    for (const i of extracted) {
      assert.equal(i.source?.teacher_id, "pianote", `${i.id} gán nhầm thầy`);
      assert.equal(i.source?.source_id, SOURCE_ID, `${i.id} trỏ nhầm nguồn`);
      assert.ok(i.source?.locator, `${i.id} thiếu mốc`);
      assert.equal(i.status, "draft");
    }
  });

  it("không dính hai-joseph hay mack-grout", () => {
    for (const i of wb) {
      assert.notEqual(i.source?.teacher_id, "hai-joseph");
      assert.notEqual(i.source?.teacher_id, "mack-grout");
      assert.equal(i.input.style?.includes("jazz"), false, `${i.id} gắn nhầm jazz`);
    }
  });

  it("rổ unsure — số ngón — không thành extracted", () => {
    const u = kb.byId.get("pianote-wb-fingering-unsure");
    assert.ok(u);
    assert.equal(u.origin, "derived");
    assert.equal(u.source, null, "item unsure không được mang nguồn");
    assert.match(u.note_vi, /không ghi số ngón|KHÔNG phải lời/);
  });

  it("hỏi walking bass ballad thì ra 1-2-3-5 của pianote", () => {
    const out = say("walking bass ballad C Am F G");
    assert.match(out, /pianote/);
    assert.match(out, /1-2-3-5/);
    assert.doesNotMatch(out, /hai-joseph/);
    assert.doesNotMatch(out, /Slowrock/i);
  });

  it("công thức 1-2-3-5 là một từ, không rã thành bốn chữ số lẻ", () => {
    const hai = say("thầy Hải dạy walking bass 1-2-3-5 chưa");
    assert.match(hai, /CHƯA CÓ/, "thầy Hải dạy walking bass swing, không dạy công thức 1-2-3-5");
    assert.match(hai, /Nguồn khác đang có: pianote/);

    const pia = say("pianote dạy walking bass 1-2-3-5 chưa");
    assert.match(pia, /1-2-3-5/);
    assert.doesNotMatch(pia, /CHƯA CÓ/);
  });

  it("không cướp câu hỏi walking bass swing của thầy Hải", () => {
    const out = say("walking bass swing");
    assert.match(out, /hai-joseph/);
    assert.doesNotMatch(out, /pianote/);
  });

  it("điệu nói trước kỹ thuật: 'walking bass ballad' là ballad, không phải jazz", () => {
    assert.equal(styleFromText("walking bass ballad C Am F G"), "pop_ballad");
    assert.equal(styleFromText("walking bass swing"), "jazz");
    assert.equal(styleFromText("walking bass blues"), "blues");
  });
});
