import { usePageTitle } from "../hooks/usePageTitle"
import { useSearchParams } from "react-router-dom"
import { useProducts } from "../hooks/UseProducts.js"
import ProductCard from "../components/ProductCard"
import "./Products.css"

function Products() {
  const { products, loading, error } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const brand = searchParams.get("brand") || ""
  const sort = searchParams.get("sort") || "newest"
  usePageTitle(category || "Products")

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
  }

  if (loading) return <p className="text-center" style={{ padding: "160px 0" }}>Loading...</p>
  if (error) return <p className="text-center" style={{ padding: "160px 0" }}>{error}</p>

  const categories = [...new Set(products.map(p => p.categoryFID?.categoryName).filter(Boolean))]
  const brands = [...new Set(products.map(p => p.brandFID?.brandName).filter(Boolean))]

  const filtered = products
    .filter(p => p.productName.toLowerCase().includes(q.trim().toLowerCase()))
    .filter(p => !category || p.categoryFID?.categoryName === category)
    .filter(p => !brand || p.brandFID?.brandName === brand)
    .sort((a, b) => {
      if (sort === "price-asc") return (a.startingPrice ?? Infinity) - (b.startingPrice ?? Infinity)
      if (sort === "price-desc") return (b.startingPrice ?? -Infinity) - (a.startingPrice ?? -Infinity)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  const hasFilters = q || category || brand

  return (
    <>
      <div className="pl-head">
        <div className="container">
          <h1>Our Products</h1>
          <p>Browse our full collection</p>
        </div>
      </div>

      <section className="pl-section" id="products">
        <div className="container">

          <div className="pl-toolbar">
            <input
              type="search"
              className="pl-search"
              placeholder="Search products..."
              value={q}
              onChange={e => updateParam("q", e.target.value)}
            />
            <select value={category} onChange={e => updateParam("category", e.target.value)}>
              <option value="">All categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={brand} onChange={e => updateParam("brand", e.target.value)}>
              <option value="">All brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={sort} onChange={e => updateParam("sort", e.target.value)}>
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>

          <div className="pl-count">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {hasFilters && (
              <button className="pl-clear" onClick={() => setSearchParams({}, { replace: true })}>
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="pl-empty">
              <h4>No products found</h4>
              <p>Try a different search or clear your filters.</p>
            </div>
          ) : (
            <div className="pc-grid">
              {filtered.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Products