export const insertData = () => {
        
        const query = `--sql
            INSERT INTO
                public."BMP280" ("date", "pressure","temperature" , "altitude", "idstation")
            VALUES
                ($1, $2, $3, $4, $5);        
        `
        return query
    }