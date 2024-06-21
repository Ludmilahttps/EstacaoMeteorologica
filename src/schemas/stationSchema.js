import Joi from "joi";
import { connection } from "./index.js";
import { querieStation } from "../queries/index.js";

export const stationSchema = Joi.object({
    location: Joi.string().max(100).required(),
    status: Joi.number().integer().min(0).max(1).required(),
    lastCheckUp: Joi.date().required()
});

export const insertStation = async (station) => {
    const { location, status, lastCheckUp } = station;
    try {
        await connection.query(querieStation.insertStation(), [location, status, lastCheckUp]);
    } catch (error) {
        console.log(error);
        throw new Error("Error inserting station");
    }
};

export const getStationById = async (idStation) => {
    try {
        const result = await connection.query(querieStation.getStationById(), [idStation]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching station by ID");
    }
};

export const getStations = async () => {
    try {
        const result = await connection.query(querieStation.getStation());
        return result.rows;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error fetching station");
    }
};

export const getStationByCheckUp = async (lastCheckUp) => {
    try {
        const result = await connection.query(querieStation.getStationByCheckUp(), [lastCheckUp]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching station by check-up date");
    }
};

export const getStationByStatus = async (status) => {
    try {
        const result = await connection.query(querieStation.getStationByStatus(), [status]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching station by status");
    }
};

export const updateStationCheckup = async (idStation, lastCheckUp) => {
    try {
        await connection.query(querieStation.updateStationCheckup(), [lastCheckUp, idStation]);
    } catch (error) {
        console.log(error);
        throw new Error("Error updating station check-up date");
    }
};

export const updateStationStatus = async (idStation, status) => {
    try {
        await connection.query(querieStation.updateStationStatus(), [status, idStation]);
    } catch (error) {
        console.log(error);
        throw new Error("Error updating station status");
    }
};

export const deleteStation = async (idStation) => {
    try {
        await connection.query(querieStation.deleteStation(), [idStation]);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting station");
    }
};
