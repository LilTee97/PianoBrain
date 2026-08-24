import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { analyze, buildTemplate, guessKey, simplify } from "../mrhai/analyze.js";
import { reply } from "../mrhai/chat.js";
import { parseChord } from "../mrhai/chords.js";
import { generateIntro } from "../mrhai/fill.js";
import { parseProgression } from "../mrhai/parse.js";

const SAMPLE =
  "Eadd9 D#m7(b5) G#7(#5#9) C#m9 Bm7(13) D/E Amaj7 B/A G#m7 G13";

describe("phân tích vòng màu", () => {
  it("đọc hết ký hiệu mẫu", () => {
    for (const token of SAMPLE.split(" ")) {
      assert.ok(parseChord(token.split("/")[0]!) || parseChord(token), token);
    }
    const p = parseProgression(SAMPLE);
    assert.ok(p);
    assert.equal(p!.symbols?.length, 10);
  });

  it("đoán C#m và bắt iiø–V–i", () => {
    const g = guessKey(SAMPLE.split(" "));
    assert.equal(g.key, "C#m");
    const a = analyze(SAMPLE.split(" "))!;
    assert.equal(a.key, "C#m");
    const romans = a.rows.map((r) => r.roman);
    assert.ok(romans.includes("ii"));
    assert.ok(romans.includes("V") || romans.includes("v"));
    assert.ok(romans.includes("i"));
    const ii = a.rows.find((r) => r.symbol.startsWith("D#"))!;
    const v = a.rows.find((r) => r.symbol.startsWith("G#7"))!;
    const i = a.rows.find((r) => r.symbol.startsWith("C#m"))!;
    assert.equal(ii.roman, "ii");
    assert.ok(v.roman === "V" || v.roman === "v");
    assert.equal(i.roman, "i");
    assert.equal(a.rows.find((r) => r.symbol === "D/E")?.bass, "E");
  });

  it("đơn giản hóa bỏ màu", () => {
    const s = simplify(SAMPLE.split(" "));
    assert.ok(s.includes("E"));
    assert.ok(s.some((x) => x.startsWith("C#m")));
    assert.ok(s.some((x) => x.startsWith("G#7") && !x.includes("#5")));
    assert.ok(s.some((x) => x.startsWith("D/") || x === "D/E"));
  });

  it("khuôn tông A kiểu ii-V màu", () => {
    const line = buildTemplate("tông A kiểu ii-V màu");
    assert.ok(line);
    assert.match(line!, /Bm7b5/);
    assert.match(line!, /E7#5#9/);
    assert.match(line!, /Am9/);
  });

  it("chat bốn câu", () => {
    const kb = loadKnowledgeBase();
    const say = (q: string) => reply(q, kb).join("\n");
    const a = say(`vòng này tiến trình gì ${SAMPLE}`);
    assert.match(a, /C#m/);
    assert.match(a, /ii/);
    const b = say(`vì sao G#7(#5#9) ${SAMPLE}`);
    assert.match(b, /V|hút|alt/i);
    const c = say(`đơn giản hóa ${SAMPLE}`);
    assert.match(c, /Đơn giản/);
    const d = say("tông A kiểu ii-V màu");
    assert.match(d, /Bm7b5|Am9/);
  });

  it("intro không cắt vòng 10 ô còn 4", () => {
    const kb = loadKnowledgeBase();
    const p = parseProgression(SAMPLE)!;
    const intro = generateIntro({ key: "C#", progression: p.progression }, kb);
    assert.ok(intro);
    assert.equal(intro!.bars.length, 10);
  });
});
