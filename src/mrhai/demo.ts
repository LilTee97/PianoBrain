import fs from "node:fs";
import path from "node:path";
import { loadKnowledgeBase, resolveRepoRoot } from "../kb/load.js";
import { askMrHai } from "./answer.js";
import { auditCapability } from "./audit.js";
import { generateFill, generateIntro, generateOutro, type Vocal } from "./fill.js";
import { generateRun } from "./generate.js";
import { renderAnswer, renderAudit, renderFill, renderPhrase, renderRun } from "./render.js";

const kb = loadKnowledgeBase();
const answer = askMrHai({ key: "C", progression: ["I", "vi", "IV", "V"], style: "pop_ballad" }, kb);
const md = renderAnswer(answer);

const out = path.join(resolveRepoRoot(), "examples", "i-vi-IV-V-pop-ballad.md");
fs.writeFileSync(out, md, "utf8");
console.log(md);
console.log(`\n--- đã ghi ${out}`);

const run = generateRun(
  { key: "C", degree: "I", quality: "maj7", nextDegree: "vi", nextQuality: "m7", style: "pop_ballad" },
  kb,
);
const runMd = renderRun(run);
const runOut = path.join(resolveRepoRoot(), "examples", "chay-ngon-Cmaj7-Am7.md");
fs.writeFileSync(runOut, runMd, "utf8");
console.log(runMd);
console.log(`\n--- đã ghi ${runOut}`);

const auditMd = ["walking bass", "stride piano"]
  .map((q) => renderAudit(auditCapability(q, kb)))
  .join("\n---\n\n");
const auditOut = path.join(resolveRepoRoot(), "examples", "kiem-toan-kho.md");
fs.writeFileSync(auditOut, auditMd, "utf8");
console.log(`\n--- đã ghi ${auditOut}`);
const fillDemos: [string, string[], string, Vocal | undefined][] = [
  ["C", ["I", "V", "vi", "IV"], "C - G - Am - F — không biết lyric", undefined],
  ["C", ["I", "V", "vi", "IV"], "C - G - Am - F — ca sĩ hát kín cả câu", "full"],
  ["C", ["I", "V", "vi", "IV"], "C - G - Am - F — ca sĩ nghỉ ở ô Am", "hát,hát,nghỉ,hát"],
  ["C", ["I", "vi", "IV", "V"], "C - Am - F - G — ca sĩ nghỉ ở ô Am, ô trước đúng là bậc I", "hát,nghỉ,hát,hát"],
  ["D", ["I", "vi", "IV", "V"], "D - Bm - G - A — cùng luật, khác tông", "hát,nghỉ,hát,hát"],
  ["Eb", ["I", "IV", "V", "I"], "Eb - Ab - Bb - Eb — vào bậc IV", undefined],
];
const NL = String.fromCharCode(10);
const fillMd = [
  "# Câu lót sinh từ công thức Kingsley",
  "",
  "Sinh bằng `generateFill()` trong [src/mrhai/fill.ts](../src/mrhai/fill.ts).",
  "Nó KHÔNG chép ô nhịp mẫu nào — đọc bậc của vòng, chọn công thức đã ingest, rồi tính nốt cho đúng tông.",
  "Sinh lại bằng `npm run mrhai`.",
  "",
  ...fillDemos.map(([key, prog, label, vocal]) => {
    const plan = generateFill({ key, progression: prog, vocal }, kb);
    const body = plan ? renderFill(plan) : "Không sinh được.";
    return ["---", "", `### Vòng ${label}`, "", body].join(NL);
  }),
].join(NL);
const fillOut = path.join(resolveRepoRoot(), "examples", "fill-kingsley.md");
fs.writeFileSync(fillOut, fillMd, "utf8");
console.log(`--- đã ghi ${fillOut}`);

const phraseDemos: [string, string[], string][] = [
  ["C", ["I", "V", "vi", "IV"], "C - G - Am - F"],
  ["D", ["I", "V", "vi", "IV"], "D - A - Bm - G"],
];
const phraseMd = [
  "# Intro và outro sinh từ luật Kingsley",
  "",
  "Sinh bằng `generateIntro()` và `generateOutro()` trong [src/mrhai/fill.ts](../src/mrhai/fill.ts).",
  "Intro coi như ca sĩ chưa vào nên cả ô đều được chuyển động; outro ưu tiên rải ngược add2 bậc 5-3-2-1.",
  "Sinh lại bằng `npm run mrhai`.",
  "",
  ...phraseDemos.flatMap(([key, prog, label]) => {
    const intro = generateIntro({ key, progression: prog }, kb);
    const outro = generateOutro({ key, progression: prog }, kb);
    return [
      "---",
      "",
      `### Vòng ${label}`,
      "",
      intro ? renderPhrase(intro) : "",
      outro ? renderPhrase(outro) : "",
    ];
  }),
].join(NL);
const phraseOut = path.join(resolveRepoRoot(), "examples", "intro-outro-kingsley.md");
fs.writeFileSync(phraseOut, phraseMd, "utf8");
console.log(`--- đã ghi ${phraseOut}`);
