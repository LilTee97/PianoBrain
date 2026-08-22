import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";

const kb = loadKnowledgeBase();
const ID = "demo-solo-8bar-dm7-g7-cmaj7-a7";
const solo = kb.byId.get(ID);

const BEATS: Record<string, number> = { "1/4": 1, "1/8": 0.5, "1/12": 1 / 3 };

describe("câu solo mẫu tự soạn", () => {
  it("là invented, không nguồn, không gán cho thầy nào", () => {
    assert.ok(solo, "không tìm thấy item");
    assert.equal(solo.origin, "invented");
    assert.equal(solo.status, "draft");
    assert.equal(solo.source, null, "item invented không được mang nguồn");
    assert.match(solo.note_vi, /không phải của thầy Hải, Pianote, Mack Grout hay Charlie Tran/);
    // Không đăng ký nguồn giả cho nó.
    assert.equal(kb.sources.some((s) => s.source_id.includes("demo")), false);
  });

  it("đủ 8 ô, mỗi ô đủ 4 phách", () => {
    const bars = solo!.output.bars as { bar: number; events: { dur: string }[] }[];
    assert.equal(bars.length, 8);
    for (const b of bars) {
      const total = b.events.reduce((s, e) => s + (BEATS[e.dur] ?? 0), 0);
      assert.ok(Math.abs(total - 4) < 0.001, `ô ${b.bar} chỉ có ${total} phách`);
    }
  });

  it("ô 3 là enclosure A-F#-G chùm ba rồi nghỉ, không có Ab", () => {
    const bars = solo!.output.bars as {
      bar: number;
      chord: string;
      target: string;
      events: { note?: string; rest?: boolean; dur: string; role?: string }[];
    }[];
    const b3 = bars.find((b) => b.bar === 3)!;
    assert.equal(b3.chord, "G7");
    assert.equal(b3.target, "G4");
    const triplet = b3.events.filter((e) => e.dur === "1/12").map((e) => e.note);
    assert.deepEqual(triplet, ["A4", "F#4", "G4"]);
    assert.equal(b3.events.filter((e) => e.rest).length, 2, "phải chừa hai phách trống");
    assert.doesNotMatch(JSON.stringify(solo), /Ab\d/, "không được xuất hiện nốt Ab");
  });

  it("gọi đúng bậc: G là nốt gốc của G7, không phải bậc 5 của G7", () => {
    const bars = solo!.output.bars as { bar: number; events: { note?: string; role?: string }[] }[];
    const g = bars.find((b) => b.bar === 3)!.events.find((e) => e.note === "G4")!;
    assert.match(g.role ?? "", /nốt gốc/);
    assert.doesNotMatch(g.role ?? "", /bậc 5/);
    assert.match(String(solo!.output.review_note), /bậc 5 của G7 là D/);
  });

  it("mỗi ô có nốt đích, và có chỗ nghỉ ở bốn ô lẻ", () => {
    const bars = solo!.output.bars as { bar: number; target: string; events: { rest?: boolean }[] }[];
    for (const b of bars) assert.ok(b.target, `ô ${b.bar} thiếu nốt đích`);
    for (const bar of [1, 3, 5, 7]) {
      assert.ok(bars.find((b) => b.bar === bar)!.events.some((e) => e.rest), `ô ${bar} phải có chỗ nghỉ`);
    }
  });

  it("giữ đủ tay trái và số ngón tay phải", () => {
    const lh = solo!.output.left_hand_shell as Record<string, string[]>;
    assert.deepEqual(lh.Dm7, ["D3", "F3", "C4"]);
    assert.deepEqual(lh.G7, ["G3", "F3", "B3"]);
    assert.deepEqual(lh.Cmaj7, ["C3", "E3", "B3"]);
    assert.deepEqual(lh.A7, ["A2", "G3", "C#4"]);
    const bars = solo!.output.bars as { fingers: number[] }[];
    for (const b of bars) assert.ok(b.fingers.length > 0);
  });

  it("Mr Hai trích được, gắn nhãn tự soạn, không nhận là của thầy nào", () => {
    const out = reply("solo 8 ô Dm7 G7 Cmaj7 A7", kb).join("\n");
    assert.match(out, new RegExp(ID));
    assert.match(out, /\[tự soạn\]/);
    assert.doesNotMatch(out, /hai-joseph/);
  });
});
