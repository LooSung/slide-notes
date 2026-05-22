# decks/ — 내 발표 덱

각 덱 폴더가 **작업 단위**입니다.

## `docs/` = 이 덱 작업 공간

발표 준비할 때 AI와 함께 수정하는 **원고**만 둡니다.

```
decks/my_deck/docs/
  00-topic.md      # 주제·청중·원메시지
  01-title.md      # 제목
  02-toc.md        # 목차 설계
  slide-map.md     # MD ↔ HTML 매핑
  content/         # 장마다 짧은 MD (예: intro_page_03.md)
```

**도구 설명서**는 레포 `guide/` 에 있습니다. 여기 `docs/` 와 헷갈리지 마세요.

## 명령

```bash
npm run create -- my_deck
npm run build -- my_deck
npm run open -- my_deck
```

가이드: [guide/START_HERE.md](../guide/START_HERE.md)
