export const insertEmployee = () => {
    const query = `--sql
          INSERT INTO employees ("name", "email", "password")
          VALUES
              ($1, $2, $3);        
      `
    return query
}

export const insertPositionEmployee = () => {
    const query = `--sql
          INSERT INTO employee_position ("employeeid", "positionid")
          VALUES
              ($1, $2);        
      `
    return query
}

export const updateEmail = () => {
    const query = `--sql
            UPDATE public.employees
            SET email = $1
            WHERE id_employee = $2;       
      `
    return query
}

export const getPassByEmail = () => {
    const query = `--sql
      SELECT
          "password","id_employee"
      FROM
          employees
      WHERE
          email = $1;
  `
    return query
}

export const getPositionById = () => {
    const query = `--sql
      SELECT
          "positionid"
      FROM
          employee_position
      WHERE
          employeeid = $1;
  `
    return query
}

export const getIdByEmail = () => {
    const query = `--sql
      SELECT
          "id_employee"
      FROM
          employees
      WHERE
          email = $1;
  `
    return query
}

