import { NavLink, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./BottomNav.css"

const Svg = ({ children }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

function BottomNav() {
  const { pathname } = useLocation()
  const { totalItems } = useCart()

  if (pathname.startsWith("/checkout") || pathname.startsWith("/order-success")) {
    return null
  }

  return (
    <>
      <div className="bn-spacer" />
      <nav className="bn" aria-label="Main">
        <NavLink to="/" end>
          <Svg>
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h5v-6h4v6h5V10" />
          </Svg>
          <span>Home</span>
        </NavLink>

        <NavLink to="/products">
          <Svg>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </Svg>
          <span>Products</span>
        </NavLink>

        <NavLink to="/cart">
          <div className="bn-icon">
            <Svg>
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" />
            </Svg>
            {totalItems > 0 && <b className="bn-badge">{totalItems}</b>}
          </div>
          <span>Cart</span>
        </NavLink>
      </nav>
    </>
  )
}

export default BottomNav