// Global Error Handler - Silent (No User Notifications)
const ErrorHandler = {
    init() {
        window.addEventListener('error', (event) => {
            this.handleError({
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                message: event.reason?.message || String(event.reason),
                type: 'Promise Rejection',
                error: event.reason
            });
        });
        
        console.log('✅ Global Error Handler initialized (silent mode)');
    },
    
    handleError(errorInfo) {
        // Only log to console - NO USER NOTIFICATIONS
        console.error('🚨 Error caught:', errorInfo);
        
        // Save to localStorage for debugging (optional)
        try {
            const errors = JSON.parse(localStorage.getItem('tapin_errors') || '[]');
            errors.push({
                ...errorInfo,
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
            
            // Keep only last 50 errors
            if (errors.length > 50) {
                errors.shift();
            }
            
            localStorage.setItem('tapin_errors', JSON.stringify(errors));
        } catch (e) {
            console.error('Failed to save error:', e);
        }
        
        // REMOVED: Toast notification - errors are now silent
        // Users will NOT see error messages
    },
    
    getErrorLog() {
        try {
            return JSON.parse(localStorage.getItem('tapin_errors') || '[]');
        } catch (e) {
            return [];
        }
    },
    
    clearErrorLog() {
        localStorage.removeItem('tapin_errors');
    }
};

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        ErrorHandler.init();
    });
}

window.ErrorHandler = ErrorHandler;

