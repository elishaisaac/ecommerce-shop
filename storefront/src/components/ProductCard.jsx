import { Link } from "react-router-dom"
import { getImageSrc, formatPrice } from "../utils"
import "./ProductCard.css"

function ProductCard({ product }) {
  const variants = product.variants || []

  const cheapest = variants.reduce(
    (best, v) => (!best || v.productSalePrice < best.productSalePrice ? v : best),
    null
  )
  const hasDiscount = cheapest && cheapest.productDiscountPercent > 0
  const hasRange = new Set(variants.map(v => v.productSalePrice)).size > 1

  return (
    <Link to={`/products/${product._id}`} className="pc-card">
      <div className="pc-image">
        <img
          src={getImageSrc(product.productImage)}
          alt={product.productName}
          loading="lazy"
        />
      </div>

      <div className="pc-body">
        <div className="pc-brand">{product.brandFID?.brandName}</div>
        <h3 className="pc-name">{product.productName}</h3>

        <div className="pc-price-row">
          {cheapest ? (
            <>
              <div>
                {hasRange && <span className="pc-from">From</span>}
                <span className="pc-price">{formatPrice(cheapest.productSalePrice)}</span>
              </div>
              {hasDiscount && (
                <span className="pc-off">{cheapest.productDiscountPercent}% OFF</span>
              )}
            </>
          ) : (
            <span className="pc-noprice">Price not set</span>
          )}
        </div>

        {hasDiscount && (
          <div className="pc-old">{formatPrice(cheapest.productActualPrice)}</div>
        )}
      </div>
    </Link>
  )
}

export default ProductCard