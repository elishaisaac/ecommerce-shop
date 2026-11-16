import express from "express"
import { loginPage, login, logout } from "../../controller/admin/AuthController.js"

const authRouter = express.Router()

authRouter.get("/login", loginPage)
authRouter.post("/login", login)
authRouter.post("/logout", logout)

export default authRouter