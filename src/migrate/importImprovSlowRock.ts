import fs from "node:fs";
import path from "node:path";
import { resolveRepoRoot } from "../kb/load.js";
import type { KnowledgeItem, SourceRecord } from "../kb/types.js";
import { validateAll } from "../kb/validate.js";

/**
 * Nạp bài Slow Rock ở PianoBrain-sources/improv-styles (Bài 9 — đệm hát).
 * Không gán thầy Hải: tên kênh trên file chỉ là "PIANO ĐỆM HÁT".
 */

const TEACHER_ID = "piano-dem-hat";
const SOURCE_ID = "improv-bai-01";
const TODAY = "2026-08-24";

const teacher: KnowledgeItem = {
  id: TEACHER_ID,
  type: "teacher",
  name: "Đức Thịnh",
  difficulty: 2,
  source: null,
  use_when: ["Người học hỏi mẫu đệm Slow Rock 6/8 rải tay trái / chia hai tay"],
  avoid_when: ["Slow Rock 1-5-8-9-10-9 của thầy Hải — đó là Tập 6 Bài 3, mẫu khác"],
  input: { style: ["pop_ballad", "slow-rock"] },
  output: {
    declared_focus: ["slow rock", "rải tay trái", "đệm hát 6/8"],
    language: "vi",
    ingested_sources: 1,
  },
  origin: "derived",
  status: "draft",
  note_vi:
    "Nhạc sĩ Đức Thịnh, video PIANO ĐỆM HÁT Bài 9 Slow Rock. Tách khỏi thầy Hải vì mẫu rải khác (1-5-8-10-8-5, không phải 1-5-8-9-10-9).",
};

const src = (locator: string): KnowledgeItem["source"] => ({
  teacher_id: TEACHER_ID,
  source_id: SOURCE_ID,
  locator,
  media_id: "PIANO DEM HAT - BAI 9 SLOW ROCK.mp4",
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
    use_when: ["Điệu / phong cách: Slow Rock"],
    avoid_when: [],
    input: { style: ["pop_ballad", "slow-rock"] },
    output: { raw_text: note },
    origin: "extracted",
    status: "draft",
    note_vi: note,
    ...extra,
  };
}

