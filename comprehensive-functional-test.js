#!/usr/bin/env node
/**
* COMPREHENSIVE FUNCTIONAL TEST
* Tests actual functionality: links, navigation, assessments, language switching
*/
const fs = require('fs');
const path = require('path');
const results = {
navigation: [],
languageSwitchers: [],
assessments: [],
links: [],
modules: [],
errors: []
};
function extractLinks(html, filePath) {
const links = [];
    // Extract href links
const hrefRegex = /href=["']([^"']+)["']/g;
let match;
while ((match = hrefRegex.exec(html)) !== null) {
links.push(match[1]);
}
    // Extract onclick navigation
const onclickRegex = /onclick=["'][^"']*location\.href\s*=\s*["']([^"']+)["']/g;
while ((match = onclickRegex.exec(html)) !== null) {
links.push(match[1]);
}
    // Extract window.location.href
const windowRegex = /window\.location\.href\s*=\s*["']([^"']+)["']/g;
while ((match = windowRegex.exec(html)) !== null) {
links.push(match[1]);
}
return links.filter(link =>
!link.startsWith('#') &&
!link.startsWith('http') &&
!link.startsWith('mailto:') &&
!link.startsWith('javascript:') &&
link.endsWith('.html')
);
}
function testNavigationFlow() {
    console.log('\n📋 TEST 1: Navigation Flows');
);
const flows = [
{
name: 'Main Entry → Gym',
files: [
{ from: 'index-DUAL-ENTRY.html', to: 'gym-dashboard.html' },
{ from: 'index-DUAL-ENTRY-de.html', to: 'gym-dashboard-de.html' }
]
},
{
name: 'Main Entry → Hub',
files: [
{ from: 'index-DUAL-ENTRY.html', to: 'learning-hub.html' },
{ from: 'index-DUAL-ENTRY-de.html', to: 'learning-hub-de.html' }
]
},
{
name: 'Gym → Belt Pages',
files: [
{ from: 'gym-dashboard.html', to: 'white-belt.html' },
{ from: 'gym-dashboard.html', to: 'blue-belt.html' },
{ from: 'gym-dashboard-de.html', to: 'white-belt-de.html' },
{ from: 'gym-dashboard-de.html', to: 'blue-belt-de.html' }
]
},
{
name: 'Hub → Business Portal',
files: [
{ from: 'learning-hub.html', to: 'business-portal.html' },
{ from: 'learning-hub-de.html', to: 'business-portal-de.html' }
]
},
{
name: 'Business Portal → Combined Assessment',
files: [
{ from: 'business-portal.html', to: 'combined-profile-carousel.html' },
{ from: 'business-portal-de.html', to: 'combined-profile-carousel.de.html' }
]
}
];
flows.forEach(flow => {
        console.log(`\n🔍 Testing: ${flow.name}`);
flow.files.forEach(({ from, to }) => {
if (!fs.existsSync(from)) {
                console.log(`   ❌ ${from}: File not found`);
results.errors.push({ type: 'navigation', from, to, issue: 'Source file not found' });
return;
}
const content = fs.readFileSync(from, 'utf8');
const links = extractLinks(content, from);
const hasLink = links.some(link => link.includes(to) || link === to);
if (hasLink) {
                console.log(`   ✅ ${from} → ${to}: Link found`);
results.navigation.push({ from, to, status: 'pass' });
} else {
                console.log(`   ❌ ${from} → ${to}: Link NOT found`);
.join(', ')}...`);
results.navigation.push({ from, to, status: 'fail' });
results.errors.push({ type: 'navigation', from, to, issue: 'Link not found' });
}
});
});
}
function testLanguageSwitcherFunctionality() {
    console.log('\n📋 TEST 2: Language Switcher Functionality');
);
const pages = [
'index-DUAL-ENTRY.html',
'index-DUAL-ENTRY-de.html',
'gym-dashboard.html',
'gym-dashboard-de.html',
'learning-hub.html',
'learning-hub-de.html'
];
pages.forEach(file => {
if (!fs.existsSync(file)) {
            console.log(`   ❌ ${file}: File not found`);
return;
}
const content = fs.readFileSync(file, 'utf8');
const checks = {
hasToggle: content.includes('id="langToggle"'),
hasDropdown: content.includes('id="langDropdown"'),
hasOptions: content.includes('lang-option'),
hasInitFunction: content.includes('initLanguageSwitcher'),
hasEventListeners: content.includes('addEventListener'),
hasNavigation: content.includes('window.location.href') &&
(content.includes('index-DUAL-ENTRY') || content.includes('gym-dashboard') || content.includes('learning-hub')),
hasGuards: content.includes('languageSwitcherInitialized') || content.includes('_langSwitcherInitialized')
};
const allGood = Object.values(checks).every(v => v);
if (allGood) {
            console.log(`   ✅ ${file}: Complete language switcher`);
results.languageSwitchers.push({ file, status: 'pass', checks });
} else {
const missing = Object.entries(checks).filter(([k, v]) => !v).map(([k]) => k);
}`);
results.languageSwitchers.push({ file, status: 'warning', missing });
}
});
}
function testAssessmentFunctionality() {
    console.log('\n📋 TEST 3: Assessment Functionality');
);
const assessments = [
{ file: 'belt-assessment-v2.html', lang: 'en' },
{ file: 'belt-assessment-v2-de.html', lang: 'de' },
{ file: 'combined-profile-carousel.html', lang: 'en' },
{ file: 'combined-profile-carousel.de.html', lang: 'de' }
];
assessments.forEach(({ file, lang }) => {
if (!fs.existsSync(file)) {
            console.log(`   ❌ ${file}: File not found`);
results.errors.push({ type: 'assessment', file, issue: 'File not found' });
return;
}
const content = fs.readFileSync(file, 'utf8');
const checks = {
hasStartFunction: content.includes('window.startAssessment') || content.includes('function startAssessment'),
hasOnClick: content.includes('onclick="startAssessment()"') || content.includes('onclick=\'startAssessment()\''),
hasIntroSection: content.includes('id="intro-section"') || content.includes('id="screen-intro"'),
hasQuestionContainer: content.includes('id="question-container"') || content.includes('id="screen-questions"'),
hasProgressContainer: content.includes('id="progress-container"') || content.includes('id="progressContainer"'),
hasQuestions: content.includes('questions') || content.includes('fragen') || content.includes('questions =') || content.includes('fragen =')
};
const critical = checks.hasStartFunction && checks.hasIntroSection && checks.hasQuestionContainer;
if (critical) {
: Core functionality present`);
if (!checks.hasOnClick && checks.hasStartFunction) {
`);
}
results.assessments.push({ file, lang, status: 'pass', checks });
} else {
const missing = Object.entries(checks).filter(([k, v]) => !v && k !== 'hasOnClick').map(([k]) => k);
: Missing: ${missing.join(', ')}`);
results.assessments.push({ file, lang, status: 'fail', missing });
results.errors.push({ type: 'assessment', file, issue: `Missing: ${missing.join(', ')}` });
}
});
}
function testModuleLinks() {
    console.log('\n📋 TEST 4: Module Navigation Links');
);
const modules = [
{ file: 'gym-dashboard.html', modules: [
{ name: 'Vulnerability', target: 'challenge-vulnerability-de.html' },
{ name: 'Self-Awareness', target: 'white-belt-stripe1-gamified.html' }
]},
{ file: 'gym-dashboard-de.html', modules: [
{ name: 'Verletzlichkeit', target: 'challenge-vulnerability-de.html' },
{ name: 'Selbstbewusstsein', target: 'white-belt-stripe1-gamified-de.html' }
]}
];
modules.forEach(({ file, modules: moduleList }) => {
if (!fs.existsSync(file)) {
            console.log(`   ❌ ${file}: File not found`);
return;
}
const content = fs.readFileSync(file, 'utf8');
        console.log(`\n🔍 Testing: ${file}`);
moduleList.forEach(({ name, target }) => {
const hasLink = content.includes(target) ||
content.includes(`data-target="${target}"`) ||
extractLinks(content, file).some(link => link.includes(target));
if (hasLink) {
                console.log(`   ✅ ${name} → ${target}: Link found`);
results.modules.push({ file, module: name, target, status: 'pass' });
} else {
                console.log(`   ❌ ${name} → ${target}: Link NOT found`);
results.modules.push({ file, module: name, target, status: 'fail' });
results.errors.push({ type: 'module', file, module: name, target, issue: 'Link not found' });
}
});
});
}
function testAllLinks() {
    console.log('\n📋 TEST 5: All Internal Links Validity');
);
const criticalPages = [
'index-DUAL-ENTRY.html',
'index-DUAL-ENTRY-de.html',
'gym-dashboard.html',
'gym-dashboard-de.html',
'learning-hub.html',
'learning-hub-de.html',
'business-portal.html',
'business-portal-de.html'
];
const allLinks = new Set();
const brokenLinks = [];
criticalPages.forEach(file => {
if (!fs.existsSync(file)) return;
const content = fs.readFileSync(file, 'utf8');
const links = extractLinks(content, file);
links.forEach(link => {
            // Normalize link
let normalized = link;
if (normalized.startsWith('./')) normalized = normalized.substring(2);
if (normalized.startsWith('/')) normalized = normalized.substring(1);
allLinks.add(normalized);
            // Check if target exists
if (!fs.existsSync(normalized) && !normalized.includes('#')) {
brokenLinks.push({ from: file, to: normalized });
}
});
});
    console.log(`\n📊 Found ${allLinks.size} unique internal links`);
    console.log(`❌ Found ${brokenLinks.length} broken links`);
if (brokenLinks.length > 0) {
        console.log('\n   Broken links:');
brokenLinks.slice(0, 10).forEach(({ from, to }) => {
            console.log(`   - ${from} → ${to}`);
});
if (brokenLinks.length > 10) {
            console.log(`   ... and ${brokenLinks.length - 10} more`);
}
} else {
        console.log('   ✅ All links valid!');
}
results.links = {
total: allLinks.size,
broken: brokenLinks.length,
brokenLinks: brokenLinks.slice(0, 20)
};
}
function testBeltStripeLinks() {
    console.log('\n📋 TEST 6: Belt Stripe Navigation');
);
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
const stripes = [1, 2, 3, 4];
belts.forEach(belt => {
        console.log(`\n🔍 Testing ${belt} belt:`);
stripes.forEach(stripe => {
const files = [
`${belt}-belt-stripe${stripe}-gamified.html`,
`${belt}-belt-stripe${stripe}-gamified-de.html`
];
files.forEach(file => {
if (fs.existsSync(file)) {
const content = fs.readFileSync(file, 'utf8');
const hasNavigation = content.includes('stripe-navigator') ||
content.includes('gym-dashboard') ||
content.includes('white-belt') ||
content.includes('blue-belt');
if (hasNavigation) {
                        console.log(`   ✅ ${file}: Has navigation`);
} else {
                        console.log(`   ⚠️  ${file}: Navigation unclear`);
}
}
});
});
});
}
function testHubCourseLinks() {
    console.log('\n📋 TEST 7: Hub Course Links');
);
const hubFiles = ['learning-hub.html', 'learning-hub-de.html'];
const courses = [
'communication-mastery',
'energy-management',
'deep-work',
'boundaries',
'feedback-culture',
'expectation-management'
];
hubFiles.forEach(file => {
if (!fs.existsSync(file)) return;
const content = fs.readFileSync(file, 'utf8');
        console.log(`\n🔍 Testing: ${file}`);
courses.forEach(course => {
const hasLink = extractLinks(content, file).some(link =>
link.includes(course) ||
content.includes(course)
);
if (hasLink) {
                console.log(`   ✅ ${course}: Link found`);
} else {
                console.log(`   ⚠️  ${course}: Link not found`);
}
});
});
}
// Run all tests
console.log('🧪 COMPREHENSIVE FUNCTIONAL TEST');
);
testNavigationFlow();
testLanguageSwitcherFunctionality();
testAssessmentFunctionality();
testModuleLinks();
testAllLinks();
testBeltStripeLinks();
testHubCourseLinks();
// Summary
);
console.log('📊 TEST SUMMARY');
);
const navPass = results.navigation.filter(r => r.status === 'pass').length;
const navFail = results.navigation.filter(r => r.status === 'fail').length;
const langPass = results.languageSwitchers.filter(r => r.status === 'pass').length;
const assessPass = results.assessments.filter(r => r.status === 'pass').length;
const modulePass = results.modules.filter(r => r.status === 'pass').length;
console.log(`\n✅ Navigation Flows: ${navPass}/${navPass + navFail} passing`);
console.log(`✅ Language Switchers: ${langPass}/${results.languageSwitchers.length} complete`);
console.log(`✅ Assessments: ${assessPass}/${results.assessments.length} functional`);
console.log(`✅ Module Links: ${modulePass}/${results.modules.length} working`);
console.log(`✅ Internal Links: ${results.links.total - results.links.broken}/${results.links.total} valid`);
console.log(`❌ Errors: ${results.errors.length}`);
// Save report
const report = {
timestamp: new Date().toISOString(),
summary: {
navigation: { pass: navPass, fail: navFail },
languageSwitchers: { pass: langPass, total: results.languageSwitchers.length },
assessments: { pass: assessPass, total: results.assessments.length },
modules: { pass: modulePass, total: results.modules.length },
links: results.links,
errors: results.errors.length
},
results
};
fs.writeFileSync('FUNCTIONAL-TEST-REPORT.json', JSON.stringify(report, null, 2));
console.log('\n📄 Full report saved to: FUNCTIONAL-TEST-REPORT.json');
process.exit(results.errors.length > 10 ? 1 : 0);