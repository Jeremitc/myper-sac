// src/composables/useUsers.ts
import { ref, computed, onMounted, reactive } from 'vue'; // Importamos las herramientas de Vue para crear "piezas reactivas".
import type { User } from '../types/user'; // Importamos el "molde" o "contrato" de cómo debe ser un Usuario.

// Esta es nuestra "fábrica" de lógica de usuarios.
// Cuando un componente la llame, le devolverá todas las herramientas que necesita.
export function useUsers() {
  // --- ESTADO INTERNO (Los datos con los que trabajamos) ---
  // ref() es como una cajita que contiene un valor. Vue observa estas cajitas y si su contenido cambia, actualiza la pantalla.
  const users = ref<User[]>([]); // Cajita para guardar la lista de todos los usuarios.
  const isLoading = ref(true); // Cajita-interruptor para saber si estamos cargando datos (true/false).
  const error = ref<string | null>(null); // Cajita para guardar un mensaje de error si algo sale mal.
  const showModal = ref(false); // Cajita-interruptor para mostrar u ocultar el pop-up (modal).
  const modalMode = ref<'create' | 'edit'>('create'); // Cajita para saber si el modal está en modo "crear" o "editar".
  
  // reactive() es para objetos. Permite que Vue observe todas las propiedades del objeto a la vez.
  // Lo usamos para los datos del formulario del pop-up.
  const currentUser = reactive<Partial<User>>({
    id: undefined,
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  // --- ACCIONES (Lo que podemos hacer con los datos) ---

  // 1. FUNCIÓN PARA OBTENER LOS USUARIOS DEL SERVIDOR
  // "async" significa que esta función hará algo que toma tiempo (como esperar una respuesta de internet).
  const fetchUsers = async () => {
    try { // "Intenta" hacer esto:
      const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Pedir los datos a la URL.
      if (!response.ok) { // Si la respuesta no fue exitosa...
        throw new Error(`HTTP error: ${response.status}`); // ...lanza un error.
      }
      const data = await response.json(); // Convierte la respuesta en datos que JavaScript entiende.
      users.value = data; // Guarda los datos recibidos en nuestra cajita "users".
    } catch (err) { // Si algo falló en el "try"...
      error.value = 'Error al cargar los usuarios'; // ...guarda un mensaje de error en nuestra cajita "error".
    } finally { // "Finalmente", sin importar si funcionó o falló...
      isLoading.value = false; // ...apagamos el indicador de "cargando".
    }
  };

  // 2. HOOK DE CICLO DE VIDA
  // 'onMounted' le dice a Vue: "Cuando el componente que usa esto aparezca en pantalla por primera vez, ejecuta esta función".
  onMounted(() => {
    fetchUsers(); // Así que, apenas cargue la página, pedimos los usuarios.
  });

  // 3. FUNCIONES PARA MANEJAR EL MODAL (POP-UP)
  const openCreateModal = () => {
    // Limpiamos el formulario para un nuevo usuario.
    Object.assign(currentUser, { id: undefined, name: '', username: '', email: '', phone: '' });
    modalMode.value = 'create'; // Ponemos el modal en modo "crear".
    showModal.value = true; // Mostramos el modal.
  };

  const openEditModal = (user: User) => {
    Object.assign(currentUser, { ...user }); // Rellenamos el formulario con los datos del usuario a editar.
    modalMode.value = 'edit'; // Ponemos el modal en modo "editar".
    showModal.value = true; // Mostramos el modal.
  };

  const closeModal = () => {
    showModal.value = false; // Simplemente ocultamos el modal.
  };

  // 4. FUNCIÓN PARA GUARDAR (CREAR O ACTUALIZAR) UN USUARIO
  const saveUser = () => {
    // Validación simple de ejemplo
    if (!currentUser.email) {
      alert('El correo es obligatorio.');
      return;
    }

    if (modalMode.value === 'create') {
      // Si estamos creando, inventamos un ID nuevo y añadimos el usuario a la lista.
      const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1;
      users.value.push({ ...currentUser, id: newId } as User);
    } else {
      // Si estamos editando, buscamos al usuario en la lista y reemplazamos sus datos.
      const index = users.value.findIndex(u => u.id === currentUser.id);
      if (index !== -1) {
        users.value[index] = { ...currentUser } as User;
      }
    }
    closeModal(); // Al final, cerramos el modal.
  };

  // 5. FUNCIÓN PARA ELIMINAR UN USUARIO
  const deleteUser = (userId: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) { // Pedimos confirmación.
      // Creamos una nueva lista que contiene a todos los usuarios EXCEPTO el que queremos borrar.
      users.value = users.value.filter(u => u.id !== userId);
    }
  };

  // --- DATOS CALCULADOS (Valores que dependen de otros) ---
  // 'computed' es una cajita cuyo valor se calcula automáticamente a partir de otras cajitas.
  const modalTitle = computed(() => {
    // Si el modo es 'create', el título es 'Crear...'. Si no, es 'Editar...'.
    // Si `modalMode` cambia, este título se actualiza solo. ¡Es mágico!
    return modalMode.value === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario';
  });

  // --- EXPOSICIÓN (Devolvemos todas nuestras herramientas) ---
  // Hacemos que todas nuestras cajitas y funciones estén disponibles para el componente que las pida.
  return {
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
  };
}