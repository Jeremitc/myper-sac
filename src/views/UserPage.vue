<script setup lang="ts">
import UserTable from '../components/UserTable.vue';
import UserModal from '../components/UserModal.vue';
import { useUsers } from '../composables/useUsers';
import { ref } from 'vue';

const {
  users,
  isLoading,
  error,
  showModal,
  currentUser,
  modalTitle,
  openCreateModal,
  openEditModal,
  closeModal,
  saveUser,
  deleteUser,
} = useUsers();

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};



</script>

<template>
  <div>
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    >
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
        Gestión de Usuarios
      </h1>
      <div class="flex gap-2">
        <button
          @click="openCreateModal"
          class="bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
            />
          </svg>
          <span>Agregar Usuario</span>
        </button>

      </div>
    </div>

    <div v-if="isLoading" class="text-center py-10">
      <p class="text-lg font-semibold animate-pulse text-gray-400 dark:text-gray-300">
        Cargando usuarios...
      </p>
    </div>
    <div v-else-if="error" class="text-center py-10">
      <p class="text-lg font-semibold text-red-600 dark:text-red-400">
        {{ error }}
      </p>
    </div>
    <div v-else-if="!users.length" class="text-center py-10">
      <p class="text-lg font-semibold text-gray-600 dark:text-gray-400">
        No hay usuarios para mostrar.
      </p>
    </div>
    <UserTable v-else :users="users" @edit="openEditModal" @delete="deleteUser" />

    <UserModal
      v-if="showModal"
      :title="modalTitle"
      :current-user="currentUser"
      @save="saveUser"
      @close="closeModal"
    />
  </div>
</template>