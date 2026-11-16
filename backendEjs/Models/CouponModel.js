import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String
    },
    couponType: {
        type: String,
        enum: ["Percentage", "Fixed"],
        default: "Percentage"
    },
    couponValue: {
        type: Number
    },
    couponExpiryDate: {
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

const Coupon = mongoose.model("Coupon", couponSchema)

export default Coupon
