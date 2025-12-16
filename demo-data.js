/**
* TAP-IN Demo Data Generator
* Populates dashboards with realistic sample data for demos
*/
const DEMO_NAMES = [
'Sarah Johnson', 'Michael Chen', 'Emma Williams', 'James Rodriguez',
'Olivia Brown', 'David Kim', 'Sophia Martinez', 'Daniel Lee',
'Ava Garcia', 'Matthew Taylor', 'Isabella Anderson', 'Christopher Wilson',
'Mia Thompson', 'Andrew Davis', 'Charlotte Miller', 'Joshua Moore',
'Amelia Jackson', 'Ryan White', 'Harper Harris', 'Brandon Clark'
];
const ROLES = [
'Software Engineer', 'Product Manager', 'UX Designer', 'Data Analyst',
'Sales Manager', 'Marketing Director', 'HR Manager', 'Operations Lead',
'DevOps Engineer', 'Customer Success Manager', 'Business Analyst',
'Engineering Manager', 'Content Strategist', 'Account Executive'
];
const WORKER_TYPES = ['Sprinter', 'Jogger', 'Ultrarunner'];
const LEADERSHIP_STYLES = ['Visionary', 'Architect', 'Facilitator', 'Executor', 'Commander', 'Coach'];
const CATEGORIES = [
'Work-Life Balance',
'Mental Health',
'Team Dynamics',
'Communication',
'Boundaries',
'Stress Management',
'Career Growth',
'Productivity'
];
function generateRandomScore(min = 40, max = 95) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomDate(daysAgo = 90) {
const now = new Date();
const randomDays = Math.floor(Math.random() * daysAgo);
const date = new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
return date.toISOString();
}
/**
* Generate demo team data
*/
function generateDemoTeam() {
const teamName = 'Demo Engineering Team';
const team = {
id: 'team_demo_' + Date.now(),
name: teamName,
admin: 'admin@example.com',
members: [],
inviteCode: 'DEMO' + Math.random().toString(36).substring(2, 6).toUpperCase(),
createdAt: generateRandomDate(60)
};
    // Add 8-12 members
const memberCount = 8 + Math.floor(Math.random() * 5);
for (let i = 0; i < memberCount; i++) {
const name = DEMO_NAMES[i];
const email = name.toLowerCase().replace(' ', '.') + '@example.com';
team.members.push({
email,
role: i === 0 ? 'admin' : 'member',
joinedAt: generateRandomDate(50)
});
}
return team;
}
/**
* Generate demo assessments for team members
*/
function generateDemoAssessments(memberEmails, count = 15) {
const assessments = [];
for (let i = 0; i < count; i++) {
const email = memberEmails[Math.floor(Math.random() * memberEmails.length)];
const scores = {};
CATEGORIES.forEach(category => {
scores[category] = generateRandomScore();
});
const totalScore = Math.floor(
Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length
);
assessments.push({
id: Date.now() + i,
email,
assessmentType: ['work-life-balance', 'mental-health', 'team-dynamics', 'combined'][Math.floor(Math.random() * 4)],
timestamp: generateRandomDate(90),
totalScore,
scores,
workerType: WORKER_TYPES[Math.floor(Math.random() * WORKER_TYPES.length)],
leadershipStyle: LEADERSHIP_STYLES[Math.floor(Math.random() * LEADERSHIP_STYLES.length)]
});
}
return assessments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}
/**
* Generate demo candidates for recruiter portal
*/
function generateDemoCandidates(count = 15) {
const candidates = [];
for (let i = 0; i < count; i++) {
const name = DEMO_NAMES[i];
const email = name.toLowerCase().replace(' ', '.') + '@candidates.com';
const role = ROLES[Math.floor(Math.random() * ROLES.length)];
const isCompleted = Math.random() > 0.3; // 70% completion rate
const candidate = {
id: 'cand_demo_' + Date.now() + '_' + i,
name,
email,
role,
status: isCompleted ? 'completed' : 'pending',
invitedAt: generateRandomDate(14),
expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
};
if (isCompleted) {
const scores = {};
CATEGORIES.forEach(category => {
scores[category] = generateRandomScore();
});
candidate.assessmentData = {
totalScore: generateRandomScore(45, 95),
scores,
workerType: WORKER_TYPES[Math.floor(Math.random() * WORKER_TYPES.length)],
leadershipStyle: LEADERSHIP_STYLES[Math.floor(Math.random() * LEADERSHIP_STYLES.length)],
completedAt: generateRandomDate(7)
};
}
candidates.push(candidate);
}
return candidates;
}
/**
* Load demo data into the app
*/
function loadDemoData() {
    console.log('🎬 Loading demo data...');
    // Generate team
const team = generateDemoTeam();
const memberEmails = team.members.map(m => m.email);
    // Save team
const teams = {};
teams[team.id] = team;
localStorage.setItem('tap-in-teams', JSON.stringify(teams));
localStorage.setItem('tap-in-current-team', team.id);
    // Generate and save assessments
const assessments = generateDemoAssessments(memberEmails, 20);
localStorage.setItem('tap-in-assessments', JSON.stringify(assessments));
    // Generate and save candidates
const candidates = generateDemoCandidates(18);
localStorage.setItem('recruiter-candidates', JSON.stringify(candidates));
    console.log('✅ Demo data loaded!');
`);
    console.log(`📈 Assessments: ${assessments.length}`);
    console.log(`👥 Candidates: ${candidates.length}`);
return {
team,
assessments,
candidates
};
}
/**
* Clear demo data
*/
function clearDemoData() {
localStorage.removeItem('tap-in-teams');
localStorage.removeItem('tap-in-current-team');
localStorage.removeItem('recruiter-candidates');
    // Keep user's own assessments
    console.log('🗑️ Demo data cleared');
}
/**
* Check if demo data is loaded
*/
function hasDemoData() {
const teams = JSON.parse(localStorage.getItem('tap-in-teams') || '{}');
return Object.values(teams).some(t => t.name === 'Demo Engineering Team');
}
// Export for use in pages
window.DemoData = {
load: loadDemoData,
clear: clearDemoData,
hasDemo: hasDemoData,
generate: {
team: generateDemoTeam,
assessments: generateDemoAssessments,
candidates: generateDemoCandidates
}
};