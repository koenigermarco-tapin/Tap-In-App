# 🚀 Quick Deploy Instructions

## ⚠️ BEFORE DEPLOYING - Run Supabase Migration!

**CRITICAL:** You must run the SQL migration in Supabase first!

```bash
# Open the file and copy its contents:
cat supabase-gamification.sql

# Then paste and run in Supabase SQL Editor:
# https://supabase.com → Your Project → SQL Editor → New Query
```

This adds XP, streaks, and gamification functions to your database.

---

## 🚀 Deploy Option 1: Netlify Drop (Easiest for Testing)

1. **Build the app:**
   ```bash
   cd /Users/marcok./tap-in-netlify-deploy/react-app
   npm run build
   ```

2. **Go to Netlify Drop:**
   - Visit https://app.netlify.com/drop
   - Drag the `dist` folder onto the page
   - Wait for upload
   - Get your URL!

3. **Add Environment Variables:**
   - Click "Site settings" → "Environment variables"
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

4. **Redeploy** after adding env vars

---

## 🚀 Deploy Option 2: Netlify Web UI (Recommended)

1. **Go to Netlify:**
   - Visit https://app.netlify.com
   - Click "Add new site"

2. **Import from Git (if connected):**
   - Choose your Git provider
   - Select this repository
   - Build settings:
     - Base directory: `react-app`
     - Build command: `npm run build`
     - Publish directory: `react-app/dist`

3. **Add Environment Variables:**
   - Before deploying, click "Show advanced"
   - Add environment variables:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Deploy!**

---

## 🚀 Deploy Option 3: Netlify CLI

```bash
cd /Users/marcok./tap-in-netlify-deploy/react-app

# Link to existing site (if you have one)
netlify link

# OR create new site
netlify sites:create --name your-gym-app

# Set environment variables
netlify env:set VITE_SUPABASE_URL "https://your-project.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-key"

# Deploy
netlify deploy --prod --dir=dist
```

---

## 📱 After Deployment

### 1. Update Supabase Redirect URLs

Go to Supabase → Authentication → URL Configuration

Add your Netlify URL:
- **Site URL:** `https://your-site.netlify.app`
- **Redirect URLs:** `https://your-site.netlify.app/**`

### 2. Test on Your Phone

1. Get your Netlify URL (e.g., https://your-gym-app.netlify.app)
2. Open on your phone
3. **Add to Home Screen:**
   - iOS: Share → Add to Home Screen
   - Android: Menu → Add to Home Screen
4. Test:
   - Sign up
   - Complete an assessment
   - Check XP updates
   - Test Box Breathing
   - Try Morning Routine

---

## ✅ Testing Checklist

After deployment:

- [ ] Site loads
- [ ] Sign up with new email
- [ ] Receive magic link email (check spam)
- [ ] Login works
- [ ] Complete Worker Type assessment
- [ ] Verify XP appears in header (should be 100 XP)
- [ ] Check streak shows 1 day
- [ ] Complete another assessment
- [ ] Verify XP increases to 200
- [ ] Log out and log back in
- [ ] Verify XP persists (200 XP still there)
- [ ] Test Box Breathing
- [ ] Test Morning Routine
- [ ] Test TAP button
- [ ] Test on mobile device

---

## 🐛 If Something Breaks

### XP not saving?
- Check Supabase migration was run
- Check environment variables are set
- Check browser console for errors

### Authentication not working?
- Check Supabase redirect URLs
- Check environment variables

### Old version showing?
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
- Or clear site data in browser

---

## 📊 What's Been Built

✅ **Working Features:**
- 3 functional assessments
- 2 interactive tools (Box Breathing, Morning Routine)
- XP system with Supabase persistence
- Streak tracking with Supabase
- Belt progression system
- TAP home button
- Beautiful dark UI
- Mobile responsive
- No caching issues

✅ **User Can:**
- Create account
- Take assessments
- Earn XP that persists
- Track daily streaks
- Practice breathing
- Build morning routines
- See progress

---

## 🎉 Success!

Once deployed and tested on your phone at the gym:

1. Share with 5-10 friends
2. Get feedback
3. Iterate based on real usage
4. Add features people actually want

**You've built something real. Now get it in front of users!** 🚀

---

**Build Status:** ✅ Production Ready  
**Size:** 654 KB (190 KB gzipped)  
**Version:** 1.0.1  
**All modules:** Connected ✅

