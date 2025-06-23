<script setup lang="ts">
import type { User } from '../types/user';

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
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { duration: 300 } }"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{{ title }}</h2>
      <form @submit.prevent="emit('save')">
        <div class="mb-4">
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            v-model="currentUser.name"
            class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
        </div>
        <div class="mb-4">
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
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
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
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
          <label
            for="phone"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
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
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <button
            type="button"
            @click="emit('close')"
            class="w-full sm:w-auto bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-semibold py-2 px-4 rounded-lg"
          >
            Cancelar
          </button>
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