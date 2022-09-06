import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router'
import XtxUI from './components'
createApp(App).use(router).use(createPinia()).mount('#app')
