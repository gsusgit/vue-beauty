import mongoose from 'mongoose'

export const db = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://root:WruLIJvmKUYgjzsT@cluster0.nhkrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Conectado a MongoDB')
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}
