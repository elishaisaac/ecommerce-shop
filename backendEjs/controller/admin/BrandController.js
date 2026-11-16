import Brand from "../../Models/BrandModel.js";

export const getBrandForm = (req, res) => {
    try {
        res.render("Brand/BrandForm.ejs")
    } catch (error) {
        
    }
}

export const addBrand = async (req, res) => {
    try {
        let { brandName, brandCode, brandDetail, brandLogo } = req.body

        // const brand = await Brand.create({
        //     brandName
        // })
        const newBrand = new Brand({
            brandName, 
            brandCode, 
            brandDetail, 
            brandLogo
        })
        await newBrand.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Brand added Successfully..."
        // })
        res.redirect("/api/brand")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allBrands = async (req, res) => {
    try {
        const allBrands = await Brand.find({
            isDeleted: false
        })

        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allBrands
        // })
        res.render("Brand/BrandIndex.ejs", {data : allBrands})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleBrand = async (req, res) => {
    try {
        const singleBrand = await Brand.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleBrand
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id)
        res.render("Brand/EditBrand.ejs", {brand})
    } catch (error) {
        
    }
}

export const updateBrand = async (req, res) => {
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(
            req.params.id,
            {
                brandName: req.body.brandName,
                brandCode: req.body.brandCode,
                brandDetail: req.body.brandDetail,
                brandLogo: req.body.brandLogo
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/brand")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedBrand
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeBrand = async (req, res) => {
    try {
        await Brand.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/brand")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Brand Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteBrand = async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id)

        res.redirect("/api/brand")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}