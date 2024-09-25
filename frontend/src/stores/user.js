import { defineStore } from 'pinia'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import authAPI from '@/api/authAPI.js'
import appointmentsAPI from '@/api/appointmentsAPI.js'

export const useUserStore = defineStore('user', () => {

    const userData = ref({})
    const router = useRouter()
    const appointments = ref([])
    const loading = ref(true)

    onMounted(async () => {
        try {
            const { data } = await authAPI.checkToken()
            userData.value = data
            await getUserAppointments(userData.value._id)
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    })

    async function getUserAppointments(userId) {
        try {
            const { data } = await appointmentsAPI.getUserAppointments(userId)
            appointments.value = data
        } catch (error) {
            console.log(error)
        }
    }

    const hasAppointments = computed(() => {
        return appointments.value.length > 0
    })

    const logOut = () => {
        localStorage.removeItem('vuebeautytoken')
        userData.value = {}
        router.push({name: 'login'})
    }

    return {
        userData,
        logOut,
        getUserAppointments,
        appointments,
        hasAppointments,
        loading
    }
})
