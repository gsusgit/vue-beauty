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
    <p class="text-lg font-black">Servicios reservados:</p>
    <div
        v-for="service in appointment.services"
    >
      <p>{{service.name}}: {{formatCurrency(service.price)}}</p>
    </div>
    <p class="text-blue-600 text-xl font-black text-right">Total a pagar: {{formatCurrency(appointment.totalCost)}}</p>
    <div class="flex gap-2 items-center">
      <RouterLink
          :to="{name: 'edit-appointmnent', params: {id: appointment._id}}">
        <button
            class="bg-slate-600 hover:bg-slate-700 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        >
          Editar
        </button>
      </RouterLink>
      <button
          class="bg-red-600 hover:bg-red-700 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>
