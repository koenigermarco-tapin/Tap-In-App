/**
* Empty States Component
* Provides helpful empty states for achievements, progress, and new users
*/
(function() {
'use strict';
    // Empty state templates
const EmptyStates = {
achievements: {
icon: '🏆',
title: 'No Achievements Yet',
message: 'Complete lessons and earn stripes to unlock achievements!',
cta: {
text: 'Start Your Journey',
link: 'gym-dashboard.html'
}
},
progress: {
icon: '📊',
title: 'Your Progress Awaits',
message: 'Complete your first lesson to start tracking your progress.',
cta: {
text: 'Browse Lessons',
link: 'learning-hub.html'
}
},
assessments: {
icon: '📝',
title: 'No Assessments Yet',
message: 'Take an assessment to discover your leadership profile.',
cta: {
text: 'Take Assessment',
link: 'hub-assessment-center.html'
}
},
goals: {
icon: '🎯',
title: 'No Goals Set',
message: 'Set your first goal to start tracking your progress.',
cta: {
text: 'Create Goal',
link: 'goals.html'
}
}
};
    /**
* Show empty state
* @param {string} containerId - ID of container to show empty state in
* @param {string} type - Type of empty state (achievements, progress, assessments, goals)
*/
window.showEmptyState = function(containerId, type = 'progress') {
const container = document.getElementById(containerId);
if (!container) {
            console.warn(`Container ${containerId} not found`);
return;
}
const state = EmptyStates[type] || EmptyStates.progress;
const emptyStateHTML = `
<div class="empty-state" style="
text-align: center;
padding: 60px 20px;
background: rgba(255,255,255,0.05);
border-radius: 16px;
border: 2px dashed rgba(255,255,255,0.1);
">
<div class="empty-state-icon" style="
font-size: 64px;
margin-bottom: 20px;
opacity: 0.7;
">${state.icon}</div>
<h3 class="empty-state-title" style="
font-size: 24px;
font-weight: 600;
margin-bottom: 12px;
color: #ffffff;
">${state.title}</h3>
<p class="empty-state-message" style="
font-size: 16px;
color: rgba(255,255,255,0.7);
margin-bottom: 30px;
max-width: 400px;
margin-left: auto;
margin-right: auto;
line-height: 1.6;
">${state.message}</p>
${state.cta ? `
<a href="${state.cta.link}" class="empty-state-cta" style="
display: inline-block;
padding: 12px 32px;
background: linear-gradient(135deg, #6366f1, #8b5cf6);
color: white;
text-decoration: none;
border-radius: 8px;
font-weight: 600;
transition: transform 0.2s, box-shadow 0.2s;
" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(99,102,241,0.4)';"
onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';">
${state.cta.text} →
</a>
` : ''}
</div>
`;
container.innerHTML = emptyStateHTML;
};
    /**
* Check if achievements container is empty and show empty state
*/
window.checkAchievementsEmpty = function() {
const container = document.querySelector('.achievements-grid, .achievements-list, #achievements-container');
if (!container) return;
const achievements = container.querySelectorAll('.achievement-item, .badge-card, .achievement-card');
if (achievements.length === 0) {
const emptyContainer = document.createElement('div');
emptyContainer.id = 'empty-achievements-state';
container.appendChild(emptyContainer);
showEmptyState('empty-achievements-state', 'achievements');
}
};
    /**
* Check if progress container is empty and show empty state
*/
window.checkProgressEmpty = function() {
const container = document.querySelector('.progress-section, #progress-container, .stats-container');
if (!container) return;
        // Check if user has any progress
const hasProgress = localStorage.getItem('totalXP') && parseInt(localStorage.getItem('totalXP')) > 0;
if (!hasProgress) {
const emptyContainer = document.createElement('div');
emptyContainer.id = 'empty-progress-state';
container.appendChild(emptyContainer);
showEmptyState('empty-progress-state', 'progress');
}
};
    // Auto-check on page load
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
setTimeout(checkAchievementsEmpty, 500);
setTimeout(checkProgressEmpty, 500);
});
} else {
setTimeout(checkAchievementsEmpty, 500);
setTimeout(checkProgressEmpty, 500);
}
})();