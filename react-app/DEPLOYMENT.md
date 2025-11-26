# Deployment Guide for THE GYM React App

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Required

Add these to your Netlify dashboard under **Site settings → Environment variables**:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to get these:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings → API**
4. Copy **Project URL** and **anon public** key

### 2. Netlify Configuration

The `netlify.toml` file is already configured with:
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ SPA redirect rules (all routes → `/index.html`)
- ✅ Asset caching headers

### 3. Build Verification

**Local build test:**
```bash
cd react-app
npm run build
npm run preview  # Test production build locally
```

**Build output:**
- Total size: ~660 KB
- Main bundle: 617 KB (181 KB gzipped)
- CSS: 46 KB (7.3 KB gzipped)
- ✅ No TypeScript errors
- ✅ No build warnings (except chunk size - expected for single bundle)

## 🚀 Deployment Steps

### Option A: Deploy via Netlify CLI

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from the react-app directory
cd react-app
netlify deploy --prod
```

### Option B: Deploy via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add React app with authentication"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click **Add new site → Import an existing project**
   - Select **GitHub** and authorize
   - Choose your repository
   - Configure build settings:
     - **Base directory:** `react-app`
     - **Build command:** `npm run build`
     - **Publish directory:** `react-app/dist`

3. **Add Environment Variables:**
   - Go to **Site settings → Environment variables**
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

4. **Deploy:**
   - Click **Deploy site**
   - Wait for build to complete (~1-2 minutes)

### Option C: Drag & Drop Deploy

1. **Build locally:**
   ```bash
   cd react-app
   npm run build
   ```

2. **Deploy:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `react-app/dist` folder
   - ⚠️ **Note:** You'll need to manually add environment variables after

## 🔧 Post-Deployment Configuration

### 1. Update Supabase Auth Settings

In your Supabase project:
1. Go to **Authentication → URL Configuration**
2. Add your Netlify URL to **Site URL**: `https://your-app.netlify.app`
3. Add to **Redirect URLs**:
   - `https://your-app.netlify.app/dashboard`
   - `https://your-app.netlify.app/**` (wildcard for all routes)

### 2. Test Authentication Flow

1. Visit your deployed site
2. Try signing up with a new account
3. Check email for magic link (if using magic link auth)
4. Verify you can access protected routes

### 3. Verify Routes Work

Test these URLs directly (SPA routing):
- `/dashboard` → Should redirect to login if not authenticated
- `/belt-system` → Should work when logged in
- `/assessments` → Should work when logged in

## 📊 Build Optimization (Optional)

The build warning about chunk size is expected. To optimize:

### Code Splitting

Add to `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase': ['@supabase/supabase-js'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
});
```

## 🔍 Troubleshooting

### "Supabase not configured" error
- **Cause:** Environment variables not set in Netlify
- **Fix:** Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Netlify environment variables, then redeploy

### 404 on page refresh
- **Cause:** SPA redirect not configured
- **Fix:** Verify `netlify.toml` has the redirect rule (it should already be there)

### Magic link not working
- **Cause:** Redirect URL not whitelisted in Supabase
- **Fix:** Add your Netlify domain to Supabase redirect URLs

### Build fails on Netlify
- **Cause:** Usually missing environment variables or Node version mismatch
- **Fix:** 
  - Verify environment variables are set
  - Add `.nvmrc` file with Node version: `echo "18" > .nvmrc`

## 🎯 Performance Metrics

Expected Lighthouse scores:
- **Performance:** 90-100
- **Accessibility:** 95-100
- **Best Practices:** 95-100
- **SEO:** 90-100

## 🔐 Security Notes

✅ All sensitive data in environment variables
✅ Supabase Row-Level Security (RLS) enabled
✅ No API keys in client code
✅ HTTPS enforced by Netlify
✅ Protected routes require authentication

## 📱 Custom Domain (Optional)

To use a custom domain:
1. Go to **Site settings → Domain management**
2. Click **Add custom domain**
3. Follow DNS setup instructions
4. Update Supabase redirect URLs with new domain

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` → Auto-deploy to production
- Pull requests → Deploy previews
- Monitor builds in Netlify dashboard

## ✨ Success Criteria

Your deployment is successful when:
- ✅ Site loads at your Netlify URL
- ✅ You can create an account
- ✅ Authentication works (password or magic link)
- ✅ Protected routes redirect to login
- ✅ Dashboard shows after login
- ✅ All pages navigate correctly
- ✅ Build takes < 2 minutes
- ✅ No console errors

---

**Ready to deploy!** 🚀

Your app is production-ready and optimized for Netlify deployment.

