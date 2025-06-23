import { createApp } from 'vue'
import './styles/input.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'

createApp(App)
  .use(MotionPlugin) // <-- 2. Usa el plugin en tu aplicación
  .mount('#app')
