import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";
import { classify, parseProgression } from "../mrhai/parse.js";
import { pitchOfNote } from "../mrhai/theory.js";

const parse = (text: string) => {
  const p = parseProgression(text);
  assert.ok(p, `không đọc được: ${text}`);
  return p;
};

describe("parseProgression", () => {
  it("reads chord names", () => {
    assert.deepEqual(parse("C Am F G").progression, ["I", "vi", "IV", "V"]);
    assert.equal(parse("C Am F G").key, "C");
  });

  it("drops the slash bass when working out the degree", () => {
    assert.deepEqual(parse("C - G/B - Am7 - F").progression, ["I", "V", "vi", "IV"]);
    assert.deepEqual(parse("G/B Am7 F C giọng C").progression, ["V", "vi", "IV", "I"]);
  });

  it("reads numbers, with or without the minor mark", () => {
    assert.deepEqual(parse("1 6 4 5").progression, ["I", "vi", "IV", "V"]);
    assert.deepEqual(parse("1-5-6-4").progression, ["I", "V", "vi", "IV"]);
    assert.deepEqual(parse("1 6m 4 5").progression, ["I", "vi", "IV", "V"]);
  });

  it("reads roman numerals as typed", () => {
    assert.deepEqual(parse("I vi IV V").progression, ["I", "vi", "IV", "V"]);
    assert.deepEqual(parse("I - V - vi - IV").progression, ["I", "V", "vi", "IV"]);
  });

  it("takes the key the user declares over the first chord", () => {
    assert.equal(parse("phối C Am F G tông F").key, "F");
    assert.equal(parse("1 6 4 5 giọng C").key, "C");
    assert.deepEqual(parse("câu lót vòng 1 6 4 5 giọng C").progression, ["I", "vi", "IV", "V"]);
  });

  it("does not mistake a stray word for a chord", () => {
    // "Em" là đại từ, không phải hợp âm Mi thứ — chỉ dãy từ 2 hợp âm liền nhau mới tính.
    assert.deepEqual(parse("Em muốn phối vòng C Am F G").progression, ["I", "vi", "IV", "V"]);
    assert.equal(parseProgression("Em hỏi thầy chút"), null);
  });

  it("looks through Vietnamese connector words between two chords", () => {
    const p = parse("chạy ngón từ Cmaj7 sang Am");
    assert.deepEqual(p.progression, ["I", "vi"]);
    assert.deepEqual(p.qualities, ["maj7", "m"]);
  });

  it("returns null instead of guessing when there is no progression", () => {
    assert.equal(parseProgression("sus4 là gì thầy"), null);
    assert.equal(parseProgression("thầy dạy A7b9 trước F trên 1645 chưa?"), null);
  });
});

describe("chat router", () => {
  it("sends a 'đã có chưa' question to the audit, even with chord names in it", () => {
    const i = classify("thầy dạy A7b9 trước F trên 1645 chưa?");
    assert.equal(i.mode, "audit");
  });

  const topicsOf = (text: string) => {
    const i = classify(text);
    assert.equal(i.mode, "play", `${text} không vào nhánh play`);
    return i.mode === "play" ? i : null;
  };

  it("sends a progression to the play path with the topic that was asked", () => {
    const i = topicsOf("câu lót vòng 1 6 4 5 giọng C");
    assert.deepEqual(i?.prog.progression, ["I", "vi", "IV", "V"]);
    assert.deepEqual(i?.topics, ["fill"]);
  });

  it("picks exactly the topic named, nothing else", () => {
    assert.deepEqual(topicsOf("vòng C Am F G xếp bậc sao")?.topics, ["degrees"]);
    assert.deepEqual(topicsOf("phối C Am F G")?.topics, ["reharm"]);
    assert.deepEqual(topicsOf("chạy ngón trên C Am F G")?.topics, ["run"]);
    assert.deepEqual(topicsOf("thế ngón cho C Am F G")?.topics, ["fingering"]);
    assert.deepEqual(topicsOf("giải thích vòng C Am F G")?.topics, ["explain"]);
    assert.deepEqual(topicsOf("bài tập cho vòng C Am F G")?.topics, ["exercises"]);
  });

  it("does not confuse 'chạy ngón' with 'thế ngón'", () => {
    assert.equal(topicsOf("chạy ngón trên C Am F G")?.topics.includes("fingering"), false);
  });

  it("falls back to degrees plus one question when no topic is named", () => {
    const i = topicsOf("C Am F G");
    assert.deepEqual(i?.topics, ["degrees"]);
    assert.equal(i?.suggest, true);
  });

  it("only unlocks the seed palettes when the user asks for something harder", () => {
    assert.equal(topicsOf("phối C Am F G")?.hard, false);
    assert.equal(topicsOf("phối C Am F G khó hơn")?.hard, true);
  });

  it("routes an explain question with no progression to the audit", () => {
    assert.equal(classify("giải thích sus4").mode, "audit");
  });

  it("treats a greeting as a greeting, not a knowledge lookup", () => {
    assert.equal(classify("xin chào thầy").mode, "greet");
    assert.equal(classify("cảm ơn thầy").mode, "greet");
    // "hi" chỉ tính khi đứng riêng, không nuốt "hình như..."
    assert.notEqual(classify("hình như em bấm sai").mode, "greet");
  });

  it("routes a clear music question with a chord name to the audit, not to a shrug", () => {
    assert.equal(classify("enclosure vào bậc 3 của Am").mode, "audit");
    assert.equal(classify("blues lick 12 ô trên C7").mode, "audit");
    // "Em" là đại từ, không tính là tên hợp âm.
    assert.equal(classify("Em hỏi thầy chút").mode, "unknown");
  });

  it("reads 1-5 as an interval, not as a I-V progression, when the question is about voicing", () => {
    assert.equal(parseProgression("voicing tay trái 1-5 trên C"), null);
    // Không nói voicing thì 1-5 vẫn là vòng bậc.
    assert.deepEqual(parse("1-5-6-4").progression, ["I", "V", "vi", "IV"]);
  });

  it("has a topic for every section and material the store holds", () => {
    assert.deepEqual(topicsOf("intro 4 ô trước khi hát C Am F G")?.topics, ["intro"]);
    assert.deepEqual(topicsOf("chorus dày hơn verse chứ, cùng vòng C Am F G")?.topics, ["comp"]);
    assert.deepEqual(topicsOf("lick ii-V-I jazz giọng C")?.topics, ["solo"]);
    assert.deepEqual(topicsOf("walking bass C Am F G")?.topics, ["comp"]);
  });

  it("gives up instead of inventing a progression", () => {
    assert.equal(classify("hôm nay trời đẹp").mode, "unknown");
  });
});

describe("nốt có dấu hoá lạ", () => {
  it("Cb, Fb, E#, B# đọc được, không làm sập chương trình", () => {
    assert.equal(pitchOfNote("Cb"), 11);
    assert.equal(pitchOfNote("Fb"), 4);
    assert.equal(pitchOfNote("E#"), 5);
    assert.equal(pitchOfNote("B#"), 0);
    assert.throws(() => pitchOfNote("H"));
  });

  it("vòng ở tông giáng lạ vẫn trả lời được, không ném lỗi", () => {
    assert.doesNotThrow(() => parseProgression("Db Gb Abm Cb"));
    const kb = loadKnowledgeBase();
    const out = reply("phối Db Gb Abm Cb", kb).join("\n");
    assert.match(out, /Kho chưa có bảng màu nào/, "không có palette thì phải báo thiếu");
    assert.doesNotMatch(out, /\[hai-joseph\]|\[kingsley\]/, "không được bịa item cho vòng lạ");
  });
});
