/**
* TAP-IN Conversion Boosters
* All 5 conversion features in one module
*/
const TapInConversionBoosters = {
    /**
* Feature 1: Live User Counter
*/
initLiveCounter(containerId = 'tapLiveCounter') {
const baseCount = 1247;
const variance = 50;
function updateCount() {
const element = document.getElementById(containerId);
if (!element) return;
const currentCount = parseInt(element.textContent.replace(/,/g, '')) || baseCount;
const change = Math.floor(Math.random() * 5) - 2;
const newCount = Math.max(
baseCount - variance,
Math.min(baseCount + variance, currentCount + change)
);
element.textContent = newCount.toLocaleString();
}
setInterval(updateCount, 5000);
},
    /**
* Feature 2: Recent Activity Feed
*/
initActivityFeed(containerId = 'tapActivityFeed') {
const activities = [
{ text: "Sarah_M just earned Blue Belt", icon: "🔵" },
{ text: "Mike_T completed Stripe 3", icon: "💥" },
{ text: "Emma_K unlocked Communication Module", icon: "🎯" },
{ text: "John_D reached 500 XP milestone", icon: "🏆" },
{ text: "Lisa_P earned 7-day streak badge", icon: "🔥" },
{ text: "Alex_R advanced to Purple Belt", icon: "🟣" },
{ text: "Chris_B completed Assessment", icon: "✅" },
{ text: "Taylor_M passed 1,000 XP", icon: "⭐" }
];
let currentIndex = 0;
function showNextActivity() {
const feed = document.getElementById(containerId);
if (!feed) return;
const activity = activities[currentIndex];
const timeAgo = Math.floor(Math.random() * 15) + 1;
feed.innerHTML = `
<div class="tap-activity-item">
<span class="tap-activity-text">${activity.icon} ${activity.text}</span>
<span class="tap-activity-time">${timeAgo} min ago</span>
</div>
`;
currentIndex = (currentIndex + 1) % activities.length;
}
showNextActivity();
setInterval(showNextActivity, 4000);
},
    /**
* Feature 3: Next Milestone Tracker
*/
updateMilestone(containerId = 'tapMilestoneTracker') {
        // Use XPManager if available, fallback to localStorage
const totalXP = window.XPManager
? XPManager.getTotalXP()
: parseInt(localStorage.getItem('totalXP') || localStorage.getItem('tap_in_total_xp') || '0');
const milestones = [
{ xp: 25, reward: "White Belt Stripe 1", icon: "⚪", unlocks: "First achievement badge" },
{ xp: 50, reward: "White Belt Stripe 2", icon: "⚪", unlocks: "Apprentice rank + New module" },
{ xp: 75, reward: "White Belt Stripe 3", icon: "⚪", unlocks: "Intermediate rank" },
{ xp: 100, reward: "Blue Belt", icon: "🔵", unlocks: "8 new modules + Blue gi avatar" },
{ xp: 150, reward: "Blue Belt Stripe 2", icon: "🔵", unlocks: "Advanced training" },
{ xp: 200, reward: "Blue Belt Stripe 4", icon: "🔵", unlocks: "Elite status" },
{ xp: 300, reward: "Purple Belt", icon: "🟣", unlocks: "10+ new modules + Purple gi" },
{ xp: 500, reward: "Brown Belt", icon: "🟤", unlocks: "Master training" },
{ xp: 1000, reward: "Black Belt", icon: "⚫", unlocks: "Master rank + Certification" }
];
let nextMilestone = milestones.find(m => m.xp > totalXP);
if (!nextMilestone) {
nextMilestone = { xp: 1000, reward: "Black Belt Master", icon: "⚫", unlocks: "Legendary status" };
}
const xpNeeded = nextMilestone.xp - totalXP;
const progressPercent = Math.min(100, (totalXP / nextMilestone.xp) * 100);
const tracker = document.getElementById(containerId);
if (!tracker) return;
tracker.innerHTML = `
<div class="tap-milestone-card">
<div class="tap-milestone-label">NEXT REWARD</div>
<div class="tap-milestone-reward">${nextMilestone.icon} ${nextMilestone.reward}</div>
<div class="tap-milestone-progress-text">
<strong>${xpNeeded} XP</strong> away
</div>
<div class="tap-milestone-progress-bar">
<div class="tap-milestone-progress-fill" style="width: ${progressPercent}%"></div>
</div>
<div class="tap-milestone-details">
✨ You'll unlock: ${nextMilestone.unlocks}
</div>
</div>
`;
},
    /**
* Feature 4: Mini Leaderboard
*/
updateLeaderboard(containerId = 'tapLeaderboardWidget') {
        // Use XPManager if available
const userXP = window.XPManager
? XPManager.getTotalXP()
: parseInt(localStorage.getItem('totalXP') || localStorage.getItem('tap_in_total_xp') || '0');
        // Simulated competitors
const users = [
{ name: "Sarah_M", xp: 387, belt: "🔵" },
{ name: "Mike_T", xp: 276, belt: "🔵" },
{ name: "Emma_K", xp: 154, belt: "⚪" },
{ name: "Chris_B", xp: 128, belt: "⚪" },
{ name: "Alex_R", xp: 95, belt: "⚪" },
{ name: "Taylor_M", xp: 78, belt: "⚪" },
{ name: "Jordan_P", xp: 52, belt: "⚪" }
];
users.push({ name: "YOU", xp: userXP, belt: "⚪", isYou: true });
users.sort((a, b) => b.xp - a.xp);
const userIndex = users.findIndex(u => u.isYou);
let displayUsers = [];
if (userIndex < 3) {
displayUsers = users.slice(0, 5);
} else {
displayUsers = users.slice(Math.max(0, userIndex - 1), userIndex + 3);
}
const medals = { 0: "🥇", 1: "🥈", 2: "🥉" };
const html = `
<div class="tap-leaderboard-widget">
<div class="tap-leaderboard-title">👥 YOUR TRAINING PARTNERS</div>
${displayUsers.map((user, i) => {
const globalRank = users.findIndex(u => u.name === user.name);
const diff = user.xp - userXP;
const diffText = diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : '';
const diffClass = diff >= 0 ? '' : 'negative';
return `
<div class="tap-leaderboard-item ${user.isYou ? 'you' : ''}">
<span class="tap-leaderboard-rank">${medals[globalRank] || '👤'}</span>
<span class="tap-leaderboard-name">${user.name}</span>
<span class="tap-leaderboard-xp">${user.xp} XP</span>
${!user.isYou && diffText ? `<span class="tap-leaderboard-diff ${diffClass}">${diffText}</span>` : ''}
</div>
`;
}).join('')}
${userIndex > 0 ? `
<div class="tap-leaderboard-cta">
💪 Complete 1 lesson to pass ${users[userIndex - 1].name}!
</div>
` : ''}
</div>
`;
const widget = document.getElementById(containerId);
if (widget) {
widget.innerHTML = html;
}
},
    /**
* Feature 5: Daily Streak Tracker
*/
updateStreak(containerId = 'tapStreakWidget') {
const lastVisit = localStorage.getItem('lastVisit');
const today = new Date().toDateString();
if (lastVisit !== today) {
const streak = parseInt(localStorage.getItem('streak') || localStorage.getItem('dailyStreak') || '0');
if (lastVisit) {
const lastVisitDate = new Date(lastVisit);
const daysSince = Math.floor((new Date() - lastVisitDate) / (1000 * 60 * 60 * 24));
if (daysSince === 1) {
localStorage.setItem('streak', streak + 1);
localStorage.setItem('streakBroken', 'false');
} else if (daysSince > 1) {
localStorage.setItem('streak', '1');
localStorage.setItem('streakBroken', 'true');
}
} else {
localStorage.setItem('streak', '1');
}
localStorage.setItem('lastVisit', today);
}
const streak = parseInt(localStorage.getItem('streak') || localStorage.getItem('dailyStreak') || '0');
const streakBroken = localStorage.getItem('streakBroken') === 'true';
const calendarHTML = Array.from({ length: 7 }, (_, i) => {
if (i < streak) {
return '<div class="tap-streak-day complete">✓</div>';
} else {
return '<div class="tap-streak-day incomplete"></div>';
}
}).join('');
let message = "Come back tomorrow to keep it alive!";
if (streakBroken) {
message = "Start a new streak today!";
} else if (streak >= 7) {
message = "Amazing! You're a Streak Warrior! 🏆";
} else if (streak >= 3) {
message = `${7 - streak} more days to Streak Warrior!`;
}
const widget = document.getElementById(containerId);
if (!widget) return;
widget.innerHTML = `
<div class="tap-streak-widget">
<div class="tap-streak-header">
<span class="tap-streak-icon">🔥</span>
<div>
<div class="tap-streak-count">${streak} Day${streak !== 1 ? 's' : ''}</div>
<div class="tap-streak-label">Your Streak</div>
</div>
</div>
<div class="tap-streak-message">${message}</div>
<div class="tap-streak-calendar">
${calendarHTML}
</div>
${streak < 7 ? `
<div class="tap-streak-reward">
🏆 7-day streak = Streak Warrior badge
</div>
` : `
<div class="tap-streak-reward" style="color: #fbbf24;">
⭐ Keep going for 30-day streak = 2X XP multiplier!
</div>
`}
</div>
`;
},
    /**
* Initialize all features
*/
init() {
        // Wait for DOM
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => this.initAll());
} else {
this.initAll();
}
},
initAll() {
        // Feature 1: Live Counter
if (document.getElementById('tapLiveCounter')) {
this.initLiveCounter();
}
        // Feature 2: Activity Feed
if (document.getElementById('tapActivityFeed')) {
this.initActivityFeed();
}
        // Feature 3: Milestone Tracker
if (document.getElementById('tapMilestoneTracker')) {
this.updateMilestone();
            // Update when XP changes
window.addEventListener('xpUpdated', () => this.updateMilestone());
            // Also check periodically
setInterval(() => this.updateMilestone(), 5000);
}
        // Feature 4: Leaderboard
if (document.getElementById('tapLeaderboardWidget')) {
this.updateLeaderboard();
window.addEventListener('xpUpdated', () => this.updateLeaderboard());
setInterval(() => this.updateLeaderboard(), 10000);
}
        // Feature 5: Streak Tracker
if (document.getElementById('tapStreakWidget')) {
this.updateStreak();
}
}
};
// Auto-initialize
TapInConversionBoosters.init();
// Export for manual use
window.TapInConversionBoosters = TapInConversionBoosters;