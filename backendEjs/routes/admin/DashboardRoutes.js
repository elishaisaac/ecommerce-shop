import express from "express"
import { dashboard } from "../../controller/admin/DashboardController.js"

const dashboardRouter = express.Router()

dashboardRouter.get("/", dashboard)

export default dashboardRouter