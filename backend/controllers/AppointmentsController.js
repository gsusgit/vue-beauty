import Appointments from '../models/Appointments.js'

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

export {
    createAppointment,
    getAppointments,
    getAppointmentsByUserId
}
