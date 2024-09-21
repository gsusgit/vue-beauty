<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
        :to="{name: 'new-appointment'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:text-white hover:bg-blue-600"
        :class="route.name === 'new-appointment' ? 'bg-blue-500 text-white' : 'text-blue-500 bg-white'"
    >
      Servicios
    </RouterLink>
    <RouterLink
        :to="{name: 'appointment-details'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:text-white hover:bg-blue-600"
        :class="route.name === 'appointment-details' ? 'bg-blue-500 text-white' : 'text-blue-500 bg-white'"
    >
      Cita y resumen
    </RouterLink>
  </nav>
  <RouterView />
</template>
