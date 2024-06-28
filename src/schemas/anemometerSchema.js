import joi from 'joi';
import { connection } from './index.js';
import { querieAnemometer } from '../queries/index.js';

export const insertData = async (dado) => {
    const { idStation, windSpeed, windDirection, windAngle } = dado;
    const date = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD

    try {
        await connection.query(querieAnemometer.insertData(), [date, windSpeed, windDirection, windAngle, idStation]);
    } catch (error) {
        console.log(error);
    }
};

export const selectDataAnemometer = async (startDate, endDate, idStation ) => {
    try {
        return connection.query(querieAnemometer.selectDataAnemometer(), [startDate, endDate, idStation]);
    } catch (error) {
        console.log(error);
    }
}

export const anemometerSchema = joi.object({
    idStation: joi.string().required().trim(),
    windSpeed: joi.string().required().trim(),
    windDirection: joi.string().required().trim(),
    windAngle: joi.string().required().trim(),
});

export const anemometerSchemaSelect = joi.object({
    startDate: joi.string().required().trim(),
    endDate: joi.string().required().trim(),
    idStation: joi.string().required().trim(),
});