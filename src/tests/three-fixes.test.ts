import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";
import { generateFill } from "../mrhai/fill.js";
import { vocalFromText } from "../mrhai/parse.js";
import { degreeRoot } from "../mrhai/theory.js";

const kb = loadKnowledgeBase();
const say = (t: string) => reply(t, kb).join("\n");

describe("1. nói đúng phách nốt thật sự rơi vào", () => {
  it("preceding 3-2-1 nằm gọn ở phách 4 thì phải viết 'phách 4'", () => {
    const p = generateFill(
      { key: "C", progression: ["I", "V", "vi", "IV"], vocal: "hát,hát,nghỉ,hát" },
      kb,
    )!;
    const beats = p.bars[0].rh.filter((n) => n.note).map((n) => n.beat);
    assert.ok(beats.every((b) => b >= 4));
    const line = p.generic.find((g) => g.includes("ca sĩ nghỉ"))!;
    assert.match(line, /phách 4 ô/);
    assert.doesNotMatch(line, /phách 3-4/);
  });

  it("câu bốn nốt trải phách 3-4 thì vẫn viết 'phách 3-4'", () => {
    const p = generateFill(
      { key: "C", progression: ["I", "vi", "IV", "V"], vocal: "hát,nghỉ,hát,hát" },
      kb,
    )!;
    assert.match(p.generic.find((g) => g.includes("ca sĩ nghỉ"))!, /phách 3-4 ô/);
  });
});

describe("2. tông giáng viết đúng chính tả nhạc", () => {
  it("giọng Cb: bậc I là Cb, IV là Fb, V là Gb, vii là Bb", () => {
    assert.equal(degreeRoot("I", "Cb"), "Cb");
    assert.equal(degreeRoot("IV", "Cb"), "Fb");
    assert.equal(degreeRoot("V", "Cb"), "Gb");
    assert.equal(degreeRoot("vii", "Cb"), "Bb");
  });

  it("chat in lại đúng tên người học gõ", () => {
    assert.match(say("Cb Fb Bbm Gb xếp bậc"), /Cb=I, Fb=IV, Bbm=vii, Gb=V/);
  });

  it("các tông cũ không đổi", () => {
    assert.match(say("C Am F G xếp bậc"), /C=I, Am=vi, F=IV, G=V/);
    assert.match(say("Eb Ab Bb Eb xếp bậc"), /Eb=I, Ab=IV, Bb=V, Eb=I/);
    assert.equal(degreeRoot("V", "D"), "A");
    assert.equal(degreeRoot("vi", "D"), "B");
  });
});

describe("3. chat đọc được chỗ ca sĩ nghỉ", () => {
  it("hiểu 'ô 3 nghỉ'", () => {
    assert.deepEqual(vocalFromText("câu lót C G Am F ô 3 nghỉ", 4), [true, true, false, true]);
    assert.match(say("câu lót C G Am F ô 3 nghỉ"), /đúng ô ca sĩ nghỉ/);
  });

  it("hiểu danh sách 'hát,hát,nghỉ,hát'", () => {
    assert.deepEqual(vocalFromText("hát,hát,nghỉ,hát", 4), [true, true, false, true]);
    assert.match(say("câu lót C G Am F hát,hát,nghỉ,hát"), /đúng ô ca sĩ nghỉ/);
  });

  it("hiểu 'hát kín' và không in dòng rỗng", () => {
    assert.equal(vocalFromText("câu lót C G Am F hát kín", 4), "full");
    const out = say("câu lót C G Am F hát kín");
    assert.match(out, /chỉ giữ pad, không lót/);
    assert.match(out, /tay phải để trống/);
    assert.match(out, /Ca sĩ hát kín/);
    assert.doesNotMatch(out, /→ {2,}\(/, "không được in dòng nốt rỗng");
  });

  it("không nói gì về giọng hát thì vẫn cảnh báo như cũ", () => {
    assert.equal(vocalFromText("câu lót C G Am F", 4), undefined);
    assert.match(say("câu lót C G Am F"), /Không biết chỗ ca sĩ nghỉ, chỉ đặt fill cuối câu\./);
  });

  it("thầy Hải vẫn đứng trước Kingsley ở mọi kiểu vocal", () => {
    for (const q of ["câu lót C G Am F", "câu lót C G Am F ô 3 nghỉ", "câu lót C G Am F hát kín"]) {
      const lines = reply(q, kb);
      const hai = lines.findIndex((l) => l.includes("[hai-joseph]"));
      const king = lines.findIndex((l) => l.includes("suy từ kingsley"));
      assert.ok(hai >= 0 && hai < king, `${q}: Kingsley chen lên trước thầy Hải`);
    }
  });
});
