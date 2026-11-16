import express from "express"

import {
    addAttribute,
    allAttributes,
    singleAttribute,
    updateAttribute,
    removeAttribute,
    deleteAttribute,
    getAttributeForm,
    editAttribute
} from "../../controller/admin/AttributeController.js"

const attributeRouter = express.Router()

attributeRouter.get("/getAttributeForm", getAttributeForm)

attributeRouter.post("/", addAttribute)
attributeRouter.get("/", allAttributes)
attributeRouter.get("/:id/editAttribute", editAttribute)

attributeRouter.get("/selectAttribute/:id", singleAttribute)
attributeRouter.post("/updateAttribute/:id", updateAttribute)
attributeRouter.post("/removeAttribute/:id", removeAttribute)
attributeRouter.post("/deleteAttribute/:id", deleteAttribute)

export default attributeRouter