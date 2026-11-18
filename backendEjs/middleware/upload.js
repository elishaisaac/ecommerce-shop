import multer from "multer"
import cloudinary from "../config/cloudinary.js"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (ALLOWED_TYPES.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Only JPG, PNG, WebP or GIF images are allowed"))
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }
})

const sendToCloudinary = (buffer) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "ecommerce-shop/products",
                resource_type: "image",
                transformation: [{ width: 1200, height: 1200, crop: "limit" }]
            },
            (error, result) => (error ? reject(error) : resolve(result))
        )
        stream.end(buffer)
    })

export const uploadImage = (field) => (req, res, next) => {
    upload.single(field)(req, res, async (err) => {
        if (err) {
            const message =
                err.code === "LIMIT_FILE_SIZE" ? "Image must be 5 MB or smaller" : err.message
            return res.showError(400, message)
        }

        if (!req.file) return next()

        try {
            const result = await sendToCloudinary(req.file.buffer)
            req.file.url = result.secure_url
            req.file.publicId = result.public_id
            next()
        } catch (error) {
            res.showError(502, "The image could not be uploaded. Please try again.")
        }
    })
}