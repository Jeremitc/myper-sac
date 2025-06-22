<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';

// 1. DEFINICIÓN DE TIPOS Y ESTADO
// ===================================

// Modelo de datos para un usuario, usando una interfaz de TypeScript
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// Estado reactivo del componente
const users = ref<User[]>([]); // Array local para almacenar los usuarios
const isLoading = ref<boolean>(true); // Para mostrar el indicador de carga
const showModal = ref<boolean>(false); // Controla la visibilidad del modal
const modalMode = ref<'create' | 'edit'>('create'); // Define si el modal es para crear o editar

// Objeto reactivo para manejar los datos del formulario (creación/edición)
const currentUser = reactive<Partial<User>>({
  id: undefined,
  name: '',
  username: '',
  email: '',
  phone: '',
});

// 2. LÓGICA DE DATOS (API Y CRUD LOCAL)
// =========================================

// Función para obtener los usuarios iniciales de la API
const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Error al obtener los datos');
    const data = await response.json();
    users.value = data; // Almacenamos los datos en nuestro array local
  } catch (error) {
    console.error(error);
    alert('No se pudieron cargar los usuarios.');
  } finally {
    isLoading.value = false; // Ocultamos el indicador de carga
  }
};

// Se ejecuta cuando el componente se monta en el DOM
onMounted(fetchUsers);

// Función para abrir el modal en modo "Crear"
const openCreateModal = () => {
  // Reseteamos el objeto del formulario
  Object.assign(currentUser, { id: undefined, name: '', username: '', email: '', phone: '' });
  modalMode.value = 'create';
  showModal.value = true;
};

// Función para abrir el modal en modo "Editar"
const openEditModal = (user: User) => {
  // Copiamos los datos del usuario al formulario
  Object.assign(currentUser, { ...user });
  modalMode.value = 'edit';
  showModal.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  showModal.value = false;
};

// Función para guardar (crear o actualizar) un usuario
const saveUser = () => {
  // Validación simple de email con regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!currentUser.email || !emailRegex.test(currentUser.email)) {
    alert('Por favor, introduce un correo electrónico válido.');
    return;
  }
  
  if (modalMode.value === 'create') {
    // ---- Lógica de CREAR ----
    // Generar un nuevo ID secuencial
    const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1;
    
    // Añadimos el nuevo usuario al array local
    users.value.push({
      id: newId,
      name: currentUser.name || '',
      username: currentUser.username || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
    });
  } else {
    // ---- Lógica de EDITAR ----
    const index = users.value.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
      // Actualizamos el usuario en el array local
      users.value[index] = { ...currentUser } as User;
    }
  }
  
  closeModal(); // Cerramos el modal después de guardar
};

// Función para eliminar un usuario
const deleteUser = (userId: number) => {
  // Mostramos una ventana de confirmación
  if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    // Eliminamos el usuario del array local
    users.value = users.value.filter(u => u.id !== userId);
  }
};

// Propiedad computada para el título del modal
const modalTitle = computed(() => {
  return modalMode.value === 'create' ? 'Agregar Nuevo Usuario' : 'Editar Usuario';
});

</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <main class="container mx-auto p-4 md:p-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-700">Gestión de Usuarios</h1>

      <!-- Botón para Agregar Usuario -->
      <div class="mb-4">
        <button @click="openCreateModal" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          + Agregar Usuario
        </button>
      </div>

      <!-- Indicador de Carga (Loading) -->
      <div v-if="isLoading" class="text-center py-10">
        <p class="text-lg font-semibold animate-pulse">Cargando usuarios...</p>
      </div>

      <!-- Tabla de Usuarios -->
      <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
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
                <button @click="openEditModal(user)" class="text-yellow-600 hover:text-yellow-800 mr-3 font-semibold">Editar</button>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-800 font-semibold">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- Modal para Crear/Editar Usuario -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">{{ modalTitle }}</h2>
        <form @submit.prevent="saveUser">
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
          <div class="flex justify-end mt-6">
            <button type="button" @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2">Cancelar</button>
            <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>