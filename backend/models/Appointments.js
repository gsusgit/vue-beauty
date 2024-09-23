import mongoose from "mongoose"

const appointmentsSchema = mongoose.Schema({
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services'
        }
    ],
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Appointments = mongoose.model('Appointments', appointmentsSchema)

export default Appointments
