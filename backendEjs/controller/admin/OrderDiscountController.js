import OrderDiscount from "../../Models/OrderDiscountModel.js"
import Order from "../../Models/OrderModel.js"
import Coupon from "../../Models/CouponModel.js"

export const getOrderDiscountForm = (req, res) => {
    try {
        res.render("OrderDiscount/OrderDiscountForm.ejs")
    } catch (error) {
        
    }
}

export const addOrderDiscount = async (req, res) => {
    try {
        let { orderFID, couponFID, discountAmount } = req.body

        // const orderDiscount = await OrderDiscount.create({
        //     discountAmount
        // })
        const newOrderDiscount = new OrderDiscount({
            orderFID,
            couponFID,
            discountAmount
        })
        await newOrderDiscount.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "OrderDiscount added Successfully..."
        // })
        res.redirect("/api/orderDiscount")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allOrderDiscounts = async (req, res) => {
    try {
        const allOrderDiscounts = await OrderDiscount.find({
            isDeleted: false
        }).populate("orderFID")
          .populate("couponFID")
        const Orders = await Order.find({isDeleted: false})
        const Coupons = await Coupon.find({isDeleted: false})
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allOrderDiscounts
        // })
        res.render("OrderDiscount/OrderDiscountIndex.ejs", {data : allOrderDiscounts, Orders, Coupons})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleOrderDiscount = async (req, res) => {
    try {
        const singleOrderDiscount = await OrderDiscount.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleOrderDiscount
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editOrderDiscount = async (req, res) => {
    try {
        const orderDiscount = await OrderDiscount.findById(req.params.id)
        res.render("OrderDiscount/EditOrderDiscount.ejs", {orderDiscount})
    } catch (error) {
        
    }
}

export const updateOrderDiscount = async (req, res) => {
    try {
        const updatedOrderDiscount = await OrderDiscount.findByIdAndUpdate(
            req.params.id,
            {
                orderFID: req.body.orderFID,
                couponFID: req.body.couponFID,
                discountAmount: req.body.discountAmount
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/orderDiscount")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedOrderDiscount
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeOrderDiscount = async (req, res) => {
    try {
        await OrderDiscount.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/orderDiscount")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "OrderDiscount Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteOrderDiscount = async (req, res) => {
    try {
        await OrderDiscount.findByIdAndDelete(req.params.id)

        res.redirect("/api/orderDiscount")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}
