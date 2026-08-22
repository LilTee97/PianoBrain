import type { KnowledgeBase } from "../kb/types.js";
import type { KnowledgeItem } from "../kb/types.js";
import { askMrHai, type ItemRef } from "./answer.js";
import { auditCapability, type AuditResult } from "./audit.js";
import { generateFill, generateIntro, generateOutro, type PhrasePlan } from "./fill.js";
import { generateRun } from "./generate.js";
import { classify, vocalFromText, type Intent, type Progression } from "./parse.js";
import { chordSymbol, qualityOfDegree } from "./theory.js";

/**
 * Mr Hai trong terminal. Không UI, không dependency ngoài, chạy hẳn offline trên kho JSON.
 * Mọi câu trả lời đi qua router trong parse.ts rồi gọi đúng hàm sẵn có — không có câu nào
 * do model tự nghĩ ra ở đây.
 */

const STATUS_LABEL: Record<AuditResult["status"], string> = {
  DA_CO: "ĐÃ CÓ",
  CO_THE_SUY_LUAN: "CÓ THỂ SUY LUẬN TỪ NGUYÊN LÝ GỐC",
  CHUA_CO: "CHƯA CÓ",
};

/** Một dòng kiểm kê, chỉ in khi người học hỏi kho có gì. */
function inventory(a: AuditResult): string {
  const ids = [...a.teacher, ...a.draft].slice(0, 2).map((i) => i.id);
  return `  [kiểm kê] ${STATUS_LABEL[a.status]} — thầy ${a.teacher.length}, draft ${a.draft.length}, seed ${a.seed.length}${ids.length > 0 ? ` · ${ids.join(", ")}` : ""}`;
}

const namesOf = (p: Progression) => p.progression.map((d) => chordSymbol(d, qualityOfDegree(d), p.key));

// Kho có nhiều thầy: in đích danh teacher_id, đừng nói "của thầy" trống không.
const kindOf = (r: ItemRef) => {
  if (r.source_kind === "teacher") return r.attribution ?? "có nguồn";
  if (r.source_kind === "derived") return "suy từ thầy";
  // Hạt giống có hai loại: suy từ lý thuyết chung, và tự soạn hẳn. Đừng gộp làm một.
  return r.origin === "invented" ? "tự soạn" : "seed";
};

const oneLine = (r: ItemRef) => `  · [${kindOf(r)}] ${r.name.slice(0, 88)}  (${r.id})`;

/**
 * Trả lời đúng mục được hỏi. Thầy không đổ cả kho ra mỗi lần mở miệng.
 */
