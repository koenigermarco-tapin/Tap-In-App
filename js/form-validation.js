/**
 * TAP-IN Form Validation Helper
 * Provides consistent form validation across all forms
 */

(function() {
    'use strict';

    const FormValidation = {
        init: function() {
            this.setupAllForms();
            this.addRealTimeValidation();
        },

        setupAllForms: function() {
            document.querySelectorAll('form').forEach(form => {
                // Add novalidate to prevent browser default, we'll handle it
                form.setAttribute('novalidate', 'novalidate');
                
                // Add submit handler
                form.addEventListener('submit', (e) => {
                    if (!this.validateForm(form)) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            });
        },

        validateForm: function(form) {
            let isValid = true;
            const errors = [];

            // Validate all inputs
            form.querySelectorAll('input, textarea, select').forEach(field => {
                const fieldErrors = this.validateField(field);
                if (fieldErrors.length > 0) {
                    isValid = false;
                    errors.push(...fieldErrors);
                    this.showFieldError(field, fieldErrors[0]);
                } else {
                    this.clearFieldError(field);
                }
            });

            // Show summary if errors
            if (!isValid) {
                this.showFormErrors(form, errors);
            } else {
                this.clearFormErrors(form);
            }

            return isValid;
        },

        validateField: function(field) {
            const errors = [];
            const value = field.value.trim();
            const type = field.type || field.tagName.toLowerCase();
            const required = field.hasAttribute('required') || field.getAttribute('aria-required') === 'true';

            // Required validation
            if (required && !value) {
                const label = this.getFieldLabel(field);
                errors.push(`${label || 'This field'} is required`);
                return errors;
            }

            // Skip further validation if empty and not required
            if (!value) {
                return errors;
            }

            // Email validation
            if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push('Please enter a valid email address');
                }
            }

            // URL validation
            if (type === 'url' && value) {
                try {
                    new URL(value);
                } catch {
                    errors.push('Please enter a valid URL');
                }
            }

            // Min length validation
            const minLength = field.getAttribute('minlength');
            if (minLength && value.length < parseInt(minLength)) {
                errors.push(`Must be at least ${minLength} characters`);
            }

            // Max length validation
            const maxLength = field.getAttribute('maxlength');
            if (maxLength && value.length > parseInt(maxLength)) {
                errors.push(`Must be no more than ${maxLength} characters`);
            }

            // Pattern validation
            const pattern = field.getAttribute('pattern');
            if (pattern && value) {
                const regex = new RegExp(pattern);
                if (!regex.test(value)) {
                    const title = field.getAttribute('title') || 'Invalid format';
                    errors.push(title);
                }
            }

            // Number range validation
            if (type === 'number') {
                const min = field.getAttribute('min');
                const max = field.getAttribute('max');
                const numValue = parseFloat(value);
                
                if (!isNaN(numValue)) {
                    if (min !== null && numValue < parseFloat(min)) {
                        errors.push(`Must be at least ${min}`);
                    }
                    if (max !== null && numValue > parseFloat(max)) {
                        errors.push(`Must be no more than ${max}`);
                    }
                }
            }

            return errors;
        },

        getFieldLabel: function(field) {
            // Try to find associated label
            const id = field.id;
            if (id) {
                const label = document.querySelector(`label[for="${id}"]`);
                if (label) {
                    return label.textContent.trim().replace(/[*:]/g, '');
                }
            }

            // Try to find label parent
            const labelParent = field.closest('label');
            if (labelParent) {
                return labelParent.textContent.trim().replace(/[*:]/g, '');
            }

            // Try placeholder
            const placeholder = field.getAttribute('placeholder');
            if (placeholder) {
                return placeholder;
            }

            // Try aria-label
            const ariaLabel = field.getAttribute('aria-label');
            if (ariaLabel) {
                return ariaLabel;
            }

            return 'Field';
        },

        showFieldError: function(field, errorMessage) {
            // Remove existing error
            this.clearFieldError(field);

            // Add error class
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');

            // Create error message element
            const errorId = `error-${field.id || Math.random().toString(36).substr(2, 9)}`;
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.id = errorId;
            errorElement.textContent = errorMessage;
            errorElement.setAttribute('role', 'alert');
            errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 4px;';

            // Insert error message
            field.parentNode.insertBefore(errorElement, field.nextSibling);
            field.setAttribute('aria-describedby', errorId);
        },

        clearFieldError: function(field) {
            field.classList.remove('error');
            field.removeAttribute('aria-invalid');
            
            const errorId = field.getAttribute('aria-describedby');
            if (errorId && errorId.startsWith('error-')) {
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.remove();
                }
                field.removeAttribute('aria-describedby');
            }
        },

        showFormErrors: function(form, errors) {
            // Remove existing error summary
            this.clearFormErrors(form);

            // Create error summary
            const summary = document.createElement('div');
            summary.className = 'form-errors';
            summary.setAttribute('role', 'alert');
            summary.style.cssText = 'background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 12px; margin-bottom: 20px; color: #ef4444;';
            
            const title = document.createElement('strong');
            title.textContent = 'Please fix the following errors:';
            title.style.display = 'block';
            title.style.marginBottom = '8px';
            summary.appendChild(title);

            const list = document.createElement('ul');
            list.style.margin = '0';
            list.style.paddingLeft = '20px';
            errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                list.appendChild(li);
            });
            summary.appendChild(list);

            // Insert at top of form
            form.insertBefore(summary, form.firstChild);

            // Focus first error field
            const firstErrorField = form.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },

        clearFormErrors: function(form) {
            const summary = form.querySelector('.form-errors');
            if (summary) {
                summary.remove();
            }
        },

        addRealTimeValidation: function() {
            // Validate on blur
            document.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('blur', () => {
                    this.validateField(field);
                });

                // Clear error on input
                field.addEventListener('input', () => {
                    if (field.classList.contains('error')) {
                        const errors = this.validateField(field);
                        if (errors.length === 0) {
                            this.clearFieldError(field);
                        }
                    }
                });
            });
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FormValidation.init());
    } else {
        FormValidation.init();
    }
})();

