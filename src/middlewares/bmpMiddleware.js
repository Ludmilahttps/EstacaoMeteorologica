import { request, response } from 'express';
import { bmpSchema } from '../schemas/index.js';

export const validateData = (request, response, next) => {
  const { error, value } = bmpSchema.validate(request.body);

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
