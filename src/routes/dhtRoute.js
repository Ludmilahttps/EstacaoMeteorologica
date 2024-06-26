import { Router } from "express"
import { dhtMiddleware } from "../middlewares/index.js"
import { dhtController } from "../controllers/index.js"

const dhtRoute = Router()

dhtRoute.post(
  "/dht",
  dhtMiddleware.validateData,
  dhtController.addData
);

dhtRoute.get(
  "/dhtGet",
  dhtMiddleware.validateDataSelect,
  dhtController.selectDataDHT11
);


export { dhtRoute }