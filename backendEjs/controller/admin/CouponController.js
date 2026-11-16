import Coupon from "../../Models/CouponModel.js"

export const getCouponForm = (req, res) => {
    try {
        res.render("Coupon/CouponForm.ejs")
    } catch (error) {
        
    }
}

export const addCoupon = async (req, res) => {
    try {
        let { couponCode, couponType, couponValue, couponExpiryDate } = req.body

        // const coupon = await Coupon.create({
        //     couponCode
        // })
        const newCoupon = new Coupon({
            couponCode,
            couponType,
            couponValue,
            couponExpiryDate
        })
        await newCoupon.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Coupon added Successfully..."
        // })
        res.redirect("/api/coupon")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allCoupons = async (req, res) => {
    try {
        const allCoupons = await Coupon.find({
            isDeleted: false
        })

        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allCoupons
        // })
        res.render("Coupon/CouponIndex.ejs", {data : allCoupons})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleCoupon = async (req, res) => {
    try {
        const singleCoupon = await Coupon.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleCoupon
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id)
        res.render("Coupon/EditCoupon.ejs", {coupon})
    } catch (error) {
        
    }
}

export const updateCoupon = async (req, res) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            {
                couponCode: req.body.couponCode,
                couponType: req.body.couponType,
                couponValue: req.body.couponValue,
                couponExpiryDate: req.body.couponExpiryDate
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/coupon")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedCoupon
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/coupon")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Coupon Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id)

        res.redirect("/api/coupon")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}
