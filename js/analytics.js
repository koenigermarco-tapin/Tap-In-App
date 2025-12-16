/**
* TAP-IN Analytics System
* Comprehensive event tracking for user behavior insights
*/
(function() {
'use strict';
const Analytics = {
initialized: false,
sessionStart: Date.now(),
    /**
* Initialize analytics system
*/
init: function() {
if (this.initialized) return;
      // Track page view
this.trackPageView();
      // Track time on page
window.addEventListener('beforeunload', () => {
this.trackTimeOnPage();
});
      // Track clicks with data-track attribute
this.initializeAutoTracking();
      // Track errors
this.initializeErrorTracking();
      // Track performance
this.initializePerformanceTracking();
this.initialized = true;
      console.log('📊 Analytics initialized');
},
    /**
* Track custom event
*/
track: function(event, properties = {}) {
      // Add standard properties
const data = {
...properties,
timestamp: Date.now(),
page: window.location.pathname,
referrer: document.referrer,
language: navigator.language,
sessionDuration: this.getSessionDuration()
};
      // Send to Google Analytics 4
if (typeof gtag !== 'undefined') {
gtag('event', event, data);
}
      // Send to custom backend (if configured)
if (window.ANALYTICS_ENDPOINT) {
this.sendToBackend(event, data);
}
      // Log in development
if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        console.log('📊 [Analytics]', event, data);
}
      // Store locally for debugging
this.storeEvent(event, data);
},
    /**
* Track page view
*/
trackPageView: function() {
this.track('page_view', {
title: document.title,
url: window.location.href
});
},
    /**
* Track time spent on page
*/
trackTimeOnPage: function() {
const duration = this.getSessionDuration();
this.track('time_on_page', {
duration_seconds: Math.round(duration / 1000),
page: window.location.pathname
});
},
    /**
* Get session duration
*/
getSessionDuration: function() {
return Date.now() - this.sessionStart;
},
    /**
* Auto-track elements with data-track attribute
*/
initializeAutoTracking: function() {
document.addEventListener('click', (e) => {
const tracked = e.target.closest('[data-track]');
if (tracked) {
const event = tracked.dataset.track;
const properties = {};
          // Extract all data attributes
Object.keys(tracked.dataset).forEach(key => {
if (key !== 'track') {
properties[key] = tracked.dataset[key];
}
});
this.track(event, properties);
}
});
},
    /**
* Track JavaScript errors
*/
initializeErrorTracking: function() {
window.addEventListener('error', (e) => {
this.track('javascript_error', {
message: e.message,
filename: e.filename,
line: e.lineno,
column: e.colno,
stack: e.error?.stack
});
});
window.addEventListener('unhandledrejection', (e) => {
this.track('promise_rejection', {
reason: String(e.reason)
});
});
},
    /**
* Track performance metrics
*/
initializePerformanceTracking: function() {
      // Track Core Web Vitals
if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
try {
new PerformanceObserver((list) => {
const entries = list.getEntries();
const lastEntry = entries[entries.length - 1];
const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
this.track('core_web_vital_lcp', {
value: lcpValue,
rating: lcpValue < 2500 ? 'good' : lcpValue < 4000 ? 'needs-improvement' : 'poor'
});
}).observe({ entryTypes: ['largest-contentful-paint'] });
} catch (e) {
          // LCP observer not supported
}
        // First Input Delay (FID) - now replaced by INP in newer browsers
try {
new PerformanceObserver((list) => {
const entries = list.getEntries();
entries.forEach(entry => {
const fidValue = entry.processingStart - entry.startTime;
this.track('core_web_vital_fid', {
value: fidValue,
rating: fidValue < 100 ? 'good' : fidValue < 300 ? 'needs-improvement' : 'poor'
});
});
}).observe({ entryTypes: ['first-input'] });
} catch (e) {
          // FID observer not supported
}
        // Cumulative Layout Shift (CLS)
try {
let clsValue = 0;
new PerformanceObserver((list) => {
list.getEntries().forEach(entry => {
if (!entry.hadRecentInput) {
clsValue += entry.value;
}
});
this.track('core_web_vital_cls', {
value: clsValue,
rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
});
}).observe({ entryTypes: ['layout-shift'] });
} catch (e) {
          // CLS observer not supported
}
}
      // Track page load time
window.addEventListener('load', () => {
setTimeout(() => {
const perfData = performance.timing;
if (perfData && perfData.loadEventEnd && perfData.navigationStart) {
const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
this.track('page_load_complete', {
load_time_ms: pageLoadTime,
dns_time: perfData.domainLookupEnd - perfData.domainLookupStart,
tcp_time: perfData.connectEnd - perfData.connectStart,
response_time: perfData.responseEnd - perfData.requestStart,
dom_parse_time: perfData.domComplete - perfData.domLoading
});
}
}, 0);
});
},
    /**
* Send event to custom backend
*/
sendToBackend: function(event, data) {
if (!window.ANALYTICS_ENDPOINT) return;
fetch(window.ANALYTICS_ENDPOINT, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ event, data })
}).catch(err => );
},
    /**
* Store event locally for debugging
*/
storeEvent: function(event, data) {
try {
const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
events.push({ event, data });
        // Keep last 100 events
const recent = events.slice(-100);
localStorage.setItem('analytics_events', JSON.stringify(recent));
} catch (e) {
        // Ignore storage errors
}
},
    // ============================================
    // DOMAIN-SPECIFIC TRACKING METHODS
    // ============================================
    /**
* Track stripe completion
*/
trackStripeComplete: function(belt, stripe, score) {
this.track('stripe_completed', {
belt: belt,
stripe: stripe,
score: score,
time_spent: this.getSessionDuration()
});
},
    /**
* Track belt assessment
*/
trackAssessmentStart: function(belt) {
this.track('assessment_started', { belt: belt });
},
trackAssessmentComplete: function(belt, score, recommendedBelt) {
this.track('assessment_completed', {
belt: belt,
score: score,
recommended_belt: recommendedBelt
});
},
    /**
* Track XP earned
*/
trackXPEarned: function(amount, source) {
this.track('xp_earned', {
amount: amount,
source: source,
total_xp: parseInt(localStorage.getItem('totalXP') || '0')
});
},
    /**
* Track level up
*/
trackLevelUp: function(newLevel, levelTitle) {
this.track('level_up', {
level: newLevel,
title: levelTitle
});
},
    /**
* Track achievement unlocked
*/
trackAchievement: function(achievementId, achievementName) {
this.track('achievement_unlocked', {
achievement_id: achievementId,
achievement_name: achievementName
});
},
    /**
* Track tool usage
*/
trackToolUsed: function(toolName, duration) {
this.track('tool_used', {
tool: toolName,
duration_seconds: duration
});
},
    /**
* Track game played
*/
trackGamePlayed: function(gameName, score, players) {
this.track('game_played', {
game: gameName,
score: score,
players: players
});
},
    /**
* Track search
*/
trackSearch: function(query, resultsCount) {
this.track('search_performed', {
query: query,
results: resultsCount
});
},
    /**
* Track quiz attempt
*/
trackQuizAttempt: function(quizId, score, totalQuestions) {
this.track('quiz_attempted', {
quiz_id: quizId,
score: score,
total_questions: totalQuestions,
pass: score >= (totalQuestions * 0.7)
});
},
    /**
* Track user journey
*/
trackUserJourney: function(fromPage, toPage, action) {
this.track('user_journey', {
from: fromPage,
to: toPage,
action: action
});
}
};
  // Auto-initialize on page load
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => Analytics.init());
} else {
Analytics.init();
}
  // Export for global use
window.Analytics = Analytics;
})();