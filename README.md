# CRUD de Gestión de Usuarios con Vue 3, Vite y Tailwind CSS 4

Este proyecto es una aplicación web completa para la gestión de usuarios (Crear, Leer, Actualizar, Eliminar - CRUD) construida con un stack tecnológico moderno. Sirve como una demostración práctica de las mejores prácticas en el desarrollo con Vue 3, incluyendo la Composition API, TypeScript, una arquitectura de componentes bien definida y diseño responsivo.


## ✨ Características Principales

*   **Gestión CRUD Completa:** Funcionalidad completa para crear, leer, actualizar y eliminar usuarios.
*   **Diseño Totalmente Responsivo:** La interfaz se adapta a cualquier tamaño de pantalla. Usa una vista de tabla en escritorio y tarjetas en dispositivos móviles para una usabilidad óptima.
*   **Estado de Carga y Errores:** La interfaz informa al usuario sobre el estado de la aplicación, mostrando mensajes de carga, errores o cuando no hay datos.
*   **Modo Oscuro:** Soporte para modo oscuro que se adapta a las preferencias del sistema del usuario, implementado con las utilidades `dark:` de Tailwind CSS.
*   **Animaciones Suaves:** Transiciones y animaciones sutiles (`v-motion`) que mejoran la experiencia de usuario.
*   **Tipado Estricto:** Desarrollado íntegramente con TypeScript para garantizar la robustez y mantenibilidad del código.

## 🚀 Stack Tecnológico

Este proyecto está construido con las siguientes tecnologías de vanguardia:

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![VueUse/motion](https://img.shields.io/badge/@vueuse/motion-2.x-orange?style=for-the-badge)

---

## 🏗️ Estructura del Proyecto

El proyecto sigue una estructura lógica y escalable, separando las responsabilidades de forma clara.

```text
src
├── components/ # Componentes reutilizables y "tontos" (presentacionales)
│ ├── UserModal.vue # El formulario emergente para crear/editar.
│ └── UserTable.vue # La tabla/tarjetas que muestran los usuarios.
│
├── composables/ # Lógica de estado reutilizable (el "cerebro")
│ └── useUsers.ts # Maneja toda la lógica CRUD, estado y llamadas a la API.
│
├── layouts/ # Plantillas de diseño generales
│ └── DefaultLayout.vue # Marco base con fondo y contenedor principal.
│
├── styles/ # Archivos de estilos globales
│ └── input.css # Punto de entrada principal para Tailwind CSS.
│
├── types/ # Definiciones de tipos de TypeScript
│ └── user.ts # La interfaz (contrato) para el objeto User.
│
├── views/ # Componentes de página (orquestadores)
│ └── UserPage.vue # La vista principal que une todo.
│
├── App.vue # Componente raíz de la aplicación.
└── main.ts # Punto de entrada de la aplicación.
```

## ⚙️ Puesta en Marcha

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instalar las dependencias:**
    *(Se recomienda usar `pnpm` o `npm`)*
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## 🧠 Filosofía y Decisiones de Diseño

Este proyecto fue diseñado con un enfoque en la **claridad, mantenibilidad y separación de responsabilidades**.

### 1. Composition API y `<script setup>`
Se utiliza la sintaxis `<script setup>` de Vue 3, que permite una lógica más limpia, concisa y fácil de leer, eliminando la necesidad del `export default {}`.

### 2. Composables para la Lógica de Estado
Toda la lógica de negocio (obtener datos, guardar, eliminar, manejar el estado del modal) está encapsulada en el composable `useUsers.ts`. Esto ofrece varias ventajas:
*   **Reutilización:** La misma lógica podría ser usada en otras partes de la aplicación.
*   **Separación de Responsabilidades:** El componente `UserPage.vue` solo se preocupa de orquestar la vista, no de cómo se obtienen o manipulan los datos.
*   **Facilidad de Pruebas:** La lógica en `useUsers.ts` se puede probar de forma aislada.

### 3. Componentes Presentacionales vs. Contenedores
*   **Contenedor (`UserPage.vue`):** Es el componente "inteligente". Conoce el estado, llama al composable y pasa los datos y funciones a sus hijos.
*   **Presentacionales (`UserTable.vue`, `UserModal.vue`):** Son componentes "tontos". Solo reciben datos (props) y emiten eventos (emits). No tienen lógica de negocio propia, lo que los hace altamente reutilizables y predecibles.

### 4. Tailwind CSS 4 y Diseño Atómico
Se utiliza la última versión de Tailwind CSS con su nuevo motor, configurado a través de `@tailwindcss/vite`. El archivo `input.css` simplemente usa `@import "tailwindcss";` para un rendimiento y experiencia de desarrollo óptimos.

### 5. Tipado Estricto con TypeScript
El uso de interfaces como `User` en `src/types/user.ts` garantiza que la estructura de datos sea consistente en toda la aplicación, previniendo errores en tiempo de desarrollo y mejorando el autocompletado.

## 📜 Scripts Disponibles

En el `package.json`, encontrarás los siguientes scripts:

*   `npm run dev`: Inicia el servidor de desarrollo con Hot-Module-Replacement (HMR).
*   `npm run build`: Compila y empaqueta la aplicación para producción en el directorio `dist/`.
*   `npm run preview`: Sirve el contenido del directorio `dist/` para previsualizar la versión de producción.
*   `npm run type-check`: Ejecuta el compilador de TypeScript (`vue-tsc`) para verificar los tipos en todo el proyecto.

---

Este proyecto es una plantilla robusta y un excelente punto de partida para aplicaciones Vue más complejas.
