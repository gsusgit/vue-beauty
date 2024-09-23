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
      <p class="text-2xl text-white mt-5 text-right">Total a pagar: <span class="font-black">{{formatCurrency(appointments.totalCost)}}</span></p>
    </div>
    <div class="space-y-8">
      <h3 class="text-3xl font-extrabold text-white">Fecha y hora</h3>
      <div class="lg:flex gap-5 items-start">
        <div class="w-full lg:w-96 flex justify-start rounded-lg">
          <VueTailwindDatepicker
              i18n="es-mx"
              as-single
              no-input
              :formatter="formatter"
              :disable-date="disabledDate"
              v-model="appointments.date"
          />
        </div>
        <div class="flex-1 grid sm:grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
          <button
              class="block rounded-lg text-xl font-black p-3 hover:bg-blue-500 hover:text-white"
              :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
              v-for="hour in appointments.hours"
              @click="appointments.time = hour"
          >
            {{hour}}
          </button>
        </div>
      </div>
    </div>
    <div v-if="appointments.isValidReservation" class="flex justify-end mt-10">
      <button
          class="text-white bg-blue-500 p-3 uppercase font-black w-full md:w-auto rounded-lg"
          @click="appointments.createAppointment"
      >
        Confirmar cita
      </button>
    </div>
  </div>
</template>
