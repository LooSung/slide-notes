# 슬라이드 HTML 규칙 (LLM용)

## 파일

- 경로: `decks/<덱>/slides/page_01.html`, `page_02.html`, …
- **`<title>`** = 슬라이드 제목 (뷰어 목록에 표시)

## 레이아웃

- 크기: **1280 × 720** (`common.css`의 `.slide-container`)
- 필수: `<link rel="stylesheet" href="../css/common.css" />`
- CDN: Tailwind 2.2, Noto Sans KR, Font Awesome (템플릿 `page_01.html` 참고)

## 디자인

- VS Code 다크 톤: 배경 `#1e1e1e`, 액센트 `#007acc`
- **한 슬라이드 = 한 메시지** (PT·면접용)
- 코드는 `.code-font` / `.code-snippet`

## 참고 파일

- 틀: `template/slides/page_01.html`
- 품질 예시: `examples/vibe_coding/slides/page_01.html` ~ `page_05.html`

## 수정 후

사용자에게 알릴 명령:

```bash
npm run open -- <덱_이름>
```
