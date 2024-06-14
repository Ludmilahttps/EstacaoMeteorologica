import { Router } from "express"
import { pluviometerMiddleware } from "../middlewares/index.js"
import { pluviometerController } from "../controllers/index.js"

const pluviometerRoute = Router()

pluviometerRoute.post(
  "/pluviometer",
  pluviometerMiddleware.validateData,
  pluviometerController.addData
)

// dhtRoute.get(
//   "/dht",
//   dhtMiddleware.getData,
//   dhtController.getDatadht
// )

export { pluviometerRoute }