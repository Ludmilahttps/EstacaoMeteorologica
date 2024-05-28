import joi from "joi"
import { connection } from "./index.js"
import { querieDht } from "../queries/index.js"

export const insertData = async (dado) => {
  const { data, temperatura, umidade } = dado
  try {
    await connection.query(querieDht.insertData(), [data, temperatura, umidade])
  } catch (error) {
    console.log(error)
  }
}

// export const getOrdersByClientId = async (id) => {
//   try {
//     return connection.query(querieDht.getOrdersByClientId(id))
//   } catch (error) {
//     console.log(error)
//   }
// }

export const dhtSchema = joi.object({
    tempo: joi.string().required().trim().pattern(/^\d{2}:\d{2}:\d{2} \d{2}\/\d{2}\/\d{4}$/),
    temperatura: joi.string().required().trim().pattern(/^\d{2}.\d{2}$/),
    umidade: joi.string().required().trim().pattern(/^\d{2}.\d{2}$/)
})