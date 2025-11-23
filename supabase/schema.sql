-- TAP-IN Backend Schema
-- Supabase PostgreSQL Database Schema with Row-Level Security
-- Created: 2025-11-23

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE
-- =============================================
-- Managed by Supabase Auth, but we extend it with a profile
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.user_profiles
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.user_profiles
    FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.user_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- =============================================
-- TEAMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    invite_code TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(8), 'hex'),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster invite code lookups
CREATE INDEX IF NOT EXISTS idx_teams_invite_code ON public.teams(invite_code);

-- RLS Policies for teams
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view their teams"
    ON public.teams
    FOR SELECT
    USING (
        id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Team admins can update their teams"
    ON public.teams
    FOR UPDATE
    USING (
        id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Authenticated users can create teams"
    ON public.teams
    FOR INSERT
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Team admins can delete their teams"
    ON public.teams
    FOR DELETE
    USING (
        id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- TEAM MEMBERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.team_members (
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (team_id, user_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_team_members_user ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team ON public.team_members(team_id);

-- RLS Policies for team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view team membership"
    ON public.team_members
    FOR SELECT
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Team admins can add members"
    ON public.team_members
    FOR INSERT
    WITH CHECK (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Team admins can remove members"
    ON public.team_members
    FOR DELETE
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Members can leave teams"
    ON public.team_members
    FOR DELETE
    USING (user_id = auth.uid());

-- =============================================
-- ASSESSMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
    assessment_type TEXT NOT NULL CHECK (
        assessment_type IN (
            'leadership-style',
            'worker-type',
            'team-assessment',
            'work-life-balance',
            'mental-health',
            'combined-leadership',
            'leadership-carousel'
        )
    ),
    data JSONB NOT NULL,
    is_shared_with_team BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_assessments_user ON public.assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_team ON public.assessments(team_id);
CREATE INDEX IF NOT EXISTS idx_assessments_type ON public.assessments(assessment_type);

-- RLS Policies for assessments
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own assessments"
    ON public.assessments
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Team members can view shared team assessments"
    ON public.assessments
    FOR SELECT
    USING (
        is_shared_with_team = TRUE
        AND team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own assessments"
    ON public.assessments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments"
    ON public.assessments
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assessments"
    ON public.assessments
    FOR DELETE
    USING (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON public.teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at
    BEFORE UPDATE ON public.assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically add team creator as admin
CREATE OR REPLACE FUNCTION add_team_creator_as_admin()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.team_members (team_id, user_id, role)
    VALUES (NEW.id, NEW.created_by, 'admin');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_creator_as_admin
    AFTER INSERT ON public.teams
    FOR EACH ROW
    EXECUTE FUNCTION add_team_creator_as_admin();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- =============================================
-- HELPER VIEWS
-- =============================================

-- View for team statistics
CREATE OR REPLACE VIEW public.team_stats AS
SELECT 
    t.id AS team_id,
    t.name AS team_name,
    COUNT(DISTINCT tm.user_id) AS member_count,
    COUNT(DISTINCT a.id) AS total_assessments,
    COUNT(DISTINCT a.id) FILTER (WHERE a.is_shared_with_team = TRUE) AS shared_assessments,
    MAX(a.created_at) AS last_assessment_date
FROM public.teams t
LEFT JOIN public.team_members tm ON t.id = tm.team_id
LEFT JOIN public.assessments a ON t.id = a.team_id
GROUP BY t.id, t.name;

-- Grant access to authenticated users
GRANT SELECT ON public.team_stats TO authenticated;

-- =============================================
-- SAMPLE DATA (for testing - remove in production)
-- =============================================

-- This section can be used for local development
-- Comment out or remove before production deployment

/*
-- Create test user profile (after Supabase Auth user exists)
INSERT INTO public.user_profiles (id, email, name, company) VALUES
(
    '00000000-0000-0000-0000-000000000001'::uuid,
    'test@tapin.com',
    'Test User',
    'TAP-IN Demo'
);

-- Create test team
INSERT INTO public.teams (id, name, description, created_by) VALUES
(
    '10000000-0000-0000-0000-000000000001'::uuid,
    'Demo Team',
    'A demonstration team for testing',
    '00000000-0000-0000-0000-000000000001'::uuid
);

-- Create test assessment
INSERT INTO public.assessments (user_id, team_id, assessment_type, data, is_shared_with_team) VALUES
(
    '00000000-0000-0000-0000-000000000001'::uuid,
    '10000000-0000-0000-0000-000000000001'::uuid,
    'leadership-style',
    '{"score": 85, "type": "Transformational", "dimensions": {"vision": 90, "empathy": 80}}'::jsonb,
    TRUE
);
*/

-- =============================================
-- GRANTS
-- =============================================

-- Ensure authenticated users can access tables
GRANT ALL ON public.user_profiles TO authenticated;
GRANT ALL ON public.teams TO authenticated;
GRANT ALL ON public.team_members TO authenticated;
GRANT ALL ON public.assessments TO authenticated;

-- Allow usage of sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =============================================
-- COMPLETION
-- =============================================

-- Schema created successfully
-- Next steps:
-- 1. Run this in Supabase SQL Editor
-- 2. Create Supabase project at https://supabase.com
-- 3. Configure environment variables
-- 4. Test RLS policies
