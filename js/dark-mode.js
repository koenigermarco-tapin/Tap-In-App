/**
* Dark Mode Support
* Toggle between light and dark themes with system preference detection
*/
(function() {
'use strict';
const DARK_MODE_KEY = 'tap-in-dark-mode';
const DARK_CLASS = 'dark-mode';
const DarkMode = {
        /**
* Initialize dark mode
*/
init: function() {
            // Check saved preference or system preference
const savedPreference = localStorage.getItem(DARK_MODE_KEY);
const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
const shouldBeDark = savedPreference !== null
? savedPreference === 'true'
: systemPreference;
this.setDarkMode(shouldBeDark);
            // Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
if (localStorage.getItem(DARK_MODE_KEY) === null) {
this.setDarkMode(e.matches);
}
});
            // Create toggle button if it doesn't exist
this.createToggleButton();
},
        /**
* Set dark mode on/off
*/
setDarkMode: function(enabled) {
if (enabled) {
document.documentElement.classList.add(DARK_CLASS);
document.body.classList.add(DARK_CLASS);
} else {
document.documentElement.classList.remove(DARK_CLASS);
document.body.classList.remove(DARK_CLASS);
}
localStorage.setItem(DARK_MODE_KEY, enabled.toString());
            // Dispatch event for other scripts
window.dispatchEvent(new CustomEvent('darkModeChanged', {
detail: { enabled }
}));
            // Update toggle button if it exists
const toggle = document.getElementById('dark-mode-toggle');
if (toggle) {
toggle.textContent = enabled ? '☀️' : '🌙';
toggle.setAttribute('aria-label', enabled ? 'Switch to light mode' : 'Switch to dark mode');
}
},
        /**
* Toggle dark mode
*/
toggle: function() {
const isDark = document.documentElement.classList.contains(DARK_CLASS);
this.setDarkMode(!isDark);
},
        /**
* Check if dark mode is enabled
*/
isDark: function() {
return document.documentElement.classList.contains(DARK_CLASS);
},
        /**
* Create toggle button
*/
createToggleButton: function() {
            // Check if button already exists
if (document.getElementById('dark-mode-toggle')) {
return;
}
            // Find navigation or header to insert button
const nav = document.querySelector('.top-nav, .nav-right, nav, header');
if (!nav) {
return;
}
const button = document.createElement('button');
button.id = 'dark-mode-toggle';
button.className = 'dark-mode-toggle';
button.setAttribute('aria-label', this.isDark() ? 'Switch to light mode' : 'Switch to dark mode');
button.textContent = this.isDark() ? '☀️' : '🌙';
button.onclick = () => this.toggle();
            // Insert into nav
if (nav.classList.contains('nav-right')) {
nav.insertBefore(button, nav.firstChild);
} else if (nav.querySelector('.nav-right')) {
nav.querySelector('.nav-right').insertBefore(button, nav.querySelector('.nav-right').firstChild);
} else {
nav.appendChild(button);
}
}
};
    // Initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => DarkMode.init());
} else {
DarkMode.init();
}
    // Make globally available
window.DarkMode = DarkMode;
})();