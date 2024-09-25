import Appointments from '../models/Appointments.js'
import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import { handleNotFoundError, validateObjectId } from '../utils/index.js'

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
        return res.json(appointment)
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
    getAppointmentsByDate
}
