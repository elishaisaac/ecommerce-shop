import Permission from "../../Models/PermissionModel.js"

export const getPermissionForm = (req, res) => {
    try {
        res.render("Permission/PermissionForm.ejs")
    } catch (error) {
        
    }
}

export const addPermission = async (req, res) => {
    try {
        let { permissionAction, permissionResourse, permissionDescription} = req.body

        // const permission = await Permission.create({
        //     permissionName
        // })
        const newPermission = new Permission({
            permissionAction,
            permissionResourse, 
            permissionDescription
        })
        await newPermission.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Permission added Successfully..."
        // })
        res.redirect("/api/permission")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allPermissions = async (req, res) => {
    try {
        const allPermissions = await Permission.find({
            isDeleted: false
        })

        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allPermissions
        // })
        res.render("Permission/PermissionIndex.ejs", {data : allPermissions})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singlePermission = async (req, res) => {
    try {
        const singlePermission = await Permission.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singlePermission
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editPermission = async (req, res) => {
    try {
        const permission = await Permission.findById(req.params.id)
        res.render("Permission/EditPermission.ejs", {permission})
    } catch (error) {
        
    }
}

export const updatePermission = async (req, res) => {
    try {
        const updatedPermission = await Permission.findByIdAndUpdate(
            req.params.id,
            {
                permissionAction: req.body.permissionAction,
                permissionResourse: req.body.permissionResourse,
                permissionDescription: req.body.permissionDescription
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/permission")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedPermission
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removePermission = async (req, res) => {
    try {
        await Permission.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/permission")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Permission Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deletePermission = async (req, res) => {
    try {
        await Permission.findByIdAndDelete(req.params.id)

        res.redirect("/api/permission")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}