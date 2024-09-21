import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(colors.cyan('Conectado a MongoDB', url))
    } catch (error) {
        console.log(colors.red.bgBlack.bold(`Error: ${error.message}`))
        process.exit(1)
    }
}
