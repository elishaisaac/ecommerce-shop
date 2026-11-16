import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useProducts } from "../hooks/UseProducts.js"
import { getImageSrc, formatPrice } from "../utils"
import "./Home.css"

function Home() {
  const { products, loading, error } = useProducts()

  if (loading) return <p className="text-center" style={{ padding: "160px 0" }}>Loading...</p>
  if (error) return <p className="text-center" style={{ padding: "160px 0" }}>{error}</p>

  const newest = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  const featured = newest.find(p => p.productImage?.startsWith("/uploads")) || newest[0]
  const arrivals = newest.slice(0, 4)

  const categoryMap = {}
  products.forEach(p => {
    const name = p.categoryFID?.categoryName
    if (!name) return
    if (!categoryMap[name]) {
      categoryMap[name] = { name, detail: p.categoryFID.categoryDetail, count: 0 }
    }
    categoryMap[name].count++
  })
  const categories = Object.values(categoryMap)

  return (
    <>
      <section className="hm-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="hm-kicker">Welcome to our store</span>
              <h1>Discover your next favorite device</h1>
              <p>
                Compare options, pick the exact color and storage you want,
                and pay when it arrives.
              </p>
              <div className="hm-buttons">
                <Link to="/products" className="hm-btn">Shop now</Link>
                <a href="#categories" className="hm-btn outline">Browse categories</a>
              </div>
            </div>

            {featured && (
              <div className="col-lg-6">
                <Link to={`/products/${featured._id}`} className="hm-featured">
                  <img src={getImageSrc(featured.productImage)} alt={featured.productName} />
                  <div className="hm-featured-info">
                    <span>Newest arrival</span>
                    <strong>{featured.productName}</strong>
                    {featured.startingPrice !== null && (
                      <em>From {formatPrice(featured.startingPrice)}</em>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="hm-section" id="categories">
          <div className="container">
            <h2 className="hm-title">Shop by category</h2>
            <div className="row">
              {categories.map(c => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={c.name}>
                  <Link
                    to={`/products?category=${encodeURIComponent(c.name)}`}
                    className="hm-category"
                  >
                    <div className="hm-category-icon">{c.name.charAt(0)}</div>
                    <h5>{c.name}</h5>
                    <p>{c.detail}</p>
                    <span>{c.count} {c.count === 1 ? "product" : "products"} →</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="hm-section alt">
        <div className="container">
          <div className="hm-title-row">
            <h2 className="hm-title">New arrivals</h2>
            <Link to="/products">View all products →</Link>
          </div>
          <div className="pc-grid">
            {arrivals.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="hm-feature">
                <h5>Cash on delivery</h5>
                <p>Place your order now and pay in cash when it arrives.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hm-feature">
                <h5>Standard or express delivery</h5>
                <p>Choose the delivery speed that suits you at checkout.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hm-feature">
                <h5>Pick your exact version</h5>
                <p>Choose color and storage, and see the price and your savings update.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home