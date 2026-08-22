import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";

const kb = loadKnowledgeBase();
const say = (text: string) => reply(text, kb).join("\n");

describe("chat — trả lời đúng câu hỏi, không đổ cả kho", () => {
  it("hỏi xếp bậc thì chỉ trả bậc", () => {
    const out = say("vòng C Am F G trên tone C xếp bậc sao");
    assert.match(out, /C=I/);
    assert.match(out, /Am=vi/);
    assert.match(out, /F=IV/);
    assert.match(out, /G=V/);
    for (const unwanted of ["Phối lại", "Câu lót", "Thế ngón", "Khuôn đệm", "kiểm kê"]) {
      assert.doesNotMatch(out, new RegExp(unwanted), `hỏi bậc mà vẫn in "${unwanted}"`);
    }
    assert.ok(out.split("\n").length <= 2, `dài quá: ${out.split("\n").length} dòng`);
  });

  it("hỏi phối thì có bảng màu, không bắt buộc kèm câu lót hay thế ngón", () => {
    const out = say("phối C Am F G");
    assert.match(out, /\|/, "phải in ít nhất một vòng hợp âm");
    assert.doesNotMatch(out, /Thế ngón|thế ngón/);
  });

  it("chỉ lôi bảng màu seed ra khi người học xin khó hơn", () => {
    const plain = say("phối C Am F G");
    const hard = say("phối C Am F G khó hơn");
    assert.doesNotMatch(plain, /\[seed\]/);
    assert.match(hard, /\[seed\]/);
    assert.ok(hard.split("\n").length <= 4);
  });

  it("hỏi kho có chưa thì kiểm toán, không dump vòng hợp âm", () => {
    const out = say("thầy dạy E7b9 về Am chưa");
    assert.match(out, /ĐÃ CÓ|CHƯA CÓ|SUY LUẬN/);
    assert.match(out, /\[kiểm kê\]/);
    assert.doesNotMatch(out, /C=I|Am=vi/);
  });

  it("hỏi câu lót thì chỉ ra câu lót, tối đa hai cái", () => {
    const out = say("câu lót vòng 1 6 4 5 giọng C");
    assert.doesNotMatch(out, /hạ cánh|Mật độ/);
    assert.ok(out.split("\n").filter((l) => l.includes("·")).length <= 2);
  });

  it("hỏi chạy ngón thì ra nốt, và bậc vi vẫn là hợp âm thứ", () => {
    const out = say("chạy ngón trên C Am F G");
    assert.match(out, /C → Am/);
    assert.match(out, /hạ cánh C5/);
    assert.doesNotMatch(out, /C#/);
  });

  it("đưa vòng mà chưa nói muốn gì thì xếp bậc rồi hỏi lại một câu", () => {
    const out = say("C Am F G");
    assert.match(out, /C=I/);
    assert.match(out, /Em muốn thầy phối, câu lót, hay chạy ngón\?/);
  });

  it("chào thì chào lại, không lôi kho ra tra", () => {
    const out = say("xin chào thầy");
    assert.match(out, /Chào em/);
    assert.doesNotMatch(out, /\[kiểm kê\]|tap-0/);
  });

  it("giữ chất hợp âm người học gõ và gắn nhãn suy luận cho câu chạy", () => {
    const out = say("chạy ngón từ Cmaj7 sang Am");
    assert.match(out, /\[suy từ nguyên lý\] Cmaj7 → Am/);
    assert.match(out, /hạ cánh C5/);
  });

  it("câu vô nghĩa thì hỏi lại, không đoán vòng", () => {
    assert.match(say("hôm nay trời đẹp"), /Thầy chưa rõ ý em/);
  });
});
