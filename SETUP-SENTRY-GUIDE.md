# 🔒 Sentry Error Monitoring Setup Guide

This guide explains how to set up Sentry error monitoring for the TAP-IN platform.

---

## Prerequisites

1. Create a Sentry account at https://sentry.io/signup/
2. Create a new project (select JavaScript/Browser)
3. Get your DSN (Data Source Name) from project settings

---

## Step 1: Add Sentry Script

Add this to the `<head>` of your priority pages (`index.html`, `gym-dashboard.html`, etc.):

```html
<!-- Sentry Error Tracking -->
<script
  src="https://js.sentry-cdn.com/YOUR-SENTRY-DSN.min.js"
  crossorigin="anonymous"
></script>

<script>
  if (typeof Sentry !== 'undefined') {
    Sentry.init({
      dsn: 'YOUR-SENTRY-DSN-HERE',
      environment: window.location.hostname === 'localhost' ? 'development' : 'production',
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay()
      ],
      tracesSampleRate: 0.1, // 10% of transactions
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
      
      // Ignore common non-critical errors
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
        'NetworkError when attempting to fetch resource'
      ],
      
      // Add custom context
      beforeSend(event, hint) {
        // Add user context
        event.contexts = event.contexts || {};
        event.contexts.belt = {
          current_belt: localStorage.getItem('currentBelt') || 'none',
          total_xp: localStorage.getItem('totalXP') || '0',
          page: window.location.pathname
        };
        
        // Add custom tags
        event.tags = event.tags || {};
        event.tags.page_type = this.getPageType();
        
        return event;
      }
    });
    
    // Set user ID if available
    const userId = localStorage.getItem('userId');
    if (userId) {
      Sentry.setUser({ id: userId });
    }
  }
  
  // Helper to determine page type
  function getPageType() {
    const path = window.location.pathname;
    if (path.includes('stripe')) return 'stripe_lesson';
    if (path.includes('assessment')) return 'assessment';
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('hub')) return 'learning_hub';
    return 'other';
  }
</script>
```

---

## Step 2: Manual Error Capture

You can manually capture errors in your code:

```javascript
try {
  // Risky operation
  riskyFunction();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'stripe_completion',
      belt: 'white'
    },
    extra: {
      user_data: getUserData(),
      context: 'User completing stripe'
    }
  });
}
```

---

## Step 3: Integration with Analytics

Update `js/analytics.js` to also send to Sentry:

```javascript
// In Analytics.track() method, add:
if (typeof Sentry !== 'undefined' && event.includes('error')) {
  Sentry.captureMessage(event, {
    level: 'error',
    tags: properties
  });
}
```

---

## Step 4: Test Error Reporting

Add this to test Sentry is working:

```javascript
// Test button (remove in production)
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hostname === 'localhost') {
    const testBtn = document.createElement('button');
    testBtn.textContent = 'Test Sentry';
    testBtn.onclick = () => {
      Sentry.captureException(new Error('Test error from TAP-IN'));
    };
    document.body.appendChild(testBtn);
  }
});
```

---

## Configuration Options

### Environment Detection
```javascript
environment: window.location.hostname.includes('localhost') 
  ? 'development' 
  : 'production'
```

### Sample Rates
- `tracesSampleRate: 0.1` - Track 10% of page loads
- `replaysSessionSampleRate: 0.1` - Record 10% of sessions
- `replaysOnErrorSampleRate: 1.0` - Record 100% of error sessions

### Ignore Errors
Add common non-critical errors to `ignoreErrors` array.

---

## Benefits

1. **Real-time Error Tracking** - Get notified immediately when errors occur
2. **Session Replay** - See exactly what users did before the error
3. **Performance Monitoring** - Track page load times and API calls
4. **User Context** - See which belt level, XP, and page where error occurred
5. **Error Grouping** - Similar errors are automatically grouped

---

## Free Tier Limits

Sentry free tier includes:
- 5,000 errors/month
- 10,000 performance transactions/month
- 1,000 replay sessions/month

For TAP-IN's scale, this should be sufficient.

---

## Next Steps

1. Sign up for Sentry account
2. Create project and get DSN
3. Replace `YOUR-SENTRY-DSN` in the code above
4. Add script to priority pages
5. Test error reporting
6. Monitor dashboard

---

**Note:** This is a setup guide. The actual implementation requires your Sentry DSN. Once you have it, you can add the script to your pages.

