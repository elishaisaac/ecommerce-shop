import { usePageTitle } from "../hooks/usePageTitle"
import { useEffect } from "react"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { formatPrice } from "../utils"
import "./Checkout.css"

function OrderSuccess() {
  const { state } = useLocation()
  const { clearCart } = useCart()

  useEffect(() => {
    if (state?.order) clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  usePageTitle("Order placed")
  if (!state?.order) return <Navigate to="/" replace />

  const { order, name } = state

  return (
    <div className="os-page">
      <div className="container text-center">
        <div className="os-check">✓</div>
        <h2>Thank you, {name}!</h2>
        <p className="text-muted">Your order has been placed. Please keep your order number.</p>

        <div className="os-box">
          <div className="os-row">
            <span>Order number</span>
            <strong>{order.orderNumber}</strong>
          </div>
          <div className="os-row">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="os-row">
            <span>Delivery</span>
            <span>{formatPrice(order.deliveryCharge)}</span>
          </div>
          <div className="os-row total">
            <span>Total</span>
            <span>{formatPrice(order.orderTotal)}</span>
          </div>
        </div>

        <Link to="/products" className="co-btn" style={{ display: "inline-block" }}>
          Continue shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess