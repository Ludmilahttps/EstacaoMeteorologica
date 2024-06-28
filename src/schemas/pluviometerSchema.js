import joi from 'joi';
import { connection } from './index.js';
import { queriePluviometer } from '../queries/index.js';

export const insertData = async (dado) => {
  const { idStation, rainfall } = dado;
  const date = new Date().toISOString().split('T')[0];

  try {
    await connection.query(queriePluviometer.insertData(), [date, rainfall, idStation]);
  } catch (error) {
    console.log(error);
  }
};

export const selectDataPluviometer = async (startDate, endDate, idStation ) => {
  try {
    return connection.query(queriePluviometer.selectDataPluviometer(), [startDate, endDate, idStation]);
  } catch (error) {
    console.log(error);
  }
}

export const pluviometerSchema = joi.object({
    idStation: joi.string().required().trim(),
    rainfall: joi.string().required().trim()
});

export const pluviometerSchemaSelect = joi.object({
    startDate: joi.string().required().trim(),
    endDate: joi.string().required().trim(),
    idStation: joi.string().required().trim()
});