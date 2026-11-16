import express from "express"

import {
    addOrder,
    allOrders,
    singleOrder,
    removeOrder,
    deleteOrder,
    getOrderForm,
    updateOrder,
    editOrder
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

export default orderRouter
