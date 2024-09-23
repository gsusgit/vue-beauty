import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import appointmentsRoutes from './routes/appointmentsRoutes.js'
import authRoutes from './routes/authRoutes.js'

// Variables de entorno
dotenv.config()

// Configurar App
const app = express()

// Leer datos via body
app.use(express.json())

// Conectar a base de datos
db()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

if(process.argv[2] === '--postman') {
    whitelist.push(undefined)
}

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
app.use(cors(corsOptions))

// Definir rutas
app.use('/api/services', servicesRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/auth', authRoutes)

// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar App
app.listen(PORT, () => {
    console.log(colors.blue.bgMagenta.bold('El servidor está escuchando en el puerto', PORT))
})
