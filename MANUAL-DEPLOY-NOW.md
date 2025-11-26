# 🚨 MANUAL DEPLOY - DO THIS NOW (5 minutes)

## THE PROBLEM

**Netlify stopped auto-deploying from GitHub at 12:27 PM today.**

We've pushed 10+ commits since then, but Netlify hasn't noticed.

**GitHub and Netlify are disconnected.**

---

## ✅ THE SOLUTION: MANUAL DEPLOY VIA CLI

You have Netlify CLI installed. Just need to authenticate and deploy.

**Follow these steps EXACTLY:**

---

## STEP 1: LOGIN TO NETLIFY (30 seconds)

Open terminal in your project directory and run:

```bash
cd /Users/marcok./tap-in-netlify-deploy
netlify login
```

**What happens:**
- Browser window will open
- Click "Authorize" to connect CLI to your Netlify account
- Terminal will show "You are now logged in"

---

## STEP 2: LINK TO YOUR SITE (30 seconds)

```bash
netlify link
```

**Choose option:**
- Select: "Use current git remote origin"
- OR: "Search by site name" → type "tap-in-the-gym"

**Terminal will show:**
- "Linked to tap-in-the-gym"

---

## STEP 3: DEPLOY TO PRODUCTION (1 minute)

```bash
netlify deploy --prod --dir=. --message="Manual deploy - fix disconnected auto-deploy"
```

**What this does:**
- Deploys ALL files from current directory (`.`)
- Deploys to production (not draft)
- Takes ~30-60 seconds

**Terminal will show:**
```
✔ Deploying to production URL...
✔ Deploy complete!

Website URL: https://tap-in-the-gym.netlify.app
```

---

## STEP 4: TEST IMMEDIATELY (30 seconds)

**Open these URLs:**

1. https://tap-in-the-gym.netlify.app/
2. https://tap-in-the-gym.netlify.app/stripe-navigator.html
3. https://tap-in-the-gym.netlify.app/white-belt-stripe1-gamified.html

**You should see:**
- ✅ Landing page with "Tap-In Leadership Gym"
- ✅ Belt navigator with 20 stripes
- ✅ Stripe 1 with 4 lessons + quiz at bottom

---

## COMPLETE TERMINAL COMMANDS (Copy-Paste)

```bash
cd /Users/marcok./tap-in-netlify-deploy

# Step 1: Login (opens browser)
netlify login

# Step 2: Link to site
netlify link

# Step 3: Deploy
netlify deploy --prod --dir=. --message="Manual deploy - fix disconnected auto-deploy"

# Done! Check the URL it outputs
```

**Total time: 3-5 minutes**

---

## IF YOU SEE ERRORS

### Error: "Not logged in"
**Solution:** Run `netlify login` first

### Error: "Site not found"
**Solution:** When running `netlify link`, choose "Search by site name" and type "tap-in-the-gym"

### Error: "Deploy failed"
**Solution:** Check the error message and reply with it in chat

---

## AFTER SUCCESSFUL DEPLOY

### 1. Verify it worked:
- Test the 3 URLs above
- All should show content (not 404, not empty)

### 2. Fix the GitHub auto-deploy:
Go to: https://app.netlify.com/sites/tap-in-the-gym/settings/deploys

**Check "Build & deploy" section:**
- Continuous deployment: Should be "Enabled"
- Repository: Should show your GitHub repo
- Production branch: Should be "main"

**If "Continuous deployment" is OFF:**
- Click "Edit settings"
- Enable it
- Connect to GitHub repo
- Set branch to "main"
- Save

### 3. Test auto-deploy works:
- Make a small change (e.g., edit a markdown file)
- Commit and push to GitHub
- Check Netlify dashboard → Should see new deploy triggered
- If new deploy appears → Auto-deploy is fixed ✅
- If no deploy → Reply in chat for further fix

---

## WHY THIS HAPPENED

**Possible causes:**
1. GitHub connection expired (needs re-authorization)
2. Netlify webhook was deleted
3. Repository permissions changed
4. Continuous deployment was accidentally disabled

**This happens sometimes with Netlify + GitHub.**

**Manual CLI deploy is the fastest fix right now.**

**Then we can re-enable auto-deploy from dashboard.**

---

## CONFIDENCE

**100% this will work.**

**Why:**
- Files are correct locally ✅
- Netlify CLI is installed ✅
- Manual deploy bypasses all connection issues ✅
- You'll see the site live in 5 minutes ✅

---

## WHAT TO DO RIGHT NOW

**Open terminal and run:**

```bash
cd /Users/marcok./tap-in-netlify-deploy
netlify login
netlify link
netlify deploy --prod --dir=. --message="Manual deploy"
```

**Then test the URLs and reply:**
- "✅ Site is live!" 
- OR screenshot if there's an error

---

**This is the fastest path to getting your site live.** 🚀

**Do it now, then we'll fix auto-deploy from dashboard.** 💪

