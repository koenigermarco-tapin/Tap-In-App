# 🚀 DEPLOY TO NETLIFY - STEP BY STEP

**Status:** Netlify CLI has issues, use UI method instead (faster & easier!)

---

## ✅ METHOD 1: NETLIFY UI (RECOMMENDED - 5 MINUTES)

### Step 1: Prepare Files

Your files are ready at:
```
/Users/marcok./tap-in-netlify-deploy/
```

**Key files to verify exist:**
- ✅ index.html
- ✅ stripe-navigator.html
- ✅ lesson-viewer.html
- ✅ stripe-content.json (456KB)
- ✅ leadership-games.html
- ✅ confession-poker.html
- ✅ take-the-back.html
- ✅ disagree-commit.html
- ✅ conflict-cards.html

### Step 2: Go to Netlify

1. Open: https://app.netlify.com
2. Log in to your account
3. Click **"Add new site"** → **"Deploy manually"**

### Step 3: Drag & Drop

1. Open Finder
2. Navigate to `/Users/marcok./tap-in-netlify-deploy/`
3. Select ALL files in the folder (Cmd+A)
4. Drag them into the Netlify drop zone

**OR** (if that doesn't work):

1. Compress the folder:
   ```bash
   cd /Users/marcok./tap-in-netlify-deploy
   zip -r deploy.zip . -x "*.git*" -x "node_modules/*" -x "react-app/*"
   ```
2. Drag `deploy.zip` into Netlify

### Step 4: Wait for Deploy

- Netlify will upload and build (30-60 seconds)
- You'll see a progress bar
- When done, you'll get a live URL

### Step 5: Test Live Site

Visit your new URL (something like `https://random-name-123.netlify.app`)

**Test these pages:**
1. Homepage: `https://your-site.netlify.app/`
2. Belt Navigator: `https://your-site.netlify.app/stripe-navigator.html`
3. Lesson Viewer: `https://your-site.netlify.app/lesson-viewer.html?stripe=1`
4. Games Hub: `https://your-site.netlify.app/leadership-games.html`

### Step 6: Custom Domain (Optional)

1. In Netlify, go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `tap-in-the-gym.com`)
4. Follow DNS instructions

---

## ✅ METHOD 2: NETLIFY CLI (If You Fix It)

### Fix CLI Issues First

```bash
# Uninstall completely
npm uninstall -g netlify-cli

# Clear cache
npm cache clean --force

# Reinstall specific version
npm install -g netlify-cli@17.0.0

# Test
netlify --version
```

### Then Deploy

```bash
cd /Users/marcok./tap-in-netlify-deploy

# Link to existing site
netlify link

# Deploy
netlify deploy --prod
```

---

## ✅ METHOD 3: GITHUB + NETLIFY (BEST FOR PRODUCTION)

### Setup Git Repository

```bash
cd /Users/marcok./tap-in-netlify-deploy

# Initialize git (if not done)
git init

# Add files
git add stripe-navigator.html lesson-viewer.html stripe-content.json
git add leadership-games.html confession-poker.html take-the-back.html
git add disagree-commit.html conflict-cards.html index.html
git add *.md

# Commit
git commit -m "Deploy template-based belt system with all 80 lessons"

# Push to GitHub
git remote add origin https://github.com/YOUR-USERNAME/tap-in-netlify-deploy.git
git branch -M main
git push -u origin main
```

### Connect to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your repository
5. Click **Deploy**

**Benefits:**
- Automatic deploys on git push
- Preview deployments for testing
- Rollback capability
- CI/CD integration

---

## 📋 PRE-DEPLOY CHECKLIST

Before deploying, verify:

- [ ] `stripe-content.json` exists (456KB file)
- [ ] `lesson-viewer.html` exists
- [ ] `stripe-navigator.html` exists
- [ ] `index.html` has updated CTAs
- [ ] All 5 game HTML files exist
- [ ] No broken links in navigation
- [ ] No console errors in browser (test locally first)

### Quick Local Test

```bash
# Open in browser:
open stripe-navigator.html

# Test flow:
1. Click Stripe 1
2. Answer questions
3. Complete stripe
4. Verify XP tracking
5. Check Stripe 2 unlocks
```

---

## 🧪 POST-DEPLOY VERIFICATION

