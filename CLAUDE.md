# slide-notes — Claude Code / Cursor 진입점

이 레포는 **LangChain·멀티 에이전트 오케스트레이션이 아니라**, LLM이 **파일(코드)을 직접 읽고 쓰는** 방식으로 HTML 슬라이드 덱을 만듭니다.

## 반드시 읽을 문서

- [docs/LLM_WORKFLOW.md](./docs/LLM_WORKFLOW.md) — Phase·파일 계약·완료 체크리스트
- [docs/SLIDE_HTML_RULES.md](./docs/SLIDE_HTML_RULES.md) — 슬라이드 HTML 규칙
- 예시 덱: `examples/vibe_coding/slides/page_1.html`

## LLM 작업 순서 (요약)

1. 사용자와 **덱 이름** 확정 (예: `kia_pt` → `decks/kia_pt/`)
2. `decks/<이름>/docs/01-outline.md` 에 슬라이드 구성(번호 목록) 작성·갱신
3. 틀이 없으면 사용자에게 `npm run scaffold -- <이름>` 안내 (또는 직접 `slides/page_N.html` 생성)
4. `docs/`와 아웃라인을 읽고 **`slides/page_*.html` 내용 작성** (1280×720, `common.css`)
5. 완료 후 사용자에게 실행 안내:
   - `npm run build -- <이름>`
   - `npm run open -- <이름>`

## 하지 말 것

- `docs/`만 수정하고 `slides/`를 비워 두기
- LangGraph·에이전트 체인으로 이 레포를 돌리려 하기 (불필요)
- 슬라이드 파일명을 `slide-3.html` 같이 임의로 짓기 → **`page_N.html`**

## npm (사용자·에이전트가 터미널에서 실행)

| 명령 | 역할 |
| --- | --- |
| `npm run create -- <이름>` | 새 덱 |
| `npm run scaffold -- <이름>` | outline → page_*.html 틀 |
| `npm run build -- <이름>` | slides-config.js |
| `npm run open -- <이름>` | 뷰어 |

덱 이름만으로 `decks/<이름>` 경로가 해석됩니다.
