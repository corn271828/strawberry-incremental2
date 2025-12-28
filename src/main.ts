import { createApp } from 'vue'
import App from './App.vue'
import Button_with_waiting from './Button_with_waiting.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import './assets/main.css'


const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.component('Button_with_waiting', Button_with_waiting).mount('#app')
