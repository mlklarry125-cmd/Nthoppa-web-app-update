#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Block .env files from being committed
if git diff --cached --name-only | grep -qE '\.env$|\.env\.local$|\.env\.production$'; then
  echo ""
  echo "❌ ERROR: .env files cannot be committed to version control!"
  echo "   Please run: git reset HEAD .env"
  echo "   If you need to share environment variables, use .env.example instead."
  echo ""
  exit 1
fi

# Block database files from being committed
if git diff --cached --name-only | grep -qE '\.db$|\.db-journal$|prisma/.*\.db$'; then
  echo ""
  echo "❌ ERROR: Database files cannot be committed to version control!"
  echo "   Please run: git reset HEAD prisma/*.db"
  echo "   Database backups should be handled separately."
  echo ""
  exit 1
fi

# Run lint-staged
npx lint-staged

echo ""
echo "✅ Pre-commit checks passed!"