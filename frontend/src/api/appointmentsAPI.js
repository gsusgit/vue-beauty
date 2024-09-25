import api from '@/lib/axios.js'

export default {
    create(data) {
        return api.post('/appointments', data)
    },
    getByDate(date) {
        return api.get(`/appointments?date=${date}`)
    },
    getUserAppointments(userId) {
        return api.get(`/users/${userId}/appointments`)
    },
    getAppointment(id) {
        return api.get(`/appointments/${id}`)
    },
    update(id, data) {
        return api.put(`/appointments/${id}`, data)
    }
}

