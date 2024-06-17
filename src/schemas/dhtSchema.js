import joi from "joi"
import { connection } from "./index.js"
import { querieDht } from "../queries/index.js"

export const insertData = async (dado) => {
  const { idStation, temperature, humidity } = dado
  const date = new Date().toISOString().split('T')[0];
  
  try {
    await connection.query(querieDht.insertData(), [date, temperature, humidity, idStation])
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
    temperature: joi.string().required().trim(),
    humidity: joi.string().required().trim()
});
