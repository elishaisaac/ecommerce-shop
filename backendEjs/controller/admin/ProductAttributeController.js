import ProductAttribute from "../../Models/ProductAttributeModel.js";
import Product from "../../Models/ProductModel.js"
import Attribute from "../../Models/AttributeModel.js"

export const getProductAttributeForm = (req, res) => {
    try {
        res.render("ProductAttribute/ProductAttributeForm.ejs")
    } catch (error) {
        
    }
}

export const addProductAttribute = async (req, res) => {
    try {

        let {
            productFID,
            attributeFID
        } = req.body

        const newProductAttribute = new ProductAttribute({
            productFID,
            attributeFID
        })
        await newProductAttribute.save()
        res.redirect("/api/ProductAttribute")
        // await ProductImage.create({
        //     productFID,
        //     productImage
        // })

        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Product Image added Successfully..."
        // })

    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const allProductAttributes = async (req, res) => {
    try {

        const allProductAttributes = await ProductAttribute.find({
            isDeleted: false
        }).populate("productFID")
          .populate("attributeFID")
        const Products = await Product.find({isDeleted: false})
        const Attributes = await Attribute.find({isDeleted: false})
        res.render("ProductAttribute/ProductAttributeIndex.ejs", {data: allProductAttributes, Products, Attributes})
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allProductImages
        // })

    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const singleProductAttribute = async (req, res) => {
    try {

        const singleProductAttribute = await ProductAttribute.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleProductAttribute
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}

export const editProductAttribute = async (req, res) => {
    try {
        const productAttribute = await ProductAttribute.findById(req.params.id)
        res.render("ProductAttribute/EditProductAttribute.ejs", {productAttribute})
    } catch (error) {
        
    }
}


export const updateProductAttribute = async (req, res) => {
    try {

        const updatedProductAttribute =
            await ProductAttribute.findByIdAndUpdate(
                req.params.id,
                {
                    productFID: req.body.productFID,
                    attributeFID: req.body.attributeFID
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            )
        res.redirect("/api/ProductAttribute")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedProductImage
        // })

    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const removeProductAttribute = async (req, res) => {
    try {

        await ProductAttribute.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/ProductAttribute")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Product Image Removed Successfully..."
        // })

    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const deleteProductAttribute = async (req, res) => {
    try {

        await ProductAttribute.findByIdAndDelete(
            req.params.id
        )

        res.redirect("/api/ProductAttribute")

    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}