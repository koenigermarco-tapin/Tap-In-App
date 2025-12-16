/**
 * TAP-IN Global Error Handler
 * Provides consistent error handling across the platform
 */

const TapInErrorHandler = {
  
  // Error types with user-friendly messages
  errorMessages: {
    STORAGE_UNAVAILABLE: {
      title: 'Storage Unavailable',
      message: 'Your browser doesn\'t support local storage or it\'s disabled. Your progress won\'t be saved.',
      action: 'Enable cookies and local storage in your browser settings.'
    },
    STORAGE_QUOTA: {
      title: 'Storage Full',
      message: 'Your browser storage is full. Some data may not be saved.',
      action: 'Clear some browser data or export your progress first.'
    },
    STORAGE_CORRUPTED: {
      title: 'Data Error',
      message: 'Some of your saved data appears corrupted.',
      action: 'You can restore from a backup code or start fresh.'
    },
    NETWORK_ERROR: {
      title: 'Connection Issue',
      message: 'Unable to load some resources.',
      action: 'Check your internet connection and refresh.'
    },
    VALIDATION_ERROR: {
      title: 'Invalid Input',
      message: 'Please check your input and try again.',
      action: null
    },
    UNKNOWN_ERROR: {
      title: 'Something Went Wrong',
      message: 'An unexpected error occurred.',
      action: 'Try refreshing the page.'
    }
  },

  // Check if localStorage is available
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  // Get remaining storage quota (approximate)
  getStorageQuota() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage.getItem(key).length * 2; // UTF-16 = 2 bytes per char
      }
    }
    return {
      used: total,
      usedMB: (total / 1024 / 1024).toFixed(2),
      estimatedLimit: 5 * 1024 * 1024, // 5MB typical
      percentUsed: ((total / (5 * 1024 * 1024)) * 100).toFixed(1)
    };
  },

  // Safe localStorage get with error handling
  safeGet(key, defaultValue = null) {
    if (!this.isStorageAvailable()) {
      this.showToast('STORAGE_UNAVAILABLE');
      return defaultValue;
    }
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}":`, e);
      return defaultValue;
    }
  },

  // Safe localStorage set with quota handling
  safeSet(key, value) {
    if (!this.isStorageAvailable()) {
      this.showToast('STORAGE_UNAVAILABLE');
      return false;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        this.showToast('STORAGE_QUOTA');
        this.cleanupOldData();
        // Retry once after cleanup
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (retryError) {
          return false;
        }
      }
      console.error(`Error setting localStorage key "${key}":`, e);
      return false;
    }
  },

  // Safe localStorage remove
  safeRemove(key) {
    if (!this.isStorageAvailable()) return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error removing localStorage key "${key}":`, e);
      return false;
    }
  },

  // Cleanup old/temporary data when quota is exceeded
  cleanupOldData() {
    const expendableKeys = [
      'tempData',
      'debugLog',
      'lastViewedLesson',
      'sessionStart'
    ];
    expendableKeys.forEach(key => {
      try { localStorage.removeItem(key); } catch (e) {}
    });
  },

  // Show toast notification
  showToast(errorType, customMessage = null, duration = 5000) {
    const error = this.errorMessages[errorType] || this.errorMessages.UNKNOWN_ERROR;
    
    // Remove existing toast
    const existingToast = document.querySelector('.tapin-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'tapin-toast tapin-toast--error';
    toast.innerHTML = `
      <div class="tapin-toast__icon">
        <svg class="hi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div class="tapin-toast__content">
        <strong class="tapin-toast__title">${error.title}</strong>
        <p class="tapin-toast__message">${customMessage || error.message}</p>
        ${error.action ? `<small class="tapin-toast__action">${error.action}</small>` : ''}
      </div>
      <button class="tapin-toast__close" onclick="this.parentElement.remove()">
        <svg class="hi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    `;

    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => toast.classList.add('tapin-toast--visible'));
    
    // Auto-remove
    setTimeout(() => {
      toast.classList.remove('tapin-toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);

    return toast;
  },

  // Show success toast
  showSuccess(title, message, duration = 3000) {
    const existingToast = document.querySelector('.tapin-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'tapin-toast tapin-toast--success';
    toast.innerHTML = `
      <div class="tapin-toast__icon">
        <svg class="hi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div class="tapin-toast__content">
        <strong class="tapin-toast__title">${title}</strong>
        <p class="tapin-toast__message">${message}</p>
      </div>
      <button class="tapin-toast__close" onclick="this.parentElement.remove()">
        <svg class="hi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    `;

    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('tapin-toast--visible'));
    
    setTimeout(() => {
      toast.classList.remove('tapin-toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);

    return toast;
  },

  // Show loading overlay
  showLoading(message = 'Loading...') {
    const existingLoader = document.querySelector('.tapin-loader-overlay');
    if (existingLoader) return existingLoader;

    const loader = document.createElement('div');
    loader.className = 'tapin-loader-overlay';
    loader.innerHTML = `
      <div class="tapin-loader">
        <div class="tapin-loader__spinner"></div>
        <p class="tapin-loader__message">${message}</p>
      </div>
    `;

    document.body.appendChild(loader);
    requestAnimationFrame(() => loader.classList.add('tapin-loader-overlay--visible'));
    
    return loader;
  },

  // Hide loading overlay
  hideLoading() {
    const loader = document.querySelector('.tapin-loader-overlay');
    if (loader) {
      loader.classList.remove('tapin-loader-overlay--visible');
      setTimeout(() => loader.remove(), 300);
    }
  },

  // Log error for debugging (could be sent to analytics)
  logError(context, error) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      context,
      message: error.message,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    console.error('[TAP-IN Error]', errorLog);
    
    // Store last 10 errors for debugging
    const errors = this.safeGet('tapinErrorLog', []);
    errors.unshift(errorLog);
    if (errors.length > 10) errors.pop();
    this.safeSet('tapinErrorLog', errors);
  }
};

// Make globally available
window.TapInErrorHandler = TapInErrorHandler;
window.safeGet = (key, defaultValue) => TapInErrorHandler.safeGet(key, defaultValue);
window.safeSet = (key, value) => TapInErrorHandler.safeSet(key, value);

