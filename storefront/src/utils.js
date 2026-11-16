import { API_URL } from "./config"

export const getImageSrc = (path) =>
  path?.startsWith("/uploads")
    ? `${API_URL}${path}`
    : "/assets/images/placeholder.svg"

export const cheapestVariant = (product) =>
  (product.variants || []).reduce(
    (best, v) => (!best || v.productSalePrice < best.productSalePrice ? v : best),
    null
  )

export const formatPrice = (amount) => `Rs. ${Number(amount).toLocaleString()}`

export const variantLabel = (variant) =>
  variant.attributes?.length
    ? variant.attributes
        .map(a => (a.name === "RAM" ? `${a.value} RAM` : a.value))
        .join(" - ")
    : variant.productSKU

export const attrValue = (variant, name) =>
  variant.attributes?.find(a => a.name === name)?.value || null

const CONFIG_ORDER = ["Storage", "RAM"]

export const configLabel = (variant) =>
  (variant.attributes || [])
    .filter(a => a.name !== "Color")
    .sort((a, b) => CONFIG_ORDER.indexOf(a.name) - CONFIG_ORDER.indexOf(b.name))
    .map(a => (a.name === "RAM" ? `${a.value} RAM` : a.value))
    .join(" - ")