import express from 'express'
import { register, verify, logIn, user } from '../controllers/AuthController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', verify)
router.post('/login', logIn)

// JWT
router.get('/user', authMiddleware, user)

export default router
