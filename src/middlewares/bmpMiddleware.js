import { request, response } from 'express';
import { bmpSchema } from '../schemas/index.js';

export const validateData = (request, response, next) => {
  const { error, value } = bmpSchema.bmpSchema.validate(request.body);

  if (error) {
    return response.status(422).send("Some error with JSON body");
  }

  const newData = {
    idStation: value.idStation,
    pressure: value.pressure,
    temperature: value.temperature,
    altitude: value.altitude,
  };

  response.locals.newData = newData;
  next();
  return true;
};

export const validateDataSelect = (request, response, next) => {
  const { startDate, endDate, idStation } = request.query;
  const { error} = bmpSchema.bmpSchemaSelect.validate({ startDate, endDate, idStation });
  if (error) {
    return response.status(422).send("Some error with JSON body");
  }
  next();
  return true;
};
