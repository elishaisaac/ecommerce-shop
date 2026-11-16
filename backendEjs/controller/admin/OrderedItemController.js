import OrderedItem from "../../Models/OrderedItemModel.js"
import Order from "../../Models/OrderModel.js"
import ProductVariant from "../../Models/ProductVariantModel.js"

export const getOrderedItemForm = (req, res) => {
    try {
        res.render("OrderedItem/OrderedItemForm.ejs")
    } catch (error) {
        
    }
}

export const addOrderedItem = async (req, res) => {
    try {
        let { orderFID, productVariantFID, itemQuantity, itemUnitPrice, itemTotalPrice } = req.body

        // const orderedItem = await OrderedItem.create({
        //     orderFID
        // })
        const newOrderedItem = new OrderedItem({
            orderFID,
            productVariantFID,
            itemQuantity,
            itemUnitPrice,
            itemTotalPrice
        })
        await newOrderedItem.save()
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "OrderedItem added Successfully..."
        // })
        res.redirect("/api/orderedItem")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const allOrderedItems = async (req, res) => {
    try {
        const allOrderedItems = await OrderedItem.find({
            isDeleted: false
        }).populate("orderFID")
          .populate("productVariantFID")
        const Orders = await Order.find({isDeleted: false})
        const ProductVariants = await ProductVariant.find({isDeleted: false})
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: allOrderedItems
        // })
        res.render("OrderedItem/OrderedItemIndex.ejs", {data : allOrderedItems, Orders, ProductVariants})

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const singleOrderedItem = async (req, res) => {
    try {
        const singleOrderedItem = await OrderedItem.findOne({
            _id: req.params.id,
            isDeleted: false
        })

        res.status(200).json({
            success: true,
            error: false,
            data: singleOrderedItem
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const editOrderedItem = async (req, res) => {
    try {
        const orderedItem = await OrderedItem.findById(req.params.id)
        res.render("OrderedItem/EditOrderedItem.ejs", {orderedItem})
    } catch (error) {
        
    }
}

export const updateOrderedItem = async (req, res) => {
    try {
        const updatedOrderedItem = await OrderedItem.findByIdAndUpdate(
            req.params.id,
            {
                orderFID: req.body.orderFID,
                productVariantFID: req.body.productVariantFID,
                itemQuantity: req.body.itemQuantity,
                itemUnitPrice: req.body.itemUnitPrice,
                itemTotalPrice: req.body.itemTotalPrice
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        res.redirect("/api/orderedItem")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     data: updatedOrderedItem
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const removeOrderedItem = async (req, res) => {
    try {
        await OrderedItem.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        )
        res.redirect("/api/orderedItem")
        // res.status(200).json({
        //     success: true,
        //     error: false,
        //     message: "OrderedItem Removed Successfully..."
        // })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

export const deleteOrderedItem = async (req, res) => {
    try {
        await OrderedItem.findByIdAndDelete(req.params.id)

        res.redirect("/api/orderedItem")

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}
