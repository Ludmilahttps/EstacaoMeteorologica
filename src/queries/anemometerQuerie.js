export const insertData = () => {
        
        const query = `--sql
            INSERT INTO
                public."Anemometer" ("date", "wind_speed", "wind_direction", "wind_angle", "idstation")
            VALUES
                ($1, $2, $3, $4, $5);        
        `
        return query
    }