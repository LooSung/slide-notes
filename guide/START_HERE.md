# 처음 쓰는 사람 — 15분 따라하기

README만 보고 막막했다면 **이 문서만** 순서대로 따라가면 됩니다.

---

## 준비

준비물: Git, Node.js 18 이상, npm, Cursor(또는 Claude Code, Codex).
기본 create/open 경로는 루트에서 `npm install` 없이 동작한다.

```bash
git clone https://github.com/LooSung/slide-notes.git
cd slide-notes
npm run create -- my_first_presentation
```

Cursor(또는 Claude Code, Codex)에서 **`slide-notes` 폴더 전체**를 연다.

---

## Step 1 — 설계 (AI에게 한 번에)

아래 블록을 **그대로** AI 채팅에 붙여넣고, `[ ]`만 본인 내용으로 바꾼다.

```
slide-notes 프로젝트에서 발표자료 "my_first_presentation" 원고를 만들어줘.

【목적】 발표용. 보고서 아님. 슬라이드는 키워드만, 말은 내가 할 거야.

【내 주제】
- 주제: [예: 하네스 엔지니어링 소개]
- 청중: [예: 사내 스터디 동료]
- 발표가 끝난 뒤 남길 한 문장: [예: 작업을 나누면 AI와도 발표자료를 안정적으로 만들 수 있다]
- 발표 시간: [예: 7분]

【만들 파일】
1. decks/my_first_presentation/docs/00-topic.md
2. decks/my_first_presentation/docs/01-title.md
3. decks/my_first_presentation/docs/02-toc.md
   - 1번=표지, 2번=목차(한 장만), 3~6번=본론·마무리
   - 장 수 6장 정도
4. decks/my_first_presentation/docs/slide-map.md (표: 순서 | page | content_md | 소주제)

【규칙】
- content_md 이름: {slug}_page_NN.md (예: intro_page_03.md)
- 아직 슬라이드 화면은 만들지 마
- guide/HARNESS.md 참고
```

**끝나면 확인:** `decks/my_first_presentation/docs/` 에 topic, title, toc, slide-map 네 개 있는지.

---

## Step 2 — 장별 원고 (AI에게)

짧은 발표자료는 장별 원고까지 한 번에 요청해도 된다. 길어지면 `slide-map.md`의 행 단위로 나눈다.

```
my_first_presentation 발표 원고를 이어서 작성해줘.

- 읽기: decks/my_first_presentation/docs/00-topic.md, 02-toc.md, slide-map.md
- 작성: slide-map의 content_md에 적힌 decks/my_first_presentation/docs/content/*.md
- agenda_page_02도 포함

형식 (짧게):
# 소주제
## 화면 키워드 (3~5개)
## 말할 요점 (불릿 3개 이내)

슬라이드 화면은 아직 만들지 마.
```

---

## Step 3 — 슬라이드 화면 (AI에게)

```
my_first_presentation 원고로 발표용 슬라이드를 만들어줘.

- 읽기: decks/my_first_presentation/docs/, guide/SLIDE_HTML_RULES.md
- 참고: examples/vibe_coding/slides/page_01.html
- 작성: decks/my_first_presentation/slides/page_NN.html
- slide-map 순서대로 장별 원고를 화면용 슬라이드로 옮겨줘

화면에는 키워드만. 줄글 금지.
page_02는 02-toc 목록을 슬라이드에 나열 (목차 1장).
```

---

## Step 4 — 발표 보기 (본인이 터미널)

```bash
npm run open -- my_first_presentation
```

← → 키로 넘기며 **말로 연습**한다.

다른 사람에게 슬라이드 파일을 넘길 때는 인터넷 글꼴과 스타일을 불러올 수 있는지 확인한다. 오프라인 발표용이면 온라인 상태에서 화면을 확인한 뒤 PDF를 만든다.

```bash
cd decks/my_first_presentation
npm install
npm run export-pdf
```

---

## 막혔을 때

| 상황 | 할 일 |
|------|--------|
| 뭐부터? | 이 문서 Step 1부터 |
| 파일 이름 헷갈림 | `slide-map.md` 표만 본다 |
| 슬라이드 안 넘어감 | 슬라이드가 `slides/page_NN.html`로 만들어졌는지 확인 후 다시 `npm run open -- my_first_presentation` |
| 화면 꾸미기? | 나중 문제. 먼저 **짧은 키워드**만 |
| 작업을 더 잘게 나누고 싶음 | [tasks/](./tasks/) — 길어지면 한 장씩 |
| PDF가 안 만들어짐 | 발표자료 폴더에서 `npm install` 후 다시 실행 |

설계 상세: [HARNESS.md](./HARNESS.md) · 도구 설명 목록: [guide/README.md](./README.md)
