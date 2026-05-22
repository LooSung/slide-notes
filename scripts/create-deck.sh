#!/bin/bash
# 새 덱 스캐폴딩: template → decks/<이름>
# 사용법: ./scripts/create-deck.sh <덱_이름>

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

DECK_NAME="${1:-}"
TEMPLATE_DIR="template"
DECK_DIR="decks/${DECK_NAME}"

if [ -z "$DECK_NAME" ]; then
    echo "❌ 사용법: ./scripts/create-deck.sh <덱_이름>"
    echo "예시: npm run create -- study_react"
    exit 1
fi

if [ -d "$DECK_DIR" ]; then
    echo "❌ 이미 존재: $DECK_DIR"
    exit 1
fi

if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "❌ 템플릿 없음: $TEMPLATE_DIR"
    exit 1
fi

mkdir -p decks
mkdir -p "$DECK_DIR/docs/content" "$DECK_DIR/slides" "$DECK_DIR/scripts"

cp "$TEMPLATE_DIR/index.html" "$DECK_DIR/"
cp -r "$TEMPLATE_DIR/css" "$DECK_DIR/"
cp -r "$TEMPLATE_DIR/templates" "$DECK_DIR/"
cp "$TEMPLATE_DIR/package.json" "$DECK_DIR/"
cp "$TEMPLATE_DIR/scripts"/* "$DECK_DIR/scripts/"
cp "$TEMPLATE_DIR/slides/page_1.html" "$DECK_DIR/slides/"
cp "$TEMPLATE_DIR/docs/"*.md "$DECK_DIR/docs/" 2>/dev/null || true
cp "$TEMPLATE_DIR/docs/content/"*.md "$DECK_DIR/docs/content/" 2>/dev/null || true

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/slide-notes-deck/slide-notes-${DECK_NAME}/" "$DECK_DIR/package.json"
else
    sed -i "s/slide-notes-deck/slide-notes-${DECK_NAME}/" "$DECK_DIR/package.json"
fi

echo "🚀 덱 생성: $DECK_DIR"
node scripts/build-config.js "$DECK_DIR"
echo ""
echo "다음:"
echo "  작업 원고 → decks/$DECK_NAME/docs/  (주제·목차·content)"
echo "  가이드     → guide/START_HERE.md"
echo "  1. guide/START_HERE Step 1 (AI로 00-topic ~ slide-map)"
echo "  2. content/*.md → slides/*.html"
echo "  3. npm run build -- $DECK_NAME && npm run open -- $DECK_NAME"
