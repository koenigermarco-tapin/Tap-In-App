// TAP-IN Service Worker - Enhanced PWA Support
// Version: v12-2024-11-30-PWA-ENHANCED
const CACHE_NAME = 'tap-in-v12-2024-11-30-PWA';
const OFFLINE_CACHE = 'tap-in-offline-v1';
const RUNTIME_CACHE = 'tap-in-runtime-v1';
// Critical files for offline functionality
const CRITICAL_FILES = [
'/',
'/index.html',
'/offline.html',
'/manifest.json',
'/gym-dashboard.html',
'/learning-hub.html',
'/belt-assessment-v2.html'
];
// Static assets to cache
const STATIC_ASSETS = [
'/css/core-styles.css',
'/css/accessibility.css',
'/css/dark-mode.css',
'/css/email-capture.css',
'/js/core-gamification.js',
'/js/core-progress-tracker.js',
'/js/keyboard-nav.js',
'/icon-192.png',
'/icon-512.png'
];
// Network-first URLs (API calls, dynamic content)
const NETWORK_FIRST_PATTERNS = [
/\/\.netlify\/functions\//,
/\/api\//,
/supabase\.co/,
/sendgrid\.com/,
/analytics/
];
// Cache-first URLs (static assets)
const CACHE_FIRST_PATTERNS = [
/\.(?:png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/,
/\/css\//,
/\/js\//,
/\/images\//,
/\/icon-/,
/manifest\.json/
];
// Install event - cache critical files
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
event.waitUntil(
Promise.all([
      // Cache critical files
caches.open(CACHE_NAME).then(cache => {
        console.log('[SW] Caching critical files...');
return cache.addAll(CRITICAL_FILES.map(url => new Request(url, { cache: 'reload' })));
}).catch(err => {
        console.error('[SW] Cache install error:', err);
}),
      // Cache static assets
caches.open(RUNTIME_CACHE).then(cache => {
        console.log('[SW] Caching static assets...');
return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
}).catch(err => {
        console.error('[SW] Static assets cache error:', err);
})
]).then(() => {
      console.log('[SW] Installation complete');
return self.skipWaiting();
})
);
});
// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
const cacheWhitelist = [CACHE_NAME, OFFLINE_CACHE, RUNTIME_CACHE];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (!cacheWhitelist.includes(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
return caches.delete(cacheName);
}
})
);
}).then(() => {
      console.log('[SW] Activation complete');
return self.clients.claim();
})
);
});
// Fetch event - smart caching strategy
self.addEventListener('fetch', event => {
const request = event.request;
const url = new URL(request.url);
  // Skip non-GET requests
if (request.method !== 'GET') {
return;
}
  // Skip cross-origin requests that aren't HTTP/HTTPS
if (!url.protocol.startsWith('http')) {
return;
}
  // Network-first strategy for API calls
if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.href))) {
event.respondWith(networkFirstStrategy(request));
return;
}
  // Cache-first strategy for static assets
if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.href))) {
event.respondWith(cacheFirstStrategy(request));
return;
}
  // Stale-while-revalidate for HTML pages
if (request.headers.get('accept').includes('text/html')) {
event.respondWith(staleWhileRevalidateStrategy(request));
return;
}
  // Default: network-first with cache fallback
event.respondWith(networkFirstStrategy(request));
});
// Network-first strategy: Try network, fallback to cache
function networkFirstStrategy(request) {
return fetch(request)
.then(response => {
      // Cache successful responses
if (response && response.status === 200) {
const responseClone = response.clone();
caches.open(RUNTIME_CACHE).then(cache => {
cache.put(request, responseClone);
});
}
return response;
})
.catch(() => {
      // Network failed, try cache
return caches.match(request).then(cachedResponse => {
if (cachedResponse) {
return cachedResponse;
}
        // If HTML request and no cache, return offline page
if (request.headers.get('accept').includes('text/html')) {
return caches.match('/offline.html');
}
        // Return empty response for non-HTML
return new Response('Offline', { status: 503 });
});
});
}
// Cache-first strategy: Check cache first, fallback to network
function cacheFirstStrategy(request) {
return caches.match(request).then(cachedResponse => {
if (cachedResponse) {
return cachedResponse;
}
return fetch(request).then(response => {
      // Cache successful responses
if (response && response.status === 200) {
const responseClone = response.clone();
caches.open(RUNTIME_CACHE).then(cache => {
cache.put(request, responseClone);
});
}
return response;
}).catch(() => {
      // Return generic placeholder for images
if (request.destination === 'image') {
return new Response(
'<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#e0e0e0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image</text></svg>',
{ headers: { 'Content-Type': 'image/svg+xml' } }
);
}
return new Response('Offline', { status: 503 });
});
});
}
// Stale-while-revalidate strategy: Return cache immediately, update in background
function staleWhileRevalidateStrategy(request) {
return caches.open(CACHE_NAME).then(cache => {
return cache.match(request).then(cachedResponse => {
      // Fetch fresh content in background
const fetchPromise = fetch(request).then(response => {
if (response && response.status === 200) {
cache.put(request, response.clone());
}
return response;
}).catch(() => {
        // Network failed, ignore
});
      // Return cached version immediately (or fetch if no cache)
return cachedResponse || fetchPromise.then(response => {
if (response) return response;
        // If no cache and fetch failed, return offline page
return caches.match('/offline.html') || new Response('Offline', { status: 503 });
});
});
});
}
// Background sync for assessments
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
if (event.tag === 'sync-assessments') {
event.waitUntil(syncAssessments());
}
if (event.tag === 'sync-progress') {
event.waitUntil(syncProgress());
}
});
function syncAssessments() {
  // Sync assessment results to backend
return Promise.resolve().then(() => {
const pendingAssessments = JSON.parse(
localStorage.getItem('pendingAssessments') || '[]'
);
return Promise.all(
pendingAssessments.map(assessment => {
return fetch('/.netlify/functions/save-assessment', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(assessment)
}).then(response => {
if (response.ok) {
            // Remove from pending
const updated = pendingAssessments.filter(a => a.id !== assessment.id);
localStorage.setItem('pendingAssessments', JSON.stringify(updated));
}
}).catch(err => {
          console.error('[SW] Sync assessment error:', err);
});
})
);
});
}
function syncProgress() {
  // Sync progress to backend
if (typeof ProgressSyncService !== 'undefined') {
return ProgressSyncService.syncToBackend().catch(err => {
      console.error('[SW] Sync progress error:', err);
});
}
return Promise.resolve();
}
// Push notifications (for future use)
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
const options = {
body: event.data ? event.data.text() : 'New update from TAP-IN',
icon: '/icon-192.png',
badge: '/icon-72.png',
vibrate: [200, 100, 200],
tag: 'tap-in-notification',
requireInteraction: false
};
event.waitUntil(
self.registration.showNotification('TAP-IN Leadership Platform', options)
);
});
// Notification click
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');
event.notification.close();
event.waitUntil(
clients.openWindow('/')
);
});
// Message handling
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data);
if (event.data && event.data.type === 'SKIP_WAITING') {
self.skipWaiting();
}
if (event.data && event.data.type === 'CACHE_URLS') {
event.waitUntil(
caches.open(RUNTIME_CACHE).then(cache => {
return cache.addAll(event.data.urls);
})
);
}
});
// Error handling
self.addEventListener('error', event => {
  console.error('[SW] Error:', event.error);
});
self.addEventListener('unhandledrejection', event => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});