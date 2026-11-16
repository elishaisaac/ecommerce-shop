import express from "express"

import {
    addCategory,
    allCategories,
    singleCategory,
    updateCategory,
    removeCategory,
    deleteCategory,
    getCategoryForm,
    editCategory
} from "../../controller/admin/CategoryController.js"

const categoryRouter = express.Router()

categoryRouter.get("/getCategoryForm", getCategoryForm)

categoryRouter.post("/", addCategory)
categoryRouter.get("/", allCategories)
categoryRouter.get("/:id/editCategory", editCategory)

categoryRouter.get("/selectCategory/:id", singleCategory)
categoryRouter.post("/updateCategory/:id", updateCategory)
categoryRouter.post("/removeCategory/:id", removeCategory)
categoryRouter.post("/deleteCategory/:id", deleteCategory)

export default categoryRouter