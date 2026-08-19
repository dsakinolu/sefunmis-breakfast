// Sefunmi's Breakfast — offline-first service worker
const CACHE = "sefunmis-breakfast-v1";
const ASSETS = [
  "./", "./index.html", "./cart.html", "./orders.html", "./manage.html",
  "./css/style.css",
  "./js/data.js", "./js/app.js", "./js/shop.js", "./js/cart.js",
  "./js/orders.js", "./js/manage.js",
  "./images/chive-cream-cheese.jpg", "./images/chocolate-donut.jpg",
  "./images/cream-cheese.jpg", "./images/glazed-donut.jpg",
  "./images/poppy-seed-bagel.jpg", "./images/sesame-bagel.jpg",
  "./images/icon-192.png", "./images/icon-512.png",
  "./manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(ASSETS.map((a) => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) =>
      hit || fetch(e.request).then((res) => {
        const copy = res.clone();
        if (new URL(e.request.url).origin === location.origin) {
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
