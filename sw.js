//Con esta opcion se habilita la opcion de hacer la PWA instalable
self.addEventListener('fetch', event =>{});

//Se instala el ServiceWorker y se configura el cache para trabajar fuera de linea
this.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
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
          '/images/banner4.jpg',
          
        ]);
      })
    );
  });


//Rutina para activar el serviceWorker
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (!expectedCaches.includes(key)) {
            return caches.delete(key);
          }
        })
      )).then(() => {
               // caché de control V2
      })
    );
  });

//Rutina de notificaciones
//Pedir permiso para ejecutar notificaciones
self.addEventListener('push', function(e) {
  const message = e.data.json(); // 1

  const options = { // 2
    body: message.body,
    data: 'http://localhost:8080',
    actions: [
      {
        action: 'Detail',
        title: 'Detalles'
      }
    ]
  };

  e.waitUntil(self.registration.showNotification(message.title, options)); // 3
});


  
  