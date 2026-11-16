import express from "express"

import {
    addUser,
    allUsers,
    singleUser,
    removeUser,
    deleteUser,
    getUserForm,
    updateUser,
    editUser
} from "../../controller/admin/UserController.js"

const userRouter = express.Router()

userRouter.get("/getUserForm", getUserForm)

userRouter.post("/", addUser)
userRouter.get("/", allUsers)
userRouter.get("/:id/editUser", editUser)

userRouter.get("/selectUser/:id", singleUser)
userRouter.post("/updateUser/:id", updateUser)
userRouter.post("/removeUser/:id", removeUser)
userRouter.post("/deleteUser/:id", deleteUser)

export default userRouter