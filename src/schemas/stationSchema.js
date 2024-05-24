import Joi from "joi";
import { connection } from "./index.js";
import { querieUnidade } from "../queries/index.js";

export const unidadeSchema = Joi.object({
    localidade: Joi.string().required(),
    estado: Joi.number().required(),
    data_manutencao: Joi.date().optional(),
});

export const insertUnidade = async (unidade) => {
    const { localidade, estado, data_manutencao } = unidade;
    try {
        await connection.query(querieUnidade.insertUnidade(), [localidade, estado, data_manutencao]);
    } catch (error) {
        console.log(error);
        throw new Error("Error inserting unidade");
    }
};

export const updateUnidade = async (id_unidade, updatedUnidade) => {
    const { localidade, estado, data_manutencao } = updatedUnidade;
    try {
        await connection.query(querieUnidade.updateUnidade(), [localidade, estado, data_manutencao, id_unidade]);
    } catch (error) {
        console.log(error);
        throw new Error("Error updating unidade");
    }
};

export const deleteUnidade = async (id_unidade) => {
    try {
        await connection.query(querieUnidade.deleteUnidade(), [id_unidade]);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting unidade");
    }
};

export const getUnidadeById = async (id_unidade) => {
    try {
        const { rows } = await connection.query(querieUnidade.getUnidadeById(), [id_unidade]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching unidade");
    }
};

export const getUnidadeByManutencao = async (data_manutencao) => {
    try {
        const { rows } = await connection.query(querieUnidade.getUnidadeByManutencao(), [data_manutencao]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching unidade");
    }
};

export const getUnidadeByEstado = async (estado) => {
    try {
        const { rows } = await connection.query(querieUnidade.getUnidadeByEstado(), [estado]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching unidade");
    }
};
