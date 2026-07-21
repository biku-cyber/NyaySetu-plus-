const CACHE_NAME = 'nyaysetu-v1.0.0';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/404.html',
    '/manifest.json',
    '/css/reset.css',
    '/css/variables.css',
    '/css/typography.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/animations.css',
    '/css/light-theme.css',
    '/css/dark-theme.css',
    '/css/responsive.css',
    '/css/app.css',
    '/js/constants.js',
    '/js/utils.js',
    '/js/storage.js',
    '/js/theme.js',
    '/js/loader.js',
    '/js/bookmarks.js',
    '/js/search.js',
    '/js/reader.js',
    '/js/navigation.js',
    '/js/router.js',
    '/js/modules/constitution.js',
    '/js/modules/amendments.js',
    '/js/modules/schedules.js',
    '/js/modules/bns.js',
    '/js/modules/bnss.js',
    '/js/modules/ipc.js',
    '/js/modules/crpc.js',
    '/js/modules/bsa.js',
    '/js/app.js',
    '/assets/icons/favicon.svg',
    '/assets/icons/home.svg',
    '/assets/icons/search.svg',
    '/assets/icons/bookmark.svg',
    '/assets/icons/settings.svg',
    '/assets/icons/arrow-left.svg',
    '/assets/icons/close.svg',
    '/assets/icons/menu-dots.svg',
    '/assets/icons/constitution.svg',
    '/assets/icons/law.svg',
    '/assets/icons/clock.svg',
    '/assets/icons/info.svg',
    '/assets/icons/disclaimer.svg',
    '/assets/emblems/ashoka-emblem.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .catch(err => console.log('Cache install failed:', err))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    if (event.request.url.includes('/data/')) {
        event.respondWith(
            caches.open(CACHE_NAME + '-data').then(cache =>
                cache.match(event.request).then(response => {
                    const fetchPromise = fetch(event.request).then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => response);
                    return response || fetchPromise;
                })
            )
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
                }
                return networkResponse;
            }).catch(() => {
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/offline.html');
                }
            });
        })
    );
});
