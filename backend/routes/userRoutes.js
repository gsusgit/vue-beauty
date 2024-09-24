import express from 'express'
import { getUserAppointments } from '../controllers/UsersController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/:user/appointments')
    .get(authMiddleware, getUserAppointments)

export default router
