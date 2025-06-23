<script setup lang="ts">
import type { User } from '../types/user';

// Las props y emits se mantienen igual
defineProps<{
  users: User[];
}>();

const emit = defineEmits<{
  (e: 'edit', user: User): void;
  (e: 'delete', userId: number): void;
}>();
</script>

<template>
  <div>
    <!-- VISTA DE TABLA: Visible solo en pantallas medianas (md) y superiores -->
    <div class="hidden md:block bg-white shadow-lg rounded-lg overflow-x-auto">
      <table class="min-w-full leading-normal">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
            <th class="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
            <th class="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
            <th class="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Teléfono</th>
            <th class="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ user.name }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ user.username }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ user.email }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">{{ user.phone }}</td>
            <td class="px-5 py-4 border-b border-gray-200 text-sm">
              <button @click="emit('edit', user)" class="text-yellow-600 hover:text-yellow-800 mr-3 font-semibold">Editar</button>
              <button @click="emit('delete', user.id)" class="text-red-600 hover:text-red-800 font-semibold">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- VISTA DE TARJETAS: Visible solo en pantallas pequeñas (oculto en md y superiores) -->
    <div class="grid grid-cols-1 gap-4 md:hidden">
      <div v-for="user in users" :key="user.id" class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-lg font-bold text-gray-800">{{ user.name }}</p>
            <p class="text-sm text-gray-600">@{{ user.username }}</p>
          </div>
        </div>
        <div class="mt-4 space-y-2">
          <p class="text-sm"><strong class="font-medium text-gray-500">Email:</strong> {{ user.email }}</p>
          <p class="text-sm"><strong class="font-medium text-gray-500">Teléfono:</strong> {{ user.phone }}</p>
        </div>
        <div class="flex justify-end mt-4 pt-4 border-t border-gray-200">
          <button @click="emit('edit', user)" class="text-yellow-600 hover:text-yellow-800 mr-4 font-semibold">Editar</button>
          <button @click="emit('delete', user.id)" class="text-red-600 hover:text-red-800 font-semibold">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>