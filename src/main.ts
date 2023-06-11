import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Toast, Button, Loading, Overlay } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(router)
app.use(Toast)
app.use(Button)
app.use(Loading)
app.use(Overlay)

app.mount('#app')
