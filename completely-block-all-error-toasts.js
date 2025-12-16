// COMPLETE ERROR TOAST BLOCKER
// This must load FIRST and override showToast IMMEDIATELY
(function() {
'use strict';
    // Block showToast IMMEDIATELY - before anything else can use it
const originalShowToast = window.showToast;
window.showToast = function(message, type, duration) {
        // NEVER show error toasts - block completely
if (type === 'error' ||
(message && (
message.includes('went wrong') ||
message.includes('refresh') ||
message.includes('error') ||
message.toLowerCase().includes('something went wrong')
))) {
            // Completely silent - don't show anything
return;
}
        // Only allow success/info toasts
if (originalShowToast && typeof originalShowToast === 'function') {
            // Check if original doesn't handle errors
if (type !== 'error') {
originalShowToast(message, type, duration);
}
} else {
            // Fallback implementation for success/info only
const container = document.getElementById('toast-container');
if (!container) return;
const toast = document.createElement('div');
toast.style.cssText = `background: ${type === 'success' ? '#10b981' : '#3b82f6'}; color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); min-width: 300px; max-width: 500px; animation: slideInRight 0.3s ease; display: flex; align-items: center; gap: 0.75rem; font-weight: 500;`;
toast.innerHTML = `<span style="font-size: 1.25rem;">${type === 'success' ? '✅' : 'ℹ️'}</span><span>${message}</span>`;
container.appendChild(toast);
setTimeout(() => { toast.style.animation = 'slideOutRight 0.3s ease'; setTimeout(() => toast.remove(), 300); }, duration || 3000);
}
};
    // Also block TapInUtils.showToast if it exists
if (window.TapInUtils) {
window.TapInUtils.showToast = window.showToast;
}
})();