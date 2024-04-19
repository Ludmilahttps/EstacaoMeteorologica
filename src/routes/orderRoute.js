import { Router } from "express"
import { orderMiddleware } from "../middlewares/index.js"
import { orderController } from "../controllers/index.js"

export const orderRoute = Router()

orderRoute.post(
  "/orders",
  orderMiddleware.validateOrder,
  orderController.newOrder
)

orderRoute.get(
  "/orders",
  orderMiddleware.getOrder,
  orderController.showOrder
)

orderRoute.get(
  "/orderQuantity",
  orderMiddleware.getOrdersQuantity,
  orderController.getOrdersQuantity
)

orderRoute.get(
  "/graphyc/city",
  orderController.getCity
)

orderRoute.get(
  "/graphyc/ingredients",
  orderController.getIngredients
)

orderRoute.get(
  "/graphyc/sales",
  orderController.getSales
)

orderRoute.delete(
  "/orders/:id",
  orderMiddleware.getOrdersbyId,
  orderController.getOrderbyId
)

orderRoute.delete(
  "/delete",
  orderController.deleteAll
)

orderRoute.post(
  "/insert",
  orderController.createAll,
  orderController.insertAll
)

orderRoute.put(
  "/update",
  orderController.updateAll
)