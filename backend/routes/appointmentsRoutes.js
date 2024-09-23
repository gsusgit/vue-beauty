import express from 'express'
import { createAppointment } from '../controllers/AppointmentsController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)


export default router
