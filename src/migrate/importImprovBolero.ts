import fs from "node:fs";
import path from "node:path";
import { resolveRepoRoot } from "../kb/load.js";
import type { KnowledgeItem, SourceRecord } from "../kb/types.js";
import { validateAll } from "../kb/validate.js";

/**
 * Nạp bài Bolero / Rumba ở PianoBrain-sources/improv-styles (Bài 4 — đệm hát).
 * Giảng viên: Tuấn Lưu Piano.
 */

const TEACHER_ID = "tuan-luu-piano";
const SOURCE_ID = "improv-bai-04";
const TODAY = "2026-08-26";

const teacher: KnowledgeItem = {
  id: TEACHER_ID,
  type: "teacher",
  name: "Tuấn Lưu Piano",
  difficulty: 2,
  source: null,
  use_when: ["Người học mẫu đệm Bolero / Rumba cơ bản trên piano"],
  avoid_when: [],
  input: { style: ["bolero", "rumba"] },
  output: {
    declared_focus: ["bolero", "rumba", "đệm hát 4/4", "staccato cổ tay"],
    language: "vi",
    ingested_sources: 1,
  },
  origin: "derived",
  status: "draft",
  note_vi:
    "Tuấn Lưu Piano, video hướng dẫn đệm hát Piano điệu Bolero / Rumba cơ bản. Đếm 7 phách Pùng-Pắp, bass trái phách 1 (Root) và 3 (Fifth), tay phải dập hợp âm đảo phách.",
};

const src = (locator: string): KnowledgeItem["source"] => ({
  teacher_id: TEACHER_ID,
  source_id: SOURCE_ID,
  locator,
  media_id: "Cach Dem Hat Bolero Tren Dan Piano (Rhumba).mp4",
});

function item(
  id: string,
  type: KnowledgeItem["type"],
  name: string,
  locator: string,
  note: string,
  extra: Partial<KnowledgeItem> = {},
): KnowledgeItem {
  return {
    id,
    type,
    name,
    difficulty: 2,
    source: src(locator),
    use_when: ["Điệu / phong cách: Bolero", "Điệu / phong cách: Rumba"],
    avoid_when: [],
    input: { style: ["bolero", "rumba"] },
    output: { raw_text: note },
    origin: "extracted",
    status: "draft",
    note_vi: note,
    ...extra,
  };
}

