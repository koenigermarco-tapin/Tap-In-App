# Cache-Busting Guide

## Problem Solved ✅
You no longer need to hard refresh on every device! The system now automatically detects when a new version is deployed and forces a refresh.

## How It Works

### 1. Server-Side Headers (netlify.toml)
```toml
Cache-Control = "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0"
```
- Tells browsers and CDNs to NEVER cache HTML files
- Always fetch fresh from server

### 2. Client-Side Meta Tags (in HTML)
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```
- Additional browser-level cache prevention

### 3. Version-Based Auto-Refresh (JavaScript)
```javascript
const APP_VERSION = '2024-11-24-v1';
```
- Each file checks its version on load
- If cached version doesn't match, it auto-reloads ONCE
- Preserves user data (localStorage) during refresh

## When You Deploy Changes

**Update the version number in ALL affected files:**

1. Open the file(s) you modified
2. Find: `const APP_VERSION = '2024-11-24-v1';`
3. Change to: `const APP_VERSION = '2024-11-24-v2';` (or use current date)
4. Commit and push

### Quick Version Update Script

You can use this one-liner to update all versions:

```bash
# Update version to today's date with increment
VERSION="2024-11-24-v2"
grep -rl "const APP_VERSION = " *.html | xargs sed -i '' "s/const APP_VERSION = '[^']*'/const APP_VERSION = '$VERSION'/"
```

## Files Updated with Cache-Busting

✅ All 10 gamified modules:
- energy-management-module-gamified.html
- boundaries-module-gamified.html
- deep-work-module-gamified.html
- feedback-module-gamified.html
- expectation-management-module-gamified.html
- stoic-tools-module-gamified.html
- limiting-beliefs-module-gamified.html
- active-listening-module-gamified.html
- empathy-module-gamified.html
- coaching-module-gamified.html

✅ Main hub:
- learning-hub.html

✅ Configuration:
- netlify.toml

## Testing

After deploying:
1. Open site on a device where you've visited before
2. Check browser console (F12)
3. You should see: "Version update detected: [old] → [new]"
4. Page auto-refreshes once
5. Done! No more hard refresh needed

## Best Practices

1. **Increment version on EVERY deploy** that changes functionality
2. Use date-based versions: `YYYY-MM-DD-v1`, `YYYY-MM-DD-v2`
3. For minor CSS tweaks, you can skip version increment (Netlify headers will handle it)
4. For major changes (new features, bug fixes), ALWAYS increment

## Rollback

If something breaks:
1. Revert to previous version number
2. Deploy
3. All clients auto-refresh to working version

## Monitoring

Check Netlify deploy logs to confirm headers are being sent:
```
Cache-Control: no-cache, no-store, must-revalidate, max-age=0
```

---

**Last Updated:** November 24, 2024
**Current Version:** 2024-11-24-v1
