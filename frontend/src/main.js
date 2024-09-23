import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.js'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const $toast = useToast({
    duration: 5000,
    position: 'top-right'
})

app.provide('toast', $toast)
app.use(createPinia())
app.use(plugin, defaultConfig(config))
app.use(router)

app.mount('#app')
