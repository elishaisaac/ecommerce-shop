import mongoose from "mongoose";


const attributeValueSchema = new mongoose.Schema({
    attributeFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute"
    },
    attributeValue: {
        type: String
    },
    attributeValueCode: {
        type: String
    },
    branchID: {
        type: Number
    },
    createdBy : {
        type: String
    },
    updatedBy : {
        type : String
    },
    deletedBy: {
        type: String
    },
    deletedAt: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const AttributeValue = mongoose.model(
    "AttributeValue",
    attributeValueSchema
)

export default AttributeValue