import "dotenv/config"
import express from "express"
import connectDB from "./config/db.js"

// ADMIN ROUTES
import productRouter from "./routes/admin/ProductRoutes.js"
import brandRouter from "./routes/admin/BrandRoutes.js"
import categoryRouter from "./routes/admin/CategoryRoutes.js"
import productAttributeRouter from "./routes/admin/ProductAttributeRoutes.js"
import attributeRouter from "./routes/admin/AttributeRoutes.js"
import attributeValueRouter from "./routes/admin/AttributeValueRoutes.js"
import productVariantRouter from "./routes/admin/ProductVariantRoutes.js"
import variantAttributeValueRouter from "./routes/admin/VariantAttributeValueRoutes.js"
import userTypeRouter from "./routes/admin/UserTypeRoutes.js"
import userRouter from "./routes/admin/UserRoutes.js"
import roleRouter from "./routes/admin/RoleRoutes.js"
import permissionRouter from "./routes/admin/PermissionRoutes.js"
import userRoleRouter from "./routes/admin/UserRoleRoutes.js"
import rolePermissionRouter from "./routes/admin/RolePermissionRoutes.js"
import orderRouter from "./routes/admin/OrderRoutes.js"
import orderedItemRouter from "./routes/admin/OrderedItemRoutes.js"
import couponRouter from "./routes/admin/CouponRoutes.js"
import orderDiscountRouter from "./routes/admin/OrderDiscountRoutes.js"
import orderAddressRouter from "./routes/admin/OrderAddressRoutes.js"
import dashboardRouter from "./routes/admin/DashboardRoutes.js"

import cookieParser from "cookie-parser"
import authRouter from "./routes/admin/AuthRoutes.js"
import { requireAdmin } from "./middleware/auth.js"
import { friendlyErrors } from "./middleware/errors.js"
// STORE ROUTES
import storeRouter from "./routes/store/StoreRoutes.js"

import cors from "cors"
import path from 'path'
import { fileURLToPath } from "url"

const app = express()
const PORT = process.env.PORT || 3000

// Recreating Directory Path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// MiddleWare
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// PUBLIC: the storefront API and the login page
app.use("/api/store", storeRouter)
app.use("/", authRouter)

// GUARD, then the error helper. Every admin route goes BELOW these two lines.
app.use("/api", requireAdmin)
app.use("/api", friendlyErrors)

app.get("/", (req, res) => res.redirect("/api/dashboard"))

// ADMIN API
app.use("/api/dashboard", dashboardRouter)
app.use("/api/product", productRouter)
app.use("/api/brand", brandRouter)
app.use("/api/category", categoryRouter)
app.use("/api/productAttribute", productAttributeRouter)
app.use("/api/attribute", attributeRouter)
app.use("/api/attributeValue", attributeValueRouter)
app.use("/api/productVariant", productVariantRouter)
app.use("/api/variantAttributeValue", variantAttributeValueRouter)
app.use("/api/userType", userTypeRouter)
app.use("/api/user", userRouter)
app.use("/api/role", roleRouter)
app.use("/api/permission", permissionRouter)
app.use("/api/userRole", userRoleRouter)
app.use("/api/rolePermission", rolePermissionRouter)
app.use("/api/order", orderRouter)
app.use("/api/orderedItem", orderedItemRouter)
app.use("/api/coupon", couponRouter)
app.use("/api/orderDiscount", orderDiscountRouter)
app.use("/api/orderAddress", orderAddressRouter)

// NOT FOUND and ERRORS: these must stay last
app.use((req, res) => {
    res.status(404)
    if (req.accepts("html")) return res.render("Error/NotFound.ejs")
    res.json({ success: false, error: true, message: "Not found" })
})
app.use("/api", (req, res) => {
    res.showError(404, "That page does not exist.")
})

app.use((req, res) => {
    res.status(404).send("Page not found")
})

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err)
    if (res.showError) return res.showError(500, err.message)
    res.status(err.status || 500).json({ success: false, error: true, message: err.message })
})

app.listen(PORT, () => {
    console.log("Server has Started...")
    connectDB()
})