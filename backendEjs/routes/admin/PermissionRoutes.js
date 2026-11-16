import express from "express"

import {
    addPermission,
    allPermissions,
    singlePermission,
    removePermission,
    deletePermission,
    getPermissionForm,
    updatePermission,
    editPermission
} from "../../controller/admin/PermissionController.js"

const permissionRouter = express.Router()

permissionRouter.get("/getPermissionForm", getPermissionForm)

permissionRouter.post("/", addPermission)
permissionRouter.get("/", allPermissions)
permissionRouter.get("/:id/editPermission", editPermission)

permissionRouter.get("/selectPermission/:id", singlePermission)
permissionRouter.post("/updatePermission/:id", updatePermission)
permissionRouter.post("/removePermission/:id", removePermission)
permissionRouter.post("/deletePermission/:id", deletePermission)

export default permissionRouter