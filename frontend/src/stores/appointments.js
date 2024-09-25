import { defineStore } from 'pinia'
import { computed, onMounted, ref, inject, watch } from 'vue'
import { useUserStore } from '@/stores/user.js'
import appointmentsAPI from '@/api/appointmentsAPI.js'
import { convertToDDMMYYYY, convertToISO } from '../helpers/date.js'
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
    const appointmentId = ref('')
    const appointmentsByDate = ref([])

    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    watch(date, async () => {
        time.value = ''
        if(date.value === '') return
        const {data } = await appointmentsAPI.getByDate(date.value)
        if(appointmentId.value) {
            appointmentsByDate.value = data.filter( appointment => appointment._id !==  appointmentId.value)
            time.value = data.filter( appointment => appointment._id ===  appointmentId.value)[0].time
        } else {
            appointmentsByDate.value = data
        }
    })

    function setSelectedAppointment (appointment) {
        services.value = appointment.services
        date.value = convertToDDMMYYYY(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id
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

    async function saveAppointment() {
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalCost: totalCost.value,
            user: user.userData._id
        }
        if (appointmentId.value) {
            try {
                const {data} = await appointmentsAPI.update(appointmentId.value, appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const {data} = await appointmentsAPI.create(appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
            } catch (error) {
                console.log(error)
            }
        }
        await user.getUserAppointments()
        setTimeout(() => {
            clearAppointmentData()
        }, 100)
    }

    async function deleteAppointment(id) {
        try {
            const {data} = await appointmentsAPI.delete(id)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            user.appointments = user.appointments.filter(appointment => appointment._id !== id)
        } catch (error) {
            console.log(error)
        }
    }

    function clearAppointmentData() {
        services.value = []
        date.value = ''
        time.value = ''
        appointmentId.value = ''
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

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.time === hour)
        }
    })

    return {
        onServiceSelected,
        saveAppointment,
        setSelectedAppointment,
        clearAppointmentData,
        deleteAppointment,
        isServiceSelected,
        noServicesSelected,
        services,
        date,
        hours,
        time,
        totalCost,
        isValidReservation,
        isDateSelected,
        updatedHours,
        disableTime
    }
})
