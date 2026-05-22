# LLM + 코드 워크플로 (slide-notes)

slide-notes는 **Cursor, Claude Code, Codex** 등이 이 레포 안에서 **파일을 읽고 HTML을 수정**하는 방식을 전제로 합니다.  
LangChain Graph·전용 에이전트 런타임은 **사용하지 않습니다**.

```
사람: 주제·메시지
    ↓
LLM: docs/ 정리 + slides/page_*.html 작성 (코드)
    ↓
도구: npm run build / open (결정적 스크립트)
    ↓
사람: 발표·PDF
```

## Phase

| Phase | 담당 | 입력 | 출력 |
| --- | --- | --- | --- |
| 0 | 사람 + LLM | 주제 | `docs/01-outline.md` |
| 1 | LLM | outline | `slides/page_*.html` |
| 1b (선택) | 스크립트 | outline 번호 목록 | 빈 HTML 틀 (`npm run scaffold`) |
| 2 | 스크립트 | slides/*.html | `slides-config.js` |
| 3 | 스크립트 | — | 브라우저 뷰어 (`npm run open`) |

## docs 아웃라인 형식 (scaffold·LLM 공통)

`decks/<이름>/docs/01-outline.md`:

```markdown
# 덱 제목

한 줄 요약

## 슬라이드 구성

1. 커버 — 나는 누구
2. 왜 이 주제인가
3. 핵심 경험
4. 마무리
```

`npm run scaffold -- <이름>` 이 번호 목록으로 `page_1.html` … 틀을 만듭니다.  
**본문 내용은 LLM이** 각 HTML에 채웁니다.

## LLM에게 시킬 때 (복붙용)

```
slide-notes 레포에서 덱 "<이름>" 작업해줘.

1. decks/<이름>/docs/01-outline.md 읽기
2. docs/SLIDE_HTML_RULES.md 와 examples/vibe_coding/slides/ 참고
3. slides/page_*.html 작성·수정 (한 장 = 한 메시지)
4. 끝나면 내가 터미널에서 실행할 명령 알려줘:
   npm run build -- <이름>
   npm run open -- <이름>
```

## 도구 vs LLM 역할

| | LLM | npm 스크립트 |
| --- | --- | --- |
| 생각·문장·레이아웃 | ✅ | ❌ |
| 파일 목록·정렬·뷰어 | ❌ | ✅ |
| PDF | ❌ (내용은 HTML) | ✅ `cd decks/<이름> && npm run export-pdf` |

## Codex / Claude Code / Cursor

| 도구 | 이 레포에 녹이는 방법 |
| --- | --- |
| **Cursor** | `.cursor/rules/slide-decks.mdc` 자동 적용 |
| **Claude Code** | 루트 `CLAUDE.md` 자동 로드 |
| **Codex / 기타** | `AGENTS.md` + 이 문서 링크 |

book-writer의 [CLAUDE.md + skills](https://github.com/tobyilee/book-writer)와 비슷하게, **「진입 문서 + 파일 규칙 + npm」** 만 두고 에이전트 런타임은 쓰지 않습니다.
