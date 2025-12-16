/**
* TAP-IN Icon Initialization
* Initialize Lucide icons on page load
*/
(function() {
'use strict';
    // Initialize Lucide icons when DOM is ready
function initLucideIcons() {
if (typeof lucide !== 'undefined') {
lucide.createIcons();
            // Re-initialize after dynamic content loads
const observer = new MutationObserver(function(mutations) {
let shouldReinit = false;
mutations.forEach(function(mutation) {
if (mutation.addedNodes.length) {
shouldReinit = true;
}
});
if (shouldReinit) {
lucide.createIcons();
}
});
            // Observe document body for changes
observer.observe(document.body, {
childList: true,
subtree: true
});
}
}
    // Run when DOM is ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', initLucideIcons);
} else {
initLucideIcons();
}
    // Also run after a short delay to catch late-loading content
setTimeout(initLucideIcons, 500);
})();