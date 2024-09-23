<script setup>
const authRoutes = [
  { name: 'register', title: 'Crear cuenta', text: 'Rellena el siguiente formulario para crear tu cuenta de usuario' },
  { name: 'login', title: 'Iniciar sesión', text: 'Introduce tus credenciales de acceso' }
]
</script>

<template>
  <div class="mx-auto lg:w-4/5 mt-20">
    <div class="flex items-center space-x-1 rtl:space-x-reverse">
      <img src="@/assets/logo.svg" class="h-6" alt="Vue Logo">
      <h1 class="text-2xl lg:text-4xl whitespace-nowrap font-black text-white">ue Beauty</h1>
    </div>
    <RouterView />
    <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
      <RouterLink
          v-for="route in authRoutes"
          :to="{params: {
              name: route.name,
              title: route.title,
              text: route.text
            }}"
          class="uppercase font-bold text-white"
      >
        {{route.title}}
      </RouterLink>
    </nav>
  </div>
</template>
