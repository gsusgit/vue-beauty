<script setup>
import { formatCurrency } from '../helpers/index.js'
import { displayDate } from '@/helpers/date.js'

defineProps({
  appointment: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white p-5 space-y-5 rounded-lg">
    <p class="text-gray-500 font-black">
      Fecha: <span class="font-light">{{displayDate(appointment.date)}}</span> Hora: <span class="font-light">{{appointment.time}}</span>
    </p>
    <p class="text-gray-500 text-xl font-black">Total a pagar: <span class="font-light">{{formatCurrency(appointment.totalCost)}}</span></p>
  </div>
</template>
