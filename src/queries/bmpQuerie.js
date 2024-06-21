export const insertData = () => {
        
        const query = `--sql
            INSERT INTO
                public."BMP280" ("date", "pressure","temperature" , "altitude", "idstation")
            VALUES
                ($1, $2, $3, $4, $5);        
        `
        return query
    }

export const selectDataBMP280 = () => {
        
        const query = `--sql
            SELECT 
                *
            FROM
                public."BMP280"
            WHERE
                "date" BETWEEN $1 AND $2
            AND
                "idstation" = $3
        `
        return query
    }
