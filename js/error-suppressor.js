/**
* TAP-IN Error Suppressor
* Catches and handles errors gracefully
*/
// Suppress console errors in production
const ErrorSuppressor = {
errors: [],
init() {
        // Track errors silently
this.errors = [];
        // Override console.error to log but not display
const originalError = console.error;
const self = this;
console.error = function(...args) {
self.errors.push({
message: args,
timestamp: new Date().toISOString()
});
            // Only log in development (when localhost)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
originalError.apply(console, args);
}
};
        // Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
event.preventDefault(); // Prevent default error display
this.errors.push({
type: 'unhandledRejection',
message: event.reason,
timestamp: new Date().toISOString()
});
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
');
}
});
        // Catch global errors
window.addEventListener('error', (event) => {
event.preventDefault(); // Prevent default error display
this.errors.push({
type: 'error',
message: event.message,
source: event.filename,
line: event.lineno,
timestamp: new Date().toISOString()
});
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
');
}
});
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('✅ Error suppressor initialized');
}
},
    // Get error log (for debugging)
getErrors() {
return this.errors;
},
    // Clear error log
clearErrors() {
this.errors = [];
}
};
// Initialize immediately
ErrorSuppressor.init();
window.ErrorSuppressor = ErrorSuppressor;