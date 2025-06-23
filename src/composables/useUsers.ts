// src/composables/useUsers.ts
import { ref, onMounted, reactive, computed } from 'vue';
import type { User } from '../types/user';

// El 'export function' lo hace reutilizable
export function useUsers() {
  // 1. Toda la lógica de estado y funciones que teníamos en App.vue
  const users = ref<User[]>([]);
  const isLoading = ref<boolean>(true);
  const showModal = ref<boolean>(false);
  const modalMode = ref<'create' | 'edit'>('create');
  const currentUser = reactive<Partial<User>>({
    id: undefined, name: '', username: '', email: '', phone: '',
  });

  const fetchUsers = async () => {
    // ...misma lógica de fetch...
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Error al obtener los datos');
      users.value = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(fetchUsers);
  
  // ...todas las demás funciones: openCreateModal, openEditModal, closeModal, saveUser, deleteUser...
  const openCreateModal = () => { /* ...código idéntico... */ Object.assign(currentUser, { id: undefined, name: '', username: '', email: '', phone: '' }); modalMode.value = 'create'; showModal.value = true; };
  const openEditModal = (user: User) => { /* ...código idéntico... */ Object.assign(currentUser, { ...user }); modalMode.value = 'edit'; showModal.value = true; };
  const closeModal = () => { showModal.value = false; };
  const saveUser = () => { /* ...código idéntico... */ const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if (!currentUser.email || !emailRegex.test(currentUser.email)) { alert('Por favor, introduce un correo electrónico válido.'); return; } if (modalMode.value === 'create') { const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1; users.value.push({ id: newId, name: currentUser.name || '', username: currentUser.username || '', email: currentUser.email || '', phone: currentUser.phone || '' }); } else { const index = users.value.findIndex(u => u.id === currentUser.id); if (index !== -1) users.value[index] = { ...currentUser } as User; } closeModal(); };
  const deleteUser = (userId: number) => { if (confirm('¿Estás seguro?')) { users.value = users.value.filter(u => u.id !== userId); } };

  const modalTitle = computed(() => {
    return modalMode.value === 'create' ? 'Agregar Nuevo Usuario' : 'Editar Usuario';
  });

  // 2. Exponemos todo lo que la vista necesita
  return {
    users,
    isLoading,
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