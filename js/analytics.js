/**
 * Simple Analytics Tracking
 * Privacy-first, no cookies, no personal data
 */

const Analytics = {
  init() {
    this.trackPageView();
    this.trackEvents();
  },
  
  trackPageView() {
    const page = window.location.pathname;
    console.log('📊 Page view:', page);
    
    // Count page views in localStorage
    const views = parseInt(localStorage.getItem('pageViews') || '0');
    localStorage.setItem('pageViews', (views + 1).toString());
  },
  
  trackEvents() {
    // Track XP gains
    document.addEventListener('xpGained', (e) => {
      console.log('📊 XP gained:', e.detail);
      this.logEvent('xp_gained', { amount: e.detail });
    });
    
    // Track lesson completions
    document.addEventListener('lessonCompleted', (e) => {
      console.log('📊 Lesson completed:', e.detail);
      this.logEvent('lesson_completed', { lesson: e.detail });
    });
    
    // Track belt progression
    document.addEventListener('beltUnlocked', (e) => {
      console.log('📊 Belt unlocked:', e.detail);
      this.logEvent('belt_unlocked', { belt: e.detail });
    });
    
    // Track talent assessment completion
    document.addEventListener('talentAssessmentCompleted', (e) => {
      console.log('📊 Talent assessment completed:', e.detail);
      this.logEvent('talent_assessment_completed', { type: e.detail });
    });
  },
  
  logEvent(eventName, data) {
    // Store events in localStorage
    const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    events.push({
      event: eventName,
      data: data,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.shift();
    }
    
    localStorage.setItem('analyticsEvents', JSON.stringify(events));
  },
  
  getStats() {
    const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    const pageViews = parseInt(localStorage.getItem('pageViews') || '0');
    
    return {
      pageViews: pageViews,
      totalEvents: events.length,
      events: events
    };
  },
  
  getEventsByType(eventName) {
    const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    return events.filter(e => e.event === eventName);
  }
};

window.Analytics = Analytics;

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  Analytics.init();
});

