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
  <div class="border border-gray-600 rounded-lg p-5 flex justify-between items-center">
    <div>
      <p class="text-2xl font-extrabold text-white">{{service.name}}</p>
      <p class="text-3xl font-black text-blue-500">{{formatCurrency(service.price)}}</p>
    </div>
    <button
        type="button"
        class="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-800 font-bold shadow-sm active:ring-4 active:ring-red-500"
        @click="appointments.onServiceSelected(service)"
    >
      Eliminar
    </button>
  </div>
</template>
