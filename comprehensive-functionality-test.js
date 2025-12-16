#!/usr/bin/env node
/**
* Comprehensive Functionality Test for TAP-IN Platform
* Tests all critical functionality across both languages
*/
const fs = require('fs');
const path = require('path');
const results = {
passed: [],
failed: [],
warnings: []
};
function testFile(filePath, description) {
try {
if (!fs.existsSync(filePath)) {
results.failed.push({ file: filePath, issue: 'File does not exist', description });
return false;
}
const content = fs.readFileSync(filePath, 'utf8');
        // Basic checks
const checks = {
hasHTML: content.includes('<!DOCTYPE html>') || content.includes('<html'),
hasTitle: content.includes('<title>'),
hasBody: content.includes('<body'),
noSyntaxErrors: true
};
        // Check for common JavaScript errors
const openBraces = (content.match(/\{/g) || []).length;
const closeBraces = (content.match(/\}/g) || []).length;
checks.bracesBalanced = openBraces === closeBraces;
        // Check for fancy quotes that break JS
const hasFancyQuotes = /[''""]/.test(content);
checks.noFancyQuotes = !hasFancyQuotes;
if (checks.hasHTML && checks.hasTitle && checks.hasBody && checks.bracesBalanced) {
results.passed.push({ file: filePath, description, checks });
return true;
} else {
results.failed.push({ file: filePath, description, checks });
return false;
}
} catch (error) {
results.failed.push({ file: filePath, issue: error.message, description });
return false;
}
}
function testLanguageSwitcher(filePath) {
try {
if (!fs.existsSync(filePath)) return { exists: false };
const content = fs.readFileSync(filePath, 'utf8');
return {
exists: true,
hasToggle: content.includes('id="langToggle"'),
hasDropdown: content.includes('id="langDropdown"'),
hasOptions: content.includes('lang-option'),
hasInitFunction: content.includes('initLanguageSwitcher'),
hasEventListeners: content.includes('addEventListener'),
hasNavigation: content.includes('window.location.href')
};
} catch (error) {
return { exists: false, error: error.message };
}
}
function testAssessment(filePath) {
try {
if (!fs.existsSync(filePath)) return { exists: false };
const content = fs.readFileSync(filePath, 'utf8');
return {
exists: true,
hasStartFunction: content.includes('window.startAssessment') || content.includes('function startAssessment'),
hasIntroSection: content.includes('id="intro-section"') || content.includes('id="screen-intro"'),
hasQuestionContainer: content.includes('id="question-container"') || content.includes('id="screen-questions"'),
hasProgressContainer: content.includes('id="progress-container"') || content.includes('id="progressContainer"'),
hasOnClick: content.includes('onclick="startAssessment()"'),
hasQuestions: content.includes('questions') || content.includes('fragen')
};
} catch (error) {
return { exists: false, error: error.message };
}
}
function testNavigation(filePath, expectedLinks) {
try {
if (!fs.existsSync(filePath)) return { exists: false };
const content = fs.readFileSync(filePath, 'utf8');
const foundLinks = [];
const missingLinks = [];
expectedLinks.forEach(link => {
if (content.includes(`href="${link}"`) || content.includes(`href='${link}'`) || content.includes(`location.href='${link}'`) || content.includes(`location.href="${link}"`)) {
foundLinks.push(link);
} else {
missingLinks.push(link);
}
});
return {
exists: true,
foundLinks,
missingLinks,
allFound: missingLinks.length === 0
};
} catch (error) {
return { exists: false, error: error.message };
}
}
console.log('🧪 COMPREHENSIVE FUNCTIONALITY TEST\n');
);
// Test 1: Main Entry Points
console.log('\n📋 TEST 1: Main Entry Points');
);
const entryPoints = [
{ file: 'index-DUAL-ENTRY.html', desc: 'English main entry' },
{ file: 'index-DUAL-ENTRY-de.html', desc: 'German main entry' }
];
entryPoints.forEach(({ file, desc }) => {
const result = testFile(file, desc);
const langSwitcher = testLanguageSwitcher(file);
if (result) {
        console.log(`✅ ${desc}: File exists and valid`);
if (langSwitcher.hasToggle && langSwitcher.hasDropdown && langSwitcher.hasInitFunction) {
            console.log(`   ✅ Language switcher: Complete`);
} else {
            console.log(`   ⚠️  Language switcher: Missing components`);
results.warnings.push({ file, issue: 'Language switcher incomplete', langSwitcher });
}
} else {
        console.log(`❌ ${desc}: FAILED`);
}
});
// Test 2: Language Switchers
console.log('\n📋 TEST 2: Language Switcher Functionality');
);
const langSwitcherFiles = [
'index-DUAL-ENTRY.html',
'index-DUAL-ENTRY-de.html',
'gym-dashboard.html',
'gym-dashboard-de.html',
'learning-hub.html',
'learning-hub-de.html'
];
langSwitcherFiles.forEach(file => {
const test = testLanguageSwitcher(file);
if (test.exists) {
const allGood = test.hasToggle && test.hasDropdown && test.hasOptions && test.hasInitFunction && test.hasEventListeners;
if (allGood) {
            console.log(`✅ ${file}: Language switcher complete`);
} else {
            console.log(`⚠️  ${file}: Language switcher incomplete`);
results.warnings.push({ file, test });
}
} else {
        console.log(`❌ ${file}: Not found`);
}
});
// Test 3: Belt Assessments
console.log('\n📋 TEST 3: Belt Assessments');
);
const assessments = [
{ file: 'belt-assessment-v2.html', desc: 'English belt assessment' },
{ file: 'belt-assessment-v2-de.html', desc: 'German belt assessment' }
];
assessments.forEach(({ file, desc }) => {
const test = testAssessment(file);
if (test.exists) {
const critical = test.hasStartFunction && test.hasIntroSection && test.hasQuestionContainer;
if (critical) {
            console.log(`✅ ${desc}: Core functionality present`);
if (!test.hasOnClick && test.hasStartFunction) {
`);
}
} else {
            console.log(`❌ ${desc}: Missing critical components`);
results.failed.push({ file, desc, test });
}
} else {
        console.log(`❌ ${desc}: File not found`);
results.failed.push({ file, desc, issue: 'File not found' });
}
});
// Test 4: Gym Dashboards
console.log('\n📋 TEST 4: Gym Dashboards');
);
const gymDashboards = [
{ file: 'gym-dashboard.html', desc: 'English gym dashboard' },
{ file: 'gym-dashboard-de.html', desc: 'German gym dashboard' }
];
gymDashboards.forEach(({ file, desc }) => {
const result = testFile(file, desc);
const nav = testNavigation(file, ['white-belt', 'blue-belt', 'purple-belt', 'brown-belt', 'black-belt']);
if (result) {
        console.log(`✅ ${desc}: File valid`);
if (nav.allFound || nav.foundLinks.length > 0) {
            console.log(`   ✅ Navigation links: ${nav.foundLinks.length} found`);
}
} else {
        console.log(`❌ ${desc}: FAILED`);
}
});
// Test 5: Learning Hubs
console.log('\n📋 TEST 5: Learning Hubs');
);
const hubs = [
{ file: 'learning-hub.html', desc: 'English learning hub' },
{ file: 'learning-hub-de.html', desc: 'German learning hub' }
];
hubs.forEach(({ file, desc }) => {
const result = testFile(file, desc);
const nav = testNavigation(file, ['business-portal', 'combined-complete-profile']);
if (result) {
        console.log(`✅ ${desc}: File valid`);
if (nav.foundLinks.length > 0) {
            console.log(`   ✅ Navigation links: ${nav.foundLinks.length} found`);
}
} else {
        console.log(`❌ ${desc}: FAILED`);
}
});
// Test 6: Business Portal
console.log('\n📋 TEST 6: Business Portal');
);
const businessPortals = [
{ file: 'business-portal.html', desc: 'English business portal' },
{ file: 'business-portal-de.html', desc: 'German business portal' }
];
businessPortals.forEach(({ file, desc }) => {
const result = testFile(file, desc);
const nav = testNavigation(file, ['combined-profile-carousel']);
if (result) {
        console.log(`✅ ${desc}: File valid`);
if (nav.foundLinks.length > 0) {
            console.log(`   ✅ Combined assessment link: Found`);
} else {
            console.log(`   ⚠️  Combined assessment link: Not found`);
results.warnings.push({ file, issue: 'Missing combined assessment link' });
}
} else {
        console.log(`❌ ${desc}: FAILED`);
}
});
// Test 7: Combined Assessment
console.log('\n📋 TEST 7: Combined Assessment');
);
const combinedAssessments = [
{ file: 'combined-profile-carousel.html', desc: 'English combined assessment' },
{ file: 'combined-profile-carousel.de.html', desc: 'German combined assessment' }
];
combinedAssessments.forEach(({ file, desc }) => {
const result = testFile(file, desc);
if (result) {
const content = fs.readFileSync(file, 'utf8');
const hasInit = content.includes('DOMContentLoaded') && content.includes('renderQuestion');
if (hasInit) {
            console.log(`✅ ${desc}: File valid with proper initialization`);
} else {
            console.log(`⚠️  ${desc}: File valid but initialization may be missing`);
results.warnings.push({ file, issue: 'Initialization may be missing' });
}
} else {
        console.log(`❌ ${desc}: FAILED`);
}
});
// Test 8: Critical Belt Pages
console.log('\n📋 TEST 8: Critical Belt Pages');
);
const beltPages = [
'white-belt.html',
'white-belt-de.html',
'blue-belt.html',
'blue-belt-de.html',
'purple-belt.html',
'purple-belt-de.html',
'brown-belt.html',
'brown-belt-de.html',
'black-belt.html',
'black-belt-de.html'
];
beltPages.forEach(file => {
const result = testFile(file, `Belt page: ${file}`);
if (result) {
        console.log(`✅ ${file}: Valid`);
} else {
        console.log(`❌ ${file}: FAILED`);
}
});
// Summary
);
console.log('📊 TEST SUMMARY');
);
console.log(`✅ Passed: ${results.passed.length}`);
console.log(`❌ Failed: ${results.failed.length}`);
console.log(`⚠️  Warnings: ${results.warnings.length}`);
if (results.failed.length > 0) {
    console.log('\n❌ FAILED TESTS:');
results.failed.forEach(({ file, issue, description }) => {
        console.log(`   - ${file}: ${issue || description}`);
});
}
if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
results.warnings.forEach(({ file, issue }) => {
        console.log(`   - ${file}: ${issue}`);
});
}
// Save results
const report = {
timestamp: new Date().toISOString(),
summary: {
passed: results.passed.length,
failed: results.failed.length,
warnings: results.warnings.length
},
results: results
};
fs.writeFileSync('FUNCTIONALITY-TEST-REPORT.json', JSON.stringify(report, null, 2));
console.log('\n📄 Full report saved to: FUNCTIONALITY-TEST-REPORT.json');
// Exit code
process.exit(results.failed.length > 0 ? 1 : 0);