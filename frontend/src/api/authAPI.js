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
    },
    checkToken() {
        return api.get('/auth/user')
    },
    forgotPassword(data) {
        return api.post('/auth/forgot-password', data)
    },
    verifyPasswordResetToken(token) {
        return api.get(`/auth/forgot-password/${token}`)
    },
    updatePassword(token, data) {
        return api.post(`/auth/forgot-password/${token}`, data)
    },
    isAdmin() {
        return api.get('/auth/admin')
    }
}
