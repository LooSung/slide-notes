#!/bin/bash
# 레거시 진입점. npm run create는 OS 공통 Node 스크립트를 사용한다.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

exec node scripts/create-deck.js "$@"
