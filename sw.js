var CACHE_APP_SHELL = 'mi-app-shellV1';
var CACHE_DINAMICO = 'cache_dinamicoV1';
var CACHE_INMUTABLE = 'cache_inmutableV1';
var archivosCache = [
  '/',
  '/index.html',
  '/carrito.html',
  '/registro.html',
  '/css/estilos.css',
  '/js/app.js',
  '/js/jquery.js',
  '/js/funciones.js',
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
  '/images/banner4.jpg',
  '/images/carrito.png',
  '/images/favicon.png',
  '/images/favicon48.png',
  '/images/favicon96.png',
  '/images/favicon192.png',
  '/images/logo1.jpg',
  '/images/moto.jpg',
  '/images/samsung.jpg',
  '/images/huawei.jpg',
  '/images/iphone.jpg'
  ];

self.addEventListener('install', event=>{
  var cacheAppShell = caches.open(CACHE_APP_SHELL).then(cache => {
      return cache.addAll(archivosCache);
    })

  var cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache =>{
      return cache.addAll([
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ]) 
  })
  event.waitUntil(cacheAppShell);
  self.skipWaiting();
  
});

self.addEventListener('activate', event => {
  console.log('el ServiceWorker se ha activado');
  event.waitUntil(borrarCache());
});


function borrarCache(){
  caches.open(CACHE_DINAMICO).then(
      cache => {
          cache.keys().then(keys => {
              console.log("Elemento en caché dinamico: " + keys.length);
              if (keys.length > 3) {
                  cache.delete(keys[keys.length -1]).then(borrarCache());
              }
          })
      }
  )
};

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(res => {
          if (res) return res;
          else{
              console.log('No se encontro el cache ', event.request.url);
              fetch(event.request).then(nuevoElemento => {
                  caches.open(CACHE_DINAMICO).then(cache => {
                      cache.put(event.request, nuevoElemento);
                      borrarCache();
                  });
              });
          }
      })
      .catch(error => {
          console.log('Error en fetch, ', error);
      })
  )
});




  
  