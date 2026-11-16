import express from "express"

import {
    addAttributeValue,
    allAttributeValues,
    singleAttributeValue,
    removeAttributeValue,
    deleteAttributeValue,
    getAttributeValueForm,
    updateAttributeValue,
    editAttributeValue
} from "../../controller/admin/AttributeValueController.js"


const attributeValueRouter = express.Router()

attributeValueRouter.get("/getAttributeValueForm",getAttributeValueForm)
attributeValueRouter.post("/",addAttributeValue)
attributeValueRouter.get( "/",allAttributeValues)
attributeValueRouter.get("/:id/editAttributeValue", editAttributeValue)


attributeValueRouter.get("/selectAttributeValue/:id",singleAttributeValue)
attributeValueRouter.post("/updateAttributeValue/:id",updateAttributeValue)
attributeValueRouter.post("/removeAttributeValue/:id",removeAttributeValue)
attributeValueRouter.post("/deleteAttributeValue/:id",deleteAttributeValue)


export default attributeValueRouter