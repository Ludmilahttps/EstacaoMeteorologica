import { authSchema, getUserByMatricula } from "../schemas/index.js";

export const validateUser = async (request, response, next) => {
    const { error, value } = authSchema.validate(request.body);
    if (error) {
        console.log("Validation Error: ", error.details);
        return response.status(422).send("Invalid data format");
    }

    const { matricula } = value;

    try {
        const existingUser = await getUserByMatricula(matricula);
        if (existingUser) {
            return response.status(409).send("User already exists");
        }
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }

    response.locals.newUser = value;
    next();
};

export const updateUserPassword = async (request, response, next) => {
    const { matricula, newPassword } = request.body;

    try {
        await updateUserPassword(matricula, newPassword);
        response.status(200).send("Password updated successfully");
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const deleteUser = async (request, response, next) => {
    const { matricula } = request.body;

    try {
        await deleteUser(matricula);
        response.status(200).send("User deleted successfully");
    } catch (err) {
        console.log("Database Error: ", err);
        return response.status(500).send("Internal server error");
    }
};

export const authenticateUser = async (request, response, next) => {
    const { matricula, senha } = request.body;

    try {
        const user = await authenticateUser(matricula, senha);
        response.status(200).json(user);
    } catch (err) {
        console.log("Authentication Error: ", err.message);
        return response.status(401).send("Authentication failed");
    }
};
