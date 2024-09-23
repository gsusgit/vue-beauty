import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password -token -verified -__v')
            next()
        } catch {
            const error = new Error('Token no válido')
            return res.status(403).json({msg: error.message})
        }
    } else {
        const error = new Error('Token no válido o inexsistente')
        return res.status(403).json({msg: error.message})
    }
}

export {
    authMiddleware
}
