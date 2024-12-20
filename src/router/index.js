import {createRouter, createWebHashHistory} from 'vue-router'

import IndexView from '../views/IndexView.vue'
import ConfigVersionView from '../views/config/VersionView.vue'
import ConfigLoRaView from '../views/config/LoRaView.vue'
import ConfigWiFiView from '../views/config/WiFiView.vue'
import StatusWiFiView from '../views/status/WiFiView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexView,
        },
        {
            path: '/config/lora',
            name: 'config-lora',
            component: ConfigLoRaView,
        },
        {
            path: '/config/wifi',
            name: 'config-wifi',
            component: ConfigWiFiView,
        },
        {
            path: '/config/version',
            name: 'config-version',
            component: ConfigVersionView,
        },
        {
            path: '/status/wifi',
            name: 'status-wifi',
            component: StatusWiFiView,
        }
    ]
})

export default router
