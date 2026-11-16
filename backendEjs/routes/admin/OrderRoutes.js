import express from "express"

import {
    addOrder,
    allOrders,
    singleOrder,
    removeOrder,
    deleteOrder,
    getOrderForm,
    updateOrder,
    editOrder,
    orderDetails,
    updateOrderStatus
} from "../../controller/admin/OrderController.js"

const orderRouter = express.Router()

orderRouter.get("/getOrderForm", getOrderForm)

orderRouter.post("/", addOrder)
orderRouter.get("/", allOrders)
orderRouter.get("/:id/editOrder", editOrder)

orderRouter.get("/selectOrder/:id", singleOrder)
orderRouter.post("/updateOrder/:id", updateOrder)
orderRouter.post("/removeOrder/:id", removeOrder)
orderRouter.post("/deleteOrder/:id", deleteOrder)
orderRouter.get("/:id/details", orderDetails)
orderRouter.post("/:id/status", updateOrderStatus)

export default orderRouter
