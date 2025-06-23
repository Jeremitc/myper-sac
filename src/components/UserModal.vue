<script setup lang="ts">
import type { User } from '../types/user';

// Props y emits no cambian
defineProps<{
  title: string;
  currentUser: Partial<User>;
}>();

const emit = defineEmits<{
  (e: 'save'): void;
  (e: 'close'): void;
}>();
</script>

<template>
  <!-- 1. Añadimos un padding (p-4) al contenedor principal del modal -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <!-- El `w-full` y `max-w-md` ya lo hacen responsive, pero el padding exterior lo perfecciona -->
    <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <form @submit.prevent="emit('save')">
        <!-- Los campos del formulario ya son responsivos por defecto con `w-full` -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input type="text" id="name" v-model="currentUser.name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
        </div>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" v-model="currentUser.username" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="currentUser.email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
          <input type="tel" id="phone" v-model="currentUser.phone" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
        </div>
        
        <!-- 2. Hacemos que los botones se apilen en pantallas pequeñas -->
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <button type="button" @click="emit('close')" class="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancelar</button>
          <button type="submit" class="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>