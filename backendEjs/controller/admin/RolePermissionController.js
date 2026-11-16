import RolePermission from "../../Models/RolePermissionModel.js"
import Role from "../../Models/RoleModel.js"
import Permission from "../../Models/PermissionModel.js"

export const getRolePermissionForm = (req, res) => {
    try {
        res.render("RolePermission/RolePermissionForm.ejs")
    } catch (error) {
        
    }
}

export const addRolePermission = async (req, res) => {
    try {
        let { roleFID, permissionFID} = req.body

        // const rolePermission = await RolePermission.create({
        //     rolePermissionName
        // })
        const newRolePermission = new RolePermission({
            roleFID, 
            permissionFID
        })
        await newRolePermission.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "RolePermission added Successfully..."
        // })
        res.redirect("/api/rolePermission")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allRolePermissions = async (req, res) => {
    try {
        const allRolePermissions = await RolePermission.find({
            isDeleted: false
        }).populate("roleFID")
          .populate("permissionFID")
        const Roles = await Role.find({isDeleted: false}) 
        const Permissions = await Permission.find({isDeleted: false}) 
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allRolePermissions
        // })
        res.render("RolePermission/RolePermissionIndex.ejs", {data : allRolePermissions, Roles, Permissions})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleRolePermission = async (req, res) => {
    try {
        const singleRolePermission = await RolePermission.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleRolePermission
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editRolePermission = async (req, res) => {
    try {
        const rolePermission = await RolePermission.findById(req.params.id)
        res.render("RolePermission/EditRolePermission.ejs", {rolePermission})
    } catch (error) {
        
    }
}

export const updateRolePermission = async (req, res) => {
    try {
        const updatedRolePermission = await RolePermission.findByIdAndUpdate(
            req.params.id,
            {
                roleFID: req.body.roleFID,
                permissionFID: req.body.permissionFID
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/rolePermission")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedRolePermission
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeRolePermission = async (req, res) => {
    try {
        await RolePermission.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/rolePermission")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "RolePermission Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteRolePermission = async (req, res) => {
    try {
        await RolePermission.findByIdAndDelete(req.params.id)

        res.redirect("/api/rolePermission")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}