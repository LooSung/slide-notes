# slide-notes — Codex / 범용 코딩 에이전트

HTML 슬라이드 덱을 **코드(파일)로 관리**합니다. 오케스트레이션 프레임워크 없이, 이 레포의 파일과 npm 스크립트만 사용합니다.

## 시작

1. [CLAUDE.md](./CLAUDE.md) 또는 [docs/LLM_WORKFLOW.md](./docs/LLM_WORKFLOW.md) 읽기
2. 작업 대상 덱: `decks/<name>/` (없으면 `npm run create -- <name>`)
3. 규칙: [docs/SLIDE_HTML_RULES.md](./docs/SLIDE_HTML_RULES.md)

## 산출물

| 경로 | 누가 쓰나 |
| --- | --- |
| `docs/*.md` | 사람 + LLM (아웃라인·메모) |
| `slides/page_*.html` | **LLM이 주로 작성** |
| `slides-config.js` | `npm run build` (자동) |

## 완료 시

```bash
npm run build -- <덱_이름>
npm run open -- <덱_이름>
```
