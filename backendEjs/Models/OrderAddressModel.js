import mongoose from "mongoose";


const orderAddressSchema = new mongoose.Schema({

    orderFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },

    addressLine1: {
        type: String
    },

    addressLine2: {
        type: String
    },

    addressCity: {
        type: String
    },

    addressState: {
        type: String
    },

    addressPostalCode: {
        type: String
    },

    addressCountry: {
        type: String
    },

    addressPhone: {
        type: String
    },
        addressType: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const OrderAddress = mongoose.model(
    "OrderAddress",
    orderAddressSchema
)


export default OrderAddress
