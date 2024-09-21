import express from 'express'
import { createService, deleteService, getService, getServices, updateService } from '../controllers/ServicesController.js'

const router = express.Router()

router.route('/')
    .post(createService)
    .get(getServices)

router.route('/:id')
    .get(getService)
    .put(updateService)
    .delete(deleteService)

export default router
