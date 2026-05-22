#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { REPO_ROOT, deckLabel } = require('./lib/resolve-deck');

const deckName = process.argv[2]?.trim();
const templateDir = path.join(REPO_ROOT, 'template');
const deckDir = path.join(REPO_ROOT, 'decks', deckName || '');

function fail(message) {
    console.error(`❌ ${message}`);
    process.exit(1);
}

if (!deckName) {
    console.error('❌ 사용법: npm run create -- <발표자료_이름>');
    console.error('예시: npm run create -- my_presentation');
    process.exit(1);
}

if (
    deckName === '.' ||
    deckName === '..' ||
    deckName.includes('/') ||
    deckName.includes('\\')
) {
    fail('발표자료 이름에는 경로 구분자를 넣을 수 없습니다.');
}

if (fs.existsSync(deckDir)) {
    fail(`이미 존재: ${deckLabel(deckDir)}`);
}

if (!fs.existsSync(templateDir)) {
    fail('템플릿 없음: template');
}

fs.mkdirSync(path.join(deckDir, 'docs', 'content'), { recursive: true });
fs.mkdirSync(path.join(deckDir, 'slides'), { recursive: true });
fs.mkdirSync(path.join(deckDir, 'scripts'), { recursive: true });

fs.copyFileSync(path.join(templateDir, 'index.html'), path.join(deckDir, 'index.html'));
fs.cpSync(path.join(templateDir, 'css'), path.join(deckDir, 'css'), {
    recursive: true,
});
fs.cpSync(path.join(templateDir, 'templates'), path.join(deckDir, 'templates'), {
    recursive: true,
});
fs.copyFileSync(
    path.join(templateDir, 'package.json'),
    path.join(deckDir, 'package.json'),
);
fs.cpSync(path.join(templateDir, 'scripts'), path.join(deckDir, 'scripts'), {
    recursive: true,
});
fs.copyFileSync(
    path.join(templateDir, 'slides', 'page_01.html'),
    path.join(deckDir, 'slides', 'page_01.html'),
);

for (const file of fs.readdirSync(path.join(templateDir, 'docs'))) {
    if (file.endsWith('.md')) {
        fs.copyFileSync(
            path.join(templateDir, 'docs', file),
            path.join(deckDir, 'docs', file),
        );
    }
}

for (const file of fs.readdirSync(path.join(templateDir, 'docs', 'content'))) {
    if (file.endsWith('.md')) {
        fs.copyFileSync(
            path.join(templateDir, 'docs', 'content', file),
            path.join(deckDir, 'docs', 'content', file),
        );
    }
}

const packagePath = path.join(deckDir, 'package.json');
const deckPackage = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const packageSuffix =
    deckName
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'deck';
deckPackage.name = `slide-notes-${packageSuffix}`;
fs.writeFileSync(packagePath, `${JSON.stringify(deckPackage, null, 4)}\n`, 'utf8');

console.log(`🚀 발표자료 생성: ${deckLabel(deckDir)}`);
require('./build-config');
console.log('');
console.log('다음:');
console.log(`  원고       → decks/${deckName}/docs/`);
console.log('  가이드     → guide/START_HERE.md');
console.log('  1. AI와 발표 원고 만들기');
console.log('  2. 원고를 슬라이드 화면으로 옮기기');
console.log(`  3. npm run open -- ${deckName}`);
