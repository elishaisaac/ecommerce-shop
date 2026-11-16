import User from "../../Models/UserModel.js"
import UserType from "../../Models/UserTypeModel.js"

export const getUserForm = (req, res) => {
    try {
        res.render("User/UserForm.ejs")
    } catch (error) {
        
    }
}

export const addUser = async (req, res) => {
    try {
        let { userTypeFID, userEmail, userPassword} = req.body

        // const user = await User.create({
        //     userEmail
        // })
        const newUser = new User({
            userTypeFID,
            userEmail, 
            userPassword
        })
        await newUser.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "User added Successfully..."
        // })
        res.redirect("/api/user")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allUsers = async (req, res) => {
    try {
        const allUsers = await User.find({
            isDeleted: false
        }).populate("userTypeFID")
        const UserTypes = await UserType.find({isDeleted: false})
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allUsers
        // })
        res.render("User/UserIndex.ejs", {data : allUsers, UserTypes})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleUser = async (req, res) => {
    try {
        const singleUser = await User.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render("User/EditUser.ejs", {user})
    } catch (error) {
        
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                userTypeFID: req.body.userTypeFID,
                userEmail: req.body.userEmail,
                userPassword: req.body.userPassword
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/user")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedUser
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/user")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "User Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)

        res.redirect("/api/user")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}