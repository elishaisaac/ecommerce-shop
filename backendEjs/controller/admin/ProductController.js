import Product from "../../Models/ProductModel.js";
import Category from "../../Models/CategoryModel.js"
import Brand from "../../Models/BrandModel.js"

export const getProductForm = (req, res) => {
    try {
        res.render("Product/ProductForm.ejs")
    } catch (error) {

    }
}

export const addProduct = async (req, res) => {
    try {
        let { productName,
            productDesc,
            // productImage,
            categoryFID,
            brandFID } = req.body

        const productImage = req.file ? req.file.url : ""

        const newProduct = new Product({
            productName,
            productDesc,
            productImage,
            categoryFID,
            brandFID
        })
        await newProduct.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Product added Successfully..."
        // })
        res.redirect("/api/product")
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({ isDeleted: false })
            .populate("categoryFID")
            .populate("brandFID")
        const categories = await Category.find({ isDeleted: false })
        const brands = await Brand.find({ isDeleted: false })

        res.render("Product/ProductIndex.ejs", { data: allProducts, categories, brands })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleProduct = async (req, res) => {
    try {
        const singleProduct = await Product.findOne({
            _id: req.params.id,
            isDeleted: false
        })
        res.status(200).json({
            success: true,
            error: false,
            data: singleProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}


export const editProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render("Product/EditProduct.ejs", { product })
    } catch (error) {

    }
}

export const updateProduct = async (req, res) => {
    try {
        const updateData = {
            productName: req.body.productName,
            productDesc: req.body.productDesc,
            categoryFID: req.body.categoryFID,
            brandFID: req.body.brandFID,
            isDeleted: false
        }

        if (req.file) {
            updateData.productImage = req.file.url
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            // {
            //     productName: req.body.productName,
            //     productDesc: req.body.productDesc, 
            //     productImage: req.body.productImage, 
            //     categoryFID: req.body.categoryFID,
            //     brandFID: req.body.brandFID,
            //     isDeleted: false

            // },
            {
                returnDocument: true,
                runValidators: true
            }
        )
        res.redirect("/api/product")
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const removedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { returnDocument: true, runValidators: true }
        )
        res.redirect("/api/product")
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deledtedProduct = await Product.findByIdAndDelete(req.params.id)
        res.redirect("/api/product")
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}
