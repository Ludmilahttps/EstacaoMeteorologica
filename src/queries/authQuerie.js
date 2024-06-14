export const insertUser = () => {
    const query = `--sql
          INSERT INTO public."User" ("cpf", "email", "name", "position", "password")
          VALUES
              ($1, $2, $3, $4, $5);        
      `
    return query
}

export const updateEmail = () => {
    const query = `--sql
            UPDATE public."User"
            SET email = $1
            WHERE cpf = $2;       
      `
    return query
}

export const updatePassword = () => {
    const query = `--sql
            UPDATE public."User"
            SET password = $1
            WHERE cpf = $2;       
      `
    return query
}

export const getPassByEmail = () => {
    const query = `--sql
      SELECT
          "password"
      FROM
          public."User"
      WHERE
          email = $1;
  `
    return query
}

export const getPassByCpf = () => {
    const query = `--sql
      SELECT
          "password"
      FROM
          public."User"
      WHERE
          cpf = $1;
  `
    return query
}

export const getPositionByEmail = () => {
    const query = `--sql
      SELECT
          "position"
      FROM
          public."User"
      WHERE
          email = $1;
  `
    return query
}

export const getPositionByCpf = () => {
    const query = `--sql
      SELECT
          "position"
      FROM
          public."User"
      WHERE
          cpf = $1;
  `
    return query
}

export const deleteUser = () => {
    const query = `--sql
    DELETE FROM public."User"
    WHERE cpf = $1;
  `
    return query
}
