import Appointments from '../models/Appointments.js'
import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import { handleNotFoundError, validateObjectId, formatDate } from '../utils/index.js'
import { sendEmailCancelledAppointment, sendEmailUpdateAppointment } from '../emails/appointmentEmailService.js'

const createAppointment = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        const appointment = new Appointments(req.body)
        await appointment.save()
        return res.json({
            msg: 'Cita confirmada correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointments.find()
        if (!appointments) {
            const error = new Error('No hay citas')
            return res.status(400).json({
                msg: error.message
            })
        }
        return res.json(appointments)
    } catch (error) {
        console.log(error)
    }
}

const getAppointmentById = async (req, res) => {
    try {
        const {id} = req.params
        if (validateObjectId(id, res))
            return
        const appointment = await Appointments.findById(id).populate('services')
        if (!appointment) {
            return handleNotFoundError(res, 'Cita no encontrada')
        }
        if (appointment.user.toString() !== req.user._id.toString()) {
            const error = new Error('Acceso denegado')
            return res.status(403).json({
                msg: error.message
            })
        }
        return res.json(appointment)
    } catch (error) {
        console.log(error)
    }
}

const updateAppointment = async (req, res) => {
    const {id} = req.params
    if (validateObjectId(id, res))
        return
    const appointment = await Appointments.findById(id).populate('services')
    if(!appointment) {
        return handleNotFoundError('La Cita no existe', res)
    }
    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('Acceso denegado')
        return res.status(403).json({
            msg: error.message
        })
    }
    const { date, time, totalAmount, services} = req.body
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services
    try {
        const result = await appointment.save()
        await sendEmailUpdateAppointment({
            date: formatDate( result.date ),
            time: result.time
        })
        res.json({
            msg: 'Cita Actualizada Correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params
    if (validateObjectId(id, res))
        return
    const appointment = await Appointments.findById(id)
    if(!appointment) {
        return handleNotFoundError('La Cita no existe', res)
    }
    if(appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('Acceso denegado')
        return res.status(403).json({msg: error.message})
    }
    const { date, time } = appointment
    try {
        await appointment.deleteOne()
        await sendEmailCancelledAppointment({
            date: formatDate( date ),
            time: time
        })
        res.json({msg: 'Cita cancelada correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const getAppointmentsByUserId = async (req, res) => {
    try {
        const {userId} = req.params
        const appointments = await Appointments.find({ user: userId })
        if (!appointments) {
            const error = new Error('No hay citas')
            return res.status(400).json({
                msg: error.message
            })
        }
        return res.json(appointments)
    } catch (error) {
        console.log(error)
    }
}

const getAppointmentsByDate = async (req, res ) => {
    const { date } = req.query
    const newDate = parse(date, 'dd/MM/yyyy', new Date())
    if(!isValid(newDate)) {
        const error = new Error('Fecha no válida')
        return res.status(400).json({  msg: error.message })
    }
    const isoDate = formatISO(newDate)
    const appointments = await Appointments.find({ date: {
            $gte : startOfDay(new Date(isoDate)),
            $lte: endOfDay(new Date(isoDate))
        }}).select('time')
    return res.json(appointments)
}

export {
    createAppointment,
    getAppointments,
    getAppointmentById,
    getAppointmentsByUserId,
    getAppointmentsByDate,
    updateAppointment,
    deleteAppointment
}
