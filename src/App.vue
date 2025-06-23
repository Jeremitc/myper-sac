<!-- src/App.vue -->
<script setup lang="ts">
// --- LÓGICA DE ENSAMBLAJE INICIAL ---
// Aquí simplemente preparamos las piezas más grandes que formarán nuestra aplicación.

// 1. IMPORTAMOS LA "PLANTILLA" O "MARCO" GENERAL
// 'DefaultLayout' es como el marco de un cuadro. Define el fondo, los márgenes y la estructura
// que será común en toda nuestra aplicación para que todo se vea consistente.
import DefaultLayout from './layouts/DefaultLayout.vue';

// 2. IMPORTAMOS LA "VISTA" O PÁGINA PRINCIPAL
// 'UsersPage' es el contenido principal que queremos mostrar, como el cuadro dentro del marco.
// En una app más grande, aquí tendríamos un "router" para cambiar entre diferentes páginas.
import UsersPage from './views/UserPage.vue';
</script>

<template>
  <!-- --- ESTRUCTURA VISUAL PRINCIPAL --- -->
  <!-- Aquí le decimos a Vue cómo queremos que se vean esas piezas juntas. -->

  <!-- Usamos nuestro "marco" (DefaultLayout) para envolver todo. -->
  <DefaultLayout>
    <!-- Dentro del "marco", colocamos nuestro "cuadro" (la página de usuarios). -->
    <!-- Todo lo que esté aquí dentro se insertará mágicamente en el <slot /> del DefaultLayout. -->
    <UsersPage />
  </DefaultLayout>
</template>