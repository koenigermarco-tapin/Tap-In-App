-- TAP-IN Database Setup - FINAL VERSION
-- This handles all edge cases and cleans everything up properly
-- Copy ALL of this and run in Supabase SQL Editor

-- ============================================================================
-- PART 1: Nuclear option - drop everything that might exist
-- ============================================================================

-- Drop trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;

-- Drop ALL versions of functions (using CASCADE to handle dependencies)
DROP FUNCTION IF EXISTS add_xp CASCADE;
DROP FUNCTION IF EXISTS update_streak CASCADE;
DROP FUNCTION IF EXISTS add_badge CASCADE;
DROP FUNCTION IF EXISTS complete_assessment CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;

-- ============================================================================
-- PART 2: Create tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    current_belt VARCHAR(10) DEFAULT 'white',
    current_stripe INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_active_date DATE,
    badges TEXT[] DEFAULT '{}',
    completed_modules TEXT[] DEFAULT '{}',
    completed_assessments TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS xp_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    source VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- ============================================================================
-- PART 3: Enable RLS and drop old policies
-- ============================================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
    DROP POLICY IF EXISTS "Users can view their own XP history" ON xp_history;
    DROP POLICY IF EXISTS "Users can insert their own XP history" ON xp_history;
    DROP POLICY IF EXISTS "Users can view their own assessment results" ON assessment_results;
    DROP POLICY IF EXISTS "Users can insert their own assessment results" ON assessment_results;
    DROP POLICY IF EXISTS "Users can update their own assessment results" ON assessment_results;
END $$;

