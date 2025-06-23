<!-- src/layouts/DefaultLayout.vue -->
<template>
  <!-- --- EL CONTENEDOR GENERAL DE LA PÁGINA --- -->
  <!-- Este div es el fondo de toda nuestra aplicación. -->
  <!-- Le decimos que ocupe toda la altura de la pantalla (min-h-screen) y le damos un color de fondo. -->
  <!-- También definimos los colores base para el modo claro (bg-gray-100) y oscuro (dark:bg-gray-900). -->
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    
    <!-- --- EL ÁREA DE CONTENIDO PRINCIPAL --- -->
    <!-- 'main' es donde vivirá el contenido específico de cada página. -->
    <!-- Lo centramos (container mx-auto) y le damos un poco de espacio en los bordes (p-4 md:p-8). -->
    <main class="container mx-auto p-4 md:p-8">

      <!-- --- EL HUECO MÁGICO: <slot /> --- -->
      <!-- 'slot' es un marcador de posición especial de Vue. -->
      <!-- Es como decir: "Cualquier cosa que pongan dentro de <DefaultLayout> en otro archivo, -->
      <!-- muéstrala exactamente aquí". En nuestro caso, aquí es donde aparecerá el componente UsersPage. -->
      <slot />

    </main>
  </div>
</template>