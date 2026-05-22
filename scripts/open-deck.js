#!/usr/bin/env node

const { execFileSync, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { resolveDeck, deckLabel } = require('./lib/resolve-deck');

const name = process.argv[2];
const deckDir = resolveDeck(name);

if (!name) {
    console.error('❌ 사용법: npm run open -- <덱_이름>');
    console.error('예시: npm run open -- kia_pt');
    process.exit(1);
}

const indexPath = path.join(deckDir, 'index.html');

if (!fs.existsSync(indexPath)) {
    console.error(`❌ index.html 없음: ${deckLabel(deckDir)}`);
    console.error('💡 npm run create -- <이름> 으로 덱을 먼저 만드세요.');
    process.exit(1);
}

const buildScript = path.join(__dirname, 'build-config.js');

try {
    execFileSync(process.execPath, [buildScript, deckDir], {
        stdio: 'inherit',
        env: { ...process.env, SLIDE_NOTES_QUIET: '1' },
    });
} catch {
    console.error('❌ 슬라이드 목록을 갱신하지 못해 뷰어를 열지 않습니다.');
    process.exit(1);
}

const url = `file://${indexPath}`;
const platform = process.platform;

try {
    if (platform === 'darwin') {
        execSync(`open "${indexPath}"`, { stdio: 'inherit' });
    } else if (platform === 'win32') {
        execSync(`start "" "${indexPath}"`, { stdio: 'inherit', shell: true });
    } else {
        execSync(`xdg-open "${indexPath}"`, { stdio: 'inherit' });
    }
    console.log(`📖 ${deckLabel(deckDir)}/index.html`);
} catch {
    console.log(`브라우저를 직접 여세요:\n${url}`);
}
