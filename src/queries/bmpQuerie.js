export const insertData = () => {
        
        const query = `--sql
            INSERT INTO
                BMP180 ("date", "pressure", "altitude")
            VALUES
                ($1, $2, $3, '0');        
        `
        return query
    }