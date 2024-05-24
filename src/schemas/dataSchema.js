import Joi from "joi";
import { connection } from "./index.js";
import { querieData } from "../queries/index.js";

export const dataSchema = Joi.object({
    valor: Joi.number().required(),
    data: Joi.date().required(),
    unidade_medida: Joi.string().required(),
    idUser: Joi.string().required(),
    idSensor: Joi.number().required(),
});

export const insertDado = async (dado) => {
    const { valor, data, unidade_medida, idUser, idSensor } = dado;
    try {
        await connection.query(querieData.insertDado(), [valor, data, unidade_medida, idUser, idSensor]);
    } catch (error) {
        console.log(error);
        throw new Error("Error inserting dado");
    }
};

export const updateDado = async (id_dado, updatedDado) => {
    const { valor, data, unidade_medida, idUser, idSensor } = updatedDado;
    try {
        await connection.query(querieData.updateDado(), [valor, data, unidade_medida, idUser, idSensor, id_dado]);
    } catch (error) {
        console.log(error);
        throw new Error("Error updating dado");
    }
};

export const deleteDado = async (id_dado) => {
    try {
        await connection.query(querieData.deleteDado(), [id_dado]);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting dado");
    }
};

export const getDadoById = async (id_dado) => {
    try {
        const { rows } = await connection.query(querieData.getDadoById(), [id_dado]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching dado");
    }
};

export const getDadoByMedida = async (unidade_medida) => {
    try {
        const { rows } = await connection.query(querieData.getDadoByMedida(), [unidade_medida]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching dado");
    }
};

export const getDadoByData = async (data) => {
    try {
        const { rows } = await connection.query(querieData.getDadoByData(), [data]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching dado");
    }
};

export const getDadoByValor = async (valor) => {
    try {
        const { rows } = await connection.query(querieData.getDadoByValor(), [valor]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching dado");
    }
};
