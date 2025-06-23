<script setup lang="ts">
// --- SECCIÓN DE LÓGICA (el "cerebro" del componente) ---
// Aquí importamos todo lo que necesitamos para que la página funcione.

// 1. IMPORTACIÓN DE COMPONENTES HIJOS
// Estos son como "ayudantes" visuales que este componente principal va a usar.
import UserTable from '../components/UserTable.vue'; // La tabla que mostrará la lista de usuarios.
import UserModal from '../components/UserModal.vue'; // El pop-up (modal) para crear o editar un usuario.

// 2. IMPORTACIÓN DE LA LÓGICA REUTILIZABLE (COMPOSABLE)
// Imagina que 'useUsers' es una "caja de herramientas" mágica para todo lo relacionado con usuarios.
// Contiene toda la lógica (pedir datos, guardar, borrar) para no tener que escribirla aquí.
// Esto mantiene nuestro componente limpio y enfocado solo en mostrar las cosas.
import { useUsers } from '../composables/useUsers';

// 3. USANDO LA "CAJA DE HERRAMIENTAS"
// Aquí abrimos nuestra caja 'useUsers' y sacamos todas las herramientas que necesitamos.
const {
  users,        // La lista de usuarios que obtendremos de la API.
  isLoading,    // Un interruptor que nos dice si estamos "cargando" los datos (true/false).
  error,        // Un lugar para guardar un mensaje si algo sale mal.
  showModal,    // Otro interruptor para mostrar u ocultar el pop-up (modal).
  currentUser,  // Guarda los datos del usuario que estamos editando, o estará vacío si creamos uno nuevo.
  modalTitle,   // El título que aparecerá en el pop-up (ej: "Crear Usuario" o "Editar Usuario").
  
  // Estas son las "acciones" o funciones que podemos realizar:
  openCreateModal, // Función para preparar y abrir el pop-up para crear un nuevo usuario.
  openEditModal,   // Función para preparar y abrir el pop-up para editar un usuario existente.
  closeModal,      // Función para cerrar el pop-up.
  saveUser,        // Función que se encarga de guardar (ya sea creando o actualizando) un usuario.
  deleteUser,      // Función para eliminar un usuario.
} = useUsers();

</script>

<template>
  <!-- --- SECCIÓN VISUAL (lo que el usuario ve en la pantalla) --- -->
  <!-- Este es el contenedor principal de nuestra página. -->
  <div>
    
    <!-- 1. CABECERA DE LA PÁGINA: TÍTULO Y BOTÓN DE ACCIÓN -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      v-motion  
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    >
      <!-- Título principal de la página -->
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
        Gestión de Usuarios
      </h1>

      <!-- Contenedor para los botones de acción -->
      <div class="flex gap-2">
        <!-- Botón para "Agregar Usuario" -->
        <button
          @click="openCreateModal" 
          class="bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <!-- Icono de "+" para el botón -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          <!-- Texto del botón -->
          <span>Agregar Usuario</span>
        </button>
      </div>
    </div>

    <!-- 2. ESTADOS DE LA PÁGINA: CARGANDO, ERROR O SIN DATOS -->
    <!-- Vue nos permite mostrar diferentes cosas dependiendo del estado de nuestros datos. -->

    <!-- Si 'isLoading' es true, mostramos un mensaje de "Cargando..." -->
    <div v-if="isLoading" class="text-center py-10">
      <p class="text-lg font-semibold animate-pulse text-gray-400 dark:text-gray-300">
        Cargando usuarios...
      </p>
    </div>
    
    <!-- Si no estamos cargando, pero hay un 'error', mostramos el mensaje de error. -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-lg font-semibold text-red-600 dark:text-red-400">
        {{ error }}
      </p>
    </div>
    
    <!-- Si no estamos cargando, no hay error, pero la lista de 'users' está vacía, lo indicamos. -->
    <div v-else-if="!users.length" class="text-center py-10">
      <p class="text-lg font-semibold text-gray-600 dark:text-gray-400">
        No hay usuarios para mostrar.
      </p>
    </div>

    <!-- 3. LA TABLA DE USUARIOS (El caso feliz) -->
    <!-- Si todo salió bien y tenemos usuarios, mostramos el componente UserTable. -->
    <UserTable 
      v-else 
      :users="users"            
      @edit="openEditModal"      
      @delete="deleteUser"      
    />

    <!-- 4. EL POP-UP (MODAL) PARA CREAR/EDITAR -->
    <!-- Este componente solo se mostrará si nuestro interruptor 'showModal' es true. -->
    <UserModal
      v-if="showModal"
      :title="modalTitle"          
      :current-user="currentUser" 
      @save="saveUser"             
      @close="closeModal"          
    />
  </div>
</template>