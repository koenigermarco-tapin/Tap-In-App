/**
* Sync Manager - Offline-first synchronization
* Handles sync queue, conflict resolution, and background syncing
*/
(function() {
'use strict';
const SyncManager = {
syncQueue: [],
isSyncing: false,
lastSyncTime: null,
syncInterval: null,
syncIntervalMs: 5 * 60 * 1000, // 5 minutes
listeners: [],
        /**
* Initialize sync manager
*/
init() {
            // Load queued syncs from localStorage
this.loadSyncQueue();
            // Start background sync interval
this.startBackgroundSync();
            // Listen for online/offline
window.addEventListener('online', () => this.handleOnline());
window.addEventListener('offline', () => this.handleOffline());
            // Listen for auth events
window.addEventListener('tapin:auth:signed-in', () => this.handleAuthSignedIn());
window.addEventListener('tapin:auth:signed-out', () => this.handleAuthSignedOut());
            // Initial sync if online and authenticated
if (navigator.onLine && this.isAuthenticated()) {
setTimeout(() => this.sync(), 2000);
}
            console.log('✅ SyncManager initialized');
},
        /**
* Check if user is authenticated
*/
isAuthenticated() {
return typeof TapInSupabase !== 'undefined' &&
TapInSupabase.isInitialized &&
TapInSupabase.currentUser !== null;
},
        /**
* Start background sync interval
*/
startBackgroundSync() {
            // Clear existing interval
if (this.syncInterval) {
clearInterval(this.syncInterval);
}
            // Start new interval
this.syncInterval = setInterval(() => {
if (navigator.onLine && this.isAuthenticated()) {
this.sync();
}
}, this.syncIntervalMs);
');
},
        /**
* Stop background sync
*/
stopBackgroundSync() {
if (this.syncInterval) {
clearInterval(this.syncInterval);
this.syncInterval = null;
}
},
        /**
* Queue sync operation
*/
queueSync(operation) {
const syncItem = {
id: 'sync_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
operation: operation,
timestamp: Date.now(),
retries: 0
};
this.syncQueue.push(syncItem);
this.saveSyncQueue();
            // Trigger immediate sync if online
if (navigator.onLine && this.isAuthenticated()) {
setTimeout(() => this.sync(), 500);
} else {
this.notifyListeners('pending');
}
return syncItem.id;
},
        /**
* Perform sync
*/
async sync() {
if (this.isSyncing) {
                console.log('⏳ Sync already in progress');
return;
}
if (!navigator.onLine) {
                console.log('📴 Offline - cannot sync');
this.notifyListeners('offline');
return;
}
if (!this.isAuthenticated()) {
                console.log('🔒 Not authenticated - cannot sync');
this.notifyListeners('localOnly');
return;
}
this.isSyncing = true;
this.notifyListeners('syncing');
try {
                // Sync 1: Upload local changes
await this.syncLocalToServer();
                // Sync 2: Download server changes
await this.syncServerToLocal();
                // Clear queue
this.syncQueue = [];
this.saveSyncQueue();
this.lastSyncTime = Date.now();
this.notifyListeners('synced');
                console.log('✅ Sync complete');
} catch (error) {
                console.error('❌ Sync error:', error);
this.notifyListeners('error', error);
} finally {
this.isSyncing = false;
}
},
        /**
* Sync local changes to server
*/
async syncLocalToServer() {
const localData = this.collectLocalData();
if (Object.keys(localData).length === 0) {
return; // Nothing to sync
}
            // Get server data for conflict resolution
const serverData = await TapInSupabase.getUserProfile(TapInSupabase.currentUser.id);
            // Resolve conflicts
const resolvedData = this.resolveConflicts(localData, serverData);
            // Upload to server
await TapInSupabase.syncToServer(resolvedData);
            // Process queued operations
for (const item of this.syncQueue) {
try {
await this.processSyncItem(item);
} catch (error) {
                    console.error('Sync item error:', error);
item.retries++;
}
}
},
        /**
* Sync server changes to local
*/
async syncServerToLocal() {
const serverData = await TapInSupabase.syncFromServer();
if (serverData) {
                // Trigger UI update
window.dispatchEvent(new CustomEvent('tapin:sync:completed', {
detail: { source: 'server', data: serverData }
}));
}
},
        /**
* Collect local data
*/
collectLocalData() {
return {
totalXP: parseInt(localStorage.getItem('totalXP') || '0'),
currentBelt: localStorage.getItem('currentBelt') || 'white',
currentStripe: parseInt(localStorage.getItem('currentStripe') || '1'),
streakCount: parseInt(localStorage.getItem('streakCount') || '0'),
progressItems: this.collectProgressItems()
};
},
        /**
* Collect progress items from localStorage
*/
collectProgressItems() {
const items = [];
const belts = ['white', 'blue', 'purple', 'brown', 'black'];
belts.forEach(belt => {
for (let i = 1; i <= 4; i++) {
const key = `${belt}BeltStripe${i}Complete`;
if (localStorage.getItem(key) === 'true') {
items.push({
type: 'stripe_completion',
belt: belt,
stripe: i,
completed_at: localStorage.getItem(`${key}_timestamp`) || new Date().toISOString()
});
}
}
});
return items;
},
        /**
* Resolve conflicts between local and server data
*/
resolveConflicts(localData, serverData) {
if (!serverData) return localData;
const resolved = { ...localData };
            // For numeric fields, take higher value
if (localData.totalXP && serverData.total_xp) {
resolved.totalXP = Math.max(localData.totalXP, serverData.total_xp);
}
if (localData.streakCount && serverData.streak_count) {
resolved.streakCount = Math.max(localData.streakCount, serverData.streak_count);
}
            // For progress items, merge arrays (union)
if (serverData.progressItems && localData.progressItems) {
const merged = [...localData.progressItems];
serverData.progressItems.forEach(serverItem => {
const exists = merged.find(item =>
item.belt === serverItem.belt &&
item.stripe === serverItem.stripe
);
if (!exists) {
merged.push(serverItem);
}
});
resolved.progressItems = merged;
}
return resolved;
},
        /**
* Process sync queue item
*/
async processSyncItem(item) {
const { operation } = item;
switch (operation.type) {
case 'progress':
await TapInSupabase.saveProgress(operation.data);
break;
case 'assessment':
await TapInSupabase.saveAssessment(operation.data);
break;
case 'profile_update':
await TapInSupabase.updateUserProfile(operation.data);
break;
default:
                    console.warn('Unknown sync operation type:', operation.type);
}
},
        /**
* Handle online event
*/
async handleOnline() {
            console.log('🌐 Back online - syncing...');
this.notifyListeners('syncing');
if (this.isAuthenticated()) {
await this.sync();
}
},
        /**
* Handle offline event
*/
handleOffline() {
            console.log('📴 Gone offline');
this.notifyListeners('offline');
},
        /**
* Handle auth signed in
*/
async handleAuthSignedIn() {
            console.log('🔓 User signed in - syncing...');
await this.sync();
},
        /**
* Handle auth signed out
*/
handleAuthSignedOut() {
            console.log('🔒 User signed out');
this.notifyListeners('localOnly');
},
        /**
* Load sync queue from localStorage
*/
loadSyncQueue() {
try {
const stored = localStorage.getItem('tapin_sync_queue');
if (stored) {
this.syncQueue = JSON.parse(stored);
}
} catch (error) {
                console.error('Load sync queue error:', error);
this.syncQueue = [];
}
},
        /**
* Save sync queue to localStorage
*/
saveSyncQueue() {
try {
localStorage.setItem('tapin_sync_queue', JSON.stringify(this.syncQueue));
} catch (error) {
                console.error('Save sync queue error:', error);
}
},
        /**
* Subscribe to sync status changes
*/
onStatusChange(callback) {
this.listeners.push(callback);
},
        /**
* Notify listeners of status change
*/
notifyListeners(status, error = null) {
this.listeners.forEach(callback => {
try {
callback(status, error);
} catch (err) {
                    console.error('Sync listener error:', err);
}
});
},
        /**
* Get current sync status
*/
getStatus() {
if (!navigator.onLine) return 'offline';
if (!this.isAuthenticated()) return 'localOnly';
if (this.isSyncing) return 'syncing';
if (this.syncQueue.length > 0) return 'pending';
if (this.lastSyncTime) return 'synced';
return 'localOnly';
}
};
    // Export globally
if (typeof window !== 'undefined') {
window.SyncManager = SyncManager;
}
    // Auto-initialize
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => {
SyncManager.init();
});
} else {
SyncManager.init();
}
    // Export for modules
if (typeof module !== 'undefined' && module.exports) {
module.exports = SyncManager;
}
})();