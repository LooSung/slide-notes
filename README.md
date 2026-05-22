# Slide Notes — HTML 슬라이드 정리 하네스

**License:** MIT

스터디·발표·면접 PT 준비 때, 생각을 **HTML 슬라이드**로 정리하는 개인 워크스페이스입니다.  
구조와 워크플로는 [tobyilee/book-writer](https://github.com/tobyilee/book-writer)처럼 **「정리 → 산출물 → 빌드 → 결과물」** 흐름을 따릅니다. (책 대신 슬라이드 덱)

## 이 하네스가 하는 일

| Phase | 하는 일 | 산출물 |
| --- | --- | --- |
| 0. 아웃라인 | 주제·메시지·슬라이드 구성 초안 | `docs/*.md` |
| 1. 슬라이드 | HTML 슬라이드 작성 (직접 또는 AI) | `slides/page_*.html` |
| 2. 빌드 | 슬라이드 목록·순서 자동 생성 | `slides-config.js` |
| 3. 발표 | 브라우저 뷰어로 확인 | `index.html` |
| 4. PDF (선택) | 전체 덱을 한 PDF로 | `output/{덱이름}_slides.pdf` |

> `docs/`는 **프롬프트·메모용**이며 `build.js`가 변환하지 않습니다. 실제 발표는 `slides/`의 HTML만 사용합니다.

## 빠른 시작

```bash
git clone https://github.com/LooSung/slide-notes.git
cd slide-notes

# 새 덱 (스터디, PT 준비 등)
./create-presentation.sh my_topic

# 슬라이드 추가 후 목록 갱신
node build.js decks/my_topic

# 발표 보기 (← → Space)
open decks/my_topic/index.html

# PDF (선택, 최초 1회 npm install)
cd decks/my_topic && npm install && npm run export-pdf
```

## 사전 준비

| 도구 | 용도 | 필수 |
| --- | --- | --- |
| Node.js 18+ | `build.js`, PDF export | 빌드·PDF 시 |
| 브라우저 | `index.html` 뷰어 | ✅ |
| npm | Puppeteer (PDF만) | PDF 시 |

## 디렉토리 구조

```
slide-notes/
├── README.md                 # 이 파일
├── LICENSE                   # MIT
├── build.js                  # slides → slides-config.js
├── create-presentation.sh    # decks/<이름> 스캐폴딩
├── template/                 # 새 덱 템플릿 (수정하지 말고 복사용)
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
├── slides-config.js   # build.js로 자동 생성
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

- **파일명**: `page_1.html`, `page_2.html` … (`build.js`가 숫자 순 정렬)
- **크기**: 1280×720 (16:9), `../css/common.css` 링크
- **한 장 = 한 메시지** (PT·면접에 유리)
- **제목**: `<title>` 태그 → `slides-config.js`에 반영

새 슬라이드 추가·수정 후:

```bash
node build.js decks/my_topic
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

`node build.js <덱_경로>`를 실행했는지, `slides-config.js`가 있는지 확인하세요.

### PDF가 비어 있음

`slides-config.js` 순서와 `slides/` 파일명이 일치하는지 확인. `npm install` 후 다시 `npm run export-pdf`.

### 예전 경로 `vibe_coding`이 안 됨

덱은 `examples/vibe_coding`으로 이동했습니다.

```bash
node build.js examples/vibe_coding
open examples/vibe_coding/index.html
```

## 라이선스

MIT — [LICENSE](./LICENSE)

## 크레딧

- 워크플로 영감: [tobyilee/book-writer](https://github.com/tobyilee/book-writer)
- 예시 덱 `examples/vibe_coding`: 라이브 바이브 코딩 세션 자료
