#!/bin/bash
# Create a zip file of the repository excluding git, node_modules, etc.

cd /Users/marcok./tap-in-netlify-deploy

# Get current date for filename
DATE=$(date +"%Y-%m-%d-%H%M%S")
ZIP_NAME="tap-in-repo-${DATE}.zip"
OUTPUT_PATH="/Users/marcok./Downloads/${ZIP_NAME}"

echo "📦 Creating repository zip..."
echo "Output: ${OUTPUT_PATH}"

# Create zip excluding common directories and files
zip -r "${OUTPUT_PATH}" . \
  -x "*.git/*" \
  -x "*node_modules/*" \
  -x "*.DS_Store" \
  -x "*.env" \
  -x "*.log" \
  -x "*archive/old-versions/*" \
  -x "*archive/backups/*" \
  -x "*.zip" \
  -x "*react-app/*" \
  -x "*.pyc" \
  -x "__pycache__/*" \
  -x "*.swp" \
  -x "*.swo" \
  -x "*~" \
  2>&1 | grep -v "zip warning" | tail -20

if [ $? -eq 0 ]; then
    SIZE=$(du -h "${OUTPUT_PATH}" | cut -f1)
    echo ""
    echo "✅ Zip created successfully!"
    echo "📦 File: ${OUTPUT_PATH}"
    echo "📊 Size: ${SIZE}"
else
    echo "❌ Error creating zip file"
    exit 1
fi
