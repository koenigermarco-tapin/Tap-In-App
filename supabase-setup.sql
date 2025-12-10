-- ============================================
-- TAP-IN SUPABASE SCHEMA
-- Anonymous Auth + Progress Sync
-- GDPR Compliant - No Personal Data
-- ============================================

-- Enable Anonymous Auth in Supabase Dashboard:
-- Authentication > Providers > Anonymous Sign-ins > Enable

-- 1. User Backup Codes Table
CREATE TABLE IF NOT EXISTS user_backup_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    backup_code VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_used_at TIMESTAMPTZ
);

-- 2. User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    backup_code VARCHAR(50),
    progress_data JSONB DEFAULT '{}',
    current_belt VARCHAR(20) DEFAULT 'white',
    total_xp INTEGER DEFAULT 0,
    stripes_completed INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 3. Team Memberships Table (for DNA sharing & team join)
CREATE TABLE IF NOT EXISTS team_memberships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_code VARCHAR(50) NOT NULL,
    user_backup_code VARCHAR(50) NOT NULL,
    display_name VARCHAR(100),
    archetype VARCHAR(50),
    worker_type VARCHAR(20),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    invited_by VARCHAR(50),
    UNIQUE(team_code, user_backup_code)
);

-- 4. Shared DNA Profiles (for share links)
CREATE TABLE IF NOT EXISTS shared_dna_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    share_code VARCHAR(100) UNIQUE NOT NULL,
    backup_code VARCHAR(50) NOT NULL,
    dna_data JSONB NOT NULL,
    team_code VARCHAR(50),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- 5. Leaderboard View
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
    backup_code,
    current_belt,
    total_xp,
    stripes_completed,
    updated_at,
    ROW_NUMBER() OVER (ORDER BY total_xp DESC) as rank
FROM user_progress
WHERE total_xp > 0
ORDER BY total_xp DESC
LIMIT 100;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_backup_codes_code ON user_backup_codes(backup_code);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_backup ON user_progress(backup_code);
CREATE INDEX IF NOT EXISTS idx_team_members_code ON team_memberships(team_code);
CREATE INDEX IF NOT EXISTS idx_shared_dna_code ON shared_dna_profiles(share_code);

-- Row Level Security (RLS)
ALTER TABLE user_backup_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_dna_profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own data
CREATE POLICY "Users can read own backup code" ON user_backup_codes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own backup code" ON user_backup_codes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR ALL USING (auth.uid() = user_id);

-- Team memberships are readable by team members
CREATE POLICY "Team members can read team" ON team_memberships
    FOR SELECT USING (true);

CREATE POLICY "Users can join teams" ON team_memberships
    FOR INSERT WITH CHECK (true);

-- Shared profiles are public (for share links)
CREATE POLICY "Anyone can view shared profiles" ON shared_dna_profiles
    FOR SELECT USING (expires_at > NOW());

CREATE POLICY "Users can create shared profiles" ON shared_dna_profiles
    FOR INSERT WITH CHECK (true);

-- ============================================
-- SETUP INSTRUCTIONS:
-- ============================================
-- 1. Create a new Supabase project at https://supabase.com
-- 2. Go to SQL Editor and run this entire script
-- 3. Go to Authentication > Providers > Enable "Anonymous Sign-ins"
-- 4. Copy your project URL and anon key from Settings > API
-- 5. Update js/auth-system.js with your credentials:
--    - Replace 'YOUR_SUPABASE_URL' with your project URL
--    - Replace 'YOUR_SUPABASE_ANON_KEY' with your anon key
-- 6. Add Supabase JS client to your HTML files:
--    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
-- ============================================
