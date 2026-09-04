import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";

const kb = loadKnowledgeBase();
const CU = "rule-interlude-plain-harmony";
const MOI = "rule-linh-nhi-solo-giu-mau";

/**
 * LUẬT CŨ ĐÃ BỊ SỐ ĐO LẬT — file này canh đúng chỗ ấy.
 *
 * `rule-interlude-plain-harmony` nói đoạn không lời phải rút hợp âm về tính chất cơ
 * bản. Nó suy từ nguyên lý chung, đặt lúc kho **chưa có bản ký âm của thầy nào**, và
 * chú thích của chính nó thừa nhận điều đó.
 *
 * Đo bảy bản ký âm Linh Nhi (3 trưởng, 4 thứ), đếm chất hợp âm rồi tách theo đoạn:
 *
 * | | hợp âm trơn | có màu |
 * |---|---|---|
 * | đoạn không lời | 105 (**78%**) | 30 |
 * | đoạn có lời | 417 (**77%**) | 125 |
 *
 * Tỉ lệ y hệt nhau. Thầy **không** rút hợp âm đoạn không lời về chất cơ bản.
 *
 * Sai chi tiết hơn nữa: luật cũ **chặn** `dim`, `6`, `m6`, `9` — mà đoạn solo của thầy
 * có `dim` 5 lần, `m6` 2 lần, `dominant-9th` 1 lần. Ngược lại nó **cho phép** `maj7`,
 * đúng cái duy nhất thầy tránh: `maj7` gặp 20 lần ở đoạn hát và **0 lần** trong 30 hợp
 * âm màu của đoạn solo.
 *
 * Người dùng chốt thành chính sách chung: **khi học theo tư duy của một thầy thì luật
 * rút từ sheet của thầy ấy được ưu tiên, và luật mình tự đặt trước đó phải bỏ nếu xung
 * đột.** Bỏ hẳn, không dung hoà.
 *
 * File này giữ lại thay vì xoá, để chặn việc bật lại luật cũ mà không ai thấy.
 */
describe("luật rút hợp âm về chất trơn đã bị số đo lật", () => {
  const cu = kb.byId.get(CU);
  const moi = kb.byId.get(MOI);

  it("luật cũ vẫn còn trong kho, không bị xoá dấu vết", () => {
    assert.ok(cu, `kho thiếu ${CU}`);
    assert.equal(cu!.type, "rule");
  });

  it("luật cũ đã bị đánh dấu rejected", () => {
    assert.equal(
      cu!.status,
      "rejected",
      "bật lại luật này là quay về thứ số đo đã bác — đọc note_vi trước khi đổi",
    );
  });

  it("luật cũ vẫn là suy luận chung, không được gán cho thầy nào", () => {
    /* Luật chống bịa: derived thì không mang tên thầy và không có nguồn. */
    assert.equal(cu!.origin, "derived");
    assert.equal(cu!.source, null);
  });

  it("note_vi của luật cũ ghi lại số đo đã lật nó", () => {
    const note = cu!.note_vi ?? "";
    assert.ok(note.includes("78%"), "phải ghi tỉ lệ đoạn không lời");
    assert.ok(note.includes("77%"), "phải ghi tỉ lệ đoạn có lời");
    assert.ok(note.includes("maj7"), "phải ghi chất duy nhất thầy tránh");
  });

  it("có luật thay thế, và nó cũng là derived + draft", () => {
    assert.ok(moi, `kho thiếu ${MOI}`);
    assert.equal(moi!.type, "rule");
    /*
      Đo từ nốt trên bản ký âm, KHÔNG phải lời thầy nói — nên derived, và người dùng
      tự rà nên draft. Không gán thầy vì chưa ai giảng điều này thành lời.
    */
    assert.equal(moi!.origin, "derived");
    assert.equal(moi!.status, "draft");
    assert.equal(moi!.source, null);
  });

  it("luật mới nói ngược lại luật cũ, không dung hoà", () => {
    const out = moi!.output as { then: string; note: string };
    assert.match(out.then, /KHONG rut ve chat co ban/);
    assert.match(out.note, /maj7/);
  });

  it("luật mới ghi rõ cỡ mẫu, không nói suông", () => {
    const inp = moi!.input as { do_tren: string };
    assert.match(inp.do_tren, /7 ban ky am/);
    assert.match(inp.do_tren, /135/);
  });
});
