import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('./Pages/Home.vue') },
    { path: '/information', component: () => import('./Pages/Information.vue') },
    { path: '/countries', component: () => import('./Pages/Countries.vue') },
    { path: '/contact', component: () => import('./Pages/Contact.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./Pages/Error404.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
