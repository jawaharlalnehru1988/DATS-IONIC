#!/bin/bash
# This script is used to deploy to Vercel

# Build the application
npm run build

# Check if the www directory exists and has index.html
if [ -d "www" ] && [ -f "www/index.html" ]; then
  echo "Build successful, www directory and index.html found"
  ls -la www/
  echo "Deploying to Vercel..."
else
  echo "Build failed or www directory not found"
  exit 1
fi
