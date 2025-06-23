<script setup lang="ts">
// --- LÓGICA DEL COMPONENTE (Su contrato con el mundo exterior) ---

// 1. IMPORTAMOS EL "MOLDE" DE USUARIO
// Esto nos ayuda a asegurar que los datos que manejamos tienen la forma correcta.
import type { User } from '../types/user';

// 2. DEFINIMOS LOS DATOS QUE RECIBE (PROPS)
// 'defineProps' es la forma en que el componente declara qué información necesita del exterior para funcionar.
defineProps<{
  // 'title': Un simple texto que se mostrará como el título del modal (ej. "Crear Usuario").
  title: string;

  // 'currentUser': Este es el objeto que contiene los datos del formulario.
  // Usamos 'Partial<User>' de TypeScript, que es muy útil aquí. Significa que este objeto
  // puede tener "algunas o todas" las propiedades de un 'User', pero no está obligado a tenerlas todas.
  // Esto es perfecto porque al crear un usuario, el objeto puede estar vacío, y al editar, estará lleno.
  currentUser: Partial<User>;
}>();

// 3. DEFINIMOS LAS SEÑALES QUE ENVÍA (EMITS)
// 'defineEmits' declara los "mensajes" o "eventos" que este componente puede enviar a su padre.
// No contiene la lógica, solo notifica que una acción ha ocurrido.
const emit = defineEmits<{
  // Señal 'save': Se envía cuando el usuario intenta guardar el formulario. No necesita enviar datos.
  (e: 'save'): void;
  // Señal 'close': Se envía cuando el usuario quiere cerrar el modal.
  (e: 'close'): void;
}>();
</script>

<template>
  <!-- --- ESTRUCTURA VISUAL (El pop-up y su contenido) --- -->

  <!-- 1. EL FONDO OSCURO (Overlay) -->
  <!-- 'fixed inset-0': Fija el div a la pantalla y hace que ocupe todo el espacio. -->
  <!-- 'bg-black bg-opacity-50': Le da un fondo negro con 50% de opacidad. -->
  <!-- 'flex items-center justify-center': Centra el contenido (la caja del formulario) vertical y horizontalmente. -->
  <!-- 'z-50': Asegura que este pop-up esté por encima de todo lo demás en la página. -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { duration: 300 } }"
  >
    <!-- 2. LA CAJA DEL FORMULARIO -->
    <!-- Este es el contenedor blanco (o gris oscuro) donde vive nuestro formulario. -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
      
      <!-- Título del modal, que recibimos como prop. Es dinámico. -->
      <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{{ title }}</h2>
      
      <!-- 3. EL FORMULARIO -->
      <!-- '@submit.prevent' es una directiva clave de Vue: -->
      <!-- '@submit': Escucha el evento de envío del formulario (al pulsar Enter o el botón de tipo 'submit'). -->
      <!-- '.prevent': Evita el comportamiento por defecto del navegador, que sería recargar la página. -->
      <!-- En su lugar, cuando el formulario se envía, emitimos la señal 'save' a nuestro componente padre. -->
      <form @submit.prevent="emit('save')">
        
        <!-- Cada campo del formulario (nombre, email, etc.) sigue la misma estructura. -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre
          </label>
          <!-- 'v-model' es la magia de Vue para los formularios. Crea un enlace de dos vías: -->
          <!-- 1. El valor de 'currentUser.name' se muestra en el campo de texto. -->
          <!-- 2. Si el usuario escribe algo, la propiedad 'currentUser.name' se actualiza automáticamente. -->
          <input
            type="text"
            id="name"
            v-model="currentUser.name"
            class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
        </div>
        
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            v-model="currentUser.username"
            class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
        </div>
        
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="currentUser.email"
            class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
        </div>
        
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            v-model="currentUser.phone"
            class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
        </div>
        
        <!-- 4. BOTONES DE ACCIÓN DEL FORMULARIO -->
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <!-- Botón de Cancelar -->
          <!-- 'type="button"' es importante para que este botón NO envíe el formulario. -->
          <!-- Al hacer clic, simplemente emite la señal 'close' para que el padre se encargue. -->
          <button
            type="button"
            @click="emit('close')"
            class="w-full sm:w-auto bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-semibold py-2 px-4 rounded-lg"
          >
            Cancelar
          </button>
          <!-- Botón de Guardar -->
          <!-- 'type="submit"' es lo que hace que este botón active el evento '@submit.prevent' del formulario. -->
          <button
            type="submit"
            class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>