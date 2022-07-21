import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vueWebSocket from 'vue-native-websocket-vue3'
import './assets/fonts/fonts.css'

router.beforeEach((to, from, next) => {
    // 设置标题
    if (to.meta.title) {
        document.title = (to.meta.title as string)
    }
    next()
})

const app = createApp(App)

app.use(store)
    .use(router)
    .use(vueWebSocket, `xx`, {
        store: store,
        format: 'json',
        connectManually: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 3000,
        passToStoreHandler: (eventName: string, event: any, next: any) => {
            next(eventName, {
                data: JSON.stringify({
                    namespace: 'websocket',
                    action: eventName.toUpperCase(),
                    data: event?.data
                }),
            })
        }
    }).mount('#app')

export default app