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
    assert.match(s.name ?? "", /lydian/i);
    assert.ok(s.pitch_classes.includes(pcOf("F#")), `thiếu Fa thăng: ${s.pitch_classes.join(",")}`);
    // Bậc 4 đúng là thứ Lydian bỏ đi — có nó thì đó là gam trưởng, không phải Lydian.
    assert.ok(!s.pitch_classes.includes(pcOf("F")));
  });

  it("C7 ra Bebop Dominant 8 nốt: C D E F G A Bb B", () => {
    const s = best("C7");
    assert.ok(s);
    /*
      Khớp bằng **nốt**, không bằng chữ: bài 2 gọi "Bebop Dominant", bài 17 gọi
      "Dominant Bebop Scale" — cùng một gam. Khoá theo tên là mỗi lần ingest
      thêm một bài lại phải sửa test dù nhạc không đổi gì.
    */
    assert.match(s.name ?? "", /bebop/i);
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
    assert.match(best("Cm(maj7)")?.name ?? "", /melodic minor/i);
    // 7#5: bài 2 xếp vào Major Bebop, bài 12 dạy Whole Tone — và Major Bebop
    // thiếu hẳn nốt b7 nên bộ lọc nốt hợp âm cũng đã loại nó.
    assert.match(best("C7#5")?.name ?? "", /whole tone/i);
    assert.match(best("C7alt")?.name ?? "", /altered/i);
  });

  it("kho không có thì trả null, không lấy gam gần giống", () => {
    /*
      `Cadd9` và `Csus2` từng nằm trong danh sách này. Chúng có gam rồi — ngũ cung
      Trưởng của thầy Hải, qua `rule-hai-triad-pentatonic-extended`: bậc 2 và bậc
      6 vốn là bậc của ngũ cung nên gam chứa đủ nốt hợp âm.

      `Csus4` và `Cm6` thì vẫn không: ngũ cung Trưởng không có bậc 4, ngũ cung Thứ
      không có bậc 6. Nói thiếu đúng hơn là lấp bừa.
    */
    for (const symbol of ["Csus4", "Cm6", "Cdim"]) {
      const answer = scaleFor(symbol, kb);
      assert.equal(answer.best, null, `${symbol} không được có gam`);
      assert.equal(answer.alternatives.length, 0);
      assert.match(answer.missing ?? "", /Kho chưa có/);
    }
  });

  it("hợp âm bảy jazz lấy gam nguồn jazz; hợp âm ba nốt lấy ngũ cung thầy Hải", () => {
    /*
      Hai nguồn đứng cạnh nhau, mỗi nguồn giữ phần của mình. Trước đây hàm chỉ
      đọc nguồn jazz, nên hợp âm ba nốt — quá nửa số ô của một bài pop Việt —
      không có gam nào cả.
    */
    for (const symbol of ["Cmaj7", "C7", "Cm7", "Cdim7"]) {
      assert.equal(scaleFor(symbol, kb).best?.teacher_id, "jazz-scales", symbol);
    }
    for (const symbol of ["C", "Am", "F", "G", "Dm", "Em"]) {
      const best = scaleFor(symbol, kb).best;
      assert.equal(best?.teacher_id, "hai-joseph", symbol);
      assert.equal(best?.semitones_from_root.length, 5, `${symbol} phải là ngũ cung`);
    }
  });

  it("hợp âm ba nốt: ngũ cung dựng trên nốt gốc hợp âm, không lạc giọng", () => {
    /*
      Chỗ này là lý do phải dùng ngũ cung chứ không dùng thang âm bảy nốt: thang
      âm bảy nốt dựng trên nốt gốc hợp âm thì Fa trưởng trong giọng Đô ra nốt Si
      giáng, Sol trưởng ra Fa thăng. Ngũ cung thì không lạc một hợp âm nào.

      Cũng chặn luôn lỗi đo được trước khi có luật xếp hạng: `Am` từng lấy A
      Dorian của nguồn jazz và ra Fa thăng.
    */
    const inKeyOfC = new Set([0, 2, 4, 5, 7, 9, 11]);
    for (const symbol of ["C", "Dm", "Em", "F", "G", "Am"]) {
      const best = scaleFor(symbol, kb).best;
      assert.ok(best, symbol);
      for (const pc of best.pitch_classes) {
        assert.ok(inKeyOfC.has(pc), `${symbol}: nốt ${pc} lạc giọng Đô`);
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

  it("luật suy ra được kêu, nhưng nốt vẫn phải có người đứng sau", () => {
    /*
      Hai thứ khác nhau, trước đây bị siết như một.

      **Bộ nốt** thầy đàn ra, người rà mở video đối chiếu — chưa rà thì cấm kêu.
      **Đường đi** nối chất hợp âm với bộ nốt ấy thì suy được: nói "add9 dùng
      ngũ cung Trưởng" không phải bịa lời thầy, vì ngũ cung ấy thầy dạy thật và
      đường nối suy ra bằng phép đếm nốt.

      Siết cả hai như nhau thì `Cadd9`, `Csus2`, `C6` — quá nửa số ô của một bài
      pop Việt — im lặng, dù kho có đủ nốt và đã có người rà nốt ấy.
    */
    for (const symbol of ["Cadd9", "Csus2", "C6"]) {
      const best = scaleFor(symbol, kb, { requireValidated: true }).best;
      assert.ok(best, `${symbol} không ra gam nào khi siết`);
      assert.equal(best.teacher_id, "hai-joseph", symbol);
      assert.equal(best.semitones_from_root.length, 5, `${symbol} phải là ngũ cung`);
      // Đường đi là luật, và luật ấy được nêu tên — không giấu.
      assert.ok(best.via_rule, `${symbol} không nói nó đi qua luật nào`);
    }
  });

  it("át treo có màu lấy gam của hợp âm át", () => {
    /*
      9sus4 và 13sus4 chỉ là 7sus4 thêm màu, mà 7sus4 thì bài 2 đã gắn thẳng cho
      Mixolydian. Thứ làm chúng thuộc họ át là **bậc bảy hạ**, không phải bậc bốn
      treo — nên gam của hợp âm át là đúng chỗ.
    */
    for (const symbol of ["C9sus4", "G13sus4", "E9sus4"]) {
      const best = scaleFor(symbol, kb, { requireValidated: true }).best;
      assert.ok(best, `${symbol} không ra gam`);
      assert.match(best.name ?? "", /mixolydian/i);
      // Dựng trên nốt gốc của chính hợp âm, không phải nốt gốc của bài giảng.
      const chord = parseChord(symbol)!;
      assert.equal(best.root, pitchOfNote(chord.root), symbol);
    }
  });

  it("biết giọng thì bậc thể của chính hợp âm được nhận", () => {
    /*
      Cùng một chất, hai nốt gốc, hai gam khác nhau — và cái quyết định là **bậc
      của hợp âm trong giọng**, không phải chất hợp âm. Trong giọng Đô:

        Am(add9) cần La thứ tự nhiên — Dorian trên La cho Fa thăng
        Dm(add9) cần Rê Dorian       — Aeolian trên Rê cho Si giáng

      Nên luật nối chỉ nêu ứng viên, còn bộ lọc theo giọng gạt cái nào lạc.
    */
    const trongGiongC = new Set([0, 2, 4, 5, 7, 9, 11]);
    for (const [symbol, ten] of [
      ["Am(add9)", /thứ tự nhiên|aeolian/i],
      ["Dm(add9)", /dorian/i],
      ["Csus4", /trưởng|ionian|major/i],
      ["Gsus4", /mixolydian/i],
      ["Dm6", /dorian/i],
    ] as const) {
      const best = scaleFor(symbol, kb, { requireValidated: true, key: "C" }).best;
      assert.ok(best, `${symbol} không ra gam khi biết giọng`);
      assert.match(best.name ?? "", ten, symbol);
      for (const pc of best.pitch_classes) {
        assert.ok(trongGiongC.has(pc), `${symbol}: nốt ${pc} lạc giọng Đô`);
      }
    }
  });

  it("hợp âm MƯỢN vẫn im, dù đã biết giọng", () => {
    /*
      `Em(add9)` cần bậc 9 tự nhiên, ra Fa thăng; `Am6` cần bậc 6 tự nhiên, cũng
      Fa thăng. Hai hợp âm ấy không nằm trong giọng Đô, nên không bậc thể nào của
      giọng phục vụ được — im là đúng, không phải thiếu sót.

      `Bdim` thì thiếu thật: bậc thể của nó là Locrian, mà kho chưa có bản Locrian
      nào đã rà.
    */
    for (const symbol of ["Em(add9)", "Am6", "Bdim"]) {
      assert.equal(
        scaleFor(symbol, kb, { requireValidated: true, key: "C" }).best,
        null,
        `${symbol} không được có gam trong giọng Đô`,
      );
    }
  });

  it("không biết giọng thì giữ nguyên lối cũ, không kêu bừa", () => {
    /*
      Đây là nửa an toàn của luật. Thang âm bảy nốt dựng trên nốt gốc hợp âm ba
      nốt thì phần lớn lạc giọng; không biết giọng thì không phân biệt được cái
      đúng với cái lạc, nên cấm cả loại vẫn là đúng.
    */
    for (const symbol of ["Am(add9)", "Dm(add9)", "Csus4", "Gsus4", "Dm6"]) {
      assert.equal(scaleFor(symbol, kb, { requireValidated: true }).best, null, symbol);
    }
    // Hợp âm ba nốt trơn không đổi gì: ngũ cung vốn không lạc giọng bao giờ.
    for (const symbol of ["C", "Am", "F", "G"]) {
      const a = scaleFor(symbol, kb, { requireValidated: true }).best;
      const b = scaleFor(symbol, kb, { requireValidated: true, key: "C" }).best;
      assert.equal(a?.item_id, b?.item_id, symbol);
      assert.equal(a?.semitones_from_root.length, 5, symbol);
    }
  });

  it("nối bậc trong giọng: madd9 / sus4 / Bdim", () => {
    const trongGiongC = new Set([0, 2, 4, 5, 7, 9, 11]);
    const aeolian = scaleFor("Am(add9)", kb, { key: "C" }).best;
    assert.ok(aeolian);
    assert.match(aeolian.name ?? "", /thứ tự nhiên|aeolian/i);
    assert.ok(!aeolian.pitch_classes.includes(pcOf("F#")));

    const dorian = scaleFor("Dm(add9)", kb, { key: "C" }).best;
    assert.ok(dorian);
    assert.match(dorian.name ?? "", /dorian/i);

    const csus = scaleFor("Csus4", kb, { key: "C" }).best;
    assert.ok(csus);
    assert.match(csus.name ?? "", /trưởng|ionian|major/i);

    assert.equal(scaleFor("Fsus4", kb, { key: "C" }).best, null);
    assert.equal(scaleFor("Am(add9)", kb).best, null);

    const bdim = scaleFor("Bdim", kb, { key: "C" }).best;
    assert.ok(bdim, "Locrian draft được trả khi không siết validated");
    assert.deepEqual(bdim.semitones_from_root, [0, 1, 3, 5, 6, 8, 10]);
    assert.equal(bdim.status, "draft");
    for (const pc of bdim.pitch_classes) {
      assert.ok(trongGiongC.has(pc), `Bdim Locrian lạc: ${pc}`);
    }
    assert.equal(scaleFor("Bdim", kb, { key: "C", requireValidated: true }).best, null);
  });

  it("sus4 trơn, m6, madd9, dim vẫn im — và im là đúng", () => {
    /*
      Bốn chất này có tới 17-30 gam đã rà chứa đủ nốt, nên **nối được** về mặt
      số học. Nhưng nối bằng thang âm bảy nốt dựng trên nốt gốc hợp âm thì lạc
      giọng: đo trên một bài giọng Đô, `Fsus4` + Mixolydian ra Si giáng và Mi
      giáng, `Am6` + Dorian ra Fa thăng, `C#dim` + Whole-Half lạc bốn nốt.

      Ngũ cung thì không lạc, nhưng không ngũ cung nào chứa đủ nốt của chúng:
      ngũ cung Trưởng thiếu bậc 4, ngũ cung Thứ thiếu cả bậc 2 lẫn bậc 6.

      Im lặng còn hơn kêu sai — bên gọi lùi về nốt hợp âm, vẫn đúng hoà âm, chỉ
      ít màu. Nới chỗ này ra là đổi một chỗ thiếu lấy một chỗ sai.
    */
    for (const symbol of ["Csus4", "Fsus4", "Cm6", "Am6", "Cmadd9", "Cdim"]) {
      assert.equal(
        scaleFor(symbol, kb, { requireValidated: true }).best,
        null,
        `${symbol} không được có gam`,
      );
    }
  });

  it("gam chưa ai rà thì KHÔNG lọt, dù có luật trỏ tới", () => {
    /*
      Đây là nửa còn lại của cùng một luật, và là nửa quan trọng hơn. Nới cửa cho
      luật suy ra mà quên siết bộ nốt thì một gam máy tự nghĩ ra chỉ cần một luật
      trỏ vào là thành tiếng.
    */
    for (const symbol of ["Cmaj7", "C7", "Cm7", "Cadd9", "Csus2", "C6", "Cm7b5"]) {
      const answer = scaleFor(symbol, kb, { requireValidated: true });
      for (const choice of [answer.best, ...answer.alternatives]) {
        if (!choice) continue;
        const item = kb.byId.get(choice.item_id)!;
        assert.equal(item.status, "validated", `${symbol}: ${choice.item_id} chưa ai rà`);
        assert.equal(item.origin, "extracted", `${symbol}: ${choice.item_id} không phải extracted`);
      }
    }
  });

  it("siết requireValidated thì chỉ item đã có người rà mới được chọn", () => {
    /*
      Đây là nút để KeyTrain siết: kiến thức chưa ai đối chiếu lại nguồn thì
      không được thành tiếng mặc định.

      Kiểm bằng **cơ chế**, không bằng con số: bản đầu khoá cứng "trả về null vì
      chưa rà item nào" — đúng lúc ấy, nhưng rà xong item đầu tiên là test đỏ,
      tức lưới an toàn quay ra chặn đúng việc nó muốn khuyến khích.
    */
    for (const symbol of ["C7", "Cmaj7", "Cm7", "C7alt"]) {
      const strict = scaleFor(symbol, kb, { requireValidated: true });
      for (const choice of [strict.best, ...strict.alternatives]) {
        if (choice) assert.equal(choice.status, "validated", `${symbol}: ${choice.item_id}`);
      }
      // Siết vào thì không bao giờ được nhiều lựa chọn hơn lúc thả lỏng.
      const loose = scaleFor(symbol, kb);
      const count = (a: typeof strict) => (a.best ? 1 : 0) + a.alternatives.length;
      assert.ok(count(strict) <= count(loose));
    }
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
