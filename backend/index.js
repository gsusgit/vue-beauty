import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'

// Variables de entorno
dotenv.config()

// Configurar App
const app = express()

// Leer datos via body
app.use(express.json())

// Conectar a base de datos
db()

// Definir rutas
app.use('/api/services', servicesRoutes)

// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar App
app.listen(PORT, () => {
    console.log(colors.blue.bgMagenta.bold('El servidor está escuchando en el puerto', PORT))
})
