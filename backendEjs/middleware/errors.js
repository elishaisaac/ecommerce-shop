const wantsHtml = (req) => (req.headers.accept || "").includes("text/html")

export const friendlyErrors = (req, res, next) => {
    res.showError = (status, message) => {
        if (!wantsHtml(req)) {
            return res.status(status).json({ success: false, error: true, message })
        }
        return res.status(status).render("Error/Error.ejs", { status, message })
    }

    const originalJson = res.json.bind(res)
    res.json = (body) => {
        if (body && body.error === true && res.statusCode >= 400 && wantsHtml(req)) {
            return res.showError(res.statusCode, body.message)
        }
        return originalJson(body)
    }

    next()
}