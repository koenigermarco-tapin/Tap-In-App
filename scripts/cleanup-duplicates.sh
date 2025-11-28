#!/bin/bash
# Cleanup Duplicate Files Script
# Moves old/backup/temp files to archive folder for safe recovery

echo "🧹 Starting duplicate file cleanup..."
echo ""

# Create archive directory
ARCHIVE_DIR="./archive/old-versions"
mkdir -p "$ARCHIVE_DIR"

echo "📁 Created archive directory: $ARCHIVE_DIR"
echo ""

# Counter
MOVED=0

# Function to move file
move_file() {
    local file="$1"
    if [ -f "$file" ]; then
        echo "  → Moving: $file"
        mv "$file" "$ARCHIVE_DIR/"
        ((MOVED++))
    fi
}

echo "🔍 Finding duplicate files..."
echo ""

# Files to archive (OLD/BACKUP/TEMP/MESSY versions)
echo "📦 Archiving OLD versions:"
move_file "./learning-hub-OLD-MESSY.html"
move_file "./index-OLD-1000LINES.html"
move_file "./gym-dashboard-ORIGINAL-BACKUP.html"
move_file "./gym-dashboard-OPTIMIZED.html"
move_file "./leadership-style-backup.html"
move_file "./leadership-style-assessment-TEMP.html"
move_file "./leadership-style-assessment-NEW.html"
move_file "./mental-health-assessment-old.html"
move_file "./mental-health-assessment-backup.html"
move_file "./mental-health-old-v2.html"
move_file "./mental-health-temp.html"
move_file "./mental-health-carousel-new.html"
move_file "./work-life-balance-assessment.html.backup"
move_file "./learning-hub-PROFESSIONAL.html"
move_file "./combined-profile-carousel.de.html.backup"
move_file "./dashboard.html"
move_file "./demo-dashboard.html"

# Check for any other backup patterns
echo ""
echo "🔍 Checking for other backup patterns..."
find . -maxdepth 1 -name "*-backup*.html" -o -name "*-BACKUP*.html" | while read file; do
    if [ -f "$file" ]; then
        move_file "$file"
    fi
done

echo ""
echo "✅ Cleanup complete!"
echo "   Files moved: $MOVED"
echo "   Archive location: $ARCHIVE_DIR"
echo ""
echo "📝 To restore a file:"
echo "   cp $ARCHIVE_DIR/filename.html ./"
echo ""
echo "🗑️  To permanently delete (after verification):"
echo "   rm -rf $ARCHIVE_DIR"

