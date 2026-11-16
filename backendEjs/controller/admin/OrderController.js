import Order from "../../Models/OrderModel.js"
import User from "../../Models/UserModel.js"
import OrderedItem from "../../Models/OrderedItemModel.js"
import OrderAddress from "../../Models/OrderAddressModel.js"

export const getOrderForm = (req, res) => {
    try {
        res.render("Order/OrderForm.ejs")
    } catch (error) {

    }
}

export const addOrder = async (req, res) => {
    try {
        let { userFID, orderNumber, orderStatus, orderTotal } = req.body

        // const order = await Order.create({
        //     orderNumber
        // })
        const newOrder = new Order({
            userFID,
            orderNumber,
            orderStatus,
            orderTotal
        })
        await newOrder.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Order added Successfully..."
        // })
        res.redirect("/api/order")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({
            isDeleted: false
        }).populate("userFID")
        const Users = await User.find({ isDeleted: false })
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allOrders
        // })
        res.render("Order/OrderIndex.ejs", { data: allOrders, Users })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleOrder = async (req, res) => {
    try {
        const singleOrder = await Order.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleOrder
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        res.render("Order/EditOrder.ejs", { order })
    } catch (error) {

    }
}

export const updateOrder = async (req, res) => {
    try {
        const statuses = Order.schema.path("orderStatus").enumValues
        if (!statuses.includes(req.body.orderStatus)) {
            return res.showError(400, "Invalid order status")
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus: req.body.orderStatus },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/order")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeOrder = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/order")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "Order Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)

        res.redirect("/api/order")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const orderDetails = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            isDeleted: false
        }).populate("userFID")

        if (!order) return res.showError(404, "Order not found")

        const items = await OrderedItem.find({
            orderFID: order._id,
            isDeleted: false
        }).populate({ path: "productVariantFID", populate: { path: "productFID" } })

        const address = await OrderAddress.findOne({ orderFID: order._id })
        const statuses = Order.schema.path("orderStatus").enumValues

        res.render("Order/OrderDetails.ejs", { order, items, address, statuses })
    } catch (error) {
        if (error.name === "CastError") return res.showError(404, "Order not found")
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const statuses = Order.schema.path("orderStatus").enumValues
        const { orderStatus } = req.body

        if (!statuses.includes(orderStatus)) {
            return res.showError(400, "Invalid status")
        }

        await Order.findByIdAndUpdate(req.params.id, { orderStatus })
        res.redirect(`/api/order/${req.params.id}/details`)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}