/**
* Progress Sync Service - Production Ready
* Syncs belt progress, XP, and stats to Supabase
*/
(function() {
'use strict';
const ProgressSyncService = {
supabase: null,
isOnline: navigator.onLine,
syncQueue: [],
syncInProgress: false,
async init() {
            // Load Supabase client
if (typeof window.supabase === 'undefined') {
                console.warn('Supabase client not loaded, progress will be local only');
return;
}
            // Get config from window or environment
const SUPABASE_URL = window.SUPABASE_URL ||
(typeof process !== 'undefined' && process.env.SUPABASE_URL) ||
localStorage.getItem('supabase_url');
const SUPABASE_KEY = window.SUPABASE_ANON_KEY ||
(typeof process !== 'undefined' && process.env.SUPABASE_ANON_KEY) ||
localStorage.getItem('supabase_anon_key');
if (!SUPABASE_URL || !SUPABASE_KEY || SUPABASE_URL.includes('YOUR_')) {
                console.warn('Supabase not configured, using localStorage only');
this.initOfflineMode();
return;
}
try {
this.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                console.log('✅ Progress Sync Service initialized');
                // Listen for online/offline events
window.addEventListener('online', () => this.handleOnline());
window.addEventListener('offline', () => this.handleOffline());
                // Restore progress from backend on init
await this.syncFromBackend();
                // Process any queued syncs
await this.processSyncQueue();
} catch (e) {
                console.error('Failed to initialize sync service:', e);
this.initOfflineMode();
}
},
initOfflineMode() {
');
this.isOnline = false;
},
async handleOnline() {
            console.log('🌐 Back online, syncing progress...');
this.isOnline = true;
await this.processSyncQueue();
await this.syncToBackend();
},
handleOffline() {
            console.log('📴 Gone offline, using localStorage only');
this.isOnline = false;
},
getUserId() {
            // Try to get from Supabase auth
if (this.supabase && this.supabase.auth) {
try {
const user = this.supabase.auth.user();
if (user) return user.id;
} catch (e) {
                    // Auth not initialized yet
}
}
            // Fallback: Generate anonymous user ID
let userId = localStorage.getItem('anonymous_user_id');
if (!userId) {
userId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('anonymous_user_id', userId);
}
return userId;
},
async syncToBackend() {
if (!this.isOnline || !this.supabase) {
                // Queue for later
this.syncQueue.push({ type: 'full_sync' });
return;
}
try {
const userId = this.getUserId();
if (!userId) {
                    console.warn('No user ID available for sync');
return;
}
                // Collect all progress data
const progress = {
user_id: userId,
total_xp: parseInt(localStorage.getItem('totalXP') || '0'),
current_belt: localStorage.getItem('currentBelt') || 'white',
current_stripe: parseInt(localStorage.getItem('currentStripe') || '1'),
streak_count: parseInt(localStorage.getItem('streakCount') || '0'),
last_activity: new Date().toISOString(),
updated_at: new Date().toISOString()
};
                // Get completed stripes
const completedStripes = this.getCompletedStripes();
const completedBelts = this.getCompletedBelts();
                // Upsert user progress
const { error: progressError } = await this.supabase
.from('user_progress')
.upsert(progress, { onConflict: 'user_id' });
if (progressError) throw progressError;
                // Sync stripe completions
for (const stripe of completedStripes) {
const { error: stripeError } = await this.supabase
.from('stripe_completions')
.upsert({
user_id: userId,
belt: stripe.belt,
stripe_number: stripe.number,
xp_earned: stripe.xp || 0,
completed_at: stripe.completed_at || new Date().toISOString()
}, { onConflict: 'user_id,belt,stripe_number' });
if (stripeError)
}
                console.log('✅ Progress synced to backend');
return true;
} catch (e) {
                console.error('❌ Progress sync failed:', e);
                // Queue for retry
this.syncQueue.push({ type: 'full_sync' });
return false;
}
},
async syncFromBackend() {
if (!this.isOnline || !this.supabase) return;
try {
const userId = this.getUserId();
if (!userId) return;
                // Get user progress
const { data: progress, error } = await this.supabase
.from('user_progress')
.select('*')
.eq('user_id', userId)
.single();
if (error && error.code !== 'PGRST116') { // PGRST116 = not found (ok for new users)
throw error;
}
if (progress) {
                    // Restore progress
if (progress.total_xp) localStorage.setItem('totalXP', progress.total_xp.toString());
if (progress.current_belt) localStorage.setItem('currentBelt', progress.current_belt);
if (progress.current_stripe) localStorage.setItem('currentStripe', progress.current_stripe.toString());
if (progress.streak_count) localStorage.setItem('streakCount', progress.streak_count.toString());
                    // Get stripe completions
const { data: stripes } = await this.supabase
.from('stripe_completions')
.select('*')
.eq('user_id', userId);
if (stripes) {
stripes.forEach(stripe => {
const key = `${stripe.belt}BeltStripe${stripe.stripe_number}Complete`;
localStorage.setItem(key, 'true');
});
}
                    console.log('✅ Progress restored from backend');
                    // Trigger UI update
if (typeof updateXPDisplay === 'function') updateXPDisplay();
if (typeof updateBeltProgress === 'function') updateBeltProgress();
}
} catch (e) {
                console.error('❌ Progress restore failed:', e);
}
},
async syncStripeComplete(belt, stripe, xpEarned = 0) {
            // Update localStorage (already done by stripe completion handler)
            // Sync to backend
if (this.isOnline && this.supabase) {
try {
const userId = this.getUserId();
if (!userId) return;
await this.supabase
.from('stripe_completions')
.upsert({
user_id: userId,
belt: belt,
stripe_number: stripe,
xp_earned: xpEarned,
completed_at: new Date().toISOString()
}, { onConflict: 'user_id,belt,stripe_number' });
                    // Also update total progress
await this.syncToBackend();
} catch (e) {
                    console.error('Stripe sync failed:', e);
this.syncQueue.push({ type: 'stripe', belt, stripe, xpEarned });
}
} else {
this.syncQueue.push({ type: 'stripe', belt, stripe, xpEarned });
}
},
async syncXPAwarded(amount) {
            // Update localStorage (already done)
            // Sync to backend
if (this.isOnline && this.supabase) {
await this.syncToBackend();
} else {
this.syncQueue.push({ type: 'xp', amount });
}
},
getCompletedStripes() {
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
const completed = [];
belts.forEach(belt => {
for (let i = 1; i <= 4; i++) {
const key = `${belt}BeltStripe${i}Complete`;
if (localStorage.getItem(key) === 'true') {
completed.push({
belt: belt,
number: i
});
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
async processSyncQueue() {
if (this.syncInProgress || !this.isOnline || this.syncQueue.length === 0) {
return;
}
this.syncInProgress = true;
while (this.syncQueue.length > 0) {
const item = this.syncQueue.shift();
try {
if (item.type === 'full_sync') {
await this.syncToBackend();
} else if (item.type === 'stripe') {
await this.syncStripeComplete(item.belt, item.stripe, item.xpEarned);
} else if (item.type === 'xp') {
await this.syncXPAwarded(item.amount);
}
} catch (e) {
                    console.error('Sync queue item failed:', e);
                    // Re-queue for retry (limit retries)
if (!item.retries) item.retries = 0;
if (item.retries < 3) {
item.retries++;
this.syncQueue.push(item);
}
}
}
this.syncInProgress = false;
},
        // Subscribe to real-time progress updates (for multi-device)
subscribeToProgress(callback) {
if (!this.supabase) return () => {};
const userId = this.getUserId();
if (!userId) return () => {};
const channel = this.supabase
.channel(`user_progress:${userId}`)
.on('postgres_changes', {
event: 'UPDATE',
schema: 'public',
table: 'user_progress',
filter: `user_id=eq.${userId}`
}, (payload) => {
callback(payload.new);
})
.subscribe();
return () => {
this.supabase.removeChannel(channel);
};
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
        // Expose for manual sync calls
window.syncProgress = () => ProgressSyncService.syncToBackend();
window.restoreProgress = () => ProgressSyncService.syncFromBackend();
}
if (typeof module !== 'undefined' && module.exports) {
module.exports = ProgressSyncService;
}
})();