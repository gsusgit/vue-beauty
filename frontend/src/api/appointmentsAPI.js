import api from '@/lib/axios.js'

export default {
    createAppointment(data) {
        const storage = localStorage.getItem('vuebeautytoken')
        const token = 'Bearer ' + JSON.parse(storage)
        return api.post('/appointments', data, {
            headers: {
                Authorization: token
            }
        })
    }
}

