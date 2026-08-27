/** Normative shape of every PianoBrain knowledge item. See schema/knowledge-item.md. */

export type ItemType =
  | "teacher"
  | "concept"
  | "exercise"
  | "chord_color"
  | "voicing"
  | "fingering"
  | "scale"
  | "arpeggio"
  | "fill"
  | "intro"
  | "outro"
  | "solo_idea"
  | "accompaniment"
  | "style"
  | "rule";

/** extracted = lấy từ nguồn thật. derived = suy ra từ lý thuyết/item khác. invented = tự nghĩ ra. */
export type Origin = "extracted" | "derived" | "invented";

/** draft = chưa đối chiếu nguồn. validated = đã đối chiếu. rejected = sai, giữ lại để không lặp. */
export type Status = "draft" | "validated" | "rejected";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface SupportingRef {
  source_id: string;
  page?: number | null;
  section?: string | null;
}

export interface ItemSource {
  /** id của thầy trong knowledge/teachers/ */
  teacher_id: string;
  /** id nguồn trong sources/index.json */
  source_id: string;
  /** "mm:ss-mm:ss" cho video, "pdf p.N" cho PDF, null nếu không có */
  locator: string | null;
  /** File gốc trong bài, ví dụ "video_input_0". Kho master ghi, đừng bỏ. */
  media_id?: string | null;
  /** PDF / trang / tên mục chống lưng cho item này. */
  supporting?: SupportingRef[];
  /** Mốc thời gian thứ 2 trở đi. Một item hay được thầy nhắc ở nhiều đoạn. */
  extra_locators?: string[];
  /** Vì sao không có mốc. Item extracted được phép thiếu mốc, không được phép im lặng. */
  locator_note?: string | null;
}

export interface KnowledgeItem {
  id: string;
  type: ItemType;
  name: string;
  difficulty: Difficulty;
  /** Bắt buộc khi origin === "extracted". null với derived/invented. */
  source: ItemSource | null;
  use_when: string[];
  avoid_when: string[];
  /** Vế IF: điều kiện khớp. */
  input: {
    key_context?: "major" | "minor" | null;
    progression?: string[];
    chord_quality?: string[];
    style?: string[];
    section?: string[];
    hand?: "LH" | "RH" | "both";
    difficulty_max?: Difficulty;
  };
  /** Vế THEN: nội dung thi hành được. Hình dạng tuỳ type, xem schema/knowledge-item.md. */
  output: Record<string, unknown>;
  origin: Origin;
  status: Status;
  /** Giải thích nhạc lý tiếng Việt cho người học. */
  note_vi: string;
}

export interface SourceRecord {
  source_id: string;
  teacher_id: string;
  /**
   * `sheet` là **bản ký âm máy đọc được** (MusicXML / MIDI), khác `pdf` ở chỗ
   * cao độ và trường độ nằm sẵn dưới dạng số chứ không phải hình vẽ — nên số
   * liệu rút từ nó là đo được, không phải đọc bằng mắt rồi đoán.
   */
  kind: "video" | "pdf" | "lesson" | "book" | "sheet";
  title: string;
  url: string | null;
  ingested_at: string | null;
  course_id?: string;
  module_id?: string;
  lesson_id?: string;
  /** HUMAN_REVIEW_QUEUE báo bài này không có video id trong source map -> media_id không đáng tin. */
  source_map_missing_video?: boolean;
}

/** Bài kho gốc không trích xuất được. Mr Hai phải nói ra chứ không im lặng. */
export interface Coverage {
  skipped: string[];
  incomplete: string[];
}

/**
 * Kho đã nạp. Kiểu này để riêng khỏi `load.ts` vì loader dùng `node:fs`,
 * mà app chạy trong trình duyệt chỉ cần KIỂU, không cần đọc đĩa.
 */
export interface KnowledgeBase {
  items: KnowledgeItem[];
  sources: SourceRecord[];
  coverage: Coverage;
  byId: Map<string, KnowledgeItem>;
}
