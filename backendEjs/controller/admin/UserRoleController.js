import UserRole from "../../Models/UserRoleModel.js"
import User from "../../Models/UserModel.js"
import Role from "../../Models/RoleModel.js"

export const getUserRoleForm = (req, res) => {
    try {
        res.render("UserRole/UserRoleForm.ejs")
    } catch (error) {

    }
}

export const addUserRole = async (req, res) => {
    try {
        let { userFID, roleFID } = req.body

        // const userRole = await UserRole.create({
        //     roleFID
        // })
        const newUserRole = new UserRole({
            userFID,
            roleFID
        })
        await newUserRole.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "UserRole added Successfully..."
        // })
        res.redirect("/api/userRole")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allUserRoles = async (req, res) => {
    try {
        const allUserRoles = await UserRole.find({
            isDeleted: false
        }).populate({ path: "userFID", populate: { path: "userTypeFID" } })
            .populate("roleFID")
        const Users = await User.find({ isDeleted: false }).populate("userTypeFID")
        const Roles = await Role.find({ isDeleted: false })
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allUserRoles
        // })
        res.render("UserRole/UserRoleIndex.ejs", { data: allUserRoles, Users, Roles })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleUserRole = async (req, res) => {
    try {
        const singleUserRole = await UserRole.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleUserRole
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editUserRole = async (req, res) => {
    try {
        const userRole = await UserRole.findById(req.params.id)
        res.render("UserRole/EditUserRole.ejs", { userRole })
    } catch (error) {

    }
}

export const updateUserRole = async (req, res) => {
    try {
        const updatedUserRole = await UserRole.findByIdAndUpdate(
            req.params.id,
            {
                userFID: req.body.userFID,
                roleFID: req.body.roleFID
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/userRole")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedUserRole
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeUserRole = async (req, res) => {
    try {
        await UserRole.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/userRole")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "UserRole Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteUserRole = async (req, res) => {
    try {
        await UserRole.findByIdAndDelete(req.params.id)

        res.redirect("/api/userRole")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}