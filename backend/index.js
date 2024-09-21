import express from 'express'

// Configurar App
const app = express()

// Definir ruta
app.get('/', (req, res) => {
    const product = {
        id: 1,
        price: 10,
        name: 'Laptop'
    }
    res.json(product)
})

// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar App
app.listen(PORT, () => {
    console.log('El servidor está escuchando en el puerto', PORT)
})
