<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments.js'
import { onMounted } from 'vue'
import appointmentsAPI from '@/api/appointmentsAPI.js'

const appointments = useAppointmentsStore()
const route = useRoute()
const router = useRouter()
const {id} = route.params

onMounted(async () => {
  try {
    const {data} = await appointmentsAPI.getAppointment(id)
    appointments.setSelectedAppointment(data)
  } catch (error) {
    router.push({name: 'my-appointments'})
  }
})
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
        :to="{name: 'edit-appointment'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:text-white hover:bg-blue-600"
        :class="route.name === 'edit-appointment' ? 'bg-blue-500 text-white' : 'text-blue-500 bg-white'"
    >
      Servicios
    </RouterLink>
    <RouterLink
        :to="{name: 'edit-appointment-details'}"
        class="flex-1"
    >
      <button
          class="p-3 text-center w-full uppercase font-extrabold hover:text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-400"
          :class="route.name === 'edit-appointment-details' ? 'bg-blue-500 text-white' : 'text-blue-500 bg-white'"
          :disabled="appointments.noServicesSelected"
      >
        Cita y resumen
      </button>
    </RouterLink>
  </nav>
  <RouterView />
</template>
