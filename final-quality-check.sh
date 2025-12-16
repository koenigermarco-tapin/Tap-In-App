#!/bin/bash
# Task 10: Final Quality Check

echo "=== FINAL QUALITY REPORT ==="
echo ""

echo "1. Broken buttons: $(grep -rn 'type="button"' --include="*.html" | grep -v '<button' | wc -l | tr -d ' ')"
echo "   Target: 0"
echo ""

echo "2. Raw innerHTML: $(grep -roh '\.innerHTML\s*=' --include="*.html" | grep -v safeSetInnerHTML | wc -l | tr -d ' ')"
echo "   Target: 0"
echo ""

echo "3. Buttons without aria-label: $(grep -r '<button' --include="*.html" | grep -v 'aria-label' | wc -l | tr -d ' ')"
echo "   Target: 0"
echo ""

echo "4. console.log: $(grep -r 'console\.log' --include="*.html" --include="*.js" | wc -l | tr -d ' ')"
echo "   Target: 0"
echo ""

echo "5. Pages without viewport: $(find . -name "*.html" ! -path "*/archive/*" ! -path "*/.git/*" -exec grep -L 'viewport' {} \; | wc -l | tr -d ' ')"
echo "   Target: 0"
echo ""

echo "6. Hardcoded colors: $(grep -roh '#[0-9a-fA-F]\{6\}' --include="*.html" --include="*.css" | wc -l | tr -d ' ')"
echo "   Target: <100"
echo ""

echo "7. Files at root: $(find . -maxdepth 1 -name "*.html" | wc -l | tr -d ' ')"
echo "   Target: <15"
echo ""

echo "8. README exists: $(test -f README.md && echo 'YES' || echo 'NO')"
echo "   Target: YES"
echo ""

echo "=== QUALITY CHECK COMPLETE ==="

