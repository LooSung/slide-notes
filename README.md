# slide-notes

**말로 발표할** 자료를 HTML 슬라이드로 만드는 도구입니다.

> **처음이면 → [guide/START_HERE.md](./guide/START_HERE.md)**

---

## `docs` 폴더 — 용도 하나만 기억하기

| 경로 | 용도 |
|------|------|
| **`decks/내_덱/docs/`** | ✅ **작업할 때** 쓰는 원고 (주제, 목차, content MD) |
| **`guide/`** | 도구 설명서 (하네스, Task, HTML 규칙) — **원고 아님** |

`docs`라는 이름은 **덱 안에서만** “발표 준비 작업 공간”입니다.

---

## 30초 요약

1. `npm run create -- 내_덱이름`
2. AI가 **`decks/내_덱/docs/`** 에 짧은 MD 작성
3. AI가 **`decks/내_덱/slides/`** 에 HTML 작성
4. `npm run build` → `npm run open`

**API 없음.** Cursor / Claude Code / Codex가 파일을 직접 수정합니다.

---

## 역할

| 누가 | 어디서 |
|------|--------|
| **나** | 주제 정하기, npm, 발표 연습 |
| **AI** | `decks/…/docs/` (MD) → `decks/…/slides/` (HTML) |
| **npm** | build, open |

한 번에 다 시키지 말고 [guide/START_HERE.md](./guide/START_HERE.md) 순서대로.

---

## 3분 체험

```bash
git clone https://github.com/LooSung/slide-notes.git
cd slide-notes
npm run open -- vibe_coding
```

---

## npm

| 명령 | 설명 |
|------|------|
| `npm run create -- 이름` | `decks/이름/` 생성 |
| `npm run build -- 이름` | 슬라이드 목록 갱신 |
| `npm run open -- 이름` | 뷰어 |

---

## 문서 (도구 설명 = guide/)

| 문서 | 내용 |
|------|------|
| [guide/START_HERE.md](./guide/START_HERE.md) | 따라하기 + 프롬프트 |
| [guide/HARNESS.md](./guide/HARNESS.md) | 방법론 |
| [guide/tasks/](./guide/tasks/) | Task 카드 |
| [guide/SLIDE_HTML_RULES.md](./guide/SLIDE_HTML_RULES.md) | HTML 규칙 |

Claude Code: [CLAUDE.md](./CLAUDE.md) · Codex: [AGENTS.md](./AGENTS.md)

---

## 예시

- `examples/vibe_coding` (22장)
- `examples/travel_guide_seoul` (5장)

---

**License:** MIT — [LICENSE](./LICENSE)
