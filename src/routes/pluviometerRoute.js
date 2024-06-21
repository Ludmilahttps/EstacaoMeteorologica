import { Router } from "express"
import { pluviometerMiddleware } from "../middlewares/index.js"
import { pluviometerController } from "../controllers/index.js"

const pluviometerRoute = Router()

pluviometerRoute.post(
  "/pluviometer",
  pluviometerMiddleware.validateData,
  pluviometerController.addData
)

pluviometerRoute.get(
  "/pluviometerGet",
  pluviometerMiddleware.validateDataSelect,
  pluviometerController.selectDataPluviometer
)

// dhtRoute.get(
//   "/dht",
//   dhtMiddleware.getData,
//   dhtController.getDatadht
// )

export { pluviometerRoute }
