import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import type { UserProfile, Team, TeamMember, Assessment, AssessmentType } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured');
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

// =============================================
// AUTHENTICATION
// =============================================

export async function signInWithMagicLink(email: string): Promise<{ error?: string; message?: string }> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    console.error('Sign in error:', error);
    return { error: error.message };
  }

  return { message: 'Check your email for the magic link!' };
}

export async function signInWithPassword(email: string, password: string): Promise<{ error?: string; user?: User }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    return { error: error.message };
  }

  return { user: data.user };
}

export async function signUp(email: string, password: string, name?: string): Promise<{ error?: string; user?: User }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    console.error('Sign up error:', error);
    return { error: error.message };
  }

  return { user: data.user ?? undefined };
}

export async function signOut(): Promise<{ error?: string }> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    return { error: error.message };
  }

  return {};
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function resetPassword(email: string): Promise<{ error?: string; message?: string }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { message: 'Check your email for the password reset link!' };
}

// =============================================
// USER PROFILE
// =============================================

export async function getUserProfile(userId: string): Promise<{ data?: UserProfile; error?: string }> {
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

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<{ data?: UserProfile; error?: string }> {
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

export async function createTeam(
  name: string,
  description = ''
): Promise<{ data?: Team; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('teams')
    .insert({
      name,
      description,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Create team error:', error);
    return { error: error.message };
  }

  return { data };
}

export async function getMyTeams(): Promise<{ data?: Team[]; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: 'Not authenticated' };

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

  const teamIds = memberships.map((m) => m.team_id);

  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select('*')
    .in('id', teamIds);

  if (teamsError) {
    console.error('Get teams error:', teamsError);
    return { error: teamsError.message };
  }

  const teamsWithRole = teams?.map((team) => {
    const membership = memberships.find((m) => m.team_id === team.id);
    return {
      ...team,
      role: membership?.role,
      joined_at: membership?.joined_at,
    };
  });

  return { data: teamsWithRole };
}

export async function joinTeam(inviteCode: string): Promise<{ data?: Team; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('invite_code', inviteCode.trim().toLowerCase())
    .single();

  if (teamError || !team) {
    console.error('Team not found:', teamError);
    return { error: 'Invalid invite code' };
  }

  const { data: existing } = await supabase
    .from('team_members')
    .select('*')
    .eq('team_id', team.id)
    .eq('user_id', user.id)
    .single();

  if (existing) {
    return { error: 'Already a member of this team' };
  }

  const { error } = await supabase.from('team_members').insert({
    team_id: team.id,
    user_id: user.id,
    role: 'member',
  });

  if (error) {
    console.error('Join team error:', error);
    return { error: error.message };
  }

  return { data: team };
}

export async function getTeamMembers(teamId: string): Promise<{ data?: TeamMember[]; error?: string }> {
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

export async function leaveTeam(teamId: string): Promise<{ error?: string }> {
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

  return {};
}

// =============================================
// ASSESSMENTS
// =============================================

export async function saveAssessment(
  assessmentType: AssessmentType,
  data: Record<string, unknown>,
  teamId: string | null = null,
  shareWithTeam = false
): Promise<{ data?: Assessment; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: assessment, error } = await supabase
    .from('assessments')
    .insert({
      user_id: user.id,
      team_id: teamId,
      assessment_type: assessmentType,
      data,
      is_shared_with_team: shareWithTeam,
    })
    .select()
    .single();

  if (error) {
    console.error('Save assessment error:', error);
    return { error: error.message };
  }

  return { data: assessment };
}

export async function getMyAssessments(
  assessmentType?: AssessmentType
): Promise<{ data?: Assessment[]; error?: string }> {
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

export async function getTeamAssessments(teamId: string): Promise<{ data?: Assessment[]; error?: string }> {
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

