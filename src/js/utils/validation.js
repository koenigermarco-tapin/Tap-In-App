/**
 * TAP-IN Input Validation Utility
 * Provides consistent validation across the platform
 */

const TapInValidator = {

  // Validation patterns
  patterns: {
    teamCode: /^TEAM-[A-Z0-9]{4,20}$/i,
    backupCode: /^TAP-[A-Z0-9]{4}-[A-Z0-9]{4}$/i,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-ZäöüÄÖÜß\s\-']{2,50}$/,
    alphanumeric: /^[a-zA-Z0-9]+$/
  },

  // Cheat codes for development/testing (belt unlocks)
  cheatCodes: {
    'WHITE-START-2024': 'white',
    'BLUE-START-2024': 'blue',
    'PURPLE-START-2024': 'purple',
    'BROWN-START-2024': 'brown',
    'BLACK-START-2024': 'black',
    'BLUE-BELT': 'blue',
    'PURPLE-BELT': 'purple',
    'BROWN-BELT': 'brown',
    'BLACK-BELT': 'black',
    'MASTER-KEY': 'black',
    'HELIO-GRACIE': 'black'
  },

  // Sanitize input to prevent XSS
  sanitize(input) {
    if (typeof input !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  // Sanitize and trim
  clean(input) {
    return this.sanitize(input.trim());
  },

  // Validate team code format
  validateTeamCode(code) {
    const cleaned = code.toUpperCase().trim();
    
    // Check if it's a special team code
    if (cleaned === 'TEAM-ROOTS' || cleaned === 'ROOTS') {
      return { valid: true, code: 'TEAM-ROOTS', isSpecial: true };
    }

    // Check standard format
    if (this.patterns.teamCode.test(cleaned)) {
      return { valid: true, code: cleaned, isSpecial: false };
    }

    return { 
      valid: false, 
      error: 'Invalid team code format. Expected: TEAM-XXXX' 
    };
  },

  // Validate backup code or cheat code
  validateBackupCode(code) {
    const cleaned = code.toUpperCase().trim().replace(/\s+/g, '-');
    
    // Check if it's a cheat code
    if (this.cheatCodes[cleaned]) {
      return { 
        valid: true, 
        code: cleaned, 
        isCheatCode: true, 
        belt: this.cheatCodes[cleaned] 
      };
    }

    // Check backup code format
    if (this.patterns.backupCode.test(cleaned)) {
      return { valid: true, code: cleaned, isCheatCode: false };
    }

    return { 
      valid: false, 
      error: 'Invalid code format. Expected: TAP-XXXX-XXXX' 
    };
  },

  // Validate email
  validateEmail(email) {
    const cleaned = email.trim().toLowerCase();
    
    if (!cleaned) {
      return { valid: false, error: 'Email is required' };
    }

    if (!this.patterns.email.test(cleaned)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }

    return { valid: true, email: cleaned };
  },

  // Validate name
  validateName(name) {
    const cleaned = this.clean(name);
    
    if (!cleaned) {
      return { valid: false, error: 'Name is required' };
    }

    if (cleaned.length < 2) {
      return { valid: false, error: 'Name must be at least 2 characters' };
    }

    if (cleaned.length > 50) {
      return { valid: false, error: 'Name must be less than 50 characters' };
    }

    if (!this.patterns.name.test(cleaned)) {
      return { valid: false, error: 'Name contains invalid characters' };
    }

    return { valid: true, name: cleaned };
  },

  // Validate required field
  validateRequired(value, fieldName = 'This field') {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return { valid: false, error: `${fieldName} is required` };
    }
    return { valid: true, value: typeof value === 'string' ? value.trim() : value };
  },

  // Validate form with multiple fields
  validateForm(formData, rules) {
    const errors = {};
    const cleanedData = {};

    for (const [field, value] of Object.entries(formData)) {
      const rule = rules[field];
      if (!rule) {
        cleanedData[field] = value;
        continue;
      }

      let result;
      switch (rule.type) {
        case 'email':
          result = this.validateEmail(value);
          break;
        case 'name':
          result = this.validateName(value);
          break;
        case 'teamCode':
          result = this.validateTeamCode(value);
          break;
        case 'backupCode':
          result = this.validateBackupCode(value);
          break;
        case 'required':
          result = this.validateRequired(value, rule.label);
          break;
        default:
          result = { valid: true, value };
      }

      if (!result.valid) {
        errors[field] = result.error;
      } else {
        cleanedData[field] = result[Object.keys(result).find(k => k !== 'valid')] || value;
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      data: cleanedData
    };
  },

  // Show field error
  showFieldError(inputElement, message) {
    // Remove existing error
    this.clearFieldError(inputElement);

    // Add error class to input
    inputElement.classList.add('tapin-input--error');

    // Create error message
    const errorEl = document.createElement('div');
    errorEl.className = 'tapin-field-error';
    errorEl.innerHTML = `
      <svg class="hi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${this.sanitize(message)}</span>
    `;

    // Insert after input
    inputElement.parentNode.insertBefore(errorEl, inputElement.nextSibling);

    // Focus input
    inputElement.focus();
  },

  // Clear field error
  clearFieldError(inputElement) {
    inputElement.classList.remove('tapin-input--error');
    const errorEl = inputElement.parentNode.querySelector('.tapin-field-error');
    if (errorEl) errorEl.remove();
  },

  // Clear all errors in a form
  clearFormErrors(formElement) {
    formElement.querySelectorAll('.tapin-input--error').forEach(el => {
      el.classList.remove('tapin-input--error');
    });
    formElement.querySelectorAll('.tapin-field-error').forEach(el => el.remove());
  }
};

// Make globally available
window.TapInValidator = TapInValidator;

