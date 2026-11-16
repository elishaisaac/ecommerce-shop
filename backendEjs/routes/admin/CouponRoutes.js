import express from "express"

import {
    addCoupon,
    allCoupons,
    singleCoupon,
    removeCoupon,
    deleteCoupon,
    getCouponForm,
    updateCoupon,
    editCoupon
} from "../../controller/admin/CouponController.js"

const couponRouter = express.Router()

couponRouter.get("/getCouponForm", getCouponForm)

couponRouter.post("/", addCoupon)
couponRouter.get("/", allCoupons)
couponRouter.get("/:id/editCoupon", editCoupon)

couponRouter.get("/selectCoupon/:id", singleCoupon)
couponRouter.post("/updateCoupon/:id", updateCoupon)
couponRouter.post("/removeCoupon/:id", removeCoupon)
couponRouter.post("/deleteCoupon/:id", deleteCoupon)

export default couponRouter