-- Create policies
CREATE POLICY "Users can view their own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can view their own XP history" ON xp_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own XP history" ON xp_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own assessment results" ON assessment_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own assessment results" ON assessment_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own assessment results" ON assessment_results FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- PART 4: Create indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_xp_history_user_id ON xp_history(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_history_created_at ON xp_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_created_at ON assessment_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_results_type ON assessment_results(assessment_type);

-- ============================================================================
-- PART 5: Create functions
-- ============================================================================

CREATE OR REPLACE FUNCTION add_xp(
    p_user_id UUID,
    p_amount INTEGER,
    p_source VARCHAR(100) DEFAULT NULL,
    p_description TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_new_xp INTEGER;
    v_new_level INTEGER;
    v_new_belt VARCHAR(10);
    v_new_stripe INTEGER;
    v_old_belt VARCHAR(10);
    v_old_level INTEGER;
BEGIN
    SELECT current_belt, total_xp, level INTO v_old_belt, v_new_xp, v_old_level
    FROM user_profiles WHERE id = p_user_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Profile not found');
    END IF;
    
    v_new_xp := v_new_xp + p_amount;
    v_new_level := FLOOR(v_new_xp / 500.0) + 1;
    
    v_new_belt := CASE
        WHEN v_new_xp >= 10000 THEN 'black'
        WHEN v_new_xp >= 6000 THEN 'brown'
        WHEN v_new_xp >= 3000 THEN 'purple'
        WHEN v_new_xp >= 1000 THEN 'blue'
        ELSE 'white'
    END;
    
    v_new_stripe := CASE v_new_belt
        WHEN 'black' THEN LEAST(4, FLOOR((v_new_xp - 10000) / 1250.0))
        WHEN 'brown' THEN LEAST(4, FLOOR((v_new_xp - 6000) / 1000.0))
        WHEN 'purple' THEN LEAST(4, FLOOR((v_new_xp - 3000) / 750.0))
        WHEN 'blue' THEN LEAST(4, FLOOR((v_new_xp - 1000) / 500.0))
        ELSE LEAST(4, FLOOR(v_new_xp / 250.0))
    END;
    
    UPDATE user_profiles
    SET total_xp = v_new_xp, level = v_new_level, current_belt = v_new_belt, 
        current_stripe = v_new_stripe, updated_at = NOW()
    WHERE id = p_user_id;
    
    INSERT INTO xp_history (user_id, amount, source, description)
    VALUES (p_user_id, p_amount, p_source, p_description);
    
    RETURN json_build_object(
        'success', true, 'new_xp', v_new_xp, 'new_level', v_new_level,
        'new_belt', v_new_belt, 'new_stripe', v_new_stripe,
        'level_up', v_new_level > v_old_level, 'belt_promotion', v_new_belt != v_old_belt
    );
END;
$$;

CREATE OR REPLACE FUNCTION update_streak(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_last_active DATE;
    v_current_streak INTEGER;
    v_longest_streak INTEGER;
    v_today DATE := CURRENT_DATE;
    v_yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
    v_new_streak INTEGER;
BEGIN
    SELECT last_active_date, current_streak, longest_streak
    INTO v_last_active, v_current_streak, v_longest_streak
    FROM user_profiles WHERE id = p_user_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Profile not found');
    END IF;
    
    IF v_last_active = v_today THEN
        v_new_streak := v_current_streak;
    ELSIF v_last_active = v_yesterday THEN
        v_new_streak := v_current_streak + 1;
    ELSE
        v_new_streak := 1;
    END IF;
    
    UPDATE user_profiles
    SET current_streak = v_new_streak, longest_streak = GREATEST(v_new_streak, v_longest_streak),
        last_active_date = v_today, updated_at = NOW()
    WHERE id = p_user_id;
    
    RETURN json_build_object('success', true, 'current_streak', v_new_streak, 
                             'longest_streak', GREATEST(v_new_streak, v_longest_streak));
END;
$$;

CREATE OR REPLACE FUNCTION add_badge(p_user_id UUID, p_badge VARCHAR(100))
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_badges TEXT[];
    v_is_new BOOLEAN := false;
BEGIN
    SELECT badges INTO v_badges FROM user_profiles WHERE id = p_user_id;
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Profile not found');
    END IF;
    
    IF NOT (p_badge = ANY(v_badges)) THEN
        v_is_new := true;
        v_badges := array_append(v_badges, p_badge);
        UPDATE user_profiles SET badges = v_badges, updated_at = NOW() WHERE id = p_user_id;
    END IF;
    
    RETURN json_build_object('success', true, 'is_new', v_is_new, 'badge', p_badge);
END;
$$;

CREATE OR REPLACE FUNCTION complete_assessment(
    p_user_id UUID,
    p_assessment_id VARCHAR(100),
    p_xp_amount INTEGER DEFAULT 100
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_completed TEXT[];
    v_is_new BOOLEAN := false;
    v_xp_result JSON;
    v_streak_result JSON;
BEGIN
    SELECT completed_assessments INTO v_completed FROM user_profiles WHERE id = p_user_id;
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Profile not found');
    END IF;
    
    IF NOT (p_assessment_id = ANY(v_completed)) THEN
        v_is_new := true;
        v_completed := array_append(v_completed, p_assessment_id);
        UPDATE user_profiles SET completed_assessments = v_completed, updated_at = NOW() WHERE id = p_user_id;
        v_xp_result := add_xp(p_user_id, p_xp_amount, 'assessment', p_assessment_id);
        v_streak_result := update_streak(p_user_id);
    END IF;
    
    RETURN json_build_object('success', true, 'is_new', v_is_new, 'xp_result', v_xp_result, 'streak_result', v_streak_result);
END;
$$;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO user_profiles (id, email, name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'))
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

-- ============================================================================
-- PART 6: Create trigger
-- ============================================================================

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- PART 7: Grant permissions
-- ============================================================================

GRANT EXECUTE ON FUNCTION add_xp TO authenticated;
GRANT EXECUTE ON FUNCTION update_streak TO authenticated;
GRANT EXECUTE ON FUNCTION add_badge TO authenticated;
GRANT EXECUTE ON FUNCTION complete_assessment TO authenticated;

-- ============================================================================
-- DONE! You should see "Success, no rows returned"
-- ============================================================================

