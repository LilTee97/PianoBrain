import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase, type KnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";
import { generateIntro, generateOutro } from "../mrhai/fill.js";

const kb = loadKnowledgeBase();
const PROG = ["I", "V", "vi", "IV"];
const notesIn = (bar: { rh: { note: string | null }[] }) => bar.rh.filter((n) => n.note).map((n) => n.note!);
/** Nốt rơi đúng một phách — bám mốc phách chứ không bám thứ tự trong mảng. */
const atBeat = (bar: { rh: { beat: number; note: string | null }[] }, beat: number) =>
  bar.rh.find((n) => Math.abs(n.beat - beat) < 1e-6)?.note ?? null;

describe("sinh intro ballad", () => {
  it("bốn ô, mỗi ô có tay trái 1-5 và khối hợp âm tay phải", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    assert.equal(p.kind, "intro");
    assert.equal(p.bars.length, 4);
    for (const b of p.bars) {
      assert.match(b.lh, /quãng 1-5/);
      assert.ok(notesIn(b).length >= 2);
    }
    assert.ok(p.authorized_by.includes("kingsley-lh-economy-voicing"));
  });

  it("bậc I dùng sus2 lên 3, bậc V dùng sus4 xuống 3", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    // Bám mốc phách 2 và 2.5: chỗ đặt cụm sus, không phụ thuộc ô dày hay thưa.
    assert.deepEqual([atBeat(p.bars[0], 2), atBeat(p.bars[0], 2.5)], ["D4", "E4"], "trên C: sus2 D lên E");
    assert.deepEqual([atBeat(p.bars[1], 2), atBeat(p.bars[1], 2.5)], ["C5", "B4"], "trên G: sus4 C xuống B");
    assert.ok(p.authorized_by.includes("kingsley-sus2-to-3"));
    assert.ok(p.authorized_by.includes("kingsley-sus4-to-3"));
  });

  it("KHONG dung sus4 o bac IV", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    // O 4 la F. Not bac 4 cua F la Bb - khong duoc xuat hien.
    assert.doesNotMatch(JSON.stringify(p.bars[3]), /Bb/);
    const iv = p.choices.find((c) => c.includes("(F)"))!;
    assert.ok(iv, "thieu ghi chu cho o bac IV");
    assert.match(iv, /sus2/);
    assert.doesNotMatch(iv, /sus4/);
    // sus4 chi duoc dung o bac V.
    for (const c of p.choices.filter((x) => /sus4/.test(x))) assert.match(c, /bậc V/);
  });

  it("hợp âm thứ thì không dùng sus, và nói ra vì sao", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    assert.ok(p.choices.some((c) => c.includes("hợp âm thứ")));
  });

  it("intro coi như ca sĩ chưa vào nên cả ô đều được chuyển động", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    assert.ok(p.missing.some((m) => m.includes("ca sĩ chưa vào")));
  });

  it("không hardcode tông C: tông D ra nốt khác", () => {
    const c = generateIntro({ key: "C", progression: PROG }, kb)!;
    const d = generateIntro({ key: "D", progression: PROG }, kb)!;
    assert.deepEqual([atBeat(d.bars[0], 2), atBeat(d.bars[0], 2.5)], ["E4", "F#4"], "trên D: sus2 E lên F#");
    assert.notDeepEqual(notesIn(d.bars[0]), notesIn(c.bars[0]));
    assert.equal(d.bars[1].chord, "A");
  });
});

describe("intro và outro đủ dày để nghe ra câu nhạc", () => {
  /*
    Bản đầu mỗi ô chỉ có ba sự kiện: một khối ở phách 1, cụm sus, rồi một khối
    ngân. Nghe ra tiếng gõ hợp âm chứ không ra câu dạo. Tệ hơn nữa, hai khối kia
    in ra dạng "C4+E4+G4" mà **không kèm số MIDI**, nên bên phát bỏ qua — cả ô
    chỉ kêu đúng hai nốt sus.
  */
  it("mỗi ô intro có ít nhất sáu tiếng đàn", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    for (const bar of p.bars) {
      assert.ok(bar.rh.length >= 6, `ô ${bar.bar} chỉ có ${bar.rh.length} sự kiện`);
    }
  });

  it("mọi nốt intro đều có số MIDI, để bên phát dùng được", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    for (const bar of p.bars) {
      for (const note of bar.rh) {
        if (note.note === null) continue;
        assert.equal(typeof note.midi, "number", `ô ${bar.bar} phách ${note.beat} thiếu MIDI`);
      }
    }
  });

  it("bốn ô không ra bốn lần cùng một hình", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    const shapes = p.bars.map((bar) => bar.rh.map((n) => n.beat).join(","));
    assert.equal(new Set(shapes).size >= 3, true, "hình tiết tấu bốn ô lặp lại quá nhiều");
  });

  it("nốt nằm trong tầm tay đàn được", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    for (const bar of p.bars) {
      for (const note of bar.rh) {
        if (note.midi === undefined) continue;
        assert.ok(note.midi >= 55 && note.midi <= 79, `ô ${bar.bar}: ${note.note} ngoài tầm`);
      }
    }
  });

  it("mỗi mốc phách chỉ một nốt — rải lần lượt, không đập chồng", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    for (const bar of p.bars) {
      const beats = bar.rh.map((n) => n.beat);
      assert.equal(new Set(beats).size, beats.length, `ô ${bar.bar} có hai nốt cùng phách`);
      for (const note of bar.rh) {
        if (note.note === null) continue;
        assert.doesNotMatch(note.note, /\+/, `ô ${bar.bar} phách ${note.beat} vẫn là khối`);
      }
    }
  });

  it("ô cuối chừa chỗ lấy hơi, ô khác thì không để trống", () => {
    const p = generateIntro({ key: "C", progression: PROG }, kb)!;
    const rests = p.bars.map((bar) => bar.rh.filter((n) => n.note === null).length);
    assert.ok(rests[3] >= 1, "ô cuối phải chừa chỗ lấy hơi");
    assert.deepEqual(rests.slice(0, 3), [0, 0, 0], "ba ô đầu không được có ô trống");
  });

  it("outro: ô 1 hai tầng quãng tám có nốt hoa mỹ, ô 2 không đập một khối", () => {
    const p = generateOutro({ key: "C", progression: PROG }, kb)!;
    assert.ok(p.bars[0].rh.length >= 8, "ô 1 phải đủ hai tầng");
    assert.ok(p.bars[0].rh.some((n) => n.grace), "ô 1 thiếu nốt hoa mỹ");
    assert.ok(p.bars[1].rh.length >= 4, "ô 2 vẫn đang đập một khối rồi im");

    const trên = p.bars[0].rh.slice(0, 4).map((n) => n.midi!);
    const dưới = p.bars[0].rh.slice(4, 8).map((n) => n.midi!);
    assert.deepEqual(trên.map((m) => m - 12), dưới, "hai tầng phải cách nhau đúng quãng tám");
  });

  it("phần thêm ghi rõ là kỹ thuật soạn, không dán tên thầy", () => {
    const intro = generateIntro({ key: "C", progression: PROG }, kb)!;
    const outro = generateOutro({ key: "C", progression: PROG }, kb)!;
    assert.ok(intro.generic.some((g) => /soạn thêm/.test(g)));
    assert.ok(outro.generic.some((g) => /soạn thêm/.test(g)));
    // Luật của thầy vẫn được dẫn đúng chỗ nó thật sự được dùng.
    assert.ok(intro.authorized_by.includes("kingsley-sus2-to-3"));
    assert.ok(outro.authorized_by.includes("kingsley-reversed-add2-outro"));
  });
});

