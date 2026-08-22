import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { scaleFor } from "../mrhai/scaleFor.js";
import { parseChord } from "../mrhai/chords.js";
import { pitchOfNote } from "../mrhai/theory.js";

const kb = loadKnowledgeBase();
const pcOf = (note: string) => pitchOfNote(note);
const best = (chord: string) => scaleFor(chord, kb).best;

describe("scaleFor — chọn thang âm từ kho", () => {
  it("Cmaj7 ra Lydian, và Lydian phải có Fa thăng", () => {
    const s = best("Cmaj7");
    assert.ok(s, "kho có gam cho maj7 mà không trả về");
    assert.match(s.name ?? "", /Lydian/);
    assert.ok(s.pitch_classes.includes(pcOf("F#")), `thiếu Fa thăng: ${s.pitch_classes.join(",")}`);
    // Bậc 4 đúng là thứ Lydian bỏ đi — có nó thì đó là gam trưởng, không phải Lydian.
    assert.ok(!s.pitch_classes.includes(pcOf("F")));
  });

  it("C7 ra Bebop Dominant 8 nốt: C D E F G A Bb B", () => {
    const s = best("C7");
    assert.ok(s);
    assert.match(s.name ?? "", /Bebop Dominant/);
    assert.equal(s.semitones_from_root.length, 8, "gam bebop phải đủ 8 bậc");
    assert.deepEqual(
      [...s.pitch_classes].sort((a, b) => a - b),
      ["C", "D", "E", "F", "G", "A", "Bb", "B"].map(pcOf).sort((a, b) => a - b),
    );
  });

  it("gam dạy ở giọng khác vẫn dịch đúng về nốt gốc của hợp âm", () => {
    /*
      Bài 7 dạy Bebop Dominant trên giọng Sol. Hỏi C7 thì phải ra bộ nốt dựng
      trên Đô, và tên in ra cũng phải đổi theo — in "G Bebop Dominant" cạnh một
      bộ nốt Đô là để người đọc tưởng mình nhìn nhầm.
    */
    const s = best("C7");
    assert.ok(s);
    assert.equal(s.root, pcOf("C"));
    assert.match(s.label ?? "", /^C /);

    const eb = best("Ebmaj7");
    assert.ok(eb);
    assert.equal(eb.root, pcOf("Eb"));
    for (const note of ["Eb", "G", "Bb", "D"]) {
      assert.ok(eb.pitch_classes.includes(pcOf(note)), `Ebmaj7 thiếu nốt ${note} của chính nó`);
    }
  });

  it("gam luôn chứa đủ nốt của hợp âm", () => {
    /*
      Bài 12 dạy gam Altered "trên G7", nhưng Altered không có bậc 5 đúng. Đem
      nó chạy trên một G7 thường là bỏ rơi nốt Rê tay trái đang giữ. Kho ghi lại
      lời thầy; chỗ này kiểm lại bằng chính nốt của hợp âm.
    */
    for (const symbol of ["Cmaj7", "C7", "Cm7", "Cm7b5", "Cdim7", "G7", "Ebmaj7", "F7"]) {
      const s = best(symbol);
      if (!s) continue;
      const chord = parseChord(symbol)!;
      const root = pitchOfNote(chord.root);
      for (const interval of chord.intervals) {
        const pc = (((root + interval) % 12) + 12) % 12;
        assert.ok(s.pitch_classes.includes(pc), `${symbol}: gam ${s.name} thiếu nốt hợp âm ${pc}`);
      }
    }
    assert.ok(!scaleFor("G7", kb).best?.name?.includes("Altered"));
  });

  it("bài dạy sau chỉnh bài dạy trước", () => {
    // m(maj7): bài 2 xếp vào Minor Bebop, bài 8 dạy hẳn Melodic Minor.
    assert.match(best("Cm(maj7)")?.name ?? "", /Melodic Minor/);
    // 7#5: bài 2 xếp vào Major Bebop, bài 12 dạy Whole Tone — và Major Bebop
    // thiếu hẳn nốt b7 nên bộ lọc nốt hợp âm cũng đã loại nó.
    assert.match(best("C7#5")?.name ?? "", /Whole Tone/);
    assert.match(best("C7alt")?.name ?? "", /Altered/);
  });

  it("kho không có thì trả null, không lấy gam gần giống", () => {
    for (const symbol of ["Cadd9", "Csus4", "Csus2"]) {
      const answer = scaleFor(symbol, kb);
      assert.equal(answer.best, null, `${symbol} không được có gam`);
      assert.equal(answer.alternatives.length, 0);
      assert.match(answer.missing ?? "", /Kho chưa có/);
    }
  });

  it("chỉ đọc nguồn jazz-scales, không mượn item của thầy nào khác", () => {
    for (const symbol of ["Cmaj7", "C7", "Cm7", "C7alt", "Cdim7"]) {
      const answer = scaleFor(symbol, kb);
      for (const choice of [answer.best, ...answer.alternatives]) {
        if (choice) assert.equal(choice.teacher_id, "jazz-scales");
      }
    }
  });

  it("mọi lựa chọn đều dẫn được nguồn và mốc", () => {
    const answer = scaleFor("C7", kb);
    for (const choice of [answer.best!, ...answer.alternatives]) {
      assert.match(choice.source_id, /^jazz-scales-bai-\d\d$/);
      assert.match(choice.locator ?? "", /^\d{2}:\d{2}/);
    }
  });

  it("siết requireValidated thì kho jazz im hẳn — item còn draft cả", () => {
    // Nút để KeyTrain chọn: draft chưa được thành tiếng mặc định.
    assert.equal(scaleFor("C7", kb, { requireValidated: true }).best, null);
  });
});

