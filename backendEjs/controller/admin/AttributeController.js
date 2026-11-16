import Attribute from "../../Models/AttributeModel.js";

export const getAttributeForm = (req, res) => {
    try {
        res.render("Attribute/AttributeForm.ejs")
    } catch (error) {
        
    }
}


export const addAttribute = async (req, res) => {
    try {
        let { attributeName, attributeCode, attributeDetail } = req.body

        // const attribute = await Attribute.create({
        //     attributeName
        // })

        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Attribute added Successfully..."
        // })
        const newAttribute = new Attribute({
            attributeName, 
            attributeCode, 
            attributeDetail
        })
        await newAttribute.save()
        res.redirect("/api/attribute")
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allAttributes = async (req, res) => {
    try {
        const allAttributes = await Attribute.find({
            isDeleted: false
        })
        res.render("Attribute/AttributeIndex.ejs", {data : allAttributes})
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allAttributes
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleAttribute = async (req, res) => {
    try {
        const singleAttribute = await Attribute.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleAttribute
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.findById(req.params.id)
        res.render("Attribute/EditAttribute.ejs", {attribute})
    } catch (error) {
        
    }
}

export const updateAttribute = async (req, res) => {
    try {
        const updatedAttribute = await Attribute.findByIdAndUpdate(
            req.params.id,
            {
                attributeName: req.body.attributeName,
                attributeCode: req.body.attributeCode,
                attributeDetail: req.body.attributeDetail
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/attribute")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedAttribute
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeAttribute = async (req, res) => {
    try {
        await Attribute.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/attribute")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Attribute Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteAttribute = async (req, res) => {
    try {
        await Attribute.findByIdAndDelete(req.params.id)

        res.redirect("/api/attribute")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}