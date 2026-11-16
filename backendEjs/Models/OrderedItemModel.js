import mongoose from "mongoose";


const orderedItemSchema = new mongoose.Schema({

    orderFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },

    productVariantFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant"
    },

    itemQuantity: {
        type: Number
    },

    itemUnitPrice: {
        type: Number
    },

    itemTotalPrice: {
        type: Number
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const OrderedItem = mongoose.model(
    "OrderedItem",
    orderedItemSchema
)


export default OrderedItem
