export const insertData = () => {
    
    const query = `--sql
          INSERT INTO
              DHT11 ("date", "temperature", "humidity")
          VALUES
              ($1, $2, $3, '0');        
      `
    return query
  }