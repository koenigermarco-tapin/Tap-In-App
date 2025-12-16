/**
* Enhanced Loading States
* Skeleton screens, progress indicators, and smooth transitions
*/
(function() {
'use strict';
    // Create skeleton loader element
function createSkeleton(type = 'default') {
const skeleton = document.createElement('div');
skeleton.className = 'skeleton-loader';
skeleton.setAttribute('data-skeleton-type', type);
const types = {
'card': `
<div class="skeleton-card">
<div class="skeleton-line skeleton-title"></div>
<div class="skeleton-line skeleton-text"></div>
<div class="skeleton-line skeleton-text short"></div>
</div>
`,
'text': `
<div class="skeleton-line"></div>
<div class="skeleton-line"></div>
<div class="skeleton-line short"></div>
`,
'default': `
<div class="skeleton-line"></div>
<div class="skeleton-line"></div>
`
};
skeleton.innerHTML = types[type] || types.default;
return skeleton;
}
    // Show skeleton while content loads
window.showSkeleton = function(containerId, type = 'default') {
const container = document.getElementById(containerId);
if (!container) return;
const skeleton = createSkeleton(type);
container.innerHTML = '';
container.appendChild(skeleton);
};
    // Hide skeleton when content is ready
window.hideSkeleton = function(containerId) {
const container = document.getElementById(containerId);
if (!container) return;
const skeleton = container.querySelector('.skeleton-loader');
if (skeleton) {
skeleton.style.opacity = '0';
skeleton.style.transition = 'opacity 0.3s ease';
setTimeout(() => skeleton.remove(), 300);
}
};
    // Progress indicator for assessments
window.showProgress = function(containerId, current, total) {
const container = document.getElementById(containerId) || document.body;
let progressBar = document.getElementById('progress-indicator');
if (!progressBar) {
progressBar = document.createElement('div');
progressBar.id = 'progress-indicator';
progressBar.style.cssText = `
position: fixed;
top: 0;
left: 0;
right: 0;
height: 4px;
background: rgba(255,255,255,0.1);
z-index: 10000;
transition: width 0.3s ease;
`;
const progressFill = document.createElement('div');
progressFill.id = 'progress-fill';
progressFill.style.cssText = `
height: 100%;
background: linear-gradient(90deg, #6366f1, #8b5cf6);
width: 0%;
transition: width 0.3s ease;
`;
progressBar.appendChild(progressFill);
container.appendChild(progressBar);
}
const percentage = (current / total) * 100;
const fill = progressBar.querySelector('#progress-fill');
if (fill) {
fill.style.width = percentage + '%';
}
if (current >= total) {
setTimeout(() => {
progressBar.style.opacity = '0';
setTimeout(() => progressBar.remove(), 300);
}, 500);
}
};
    // Enhanced saving indicator
window.showSaving = function(message = 'Saving...') {
let savingIndicator = document.getElementById('saving-indicator');
if (!savingIndicator) {
savingIndicator = document.createElement('div');
savingIndicator.id = 'saving-indicator';
savingIndicator.style.cssText = `
position: fixed;
bottom: 20px;
right: 20px;
background: rgba(99, 102, 241, 0.9);
color: white;
padding: 0.75rem 1.5rem;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(0,0,0,0.2);
z-index: 9999;
display: flex;
align-items: center;
gap: 0.5rem;
font-size: 0.9rem;
opacity: 0;
transition: opacity 0.3s ease;
`;
document.body.appendChild(savingIndicator);
}
savingIndicator.innerHTML = `
<span class="spinner" style="
width: 16px;
height: 16px;
border: 2px solid rgba(255,255,255,0.3);
border-top-color: white;
border-radius: 50%;
animation: spin 0.6s linear infinite;
"></span>
<span>${message}</span>
`;
savingIndicator.style.opacity = '1';
};
window.hideSaving = function(success = true) {
const indicator = document.getElementById('saving-indicator');
if (!indicator) return;
if (success) {
indicator.innerHTML = '✅ Saved';
setTimeout(() => {
indicator.style.opacity = '0';
setTimeout(() => indicator.remove(), 300);
}, 1000);
} else {
indicator.innerHTML = '❌ Save failed';
indicator.style.background = 'rgba(239, 68, 68, 0.9)';
setTimeout(() => {
indicator.style.opacity = '0';
setTimeout(() => indicator.remove(), 300);
}, 2000);
}
};
    // Add CSS for skeleton loaders
if (!document.getElementById('skeleton-styles')) {
const style = document.createElement('style');
style.id = 'skeleton-styles';
style.textContent = `
.skeleton-loader {
animation: skeleton-loading 1.5s ease-in-out infinite;
}
.skeleton-line {
height: 16px;
background: linear-gradient(90deg,
rgba(255,255,255,0.1) 0%,
rgba(255,255,255,0.2) 50%,
rgba(255,255,255,0.1) 100%);
border-radius: 4px;
margin-bottom: 12px;
background-size: 200% 100%;
}
.skeleton-title {
height: 24px;
width: 60%;
}
.skeleton-text {
width: 100%;
}
.skeleton-text.short {
width: 80%;
}
@keyframes skeleton-loading {
0% {
background-position: -200% 0;
}
100% {
background-position: 200% 0;
}
}
@keyframes spin {
to {
transform: rotate(360deg);
}
}
`;
document.head.appendChild(style);
}
})();