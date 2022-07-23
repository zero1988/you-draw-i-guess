import { createRouter, createMemoryHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        meta: {
            title: '登录'
        },
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/game',
        meta: {
            title: '游戏页'
        },
        component: () => import('@/views/Game.vue')
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
