import express from 'express'
import { createAppointment, getAppointments, getAppointmentsByUserId, getAppointmentsByDate, getAppointmentById } from '../controllers/AppointmentsController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)
    // .get(authMiddleware, getAppointments) // colapsa con la de fecha
    .get(authMiddleware, getAppointmentsByDate)

router.route('/:id')
    .get(authMiddleware, getAppointmentById)

router.route('/:userId')
    .get(authMiddleware, getAppointmentsByUserId)


export default router
