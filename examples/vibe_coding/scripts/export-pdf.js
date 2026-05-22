#!/usr/bin/env node
/**
 * 모든 HTML 슬라이드를 하나의 PDF로 변환합니다.
 * 덱 폴더에서 실행: node scripts/export-pdf.js
 * 또는: npm run export-pdf
 */

const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');
const projectName = path.basename(projectRoot);
const slidesDir = path.join(projectRoot, 'slides');
const outputDir = path.join(projectRoot, 'output');
const outputFile = path.join(outputDir, `${projectName}_slides.pdf`);

async function getSlideOrder() {
    return fs
        .readdirSync(slidesDir)
        .filter((file) => /^page_\d+\.html$/.test(file))
        .sort((a, b) => {
            const pageA = parseInt(a.match(/\d+/)[0], 10);
            const pageB = parseInt(b.match(/\d+/)[0], 10);
            return pageA - pageB;
        });
}

async function main() {
    const slideFiles = await getSlideOrder();
    if (slideFiles.length === 0) {
        console.error('slides/에서 page_NN.html 슬라이드를 찾지 못했습니다.');
        process.exit(1);
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`총 ${slideFiles.length}개 슬라이드를 PDF로 변환합니다...`);

    const puppeteer = require('puppeteer');
    const { PDFDocument } = require('pdf-lib');

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process',
        ],
        userDataDir: path.join(projectRoot, '.puppeteer-tmp'),
    });

    const pdfBuffers = [];

    try {
        for (let i = 0; i < slideFiles.length; i++) {
            const file = slideFiles[i];
            const filePath = path.join(slidesDir, file);
            if (!fs.existsSync(filePath)) {
                console.warn(`파일 없음, 건너뜀: ${file}`);
                continue;
            }

            const fileUrl = `file://${filePath}`;
            const page = await browser.newPage();

            await page.setViewport({
                width: 1280,
                height: 720,
                deviceScaleFactor: 2,
            });

            await page.goto(fileUrl, {
                waitUntil: 'networkidle0',
                timeout: 15000,
            });

            await page.evaluateHandle('document.fonts.ready');

            const pdfBytes = await page.pdf({
                width: '1280px',
                height: '720px',
                printBackground: true,
                margin: { top: 0, right: 0, bottom: 0, left: 0 },
            });

            pdfBuffers.push(pdfBytes);
            await page.close();

            console.log(`  [${i + 1}/${slideFiles.length}] ${file}`);
        }

        console.log('PDF 병합 중...');

        const mergedPdf = await PDFDocument.create();

        for (const buffer of pdfBuffers) {
            const src = await PDFDocument.load(buffer);
            const pages = await mergedPdf.copyPages(src, src.getPageIndices());
            pages.forEach((p) => mergedPdf.addPage(p));
        }

        const mergedBytes = await mergedPdf.save();
        fs.writeFileSync(outputFile, mergedBytes);

        console.log(`\n완료: ${outputFile}`);
    } finally {
        await browser.close();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
