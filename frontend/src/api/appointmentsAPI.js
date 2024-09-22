import api from '@/lib/axios.js'

export default {
    createAppointment() {
        return api.post('/appointments')
    }
}
