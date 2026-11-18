import express from "express"
import { uploadImage } from "../../middleware/upload.js"
import { addProduct, allProducts, singleProduct, removeProduct, deleteProduct, getProductForm, updateProduct, editProduct} from "../../controller/admin/ProductController.js"

const productRouter = express.Router()

productRouter.get("/getProductForm", getProductForm)

// productRouter.post("/", addProduct)
productRouter.post("/", uploadImage("productImage"), addProduct)
productRouter.get("/", allProducts)
productRouter.get("/:id/editProduct", editProduct)

productRouter.get("/selectProduct/:id", singleProduct) 
// productRouter.post("/updateProduct/:id", updateProduct) 
productRouter.post("/updateProduct/:id", uploadImage("productImage"), updateProduct)
productRouter.post("/removeProduct/:id", removeProduct) 
productRouter.post("/deleteProduct/:id", deleteProduct) 

export default productRouter