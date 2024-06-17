import Joi from "joi";
import bcrypt from "bcrypt";
import { connection } from "./index.js";
import { querieAuth } from "../queries/index.js";

// Definição do schema de validação para os usuários
export const authSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    email: Joi.string().email().max(50).required(),
    name: Joi.string().max(50).required(),
    position: Joi.string().integer().min(0).max(2).required(),
    password: Joi.string().min(8).max(255).required()
});

// Função para inserir um usuário
export const insertUser = async (user) => {
    const { cpf, email, name, position, password } = user;
    try {
        await connection.query(querieAuth.insertUser(), [cpf, email, name, position, password]);
    } catch (error) {
        console.log(error);
        throw new Error("Error inserting user");
    }
};

// Função para atualizar o email de um usuário
export const updateEmail = async (cpf, email) => {
    try {
        await connection.query(querieAuth.updateEmail(), [email, cpf]);
    } catch (error) {
        console.log(error);
        throw new Error("Error updating email");
    }
};

// Função para atualizar a senha de um usuário
export const updatePassword = async (cpf, password) => {
    try {
        await connection.query(querieAuth.updatePassword(), [password, cpf]);
    } catch (error) {
        console.log(error);
        throw new Error("Error updating password");
    }
};

// Função para obter a senha por email
export const getPassByEmail = async (email) => {
    try {
        const result = await connection.query(querieAuth.getPassByEmail(), [email]);
        return result.rows[0].password;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching password by email");
    }
};

// Função para obter a senha por CPF
export const getPassByCpf = async (cpf) => {
    try {
        const result = await connection.query(querieAuth.getPassByCpf(), [cpf]);
        return result.rows[0].password;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching password by CPF");
    }
};

// Função para obter a posição por email
export const getPositionByEmail = async (email) => {
    try {
        const result = await connection.query(querieAuth.getPositionByEmail(), [email]);
        return result.rows[0].position;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching position by email");
    }
};

// Função para obter a posição por CPF
export const getPositionByCpf = async (cpf) => {
    try {
        const result = await connection.query(querieAuth.getPositionByCpf(), [cpf]);
        return result.rows[0].position;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching position by CPF");
    }
};

// Função para deletar um usuário
export const deleteUser = async (cpf) => {
    try {
        await connection.query(querieAuth.deleteUser(), [cpf]);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting user");
    }
};

// Função para autenticar um usuário
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
