# Solo — ba thầy, tách riêng

Đo `clone_do.py` trên sheet trong `video/`. Hợp âm = máy đoán từ tay trái. n ghi theo thầy.

Bộ sinh KeyTrain: `soloTeacher.ts` — một điệu một thầy. Ballad Tôn Hùng **không** đi lối tự do Cà Pháo.

---

## Cà Pháo — n=4 (1 bossa + 3 ballad)

**Hợp âm solo:** giang tấu / outro hay **đổi màu** so với hát (Người hãy quên: intro Dm7–G7, giang `D Ebdim D Esus4 D7 A7`). Không copy điệp. Có dim lướt.

**Nốt:** RH solo dày (bossa 12–15 nốt/ô; ballad Co Em Cho 13–16). Tỉ lệ nốt trong hợp âm LH **thấp** (giang 29–64%).

**Chạy ngón:** có, nhưng **thưa** (1–3 câu / đoạn). LH **không nhường** khi RH chạy.

**Gam:** khớp giọng bài (D/F, C/Am, Eb…) ≥89%. Không pentatonic chữ ký.

**Bộ sinh:** lối `caPhaoSolo` / `soloTuDoCaPhao` — chỉ family Cà Pháo và họ ballad/slow-rock *không* mang thầy khác.

---

## Linh Nhi — n=4 (2 bolero + 2 slow rock)

**Hợp âm solo:** intro ≈ xương hát; giang tấu **gần intro** (Biển Tình intro/giang cùng Bm–F#m–Em–D). Không vòng át phụ dày như Tôn Hùng.

**Nốt:** RH solo **không dày hơn hát** (bolero 7–9 nốt/ô). Tỉ lệ hợp âm **cao** (57–77%).

**Chạy ngón:** gần như **0** (bolero); slow rock Mot Coi có 2 câu ngắn. Solo = **rải / giai điệu**, không chạy gam.

**Hai tay:** mốc chung **cao** (bolero 39–58%, nhân bản 22–47%) — RH bám LH. Đúng `raiLinhNhi`.

**Gam:** giọng bài (D/Bm, F/Dm, Bb/Gm). Pent D/B 96% ở Biển Tình — vì bài pentatonic, không phải luật pent mọi bài.

**Bộ sinh:** `raiTheoTayTrai` + `noteSource chordTone`.

---

## Tôn Hùng — n=2 ballad

Xem `ton-hung-ballad.md`. Tóm:

- Giang tấu **vòng riêng** + V7/dim. Intro Chiếc Lá ≈ outro.
- RH solo ≈ hát, **0–3 câu chạy ngắn**. Gam = giọng bài.
- LH không tắt. Không kết đoạn bằng cú chạy ngón.

**Bộ sinh:** `generateSolo` + `keyPentatonic`, `endWithRun: false`. Không `caPhaoSolo`.

---

## Giai điệu (chỉ mốc 1 nốt — quạt hợp âm tạo nhảy giả)

Đo `clone_giai_dieu.py`. Bước = 1–2 nửa cung; 3rd = 3–4; leap ≥ 5. Đáp = nốt cuối mỗi ô vs gốc hợp âm LH.

| | Cà Pháo n=4 | Linh Nhi n=4 | Tôn Hùng n=2 |
|---|---|---|---|
| Liền bậc | 38% | 31% | 31% |
| Quãng ba | 25% | 24% | 19% |
| Nhảy ≥5 | 37% | 45% | 50% |
| Lên / xuống | 53/47 | 53/47 | 49/51 |
| Đáp 1-3-5 | **40%** | **69%** | **68%** |
| Đáp bậc 7 | 25% | 8% | 23% |
| Đáp khác | **36%** | 24% | **10%** |

Cà Pháo: giai điệu **màu / nốt ngoài**, giang tấu Người hãy quên đáp 1-5 chỉ 12%. Mở câu bằng quét ngũ cung là đúng thầy này.

Linh Nhi: đáp **hợp âm ba**, nhảy + quãng ba (rải). Không quét gam.

Tôn Hùng: đáp **1-3-5-7** (91%), ít nốt ngoài. Giang Chiếc Lá đáp 1-5 100%. Nhảy nhiều nhưng **đậu hợp âm**, không pent run.

Bộ sinh: `melody: 'stable'` (Tôn Hùng, Linh Nhi) bỏ cú quét Cà Pháo, dùng mẫu nốt hợp âm. `color` giữ Cà Pháo.

## Cấm trộn

| | Cà Pháo | Linh Nhi | Tôn Hùng |
|---|---|---|---|
| RH solo vs hát | dày hơn (bossa) | bằng | bằng |
| Chạy móc kép | có, thưa | hầu như không | hầu như không |
| Hai tay | rời (chung ~30%) | khoá (chung ~45–58%) | rời nhẹ (~20–33%) |
| Giang tấu hợp âm | đổi màu / dim | gần intro | vòng riêng + V7 |

Không lấy cell / hằng số / hàm của thầy này gắn thầy kia.
