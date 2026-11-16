import jwt from "jsonwebtoken"
import User from "../Models/UserModel.js"
import UserRole from "../Models/UserRoleModel.js"
import Role from "../Models/RoleModel.js"

export const COOKIE_NAME = "admin_token"

export const userIsAdmin = async (userId) => {
    const links = await UserRole.find({
        userFID: userId,
        isDeleted: false
    }).populate("roleFID")

    return links.some(
        l => l.roleFID && !l.roleFID.isDeleted && l.roleFID.roleName === "Admin"
    )
}

export const requireAdmin = async (req, res, next) => {
    const deny = () => {
        res.clearCookie(COOKIE_NAME)
        res.redirect("/login")
    }

    let user
    try {
        const token = req.cookies?.[COOKIE_NAME]
        if (!token) return deny()

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        user = await User.findOne({ _id: payload.id, isDeleted: false, isActive: true })
        if (!user || !(await userIsAdmin(user._id))) return deny()
    } catch (error) {
        return deny()
    }

    req.user = user
    res.locals.currentUser = user
    next()
}
export const adminUserIds = async () => {
    const adminRoles = await Role.find({ roleName: "Admin", isDeleted: false })

    const links = await UserRole.find({
        roleFID: { $in: adminRoles.map(r => r._id) },
        isDeleted: false
    })

    const users = await User.find({
        _id: { $in: links.map(l => l.userFID) },
        isDeleted: false,
        isActive: true
    })

    return users.map(u => String(u._id))
}

export const isLastAdmin = async (userId) => {
    const ids = await adminUserIds()
    return ids.length === 1 && ids[0] === String(userId)
}