// TAP-IN Keyboard Navigation
// Handles keyboard shortcuts and accessibility
(function() {
'use strict';
    // Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
        // Escape key - close modals
if (e.key === 'Escape') {
const modals = document.querySelectorAll('.modal, [role="dialog"]');
modals.forEach(modal => {
if (modal.style.display !== 'none') {
modal.style.display = 'none';
}
});
}
        // Tab key - ensure visible focus
if (e.key === 'Tab') {
document.body.classList.add('keyboard-nav-active');
}
});
    // Remove keyboard class on mouse use
document.addEventListener('mousedown', function() {
document.body.classList.remove('keyboard-nav-active');
});
    // Add focus outline styles
const style = document.createElement('style');
style.textContent = `
body:not(.keyboard-nav-active) *:focus {
outline: none;
}
body.keyboard-nav-active *:focus {
outline: 2px solid #667eea;
outline-offset: 2px;
}
`;
document.head.appendChild(style);
    console.log('✅ Keyboard navigation initialized');
})();