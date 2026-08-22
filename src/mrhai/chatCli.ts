import readline from "node:readline";
import { loadKnowledgeBase } from "../kb/load.js";
import { reply } from "./chat.js";

/**
 * Vỏ dòng lệnh cho Mr Hai.
 *
 * Tách khỏi `chat.ts` vì `chat.ts` phải chạy được cả trong trình duyệt: app
 * KeyTrain nạp thẳng `reply()` để làm tab chat, mà trình duyệt không có
 * `node:readline` lẫn `node:fs`.
 */
const kb = loadKnowledgeBase();

const oneShot = process.argv.slice(2).join(" ").trim();
if (oneShot.length > 0) {
  console.log(reply(oneShot, kb).join("\n"));
  process.exit(0);
}

console.log(`Mr Hai — ${kb.items.length} item, ${kb.sources.length} bài của thầy. Gõ /quit để thoát.\n`);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "Em: " });
rl.prompt();
rl.on("line", (line) => {
  const text = line.trim();
  if (text === "/quit" || text === "/exit") return rl.close();
  if (text.length > 0) console.log(`\nThầy: ${reply(text, kb).join("\n")}\n`);
  rl.prompt();
});
rl.on("close", () => console.log("\nThầy: Ừ, em tập đi. Chỗ nào bí thì quay lại hỏi."));
