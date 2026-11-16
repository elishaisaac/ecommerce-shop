import OrderAddress from "../../Models/OrderAddressModel.js"
import Order from "../../Models/OrderModel.js"

export const getOrderAddressForm = (req, res) => {
    try {
        res.render("OrderAddress/OrderAddressForm.ejs")
    } catch (error) {
        
    }
}

export const addOrderAddress = async (req, res) => {
    try {
        let { orderFID, addressLine1, addressLine2, addressCity, addressState, addressPostalCode, addressCountry, addressPhone } = req.body

        // const orderAddress = await OrderAddress.create({
        //     addressLine1
        // })
        const newOrderAddress = new OrderAddress({
            orderFID,
            addressLine1,
            addressLine2,
            addressCity,
            addressState,
            addressPostalCode,
            addressCountry,
            addressPhone
        })
        await newOrderAddress.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "OrderAddress added Successfully..."
        // })
        res.redirect("/api/orderAddress")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allOrderAddresses = async (req, res) => {
    try {
        const allOrderAddresses = await OrderAddress.find({
            isDeleted: false
        }).populate("orderFID")
        const Orders = await Order.find({isDeleted: false})
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allOrderAddresses
        // })
        res.render("OrderAddress/OrderAddressIndex.ejs", {data : allOrderAddresses, Orders})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleOrderAddress = async (req, res) => {
    try {
        const singleOrderAddress = await OrderAddress.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleOrderAddress
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editOrderAddress = async (req, res) => {
    try {
        const orderAddress = await OrderAddress.findById(req.params.id)
        res.render("OrderAddress/EditOrderAddress.ejs", {orderAddress})
    } catch (error) {
        
    }
}

export const updateOrderAddress = async (req, res) => {
    try {
        const updatedOrderAddress = await OrderAddress.findByIdAndUpdate(
            req.params.id,
            {
                orderFID: req.body.orderFID,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                addressCity: req.body.addressCity,
                addressState: req.body.addressState,
                addressPostalCode: req.body.addressPostalCode,
                addressCountry: req.body.addressCountry,
                addressPhone: req.body.addressPhone
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/orderAddress")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedOrderAddress
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeOrderAddress = async (req, res) => {
    try {
        await OrderAddress.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/orderAddress")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "OrderAddress Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteOrderAddress = async (req, res) => {
    try {
        await OrderAddress.findByIdAndDelete(req.params.id)

        res.redirect("/api/orderAddress")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}
