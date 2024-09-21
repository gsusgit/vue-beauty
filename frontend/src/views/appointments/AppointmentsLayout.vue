<script setup>

</script>

<template>
  <div class="flex justify-between">
    <a href="/" class="flex items-center space-x-1 rtl:space-x-reverse">
      <img src="@/assets/logo.svg" class="h-6" alt="Vue Logo">
      <h1 class="text-2xl lg:text-4xl whitespace-nowrap font-black text-white">ue Beauty</h1>
    </a>
    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center">
        <p class="text-white text-right">Hola: Usuario</p>
        <button
            type="button"
            class="bg-red-600 hover:bgred-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
        >Cerrar sesión</button>
      </div>
      <nav class="flex gap-2 items-center justify-end">
        <button
          type="button"
          class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
        >
          Mis citas</button>
        <RouterLink
            :to="{name: 'new-appointment'}"
            class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-700"
        >
          Nueva cita
        </RouterLink>
      </nav>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>
