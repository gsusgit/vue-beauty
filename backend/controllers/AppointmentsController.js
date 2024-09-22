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

export {
    createAppointment
}
