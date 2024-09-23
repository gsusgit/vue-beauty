import api from '@/lib/axios.js'

export default {
    register(data) {
        return api.post('/auth/register', data)
    },
    login(data) {
        return api.post('/auth/login', data)
    },
    verify(token) {
        return api.get(`/auth/verify/${token}`)
    }
}
