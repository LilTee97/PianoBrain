import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadKnowledgeBase } from "../kb/load.js";
import { validateAll, validateItem } from "../kb/validate.js";

const kb = loadKnowledgeBase();
const ctx = { sources: kb.sources, teacherIds: kb.items.filter((i) => i.type === "teacher").map((i) => i.id) };

const base = {
  id: "test-item",
  type: "chord_color" as const,
  name: "test",
  difficulty: 2 as const,
  source: null,
  use_when: ["test"],
  avoid_when: [],
  input: {},
  output: {},
  origin: "derived" as const,
  status: "draft" as const,
  note_vi: "test",
};

describe("knowledge base", () => {
  it("loads and every seed item passes validation", () => {
    assert.ok(kb.items.length >= 20, `only ${kb.items.length} items`);
    assert.equal(validateAll(kb.items, ctx).ok, true);
  });

  it("refuses an extracted item pointing at an unregistered source (chống bịa nguồn)", () => {
    const fake = {
      ...base,
      id: "fake-extracted",
      origin: "extracted" as const,
      source: { teacher_id: "hai-joseph", source_id: "video-khong-co-that", locator: "12:34" },
    };
    const res = validateItem(fake, ctx);
    assert.equal(res.ok, false);
    assert.ok(res.errors.some((e) => e.includes("not registered")));
  });

  it("refuses an invented item claiming validated status", () => {
    const res = validateItem({ ...base, id: "fake-validated", origin: "invented", status: "validated" }, ctx);
    assert.equal(res.ok, false);
    assert.ok(res.errors.some((e) => e.includes("cannot be validated")));
  });

  it("refuses a derived item that claims a teacher", () => {
    const res = validateItem(
      { ...base, id: "fake-attributed", source: { teacher_id: "hai-joseph", source_id: "x", locator: null } },
      ctx,
    );
    assert.equal(res.ok, false);
    assert.ok(res.errors.some((e) => e.includes("must not claim a source")));
  });

  it("refuses duplicate ids", () => {
    assert.equal(validateAll([base, { ...base }], ctx).ok, false);
  });

  it("every extracted item points at a registered source and carries a locator", () => {
    const registered = new Set(kb.sources.map((s) => s.source_id));
    for (const item of kb.items.filter((i) => i.origin === "extracted")) {
      assert.ok(item.source, `${item.id} extracted without source`);
      assert.ok(registered.has(item.source.source_id), `${item.id}: source chưa đăng ký`);
      assert.ok(
        item.source.locator || item.source.locator_note,
        `${item.id}: extracted mà không có mốc và cũng không nói vì sao thiếu`,
      );
    }
  });

  it("no derived or invented item claims a teacher", () => {
    for (const item of kb.items.filter((i) => i.origin !== "extracted")) {
      assert.equal(item.source, null, `${item.id} claims a source without being extracted`);
    }
  });

  it("rule-section-density holds: chorus dày hơn pre dày hơn verse", () => {
    const style = kb.byId.get("style-pop-ballad");
    assert.ok(style);
    const s = (style.output as { sections: Record<string, { density: number }> }).sections;
    assert.ok(s.chorus.density > s.pre.density);
    assert.ok(s.pre.density > s.verse.density);
  });
});
