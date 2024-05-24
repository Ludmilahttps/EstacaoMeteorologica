import Joi from "joi";
import { connection } from "./index.js";
import { querieSensor } from "../queries/index.js";

export const sensorSchema = Joi.object({
    nome_sensor: Joi.string().required(),
    data_manutencao: Joi.date().optional(),
    idUnidade: Joi.number().optional(),
});

export const insertSensor = async (sensor) => {
    const { nome_sensor, data_manutencao, idUnidade } = sensor;
    try {
        await connection.query(querieSensor.insertSensor(), [nome_sensor, data_manutencao, idUnidade]);
    } catch (error) {
        console.log(error);
        throw new Error("Error inserting sensor");
    }
};

export const updateSensor = async (id_sensor, updatedSensor) => {
    const { nome_sensor, data_manutencao, idUnidade } = updatedSensor;
    try {
        await connection.query(querieSensor.updateSensor(), [nome_sensor, data_manutencao, idUnidade, id_sensor]);
    } catch (error) {
        console.log(error);
        throw new Error("Error updating sensor");
    }
};

export const deleteSensor = async (id_sensor) => {
    try {
        await connection.query(querieSensor.deleteSensor(), [id_sensor]);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting sensor");
    }
};

export const getSensorById = async (id_sensor) => {
    try {
        const { rows } = await connection.query(querieSensor.getSensorById(), [id_sensor]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching sensor");
    }
};

export const getSensorByUnidade = async (idUnidade) => {
    try {
        const { rows } = await connection.query(querieSensor.getSensorByUnidade(), [idUnidade]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching sensor");
    }
};

export const getSensorByManutencao = async (data_manutencao) => {
    try {
        const { rows } = await connection.query(querieSensor.getSensorByManutencao(), [data_manutencao]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching sensor");
    }
};
