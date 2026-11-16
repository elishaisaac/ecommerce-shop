import express from "express"

import {
    addBrand,
    allBrands,
    singleBrand,
    removeBrand,
    deleteBrand,
    getBrandForm,
    updateBrand,
    editBrand
} from "../../controller/admin/BrandController.js"

const brandRouter = express.Router()

brandRouter.get("/getBrandForm", getBrandForm)

brandRouter.post("/", addBrand)
brandRouter.get("/", allBrands)
brandRouter.get("/:id/editBrand", editBrand)

brandRouter.get("/selectBrand/:id", singleBrand)
brandRouter.post("/updateBrand/:id", updateBrand)
brandRouter.post("/removeBrand/:id", removeBrand)
brandRouter.post("/deleteBrand/:id", deleteBrand)

export default brandRouter