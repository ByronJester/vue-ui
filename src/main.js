import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !store.getters.loggedIn) {
        return {
            path: '/',
        }
    } else {
        if (to.meta.requiresVisitor && store.getters.loggedIn) {
            return {
                path: '/company',
            }
        }
    }
})

const app = createApp(App).use(store).use(router).mount('#app')

