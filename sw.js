/**
 * TAP-IN Service Worker
 * Enhanced caching strategy for offline capability
 */

const CACHE_VERSION = 'tap-in-v1.0.0';
const CACHE_NAME = `${CACHE_VERSION}`;

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/gym-dashboard.html',
    '/learning-hub.html',
    '/css/core-styles.css',
    '/js/performance-optimizer.js',
    '/js/gamification.js',
    '/js/core-gamification.js',
    '/js/shared-quiz-system.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
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

// Fetch event - serve from cache, fallback to network
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

    // Strategy: Cache First for static assets, Network First for HTML
    if (isStaticAsset(url.pathname)) {
        // Static assets: Cache First
        event.respondWith(cacheFirst(request));
    } else if (isHTML(request)) {
        // HTML pages: Network First (always fresh)
        event.respondWith(networkFirst(request));
    } else {
        // Other files: Cache First
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
 * Check if request is for HTML
 */
function isHTML(request) {
    return request.headers.get('accept').includes('text/html');
}

/**
 * Cache First strategy
 */
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.error('[SW] Fetch failed:', error);
        // Return offline page for HTML, or empty response for assets
        if (isHTML(request)) {
            return caches.match('/index.html') || new Response('Offline', { status: 503 });
        }
        return new Response('', { status: 503 });
    }
}

/**
 * Network First strategy
 */
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.log('[SW] Network failed, serving from cache');
        const cached = await caches.match(request);
        if (cached) {
            return cached;
        }
        // Fallback to index.html for offline
        return caches.match('/index.html') || new Response('Offline', { status: 503 });
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
