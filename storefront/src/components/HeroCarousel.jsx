import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getImageSrc, formatPrice, cheapestVariant } from "../utils"
import "./HeroCarousel.css"

const THEMES = ["theme-orange", "theme-blue", "theme-purple", "theme-green"]

function HeroCarousel({ products }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = products.length

  useEffect(() => {
    if (paused || count < 2) return
    const timer = setInterval(() => setIndex(i => (i + 1) % count), 5000)
    return () => clearInterval(timer)
  }, [paused, count])

  if (count === 0) return null

  const go = (n) => setIndex((n + count) % count)
  const p = products[index]
  const v = cheapestVariant(p)
  const hasDiscount = v && v.productDiscountPercent > 0

  return (
    <section className="hc-wrap">
      <div className="container">
        <div
          className={`hc ${THEMES[index % THEMES.length]}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hc-slide" key={p._id}>
            <div className="hc-text">
              <span className="hc-kicker">{p.brandFID?.brandName}</span>
              <h2>{p.productName}</h2>
              {v && (
                <p className="hc-price">
                  {hasDiscount && <span className="hc-off">{v.productDiscountPercent}% OFF</span>}
                  From {formatPrice(v.productSalePrice)}
                </p>
              )}
              <Link to={`/products/${p._id}`} className="hc-btn">Shop now</Link>
            </div>

            <div className="hc-image">
              <img src={getImageSrc(p.productImage)} alt={p.productName} />
            </div>
          </div>

          {count > 1 && (
            <>
              <button className="hc-arrow left" onClick={() => go(index - 1)} aria-label="Previous slide">‹</button>
              <button className="hc-arrow right" onClick={() => go(index + 1)} aria-label="Next slide">›</button>
              <div className="hc-dots">
                {products.map((item, i) => (
                  <button
                    key={item._id}
                    className={i === index ? "active" : ""}
                    onClick={() => go(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroCarousel