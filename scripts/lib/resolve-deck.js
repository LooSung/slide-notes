const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '../..');

/**
 * 덱 이름 또는 경로 → 절대 경로
 * - kia_pt → decks/kia_pt (없으면 examples/kia_pt)
 * - decks/kia_pt, examples/vibe_coding 그대로 지원
 */
function resolveDeck(input) {
    if (!input || typeof input !== 'string') {
        return null;
    }

    const trimmed = input.trim();

    if (
        trimmed.includes('/') ||
        trimmed.startsWith('decks') ||
        trimmed.startsWith('examples')
    ) {
        return path.resolve(REPO_ROOT, trimmed);
    }

    const inDecks = path.join(REPO_ROOT, 'decks', trimmed);
    if (fs.existsSync(inDecks)) {
        return inDecks;
    }

    const inExamples = path.join(REPO_ROOT, 'examples', trimmed);
    if (fs.existsSync(inExamples)) {
        return inExamples;
    }

    // 새 덱: 기본은 decks/
    return inDecks;
}

/** npm/로그용 상대 경로 (decks/foo) */
function deckLabel(absPath) {
    return path.relative(REPO_ROOT, absPath);
}

module.exports = { REPO_ROOT, resolveDeck, deckLabel };
