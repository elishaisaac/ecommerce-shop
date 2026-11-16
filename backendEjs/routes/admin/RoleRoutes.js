import express from "express"

import {
    addRole,
    allRoles,
    singleRole,
    removeRole,
    deleteRole,
    getRoleForm,
    updateRole,
    editRole
} from "../../controller/admin/RoleController.js"

const roleRouter = express.Router()

roleRouter.get("/getRoleForm", getRoleForm)

roleRouter.post("/", addRole)
roleRouter.get("/", allRoles)
roleRouter.get("/:id/editRole", editRole)

roleRouter.get("/selectRole/:id", singleRole)
roleRouter.post("/updateRole/:id", updateRole)
roleRouter.post("/removeRole/:id", removeRole)
roleRouter.post("/deleteRole/:id", deleteRole)

export default roleRouter