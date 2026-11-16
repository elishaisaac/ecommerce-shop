import mongoose from "mongoose";

const orderDiscountSchema = new mongoose.Schema({
    orderFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    couponFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon"
    },
    discountAmount: {
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

const OrderDiscount = mongoose.model("OrderDiscount", orderDiscountSchema)

export default OrderDiscount
