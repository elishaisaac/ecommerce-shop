import { useState, useEffect } from "react"
import { API_URL } from "../config"

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/store/products`)
        const result = await res.json()
        if (!res.ok) throw new Error(result.message)
        setProducts(result.data)
      } catch (err) {
        setError("Could not load products")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { products, loading, error }
}