import joi from "joi"
import date from "@joi/date"
import { connection } from "./index.js"
import { querieOrder } from "../queries/index.js"

const joiDate = joi.extend(date)

export const insertOrder = async (order) => {
  const { clientid, cakeid, quantity, employeeid, createdat } = order
  try {
    await connection.query(querieOrder.insertOrder(), [clientid, cakeid, quantity, employeeid, createdat])
  } catch (error) {
    console.log(error)
  }
}

export const  insertSale = async (order) => {
  const { clientid, cakeid, quantity, employeeid, createdat } = order
  let cake = 0
  try {
    const orderId = await connection.query('SELECT * FROM orders WHERE createdat =  $1', [createdat])
    const cakeResult = await connection.query('SELECT * FROM cakes WHERE id_cake =  $1', [cakeid])
    cake = cakeResult.rows[0];
    await connection.query(querieOrder.insertSale(), [orderId.rows[0].id_order, cake.price*quantity])
  } catch (error) {
    console.log(error)
  }
  return cake.price*quantity
}

export const showOrder = async => {
  try {
    return connection.query(querieOrder.showOrders())
  } catch (error) {
    console.log(error)
  }
}

export const showOrderQuantity = async => {
  try {
    return connection.query(querieOrder.showOrdersQuantity())
  } catch (error) {
    console.log(error)
  }
}

export const selectOrdersId = async (id)=> {
  try {
    return connection.query(querieOrder.showOrdersbyId(id))
  } catch (error) {
    console.log(error)
  }
}

export const selectSales = async ()=> {
  try {
    return connection.query(querieOrder.showSales())
  } catch (error) {
    console.log(error)
  }
}

export const selectIngredients = async ()=> {
  try {
    return connection.query(querieOrder.showIngredients())
  } catch (error) {
    console.log(error)
  }
}

export const selectCity = async ()=> {
  try {
    return connection.query(querieOrder.showCity())
  } catch (error) {
    console.log(error)
  }
}

export const selectClient = async (id)=> {
  try {
    return connection.query(querieOrder.selectClient(id))
  } catch (error) {
    console.log(error)
  }
}

export const selectCake = async (id)=> {
  try {
    return connection.query(querieOrder.selectCake(id))
  } catch (error) {
    console.log(error)
  }
}

export const orderSchema = joi.object({
  clientid: joi.number().required().min(0),
  cakeid: joi.number().required().min(0),
  quantity: joi.number().required().min(0).max(100),
  employeeid: joi.number().required().min(0),
})

export const orderSchemaDate = joi.object({
  date: joiDate.date().format('YYYY-MM-DD').optional()
})

export const deleteAll = async () => {
  try {
    return await connection.query(querieOrder.deleteAll())
  } catch (error) {
    console.log(error)
  }
}

export const createAll = async () => {
  try {
    return connection.query(querieOrder.createAll())
  } catch (error) {
    console.log(error)
  }
}

export const insertAll = async () => {
  try {
    return await connection.query(querieOrder.insertAll())
  } catch (error) {
    console.log(error)
  }
}

export const updateAll = async () => {
  try {
    return await connection.query(querieOrder.updateAll())
  } catch (error) {
    console.log(error)
  }
}