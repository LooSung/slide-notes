# slide-notes

`slide-notes`는 LLM과 함께 발표 자료를 만드는 작업 레포입니다.
말할 흐름은 Markdown에 남기고, 화면에는 발표에 필요한 단서만 HTML 슬라이드로 옮깁니다.

Cursor, Claude Code, Codex처럼 레포 파일을 직접 수정하는 AI와 함께 쓰는 흐름을 전제로 합니다.

## 시작

준비물: Git, Node.js 18 이상, npm.

```bash
git clone https://github.com/LooSung/slide-notes.git
cd slide-notes
npm run create -- my_deck
```

생성 후 AI 편집기에서 `slide-notes` 레포를 열고 원고부터 요청합니다.

## 원고 만들기

```text
slide-notes 레포에서 발표 덱 "my_deck" 설계해줘.

발표용 자료야. 화면은 키워드 위주로 두고, 말할 흐름은 Markdown에 남겨줘.

- 주제: [발표 주제]
- 청중: [듣는 사람]
- 원 메시지: [발표가 끝난 뒤 남길 한 문장]
- 발표 시간: [예: 7분]

아래 순서로 Markdown 원고를 작성해줘.
- decks/my_deck/docs/00-topic.md
- decks/my_deck/docs/01-title.md
- decks/my_deck/docs/02-toc.md
- decks/my_deck/docs/slide-map.md
- decks/my_deck/docs/content/*.md

slide-map은 순서, page, content_md, 소주제 표로 만들고,
content Markdown은 slide-map에 적은 파일명대로 작성해줘.
아직 HTML은 만들지 마.
```

긴 덱은 설계와 content Markdown 작성을 나눠도 됩니다.
더 자세한 요청 순서는 [guide/START_HERE.md](./guide/START_HERE.md)에 있습니다.

## 슬라이드 만들기

```text
my_deck 원고가 준비됐어.

- 읽기: decks/my_deck/docs/, guide/SLIDE_HTML_RULES.md
- 작성: decks/my_deck/slides/page_NN.html
- slide-map 순서대로 content Markdown을 화면용 HTML 슬라이드로 옮겨줘
- 화면에는 제목과 키워드 중심으로 두고 말할 설명을 길게 붙이지 마
- page_02는 목차 index 한 장으로 만들어줘
```

## 열어 보기

```bash
npm run open -- my_deck
```

`open`은 현재 `slides/`를 확인하고 덱 뷰어를 엽니다.
예시 덱은 `npm run open -- vibe_coding`으로 볼 수 있습니다.

## 전달 전 체크

- `npm run open -- <덱>` 후 처음부터 끝까지 넘겨 봤는가
- `page_02`가 목차 index 한 장이고 발표 흐름이 끊기지 않는가
- 화면은 키워드 중심이고 말할 설명은 `docs/content/`에 남아 있는가
- HTML로 넘길 경우 발표 환경에서 CDN 접근이 가능한가
- 오프라인 전달이 필요하면 PDF를 함께 만들었는가

슬라이드 HTML은 Tailwind, Google Fonts, Font Awesome CDN을 읽습니다.
오프라인 전달용 PDF는 덱 폴더에서 만듭니다.

```bash
cd decks/my_deck
npm install
npm run export-pdf
```

PDF는 `decks/my_deck/output/`에 생성됩니다.

## 참고 문서

| 문서 | 언제 읽나 |
| --- | --- |
| [guide/START_HERE.md](./guide/START_HERE.md) | 첫 덱을 만들 때 |
| [guide/HARNESS.md](./guide/HARNESS.md) | 작업 방식과 파일 구조를 볼 때 |
| [guide/tasks/](./guide/tasks/) | 긴 덱을 Task 단위로 나눌 때 |
| [guide/SLIDE_HTML_RULES.md](./guide/SLIDE_HTML_RULES.md) | 슬라이드 HTML을 만들 때 |

예시 덱은 `examples/vibe_coding`과 `examples/travel_guide_seoul`에 있습니다.
에이전트용 시작점은 [AGENTS.md](./AGENTS.md), [CLAUDE.md](./CLAUDE.md)입니다.

**License:** MIT - [LICENSE](./LICENSE)
