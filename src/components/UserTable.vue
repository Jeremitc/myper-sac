<script setup lang="ts">
// --- LÓGICA DEL COMPONENTE (El contrato con el exterior) ---
// Aquí definimos cómo este componente interactúa con su "jefe" (el componente padre).

// 1. IMPORTAMOS EL "MOLDE" DE USUARIO
// Nos aseguramos de que los datos que recibimos sigan las reglas que definimos en 'user.ts'.
// Es una buena práctica para evitar errores y tener un código más claro.
import type { User } from '../types/user';

// 2. DEFINIMOS LOS DATOS QUE NECESITAMOS RECIBIR (PROPS)
// 'defineProps' es como una declaración formal: "Oye, componente padre, para que yo funcione,
// es tu obligación pasarme una propiedad llamada 'users', y debe ser una lista (array) de objetos
// que cumplan con el molde 'User'".
defineProps<{
  users: User[];
}>();

// 3. DEFINIMOS LOS MENSAJES QUE PODEMOS ENVIAR (EMITS)
// 'defineEmits' es como decir: "Yo, como hijo, puedo enviar dos tipos de señales al padre":
// - Una señal 'edit', que llevará consigo los datos completos del usuario a editar.
// - Una señal 'delete', que llevará solo el 'id' del usuario a eliminar.
// Este componente no borra ni edita, solo avisa al padre para que él se encargue.
// Esto se llama "separación de responsabilidades" y es un principio de buen diseño.
const emit = defineEmits<{
  (e: 'edit', user: User): void;
  (e: 'delete', userId: number): void;
}>();
</script>

<template>
  <!-- --- ESTRUCTURA VISUAL (Lo que se muestra en la pantalla) --- -->
  <!-- Este es el contenedor principal del componente. -->
  <div>
    
    <!-- ====== VISTA DE TABLA (Para pantallas de escritorio y tablets) ====== -->
    <!-- Las clases de Tailwind 'hidden md:block' son la clave de la responsividad aquí. -->
    <!-- 'hidden': Por defecto, esta tabla está oculta. -->
    <!-- 'md:block': Pero, en pantallas de tamaño mediano ('md') o más grandes, se mostrará como un bloque (block). -->
    <div class="hidden md:block bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-x-auto">
      <table class="min-w-full leading-normal">
        
        <!-- Cabecera de la tabla -->
        <thead class="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
            <th class="px-5 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Username</th>
            <th class="px-5 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
            <th class="px-5 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Teléfono</th>
            <th class="px-5 py-3 border-b-2 border-gray-300 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        
        <!-- Cuerpo de la tabla (donde van los datos de los usuarios) -->
        <tbody>
          <!-- 'v-for' es un bucle de Vue. "Para cada 'user' en la lista de 'users' que recibimos, crea una fila <tr>". -->
          <!-- ':key' es un identificador único para cada fila. Es crucial para que Vue pueda actualizar la lista de forma eficiente sin confundir elementos. -->
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
            <!-- Mostramos los datos de cada usuario en su celda (<td>) correspondiente. -->
            <td class="px-5 py-4 border-b border-gray-200 dark:border-gray-600 text-sm">{{ user.name }}</td>
            <td class="px-5 py-4 border-b border-gray-200 dark:border-gray-600 text-sm">{{ user.username }}</td>
            <td class="px-5 py-4 border-b border-gray-200 dark:border-gray-600 text-sm">{{ user.email }}</td>
            <td class="px-5 py-4 border-b border-gray-200 dark:border-gray-600 text-sm">{{ user.phone }}</td>
            <td class="px-5 py-4 border-b border-gray-200 dark:border-gray-600 text-sm">
              <!-- Botones de acción -->
              <!-- Al hacer clic, ejecutamos la función 'emit' para enviar la señal 'edit' al padre, pasándole el objeto 'user' completo. -->
              <button @click="emit('edit', user)" class="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 mr-3 font-semibold">Editar</button>
              <!-- Al hacer clic, enviamos la señal 'delete' al padre, pasándole solo el ID del usuario ('user.id'). -->
              <button @click="emit('delete', user.id)" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ====== VISTA DE TARJETAS (Para pantallas pequeñas, como móviles) ====== -->
    <!-- La clase 'md:hidden' es la contraparte de la anterior. -->
    <!-- "Por defecto, este div es visible, pero a partir del tamaño mediano ('md'), se oculta (hidden)". -->
    <!-- 'grid grid-cols-1 gap-4' crea una columna de tarjetas con un espacio entre ellas. -->
    <div class="grid grid-cols-1 gap-4 md:hidden">
      <!-- Usamos el mismo bucle 'v-for' para crear una tarjeta por cada usuario. -->
      <div v-for="user in users" :key="user.id" class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        
        <!-- Cabecera de la tarjeta -->
        <div class="flex justify-between items-start">
          <div>
            <p class="text-lg font-bold text-gray-800 dark:text-gray-100">{{ user.name }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">@{{ user.username }}</p>
          </div>
        </div>
        
        <!-- Cuerpo de la tarjeta -->
        <div class="mt-4 space-y-2">
          <p class="text-sm"><strong class="font-medium text-gray-500 dark:text-gray-300">Email:</strong> {{ user.email }}</p>
          <p class="text-sm"><strong class="font-medium text-gray-500 dark:text-gray-300">Teléfono:</strong> {{ user.phone }}</p>
        </div>
        
        <!-- Pie de la tarjeta con los botones de acción -->
        <div class="flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <!-- Los botones funcionan exactamente igual que en la tabla: emiten las mismas señales al componente padre. -->
          <button @click="emit('edit', user)" class="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 mr-4 font-semibold">Editar</button>
          <button @click="emit('delete', user.id)" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>