<script setup>
const authRoutes = [
  { name: 'register', title: 'Crear cuenta' },
  { name: 'login', title: 'Iniciar sesión' }
]
</script>

<template>
  <div class="mx-auto lg:w-4/5 mt-10">
    <div class="flex items-center space-x-1 justify-center">
      <img src="@/assets/logo.svg" class="h-6" alt="Vue Logo">
      <h1 class="text-2xl lg:text-4xl whitespace-nowrap font-black text-white">ue Beauty</h1>
    </div>
    <RouterView />
    <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
      <RouterLink
          v-for="route in authRoutes"
          :to="{name: route.name}"
          class="uppercase font-bold text-white"
      >
        {{route.title}}
      </RouterLink>
    </nav>
  </div>
</template>
