import Product from "../../Models/ProductModel.js"
import ProductVariant from "../../Models/ProductVariantModel.js"
import VariantAttributeValue from "../../Models/VariantAttributeValueModel.js"

export const storeProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false })
            .populate("categoryFID")
            .populate("brandFID")

        const variants = await ProductVariant.find({ isDeleted: false })

        const data = products.map(product => {
            const productVariants = variants.filter(
                v => String(v.productFID) === String(product._id)
            )
            const prices = productVariants.map(v => v.productSalePrice)

            return {
                ...product.toObject(),
                variants: productVariants,
                startingPrice: prices.length ? Math.min(...prices) : null
            }
        })

        res.status(200).json({
            success: true,
            error: false,
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const storeProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, isDeleted: false })
            .populate("categoryFID")
            .populate("brandFID")

        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product not found"
            })
        }

        const variants = await ProductVariant.find({
            productFID: product._id,
            isDeleted: false
        })

        const links = await VariantAttributeValue.find({
            productVariantFID: { $in: variants.map(v => v._id) },
            isDeleted: false
        })
            .populate("attributeFID")
            .populate("attributeValueFID")

        const variantsWithAttributes = variants.map(variant => ({
            ...variant.toObject(),
            attributes: links
                .filter(l => String(l.productVariantFID) === String(variant._id))
                .map(l => ({
                    name: l.attributeFID?.attributeName,
                    value: l.attributeValueFID?.attributeValue
                }))
        }))

        res.status(200).json({
            success: true,
            error: false,
            data: { ...product.toObject(), variants: variantsWithAttributes }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}