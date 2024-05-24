import Joi from "joi";
import bcrypt from "bcrypt";
import { connection } from "./index.js";
import { querieAuth } from "../queries/index.js";

export const authSchema = Joi.object({
    matricula: Joi.string().required(),
    nome: Joi.string().required(),
    tipo: Joi.number().required(),
    senha: Joi.string().required(),
});

export const insertUser = async (user) => {
    const { matricula, nome, tipo, senha } = user;
    try {
        await connection.query(querieAuth.insertUser(), [matricula, nome, tipo, senha]);
    } catch (error) {
        console.log(error);
        throw new Error("Error inserting user");
    }
};

export const updateUserPassword = async (matricula, newPassword) => {
    try {
        await connection.query(querieAuth.updateUserPassword(), [newPassword, matricula]);
    } catch (error) {
        console.log(error);
        throw new Error("Error updating user password");
    }
};

export const deleteUser = async (matricula) => {
    try {
        await connection.query(querieAuth.deleteUser(), [matricula]);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting user");
    }
};

export const getUserByMatricula = async (matricula) => {
    try {
        const { rows } = await connection.query(querieAuth.getUserByMatricula(), [matricula]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching user");
    }
};

export const authenticateUser = async (matricula, senha) => {
    try {
        const { rows } = await connection.query(querieAuth.authenticateUser(), [matricula]);
        const user = rows[0];
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Error authenticating user");
    }
};
