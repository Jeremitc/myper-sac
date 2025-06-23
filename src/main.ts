// src/main.ts

// 1. IMPORTAMOS LAS HERRAMIENTAS ESENCIALES
import { createApp } from 'vue' // La función principal de Vue para crear una aplicación.
import './styles/input.css'     // Nuestro archivo CSS, que a su vez activa Tailwind. ¡Muy importante para los estilos!
import App from './App.vue'      // El componente raíz, el "contenedor" de toda nuestra app.
import { MotionPlugin } from '@vueuse/motion' // Un "plugin" o extra que hemos añadido para animaciones sencillas.

// 2. CONSTRUIMOS Y LANZAMOS LA APLICACIÓN (en 3 pasos)

createApp(App)      // Paso 1: "Vue, crea una nueva aplicación usando 'App.vue' como base."
  .use(MotionPlugin) // Paso 2: "A esta aplicación, añádele las súper-habilidades de animación del MotionPlugin."
  .mount('#app')     // Paso 3: "Ahora, toma toda esta aplicación que hemos montado y pégala en el
                     //          elemento HTML que tiene el id='app' en nuestro index.html."