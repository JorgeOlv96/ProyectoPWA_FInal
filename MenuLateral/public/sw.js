importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js')
importScripts('js/sw-db.js')
importScripts('js/sw-utils.js')

//importScripts('./firebase-messaging-sw.js')

//Crear las variables de cache
const CACHE_DYNAMIC = 'dynamic-v1' //Para los archivos que se van a descargar
const CACHE_STATIC = 'static-v3'    //App shell
const CACHE_INMUTABLE = 'inmutable-v1'// librerias 


const CACHE_DYNAMIC_LIMIT = 50
//Funcion para limpiar el cache
const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > numberItem) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numberItem))
                    }
                })
        })

}
self.addEventListener('install', event => {
    const cahePromise = caches.open(CACHE_STATIC).then(cache => {
        return cache.addAll([
            '/',
            './index.html',
            '/assets/index-DqfkWRLQ.js',
            '/assets/index-HeeXXGra.css',
            './sw.js',
            './js/sw-db.js',
            './js/sw-utils.js',
            './js/app.js',
            './manifest.json',
            './logoGa.ico',
            './pages/Offline.html',
            './assets/not-found.jpeg'
        ])
    });
    const caheInmutable = caches.open(CACHE_INMUTABLE).then(cache => {

        return cache.addAll([

            'https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Roboto:wght@100&display=swap'

        ])
    })
    event.waitUntil(Promise.all([cahePromise, caheInmutable]))
})

// sw.js

self.addEventListener('fetch', event => {
    //Cache with network fallback
    const respuesta = caches.match(event.request)
        .then(response => {
            if (response) return response
            //Si no existe el archivo lo descarga
            return fetch(event.request)
                .then(newResponse => {

                    caches.open(CACHE_DYNAMIC)
                        .then(cache => {
                            cache.put(event.request, newResponse)
                            limpiarCache(CACHE_DYNAMIC, CACHE_DYNAMIC_LIMIT)
                        })
                    return newResponse.clone()
                })
                //Manejo del error al no poder resolverse ambas promesas
                .catch(err => {
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/pages/offline.html')
                    }

                })
        })
    event.respondWith(respuesta)
})

self.addEventListener('message', event => {
    if (event.data === 'actualizar') {
        self.skipWaiting();
    }
});
