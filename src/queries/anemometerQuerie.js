export const insertData = () => {
        
        const query = `--sql
            INSERT INTO
                Anemometer ("date", "wind_speed", "wind_direction")
            VALUES
                ($1, $2, $3, '0');        
        `
        return query
    }