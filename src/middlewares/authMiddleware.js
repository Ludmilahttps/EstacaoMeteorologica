import { authSchema } from "../schemas/index.js";

export const validateUser = (req, res, next) => {
    const { error } = authSchema.authSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const validateUpdateEmail = (req, res, next) => {
    const schema = Joi.object({
        cpf: Joi.string().length(11).required(),
        email: Joi.string().email().max(50).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const validateUpdatePassword = (req, res, next) => {
    const schema = Joi.object({
        cpf: Joi.string().length(11).required(),
        password: Joi.string().min(8).max(255).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
export const validateAuthenticateUser = (req, res, next) => {
    const schema = Joi.object({
        cpf: Joi.string().length(11).required(),
        password: Joi.string().min(8).max(255).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
