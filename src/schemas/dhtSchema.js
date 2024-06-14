import joi from "joi"
import { connection } from "./index.js"
import { querieDht } from "../queries/index.js"

export const insertData = async (dado) => {
  const { idStation, temperatura, umidade } = dado
  const date = new Date().toISOString().split('T')[0];
  
  try {
    await connection.query(querieDht.insertData(), [date, temperatura, umidade, idStation])
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
    idStation: joi.string().required().trim(),
    temperatura: joi.string().required().trim().pattern(/^\d{2}\.\d{2}$/),
    umidade: joi.string().required().trim().pattern(/^\d{2}\.\d{2}$/)
});
