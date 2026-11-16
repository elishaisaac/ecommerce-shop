import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String
    },
    brandCode: {
        type: String
    },
    brandDetail: {
        type: String
    },
    brandLogo: {
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

const Brand = mongoose.model("Brand", brandSchema)

export default Brand