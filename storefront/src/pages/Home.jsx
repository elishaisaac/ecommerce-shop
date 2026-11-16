import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useProducts } from "../hooks/UseProducts.js"
import HeroCarousel from "../components/HeroCarousel"
import "./Home.css"

function Home() {
    const { products, loading, error } = useProducts()

    if (loading) return <p className="text-center" style={{ padding: "160px 0" }}>Loading...</p>
    if (error) return <p className="text-center" style={{ padding: "160px 0" }}>{error}</p>

    const newest = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const withPhotos = newest.filter(p => p.productImage?.startsWith("/uploads"))
    const heroProducts = (withPhotos.length ? withPhotos : newest).slice(0, 4)
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
            <HeroCarousel products={heroProducts} />

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