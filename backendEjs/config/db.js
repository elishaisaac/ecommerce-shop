import mongoose from "mongoose"

let connecting = null

const connectDB = () => {
    if (mongoose.connection.readyState === 1) return Promise.resolve()

    if (!connecting) {
        connecting = mongoose
            .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 })
            .then(() => console.log("Database Connected..."))
            .catch((error) => {
                connecting = null
                console.error("Database connection failed:", error.message)
            })
    }

    return connecting
}

export default connectDB