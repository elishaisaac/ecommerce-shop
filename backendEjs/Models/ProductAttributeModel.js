import mongoose from "mongoose";


const productAttributeSchema = new mongoose.Schema({

    productFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    attributeFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute"
    },

    // productImage: {
    //     type: String
    // },

    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const ProductAttribute = mongoose.model(
    "ProductAttribute",
    productAttributeSchema
)


export default ProductAttribute