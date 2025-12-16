/**
* TAP-IN Achievement Badges System
* Manages achievement badges and notifications
*/
(function() {
'use strict';
const AchievementBadges = {
achievements: [],
init: function() {
this.loadAchievements();
this.setupEventListeners();
},
loadAchievements: function() {
try {
const stored = localStorage.getItem('achievements');
this.achievements = stored ? JSON.parse(stored) : [];
} catch (e) {
                console.warn('Failed to load achievements:', e);
this.achievements = [];
}
},
saveAchievements: function() {
try {
localStorage.setItem('achievements', JSON.stringify(this.achievements));
} catch (e) {
                console.warn('Failed to save achievements:', e);
}
},
setupEventListeners: function() {
            // Listen for achievement events
window.addEventListener('achievementEarned', (e) => {
this.addAchievement(e.detail);
});
window.addEventListener('lessonCompleted', () => {
this.checkAchievements();
});
},
addAchievement: function(achievement) {
if (!achievement.id || !achievement.name) {
                console.warn('Invalid achievement data:', achievement);
return;
}
            // Check if already earned
if (this.achievements.find(a => a.id === achievement.id)) {
return;
}
achievement.earnedAt = new Date().toISOString();
this.achievements.push(achievement);
this.saveAchievements();
this.showBadge(achievement);
},
showBadge: function(achievement) {
            // Create badge notification
const badge = document.createElement('div');
badge.className = 'achievement-badge-notification';
badge.innerHTML = `
<div class="badge-icon">🏆</div>
<div class="badge-content">
<div class="badge-title">Achievement Unlocked!</div>
<div class="badge-name">${achievement.name}</div>
</div>
`;
            // Add styles if not present
if (!document.getElementById('achievement-badge-styles')) {
const style = document.createElement('style');
style.id = 'achievement-badge-styles';
style.textContent = `
.achievement-badge-notification {
position: fixed;
top: 20px;
right: 20px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 1rem 1.5rem;
border-radius: 12px;
box-shadow: 0 10px 25px rgba(0,0,0,0.3);
z-index: 10000;
display: flex;
align-items: center;
gap: 1rem;
animation: slideInRight 0.3s ease;
max-width: 300px;
}
@keyframes slideInRight {
from { transform: translateX(400px); opacity: 0; }
to { transform: translateX(0); opacity: 1; }
}
.badge-icon { font-size: 2rem; }
.badge-title { font-weight: 600; font-size: 0.9rem; }
.badge-name { font-size: 1rem; }
`;
document.head.appendChild(style);
}
document.body.appendChild(badge);
            // Remove after 5 seconds
setTimeout(() => {
badge.style.animation = 'slideOutRight 0.3s ease';
setTimeout(() => badge.remove(), 300);
}, 5000);
},
checkAchievements: function() {
            // Check for milestone achievements
const totalXP = parseInt(localStorage.getItem('totalXP') || 0);
const completedLessons = this.getCompletedLessonsCount();
            // Example achievements
if (totalXP >= 1000 && !this.hasAchievement('xp-master')) {
this.addAchievement({
id: 'xp-master',
name: 'XP Master',
description: 'Earned 1000 XP'
});
}
if (completedLessons >= 10 && !this.hasAchievement('dedicated-learner')) {
this.addAchievement({
id: 'dedicated-learner',
name: 'Dedicated Learner',
description: 'Completed 10 lessons'
});
}
},
hasAchievement: function(achievementId) {
return this.achievements.some(a => a.id === achievementId);
},
getCompletedLessonsCount: function() {
let count = 0;
for (let i = 0; i < localStorage.length; i++) {
const key = localStorage.key(i);
if (key && key.includes('Complete') && localStorage.getItem(key) === 'true') {
count++;
}
}
return count;
},
getAchievements: function() {
return this.achievements;
}
};
    // Initialize
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => AchievementBadges.init());
} else {
AchievementBadges.init();
}
    // Export
window.AchievementBadges = AchievementBadges;
})();