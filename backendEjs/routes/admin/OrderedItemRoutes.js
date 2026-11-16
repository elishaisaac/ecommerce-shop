import express from "express"

import {
    addOrderedItem,
    allOrderedItems,
    singleOrderedItem,
    removeOrderedItem,
    deleteOrderedItem,
    getOrderedItemForm,
    updateOrderedItem,
    editOrderedItem
} from "../../controller/admin/OrderedItemController.js"

const orderedItemRouter = express.Router()

orderedItemRouter.get("/getOrderedItemForm", getOrderedItemForm)

orderedItemRouter.post("/", addOrderedItem)
orderedItemRouter.get("/", allOrderedItems)
orderedItemRouter.get("/:id/editOrderedItem", editOrderedItem)

orderedItemRouter.get("/selectOrderedItem/:id", singleOrderedItem)
orderedItemRouter.post("/updateOrderedItem/:id", updateOrderedItem)
orderedItemRouter.post("/removeOrderedItem/:id", removeOrderedItem)
orderedItemRouter.post("/deleteOrderedItem/:id", deleteOrderedItem)

export default orderedItemRouter