describe("thang âm của thầy Hải đã rà tay", () => {
  const scales = kb.items.filter(
    (i) => i.source?.teacher_id === "hai-joseph" && (i.output as { scale?: unknown }).scale,
  );

  it("11 item thang âm có bậc máy đọc được", () => {
    assert.ok(scales.length >= 11, `mới có ${scales.length} item`);
    for (const i of scales) {
      const s = i.output.scale as { semitones_from_root: number[]; review?: string };
      assert.equal(s.semitones_from_root[0], 0, `${i.id} bậc đầu phải là 0`);
      assert.ok(s.semitones_from_root.length >= 5);
      assert.match(s.review ?? "", /rà tay từ raw_text/, `${i.id} thiếu dấu vết người rà`);
    }
  });

  it("ngũ cung Trưởng và ngũ cung Thứ đúng bậc thầy dạy", () => {
    const shape = (id: string) =>
      (kb.byId.get(id)!.output.scale as { semitones_from_root: number[] }).semitones_from_root;
    // Bậc 1-2-3-5-6, ví dụ C Trưởng: C D E G A.
    assert.deepEqual(shape("tap-01-bai-09-lesson-id-0009-02"), [0, 2, 4, 7, 9]);
    // Bậc 1-3-4-5-7, ví dụ Am: A C D E G.
    assert.deepEqual(shape("tap-01-bai-09-lesson-id-0009-01"), [0, 3, 5, 7, 10]);
    // Tây Nguyên trên giọng Trưởng, ví dụ C: C E F G B.
    assert.deepEqual(shape("tap-01-bai-09-lesson-id-0009-03"), [0, 4, 5, 7, 11]);
  });

  it("rà nốt KHÔNG được đổi nguồn gốc hay trạng thái của item thầy", () => {
    for (const i of scales) {
      assert.equal(i.origin, "extracted");
      assert.equal(i.source?.teacher_id, "hai-joseph");
      assert.ok(i.source?.locator || i.source?.locator_note, `${i.id} mất mốc`);
    }
  });

  it("gam của thầy không lọt vào bộ chọn gam jazz", () => {
    // Thầy dạy thang âm chứ không gắn nó vào chất hợp âm nào — để trống là đúng.
    for (const i of scales) {
      const s = i.output.scale as { for_qualities: string[] };
      assert.deepEqual(s.for_qualities, [], `${i.id} tự gán chất hợp âm`);
    }
  });
});
