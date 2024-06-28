import Joi from 'joi';
import { connection } from './index.js';
import { querieBmp } from '../queries/index.js';

export const insertData = async (dado) => {
    const { idStation, pressure, temperature, altitude } = dado;
    const date = new Date().toISOString().split('T')[0];

    try {
        await connection.query(querieBmp.insertData(), [date, pressure, temperature, altitude, idStation]);
    } catch (error) {
        console.log(error);
    }
};

export const selectDataBMP280 = async (required) => {
    const { startDate, endDate, idStation } = required;
    try {
        return connection.query(querieBmp.selectDataBMP280(), [startDate, endDate, idStation]);
    } catch (error) {
        console.log(error);
    }
}

export const bmpSchema = Joi.object({
    idStation: Joi.string().required().trim(),
    pressure: Joi.string().required().trim(),
    temperature: Joi.string().required().trim(),
    altitude: Joi.string().required().trim(),
});

export const bmpSchemaSelect = Joi.object({
    startDate: Joi.string().required().trim(),
    endDate: Joi.string().required().trim(),
    idStation: Joi.string().required().trim(),
});