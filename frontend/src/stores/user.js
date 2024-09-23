import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authAPI from '@/api/authAPI.js'

export const useUserStore = defineStore('user', () => {

    const userData = ref({})
    const token = ref('')
    const router = useRouter()

    onMounted(async () => {
        const storage = localStorage.getItem('vuebeautytoken')
        if (storage) {
            token.value = 'Bearer ' + JSON.parse(storage)
            try {
                const {data} = await authAPI.checkToken(token.value)
                userData.value = data
            } catch (error) {
                console.log(error)
            }
        }
    })

    const logOut = () => {
        localStorage.removeItem('vuebeautytoken')
        userData.value = {}
        router.push({name: 'login'})
    }

    return {
        userData,
        logOut
    }
})
