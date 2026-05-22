#!/usr/bin/env node

/**
 * slides/*.html → slides-config.js 생성
 *
 * 사용법: node scripts/build-config.js <덱_경로>
 * 예시: node scripts/build-config.js decks/my_topic
 */

const fs = require('fs');
const path = require('path');
const { resolveDeck, deckLabel } = require('./lib/resolve-deck');

const deckInput = process.argv[2];

if (!deckInput) {
    console.error('❌ 사용법: npm run build -- <덱_이름>');
    console.error('예시: npm run build -- kia_pt');
    process.exit(1);
}

const projectDir = resolveDeck(deckInput);
const slidesDir = path.join(projectDir, 'slides');

if (!fs.existsSync(projectDir)) {
    console.error(`❌ 덱 폴더를 찾을 수 없습니다: ${projectDir}`);
    process.exit(1);
}

if (!fs.existsSync(slidesDir)) {
    console.error(`❌ slides 폴더가 없습니다: ${slidesDir}`);
    process.exit(1);
}

function extractTitleFromHTML(htmlPath) {
    try {
        const html = fs.readFileSync(htmlPath, 'utf-8');
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        if (titleMatch) {
            return titleMatch[1].trim();
        }
        const filename = path.basename(htmlPath, '.html');
        return filename.replace(/-/g, ' ').replace(/_/g, ' ');
    } catch {
        return path.basename(htmlPath, '.html');
    }
}

console.log(`🚀 빌드: ${deckLabel(projectDir)}`);
console.log(`📁 ${projectDir}`);
console.log('');

const htmlFiles = fs
    .readdirSync(slidesDir)
    .filter((file) => file.endsWith('.html'))
    .filter(
        (file) =>
            !file.includes('methodology') && !file.includes('vibe-coding'),
    )
    .sort((a, b) => {
        const pageMatchA = a.match(/page_(\d+)\.html/);
        const pageMatchB = b.match(/page_(\d+)\.html/);
        if (pageMatchA && pageMatchB) {
            return parseInt(pageMatchA[1], 10) - parseInt(pageMatchB[1], 10);
        }
        if (pageMatchA) return -1;
        if (pageMatchB) return 1;
        return a.localeCompare(b);
    });

if (htmlFiles.length === 0) {
    console.error('❌ slides/에 HTML 파일이 없습니다.');
    process.exit(1);
}

const slides = htmlFiles.map((htmlFile) => {
    const htmlPath = path.join(slidesDir, htmlFile);
    const title = extractTitleFromHTML(htmlPath);
    console.log(`✅ ${htmlFile} — "${title}"`);
    return { file: htmlFile, title };
});

const slidesArray = slides
    .map((slide) => {
        const escapedTitle = slide.title.replace(/'/g, "\\'");
        return `    { file: '${slide.file}', title: '${escapedTitle}' }`;
    })
    .join(',\n');

const configContent = `// 슬라이드 목록 — npm run build -- <덱_경로> 로 자동 생성
// docs/ 는 메모·프롬프트용 (빌드에 미사용)

const SLIDES = [
${slidesArray}
];
`;

const configPath = path.join(projectDir, 'slides-config.js');
fs.writeFileSync(configPath, configContent, 'utf-8');

console.log('');
console.log(`🎉 완료: ${slides.length}장 → ${configPath}`);
console.log(`📖 open ${path.join(projectDir, 'index.html')}`);
