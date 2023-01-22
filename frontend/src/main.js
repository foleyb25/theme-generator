import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import { createPinia } from 'pinia'
import { useThemeStore } from './stores/theme.store'
import { useMarkdownStore } from './stores/markdown.store'
import {createRouter, createWebHistory} from 'vue-router'

const setTheme = async () => {
    const theme = useThemeStore()
    await theme.setTheme()
}

const setMarkdown = async () => {
    const md = useMarkdownStore()
    await md.setMarkdown()
}

const setNPMMarkdown = async () => {
    const md = useMarkdownStore()
    await md.setNPMMarkdown()
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
    await setMarkdown()
    await setNPMMarkdown()
})

const pinia = createPinia()

const app = createApp(App).use(pinia).use(router)

setTheme().then( (data) => {
    app.mount('#app')
}).catch((err) => {
    console.log(err)
})




