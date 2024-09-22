import mongoose from 'mongoose'

function validateObjectId(id, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('ID no válido')
        return res.status(400).json({
            msg: error.message
        })
    }
}

async function handleNotFoundError(res, message) {
    const error = new Error(message)
    return res.status(404).json({
        msg: error.message
    })
}

async function handleError(res, code, message) {
    const error = new Error(message)
    return res.status(code).json({
        msg: error.message
    })
}

const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)

export {
    validateObjectId,
    handleNotFoundError,
    uniqueId,
    handleError
}
