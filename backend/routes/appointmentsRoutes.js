import express from 'express'
import { createAppointment, getAppointments, getAppointmentsByUserId } from '../controllers/AppointmentsController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)

router.route('/')
    .get(authMiddleware, getAppointments)

router.route('/:userId')
    .get(authMiddleware, getAppointmentsByUserId)


export default router
