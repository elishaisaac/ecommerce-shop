import { createContext, useContext, useState, useEffect } from "react"
export const MAX_QTY = 10
const CartContext = createContext()

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem("cart")
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addToCart = (newItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.variantId === newItem.variantId)
            if (existing) {
                return prev.map(i =>
                    i.variantId === newItem.variantId
                        ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + newItem.quantity) }
                        : i
                )
            }
            return [...prev, newItem]
        })
    }

    const updateQuantity = (variantId, quantity) => {
        if (quantity < 1 || quantity > MAX_QTY) return
        setItems(prev =>
            prev.map(i => (i.variantId === variantId ? { ...i, quantity } : i))
        )
    }

    const removeFromCart = (variantId) => {
        setItems(prev => prev.filter(i => i.variantId !== variantId))
    }

    const clearCart = () => setItems([])

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const totalSavings = items.reduce(
        (sum, i) => sum + ((i.actualPrice || i.price) - i.price) * i.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice, totalSavings }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)