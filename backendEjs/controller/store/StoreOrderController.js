import Order from "../../Models/OrderModel.js"
import OrderedItem from "../../Models/OrderedItemModel.js"
import OrderAddress from "../../Models/OrderAddressModel.js"
import ProductVariant from "../../Models/ProductVariantModel.js"

const MAX_QTY = 10

const DELIVERY_OPTIONS = [
    { id: "standard", label: "Standard Delivery", charge: 250, eta: "3 - 5 working days" },
    { id: "express", label: "Express Delivery", charge: 500, eta: "1 - 2 working days" }
]

const PAYMENT_METHODS = [
    { id: "cod", label: "Cash on Delivery", description: "Pay in cash when your order arrives" }
]

const fail = (res, message, status = 400) =>
    res.status(status).json({ success: false, error: true, message })

export const checkoutOptions = (req, res) => {
    res.status(200).json({
        success: true,
        error: false,
        data: { deliveryOptions: DELIVERY_OPTIONS, paymentMethods: PAYMENT_METHODS }
    })
}

export const placeOrder = async (req, res) => {
    try {
        const { items, customer, address, deliveryType, paymentMethod } = req.body

        // 1. Validate what the customer typed
        if (!Array.isArray(items) || items.length === 0) {
            return fail(res, "Your cart is empty")
        }

        const name = customer?.name?.trim()
        const email = customer?.email?.trim()
        const phone = customer?.phone?.trim()
        if (!name) return fail(res, "Please enter your name")
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) return fail(res, "Please enter a valid email")
        if (!phone || !/^[0-9+\-\s]{10,15}$/.test(phone)) return fail(res, "Please enter a valid phone number")

        const street = address?.street?.trim()
        const city = address?.city?.trim()
        if (!street) return fail(res, "Please enter your street / house number")
        if (!city) return fail(res, "Please enter your city")
        const addressType = address?.type === "Office" ? "Office" : "Home"

        const deliveryOption = DELIVERY_OPTIONS.find(o => o.id === deliveryType)
        if (!deliveryOption) return fail(res, "Please choose a delivery type")

        const payment = PAYMENT_METHODS.find(p => p.id === paymentMethod)
        if (!payment) return fail(res, "Please choose a payment method")

        // 2. Look up the REAL prices in the database
        const variants = await ProductVariant.find({
            _id: { $in: items.map(i => i.variantId) },
            isDeleted: false
        }).populate("productFID")

        const variantMap = new Map(variants.map(v => [String(v._id), v]))

        const lines = []
        for (const item of items) {
            const variant = variantMap.get(String(item.variantId))
            if (!variant || !variant.productFID || variant.productFID.isDeleted) {
                return fail(res, "An item in your cart is no longer available. Please review your cart.")
            }

            const quantity = Number(item.quantity)
            if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
                return fail(res, `Quantity must be between 1 and ${MAX_QTY}`)
            }

            lines.push({
                variant,
                quantity,
                unitPrice: variant.productSalePrice,
                total: variant.productSalePrice * quantity
            })
        }

        // 3. Work out the totals on the server
        const subtotal = lines.reduce((sum, l) => sum + l.total, 0)
        const deliveryCharge = deliveryOption.charge
        const orderTotal = subtotal + deliveryCharge

        // 4. Save everything
        const orderNumber = `ORD-${Date.now().toString().slice(-8)}${Math.floor(100 + Math.random() * 900)}`
        let order

        try {
            order = await Order.create({
                orderNumber,
                orderStatus: "Pending",
                orderTotal,
                subtotal,
                deliveryCharge,
                deliveryType: deliveryOption.label,
                paymentMethod: payment.label,
                customerName: name,
                customerEmail: email,
                createdBy: "storefront"
            })

            await OrderAddress.create({
                orderFID: order._id,
                addressLine1: street,
                addressCity: city,
                addressPhone: phone,
                addressType
            })

            await OrderedItem.insertMany(
                lines.map(l => ({
                    orderFID: order._id,
                    productVariantFID: l.variant._id,
                    itemQuantity: l.quantity,
                    itemUnitPrice: l.unitPrice,
                    itemTotalPrice: l.total
                }))
            )
        } catch (saveError) {
            if (order) {
                await OrderedItem.deleteMany({ orderFID: order._id })
                await OrderAddress.deleteMany({ orderFID: order._id })
                await Order.deleteOne({ _id: order._id })
            }
            throw saveError
        }

        res.status(201).json({
            success: true,
            error: false,
            data: { orderNumber, subtotal, deliveryCharge, orderTotal }
        })
    } catch (error) {
        if (error.name === "CastError") {
            return fail(res, "Your cart contains an invalid item. Please review your cart.")
        }
        res.status(500).json({ success: false, error: true, message: error.message })
    }
}