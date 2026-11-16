import express from "express"
import { storeProductById, storeProducts } from "../../controller/store/StoreProductController.js"
import { checkoutOptions, placeOrder } from "../../controller/store/StoreOrderController.js"

const storeRouter = express.Router()

storeRouter.get("/products", storeProducts)
storeRouter.get("/products/:id", storeProductById)

storeRouter.get("/checkout-options", checkoutOptions)
storeRouter.post("/orders", placeOrder)

export default storeRouter