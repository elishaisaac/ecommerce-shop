import express from "express"

import {
    addOrderDiscount,
    allOrderDiscounts,
    singleOrderDiscount,
    removeOrderDiscount,
    deleteOrderDiscount,
    getOrderDiscountForm,
    updateOrderDiscount,
    editOrderDiscount
} from "../../controller/admin/OrderDiscountController.js"

const orderDiscountRouter = express.Router()

orderDiscountRouter.get("/getOrderDiscountForm", getOrderDiscountForm)

orderDiscountRouter.post("/", addOrderDiscount)
orderDiscountRouter.get("/", allOrderDiscounts)
orderDiscountRouter.get("/:id/editOrderDiscount", editOrderDiscount)

orderDiscountRouter.get("/selectOrderDiscount/:id", singleOrderDiscount)
orderDiscountRouter.post("/updateOrderDiscount/:id", updateOrderDiscount)
orderDiscountRouter.post("/removeOrderDiscount/:id", removeOrderDiscount)
orderDiscountRouter.post("/deleteOrderDiscount/:id", deleteOrderDiscount)

export default orderDiscountRouter
