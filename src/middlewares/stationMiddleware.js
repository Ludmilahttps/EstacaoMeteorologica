import { unidadeSchema, getUnidadeById } from "../schemas/index.js";

export const validateUnidade = async (request, response, next) => {
    const { error, value } = unidadeSchema.validate(request.body);
    if (error) {
        console.log("Validation Error: ", error.details);
        return response.status(422).send("Invalid data format");
    }

    const { id_unidade } = value;

    try {
        const existingUnidade = await getUnidadeById(id_unidade);
        if (existingUnidade) {
            return response.status(409).send("Unidade already exists");
        }
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }

    response.locals.newUnidade = value;
    next();
};

export const updateUnidade = async (request, response, next) => {
    const { id_unidade, updatedUnidade } = request.body;

    try {
        await updateUnidade(id_unidade, updatedUnidade);
        response.status(200).send("Unidade updated successfully");
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const deleteUnidade = async (request, response, next) => {
    const { id_unidade } = request.body;

    try {
        await deleteUnidade(id_unidade);
        response.status(200).send("Unidade deleted successfully");
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getUnidadeById = async (request, response, next) => {
    const { id_unidade } = request.params;

    try {
        const unidade = await getUnidadeById(id_unidade);
        if (!unidade) {
            return response.status(404).send("Unidade not found");
        }
        response.status(200).json(unidade);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getUnidadeByManutencao = async (request, response, next) => {
    const { data_manutencao } = request.params;

    try {
        const unidade = await getUnidadeByManutencao(data_manutencao);
        if (!unidade) {
            return response.status(404).send("Unidade not found");
        }
        response.status(200).json(unidade);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getUnidadeByEstado = async (request, response, next) => {
    const { estado } = request.params;

    try {
        const unidade = await getUnidadeByEstado(estado);
        if (!unidade) {
            return response.status(404).send("Unidade not found");
        }
        response.status(200).json(unidade);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};
