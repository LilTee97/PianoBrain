import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "../mrhai/chat.js";
import { generateFill, generateIntro, generateOutro } from "../mrhai/fill.js";

const kb = loadKnowledgeBase();
const say = (t: string) => reply(t, kb).join("\n");

const SOURCE_IDS = Array.from({ length: 23 }, (_, i) => `jazz-scales-bai-${String(i + 1).padStart(2, "0")}`);
const items = kb.items.filter((i) => i.source?.teacher_id === "jazz-scales");

describe("nguồn Jazz Scales — 23 bài video", () => {
  it("mọi bài đăng ký riêng, kind video, cùng teacher jazz-scales", () => {
    for (const id of SOURCE_IDS) {
      const src = kb.sources.find((s) => s.source_id === id);
      assert.ok(src, `chưa đăng ký ${id}`);
      assert.equal(src.teacher_id, "jazz-scales");
      assert.equal(src.kind, "video");
    }
    assert.ok(items.length >= 189, `mới có ${items.length} item`);
  });

  it("mọi item extracted, chưa duyệt hoặc đã người rà duyệt, có mốc mm:ss", () => {
    /*
      Trạng thái hợp lệ là `draft` hoặc `validated`, không có thứ ba.

      Bản đầu khoá cứng `draft` — đúng lúc chưa ai rà, nhưng đó là **tình trạng**
      chứ không phải **luật**, và nó chặn luôn việc rà: đóng dấu một item xong là
      test đỏ. Luật thật nằm ở chỗ khác và vẫn được kiểm bên dưới: item phải là
      `extracted` và phải trỏ tới nguồn có thật.
    */
    for (const i of items) {
      assert.equal(i.origin, "extracted", `${i.id} không phải extracted`);
      /*
        Ba trạng thái, không phải hai. `rejected` là kết quả **hợp lệ** của một
        lượt rà: người rà mở video, thấy kho chép sai, gõ `--no`. Item ở lại kho
        làm dấu vết chứ không bị xoá — và `scaleFor` đã tự loại nó khỏi bộ chọn.
        Bản đầu của test này chỉ cho phép draft và validated, nên lượt `--no`
        đầu tiên trong đời kho làm nó đỏ dù mọi thứ chạy đúng.
      */
      assert.ok(
        ["draft", "validated", "rejected"].includes(i.status),
        `${i.id} có status lạ: ${i.status}`,
      );
      assert.ok(SOURCE_IDS.includes(i.source!.source_id), `${i.id} trỏ nhầm nguồn`);
      assert.match(i.source!.locator ?? "", /^\d{2}:\d{2}(-\d{2}:\d{2})?$/, `${i.id} mốc không phải mm:ss`);
    }
  });

  it("28 item gam bộ chọn dùng tới đều đã có người rà", () => {
    /*
      Bộ nạp từng ghi thẳng `status: "draft"` cho mọi item và xoá cả thư mục cũ,
      nên chạy lại nó là **xoá sạch công rà** — 28 item đã đối chiếu với video
      quay về draft trong một lệnh, không cảnh báo gì. Mất dữ liệu máy thì dựng
      lại được; mất công người thì không.
    */
    const used = items.filter(
      (i) => ((i.output as { scale?: { for_qualities?: string[] } }).scale?.for_qualities?.length ?? 0) > 0,
    );
    /*
      Ingest thêm bài thì phạm vi rà rộng ra — chuyện bình thường. Cái KHÔNG được
      phép là item **đã rà rồi** quay về draft: bộ nạp từng ghi đè `status` cho
      mọi item và xoá sạch 28 lượt rà trong một lệnh.
    */
    const reviewed = used.filter((i) => i.status === "validated");
    assert.ok(reviewed.length >= 28, `chỉ còn ${reviewed.length} item đã rà — bộ nạp ghi đè?`);
    for (const i of used) {
      /*
        Ba trạng thái, không phải hai. `rejected` là kết quả **hợp lệ** của một
        lượt rà: người rà mở video, thấy kho chép sai, gõ `--no`. Item ở lại kho
        làm dấu vết chứ không bị xoá — và `scaleFor` đã tự loại nó khỏi bộ chọn.
        Bản đầu của test này chỉ cho phép draft và validated, nên lượt `--no`
        đầu tiên trong đời kho làm nó đỏ dù mọi thứ chạy đúng.
      */
      assert.ok(
        ["draft", "validated", "rejected"].includes(i.status),
        `${i.id} có status lạ: ${i.status}`,
      );
    }
  });

  it("thế ngón lấy đúng số ngón trong video, không tự đặt quy ước", () => {
    const fingerings = items.filter((i) => i.type === "fingering");
    assert.ok(fingerings.length >= 2, `mới có ${fingerings.length} item thế ngón`);
    for (const i of fingerings) {
      const f = i.output.fingering as { notes: string[]; fingers: number[]; hand: string };
      assert.equal(f.hand, "RH");
      assert.equal(f.fingers.length, f.notes.length, `${i.id}: số ngón không khớp số nốt`);
      for (const finger of f.fingers) {
        assert.ok(finger >= 1 && finger <= 5, `${i.id}: ngón ${finger}`);
      }
    }
  });

  it("gam phải chứa chính nốt gốc của nó", () => {
    /*
      Bài 19 có một dòng đặt tên "C minor melodic ascending" mà nốt đàn ra bắt
      đầu từ Sol — lời giảng nói rõ là thang âm G. Bộ bậc tính ra không có bậc 0,
      tức một thang âm không đi qua chính nốt gốc mình.
    */
    for (const i of items) {
      const scale = (i.output as { scale?: { semitones_from_root?: number[] } }).scale;
      if (!scale?.semitones_from_root) continue;
      assert.equal(scale.semitones_from_root[0], 0, `${i.id} không chứa nốt gốc`);
    }
  });

  it("nguồn chỉ có video: không item nào chống lưng bằng PDF", () => {
    /*
      Kho master ghi `jazz_scales_guide.pdf` và mấy pdf tương tự cho cả bốn bài,
      nhưng trong kho master không có file PDF nào — đó là thứ bộ trích xuất tự
      dựng. Nhận nó vào là để một nguồn ma đứng chống lưng cho kiến thức thật.
    */
    for (const i of items) {
      assert.deepEqual(i.source!.supporting ?? [], [], `${i.id} còn dính nguồn PDF`);
    }
  });

  it("cộng thêm chứ không thay thầy: không đụng hai-joseph, không gắn pop_ballad", () => {
    for (const i of items) {
      assert.notEqual(i.source?.teacher_id, "hai-joseph");
      assert.deepEqual(i.input.style, ["jazz"], `${i.id} gắn nhãn điệu sai`);
    }
    // Corpus gốc của thầy Hải vẫn nguyên chỗ.
    const hai = kb.items.filter((i) => i.source?.teacher_id === "hai-joseph");
    assert.ok(hai.length > 700, `corpus thầy Hải còn ${hai.length} item`);
  });

  it("item gam mang quãng tính từ nốt gốc và tên nốt", () => {
    const withScale = items.filter((i) => (i.output as { scale?: unknown }).scale);
    assert.ok(withScale.length >= 38, `mới có ${withScale.length} item mang gam`);
    for (const i of withScale) {
      const s = i.output.scale as { note_names?: string[]; semitones_from_root?: number[] };
      assert.ok((s.note_names?.length ?? 0) >= 5, `${i.id} thiếu tên nốt`);
      const semi = s.semitones_from_root ?? [];
      assert.equal(semi[0], 0, `${i.id} quãng đầu phải là 0`);
      assert.ok(semi.length >= 5 && semi.length <= 9, `${i.id} có ${semi.length} bậc`);
      // Xếp tăng dần và không trùng — đó mới là tập bậc dịch giọng được.
      for (let at = 1; at < semi.length; at += 1) {
        assert.ok(semi[at] > semi[at - 1], `${i.id} bậc không tăng dần`);
      }
    }
  });

  it("năm gam người dùng cần đều có mặt, đúng bậc", () => {
    const shapes = new Map<string, number[]>();
    for (const i of items) {
      const s = i.output.scale as { name?: string | null; semitones_from_root?: number[] } | undefined;
      if (s?.name && s.semitones_from_root) shapes.set(s.name, s.semitones_from_root);
    }
    const find = (re: RegExp) => [...shapes].find(([n]) => re.test(n))?.[1];

    assert.deepEqual(find(/Bebop Dominant/), [0, 2, 4, 5, 7, 9, 10, 11], "Bebop Dominant phải là 8 bậc");
    assert.deepEqual(find(/Melodic Minor/), [0, 2, 3, 5, 7, 9, 11], "Melodic minor");
    assert.deepEqual(find(/Altered/i), [0, 1, 3, 4, 6, 8, 10], "Altered");
    assert.deepEqual(find(/Lydian-Dominant/), [0, 2, 4, 6, 7, 9, 10], "Lydian Dominant");
    assert.deepEqual(find(/Whole Tone/), [0, 2, 4, 6, 8, 10], "Whole tone");
  });

  it("câu nhạc mẫu KHÔNG bị nhận nhầm thành thang âm", () => {
    /*
      Bộ trích xuất đổ mọi nốt nghe thấy vào cùng một trường, nên một câu lick
      cũng ra danh sách tên nốt trông y hệt một gam. Nhận bừa thì kho có
      "D Bebop Scale" 9 nốt vốn là câu ii-V-I chép lại.
    */
    for (const i of items) {
      if (!(i.output as { scale?: unknown }).scale) continue;
      assert.ok(
        ["scale", "concept", "rule"].includes(i.type),
        `${i.id} là ${i.type} mà vẫn mang output.scale`,
      );
    }
  });

  it("hỏi gam trên Cmaj7 / Cmin7 thì ra Lydian / Dorian, gắn đúng jazz-scales", () => {
    const maj = say("scale nào trên Cmaj7 jazz");
    assert.match(maj, /\[jazz-scales/);
    assert.match(maj, /Lydian/);

    const min = say("Cmin7 dùng gam gì");
    assert.match(min, /\[jazz-scales/);
    assert.match(min, /Dorian/);
    // Gam jazz của nguồn khác không được đọc thành bài của thầy Hải.
    assert.doesNotMatch(min, /hai-joseph/);
  });

  it("chữ 'jazz' không khoá câu hỏi vào riêng nguồn này", () => {
    /*
      `askedTeacher` từng nhận một mảnh id làm tên thầy. Nguồn `jazz-scales` làm
      lộ chỗ hỏng: "jazz" là từ nhạc thường gặp, nên mọi câu có chữ jazz bị đọc
      thành "hỏi riêng nguồn jazz-scales", và walking bass của thầy Hải lẫn của
      Pianote biến mất khỏi câu trả lời.
    */
    const out = say("walking bass jazz");
    assert.match(out, /hai-joseph/);
    assert.match(out, /jazz-scales/);
  });

  it("ba câu hỏi của bộ mới đều ra đúng nguồn, không dính thầy Hải", () => {
    const sus = say("7sus4 chơi gam gì");
    assert.match(sus, /\[jazz-scales/);
    assert.match(sus, /Mixolydian/i);
    assert.doesNotMatch(sus, /hai-joseph/);

    const wt = say("whole tone bấm thế nào");
    assert.match(wt, /\[jazz-scales/);
    assert.match(wt, /whole tone/i);
    assert.doesNotMatch(wt, /hai-joseph/);
  });

  it("hỏi ngón bebop thì ra chính dòng thầy đàn, kèm mốc", () => {
    /*
      Bài 16 từng chỉ cho bộ nốt chứ không cho số ngón: bản trích xuất đầu nhét
      tên nốt vào ô `hands.right`, nên chỗ đáng lẽ là "5 4 3 2 1 4 3 2 1" lại là
      "C5 B4 Bb4...". Trích xuất lại với luật tách riêng dòng thế ngón mới ra
      được cái vắt ngón 4 — thứ không suy ra được từ bộ nốt.
    */
    const out = say("ngón bebop dominant C");
    assert.match(out, /jazz-scales-bai-16-05/);
    assert.match(out, /03:11/);
    assert.doesNotMatch(out, /chưa rõ ý/);
  });

  it("kho thiếu thì nói THIẾU, không nói 'chưa rõ ý em'", () => {
    /*
      Gam Altered có trong kho, nhưng **số ngón** của nó thì không. Câu trả lời
      đúng là "chưa có, đây là thứ gần nhất", chứ trả lời "chưa rõ ý" là để người
      học tưởng mình hỏi sai trong khi chính kho mới là chỗ thiếu.
    */
    const out = say("ngón gam altered");
    assert.match(out, /CHƯA CÓ/);
    assert.doesNotMatch(out, /chưa rõ ý/);
  });

  it("item draft này CHƯA vào tiếng: bộ sinh câu không dẫn nó", () => {
    // Cửa phát tiếng bên KeyTrain đọc theo id item mà bộ sinh dẫn ra.
    const req = { key: "C", progression: ["I", "vi", "IV", "V"] };
    const cited = [
      generateFill(req, kb)?.authorized_by ?? [],
      generateIntro(req, kb)?.authorized_by ?? [],
      generateOutro(req, kb)?.authorized_by ?? [],
    ].flat();
    for (const id of cited) {
      assert.ok(!id.startsWith("jazz-scales"), `${id} lọt vào câu nhạc phát ra tiếng`);
    }
  });
});
