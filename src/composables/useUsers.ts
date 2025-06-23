// src/composables/useUsers.ts
import { ref, computed, onMounted, reactive } from 'vue';
import type { User } from '../types/user';

export function useUsers() {
  const users = ref<User[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const showModal = ref(false);
  const modalMode = ref<'create' | 'edit'>('create');
  const currentUser = reactive<Partial<User>>({
    id: undefined,
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Datos no recibidos en el formato esperado');
      }
      users.value = data;
      console.log('Usuarios cargados en useUsers:', users.value); // Depuración
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      error.value = err instanceof Error ? err.message : 'Error al cargar los usuarios';
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchUsers();
  });

  const openCreateModal = () => {
    Object.assign(currentUser, {
      id: undefined,
      name: '',
      username: '',
      email: '',
      phone: '',
    });
    modalMode.value = 'create';
    showModal.value = true;
  };

  const openEditModal = (user: User) => {
    Object.assign(currentUser, { ...user });
    modalMode.value = 'edit';
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const saveUser = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!currentUser.email || !emailRegex.test(currentUser.email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (modalMode.value === 'create') {
      const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1;
      users.value.push({
        id: newId,
        name: currentUser.name || '',
        username: currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      });
    } else {
      const index = users.value.findIndex(u => u.id === currentUser.id);
      if (index !== -1) {
        users.value[index] = { ...currentUser } as User;
      }
    }
    closeModal();
  };

  const deleteUser = (userId: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      users.value = users.value.filter(u => u.id !== userId);
    }
  };

  const modalTitle = computed(() => {
    return modalMode.value === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario';
  });

  return {
    users,
    isLoading,
    error,
    showModal,
    modalMode,
    currentUser,
    modalTitle,
    openCreateModal,
    openEditModal,
    closeModal,
    saveUser,
    deleteUser,
  };
}