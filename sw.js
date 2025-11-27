/**
 * Service Worker for Tap-In PWA
 * Enables offline functionality and fast loading
 */

const CACHE_NAME = 'tap-in-v1-2024-11-27';
const urlsToCache = [
  '/',
  '/index-DUAL-ENTRY.html',
  '/gym-dashboard.html',
  '/learning-hub.html',
  '/js/gamification.js',
  '/js/belt-progression.js',
  '/js/wisdom-tracker.js',
  '/js/hub-unlock-system.js',
  '/js/progress-sync-init.js',
  '/manifest.json'
];

// Install event - cache core files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Service Worker: Some files failed to cache', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache the fetched response
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        }).catch(err => {
          console.log('Service Worker: Fetch failed', err);
          // Return cached response if available
          return caches.match(event.request);
        });
      })
  );
});

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // Sync localStorage to cloud when online
  console.log('Background sync: Syncing progress...');
  // This will be called by StorageManager when implemented
}

