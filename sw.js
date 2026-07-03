const CACHE_NAME = 'tareas-v6';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
);
self.skipWaiting();
});

self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) =>
Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
)
);
self.clients.claim();
});

self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((cached) => cached || fetch(event.request))
);
});

self.addEventListener('notificationclick', (event) => {
event.notification.close();
event.waitUntil(
clients.matchAll({ type: 'window' }).then((clientList) => {
if (clientList.length > 0) return clientList[0].focus();
return clients.openWindow('./index.html');
})
);
});
