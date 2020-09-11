

const staticCacheName = 'site-static';

const dynamicCacheName = 'site-dynamic-v1';

const assets = [
  '/',
  '/index.html',
  '/weatherapi.html',
  '/about.html',
  '/Features.html',
  '/styles.css',
  '/styles2.css',
  '/app.js',
  '/script.js',
  '/Images/robert-bye-WTPp4wgourk-unsplash.jpg',
  '/Images/Component 1 – 1.png',
  '/Images/Group 179.png',
  '/Images/Group 186.png',
  '/Lato',
  '/fallback.html',
  '/manifest.json',
  

];

// install service worker 
self.addEventListener('install', evt => {
  console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache =>{
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  )
  
 });

// activate service worker
self.addEventListener('activate', evt => {
  console.log('service worker has been activated');

  evt.waitUntil(
    caches.keys().then(keys =>{
      console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
});

// fetch event 
self.addEventListener('fetch', evt =>{
  console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes =>{
        return caches.open(dynamicCacheName).then(cache=>{
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes
        })
      });
    }).catch(() => caches.match('/fallback.html'))
  );
});


