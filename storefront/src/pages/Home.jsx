import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useProducts } from "../hooks/UseProducts.js"
import HeroCarousel from "../components/HeroCarousel"
import "./Home.css"
const features = [
    {
        title: "Cash on delivery",
        text: "Place your order now and pay in cash when it arrives.",
        icon: (
            <>
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="3" />
            </>
        )
    },
    {
        title: "Standard or express delivery",
        text: "Choose the delivery speed that suits you at checkout.",
        icon: (
            <>
                <path d="M1 6h13v10H1z" />
                <path d="M14 10h4l4 3v3h-8z" />
                <circle cx="6" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
            </>
        )
    },
    {
        title: "Pick your exact version",
        text: "Choose color and storage, and see the price and your savings update.",
        icon: (
            <>
                <path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0" />
                <circle cx="15" cy="6" r="2" />
                <circle cx="9" cy="12" r="2" />
                <circle cx="17" cy="18" r="2" />
            </>
        )
    }
]
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
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)

    return (
        <>
            <HeroCarousel products={heroProducts} />

            {categories.length > 0 && (
                <section className="hm-section" id="categories">
                    <div className="container">
                        <div className="hm-title-row">
                            <h2 className="hm-title">Shop by category</h2>
                            <Link to="/products">All products →</Link>
                        </div>

                        <div className="hm-cats">
                            {categories.map(c => (
                                <Link
                                    key={c.name}
                                    to={`/products?category=${encodeURIComponent(c.name)}`}
                                    className="hm-cat"
                                >
                                    <span className="hm-cat-icon">{c.name.charAt(0)}</span>
                                    <span className="hm-cat-text">
                                        <strong>{c.name}</strong>
                                        <small>{c.count} {c.count === 1 ? "product" : "products"}</small>
                                    </span>
                                </Link>
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
                    <div className="hm-features">
                        {features.map(f => (
                            <div className="hm-feature" key={f.title}>
                                <div className="hm-feature-icon">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {f.icon}
                                    </svg>
                                </div>
                                <div>
                                    <h5>{f.title}</h5>
                                    <p>{f.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home