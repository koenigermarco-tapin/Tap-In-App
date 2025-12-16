/**
* Micro-interactions and Enhanced Animations
* Hover effects, button animations, smooth transitions
*/
(function() {
'use strict';
    // Add hover effects to cards
function enhanceCards() {
const cards = document.querySelectorAll('.card, .module-card, .open-mat-card, .stripe-item, .entry-card');
cards.forEach(card => {
            // Skip if already enhanced
if (card.dataset.enhanced === 'true') {
return;
}
card.dataset.enhanced = 'true';
            // Add hover effect
card.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-4px)';
this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
});
card.addEventListener('mouseleave', function() {
this.style.transform = 'translateY(0)';
this.style.boxShadow = '';
});
            // Add click animation
card.addEventListener('mousedown', function() {
this.style.transform = 'translateY(-2px) scale(0.98)';
});
card.addEventListener('mouseup', function() {
this.style.transform = 'translateY(-4px)';
});
});
}
    // Enhance button interactions
function enhanceButtons() {
const buttons = document.querySelectorAll('button:not(.no-enhance), .btn, .btn-primary');
buttons.forEach(button => {
if (button.dataset.enhanced === 'true') {
return;
}
button.dataset.enhanced = 'true';
            // Ripple effect on click
button.addEventListener('click', function(e) {
const ripple = document.createElement('span');
const rect = this.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
const x = e.clientX - rect.left - size / 2;
const y = e.clientY - rect.top - size / 2;
ripple.style.cssText = `
position: absolute;
width: ${size}px;
height: ${size}px;
border-radius: 50%;
background: rgba(255, 255, 255, 0.5);
transform: scale(0);
animation: ripple 0.6s ease-out;
left: ${x}px;
top: ${y}px;
pointer-events: none;
`;
                // Ensure button has relative positioning
const originalPosition = this.style.position;
if (!this.style.position || this.style.position === 'static') {
this.style.position = 'relative';
this.style.overflow = 'hidden';
}
this.appendChild(ripple);
setTimeout(() => {
ripple.remove();
if (originalPosition === 'static' || !originalPosition) {
this.style.position = originalPosition;
this.style.overflow = '';
}
}, 600);
});
            // Press animation
button.addEventListener('mousedown', function() {
this.style.transform = 'scale(0.95)';
});
button.addEventListener('mouseup', function() {
this.style.transform = 'scale(1)';
});
button.addEventListener('mouseleave', function() {
this.style.transform = 'scale(1)';
});
});
}
    // Smooth page transitions
function addPageTransitions() {
        // Fade in on load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';
window.addEventListener('load', () => {
document.body.style.opacity = '1';
});
        // Fade out on navigation (if links have href)
const links = document.querySelectorAll('a[href]');
links.forEach(link => {
link.addEventListener('click', function(e) {
                // Only for internal links
if (this.hostname === window.location.hostname || !this.hostname) {
                    // Small delay for visual feedback
document.body.style.opacity = '0.8';
}
});
});
}
    // Add animations CSS
function addAnimationsCSS() {
if (document.getElementById('micro-interactions-css')) {
return;
}
const style = document.createElement('style');
style.id = 'micro-interactions-css';
style.textContent = `
            /* Card hover animations */
.card,
.module-card,
.open-mat-card,
.stripe-item,
.entry-card {
transition: transform 0.2s ease, box-shadow 0.2s ease;
}
            /* Button animations */
button,
.btn {
transition: transform 0.1s ease, background 0.2s ease;
}
            /* Ripple animation */
@keyframes ripple {
to {
transform: scale(2);
opacity: 0;
}
}
            /* Pulse animation for CTAs */
@keyframes pulse {
0%, 100% {
opacity: 1;
}
50% {
opacity: 0.8;
}
}
.pulse {
animation: pulse 2s ease-in-out infinite;
}
            /* Shake animation for errors */
@keyframes shake {
0%, 100% { transform: translateX(0); }
25% { transform: translateX(-5px); }
75% { transform: translateX(5px); }
}
.shake {
animation: shake 0.3s ease;
}
            /* Bounce animation */
@keyframes bounce {
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-10px); }
}
.bounce {
animation: bounce 0.6s ease;
}
            /* Slide in animations */
@keyframes slideInUp {
from {
transform: translateY(20px);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}
.slide-in-up {
animation: slideInUp 0.4s ease-out;
}
`;
document.head.appendChild(style);
}
    // Initialize on DOM ready
function init() {
addAnimationsCSS();
enhanceCards();
enhanceButtons();
addPageTransitions();
        // Re-enhance dynamically added elements
const observer = new MutationObserver(() => {
enhanceCards();
enhanceButtons();
});
observer.observe(document.body, {
childList: true,
subtree: true
});
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init);
} else {
init();
}
    // Utility functions
window.MicroInteractions = {
pulse: function(element) {
element.classList.add('pulse');
setTimeout(() => element.classList.remove('pulse'), 2000);
},
shake: function(element) {
element.classList.add('shake');
setTimeout(() => element.classList.remove('shake'), 300);
},
bounce: function(element) {
element.classList.add('bounce');
setTimeout(() => element.classList.remove('bounce'), 600);
},
slideInUp: function(element) {
element.classList.add('slide-in-up');
}
};
})();