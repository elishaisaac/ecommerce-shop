import express from "express"

import {
    addUserType,
    allUserTypes,
    singleUserType,
    removeUserType,
    deleteUserType,
    getUserTypeForm,
    updateUserType,
    editUserType
} from "../../controller/admin/UserTypeController.js"

const userTypeRouter = express.Router()

userTypeRouter.get("/getUserTypeForm", getUserTypeForm)

userTypeRouter.post("/", addUserType)
userTypeRouter.get("/", allUserTypes)
userTypeRouter.get("/:id/editUserType", editUserType)

userTypeRouter.get("/selectUserType/:id", singleUserType)
userTypeRouter.post("/updateUserType/:id", updateUserType)
userTypeRouter.post("/removeUserType/:id", removeUserType)
userTypeRouter.post("/deleteUserType/:id", deleteUserType)

export default userTypeRouter