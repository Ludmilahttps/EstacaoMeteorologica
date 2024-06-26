import { Router } from "express"
import { authRoute } from "./authRoute.js"
import { pluviometerRoute } from "./pluviometerRoute.js"
import { anemometerRoute } from "./anemometerRoute.js"
import { dhtRoute } from "./dhtRoute.js"
import { bmpRoute } from "./bmpRoute.js"
import { stationRoute } from "./stationRoute.js"

const router = Router()
router.use([authRoute, dhtRoute, pluviometerRoute, anemometerRoute, bmpRoute, stationRoute])

export default router