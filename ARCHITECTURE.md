# 🏗️ TAP-IN Backend Architecture

## Table of Contents

1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Security Model](#security-model)
4. [Data Flow](#data-flow)
5. [API Reference](#api-reference)
6. [Testing Guide](#testing-guide)

---

## Overview

TAP-IN now uses a **secure, scalable backend architecture** powered by Supabase (PostgreSQL + RLS) and Netlify Functions.

### Key Features

✅ **Secure Authentication:** Passwordless magic link email auth  
✅ **Row-Level Security:** Database-enforced access control  
✅ **GDPR Compliant:** Users can only access their own data  
✅ **Multi-Device Sync:** Data synced via PostgreSQL  
✅ **Team Collaboration:** Secure team creation and joining  
✅ **Scalable:** Auto-scales to 50,000+ users (free tier)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  User Browser                                                │
│  ├── HTML Pages (index.html, team-dashboard.html)          │
│  ├── JS Modules                                             │
│  │   ├── supabase-client.js (auth + DB operations)         │
│  │   ├── auth-modal.html (login UI)                        │
│  │   └── data-migration.html (localStorage → DB)           │
│  └── localStorage (temporary cache only)                    │
│                                                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS + JWT
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      NETLIFY EDGE                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Static Hosting (HTML/CSS/JS)                               │
│  ├── HTTPS enforcement                                       │
│  ├── CDN distribution                                        │
│  └── Security headers                                        │
│                                                               │
│  Netlify Functions (Serverless API)                         │
│  ├── /create-team                                           │
│  ├── /join-team                                             │
│  ├── /my-teams                                              │
│  └── /save-assessment                                       │
│                                                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ PostgreSQL Protocol + RLS
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE BACKEND                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  PostgreSQL Database                                         │
│  ├── user_profiles                                          │
│  ├── teams                                                   │
│  ├── team_members                                           │
│  └── assessments                                            │
│                                                               │
│  Row-Level Security (RLS) Policies                          │
│  ├── Users see only their own data                         │
│  ├── Team members see team data                            │
│  └── Admins can manage teams                               │
│                                                               │
│  Authentication                                              │
│  ├── Magic link email auth                                 │
│  ├── JWT token management                                   │
│  └── Session handling                                       │
│                                                               │
│  Real-time Subscriptions (optional)                         │
│  └── Live team updates                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Model

### Authentication Flow

```
1. User enters email → TapInAuth.signInWithMagicLink(email)
2. Supabase sends magic link email
3. User clicks link → Redirected with access_token in URL hash
4. supabase-client.js extracts token → Stores session
5. All API calls include: Authorization: Bearer <token>
6. Supabase validates token → Returns user ID
7. RLS policies check: auth.uid() = user_id
```

### Row-Level Security (RLS)

**Every query is automatically filtered by the database:**

```sql
-- User tries to fetch ALL assessments
SELECT * FROM assessments;

-- PostgreSQL RLS transforms it to:
SELECT * FROM assessments 
WHERE user_id = auth.uid(); -- Only returns user's own data

-- Even with direct SQL access, users CANNOT bypass RLS
```

### Team Access Control

```sql
-- User tries to view team data
SELECT * FROM teams WHERE id = 'some-team-id';

-- RLS checks:
WHERE id IN (
  SELECT team_id FROM team_members
  WHERE user_id = auth.uid()
)

-- Returns data ONLY if user is a team member
```

### Invite Code Security

- **Random generation:** 16-character hex codes (`encode(gen_random_bytes(8), 'hex')`)
- **Database-level uniqueness:** UNIQUE constraint on `invite_code`
- **Server-side validation:** Netlify Function validates before adding member
- **No enumeration:** Cannot guess valid codes (2^64 possibilities)

---

## Data Flow

### Assessment Submission

**Before (localStorage only):**
```
User completes assessment
  ↓
JavaScript saves to localStorage
  ↓
Data stays on device forever
  ↓
No backup, no sync, no sharing
```

**After (with Supabase):**
```
User completes assessment
  ↓
JavaScript calls: TapInAuth.saveAssessment(type, data, teamId, share)
  ↓
Supabase client validates token
  ↓
PostgreSQL RLS checks user_id = auth.uid()
  ↓
INSERT into assessments table
  ↓
Data synced to all user's devices
  ↓
Team members can view (if shared)
```

### Team Join Flow

**Before (INSECURE):**
```javascript
// Client-side only - BAD!
const teams = JSON.parse(localStorage.getItem('tap-in-teams'));
const team = teams.find(t => t.id === userInput);
// Problem: ALL teams loaded in browser memory!
```

**After (SECURE):**
```javascript
// Server-side validation - GOOD!
const result = await TapInAuth.joinTeam(inviteCode);

// Behind the scenes:
// 1. Netlify Function receives request
// 2. Validates JWT token
// 3. Queries: SELECT * FROM teams WHERE invite_code = ?
// 4. Checks: NOT EXISTS in team_members for (team_id, user_id)
// 5. Inserts: INSERT INTO team_members (team_id, user_id, role)
// 6. Returns: Team data ONLY if authorized

// NO team data exposed to other users!
```

---

## API Reference

### Client-Side Functions

#### Authentication

```javascript
// Sign in with magic link
await TapInAuth.signInWithMagicLink('user@example.com');
// Returns: { data, message: "Check your email!" }

// Sign out
await TapInAuth.signOut();

// Get current user
const user = await TapInAuth.getCurrentUser();
// Returns: { id, email, ... }

// Check if authenticated
const isAuth = await TapInAuth.isAuthenticated();
// Returns: true/false

// Listen for auth changes
const unsubscribe = TapInAuth.onAuthStateChange((event, session) => {
  console.log('Auth changed:', event, session?.user);
});
```

#### User Profile

```javascript
// Get user profile
const { data } = await TapInAuth.getUserProfile(userId);
// Returns: { id, email, name, company, created_at }

// Update profile
await TapInAuth.updateUserProfile(userId, { 
  name: 'John Doe',
  company: 'ACME Corp'
});
```

#### Teams

```javascript
// Create team
const { data } = await TapInAuth.createTeam('My Team', 'Description');
// Returns: { id, name, invite_code, ... }

// Join team
const { data } = await TapInAuth.joinTeam('abc123xyz');
// Returns: { team data } or { error: 'Invalid invite code' }

// Get my teams
const { data: teams } = await TapInAuth.getMyTeams();
// Returns: [{ id, name, role, member_count, ... }]

// Get team members
const { data: members } = await TapInAuth.getTeamMembers(teamId);
// Returns: [{ user_id, role, email, name, ... }]

// Leave team
await TapInAuth.leaveTeam(teamId);
```

#### Assessments

```javascript
// Save assessment
await TapInAuth.saveAssessment(
  'leadership-style',           // type
  { score: 85, type: 'Trans' }, // data
  teamId,                        // optional
  true                           // share with team
);

// Get my assessments
const { data } = await TapInAuth.getMyAssessments('leadership-style');
// Returns: [{ id, data, created_at, ... }]

// Get team assessments
const { data } = await TapInAuth.getTeamAssessments(teamId);
// Returns: [{ id, data, user_profiles: { name, email }, ... }]

// Migrate from localStorage
await TapInAuth.migrateLocalAssessment(localData);
```

### Netlify Functions API

#### POST /create-team

**Request:**
```json
{
  "name": "Engineering Team",
  "description": "Product engineering squad"
}
```

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "team": {
    "id": "uuid",
    "name": "Engineering Team",
    "invite_code": "a1b2c3d4e5f6",
    "role": "admin"
  }
}
```

#### POST /join-team

**Request:**
```json
{
  "inviteCode": "a1b2c3d4e5f6"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined Engineering Team!",
  "team": {
    "id": "uuid",
    "name": "Engineering Team",
    "role": "member",
    "member_count": 5
  }
}
```

#### GET /my-teams

**Response:**
```json
{
  "teams": [
    {
      "id": "uuid",
      "name": "Engineering Team",
      "role": "admin",
      "member_count": 5,
      "assessment_count": 12,
      "created_at": "2025-11-23T10:00:00Z"
    }
  ]
}
```

---

## Testing Guide

### Manual Security Tests

#### Test 1: Verify RLS (Users can't see others' data)

1. Create two accounts (User A, User B)
2. User A creates assessment
3. Log in as User B
4. Try to fetch User A's assessment:

```javascript
// This should return EMPTY array (or error)
const { data } = await TapInAuth.getMyAssessments();
console.log(data); // Should NOT include User A's data
```

✅ **PASS:** User B sees only their own assessments  
❌ **FAIL:** User B can see User A's data → RLS broken

#### Test 2: Team Join Validation

1. User A creates team → Gets invite code
2. User B tries invalid code:

```javascript
const result = await TapInAuth.joinTeam('invalid999');
console.log(result.error); // Should be "Invalid invite code"
```

3. User B uses valid code:

```javascript
const result = await TapInAuth.joinTeam('a1b2c3d4');
console.log(result.data.name); // Should show team name
```

✅ **PASS:** Invalid code rejected, valid code works  
❌ **FAIL:** Any code accepted → Validation broken

#### Test 3: Cross-Device Sync

1. User logs in on Device A → Creates assessment
2. User logs in on Device B → Fetches assessments

```javascript
const { data } = await TapInAuth.getMyAssessments();
console.log(data.length); // Should include assessment from Device A
```

✅ **PASS:** Assessment visible on both devices  
❌ **FAIL:** Assessment missing → Sync broken

#### Test 4: GDPR Data Isolation

1. Open Supabase dashboard
2. Go to **Table Editor → assessments**
3. View data as admin
4. Verify: Each row has `user_id` column
5. Log in as User A
6. Run query in browser console:

```javascript
const supabase = window.supabase.createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);

const { data: { session } } = await TapInAuth.getSession();

const { data, error } = await supabase
  .from('assessments')
  .select('*');

console.log('Visible assessments:', data.length);
// Should ONLY show User A's assessments
```

✅ **PASS:** User A sees only their data  
❌ **FAIL:** User A sees all users' data → CRITICAL SECURITY ISSUE

### Automated Tests

Create `/tests/security.test.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

describe('Security Tests', () => {
  it('should prevent unauthorized data access', async () => {
    const userA = await signInUser('usera@test.com');
    const userB = await signInUser('userb@test.com');
    
    // User A creates assessment
    await createAssessment(userA.token, { score: 85 });
    
    // User B tries to fetch all assessments
    const assessments = await fetchAssessments(userB.token);
    
    // Verify User B doesn't see User A's data
    expect(assessments.every(a => a.user_id === userB.id)).toBe(true);
  });
});
```

---

## Migration Checklist

When deploying to production:

### Pre-Deployment ✅
- [ ] Run `supabase/schema.sql` in Supabase SQL Editor
- [ ] Configure Netlify environment variables
- [ ] Test RLS policies with 2+ test accounts
- [ ] Verify magic link emails send correctly
- [ ] Test team join flow end-to-end

### Post-Deployment ✅
- [ ] Monitor Supabase logs for errors
- [ ] Check Netlify Function logs
- [ ] Test production auth flow
- [ ] Verify HTTPS enforcement
- [ ] Update privacy policy

### Ongoing Monitoring ✅
- [ ] Supabase database size (free tier: 500MB)
- [ ] Active users (free tier: 50,000)
- [ ] Netlify Function invocations (free tier: 125k/month)
- [ ] Email auth rate limits

---

## Troubleshooting

### "Supabase not configured" Error

**Cause:** Environment variables not set  
**Fix:**
1. Check Netlify dashboard → Site settings → Environment variables
2. Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
3. Redeploy site after adding variables

### Magic Link Not Working

**Cause:** Redirect URL mismatch  
**Fix:**
1. Supabase → Authentication → URL Configuration
2. Add your site URL to **Redirect URLs**
3. Ensure **Site URL** matches your domain

### RLS Blocking Legitimate Queries

**Cause:** Policy misconfiguration  
**Fix:**
1. Supabase → Table Editor → [table] → Policies
2. Compare with `/supabase/schema.sql`
3. Re-run schema if policies don't match

---

## Performance Optimization

### Database Indexes

Already created by schema:
- `idx_teams_invite_code` on `teams(invite_code)`
- `idx_team_members_user` on `team_members(user_id)`
- `idx_assessments_user` on `assessments(user_id)`

### Query Optimization

**Good:**
```javascript
// Fetch only needed fields
const { data } = await supabase
  .from('assessments')
  .select('id, data, created_at')
  .eq('assessment_type', 'leadership-style')
  .limit(10);
```

**Bad:**
```javascript
// Fetches ALL assessments, ALL fields
const { data } = await supabase
  .from('assessments')
  .select('*');
```

---

## Scaling Considerations

### Free Tier Limits

| Resource | Limit | Upgrade Trigger |
|----------|-------|-----------------|
| Database | 500MB | ~10,000 assessments |
| Auth Users | 50,000 | 50k signups |
| API Requests | Unlimited | Rate limits apply |
| Bandwidth | 5GB/month | High-traffic sites |

### When to Upgrade

- **Pro Plan ($25/mo):** 8GB database, 100k users
- **Team Plan ($599/mo):** 100GB database, custom limits

---

**Architecture implemented:** November 2025  
**Last updated:** 2025-11-23  
**Maintained by:** TAP-IN Team
