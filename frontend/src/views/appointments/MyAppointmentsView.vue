<script setup>
import { useAppointmentsStore } from '@/stores/appointments.js'
import { useUserStore } from '@/stores/user.js'

const appointments = useAppointmentsStore()
const user = useUserStore()

</script>

<template>
  <div class="mb-10">
    <h2 class="text-4xl font-extrabold text-white mt-10">Mis citas</h2>
    <p class="text-white text-lg mt-5">Consulta tus citas pasadas y citas pendientes</p>
    <h3 class="text-2xl font-extrabold text-white mt-10"></h3>
    <div class="grid gap-5 mt-5">

    </div>
  </div>
</template>
