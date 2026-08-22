import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";

const kb = loadKnowledgeBase();
const RULE = "rule-interlude-plain-harmony";

/**
 * Luật hòa âm cho đoạn giang tấu.
 *
 * Giang tấu là chỗ ngẫu hứng: tai bám vào đường giai điệu chứ không bám vào màu
 * hợp âm. Chồng add9, 6/9, 13 hay hợp âm giảm lên nền solo thì nốt ngoài giọng
 * nhiều tới mức câu chạy nghe lạc. Luật này nói lấy vòng **gốc** trước tái hòa
 * âm, rút về tính chất cơ bản, và để màu cho phần có lời.
 */
describe("giang tấu: hợp âm gốc, không tô màu", () => {
  const item = kb.byId.get(RULE);

  it("có trong kho, đúng kiểu rule", () => {
    assert.ok(item, `kho thiếu ${RULE}`);
    assert.equal(item!.type, "rule");
  });

  it("là suy luận chung nên không được gán cho thầy nào", () => {
    /*
      Chưa có bài giảng nào trong kho nói thẳng điều này. Luật chống bịa: mức
      derived thì không được mang tên thầy, không được có nguồn, và không bao
      giờ được đóng dấu đã rà.
    */
    assert.equal(item!.origin, "derived");
    assert.equal(item!.status, "draft");
    assert.equal(item!.source, null);
  });

  it("cấm đúng những màu làm loãng nền solo", () => {
    const blocked = (item!.input as { blocked_qualities: string[] })
      .blocked_qualities;

    for (const quality of ["add9", "69", "13", "dim", "dim7", "7b9", "maj7#11"]) {
      assert.ok(
        blocked.includes(quality),
        `${quality} phải nằm trong danh sách cấm của vòng giang tấu`,
      );
    }
  });

  it("vẫn cho phép màu cơ bản, đủ để đệm nghe không rỗng", () => {
    const allowed = (item!.input as { allowed_qualities: string[] })
      .allowed_qualities;

    for (const quality of ["maj", "min", "7", "maj7", "m7", "sus2", "sus4"]) {
      assert.ok(allowed.includes(quality), `giang tấu phải dùng được ${quality}`);
    }
    // Hợp âm nửa giảm giữ lại cho bậc hai giáng năm thật.
    assert.ok(allowed.includes("m7b5"));
  });

  it("không màu nào vừa được phép vừa bị cấm", () => {
    const input = item!.input as {
      allowed_qualities: string[];
      blocked_qualities: string[];
    };
    const blocked = new Set(input.blocked_qualities);

    for (const quality of input.allowed_qualities) {
      assert.ok(!blocked.has(quality), `${quality} vừa cho vừa cấm`);
    }
  });

  it("nói rõ lấy vòng hợp âm ở đâu và ưu tiên thang âm", () => {
    const input = item!.input as { progression_source: string };
    assert.match(input.progression_source, /gốc/);
    assert.match(
      (item!.output as { then: string }).then,
      /thang âm|ngũ cung/,
    );
  });
});
