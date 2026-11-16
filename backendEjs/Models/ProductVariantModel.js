import mongoose from "mongoose";


const productVariantSchema = new mongoose.Schema({

    productFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    productSKU: {
        type: String
    },

    productActualPrice: {
        type: Number
    },

    productDiscountPercent: {
        type: Number
    },

    productSalePrice: {
        type: Number
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const ProductVariant = mongoose.model(
    "ProductVariant",
    productVariantSchema
)


export default ProductVariant