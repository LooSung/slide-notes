# decks/ — 내 발표자료

발표자료 하나가 폴더 하나입니다.

## `docs/` = 발표 원고

발표 준비할 때 AI와 함께 다듬는 원고를 둡니다.

```
decks/my_presentation/docs/
  00-topic.md      # 주제·청중·원메시지
  01-title.md      # 제목
  02-toc.md        # 목차 설계
  slide-map.md     # 원고와 슬라이드 순서표
  content/         # 장마다 짧은 메모 (예: intro_page_03.md)
```

**사용법**은 `guide/` 에 있습니다. 여기 `docs/` 와 헷갈리지 마세요.

## 명령

```bash
npm run create -- my_presentation
npm run open -- my_presentation
```

가이드: [guide/START_HERE.md](../guide/START_HERE.md)
