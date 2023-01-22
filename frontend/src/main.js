import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import { createPinia } from 'pinia'
import { useThemeStore } from './stores/theme.store'
import {createRouter, createWebHistory} from 'vue-router'

const setTheme = async () => {
    const theme = useThemeStore()
    await theme.setTheme()
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        }
    ]
})

router.beforeEach( async (to, from) => {
    await setTheme()
})

const pinia = createPinia()

const app = createApp(App).use(pinia).use(router)

setTheme().then( (data) => {
    app.mount('#app')
}).catch((err) => {
    console.log(err)
})




