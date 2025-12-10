/**
 * TAP-IN Analytics Helper
 * Optional analytics tracking - configure with your tracking ID
 * 
 * To enable:
 * 1. Set window.TAPIN_ANALYTICS_ID = 'your-tracking-id';
 * 2. Include this script in your pages
 */

(function() {
    'use strict';

    const Analytics = {
        trackingId: window.TAPIN_ANALYTICS_ID || null,
        enabled: false,

        init: function() {
            if (!this.trackingId) {
                console.log('Analytics disabled - no tracking ID set');
                return;
            }

            this.enabled = true;
            this.trackPageView();
            this.setupEventTracking();
        },

        trackPageView: function() {
            if (!this.enabled) return;

            const page = window.location.pathname + window.location.search;
            const title = document.title;

            // Track page view
            this.track('pageview', {
                page: page,
                title: title
            });
        },

        track: function(eventName, data) {
            if (!this.enabled) return;

            // Example: Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, data);
            }

            // Example: Custom analytics endpoint
            if (window.TAPIN_ANALYTICS_ENDPOINT) {
                fetch(window.TAPIN_ANALYTICS_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: eventName,
                        data: data,
                        timestamp: Date.now(),
                        url: window.location.href
                    })
                }).catch(() => {}); // Fail silently
            }

            // Console log for debugging
            if (window.TAPIN_ANALYTICS_DEBUG) {
                console.log('Analytics:', eventName, data);
            }
        },

        setupEventTracking: function() {
            // Track belt completions
            document.querySelectorAll('[href*="ceremony"], [href*="exam"]').forEach(link => {
                link.addEventListener('click', () => {
                    const href = link.getAttribute('href');
                    if (href.includes('belt')) {
                        const beltMatch = href.match(/(white|blue|purple|brown|black)-belt/);
                        if (beltMatch) {
                            this.track('belt_completion', {
                                belt: beltMatch[1]
                            });
                        }
                    }
                });
            });

            // Track assessment completions
            document.querySelectorAll('form[action*="assessment"]').forEach(form => {
                form.addEventListener('submit', () => {
                    const action = form.getAttribute('action') || window.location.pathname;
                    this.track('assessment_completed', {
                        assessment: action
                    });
                });
            });

            // Track game plays
            document.querySelectorAll('[href*="game-"]').forEach(link => {
                link.addEventListener('click', () => {
                    const gameMatch = link.getAttribute('href').match(/game-([^\.]+)/);
                    if (gameMatch) {
                        this.track('game_started', {
                            game: gameMatch[1]
                        });
                    }
                });
            });

            // Track tool usage
            document.querySelectorAll('[href*="tool-"]').forEach(link => {
                link.addEventListener('click', () => {
                    const toolMatch = link.getAttribute('href').match(/tool-([^\.]+)/);
                    if (toolMatch) {
                        this.track('tool_opened', {
                            tool: toolMatch[1]
                        });
                    }
                });
            });
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Analytics.init());
    } else {
        Analytics.init();
    }

    // Export to global scope
    window.TAPINAnalytics = Analytics;
})();

