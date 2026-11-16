import Role from "../../Models/RoleModel.js"

const PROTECTED_ROLE = "Admin"

export const getRoleForm = (req, res) => {
    try {
        res.render("Role/RoleForm.ejs")
    } catch (error) {

    }
}

export const addRole = async (req, res) => {
    try {
        let { roleName, roleDescription } = req.body

        // const role = await Role.create({
        //     roleName
        // })
        const newRole = new Role({
            roleName,
            roleDescription
        })
        await newRole.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Role added Successfully..."
        // })
        res.redirect("/api/role")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allRoles = async (req, res) => {
    try {
        const allRoles = await Role.find({
            isDeleted: false
        })

        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allRoles
        // })
        res.render("Role/RoleIndex.ejs", { data: allRoles })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleRole = async (req, res) => {
    try {
        const singleRole = await Role.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleRole
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id)
        res.render("Role/EditRole.ejs", { role })
    } catch (error) {

    }
}

export const updateRole = async (req, res) => {
    try {
        const existing = await Role.findById(req.params.id)
        if (existing?.roleName === PROTECTED_ROLE && req.body.roleName !== PROTECTED_ROLE) {
            return res.showError(400, 
                'The "Admin" role cannot be renamed, because the admin login depends on it.'
            )
        }
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            {
                roleName: req.body.roleName,
                roleDescription: req.body.roleDescription
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/role")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedRole
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeRole = async (req, res) => {
    try {
        const existing = await Role.findById(req.params.id)
        if (existing?.roleName === PROTECTED_ROLE) {
            return res.showError(400, 'The "Admin" role cannot be deleted.')
        }
        await Role.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/role")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Role Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteRole = async (req, res) => {
    try {
        const existing = await Role.findById(req.params.id)
        if (existing?.roleName === PROTECTED_ROLE) {
            return res.showError(400, 'The "Admin" role cannot be deleted.')
        }
        await Role.findByIdAndDelete(req.params.id)

        res.redirect("/api/role")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}