<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="lg:flex h-screen">
    <div class="h-64 hidden lg:block md:h-screen bg-cover bg-center md:w-1/3 bg-app"></div>
    <div class="lg:w-2/3 px-10 py-5 min-h-full overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>
