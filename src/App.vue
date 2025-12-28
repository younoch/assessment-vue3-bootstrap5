<script setup lang="ts">
import AppHeader from './components/common/AppHeader.vue'
</script>

<template>
  <div>
    <AppHeader />

    <!-- Routed pages -->
    <main class="container-xxl mx-auto px-0">
      <router-view />
    </main>
  </div>
</template>