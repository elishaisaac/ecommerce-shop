import Order from "../../Models/OrderModel.js"
import OrderedItem from "../../Models/OrderedItemModel.js"
import Product from "../../Models/ProductModel.js"

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"]
const NOT_COUNTED = ["Cancelled", "Returned"]

export const dashboard = async (req, res) => {
    try {
        const orders = await Order.find({ isDeleted: false })
            .populate("userFID")
            .sort({ createdAt: -1 })

        const counted = orders.filter(o => !NOT_COUNTED.includes(o.orderStatus))

        const totalOrders = orders.length
        const revenue = counted.reduce((sum, o) => sum + (o.orderTotal || 0), 0)
        const averageOrder = counted.length ? Math.round(revenue / counted.length) : 0
        const productCount = await Product.countDocuments({ isDeleted: false })
        const customerCount = new Set(
            orders.map(o => o.customerEmail || o.userFID?.userEmail).filter(Boolean)
        ).size

        const statusCounts = STATUSES.map(status => ({
            status,
            count: orders.filter(o => o.orderStatus === status).length
        }))

        const days = []
        for (let i = 6; i >= 0; i--) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            days.push({
                key: d.toLocaleDateString("en-CA"),
                label: d.toLocaleDateString("en-US", { weekday: "short" }),
                total: 0
            })
        }
        counted.forEach(o => {
            const day = days.find(
                d => d.key === new Date(o.createdAt).toLocaleDateString("en-CA")
            )
            if (day) day.total += o.orderTotal || 0
        })
        const maxDay = Math.max(...days.map(d => d.total), 1)

        const items = await OrderedItem.find({
            isDeleted: false,
            orderFID: { $in: counted.map(o => o._id) }
        }).populate({ path: "productVariantFID", populate: { path: "productFID" } })

        const sales = new Map()
        for (const item of items) {
            const product = item.productVariantFID?.productFID
            if (!product) continue
            const key = String(product._id)
            const row = sales.get(key) || { name: product.productName, units: 0, total: 0 }
            row.units += item.itemQuantity || 0
            row.total += item.itemTotalPrice || 0
            sales.set(key, row)
        }
        const topProducts = [...sales.values()]
            .sort((a, b) => b.units - a.units)
            .slice(0, 5)

        res.render("Dashboard/DashboardIndex.ejs", {
            totalOrders,
            revenue,
            averageOrder,
            productCount,
            customerCount,
            statusCounts,
            days,
            maxDay,
            topProducts,
            recentOrders: orders.slice(0, 5)
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}