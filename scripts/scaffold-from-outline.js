#!/usr/bin/env node

/**
 * docs/*.md 아웃라인 → slides/page_N.html 빈 틀 생성 (LLM이 내용 채움)
 */

const fs = require('fs');
const path = require('path');
const { resolveDeck, deckLabel, REPO_ROOT } = require('./lib/resolve-deck');

const name = process.argv[2];
const deckDir = resolveDeck(name);

if (!name) {
    console.error('❌ 사용법: npm run scaffold -- <덱_이름>');
    process.exit(1);
}

if (!fs.existsSync(deckDir)) {
    console.error(`❌ 덱 없음: ${deckLabel(deckDir)}`);
    console.error('💡 npm run create -- <이름>');
    process.exit(1);
}

const docsDir = path.join(deckDir, 'docs');
const slidesDir = path.join(deckDir, 'slides');
const templateSlide = path.join(REPO_ROOT, 'template/slides/page_1.html');

if (!fs.existsSync(docsDir)) {
    console.error('❌ docs/ 폴더 없음');
    process.exit(1);
}

function parseOutlineFromMarkdown(content) {
    const titles = [];
    const lines = content.split('\n');
    let inSlidesSection = false;

    for (const line of lines) {
        if (/^##\s+슬라이드/.test(line) || /^##\s+구성/.test(line)) {
            inSlidesSection = true;
            continue;
        }
        if (inSlidesSection && /^##\s+/.test(line) && !/^##\s+슬라이드/.test(line)) {
            break;
        }

        const numbered =
            line.match(/^\s*\d+\.\s+(.+?)(?:\s*[—\-–]\s*|$)/) ||
            line.match(/^\s*[-*]\s+(.+?)(?:\s*[—\-–]\s*|$)/);
        if (numbered) {
            const title = numbered[1].replace(/\*\*/g, '').trim();
            if (title && !title.startsWith('...')) {
                titles.push(title);
            }
        }
    }

    return titles;
}

const mdFiles = fs
    .readdirSync(docsDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

let slideTitles = [];
for (const file of mdFiles) {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf-8');
    const parsed = parseOutlineFromMarkdown(content);
    if (parsed.length > slideTitles.length) {
        slideTitles = parsed;
    }
}

if (slideTitles.length === 0) {
    console.error('❌ docs/*.md 에서 슬라이드 목록을 찾지 못했습니다.');
    console.error('💡 docs/01-outline.md 에 아래 형식으로 작성하세요:');
    console.error('');
    console.error('## 슬라이드 구성');
    console.error('1. 커버 — 한 줄 메시지');
    console.error('2. 주제 소개');
    process.exit(1);
}

if (!fs.existsSync(slidesDir)) {
    fs.mkdirSync(slidesDir, { recursive: true });
}

const templateHtml = fs.readFileSync(templateSlide, 'utf-8');

function makeSlideHtml(title, pageNum) {
    return templateHtml
        .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
        .replace(/슬라이드 제목/g, title)
        .replace(/한 줄로 메시지를 적어 보세요/g, '(LLM 또는 직접 작성)');
}

let created = 0;
slideTitles.forEach((title, i) => {
    const pageNum = i + 1;
    const filename = `page_${pageNum}.html`;
    const outPath = path.join(slidesDir, filename);

    if (fs.existsSync(outPath) && pageNum === 1) {
        console.log(`⏭️  ${filename} — 이미 있음 (유지)`);
        return;
    }
    if (fs.existsSync(outPath)) {
        console.log(`⏭️  ${filename} — 이미 있음 (건너뜀, 덮어쓰려면 파일 삭제)`);
        return;
    }

    fs.writeFileSync(outPath, makeSlideHtml(title, pageNum), 'utf-8');
    console.log(`✅ ${filename} — "${title}"`);
    created++;
});

console.log('');
console.log(`📝 ${created}개 틀 생성 (${slideTitles.length}장 구성)`);
console.log('다음: LLM에게 slides/ 내용 채우기 요청 → npm run build -- ' + name);
