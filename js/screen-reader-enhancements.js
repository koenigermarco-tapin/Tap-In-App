/**
* TAP-IN Screen Reader Enhancements
* Adds aria-live regions, enhanced announcements, and improved accessibility
*/
const ScreenReaderEnhancements = {
    /**
* Create aria-live region for announcements
*/
createLiveRegion: function(priority = 'polite') {
let region = document.getElementById('sr-live-region');
if (!region) {
region = document.createElement('div');
region.id = 'sr-live-region';
region.setAttribute('role', 'status');
region.setAttribute('aria-live', priority);
region.setAttribute('aria-atomic', 'true');
region.className = 'sr-only';
region.style.cssText = `
position: absolute;
left: -10000px;
width: 1px;
height: 1px;
overflow: hidden;
`;
document.body.appendChild(region);
}
return region;
},
    /**
* Announce message to screen readers
*/
announce: function(message, priority = 'polite') {
const region = this.createLiveRegion(priority);
        // Clear previous message
region.textContent = '';
        // Set new message after a brief delay
setTimeout(() => {
region.textContent = message;
            // Clear after announcement (for polite priority)
if (priority === 'polite') {
setTimeout(() => {
region.textContent = '';
}, 1000);
}
}, 100);
},
    /**
* Announce page changes
*/
announcePageChange: function(pageName) {
this.announce(`Navigated to ${pageName}`, 'polite');
},
    /**
* Announce form errors
*/
announceFormError: function(errorMessage) {
this.announce(`Error: ${errorMessage}`, 'assertive');
},
    /**
* Announce success messages
*/
announceSuccess: function(message) {
this.announce(`Success: ${message}`, 'polite');
},
    /**
* Enhance form inputs with better descriptions
*/
enhanceFormInputs: function() {
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
            // Skip if already enhanced
if (input.dataset.srEnhanced === 'true') {
return;
}
input.dataset.srEnhanced = 'true';
            // Add aria-describedby if there's a hint or error
const hint = input.closest('.input-group')?.querySelector('.input-hint');
const error = input.closest('.input-group')?.querySelector('.input-error');
if (hint || error) {
const ids = [];
if (hint) {
if (!hint.id) {
hint.id = `hint-${Math.random().toString(36).substr(2, 9)}`;
}
ids.push(hint.id);
}
if (error) {
if (!error.id) {
error.id = `error-${Math.random().toString(36).substr(2, 9)}`;
}
ids.push(error.id);
}
if (ids.length > 0) {
input.setAttribute('aria-describedby', ids.join(' '));
}
}
            // Enhance required fields
if (input.required && !input.getAttribute('aria-required')) {
input.setAttribute('aria-required', 'true');
}
            // Add aria-label if missing but has placeholder
if (!input.getAttribute('aria-label') && input.placeholder) {
input.setAttribute('aria-label', input.placeholder);
}
});
},
    /**
* Enhance buttons with better labels
*/
enhanceButtons: function() {
const buttons = document.querySelectorAll('button, [role="button"]');
buttons.forEach(button => {
            // Skip if already enhanced
if (button.dataset.srEnhanced === 'true') {
return;
}
button.dataset.srEnhanced = 'true';
            // Add aria-label if button only has icon
const text = button.textContent.trim();
const hasIcon = button.querySelector('svg, i, [class*="icon"]');
if (hasIcon && (!text || text.length < 3)) {
const title = button.title || button.getAttribute('aria-label');
if (!title) {
                    // Try to infer from context
const context = button.getAttribute('onclick') ||
button.className ||
button.parentElement?.className;
if (context) {
const label = this.inferButtonLabel(context);
if (label) {
button.setAttribute('aria-label', label);
}
}
}
}
            // Enhance loading states
if (button.classList.contains('loading')) {
button.setAttribute('aria-busy', 'true');
button.setAttribute('aria-label',
(button.getAttribute('aria-label') || button.textContent) + ', loading');
}
});
},
    /**
* Infer button label from context
*/
inferButtonLabel: function(context) {
const patterns = {
'close': 'Close',
'menu': 'Menu',
'search': 'Search',
'submit': 'Submit',
'next': 'Next',
'prev': 'Previous',
'delete': 'Delete',
'edit': 'Edit',
'save': 'Save',
'cancel': 'Cancel',
'back': 'Back',
'home': 'Home'
};
const lowerContext = context.toLowerCase();
for (const [key, value] of Object.entries(patterns)) {
if (lowerContext.includes(key)) {
return value;
}
}
return null;
},
    /**
* Enhance dynamic content updates
*/
enhanceDynamicContent: function() {
        // Watch for content changes and announce
const observer = new MutationObserver((mutations) => {
mutations.forEach((mutation) => {
if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if added content should be announced
mutation.addedNodes.forEach((node) => {
if (node.nodeType === 1) { // Element node
                            // Check for success/error messages
if (node.classList) {
if (node.classList.contains('success') ||
node.classList.contains('alert-success')) {
const message = node.textContent.trim();
if (message) {
this.announceSuccess(message);
}
}
if (node.classList.contains('error') ||
node.classList.contains('alert-error')) {
const message = node.textContent.trim();
if (message) {
this.announceFormError(message);
}
}
}
}
});
}
});
});
        // Observe body for dynamic content
observer.observe(document.body, {
childList: true,
subtree: true
});
},
    /**
* Enhance navigation announcements
*/
enhanceNavigation: function() {
const links = document.querySelectorAll('a[href]');
links.forEach(link => {
link.addEventListener('focus', () => {
const text = link.textContent.trim() || link.getAttribute('aria-label');
if (text) {
                    // Announce link context
const isInternal = !link.hostname || link.hostname === window.location.hostname;
if (isInternal) {
                        // Don't announce on every focus, only important links
if (link.classList.contains('nav-link') ||
link.getAttribute('role') === 'menuitem') {
                            // Announce navigation links
}
}
}
});
});
},
    /**
* Initialize all enhancements
*/
init: function() {
        // Create live region
this.createLiveRegion();
        // Enhance forms
this.enhanceFormInputs();
        // Enhance buttons
this.enhanceButtons();
        // Enhance dynamic content
this.enhanceDynamicContent();
        // Enhance navigation
this.enhanceNavigation();
        // Announce page load
const pageTitle = document.title || 'page';
this.announce(`Loaded ${pageTitle}`, 'polite');
        console.log('🔊 Screen reader enhancements initialized');
}
};
// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => ScreenReaderEnhancements.init());
} else {
ScreenReaderEnhancements.init();
}
// Export to global scope
window.ScreenReaderEnhancements = ScreenReaderEnhancements;