// Cutout Camera service worker
//  - app shell: network-first for pages, cache-first for hashed assets
//  - models (detector ONNX, ORT wasm, OCR model tars): cache-first, so they
//    download once and the app works offline afterwards
//  - share target: accepts an image shared from the OS share sheet
const SHELL = "cutout-shell-v1";
const MODELS = "cutout-models-v1";
const SHARED = "cutout-shared";

const isModel = (url) =>
  /\/(models|ort)\//.test(url.pathname) ||
  /\.(onnx|wasm|tar)$/.test(url.pathname) ||
  url.hostname.endsWith("bcebos.com");

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(["./", "./manifest.webmanifest", "./icon.svg"])));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("cutout-") && ![SHELL, MODELS, SHARED].includes(k))
          .map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  if (e.request.method === "POST" && url.pathname.endsWith("/share-target")) {
    e.respondWith(handleShare(e.request));
    return;
  }
  if (e.request.method !== "GET") return;

  if (isModel(url)) {
    e.respondWith(cacheFirst(MODELS, e.request));
  } else if (url.origin === self.location.origin) {
    e.respondWith(e.request.mode === "navigate" ? networkFirst(e.request) : cacheFirst(SHELL, e.request));
  }
});

async function cacheFirst(name, req) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

async function networkFirst(req) {
  const cache = await caches.open(SHELL);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) || (await cache.match("./"));
  }
}

async function handleShare(req) {
  const form = await req.formData();
  const files = form.getAll("image").filter((f) => f instanceof File);
  const cache = await caches.open(SHARED);
  await Promise.all(
    files.map((f, i) =>
      cache.put(`./shared/${i}`, new Response(f, { headers: { "content-type": f.type, "x-name": encodeURIComponent(f.name) } })),
    ),
  );
  return Response.redirect("./?shared=" + files.length, 303);
}