const items: KnowledgeItem[] = [
  item(
    "improv-bai-04-harmony",
    "concept",
    "Hòa âm Bolero/Rumba: 6 hợp âm giọng La thứ (Am Dm Em C F G)",
    "00:00:33-01:16",
    "Giọng Am. Tiến trình: i (Am) - iv (Dm) - iii (Em) - III (C) - VI (F) - VII (G), về V7 (E7). Tay trái luân phiên Root và Fifth.",
  ),
  item(
    "improv-bai-04-mau-rumba",
    "accompaniment",
    "Mẫu Rumba cơ bản: đếm 7 phách Pùng-Pắp (bass 1 & 3, dập hợp âm 1-and/2/3-and/4-and)",
    "00:02:37-04:18",
    "Bass trái phách 1 (Root) và 3 (Fifth). Tay phải dập hợp âm đảo phách ở 1-and, 2, 3-and, 4-and. Audio: Pùng(1-LH) Pắp(1-and-RH) Pắp(2-RH) Pùng(3-LH) Pắp(3-and-RH) Pùng/Pắp(4) Pắp(4-and-RH).",
    {
      input: { style: ["bolero", "rumba"], hand: "both" },
      output: {
        pattern: "LH: 1(Root) . . 3(Fifth) . . . | RH: . chord(1-and) chord(2) . . chord(3-and) . chord(4-and)",
      },
    },
  ),
  item(
    "improv-bai-04-staccato-co-tay",
    "concept",
    "Staccato cổ tay (Wrist Bounce) mô phỏng tiếng quạt chả guitar thùng",
    "00:06:17-07:40",
    "Tay phải dập hợp âm nẩy nhẹ từ cổ tay (staccato), nhả phím ngay sau chạm. Tạo độ giật tươi tắn đặc trưng Bolero/Rumba.",
    {
      input: { style: ["bolero", "rumba"], hand: "RH" },
      output: { technique: "staccato_wrist_bounce" },
    },
  ),
  item(
    "improv-bai-04-arpeggio-roll",
    "accompaniment",
    "Biến tấu rải hợp âm đón đầu ô nhịp (Arpeggio Roll) ở phách 1",
    "00:14:00-15:52",
    "Tại phách 1 của ô nhịp đổi hợp âm, tay phải không dập chùm mà rải nhanh A3→C4→E4→A4 (16th) trước khi vào tiết tấu dập.",
    {
      input: { style: ["bolero", "rumba"], hand: "RH" },
      output: {
        observed_example: {
          chord_symbol: "Am",
          notes: ["A3", "C4", "E4", "A4"],
          hands: { left: ["A1"], right: ["A3", "C4", "E4", "A4"] },
        },
      },
    },
  ),
  item(
    "improv-bai-04-rule-grid",
    "rule",
    "RUMBA_PIANO_COMPING_BASIC_GRID: khung đệm chuẩn Bolero/Rumba 4/4",
    "00:02:37-04:18",
    "Bass mạnh ở phách 1 (Root) và 3 (Fifth). Tay phải dập hợp âm ở 1-and, 2, 3-and, 4-and. Đếm 7 điểm: Pùng(1-LH) Pắp(1-and-RH) Pắp(2-RH) Pùng(3-LH) Pắp(3-and-RH) Pùng/Pắp(4) Pắp(4-and-RH).",
  ),
  item(
    "improv-bai-04-rule-staccato",
    "rule",
    "STACCATO_WRIST_BOUNCE_TOUCH: nẩy cổ tay thả lỏng cho bè hợp âm tay phải",
    "00:06:17-07:40",
    "Dùng lực thả lỏng cổ tay nẩy phím (Wrist Staccato) với bè hợp âm tay phải để mô phỏng tiếng quạt chả guitar thùng Bolero/Rumba.",
  ),
  item(
    "improv-bai-04-rule-voice-leading",
    "rule",
    "VOICE_LEADING_AM_TONALITY: chuyển đổi mượt giữa bậc i-iv-VII-III-VI-V7",
    "00:00:33-01:16",
    "Trên giọng Am, luân phiên Root (bậc I) và Fifth (bậc V) của từng hợp âm: Am-Dm-Em-C-F-G-E7. Tay trái bám nốt trầm giúp voice leading mượt.",
  ),
];

const source: SourceRecord = {
  source_id: SOURCE_ID,
  teacher_id: TEACHER_ID,
  kind: "video",
  title: "CÁCH ĐỆM HÁT BOLERO TRÊN ĐÀN PIANO (RUMBA)",
  url: null,
  ingested_at: TODAY,
  course_id: "improv-styles",
  lesson_id: "Improv_Bai_04",
};

function main() {
  const repo = resolveRepoRoot();
  fs.writeFileSync(
    path.join(repo, "knowledge", "teachers", `${TEACHER_ID}.json`),
    JSON.stringify(teacher, null, 2) + "\n",
  );

  const dir = path.join(repo, "knowledge", "patterns", "accompaniment", SOURCE_ID);
  fs.mkdirSync(dir, { recursive: true });
  for (const it of items) {
    fs.writeFileSync(path.join(dir, `${it.id}.json`), JSON.stringify(it, null, 2) + "\n");
  }

  const indexFile = path.join(repo, "sources", "index.json");
  const doc = JSON.parse(fs.readFileSync(indexFile, "utf8")) as { sources: SourceRecord[] };
  doc.sources = [...doc.sources.filter((s) => s.source_id !== SOURCE_ID), source];
  fs.writeFileSync(indexFile, JSON.stringify(doc, null, 2) + "\n");

  const teacherIds = fs
    .readdirSync(path.join(repo, "knowledge", "teachers"))
    .filter((n) => n.endsWith(".json"))
    .map((n) => n.replace(/\.json$/, ""));
  const res = validateAll([teacher, ...items], { sources: doc.sources, teacherIds });
  if (!res.ok) {
    console.error(res.errors.join("\n"));
    process.exit(1);
  }
  console.log(`${items.length} item · ${SOURCE_ID}`);
}

main();
