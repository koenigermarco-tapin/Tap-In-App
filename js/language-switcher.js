/**
* TAP-IN Language Switcher
* Handles language switching between English and German
*/
(function() {
'use strict';
const LanguageSwitcher = {
currentLang: 'en',
init: function() {
            // Get current language from localStorage or detect from URL
const storedLang = localStorage.getItem('preferredLanguage');
const urlLang = window.location.pathname.includes('-de.html') ? 'de' : 'en';
this.currentLang = storedLang || urlLang;
this.updateUI();
this.attachEventListeners();
},
attachEventListeners: function() {
            // Language toggle buttons
const langToggles = document.querySelectorAll('[data-lang], .lang-toggle, .lang-option');
langToggles.forEach(toggle => {
toggle.addEventListener('click', (e) => {
e.preventDefault();
const targetLang = toggle.dataset.lang || toggle.getAttribute('data-lang');
if (targetLang) {
this.switchLanguage(targetLang);
}
});
});
},
switchLanguage: function(lang) {
if (lang === this.currentLang) return;
this.currentLang = lang;
localStorage.setItem('preferredLanguage', lang);
            // Redirect to language-specific page
const currentPath = window.location.pathname;
let newPath;
if (lang === 'de') {
                // Switch to German version
newPath = currentPath.replace('.html', '-de.html').replace('-de-de.html', '-de.html');
} else {
                // Switch to English version
newPath = currentPath.replace('-de.html', '.html');
}
if (newPath !== currentPath) {
window.location.href = newPath;
}
},
updateUI: function() {
            // Update language indicators
const indicators = document.querySelectorAll('.current-lang, [data-current-lang]');
indicators.forEach(indicator => {
indicator.textContent = this.currentLang.toUpperCase();
});
},
getCurrentLang: function() {
return this.currentLang;
}
};
    // Initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => LanguageSwitcher.init());
} else {
LanguageSwitcher.init();
}
    // Export to global scope
window.LanguageSwitcher = LanguageSwitcher;
})();