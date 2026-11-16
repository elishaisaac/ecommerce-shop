import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "../Models/UserModel.js"
import UserType from "../Models/UserTypeModel.js"
import Role from "../Models/RoleModel.js"
import UserRole from "../Models/UserRoleModel.js"

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

if (!email || !password || password.length < 8) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (8+ characters) in .env first")
    process.exit(1)
}

await mongoose.connect(process.env.MONGO_URI)

let userType = await UserType.findOne({ userTypeName: "Admin", isDeleted: false })
if (!userType) {
    userType = await UserType.create({
        userTypeName: "Admin",
        userTypeDescription: "Administrator"
    })
}

let role = await Role.findOne({ roleName: "Admin", isDeleted: false })
if (!role) {
    role = await Role.create({
        roleName: "Admin",
        roleDescription: "Full access to the admin panel"
    })
}

const hashedPassword = await bcrypt.hash(password, 10)
let user = await User.findOne({ userEmail: email, isDeleted: false })

if (user) {
    user.userPassword = hashedPassword
    user.userTypeFID = userType._id
    await user.save()
    console.log("Existing user updated")
} else {
    user = await User.create({
        userEmail: email,
        userPassword: hashedPassword,
        userTypeFID: userType._id
    })
    console.log("User created")
}

const linked = await UserRole.findOne({
    userFID: user._id,
    roleFID: role._id,
    isDeleted: false
})
if (!linked) {
    await UserRole.create({ userFID: user._id, roleFID: role._id })
}

console.log(`Admin ready: ${email}`)
await mongoose.disconnect()