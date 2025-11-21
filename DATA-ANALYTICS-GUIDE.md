# 📊 TAP-IN Data Analytics & Export System

Complete guide to collecting, analyzing, and exporting assessment data.

## 🎯 What's Included

We've implemented **all 3 data collection options** to give you maximum flexibility:

1. **✅ Client-Side Export** (Working now - no setup needed)
2. **📊 Google Sheets Integration** (5 min setup)
3. **🗄️ Backend Database** (15-30 min setup)

---

## Option 1: Client-Side CSV/XLSX Export ✅

### Status: **WORKING NOW**

Users can download their own assessment results immediately.

### Features:
- ✅ Download as CSV
- ✅ Download as Excel (.xlsx)
- ✅ Download as JSON
- ✅ All data processing in browser (privacy-friendly)
- ✅ Works offline
- ✅ No backend required

### What Users Get:
```
Team Dynamics Assessment Results
Date: 2025-11-22T14:30:00Z
Overall Score: 78/100
Team Health: Strong Foundation

Category Scores:
Trust: 16/20 (80%)
Healthy Conflict: 15/20 (75%)
Commitment: 17/20 (85%)
Accountability: 14/20 (70%)
Results Focus: 16/20 (80%)

Detailed Responses:
[All 20 questions with scores]
```

### Implemented In:
- ✅ `team-assessment-enhanced-v2.html`
- ⏳ Need to add to 11 more files

---

## Option 2: Google Sheets Integration 📊

### Status: **Ready to activate** (5 min setup)

Automatically sends all assessment data to a Google Sheet for centralized analytics.

### Setup Instructions:

#### Step 1: Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click **New Project**
3. Name it: "TAP-IN Assessment Collector"
4. Copy entire contents of `google-apps-script-collector.gs` into the script editor
5. **Save** (Ctrl/Cmd + S)

