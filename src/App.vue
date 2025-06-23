<!-- src/App.vue -->
<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';
import UsersPage from './views/UserPage.vue';
</script>

<template>
  <DefaultLayout>
    <UsersPage />
  </DefaultLayout>
</template>