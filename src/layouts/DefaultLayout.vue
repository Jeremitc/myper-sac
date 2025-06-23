<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <main class="container mx-auto p-4 md:p-8">
      <!-- El <slot /> es donde se renderizará el contenido de la página -->
      <slot />
    </main>
  </div>
</template>