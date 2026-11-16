import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../../Models/UserModel.js"
import { COOKIE_NAME, userIsAdmin } from "../../middleware/auth.js"

const EIGHT_HOURS = 8 * 60 * 60 * 1000

export const loginPage = (req, res) => {
    res.render("Auth/Login.ejs", { error: null, email: "" })
}

export const login = async (req, res) => {
    const email = (req.body.email || "").trim()
    const password = req.body.password || ""

    const show = (status, error) =>
        res.status(status).render("Auth/Login.ejs", { error, email })

    try {
        if (!email || !password) {
            return show(400, "Please enter your email and password")
        }

        const user = await User.findOne({
            userEmail: email,
            isDeleted: false,
            isActive: true
        }).collation({ locale: "en", strength: 2 })

        const passwordOk = user
            ? await bcrypt.compare(password, user.userPassword || "")
            : false
        if (!passwordOk) return show(401, "Invalid email or password")

        if (!(await userIsAdmin(user._id))) {
            return show(403, "This account does not have access to the admin panel")
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "8h"
        })

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: EIGHT_HOURS
        })
        res.redirect("/api/dashboard")
    } catch (error) {
        show(500, "Something went wrong. Please try again.")
    }
}

export const logout = (req, res) => {
    res.clearCookie(COOKIE_NAME)
    res.redirect("/login")
}