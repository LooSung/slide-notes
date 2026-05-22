# slide-notes 하네스 (Harness)

**목적:** 발표용 슬라이드. 보고서가 아니라 **발표자가 말하고, 화면은 단서**만 제공.

**방식:** 별도 자동화 서버 없이 작업을 나눠 Cursor / Claude Code / Codex에서 **파일을 순서대로** 만든다.

---

## 원칙 (요약)

1. **원 메시지** — 발표자료 전체가 전달할 한 문장 (`00-topic.md`)
2. **기승전결** — 목차 = 말의 순서 (`02-toc.md`)
3. **목차 장은 1슬라이드** — `page_02.html` 한 장 (보통 2번째)
4. **1장 1메시지** — 화면에는 키워드 위주, 자세한 말은 원고에
5. **원고 먼저 → 슬라이드 나중** — 원고도 너무 길지 않게
6. **작업 카드** — `guide/tasks/` (수정 가능)

---

## 발표자료 폴더 구조 (목표)

```
decks/<발표자료_이름>/
├── docs/
│   ├── 00-topic.md           # 주제·청중·원메시지
│   ├── 01-title.md           # 발표 제목·부제
│   ├── 02-toc.md             # 목차 설계 (텍스트, 여러 항)
│   ├── slide-map.md          # 원고 ↔ 슬라이드 ↔ 순서표
│   ├── content/              # 장별 원고 (먼저 작성)
│   │   ├── cover_page_01.md
│   │   ├── agenda_page_02.md   # 목차 1장용 (선택·짧게)
│   │   └── why-kia_page_03.md  # 소주제-slug_page_NN.md
│   └── tasks/                # 이 발표자료용 작업 카드 (복사·수정)
├── slides/
│   ├── page_01.html          # 순서는 page_NN (미리보기 호환)
│   ├── page_02.html          # ← 목차 1장
│   └── ...
├── slides-config.js          # 미리보기용 목록 (`open`이 갱신)
└── index.html                # 미리보기 화면
```

---

## 작업 단계

| 단계 | 산출 | 비고 |
|------|------|------|
| T0 | `template/` | 프로젝트 공통, 한 번 |
| T1 | `00-topic.md` | 주제 선정 |
| T2 | `01-title.md` | 제목 |
| T3 | `02-toc.md` | 목차 선정 (여러 항) |
| T3b | `slide-map.md` | 장 순서·파일명·소주제 매핑 |
| T4-i | `content/<slug>_page_NN.md` | **목차 1덩어리당 원고 1개**, 짧게 |
| T5-i | `slides/page_NN.html` | **원고 확정 후** 슬라이드 화면 |
| T6 | `npm run open -- <발표자료_이름>` | 확인 |

루프:

```
T4: for each 목차 항목 → content/<소주제-slug>_page_NN.md
T5: for each 매핑된 항목 → slides/page_NN.html
```

긴 발표자료는 **한 세션 = 작업 하나**로 나누면 다루기 쉽다.

---

## 네이밍

### 장별 원고

`{소주제-slug}_page_{NN}.md`

- `slug`: 영문 kebab-case 권장 (`why-kia`, `core-experience`)
- `NN`: 최종 슬라이드 순서와 맞춤 (`01`, `02` …)
- 예: `cover_page_01.md`, `agenda_page_02.md`, `closing_page_07.md`

`page_03.md` 처럼 번호만 쓰지 않는다. **무슨 장면인지 파일명만 봐도 알 수 있게.**

### 슬라이드 파일

`page_{NN}.html` — 미리보기 순서 유지.
의미 있는 이름은 `slide-map.md`와 원고 파일명에 둔다.

### 목차 1장

- `02-toc.md`: 전체 목차 텍스트 (설계용)
- `agenda_page_02.md`: 선택, 짧은 키워드만 (화면용 초안)
- `page_02.html`: **목차 슬라이드 1장** (항목 나열, 줄글 X)

---

## 장별 원고에 넣을 것 (짧게)

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

## 슬라이드 단계

- `guide/SLIDE_HTML_RULES.md` + `template/slides/page_01.html` 참고
- 해당 작업의 **장별 원고 하나만** 읽고 구현
- 키워드·제목만 화면, 문단 붙여넣기 금지

---

## 작업 카드

- 공통 템플릿: [`guide/tasks/`](./tasks/)
- 발표자료별 복사(선택): `decks/<이름>/docs/tasks/`
- 카드에 **Read / Write / Do NOT / Done when** 고정

---

## 도구 (npm)

```bash
npm run create -- <발표자료_이름>
# T1~T5 AI + 파일
npm run open -- <발표자료_이름>
```

`open`은 슬라이드를 준비한 뒤 미리보기 화면을 연다. `scaffold`는 내부 보조 도구이며 목차와 순서표가 잡힌 뒤 슬라이드를 만드는 편이 이 흐름과 맞다.

---

## 연결 다이어그램

```
00-topic → 01-title → 02-toc → slide-map
                              ↓
              content/*_page_NN.md  (짧은 원고, 반복)
                              ↓
              slides/page_NN.html   (반복, page_02=목차 1장)
                              ↓
                       open
```
