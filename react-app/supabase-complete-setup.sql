-- TAP-IN Complete Database Setup
-- Run this ONCE in your Supabase SQL Editor
-- This creates all tables and functions needed for the app

-- ============================================================================
-- PART 1: Create user_profiles table
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Gamification fields
    total_xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    current_belt VARCHAR(10) DEFAULT 'white' CHECK (current_belt IN ('white', 'blue', 'purple', 'brown', 'black')),
    current_stripe INTEGER DEFAULT 0 CHECK (current_stripe BETWEEN 0 AND 4),
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_active_date DATE,
    badges TEXT[] DEFAULT '{}',
    completed_modules TEXT[] DEFAULT '{}',
    completed_assessments TEXT[] DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON user_profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================================================
-- PART 2: Create XP History table
-- ============================================================================

CREATE TABLE IF NOT EXISTS xp_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    source VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE xp_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for xp_history
CREATE POLICY "Users can view their own XP history"
ON xp_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own XP history"
ON xp_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- PART 3: Create Assessment Results table
-- ============================================================================

CREATE TABLE IF NOT EXISTS assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    assessment_type VARCHAR(50) NOT NULL,
    answers JSONB NOT NULL,
    results JSONB NOT NULL,
    score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessment_results
CREATE POLICY "Users can view their own assessment results"
ON assessment_results FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessment results"
ON assessment_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessment results"
ON assessment_results FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- PART 4: Create Indexes for Performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_xp_history_user_id ON xp_history(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_history_created_at ON xp_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_created_at ON assessment_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_results_type ON assessment_results(assessment_type);

-- ============================================================================
-- PART 5: Function to Add XP
-- ============================================================================

CREATE OR REPLACE FUNCTION add_xp(
    p_user_id UUID,
    p_amount INTEGER,
    p_source VARCHAR(100) DEFAULT NULL,
    p_description TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    v_new_xp INTEGER;
    v_new_level INTEGER;
    v_new_belt VARCHAR(10);
    v_new_stripe INTEGER;
    v_belt_start INTEGER;
    v_belt_end INTEGER;
    v_belt_progress NUMERIC;
    v_old_belt VARCHAR(10);
    v_old_level INTEGER;
BEGIN
    -- Get current belt and XP
    SELECT current_belt, total_xp, level INTO v_old_belt, v_new_xp, v_old_level
    FROM user_profiles
    WHERE id = p_user_id;
    
    -- If no profile exists, return error
    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Profile not found'
        );
    END IF;
    
    -- Calculate new XP
    v_new_xp := v_new_xp + p_amount;
    
    -- Calculate new level (500 XP per level)
    v_new_level := FLOOR(v_new_xp / 500.0) + 1;
    
    -- Calculate new belt based on XP thresholds
    v_new_belt := CASE
        WHEN v_new_xp >= 10000 THEN 'black'
        WHEN v_new_xp >= 6000 THEN 'brown'
        WHEN v_new_xp >= 3000 THEN 'purple'
        WHEN v_new_xp >= 1000 THEN 'blue'
        ELSE 'white'
    END;
    
    -- Calculate stripe within current belt
    v_belt_start := CASE v_new_belt
        WHEN 'black' THEN 10000
        WHEN 'brown' THEN 6000
        WHEN 'purple' THEN 3000
        WHEN 'blue' THEN 1000
        ELSE 0
    END;
    
    v_belt_end := CASE v_new_belt
        WHEN 'black' THEN 15000
        WHEN 'brown' THEN 10000
        WHEN 'purple' THEN 6000
        WHEN 'blue' THEN 3000
        ELSE 1000
    END;
    
    v_belt_progress := (v_new_xp - v_belt_start)::NUMERIC / (v_belt_end - v_belt_start)::NUMERIC;
    v_new_stripe := LEAST(4, FLOOR(v_belt_progress * 4));
    
    -- Update user profile
    UPDATE user_profiles
    SET 
        total_xp = v_new_xp,
        level = v_new_level,
        current_belt = v_new_belt,
        current_stripe = v_new_stripe,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    -- Log XP gain
    INSERT INTO xp_history (user_id, amount, source, description)
    VALUES (p_user_id, p_amount, p_source, p_description);
    
    -- Return result with promotion flags
    RETURN json_build_object(
        'success', true,
        'new_xp', v_new_xp,
        'new_level', v_new_level,
        'new_belt', v_new_belt,
        'new_stripe', v_new_stripe,
        'level_up', v_new_level > v_old_level,
        'belt_promotion', v_new_belt != v_old_belt
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PART 6: Function to Update Streak
-- ============================================================================

CREATE OR REPLACE FUNCTION update_streak(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
    v_last_active DATE;
    v_current_streak INTEGER;
    v_longest_streak INTEGER;
    v_today DATE := CURRENT_DATE;
    v_yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
    v_new_streak INTEGER;
    v_streak_milestone BOOLEAN := false;
BEGIN
    -- Get current streak data
    SELECT last_active_date, current_streak, longest_streak
    INTO v_last_active, v_current_streak, v_longest_streak
    FROM user_profiles
    WHERE id = p_user_id;
    
    -- If no profile, return error
    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Profile not found'
        );
    END IF;
    
    -- Calculate new streak
    IF v_last_active = v_today THEN
        -- Already logged today, no change
        v_new_streak := v_current_streak;
    ELSIF v_last_active = v_yesterday THEN
        -- Continuing streak
        v_new_streak := v_current_streak + 1;
        -- Check for milestone (7, 30, 100 days)
        v_streak_milestone := v_new_streak IN (7, 30, 100);
    ELSE
        -- Streak broken, start new
        v_new_streak := 1;
    END IF;
    
    -- Update profile
    UPDATE user_profiles
    SET 
        current_streak = v_new_streak,
        longest_streak = GREATEST(v_new_streak, v_longest_streak),
        last_active_date = v_today,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    -- Return result
    RETURN json_build_object(
        'success', true,
        'current_streak', v_new_streak,
        'longest_streak', GREATEST(v_new_streak, v_longest_streak),
        'streak_milestone', v_streak_milestone,
        'streak_continued', v_last_active = v_yesterday,
        'streak_reset', v_last_active IS NULL OR (v_last_active != v_today AND v_last_active != v_yesterday)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PART 7: Function to Add Badge
-- ============================================================================

CREATE OR REPLACE FUNCTION add_badge(p_user_id UUID, p_badge VARCHAR(100))
RETURNS JSON AS $$
DECLARE
    v_badges TEXT[];
    v_is_new BOOLEAN := false;
BEGIN
    -- Get current badges
    SELECT badges INTO v_badges
    FROM user_profiles
    WHERE id = p_user_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Profile not found'
        );
    END IF;
    
    -- Check if badge is new
    IF p_badge = ANY(v_badges) THEN
        v_is_new := false;
    ELSE
        v_is_new := true;
        v_badges := array_append(v_badges, p_badge);
        
        -- Update profile
        UPDATE user_profiles
        SET badges = v_badges, updated_at = NOW()
        WHERE id = p_user_id;
    END IF;
    
    RETURN json_build_object(
        'success', true,
        'is_new', v_is_new,
        'badge', p_badge,
        'total_badges', array_length(v_badges, 1)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PART 8: Function to Complete Assessment
-- ============================================================================

CREATE OR REPLACE FUNCTION complete_assessment(
    p_user_id UUID,
    p_assessment_id VARCHAR(100),
    p_xp_amount INTEGER DEFAULT 100
)
RETURNS JSON AS $$
DECLARE
    v_completed TEXT[];
    v_is_new BOOLEAN := false;
    v_xp_result JSON;
    v_streak_result JSON;
BEGIN
    -- Get completed assessments
    SELECT completed_assessments INTO v_completed
    FROM user_profiles
    WHERE id = p_user_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Profile not found'
        );
    END IF;
    
    -- Check if already completed
    IF p_assessment_id = ANY(v_completed) THEN
        v_is_new := false;
    ELSE
        v_is_new := true;
        v_completed := array_append(v_completed, p_assessment_id);
        
        -- Update profile
        UPDATE user_profiles
        SET completed_assessments = v_completed, updated_at = NOW()
        WHERE id = p_user_id;
        
        -- Add XP
        v_xp_result := add_xp(p_user_id, p_xp_amount, 'assessment', p_assessment_id);
        
        -- Update streak
        v_streak_result := update_streak(p_user_id);
    END IF;
    
    RETURN json_build_object(
        'success', true,
        'is_new', v_is_new,
        'xp_awarded', v_is_new,
        'xp_result', v_xp_result,
        'streak_result', v_streak_result
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PART 9: Trigger to Auto-Create Profile on User Signup
-- ============================================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, email, name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- PART 10: Grant Permissions
-- ============================================================================

GRANT EXECUTE ON FUNCTION add_xp TO authenticated;
GRANT EXECUTE ON FUNCTION update_streak TO authenticated;
GRANT EXECUTE ON FUNCTION add_badge TO authenticated;
GRANT EXECUTE ON FUNCTION complete_assessment TO authenticated;

-- ============================================================================
-- SUCCESS! 
-- ============================================================================

-- Your database is now ready! You should see:
-- ✓ user_profiles table
-- ✓ xp_history table  
-- ✓ assessment_results table
-- ✓ 4 functions (add_xp, update_streak, add_badge, complete_assessment)
-- ✓ Auto-create profile trigger
-- ✓ All RLS policies enabled

-- Next: Deploy your app to Netlify!

