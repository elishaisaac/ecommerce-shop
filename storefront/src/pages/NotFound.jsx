import { Link } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"
import "./NotFound.css"

function NotFound() {
  usePageTitle("Page not found")

  return (
    <div className="nf container">
      <div className="nf-code">404</div>
      <h2>We can't find that page</h2>
      <p>The address may be mistyped, or the page may have moved.</p>
      <Link to="/" className="nf-btn">Back to home</Link>
    </div>
  )
}

export default NotFound