/**
 * CyberTools Offline Service Worker
 * Cache Name: cybertools-fleet-v1
 * Provides airgapped offline capability across the 100-app suite.
 */

const CACHE_NAME = 'cybertools-fleet-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/js/relay.js',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'
];

// Install Event — Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-cache non-fatal warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event — Clean up stale cache revisions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignore non-GET requests or browser extension protocols
  if (req.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Cache-First strategy for external CDNs (fonts, fontawesome, cdnjs, tailwind)
  if (
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdn.tailwindcss.com')
  ) {
    event.respondWith(
      caches.match(req).then((cachedResp) => {
        if (cachedResp) return cachedResp;
        return fetch(req).then((networkResp) => {
          if (networkResp && networkResp.status === 200) {
            const respToCache = networkResp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, respToCache));
          }
          return networkResp;
        }).catch(() => caches.match(req));
      })
    );
    return;
  }

  // Stale-While-Revalidate for local HTML and static site assets
  event.respondWith(
    caches.match(req).then((cachedResp) => {
      const fetchPromise = fetch(req).then((networkResp) => {
        if (networkResp && networkResp.status === 200) {
          const respToCache = networkResp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, respToCache));
        }
        return networkResp;
      }).catch((err) => {
        // Fallback to cached index if navigating offline
        if (req.mode === 'navigate') {
          return caches.match('/') || caches.match('/index.html');
        }
        throw err;
      });

      return cachedResp || fetchPromise;
    })
  );
});
