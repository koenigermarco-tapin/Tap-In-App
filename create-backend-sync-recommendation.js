/**
* Backend Sync Service - Recommended Implementation
* Syncs belt progress, XP, and game state to Supabase
*/
const ProgressSyncService = {
supabase: null,
async init() {
        // Initialize Supabase client
if (typeof window.supabase !== 'undefined') {
const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = window.SUPABASE_KEY || 'YOUR_SUPABASE_ANON_KEY';
if (SUPABASE_URL && SUPABASE_KEY && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
this.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                console.log('✅ Progress Sync Service initialized');
                // Sync existing progress on init
await this.syncToBackend();
}
}
},
async syncToBackend() {
if (!this.supabase) {
            console.warn('Supabase not configured, progress stored locally only');
return;
}
try {
const userId = this.getUserId();
if (!userId) {
                console.warn('No user ID, cannot sync');
return;
}
            // Collect all progress data
const progress = {
user_id: userId,
total_xp: parseInt(localStorage.getItem('totalXP') || '0'),
current_belt: localStorage.getItem('currentBelt') || 'white',
current_stripe: parseInt(localStorage.getItem('currentStripe') || '1'),
completed_stripes: this.getCompletedStripes(),
completed_belts: this.getCompletedBelts(),
streak_count: parseInt(localStorage.getItem('streakCount') || '0'),
last_activity: new Date().toISOString(),
updated_at: new Date().toISOString()
};
            // Upsert to Supabase
const { error } = await this.supabase
.from('user_progress')
.upsert(progress, { onConflict: 'user_id' });
if (error) throw error;
            console.log('✅ Progress synced to backend');
} catch (e) {
            console.error('❌ Progress sync failed:', e);
            // Continue with localStorage only
}
},
async syncFromBackend() {
if (!this.supabase) return;
try {
const userId = this.getUserId();
if (!userId) return;
const { data, error } = await this.supabase
.from('user_progress')
.select('*')
.eq('user_id', userId)
.single();
if (error) throw error;
if (data) {
                // Restore progress
if (data.total_xp) localStorage.setItem('totalXP', data.total_xp.toString());
if (data.current_belt) localStorage.setItem('currentBelt', data.current_belt);
if (data.current_stripe) localStorage.setItem('currentStripe', data.current_stripe.toString());
if (data.streak_count) localStorage.setItem('streakCount', data.streak_count.toString());
                // Restore completed stripes
if (data.completed_stripes) {
data.completed_stripes.forEach(stripe => {
const key = `${stripe.belt}BeltStripe${stripe.number}Complete`;
localStorage.setItem(key, 'true');
});
}
                console.log('✅ Progress restored from backend');
}
} catch (e) {
            console.error('❌ Progress restore failed:', e);
}
},
getUserId() {
        // Try to get user ID from auth system
if (typeof window.supabase !== 'undefined' && window.supabase.auth) {
const user = window.supabase.auth.user();
return user?.id || localStorage.getItem('userId');
}
return localStorage.getItem('userId');
},
getCompletedStripes() {
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
const completed = [];
belts.forEach(belt => {
for (let i = 1; i <= 4; i++) {
const key = `${belt}BeltStripe${i}Complete`;
if (localStorage.getItem(key) === 'true') {
completed.push({ belt, number: i });
}
}
});
return completed;
},
getCompletedBelts() {
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
const completed = [];
belts.forEach(belt => {
let allComplete = true;
for (let i = 1; i <= 4; i++) {
const key = `${belt}BeltStripe${i}Complete`;
if (localStorage.getItem(key) !== 'true') {
allComplete = false;
break;
}
}
if (allComplete) completed.push(belt);
});
return completed;
},
    // Sync on stripe completion
async onStripeComplete(belt, stripe) {
        // Update local storage (already done)
        // Sync to backend
await this.syncToBackend();
},
    // Sync on XP award
async onXPAwarded(amount) {
        // Update local storage (already done)
        // Sync to backend
await this.syncToBackend();
}
};
// Auto-initialize
if (typeof window !== 'undefined') {
window.ProgressSyncService = ProgressSyncService;
    // Initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => {
ProgressSyncService.init();
});
} else {
ProgressSyncService.init();
}
}