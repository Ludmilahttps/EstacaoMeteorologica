import { request, response } from "express"
import { pluviometerSchema } from "../schemas/index.js"
import { connection } from "../schemas/index.js"

export const validateData = (request, response, next) => {
    const Body = pluviometerSchema.pluviometerSchema.validate(request.body)

    if (Body.error) return response.status(422).send("Some error with JSON body")
    const newData = {
      idStation: Body.value.idStation,
      rainfall: Body.value.rainfall,
    }
  
    response.locals.newData = newData
    next()
    return true
}

export const validateDataSelect = (request, response, next) => {
  const { startDate, endDate, idStation } = request.query;
  const { error} = pluviometerSchema.pluviometerSchemaSelect.validate({ startDate, endDate, idStation });
  if (error) {
    return response.status(422).send("Some error with JSON body");
  }
  next();
  return true;
};