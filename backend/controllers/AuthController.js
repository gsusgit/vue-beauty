import User from '../models/User.js'
import { handleError } from '../utils/index.js'
import { sendEmailVerification, sendEmailUserVerified } from '../emails/authEmailService.js'

const register = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        await handleError(res, 400, 'Todos los campos son obligatorios')
    }
    const { email, password } = req.body
    const userExists = await User.findOne({email})
    if (userExists) {
        await handleError(res, 400, 'Ya existe un usuario con ese email')
    }
    const MIN_PASSWORD_LENGTH = 8
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        await handleError(res, 400, `El password ha de tener como minimo ${MIN_PASSWORD_LENGTH} caracteres`)
    }
    try {
        const user = new User(req.body)
        const result = await user.save()
        const { name, email, token } = result
        sendEmailVerification({
            name,
            email,
            token
        })
        return res.json({
            msg: 'Usuario creado correctamente, revisa tu email'
        })
    } catch (error) {
        console.log(error)
    }
}

const verify = async (req, res) => {
    const {token} = req.params
    const user = await User.findOne({token})
    if (!user) {
        await handleError(res, 401, 'No existe un usuario con ese token o es un token no válido, puede que el usuario ya esté verificado')
    }
    try {
        const { name, email } = user
        user.verified = true
        user.token = ''
        await user.save()
        sendEmailUserVerified({
            name,
            email
        })
        return res.json({
            msg: 'Usuario verificado correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const logIn = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        await handleError(res, 400, 'Todos los campos son obligatorios')
    }
    const { email, password } = req.body
    const user = await User.findOne({email})
    if (!user) {
        await handleError(res, 401, 'El usuario no existe')
    }
    if (!user.verified) {
        await handleError(res, 401, 'Tu cuenta aún no ha sido verificada')
    }
    if (await user.checkPassword(password)) {
        return res.json({
            msg: 'Inicio de sesión satisfactorio'
        })
    } else {
        await handleError(res, 401, 'Credenciales incorrectas')
    }

}

export {
    register,
    verify,
    logIn
}
