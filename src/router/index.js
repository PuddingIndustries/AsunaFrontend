import {createRouter, createWebHashHistory} from 'vue-router'

import IndexView from '../views/IndexView.vue'
import ConfigVersionView from '../views/config/VersionView.vue'
import ConfigWiFiView from '../views/config/WiFiView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexView
        },
        {
            path: '/config/wifi',
            name: 'config-wifi',
            component: ConfigWiFiView,
        },
        {
            path: '/config/version',
            name: 'config-version',
            component: ConfigVersionView
        }
    ]
})

export default router
