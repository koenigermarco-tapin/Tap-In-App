/**
* TAP-IN Service Worker - Minimal Version
* Only caches static assets, NEVER intercepts HTML navigation
*/
// Cache version - Updated on deployment to force fresh cache
const CACHE_VERSION = 'tap-in-v2.0.2-GYM-DASHBOARD-FIX';
const CACHE_NAME = `${CACHE_VERSION}`;
// ONLY cache static assets (CSS, JS, images) - NEVER HTML files
const STATIC_ASSETS = [
'/css/core-styles.css',
'/js/performance-optimizer.min.js',
'/js/gamification.js',
'/js/core-gamification.js',
];
// Install event - cache ONLY static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing minimal service worker...');
event.waitUntil(
caches.open(CACHE_NAME)
.then((cache) => {
                console.log('[SW] Caching static assets only');
return cache.addAll(STATIC_ASSETS).catch(err => {
                    console.warn('[SW] Some assets failed to cache:', err);
});
})
.then(() => self.skipWaiting()) // Activate immediately
);
});
// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
event.waitUntil(
caches.keys()
.then((cacheNames) => {
return Promise.all(
cacheNames.map((cacheName) => {
if (cacheName !== CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', cacheName);
return caches.delete(cacheName);
}
})
);
})
.then(() => self.clients.claim()) // Take control immediately
);
});
// Fetch event - CRITICAL: NEVER intercept HTML navigation
self.addEventListener('fetch', (event) => {
const { request } = event;
const url = new URL(request.url);
    // Skip non-GET requests
if (request.method !== 'GET') {
return;
}
    // Skip cross-origin requests
if (url.origin !== location.origin) {
return;
}
    // CRITICAL: NEVER intercept HTML pages or navigation
    // This allows back button and normal navigation to work
if (request.mode === 'navigate' ||
url.pathname.endsWith('.html') ||
url.pathname === '/' ||
!url.pathname.includes('.')) {
return; // Let browser handle navigation naturally - NO interception
}
    // Only handle static assets (CSS, JS, images)
if (isStaticAsset(url.pathname)) {
event.respondWith(cacheFirst(request));
}
});
/**
* Check if path is a static asset
*/
function isStaticAsset(pathname) {
return pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|ico|webp)$/);
}
/**
* Cache First strategy - ONLY for static assets
*/
async function cacheFirst(request) {
try {
        // Check cache first
const cached = await caches.match(request);
if (cached) {
return cached;
}
        // Fetch from network
const response = await fetch(request);
if (response.ok) {
const cache = await caches.open(CACHE_NAME);
cache.put(request, response.clone());
}
return response;
} catch (error) {
        console.log('[SW] Cache fetch failed for:', request.url);
return new Response('', { status: 503 });
}
}
// Message handler for cache updates
self.addEventListener('message', (event) => {
if (event.data && event.data.type === 'SKIP_WAITING') {
self.skipWaiting();
}
if (event.data && event.data.type === 'CACHE_CLEAR') {
caches.delete(CACHE_NAME).then(() => {
            console.log('[SW] Cache cleared');
});
}
});