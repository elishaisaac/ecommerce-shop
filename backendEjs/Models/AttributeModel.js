import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
    attributeName: {
        type: String
    },
    attributeCode: {
        type: String
    },
    attributeDetail: {
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

const Attribute = mongoose.model("Attribute", attributeSchema)

export default Attribute