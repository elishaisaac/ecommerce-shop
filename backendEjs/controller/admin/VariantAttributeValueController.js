import VariantAttributeValue from "../../Models/VariantAttributeValueModel.js";
import ProductVariant from "../../Models/ProductVariantModel.js"
import Attribute from "../../Models/AttributeModel.js"
import AttributeValue from "../../Models/AttributeValueModel.js";

export const getVariantAttributeValueForm = (req, res) => {
    try {
        res.render("VariantAttributeValue/VariantAttributeValueForm.ejs")
    } catch (error) {

    }
}

export const addVariantAttributeValue = async (req, res) => {
    try {

        let {
            productVariantFID,
            attributeFID,
            attributeValueFID
        } = req.body

        const exists = await VariantAttributeValue.findOne({
            productVariantFID,
            attributeFID,
            isDeleted: false
        })

        if (exists) {
            return res.status(400).send(
                "This variant already has a value for that attribute. Edit the existing row instead."
            )
        }

        const newVariantAttributeValue = new VariantAttributeValue({
            productVariantFID,
            attributeFID,
            attributeValueFID
        })
        await newVariantAttributeValue.save()
        res.redirect("/api/variantAttributeValue")
        // await VariantAttributeValue.create({
        //     productVariantFID,
        //     attributeValueFID
        // })


        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Variant Attribute Value added Successfully..."
        // })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const allVariantAttributeValues = async (req, res) => {
    try {

        const allVariantAttributeValues =
            await VariantAttributeValue.find({
                isDeleted: false
            }).populate({
                path: "productVariantFID",
                populate: { path: "productFID" }
            })
                .populate("attributeFID")
                .populate("attributeValueFID")
        const ProductVariants = await ProductVariant.find({ isDeleted: false }).populate("productFID")
        const Attributes = await Attribute.find({ isDeleted: false })
        const AttributeValues = await AttributeValue.find({ isDeleted: false })
        res.render("VariantAttributeValue/VariantAttributeValueIndex.ejs", { data: allVariantAttributeValues, ProductVariants, Attributes, AttributeValues })
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allVariantAttributeValues
        // })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const singleVariantAttributeValue = async (req, res) => {
    try {

        const singleVariantAttributeValue =
            await VariantAttributeValue.findOne({
                _id: req.params.id,
                isDeleted: false
            })


        res.status(200).json({
            success: true,
            error: false,
            data: singleVariantAttributeValue
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}

export const editVariantAttributeValue = async (req, res) => {
    try {
        const variantAttributeValue = await VariantAttributeValue.findById(req.params.id)
        res.render("variantAttributeValue/EditVariantAttributeValue.ejs", { variantAttributeValue })
    } catch (error) {

    }
}

export const updateVariantAttributeValue = async (req, res) => {
    try {

        const editedVariantAttributeValue =
            await VariantAttributeValue.findByIdAndUpdate(
                req.params.id,
                {
                    productVariantFID:
                        req.body.productVariantFID,

                    attributeFID:
                        req.body.attributeFID,

                    attributeValueFID:
                        req.body.attributeValueFID
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            )

        res.redirect("/api/variantAttributeValue")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: editedVariantAttributeValue
        // })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const removeVariantAttributeValue = async (req, res) => {
    try {

        await VariantAttributeValue.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )

        res.redirect("/api/variantAttributeValue")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Variant Attribute Value Removed Successfully..."
        // })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const deleteVariantAttributeValue = async (req, res) => {
    try {

        await VariantAttributeValue.findByIdAndDelete(
            req.params.id
        )

        res.redirect("/api/variantAttributeValue")

    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}