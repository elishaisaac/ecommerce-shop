import "dotenv/config"
import mongoose from "mongoose"
import ProductVariant from "../Models/ProductVariantModel.js"

const apply = process.argv.includes("--apply")
await mongoose.connect(process.env.MONGO_URI)

const variants = await ProductVariant.find({ isDeleted: false })
let changed = 0

for (const v of variants) {
    if (!Number.isFinite(v.productActualPrice)) continue

    const expected = Math.round(
        (v.productActualPrice * (100 - (v.productDiscountPercent || 0))) / 100
    )

    if (expected !== v.productSalePrice) {
        changed++
        console.log(`${v.productSKU}: ${v.productSalePrice} -> ${expected}`)
        if (apply) {
            v.productSalePrice = expected
            await v.save()
        }
    }
}

console.log(
    changed === 0
        ? "All prices are already consistent"
        : `${changed} variant(s) ${apply ? "updated" : "would change (run with --apply to save)"}`
)

await mongoose.disconnect()