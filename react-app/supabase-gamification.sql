-- TAP-IN Gamification System - Supabase Migration
-- Add gamification fields to user_profiles table
-- Run this in your Supabase SQL Editor

-- Add gamification columns to user_profiles if they don't exist
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS total_xp INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS current_belt VARCHAR(10) DEFAULT 'white' CHECK (current_belt IN ('white', 'blue', 'purple', 'brown', 'black')),
ADD COLUMN IF NOT EXISTS current_stripe INTEGER DEFAULT 0 CHECK (current_stripe BETWEEN 0 AND 4),
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_active_date DATE,
ADD COLUMN IF NOT EXISTS badges TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS completed_modules TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS completed_assessments TEXT[] DEFAULT '{}';

-- Create XP History table to track all XP gains
CREATE TABLE IF NOT EXISTS xp_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    source VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Assessment Results table (if not exists)
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
ALTER TABLE xp_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for xp_history
CREATE POLICY "Users can view their own XP history"
ON xp_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own XP history"
ON xp_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

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

-- Function to add XP to a user
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
    -- Get current belt
    SELECT current_belt, total_xp, level INTO v_old_belt, v_new_xp, v_old_level
    FROM user_profiles
    WHERE id = p_user_id;
    
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

-- Function to update streak
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

-- Function to add badge
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

-- Function to complete assessment (adds to completed list and awards XP)
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_xp_history_user_id ON xp_history(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_history_created_at ON xp_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_created_at ON assessment_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_results_type ON assessment_results(assessment_type);

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION add_xp TO authenticated;
GRANT EXECUTE ON FUNCTION update_streak TO authenticated;
GRANT EXECUTE ON FUNCTION add_badge TO authenticated;
GRANT EXECUTE ON FUNCTION complete_assessment TO authenticated;

COMMENT ON FUNCTION add_xp IS 'Adds XP to a user, updates level and belt, logs to history';
COMMENT ON FUNCTION update_streak IS 'Updates user streak based on last active date';
COMMENT ON FUNCTION add_badge IS 'Adds a badge to user profile if not already earned';
COMMENT ON FUNCTION complete_assessment IS 'Marks assessment as complete, awards XP, updates streak';

