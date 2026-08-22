import type { HandShape, ItemRef, MrHaiAnswer } from "./answer.js";
import type { RunPlan } from "./generate.js";
import type { AuditResult } from "./audit.js";
import type { FillPlan, PhrasePlan } from "./fill.js";

const LABELS = ["dễ", "vừa", "khó", "khó hơn", "khó nhất"];

const badge = (r: ItemRef) => {
  if (r.source_kind === "teacher") return `**của thầy** (${r.attribution}, ${r.status})`;
  if (r.source_kind === "derived") return "**suy từ thầy** (derived, draft — không phải lời thầy)";
  return "*seed tự dựng*";
};

const tag = (r: ItemRef) => `${badge(r)} · \`${r.id}\` · độ khó ${r.difficulty} · ${r.origin}/${r.status}`;

const list = (title: string, refs: ItemRef[]) =>
  refs.length === 0
    ? `### ${title}\n\nKhông có trong kho.\n`
    : `### ${title}\n\n${refs
        .map((r) => `- **${r.name}** — ${tag(r)}${r.detail ? `\n  - ngón / nốt: \`${r.detail}\`` : ""}\n  - ${r.note_vi}`)
        .join("\n")}\n`;

export function renderAnswer(a: MrHaiAnswer): string {
  const out: string[] = [];
  out.push(`# Mr Hai — vòng ${a.original.join(" - ")} (tông ${a.key})\n`);
  out.push(`## Bản gốc\n\n\`${a.original.join(" | ")}\`\n`);

  out.push("## Phối lại\n");
  if (a.reharms.length === 0) out.push("Không có bảng màu nào trong kho cho vòng này.\n");
  a.reharms.forEach((r, i) => {
    out.push(`### ${LABELS[i] ?? `mức ${r.difficulty}`} — ${r.name}\n`);
    out.push(`\`${r.chords.join(" | ")}\`\n`);
    out.push(`${tag(r)}\n`);
    out.push(`${r.note_vi}\n`);
    if (r.derived_from_sources?.length) {
      out.push(`Suy ra từ bài của thầy: ${r.derived_from_sources.map((s) => `\`${s}\``).join(", ")}\n`);
    }
    if (r.applied_rules.length === 0) {
      out.push("_Chưa có rule nào của thầy dùng đúng bộ hợp âm này._\n");
    } else {
      out.push(
        r.source_kind === "derived"
          ? "Căn cứ để suy — item của thầy:\n"
          : r.source_kind === "seed"
            ? "Bảng màu này là **seed tự dựng**. Rule dưới đây là của thầy và dùng đúng hợp âm trong bảng — không phải thầy dạy bảng màu này:\n"
            : "Rule của thầy dùng đúng bộ hợp âm này:\n",
      );
      for (const rule of r.applied_rules) out.push(`- ${rule.name} — ${tag(rule)}`);
      out.push("");
    }
  });

  out.push(list("Intro", a.intros));
  out.push(list("Câu lót / fill", a.fills));
  out.push(list("Outro", a.outros));
  out.push(list("Ý solo / giang tấu", a.solos));
  out.push(list("Khuôn đệm", a.accompaniment));
  out.push(list("Thế bấm (voicing)", a.voicings));

  out.push("### Gam đang dùng\n");
  out.push(
    a.scales.length === 0
      ? "Không có trong kho.\n"
      : `${a.scales.map((s) => `- Trên hợp âm **${s.chord_quality}**: ${s.scale.name} — ${tag(s.scale)}`).join("\n")}\n`,
  );

  out.push(list("Thế ngón", a.fingerings));

  out.push("### Khuôn tay\n");
  if (a.handShapes.length === 0) {
    out.push("Không có trong kho.\n");
  } else {
    for (const h of a.handShapes as HandShape[]) {
      out.push(`- **${h.name}** — ${tag(h)}`);
      if (h.left_hand) out.push(`  - tay trái: ${h.left_hand}`);
      if (h.right_hand) out.push(`  - tay phải: ${h.right_hand}`);
    }
    out.push("");
  }

  out.push("### Điệu và chỗ đổi tiết tấu\n");
  if (!a.style) {
    out.push("Không có trong kho.\n");
  } else {
    out.push(`**${a.style.name}** — ${tag(a.style)}\n`);
    const rows = Object.entries(
      a.style.sections as Record<string, { density: number; lh: string; rh: string; note_vi: string }>,
    );
    out.push("| Đoạn | Mật độ | Tay trái | Tay phải | Ghi chú |");
    out.push("| --- | --- | --- | --- | --- |");
    for (const [name, s] of rows) out.push(`| ${name} | ${s.density} | ${s.lh} | ${s.rh} | ${s.note_vi} |`);
    out.push("");
  }

  if (a.concepts.length > 0) out.push(list("Giải thích", a.concepts));
  if (a.exercises.length > 0) out.push(list("Bài tập", a.exercises));

  out.push("## Còn thiếu\n");
  out.push(a.missing.length === 0 ? "Không thiếu gì.\n" : `${a.missing.map((m) => `- ${m}`).join("\n")}\n`);

  const teacher = a.used_ids.length;
  out.push(`## Item đã dùng (${teacher})\n\n${a.used_ids.map((i) => `\`${i}\``).join(", ")}\n`);
  return out.join("\n");
}

/** Bảng phách cho câu chạy ngón, theo đúng 5 bước suy luận. */
export function renderRun(p: RunPlan): string {
  const cite = (c: { text: string; by: string[] }) =>
    c.by.length > 0 ? `${c.text} — căn cứ: ${c.by.map((b) => `\`${b}\``).join(", ")}` : `${c.text} — _lý thuyết chung, không phải lời thầy_`;

  const out: string[] = [];
  out.push(`# Chạy ngón: ${p.context.chord} → ${p.context.next_chord} (tông ${p.context.key})\n`);

  out.push("## 1. Bối cảnh hòa âm\n");
  out.push(
    `Nhịp ${p.context.meter}${p.context.style ? `, điệu ${p.context.style}` : ""}. ` +
      `Bậc ${p.context.roman} chạy sang bậc ${p.context.next_roman}. ` +
      `Nốt đích là **${p.context.target_note}** — bậc 3 của ${p.context.next_chord}, nốt nói rõ hợp âm đích trưởng hay thứ.\n`,
  );

  out.push("## 2. Tập nốt khả dụng\n");
  out.push(`- Nốt hợp âm: ${p.collection.chord_tones.join(" - ")}`);
  for (const t of p.collection.tensions) out.push(`- Màu: ${cite(t)}`);
  out.push(`- Chuỗi ngũ cung để chạy: ${p.collection.pool.join(" - ")}`);
  out.push(`- Nốt dẫn nửa cung vào đích: ${p.collection.approach.join(", ")}\n`);

  out.push("## 3. Thế bấm và phân công hai tay\n");
  out.push(`- Tay trái: ${cite(p.voicing.lh)}`);
  out.push(`  - nốt ${p.voicing.lh.notes.join(" - ")}, ngón ${p.voicing.lh.fingers.join("-")}`);
  out.push(`- Tay phải chạy trong vùng ${p.voicing.rh_range}\n`);

  out.push("## 4. Câu sinh ra\n");
  out.push(`\`${p.notes.map((n) => n.note).join(" - ")}\`\n`);

  out.push("## 5. Bảng theo phách\n");
  out.push("| Ô nhịp | Phách | Tay trái | Tay phải | Vai trò nốt |");
  out.push("| --- | --- | --- | --- | --- |");
  for (const b of p.beats) out.push(`| ${b.bar} | ${b.beat} | ${b.lh} | ${b.rh} | ${b.note} |`);
  out.push("");
  out.push(`**Mẹo ngón:** ${p.fingering.text}.\n`);

  out.push("## Căn cứ và chỗ tự suy\n");
  out.push(
    p.derived_from.length > 0
      ? `Item của thầy đã dùng: ${p.derived_from.map((d) => `\`${d}\``).join(", ")}`
      : "Không có item nào của thầy làm căn cứ.",
  );
  if (p.generic.length > 0) out.push(`\n${p.generic.map((g) => `- ${g}`).join("\n")}`);
  out.push("\n_Toàn bộ nốt trên là **derived** — tính ra từ nguyên tắc, không phải câu mẫu chép lại, và không phải lời thầy._\n");
  return out.join("\n");
}

const AUDIT_LABEL: Record<AuditResult["status"], string> = {
  DA_CO: "[ĐÃ CÓ]",
  CO_THE_SUY_LUAN: "[CÓ THỂ SUY LUẬN ĐƯỢC TỪ NGUYÊN LÝ GỐC]",
  CHUA_CO: "[CHƯA CÓ / CHƯA HỖ TRỢ ĐẦY ĐỦ]",
};

/** Chế độ kiểm toán: trạng thái, phạm vi, giới hạn, giải pháp bù đắp. */
export function renderAudit(a: AuditResult): string {
  const out: string[] = [];
  out.push(`# Kiểm toán kho: "${a.query}"\n`);
  out.push(`## Trạng thái\n\n**${AUDIT_LABEL[a.status]}**\n`);
  out.push(
    `Khớp trong kho: **${a.teacher.length}** item của thầy đã đối chiếu nguồn, ` +
      `**${a.draft.length}** item của thầy còn draft, **${a.seed.length}** hạt giống tự dựng.\n`,
  );

  if (a.teacher.length > 0) {
    out.push("### Item của thầy\n");
    for (const i of a.teacher.slice(0, 5)) {
      out.push(`- **${i.name}** — \`${i.id}\` · nguồn \`${i.source?.source_id}\` · ${i.source?.locator ?? "không có mốc"}`);
    }
    if (a.teacher.length > 5) out.push(`- _và ${a.teacher.length - 5} item nữa_`);
    out.push("");
  }

  out.push("## Phạm vi khả thi\n");
  out.push(a.scope.length === 0 ? "Không có bộ sinh nào cho chủ đề này.\n" : `${a.scope.map((s) => `- ${s}`).join("\n")}\n`);

  out.push("## Giới hạn hiện tại\n");
  out.push(`${a.limits.map((l) => `- ${l}`).join("\n")}\n`);

  out.push("## Giải pháp bù đắp\n");
  out.push(`${a.bridge.map((b) => `- ${b}`).join("\n")}\n`);
  return out.join("\n");
}

