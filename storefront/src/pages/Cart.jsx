import { usePageTitle } from "../hooks/usePageTitle"
import { Link } from "react-router-dom"
import { useCart, MAX_QTY } from "../context/CartContext"
import { getImageSrc, formatPrice } from "../utils"
import "./Cart.css"

function Cart() {
  const {
    items, updateQuantity, removeFromCart, clearCart,
    totalItems, totalPrice, totalSavings
  } = useCart()
  usePageTitle("Cart")
  if (items.length === 0) {
    return (
      <div className="cart-page container text-center">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p className="text-muted">Browse our products and add something you like.</p>
        <Link to="/products" className="pd-btn" style={{ display: "inline-block" }}>
          Start shopping
        </Link>
      </div>
    )
  }

  const handleClear = () => {
    if (window.confirm("Remove all items from your cart?")) clearCart()
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-head">
          <h2 className="cart-title">Shopping Cart ({totalItems})</h2>
          <button className="cart-clear" onClick={handleClear}>Clear cart</button>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {items.map(item => {
              const hasDiscount = item.actualPrice && item.actualPrice > item.price
              return (
                <div className="cart-item" key={item.variantId}>
                  <img src={getImageSrc(item.image)} alt={item.name} />

                  <div className="cart-info">
                    <Link to={`/products/${item.productId}`}>{item.name}</Link>
                    <div className="cart-label">{item.label}</div>
                    <div className="cart-price">
                      {formatPrice(item.price)}
                      {hasDiscount && (
                        <span className="cart-old-price">{formatPrice(item.actualPrice)}</span>
                      )}
                    </div>
                  </div>

                  <div className="pd-qty">
                    <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            disabled={item.quantity >= MAX_QTY}>+</button>
                  </div>

                  <div className="cart-line-total">
                    {formatPrice(item.price * item.quantity)}
                    {hasDiscount && (
                      <div className="cart-save">
                        Saved {formatPrice((item.actualPrice - item.price) * item.quantity)}
                      </div>
                    )}
                  </div>

                  <button className="cart-remove" onClick={() => removeFromCart(item.variantId)}
                          aria-label="Remove item">✕</button>
                </div>
              )
            })}

            <Link to="/products" className="cart-continue">← Continue shopping</Link>
          </div>

          <div className="col-lg-4">
            <div className="cart-summary">
              <h5>Order Summary</h5>

              <div className="cart-summary-row">
                <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                <span>{formatPrice(totalPrice + totalSavings)}</span>
              </div>

              {totalSavings > 0 && (
                <div className="cart-summary-row discount">
                  <span>Discount</span>
                  <span>− {formatPrice(totalSavings)}</span>
                </div>
              )}

              <div className="cart-summary-row total">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <Link to="/checkout" className="pd-btn"
                    style={{ display: "block", textAlign: "center" }}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart