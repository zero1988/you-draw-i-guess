import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import './assets/fonts/font.css'

router.beforeEach((to, from, next) => {
    // 设置标题
    if (to.meta.title) {
        document.title = (to.meta.title as string)
    }
    next()
})
createApp(App).use(store).use(router).mount('#app')