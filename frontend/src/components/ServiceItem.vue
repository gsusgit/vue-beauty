<script setup>
import { formatCurrency } from '../helpers/index.js'
import { useAppointmentsStore } from '@/stores/appointments.js'

defineProps({
  service: {
    type: Object,
    required: true
  }
})

const appointments = useAppointmentsStore()

</script>

<template>
  <div
      class="p-5 space-y-5 cursor-pointer bg-white rounded-lg"
      @click="appointments.onServiceSelected(service)"
  >
    <p class="text-2xl font-light">{{service.name}}</p>
    <p class="text-3xl font-black text-blue-700">{{formatCurrency(service.price)}}</p>
  </div>
</template>
