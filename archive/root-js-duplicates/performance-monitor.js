/**
 * Performance Monitoring
 * Tracks Web Vitals and page performance metrics
 */

(function() {
    'use strict';

    window.PerformanceMonitor = {
        metrics: {},
        
        /**
         * Initialize performance monitoring
         */
        init: function() {
            this.trackWebVitals();
            this.trackPageLoad();
            this.trackResourceTiming();
        },
        
        /**
         * Track Core Web Vitals
         */
        trackWebVitals: function() {
            // Largest Contentful Paint (LCP)
            if ('PerformanceObserver' in window) {
                try {
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
                        this.logMetric('LCP', this.metrics.lcp);
                    });
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (e) {
                    console.warn('LCP tracking not supported');
                }
                
                // First Input Delay (FID)
                try {
                    const fidObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        entries.forEach((entry) => {
                            this.metrics.fid = entry.processingStart - entry.startTime;
                            this.logMetric('FID', this.metrics.fid);
                        });
                    });
                    fidObserver.observe({ entryTypes: ['first-input'] });
                } catch (e) {
                    console.warn('FID tracking not supported');
                }
                
                // Cumulative Layout Shift (CLS)
                try {
                    let clsValue = 0;
                    const clsObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        entries.forEach((entry) => {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        });
                        this.metrics.cls = clsValue;
                        this.logMetric('CLS', clsValue);
                    });
                    clsObserver.observe({ entryTypes: ['layout-shift'] });
                } catch (e) {
                    console.warn('CLS tracking not supported');
                }
            }
        },
        
        /**
         * Track page load performance
         */
        trackPageLoad: function() {
            if (window.performance && window.performance.timing) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const timing = window.performance.timing;
                        const navigation = window.performance.getEntriesByType('navigation')[0];
                        
                        this.metrics.pageLoad = timing.loadEventEnd - timing.navigationStart;
                        this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
                        this.metrics.firstPaint = navigation ? navigation.startTime : null;
                        this.metrics.domInteractive = timing.domInteractive - timing.navigationStart;
                        
                        this.logMetric('Page Load', this.metrics.pageLoad);
                        this.logMetric('DOM Content Loaded', this.metrics.domContentLoaded);
                        
                        // Log to console for debugging
                        console.log('📊 Performance Metrics:', {
                            'Page Load': this.metrics.pageLoad + 'ms',
                            'DOM Content Loaded': this.metrics.domContentLoaded + 'ms',
                            'First Paint': this.metrics.firstPaint ? this.metrics.firstPaint + 'ms' : 'N/A',
                            'LCP': this.metrics.lcp ? this.metrics.lcp + 'ms' : 'N/A',
                            'FID': this.metrics.fid ? this.metrics.fid + 'ms' : 'N/A',
                            'CLS': this.metrics.cls || 0
                        });
                    }, 1000);
                });
            }
        },
        
        /**
         * Track resource loading performance
         */
        trackResourceTiming: function() {
            if (window.performance && window.performance.getEntriesByType) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const resources = window.performance.getEntriesByType('resource');
                        const slowResources = resources.filter(r => r.duration > 1000);
                        
                        if (slowResources.length > 0) {
                            console.warn('⚠️  Slow resources detected:', slowResources.map(r => ({
                                name: r.name.split('/').pop(),
                                duration: Math.round(r.duration) + 'ms'
                            })));
                        }
                    }, 2000);
                });
            }
        },
        
        /**
         * Log metric
         */
        logMetric: function(name, value) {
            // Could send to analytics service here
            if (window.console && console.log) {
                // Only log significant metrics
                if (name === 'LCP' || name === 'FID' || name === 'Page Load') {
                    const threshold = {
                        'LCP': 2500,
                        'FID': 100,
                        'Page Load': 3000
                    }[name] || 0;
                    
                    if (value > threshold) {
                        console.warn(`⚠️  ${name} is ${Math.round(value)}ms (target: <${threshold}ms)`);
                    }
                }
            }
        },
        
        /**
         * Get current metrics
         */
        getMetrics: function() {
            return this.metrics;
        }
    };

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.PerformanceMonitor.init();
        });
    } else {
        window.PerformanceMonitor.init();
    }

})();

