import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseChord } from "../mrhai/chords.js";

/**
 * Bộ não phải đọc được ký hiệu **người nhạc sĩ viết trên giấy**.
 *
 * Không phải mã nội bộ của một app nào. App đọc não, não không đọc app — bắt
 * app dịch ký hiệu sang mã riêng trước khi hỏi là làm ngược chiều phụ thuộc, và
 * app thứ hai sẽ phải dịch lại y hệt.
 *
 * Bốn cách viết dưới đây từng làm bộ đọc chịu thua, và hậu quả hiện thẳng lên
 * màn hình KeyTrain: *"Kho chưa có gam cho 4 hợp âm trong bài (Cadd2, Am(add9),
 * Fadd2, E9sus4)"* — trong khi kho có đủ nốt cho cả bốn.
 */
const notes = (symbol: string) => parseChord(symbol)?.intervals ?? null;

describe("đọc ký hiệu hợp âm", () => {
  it("add2 và add9 là một hợp âm, hai cách viết", () => {
    // Bậc 2 và bậc 9 cùng một lớp cao độ, chỉ khác quãng tám.
    assert.deepEqual(notes("Cadd2"), notes("Cadd9"));
    assert.deepEqual(notes("Cadd2"), [0, 4, 7, 14]);
  });

  it("thứ thêm bậc chín, cả hai cách viết", () => {
    assert.deepEqual(notes("Amadd9"), [0, 3, 7, 14]);
    assert.deepEqual(notes("Amadd2"), notes("Amadd9"));
  });

  it("át treo có màu: 9sus4 và 13sus4", () => {
    // Vẫn là át treo — bậc 4 thay bậc 3, bậc 7 vẫn hạ — chỉ thêm màu.
    assert.deepEqual(notes("E9sus4"), [0, 5, 7, 10, 14]);
    assert.deepEqual(notes("E13sus4"), [0, 5, 7, 10, 14, 21]);
    for (const symbol of ["E7sus4", "E9sus4", "E13sus4"]) {
      const chord = parseChord(symbol)!;
      assert.ok(chord.intervals.includes(5), `${symbol} mất bậc 4 treo`);
      assert.ok(chord.intervals.includes(10), `${symbol} mất bậc 7 hạ`);
      assert.ok(!chord.intervals.includes(4), `${symbol} còn bậc 3, hết treo`);
    }
  });

  it("ngoặc chỉ để mắt đọc cho gọn, không đổi nghĩa", () => {
    for (const [co, khong] of [
      ["Am(add9)", "Amadd9"],
      ["C(add2)", "Cadd2"],
      ["Cm(maj7)", "Cmmaj7"],
    ]) {
      assert.deepEqual(notes(co), notes(khong), `${co} phải bằng ${khong}`);
      assert.ok(notes(co), `${co} không đọc được`);
    }
  });

  it("nốt gốc và bass đảo vẫn đọc đúng khi chất có ngoặc", () => {
    const chord = parseChord("Am(add9)/E")!;
    assert.equal(chord.root, "A");
    assert.equal(chord.bass, "E");
    assert.ok(chord.isMinor);
  });

  it("13b9 đọc được; 7b13 không chứa cả quãng 5 đúng lẫn b13", () => {
    assert.deepEqual(notes("C13b9"), [0, 4, 7, 10, 13, 21]);
    const b13 = notes("C7b13")!;
    assert.ok(b13.includes(8) || b13.includes(20), "7b13 phải có b13/#5");
    assert.ok(!b13.includes(7), "7b13 không giữ quãng 5 đúng cạnh b13");
  });

  it("chất không có thật thì vẫn trả null, đừng đoán bừa", () => {
    // Bỏ ngoặc không được biến ký hiệu vô nghĩa thành hợp âm.
    for (const symbol of ["Cxyz", "C(nope)", "H7"]) {
      assert.equal(parseChord(symbol), null, symbol);
    }
  });
});
