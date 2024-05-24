import { sensorSchema, getSensorById } from "../schemas/index.js";

export const validateSensor = async (request, response, next) => {
    const { error, value } = sensorSchema.validate(request.body);
    if (error) {
        console.log("Validation Error: ", error.details);
        return response.status(422).send("Invalid data format");
    }

    const { id_sensor } = value;

    try {
        const existingSensor = await getSensorById(id_sensor);
        if (existingSensor) {
            return response.status(409).send("Sensor already exists");
        }
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }

    response.locals.newSensor = value;
    next();
};

export const updateSensor = async (request, response, next) => {
    const { id_sensor, updatedSensor } = request.body;

    try {
        await updateSensor(id_sensor, updatedSensor);
        response.status(200).send("Sensor updated successfully");
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const deleteSensor = async (request, response, next) => {
    const { id_sensor } = request.body;

    try {
        await deleteSensor(id_sensor);
        response.status(200).send("Sensor deleted successfully");
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getSensorById = async (request, response, next) => {
    const { id_sensor } = request.params;

    try {
        const sensor = await getSensorById(id_sensor);
        if (!sensor) {
            return response.status(404).send("Sensor not found");
        }
        response.status(200).json(sensor);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getSensorByUnidade = async (request, response, next) => {
    const { idUnidade } = request.params;

    try {
        const sensor = await getSensorByUnidade(idUnidade);
        if (!sensor) {
            return response.status(404).send("Sensor not found");
        }
        response.status(200).json(sensor);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const getSensorByManutencao = async (request, response, next) => {
    const { data_manutencao } = request.params;

    try {
        const sensor = await getSensorByManutencao(data_manutencao);
        if (!sensor) {
            return response.status(404).send("Sensor not found");
        }
        response.status(200).json(sensor);
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};
