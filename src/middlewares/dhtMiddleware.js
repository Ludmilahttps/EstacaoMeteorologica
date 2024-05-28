import { request, response } from "express"
import { dhtSchema } from "../schemas/index.js"
import { connection } from "../schemas/index.js"

export const validateData = (request, response, next) => {
    console.log(request.body)
    const Body = dhtSchema.dhtSchema.validate(request.body)
    console.log(Body)
    if (Body.error) return response.status(422).send("Some error with JSON body")
    const newData = {
      data: Body.value.data,
      temperatura: Body.value.temperatura,
      umidade: Body.value.umidade,
    }
  
    response.locals.newData = newData
    next()
    return true
}
  
// export const getData = async (request, response, next) => {
//     const { id } = request.params
//     try {
//       const { rows: clients } = await connection.query(`SELECT * FROM clients WHERE id_client = ${id}`)
//       if (clients.length === 0) {
//         return response.status(404).send("Client id not found")
//       }
  
//       const { rows: orders } = await connection.query(`SELECT * FROM orders WHERE "clientId" = ${id}`)
//       if (orders.length === 0) {
//         return response.status(404).send("O usuário não fez nenhum pedido")
//       }
      
//       next()
  
//     } catch (error) {
//       return response.sendStatus(error)
//     }
// }