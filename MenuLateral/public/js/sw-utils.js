//Guardar en el cache dinamico
const actualizaCacheDinamico = (dynamicCache, req, res) => {

    if (res.ok) {
        return caches.open(dynamicCache).then(cache => {
            cache.put(req, res.clone())
            return res.clone();
        });
    } else {
        // error directo del servidor, cuando no existe en cache y tampoco hay internet
        return res;
    }
}

const actualizaCacheStatico = (estaticoCache, req, APP_SHELL_INMUTABLE) => {
    if (APP_SHELL_INMUTABLE.includes(req.url)) {
        
    }else {
        return fetch(req)
        .then(res => {
            return actualizaCacheDinamico(estaticoCache, req, res)
        })
    }
}
function manejoApiNotas(cacheName, req) {

    if (req.clone().method === 'POST') {
        //ejecutar post
        if(self.registration.sync) {
            return req.clone().text().then(body => {
                
                const bodyObj = JSON.parse(body);
                return guardarNota(bodyObj);
            });
        } else {
            
            return fetch(req);
        }

    } else {
        return fetch(req).then(resp => {
            if (resp.ok) {
                actualizaCacheDinamico(cacheName, req, resp.clone());
                return resp.clone();
            } else {
                return caches.match(req);
            }
        }).catch(err => {
            return caches.match(req);
        });

    }
}