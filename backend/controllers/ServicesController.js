import Services from '../models/Services.js'
import { handleNotFoundError, validateObjectId } from '../utils/index.js'

const createService = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        const service = new Services(req.body)
        await service.save()
        return res.json({
            msg: 'Servicio creado correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Services.find()
        if (services.length === 0) {
            const error = new Error('No existen servicios')
            return res.status(404).json({
                msg: error.message
            })
        }
        return await res.json(services)
    } catch (error) {
        console.log(error)
    }
}

const getService = async (req, res) => {
    const {id} = req.params
    if (validateObjectId(id, res))
        return
    try {
        const service = await Services.findById(id)
        if (!service) {
            await handleNotFoundError(res, 'Servicio no encontrado')
        }
        return await res.json(service)
    } catch (error) {
        console.log(error)
    }
}

const updateService = async (req, res) => {
    const {id} = req.params
    if (validateObjectId(id, res))
        return
    try {
        const service = await Services.findByIdAndUpdate(id, req.body)
        if (!service) {
            await handleNotFoundError(res, 'Servicio no encontrado')
        }
        return res.json({
            msg: 'Servicio actualizado correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteService = async (req, res) => {
    const {id} = req.params
    if (validateObjectId(id, res))
        return
    try {
        const service = await Services.findByIdAndDelete(id)
        if (!service) {
            await handleNotFoundError(res, 'Servicio no encontrado')
        }
        return res.json({
            msg: 'Servicio eliminado correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    createService,
    getServices,
    getService,
    updateService,
    deleteService
}
