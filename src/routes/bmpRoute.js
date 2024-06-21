import { Router } from "express"
import { bmpMiddleware } from "../middlewares/index.js"
import { bmpController } from "../controllers/index.js"

const bmpRoute = Router()

bmpRoute.post(
  "/bmp",
  bmpMiddleware.validateData,
  bmpController.addData
)

bmpRoute.get(
  "/bmpGet",
  bmpMiddleware.validateDataSelect,
  bmpController.selectDataBMP280
)

// dhtRoute.get(
//   "/dht",
//   dhtMiddleware.getData,
//   dhtController.getDatadht
// )

export { bmpRoute }