import { request, response } from 'express';
import { anemometerSchema } from '../schemas/index.js';

export const validateData = (request, response, next) => {
  const { error, value } = anemometerSchema.anemometerSchema.validate(request.body);

  if (error) {
    return response.status(422).send("Some error with JSON body");
  }

  const newData = {
    idStation: value.idStation,
    windSpeed: value.windSpeed,
    windDirection: value.windDirection,
    windAngle: value.windAngle,
  };

  response.locals.newData = newData;
  next();
  return true;
};

export const validateDataSelect = (request, response, next) => {
  const { startDate, endDate, idStation } = request.query;
  const { error} = anemometerSchema.anemometerSchemaSelect.validate({ startDate, endDate, idStation });
  if (error) {
    return response.status(422).send("Some error with JSON body");
  }
  next();
  return true;
};
