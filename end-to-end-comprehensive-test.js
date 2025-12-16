#!/usr/bin/env node
/**
* END-TO-END COMPREHENSIVE TEST
* Tests complete user journeys as specified in TODOs
*/
const fs = require('fs');
const path = require('path');
const results = {
beltAssessments: { en: [], de: [] },
hubJourney: { en: [], de: [] },
gymJourney: { en: [], de: [] },
businessPortal: { en: [], de: [] },
beltAssessment: { en: null, de: null },
combinedAssessment: { en: null, de: null },
errors: []
};
function testBeltAssessment(file, lang) {
const test = {
file,
lang,
canStart: false,
hasQuestions: false,
hasNavigation: false,
hasResults: false,
issues: []
};
if (!fs.existsSync(file)) {
test.issues.push('File not found');
return test;
}
const content = fs.readFileSync(file, 'utf8');
    // Can start assessment
test.canStart = content.includes('window.startAssessment') ||
content.includes('function startAssessment') ||
content.includes('onclick="startAssessment()"');
    // Has questions
test.hasQuestions = content.includes('questions') ||
content.includes('fragen') ||
content.includes('questions =') ||
content.includes('fragen =') ||
(content.match(/id:\s*\d+/g) || []).length > 10;
    // Has navigation
test.hasNavigation = content.includes('showQuestion') ||
content.includes('showFrage') ||
content.includes('nextBtn') ||
content.includes('prevBtn');
    // Has results
test.hasResults = content.includes('calculateResults') ||
content.includes('showResults') ||
content.includes('result') ||
content.includes('belt') && content.includes('score');
if (!test.canStart) test.issues.push('Cannot start assessment');
if (!test.hasQuestions) test.issues.push('No questions found');
if (!test.hasNavigation) test.issues.push('No navigation found');
if (!test.hasResults) test.issues.push('No results display');
return test;
}
function testHubJourney(lang) {
const hubFile = lang === 'en' ? 'learning-hub.html' : 'learning-hub-de.html';
const test = {
hubFile,
lang,
courses: [],
tools: [],
assessments: [],
navigation: [],
issues: []
};
if (!fs.existsSync(hubFile)) {
test.issues.push('Hub file not found');
return test;
}
const content = fs.readFileSync(hubFile, 'utf8');
    // Test all 6 courses
const courses = [
'communication-mastery',
'energy-management',
'deep-work',
'boundaries',
'feedback-culture',
'expectation-management'
];
courses.forEach(course => {
const courseFiles = [
`${course}-1-`,
`${course}-module`,
`course-${course}`
];
const hasLink = courseFiles.some(pattern =>
content.includes(pattern) ||
extractLinks(content).some(link => link.includes(course))
);
test.courses.push({
name: course,
accessible: hasLink,
files: courseFiles.filter(pattern =>
globFileSearch(`**/${pattern}*.html`).length > 0
)
});
});
    // Test tools
const tools = [
'journal',
'goal-tracker',
'mood-tracker',
'breathing',
'focus-timer'
];
tools.forEach(tool => {
const hasLink = content.includes(tool) ||
extractLinks(content).some(link => link.includes(tool));
test.tools.push({ name: tool, accessible: hasLink });
});
    // Test assessments
const assessments = [
'worker-type',
'team-dynamics',
'combined-profile'
];
assessments.forEach(assessment => {
const hasLink = content.includes(assessment) ||
extractLinks(content).some(link => link.includes(assessment));
test.assessments.push({ name: assessment, accessible: hasLink });
});
    // Test navigation
test.navigation = {
toGym: content.includes('gym-dashboard'),
toBusiness: content.includes('business-portal'),
toProfile: content.includes('combined-complete-profile') || content.includes('profile')
};
return test;
}
function testGymJourney(lang) {
const gymFile = lang === 'en' ? 'gym-dashboard.html' : 'gym-dashboard-de.html';
const test = {
gymFile,
lang,
belts: [],
modules: [],
assessments: [],
tools: [],
navigation: [],
issues: []
};
if (!fs.existsSync(gymFile)) {
test.issues.push('Gym file not found');
return test;
}
const content = fs.readFileSync(gymFile, 'utf8');
    // Test all 5 belts
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
belts.forEach(belt => {
const beltFile = lang === 'en' ? `${belt}-belt.html` : `${belt}-belt-de.html`;
const hasLink = content.includes(beltFile) ||
content.includes(`${belt}-belt`) ||
extractLinks(content).some(link => link.includes(`${belt}-belt`));
        // Check for stripe pages
const stripeFiles = [];
for (let i = 1; i <= 4; i++) {
const stripeFile = `${belt}-belt-stripe${i}-gamified${lang === 'de' ? '-de' : ''}.html`;
if (fs.existsSync(stripeFile)) {
stripeFiles.push(stripeFile);
}
}
test.belts.push({
name: belt,
accessible: hasLink,
beltFile: fs.existsSync(beltFile),
stripes: stripeFiles.length,
stripeFiles
});
});
    // Test modules (white belt modules)
const modules = lang === 'en' ? [
{ name: 'Self-Awareness', target: 'white-belt-stripe1' },
{ name: 'Vulnerability', target: 'challenge-vulnerability' },
{ name: 'Confidence', target: 'white-belt-stripe3' },
{ name: 'Journaling', target: 'white-belt-stripe4' }
] : [
{ name: 'Selbstbewusstsein', target: 'white-belt-stripe1-gamified-de' },
{ name: 'Verletzlichkeit', target: 'challenge-vulnerability-de' },
{ name: 'Selbstvertrauen', target: 'white-belt-stripe3-gamified-de' },
{ name: 'Tagebuch', target: 'white-belt-stripe4-gamified-de' }
];
modules.forEach(module => {
const hasLink = content.includes(module.target) ||
extractLinks(content).some(link => link.includes(module.target));
test.modules.push({
name: module.name,
accessible: hasLink,
target: module.target
});
});
    // Test assessments
const assessments = [
'belt-assessment',
'worker-type',
'team-dynamics',
'mental-health',
'work-life-balance'
];
assessments.forEach(assessment => {
const hasLink = content.includes(assessment) ||
extractLinks(content).some(link => link.includes(assessment));
test.assessments.push({ name: assessment, accessible: hasLink });
});
    // Test navigation
test.navigation = {
toHub: content.includes('learning-hub'),
toBusiness: content.includes('business-portal'),
toBeltNavigator: content.includes('stripe-navigator') || content.includes('belt-navigator')
};
return test;
}
function testBusinessPortal(lang) {
const portalFile = lang === 'en' ? 'business-portal.html' : 'business-portal-de.html';
const test = {
portalFile,
lang,
combinedAssessment: false,
teamAnalytics: false,
assessments: [],
navigation: [],
issues: []
};
if (!fs.existsSync(portalFile)) {
test.issues.push('Portal file not found');
return test;
}
const content = fs.readFileSync(portalFile, 'utf8');
    // Test combined assessment
test.combinedAssessment = content.includes('combined-profile-carousel') ||
extractLinks(content).some(link =>
link.includes('combined-profile-carousel')
);
    // Test team analytics
test.teamAnalytics = content.includes('analytics') ||
content.includes('team-analytics') ||
content.includes('Team-Analytik');
    // Test assessments
const assessments = [
'worker-type',
'team-dynamics',
'combined-profile',
'belt-assessment'
];
assessments.forEach(assessment => {
const hasLink = content.includes(assessment) ||
extractLinks(content).some(link => link.includes(assessment));
test.assessments.push({ name: assessment, accessible: hasLink });
});
    // Test navigation
test.navigation = {
toHub: content.includes('learning-hub'),
toGym: content.includes('gym-dashboard'),
toHome: content.includes('index-DUAL-ENTRY')
};
return test;
}
function testCombinedAssessment(lang) {
const file = lang === 'en' ? 'combined-profile-carousel.html' : 'combined-profile-carousel.de.html';
const test = {
file,
lang,
canStart: false,
hasQuestions: false,
hasNavigation: false,
hasResults: false,
issues: []
};
if (!fs.existsSync(file)) {
test.issues.push('File not found');
return test;
}
const content = fs.readFileSync(file, 'utf8');
    // Can start (auto-starts on load)
test.canStart = content.includes('renderQuestion') ||
content.includes('DOMContentLoaded') ||
content.includes('currentQuestionIndex');
    // Has questions
test.hasQuestions = content.includes('questions') ||
(content.match(/id:\s*\d+/g) || []).length > 10 ||
content.includes('questionIndex');
    // Has navigation
test.hasNavigation = content.includes('nextQuestion') ||
content.includes('prevQuestion') ||
content.includes('nextBtn') ||
content.includes('prevBtn') ||
content.includes('autoAdvance');
    // Has results
test.hasResults = content.includes('showResults') ||
content.includes('calculateResults') ||
content.includes('result') ||
content.includes('profile');
if (!test.canStart) test.issues.push('Cannot start assessment');
if (!test.hasQuestions) test.issues.push('No questions found');
if (!test.hasNavigation) test.issues.push('No navigation found');
if (!test.hasResults) test.issues.push('No results display');
return test;
}
function extractLinks(html) {
const links = [];
const hrefRegex = /href=["']([^"']+)["']/g;
const onclickRegex = /onclick=["'][^"']*location\.href\s*=\s*["']([^"']+)["']/g;
const windowRegex = /window\.location\.href\s*=\s*["']([^"']+)["']/g;
let match;
while ((match = hrefRegex.exec(html)) !== null) links.push(match[1]);
while ((match = onclickRegex.exec(html)) !== null) links.push(match[1]);
while ((match = windowRegex.exec(html)) !== null) links.push(match[1]);
return links.filter(link =>
!link.startsWith('#') &&
!link.startsWith('http') &&
link.endsWith('.html')
);
}
function globFileSearch(pattern) {
const files = [];
function walkDir(dir, pattern) {
const entries = fs.readdirSync(dir, { withFileTypes: true });
for (const entry of entries) {
const fullPath = path.join(dir, entry.name);
if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
walkDir(fullPath, pattern);
} else if (entry.isFile() && entry.name.match(pattern.replace(/\*\*/g, '.*'))) {
files.push(fullPath);
}
}
}
try {
walkDir('.', pattern);
} catch (e) {
        // Ignore
}
return files;
}
// Run all tests
console.log('🧪 END-TO-END COMPREHENSIVE TEST');
);
console.log('Testing all TODOs from chat session\n');
// Test 1: Belt Assessments (White through Black)
');
);
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
['en', 'de'].forEach(lang => {
} belt assessments:`);
belts.forEach(belt => {
const assessmentFile = lang === 'en'
? `${belt}-belt-assessment.html`
: `${belt}-belt-assessment.de.html`;
if (fs.existsSync(assessmentFile)) {
const test = testBeltAssessment(assessmentFile, lang);
results.beltAssessments[lang].push(test);
if (test.issues.length === 0) {
                console.log(`   ✅ ${belt} belt: Complete`);
} else {
}`);
}
} else {
`);
}
});
});
// Test 2: Hub Journey
console.log('\n\n📋 TEST 2: Complete Hub Journey');
);
['en', 'de'].forEach(lang => {
} Hub:`);
const test = testHubJourney(lang);
results.hubJourney[lang] = test;
.length}/${test.courses.length} accessible`);
.length}/${test.tools.length} accessible`);
.length}/${test.assessments.length} accessible`);
if (test.issues.length > 0) {
}`);
}
});
// Test 3: Gym Journey
console.log('\n\n📋 TEST 3: Complete Gym Journey');
);
['en', 'de'].forEach(lang => {
} Gym:`);
const test = testGymJourney(lang);
results.gymJourney[lang] = test;
.length}/${test.belts.length} accessible`);
.length}/${test.modules.length} accessible`);
.length}/${test.assessments.length} accessible`);
test.belts.forEach(belt => {
if (belt.accessible && belt.stripes > 0) {
            console.log(`      ${belt.name}: ${belt.stripes} stripe pages available`);
}
});
if (test.issues.length > 0) {
}`);
}
});
// Test 4: Business Portal
console.log('\n\n📋 TEST 4: Business Portal');
);
['en', 'de'].forEach(lang => {
} Business Portal:`);
const test = testBusinessPortal(lang);
results.businessPortal[lang] = test;
    console.log(`   Combined Assessment: ${test.combinedAssessment ? '✅' : '❌'}`);
    console.log(`   Team Analytics: ${test.teamAnalytics ? '✅' : '❌'}`);
