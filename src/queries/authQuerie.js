export const insertUser = () => {
    const query = `--sql
        INSERT INTO public."User" (matricula, nome, tipo, senha)
        VALUES ($1, $2, $3, $4);
    `;
    return query;
};

export const getUserByMatricula = () => {
    const query = `--sql
        SELECT * FROM public."User"
        WHERE matricula = $1;
    `;
    return query;
};

export const authenticateUser = () => {
    const query = `--sql
        SELECT senha FROM public."User"
        WHERE matricula = $1;
    `;
    return query;
};

export const updateUserPassword = () => {
    const query = `--sql
        UPDATE public."User"
        SET senha = $1
        WHERE matricula = $2;
    `;
    return query;
};

export const deleteUser = () => {
    const query = `--sql
        DELETE FROM public."User"
        WHERE matricula = $1;
    `;
    return query;
};