describe("sinh outro ballad", () => {
  it("rải ngược add2 bậc 5-3-2-1 trên bậc I, tông C ra G-E-D-C", () => {
    const p = generateOutro({ key: "C", progression: PROG }, kb)!;
    assert.equal(p.kind, "outro");
    // Bốn nốt mở câu vẫn đúng bậc 5-3-2-1; phần sau là lần nhắc lại tầng dưới.
    assert.deepEqual(
      p.bars[0].rh.slice(0, 4).map((n) => n.degree),
      [5, 3, 2, 1],
    );
    assert.deepEqual(
      p.bars[0].rh.slice(0, 4).map((n) => n.note!.replace(/\d/, "")),
      ["G", "E", "D", "C"],
    );
    assert.ok(p.authorized_by.includes("kingsley-reversed-add2-outro"));
  });

  it("chuyển tông: D ra A-F#-E-D", () => {
    const p = generateOutro({ key: "D", progression: PROG }, kb)!;
    assert.deepEqual(
      p.bars[0].rh.slice(0, 4).map((n) => n.note!.replace(/\d/, "")),
      ["A", "F#", "E", "D"],
    );
    assert.equal(p.bars[1].chord, "D");
  });

  it("vòng có bậc IV vẫn không đụng sus4", () => {
    const p = generateOutro({ key: "C", progression: PROG }, kb)!;
    assert.doesNotMatch(JSON.stringify(p.bars), /Bb/);
    assert.ok(p.choices.some((c) => c.includes("cấm sus4 trên bậc IV")));
  });

  it("kho không có thủ pháp kết bài thì không tự nghĩ ra", () => {
    const stripped: KnowledgeBase = {
      ...kb,
      items: kb.items.filter((i) => i.id !== "kingsley-reversed-add2-outro"),
      byId: new Map([...kb.byId].filter(([id]) => id !== "kingsley-reversed-add2-outro")),
    };
    const p = generateOutro({ key: "C", progression: PROG }, stripped)!;
    assert.equal(p.bars.length, 0);
    assert.ok(p.missing.some((m) => m.includes("không tự nghĩ ra câu kết")));
  });
});

describe("intro / outro trong chat", () => {
  it("hỏi intro thì có bảng sinh ra, và item của thầy Hải vẫn đứng trước", () => {
    const out = reply("intro cho C G Am F", kb).join("\n");
    assert.match(out, /Intro 4 ô tự sinh/);
    // Ô đầu mở bằng nốt gốc rồi bậc ba, rải lần lượt chứ không đập một khối.
    assert.match(out, /1:C4/);
    assert.match(out, /1\.5:E4/);
  });

  it("hỏi outro thì ra câu rải ngược sinh sẵn", () => {
    const out = reply("outro cho C G Am F", kb).join("\n");
    assert.match(out, /Outro 2 ô tự sinh/);
    assert.match(out, /G5/);
    assert.match(out, /kingsley-reversed-add2-outro|rải ngược/);
  });

  it("hỏi outro reversed add2 vẫn ra item extracted của Kingsley", () => {
    const out = reply("outro reversed add2 C", kb).join("\n");
    assert.match(out, /kingsley-reversed-add2-outro/);
    assert.match(out, /\[kingsley/);
  });

  it("fill và vocal không bị đụng: C G Am F vẫn ra preceding 3-2-1", () => {
    const out = reply("câu lót C G Am F", kb).join("\n");
    assert.match(out, /preceding 3-2-1/);
    assert.doesNotMatch(out, /C5 - B4 - G4 - E4/);
  });
});
