import { defineStore } from 'pinia'

export const useAppointmentsStore = defineStore('appointments', () =>{

    function onServiceSelected(service) {
        console.log(service)
    }

    return {
        onServiceSelected
    }
})
