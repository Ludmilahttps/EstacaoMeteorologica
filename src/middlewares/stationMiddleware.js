import Joi from "joi";
import { stationSchema } from "../schemas/index.js";

export const validateInsertStation = (req, res, next) => {
    const { error } = stationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const validateUpdateStationStatus = (req, res, next) => {
    const schema = Joi.object({
        idStation: Joi.number().integer().required(),
        status: Joi.number().integer().min(0).max(1).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const validateUpdateStationCheckup = (req, res, next) => {
    const schema = Joi.object({
        idStation: Joi.number().integer().required(),
        lastCheckUp: Joi.date().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const validateGetStationById = (req, res, next) => {
    const schema = Joi.object({
        idStation: Joi.number().integer().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
