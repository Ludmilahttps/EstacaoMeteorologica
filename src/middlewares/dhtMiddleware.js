import { request, response } from "express"
import { dhtSchema } from "../schemas/index.js"
import { connection } from "../schemas/index.js"

export const validateData = (request, response, next) => {
    const Body = dhtSchema.dhtSchema.validate(request.body)

    if (Body.error) return response.status(422).send("Some error with JSON body")
    const newData = {
      idStation: Body.value.idStation,
      temperature: Body.value.temperature,
      humidity: Body.value.humidity,
    }
  
    response.locals.newData = newData
    next()
    return true
}

export const validateDataSelect = (request, response, next) => {
  const { startDate, endDate, idStation } = request.query;
  const { error} = dhtSchema.dhtSchemaSelect.validate({ startDate, endDate, idStation });
  if (error) {
    return response.status(422).send("Some error with JSON body");
  }
  next();
  return true;
};
  