import express from 'express'
import { register, verify, logIn, user, updatePassword, verifyPasswordResetToken, forgotPassword, admin } from '../controllers/AuthController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', verify)
router.post('/login', logIn)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)

// JWT
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)

export default router
