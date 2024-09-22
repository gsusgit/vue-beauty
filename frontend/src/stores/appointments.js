import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])

    function onServiceSelected(service) {
        if (services.value.length === 2) {
            alert('Máximo de servicios alcanzado para la cita')
        } else {
            if (services.value.some(s => s._id === service._id)) {
                cancelSelectedService(service)
            } else {
                services.value.push(service)
            }
        }
    }

    const cancelSelectedService = (service) => {
        services.value.splice(service, 1)
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })

    const noServicesSelected = computed(() => {
        return services.value.length === 0
    })

    return {
        onServiceSelected,
        isServiceSelected,
        noServicesSelected
    }
})
