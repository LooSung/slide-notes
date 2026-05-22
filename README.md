# slide-notes

**발표용** HTML 슬라이드 덱을 만드는 하네스입니다.  
스터디 정리, 짧은 설명, 면접 PT처럼 **말로 전달**할 때 쓰도록 설계했습니다.

- 보고서 PDF가 아니라 **발표 화면** (1280×720, 브라우저 뷰어)
- LLM API 파이프라인 없음 — **Cursor / Claude Code / Codex**가 파일을 직접 작성
- **MD로 생각 정리 → HTML로 화면 구현** (Task 단위, 토큰 절약)

**License:** MIT

---

## 왜 이렇게 나누나

| 구분 | 보고용 | slide-notes (발표용) |
|------|--------|---------------------|
| 읽는 사람 | 혼자 | 청중 + 발표자 |
| 슬라이드 | 문단·표 | **키워드·한 메시지** |
| 설계 | 문서 완결성 | **말의 순서** (기승전결) |

**원칙:** 발표자가 말하고, 슬라이드는 단서만 담는다.  
자세한 말은 `docs/content/*.md`, 화면은 `slides/page_*.html`.

---

## 워크플로 (요약)

```
주제 → Title → 목차 → (목차마다) Content MD → (목차마다) HTML → build / open
```

| 단계 | 산출 |
|------|------|
| 주제·Title·목차 | `00-topic.md`, `01-title.md`, `02-toc.md` |
| 매핑 | `slide-map.md` |
| 내용 (짧은 MD) | `content/why-kia_page_03.md` … |
| 화면 | `page_03.html` … (`page_02` = **목차 index 1장**) |
| 마무리 | `npm run build` → `npm run open` |

한 번에 하지 않고 **Task 카드**(`docs/tasks/`) 하나당 세션 하나.  
전체 설계: **[docs/HARNESS.md](./docs/HARNESS.md)**

---

## 빠른 시작

```bash
git clone https://github.com/LooSung/slide-notes.git
cd slide-notes

npm run create -- my_deck
```

1. [docs/tasks/](./docs/tasks/) — T1부터 순서대로 (LLM에 카드 붙여넣기)
2. `npm run build -- my_deck`
3. `npm run open -- my_deck`

```bash
# 예시 덱
npm run open -- vibe_coding    # → examples/vibe_coding
```

### npm

| 명령 | 설명 |
|------|------|
| `npm run create -- <이름>` | `decks/<이름>/` 생성 |
| `npm run build -- <이름>` | `slides-config.js` 갱신 |
| `npm run open -- <이름>` | 뷰어 열기 |
| `npm run scaffold -- <이름>` | (선택) 아웃라인 → HTML 틀만 |

`<이름>`만 입력해도 `decks/<이름>`으로 인식합니다.

---

## 레포 구조

```
slide-notes/
├── docs/           # HARNESS, Task 카드, HTML 규칙
├── scripts/        # create, build, open
├── template/       # 새 덱 복사용
├── decks/          # 내 발표 덱
└── examples/       # vibe_coding, travel_guide_seoul
```

### 덱 하나 (`decks/my_deck/`)

```
docs/
  00-topic.md … 02-toc.md, slide-map.md
  content/       # 소주제_slug_page_NN.md
  tasks/         # Task 카드 (복사·수정)
slides/          # page_01.html …
index.html       # 발표 뷰어 (← →)
```

---

## LLM 도구별 진입

| 도구 | 읽을 것 |
|------|---------|
| Cursor | `.cursor/rules/`, [docs/tasks/](./docs/tasks/) |
| Claude Code | [CLAUDE.md](./CLAUDE.md) |
| Codex 등 | [AGENTS.md](./AGENTS.md) |

HTML 규칙: [docs/SLIDE_HTML_RULES.md](./docs/SLIDE_HTML_RULES.md)

---

## PDF (선택)

```bash
cd decks/my_deck && npm install && npm run export-pdf
```

---

## 예시

- `examples/vibe_coding` — 라이브 세션 「진격! 바이브 코딩」(22장)
- `examples/travel_guide_seoul` — 짧은 덱 (5장)

---

## 라이선스

MIT — [LICENSE](./LICENSE)
