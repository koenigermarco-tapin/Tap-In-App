/**
* TAP-IN Supabase Client Module
* Full authentication and data sync support
*/
(function() {
'use strict';
const TapInSupabase = {
client: null,
isInitialized: false,
currentUser: null,
deviceId: null,
        /**
* Initialize Supabase client
*/
async init() {
            // Check if Supabase library is loaded
if (typeof window.supabase === 'undefined') {
                // Load from CDN
await this.loadSupabaseLibrary();
}
            // Get configuration
const SUPABASE_URL = window.SUPABASE_URL ||
(typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
localStorage.getItem('supabase_url');
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY ||
(typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
localStorage.getItem('supabase_anon_key');
            // Validate configuration
if (!SUPABASE_URL || !SUPABASE_ANON_KEY ||
SUPABASE_URL.includes('YOUR_') || SUPABASE_URL.includes('xxx') ||
SUPABASE_ANON_KEY.includes('YOUR_') || SUPABASE_ANON_KEY.includes('xxx')) {
                console.warn('⚠️ Supabase not configured - using localStorage only');
return false;
}
try {
                // Initialize Supabase client
this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
auth: {
autoRefreshToken: true,
persistSession: true,
detectSessionInUrl: true
}
});
                // Generate or get device ID
this.deviceId = this.getDeviceId();
                // Check for existing session
const { data: { session } } = await this.client.auth.getSession();
if (session) {
this.currentUser = session.user;
await this.updateUserSession();
}
                // Listen for auth changes
this.client.auth.onAuthStateChange((event, session) => {
this.handleAuthChange(event, session);
});
this.isInitialized = true;
                console.log('✅ TapInSupabase initialized');
return true;
} catch (error) {
                console.error('❌ Supabase initialization failed:', error);
return false;
}
},
        /**
* Load Supabase library from CDN
*/
async loadSupabaseLibrary() {
return new Promise((resolve, reject) => {
if (typeof window.supabase !== 'undefined') {
resolve();
return;
}
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
script.async = true;
script.onload = () => {
                    console.log('✅ Supabase library loaded');
resolve();
};
script.onerror = () => {
                    console.error('❌ Failed to load Supabase library');
reject(new Error('Failed to load Supabase'));
};
document.head.appendChild(script);
});
},
        /**
* Generate or retrieve device ID
*/
getDeviceId() {
let deviceId = localStorage.getItem('tapin_device_id');
if (!deviceId) {
                // Generate unique device ID
deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('tapin_device_id', deviceId);
}
return deviceId;
},
        /**
* Magic link (passwordless) authentication
*/
async signInWithMagicLink(email) {
if (!this.client) {
await this.init();
}
if (!this.isInitialized) {
throw new Error('Supabase not initialized');
}
try {
const { data, error } = await this.client.auth.signInWithOtp({
email: email,
options: {
emailRedirectTo: `${window.location.origin}/auth-callback.html`
}
});
if (error) throw error;
return {
success: true,
message: 'Check your email for the magic link!'
};
} catch (error) {
                console.error('Magic link sign-in error:', error);
return {
success: false,
error: error.message
};
}
},
        /**
* Sign out
*/
async signOut() {
if (!this.client) return;
try {
const { error } = await this.client.auth.signOut();
if (error) throw error;
this.currentUser = null;
return { success: true };
} catch (error) {
                console.error('Sign out error:', error);
return { success: false, error: error.message };
}
},
        /**
* Get current user
*/
async getCurrentUser() {
if (!this.client) {
await this.init();
}
if (!this.isInitialized) return null;
try {
const { data: { user }, error } = await this.client.auth.getUser();
if (error) throw error;
this.currentUser = user;
return user;
} catch (error) {
                console.error('Get user error:', error);
return null;
}
},
        /**
* Get or create user profile
*/
async getUserProfile(userId) {
if (!this.isInitialized) return null;
try {
const { data, error } = await this.client
.from('users')
.select('*')
.eq('id', userId)
.single();
if (error && error.code !== 'PGRST116') throw error;
                // Create profile if doesn't exist
if (!data) {
const { data: newProfile, error: createError } = await this.client
.from('users')
.insert({
id: userId,
email: this.currentUser?.email || '',
total_xp: parseInt(localStorage.getItem('totalXP') || '0'),
current_belt: localStorage.getItem('currentBelt') || 'white',
current_stripe: parseInt(localStorage.getItem('currentStripe') || '1')
})
.select()
.single();
if (createError) throw createError;
return newProfile;
}
return data;
} catch (error) {
                console.error('Get user profile error:', error);
return null;
}
},
        /**
* Update user profile
*/
async updateUserProfile(updates) {
if (!this.isInitialized || !this.currentUser) return false;
try {
const { error } = await this.client
.from('users')
.update({
...updates,
updated_at: new Date().toISOString()
})
.eq('id', this.currentUser.id);
if (error) throw error;
return true;
} catch (error) {
                console.error('Update profile error:', error);
return false;
}
},
        /**
* Save assessment
*/
async saveAssessment(assessmentData) {
if (!this.isInitialized) return null;
try {
const userId = this.currentUser?.id || null;
const { data, error } = await this.client
.from('assessments')
.insert({
user_id: userId,
assessment_type: assessmentData.type,
results_json: assessmentData.results || {},
scores_json: assessmentData.scores || {},
completed_at: new Date().toISOString(),
time_taken_seconds: assessmentData.timeTaken,
device_type: this.getDeviceType(),
language: assessmentData.language || 'en'
})
.select()
.single();
if (error) throw error;
                // Log sync
await this.logSync('assessment', 'assessments', data.id, 'upload');
return data;
} catch (error) {
                console.error('Save assessment error:', error);
return null;
}
},
        /**
* Save progress
*/
async saveProgress(progressData) {
if (!this.isInitialized) return null;
try {
const userId = this.currentUser?.id || null;
const { data, error } = await this.client
.from('progress')
.insert({
user_id: userId,
progress_type: progressData.type,
belt: progressData.belt,
stripe_number: progressData.stripe,
lesson_id: progressData.lessonId,
xp_amount: progressData.xp || 0,
progress_data: progressData.data || {},
completed_at: new Date().toISOString()
})
.select()
.single();
if (error) throw error;
                // Update user profile
if (userId) {
await this.updateUserProfile({
total_xp: progressData.totalXP || parseInt(localStorage.getItem('totalXP') || '0'),
current_belt: progressData.belt || localStorage.getItem('currentBelt') || 'white',
current_stripe: progressData.stripe || parseInt(localStorage.getItem('currentStripe') || '1')
});
}
                // Log sync
await this.logSync('progress', 'progress', data.id, 'upload');
return data;
} catch (error) {
                console.error('Save progress error:', error);
return null;
}
},
        /**
* Get user progress from server
*/
async getUserProgress(userId) {
if (!this.isInitialized) return null;
try {
const { data, error } = await this.client
.from('users')
.select('*')
.eq('id', userId)
.single();
if (error) throw error;
return data;
} catch (error) {
                console.error('Get user progress error:', error);
return null;
}
},
        /**
* Get progress history
*/
async getProgressHistory(userId, limit = 50) {
if (!this.isInitialized) return [];
try {
const { data, error } = await this.client
.from('progress')
.select('*')
.eq('user_id', userId)
.order('completed_at', { ascending: false })
.limit(limit);
if (error) throw error;
return data || [];
} catch (error) {
                console.error('Get progress history error:', error);
return [];
}
},
        /**
* Team management
*/
async createTeam(name, description = '') {
if (!this.isInitialized || !this.currentUser) return null;
try {
const inviteCode = this.generateInviteCode();
const { data, error } = await this.client
.from('teams')
.insert({
name: name,
description: description,
created_by: this.currentUser.id,
invite_code: inviteCode,
invite_code_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
})
.select()
.single();
if (error) throw error;
                // Add creator as owner
await this.joinTeam(inviteCode);
return data;
} catch (error) {
                console.error('Create team error:', error);
return null;
}
},
async joinTeam(inviteCode) {
if (!this.isInitialized || !this.currentUser) return null;
try {
                // Get team by invite code
const { data: team, error: teamError } = await this.client
.from('teams')
.select('*')
.eq('invite_code', inviteCode.toLowerCase().trim())
.eq('is_active', true)
.single();
if (teamError || !team) {
throw new Error('Invalid invite code');
}
                // Check if already a member
const { data: existing } = await this.client
.from('team_members')
.select('*')
.eq('team_id', team.id)
.eq('user_id', this.currentUser.id)
.single();
if (existing) {
return { success: false, error: 'Already a member' };
}
                // Join team
const { data, error } = await this.client
.from('team_members')
.insert({
team_id: team.id,
user_id: this.currentUser.id,
role: 'member'
})
.select()
.single();
if (error) throw error;
return { success: true, team: team };
} catch (error) {
                console.error('Join team error:', error);
return { success: false, error: error.message };
}
},
async getMyTeams() {
if (!this.isInitialized || !this.currentUser) return [];
try {
const { data, error } = await this.client
.from('team_members')
.select('*, teams(*)')
.eq('user_id', this.currentUser.id)
.eq('is_active', true);
if (error) throw error;
return data || [];
} catch (error) {
                console.error('Get teams error:', error);
return [];
}
},
        /**
* Sync helpers
*/
async syncToServer(localData) {
if (!this.isInitialized || !this.currentUser) return false;
try {
                // Sync user progress
await this.updateUserProfile({
total_xp: localData.totalXP || 0,
current_belt: localData.currentBelt || 'white',
current_stripe: localData.currentStripe || 1,
streak_count: localData.streakCount || 0
});
                // Sync progress items
if (localData.progressItems) {
for (const item of localData.progressItems) {
await this.saveProgress(item);
}
}
return true;
} catch (error) {
                console.error('Sync to server error:', error);
return false;
}
},
async syncFromServer() {
if (!this.isInitialized || !this.currentUser) return null;
try {
const profile = await this.getUserProfile(this.currentUser.id);
if (!profile) return null;
                // Restore to localStorage
if (profile.total_xp) localStorage.setItem('totalXP', profile.total_xp.toString());
if (profile.current_belt) localStorage.setItem('currentBelt', profile.current_belt);
if (profile.current_stripe) localStorage.setItem('currentStripe', profile.current_stripe.toString());
if (profile.streak_count) localStorage.setItem('streakCount', profile.streak_count.toString());
                // Get progress history
const progressHistory = await this.getProgressHistory(this.currentUser.id);
                // Restore stripe completions
progressHistory.forEach(progress => {
if (progress.progress_type === 'stripe_completion' && progress.belt && progress.stripe_number) {
const key = `${progress.belt}BeltStripe${progress.stripe_number}Complete`;
localStorage.setItem(key, 'true');
}
});
return profile;
} catch (error) {
                console.error('Sync from server error:', error);
return null;
}
},
        /**
* Sync log
*/
async logSync(syncType, entityType, entityId, direction, status = 'success', error = null) {
if (!this.isInitialized) return;
try {
await this.client
.from('sync_log')
.insert({
user_id: this.currentUser?.id || null,
sync_type: syncType,
entity_type: entityType,
entity_id: entityId,
device_id: this.deviceId,
sync_direction: direction,
sync_status: status,
error_message: error?.message || null
});
} catch (err) {
                console.error('Log sync error:', err);
}
},
        /**
* Update user session
*/
async updateUserSession() {
if (!this.isInitialized || !this.currentUser) return;
try {
await this.client
.from('user_sessions')
.upsert({
user_id: this.currentUser.id,
device_id: this.deviceId,
device_name: navigator.userAgent,
device_type: this.getDeviceType(),
browser: navigator.userAgentData?.brands?.[0]?.brand || 'unknown',
last_activity: new Date().toISOString(),
expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
is_active: true
}, {
onConflict: 'user_id,device_id'
});
} catch (error) {
                console.error('Update session error:', error);
}
},
        /**
* Handle auth state change
*/
async handleAuthChange(event, session) {
            console.log('Auth state changed:', event, session?.user?.email);
if (event === 'SIGNED_IN' && session) {
this.currentUser = session.user;
await this.updateUserSession();
                // Trigger sync
window.dispatchEvent(new CustomEvent('tapin:auth:signed-in', { detail: session }));
} else if (event === 'SIGNED_OUT') {
this.currentUser = null;
window.dispatchEvent(new CustomEvent('tapin:auth:signed-out'));
} else if (event === 'TOKEN_REFRESHED' && session) {
this.currentUser = session.user;
}
},
        /**
* Helper: Get device type
*/
getDeviceType() {
const width = window.innerWidth;
if (width < 768) return 'mobile';
if (width < 1024) return 'tablet';
return 'desktop';
},
        /**
* Helper: Generate invite code
*/
generateInviteCode() {
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
let code = '';
for (let i = 0; i < 6; i++) {
code += chars.charAt(Math.floor(Math.random() * chars.length));
}
return code;
}
};
    // Export globally
if (typeof window !== 'undefined') {
window.TapInSupabase = TapInSupabase;
}
    // Auto-initialize if config available
if (typeof window.SUPABASE_URL !== 'undefined' || localStorage.getItem('supabase_url')) {
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => {
TapInSupabase.init();
});
} else {
TapInSupabase.init();
}
}
    // Export for modules
if (typeof module !== 'undefined' && module.exports) {
module.exports = TapInSupabase;
}
})();