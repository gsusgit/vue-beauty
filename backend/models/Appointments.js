import mongoose from "mongoose"

const appointmentsSchema = mongoose.Schema({
    services: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    totalCost: {
        type: Number,
        required: true
    }
})

const Appointments = mongoose.model('Appointments', appointmentsSchema)

export default Appointments
