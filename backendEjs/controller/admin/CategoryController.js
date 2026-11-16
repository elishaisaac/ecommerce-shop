import Category from "../../Models/CategoryModel.js";

export const getCategoryForm = (req, res) => {
    try {
        res.render("Category/CategoryForm.ejs")
    } catch (error) {
        
    }
}

export const addCategory = async (req, res) => {
    try {
        let { categoryName, categoryCode, categoryDetail, categoryImage } = req.body
        const newCategory = new Category({
            categoryName,
            categoryCode, 
            categoryDetail, 
            categoryImage
        })
        // const category = await Category.create({
        //     categoryName
        // })
        await newCategory.save()
        res.redirect("/api/category")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Category added Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({
            isDeleted: false
        })
         res.render("Category/CategoryIndex.ejs", { data: allCategories })
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allCategories
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleCategory = async (req, res) => {
    try {
        const singleCategory = await Category.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleCategory
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.render("Category/EditCategory.ejs", {category})
    } catch (error) {
        
    }
}

export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                categoryName: req.body.categoryName,
                categoryCode: req.body.categoryCode,
                categoryDetail: req.body.categoryDetail,
                categoryImage: req.body.categoryImage,
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/category")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedCategory
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/category")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Category Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)

        res.redirect("/api/category")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Category Deleted Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}