#### Step 2: Create Google Sheet
1. Create a new Google Sheet: [sheets.google.com](https://sheets.google.com)
2. Name it: "TAP-IN Assessments"
3. Share it with yourself (you'll need edit access)

#### Step 3: Deploy Web App
1. In Apps Script, click **Deploy** → **New Deployment**
2. Click **⚙️ Select type** → **Web App**
3. Settings:
   - **Description**: "TAP-IN Data Collector"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **IMPORTANT**: Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

#### Step 4: Update Your HTML Files
Find this line in each assessment file:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Replace with your actual URL:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';
```

**Files to update** (search for `YOUR_GOOGLE_APPS_SCRIPT`):
- team-assessment-enhanced-v2.html
- team-assessment-enhanced-v2.de.html
- mental-health-assessment.html
- mental-health-assessment.de.html
- work-life-balance-carousel.html
- work-life-balance-carousel.de.html
- leadership-style-assessment.html
- leadership-style-assessment.de.html
- worker-type-assessment.html
- worker-type-assessment.de.html
- combined-leadership-profile.html
- combined-leadership-profile.de.html

#### Step 5: Test It!
1. Complete an assessment on your site
2. Check Google Sheet - should auto-create sheets:
   - **Team Dynamics** sheet
   - **Leadership Style** sheet
   - **Mental Health** sheet
   - **Work-Life Balance** sheet
   - **Worker Type** sheet
   - **Summary Dashboard** sheet (auto-updating stats)

### What You Get in Google Sheets:

**Team Dynamics Sheet:**
| Timestamp | Total Score | Team Health Level | Trust | Conflict | Commitment | Accountability | Results | User Agent | Language | Answers JSON |
|-----------|-------------|-------------------|-------|----------|------------|----------------|---------|------------|----------|--------------|
| 2025-11-22 14:30 | 78 | Strong Foundation | 16 | 15 | 17 | 14 | 16 | Chrome 120 | en-US | {...} |

**Summary Dashboard (Auto-updating):**
- Total Assessments Completed
- Breakdown by type
- Average scores
- Last updated timestamp

### Exporting from Google Sheets:
- **File** → **Download** → **CSV**
- **File** → **Download** → **Excel (.xlsx)**
- Use Google Sheets API for programmatic access

---

## Option 3: Backend Database 🗄️

### Status: **Code ready** (requires Supabase or Airtable account)

Store all data in a proper database with advanced querying and analytics.

### Recommended: Supabase (Free Tier Available)

#### Setup Instructions:

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up (free)
   - Create new project: "TAP-IN Assessments"

2. **Create Database Table**
   Run this SQL in Supabase SQL Editor:
   ```sql
   CREATE TABLE assessments (
     id BIGSERIAL PRIMARY KEY,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     assessment_type TEXT NOT NULL,
     timestamp TIMESTAMPTZ NOT NULL,
     total_score INTEGER,
     max_score INTEGER,
     percentage INTEGER,
     level_text TEXT,
     categories JSONB,
     details JSONB,
     user_agent TEXT,
     language TEXT,
     ip_address TEXT,
     referer TEXT,
     framework TEXT
   );

   -- Enable Row Level Security
   ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow inserts from your domain
   CREATE POLICY "Allow public inserts" ON assessments
     FOR INSERT WITH CHECK (true);

   -- Create policy to allow admin reads (you'll add auth later)
   CREATE POLICY "Allow admin reads" ON assessments
     FOR SELECT USING (true);
   ```

3. **Get API Keys**
   - Go to Project Settings → API
   - Copy **Project URL** (e.g., `https://abc123.supabase.co`)
   - Copy **anon/public** key

4. **Configure Netlify Environment Variables**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add:
     - `SUPABASE_URL` = your project URL
     - `SUPABASE_KEY` = your anon/public key

5. **Install Dependencies**
   ```bash
   npm init -y  # if you don't have package.json
   npm install @supabase/supabase-js
   ```

6. **Deploy Function**
   - The function is already at: `netlify/functions/save-assessment.js`
   - Next deploy will pick it up automatically

7. **Test**
   - Complete assessment
   - Check Supabase Table Editor - should see new row

### Querying Your Data:

```javascript
// Get all team assessments from last 7 days
const { data } = await supabase
  .from('assessments')
  .select('*')
  .eq('assessment_type', 'team-dynamics')
  .gte('timestamp', new Date(Date.now() - 7*24*60*60*1000).toISOString())
  .order('timestamp', { ascending: false });
```

---

## 🎛️ Admin Dashboard

### Access: `admin-dashboard.html`

**Password**: `tapin2025` (change in production!)

### Features:
- 📊 Real-time stats (total assessments, breakdown by type)
- 🔍 Filter by date range & assessment type
- 📥 Export filtered data to CSV/Excel/JSON
- 📈 View individual assessment details
- 📅 Weekly trend tracking

### Production Setup:
1. **Change password** in `admin-dashboard.html` line 231
2. **Fetch backend data** - uncomment line 237 to pull from Netlify Function
3. **Add authentication** - integrate with Netlify Identity or Auth0
4. **Protect route** - add to `_headers`:
   ```
   /admin-dashboard.html
     Basic-Auth: username:password
   ```

---

## 📋 Implementation Checklist

### Phase 1: Client-Side Export (DONE ✅)
- [x] Add SheetJS library
- [x] Implement CSV export
- [x] Implement Excel export
- [x] Implement JSON export
- [x] Add export buttons to team assessment
- [ ] Roll out to 11 other assessment files

### Phase 2: Google Sheets (5 min)
- [ ] Create Google Apps Script
- [ ] Deploy as Web App
- [ ] Update 12 HTML files with Web App URL
- [ ] Test with sample assessment
- [ ] Verify data appears in sheets

### Phase 3: Backend Database (30 min)
- [ ] Create Supabase account & project
- [ ] Run SQL schema
- [ ] Get API keys
- [ ] Add to Netlify env vars
- [ ] Install npm dependencies
- [ ] Deploy to Netlify
- [ ] Test end-to-end

### Phase 4: Admin Dashboard (DONE ✅)
- [x] Create admin-dashboard.html
- [ ] Change default password
- [ ] Connect to backend data source
- [ ] Add authentication
- [ ] Deploy & test

---

## 📊 Data Privacy & GDPR Compliance

### Client-Side Export (Option 1):
- ✅ **GDPR Compliant** - No data sent to servers
- ✅ **Privacy First** - All processing in user's browser
- ✅ User owns their data

### Google Sheets (Option 2):
- ⚠️ **Add to Privacy Policy** - "We collect assessment data for research"
- ⚠️ **Anonymized by default** - No email/names unless provided
- ⚠️ **Right to deletion** - Manual process (delete rows)

### Backend Database (Option 3):
- ⚠️ **GDPR Requirements**:
  - Privacy policy update
  - Cookie consent (if tracking IP)
  - Data export on request (already built!)
  - Right to deletion API endpoint
- ✅ **Recommended**: Don't store PII (personally identifiable info)
- ✅ **IP Anonymization**: Hash IPs before storing

### Recommended Privacy Policy Addition:
```
Data Collection:
We collect anonymous assessment responses to improve our tools and 
provide aggregated insights. This includes:
- Your scores and answers
- Device language
- Browser type (no tracking)
- Timestamp

You can download your data anytime using the export buttons.
We never sell your data. Email us to request deletion.
```

---

## 🚀 Quick Start Guide

### Want data TODAY? Use Option 2 (Google Sheets)

**5-Minute Setup:**
1. Open [script.google.com](https://script.google.com)
2. New Project → Paste `google-apps-script-collector.gs`
3. Deploy → Web App → Copy URL
4. Find/Replace in all HTML files: `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
5. Deploy to Netlify
6. Done! Check your Google Sheet after each assessment

---

## 📈 Analytics You Can Track

With all 3 options combined, you can answer:

### User Insights:
- Which assessments are most popular?
- What's the average team health score?
- How many people complete vs abandon?
- Which questions cause drop-off?
- Language distribution (EN vs DE)?

### Business Metrics:
- Daily/weekly/monthly submissions
- Conversion rate (views → completions)
- Share rate (completions → social shares)
- Email capture rate
- Return user rate (localStorage tracking)

### Product Development:
- Which insights get most engagement?
- Score distributions per category
- Correlation between categories
- Low-scoring areas (improvement opportunities)

---

## 🔧 Troubleshooting

### Google Sheets not receiving data?
- Check Web App URL is correct
- Verify deployment is set to "Anyone"
- Check Apps Script execution logs
- Ensure no CORS errors in browser console

### Netlify Function not working?
- Verify environment variables are set
- Check function logs in Netlify dashboard
- Ensure @supabase/supabase-js is in dependencies
- Redeploy after env var changes

### Export buttons not showing?
- Check browser console for JavaScript errors
- Verify SheetJS library loaded (check network tab)
- Ensure `addExportButtons()` is called after results display

---

## 💡 Next Steps

1. **Start with Google Sheets** (easiest, works immediately)
2. **Add backend database** when you hit 1,000+ assessments
3. **Build custom dashboards** in tools like:
   - Google Data Studio (connects to Sheets)
   - Metabase (open source)
   - Tableau (enterprise)
   - Custom React dashboard

---

## 📞 Support

Need help? Check:
- Google Apps Script docs: https://developers.google.com/apps-script
- Supabase docs: https://supabase.com/docs
- SheetJS docs: https://docs.sheetjs.com

---

**Last Updated**: November 22, 2025
**Version**: 1.0.0
