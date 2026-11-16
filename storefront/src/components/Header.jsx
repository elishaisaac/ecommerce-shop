import { useState, useEffect } from "react"
import { Link, NavLink, useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useProducts } from "../hooks/UseProducts"
import { STORE_NAME } from "../config"
import "./Header.css"

function Header() {
  const { totalItems } = useCart()
  const { products } = useProducts()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [term, setTerm] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const categories = [
    ...new Set(products.map(p => p.categoryFID?.categoryName).filter(Boolean))
  ]
  const onProducts = pathname === "/products"
  const activeCategory = onProducts ? searchParams.get("category") : null

  const handleSearch = (e) => {
    e.preventDefault()
    const q = term.trim()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products")
    setTerm("")
  }

  return (
    <header className="hd">
      <div className="container hd-main">
        <button
          className="hd-burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span /><span /><span />
        </button>

        <Link to="/" className="hd-logo">
          <span className="hd-logo-mark">{STORE_NAME.charAt(0)}</span>
          {STORE_NAME}
        </Link>

        <form className="hd-search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search for phones, brands..."
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
        </form>

        <nav className="hd-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
        </nav>

        <Link to="/cart" className="hd-cart" aria-label={`Cart, ${totalItems} items`}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" />
          </svg>
          {totalItems > 0 && <span className="hd-badge">{totalItems}</span>}
        </Link>
      </div>

      {categories.length > 0 && (
        <div className="hd-cats">
          <div className="container">
            <div className="hd-cats-scroll">
              <Link
                to="/products"
                className={`hd-chip ${onProducts && !activeCategory ? "active" : ""}`}
              >
                All
              </Link>
              {categories.map(c => (
                <Link
                  key={c}
                  to={`/products?category=${encodeURIComponent(c)}`}
                  className={`hd-chip ${activeCategory === c ? "active" : ""}`}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="hd-menu">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart {totalItems > 0 && `(${totalItems})`}</NavLink>
        </div>
      )}
    </header>
  )
}

export default Header