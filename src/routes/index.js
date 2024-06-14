import { Router } from "express"
import { clientRoute } from "./clientRoute.js"
import { cakeRoute } from "./cakeRoute.js"
import { orderRoute } from "./orderRoute.js"
import { authRoute } from "./authRoute.js"
import { pluviometerRoute } from "./pluviometerRoute.js"
import { anemometerRoute } from "./anemometerRoute.js"
import { dhtRoute } from "./dhtRoute.js"
import { bmpRoute } from "./bmpRoute.js"

const router = Router()
router.use([clientRoute, cakeRoute, orderRoute, authRoute, dhtRoute, pluviometerRoute, anemometerRoute, bmpRoute])

export default router