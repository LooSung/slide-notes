#!/usr/bin/env node

/**
 * slides/*.html → slides-config.js 생성
 *
 * 사용법: node scripts/build-config.js <발표자료_경로>
 * 예시: node scripts/build-config.js decks/my_topic
 */

const fs = require('fs');
const path = require('path');
const { resolveDeck, deckLabel } = require('./lib/resolve-deck');

const deckInput = process.argv[2];
const quiet = process.env.SLIDE_NOTES_QUIET === '1';

if (!deckInput) {
    console.error('❌ 사용법: npm run build -- <발표자료_이름>');
    console.error('예시: npm run build -- my_presentation');
    process.exit(1);
}

const projectDir = resolveDeck(deckInput);
const slidesDir = path.join(projectDir, 'slides');

if (!fs.existsSync(projectDir)) {
    console.error(`❌ 발표자료 폴더를 찾을 수 없습니다: ${projectDir}`);
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

if (!quiet) {
    console.log(`🚀 슬라이드 준비: ${deckLabel(projectDir)}`);
    console.log(`📁 ${projectDir}`);
    console.log('');
}

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
    console.error('❌ slides/에 슬라이드 파일이 없습니다.');
    process.exit(1);
}

const pageNumbers = new Map();
for (const htmlFile of htmlFiles) {
    const pageMatch = htmlFile.match(/^page_(\d+)\.html$/);
    if (!pageMatch) {
        continue;
    }

    if (pageMatch[1].length < 2) {
        console.error(`❌ 페이지 파일명은 두 자리 번호를 씁니다: ${htmlFile}`);
        console.error('💡 page_01.html, page_02.html 형식으로 바꾸세요.');
        process.exit(1);
    }

    const pageNumber = parseInt(pageMatch[1], 10);
    const duplicate = pageNumbers.get(pageNumber);
    if (duplicate) {
        console.error(`❌ 같은 페이지 번호가 겹칩니다: ${duplicate}, ${htmlFile}`);
        console.error('💡 새 발표자료는 page_01.html, page_02.html 형식을 씁니다.');
        process.exit(1);
    }
    pageNumbers.set(pageNumber, htmlFile);
}

const slides = htmlFiles.map((htmlFile) => {
    const htmlPath = path.join(slidesDir, htmlFile);
    const title = extractTitleFromHTML(htmlPath);
    if (!quiet) {
        console.log(`✅ ${htmlFile} — "${title}"`);
    }
    return { file: htmlFile, title };
});

const slidesArray = slides
    .map((slide) => {
        const escapedTitle = slide.title.replace(/'/g, "\\'");
        return `    { file: '${slide.file}', title: '${escapedTitle}' }`;
    })
    .join(',\n');

const configContent = `// 슬라이드 목록 — npm run open -- <발표자료_이름> 이 자동 갱신
// docs/ 는 메모·프롬프트용 (미리보기에 미사용)

const SLIDES = [
${slidesArray}
];
`;

const configPath = path.join(projectDir, 'slides-config.js');
fs.writeFileSync(configPath, configContent, 'utf-8');

if (quiet) {
    console.log(`✅ 슬라이드 준비: ${deckLabel(projectDir)} (${slides.length}장)`);
} else {
    console.log('');
    console.log(`🎉 완료: ${slides.length}장 → ${configPath}`);
    console.log(`📖 open ${path.join(projectDir, 'index.html')}`);
}
