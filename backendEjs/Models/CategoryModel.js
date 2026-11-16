import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String
    },
    categoryCode: {
        type: String
    },
    categoryDetail: {
        type: String
    },
    categoryImage: {
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

const Category = mongoose.model("Category", categorySchema)

export default Category