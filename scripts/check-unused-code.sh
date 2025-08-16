#!/bin/bash

echo "🔍 Checking for unused code..."

echo "1️⃣ Running ESLint to detect unused imports and variables..."
npx eslint src --ext .ts,.js --max-warnings=0 --quiet

if [ $? -ne 0 ]; then
    echo "❌ ESLint found unused code issues!"
    echo "💡 Run 'npm run lint:fix' to automatically fix some issues"
    exit 1
fi

echo "2️⃣ Checking for unused exports..."
npx ts-unused-exports tsconfig.json

if [ $? -ne 0 ]; then
    echo "❌ Found unused exports!"
    exit 1
fi

echo "✅ No unused code detected! You're good to commit."
