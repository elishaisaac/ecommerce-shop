import { Link, NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Header() {
  const { totalItems } = useCart()
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo">
                <img src="/assets/images/logo.png" alt="HexaShop" />
              </Link>
              <ul className="nav">
                <li><NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
                <li><NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink></li>
                <li><NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}</NavLink></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header