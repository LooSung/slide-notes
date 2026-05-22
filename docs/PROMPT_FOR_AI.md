# AI에게 슬라이드 만들기 요청할 때

`docs/`에 정리한 메모를 바탕으로, `slides/page_N.html`을 생성·수정하도록 요청하세요.

## 예시 프롬프트

```
이 프로젝트는 slide-notes HTML 슬라이드 덱이다.

덱 경로: decks/my_study
참고: decks/my_study/docs/01-outline.md

규칙:
- 슬라이드 크기 1280x720, ../css/common.css 사용
- 파일명 page_1.html, page_2.html …
- VS Code 다크 테마 톤 유지
- 한 슬라이드 = 한 메시지

docs 내용을 바탕으로 page_2.html ~ page_5.html 초안을 만들어줘.
완료 후 node build.js decks/my_study 실행이 필요하다고 알려줘.
```

## Phase 요약

1. **정리** — `docs/*.md`에 아웃라인·메모
2. **슬라이드** — `slides/page_*.html` (AI 또는 직접)
3. **빌드** — `node build.js <덱_경로>`
4. **발표** — `index.html` 뷰어
5. **PDF** — `npm run export-pdf` (선택)
