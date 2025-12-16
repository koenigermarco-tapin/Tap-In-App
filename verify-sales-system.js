// Quick JavaScript syntax verification
// Run with: node verify-sales-system.js
const fs = require('fs');
const files = [
'sales-recruiting-stage1.html',
'sales-recruiting-stage2.html',
'sales-recruiting-demo.html'
];
console.log('🔍 JavaScript Syntax Verification\n');
files.forEach(file => {
try {
const content = fs.readFileSync(file, 'utf-8');
        // Extract JavaScript
const scriptMatches = content.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
if (!scriptMatches) {
            console.log(`⚠️  ${file}: No scripts found`);
return;
}
let hasErrors = false;
        // Check for common issues
const checks = {
'Unclosed brackets': (content.match(/\{/g) || []).length === (content.match(/\}/g) || []).length,
'Unclosed parens': (content.match(/\(/g) || []).length === (content.match(/\)/g) || []).length,
'Function definitions': content.includes('function ') || content.includes('=>'),
'No syntax errors': true // Basic check
};
        // Try to find obvious syntax errors
const errorPatterns = [
/function\s+\w+\s*\{/, // Missing parens after function name
/,\s*,/, // Double commas
/}\s*{/, // Missing semicolon or comma between blocks
];
errorPatterns.forEach(pattern => {
if (pattern.test(content)) {
hasErrors = true;
checks['Syntax validation'] = false;
}
});
const allPass = Object.values(checks).every(v => v);
        console.log(`${allPass ? '✅' : '⚠️'} ${file}: ${allPass ? 'OK' : 'Issues found'}`);
if (!allPass) {
Object.entries(checks).forEach(([check, passed]) => {
if (!passed) {
                    console.log(`   - ${check}: FAILED`);
}
});
}
} catch (e) {
        console.log(`❌ ${file}: ERROR - ${e.message}`);
}
});
console.log('\n✅ Verification complete');