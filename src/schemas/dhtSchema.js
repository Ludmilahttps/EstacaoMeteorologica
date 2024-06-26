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
export const selectDataDHT11 = async (startDate, endDate, idStation ) => {
  
  try {
    return connection.query(querieDht.selectDataDHT11(), [startDate, endDate, idStation])
  } catch (error) {
    console.log(error)
  }
}


export const dhtSchema = joi.object({
    idStation: joi.string().required().trim(),
    temperature: joi.string().required().trim(),
    humidity: joi.string().required().trim()
});

export const dhtSchemaSelect = joi.object({
    startDate: joi.string().required().trim(),
    endDate: joi.string().required().trim(),
    idStation: joi.string().required().trim()
});


