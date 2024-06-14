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

export const bmpSchema = Joi.object({
    pressure: Joi.number().required(),
    temperature: Joi.number().required(),
    altitude: Joi.number().required(),
    idStation: Joi.string().required().trim(),
});
