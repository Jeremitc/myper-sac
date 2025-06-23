<script setup lang="ts">
// 1. Importaciones necesarias
import UserTable from '../components/UserTable.vue';
import UserModal from '../components/UserModal.vue';
import { useUsers } from '../composables/useUsers';

// 2. Usamos nuestro composable para obtener toda la lógica y el estado
const {
  users,
  isLoading,
  showModal,
  currentUser,
  modalTitle,
  openCreateModal,
  openEditModal,
  closeModal,
  saveUser,
  deleteUser,
} = useUsers();
</script>

<template>
  <!-- El layout se encargará de los estilos de fondo y el contenedor -->
  <h1 class="text-3xl font-bold mb-6 text-gray-700">Gestión de Usuarios</h1>

  <div class="mb-4">
    <button @click="openCreateModal" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">
      + Agregar Usuario
    </button>
  </div>

  <div v-if="isLoading" class="text-center py-10">
    <p class="text-lg font-semibold animate-pulse">Cargando usuarios...</p>
  </div>

  <UserTable 
    v-else 
    :users="users" 
    @edit="openEditModal" 
    @delete="deleteUser"
  />

  <UserModal 
    v-if="showModal" 
    :title="modalTitle" 
    :current-user="currentUser"
    @save="saveUser"
    @close="closeModal" 
  />
</template>