export const insertData = () => {
        
        const query = `--sql
            INSERT INTO
                public."Anemometer" ("date", "windspeed", "winddirection", "windangle", "idstation")
            VALUES
                ($1, $2, $3, $4, $5);        
        `
        return query
    }

export const selectDataAnemometer = () => {
            
        const query = `--sql
            SELECT 
                *
            FROM
                public."Anemometer"
            WHERE
                "date" BETWEEN $1 AND $2
            AND
                "idstation" = $3
        `
        return query
    }