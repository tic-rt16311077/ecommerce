const CACHE_APP_SHELL = 'mi-app-shellV1';
const CACHE_DINAMICO = 'cache_dinamicoV1';
const CACHE_INMUTABLE = 'cache_inmutableV1';
const archivos = [
  '/',
  '/index.html',
  '/carrito.html',
  '/css/estilos.css',
  '/js/app.js',
  '/js/jquery.js',
  '/images/logo1.jpg',
  '/images/moto.jpg',
  '/images/samsung.jpg',
  '/images/huawei.jpg',
  '/images/iphone.jpg',
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
  '/images/banner4.jpg'
  ];


self.addEventListener('install', event=>{
  const cacheAppShell = caches.open(CACHE_APP_SHELL).then(cache => {
      return cache.addAll(archivos);
    })

  const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache =>{
      return cache.addAll([
          "https://netdna.bootstrapcdn.com/bootstrap/3.0.0-rc2/css/bootstrap-glyphicons.css",
          "https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
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
  //console.log(event.request.url)
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
//              return nuevoElemento.clone();
          }
      })
      .catch(error => {
          console.log('Error en fetch, ', error);
      })
  )
});




  
  