import express from "express"

import {
    addVariantAttributeValue,
    allVariantAttributeValues,
    singleVariantAttributeValue,
    removeVariantAttributeValue,
    deleteVariantAttributeValue,
    getVariantAttributeValueForm,
    updateVariantAttributeValue,
    editVariantAttributeValue
} from "../../controller/admin/VariantAttributeValueController.js"


const variantAttributeValueRouter = express.Router()

variantAttributeValueRouter.get("/getVariantAttributeValueForm", getVariantAttributeValueForm)
variantAttributeValueRouter.post("/",addVariantAttributeValue)
variantAttributeValueRouter.get("/",allVariantAttributeValues)
variantAttributeValueRouter.get("/:id/editVariantAttributeValue", editVariantAttributeValue)

variantAttributeValueRouter.get( "/selectVariantAttributeValue/:id",singleVariantAttributeValue)
variantAttributeValueRouter.post("/updateVariantAttributeValue/:id",updateVariantAttributeValue)
variantAttributeValueRouter.post( "/removeVariantAttributeValue/:id", removeVariantAttributeValue)
variantAttributeValueRouter.post("/deleteVariantAttributeValue/:id",deleteVariantAttributeValue)

export default variantAttributeValueRouter