import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";

const kb = loadKnowledgeBase();
const say = (t: string) => reply(t, kb).join("\n");
const SOURCE_ID = "kingsley-pop-ballad-fills";
const extracted = kb.items.filter((i) => i.source?.source_id === SOURCE_ID);
const invented = kb.items.filter((i) => i.id.startsWith("demo-kingsley-"));

describe("nguồn Kingsley — fill / intro / outro / solo pop ballad", () => {
  it("11 item extracted, mỗi cái trỏ đúng nguồn và có locator", () => {
    const src = kb.sources.find((s) => s.source_id === SOURCE_ID);
    assert.ok(src);
    assert.equal(src.teacher_id, "kingsley");
    assert.equal(extracted.length, 11, `phải đúng 11 item extracted, đang có ${extracted.length}`);
    for (const i of extracted) {
      assert.equal(i.origin, "extracted");
      assert.equal(i.status, "draft");
      assert.equal(i.source?.teacher_id, "kingsley");
      assert.ok(i.source?.locator?.includes("Folder"), `${i.id} thiếu tên folder làm locator`);
    }
  });

  it("4 bảng phách là invented, không mang nguồn, nói rõ không phải sheet của khóa", () => {
    assert.equal(invented.length, 4, `phải đúng 4 item invented, đang có ${invented.length}`);
    for (const i of invented) {
      assert.equal(i.origin, "invented");
      assert.equal(i.status, "draft");
      assert.equal(i.source, null, `${i.id} không được mang nguồn`);
      assert.match(i.note_vi, /TỰ SOẠN/);
      assert.match(i.note_vi, /KHÔNG phải bản ký âm/);
      assert.ok((i.output.inspired_by as string[]).length > 0);
    }
  });

  it("bảng có phách và quãng tám cụ thể thì phải là invented, không được nhận là extracted", () => {
    // Ví dụ C5-B4-G4-E4: chuỗi có quãng tám chỉ được nằm trong item invented.
    for (const i of extracted) {
      assert.doesNotMatch(JSON.stringify(i.output), /[A-G][b#]?[0-9]/, `${i.id} chứa quãng tám cụ thể — phải là invented`);
    }
    assert.match(JSON.stringify(invented.find((i) => i.id.includes("fill-grid"))), /C5 - B4 - G4 - E4/);
  });

  it("không gọi Fast 3-2-1 trên bass Am là trill Am", () => {
    const all = JSON.stringify([...extracted, ...invented]);
    // Chữ "trill" chỉ được xuất hiện kèm phủ định, không bao giờ đứng như một lời khuyên.
    for (const m of all.matchAll(/.{0,26}trill/gi)) {
      assert.match(m[0], /KHÔNG phải|không phải|Đừng|đừng/, `gọi trill mà không phủ định: ${m[0]}`);
    }
    const overBass = kb.byId.get("kingsley-rh-c-fill-over-f-am-bass");
    assert.ok(overBass);
    assert.match(overBass.note_vi, /KHÔNG phải trill trên Am/);
    assert.match(String((overBass.output.resulting_sound as Record<string, string>).over_Am), /Am7/);
  });

  it("hai chỗ bản ghi nói sai đã được đính chính, không thành luật", () => {
    const run = kb.byId.get("kingsley-run-4-3-1-5");
    assert.match(String(run!.output.review_note), /không có F/);
    assert.match(run!.note_vi, /KHÔNG phải câu ngũ cung/);
    const sixth = kb.byId.get("kingsley-6th-fill-1-7-5-3");
    assert.match(String(sixth!.output.review_note), /quãng 6 dưới|Quãng 6 dưới/);
  });

  it("không sót đánh dấu [cite:] trong kho", () => {
    assert.doesNotMatch(JSON.stringify(kb.items), /\[cite/i);
  });

  it("nguồn mới nằm cạnh thầy Hải, không thay: kho vẫn đủ item của thầy", () => {
    const hai = kb.items.filter((i) => i.source?.teacher_id === "hai-joseph");
    assert.ok(hai.length >= 740, `chỉ còn ${hai.length} item của thầy Hải`);
  });

  it("hỏi fill sus2 sang 3 thì ra kingsley, không ra thầy Hải", () => {
    const out = say("fill sus2 sang 3 ballad");
    assert.match(out, /kingsley/);
    assert.doesNotMatch(out, /hai-joseph/);
  });

  it("hỏi 6th fill vào Am thì ra kingsley, không ra thầy Hải", () => {
    const out = say("6th fill vào Am");
    assert.match(out, /kingsley-6th-fill/);
    assert.doesNotMatch(out, /hai-joseph/);
  });
});
