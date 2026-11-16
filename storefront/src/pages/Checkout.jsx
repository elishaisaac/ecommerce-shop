import { usePageTitle } from "../hooks/usePageTitle"
import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { API_URL } from "../config"
import { formatPrice } from "../utils"
import OrderSummary from "../components/OrderSummary"
import "./Checkout.css"

const STEPS = ["Contact", "Address", "Delivery", "Payment"]

function Field({ label, name, value, onChange, error, ...rest }) {
  return (
    <div className="co-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "invalid" : ""}
        {...rest}
      />
      {error && <div className="co-error">{error}</div>}
    </div>
  )
}

function Checkout() {
  const { items } = useCart()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    type: "Home",
    deliveryType: "",
    paymentMethod: ""
  })
  const [errors, setErrors] = useState({})
  const [options, setOptions] = useState(null)
  const [loadError, setLoadError] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await fetch(`${API_URL}/api/store/checkout-options`)
        const result = await res.json()
        setOptions(result.data)
        setForm(prev => ({
          ...prev,
          deliveryType: result.data.deliveryOptions[0].id,
          paymentMethod: result.data.paymentMethods[0].id
        }))
      } catch (err) {
        setLoadError(true)
      }
    }

    loadOptions()
  }, [])
  usePageTitle("Checkout")
  if (items.length === 0) return <Navigate to="/cart" replace />
  if (loadError) return <p className="text-center" style={{ padding: "160px 0" }}>Could not load checkout. Please try again.</p>
  if (!options) return <p className="text-center" style={{ padding: "160px 0" }}>Loading...</p>

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validateStep = (s) => {
    const e = {}
    if (s === 1) {
      if (!form.name.trim()) e.name = "Please enter your name"
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Please enter a valid email"
      if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) e.phone = "Please enter a valid phone number"
    }
    if (s === 2) {
      if (!form.street.trim()) e.street = "Please enter your street / house number"
      if (!form.city.trim()) e.city = "Please enter your city"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validateStep(step)) setStep(step + 1)
  }

  const back = () => {
    setErrors({})
    setServerError(null)
    setStep(step - 1)
  }

  const selectedDelivery = options.deliveryOptions.find(o => o.id === form.deliveryType)

  const handlePlaceOrder = async () => {
    setPlacing(true)
    setServerError(null)

    try {
      const res = await fetch(`${API_URL}/api/store/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({ variantId: i.variantId, quantity: i.quantity })),
          customer: { name: form.name, email: form.email, phone: form.phone },
          address: { street: form.street, city: form.city, type: form.type },
          deliveryType: form.deliveryType,
          paymentMethod: form.paymentMethod
        })
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      navigate("/order-success", {
        replace: true,
        state: { order: result.data, name: form.name }
      })
    } catch (err) {
      setServerError(
        err.message === "Failed to fetch"
          ? "Could not reach the server. Please try again."
          : err.message
      )
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="co-page">
      <div className="container">

        <div className="co-progress">
          <div className="co-segments">
            {STEPS.map((label, i) => (
              <div key={label} className={`co-seg ${i + 1 <= step ? "done" : ""}`} />
            ))}
          </div>
          <div className="co-progress-text">
            <strong>{STEPS[step - 1]}</strong>
            <span>Step {step} of {STEPS.length}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">

            {step > 2 && (
              <div className="co-card co-recap">
                <div>
                  <h5>Deliver to</h5>
                  <p>{form.name} · {form.phone}</p>
                  <p>
                    {form.street}, {form.city} <span className="co-tag">{form.type}</span>
                  </p>
                </div>
                <button className="co-link" onClick={() => setStep(1)}>Edit</button>
              </div>
            )}

            {step === 1 && (
              <div className="co-card">
                <h4>Contact Information</h4>
                <Field label="Full name" name="name" value={form.name}
                  onChange={handleChange} error={errors.name}
                  placeholder="Enter your name" autoComplete="name" />
                <Field label="Email" name="email" type="email" value={form.email}
                  onChange={handleChange} error={errors.email}
                  placeholder="you@example.com" autoComplete="email" />
                <Field label="Mobile number" name="phone" type="tel" value={form.phone}
                  onChange={handleChange} error={errors.phone}
                  placeholder="03001234567" autoComplete="tel" />
                <div className="co-actions">
                  <button className="co-btn" onClick={next}>Next: Delivery Address</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="co-card">
                <h4>Delivery Address</h4>
                <Field label="City" name="city" value={form.city}
                  onChange={handleChange} error={errors.city}
                  placeholder="e.g. Lahore" autoComplete="address-level2" />
                <Field label="Street / House number" name="street" value={form.street}
                  onChange={handleChange} error={errors.street}
                  placeholder="House 1, Street 2, Area" autoComplete="street-address" />
                <div className="co-field">
                  <label>Address type</label>
                  <div className="co-types">
                    {["Home", "Office"].map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`co-chip ${form.type === t ? "active" : ""}`}
                        onClick={() => setForm(prev => ({ ...prev, type: t }))}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="co-actions">
                  <button className="co-btn secondary" onClick={back}>Back</button>
                  <button className="co-btn" onClick={next}>Next: Delivery Type</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="co-card">
                <h4>How would you like it delivered?</h4>
                {options.deliveryOptions.map(o => (
                  <label
                    key={o.id}
                    className={`co-option ${form.deliveryType === o.id ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value={o.id}
                      checked={form.deliveryType === o.id}
                      onChange={handleChange}
                    />
                    <div className="co-option-body">
                      <strong>{o.label}</strong>
                      <span>Estimated delivery: {o.eta}</span>
                    </div>
                    <div className="co-option-price">{formatPrice(o.charge)}</div>
                  </label>
                ))}
                <div className="co-actions">
                  <button className="co-btn secondary" onClick={back}>Back</button>
                  <button className="co-btn" onClick={next}>Next: Payment</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <>
                <div className="co-card co-recap">
                  <div>
                    <h5>Delivery</h5>
                    <p>{selectedDelivery.label} · {selectedDelivery.eta}</p>
                  </div>
                  <button className="co-link" onClick={() => setStep(3)}>Edit</button>
                </div>

                <div className="co-card">
                  <h4>How would you like to pay?</h4>
                  {options.paymentMethods.map(p => (
                    <label
                      key={p.id}
                      className={`co-option ${form.paymentMethod === p.id ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={p.id}
                        checked={form.paymentMethod === p.id}
                        onChange={handleChange}
                      />
                      <div className="co-option-body">
                        <strong>{p.label}</strong>
                        <span>{p.description}</span>
                      </div>
                    </label>
                  ))}

                  {serverError && <div className="co-server-error">{serverError}</div>}

                  <div className="co-actions">
                    <button className="co-btn secondary" onClick={back} disabled={placing}>Back</button>
                    <button className="co-btn" onClick={handlePlaceOrder} disabled={placing}>
                      {placing ? "Placing order..." : "Place Order"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="col-lg-4">
            <OrderSummary deliveryCharge={step >= 3 ? selectedDelivery.charge : null} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout