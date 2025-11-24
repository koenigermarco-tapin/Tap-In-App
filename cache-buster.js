// Cache Buster - Forces page refresh when new version is deployed
// Update VERSION whenever you deploy changes
const VERSION = '2024-11-24-v1';

// Check if cached version matches current version
const cachedVersion = localStorage.getItem('appVersion');
if (cachedVersion && cachedVersion !== VERSION) {
    // Version mismatch - clear cache and reload
    console.log(`Version update detected: ${cachedVersion} → ${VERSION}`);
    localStorage.clear();
    sessionStorage.clear();
    
    // Force hard reload
    window.location.reload(true);
}

// Store current version
localStorage.setItem('appVersion', VERSION);
