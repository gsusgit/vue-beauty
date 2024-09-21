import express from 'express'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'

// Configurar App
const app = express()

// Conectar a base de datos
db()

// Definir rutas
app.use('/api/services', servicesRoutes)

// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar App
app.listen(PORT, () => {
    console.log('El servidor está escuchando en el puerto', PORT)
})
