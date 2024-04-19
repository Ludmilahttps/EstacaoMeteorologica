export const insertCake = () => {
    const query = `--sql
          INSERT INTO
              cakes ("name", "price", "image", "description", "categoryid")
          VALUES
              ($1, $2, $3, $4, $5);        
      `
    return query
  }

  export const getNamebyName = () => {
    const query = `--sql
      SELECT
          name
      FROM
          cakes
      WHERE
          name = $1;             
  `
    return query
  }