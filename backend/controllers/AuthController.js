import User from '../models/User.js'
import { handleError } from '../utils/index.js'

const register = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        await handleError(res, 400, 'Todos los campos son obligatorios')
    }
    const { email, password } = req.body
    try {
        const userExists = await User.findOne({email})
        if (userExists) {
            await handleError(res, 400, 'Ya existe un usuario con ese email')
        }
        const MIN_PASSWORD_LENGTH = 8
        if (password.trim().length < MIN_PASSWORD_LENGTH) {
            await handleError(res, 400, `El password ha de tener como minimo ${MIN_PASSWORD_LENGTH} caracteres`)
        }
        const user = new User(req.body)
        await user.save()
        return res.json({
            msg: 'Usuario creado correctamente, revisa tu email'
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    register
}
