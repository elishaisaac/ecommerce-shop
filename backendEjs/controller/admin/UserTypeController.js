import UserType from "../../Models/UserTypeModel.js"

export const getUserTypeForm = (req, res) => {
    try {
        res.render("UserType/UserTypeForm.ejs")
    } catch (error) {
        
    }
}

export const addUserType = async (req, res) => {
    try {
        let { userTypeName, userTypeDescription} = req.body

        // const userType = await UserType.create({
        //     userTypeName
        // })
        const newUserType = new UserType({
            userTypeName, 
            userTypeDescription
        })
        await newUserType.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "UserType added Successfully..."
        // })
        res.redirect("/api/userType")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allUserTypes = async (req, res) => {
    try {
        const allUserTypes = await UserType.find({
            isDeleted: false
        })

        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allUserTypes
        // })
        res.render("UserType/UserTypeIndex.ejs", {data : allUserTypes})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleUserType = async (req, res) => {
    try {
        const singleUserType = await UserType.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleUserType
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editUserType = async (req, res) => {
    try {
        const userType = await UserType.findById(req.params.id)
        res.render("UserType/EditUserType.ejs", {userType})
    } catch (error) {
        
    }
}

export const updateUserType = async (req, res) => {
    try {
        const updatedUserType = await UserType.findByIdAndUpdate(
            req.params.id,
            {
                userTypeName: req.body.userTypeName,
                userTypeDescription: req.body.userTypeDescription
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/userType")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedUserType
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeUserType = async (req, res) => {
    try {
        await UserType.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/userType")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "UserType Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteUserType = async (req, res) => {
    try {
        await UserType.findByIdAndDelete(req.params.id)

        res.redirect("/api/userType")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}