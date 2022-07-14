import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'


router.beforeEach((to, from, next) => {
    // 设置标题
    if (to.meta.title) {
        document.title = (to.meta.title as string)
    }
    next()
})
createApp(App).use(router).mount('#app')