<script setup>
import { useUserStore } from '@/stores/user.js'
import Appointment from '@/components/Appointment.vue'

const user = useUserStore()
</script>

<template>
  <div class="mb-10">
    <h2 class="text-4xl font-extrabold text-white mt-10">Mis citas</h2>
    <p class="text-white text-lg mt-5">Consulta tus citas pendientes</p>
    <h3 class="text-2xl font-extrabold text-white mt-5"></h3>
    <div v-if="!user.loading">
      <div class="grid gap-5 mt-5" v-if="user.hasAppointments">
        <div class="grid grid-cols-1 gap-5 mt-10">
          <Appointment
              v-for="appointment in user.appointments"
            :appointment="appointment"
          />
        </div>
      </div>
      <div v-else class="border rounded-md bg-gray-800 border-gray-600 text-gray-500 p-4 font-semibold text-xl">
        No tienes citas pendientes
      </div>
    </div>
  </div>
</template>
