import express from "express"
import { loginPage, login, logout } from "../../controller/admin/AuthController.js"

const authRouter = express.Router()

authRouter.get("/login", loginPage)
authRouter.post("/login", login)
authRouter.post("/logout", logout)

import rateLimit from "express-rate-limit"

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many login attempts. Please try again in 15 minutes."
})

authRouter.post("/login", loginLimiter, login)
export default authRouter