# 🚀 TAP-IN Backend Setup Guide

## Overview

This guide walks you through setting up the Supabase backend for TAP-IN, enabling secure user authentication, team collaboration, and multi-device data sync.

---

## 📋 Prerequisites

- [ ] Netlify account (already configured)
- [ ] Supabase account ([Sign up free](https://supabase.com))
- [ ] Git repository access
- [ ] ~30 minutes setup time

---

## Step 1: Create Supabase Project

### 1.1 Create New Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in details:
   - **Name:** `tap-in-production`
   - **Database Password:** Generate a strong password (save it!)
   - **Region:** Choose closest to your users (e.g., `eu-central-1` for Europe)
   - **Pricing Plan:** Free tier (upgrade later if needed)
4. Click **"Create new project"**
5. Wait 2-3 minutes for provisioning

### 1.2 Get API Credentials

1. In Supabase dashboard, go to **Settings → API**
2. Copy these values (you'll need them later):
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role secret key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

⚠️ **IMPORTANT:** Keep `service_role` key secret! Never expose in client-side code.

---

## Step 2: Run Database Schema

### 2.1 Execute SQL Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Open `/supabase/schema.sql` in your codebase
4. Copy the entire SQL file
5. Paste into Supabase SQL editor
6. Click **"Run"** (bottom right)
7. Verify success: "Success. No rows returned"

### 2.2 Verify Tables Created

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - ✅ `user_profiles`
   - ✅ `teams`
   - ✅ `team_members`
   - ✅ `assessments`

### 2.3 Test Row-Level Security

1. Go to **Authentication → Policies**
2. Verify each table shows multiple policies:
   - `user_profiles`: 3 policies
   - `teams`: 4 policies
   - `team_members`: 4 policies
   - `assessments`: 5 policies

---

## Step 3: Configure Supabase Auth

### 3.1 Enable Email Auth

1. Go to **Authentication → Providers**
2. Ensure **Email** is enabled (should be by default)
3. Configure email templates:
   - Go to **Authentication → Email Templates**
   - Select **"Magic Link"**
   - Customize if desired (optional)

### 3.2 Configure Site URL

1. Go to **Authentication → URL Configuration**
2. Set **Site URL:** `https://tap-in-teams.netlify.app` (or your custom domain)
3. Add **Redirect URLs:**
   ```
   https://tap-in-teams.netlify.app/**
   https://tap-in-teams.netlify.app/dashboard.html
   http://localhost:8888/** (for local testing)
   ```
4. Click **Save**

### 3.3 Disable Email Confirmations (Optional)

For better UX, you can disable email confirmations:

1. Go to **Authentication → Settings**
2. Find **"Enable email confirmations"**
3. Toggle **OFF** (users can log in immediately after magic link)
4. Click **Save**

---

## Step 4: Configure Netlify Environment Variables

### 4.1 Add Environment Variables

1. Go to your Netlify dashboard: [https://app.netlify.com](https://app.netlify.com)
2. Select your TAP-IN site
3. Go to **Site settings → Environment variables**
4. Click **Add a variable**
5. Add these three variables:

**Variable 1:**
- **Key:** `SUPABASE_URL`
- **Value:** `https://xxxxx.supabase.co` (from Step 1.2)
- **Scopes:** All scopes

**Variable 2:**
- **Key:** `SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (anon key from Step 1.2)
- **Scopes:** All scopes

**Variable 3:**
- **Key:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (service role from Step 1.2)
- **Scopes:** Functions only (for security)

6. Click **Save**

### 4.2 Trigger Deploy

1. In Netlify dashboard, go to **Deploys**
2. Click **"Trigger deploy" → "Deploy site"**
3. Wait for deployment to complete (~2 minutes)

---

## Step 5: Install Dependencies

### 5.1 Install Supabase Client

If not already installed:

```bash
cd /Users/marcok./Downloads/tap-in-netlify-deploy
npm install @supabase/supabase-js@^2.47.10
```

### 5.2 Verify package.json

Check that `package.json` includes:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.47.10"
  }
}
```

---

## Step 6: Update HTML Files

### 6.1 Add Supabase Scripts to Pages

Add these scripts to pages that need authentication (like `team-dashboard.html`):

```html
<!-- Before closing </body> tag -->

<!-- Supabase Client Library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- TAP-IN Supabase Client -->
<script src="/js/supabase-client.js"></script>

<!-- Auth Modal (for login/signup) -->
<script>
  fetch('/js/auth-modal.html')
    .then(response => response.text())
    .then(html => {
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div);
    });
</script>
```

### 6.2 Add Auth Check

At the top of protected pages' `<script>` section:

```javascript
// Require authentication for this page
(async function() {
  const authenticated = await TapInAuth.isAuthenticated();
  if (!authenticated) {
    // Redirect to login or show auth modal
    TapInAuthUI.openModal();
  } else {
    // Load page content
    initializePage();
  }
})();
```

---

## Step 7: Test the System

### 7.1 Test User Signup

1. Open your TAP-IN site in incognito/private browsing
2. Navigate to a protected page (e.g., `/dashboard.html`)
3. Auth modal should appear
4. Enter your email → Click **"Continue with Email"**
5. Check email for magic link
6. Click magic link → Should redirect to dashboard
7. Verify in Supabase:
   - Go to **Authentication → Users**
   - You should see your email listed

### 7.2 Test Team Creation

Open browser console and run:

```javascript
// Create a test team
const result = await TapInAuth.createTeam('My Test Team', 'Testing the backend');
console.log('Team created:', result);

// Should log: { data: { id: "...", name: "My Test Team", invite_code: "abc123..." } }
```

Verify in Supabase:
1. Go to **Table Editor → teams**
2. Your team should appear
3. Check **team_members** table → You should be listed as 'admin'

### 7.3 Test Team Join

1. Copy the `invite_code` from the team you created
2. Open a new incognito window
3. Sign up with a different email
4. In console, run:

```javascript
const result = await TapInAuth.joinTeam('abc123'); // Use your invite code
console.log('Joined team:', result);
```

5. Verify both users now appear in `team_members` table

### 7.4 Test Assessment Save

```javascript
const result = await TapInAuth.saveAssessment(
  'leadership-style',
  { score: 85, type: 'Transformational' },
  null, // teamId (null for personal)
  false // shareWithTeam
);
console.log('Assessment saved:', result);
```

Verify in Supabase:
1. Go to **Table Editor → assessments**
2. Your assessment should appear

### 7.5 Test Row-Level Security

**Critical security test:**

1. While signed in as User A, try to access User B's assessment:

```javascript
// Get your user ID
const user = await TapInAuth.getCurrentUser();
console.log('My ID:', user.id);

// Try to query ALL assessments (should only return yours)
const { data: { session } } = await TapInAuth.getSession();
const response = await fetch('https://your-project.supabase.co/rest/v1/assessments?select=*', {
  headers: {
    'apikey': 'your-anon-key',
    'Authorization': `Bearer ${session.access_token}`
  }
});
const assessments = await response.json();
console.log('Assessments I can see:', assessments);
// Should ONLY show your own assessments
```

✅ **Expected:** Only your assessments returned  
❌ **If all assessments returned:** RLS not working - contact support

---

## Step 8: Data Migration (Optional)

### 8.1 Migrate Existing localStorage Data

For users with existing localStorage data:

```javascript
// Get old localStorage assessments
const localData = JSON.parse(localStorage.getItem('tap-in-assessments') || '[]');

// Migrate each assessment
for (const assessment of localData) {
  await TapInAuth.migrateLocalAssessment(assessment);
}

console.log(`Migrated ${localData.length} assessments`);
```

### 8.2 Add Migration UI

You can add a migration prompt to `dashboard.html`:

```javascript
async function checkForLocalData() {
  const localAssessments = JSON.parse(localStorage.getItem('tap-in-assessments') || '[]');
  
  if (localAssessments.length > 0) {
    const migrate = confirm(
      `Found ${localAssessments.length} assessments on this device.\n` +
      `Upload to your account for backup and multi-device access?`
    );
    
    if (migrate) {
      for (const assessment of localAssessments) {
        await TapInAuth.migrateLocalAssessment(assessment);
      }
      
      alert(`✅ Successfully migrated ${localAssessments.length} assessments!`);
      localStorage.setItem('tap-in-migrated', 'true');
    }
  }
}
```

---

## Step 9: Production Checklist

Before going live:

### Security ✅
- [ ] Supabase RLS policies tested
- [ ] Service role key only in Netlify functions
- [ ] HTTPS enforced (already configured in `netlify.toml`)
- [ ] CORS configured properly

### Performance ✅
- [ ] Database indexes created (auto-created by schema)
- [ ] Supabase plan reviewed (free tier limits)
- [ ] CDN configured for static assets

### Compliance ✅
- [ ] Privacy policy updated (mention Supabase data storage)
- [ ] Cookie banner (if required by GDPR)
- [ ] Terms of service updated
- [ ] Data export functionality working

### Monitoring ✅
- [ ] Supabase logs configured
- [ ] Netlify analytics enabled
- [ ] Error tracking set up (optional: Sentry)

---

## 🎯 Architecture Summary

### What's Now Secure?

✅ **User Authentication:** Magic link email auth (no passwords)  
✅ **Data Isolation:** Users can only access their own data  
✅ **Team Validation:** Server-side invite code checking  
✅ **GDPR Compliant:** No data leakage between users  
✅ **Multi-Device Sync:** Data synced across devices  
✅ **Scalable:** Supabase auto-scales to 50k+ users (free tier)

### Data Flow (Before vs After)

**Before (localStorage only):**
```
User → Assessment → localStorage → Nowhere (device-specific)
```

**After (with Supabase):**
```
User → Login → Assessment → Supabase DB → Synced Everywhere
```

### Team Join Flow (Before vs After)

**Before (INSECURE):**
```
User enters team ID → Check localStorage → Immediate error/success
Problem: All team IDs in browser memory
```

**After (SECURE):**
```
User enters invite code → API call to Netlify Function → 
Supabase checks team exists → Verifies user not already member → 
Adds to team_members table → Returns success
Problem: None! ✅
```

---

## 🆘 Troubleshooting

### Issue: "Supabase not configured" error

**Solution:**
1. Check Netlify environment variables are set
2. Redeploy site after adding variables
3. Verify `window.ENV` object exists (check browser console)

### Issue: Magic link not working

**Solution:**
1. Check Supabase **Authentication → URL Configuration**
2. Ensure redirect URL matches exactly
3. Check spam folder for email
4. Verify email provider in Supabase settings

### Issue: RLS policies blocking legitimate access

**Solution:**
1. In Supabase, go to **Table Editor**
2. Click on table → **View Policies**
3. Review policies - they should match `/supabase/schema.sql`
4. Test with SQL:
```sql
-- Run as authenticated user
SELECT * FROM assessments WHERE user_id = auth.uid();
```

### Issue: CORS errors in browser

**Solution:**
1. Netlify Functions auto-handle CORS
2. Check `Access-Control-Allow-Origin` headers in function code
3. Verify Supabase project URL is correct

---

## 📚 Next Steps

1. **Customize Email Templates:** Supabase → Authentication → Email Templates
2. **Add Social Login:** Enable Google/GitHub auth in Supabase
3. **Set Up Monitoring:** Supabase → Logs, Netlify → Analytics
4. **Optimize Queries:** Add database indexes if needed
5. **Scale Plan:** Upgrade Supabase if you hit free tier limits

---

## 🎉 You're Done!

Your TAP-IN platform now has:
- ✅ Secure user authentication
- ✅ Team collaboration features
- ✅ Multi-device data sync
- ✅ GDPR-compliant architecture
- ✅ Scalable backend infrastructure

**Questions?** Check the [Supabase Docs](https://supabase.com/docs) or [Netlify Support](https://docs.netlify.com).

---

**Setup completed:** `<DATE>`  
**Supabase project:** `<PROJECT_NAME>`  
**Netlify site:** `<SITE_URL>`
