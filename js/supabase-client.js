/**
 * TAP-IN Supabase Client Configuration
 * Handles authentication, database queries, and real-time subscriptions
 */

// Environment variables (set in Netlify)
const SUPABASE_URL = process.env.SUPABASE_URL || window.ENV?.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || window.ENV?.SUPABASE_ANON_KEY;

// Import Supabase client from CDN (for browser)
const { createClient } = window.supabase || {};

// Initialize Supabase client
let supabaseClient = null;

function initSupabase() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.error('❌ Supabase environment variables not configured');
        console.log('Add SUPABASE_URL and SUPABASE_ANON_KEY to Netlify environment variables');
        return null;
    }

    if (!supabaseClient) {
        supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        });
    }

    return supabaseClient;
}

// =============================================
// AUTHENTICATION
// =============================================

/**
 * Sign in with magic link (passwordless)
 */
async function signInWithMagicLink(email) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${window.location.origin}/dashboard.html`
        }
    });

    if (error) {
        console.error('Sign in error:', error);
        return { error: error.message };
    }

    return { data, message: 'Check your email for the magic link!' };
}

/**
 * Sign out current user
 */
async function signOut() {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const { error } = await supabase.auth.signOut();
    
    if (error) {
        console.error('Sign out error:', error);
        return { error: error.message };
    }

    // Clear any localStorage caches
    localStorage.removeItem('tap-in-session');
    window.location.href = '/';
    
    return { success: true };
}

/**
 * Get current user session
 */
async function getCurrentUser() {
    const supabase = initSupabase();
    if (!supabase) return null;

    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/**
 * Get current session
 */
async function getSession() {
    const supabase = initSupabase();
    if (!supabase) return null;

    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Listen for auth state changes
 */
function onAuthStateChange(callback) {
    const supabase = initSupabase();
    if (!supabase) return () => {};

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            callback(event, session);
        }
    );

    return () => subscription.unsubscribe();
}

// =============================================
// USER PROFILE
// =============================================

/**
 * Get user profile
 */
async function getUserProfile(userId) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Get profile error:', error);
        return { error: error.message };
    }

    return { data };
}

/**
 * Update user profile
 */
async function updateUserProfile(userId, updates) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        console.error('Update profile error:', error);
        return { error: error.message };
    }

    return { data };
}

// =============================================
// TEAMS
// =============================================

/**
 * Create a new team
 */
async function createTeam(name, description = '') {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    const { data, error } = await supabase
        .from('teams')
        .insert({
            name,
            description,
            created_by: user.id
        })
        .select()
        .single();

    if (error) {
        console.error('Create team error:', error);
        return { error: error.message };
    }

    return { data };
}

/**
 * Get all teams for current user
 */
async function getMyTeams() {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    // Get teams where user is a member
    const { data: memberships, error: memberError } = await supabase
        .from('team_members')
        .select('team_id, role, joined_at')
        .eq('user_id', user.id);

    if (memberError) {
        console.error('Get memberships error:', memberError);
        return { error: memberError.message };
    }

    if (!memberships || memberships.length === 0) {
        return { data: [] };
    }

    const teamIds = memberships.map(m => m.team_id);

    // Get team details
    const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select('*')
        .in('id', teamIds);

    if (teamsError) {
        console.error('Get teams error:', teamsError);
        return { error: teamsError.message };
    }

    // Combine team data with membership info
    const teamsWithRole = teams.map(team => {
        const membership = memberships.find(m => m.team_id === team.id);
        return {
            ...team,
            role: membership?.role,
            joined_at: membership?.joined_at
        };
    });

    return { data: teamsWithRole };
}

/**
 * Join a team using invite code
 */
async function joinTeam(inviteCode) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    // Find team by invite code
    const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('invite_code', inviteCode.trim().toLowerCase())
        .single();

    if (teamError || !team) {
        console.error('Team not found:', teamError);
        return { error: 'Invalid invite code' };
    }

    // Check if already a member
    const { data: existing } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_id', team.id)
        .eq('user_id', user.id)
        .single();

    if (existing) {
        return { error: 'Already a member of this team' };
    }

    // Add user to team
    const { data, error } = await supabase
        .from('team_members')
        .insert({
            team_id: team.id,
            user_id: user.id,
            role: 'member'
        })
        .select()
        .single();

    if (error) {
        console.error('Join team error:', error);
        return { error: error.message };
    }

    return { data: team };
}

/**
 * Get team members
 */
async function getTeamMembers(teamId) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const { data, error } = await supabase
        .from('team_members')
        .select(`
            *,
            user_profiles (id, email, name, company)
        `)
        .eq('team_id', teamId);

    if (error) {
        console.error('Get team members error:', error);
        return { error: error.message };
    }

    return { data };
}

/**
 * Leave a team
 */
async function leaveTeam(teamId) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('user_id', user.id);

    if (error) {
        console.error('Leave team error:', error);
        return { error: error.message };
    }

    return { success: true };
}

// =============================================
// ASSESSMENTS
// =============================================

/**
 * Save assessment result
 */
async function saveAssessment(assessmentType, data, teamId = null, shareWithTeam = false) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    const { data: assessment, error } = await supabase
        .from('assessments')
        .insert({
            user_id: user.id,
            team_id: teamId,
            assessment_type: assessmentType,
            data: data,
            is_shared_with_team: shareWithTeam
        })
        .select()
        .single();

    if (error) {
        console.error('Save assessment error:', error);
        return { error: error.message };
    }

    return { data: assessment };
}

/**
 * Get user's assessments
 */
async function getMyAssessments(assessmentType = null) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    let query = supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (assessmentType) {
        query = query.eq('assessment_type', assessmentType);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Get assessments error:', error);
        return { error: error.message };
    }

    return { data };
}

/**
 * Get team assessments (shared only)
 */
async function getTeamAssessments(teamId) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const { data, error } = await supabase
        .from('assessments')
        .select(`
            *,
            user_profiles (id, email, name)
        `)
        .eq('team_id', teamId)
        .eq('is_shared_with_team', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Get team assessments error:', error);
        return { error: error.message };
    }

    return { data };
}

/**
 * Migrate localStorage assessment to database
 */
async function migrateLocalAssessment(localAssessment) {
    const supabase = initSupabase();
    if (!supabase) return { error: 'Supabase not configured' };

    const user = await getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    // Save the local assessment to the database
    const result = await saveAssessment(
        localAssessment.type || 'leadership-style',
        localAssessment,
        null,
        false
    );

    return result;
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Check if user is authenticated
 */
async function isAuthenticated() {
    const session = await getSession();
    return !!session;
}

/**
 * Require authentication (redirect if not logged in)
 */
async function requireAuth(redirectUrl = '/') {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        localStorage.setItem('tap-in-redirect-after-login', window.location.href);
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

/**
 * Handle redirect after login
 */
function handlePostLoginRedirect() {
    const redirectUrl = localStorage.getItem('tap-in-redirect-after-login');
    if (redirectUrl) {
        localStorage.removeItem('tap-in-redirect-after-login');
        window.location.href = redirectUrl;
    }
}

// =============================================
// EXPORT
// =============================================

// Make functions available globally
window.TapInAuth = {
    initSupabase,
    signInWithMagicLink,
    signOut,
    getCurrentUser,
    getSession,
    onAuthStateChange,
    isAuthenticated,
    requireAuth,
    handlePostLoginRedirect,
    
    // User profile
    getUserProfile,
    updateUserProfile,
    
    // Teams
    createTeam,
    getMyTeams,
    joinTeam,
    getTeamMembers,
    leaveTeam,
    
    // Assessments
    saveAssessment,
    getMyAssessments,
    getTeamAssessments,
    migrateLocalAssessment
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabase);
} else {
    initSupabase();
}
