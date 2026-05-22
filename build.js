#!/usr/bin/env node

/**
 * 슬라이드 설정 파일 생성 스크립트
 *
 * 사용법:
 *   node build.js <프로젝트명>
 *
 * 예시:
 *   node build.js vibe_coding
 *
 * slides 폴더의 HTML 파일들을 읽어서 slides-config.js를 자동 생성합니다.
 * - page_1.html, page_2.html 형식의 파일은 숫자 순서대로 자동 정렬됩니다
 * - docs 폴더는 프롬프트/정의서용이며, 빌드 과정에서는 사용하지 않습니다
 */

const fs = require('fs');
const path = require('path');

// 명령줄 인자 확인
const projectName = process.argv[2];

if (!projectName) {
    console.error('❌ 사용법: node build.js <덱_경로>');
    console.error('예시: node build.js decks/my_topic');
    console.error('예시: node build.js examples/vibe_coding');
    process.exit(1);
}

const projectDir = path.join(__dirname, projectName);
const slidesDir = path.join(projectDir, 'slides');

// 디렉토리 확인
if (!fs.existsSync(projectDir)) {
    console.error(`❌ 프로젝트 폴더를 찾을 수 없습니다: ${projectDir}`);
    process.exit(1);
}

if (!fs.existsSync(slidesDir)) {
    console.error(`❌ slides 폴더를 찾을 수 없습니다: ${slidesDir}`);
    console.error(`💡 먼저 슬라이드 HTML 파일들을 slides 폴더에 생성해주세요.`);
    process.exit(1);
}

// HTML 파일에서 제목 추출
function extractTitleFromHTML(htmlPath) {
    try {
        const html = fs.readFileSync(htmlPath, 'utf-8');
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        if (titleMatch) {
            return titleMatch[1].trim();
        }
        // title이 없으면 파일명 사용
        const filename = path.basename(htmlPath, '.html');
        return filename.replace(/-/g, ' ').replace(/_/g, ' ');
    } catch (error) {
        console.warn(`⚠️  파일 읽기 실패: ${htmlPath}`);
        return path.basename(htmlPath, '.html');
    }
}

// 빌드 실행
console.log(`🚀 빌드 시작: ${projectName}`);
console.log(`📁 프로젝트 디렉토리: ${projectDir}`);
console.log(`📄 슬라이드 디렉토리: ${slidesDir}`);
console.log('');

// slides 폴더의 HTML 파일 읽기
const htmlFiles = fs
    .readdirSync(slidesDir)
    .filter((file) => file.endsWith('.html'))
    // docs에서 생성된 파일 제외 (methodology 관련 파일들)
    .filter(
        (file) =>
            !file.includes('methodology') && !file.includes('vibe-coding'),
    )
    // page_1.html, page_2.html 형식의 파일을 숫자 순서대로 정렬
    .sort((a, b) => {
        // page_N 형식 파일 추출
        const pageMatchA = a.match(/page_(\d+)\.html/);
        const pageMatchB = b.match(/page_(\d+)\.html/);

        // 둘 다 page_N 형식이면 숫자 순서대로
        if (pageMatchA && pageMatchB) {
            return parseInt(pageMatchA[1], 10) - parseInt(pageMatchB[1], 10);
        }

        // page_N 형식 파일을 먼저
        if (pageMatchA) return -1;
        if (pageMatchB) return 1;

        // 둘 다 아니면 알파벳 순서
        return a.localeCompare(b);
    });

if (htmlFiles.length === 0) {
    console.error(`❌ slides 폴더에 HTML 파일이 없습니다.`);
    console.error(`💡 먼저 슬라이드 HTML 파일들을 생성해주세요.`);
    process.exit(1);
}

console.log(`📝 발견된 슬라이드 파일: ${htmlFiles.length}개`);
console.log('');

const slides = [];

// 각 HTML 파일 처리
htmlFiles.forEach((htmlFile, index) => {
    const htmlPath = path.join(slidesDir, htmlFile);
    const title = extractTitleFromHTML(htmlPath);

    slides.push({
        file: htmlFile,
        title: title,
    });

    console.log(
        `✅ [${index + 1}/${htmlFiles.length}] ${htmlFile} - "${title}"`,
    );
});

// slides-config.js 생성
const slidesArray = slides
    .map((slide) => {
        // 제목의 작은따옴표를 이스케이프 처리
        const escapedTitle = slide.title.replace(/'/g, "\\'");
        return `    { file: '${slide.file}', title: '${escapedTitle}' }`;
    })
    .join(',\n');

const configContent = `// 슬라이드 목록 설정
// 자동 생성됨 - build.js 실행 시 slides 폴더의 HTML 파일을 기반으로 생성됩니다.
// docs 폴더는 프롬프트/정의서용이며, 빌드 과정에서는 사용하지 않습니다.

const SLIDES = [
${slidesArray}
];
`;

const configPath = path.join(projectDir, 'slides-config.js');
fs.writeFileSync(configPath, configContent, 'utf-8');

console.log('');
console.log(`✅ slides-config.js 생성됨: ${configPath}`);
console.log('');
console.log(`🎉 빌드 완료! 총 ${slides.length}개의 슬라이드가 등록되었습니다.`);
console.log('');
console.log(
    `📖 실행 방법: ${path.join(projectDir, 'index.html')} 파일을 브라우저로 열어주세요.`,
);
console.log('');
console.log(
    `💡 참고: docs 폴더의 마크다운 파일은 프롬프트/정의서로 사용됩니다.`,
);
console.log(`   실제 슬라이드는 slides 폴더의 HTML 파일들을 사용합니다.`);
