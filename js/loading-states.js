/**
 * TAP-IN Loading States Helper
 * Provides consistent loading indicators for async operations
 */

(function() {
    'use strict';

    const LoadingStates = {
        init: function() {
            this.setupFormSubmissions();
            this.setupAsyncLinks();
            this.createLoadingOverlay();
        },

        createLoadingOverlay: function() {
            // Create global loading overlay
            if (!document.getElementById('loading-overlay')) {
                const overlay = document.createElement('div');
                overlay.id = 'loading-overlay';
                overlay.className = 'loading-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(13, 13, 20, 0.9);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    backdrop-filter: blur(4px);
                `;
                
                const spinner = document.createElement('div');
                spinner.className = 'loading-spinner';
                spinner.innerHTML = `
                    <div style="width: 50px; height: 50px; border: 4px solid rgba(212, 168, 83, 0.3); border-top-color: #d4a853; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="margin-top: 20px; color: #e2e8f0; font-size: 1rem;">Loading...</p>
                `;
                spinner.style.cssText = 'text-align: center;';
                
                overlay.appendChild(spinner);
                document.body.appendChild(overlay);

                // Add spin animation
                if (!document.getElementById('loading-styles')) {
                    const style = document.createElement('style');
                    style.id = 'loading-styles';
                    style.textContent = `
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        },

        showLoading: function(message = 'Loading...') {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                const text = overlay.querySelector('p');
                if (text) text.textContent = message;
                overlay.style.display = 'flex';
            }
        },

        hideLoading: function() {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        },

        setupFormSubmissions: function() {
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', (e) => {
                    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                    
                    if (submitBtn && !form.hasAttribute('data-no-loading')) {
                        // Show loading state on button
                        const originalText = submitBtn.textContent || submitBtn.value;
                        submitBtn.disabled = true;
                        submitBtn.setAttribute('data-original-text', originalText);
                        
                        if (submitBtn.tagName === 'BUTTON') {
                            submitBtn.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%; animation: spin 0.6s linear infinite; margin-right: 8px;"></span>Loading...';
                        } else {
                            submitBtn.value = 'Loading...';
                        }

                        // Hide loading after form processes (or timeout)
                        setTimeout(() => {
                            submitBtn.disabled = false;
                            if (submitBtn.tagName === 'BUTTON') {
                                submitBtn.textContent = originalText;
                            } else {
                                submitBtn.value = originalText;
                            }
                        }, 3000);
                    }
                });
            });
        },

        setupAsyncLinks: function() {
            // Add loading state to links that trigger async operations
            document.querySelectorAll('a[href*="assessment"], a[href*="game"], a[href*="exam"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    // Only show loading for same-origin navigation
                    if (link.hostname === window.location.hostname) {
                        // Small delay to show loading if navigation is slow
                        const timeout = setTimeout(() => {
                            this.showLoading('Loading page...');
                        }, 500);

                        // Clear timeout if navigation happens quickly
                        window.addEventListener('beforeunload', () => {
                            clearTimeout(timeout);
                            this.hideLoading();
                        }, { once: true });
                    }
                });
            });
        },

        showButtonLoading: function(button, message = 'Loading...') {
            const originalText = button.textContent || button.innerHTML;
            button.setAttribute('data-original-text', originalText);
            button.disabled = true;
            button.innerHTML = `<span style="display: inline-block; width: 14px; height: 14px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%; animation: spin 0.6s linear infinite; margin-right: 6px; vertical-align: middle;"></span>${message}`;
        },

        hideButtonLoading: function(button) {
            const originalText = button.getAttribute('data-original-text');
            if (originalText) {
                button.innerHTML = originalText;
                button.removeAttribute('data-original-text');
            }
            button.disabled = false;
        }
    };

    // Export to global scope
    window.LoadingStates = LoadingStates;

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => LoadingStates.init());
    } else {
        LoadingStates.init();
    }
})();
