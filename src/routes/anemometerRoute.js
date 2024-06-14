import { Router } from "express"
import { anemometerMiddleware } from "../middlewares/index.js"
import { anemometerController } from "../controllers/index.js"

const anemometerRoute = Router()

anemometerRoute.post(
  "/anemometer",
  anemometerMiddleware.validateData,
  anemometerController.addData
)

// dhtRoute.get(
//   "/dht",
//   dhtMiddleware.getData,
//   dhtController.getDatadht
// )

export { anemometerRoute }