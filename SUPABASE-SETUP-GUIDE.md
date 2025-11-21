# Supabase Setup Guide - TAP-IN Assessments

## Step 1: Create Supabase Account & Project

1. **Go to** [https://supabase.com](https://supabase.com)
2. **Sign up** with GitHub (recommended) or email
3. **Create new project:**
   - Organization: Create new or use existing
   - Project name: `tap-in-assessments`
   - Database password: Generate strong password and **SAVE IT**
   - Region: Choose closest to your users (Europe Central for DE/EU)
   - Pricing plan: Free tier (up to 500MB database, 50,000 monthly active users)

4. **Wait 2-3 minutes** for project provisioning

## Step 2: Run Database Schema

1. **Open SQL Editor:**
   - In Supabase dashboard → Left sidebar → "SQL Editor"
   - Click "+ New query"

2. **Copy & Paste Schema:**
   - Open `supabase-setup.sql` from this repo
   - Copy entire contents (all ~285 lines)
   - Paste into SQL Editor
   - Click **"RUN"** button (bottom right)

3. **Verify Tables Created:**
   - Left sidebar → "Table Editor"
   - You should see:
     - ✅ `assessments` (17 columns)
     - ✅ `leads` (17 columns)
     - ✅ `email_events` (9 columns)
   - Plus views: `assessment_overview`, `industry_benchmarks`, `lead_funnel`

## Step 3: Get API Credentials

1. **Project Settings:**
   - Left sidebar → "Settings" ⚙️ → "API"

2. **Copy these values:**
   ```
   Project URL: https://[YOUR-PROJECT-ID].supabase.co
   anon public key: eyJhbG... (long JWT token)
   service_role key: eyJhbG... (long JWT token - KEEP SECRET!)
   ```

3. **Important:**
   - `anon` key = Public (safe for frontend)
   - `service_role` key = Secret (only for Netlify Functions)

## Step 4: Configure Netlify Environment Variables

1. **Go to Netlify Dashboard:**
   - [https://app.netlify.com](https://app.netlify.com)
   - Select your `tap-in-assessments` site

2. **Add Environment Variables:**
   - Site configuration → "Environment variables"
   - Click "Add a variable" for each:

   ```
   Key: SUPABASE_URL
   Value: https://[YOUR-PROJECT-ID].supabase.co
   
   Key: SUPABASE_ANON_KEY
   Value: [Your anon public key from Step 3]
   
   Key: SUPABASE_SERVICE_KEY
   Value: [Your service_role key from Step 3]
   ```

3. **Save** and **Redeploy** site (Netlify will auto-redeploy)

## Step 5: Test Database Connection

### Option A: Using SQL Editor (Quick Test)

In Supabase SQL Editor, run:

```sql
-- Insert test assessment
INSERT INTO assessments (
    worker_type, 
    leadership_style, 
    team_trust, 
    team_conflict, 
    team_commitment, 
    team_accountability, 
    team_results,
    industry,
    company_size,
    role,
    language,
    assessment_type
) VALUES (
    'jogger',
    'facilitator',
    14,
    12,
    15,
    13,
    14,
    'hospitality',
    '51-200',
    'General Manager',
    'en',
    'combined'
);

-- Verify it was inserted
SELECT * FROM assessments ORDER BY created_at DESC LIMIT 5;

-- Check analytics view
SELECT * FROM assessment_overview;
```

### Option B: Using Netlify Function (After code update)

Will work once you update `submit-results.js` (next step).

## Step 6: Update Netlify Function to Use Supabase

**File:** `netlify/functions/submit-results.js`

Replace the entire file with:

```javascript
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle OPTIONS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    // Only accept POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        
        // Validate required fields
        if (!data.workerType || !data.leadershipStyle || !data.teamScores) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Insert assessment into Supabase
        const { data: assessment, error } = await supabase
            .from('assessments')
            .insert({
                worker_type: data.workerType,
                leadership_style: data.leadershipStyle,
                team_trust: data.teamScores.trust || null,
                team_conflict: data.teamScores.conflict || null,
                team_commitment: data.teamScores.commitment || null,
                team_accountability: data.teamScores.accountability || null,
                team_results: data.teamScores.results || null,
                
                // Demographics (optional)
                industry: data.industry || null,
                company_size: data.companySize || null,
                role: data.role || null,
                years_experience: data.yearsExperience || null,
                country: data.country || null,
                
                // Session data
                language: data.language || 'en',
                assessment_type: data.assessmentType || 'combined',
                completion_time_seconds: data.completionTime || null,
                device_type: data.deviceType || null,
                referrer: data.referrer || null,
                utm_source: data.utmSource || null,
                utm_medium: data.utmMedium || null,
                utm_campaign: data.utmCampaign || null,
                
                // Detailed scores (store as JSONB)
                worker_scores: data.workerScores || null,
                leadership_scores: data.leadershipScores || null,
                team_scores_detail: data.teamScoresDetail || null
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'Database error', 
                    details: error.message 
                })
            };
        }

        // Get aggregate statistics for response
        const { data: stats } = await supabase
            .from('assessments')
            .select('worker_type, leadership_style, team_trust, team_conflict, team_commitment, team_accountability, team_results');

        // Calculate totals
        const totals = {
            totalSubmissions: stats?.length || 0,
            workerType: {
                sprinter: stats?.filter(s => s.worker_type === 'sprinter').length || 0,
                jogger: stats?.filter(s => s.worker_type === 'jogger').length || 0,
                ultrarunner: stats?.filter(s => s.worker_type === 'ultrarunner').length || 0
            },
            leadershipStyle: {
                visionary: stats?.filter(s => s.leadership_style === 'visionary').length || 0,
                architect: stats?.filter(s => s.leadership_style === 'architect').length || 0,
                facilitator: stats?.filter(s => s.leadership_style === 'facilitator').length || 0,
                executor: stats?.filter(s => s.leadership_style === 'executor').length || 0
            }
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Assessment saved successfully',
                id: assessment.id,
                stats: totals
            })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            })
        };
    }
};
```

**Then install Supabase package:**

```bash
cd netlify/functions
npm init -y  # If no package.json exists
npm install @supabase/supabase-js
```

## Step 7: Deploy Updated Function

```bash
git add netlify/functions/submit-results.js netlify/functions/package.json netlify/functions/package-lock.json
git commit -m "feat: Migrate submit-results to Supabase for persistent storage"
git push origin main
```

Netlify will auto-deploy (2-3 minutes).

## Step 8: Verify End-to-End Flow

1. **Take Combined Assessment:**
   - Go to your site: `https://tap-in-assessments.netlify.app/combined-leadership-profile.html`
   - Complete all 46 questions
   - View results

2. **Check Supabase:**
   - Supabase dashboard → Table Editor → `assessments`
   - Should see new row with your results
   - `created_at` timestamp should be recent

3. **Check Statistics Page:**
   - `https://tap-in-assessments.netlify.app/statistics.html`
   - Should show updated counts (after we update statistics.html)

## Troubleshooting

### Error: "Failed to fetch"
- Check Netlify environment variables are set correctly
- Redeploy site after adding env vars
- Check browser console for CORS errors

### Error: "Database error"
- Verify RLS policies are enabled (should be from SQL script)
- Check Supabase logs: Dashboard → Logs → Postgres Logs
- Verify table structure matches schema

### Error: "Module not found: @supabase/supabase-js"
- Run `npm install @supabase/supabase-js` in `netlify/functions/`
- Commit `package.json` and `package-lock.json`
- Redeploy

### No data showing in Supabase
- Check Netlify Function logs: Site settings → Functions → submit-results
- Verify API keys are correct (not swapped anon/service)
- Test with SQL insert directly in Supabase

## Next Steps

After Supabase is working:

1. ✅ Update `statistics.html` to fetch from Supabase (not in-memory)
2. ✅ Add email capture form to combined-leadership-profile.html
3. ✅ Create `send-results-email` Netlify Function
4. ✅ Build admin dashboard at `/admin/dashboard.html`
5. ✅ Create industry benchmark pages

## Security Notes

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public can INSERT assessments (website form)
- ✅ Only service_role can READ/UPDATE/DELETE (Netlify Functions)
- ✅ Anon key safe for frontend (limited permissions)
- ❌ NEVER commit service_role key to git (use Netlify env vars only)

## Free Tier Limits

Supabase Free Tier:
- 500 MB database storage (~50,000+ assessments)
- 50,000 monthly active users
- 2 GB bandwidth/month
- 1 GB file storage
- Unlimited API requests

Should be sufficient for:
- 1,000-5,000 assessments/month
- 10,000-20,000 visitors/month
- Small to medium lead generation

When to upgrade ($25/month Pro):
- 10,000+ assessments/month
- 50,000+ visitors/month
- Need backups/point-in-time recovery
- Need more than 2 projects
