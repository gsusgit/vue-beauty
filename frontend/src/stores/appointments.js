import { defineStore } from 'pinia'
import { computed, onMounted, ref, inject, watch } from 'vue'
import { useUserStore } from '@/stores/user.js'
import appointmentsAPI from '@/api/appointmentsAPI.js'
import { convertToISO } from '../helpers/date.js'
import { useRouter } from 'vue-router'

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const user = useUserStore()
    const toast = inject('toast')
    const router = useRouter()
    const availableHours = ref([])

    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    watch(date, () => {
        onDateChanged()
    })

    async function onDateChanged () {
        const selectedDate = date.value
        try {
            const { data } = await appointmentsAPI.getByDate(selectedDate)
            availableHours.value = hours.value.map(hour => {
                const isReserved = data.some(appointment => appointment.time === hour)
                return {
                    hour: hour,
                    available: isReserved
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

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
            date: convertToISO(date.value),
            time: time.value,
            totalCost: totalCost.value,
            user: user.userData._id
        }
        try {
            const {data} = await appointmentsAPI.create(appointment)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            router.push({name: 'my-appointments'})
            setTimeout(() => {
                clearAppointmentData()
            }, 100)
        } catch (error) {
            console.log(error)
        }
    }

    function clearAppointmentData() {
        services.value = []
        date.value = ''
        time.value = ''
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

    const isDateSelected = computed(() => {
        return date.value !== ''
    })

    const updatedHours = computed(() => {
        if (availableHours.value.length > 0) {
            return availableHours.value
        }
        return hours.value.map(hour => ({ hour, available: true }))
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
        isValidReservation,
        isDateSelected,
        updatedHours
    }
})
