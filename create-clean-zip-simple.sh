#!/bin/bash
# Create clean deployment zip - explicit inclusion approach

ZIP_NAME="tap-in-clean-deployment-$(date +%Y%m%d_%H%M%S).zip"
TEMP_DIR=$(mktemp -d)

echo "📦 Creating clean deployment zip..."
echo "📁 Temporary directory: $TEMP_DIR"
echo ""

# Copy only what we need
cd /Users/marcok./tap-in-netlify-deploy

# Copy HTML files (excluding backups)
find . -type f -name "*.html" ! -name "*.backup.*" ! -path "*/archive/*" ! -path "*/backup/*" ! -path "*/react-app/*" ! -path "*/.git/*" -exec cp --parents {} "$TEMP_DIR" \;

# Copy CSS files
find . -type f -name "*.css" ! -path "*/archive/*" ! -path "*/backup/*" ! -path "*/react-app/*" ! -path "*/.git/*" -exec cp --parents {} "$TEMP_DIR" \;

# Copy JS files
find . -type f -name "*.js" ! -name "*.py" ! -path "*/archive/*" ! -path "*/backup/*" ! -path "*/react-app/*" ! -path "*/.git/*" ! -path "*/node_modules/*" -exec cp --parents {} "$TEMP_DIR" \;

# Copy images and assets
find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" -o -name "*.svg" -o -name "*.ico" \) ! -path "*/archive/*" ! -path "*/backup/*" ! -path "*/react-app/*" ! -path "*/.git/*" -exec cp --parents {} "$TEMP_DIR" \;

# Copy essential config files
cp netlify.toml "$TEMP_DIR/" 2>/dev/null
cp _headers "$TEMP_DIR/" 2>/dev/null
cp _redirects "$TEMP_DIR/" 2>/dev/null
cp .gitignore "$TEMP_DIR/" 2>/dev/null
cp sw.js "$TEMP_DIR/" 2>/dev/null

# Copy content JSON files (but not reports)
find . -type f -path "*/content/*.json" -exec cp --parents {} "$TEMP_DIR" \;

# Create zip from temp directory
cd "$TEMP_DIR"
zip -r "$OLDPWD/$ZIP_NAME" . -q

# Cleanup
cd "$OLDPWD"
rm -rf "$TEMP_DIR"

# Get zip size
ZIP_SIZE=$(du -h "$ZIP_NAME" | cut -f1)
FILE_COUNT=$(unzip -l "$ZIP_NAME" | tail -1 | awk '{print $2}')

echo "✅ Zip file created!"
echo "📦 File: $ZIP_NAME"
echo "📊 Size: $ZIP_SIZE"
echo "📄 Files: $FILE_COUNT"
echo ""

