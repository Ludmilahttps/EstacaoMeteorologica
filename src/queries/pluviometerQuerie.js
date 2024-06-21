export const insertData = () => {
    
    const query = `--sql
          INSERT INTO
              public."Pluviometer" ("date", "rainfall", "idstation")
          VALUES
              ($1, $2, $3);        
      `
    return query
  }


  export const selectDataPluviometer = () => {
    
    const query = `--sql
          SELECT 
              *
          FROM
              public."Pluviometer"
          WHERE
              "date" BETWEEN $1 AND $2
          AND
              "idstation" = $3
      `
    return query
  }