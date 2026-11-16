import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { API_URL } from "../config"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/store/products`)
        const result = await res.json()
        setProducts(result.data)
      } catch (err) {
        setError("Could not load products")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) return <p className="text-center mt-5">Loading...</p>
  if (error) return <p className="text-center mt-5">{error}</p>

  return (
    <>
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Check Our Products</h2>
                <span>Everything we have in stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" id="products">
        <div className="container">
          <div className="row">
            {products.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Products