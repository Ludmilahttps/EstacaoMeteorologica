export const insertData = () => {
        
        const query = `--sql
            INSERT INTO
                public."Anemometer" ("date", "windspeed", "winddirection", "windangle", "idstation")
            VALUES
                ($1, $2, $3, $4, $5);        
        `
        return query
    }