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

export {
    validateObjectId,
    handleNotFoundError
}
