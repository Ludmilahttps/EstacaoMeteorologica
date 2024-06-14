import Joi from "joi";
import bcrypt from "bcrypt";
import { connection } from "./index.js";
import { querieAuth } from "../queries/index.js";

export const authSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    email: Joi.string().email().max(50).required(),
    name: Joi.string().max(50).required(),
    position: Joi.number().integer().min(0).max(2).required(),
    password: Joi.string().min(8).max(255).required()
});

export const insertUser = () => {
    const query = `--sql
        INSERT INTO public.User ("cpf", "email", "name", "position", "password")
        VALUES
            ($1, $2, $3, $4, $5);
    `;
    return query;
}

export const updateEmail = () => {
    const query = `--sql
        UPDATE public.User
        SET email = $1
        WHERE cpf = $2;
    `;
    return query;
}

export const updatePassword = () => {
    const query = `--sql
        UPDATE public.User
        SET password = $1
        WHERE cpf = $2;
    `;
    return query;
}

export const getPassByEmail = () => {
    const query = `--sql
        SELECT
            "password"
        FROM
            User
        WHERE
            email = $1;
    `;
    return query;
}

export const getPassByCpf = () => {
    const query = `--sql
        SELECT
            "password"
        FROM
            User
        WHERE
            cpf = $1;
    `;
    return query;
}

export const getPositionByEmail = () => {
    const query = `--sql
        SELECT
            "position"
        FROM
            User
        WHERE
            email = $1;
    `;
    return query;
}

export const getPositionByCpf = () => {
    const query = `--sql
        SELECT
            "position"
        FROM
            User
        WHERE
            cpf = $1;
    `;
    return query;
}

export const deleteUser = () => {
    const query = `--sql
        DELETE FROM public.User
        WHERE cpf = $1;
    `;
    return query;
}


export const authenticateUser = async (cpf, password) => {
    try {
        const { rows } = await connection.query(querieAuth.authenticateUser(), [cpf]);
        const user = rows[0];
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Error authenticating user");
    }
};
