import User from '../models/User.js'
import { generateJWT } from '../utils/index.js'
import { sendEmailVerification, sendEmailUserVerified } from '../emails/authEmailService.js'

const register = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({msg: error.message})
    }
    const { email, password } = req.body
    const userExists = await User.findOne({email})
    if (userExists) {
        const error = new Error('Ya existe un usuario con ese email')
        return res.status(400).json({msg: error.message})
    }
    const MIN_PASSWORD_LENGTH = 8
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`El password ha de tener como minimo ${MIN_PASSWORD_LENGTH} caracteres`)
        return res.status(400).json({msg: error.message})
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
        const error = new Error('Token no válido')
        return res.status(401).json({msg: error.message})
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
    const {email, password } = req.body
    const user = await User.findOne({email})
    if(!user) {
        const error = new Error('El Usuario no existe')
        return res.status(401).json({msg: error.message})
    }
    if(!user.verified) {
        const error = new Error('Tu cuenta no ha sido confirmado aún')
        return res.status(401).json({msg: error.message})
    }
    if(await user.checkPassword(password)) {
        const token =generateJWT(user._id)
        return res.json({
            token: token
        })
    } else {
        const error = new Error('El password es incorrecto')
        return res.status(401).json({msg: error.message})
    }
}

export {
    register,
    verify,
    logIn
}
