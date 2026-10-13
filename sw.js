/* =========================================================
   ExamPro — Service Worker
   Caches pages for offline use + fast repeat visits
   ========================================================= */

const CACHE_VERSION = 'exampro-v2';
const ASSETS = [
  './',
  './index.html',
  './login.html',
  './register.html',
  './onboarding.html',
  './dashboard.html',
  './exams.html',
  './exam-detail.html',
  './tests.html',
  './test-attempt.html',
  './test-result.html',
  './practice.html',
  './papers.html',
  './materials.html',
  './current-affairs.html',
  './leaderboard.html',
  './pricing.html',
  './profile.html',
  './about.html',
  './contact.html',
  './privacy.html',
  './terms.html',
  './refund.html',
  './404.html',
  './offline.html',
  './style.css',
  './main.js',
  './manifest.json',
];

/* ---------- INSTALL ---------- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      // Add files individually so one missing file doesn't break install
      return Promise.all(
        ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err))
        )
      );
    })
  );
  self.skipWaiting();
});

/* ---------- ACTIVATE ---------- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ---------- FETCH ---------- */
self.addEventListener('fetch', event => {
  const req = event.request;

  // Don't cache non-GET or admin (always fresh)
  if (req.method !== 'GET') return;
  if (req.url.includes('/admin/')) return;

  // HTML pages → network first, cache fallback
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then(cached => cached || caches.match('./offline.html')))
    );
    return;
  }

  // Static assets → cache first
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(req, clone));
        return res;
      });
    })
  );
});

/* ---------- MESSAGES ---------- */
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});