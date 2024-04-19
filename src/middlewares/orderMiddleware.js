import { request, response } from "express"
import { orderSchema } from "../schemas/index.js"
import { connection } from "../schemas/index.js"

export const validateOrder = (request, response, next) => {
  const Body = orderSchema.orderSchema.validate(request.body)
  const today = new Date()

  if (Body.error) return response.status(422).send("Some error with JSON body")
  const newOrder = {
    clientid: Body.value.clientid,
    cakeid: Body.value.cakeid,
    employeeid: Body.value.employeeid,
    quantity: Body.value.quantity,
    createdat: today,
  }
  response.locals.newOrder = newOrder
  next()
  return true
}

export const getOrder = async (request, response, next) => {
  const { date } = request.query

  try {
    const isEmpty = await connection.query(`SELECT * FROM orders`)
    if (isEmpty.rows.length === 0) {
      return response.sendStatus(404)
    }

    const validatition = orderSchema.orderSchemaDate.validate({ date })
    if (validatition.error) {
      return response.sendStatus(error)
    }

    next()
  } catch (error) {
    console.log(error)
    return response.sendStatus(error)
  }
}

export const getOrdersQuantity = async (request, response, next) => {
  const { id } = request.params

  try {
    const order = await connection.query(
      `SELECT * FROM public.orders `)
    if (order.rows.length === 0 && cake.rows.length === 0 && client.rows.length === 0) {
      return response.status(404).send("no orders")
    }
    next()

  } catch (error) {
    return response.status(500).send(error.message)
  }
}

export const getOrdersbyId = async (request, response, next) => {
  const { id } = request.params

  try {
    const order = await connection.query(`SELECT * FROM orders WHERE id_order = ${id}`)
    if (order.rows.length === 0 && cake.rows.length === 0 && client.rows.length === 0) {
      return response.status(404).send("Id not found")
    }
    next()

  } catch (error) {
    return response.status(500).send(error.message)
  }
}