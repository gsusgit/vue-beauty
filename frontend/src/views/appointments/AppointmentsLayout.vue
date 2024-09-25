<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const user = useUserStore()

const route = useRoute()
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">App Salón</h1>

    <div class="flex flex-col space-y-5 items-end">
      <div class="flex gap-2 items-center">
        <p class="text-white text-right">Hola {{ user.userData.name }}</p>

        <button
            type="button"
            class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
            @click="user.logOut"
        >
          Cerrar Sesión
        </button>
      </div>
      <nav class="flex gap-2 items-center justify-end">
        <RouterLink
            :to="{name: 'my-appointments'}"
            :class="route.name === 'my-appointments' ? 'bg-blue-700 text-gray-200' : 'bg-white text-blue-700'"
            class="p-3 uppercase text-xs font-black rounded-lg hover:text-white hover:bg-blue-700"
        >
          Mis citas
        </RouterLink>
        <RouterLink
            :to="{name: 'new-appointment'}"
            :class="route.name === 'new-appointment' ? 'bg-blue-700 text-gray-200' : 'bg-white text-blue-700'"
            class="p-3 uppercase text-xs font-black rounded-lg hover:text-white hover:bg-blue-700"
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
