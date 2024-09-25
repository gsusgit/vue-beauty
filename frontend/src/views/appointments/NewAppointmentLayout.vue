<script setup>
import { useRoute } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { onMounted } from 'vue'

const appointments = useAppointmentsStore()

const route = useRoute()

onMounted(() => {
  appointments.clearAppointmentData()
})
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
        class="flex-1"
    >
      <button
          class="p-3 text-center w-full uppercase font-extrabold hover:text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-400"
          :class="route.name === 'appointment-details' ? 'bg-blue-500 text-white' : 'text-blue-500 bg-white'"
          :disabled="appointments.noServicesSelected"
      >
        Cita y resumen
      </button>
    </RouterLink>
  </nav>
  <RouterView />
</template>
