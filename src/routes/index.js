import { Router } from "express"
import { clientRoute } from "./clientRoute.js"
import { cakeRoute } from "./cakeRoute.js"
import { orderRoute } from "./orderRoute.js"
import { authRoute } from "./authRoute.js"
import { pluviometerRoute } from "./pluviometerRoute.js"

const router = Router()
router.use([clientRoute, cakeRoute, orderRoute, authRoute, pluviometerRoute])

export default router