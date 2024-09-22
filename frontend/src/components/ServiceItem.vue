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
      :class="appointments.isServiceSelected(service._id) ? 'bg-green-500 text-white' : 'bg-white'"
      class="p-5 space-y-5 cursor-pointer rounded-lg"
      @click="appointments.onServiceSelected(service)"
  >
    <p class="text-2xl font-light">{{service.name}}</p>
    <p
        :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-gray-700'"
        class="text-3xl font-black"
    >
      {{formatCurrency(service.price)}}
    </p>
  </div>
</template>
