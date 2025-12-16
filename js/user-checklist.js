/**
* TAP-IN User Checklist
* First-time user onboarding checklist
*/
(function() {
'use strict';
const UserChecklist = {
items: [
{ id: 'account', label: 'Create account', completed: true, action: null },
{ id: 'assessment', label: 'Take belt assessment', completed: false, action: '/belt-assessment-v2.html' },
{ id: 'stripe', label: 'Complete first stripe', completed: false, action: '/white-belt-stripe1-gamified.html' },
{ id: 'tool', label: 'Try an Open Mat tool', completed: false, action: '/tool-box-breathing.html' },
{ id: 'profile', label: 'Complete your profile', completed: false, action: '/account.html' }
],
init: function() {
      // Load saved progress
this.loadProgress();
      // Create checklist if on dashboard
if (document.getElementById('dashboard-content') ||
window.location.pathname.includes('dashboard')) {
this.createChecklist();
}
      // Check for completions
this.checkCompletions();
},
loadProgress: function() {
this.items.forEach(item => {
const saved = localStorage.getItem(`checklist_${item.id}`);
if (saved === 'true') {
item.completed = true;
}
});
},
createChecklist: function() {
      // Check if checklist already exists
if (document.getElementById('user-checklist')) {
this.updateChecklist();
return;
}
const checklist = document.createElement('div');
checklist.id = 'user-checklist';
checklist.className = 'onboarding-checklist';
checklist.innerHTML = `
<div class="checklist-header">
<h3>🎯 Get Started</h3>
<button class="checklist-dismiss" onclick="UserChecklist.dismiss()" aria-label="Dismiss checklist">×</button>
</div>
<ul class="checklist-items" id="checklistItems"></ul>
<div class="checklist-progress">
<div class="progress-bar">
<div class="progress-fill" id="checklistProgress"></div>
</div>
<span class="progress-text" id="checklistProgressText">0 of 5 complete</span>
</div>
`;
      // Find insertion point (top of dashboard content)
const dashboardContent = document.getElementById('dashboard-content') ||
document.querySelector('main') ||
document.body;
if (dashboardContent) {
dashboardContent.insertBefore(checklist, dashboardContent.firstChild);
}
this.updateChecklist();
this.updateProgress();
},
updateChecklist: function() {
const itemsContainer = document.getElementById('checklistItems');
if (!itemsContainer) return;
itemsContainer.innerHTML = '';
this.items.forEach((item, index) => {
if (item.id === 'account') return; // Skip account creation (always complete)
const li = document.createElement('li');
li.className = `checklist-item ${item.completed ? 'completed' : ''}`;
li.id = `checklist-${item.id}`;
li.innerHTML = `
<input
type="checkbox"
id="check-${item.id}"
${item.completed ? 'checked disabled' : 'disabled'}
>
<label for="check-${item.id}">${item.label}</label>
${item.action && !item.completed ?
`<a href="${item.action}" class="checklist-cta">Start</a>` :
item.completed ? '<span class="checklist-check">✓</span>' : ''
}
`;
itemsContainer.appendChild(li);
});
},
updateProgress: function() {
const completed = this.items.filter(item => item.completed).length;
const total = this.items.length;
const percent = (completed / total) * 100;
const progressBar = document.getElementById('checklistProgress');
const progressText = document.getElementById('checklistProgressText');
if (progressBar) {
progressBar.style.width = percent + '%';
}
if (progressText) {
progressText.textContent = `${completed} of ${total} complete`;
}
      // Hide if all complete
if (completed === total) {
setTimeout(() => {
const checklist = document.getElementById('user-checklist');
if (checklist) {
checklist.style.opacity = '0';
setTimeout(() => checklist.remove(), 300);
}
}, 2000);
}
},
checkItem: function(itemId) {
const item = this.items.find(i => i.id === itemId);
if (item && !item.completed) {
item.completed = true;
localStorage.setItem(`checklist_${itemId}`, 'true');
this.updateChecklist();
this.updateProgress();
        // Celebrate if all complete
if (this.items.every(i => i.completed)) {
this.celebrate();
}
        // Track in analytics
if (window.Analytics) {
window.Analytics.track('checklist_item_completed', {
item: itemId,
label: item.label
});
}
}
},
checkCompletions: function() {
      // Check if assessment completed
const assessmentResult = localStorage.getItem('tapinBeltAssessment');
if (assessmentResult && !this.items.find(i => i.id === 'assessment')?.completed) {
this.checkItem('assessment');
}
      // Check if stripe completed
const stripesCompleted = this.getStripesCompleted();
if (stripesCompleted > 0 && !this.items.find(i => i.id === 'stripe')?.completed) {
this.checkItem('stripe');
}
      // Check if tool used
const toolsUsed = localStorage.getItem('tools_used');
if (toolsUsed && !this.items.find(i => i.id === 'tool')?.completed) {
this.checkItem('tool');
}
      // Check if profile complete (simplified check)
const profileComplete = localStorage.getItem('profile_complete');
if (profileComplete === 'true' && !this.items.find(i => i.id === 'profile')?.completed) {
this.checkItem('profile');
}
},
getStripesCompleted: function() {
let count = 0;
for (let belt of ['white', 'blue', 'purple', 'brown', 'black']) {
for (let i = 1; i <= 4; i++) {
const key = `${belt}BeltStripe${i}Complete`;
if (localStorage.getItem(key) === 'true') {
count++;
}
}
}
return count;
},
celebrate: function() {
      // Trigger confetti if available
if (typeof triggerConfetti === 'function') {
triggerConfetti();
}
      // Show completion message
if (window.Analytics) {
window.Analytics.track('checklist_completed', {
items_completed: this.items.length
});
}
},
dismiss: function() {
const checklist = document.getElementById('user-checklist');
if (checklist) {
checklist.style.opacity = '0';
setTimeout(() => checklist.remove(), 300);
localStorage.setItem('checklist_dismissed', 'true');
}
}
};
  // Auto-initialize
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => UserChecklist.init());
} else {
UserChecklist.init();
}
  // Export for global use
window.UserChecklist = UserChecklist;
})();