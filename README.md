# Slide Notes — HTML 슬라이드 정리 하네스

**License:** MIT

스터디·발표·면접 PT 준비 때, **Cursor / Claude Code / Codex** 등 LLM이 **HTML 파일을 직접 작성**하고, npm 스크립트로 빌드·발표하는 워크스페이스입니다.

LangChain·멀티 에이전트 오케스트레이션은 쓰지 않습니다. [book-writer](https://github.com/tobyilee/book-writer)처럼 **진입 문서 + 파일 규칙 + 스크립트**만 두는 형태입니다.

**LLM용 문서:** [docs/LLM_WORKFLOW.md](./docs/LLM_WORKFLOW.md) · [CLAUDE.md](./CLAUDE.md) · [AGENTS.md](./AGENTS.md)

## 이 하네스가 하는 일

| Phase | 하는 일 | 산출물 |
| --- | --- | --- |
| 0. 아웃라인 | 주제·메시지·슬라이드 구성 초안 | `docs/*.md` |
| 1. 슬라이드 | HTML 슬라이드 작성 (직접 또는 AI) | `slides/page_*.html` |
| 2. 빌드 | 슬라이드 목록·순서 자동 생성 | `slides-config.js` |
| 3. 발표 | 브라우저 뷰어로 확인 | `index.html` |
| 4. PDF (선택) | 전체 덱을 한 PDF로 | `output/{덱이름}_slides.pdf` |

> `docs/`는 **프롬프트·메모용**이며 빌드 스크립트가 변환하지 않습니다. 실제 발표는 `slides/`의 HTML만 사용합니다.

## 빠른 시작

```bash
git clone https://github.com/LooSung/slide-notes.git
cd slide-notes

# 새 덱
npm run create -- my_topic

# docs/01-outline.md 작성 후 HTML 틀 생성 (선택)
npm run scaffold -- my_topic

# LLM이 slides/page_*.html 내용 작성 → 목록 갱신 → 발표
npm run build -- my_topic
npm run open -- my_topic

# PDF (선택, 덱 폴더에서 최초 1회 npm install)
cd decks/my_topic && npm install && npm run export-pdf
```

### CLI (하네스 도구)

| 명령 | 하는 일 |
| --- | --- |
| `npm run create -- <이름>` | `decks/<이름>/` 생성 |
| `npm run scaffold -- <이름>` | `docs/` 아웃라인 → `slides/page_*.html` 틀 |
| `npm run build -- <이름>` | `slides-config.js` 갱신 |
| `npm run open -- <이름>` | 브라우저 뷰어 |

`<이름>`만 적으면 `decks/<이름>` 으로 해석됩니다. CLI는 [`scripts/`](./scripts/README.md).

## 사전 준비

| 도구 | 용도 | 필수 |
| --- | --- | --- |
| Node.js 18+ | `npm run build`, PDF export | 빌드·PDF 시 |
| 브라우저 | `index.html` 뷰어 | ✅ |
| npm | Puppeteer (PDF만) | PDF 시 |

## 디렉토리 구조

```
slide-notes/
├── README.md
├── package.json              # npm run create | build
├── scripts/                  # 하네스 CLI (create-deck, build-config)
├── template/                 # 새 덱 템플릿 (복사용)
├── decks/                    # 👤 내 덱 (git에 올릴 개인 작업)
│   └── my_topic/
├── examples/                 # 📎 샘플 덱
│   ├── vibe_coding/          # 라이브 세션 「진격! 바이브 코딩」(22장)
│   └── travel_guide_seoul/   # 서울 여행 가이드 (5장)
└── docs/
    └── PROMPT_FOR_AI.md      # AI에게 슬라이드 요청할 때
```

### 덱 하나의 구조

```
decks/my_topic/
├── docs/              # 생각 정리·AI 프롬프트 (빌드 미사용)
├── slides/            # page_1.html, page_2.html …
├── slides-config.js   # npm run build 로 자동 생성
├── index.html         # 발표 뷰어
├── css/common.css     # 공통 스타일 (1280×720)
├── templates/         # head 참고용
├── package.json       # PDF export용
└── scripts/export-pdf.js
```

## 예시 덱 보기

```bash
open examples/vibe_coding/index.html
open examples/travel_guide_seoul/index.html
```

- **vibe_coding**: 세션에서 만든 본편 덱. 슬라이드 HTML은 **원본 그대로** 두었습니다.
- **travel_guide_seoul**: 짧은 덱 예시.

## 슬라이드 작성 규칙

- **파일명**: `page_1.html`, `page_2.html` … (빌드 시 숫자 순 정렬)
- **크기**: 1280×720 (16:9), `../css/common.css` 링크
- **한 장 = 한 메시지** (PT·면접에 유리)
- **제목**: `<title>` 태그 → `slides-config.js`에 반영

새 슬라이드 추가·수정 후:

```bash
npm run build -- decks/my_topic
```

## AI로 슬라이드 만들기

[docs/PROMPT_FOR_AI.md](./docs/PROMPT_FOR_AI.md)의 프롬프트 예시를 Cursor·Claude 등에 붙여 넣으면 됩니다.  
book-writer가 「주제만 주면 책 파이프라인」이라면, slide-notes는 **「아웃라인만 주면 슬라이드 HTML」**에 가깝습니다.

## PDF보내기

```bash
cd decks/my_topic   # 또는 examples/vibe_coding
npm install         # 최초 1회
npm run export-pdf
# → output/my_topic_slides.pdf
```

`.puppeteer-tmp/`, `node_modules/`, `output/`은 git에 포함하지 않습니다 (`.gitignore`).

## 커스터마이징

| 목적 | 수정 위치 |
| --- | --- |
| 공통 색·레이아웃 | `template/css/common.css` (새 덱에 복사됨) |
| 뷰어 UI | `template/index.html` |
| PDF 해상도 | `scripts/export-pdf.js` viewport |
| 민감한 덱 비공개 | `.gitignore`에 `decks/*_private/` 등 추가 |

## 트러블슈팅

### `index.html`에서 슬라이드가 안 넘어감

`npm run build -- <덱_경로>`를 실행했는지, `slides-config.js`가 있는지 확인하세요.

### PDF가 비어 있음

`slides-config.js` 순서와 `slides/` 파일명이 일치하는지 확인. `npm install` 후 다시 `npm run export-pdf`.

### 예전 경로 `vibe_coding`이 안 됨

덱은 `examples/vibe_coding`으로 이동했습니다.

```bash
npm run build -- examples/vibe_coding
open examples/vibe_coding/index.html
```

## 라이선스

MIT — [LICENSE](./LICENSE)

## 크레딧

- 워크플로 영감: [tobyilee/book-writer](https://github.com/tobyilee/book-writer)
- 예시 덱 `examples/vibe_coding`: 라이브 바이브 코딩 세션 자료
