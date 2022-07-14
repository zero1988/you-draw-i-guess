import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Game from '@/views/Game.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        meta: {
            title: '游戏页'
        },
        component: Game
    },
    {
        path: '/game',
        meta: {
            title: '游戏页'
        },
        component: Game
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
