# scripts/ — 하네스 CLI

slide-notes **프로젝트 루트 전용** 도구입니다. 각 발표자료의 `scripts/export-pdf.js`(PDF)와는 별개입니다.

| 파일 | 역할 | npm |
| --- | --- | --- |
| `create-deck.js` | 새 발표자료 폴더 생성 | `create` |
| `open-deck.js` | 슬라이드 준비 + 미리보기 열기 | `open` |
| `build-config.js` | slides-config.js 갱신 (내부/점검용) | `build` |
| `scaffold-from-outline.js` | 원고 → 슬라이드 틀 (보조) | `scaffold` |
| `lib/resolve-deck.js` | `kia_pt` → `decks/kia_pt` | (공용) |

## 예시

```bash
npm run create -- study_react
npm run open -- study_react
```
