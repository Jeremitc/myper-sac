<!-- src/components/UserModal.vue -->
<script setup lang="ts">
// Definimos la interfaz para el tipado
interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// 1. PROPS: Recibimos el título y el objeto del usuario actual
// `v-model` en el padre se conectará a `currentUser`
defineProps<{
  title: string;
  currentUser: Partial<User>;
}>();

// 2. EMITS: Notificamos al padre para guardar o cerrar
const emit = defineEmits<{
  (e: 'save'): void;
  (e: 'close'): void;
}>();
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <!-- 3. Al enviar el form, emitimos 'save' -->
      <form @submit.prevent="emit('save')">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <!-- v-model se enlaza directamente a la prop reactiva del padre -->
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
        <div class="flex justify-end mt-6">
          <!-- El botón cancelar emite 'close' -->
          <button type="button" @click="emit('close')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2">Cancelar</button>
          <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>