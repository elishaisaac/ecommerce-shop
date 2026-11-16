import ProductVariant from "../../Models/ProductVariantModel.js";
import Product from "../../Models/ProductModel.js";
export const getProductVariantForm = (req, res) => {
    try {
        res.render("ProductVariant/ProductVariantForm.ejs")
    } catch (error) {
        
    }
}

export const addProductVariant = async (req, res) => {
    try {

        let {
            productFID,
            productSKU,
            productActualPrice,
            productDiscountPercent,
            productSalePrice
        } = req.body

        const newProductVariant = new ProductVariant({
            productFID,
            productSKU,
            productActualPrice,
            productDiscountPercent,
            productSalePrice
        })
        await newProductVariant.save()
        res.redirect("/api/productVariant")
        // await ProductVariant.create({
        //     productFID,
        //     productSKU,
        //     productActualPrice,
        //     productDiscountPercent,
        //     productSalePrice
        // })


        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Product Variant added Successfully..."
        // })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const allProductVariants = async (req, res) => {
    try {

        const allProductVariants = await ProductVariant.find({
            isDeleted: false
        }).populate("productFID")
        const Products = await Product.find({isDeleted: false})
        res.render("ProductVariant/ProductVariantIndex.ejs", {data: allProductVariants, Products})
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allProductVariants
        // })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const singleProductVariant = async (req, res) => {
    try {

        const singleProductVariant =
            await ProductVariant.findOne({
                _id: req.params.id,
                isDeleted: false
            })


        res.status(200).json({
            success: true,
            error: false,
            data: singleProductVariant
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}

export const editProductVariant = async (req, res) => {
    try {
        const productVariant = await ProductVariant.findById(req.params.id)
        res.render("ProductVariant/EditProductVariant", {productVariant})
    } catch (error) {
        
    }
}

export const updateProductVariant = async (req, res) => {
    try {

        const updatedProductVariant =
            await ProductVariant.findByIdAndUpdate(
                req.params.id,
                {
                    productFID: req.body.productFID,
                    productSKU: req.body.productSKU,
                    productActualPrice: req.body.productActualPrice,
                    productDiscountPercent: req.body.productDiscountPercent,
                    productSalePrice: req.body.productSalePrice
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            )

        res.redirect("/api/productVariant")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedProductVariant
        // })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const removeProductVariant = async (req, res) => {
    try {

        await ProductVariant.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )

        res.redirect("/api/productVariant")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Product Variant Removed Successfully..."
        // })


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}


export const deleteProductVariant = async (req, res) => {
    try {

        await ProductVariant.findByIdAndDelete(
            req.params.id
        )


        res.redirect("/api/productVariant")


    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })

    }
}