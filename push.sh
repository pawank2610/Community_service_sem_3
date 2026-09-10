#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "=========================================="
echo "🚀 Prime Learning - Git Push Script"
echo "=========================================="

# 1. Show current git status
echo ""
echo "📦 Current status:"
git status --short

# 2. Stage new features and modifications
echo ""
echo "➕ Staging files..."
git add app/ components/ lib/ package.json push.sh

# 3. Check if there are changes to commit
if git diff --cached --quiet; then
  echo "⚠️ No changes staged to commit."
  exit 0
fi

# 4. Commit with custom message or default
COMMIT_MSG="${1:-feat: add community impact showcase, marketing toolkit studio, and parent portal}"
echo ""
echo "💬 Committing with message: \"$COMMIT_MSG\""
git commit -m "$COMMIT_MSG"

# 5. Push to GitHub
echo ""
echo "📤 Pushing to origin main..."
git push origin main

echo ""
echo "=========================================="
echo "✅ Push completed successfully!"
echo "=========================================="