/** Câu lót sinh ra từ công thức Kingsley, áp lên vòng người học đưa. */
export function renderFill(p: FillPlan): string {
  const out: string[] = [];
  out.push(`## ${p.choice.pattern || "Không sinh được"} — tông ${p.key}, vòng ${p.progression.join(" - ")}\n`);
  if (p.bars.length === 0) {
    out.push(`${p.missing.map((m) => `- ${m}`).join("\n")}\n`);
    return out.join("\n");
  }

  out.push(`Chọn công thức này vì **${p.choice.why}**. Câu dựng trên bậc **${p.choice.built_on}**, bậc ${p.choice.degrees.join("-")}.\n`);
  out.push("| Ô | Hợp âm | Phách | Tay trái | Tay phải | Ngón |");
  out.push("| --- | --- | --- | --- | --- | --- |");
  for (const b of p.bars) {
    for (const n of b.rh) {
      out.push(
        `| ${b.bar} | ${b.chord} | ${n.beat} | ${n.beat === 1 ? b.lh : "giữ"} | ${n.grace ? `${n.grace}→` : ""}${n.note ?? "nghỉ"}${n.degree ? ` (bậc ${n.degree})` : ""} | ${n.finger ?? "—"} |`,
      );
    }
  }
  out.push("");
  out.push(`Hạ cánh **${p.lands_on.note}** trên ${p.lands_on.chord} — ${p.lands_on.role}.\n`);

  out.push(
    p.authorized_by.length > 0
      ? `**Căn cứ [kingsley]:** ${p.authorized_by.map((a) => `\`${a}\``).join(", ")}`
      : "**Không có item nào cho phép** — không được gắn nhãn kingsley.",
  );
  if (p.generic.length > 0) out.push(`\n${p.generic.map((g) => `- _${g}_`).join("\n")}`);
  if (p.missing.length > 0) out.push(`\n${p.missing.map((m) => `- ${m}`).join("\n")}`);
  out.push("\n_Câu trên là **derived**: tính ra từ công thức đã ingest, không phải bản ký âm của Kingsley._\n");
  return out.join("\n");
}

/** Intro hoặc outro sinh ra từ luật Kingsley. */
export function renderPhrase(p: PhrasePlan): string {
  const out: string[] = [];
  const title = p.kind === "intro" ? "Intro" : "Outro";
  out.push(`## ${title} ${p.bars.length} ô — tông ${p.key}, vòng ${p.progression.join(" - ")}\n`);
  if (p.bars.length === 0) {
    out.push(`${p.missing.map((m) => `- ${m}`).join("\n")}\n`);
    return out.join("\n");
  }
  out.push("| Ô | Hợp âm | Phách | Tay trái | Tay phải | Ngón |");
  out.push("| --- | --- | --- | --- | --- | --- |");
  for (const b of p.bars) {
    for (const n of b.rh) {
      out.push(
        `| ${b.bar} | ${b.chord} | ${n.beat} | ${n.beat === 1 ? b.lh : "giữ"} | ${n.note ?? "nghỉ"}${n.degree ? ` (bậc ${n.degree})` : ""} | ${n.finger ?? "—"} |`,
      );
    }
  }
  out.push("");
  out.push(`${p.choices.map((c) => `- ${c}`).join("\n")}\n`);
  out.push(
    p.authorized_by.length > 0
      ? `**Căn cứ [kingsley]:** ${p.authorized_by.map((a) => `\`${a}\``).join(", ")}`
      : "**Không có item nào cho phép** — không được gắn nhãn kingsley.",
  );
  if (p.generic.length > 0) out.push(`\n${p.generic.map((g) => `- _${g}_`).join("\n")}`);
  if (p.missing.length > 0) out.push(`\n${p.missing.map((m) => `- ${m}`).join("\n")}`);
  out.push("\n_Câu trên là **derived**: tính ra từ luật đã ingest, không phải bản ký âm của Kingsley._\n");
  return out.join("\n");
}
