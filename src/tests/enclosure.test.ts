import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";

const kb = loadKnowledgeBase();
const say = (t: string) => reply(t, kb).join("\n");
const SOURCE_ID = "charlie-tran-bebop-enclosure";
const items = kb.items.filter((i) => i.id.startsWith("charlie-enclosure-"));
const extracted = items.filter((i) => i.origin === "extracted");

describe("nguồn Charlie Tran — bebop enclosure", () => {
  it("nguồn đăng ký trước, teacher mới, mọi item trỏ đúng", () => {
    const src = kb.sources.find((s) => s.source_id === SOURCE_ID);
    assert.ok(src);
    assert.equal(src.teacher_id, "charlie-tran");
    assert.match(src.url ?? "", /KCkr8K2GreA/);
    assert.ok(kb.byId.get("charlie-tran"), "thiếu hồ sơ thầy charlie-tran");
    assert.ok(items.length >= 16, `mới có ${items.length} item`);
    for (const i of extracted) {
      assert.equal(i.source?.teacher_id, "charlie-tran", `${i.id} gán nhầm thầy`);
      assert.equal(i.source?.source_id, SOURCE_ID);
      assert.ok(i.source?.locator, `${i.id} thiếu mốc`);
      assert.equal(i.status, "draft");
    }
  });

  it("không dính hai-joseph, pianote hay mack-grout", () => {
    for (const i of items) {
      assert.notEqual(i.source?.teacher_id, "hai-joseph");
      assert.notEqual(i.source?.teacher_id, "pianote");
      assert.notEqual(i.source?.teacher_id, "mack-grout");
    }
  });

  it("unsure 13:36 không thành extracted", () => {
    const u = kb.byId.get("charlie-enclosure-slip-recovery-unsure");
    assert.ok(u);
    assert.equal(u.origin, "derived");
    assert.equal(u.source, null, "item unsure không được mang nguồn");
    assert.match(u.note_vi, /không có ký âm|KHÔNG phải lời/);
  });

  it("'2 nốt nửa cung trên' chỉ là ghi chú đính chính, không thành luật nửa cung", () => {
    const t1 = kb.byId.get("charlie-enclosure-4-note-two-above-two-below");
    assert.ok(t1);
    // Đính chính nằm trong note_vi và review_note, không nằm trong output.then của rule nào.
    assert.match(t1.note_vi, /D cách C một NGUYÊN CUNG/);
    assert.match(t1.note_vi, /KHÔNG phải luật/);
    assert.equal(t1.type, "solo_idea", "đây là khung nốt, không phải rule");
    const intervals = t1.output.intervals_from_target as Record<string, string>;
    assert.equal(intervals.D, "nguyên cung trên");
    assert.equal(intervals.Db, "nửa cung trên");

    // Không rule nào của Charlie khẳng định hai nốt trên đều là nửa cung.
    for (const r of items.filter((i) => i.type === "rule")) {
      assert.doesNotMatch(JSON.stringify(r.output), /hai nốt nửa cung|2 nốt nửa cung/);
    }
  });

  it("hỏi enclosure vào bậc 3 của C thì ra charlie-tran, không ra thầy Hải", () => {
    const out = say("enclosure vào bậc 3 của C");
    assert.match(out, /charlie-tran/);
    assert.doesNotMatch(out, /hai-joseph/);
  });

  it("không cướp câu hỏi ballad của thầy Hải", () => {
    const out = say("đệm ballad C Am F G");
    assert.match(out, /hai-joseph/);
    assert.doesNotMatch(out, /charlie-tran/);
  });
});