function answerPlay(prog: Progression, intent: Extract<Intent, { mode: "play" }>, kb: KnowledgeBase, query: string): string[] {
  const out: string[] = [];
  const want = new Set(intent.topics);
  const names = namesOf(prog);

  if (want.has("degrees")) {
    out.push(names.map((n, i) => `${n}=${prog.progression[i]}`).join(", ") + ` (tông ${prog.key})`);
  }

  const needsAnswer = intent.topics.some((t) => t !== "degrees");
  if (!needsAnswer) {
    if (intent.suggest) out.push("Em muốn thầy phối, câu lót, hay chạy ngón?");
    return out;
  }

  const a = askMrHai(
    {
      key: prog.key,
      progression: prog.progression,
      style: intent.style,
      query,
      explain: want.has("explain"),
      exercises: want.has("exercises"),
    },
    kb,
  );

  if (want.has("reharm")) {
    // Ưu tiên thứ dựa trên thầy; bảng seed chỉ đưa khi em xin khó hơn.
    const ranked = [...a.reharms].sort((x, y) => rank(x.source_kind) - rank(y.source_kind));
    const picked = (intent.hard ? ranked : ranked.filter((r) => r.source_kind !== "seed")).slice(0, 3);
    if (picked.length === 0) {
      out.push("Kho chưa có bảng màu nào cho vòng này. Thầy không bịa cho em đâu.");
    } else {
      for (const r of picked) out.push(`  · [${kindOf(r)}] ${r.chords.join(" | ")} — ${r.name}`);
      if (!intent.hard && ranked.length > picked.length) out.push("  Muốn màu khó hơn thì em bảo thầy.");
    }
  }

  if (want.has("fill")) {
    if (a.fills.length === 0) out.push("Kho chưa có câu lót nào khớp vòng này.");
    else for (const f of a.fills.slice(0, 2)) out.push(oneLine(f));
    // Áp công thức lên đúng vòng người học đưa, không chỉ đọc tên item.
    const vocal = vocalFromText(query, prog.progression.length);
    const plan = generateFill({ key: prog.key, progression: prog.progression, vocal }, kb);
    if (plan && plan.bars.length > 0) {
      const played = plan.bars[0].rh.filter((n) => n.note);
      if (played.length === 0) {
        // Ca sĩ hát kín thì không có nốt nào để in — đừng in dòng rỗng.
        out.push(`  [suy từ kingsley] ${plan.choice.pattern} trên ${plan.bars[0].chord}`);
        out.push(`  tay trái ${plan.bars[0].lh}, tay phải để trống`);
      } else {
        out.push(`  [suy từ kingsley] ${plan.choice.pattern} trên ${plan.bars[0].chord} → ${plan.lands_on.chord}`);
        out.push(
          `  ${played.map((n) => `${n.grace ? `${n.grace}→` : ""}${n.note}`).join(" - ")}  →  ${plan.lands_on.note} (${plan.lands_on.role})`,
        );
        out.push(`  ngón ${played.map((n) => n.finger).join("-")}, tay trái ${plan.bars[0].lh}`);
      }
      // Không biết lyric thì phải nói ra, đừng để em tưởng thầy đã canh chỗ nghỉ.
      if (!plan.singing) out.push("  Không biết chỗ ca sĩ nghỉ, chỉ đặt fill cuối câu.");
      else for (const g of plan.generic.filter((x) => x.includes("ca sĩ nghỉ"))) out.push(`  ${g}`);
      for (const m of plan.missing.filter((x) => x.includes("hát kín"))) out.push(`  ${m}`);
    }
  }

  if (want.has("comp")) {
    for (const c of a.accompaniment.slice(0, 2)) out.push(oneLine(c));
    if (a.style) {
      // Item điệu của nguồn khác có thể không đủ 6 đoạn — chỉ in đoạn nào thật sự có.
      const sections = a.style.sections as Record<string, { density?: number }>;
      const line = ["verse", "pre", "chorus", "bridge"]
        .filter((k) => typeof sections[k]?.density === "number")
        .map((k) => `${k} ${sections[k].density}`)
        .join(" → ");
      if (line) out.push(`  Mật độ: ${line}.`);
    }
  }

  if (want.has("solo")) {
    if (a.solos.length === 0) out.push("Kho chưa có ý solo nào khớp vòng này — thầy không bịa lick cho em.");
    else for (const so of a.solos.slice(0, 2)) out.push(oneLine(so));
  }

  if (want.has("voicing")) {
    if (a.voicings.length === 0) out.push("Kho chưa có thế bấm nào khớp vòng này.");
    else for (const v of a.voicings.slice(0, 2)) out.push(oneLine(v));
  }

  if (want.has("intro")) {
    if (a.intros.length === 0) out.push("Kho chưa có intro nào khớp vòng này.");
    else for (const i of a.intros.slice(0, 2)) out.push(oneLine(i));
    pushPhrase(out, generateIntro({ key: prog.key, progression: prog.progression }, kb));
  }

  if (want.has("outro")) {
    if (a.outros.length === 0) out.push("Kho chưa có outro nào khớp vòng này.");
    else for (const o of a.outros.slice(0, 2)) out.push(oneLine(o));
    pushPhrase(out, generateOutro({ key: prog.key, progression: prog.progression }, kb));
  }

  if (want.has("fingering")) {
    if (a.fingerings.length === 0) out.push("Kho chưa có thế ngón nào khớp vòng này.");
    else for (const f of a.fingerings.slice(0, 2)) out.push(oneLine(f));
  }

  if (want.has("run")) {
    const from = prog.progression[0];
    const to = prog.progression[1] ?? prog.progression[0];
    // Giữ đúng chất hợp âm người học gõ; không gõ thì lấy chất mặc định của bậc.
    const qual = (i: number, degree: string) => prog.qualities?.[i] ?? qualityOfDegree(degree);
    const plan = generateRun(
      {
        key: prog.key,
        degree: from,
        quality: qual(0, from),
        nextDegree: to,
        nextQuality: qual(1, to),
        style: intent.style,
      },
      kb,
    );
    out.push(`  [suy từ nguyên lý] ${plan.context.chord} → ${plan.context.next_chord}, hạ cánh ${plan.context.target_note}:`);
    out.push(`  ${plan.notes.map((n) => n.note).join(" - ")}`);
    out.push(`  ngón ${plan.notes.map((n) => n.finger).join("-")}, tay trái ${plan.voicing.lh.notes.join(" - ")}`);
  }

  if (want.has("explain")) for (const c of a.concepts.slice(0, 2)) out.push(oneLine(c));
  if (want.has("exercises")) for (const e of a.exercises.slice(0, 2)) out.push(oneLine(e));

  return out;
}

