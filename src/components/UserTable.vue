<!-- src/components/UserTable.vue -->
<script setup lang="ts">
// Definimos la interfaz aquí también para tener tipado fuerte en las props
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// 1. Definimos las PROPS que el componente recibe del padre
defineProps<{
  users: User[];
}>();

// 2. Definimos los EMITS que el componente enviará al padre
const emit = defineEmits<{
  (e: 'edit', user: User): void;
  (e: 'delete', userId: number): void;
}>();
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
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
            <!-- 3. Al hacer clic, emitimos eventos en lugar de llamar funciones locales -->
            <button @click="emit('edit', user)" class="text-yellow-600 hover:text-yellow-800 mr-3 font-semibold">Editar</button>
            <button @click="emit('delete', user.id)" class="text-red-600 hover:text-red-800 font-semibold">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>