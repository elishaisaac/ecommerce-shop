import mongoose from "mongoose";

const variantAttributeValueSchema = new mongoose.Schema({

    productVariantFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant"
    },
    attributeFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute"
    },
    attributeValueFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AttributeValue"
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const VariantAttributeValue = mongoose.model(
    "VariantAttributeValue",
    variantAttributeValueSchema
)


export default VariantAttributeValue