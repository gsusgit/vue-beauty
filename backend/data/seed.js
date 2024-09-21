import Services from '../models/Services.js'
import { services } from './beautyServices.js'
import dotenv from 'dotenv'
import { db } from '../config/db.js'
import colors from 'colors'

dotenv.config()

await db()

async function seedDB() {
    try {
        await Services.insertMany(services)
        console.log(colors.green.bold('Servicios importados correctamente'))
        process.exit(0)
    } catch (error) {
        console.log(colors.red.bgBlack.bold(error))
        process.exit(1)
    }
}

async function clearDB() {
    try {
        await Services.deleteMany()
        console.log(colors.green.bold('Servicios eliminados correctamente'))
        process.exit(0)
    } catch (error) {
        console.log(colors.red.bgBlack.bold(error))
        process.exit(1)
    }
}

if (process.argv[2] === '--import') {
    seedDB()
} else {
    clearDB()
}
