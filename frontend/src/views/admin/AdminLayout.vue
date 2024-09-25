<script setup>
import { useUserStore } from '@/stores/user.js'
const user = useUserStore()
</script>


<template>
  <div class="flex justify-between">
    <div class="flex flex-col items-start space-y-1">
      <div class="flex items-center space-x-1 rtl:space-x-reverse">
        <img src="@/assets/logo.svg" class="h-6" alt="Vue Logo">
        <h1 class="text-lg whitespace-nowrap font-black text-white">ue Beauty</h1>
      </div>
      <h2 class="px-1 rounded-md bg-red-300 text-md font-black uppercase">Admin panel</h2>
    </div>

    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center">
        <p class="text-white text-right">Hola: {{ user.userData.name }}</p>
        <button
            type="button"
            class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
            @click="user.logOut"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
  <main class="space-y-6">
    <RouterView />
  </main>
</template>
