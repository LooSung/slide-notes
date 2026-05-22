# slide-notes

`slide-notes`는 AI와 함께 발표자료를 만드는 작업 공간입니다.
말할 흐름은 원고에 남기고, 화면에는 발표에 필요한 단서만 슬라이드로 옮깁니다.

Cursor, Claude Code, Codex처럼 프로젝트 파일을 직접 수정하는 AI와 함께 쓰는 흐름을 전제로 합니다.

## 시작

준비물: Git, Node.js 18 이상, npm.

```bash
git clone https://github.com/LooSung/slide-notes.git
cd slide-notes
npm run create -- my_presentation
```

생성 후 AI 편집기에서 `slide-notes` 폴더를 열고 원고부터 요청합니다.

## 원고 만들기

```text
slide-notes 프로젝트에서 발표자료 "my_presentation" 원고를 만들어줘.

화면은 키워드 위주로 두고, 말할 흐름은 원고에 남겨줘.

- 주제: [발표 주제]
- 청중: [듣는 사람]
- 원 메시지: [발표가 끝난 뒤 남길 한 문장]
- 발표 시간: [예: 7분]

아래 순서로 원고 파일을 작성해줘.
- decks/my_presentation/docs/00-topic.md
- decks/my_presentation/docs/01-title.md
- decks/my_presentation/docs/02-toc.md
- decks/my_presentation/docs/slide-map.md
- decks/my_presentation/docs/content/*.md

slide-map은 순서, page, content_md, 소주제 표로 만들고,
장별 원고는 slide-map에 적은 파일명대로 작성해줘.
아직 슬라이드 화면은 만들지 마.
```

긴 발표자료는 구성 잡기와 장별 원고 작성을 나눠도 됩니다.
더 자세한 요청 순서는 [guide/START_HERE.md](./guide/START_HERE.md)에 있습니다.

## 슬라이드 만들기

```text
my_presentation 원고가 준비됐어.

- 먼저 읽기: decks/my_presentation/docs/slide-map.md, guide/SLIDE_HTML_RULES.md
- 작성: decks/my_presentation/slides/page_NN.html
- slide-map 순서대로 한 행씩 처리해줘
- 각 행에서는 content_md에 적힌 장별 원고 하나만 읽고 발표용 슬라이드 화면으로 옮겨줘
- 화면에는 제목과 키워드 중심으로 두고 말할 설명을 길게 붙이지 마
- page_02를 만들 때만 decks/my_presentation/docs/02-toc.md도 읽고 목차 한 장으로 만들어줘
```

긴 발표자료는 같은 요청을 page 단위로 나누면 필요한 원고만 읽고 진행할 수 있습니다.

## 열어 보기

```bash
npm run open -- my_presentation
```

`open`은 현재 슬라이드를 확인하고 미리보기 화면을 엽니다.
예시 발표자료는 `npm run open -- vibe_coding`으로 볼 수 있습니다.

## 전달 전 체크

- `npm run open -- <발표자료_이름>` 후 처음부터 끝까지 넘겨 봤는가
- `page_02`가 목차 한 장이고 발표 흐름이 끊기지 않는가
- 화면은 키워드 중심이고 말할 설명은 `docs/content/`에 남아 있는가
- 슬라이드 파일로 넘길 경우 발표 환경에서 인터넷 글꼴과 스타일을 불러올 수 있는가
- 오프라인 전달이 필요하면 PDF를 함께 만들었는가

현재 슬라이드는 인터넷에서 글꼴과 스타일 파일을 불러옵니다.
오프라인 전달용 PDF는 발표자료 폴더에서 만듭니다.

```bash
cd decks/my_presentation
npm install
npm run export-pdf
```

PDF는 `decks/my_presentation/output/`에 생성됩니다.

## 참고 문서

| 문서 | 언제 읽나 |
| --- | --- |
| [guide/START_HERE.md](./guide/START_HERE.md) | 첫 발표자료를 만들 때 |
| [guide/HARNESS.md](./guide/HARNESS.md) | 작업 방식과 파일 구조를 볼 때 |
| [guide/tasks/](./guide/tasks/) | 긴 발표자료 작업을 나눌 때 |
| [guide/SLIDE_HTML_RULES.md](./guide/SLIDE_HTML_RULES.md) | 슬라이드 화면을 만들 때 |

짧은 예시 발표자료는 `examples/vibe_coding`에 있습니다.
에이전트용 시작점은 [AGENTS.md](./AGENTS.md), [CLAUDE.md](./CLAUDE.md)입니다.

**License:** MIT - [LICENSE](./LICENSE)
