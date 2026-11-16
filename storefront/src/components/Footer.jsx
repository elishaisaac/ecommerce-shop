import { Link, useLocation } from "react-router-dom"
import { useProducts } from "../hooks/UseProducts"
import { STORE_NAME,  API_URL } from "../config"
import "./Footer.css"

function Footer() {
  const { pathname } = useLocation()
  const { products } = useProducts()

  if (pathname.startsWith("/checkout") || pathname.startsWith("/order-success")) {
    return null
  }

  const categories = [
    ...new Set(products.map(p => p.categoryFID?.categoryName).filter(Boolean))
  ].slice(0, 6)

  return (
    <footer className="ft">
      <div className="container">
        <div className="ft-grid">
          <div className="ft-wide">
            <div className="ft-brand">{STORE_NAME}</div>
            <p>
              Browse, pick your exact color and storage, and pay in cash
              when your order arrives.
            </p>
          </div>

          <div>
            <h6>Shop</h6>
            <Link to="/products">All products</Link>
            {categories.map(c => (
              <Link key={c} to={`/products?category=${encodeURIComponent(c)}`}>{c}</Link>
            ))}
          </div>

          <div>
            <h6>Quick links</h6>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>

          <div className="ft-wide">
            <h6>How it works</h6>
            <div className="ft-step"><b>1</b> Choose your product and version</div>
            <div className="ft-step"><b>2</b> Add it to your cart</div>
            <div className="ft-step"><b>3</b> Check out and pay on delivery</div>
          </div>
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} {STORE_NAME}</span>
          <span>Demo store built with React, Express and MongoDB. No real orders are processed.</span>
          <a href={`${API_URL}/login`}>Admin</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer