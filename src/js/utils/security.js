/**
 * TAP-IN Security Utility
 * XSS protection and input sanitization
 */

const TapInSecurity = {
  
  // Sanitize string for safe HTML insertion
  escapeHtml(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },
  
  // Sanitize object recursively
  sanitizeObject(obj) {
    if (typeof obj === 'string') {
      return this.escapeHtml(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }
    if (obj && typeof obj === 'object') {
      const sanitized = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[this.escapeHtml(key)] = this.sanitizeObject(value);
      }
      return sanitized;
    }
    return obj;
  },
  
  // Safe innerHTML setter
  safeSetHtml(element, html) {
    if (!element) return;
    
    // Create a temporary container
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Remove dangerous elements
    const dangerous = temp.querySelectorAll('script, iframe, object, embed, form');
    dangerous.forEach(el => el.remove());
    
    // Remove dangerous attributes
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(el => {
      const attrs = Array.from(el.attributes);
      attrs.forEach(attr => {
        // Remove event handlers and javascript: URLs
        if (attr.name.startsWith('on') || 
            (attr.value && attr.value.toLowerCase().includes('javascript:'))) {
          el.removeAttribute(attr.name);
        }
      });
    });
    
    element.innerHTML = temp.innerHTML;
  },
  
  // Safe text content setter
  safeSetText(element, text) {
    if (!element) return;
    element.textContent = text;
  },
  
  // Validate URL is safe
  isUrlSafe(url) {
    if (!url) return false;
    try {
      const parsed = new URL(url, window.location.origin);
      // Only allow http/https and same-origin relative URLs
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },
  
  // Safe redirect
  safeRedirect(url) {
    if (this.isUrlSafe(url)) {
      window.location.href = url;
    } else {
      console.error('Blocked unsafe redirect:', url);
    }
  }
};

window.TapInSecurity = TapInSecurity;

// Override dangerous innerHTML usage (monitoring only)
(function() {
  const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  
  if (originalInnerHTML && originalInnerHTML.set) {
    const originalSet = originalInnerHTML.set;
    
    Object.defineProperty(Element.prototype, 'innerHTML', {
      set: function(value) {
        // Log potential XSS attempts in development
        if (typeof value === 'string' && 
            (value.includes('<script') || value.includes('javascript:'))) {
          console.warn('[Security] Potentially unsafe innerHTML detected:', 
            value.substring(0, 100));
        }
        return originalSet.call(this, value);
      },
      get: originalInnerHTML.get
    });
  }
})();

