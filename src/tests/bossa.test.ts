import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";
import { styleFromText } from "../mrhai/parse.js";

const kb = loadKnowledgeBase();
const say = (t: string) => reply(t, kb).join("\n");
const SOURCE_ID = "peter-martin-bossa-nova";
const fromPeter = kb.items.filter((i) => i.source?.source_id === SOURCE_ID);
const invented = ["demo-bossa-comping-4bar-dm7-g7-cmaj7", "demo-bossa-solo-2bar-cmaj7"].map((id) => kb.byId.get(id)!);

const BEATS: Record<string, number> = { "1/2": 2, "1/4": 1, "1/8": 0.5, "1/12": 1 / 3 };
const sum = (evts: { dur: string }[]) => evts.reduce((s, e) => s + (BEATS[e.dur] ?? 0), 0);

describe("bossa nova — tách extracted và invented", () => {
  it("đúng ba rule extracted của Peter Martin, ai cũng có mốc", () => {
    const src = kb.sources.find((s) => s.source_id === SOURCE_ID);
    assert.ok(src);
    assert.equal(src.teacher_id, "peter-martin");
    assert.match(src.url ?? "", /fp5DFnDYt98/);
    assert.equal(fromPeter.length, 3, `phải đúng 3 item extracted, đang có ${fromPeter.length}`);
    for (const i of fromPeter) {
      assert.equal(i.origin, "extracted");
      assert.equal(i.status, "draft");
      assert.equal(i.type, "rule");
      assert.ok(i.source?.locator, `${i.id} thiếu mốc`);
    }
  });

  it("hai item tự soạn không mang nguồn, không nhận là lời Peter", () => {
    for (const i of invented) {
      assert.ok(i, "thiếu item invented");
      assert.equal(i.origin, "invented");
      assert.equal(i.status, "draft");
      assert.equal(i.source, null, `${i.id} không được mang nguồn`);
      assert.match(i.note_vi, /TỰ SOẠN|tự soạn/);
      assert.match(i.note_vi, /không phải lời của Peter Martin/);
      assert.ok((i.output.inspired_by as string[]).length > 0, "phải dẫn item gốc đã cảm hứng");
    }
  });

  it("tag điệu là bossa_nova, không gắn pop_ballad, không gán thầy Hải", () => {
    for (const i of [...fromPeter, ...invented]) {
      assert.ok(i.input.style?.includes("bossa_nova"), `${i.id} thiếu tag bossa_nova`);
      assert.equal(i.input.style?.includes("pop_ballad"), false, `${i.id} gắn nhầm pop_ballad`);
      assert.notEqual(i.source?.teacher_id, "hai-joseph");
    }
  });

  it("bảng comping đủ 4 phách cả hai tay, đảo phách đúng 1.5 / 2.5 / 4", () => {
    const comp = invented[0];
    assert.deepEqual(comp.output.syncopation_beats, [1.5, 2.5, 4]);
    const bars = comp.output.bars as { bar: number; lh: { dur: string }[]; rh: { dur: string }[] }[];
    assert.equal(bars.length, 4);
    for (const b of bars) {
      assert.ok(Math.abs(sum(b.lh) - 4) < 0.001, `ô ${b.bar} tay trái ${sum(b.lh)} phách`);
      assert.ok(Math.abs(sum(b.rh) - 4) < 0.001, `ô ${b.bar} tay phải ${sum(b.rh)} phách`);
      // Tay trái đúng rule Peter: nốt trắng ở phách 1 và 3.
      assert.deepEqual(
        b.lh.map((e) => (e as { beat: number }).beat),
        [1, 3],
      );
    }
  });

  it("câu solo tự soạn đủ 4 phách mỗi ô", () => {
    const bars = invented[1].output.bars as { bar: number; events: { dur: string }[] }[];
    assert.equal(bars.length, 2);
    for (const b of bars) assert.ok(Math.abs(sum(b.events) - 4) < 0.001, `ô ${b.bar}: ${sum(b.events)} phách`);
  });

  it("bossa là điệu riêng, không bị gộp vào jazz", () => {
    assert.equal(styleFromText("đệm bossa Dm7 G7 Cmaj7"), "bossa_nova");
    assert.equal(styleFromText("bossa nova tay trái làm gì"), "bossa_nova");
    assert.equal(styleFromText("lick ii-V-I jazz"), "jazz");
  });

  it("hỏi tay trái bossa thì có rule phách 1 và 3 của peter-martin", () => {
    const out = say("bossa nova tay trái làm gì");
    assert.match(out, /peter-martin/);
    assert.match(out, /phách 1 và phách 3/);
  });

  it("hỏi chung thì liệt kê cả hai trường phái, mỗi dòng có teacher_id", () => {
    const out = say("bossa nova tay trái làm gì");
    assert.match(out, /Kho có 2 trường phái về chỗ này: .*hai-joseph.*peter-martin|Kho có 2 trường phái về chỗ này: .*peter-martin.*hai-joseph/);
    assert.match(out, /\[hai-joseph\]/);
    assert.match(out, /\[peter-martin, chờ rà\]/);
    // Mỗi thầy phải có chỗ trước khi thầy nào được chỗ thứ hai.
    const tags = [...out.matchAll(/· \[([a-z-]+)[,\]]/g)].map((m) => m[1]);
    assert.notDeepEqual(tags.slice(0, 2), [tags[0], tags[0]], `thầy ${tags[0]} chiếm hai chỗ đầu`);
  });

  it("hỏi đích danh thầy Hải thì chỉ ra thầy Hải", () => {
    const out = say("thầy Hải dạy bossa nova tay trái thế nào");
    assert.match(out, /hỏi riêng về hai-joseph/);
    assert.match(out, /\[hai-joseph\]/);
    assert.doesNotMatch(out, /peter-martin/);
  });

  it("hỏi đích danh Peter Martin thì chỉ ra Peter Martin", () => {
    const out = say("peter martin dạy bossa tay trái thế nào");
    assert.match(out, /hỏi riêng về peter-martin/);
    assert.match(out, /\[peter-martin, chờ rà\]/);
    assert.doesNotMatch(out, /hai-joseph/);
  });

  it("nguồn mới nằm CẠNH thầy Hải, không thay thế: kho vẫn còn đủ item của thầy", () => {
    const hai = kb.items.filter((i) => i.source?.teacher_id === "hai-joseph");
    assert.ok(hai.length >= 740, `chỉ còn ${hai.length} item của thầy Hải — nguồn mới không được ghi đè`);
    const bossaHai = hai.filter((i) => i.input.style?.some((s) => s.replace(/[-_]/g, "") === "bossanova"));
    assert.ok(bossaHai.length > 0, "bossa của thầy Hải phải còn nguyên trong kho");
  });

  it("hỏi đệm bossa thì bảng tự soạn đứng đầu, nhãn tự soạn", () => {
    const out = say("đệm bossa Dm7 G7 Cmaj7");
    assert.match(out, /demo-bossa-comping-4bar-dm7-g7-cmaj7/);
    assert.match(out, /\[tự soạn\]/);
  });
});
