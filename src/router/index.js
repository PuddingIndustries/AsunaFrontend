import {createRouter, createWebHashHistory} from 'vue-router'

import IndexView from '../views/IndexView.vue'
import ConfigVersionView from '../views/config/VersionView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexView
        },
        {
            path: '/config/version',
            name: 'config-version',
            component: ConfigVersionView
        }
    ]
})

export default router
