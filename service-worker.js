// TAP-IN Service Worker - Offline Support & Caching
const CACHE_NAME = 'tap-in-v10-2024-11-27-FORCE-REFRESH'; // CRITICAL: Updated to force all users to refresh
const urlsToCache = [
  '/',
  '/index.html',
  
  // Learning Hub & Modules
  '/learning-hub.html',
  '/energy-management-module-gamified.html',
  '/boundaries-module-gamified.html',
  '/deep-work-module-gamified.html',
  '/feedback-module-gamified.html',
  '/expectation-management-module-gamified.html',
  '/stoic-tools-module-gamified.html',
  '/limiting-beliefs-module-gamified.html',
  '/active-listening-module-gamified.html',
  '/empathy-module-gamified.html',
  '/coaching-module-gamified.html',
  
  // Assessments
  '/worker-type-assessment.html',
  '/worker-type-assessment.de.html',
  '/leadership-style-carousel.html',
  '/leadership-style-carousel.de.html',
  '/team-assessment-enhanced-v2.html',
  '/combined-complete-profile.html',
  '/combined-complete-profile.de.html',
  '/combined-profile-carousel.de.html',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Cache install error:', err);
      })
  );
  self.skipWaiting();
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

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();
});

// Background sync for when connection returns
self.addEventListener('sync', event => {
  if (event.tag === 'sync-assessments') {
    event.waitUntil(syncAssessments());
  }
});

function syncAssessments() {
  // Sync any pending assessment submissions when online
  return Promise.resolve();
}
