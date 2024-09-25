<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { formatCurrency } from '@/helpers/index.js'
import { useAppointmentsStore } from '@/stores/appointments.js'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import SelectedService from '@/components/SelectedService.vue'

const appointments = useAppointmentsStore()
const router = useRouter()
const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMMM',
})
const disabledDate = (date) => {
  const today = new Date()
  return date < today || date.getMonth() > today.getMonth() + 1 || [0, 6].includes(date.getDay())
}

watch(appointments, () => {
  if (appointments.noServicesSelected) {
    router.push({name: 'new-appointment'})
  }
})
</script>

<template>
  <div class="mb-10">
    <h2 class="text-4xl font-extrabold text-white mt-10">Detalles de cita</h2>
    <p class="text-white text-lg mt-5">A continuación verifica la información y confirma tu cita</p>
    <h3 class="text-2xl font-extrabold text-white mt-10">Servicios</h3>
    <div class="grid gap-5 mt-5">
      <SelectedService
          v-for="service in appointments.services"
          :service="service"
          :key="service._id"
      />
      <p class="text-2xl text-white mt-1 text-right">Total a pagar: <span class="font-black">{{formatCurrency(appointments.totalCost)}}</span></p>
    </div>
    <div class="flex flex-col md:flex-row mt-12">
      <div class="w-full md:w-1/2">
        <h3 class="text-gray-400 font-medium text-xl mb-3">Seleccione un día</h3>
        <VueTailwindDatepicker
            i18n="es-mx"
            as-single
            no-input
            :formatter="formatter"
            :disable-date="disabledDate"
            v-model="appointments.date"
        />
      </div>
      <div v-if="appointments.isDateSelected" class="w-full md:w-1/2 mt-10 md:mt-0 pl-2">
        <h3 class="text-gray-400 font-medium text-xl mb-3">Seleccione una hora</h3>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
          <button
              class="block rounded-lg text-xl font-black p-4 hover:bg-blue-500 hover:text-white disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-default"
              :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
              v-for="hour in appointments.hours"
              @click="appointments.time = hour"
              :disabled="appointments.disableTime(hour) ? true : false"
          >
            {{hour}}
          </button>
        </div>
      </div>
    </div>
    <div v-if="appointments.isValidReservation" class="w-full mt-10">
      <button
          class="text-white bg-green-500 p-3 text-xl uppercase font-black w-full md:w-full rounded-lg"
          @click="appointments.createAppointment"
      >
        Confirmar cita
      </button>
    </div>
  </div>
</template>
