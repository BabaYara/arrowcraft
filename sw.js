const SCOPE = ' ' + self.registration.scope;
const CACHE = 'arrowcraft-2fb52a9b098c' + SCOPE;
const ASSETS = ["./apple-touch-icon.png","./assets/arrowcraft-math-400-Ce1jUJyE.woff2","./assets/arrowcraft-mincho-500-Dnw-7WjE.woff2","./assets/arrowcraft-mincho-700-Dmui-vbn.woff2","./assets/index-Bo2D6Rjx.css","./assets/index-P-ZA96hy.js","./favicon.svg","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./icon.svg","./manifest.webmanifest"];
const INDEX = "<!doctype html>\n<html lang=\"en\" data-theme=\"sumi\">\n  <head>\n    <meta http-equiv=\"Content-Security-Policy\" content=\"default-src &#39;none&#39;; script-src &#39;self&#39;; style-src &#39;self&#39;; img-src &#39;self&#39; data:; font-src &#39;self&#39;; manifest-src &#39;self&#39;; worker-src &#39;self&#39;; child-src &#39;self&#39;; base-uri &#39;none&#39;; form-action &#39;none&#39;\">\n\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" />\n    <meta name=\"theme-color\" content=\"#0A0A09\" />\n    <meta name=\"color-scheme\" content=\"dark light\" />\n    <meta name=\"description\" content=\"Arrowcraft: category theory as a quiet puzzle game. Twenty questions about arrows, asked in five worlds.\" />\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />\n    <meta name=\"mobile-web-app-capable\" content=\"yes\" />\n    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\" />\n    <meta name=\"apple-mobile-web-app-title\" content=\"Arrowcraft\" />\n    <link rel=\"manifest\" href=\"./manifest.webmanifest\" />\n    <link rel=\"icon\" href=\"./favicon.svg\" type=\"image/svg+xml\" />\n    <link rel=\"icon\" href=\"./icon-192.png\" sizes=\"192x192\" type=\"image/png\" />\n    <link rel=\"apple-touch-icon\" href=\"./apple-touch-icon.png\" />\n    <!-- The world emblems on the first screen use this face; fetch it with the page, not after layout. -->\n    <link rel=\"preload\" href=\"./assets/arrowcraft-mincho-500-Dnw-7WjE.woff2\" as=\"font\" type=\"font/woff2\" crossorigin />\n    <title>Arrowcraft</title>\n    <script type=\"module\" crossorigin src=\"./assets/index-P-ZA96hy.js\"></script>\n    <link rel=\"stylesheet\" crossorigin href=\"./assets/index-Bo2D6Rjx.css\">\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <noscript>Arrowcraft needs JavaScript to run.</noscript>\n  </body>\n</html>\n";
const MATCH = { ignoreSearch: true, ignoreVary: true };
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.all([
        c.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' }))),
        c.put('./', new Response(INDEX, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })),
      ]),
    ),
  );
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