const rank = (k: ItemRef["source_kind"]) => (k === "teacher" ? 0 : k === "derived" ? 1 : 2);

/** In intro / outro sinh ra, gọn trong vài dòng. */
function pushPhrase(out: string[], plan: PhrasePlan | null): void {
  if (!plan || plan.bars.length === 0) return;
  const who = plan.authorized_by.some((a) => a.startsWith("kingsley-")) ? "suy từ kingsley" : "suy từ nguyên lý";
  out.push(`  [${who}] ${plan.kind === "intro" ? "Intro" : "Outro"} ${plan.bars.length} ô tự sinh:`);
  for (const b of plan.bars) {
    const rh = b.rh.map((n) => `${n.beat}:${n.grace ? `${n.grace}→` : ""}${n.note ?? "nghỉ"}`).join("  ");
    out.push(`  ô${b.bar} ${b.chord} — tay trái ${b.lh} | tay phải ${rh}`);
  }
}

function answerAudit(a: AuditResult): string[] {
  const asked = a.asked_teacher ? ` (hỏi riêng về ${a.asked_teacher})` : "";
  const out: string[] = [`"${a.query.slice(0, 50)}"${asked}: ${STATUS_LABEL[a.status]}.`];

  const cite = (i: KnowledgeItem, tag: string) =>
    `  · [${i.source?.teacher_id ?? "không rõ nguồn"}${tag}] ${i.name.slice(0, 84)}  (${i.id} · ${i.source?.locator ?? "không có mốc"})`;

  // Item đã đối chiếu nguồn xếp trước item còn draft, nhưng thứ tự trong mỗi nhóm giữ nguyên.
  const pool: [KnowledgeItem, string][] = [
    ...a.teacher.map((i): [KnowledgeItem, string] => [i, ""]),
    ...a.draft.map((i): [KnowledgeItem, string] => [i, ", chờ rà"]),
  ];

  // Hỏi chung mà kho có nhiều thầy thì mỗi thầy được một chỗ trước khi ai đó được chỗ thứ hai.
  // Không làm vậy thì thầy nào nhiều item sẽ chiếm hết, trường phái còn lại biến mất.
  const picked = a.asked_teacher ? pool.slice(0, 4) : roundRobinByTeacher(pool, 4);
  const schools = [...new Set(picked.map(([i]) => i.source?.teacher_id).filter(Boolean))];
  if (!a.asked_teacher && schools.length > 1) {
    out.push(`  Kho có ${schools.length} trường phái về chỗ này: ${schools.join(", ")}.`);
  }
  for (const [i, tag] of picked) out.push(cite(i, tag));

  out.push(`  ${a.bridge[0]}`);
  return out;
}

/** Chia lượt theo thầy: mỗi thầy một item rồi mới vòng lại. Giữ nguyên thứ hạng bên trong mỗi thầy. */
function roundRobinByTeacher(pool: [KnowledgeItem, string][], limit: number): [KnowledgeItem, string][] {
  const queues = new Map<string, [KnowledgeItem, string][]>();
  for (const entry of pool) {
    const key = entry[0].source?.teacher_id ?? "—";
    if (!queues.has(key)) queues.set(key, []);
    queues.get(key)!.push(entry);
  }
  const out: [KnowledgeItem, string][] = [];
  while (out.length < limit) {
    let moved = false;
    for (const q of queues.values()) {
      if (out.length >= limit) break;
      const next = q.shift();
      if (next) {
        out.push(next);
        moved = true;
      }
    }
    if (!moved) break;
  }
  return out;
}

export function reply(text: string, kb: KnowledgeBase): string[] {
  const intent = classify(text);
  if (intent.mode === "greet") return ["Chào em. Em đưa vòng hợp âm, hay hỏi thầy kho có gì?"];
  // Kiểm kê chỉ đi kèm câu hỏi về kho, không dán vào mọi câu trả lời.
  if (intent.mode === "play") return answerPlay(intent.prog, intent, kb, text);
  if (intent.mode === "audit") {
    const a = auditCapability(intent.query, kb);
    return [...answerAudit(a), inventory(a)];
  }
  // Không rõ: để kho quyết định đây có phải tên kỹ thuật không, chứ đừng đoán vòng hợp âm.
  const a = auditCapability(text, kb);
  if (a.teacher.length + a.draft.length + a.seed.length + a.generators.length > 0) {
    return [...answerAudit(a), inventory(a)];
  }
  return ["Thầy chưa rõ ý em. Em đưa vòng hợp âm (ví dụ `C Am F G`), hay đang hỏi kho có gì?"];
}
