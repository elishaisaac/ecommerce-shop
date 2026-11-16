import { useCart } from "../context/CartContext"
import { getImageSrc, formatPrice } from "../utils"

function OrderSummary({ deliveryCharge }) {
  const { items, totalPrice, totalSavings } = useCart()
  const total = totalPrice + (deliveryCharge || 0)

  return (
    <div className="co-summary">
      <h5>Order Summary</h5>

      {items.map(item => (
        <div className="co-sum-item" key={item.variantId}>
          <img src={getImageSrc(item.image)} alt={item.name} />
          <div className="co-sum-info">
            <div className="co-sum-name">{item.name}</div>
            <div className="co-sum-label">{item.label}</div>
            <div className="co-sum-qty">
              Qty {item.quantity} × {formatPrice(item.price)}
            </div>
          </div>
          <div className="co-sum-line">{formatPrice(item.price * item.quantity)}</div>
        </div>
      ))}

      <div className="co-sum-rows">
        <div>
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice + totalSavings)}</span>
        </div>
        {totalSavings > 0 && (
          <div className="discount">
            <span>Discount</span>
            <span>− {formatPrice(totalSavings)}</span>
          </div>
        )}
        <div>
          <span>Delivery</span>
          <span>
            {deliveryCharge === null ? "Chosen at delivery step" : formatPrice(deliveryCharge)}
          </span>
        </div>
        <div className="total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary