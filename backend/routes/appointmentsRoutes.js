import express from 'express'
import { createAppointment } from '../controllers/AppointmentsController.js'

const router = express.Router()

router.route('/')
    .post(createAppointment)


export default router
