#!/bin/bash

# 새 슬라이드 덱 생성
# 사용법: ./create-presentation.sh <덱_이름>

if [ -z "$1" ]; then
    echo "❌ 사용법: ./create-presentation.sh <덱_이름>"
    echo "예시: ./create-presentation.sh study_react"
    exit 1
fi

PROJECT_NAME=$1
TEMPLATE_DIR="template"
PROJECT_DIR="decks/${PROJECT_NAME}"

if [ -d "$PROJECT_DIR" ]; then
    echo "❌ 이미 존재합니다: $PROJECT_DIR"
    exit 1
fi

if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "❌ 템플릿 폴더 없음: $TEMPLATE_DIR"
    exit 1
fi

mkdir -p decks

echo "🚀 새 덱 생성: $PROJECT_DIR"
echo ""

mkdir -p "$PROJECT_DIR/docs" "$PROJECT_DIR/slides"

cp "$TEMPLATE_DIR/index.html" "$PROJECT_DIR/"
cp -r "$TEMPLATE_DIR/css" "$PROJECT_DIR/"
cp -r "$TEMPLATE_DIR/templates" "$PROJECT_DIR/"
cp "$TEMPLATE_DIR/package.json" "$PROJECT_DIR/"
mkdir -p "$PROJECT_DIR/scripts"
cp "$TEMPLATE_DIR/scripts"/* "$PROJECT_DIR/scripts/"
cp "$TEMPLATE_DIR/slides/page_1.html" "$PROJECT_DIR/slides/"
cp "$TEMPLATE_DIR/docs/01-outline.md" "$PROJECT_DIR/docs/"

# package.json name 치환
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/slide-notes-deck/slide-notes-${PROJECT_NAME}/" "$PROJECT_DIR/package.json"
else
    sed -i "s/slide-notes-deck/slide-notes-${PROJECT_NAME}/" "$PROJECT_DIR/package.json"
fi

echo "✅ 파일 복사 완료"
echo ""
echo "🔧 slides-config.js 생성 중..."
node build.js "$PROJECT_DIR"

echo ""
echo "🎉 완료!"
echo ""
echo "다음 단계:"
echo "  1. $PROJECT_DIR/docs/01-outline.md  — 생각·스토리 정리"
echo "  2. $PROJECT_DIR/slides/             — page_2.html … 추가·수정"
echo "  3. node build.js $PROJECT_DIR       — 슬라이드 목록 갱신"
echo "  4. open $PROJECT_DIR/index.html     — 발표 보기"
echo "  5. (선택) cd $PROJECT_DIR && npm install && npm run export-pdf"
