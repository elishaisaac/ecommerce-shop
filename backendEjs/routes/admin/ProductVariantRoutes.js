import express from "express"

import {
    addProductVariant,
    allProductVariants,
    singleProductVariant,
    removeProductVariant,
    deleteProductVariant,
    getProductVariantForm,
    updateProductVariant,
    editProductVariant
} from "../../controller/admin/ProductVariantController.js"


const productVariantRouter = express.Router()

productVariantRouter.get("/getProductVariantForm",getProductVariantForm)
productVariantRouter.post( "/", addProductVariant)
productVariantRouter.get("/", allProductVariants)
productVariantRouter.get("/:id/editProductVariant", editProductVariant)

productVariantRouter.get("/selectProductVariant/:id", singleProductVariant)
productVariantRouter.post("/updateProductVariant/:id",updateProductVariant)
productVariantRouter.post("/removeProductVariant/:id", removeProductVariant)
productVariantRouter.post("/deleteProductVariant/:id",deleteProductVariant)


export default productVariantRouter