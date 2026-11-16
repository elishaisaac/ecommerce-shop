import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    customerName: {
        type: String
    },
    customerEmail: {
        type: String
    },
        deliveryType: {
        type: String
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String
    },
    orderNumber: {
        type: String
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
        default: "Pending"
    },
    orderTotal: {
        type: Number
    },
        customerName: {
        type: String
    },
    customerEmail: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    deliveryType: {
        type: String
    },
    deliveryCharge: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number
    },
    branchID: {
        type: Number
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
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
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)

export default Order
