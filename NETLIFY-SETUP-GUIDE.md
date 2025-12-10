# Netlify Deployment Guide for Tap-In App

## Quick Setup Steps

### 1. Sign in to Netlify
- Go to [https://app.netlify.com](https://app.netlify.com)
- Sign in with your GitHub account (recommended) or email

### 2. Connect Your Repository
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"GitHub"** as your Git provider
3. Authorize Netlify to access your GitHub account (if first time)
4. Search for and select: **`koenigermarco-tapin/Tap-In-App`**

### 3. Configure Build Settings
Netlify should auto-detect these settings, but verify:

- **Base directory:** (leave empty - root is fine)
- **Build command:** `echo 'No build needed - static site'`
- **Publish directory:** `.` (root directory)

**OR** use these exact settings:
```
Base directory: (empty)
Build command: echo 'No build needed - static site'
Publish directory: .
```

### 4. Deploy
- Click **"Deploy site"**
- Wait for deployment to complete (~1-2 minutes)
- Your site will be live at: `https://random-name-12345.netlify.app`

### 5. Custom Domain (Optional)
- Go to **Site settings** → **Domain management**
- Click **"Add custom domain"**
- Enter your domain (e.g., `tap-in.app`)
- Follow DNS configuration instructions

## Configuration Files Already Included

✅ **netlify.toml** - Build settings, headers, redirects
✅ **_headers** - Security headers and cache control
✅ **_redirects** - URL redirects

## Important URLs After Deployment

- **Main site:** `https://your-site.netlify.app`
- **Gym Dashboard:** `https://your-site.netlify.app/gym-dashboard.html`
- **Learning Hub:** `https://your-site.netlify.app/learning-hub.html`
- **Belt Assessment:** `https://your-site.netlify.app/belt-assessment-v2.html`

## Environment Variables (if needed later)

If you need to add environment variables:
1. Go to **Site settings** → **Environment variables**
2. Add variables like:
   - `SUPABASE_URL` (if using Supabase)
   - `SUPABASE_ANON_KEY` (if using Supabase)

## Continuous Deployment

✅ **Automatic:** Every push to `main` branch will auto-deploy
✅ **Preview Deploys:** Pull requests get preview URLs automatically

## Troubleshooting

### If deployment fails:
1. Check **Deploy logs** in Netlify dashboard
2. Verify `netlify.toml` is in root directory
3. Ensure all files are committed to GitHub

### If site looks broken:
1. Clear browser cache
2. Check browser console for errors
3. Verify service worker is updated (check `sw.js` cache version)

## Support

- Netlify Docs: https://docs.netlify.com
- Netlify Status: https://www.netlifystatus.com

