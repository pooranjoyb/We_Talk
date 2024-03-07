// %PUBLIC_URL%/service_worker.js
/// <reference lib="webworker" />

self.addEventListener('install', function (event) {});

self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request));
});