import express from 'express'
import servicesRoutes from './routes/servicesRoutes.js'

// Configurar App
const app = express()

// Definir rutas
app.use('/api/services', servicesRoutes)

// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar App
app.listen(PORT, () => {
    console.log('El servidor está escuchando en el puerto', PORT)
})
