import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName : {
        type : String
    },
    productDesc : {
        type : String
    },
    productImage : {
        type : String
    },
    categoryFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    brandFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
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
    isDeleted : {
        type : Boolean,
        default : false
    }
},{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

export default Product