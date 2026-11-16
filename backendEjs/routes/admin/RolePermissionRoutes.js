import express from "express"

import {
    addRolePermission,
    allRolePermissions,
    singleRolePermission,
    removeRolePermission,
    deleteRolePermission,
    getRolePermissionForm,
    updateRolePermission,
    editRolePermission
} from "../../controller/admin/RolePermissionController.js"

const rolePermissionRouter = express.Router()

rolePermissionRouter.get("/getRolePermissionForm", getRolePermissionForm)

rolePermissionRouter.post("/", addRolePermission)
rolePermissionRouter.get("/", allRolePermissions)
rolePermissionRouter.get("/:id/editRolePermission", editRolePermission)

rolePermissionRouter.get("/selectRolePermission/:id", singleRolePermission)
rolePermissionRouter.post("/updateRolePermission/:id", updateRolePermission)
rolePermissionRouter.post("/removeRolePermission/:id", removeRolePermission)
rolePermissionRouter.post("/deleteRolePermission/:id", deleteRolePermission)

export default rolePermissionRouter