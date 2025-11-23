// TAP-IN Service Worker - Offline Support & Caching
const CACHE_NAME = 'tap-in-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/combined-leadership-profile.html',
  '/work-life-balance-assessment.html',
  '/mental-health-assessment.html',
  '/worker-type-assessment.html',
  '/team-assessment-enhanced-v2.html',
  '/leadership-style-carousel.html',
  '/combined-profile-carousel.html',
  '/team-dashboard.html',
  '/recruiter-portal.html',
  '/advanced-analytics.html',
  '/achievement-badges.html',
  '/goals.html',
  '/data-manager.html',
  '/notifications.html',
  '/calendar-integration.html',
  '/white-label-customization.html',
  '/QUICK-ADD-DEMO-DATA.html',
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
