import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/router'
import store from './store/store'
import i18n from './i18n/i18n'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')
