import fs from "node:fs";
import path from "node:path";
import { loadKnowledgeBase, resolveRepoRoot } from "../kb/load.js";
import { reply } from "./chat.js";

/** Ghi một vòng chat mẫu ra examples/, để đọc là biết Mr Hai trả lời kiểu gì. */
const kb = loadKnowledgeBase();
const turns = [
  "vòng C Am F G trên tone C xếp bậc sao",
  "thầy dạy A7b9 trước F trên 1645 chưa?",
  "câu lót vòng 1 6 4 5 giọng C",
  "chạy ngón trên C Am F G",
];
const md = [
  "# Chat mẫu với Mr Hai",
  "",
  "Chạy bằng `npm run chat`. Sinh lại bằng `npx tsx src/mrhai/chatDemo.ts`.",
  "",
  ...turns.flatMap((t) => ["```text", `Em: ${t}`, "", `Thầy: ${reply(t, kb).join("\n")}`, "```", ""]),
].join("\n");
const out = path.join(resolveRepoRoot(), "examples", "chat-mau.md");
fs.writeFileSync(out, md, "utf8");
console.log(`đã ghi ${out}`);
