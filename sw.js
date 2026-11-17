const CACHE_NAME = "code-v0.63.3";
// Egen cache for Pyodide (kjerne + pakker, ca. 50 MB), slik at den IKKE slettes hver gang
// CACHE_NAME bumpes. Bytt navn her bare hvis Pyodide oppgraderes til ny versjon.
const PYODIDE_CACHE = "pyodide-v0.25.0";

// Lokale filer som skal caches umiddelbart
const urlsToCache = [
  "/",
  "/index.html",
  "/js/log.js",
  "/js/pyted.js",
  "/js/functions.js",
  "/js/loadSelectedExample.js",
  "/js/eksempler/trinn5.js",
  "/js/eksempler/trinn6.js",
  "/js/eksempler/trinn7.js",
  "/js/eksempler/trinn8.js",
  "/js/eksempler/trinn9.js",
  "/js/eksempler/trinn10.js",
  "/js/eksempler/mer.js",
  "/js/errorTranslations.js",
  "/css/pyted.css",
  "/img/icon-192x192.png",
  "/img/icon-512x512.png",
  "/turtle/",
  "/turtle/index.html",
  "/turtle/script.js",
  "/turtle/style.css"
];

// Pyodide-filer (lokalt i /pyodide/, og pakker som bare finnes på CDN) caches første gang de
// lastes. Filene endrer seg aldri for en gitt Pyodide-versjon, så cachen brukes før nettet.
function isPyodideUrl(url) {
  return url.origin === self.location.origin
    ? url.pathname.startsWith("/pyodide/")
    : url.href.startsWith("https://cdn.jsdelivr.net/pyodide/v0.25.0/");
}

// Cache lokale filer umiddelbart ved installasjon
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // cache: "reload" = hent alltid fra serveren, ikke fra nettleserens HTTP-cache. Ellers kan
      // en ny CACHE_NAME fylles med gamle filer (f.eks. ny index.html, men gammel JS).
      .then((cache) => cache.addAll(urlsToCache.map((url) => new Request(url, { cache: "reload" }))))
  );
  self.skipWaiting();
});

// Håndter fetch for både Pyodide og lokale filer
self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET" && isPyodideUrl(new URL(event.request.url))) {
    event.respondWith(
      caches.open(PYODIDE_CACHE).then((cache) =>
        cache.match(event.request.url).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            // Cache bare vellykkede svar, ellers blir en feil liggende for alltid
            if (response.ok) cache.put(event.request.url, response.clone());
            return response;
          });
        })
      )
    );
  } else {
    // Standard caching for lokale filer
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});

// Slett gamle caches ved aktivering (men behold Pyodide-cachen)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== PYODIDE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
