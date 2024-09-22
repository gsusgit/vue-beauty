import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import servicesAPI from '@/api/servicesAPI.js'
import appointmentsAPI from '@/api/appointmentsAPI.js'

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')

    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    function onServiceSelected(service) {
        if (services.value.some(s => s._id === service._id)) {
            services.value = services.value.filter(s => s._id !== service._id)
        } else {
            if (services.value.length === 2) {
                alert('Máximo de servicios alcanzado para la cita')
            } else {
                services.value.push(service)
            }
        }
    }

    async function createAppointment() {
        const appointment = {
            services: services.value.map(service => service._id),
            date: date.value,
            time: time.value,
            totalCost: totalCost.value
        }
        try {
            await appointmentsAPI.createAppointment(appointment)
            console.log('Cita confirmada correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })

    const noServicesSelected = computed(() => {
        return services.value.length === 0
    })

    const totalCost = computed(() => {
        return services.value.reduce((sum, service, total) => service.price + sum, 0)
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    return {
        onServiceSelected,
        createAppointment,
        isServiceSelected,
        noServicesSelected,
        services,
        date,
        hours,
        time,
        totalCost,
        isValidReservation
    }
})
