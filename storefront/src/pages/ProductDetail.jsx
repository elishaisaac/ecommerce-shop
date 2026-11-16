import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { API_URL } from "../config"
import { getImageSrc, formatPrice, variantLabel, attrValue, configLabel } from "../utils"
import { useCart, MAX_QTY } from "../context/CartContext"
import "./ProductDetail.css"

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/store/products/${id}`)
        const result = await res.json()
        if (!res.ok) throw new Error(result.message)

        setProduct(result.data)
        setSelectedVariant(result.data.variants[0] || null)
      } catch (err) {
        setError("Could not load this product")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) return <p className="text-center" style={{ padding: "160px 0" }}>Loading...</p>
  if (error) return <p className="text-center" style={{ padding: "160px 0" }}>{error}</p>

  const v = selectedVariant
  const hasDiscount = v && v.productDiscountPercent > 0

  const handleAddToCart = () => {
    addToCart({
      variantId: v._id,
      productId: product._id,
      name: product.productName,
      image: product.productImage,
      label: (v.attributes || []).map(a => a.value).join(" · "),
      price: v.productSalePrice,
      actualPrice: v.productActualPrice,
      quantity
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  const variants = product.variants
  const colors = [...new Set(variants.map(x => attrValue(x, "Color")).filter(Boolean))]
  const configs = [...new Set(variants.map(x => configLabel(x)).filter(Boolean))]

  const currentColor = v ? attrValue(v, "Color") : null
  const currentConfig = v ? configLabel(v) : ""

  const colorAvailable = (color) =>
    variants.some(x => attrValue(x, "Color") === color && configLabel(x) === currentConfig)

  const pickColor = (color) => {
    const match = variants.find(
      x => attrValue(x, "Color") === color && configLabel(x) === currentConfig
    )
    if (match) setSelectedVariant(match)
  }

  const pickConfig = (config) => {
    const match =
      variants.find(x => configLabel(x) === config && attrValue(x, "Color") === currentColor) ||
      variants.find(x => configLabel(x) === config)
    if (match) setSelectedVariant(match)
  }

  const details = [
    ["Brand", product.brandFID?.brandName],
    ["Category", product.categoryFID?.categoryName],
    ...(v?.attributes || []).map(a => [a.name, a.value]),
    ["SKU", v?.productSKU],
    ["List price", v && formatPrice(v.productActualPrice)],
    ["Discount", hasDiscount ? `${v.productDiscountPercent}%` : null],
    ["Sale price", v && formatPrice(v.productSalePrice)]
  ].filter(row => row[1])

  return (
    <div className="pd-page">
      <div className="container">

        <div className="pd-breadcrumb">
          <Link to="/">Home</Link><span className="sep">/</span>
          <Link to="/products">Products</Link><span className="sep">/</span>
          {product.categoryFID?.categoryName}<span className="sep">/</span>
          {product.productName}
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="pd-image-box">
              {hasDiscount && <span className="pd-badge">{v.productDiscountPercent}% OFF</span>}
              <img src={getImageSrc(product.productImage)} alt={product.productName} />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="pd-brand">{product.brandFID?.brandName}</div>
            <h1 className="pd-title">{product.productName}</h1>
            <span className="pd-category">{product.categoryFID?.categoryName}</span>

            {v ? (
              <div className="pd-price-row">
                <span className="pd-price">{formatPrice(v.productSalePrice)}</span>
                {hasDiscount && (
                  <>
                    <span className="pd-old-price">{formatPrice(v.productActualPrice)}</span>
                    <span className="pd-save">
                      You save {formatPrice(v.productActualPrice - v.productSalePrice)}
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className="pd-price-row">
                <span className="pd-price">Price not set</span>
              </div>
            )}

            {colors.length > 0 && (
              <>
                <div className="pd-label">Color: {currentColor}</div>
                <div className="pd-chips">
                  {colors.map(color => (
                    <button
                      key={color}
                      className={`pd-chip ${color === currentColor ? "active" : ""}`}
                      disabled={!colorAvailable(color)}
                      onClick={() => pickColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </>
            )}

            {configs.length > 0 && (
              <>
                <div className="pd-label">Storage</div>
                <div className="pd-chips">
                  {configs.map(config => (
                    <button
                      key={config}
                      className={`pd-chip ${config === currentConfig ? "active" : ""}`}
                      onClick={() => pickConfig(config)}
                    >
                      {config}
                    </button>
                  ))}
                </div>
              </>
            )}

            {colors.length === 0 && configs.length === 0 && variants.length > 1 && (
              <>
                <div className="pd-label">Options</div>
                <div className="pd-chips">
                  {variants.map(variant => (
                    <button
                      key={variant._id}
                      className={`pd-chip ${variant._id === v?._id ? "active" : ""}`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variantLabel(variant)}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="pd-label">Quantity</div>
            <div className="pd-qty">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(MAX_QTY, q + 1))}>+</button>
            </div>

            {v && (
              <div className="pd-total">
                Total: <strong>{formatPrice(v.productSalePrice * quantity)}</strong>
              </div>
            )}

            <div className="pd-actions">
              <button className="pd-btn" disabled={!v} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="pd-tabs-wrap">
          <div className="pd-tabs">
            <button
              className={`pd-tab ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >Description</button>
            <button
              className={`pd-tab ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >Details</button>
          </div>

          <div className="pd-tab-content">
            {activeTab === "description" && (
              <p>{product.productDesc || "No description available."}</p>
            )}

            {activeTab === "details" && (
              <table className="pd-table">
                <tbody>
                  {details.map(([label, value]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
      {added && (
        <div className="pd-toast">
          ✓ Added to cart · <Link to="/cart">View cart</Link>
        </div>
      )}
    </div>
  )
}

export default ProductDetail