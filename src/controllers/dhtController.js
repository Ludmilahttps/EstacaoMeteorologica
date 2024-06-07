import dotenv from "dotenv"
import { dhtSchema } from "../schemas/index.js"

dotenv.config()

export const addData = async (request, response) => {
  const { data, temperatura, umidade } = response.locals.newData
  const dado = {
    data,
    temperatura,
    umidade,
  }

  console.log(dado)
  return response.status(201).send("DHT Data registered!")
//   try {
//     await dhtSchema.insertData(dado)
//     console.log(dado)
//     return response.status(201).send("DHT Data registered!")
//   } catch (error) {
//     return response.status(500).send(`Internal system error.`)
//   }
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