import api from '@/lib/axios.js'

export default {
    create(data) {
        const storage = localStorage.getItem('vuebeautytoken')
        const token = 'Bearer ' + JSON.parse(storage)
        return api.post('/appointments', data, {
            headers: {
                Authorization: token
            }
        })
    },
    getByDate(date) {
        const storage = localStorage.getItem('vuebeautytoken')
        const token = 'Bearer ' + JSON.parse(storage)
        return api.get(`/appointments?${date}`, {
            headers: {
                Authorization: token
            }
        })
    }
}

