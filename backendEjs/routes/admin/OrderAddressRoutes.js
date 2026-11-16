import express from "express"

import {
    addOrderAddress,
    allOrderAddresses,
    singleOrderAddress,
    removeOrderAddress,
    deleteOrderAddress,
    getOrderAddressForm,
    updateOrderAddress,
    editOrderAddress
} from "../../controller/admin/OrderAddressController.js"

const orderAddressRouter = express.Router()

orderAddressRouter.get("/getOrderAddressForm", getOrderAddressForm)

orderAddressRouter.post("/", addOrderAddress)
orderAddressRouter.get("/", allOrderAddresses)
orderAddressRouter.get("/:id/editOrderAddress", editOrderAddress)

orderAddressRouter.get("/selectOrderAddress/:id", singleOrderAddress)
orderAddressRouter.post("/updateOrderAddress/:id", updateOrderAddress)
orderAddressRouter.post("/removeOrderAddress/:id", removeOrderAddress)
orderAddressRouter.post("/deleteOrderAddress/:id", deleteOrderAddress)

export default orderAddressRouter
