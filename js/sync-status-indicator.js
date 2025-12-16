/**
* Sync Status Indicator Component
* Shows sync status in header/navigation
* Supports EN/DE languages
*/
(function() {
'use strict';
const SyncStatusIndicator = {
container: null,
currentStatus: 'localOnly',
isLightBackground: false,
language: 'en',
        /**
* Initialize sync status indicator
*/
init(containerSelector, options = {}) {
this.container = typeof containerSelector === 'string'
? document.querySelector(containerSelector)
: containerSelector;
if (!this.container) {
                console.warn('SyncStatusIndicator: Container not found');
return;
}
            // Options
this.isLightBackground = options.lightBackground || false;
this.language = options.language ||
localStorage.getItem('preferredLanguage') ||
(document.documentElement.lang || 'en');
            // Create indicator element
this.createIndicator();
            // Subscribe to sync status changes
if (typeof SyncManager !== 'undefined') {
SyncManager.onStatusChange((status, error) => {
this.updateStatus(status, error);
});
}
            // Initial status
if (typeof SyncManager !== 'undefined') {
this.updateStatus(SyncManager.getStatus());
}
            console.log('✅ SyncStatusIndicator initialized');
},
        /**
* Create indicator element
*/
createIndicator() {
            // Remove existing if present
const existing = this.container.querySelector('.sync-status-indicator');
if (existing) {
existing.remove();
}
            // Create indicator
const indicator = document.createElement('div');
indicator.className = 'sync-status-indicator';
indicator.innerHTML = this.getIndicatorHTML();
indicator.setAttribute('role', 'status');
indicator.setAttribute('aria-live', 'polite');
            // Add click handler
indicator.addEventListener('click', () => this.handleClick());
            // Insert into container
this.container.appendChild(indicator);
},
        /**
* Get indicator HTML
*/
getIndicatorHTML() {
return `
<div class="sync-status-content">
<span class="sync-status-icon" aria-hidden="true"></span>
<span class="sync-status-text"></span>
</div>
`;
},
        /**
* Update status
*/
updateStatus(status, error = null) {
this.currentStatus = status;
const indicator = this.container.querySelector('.sync-status-indicator');
if (!indicator) return;
const icon = indicator.querySelector('.sync-status-icon');
const text = indicator.querySelector('.sync-status-text');
            // Update classes
indicator.className = `sync-status-indicator status-${status}`;
if (this.isLightBackground) {
indicator.classList.add('light-background');
}
            // Update icon and text
const statusConfig = this.getStatusConfig(status, error);
icon.textContent = statusConfig.icon;
text.textContent = statusConfig.text;
indicator.title = statusConfig.tooltip;
},
        /**
* Get status configuration
*/
getStatusConfig(status, error = null) {
const translations = {
en: {
synced: {
icon: '✅',
text: 'Synced',
tooltip: 'All changes synced to cloud'
},
syncing: {
icon: '🔄',
text: 'Syncing...',
tooltip: 'Synchronizing with server'
},
offline: {
icon: '📴',
text: 'Offline',
tooltip: 'Working offline - changes will sync when online'
},
pending: {
icon: '⏳',
text: 'Pending',
tooltip: 'Changes pending sync'
},
error: {
icon: '⚠️',
text: 'Error',
tooltip: error?.message || 'Sync error occurred'
},
localOnly: {
icon: '💾',
text: 'Local',
tooltip: 'Local storage only - sign in to sync'
}
},
de: {
synced: {
icon: '✅',
text: 'Synchronisiert',
tooltip: 'Alle Änderungen mit Cloud synchronisiert'
},
syncing: {
icon: '🔄',
text: 'Synchronisiere...',
tooltip: 'Synchronisiere mit Server'
},
offline: {
icon: '📴',
text: 'Offline',
tooltip: 'Offline arbeiten - Änderungen werden synchronisiert wenn online'
},
pending: {
icon: '⏳',
text: 'Ausstehend',
tooltip: 'Änderungen warten auf Synchronisierung'
},
error: {
icon: '⚠️',
text: 'Fehler',
tooltip: error?.message || 'Synchronisierungsfehler aufgetreten'
},
localOnly: {
icon: '💾',
text: 'Lokal',
tooltip: 'Nur lokaler Speicher - anmelden zum Synchronisieren'
}
}
};
const lang = translations[this.language] || translations.en;
return lang[status] || lang.localOnly;
},
        /**
* Handle click
*/
handleClick() {
if (this.currentStatus === 'localOnly') {
                // Redirect to sign in or migration wizard
const lang = this.language === 'de' ? 'de' : '';
window.location.href = `/migration-wizard${lang ? '-' + lang : ''}.html`;
} else if (this.currentStatus === 'error' || this.currentStatus === 'pending') {
                // Trigger manual sync
if (typeof SyncManager !== 'undefined') {
SyncManager.sync();
}
} else if (this.currentStatus === 'offline') {
                // Show offline message
alert(this.language === 'de'
? 'Du bist offline. Die Synchronisierung wird fortgesetzt, sobald du wieder online bist.'
: 'You are offline. Sync will resume when you come back online.');
}
}
};
    // Export globally
if (typeof window !== 'undefined') {
window.SyncStatusIndicator = SyncStatusIndicator;
}
    // Export for modules
if (typeof module !== 'undefined' && module.exports) {
module.exports = SyncStatusIndicator;
}
})();