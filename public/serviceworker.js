const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
    // Opening cache and adding "urlsToCache" to it
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Cache opened");

            return cache.addAll(urlsToCache);
        })
    );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(() => {
            // there's anything to fetch, then fetch
            return fetch(event.request).catch(() =>
                caches.match("offline.html")
            );
        })
    );
});

// Activate SW
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});