const items: KnowledgeItem[] = [
  item(
    "improv-bai-01-meter",
    "concept",
    "Slow Rock nhịp 6/8: phách 1 mạnh, phách 4 mạnh vừa",
    "00:22-01:34",
    "Điệu Slow Rock viết 6/8, sáu móc đơn một ô. Phách 1 mạnh, phách 4 mạnh vừa, 2-3-5-6 nhẹ.",
  ),
  item(
    "improv-bai-01-mau-1",
    "accompaniment",
    "Mẫu 1: tay trái rải 1-5-8-10-8-5, ngón 5-2-1-2-1-2",
    "01:35-02:48",
    "Mẫu 1 trên Am: A2 E3 A3 C4 A3 E3. Thế ngón trái 5-2-1-2-1-2, ngón 2 với lên bậc 10 (C4).",
    {
      input: { style: ["pop_ballad", "slow-rock"], hand: "LH", chord_quality: ["m"] },
      output: {
        raw_text: "1-5-8-10-8-5",
        observed_example: {
          chord_symbol: "Am",
          notes: ["A2", "E3", "A3", "C4", "A3", "E3"],
          hands: { left: ["5", "2", "1", "2", "1", "2"], right: [] },
        },
      },
    },
  ),
  item(
    "improv-bai-01-mau-1-rh",
    "accompaniment",
    "Mẫu 1: tay phải giữ hoặc dập hợp âm phách 1 và 4",
    "02:49-03:57",
    "Tay trái giữ rải 6/8. Tay phải giữ hoặc dập hợp âm ở phách 1 và 4.",
    {
      input: { style: ["pop_ballad", "slow-rock"], hand: "RH" },
      output: {
        observed_example: {
          chord_symbol: "Am",
          notes: ["A3", "C4", "E4"],
          hands: { left: [], right: ["A3", "C4", "E4"] },
        },
      },
    },
  ),
  item(
    "improv-bai-01-mau-2",
    "accompaniment",
    "Mẫu 2: chia hai tay — trái 1-5-8 lên, phải 10-8-5 xuống",
    "04:22-05:13",
    "Am: trái A2-E3-A3 (ngón 5-2-1), phải C5-A4-E4 (ngón 1-2-5).",
    {
      input: { style: ["pop_ballad", "slow-rock"], hand: "both", chord_quality: ["m"] },
      output: {
        observed_example: {
          chord_symbol: "Am",
          notes: ["A2", "E3", "A3", "C5", "A4", "E4"],
          hands: { left: ["5", "2", "1"], right: ["1", "2", "5"] },
        },
      },
    },
  ),
  item(
    "improv-bai-01-khong-lap-mot-mau",
    "rule",
    "Không dùng một mẫu Slow Rock suốt bài",
    "05:14-05:51",
    "Luân phiên Mẫu 1 (nền tay trái) và Mẫu 2 (rải hai tay) giữa các câu.",
  ),
  item(
    "improv-bai-01-mau-1-plus",
    "accompaniment",
    "Mẫu 1 Plus: thay bậc 10 bằng bậc 9 (1-5-8-9-8-5)",
    "05:52-06:46",
    "Am add9: A2 E3 A3 B3 A3 E3, ngón 5-2-1-2-1-2. Biến tấu màu của Mẫu 1, không phải mẫu thứ tư.",
    {
      input: { style: ["pop_ballad", "slow-rock"], hand: "LH", chord_quality: ["m", "m(add9)"] },
      output: {
        observed_example: {
          chord_symbol: "Am(add9)",
          notes: ["A2", "E3", "A3", "B3", "A3", "E3"],
          hands: { left: ["5", "2", "1", "2", "1", "2"], right: [] },
        },
      },
    },
  ),
  item(
    "improv-bai-01-mau-3",
    "accompaniment",
    "Mẫu 3: Bùm nghỉ bum Chát nghỉ bum — trái 1-3-6, phải 4",
    "06:47-08:43",
    "Tai nghe: (1)Bùm (2)nghỉ (3)bum (4)Chát (5)nghỉ (6)bum. Trái 1+8 ở 1 và 3, bậc 5 ở 6. Phải dặm 3+5 ở 4. Phách 3 đổ 4, phách 6 đổ 1.",
    {
      input: { style: ["pop_ballad", "slow-rock"], section: ["verse"], hand: "both" },
      output: {
        pattern: "Bùm (1) — nghỉ (2) — bum (3→4) — Chát (4) — nghỉ (5) — bum (6→1)",
      },
    },
  ),
  item(
    "improv-bai-01-tutti",
    "accompaniment",
    "Dằn điệp khúc (Tutti): dập hai tay phách 1",
    "11:13-11:49",
    "Cao trào Chorus: dằn hợp âm hai tay. Gemini không chép đủ ô nhịp Bùm-Chắt. Cần xem video.",
    {
      input: { style: ["pop_ballad", "slow-rock"], section: ["chorus"] },
      output: {
        observed_example: {
          chord_symbol: "Am",
          notes: ["A1", "A2", "C4", "E4", "A4"],
        },
        needs_video_check: "11:13-11:49 tiết tấu dằn từng phách",
      },
    },
  ),
  item(
    "improv-bai-01-rock-ballad",
    "accompaniment",
    "Slow Rock nhanh / Rock Ballad ~78-80 BPM",
    "11:55-13:17",
    "Tay phải dập đủ 6 móc đơn. Tay trái quãng 8 bass. Tempo ~78-80. Cần xem video để chốt bass từng phách.",
    {
      output: {
        observed_example: { chord_symbol: "Em", notes: ["E2", "E3", "G3", "B3", "E4"] },
        needs_video_check: "11:55-13:17 tuyến bass quãng 8",
      },
    },
  ),
  item(
    "improv-bai-01-ban-tinh-cuoi",
    "rule",
    "Bản Tình Cuối: A1 Mẫu 1, A2 Mẫu 1 Plus, B Tutti / Rock Ballad",
    "14:28-18:12",
    "Ứng dụng trên bài Bản Tình Cuối (Ngô Thụy Miên). Gemini tóm bố cục — chỗ đổi mẫu trong bài cần tai đối chiếu.",
    {
      output: {
        needs_video_check: "14:28-18:12 chỗ cắt A1 / A2 / B",
      },
    },
  ),
];

const source: SourceRecord = {
  source_id: SOURCE_ID,
  teacher_id: TEACHER_ID,
  kind: "video",
  title: "PIANO ĐỆM HÁT - BÀI 9 / SLOW ROCK",
  url: null,
  ingested_at: TODAY,
  course_id: "improv-styles",
  lesson_id: "Improv_Bai_01",
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
