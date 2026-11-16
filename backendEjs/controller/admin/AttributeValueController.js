import AttributeValue from "../../Models/AttributeValueModel.js";
import Attribute from "../../Models/AttributeModel.js";

export const getAttributeValueForm = (req, res) => {
    try {
        res.render("AttributeValue/AttributeValueForm.ejs")
    } catch (error) {
        
    }
}

export const addAttributeValue = async (req, res) => {
    try {
        let {
            attributeFID,
            attributeValue,
            attributeValueCode
        } = req.body

        const newAttributeValue = new AttributeValue({
            attributeFID,
            attributeValue,
            attributeValueCode
        })
        await newAttributeValue.save()
        res.redirect("/api/attributeValue")
        // await AttributeValue.create({
        //     attributeFID,
        //     attributeValue
        // })

        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Attribute Value added Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}


export const allAttributeValues = async (req, res) => {
    try {
        const allAttributeValues = await AttributeValue.find({
            isDeleted: false
        }).populate("attributeFID")
        const Attributes = await Attribute.find({isDeleted: false})
        res.render("AttributeValue/AttributeValueIndex.ejs", {data : allAttributeValues, Attributes})
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allAttributeValues
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}


export const singleAttributeValue = async (req, res) => {
    try {
        const singleAttributeValue = await AttributeValue.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleAttributeValue
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editAttributeValue = async (req, res) => {
    try {
        const attributeValue = await AttributeValue.findById(req.params.id)
        res.render("AttributeValue/EditAttributeValue.ejs", {attributeValue})
    } catch (error) {
        
    }
}

export const updateAttributeValue = async (req, res) => {
    try {
        const updatedAttributeValue =
            await AttributeValue.findByIdAndUpdate(
                req.params.id,
                {
                    attributeFID: req.body.attributeFID,
                    attributeValue: req.body.attributeValue,
                    attributeValueCode: req.body.attributeValueCode
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            )
        res.redirect("/api/attributeValue")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedAttributeValue
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}


export const removeAttributeValue = async (req, res) => {
    try {
        await AttributeValue.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/attributeValue")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Attribute Value Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}


export const deleteAttributeValue = async (req, res) => {
    try {
        await AttributeValue.findByIdAndDelete(req.params.id)

        res.redirect("/api/attributeValue")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}