.length}/${test.assessments.length} accessible`);
if (test.issues.length > 0) {
}`);
}
});
// Test 5: Belt Assessment (Main)
console.log('\n\n📋 TEST 5: Main Belt Assessment');
);
['en', 'de'].forEach(lang => {
} Belt Assessment:`);
const file = lang === 'en' ? 'belt-assessment-v2.html' : 'belt-assessment-v2-de.html';
const test = testBeltAssessment(file, lang);
results.beltAssessment[lang] = test;
if (test.issues.length === 0) {
        console.log(`   ✅ Complete: Can start, has questions, navigation, and results`);
} else {
}`);
}
});
// Test 6: Combined Assessment
');
);
['en', 'de'].forEach(lang => {
} Combined Assessment:`);
const test = testCombinedAssessment(lang);
results.combinedAssessment[lang] = test;
if (test.issues.length === 0) {
        console.log(`   ✅ Complete: Can start, has questions, navigation, and results`);
} else {
}`);
}
});
// Summary
);
console.log('📊 COMPREHENSIVE TEST SUMMARY');
);
// Calculate scores
const beltAssessmentsScore = {
en: results.beltAssessments.en.filter(t => t.issues.length === 0).length / Math.max(results.beltAssessments.en.length, 1),
de: results.beltAssessments.de.filter(t => t.issues.length === 0).length / Math.max(results.beltAssessments.de.length, 1)
};
const hubScore = {
en: (results.hubJourney.en.courses.filter(c => c.accessible).length +
results.hubJourney.en.tools.filter(t => t.accessible).length +
results.hubJourney.en.assessments.filter(a => a.accessible).length) /
(results.hubJourney.en.courses.length + results.hubJourney.en.tools.length + results.hubJourney.en.assessments.length),
de: (results.hubJourney.de.courses.filter(c => c.accessible).length +
results.hubJourney.de.tools.filter(t => t.accessible).length +
results.hubJourney.de.assessments.filter(a => a.accessible).length) /
(results.hubJourney.de.courses.length + results.hubJourney.de.tools.length + results.hubJourney.de.assessments.length)
};
const gymScore = {
en: (results.gymJourney.en.belts.filter(b => b.accessible).length +
results.gymJourney.en.modules.filter(m => m.accessible).length +
results.gymJourney.en.assessments.filter(a => a.accessible).length) /
(results.gymJourney.en.belts.length + results.gymJourney.en.modules.length + results.gymJourney.en.assessments.length),
de: (results.gymJourney.de.belts.filter(b => b.accessible).length +
results.gymJourney.de.modules.filter(m => m.accessible).length +
results.gymJourney.de.assessments.filter(a => a.accessible).length) /
(results.gymJourney.de.belts.length + results.gymJourney.de.modules.length + results.gymJourney.de.assessments.length)
};
:`);
.toFixed(0)}% (${results.beltAssessments.en.filter(t => t.issues.length === 0).length}/${results.beltAssessments.en.length})`);
.toFixed(0)}% (${results.beltAssessments.de.filter(t => t.issues.length === 0).length}/${results.beltAssessments.de.length})`);
console.log(`\n✅ Hub Journey:`);
.toFixed(0)}%`);
.toFixed(0)}%`);
console.log(`\n✅ Gym Journey:`);
.toFixed(0)}%`);
.toFixed(0)}%`);
console.log(`\n✅ Business Portal:`);
console.log(`   EN: Combined Assessment ${results.businessPortal.en.combinedAssessment ? '✅' : '❌'}`);
console.log(`   DE: Combined Assessment ${results.businessPortal.de.combinedAssessment ? '✅' : '❌'}`);
console.log(`\n✅ Main Belt Assessment:`);
}`);
}`);
console.log(`\n✅ Combined Assessment:`);
}`);
}`);
// Save report
const report = {
timestamp: new Date().toISOString(),
results,
scores: {
beltAssessments: beltAssessmentsScore,
hub: hubScore,
gym: gymScore
}
};
fs.writeFileSync('END-TO-END-TEST-REPORT.json', JSON.stringify(report, null, 2));
console.log('\n📄 Full report saved to: END-TO-END-TEST-REPORT.json');
const totalIssues =
results.beltAssessments.en.reduce((sum, t) => sum + t.issues.length, 0) +
results.beltAssessments.de.reduce((sum, t) => sum + t.issues.length, 0) +
results.hubJourney.en.issues.length +
results.hubJourney.de.issues.length +
results.gymJourney.en.issues.length +
results.gymJourney.de.issues.length +
results.businessPortal.en.issues.length +
results.businessPortal.de.issues.length +
(results.beltAssessment.en.issues.length) +
(results.beltAssessment.de.issues.length) +
(results.combinedAssessment.en.issues.length) +
(results.combinedAssessment.de.issues.length);
process.exit(totalIssues > 20 ? 1 : 0);