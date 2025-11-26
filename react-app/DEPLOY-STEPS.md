# 🚀 DEPLOY YOUR APP IN 3 STEPS

## ✅ Step 1: Run Supabase Migration (Do This First!)

1. Open your Supabase project: https://supabase.com
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Open `supabase-gamification.sql` and copy ALL contents
5. Paste into Supabase SQL Editor
6. Click **Run**
7. You should see "Success, no rows returned" (that's good!)

---

## ✅ Step 2: Deploy to Netlify (Choose ONE method)

### METHOD A: Netlify Drop (Easiest - 2 minutes)

1. Open: **https://app.netlify.com/drop**
2. Drag the `dist` folder into the upload area
3. Wait for upload (30 seconds)
4. Click your new site URL
5. Copy the URL (e.g., `https://random-name-123.netlify.app`)

### METHOD B: Netlify UI (If you have a Netlify account)

1. Go to: **https://app.netlify.com**
2. Click: **Add new site** → **Deploy manually**
3. Drag the `dist` folder
4. Wait for deployment
5. Copy your site URL

### METHOD C: Git Push (If connected to GitHub)

```bash
cd /Users/marcok./tap-in-netlify-deploy
git add .
git commit -m "feat: Deploy with Supabase XP persistence"
git push origin main
```

(Netlify will auto-deploy if already connected)

---

## ✅ Step 3: Configure After First Deploy

### A. Add Environment Variables

**In Netlify:**
1. Go to your site
2. Click **Site configuration** → **Environment variables**
3. Click **Add a variable**

Add these TWO variables:

**Variable 1:**
- Key: `VITE_SUPABASE_URL`
- Value: Your Supabase URL (from Supabase → Settings → API)
  Example: `https://abcdefgh.supabase.co`

**Variable 2:**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: Your Supabase anon key (from Supabase → Settings → API)
  Example: `eyJhbGci...long string...`

4. Click **Save**
5. Go to **Deploys** → **Trigger deploy** → **Deploy site**

### B. Update Supabase Redirect URLs

**In Supabase:**
1. Go to: **Authentication** → **URL Configuration**
2. Update these fields:
   - **Site URL:** `https://your-site.netlify.app` (your Netlify URL)
   - **Redirect URLs:** `https://your-site.netlify.app/**`
3. Click **Save**

---

## 📱 Step 4: Test on Your Phone!

1. Open your Netlify URL on your phone
2. **Add to Home Screen:**
   - **iOS:** Tap Share button → "Add to Home Screen"
   - **Android:** Tap Menu → "Add to Home screen"
3. **Test the app:**
   - Sign up with your email
   - Complete Worker Type assessment
   - Check XP shows in header (should be 100)
   - Log out and log back in
   - Verify XP is still 100 (proves persistence works!)
   - Try Box Breathing
   - Try Morning Routine

---

## 🎉 You're Live!

Your app is now deployed and accessible to anyone with the URL!

Share it with friends, get feedback, and iterate based on real usage.

---

## 🐛 Troubleshooting

**Problem:** Site shows but login doesn't work
- **Fix:** Check Supabase redirect URLs are set correctly

**Problem:** XP not saving
- **Fix:** Verify you ran the Supabase migration and added environment variables

**Problem:** Old version showing
- **Fix:** Hard refresh (Cmd+Shift+R on Mac, Ctrl+F5 on Windows)

---

**Need the dist folder location?**
`/Users/marcok./tap-in-netlify-deploy/react-app/dist`
