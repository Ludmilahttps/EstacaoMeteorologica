export const insertData = () => {
        
        const query = `--sql
            INSERT INTO
                BMP180 ("date", "pressure", "altitude", "idStation")
            VALUES
                ($1, $2, $3, $4);        
        `
        return query
    }