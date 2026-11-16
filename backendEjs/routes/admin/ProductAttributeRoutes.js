import express from "express"

import {
    addProductAttribute,
    allProductAttributes,
    singleProductAttribute,
    removeProductAttribute,
    deleteProductAttribute,
    getProductAttributeForm,
    updateProductAttribute,
    editProductAttribute
} from "../../controller/admin/ProductAttributeController.js"


const productAttributeRouter = express.Router()

productAttributeRouter.get("/getProductAttributeForm", getProductAttributeForm)
productAttributeRouter.post("/", addProductAttribute)
productAttributeRouter.get("/",allProductAttributes)
productAttributeRouter.get("/:id/editProductAttribute", editProductAttribute)

productAttributeRouter.get("/singleProductAttribute/:id",singleProductAttribute)
productAttributeRouter.post("/updateProductAttribute/:id",updateProductAttribute)
productAttributeRouter.post("/removeProductAttribute/:id",removeProductAttribute)
productAttributeRouter.post("/deleteProductAttribute/:id", deleteProductAttribute)


export default productAttributeRouter