import dotenv from "dotenv"
import { pluviometerSchema } from "../schemas/index.js"

dotenv.config()

export const addData = async (request, response) => {
  const { idStation, rainfall } = response.locals.newData
  const dado = {
    idStation,
    rainfall,
  }
  console.log(dado)
  try {
    await pluviometerSchema.insertData(dado)
    console.log(dado)
    return response.status(201).send("pluviometer Data registered!")
  } catch (error) {
    return response.status(500).send(`Internal system error.`)
  }
}

export const selectDataPluviometer = async (request, response) => {
  const { startDate, endDate, idStation } = request.query
  try {
    const result = await pluviometerSchema.selectDataPluviometer(startDate, endDate, idStation)
    return response.status(200).send(result.rows)
  } catch (error) {
    return response.status(500).send(`Internal system error.`)
  }
}