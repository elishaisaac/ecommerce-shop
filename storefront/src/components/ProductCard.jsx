import { getImageSrc, formatPrice } from "../utils"
import { Link } from "react-router-dom"

function ProductCard({ product }) {
  return (
    <div className="col-lg-4">
      <div className="item">
        <div className="thumb">
          <Link to={`/products/${product._id}`}>
            <img src={getImageSrc(product.productImage)} alt={product.productName} />
          </Link>
        </div>
        <div className="down-content">
          <Link to={`/products/${product._id}`}><h4>{product.productName}</h4></Link>
          <span>
            {product.startingPrice !== null ? `From ${formatPrice(product.startingPrice)}` : "Price not set"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard