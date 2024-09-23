import express from 'express'
import { register, verify, logIn } from '../controllers/AuthController.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify/:token', verify)
router.post('/login', logIn)

export default router
