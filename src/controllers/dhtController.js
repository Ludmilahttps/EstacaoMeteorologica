import dotenv from "dotenv"
import { dhtSchema } from "../schemas/index.js"

dotenv.config()

export const addData = async (request, response) => {
  const { idStation, temperature, humidity } = response.locals.newData
  const dado = {
    idStation,
    temperature,
    humidity,
  }
  console.log(dado)
  try {
    await dhtSchema.insertData(dado)
    console.log(dado)
    return response.status(201).send("DHT Data registered!")
  } catch (error) {
    return response.status(500).send(`Internal system error.`)
  }
}

export const selectDataDHT11 = async (request, response) => {
  const { startDate, endDate, idStation } = request.query
  try {
    const result = await dhtSchema.selectDataDHT11(startDate, endDate, idStation)
    return response.status(200).send(result.rows)
  } catch (error) {
    return response.status(500).send(`Internal system error.`)
  }
}

// export async function getClientsOrders(request, response) {
//   const {id} = request.params

//   try {
//   const ordersByClient = await clientSchema.getOrdersByClientId(Number(id))
//   response.send(ordersByClient.rows)
  
//   } catch (error) {
//       console.log(error)
//       response.sendStatus(error)
//   }
// }