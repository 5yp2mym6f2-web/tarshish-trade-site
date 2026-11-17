/* Tarshish Trade contact card: hands the phone the contact file that the card page prepared on this device.
   It only answers addresses under /vc/ and holds no personal data itself. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== self.location.origin || u.pathname.indexOf("/vc/") !== 0) return;
  e.respondWith(caches.open("tt-card-v1").then(function (c) { return c.match(u.pathname); }).then(function (r) {
    return r || new Response("This contact file opens from its card.", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }));
});
