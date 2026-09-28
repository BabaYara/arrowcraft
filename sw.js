const SCOPE = ' ' + self.registration.scope;
const CACHE = 'arrowcraft-5de9c03bccac' + SCOPE;
const ASSETS = ["./","./apple-touch-icon.png","./assets/arrowcraft-math-400-Ce1jUJyE.woff2","./assets/arrowcraft-mincho-500-Dnw-7WjE.woff2","./assets/arrowcraft-mincho-700-Dmui-vbn.woff2","./assets/index-Bo2D6Rjx.css","./assets/index-xe4fLSrg.js","./favicon.svg","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./icon.svg","./manifest.webmanifest"];
const MATCH = { ignoreSearch: true, ignoreVary: true };
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' })))));
});
self.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => keys.filter((k) => k !== CACHE && k.startsWith('arrowcraft-') && k.endsWith(SCOPE)))
      .then((old) => Promise.all(old.map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(r, MATCH).then((hit) => hit || fetch(r).catch(() => (r.mode === 'navigate' ? c.match('./', MATCH) : Response.error()))),
    ),
  );
});
