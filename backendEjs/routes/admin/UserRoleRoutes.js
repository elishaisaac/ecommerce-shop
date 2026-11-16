import express from "express"

import {
    addUserRole,
    allUserRoles,
    singleUserRole,
    removeUserRole,
    deleteUserRole,
    getUserRoleForm,
    updateUserRole,
    editUserRole
} from "../../controller/admin/UserRoleController.js"

const userRoleRouter = express.Router()

userRoleRouter.get("/getUserRoleForm", getUserRoleForm)

userRoleRouter.post("/", addUserRole)
userRoleRouter.get("/", allUserRoles)
userRoleRouter.get("/:id/editUserRole", editUserRole)

userRoleRouter.get("/selectUserRole/:id", singleUserRole)
userRoleRouter.post("/updateUserRole/:id", updateUserRole)
userRoleRouter.post("/removeUserRole/:id", removeUserRole)
userRoleRouter.post("/deleteUserRole/:id", deleteUserRole)

export default userRoleRouter