# slide-notes 하네스 (Harness)

**목적:** 발표용 HTML 슬라이드. 보고서가 아니라 **발표자가 말하고, 화면은 단서**만 제공.

**방식:** LLM API 오케스트레이션 없음. Task를 나눠 Cursor / Claude Code / Codex 세션에서 **파일을 순서대로** 만든다.

---

## 원칙 (요약)

1. **원 메시지** — 덱 전체가 전달할 한 문장 (`00-topic.md`)
2. **기승전결** — 목차 = 말의 순서 (`02-toc.md`)
3. **목차 장은 1슬라이드** — index/agenda 전용 `page_02.html` (보통 2번째)
4. **1장 1메시지** — HTML에는 키워드 위주, 자세한 말은 MD
5. **MD 먼저 → HTML 나중** — MD는 너무 상세하지 않게
6. **Task 카드** — `guide/tasks/` (수정 가능)

---

## 덱 폴더 구조 (목표)

```
decks/<덱이름>/
├── docs/
│   ├── 00-topic.md           # 주제·청중·원메시지
│   ├── 01-title.md           # 발표 제목·부제
│   ├── 02-toc.md             # 목차 설계 (텍스트, 여러 항)
│   ├── slide-map.md          # MD ↔ HTML ↔ 순서 매핑
│   ├── content/              # 목차별 Content MD (먼저 작성)
│   │   ├── cover_page_01.md
│   │   ├── agenda_page_02.md   # 목차 1장용 (선택·짧게)
│   │   └── why-kia_page_03.md  # 소주제-slug_page_NN.md
│   └── tasks/                # 이 덱용 Task 카드 (복사·수정)
├── slides/
│   ├── page_01.html          # 순서는 page_NN (빌드·뷰어 호환)
│   ├── page_02.html          # ← 목차 index 1장
│   └── ...
├── slides-config.js          # npm run build
└── index.html
```

---

## Phase / Task

| Task | 산출 | 비고 |
|------|------|------|
| T0 | `template/` | 레포 공통, 한 번 |
| T1 | `00-topic.md` | 주제 선정 |
| T2 | `01-title.md` | Title |
| T3 | `02-toc.md` | 목차 선정 (여러 항) |
| T3b | `slide-map.md` | 장 순서·파일명·소주제 매핑 |
| T4-i | `content/<slug>_page_NN.md` | **목차 1덩어리당 1 MD**, 짧게 |
| T5-i | `slides/page_NN.html` | **MD 확정 후** HTML/CSS |
| T6 | `npm run build/open` | 완성 |

루프:

```
T4: for each 목차 항목 → content/<소주제-slug>_page_NN.md
T5: for each 매핑된 항목 → slides/page_NN.html
```

**한 세션 = Task 하나** (토큰 절약).

---

## 네이밍

### Content MD

`{소주제-slug}_page_{NN}.md`

- `slug`: 영문 kebab-case 권장 (`why-kia`, `core-experience`)
- `NN`: 최종 슬라이드 순서와 맞춤 (`01`, `02` …)
- 예: `cover_page_01.md`, `agenda_page_02.md`, `closing_page_07.md`

`page_03.md` 처럼 번호만 쓰지 않는다. **무슨 장면인지 파일명만 봐도 알 수 있게.**

### HTML

`page_{NN}.html` — `build.js` / 뷰어 정렬 유지.  
의미 있는 이름은 `slide-map.md`와 content MD slug에 둔다.

### 목차 1장

- `02-toc.md`: 전체 목차 텍스트 (설계용)
- `agenda_page_02.md`: 선택, 짧은 키워드만 (화면용 초안)
- `page_02.html`: **목차 index 슬라이드 1장** (항목 나열, 줄글 X)

---

## Content MD에 넣을 것 (짧게)

한 파일당 **반 페이지~1페이지 분량**, 상세 원고 X.

```markdown
# 소주제 (한 줄)

## 화면 키워드 (3~5개)
- ...
- ...

## 말할 요점 (불릿 3개 이내)
- ...

## 메모 (선택, 화면에 안 올림)
```

---

## HTML 단계

- `guide/SLIDE_HTML_RULES.md` + `template/slides/page_1.html` 참고
- 해당 Task의 **content MD 하나만** 읽고 구현
- 키워드·제목만 화면, 문단 붙여넣기 금지

---

## Task 카드

- 공통 템플릿: [`guide/tasks/`](./tasks/)
- 덱별 복사(선택): `decks/<이름>/docs/tasks/`
- 카드에 **Read / Write / Do NOT / Done when** 고정

---

## 도구 (npm)

```bash
npm run create -- <덱>
# T1~T5 LLM + 파일
npm run build -- <덱>
npm run open -- <덱>
```

`scaffold`는 선택. 목차·매핑이 잡힌 뒤 T5에서 HTML을 만드는 편이 하네스와 맞다.

---

## 연결 다이어그램

```
00-topic → 01-title → 02-toc → slide-map
                              ↓
              content/*_page_NN.md  (짧은 MD, 루프)
                              ↓
              slides/page_NN.html   (루프, page_02=목차 1장)
                              ↓
                    build → open
```
