

import {precacheAndRoute} from 'workbox-precaching'
import {registerRoute} from 'workbox-routing'
import {StaleWhileRevalidate} from 'workbox-strategies'
import {CacheableResponsePlugin} from 'workbox-cacheable-response'


precacheAndRoute(self.__WB_MANIFEST)

const cacheName = 'static-resources'

registerRoute(({request}) => ['style', 'script', 'worker'].includes(request.destination),
new StaleWhileRevalidate({
    cacheName,
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200]
        })
    ]
})

)