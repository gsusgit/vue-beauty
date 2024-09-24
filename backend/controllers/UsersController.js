import Appointments from '../models/Appointments.js'

const getUserAppointments = async (req, res) => {
    const {user} = req.params
    if (user !== req.user._id.toString()) {
        const error = new Error('Acceso denegado')
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        const appointments = await Appointments.find({   user,
            date: {
                $gte: new Date()
            }
        }).populate('services').sort({date: 'asc'})
        if (!appointments) {
            const error = new Error('El usuario no tiene citas')
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
    getUserAppointments
}
