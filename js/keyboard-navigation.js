/**
* TAP-IN Keyboard Navigation
* Accessible keyboard shortcuts for power users
*/
(function() {
'use strict';
const KeyboardNav = {
shortcuts: {
'/': 'focusSearch',
'k': 'focusSearch', // Ctrl/Cmd + K
'h': 'goHome',
'l': 'goLearningHub',
'd': 'goDashboard',
'n': 'nextStripe',
'p': 'previousStripe',
'?': 'showHelp'
},
init: function() {
document.addEventListener('keydown', this.handleKeyPress.bind(this));
      console.log('⌨️ Keyboard navigation enabled');
},
handleKeyPress: function(e) {
      // Ignore if user is typing in input/textarea
if (e.target.matches('input, textarea, select')) {
        // Allow Ctrl/Cmd + K even in inputs
if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
e.preventDefault();
this.focusSearch();
}
return;
}
      // Handle shortcuts
const key = e.key.toLowerCase();
      // Ctrl/Cmd + K for search
if ((e.ctrlKey || e.metaKey) && key === 'k') {
e.preventDefault();
this.focusSearch();
return;
}
      // Alt + Arrow keys for navigation
if (e.altKey && e.key === 'ArrowRight') {
e.preventDefault();
this.nextStripe();
return;
}
if (e.altKey && e.key === 'ArrowLeft') {
e.preventDefault();
this.previousStripe();
return;
}
      // Single key shortcuts (not in inputs)
if (this.shortcuts[key]) {
e.preventDefault();
this[this.shortcuts[key]]();
}
},
focusSearch: function() {
const searchInput = document.querySelector('[type="search"], #search, .search-input, input[placeholder*="search" i]');
if (searchInput) {
searchInput.focus();
searchInput.select();
} else {
        console.log('No search input found');
}
},
goHome: function() {
window.location.href = '/index.html';
},
goLearningHub: function() {
window.location.href = '/learning-hub.html';
},
goDashboard: function() {
window.location.href = '/gym-dashboard.html';
},
nextStripe: function() {
const nextLink = document.querySelector('[rel="next"], .next-stripe, .next-lesson, a[href*="stripe"][href*="2"], a[href*="stripe"][href*="3"], a[href*="stripe"][href*="4"]');
if (nextLink) {
nextLink.click();
} else {
        // Try to find next stripe link by parsing current URL
const currentPath = window.location.pathname;
const stripeMatch = currentPath.match(/stripe(\d+)/);
if (stripeMatch) {
const currentStripe = parseInt(stripeMatch[1]);
if (currentStripe < 4) {
const nextStripe = currentStripe + 1;
const nextPath = currentPath.replace(/stripe\d+/, `stripe${nextStripe}`);
window.location.href = nextPath;
}
}
}
},
previousStripe: function() {
const prevLink = document.querySelector('[rel="prev"], .previous-stripe, .previous-lesson, a[href*="stripe1"], a[href*="stripe2"], a[href*="stripe3"]');
if (prevLink) {
prevLink.click();
} else {
        // Try to find previous stripe link by parsing current URL
const currentPath = window.location.pathname;
const stripeMatch = currentPath.match(/stripe(\d+)/);
if (stripeMatch) {
const currentStripe = parseInt(stripeMatch[1]);
if (currentStripe > 1) {
const prevStripe = currentStripe - 1;
const prevPath = currentPath.replace(/stripe\d+/, `stripe${prevStripe}`);
window.location.href = prevPath;
}
}
}
},
showHelp: function() {
const helpModal = document.getElementById('keyboard-shortcuts-help');
if (helpModal) {
helpModal.classList.add('show');
helpModal.setAttribute('aria-hidden', 'false');
} else {
this.createHelpModal();
}
},
createHelpModal: function() {
const modal = document.createElement('div');
modal.id = 'keyboard-shortcuts-help';
modal.className = 'keyboard-help-modal';
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-labelledby', 'shortcuts-title');
modal.setAttribute('aria-modal', 'true');
modal.setAttribute('aria-hidden', 'false');
modal.innerHTML = `
<div class="modal-content">
<button class="close-modal" onclick="KeyboardNav.closeHelp()" aria-label="Close shortcuts help">×</button>
<h2 id="shortcuts-title">⌨️ Keyboard Shortcuts</h2>
<table>
<tr><td><kbd>/</kbd></td><td>Focus search</td></tr>
<tr><td><kbd>Ctrl/Cmd</kbd> + <kbd>K</kbd></td><td>Focus search</td></tr>
<tr><td><kbd>H</kbd></td><td>Go to home</td></tr>
<tr><td><kbd>L</kbd></td><td>Go to learning hub</td></tr>
<tr><td><kbd>D</kbd></td><td>Go to dashboard</td></tr>
<tr><td><kbd>Alt</kbd> + <kbd>→</kbd></td><td>Next stripe</td></tr>
<tr><td><kbd>Alt</kbd> + <kbd>←</kbd></td><td>Previous stripe</td></tr>
<tr><td><kbd>?</kbd></td><td>Show this help</td></tr>
</table>
</div>
`;
document.body.appendChild(modal);
      // Focus trap
const firstFocusable = modal.querySelector('button');
if (firstFocusable) firstFocusable.focus();
      // Close on Escape
const escapeHandler = (e) => {
if (e.key === 'Escape') {
this.closeHelp();
document.removeEventListener('keydown', escapeHandler);
}
};
document.addEventListener('keydown', escapeHandler);
},
closeHelp: function() {
const modal = document.getElementById('keyboard-shortcuts-help');
if (modal) {
modal.classList.remove('show');
modal.setAttribute('aria-hidden', 'true');
setTimeout(() => modal.remove(), 300);
}
}
};
  // Auto-initialize
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => KeyboardNav.init());
} else {
KeyboardNav.init();
}
  // Export for global use
window.KeyboardNav = KeyboardNav;
})();