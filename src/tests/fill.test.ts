import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase, type KnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";
import { generateFill } from "../mrhai/fill.js";

const kb = loadKnowledgeBase();
const notesOf = (p: ReturnType<typeof generateFill>) =>
  p!.bars[0].rh.filter((n) => n.note).map((n) => n.note);

describe("bộ sinh câu lót — áp công thức Kingsley lên vòng bất kỳ", () => {
  it("ô ngay trước vi đúng là bậc I thì mới dùng 1-7-5-3; tông C ra C-B-G-E", () => {
    const p = generateFill({ key: "C", progression: ["I", "vi", "IV", "V"] }, kb)!;
    assert.equal(p.choice.pattern, "6th fill 1-7-5-3");
    assert.deepEqual(p.choice.degrees, [1, 7, 5, 3]);
    assert.deepEqual(notesOf(p), ["C5", "B4", "G4", "E4"]);
    assert.equal(p.bars[1].chord, "Am");
    assert.ok(p.authorized_by.includes("kingsley-6th-fill-1-7-5-3"));
  });

  it("không hardcode tông C: cùng vòng ở tông D ra câu khác hẳn", () => {
    const c = generateFill({ key: "C", progression: ["I", "vi", "IV", "V"] }, kb)!;
    const d = generateFill({ key: "D", progression: ["I", "vi", "IV", "V"] }, kb)!;
    assert.deepEqual(notesOf(d), ["D5", "C#5", "A4", "F#4"]);
    assert.notDeepEqual(notesOf(d), notesOf(c));
    assert.equal(d.bars[1].chord, "Bm");
    assert.equal(d.choice.pattern, c.choice.pattern, "cùng công thức, khác nốt");
  });

  it("không dùng sus4 trên bậc IV", () => {
    const p = generateFill({ key: "C", progression: ["I", "vi", "IV", "V"] }, kb)!;
    assert.doesNotMatch(JSON.stringify(p), /Bb\d/, "Bb là sus4 của F, không được xuất hiện");
    assert.doesNotMatch(p.choice.pattern, /sus4/);
  });

  it("ô trước vi KHÔNG phải bậc I thì cấm 1-7-5-3, lùi về preceding 3-2-1", () => {
    const p = generateFill({ key: "C", progression: ["I", "V", "vi", "IV"] }, kb)!;
    assert.equal(p.choice.pattern, "preceding 3-2-1");
    assert.equal(p.choice.built_on, "V");
    assert.deepEqual(notesOf(p), ["B4", "A4", "G4"]);
    // Không được ghi công 6th fill cho Kingsley ở chỗ này.
    assert.equal(p.authorized_by.includes("kingsley-6th-fill-1-7-5-3"), false);
    assert.ok(p.authorized_by.includes("kingsley-preceding-3-2-1"));
    assert.match(p.choice.why, /không phải bậc I/);
    // Vẫn hạ cánh đúng bậc 3 của Am.
    assert.equal(p.lands_on.note, "C5");
  });

  it("cụm preceding rơi vào phách 4, có nốt hoa mỹ b3 viết bằng dấu giáng", () => {
    const p = generateFill({ key: "C", progression: ["I", "V", "vi", "IV"] }, kb)!;
    const first = p.bars[0].rh.find((n) => n.note)!;
    assert.equal(first.beat, 4);
    assert.equal(first.grace, "Bb4", "b3 của G là Bb, không phải A#");
    assert.ok(p.authorized_by.includes("kingsley-flat3-to-3-grace"));
  });

  it("C - C - Am cũng đủ điều kiện dùng 1-7-5-3", () => {
    const p = generateFill({ key: "C", progression: ["I", "I", "vi"] }, kb)!;
    assert.equal(p.choice.pattern, "6th fill 1-7-5-3");
    assert.deepEqual(notesOf(p), ["C5", "B4", "G4", "E4"]);
  });

  it("vào bậc IV hoặc ii thì đổi sang 4-3-1-6", () => {
    const p = generateFill({ key: "C", progression: ["I", "IV", "V", "I"] }, kb)!;
    assert.equal(p.choice.pattern, "6th fill 4-3-1-6");
    assert.deepEqual(notesOf(p), ["F4", "E4", "C4", "A3"]);
    assert.ok(p.authorized_by.includes("kingsley-6th-fill-4-3-1-6"));
  });

  it("chuyển tông thì mọi nốt theo thang âm của tông đó", () => {
    const p = generateFill({ key: "Eb", progression: ["I", "IV", "V", "I"] }, kb)!;
    assert.deepEqual(notesOf(p), ["Ab4", "G4", "Eb4", "C4"]);
  });

  it("hạ cánh vào bậc 3 của hợp âm đích ở phách 1", () => {
    const p = generateFill({ key: "C", progression: ["I", "vi", "IV", "V"] }, kb)!;
    assert.equal(p.bars[1].rh[0].beat, 1);
    assert.equal(p.bars[1].rh[0].degree, 3);
    assert.equal(p.lands_on.note, "C5");
  });

  it("chỉ một câu lót, và nói rõ vì sao chỉ một", () => {
    const p = generateFill({ key: "C", progression: ["I", "vi", "IV", "V"] }, kb)!;
    assert.equal(p.bars.length, 2);
    assert.ok(p.missing.some((m) => m.includes("MỘT câu lót")));
  });

  it("kho không có item Kingsley thì không sinh, và nói là thiếu", () => {
    const stripped: KnowledgeBase = {
      ...kb,
      items: kb.items.filter((i) => !i.id.startsWith("kingsley-")),
      byId: new Map([...kb.byId].filter(([id]) => !id.startsWith("kingsley-"))),
    };
    const p = generateFill({ key: "C", progression: ["I", "vi", "IV", "V"] }, stripped)!;
    assert.equal(p.bars.length, 0);
    assert.equal(p.authorized_by.length, 0);
    assert.ok(p.missing.some((m) => m.includes("không tự nghĩ ra công thức mới")));
  });

  it("chat hỏi câu lót trên một vòng thì áp công thức ra nốt thật", () => {
    const out = reply("câu lót C Am F G", kb).join("\n");
    assert.match(out, /\[suy từ kingsley\]/);
    assert.match(out, /C5 - B4 - G4 - E4/);

    // Vòng có bậc V chen giữa thì không được ra câu 6th fill nữa.
    const viaV = reply("câu lót C G Am F", kb).join("\n");
    assert.doesNotMatch(viaV, /C5 - B4 - G4 - E4/);
    assert.match(viaV, /preceding 3-2-1/);
  });

  it("ca sĩ hát kín cả câu thì không lót, chỉ giữ pad", () => {
    const p = generateFill({ key: "C", progression: ["I", "V", "vi", "IV"], vocal: "full" }, kb)!;
    assert.match(p.choice.pattern, /pad/);
    assert.deepEqual(p.choice.degrees, []);
    const played = p.bars.flatMap((b) => b.rh).filter((n) => n.note);
    assert.equal(played.length, 0, "hát kín mà vẫn chạy nốt là đè lên giọng");
    assert.ok(p.missing.some((m) => m.includes("hát kín")));
  });

  it("biết ô nào ca sĩ nghỉ thì lót đúng vào chỗ đó", () => {
    const p = generateFill({ key: "C", progression: ["I", "V", "vi", "IV"], vocal: "hát,hát,nghỉ,hát" }, kb)!;
    // Ô 3 (Am) là chỗ nghỉ -> câu chạy nằm ở ô 2 và đáp xuống Am.
    assert.equal(p.bars[0].chord, "G");
    assert.equal(p.bars[1].chord, "Am");
    assert.equal(p.choice.pattern, "preceding 3-2-1", "ô trước Am là V nên vẫn cấm 6th fill I");
    assert.ok(p.generic.some((g) => g.includes("đúng ô ca sĩ nghỉ")));
    assert.deepEqual(p.singing, [true, true, false, true]);
  });

  it("chỗ nghỉ mà ô trước đúng bậc I thì vẫn được 1-7-5-3", () => {
    const p = generateFill({ key: "C", progression: ["I", "vi", "IV", "V"], vocal: "hát,nghỉ,hát,hát" }, kb)!;
    assert.equal(p.choice.pattern, "6th fill 1-7-5-3");
    assert.deepEqual(notesOf(p), ["C5", "B4", "G4", "E4"]);
    assert.ok(p.authorized_by.includes("kingsley-6th-fill-1-7-5-3"));
  });

  it("không bao giờ chiếm trọn một ô: nốt lót chỉ nằm từ phách 3 trở đi", () => {
    for (const vocal of [undefined, "hát,hát,nghỉ,hát", "hát,nghỉ,hát,hát"] as const) {
      const p = generateFill({ key: "C", progression: ["I", "V", "vi", "IV"], vocal }, kb)!;
      for (const n of p.bars[0].rh.filter((x) => x.note)) {
        assert.ok(n.beat >= 3, `nốt rơi vào phách ${n.beat} — đè lên chỗ ca sĩ đang hát`);
      }
      const sixteenths = p.bars[0].rh.filter((n) => n.dur === "1/16").length;
      assert.ok(sixteenths <= 2, `${sixteenths} nốt móc kép trong một ô — quá dày cho ô có lời`);
    }
  });

  it("không truyền vocal thì vẫn cảnh báo là chưa biết chỗ nghỉ", () => {
    const p = generateFill({ key: "C", progression: ["I", "V", "vi", "IV"] }, kb)!;
    assert.equal(p.singing, null);
    assert.ok(p.missing.some((m) => m.includes("Không biết chỗ nào ca sĩ nghỉ")));
    const out = reply("câu lót C G Am F", kb).join("\n");
    assert.match(out, /Không biết chỗ ca sĩ nghỉ, chỉ đặt fill cuối câu\./);
  });

  it("hỏi fill sus2 sang 3 vẫn ra item extracted của Kingsley", () => {
    const out = reply("fill sus2 sang 3 ballad", kb).join("\n");
    assert.match(out, /kingsley-sus2-to-3/);
    assert.doesNotMatch(out, /hai-joseph/);
  });
});
