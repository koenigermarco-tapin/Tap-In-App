/**
* TAP-IN Focus Management System
* Implements focus traps, focus restoration, and enhanced keyboard navigation
*/
const FocusManagement = {
    /**
* Trap focus within a container (for modals, popups)
*/
trapFocus: function(container) {
if (!container) return null;
        // Get all focusable elements
const focusable = container.querySelectorAll(
'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
);
if (focusable.length === 0) return null;
const firstFocusable = focusable[0];
const lastFocusable = focusable[focusable.length - 1];
        // Store previously focused element
const previouslyFocused = document.activeElement;
        // Focus first element
firstFocusable.focus();
        // Handle Tab key
const handleTab = (e) => {
if (e.key !== 'Tab') return;
if (e.shiftKey) {
                // Shift + Tab
if (document.activeElement === firstFocusable) {
e.preventDefault();
lastFocusable.focus();
}
} else {
                // Tab
if (document.activeElement === lastFocusable) {
e.preventDefault();
firstFocusable.focus();
}
}
};
        // Handle Escape key
const handleEscape = (e) => {
if (e.key === 'Escape') {
this.releaseFocus(container);
if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
previouslyFocused.focus();
}
}
};
container.addEventListener('keydown', handleTab);
container.addEventListener('keydown', handleEscape);
        // Store handlers for cleanup
container._focusHandlers = {
tab: handleTab,
escape: handleEscape,
previouslyFocused: previouslyFocused
};
return {
release: () => this.releaseFocus(container)
};
},
    /**
* Release focus trap
*/
releaseFocus: function(container) {
if (!container || !container._focusHandlers) return;
const handlers = container._focusHandlers;
container.removeEventListener('keydown', handlers.tab);
container.removeEventListener('keydown', handlers.escape);
delete container._focusHandlers;
        // Restore focus to previously focused element
if (handlers.previouslyFocused && typeof handlers.previouslyFocused.focus === 'function') {
try {
handlers.previouslyFocused.focus();
} catch (e) {
                console.warn('Could not restore focus:', e);
}
}
},
    /**
* Initialize focus management for all modals on page
*/
init: function() {
        // Auto-trap focus in modals
document.addEventListener('DOMContentLoaded', () => {
this.initModals();
this.initPopups();
});
        // Watch for dynamically created modals
const observer = new MutationObserver((mutations) => {
mutations.forEach((mutation) => {
mutation.addedNodes.forEach((node) => {
if (node.nodeType === 1) { // Element node
if (node.classList && (node.classList.contains('modal') || node.classList.contains('popup'))) {
this.trapFocus(node);
}
                        // Check children
const modals = node.querySelectorAll?.('.modal, .popup, [role="dialog"]');
if (modals) {
modals.forEach(modal => this.trapFocus(modal));
}
}
});
});
});
observer.observe(document.body, {
childList: true,
subtree: true
});
        console.log('🎯 Focus management initialized');
},
    /**
* Initialize existing modals
*/
initModals: function() {
const modals = document.querySelectorAll('.modal, .popup, [role="dialog"]');
modals.forEach(modal => {
if (modal.style.display !== 'none' && modal.offsetParent !== null) {
this.trapFocus(modal);
}
});
},
    /**
* Initialize popups
*/
initPopups: function() {
const popups = document.querySelectorAll('.popup, .toast, .notification');
popups.forEach(popup => {
if (popup.offsetParent !== null) {
this.trapFocus(popup);
}
});
},
    /**
* Enhance skip links
*/
enhanceSkipLinks: function() {
const skipLinks = document.querySelectorAll('.skip-link, a[href^="#"]');
skipLinks.forEach(link => {
link.addEventListener('click', (e) => {
const targetId = link.getAttribute('href').substring(1);
const target = document.getElementById(targetId);
if (target) {
e.preventDefault();
target.setAttribute('tabindex', '-1');
target.focus();
target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Remove tabindex after focus
setTimeout(() => {
target.removeAttribute('tabindex');
}, 100);
}
});
});
},
    /**
* Announce to screen readers
*/
announce: function(message, priority = 'polite') {
const announcement = document.createElement('div');
announcement.setAttribute('role', 'status');
announcement.setAttribute('aria-live', priority);
announcement.setAttribute('aria-atomic', 'true');
announcement.className = 'sr-only';
announcement.textContent = message;
document.body.appendChild(announcement);
setTimeout(() => {
document.body.removeChild(announcement);
}, 1000);
}
};
// Auto-initialize
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => FocusManagement.init());
} else {
FocusManagement.init();
}
// Enhance skip links
FocusManagement.enhanceSkipLinks();
// Export to global scope
window.FocusManagement = FocusManagement;