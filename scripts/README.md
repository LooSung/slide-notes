# scripts/ — 하네스 CLI

slide-notes **레포 루트 전용** 도구입니다. 각 덱의 `scripts/export-pdf.js`(PDF)와는 별개입니다.

| 파일 | 역할 | npm |
| --- | --- | --- |
| `create-deck.sh` | 새 덱 스캐폴딩 | `create` |
| `scaffold-from-outline.js` | docs → HTML 틀 | `scaffold` |
| `build-config.js` | slides-config.js | `build` |
| `open-deck.js` | 뷰어 열기 | `open` |
| `lib/resolve-deck.js` | `kia_pt` → `decks/kia_pt` | (공용) |

## 예시

```bash
npm run create -- study_react
npm run scaffold -- study_react
npm run build -- study_react
npm run open -- study_react
npm run build -- vibe_coding   # → examples/vibe_coding
```
