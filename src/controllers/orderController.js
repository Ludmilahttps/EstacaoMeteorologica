import dotenv from "dotenv"
import { request, response } from "express"
import { orderSchema } from "../schemas/index.js"
import { querieOrder } from "../queries/index.js"
import { connection } from "../schemas/index.js"

dotenv.config()

export const newOrder = async (request, response) => {
  const { clientid, cakeid, quantity, employeeid, createdat } = response.locals.newOrder
  const order = {
    clientid,
    cakeid,
    quantity,
    employeeid,
    createdat,
  }

  try {
    await orderSchema.insertOrder(order)
    const totalprice =  await orderSchema.insertSale(order)
    return response.send({totalprice})
  } catch (error) {
    return response.status(500).send(`Internal system error.`)
  }
}

export const showOrder = async (request, response) => {
  try {
    const { rows: orders } = await orderSchema.showOrder()
    if (orders.length === 0) return response.sendStatus(404)

    const allOrders = orders.map((element) => {
      const order = {
        client: {
          id: element.clientId,
          name: element.clientName,
          address: element.address,
          phone: element.phone,
        },
        cake: {
          id: element.cakeId,
          name: element.cakes,
          price: element.price,
          description: element.description,
          image: element.image,
        },
        orderId: element.ordersId,
        createdat: element.createdat,
        quantity: element.quantity,
        totalPrice: element.totalPrice,
      }
      return order
    })
    response.status(200).send(allOrders)
  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

export async function getOrderbyId(request, response) {
  const { id } = request.params
  try {
    const { rows: order } = await orderSchema.selectOrdersId(id)
    return response.status(200).send(order)

  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

export async function getOrdersQuantity(request, response) {
  try {
    const { rows: order } = await orderSchema.selectOrderQuantity()
    console.log(order)
    return response.status(200).send(order)

  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

export async function getSales(request, response) {
  try {
    const { rows: sales } = await orderSchema.selectSales()
    console.log(sales)
    return response.status(200).send(sales)

  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

export async function getIngredients(request, response) {
  try {
    const { rows: ingredients } = await orderSchema.selectIngredients()
    console.log(ingredients)
    return response.status(200).send(ingredients)

  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

export async function getCity(request, response) {
  try {
    const { rows: city } = await orderSchema.selectCity()
    console.log(city)
    return response.status(200).send(city)

  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

export async function deleteAll(request, response) {
  try {
    await orderSchema.deleteAll()
    return response.status(200).send("OK")
  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

export async function createAll(request, response, next) {
  try {
    await orderSchema.createAll()
    next()
  } catch (error) {
    console.log(error)
    response.sendStatus(error)
  }
}

export async function insertAll(request, response) {
  try {
    await orderSchema.insertAll()
    client.release();
    return response.status(200).send("OK")
  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

const client = await connection.connect();

export async function updateAll(request, response) {
  try {
    await orderSchema.updateAll()
    return response.status(200).send("OK")
  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

