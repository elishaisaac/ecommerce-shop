import ProductVariant from "../../Models/ProductVariantModel.js";
import Product from "../../Models/ProductModel.js";

const readPrices = (body) => {
    const actual = Number(body.productActualPrice)
    const discount = Number(body.productDiscountPercent || 0)

    if (!Number.isFinite(actual) || actual <= 0) {
        return { error: "Actual price must be a number greater than 0" }
    }
    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
        return { error: "Discount must be between 0 and 100" }
    }

    return {
        actual,
        discount,
        sale: Math.round((actual * (100 - discount)) / 100)
    }
}

export const addProductVariant = async (req, res) => {
    try {
        const { productFID, productSKU } = req.body

        const prices = readPrices(req.body)
        if (prices.error) return res.status(400).send(prices.error)

        const newProductVariant = new ProductVariant({
            productFID,
            productSKU,
            productActualPrice: prices.actual,
            productDiscountPercent: prices.discount,
            productSalePrice: prices.sale
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
        const Products = await Product.find({ isDeleted: false })
        res.render("ProductVariant/ProductVariantIndex.ejs", { data: allProductVariants, Products })
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
        res.render("ProductVariant/EditProductVariant", { productVariant })
    } catch (error) {

    }
}

export const updateProductVariant = async (req, res) => {
    try {
        const prices = readPrices(req.body)
        if (prices.error) return res.status(400).send(prices.error)
        const updatedProductVariant =
            await ProductVariant.findByIdAndUpdate(
                req.params.id,
                                {
                    productFID: req.body.productFID,
                    productSKU: req.body.productSKU,
                    productActualPrice: prices.actual,
                    productDiscountPercent: prices.discount,
                    productSalePrice: prices.sale
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