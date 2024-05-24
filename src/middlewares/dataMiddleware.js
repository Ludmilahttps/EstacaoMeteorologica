import { dataSchema, getDadoById } from "../schemas/index.js";

export const validateDado = async (request, response, next) => {
    const { error, value } = dataSchema.validate(request.body);
    if (error) {
        console.log("Validation Error: ", error.details);
        return response.status(422).send("Invalid data format");
    }

    const { id_dado } = value;

    try {
        const existingDado = await getDadoById(id_dado);
        if (existingDado) {
            return response.status(409).send("Dado already exists");
        }
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }

    response.locals.newDado = value;
    next();
};

export const updateDado = async (request, response, next) => {
    const { id_dado, updatedDado } = request.body;

    try {
        await updateDado(id_dado, updatedDado);
        response.status(200).send("Dado updated successfully");
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const deleteDado = async (request, response, next) => {
    const { id_dado } = request.body;

    try {
        await deleteDado(id_dado);
        response.status(200).send("Dado deleted successfully");
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getDadoById = async (request, response, next) => {
    const { id_dado } = request.params;

    try {
        const dado = await getDadoById(id_dado);
        if (!dado) {
            return response.status(404).send("Dado not found");
        }
        response.status(200).json(dado);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getDadoByMedida = async (request, response, next) => {
    const { unidade_medida } = request.params;

    try {
        const dado = await getDadoByMedida(unidade_medida);
        if (!dado) {
            return response.status(404).send("Dado not found");
        }
        response.status(200).json(dado);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getDadoByData = async (request, response, next) => {
    const { data } = request.params;

    try {
        const dado = await getDadoByData(data);
        if (!dado) {
            return response.status(404).send("Dado not found");
        }
        response.status(200).json(dado);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getDadoByValor = async (request, response, next) => {
    const { valor } = request.params;

    try {
        const dado = await getDadoByValor(valor);
        if (!dado) {
            return response.status(404).send("Dado not found");
        }
        response.status(200).json(dado);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};