Once deployed, test these URLs:

### Core Pages

```
✓ Homepage: /
✓ Belt Navigator: /stripe-navigator.html
✓ Lesson Viewer: /lesson-viewer.html?stripe=1
✓ Games Hub: /leadership-games.html
```

### Individual Games

```
✓ Confession Poker: /confession-poker.html
✓ Take the Back: /take-the-back.html
✓ Disagree & Commit: /disagree-commit.html
✓ Conflict Cards: /conflict-cards.html
```

### Test All Stripes

```
✓ Stripe 1: /lesson-viewer.html?stripe=1
✓ Stripe 5: /lesson-viewer.html?stripe=5
✓ Stripe 10: /lesson-viewer.html?stripe=10
✓ Stripe 20: /lesson-viewer.html?stripe=20
```

### Mobile Testing

1. Open site on iPhone Safari
2. Test navigation
3. Answer questions (tap radio buttons)
4. Complete a stripe
5. Verify XP tracking

---

## 🐛 TROUBLESHOOTING

### Problem: "404 - Page not found"

**Solution:** Check file uploaded correctly
```bash
# In Netlify dashboard:
1. Go to "Deploys"
2. Click latest deploy
3. Check "Deploy log"
4. Verify all files listed
```

### Problem: "stripe-content.json not loading"

**Solution:** Check JSON is valid
```bash
# Test locally:
cat stripe-content.json | python3 -m json.tool

# Should output formatted JSON without errors
```

### Problem: "Questions not working"

**Solution:** Check JavaScript console
```
1. Open page in browser
2. Press F12 (DevTools)
3. Go to Console tab
4. Look for errors
5. Fix and redeploy
```

### Problem: "Mobile layout broken"

**Solution:** Check viewport meta tag exists in HTML:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 📊 DEPLOYMENT STATS

### What You're Deploying

| Item | Count/Size |
|------|------------|
| **HTML Files** | 9 |
| **JSON Data** | 456KB |
| **Total Stripes** | 20 |
| **Total Lessons** | 80 |
| **Total Questions** | 80 |
| **Total XP** | 3,200 |

### Expected Performance

- **Load Time:** <2 seconds
- **JSON Fetch:** <1 second
- **Page Size:** ~500KB total
- **Mobile Score:** 90+/100

---

## ✅ SUCCESS CRITERIA

Your deployment is successful when:

- [ ] Homepage loads with "Start Training" button
- [ ] Belt Navigator shows all 20 stripes
- [ ] Clicking Stripe 1 opens lesson-viewer
- [ ] Questions render and can be answered
- [ ] Completing stripe awards XP
- [ ] Stripe 2 unlocks after Stripe 1
- [ ] Games hub works
- [ ] All 4 games playable
- [ ] Mobile responsive
- [ ] No console errors

---

## 🎉 AFTER DEPLOYMENT

### Share Your Links

**Post on LinkedIn:**
```
🥋 Just launched Tap-In Leadership Academy

80 lessons across 5 belt levels teaching:
→ Trust foundations
→ Conflict mastery
→ Commitment practices
→ Accountability systems
→ Results focus

Plus 4 free leadership games.

Check it out: [YOUR-URL]

#Leadership #TeamDevelopment
```

**Send to Prospects:**
```
Hey [Name],

I just launched the free version of Tap-In:

[YOUR-URL]/stripe-navigator.html

80 leadership lessons + 4 training games.

Try the White Belt (Trust Foundations) and let me know what you think.

If it resonates, let's talk about bringing the full program to your team.

- Marco
```

---

## 📞 NEED HELP?

### Netlify Support

- Docs: https://docs.netlify.com
- Status: https://netlifystatus.com
- Forums: https://answers.netlify.com

### Your Files

- Full docs: `TEMPLATE-SYSTEM-DOCS.md`
- Quick start: `🎯_START_HERE_MARCO.md`
- This guide: `DEPLOY-NOW.md`

---

## 🚀 QUICK DEPLOY COMMAND

If CLI works, use this:

```bash
cd /Users/marcok./tap-in-netlify-deploy
netlify deploy --prod --dir=.
```

Otherwise, **just use the Netlify UI** (drag & drop method above).

---

**Ready to go live? Use Method 1 (Netlify UI) - it's the fastest!** 🎉

