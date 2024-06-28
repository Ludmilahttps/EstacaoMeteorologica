export const insertData = () => {
    
    const query = `--sql
          INSERT INTO
              public."DHT11" ("date", "temperature", "humidity", "idstation")
          VALUES
              ($1, $2, $3, $4);        
      `
    return query
  }

  export const selectDataDHT11 = () => {
    
    const query = `--sql
          SELECT 
              *
          FROM
              public."DHT11"
          WHERE
              "date" BETWEEN "startDate" AND "endDate"
          AND
              "idstation" = "idStation"
            VALUES ($1, $2, $3)
      `
    return query
  }