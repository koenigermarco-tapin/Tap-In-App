/**
* TAP-IN Unified Error Handling System
* Single source of truth for all error handling
*/
(function() {
'use strict';
    // Prevent multiple registrations
if (window.__TAPIN_ERROR_SYSTEM_LOADED) {
return;
}
window.__TAPIN_ERROR_SYSTEM_LOADED = true;
const ErrorSystem = {
        // Error severity levels
SEVERITY: {
SILENT: 0, // Don't log, don't show
DEBUG: 1, // Debug log only
INFO: 2, // Console log
WARN: 3, // Console warn
ERROR: 4, // Console error
USER: 5 // Show to user
},
        // Expected error patterns (should be silent)
EXPECTED_ERRORS: [
'service-worker', 'serviceWorker', 'sw.js',
'favicon', 'favicon.ico',
'analytics', 'google-analytics', 'gtag',
'Script error', 'net::ERR_', 'NetworkError',
'Extension context', 'chrome-extension',
'Failed to load resource',
'quota exceeded', 'QUOTA_EXCEEDED'
],
        // Initialize error system
init: function() {
this.setupErrorHandler();
this.setupRejectionHandler();
this.setupConsoleErrorHandler();
            console.log('✅ TAP-IN Unified Error System initialized');
},
        // Main error handler
setupErrorHandler: function() {
window.addEventListener('error', (event) => {
const errorInfo = {
message: event.message || '',
source: event.target ? (event.target.src || event.target.href || '') : '',
filename: event.filename || '',
lineno: event.lineno || 0,
colno: event.colno || 0,
error: event.error
};
this.handleError(errorInfo, 'window.error');
event.preventDefault(); // Prevent default error handling
}, true); // Use capture phase
},
        // Unhandled rejection handler
setupRejectionHandler: function() {
window.addEventListener('unhandledrejection', (event) => {
const reason = event.reason ? event.reason.toString() : '';
const errorInfo = {
message: reason,
type: 'Promise Rejection',
error: event.reason
};
this.handleError(errorInfo, 'unhandledrejection');
event.preventDefault(); // Prevent default handling
});
},
        // Override console.error to catch all errors
setupConsoleErrorHandler: function() {
const originalError = console.error;
console.error = (...args) => {
                // Check if it's an expected error
const errorStr = args.join(' ');
if (this.isExpectedError(errorStr)) {
if (console.debug) {
                        console.debug('[Suppressed]', ...args);
}
return; // Don't log expected errors
}
                // Log unexpected errors
originalError.apply(console, args);
};
},
        // Check if error is expected/non-critical
isExpectedError: function(errorStr) {
if (!errorStr) return true;
const lowerError = errorStr.toLowerCase();
return this.EXPECTED_ERRORS.some(pattern =>
lowerError.includes(pattern.toLowerCase())
);
},
        // Determine error severity
getSeverity: function(errorInfo) {
const combined = (errorInfo.message || '') + ' ' + (errorInfo.source || '');
if (this.isExpectedError(combined)) {
return this.SEVERITY.SILENT;
}
            // User-facing errors (broken features)
if (errorInfo.message.includes('Cannot read property') ||
errorInfo.message.includes('is not defined') ||
errorInfo.message.includes('Failed to execute')) {
return this.SEVERITY.USER;
}
            // Background errors (network, cache, etc.)
if (errorInfo.message.includes('fetch') ||
errorInfo.message.includes('network') ||
errorInfo.message.includes('cache')) {
return this.SEVERITY.DEBUG;
}
return this.SEVERITY.WARN;
},
        // Handle error based on severity
handleError: function(errorInfo, source) {
const severity = this.getSeverity(errorInfo);
switch (severity) {
case this.SEVERITY.SILENT:
                    // Do nothing - expected error
return;
case this.SEVERITY.DEBUG:
if (console.debug) {
);
}
break;
case this.SEVERITY.WARN:
                    console.warn(`[${source}]`, errorInfo);
break;
case this.SEVERITY.ERROR:
                    console.error(`[${source}]`, errorInfo);
break;
case this.SEVERITY.USER:
                    // Only show to user if function exists and error is critical
if (typeof showToast === 'function') {
showToast('Something went wrong. Please refresh if the problem persists.', 'error');
}
                    console.error(`[${source} - USER FACING]`, errorInfo);
break;
}
            // Store for debugging (optional)
this.storeError(errorInfo, severity, source);
},
        // Store error for debugging (optional)
storeError: function(errorInfo, severity, source) {
if (severity === this.SEVERITY.SILENT || severity === this.SEVERITY.DEBUG) {
return; // Don't store expected/debug errors
}
try {
const errors = JSON.parse(localStorage.getItem('tapin_errors') || '[]');
errors.push({
...errorInfo,
severity,
source,
timestamp: Date.now(),
url: window.location.href
});
                // Keep only last 20 errors
if (errors.length > 20) {
errors.shift();
}
localStorage.setItem('tapin_errors', JSON.stringify(errors));
} catch (e) {
                // Silently fail - storage might be full
}
},
        // Get stored errors (for debugging)
getErrors: function() {
try {
return JSON.parse(localStorage.getItem('tapin_errors') || '[]');
} catch (e) {
return [];
}
},
        // Clear stored errors
clearErrors: function() {
localStorage.removeItem('tapin_errors');
}
};
    // Initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => ErrorSystem.init());
} else {
ErrorSystem.init();
}
    // Export
window.TapInErrorSystem = ErrorSystem;
})();