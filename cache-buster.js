/**
* NUCLEAR CACHE BUSTER v2.0
*
* Aggressively clears ALL caches when version changes.
* UPDATE THE VERSION ON EVERY DEPLOY
*/
const VERSION = '2024-11-28-NUKE-v1';
const DEBUG = true;
function log(...args) {
if (DEBUG) {
    console.log('🧹 CACHE BUSTER:', ...args);
}
}
async function clearAllCaches() {
log('Starting aggressive cache clear...');
try {
    // 1. Clear localStorage
const localStorageKeys = Object.keys(localStorage);
log(`Clearing ${localStorageKeys.length} localStorage items...`);
localStorage.clear();
log('✅ localStorage cleared');
    // 2. Clear sessionStorage
const sessionStorageKeys = Object.keys(sessionStorage);
log(`Clearing ${sessionStorageKeys.length} sessionStorage items...`);
sessionStorage.clear();
log('✅ sessionStorage cleared');
    // 3. Unregister ALL service workers
if ('serviceWorker' in navigator) {
log('Checking for service workers...');
const registrations = await navigator.serviceWorker.getRegistrations();
log(`Found ${registrations.length} service worker(s)`);
for (let registration of registrations) {
log('Unregistering service worker:', registration.scope);
const success = await registration.unregister();
if (success) {
log('✅ Service worker unregistered:', registration.scope);
}
}
if (navigator.serviceWorker.controller) {
log('Sending SKIP_WAITING message to service worker...');
navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
}
}
    // 4. Clear Cache API
if ('caches' in window) {
log('Checking for caches...');
const cacheNames = await caches.keys();
log(`Found ${cacheNames.length} cache(s)`);
for (let cacheName of cacheNames) {
log('Deleting cache:', cacheName);
const success = await caches.delete(cacheName);
if (success) {
log('✅ Cache deleted:', cacheName);
}
}
}
log('🎉 All caches cleared successfully!');
    // Store new version
localStorage.setItem('appVersion', VERSION);
localStorage.setItem('cacheClearedAt', new Date().toISOString());
    // Force hard reload
log('🔄 Forcing hard reload in 1 second...');
setTimeout(() => {
window.location.reload(true);
}, 1000);
} catch (error) {
    console.error('❌ CACHE BUSTER: Error during cache clear:', error);
setTimeout(() => {
window.location.reload(true);
}, 2000);
}
}
// Listen for service worker messages
if ('serviceWorker' in navigator) {
navigator.serviceWorker.addEventListener('message', event => {
if (event.data && event.data.type === 'SW_UNINSTALLED') {
log('Received SW_UNINSTALLED message');
setTimeout(() => {
window.location.reload(true);
}, 1000);
}
});
}
// Check version and clear caches if needed
(function() {
const cachedVersion = localStorage.getItem('appVersion');
log('Current version:', VERSION);
log('Cached version:', cachedVersion || 'none');
if (!cachedVersion || cachedVersion !== VERSION) {
log('🚀 Version mismatch detected!');
log(`Upgrading: ${cachedVersion || 'none'} → ${VERSION}`);
const shouldClear = confirm(
'🎉 New version available!\n\n' +
'We need to clear your cache to load the latest improvements.\n\n' +
'This will take just a moment. Click OK to continue.'
);
if (shouldClear) {
clearAllCaches();
} else {
log('⚠️ User declined cache clear');
localStorage.setItem('appVersion', VERSION);
}
} else {
log('✅ Version match - no cache clear needed');
}
})();
// Export for manual use
window.TAP_IN_CACHE_BUSTER = {
version: VERSION,
forceClear: clearAllCaches,
checkVersion: function() {
const cached = localStorage.getItem('appVersion');
    console.log('Current:', VERSION);
    console.log('Cached:', cached);
    console.log('Match:', cached === VERSION);
return cached === VERSION;
}
};
log('Cache buster loaded. Manual controls: window.TAP_IN_CACHE_BUSTER');