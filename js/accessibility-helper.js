/**
 * TAP-IN Accessibility Helper
 * Adds ARIA labels and improves keyboard navigation
 */

(function() {
    'use strict';

    const AccessibilityHelper = {
        init: function() {
            this.addAriaLabels();
            this.improveKeyboardNavigation();
            this.addSkipLinks();
        },

        addAriaLabels: function() {
            // Add aria-labels to buttons without text
            document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(btn => {
                const text = btn.textContent.trim();
                const icon = btn.querySelector('svg, .icon');
                
                if (!text && icon) {
                    // Extract meaning from icon or context
                    const context = this.getButtonContext(btn);
                    if (context) {
                        btn.setAttribute('aria-label', context);
                    }
                } else if (text) {
                    // Ensure button has accessible name
                    btn.setAttribute('aria-label', text);
                }
            });

            // Add aria-labels to links with only icons
            document.querySelectorAll('a:not([aria-label])').forEach(link => {
                const text = link.textContent.trim();
                const icon = link.querySelector('svg, .icon');
                
                if (!text && icon) {
                    const href = link.getAttribute('href') || '';
                    const context = this.getLinkContext(link, href);
                    if (context) {
                        link.setAttribute('aria-label', context);
                    }
                }
            });

            // Add role="button" to clickable divs
            document.querySelectorAll('div[onclick], div[class*="btn"], div[class*="button"]').forEach(div => {
                if (!div.getAttribute('role')) {
                    div.setAttribute('role', 'button');
                    div.setAttribute('tabindex', '0');
                }
            });

            // Add aria-live regions for dynamic content
            if (!document.getElementById('aria-live-region')) {
                const liveRegion = document.createElement('div');
                liveRegion.id = 'aria-live-region';
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.className = 'sr-only';
                liveRegion.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;';
                document.body.appendChild(liveRegion);
            }
        },

        getButtonContext: function(btn) {
            // Try to infer context from surrounding elements
            const parent = btn.closest('.card, .section, .module');
            if (parent) {
                const title = parent.querySelector('h1, h2, h3, .title');
                if (title) {
                    return `Action for ${title.textContent.trim()}`;
                }
            }
            
            // Check for common patterns
            if (btn.classList.contains('back-btn') || btn.querySelector('[d*="M19 12H5"]')) {
                return 'Go back';
            }
            if (btn.classList.contains('next-btn') || btn.querySelector('[d*="M5 12h14"]')) {
                return 'Continue';
            }
            if (btn.classList.contains('close-btn') || btn.querySelector('[d*="M6 18L18 6"]')) {
                return 'Close';
            }
            
            return null;
        },

        getLinkContext: function(link, href) {
            if (href.includes('gym')) return 'Go to Gym Dashboard';
            if (href.includes('hub')) return 'Go to Learning Hub';
            if (href.includes('dashboard')) return 'Go to Dashboard';
            if (href.includes('assessment')) return 'Take Assessment';
            if (href.includes('game')) return 'Play Game';
            if (href.includes('tool')) return 'Open Tool';
            
            return 'Navigate';
        },

        improveKeyboardNavigation: function() {
            // Make all interactive elements keyboard accessible
            document.querySelectorAll('[role="button"]').forEach(el => {
                if (!el.hasAttribute('tabindex')) {
                    el.setAttribute('tabindex', '0');
                }
                
                // Add keyboard event handlers
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        el.click();
                    }
                });
            });

            // Improve form navigation
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('keydown', (e) => {
                    // Allow Enter to submit form if focused on submit button
                    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                        if (submitBtn && document.activeElement === submitBtn) {
                            return; // Allow default submit
                        }
                    }
                });
            });
        },

        addSkipLinks: function() {
            // Add skip to main content link
            if (!document.getElementById('skip-to-main')) {
                const skipLink = document.createElement('a');
                skipLink.id = 'skip-to-main';
                skipLink.href = '#main-content';
                skipLink.textContent = 'Skip to main content';
                skipLink.className = 'skip-link';
                skipLink.style.cssText = 'position: absolute; top: -40px; left: 0; background: #d4a853; color: #0d0d14; padding: 8px 16px; text-decoration: none; z-index: 10000; border-radius: 4px;';
                skipLink.addEventListener('focus', function() {
                    this.style.top = '0';
                });
                skipLink.addEventListener('blur', function() {
                    this.style.top = '-40px';
                });
                document.body.insertBefore(skipLink, document.body.firstChild);
            }

            // Ensure main content has id
            const main = document.querySelector('main, .main, .container, .content');
            if (main && !main.id) {
                main.id = 'main-content';
            }
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AccessibilityHelper.init());
    } else {
        AccessibilityHelper.init();
    }
})();

