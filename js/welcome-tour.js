/**
* TAP-IN Welcome Tour
* Interactive onboarding for first-time users
* Using native implementation (no external dependencies)
*/
(function() {
'use strict';
const WelcomeTour = {
tour: null,
currentStep: 0,
steps: [],
init: function() {
      // Only show for first-time users
if (localStorage.getItem('tapin_tour_completed')) {
return;
}
      // Wait 1 second after page load
setTimeout(() => this.start(), 1000);
},
start: function() {
      // Create tour overlay
this.createTourOverlay();
      // Get steps for current page
const currentPage = window.location.pathname;
if (currentPage === '/' || currentPage === '/index.html' || currentPage.includes('index')) {
this.addHomeSteps();
} else if (currentPage.includes('learning-hub')) {
this.addLearningHubSteps();
} else if (currentPage.includes('dashboard')) {
this.addDashboardSteps();
} else if (currentPage.includes('assessment')) {
this.addAssessmentSteps();
}
if (this.steps.length > 0) {
this.showStep(0);
}
},
createTourOverlay: function() {
const overlay = document.createElement('div');
overlay.id = 'welcome-tour-overlay';
overlay.className = 'tour-overlay';
overlay.setAttribute('role', 'dialog');
overlay.setAttribute('aria-modal', 'true');
overlay.setAttribute('aria-labelledby', 'tour-title');
overlay.innerHTML = `
<div class="tour-content" id="tourContent">
<div class="tour-header">
<h3 id="tour-title">Welcome to TAP-IN!</h3>
<button class="tour-close" onclick="WelcomeTour.complete()" aria-label="Close tour">×</button>
</div>
<div class="tour-body" id="tourBody"></div>
<div class="tour-footer">
<div class="tour-progress">
<span id="tourStepCount">1</span> of <span id="tourTotalSteps">3</span>
</div>
<div class="tour-actions">
<button class="tour-btn-secondary" id="tourSkip" onclick="WelcomeTour.complete()">Skip Tour</button>
<button class="tour-btn" id="tourBack" onclick="WelcomeTour.previous()" style="display:none;">Back</button>
<button class="tour-btn-primary" id="tourNext" onclick="WelcomeTour.next()">Next</button>
</div>
</div>
</div>
`;
document.body.appendChild(overlay);
this.addTourStyles();
},
addTourStyles: function() {
if (document.getElementById('welcome-tour-styles')) return;
const style = document.createElement('style');
style.id = 'welcome-tour-styles';
style.textContent = `
.tour-overlay {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.7);
z-index: 10000;
display: flex;
align-items: center;
justify-content: center;
backdrop-filter: blur(4px);
}
.tour-content {
background: white;
border-radius: 16px;
max-width: 500px;
width: 90%;
max-height: 90vh;
overflow-y: auto;
box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
.tour-header {
padding: 24px 24px 16px;
border-bottom: 1px solid #e5e7eb;
display: flex;
justify-content: space-between;
align-items: center;
}
.tour-header h3 {
margin: 0;
color: #1a365d;
font-size: 24px;
}
.tour-close {
background: none;
border: none;
font-size: 28px;
cursor: pointer;
color: #64748b;
padding: 0;
width: 32px;
height: 32px;
display: flex;
align-items: center;
justify-content: center;
}
.tour-body {
padding: 24px;
color: #1f2937;
line-height: 1.6;
}
.tour-body h4 {
margin-top: 0;
color: #1a365d;
}
.tour-footer {
padding: 16px 24px;
border-top: 1px solid #e5e7eb;
display: flex;
justify-content: space-between;
align-items: center;
}
.tour-progress {
font-size: 14px;
color: #64748b;
}
.tour-actions {
display: flex;
gap: 8px;
}
.tour-btn,
.tour-btn-primary,
.tour-btn-secondary {
padding: 10px 20px;
border-radius: 8px;
border: none;
font-weight: 600;
cursor: pointer;
font-size: 14px;
}
.tour-btn-primary {
background: #4a7c9c;
color: white;
}
.tour-btn-primary:hover {
background: #5a8cac;
}
.tour-btn-secondary {
background: #f1f5f9;
color: #64748b;
}
.tour-btn-secondary:hover {
background: #e5e7eb;
}
.tour-highlight {
position: relative;
z-index: 10001;
box-shadow: 0 0 0 4px rgba(74, 124, 156, 0.5), 0 0 0 9999px rgba(0,0,0,0.5);
}
`;
document.head.appendChild(style);
},
addHomeSteps: function() {
this.steps = [
{
title: '🥋 Welcome to TAP-IN!',
content: '<h4>Learn leadership through martial arts principles</h4><p>Let me show you around in 30 seconds.</p>',
},
{
title: '🎯 Belt Progression System',
content: '<h4>Progress through 5 belts</h4><p>Start with White Belt and advance to Black Belt. Each belt has 4 stripes. Complete the assessment to find your starting level.</p>',
element: '[href*="belt-assessment"]',
},
{
title: '📚 Learning Hub',
content: '<h4>Your central learning space</h4><p>Access all courses, tools, and games in one place.</p>',
element: '[href*="learning-hub"]',
},
{
title: '🚀 Ready to Begin?',
content: '<h4>Start your journey</h4><p>Take the belt assessment to find your starting point, or jump into White Belt if you\'re new to leadership.</p>',
}
];
},
addLearningHubSteps: function() {
this.steps = [
{
title: '📚 Welcome to Your Learning Hub',
content: '<h4>Your central place for learning</h4><p>This is where you\'ll find courses, tools, and games.</p>',
},
{
title: '🎓 Belt Courses',
content: '<h4>Progress through belt levels</h4><p>Each belt has 4 stripes with lessons and assessments.</p>',
element: '.belt-cards, .course-section, [href*="belt"]',
},
{
title: '🛠️ Open Mat Tools',
content: '<h4>Quick 5-minute tools</h4><p>Daily practice tools: breathing exercises, journaling, weekly reviews, and more.</p>',
element: '.tools-section, [href*="tool"]',
}
];
},
addDashboardSteps: function() {
this.steps = [
{
title: '🎮 Your Gym Dashboard',
content: '<h4>Track your progress</h4><p>Monitor your XP, level, and achievements here.</p>',
},
{
title: '⚡ XP & Levels',
content: '<h4>Earn XP by learning</h4><p>Complete lessons, take assessments, and use tools to earn XP and level up!</p>',
element: '.xp-display, [class*="xp"], #totalXP',
},
{
title: '🏆 Achievements',
content: '<h4>Unlock badges</h4><p>Celebrate milestones in your leadership journey.</p>',
element: '.achievements-section, [href*="achievement"]',
}
];
},
addAssessmentSteps: function() {
this.steps = [
{
title: '📊 Belt Assessment',
content: '<h4>Find your starting point</h4><p>This assessment will help determine your current leadership level.</p>',
},
{
title: '💭 Answer Honestly',
content: '<h4>50 questions await</h4><p>Take your time and answer based on your actual behavior, not what you think is "right".</p>',
}
];
},
showStep: function(stepIndex) {
if (stepIndex < 0 || stepIndex >= this.steps.length) {
this.complete();
return;
}
this.currentStep = stepIndex;
const step = this.steps[stepIndex];
const contentEl = document.getElementById('tourBody');
const titleEl = document.getElementById('tour-title');
titleEl.textContent = step.title;
contentEl.innerHTML = step.content;
      // Update progress
document.getElementById('tourStepCount').textContent = stepIndex + 1;
document.getElementById('tourTotalSteps').textContent = this.steps.length;
      // Update buttons
document.getElementById('tourBack').style.display = stepIndex === 0 ? 'none' : 'inline-block';
document.getElementById('tourNext').textContent = stepIndex === this.steps.length - 1 ? 'Finish' : 'Next';
      // Highlight element if specified
this.highlightElement(step.element);
      // Scroll tour into view
document.getElementById('welcome-tour-overlay').scrollIntoView({ behavior: 'smooth', block: 'center' });
},
highlightElement: function(selector) {
      // Remove previous highlights
document.querySelectorAll('.tour-highlight').forEach(el => {
el.classList.remove('tour-highlight');
});
if (selector) {
const element = document.querySelector(selector);
if (element) {
element.classList.add('tour-highlight');
element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
}
},
next: function() {
if (this.currentStep < this.steps.length - 1) {
this.showStep(this.currentStep + 1);
} else {
this.complete();
}
},
previous: function() {
if (this.currentStep > 0) {
this.showStep(this.currentStep - 1);
}
},
complete: function() {
localStorage.setItem('tapin_tour_completed', 'true');
const overlay = document.getElementById('welcome-tour-overlay');
if (overlay) {
overlay.remove();
}
      // Remove highlights
document.querySelectorAll('.tour-highlight').forEach(el => {
el.classList.remove('tour-highlight');
});
},
restart: function() {
localStorage.removeItem('tapin_tour_completed');
this.start();
}
};
  // Auto-initialize
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => WelcomeTour.init());
} else {
WelcomeTour.init();
}
  // Export for global use
window.WelcomeTour = WelcomeTour;
})();