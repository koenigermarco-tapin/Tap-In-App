// Silent Error Handler - No User Notifications
// Only logs to console, never shows toasts
window.addEventListener('error', (event) => {
    // Suppress expected errors (service worker, favicon, analytics, etc.)
const target = event.target;
const isScript = target && target.tagName === 'SCRIPT';
const isLink = target && target.tagName === 'LINK';
const src = target ? (target.src || target.href || '') : '';
    // Don't log errors for: service worker, favicon, analytics, or non-critical resources
if (src.includes('service-worker') || src.includes('sw.js') ||
src.includes('favicon') || src.includes('analytics') ||
src.includes('google-analytics') || event.message.includes('Script error')) {
return; // Silent suppression
}
    // Only log to console, NEVER show toast
    console.error('Resource failed to load:', src || event.message);
event.preventDefault();
});
window.addEventListener('unhandledrejection', (event) => {
    // Suppress service worker errors during uninstall
const reason = event.reason ? event.reason.toString() : '';
if (reason.includes('Service Worker') || reason.includes('serviceWorker') ||
reason.includes('sw.js') || reason.includes('Failed to register')) {
return; // Silent suppression
}
    // Only log to console, NEVER show toast
    console.error('Unhandled promise rejection:', event.reason);
event.preventDefault();
});
// NO showErrorToast function - errors are silent